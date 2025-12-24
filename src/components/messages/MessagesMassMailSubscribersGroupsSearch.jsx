import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
const MessagesMassMailSubscribersGroupSearch = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="SUBSCRIBER SEARCH CRITERIA"
          linkText1="List Subscriber Group"
          linkText2="Add Subscriber Group"
          link2={Constants.URLConstants.MESSAGESMASSMAILSUBSCRIBERGROUPNEW}
        />

        {/* First Row*/}
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-3 form-group">
                <label>Subscriber Group Name</label>{" "}
                <input
                  className="form-control  form-control-sm test123"
                  type="textbox"
                  name="name_search"
                />
              </div>
              <div className="col-md-3 form-group">
                <label>From Name</label>{" "}
                <input
                  className="form-control form-control-sm"
                  type="textbox"
                  name="from_name_search"
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Reply-to Email</label>{" "}
                <input
                  className="form-control form-control-sm"
                  type="textbox"
                  name="reply_to_search"
                />
              </div>
            </div>
            <br />
            <div className="col-md-12 form-group">
              <button
                type="button"
                className="btn btn-dark btn-sm"
                name="submit1"
                value="Search"
                onclick="callmesubmit();"
              >
                <i className="fa fa-search" aria-hidden="true" /> &nbsp;Search
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
                          aria-hidden="true"
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
                            aria-label="Subscriber Group Name 
                                              
                                       
                                              
                                      
                                      : activate to sort column ascending"
                            style={{ width: "344.2px" }}
                          >
                            Subscriber Group Name{" "}
                            <a href="subscriber_list.php?sort_by=name&direction=up&name_search=&from_name_search=&reply_to_search=">
                              <img
                                src="images/up_arrow.gif"
                                alt=""
                                border={0}
                                height={5}
                                width={9}
                              />
                            </a>{" "}
                            <a href="subscriber_list.php?sort_by=name&direction=down&name_search=&from_name_search=&reply_to_search=">
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
                            aria-label="From Name 
                                              
                                       
                                              
                                      
                                      : activate to sort column ascending"
                            style={{ width: "176.2px" }}
                          >
                            From Name{" "}
                            <a href="subscriber_list.php?sort_by=from_name&direction=up&name_search=&from_name_search=&reply_to_search=">
                              <img
                                src="images/up_arrow.gif"
                                alt=""
                                border={0}
                                height={5}
                                width={9}
                              />
                            </a>{" "}
                            <a href="subscriber_list.php?sort_by=from_name&direction=down&name_search=&from_name_search=&reply_to_search=">
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
                            aria-label="Reply-to Email 
                                              
                                       
                                              
                                      
                                      : activate to sort column ascending"
                            style={{ width: "470.2px" }}
                          >
                            Reply-to Email
                            <a href="subscriber_list.php?sort_by=reply_to_email&direction=up&name_search=&from_name_search=&reply_to_search=">
                              <img
                                src="images/up_arrow.gif"
                                alt=""
                                border={0}
                                height={5}
                                width={9}
                              />
                            </a>{" "}
                            <a href="subscriber_list.php?sort_by=reply_to_email&direction=down&name_search=&from_name_search=&reply_to_search=">
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
                            aria-label="Created On"
                            style={{ width: "163.2px" }}
                          >
                            Created On
                          </th>
                          <th
                            className="no-sort sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="Actions"
                            style={{ width: "246px" }}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="phps_row_1 odd" role="row">
                          <td>
                            Qtech Profile
                            <br />1 Subscribers
                          </td>
                          <td>Greetings</td>
                          <td>nida.ansari@qtechsoftware.com</td>
                          {/*td>2016-05-06 04:17:29</td*/}
                          <td align="center">
                            {/*18-Sep-2015 15:48:43 */}
                            <div
                              className="dateWrapper withTime"
                              style={{ marginTop: "17px" }}
                            >
                              <div className="onlyDate">06</div>
                              <div className="monthYear">
                                May
                                <br />
                                2016
                              </div>
                            </div>
                            <div className="secCont">04:17</div>
                          </td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants
                                      .MESSAGESMASSMAILSUBSCRIBERGROUPEDIT
                                  }
                                >
                                  {/* <img src="images/edit.gif" border=0 data-toggle="tooltip" data-placement="top" alt="Edit" title="Edit"> */}
                                  <i
                                    className="fa fa-pencil-square-o"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title
                                    data-original-title="Edit"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants
                                      .MESSAGESMASSMAILSUBSCRIBERGROUPVIEW
                                  }
                                >
                                  {/* <img src="images/view.gif" border=0 data-toggle="tooltip" data-placement="top" alt="View" title="View"> */}
                                  <i
                                    className="fa fa-eye"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    alt="View"
                                    title
                                    data-original-title="View"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants
                                      .MESSAGESMASSMAILSUBSCRIBERSEARCH
                                  }
                                >
                                  {/* <img src="images/managelist.gif" border=0 data-toggle="tooltip" data-placement="top" alt="Manage List" title="Manage List"> */}
                                  <i
                                    className="fa fa-list"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    alt="Manage List"
                                    title
                                    data-original-title="Manage List"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div
                                id="div_plus_1"
                                className="input-group-addon"
                                data-bs-toggle="modal"
                                data-bs-target="#div_detail_1"
                              >
                                <Link
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  alt="Add Duplicate List"
                                  title
                                  onclick="getSubscriberList('1'); document.getElementById('div_detail_1').style.display = 'block';"
                                  style={{ cursor: "pointer" }}
                                  data-original-title="Add Duplicate List"
                                >
                                  <i
                                    className="fa fa-files-o"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants
                                      .MESSAGESADDSUBSCRIBERS
                                  }
                                >
                                  <i
                                    className="fa fa-plus"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    alt="Add Addresses"
                                    title
                                    data-original-title="Add Addresses"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={Constants.URLConstants.MESSAGESIMPORTCSV}
                                >
                                  <i
                                    className="fa fa-file-text"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    alt="Import to CSV"
                                    title
                                    data-original-title="Import to CSV"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link href=":confirm_delete('delete','1');">
                                  <i
                                    className="fa fa-trash"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    alt="Delete"
                                    title
                                    data-original-title="Delete"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                            </div>
                            <table
                              cellSpacing={0}
                              width="100%"
                              align="center"
                              border={0}
                            >
                              <tbody className="bg-white">
                                <tr></tr>
                              </tbody>
                            </table>{" "}
                            {/* modal box to show duplicate list */}
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
        {/* End */}

        <div>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n  .fa.fa-times-circle.closeBtn {\n    font-size: 1.3em!important;\n    position: absolute;\n    float: right;\n    right: 0px;\n    top: 0px;\n    margin-right: -10px;\n    margin-top: -112px;\n    background-color: white;\n    border-radius: 15px;\n    color: #000!important;\n    cursor: pointer;\n}\n\n",
            }}
          />
          <div
            className="modal fade"
            id="div_detail_1"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div
                className="modal-content"
                style={{ width: "550px", marginTop: "175px" }}
              >
                <div className="color-linegreen"></div>
                <div className="modal-header">
                  <div className="siteLogo">
                    <img
                      src="https://beta.tdonlines.com//images/logo.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="modalForm" style={{ height: "200px" }}>
                    <div className="panel-heading">Duplicate the List</div>
                    <div
                      id="loading_1"
                      style={{
                        position: "absolute",
                        display: "none",
                        left: "50%",
                        top: "50%",
                      }}
                    >
                      <img src="images/indicator.gif" alt="" />
                    </div>
                    <div className="row">
                      <div className="form-group col-xs-12">
                        <div id="datadisplay_1">
                          <label>Name the new List</label>
                          <input
                            type="text"
                            name="txt_name_1"
                            id="txt_name_1"
                            className="form-control"
                          />
                          <br />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-xs-12">
                        <div id="dataButton_1" style={{ display: "block" }}>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            type="button"
                            name="btn_submit"
                          >
                            <i
                              className="fa fa-pencil-square-o"
                              style={{ color: "#fff !important" }}
                            />
                            &nbsp;Create
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span
                    className="fa fa-times-circle fa-4 closeBtn"
                    data-bs-dismiss="modal"
                    onclick="document.getElementById('div_detail_1').style.display = 'none';"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MessagesMassMailSubscribersGroupSearch;
