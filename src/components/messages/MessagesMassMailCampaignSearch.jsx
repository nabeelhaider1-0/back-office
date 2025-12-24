import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import Constants from "../../constants/routes";
import { statusSearchOptions } from "../../constants/contants";

const MessagesMassMailCampaignSearch = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="CAMPAIGN SEARCH CRITERIA"
          linkText1="List Campaigns"
          linkText2="Add Campaigns"
          link2={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANNEW}
        />

        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-3 form-group">
                  <label>Campaign Name</label>
                  <input
                    type="textbox"
                    name="name_search"
                    className="form-control form-control-sm test123"
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Status</label>
                  <MultiSelect
                    options={statusSearchOptions}
                    isSearchable
                    placeholder="- Select Status -"
                    noOptionsMessage={() => "No Status Found"}
                    className="custom-select"
                  />
                </div>
              </div>
              <br />
              <div className="col-md-12 form-group ">
                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  name="submit1"
                  value="Search"
                  onclick="callmesubmit();"
                >
                  <i className="fa fa-search" />
                  &nbsp;Search
                </button>
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
                            "\n                  .table tr[visible='false'],\n                  .no-result {\n                    display: none;\n                    border: 1px solid #ddd;\n                    padding: 10px;\n                    margin-top: -2px;\n                  }\n\n                  .table tr[visible='true'] {\n                    display: table-row;\n                  }\n\n                  .counter {\n                    padding: 8px;\n                    color: #ccc;\n                  }\n\n                  .search_new {\n                    float: right;\n                    height: 35px;\n                    margin-bottom: 0px;\n                    padding-left: 5px;\n                  }\n                ",
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
                              className="sorting"
                              tabIndex={0}
                              aria-controls="search_sup"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Campaign Name
											
											
										: activate to sort column ascending"
                              style={{ width: "444.2px" }}
                            >
                              Campaign Name
                              <Link to="campaigns.php?sort_by=name&direction=up&">
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link to="campaigns.php?sort_by=name&direction=down&">
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </th>
                            <th
                              className="no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Created On"
                              style={{ width: "315.2px" }}
                            >
                              Created On
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="search_sup"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Status
											
											
										: activate to sort column ascending"
                              style={{ width: "271.2px" }}
                            >
                              Status
                              <Link to="campaigns.php?sort_by=status&direction=up&">
                                <img
                                  src="images/up_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                              <Link to="campaigns.php?sort_by=status&direction=down&">
                                <img
                                  src="images/down_arrow.gif"
                                  alt=""
                                  border={0}
                                  height={5}
                                  width={9}
                                />
                              </Link>
                            </th>
                            <th
                              className="no-sort sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Actions"
                              style={{ width: "391px" }}
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr className="phps_row_1 odd" role="row">
                            <td>Test Mail</td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">04</div>
                                <div className="monthYear">
                                  Dec
                                  <br />
                                  2019
                                </div>
                              </div>
                            </td>
                            <td>
                              <h5>
                                <span className="td_label label-danger">
                                  Inprocess
                                </span>
                              </h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link to="campaigns.php?action=duplicate&cid=1&">
                                    <i
                                      className="fa fa-files-o"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Duplicate"
                                    />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MESSAGESMASSMAILCAMPAIGNANSTEP5
                                    }
                                  >
                                    <i
                                      className="fa fa-pencil-square-o"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Edit"
                                    />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <span className="pointer">
                                    <i
                                      className="fa fa-trash"
                                      style={{ color: "#C1C1C1" }}
                                    />
                                  </span>
                                </div>
                                <div id="div_plus_" />
                                <div
                                  id="div_minus_"
                                  style={{ display: "none" }}
                                  className="input-group-addon"
                                >
                                  <Link
                                    onclick=" document.getElementById('div_minus_').style.display = 'none';document.getElementById('div_plus_').style.display = 'block';document.getElementById('div_detail_').style.display = 'none';"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i
                                      className="fa fa-times"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Cancel Duplicate List"
                                    />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>Nabeel</td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">09</div>
                                <div className="monthYear">
                                  Aug
                                  <br />
                                  2023
                                </div>
                              </div>
                            </td>
                            <td>
                              <h5>
                                <span className="td_label label-default">
                                  Incomplete
                                </span>
                              </h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link to="campaigns.php?action=duplicate&cid=2&">
                                    <i
                                      className="fa fa-files-o"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Duplicate"
                                    />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link to="campaigns.php?action=schedule&cid=2&">
                                    <i
                                      className="fa fa-pencil-square-o"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Edit"
                                    />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to=":campaign_delete('delete','2');"
                                    className="pointer"
                                  >
                                    <i
                                      className="fa fa-trash"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Delete"
                                    />
                                  </Link>
                                </div>
                                <div id="div_plus_" />
                                <div
                                  id="div_minus_"
                                  style={{ display: "none" }}
                                  className="input-group-addon"
                                >
                                  <Link
                                    onclick=" document.getElementById('div_minus_').style.display = 'none';document.getElementById('div_plus_').style.display = 'block';document.getElementById('div_detail_').style.display = 'none';"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i
                                      className="fa fa-times"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Cancel Duplicate List"
                                    />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>Nabeel</td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">09</div>
                                <div className="monthYear">
                                  Aug
                                  <br />
                                  2023
                                </div>
                              </div>
                            </td>
                            <td>
                              <h5>
                                <span className="td_label label-default">
                                  Incomplete
                                </span>
                              </h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link to="campaigns.php?action=duplicate&cid=3&">
                                    <i
                                      className="fa fa-files-o"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Duplicate"
                                    />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link to="campaigns.php?action=schedule&cid=3&">
                                    <i
                                      className="fa fa-pencil-square-o"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Edit"
                                    />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to=":campaign_delete('delete','3');"
                                    className="pointer"
                                  >
                                    <i
                                      className="fa fa-trash"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Delete"
                                    />
                                  </Link>
                                </div>
                                <div id="div_plus_" />
                                <div
                                  id="div_minus_"
                                  style={{ display: "none" }}
                                  className="input-group-addon"
                                >
                                  <Link
                                    onclick=" document.getElementById('div_minus_').style.display = 'none';document.getElementById('div_plus_').style.display = 'block';document.getElementById('div_detail_').style.display = 'none';"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i
                                      className="fa fa-times"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Cancel Duplicate List"
                                    />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>Nabeel</td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">15</div>
                                <div className="monthYear">
                                  Aug
                                  <br />
                                  2023
                                </div>
                              </div>
                            </td>
                            <td>
                              <h5>
                                <span className="td_label label-default">
                                  Incomplete
                                </span>
                              </h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link to="campaigns.php?action=duplicate&cid=4&">
                                    <i
                                      className="fa fa-files-o"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Duplicate"
                                    />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link to="campaigns.php?action=schedule&cid=4&">
                                    <i
                                      className="fa fa-pencil-square-o"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Edit"
                                    />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to=":campaign_delete('delete','4');"
                                    className="pointer"
                                  >
                                    <i
                                      className="fa fa-trash"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Delete"
                                    />
                                  </Link>
                                </div>
                                <div id="div_plus_" />
                                <div
                                  id="div_minus_"
                                  style={{ display: "none" }}
                                  className="input-group-addon"
                                >
                                  <Link
                                    onclick=" document.getElementById('div_minus_').style.display = 'none';document.getElementById('div_plus_').style.display = 'block';document.getElementById('div_detail_').style.display = 'none';"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i
                                      className="fa fa-times"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Cancel Duplicate List"
                                    />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>Nabeel</td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">22</div>
                                <div className="monthYear">
                                  Aug
                                  <br />
                                  2023
                                </div>
                              </div>
                            </td>
                            <td>
                              <h5>
                                <span className="td_label label-default">
                                  Incomplete
                                </span>
                              </h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link to="campaigns.php?action=duplicate&cid=5&">
                                    <i
                                      className="fa fa-files-o"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Duplicate"
                                    />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link to="campaigns.php?action=schedule&cid=5&">
                                    <i
                                      className="fa fa-pencil-square-o"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Edit"
                                    />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to=":campaign_delete('delete','5');"
                                    className="pointer"
                                  >
                                    <i
                                      className="fa fa-trash"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Delete"
                                    />
                                  </Link>
                                </div>
                                <div id="div_plus_" />
                                <div
                                  id="div_minus_"
                                  style={{ display: "none" }}
                                  className="input-group-addon"
                                >
                                  <Link
                                    onclick=" document.getElementById('div_minus_').style.display = 'none';document.getElementById('div_plus_').style.display = 'block';document.getElementById('div_detail_').style.display = 'none';"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i
                                      className="fa fa-times"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Cancel Duplicate List"
                                    />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>Nabeel</td>
                            <td>
                              <div className="dateWrapper">
                                <div className="onlyDate">29</div>
                                <div className="monthYear">
                                  Aug
                                  <br />
                                  2023
                                </div>
                              </div>
                            </td>
                            <td>
                              <h5>
                                <span className="td_label label-default">
                                  Incomplete
                                </span>
                              </h5>
                            </td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link to="campaigns.php?action=duplicate&cid=6&">
                                    <i
                                      className="fa fa-files-o"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Duplicate"
                                    />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link to="campaigns.php?action=schedule&cid=6&">
                                    <i
                                      className="fa fa-pencil-square-o"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Edit"
                                    />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to=":campaign_delete('delete','6');"
                                    className="pointer"
                                  >
                                    <i
                                      className="fa fa-trash"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Delete"
                                    />
                                  </Link>
                                </div>
                                <div id="div_plus_" />
                                <div
                                  id="div_minus_"
                                  style={{ display: "none" }}
                                  className="input-group-addon"
                                >
                                  <Link
                                    onclick=" document.getElementById('div_minus_').style.display = 'none';document.getElementById('div_plus_').style.display = 'block';document.getElementById('div_detail_').style.display = 'none';"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i
                                      className="fa fa-times"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title
                                      data-original-title="Cancel Duplicate List"
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
export default MessagesMassMailCampaignSearch;
