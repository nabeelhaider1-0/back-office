import { Link } from "react-router-dom";

import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
const MastersBanksSearch = () => {
  return (
    <>
      <Header2
        title="ADD BANK"
        linkText1="Banks"
        linkText2="Add Banks"
        link2={Constants.URLConstants.MASTERSBANKSNEW}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form name="search_area_from" method="get" action="area.php">
          <div className="panel-body removeMargins">
            <div className="dataTables_scroll">
              <div className="row pd">
                <div className="row">
                  <div className="col-md-5"></div>
                  <div className="col-md-3 col_hide"></div>
                  <div className="col-md-2" />
                  <div className="col-md-2">
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
              {/* <div class="table-responsive overflw" data-pattern="priority-columns"> */}
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
                        id="bank_details"
                        className="table table-bordered   table-responsive dataTable no-footer"
                        role="grid"
                        aria-describedby="bank_details_info"
                        style={{ width: "1510px" }}
                      >
                        <thead>
                          <tr role="row">
                            <td
                              align="center"
                              width="10%"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "227.2px" }}
                            >
                              &nbsp;Bank Name
                            </td>
                            <td
                              align="center"
                              width="15%"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "346.2px" }}
                            >
                              &nbsp;Address
                            </td>
                            <td
                              align="center"
                              width="15%"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "346.2px" }}
                            >
                              &nbsp;Branch
                            </td>
                            <td
                              align="center"
                              width="23%"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "539px" }}
                            >
                              &nbsp;Actions
                            </td>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr className="phps_row_1 odd" role="row">
                            <td align="center">&nbsp;COMMERCIAL BANK</td>
                            <td align="center">&nbsp;None</td>
                            <td align="center">&nbsp;Saudi Branch</td>
                            <td align="center" className="actionlink">
                              <div className="actionCont width_table">
                                <div className="input-group-addon">
                                  <Link
                                    data-toggle="tooltip"
                                    data-original-title="Edit"
                                    data-placement="top"
                                    to={Constants.URLConstants.MASTERSBANKSEDIT}
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    data-toggle="tooltip"
                                    data-original-title="Click to Deactivate"
                                    to="add_bank.php?action=hide&id=6"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    to="Javascript confirm_delete('add_bank.php?action=delete&id=6');"
                                  >
                                    <i className="fa fa-trash" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td align="center">&nbsp;HDFC</td>
                            <td align="center">&nbsp;None</td>
                            <td align="center">&nbsp;Saudi Branch</td>
                            <td align="center" className="actionlink">
                              <div className="actionCont width_table">
                                <div className="input-group-addon">
                                  <Link
                                    data-toggle="tooltip"
                                    data-original-title="Edit"
                                    data-placement="top"
                                    to={Constants.URLConstants.MASTERSBANKSEDIT}
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    data-toggle="tooltip"
                                    data-original-title="Click to Deactivate"
                                    to="add_bank.php?action=hide&id=4"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    to="Javascript confirm_delete('add_bank.php?action=delete&id=4');"
                                  >
                                    <i className="fa fa-trash" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td align="center">&nbsp;ICICI</td>
                            <td align="center">&nbsp;None</td>
                            <td align="center">&nbsp;Saudi Branch</td>
                            <td align="center" className="actionlink">
                              <div className="actionCont width_table">
                                <div className="input-group-addon">
                                  <Link
                                    data-toggle="tooltip"
                                    data-original-title="Edit"
                                    data-placement="top"
                                    to={Constants.URLConstants.MASTERSBANKSEDIT}
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    data-toggle="tooltip"
                                    data-original-title="Click to Deactivate"
                                    to="add_bank.php?action=hide&id=1"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    to="Javascript confirm_delete('add_bank.php?action=delete&id=1');"
                                  >
                                    <i className="fa fa-trash" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td align="center">&nbsp;Mashreq</td>
                            <td align="center">&nbsp;None</td>
                            <td align="center">&nbsp;Saudi Branch</td>
                            <td align="center" className="actionlink">
                              <div className="actionCont width_table">
                                <div className="input-group-addon">
                                  <Link
                                    data-toggle="tooltip"
                                    data-original-title="Edit"
                                    data-placement="top"
                                    to={Constants.URLConstants.MASTERSBANKSEDIT}
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    data-toggle="tooltip"
                                    data-original-title="Click to Deactivate"
                                    to="add_bank.php?action=hide&id=5"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    to="Javascript confirm_delete('add_bank.php?action=delete&id=5');"
                                  >
                                    <i className="fa fa-trash" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td align="center">&nbsp;RATNAKAR</td>
                            <td align="center">&nbsp;None</td>
                            <td align="center">&nbsp;Mumbai Branch</td>
                            <td align="center" className="actionlink">
                              <div className="actionCont width_table">
                                <div className="input-group-addon">
                                  <Link
                                    data-toggle="tooltip"
                                    data-original-title="Edit"
                                    data-placement="top"
                                    to={Constants.URLConstants.MASTERSBANKSEDIT}
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    data-toggle="tooltip"
                                    data-original-title="Click to Deactivate"
                                    to="add_bank.php?action=hide&id=10"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    to="Javascript confirm_delete('add_bank.php?action=delete&id=10');"
                                  >
                                    <i className="fa fa-trash" />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td align="center">&nbsp;State Bank of India </td>
                            <td align="center">&nbsp;this is for test</td>
                            <td align="center">&nbsp;Mumbai Branch</td>
                            <td align="center" className="actionlink">
                              <div className="actionCont width_table">
                                <div className="input-group-addon">
                                  <Link
                                    data-toggle="tooltip"
                                    data-original-title="Edit"
                                    data-placement="top"
                                    to={Constants.URLConstants.MASTERSBANKSEDIT}
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    data-toggle="tooltip"
                                    data-original-title="Click to Deactivate"
                                    to="add_bank.php?action=hide&id=11"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    to="Javascript confirm_delete('add_bank.php?action=delete&id=11');"
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
                <h5 className="text-center">
                  Use Search Criteria to Match Your Requirement.
                </h5>
              </div>
              <div className="row pd_tp">
                <div className="row">
                  <div className="col-md-4 col_hide">
                    <div className="form-group col-md-6">&nbsp;</div>
                  </div>
                  <div className="col-md-5"></div>
                  <div className="col-md-3 col_hide">&nbsp;</div>
                </div>
              </div>
              <br />
              <br />
              {/* </div> */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default MastersBanksSearch;
