import { Link } from "react-router-dom";

import React from "react"; // Import React and useState

import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import { add_options, add_options1 } from "../../../constants/contants";

const SearchCard = () => {
  return (
    <>
      <Header2
        title="SEARCH LODGE CARD "
        linkText1="Add Lodge Card"
        linkText2="Search Lodge Card"
        link2={Constants.URLConstants.ADDCARD}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form name="search_area_from" method="get" action="area.php">
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3 form-group " id="branchList">
                <label>Branch</label>
                <MultiSelect
                  options={add_options}
                  isSearchable
                  placeholder="- Select Branch -"
                  className="custom-select"
                />
              </div>
              <div class="col-md-3 form-group">
                <label>Agent : </label>
                <MultiSelect
                  options={add_options1}
                  isSearchable
                  placeholder="- Select Agent -"
                  className="custom-select"
                />
              </div>
              <div class="col-md-3 form-group">
                <label>Card Title : </label>
                <input
                  type="text"
                  name="card_title"
                  id="card_title"
                  value=""
                  maxlength="200"
                  class="form-control form-control-sm"
                />
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-3 form-group">
                <span id="submit_td">
                  <button
                    class="btn btn-dark btn-sm"
                    type="button"
                    name="submit"
                    value="search"
                    onclick="callAjaxSubmit(document.forms['lodge_card_module'],'1')"
                  >
                    <i class="fa fa-search"></i> Search
                  </button>
                </span>
                &nbsp;&nbsp;
                <button
                  class="btn btn-outline-secondary btn-sm"
                  type="button"
                  id="reset"
                  name="reset"
                  value="Reset"
                  onclick="resetAll();"
                >
                  <i class="fa fa-repeat"></i> &nbsp;Reset
                </button>
              </div>
            </div>
          </div>
        </form>
        <br />
        <form>
          <div class="panel-body removeMargins">
            <div class="dataTables_scroll">
              <div class="row pd_tp mt-2">
                <div class="row mt-2">
                  <div class="col-md-6"></div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <nav aria-label="Page navigation example">
                        <ul class="pagination pagination-sm justify-content-center">
                          <li class="page-item active">
                            <Link class="page-link" to="#">
                              1
                            </Link>
                          </li>
                          <li class="page-item">
                            <Link class="page-link" to="#">
                              2
                            </Link>
                          </li>
                          <li class="page-item">
                            <Link class="page-link" to="#">
                              3
                            </Link>
                          </li>

                          <li class="page-item">
                            <Link class="page-link" to="#" aria-label="Next">
                              <span aria-hidden="true">&raquo;</span>
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div class="col-md-1"></div>
                  <div class="col-md-2">
                    <div
                      class="form-group col-md-2 new_search_icon"
                      style={{ textAlign: " right" }}
                    >
                      <h5 style={{ display: "inline" }}>
                        <i
                          class="fa fa-search srchWithinPg"
                          id="mag nifiers"
                          data-toggle="tooltip"
                          data-placement="top"
                          data-original-title="Search within this table"
                        ></i>
                      </h5>
                    </div>
                    <div class="form-group col-md-10 bookingsrc">
                      <input
                        type="text"
                        class="tablesearch form-control form-control-sm search_new"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                id="search_transfer_wrapper"
                class="dataTables_wrapper form-inline dt-bootstrap no-footer"
              >
                <div class="row">
                  <div class="col-sm-6"></div>
                  <div class="col-sm-6"></div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div
                      class="doubleScroll-scroll-wrapper"
                      id="wrapper1"
                      style={{ height: "20px", width: "1320px" }}
                    >
                      <div
                        class="suwala-doubleScroll-scroll"
                        style={{ height: "20px", width: "1320px" }}
                      ></div>
                    </div>
                    <div id="wrapper2" style={{ overflow: " auto" }}>
                      <table
                        id="search_lodge_table1"
                        class="table table-bordered table-responsive dataTable no-footer   "
                      >
                        <thead>
                          <tr>
                            <th>Card Title</th>
                            <th>Agent Name</th>
                            <th>Last Updated On</th>
                            <th>Last Updated By</th>
                            <th>Token Updated On</th>
                            <th>Token Last Use On</th>
                            <th class="no-sort">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              Master Card
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              Vartak Holidazzle <b> [ CD0195 ] </b>
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              13/05/2021{" "}
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              v3otramslive{" "}
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              13/05/2021 18:48:18
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              13/05/2021 18:48:18
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont width_table">
                                <div class="input-group-addon">
                                  <Link to={Constants.URLConstants.EDITCARD}>
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div
                                  class="input-group-addon"
                                  data-toggle="tooltip"
                                  data-original-title="View"
                                  data-placement="top"
                                >
                                  <Link
                                    to={Constants.URLConstants.VIEWCARD}
                                    target="_blank"
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to="lodge_card.php?action=lodge_card_status&amp;card_status=inactive&amp;id=1&amp;card_title=Master Card&amp;branch_id=1&amp;agent_id=195"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div
                                  class="input-group-addon"
                                  data-toggle="tooltip"
                                  data-original-title="card token status"
                                  data-placement="top"
                                  style={{ color: "#2b8600" }}
                                >
                                  <i class="fa fa-credit-card"></i>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              American Express
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              Vartak Holidazzle <b> [ CD0195 ] </b>
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              13/05/2021{" "}
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              v3otramslive{" "}
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              13/05/2021 18:48:50
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              13/05/2021 18:48:50
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont width_table">
                                <div class="input-group-addon">
                                  <Link
                                    to="LodgeCardEdit.html"
                                    data-toggle="tooltip"
                                    data-original-title="Edit"
                                    data-placement="top"
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div
                                  class="input-group-addon"
                                  data-toggle="tooltip"
                                  data-original-title="View"
                                  data-placement="top"
                                >
                                  <Link to="LodgeCardView.html" target="_blank">
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to="lodge_card.php?action=lodge_card_status&amp;card_status=inactive&amp;id=2&amp;card_title=American Express&amp;branch_id=1&amp;agent_id=195"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div
                                  class="input-group-addon"
                                  data-toggle="tooltip"
                                  data-original-title="card token status"
                                  data-placement="top"
                                  style={{ color: "#2b8600" }}
                                >
                                  <i class="fa fa-credit-card"></i>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              JCB Card
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              Vartak Holidazzle <b> [ CD0195 ] </b>
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              13/05/2021{" "}
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              v3otramslive{" "}
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              13/05/2021 18:49:39
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              13/05/2021 18:49:39
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont width_table">
                                <div class="input-group-addon">
                                  <Link
                                    to="LodgeCardEdit.html"
                                    data-toggle="tooltip"
                                    data-original-title="Edit"
                                    data-placement="top"
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div
                                  class="input-group-addon"
                                  data-toggle="tooltip"
                                  data-original-title="View"
                                  data-placement="top"
                                >
                                  <Link to="LodgeCardView.html" target="_blank">
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to="lodge_card.php?action=lodge_card_status&amp;card_status=inactive&amp;id=3&amp;card_title=JCB Card&amp;branch_id=1&amp;agent_id=195"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div
                                  class="input-group-addon"
                                  data-toggle="tooltip"
                                  data-original-title="card token status"
                                  data-placement="top"
                                  style={{ color: "#2b8600" }}
                                >
                                  <i class="fa fa-credit-card"></i>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              Discover Card
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              Vartak Holidazzle <b> [ CD0195 ] </b>
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              13/05/2021{" "}
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              v3otramslive{" "}
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              13/05/2021 18:50:18
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              13/05/2021 18:50:18
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont width_table">
                                <div class="input-group-addon">
                                  <Link
                                    to="LodgeCardEdit.html"
                                    data-toggle="tooltip"
                                    data-original-title="Edit"
                                    data-placement="top"
                                  >
                                    <i class="fa fa-pencil-square-o"></i>
                                  </Link>
                                </div>
                                <div
                                  class="input-group-addon"
                                  data-toggle="tooltip"
                                  data-original-title="View"
                                  data-placement="top"
                                >
                                  <Link to="LodgeCardView.html" target="_blank">
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    to="lodge_card.php?action=lodge_card_status&amp;card_status=inactive&amp;id=4&amp;card_title=Discover Card&amp;branch_id=1&amp;agent_id=195"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Deactivate"
                                  >
                                    <i class="fa fa-check-circle"></i>
                                  </Link>
                                </div>
                                <div
                                  class="input-group-addon"
                                  data-toggle="tooltip"
                                  data-original-title="card token status"
                                  data-placement="top"
                                  style={{ color: "#2b8600" }}
                                >
                                  <i class="fa fa-credit-card"></i>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div
                      class="dataTables_info"
                      id="search_transfer_info"
                      role="status"
                      aria-live="polite"
                    ></div>
                  </div>
                  <div class="col-sm-6"></div>
                </div>
              </div>

              <div class="row pd_tp">
                <div class="row">
                  <div class="col-md-5 col_hide">
                    <div class="form-group col-md-6">&nbsp;</div>
                  </div>
                  <div class="col-md-5 mt-3">
                    <div class="form-group">
                      <nav aria-label="Page navigation example">
                        <ul class="pagination pagination-sm justify-content-center">
                          <li class="page-item active">
                            <Link class="page-link" to="#">
                              1
                            </Link>
                          </li>
                          <li class="page-item">
                            <Link class="page-link" to="#">
                              2
                            </Link>
                          </li>
                          <li class="page-item">
                            <Link class="page-link" to="#">
                              3
                            </Link>
                          </li>

                          <li class="page-item">
                            <Link class="page-link" to="#" aria-label="Next">
                              <span aria-hidden="true">&raquo;</span>
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div class="col-md-2 col_hide">&nbsp;</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default SearchCard;
