import { Link } from "react-router-dom";

import { useState } from "react";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { countries } from "../../../constants/Country-City-Data";
import Constants from "../../../constants/routes";

const CitiesManualSearch = () => {
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
      <Header2 title="SEARCH CITY" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form name="search_area_from" method="get" action="area.php">
          <div className="panel-body">
            <div className="row">
              <div className="col-md-3 form-group">
                <label>Country</label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select"
                  noOptionsMessage={() => "No Country Found"}
                />
              </div>
              <div className="col-md-3 form-group">
                <label>City Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="Search_city_name"
                  size={30}
                />
              </div>
              <div className="col-md-3 form-group">
                <label>City Code</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="Search_city_code"
                  size={20}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-3">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label>Miki Code</label>
                    <br />
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-xs btn-dark"
                        value="Area Code Active"
                        name="areaCode"
                        title
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="Area Code Active"
                      >
                        <h6>
                          <i className="fa fa-check-circle fa-xs" />
                        </h6>
                      </button>
                      <button
                        type="button"
                        className="btn btn-xs btn-default"
                        value="Area Code Inactive"
                        name="UnareaCode"
                        title
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="Area Code Inactive"
                      >
                        <h6>
                          <i className="fa fa-times-circle fa-xs" />
                        </h6>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-3 form-group">
                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  value="Search"
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
                <div className="row mt-4">
                  <div className="col-md-5">
                    <div className="form-group col-md-12">
                      <div className="row">
                        <div className="col-md-12 form-group">
                          <button
                            type="button"
                            width={45}
                            value="Delete"
                            className="btn btn-danger btn-sm"
                          >
                            <i className="fa fa-trash-o" aria-hidden="true" />
                            &nbsp;Delete
                          </button>
                          <button
                            type="button"
                            value="Activate"
                            className="btn btn-success btn-sm"
                            name="Activate"
                          >
                            <i
                              className="fa fa-check-circle"
                              style={{ color: "white !important" }}
                              aria-hidden="true"
                            />
                            &nbsp;Activate
                          </button>
                          <button
                            type="button"
                            value="Deactivate"
                            className="btn btn-deactivate btn-sm"
                            name="Deactivate"
                          >
                            <i
                              className="fa fa-times-circle"
                              style={{ color: "grey!important" }}
                              aria-hidden="true"
                            />
                            &nbsp;Deactivate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-group">
                      <div className="col-md-5">
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
                              <Link
                                className="page-link"
                                to="#"
                                aria-label="Next"
                              >
                                <span aria-hidden="true">»</span>
                              </Link>
                            </li>
                          </ul>
                        </nav>
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
              <div
                id="search_transfer_wrapper"
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
                        className="table table-bordered   table-responsive dataTable no-footer"
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
                              style={{ width: "71.2px" }}
                            >
                              <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="selectAll"
                                  id="selectAll"
                                  style={{ marginLeft: "-13px" }}
                                  onChange={handleSelectAll}
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
                              aria-label="City Name: activate to sort column ascending"
                              style={{ width: "284.2px" }}
                            >
                              City Name
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="search_sup"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="City Code: activate to sort column ascending"
                              style={{ width: "325.2px" }}
                            >
                              City Code
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="search_sup"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Country: activate to sort column ascending"
                              style={{ width: "118.2px" }}
                            >
                              Country
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="search_sup"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Mapped/Unmapped: activate to sort column ascending"
                              style={{ width: "231.2px" }}
                            >
                              Mapped/Unmapped
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="search_sup"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Blocked: activate to sort column ascending"
                              style={{ width: "115.2px" }}
                            >
                              Blocked
                            </th>
                            <th
                              className="no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Actions"
                              style={{ width: "208px" }}
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
                                  defaultValue={140388}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>Çamardı</td>
                            <td>93_3000400610_18885_140387</td>
                            <td>Turkey</td>
                            <td>
                              <Link to="city.php?action=view&id=140388&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie140388">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=140388&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=140388&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={139714}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>10th of Ramadan City</td>
                            <td>139714</td>
                            <td>Egypt</td>
                            <td>
                              <Link to="city.php?action=view&id=139714&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie139714">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>11</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=139714&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=139714&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={106713}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>3 valleys mottaret</td>
                            <td>58_149717_211015_106712</td>
                            <td>France</td>
                            <td>
                              <Link to="city.php?action=view&id=106713&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie106713">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=106713&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=106713&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={78691}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>6th of october city</td>
                            <td>155_68314_9709</td>
                            <td>Egypt</td>
                            <td>
                              <Link to="city.php?action=view&id=78691&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie78691">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>3</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=78691&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=78691&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121623}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Airoa</td>
                            <td>90_6349906_813317_121622</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121623&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121623">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121623&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121623&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121624}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Ameixenda</td>
                            <td>90_6349240_816491_121623</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121624&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121624">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121624&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121624&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121625}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Bana</td>
                            <td>90_6338632_884518_121624</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121625&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121625">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121625&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121625&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121626}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Brea</td>
                            <td>90_6349195_51878_121625</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121626&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121626">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121626&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121626&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121627}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Cachada</td>
                            <td>90_6349645_757623_121626</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121627&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121627">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121627&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121627&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121628}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Caniza</td>
                            <td>90_6349727_463999_121627</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121628&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121628">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121628&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121628&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={81722}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A capela</td>
                            <td>90_142565_3476</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=81722&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie81722">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=81722&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=81722&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121630}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Carrasca</td>
                            <td>90_6349646_396635_121629</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121630&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121630">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121630&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121630&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121631}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Ermida</td>
                            <td>90_6349197_3464_121630</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121631&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121631">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121631&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121631&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121632}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Guarda</td>
                            <td>90_6202412_692227_121631</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121632&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121632">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121632&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121632&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121633}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Gudina</td>
                            <td>90_6350288_486749_121632</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121633&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121633">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121633&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121633&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121634}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Igrexa</td>
                            <td>90_6349200_116391_121633</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121634&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121634">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121634&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121634&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121635}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Lama</td>
                            <td>90_6351571_67180_121634</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121635&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121635">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121635&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121635&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121636}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Lanzada</td>
                            <td>90_6344748_706844_121635</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121636&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121636">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121636&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121636&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={106617}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A lanzada - pontevedra</td>
                            <td>90_283015_9220</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=106617&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie106617">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=106617&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=106617&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121637}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Lanzada Beach</td>
                            <td>90_6121771_625571_121636</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121637&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121637">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121637&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121637&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121638}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Lobagueira</td>
                            <td>90_6349908_730907_121637</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121638&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121638">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121638&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121638&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121639}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Mezquita</td>
                            <td>90_6126443_500775_121638</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121639&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121639">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121639&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121639&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121640}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Moreira</td>
                            <td>90_6349651_441757_121639</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121640&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121640">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121640&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121640&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121641}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Peregrina</td>
                            <td>90_6349399_915584_121640</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121641&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121641">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121641&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121641&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
                                  >
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
                                  defaultValue={121642}
                                  style={{
                                    position: "absolute",
                                    marginLeft: "-20px",
                                  }}
                                />
                                <label htmlFor="del[]" />
                              </div>
                            </td>
                            <td>A Peroxa</td>
                            <td>90_6350000_278208_121641</td>
                            <td>Spain</td>
                            <td>
                              <Link to="city.php?action=view&id=121642&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=">
                                <span className="pieChart" id="pie121642">
                                  <canvas
                                    width={45}
                                    height={45}
                                    style={{
                                      display: "inline-block",
                                      width: "45px",
                                      height: "45px",
                                      verticalAlign: "top",
                                    }}
                                  />
                                </span>
                              </Link>
                            </td>
                            <td>
                              <h5>1</h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALSUPPLIER
                                    }
                                    alt="Map Supplier"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Map Supplier"
                                  >
                                    <i className="fa fa-sitemap" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .TOOLSMAPPINGCITIESMANUALVIEW
                                    }
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: confirm_inactive('city.php?action=inactive&id=121642&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    // to="Javascript: showDeleteAlert1('Are You Sure you want to delete?','city.php?action=delete&id=121642&Search=Y&Search_city_name=&Search_city_code=&Search_sel_countries=0&next=');"
                                    alt="Delete"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Delete"
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
                <div className="row">
                  <div className="col-sm-6">
                    <div
                      className="dataTables_info"
                      id="search_transfer_info"
                      role="status"
                      aria-live="polite"
                    ></div>
                  </div>
                  <div className="col-sm-6" />
                </div>
              </div>
              <div className="form-group no-result">
                <h5 className="text-center">No result found.</h5>
              </div>
              <br />
              <div className="row pd_tp">
                <div className="row">
                  <div className="col-md-4 col_hide">
                    <div className="form-group col-md-12">&nbsp;</div>
                  </div>
                  <div className="col-md-5">
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
                  <div className="col-md-3 col_hide">&nbsp;</div>
                </div>
              </div>
              <br />
              <br />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default CitiesManualSearch;
