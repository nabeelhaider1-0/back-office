import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";

const MastersOfferCodes = () => {
  return (
    <>
      <Header2
        title="SEARCH OFFER/DISCOUNT"
        linkText1="Search Applicable Offer Discounts"
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body removeMargins">
            <div id="mesID" style={{ display: "none" }} />
            <div className="dataTables_scroll">
              {/* <div class="table-responsive overflw" data-pattern="priority-columns"> */}
              <div className="row pd_tp">
                <div className="row">
                  <div className="col-md-4 col_hide">&nbsp;</div>
                  <div className="col-md-6">
                    <div className="form-group" />
                  </div>
                  <div className="col-md-2">
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
                id="search_controller_wrapper"
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
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "301px" }}
                            >
                              OFFER NAME
                            </th>
                            <th
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "391px" }}
                            >
                              OFFER TYPE CODE
                            </th>
                            <th
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "228px" }}
                            >
                              USER ID
                            </th>
                            <th
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "352px" }}
                            >
                              ACTIONS
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr role="row" className="odd">
                            <td>Early Bird</td>
                            <td>EBD</td>
                            <td>otrams</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  alt="Edit"
                                  title
                                  data-original-title="Edit"
                                >
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSOFFERCODEEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Click To Deactivate"
                                >
                                  <a href="applicable_offer.php?action=deactive_applicable_offer&code=EBD">
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Delete"
                                >
                                  <a href="applicable_offer.php?action=delete_applicable_offer&code=EBD">
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr role="row" className="even">
                            <td>Stay Pay</td>
                            <td>SP</td>
                            <td>otrams</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  alt="Edit"
                                  title
                                  data-original-title="Edit"
                                >
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSOFFERCODEEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Click To Deactivate"
                                >
                                  <a href="applicable_offer.php?action=deactive_applicable_offer&code=SP">
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Delete"
                                >
                                  <a href="applicable_offer.php?action=delete_applicable_offer&code=SP">
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr role="row" className="odd">
                            <td>Long Stay</td>
                            <td>LS</td>
                            <td>otrams</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  alt="Edit"
                                  title
                                  data-original-title="Edit"
                                >
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSOFFERCODEEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Click To Deactivate"
                                >
                                  <a href="applicable_offer.php?action=deactive_applicable_offer&code=LS">
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Delete"
                                >
                                  <a href="applicable_offer.php?action=delete_applicable_offer&code=LS">
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr role="row" className="even">
                            <td>MARK UP</td>
                            <td>MP</td>
                            <td>otrams</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  alt="Edit"
                                  title
                                  data-original-title="Edit"
                                >
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSOFFERCODEEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Click To Deactivate"
                                >
                                  <a href="applicable_offer.php?action=deactive_applicable_offer&code=MP">
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Delete"
                                >
                                  <a href="applicable_offer.php?action=delete_applicable_offer&code=MP">
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr role="row" className="odd">
                            <td>Discount</td>
                            <td>DIS</td>
                            <td>otrams</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  alt="Edit"
                                  title
                                  data-original-title="Edit"
                                >
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSOFFERCODEEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Click To Deactivate"
                                >
                                  <a href="applicable_offer.php?action=deactive_applicable_offer&code=DIS">
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Delete"
                                >
                                  <a href="applicable_offer.php?action=delete_applicable_offer&code=DIS">
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr role="row" className="even">
                            <td>Promotion</td>
                            <td>PM</td>
                            <td>otrams</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  alt="Edit"
                                  title
                                  data-original-title="Edit"
                                >
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSOFFERCODEEDIT
                                    }
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Click To Deactivate"
                                >
                                  <a href="applicable_offer.php?action=deactive_applicable_offer&code=PM">
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Delete"
                                >
                                  <a href="applicable_offer.php?action=delete_applicable_offer&code=PM">
                                    <i className="fa fa-trash" />
                                  </a>
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
                <h5 className="text-center">No Result Found.</h5>
              </div>
              <br />
              <div className="row pd_tp">
                <div className="row">
                  <div className="col-md-4 col_hide">&nbsp;</div>
                  <div className="col-md-5">
                    <div className="form-group" />
                  </div>
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
export default MastersOfferCodes;
