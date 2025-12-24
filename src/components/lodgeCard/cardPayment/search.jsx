import { Link } from "react-router-dom";

import React from "react"; // Import React and useState

import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import {
  add_options,
  add_options1,
  search_options2,
  search_options3,
} from "../../../constants/contants";

const SearchCardPayment = () => {
  return (
    <>
      <Header2
        title="SEARCH LODGE CARD "
        linkText1="Search Lodge Card"
        linkText2="Add Lodge Card MApping"
        link2={Constants.URLConstants.ADDCARDPAYMENT}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form name="search_area_from" method="get" action="area.php">
          <div class="panel-body">
            <div class="row">
              <div class="col-md-2 form-group " id="branchList">
                <label>Branch</label>
                <MultiSelect
                  options={add_options}
                  isSearchable
                  placeholder="- Select Branch -"
                  className="custom-select"
                />
              </div>
              <div class="col-md-2 form-group">
                <label>Agent : </label>
                <MultiSelect
                  options={add_options1}
                  isSearchable
                  placeholder="- Select Agent -"
                  className="custom-select"
                />
              </div>
              <div class="col-md-2 form-group">
                <label>Services : </label>
                <MultiSelect
                  options={search_options2}
                  isSearchable
                  placeholder="- Select Services -"
                  className="custom-select"
                />
              </div>
              <div class="col-md-2 form-group">
                <label>Supplier : </label>
                <MultiSelect
                  options={search_options3}
                  isSearchable
                  placeholder="- Select Supplier -"
                  className="custom-select"
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
                  <div class="col-md-5"></div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <nav aria-label="Page navigation example">
                        <ul class="pagination pagination-sm justify-content-center">
                          <li class="page-item active">
                            <Link class="page-link" href="#">
                              1
                            </Link>
                          </li>
                          <li class="page-item">
                            <Link class="page-link" href="#">
                              2
                            </Link>
                          </li>

                          <li class="page-item">
                            <Link class="page-link" href="#" aria-label="Next">
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
                      style={{ textAlign: "right", paddingRight: " 0px" }}
                    >
                      <h5 style={{ display: "inline" }}>
                        <i
                          class="fa fa-search srchWithinPg"
                          id="magnifiers"
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
                        id="search_lodge_map_table1"
                        class="table  table-responsive dataTable no-footer   "
                      >
                        <thead>
                          <tr>
                            <th>Agent Name</th>
                            <th>Services</th>
                            <th>Supplier</th>
                            <th>Last Updated On</th>
                            <th>Last Updated By</th>
                            <th class="no-sort">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr>
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
                              Flight
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            ></td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              14/05/2021{" "}
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              v3otramslive{" "}
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont width_table">
                                <div class="input-group-addon">
                                  <Link
                                    to={Constants.URLConstants.EDITCARDPAYMENT}
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
                                  <Link
                                    href={
                                      Constants.URLConstants.VIEWCARDPAYMENT
                                    }
                                    target="_blank"
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    href="lodge_card.php?action=lodge_card_status_mapping&amp;card_status=inactive&amp;id=6&amp;branch_id=1&amp;agent_id=195"
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
                                  data-placement="top"
                                  title=""
                                  data-original-title="Delete"
                                >
                                  <Link onclick="Javascriptconfirm_delete1('lodge_card.php?action=lodge_card_status_mapping&amp;card_status=delete&amp;id=6&amp;branch_id=1&amp;agent_id=195');">
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
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
                              Flight
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              ALL
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              14/05/2021{" "}
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              v3otramslive{" "}
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont width_table">
                                <div class="input-group-addon">
                                  <Link
                                    to={Constants.URLConstants.EDITCARDPAYMENT}
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
                                  <Link
                                    href={
                                      Constants.URLConstants.VIEWCARDPAYMENT
                                    }
                                    target="_blank"
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    href="lodge_card.php?action=lodge_card_status_mapping&amp;card_status=inactive&amp;id=7&amp;branch_id=1&amp;agent_id=195"
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
                                  data-placement="top"
                                  title=""
                                  data-original-title="Delete"
                                >
                                  <Link onclick="Javascriptconfirm_delete1('lodge_card.php?action=lodge_card_status_mapping&amp;card_status=delete&amp;id=7&amp;branch_id=1&amp;agent_id=195');">
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
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
                              transfer
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              ALL
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              14/05/2021{" "}
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              v3otramslive{" "}
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont width_table">
                                <div class="input-group-addon">
                                  <Link
                                    to={Constants.URLConstants.EDITCARDPAYMENT}
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
                                  <Link
                                    href={
                                      Constants.URLConstants.VIEWCARDPAYMENT
                                    }
                                    target="_blank"
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    href="lodge_card.php?action=lodge_card_status_mapping&amp;card_status=inactive&amp;id=8&amp;branch_id=1&amp;agent_id=195"
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
                                  data-placement="top"
                                  title=""
                                  data-original-title="Delete"
                                >
                                  <Link onclick="Javascriptconfirm_delete1('lodge_card.php?action=lodge_card_status_mapping&amp;card_status=delete&amp;id=8&amp;branch_id=1&amp;agent_id=195');">
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
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
                              Activity
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            ></td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              19/12/2022{" "}
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              v3otramslive{" "}
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont width_table">
                                <div class="input-group-addon">
                                  <Link
                                    to={Constants.URLConstants.EDITCARDPAYMENT}
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
                                  <Link
                                    href={
                                      Constants.URLConstants.VIEWCARDPAYMENT
                                    }
                                    target="_blank"
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    href="lodge_card.php?action=lodge_card_status_mapping&amp;card_status=inactive&amp;id=9&amp;branch_id=1&amp;agent_id=195"
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
                                  data-placement="top"
                                  title=""
                                  data-original-title="Delete"
                                >
                                  <Link onclick="Javascriptconfirm_delete1('lodge_card.php?action=lodge_card_status_mapping&amp;card_status=delete&amp;id=9&amp;branch_id=1&amp;agent_id=195');">
                                    <i class="fa fa-trash"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              moavia_eilago <b> [ CD0313 ] </b>
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              hotel
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              ALL
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              13/12/2022{" "}
                            </td>
                            <td
                              align="center"
                              style={{ textTransform: "capitalize" }}
                            >
                              {" "}
                              v3otramslive{" "}
                            </td>
                            <td align="center" class="actionlink">
                              <div class="actionCont width_table">
                                <div class="input-group-addon">
                                  <Link
                                    to={Constants.URLConstants.EDITCARDPAYMENT}
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
                                  <Link
                                    href={
                                      Constants.URLConstants.VIEWCARDPAYMENT
                                    }
                                    target="_blank"
                                  >
                                    <i class="fa fa-eye"></i>
                                  </Link>
                                </div>
                                <div class="input-group-addon">
                                  <Link
                                    href="lodge_card.php?action=lodge_card_status_mapping&amp;card_status=active&amp;id=63&amp;branch_id=1&amp;agent_id=313"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Click To Activate"
                                  >
                                    <i class="fa fa-times-circle"></i>
                                  </Link>
                                </div>
                                <div
                                  class="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="Delete"
                                >
                                  <Link onclick="Javascriptconfirm_delete1('lodge_card.php?action=lodge_card_status_mapping&amp;card_status=delete&amp;id=63&amp;branch_id=1&amp;agent_id=313');">
                                    <i class="fa fa-trash"></i>
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
                  <div class="col-md-4 col_hide">
                    <div class="form-group col-md-6">&nbsp;</div>
                  </div>
                  <div class="col-md-6 mt-3">
                    <div class="form-group">
                      <nav aria-label="Page navigation example">
                        <ul class="pagination pagination-sm justify-content-center">
                          <li class="page-item active">
                            <Link class="page-link" href="#">
                              1
                            </Link>
                          </li>
                          <li class="page-item">
                            <Link class="page-link" href="#">
                              2
                            </Link>
                          </li>

                          <li class="page-item">
                            <Link class="page-link" href="#" aria-label="Next">
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
export default SearchCardPayment;
