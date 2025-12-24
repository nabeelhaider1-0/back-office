import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import { consultantsOptions, reminder_options } from "../../constants/contants";
const BookingReminderSearch = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="SEARCH NOTE"
          linkText1="Search Note"
          linkText2="Compose Note"
          link2={Constants.URLConstants.BOOKINGSREMINDERNEW}
        />

        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-3 form-group">
                  <label>Message</label>
                  <input
                    type="text"
                    name="Search_Message"
                    size={30}
                    className="form-control form-control-sm test123"
                    defaultValue
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Set By</label>

                  <MultiSelect
                    options={reminder_options}
                    isMulti
                    isSearchable
                    placeholder="- Select -"
                    noOptionsMessage={() => "No Options Found"}
                    className="custom-select "
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Booking ID</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="Search_booking_id"
                    defaultValue
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Assigned to Consultant</label>
                  <MultiSelect
                    options={consultantsOptions}
                    isSearchable
                    placeholder="--Select--"
                    noOptionsMessage={() => "No Consultant Found"}
                    className="custom-select required"
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-3 form-group">
                  <button
                    className="btn btn-dark btn-sm"
                    onclick="javascriptcallSearch(document.forms['search_note_from']);"
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
              <div className="row pd_tp">
                <div className="row">
                  <div className="col-md-4 col_hide">
                    <div className="form-group col-md-12">&nbsp;</div>
                  </div>
                  <div className="col-md-5 col_hide">
                    <div className="custPaging" />
                  </div>
                  <div className="col-md-3">
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
              <div className="row mt-3">
                <div className="col-sm-12">
                  <div
                    className="doubleScroll-scroll-wrapper"
                    id="wrapper1"
                    style={{
                      height: "20px",
                      overflow: "scroll hidden",
                      width: "1491.4px",
                    }}
                  >
                    <div
                      className="suwala-doubleScroll-scroll"
                      style={{ height: "20px", width: "1491px" }}
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
                            style={{ width: "358.2px" }}
                          >
                            &nbsp;Message
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "134.2px" }}
                          >
                            &nbsp;Set By
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "218.2px" }}
                          >
                            &nbsp;Booking Id
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "227.2px" }}
                          >
                            &nbsp;Assigned to
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "170.2px" }}
                          >
                            &nbsp;Set Date
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "309px" }}
                          >
                            &nbsp;Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="phps_row_1 odd" role="row">
                          <td align="center">&nbsp;sadasd ad asd asd</td>
                          <td align="center">&nbsp;195 </td>
                          <td align="center">&nbsp;TD829060</td>
                          <td align="center">&nbsp;</td>
                          {/*<td align=center>&nbsp;30-Aug-2022 15:31:08</td>*/}
                          <td align="center">
                            {/*26-Jul-2023 11:24:32 */}
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">30</div>
                              <div className="monthYear">
                                Aug
                                <br />
                                2022
                              </div>
                            </div>
                            <div className="secCont">15:31</div>
                          </td>
                          <td align="center" className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.BOOKINGSREMINDERSVIEW
                                  }
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  {/*<img src="images/view.gif" border=0 alt="View">*/}
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.BOOKINGSREMINDERSSET
                                  }
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Set Reminder"
                                >
                                  {/*<img src="images/reminder_set_icon.gif" border=0 alt="Set Reminder">*/}
                                  <i class="fa-regular fa-clipboard">
                                    <sub
                                      className="fa-regular fa-clock"
                                      style={{ marginLeft: "-2px" }}
                                    />
                                  </i>
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <a
                                  href="javascript confirm_delete('search_note.php?action=delete&id=5&Search=&Search_Message=&Search_sender=&Search_booking_id=');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Delete"
                                >
                                  {/*<img src="images/delete.gif" alt="Delete" border=0>*/}
                                  <i className="fa fa-trash" />
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td align="center">&nbsp;test notes</td>
                          <td align="center">&nbsp;183 </td>
                          <td align="center">&nbsp;TD903096</td>
                          <td align="center">&nbsp;</td>
                          {/*<td align=center>&nbsp;19-Aug-2019 15:03:08</td>*/}
                          <td align="center">
                            {/*26-Jul-2023 11:24:32 */}
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">19</div>
                              <div className="monthYear">
                                Aug
                                <br />
                                2019
                              </div>
                            </div>
                            <div className="secCont">15:03</div>
                          </td>
                          <td align="center" className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.BOOKINGSREMINDERSVIEW
                                  }
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  {/*<img src="images/view.gif" border=0 alt="View">*/}
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.BOOKINGSREMINDERSSET
                                  }
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Set Reminder"
                                >
                                  {/*<img src="images/reminder_set_icon.gif" border=0 alt="Set Reminder">*/}
                                  <i class="fa-regular fa-clipboard">
                                    <sub
                                      className="fa-regular fa-clock"
                                      style={{ marginLeft: "-2px" }}
                                    />
                                  </i>
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <a
                                  href="javascript confirm_delete('search_note.php?action=delete&id=4&Search=&Search_Message=&Search_sender=&Search_booking_id=');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Delete"
                                >
                                  {/*<img src="images/delete.gif" alt="Delete" border=0>*/}
                                  <i className="fa fa-trash" />
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td align="center">&nbsp;message 1</td>
                          <td align="center">&nbsp;183 </td>
                          <td align="center">&nbsp;TD903078</td>
                          <td align="center">&nbsp;</td>
                          {/*<td align=center>&nbsp;17-Aug-2019 18:15:08</td>*/}
                          <td align="center">
                            {/*26-Jul-2023 11:24:32 */}
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">17</div>
                              <div className="monthYear">
                                Aug
                                <br />
                                2019
                              </div>
                            </div>
                            <div className="secCont">18:15</div>
                          </td>
                          <td align="center" className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.BOOKINGSREMINDERSVIEW
                                  }
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  {/*<img src="images/view.gif" border=0 alt="View">*/}
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.BOOKINGSREMINDERSSET
                                  }
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Set Reminder"
                                >
                                  {/*<img src="images/reminder_set_icon.gif" border=0 alt="Set Reminder">*/}
                                  <i class="fa-regular fa-clipboard">
                                    <sub
                                      className="fa-regular fa-clock"
                                      style={{ marginLeft: "-2px" }}
                                    />
                                  </i>
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <a
                                  href="javascript confirm_delete('search_note.php?action=delete&id=3&Search=&Search_Message=&Search_sender=&Search_booking_id=');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Delete"
                                >
                                  {/*<img src="images/delete.gif" alt="Delete" border=0>*/}
                                  <i className="fa fa-trash" />
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td align="center">&nbsp;test notes</td>
                          <td align="center">&nbsp;183 </td>
                          <td align="center">&nbsp;TD903078</td>
                          <td align="center">&nbsp;</td>
                          {/*<td align=center>&nbsp;17-Aug-2019 18:14:08</td>*/}
                          <td align="center">
                            {/*26-Jul-2023 11:24:32 */}
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">17</div>
                              <div className="monthYear">
                                Aug
                                <br />
                                2019
                              </div>
                            </div>
                            <div className="secCont">18:14</div>
                          </td>
                          <td align="center" className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.BOOKINGSREMINDERSVIEW
                                  }
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  {/*<img src="images/view.gif" border=0 alt="View">*/}
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.BOOKINGSREMINDERSSET
                                  }
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Set Reminder"
                                >
                                  {/*<img src="images/reminder_set_icon.gif" border=0 alt="Set Reminder">*/}
                                  <i class="fa-regular fa-clipboard">
                                    <sub
                                      className="fa-regular fa-clock"
                                      style={{ marginLeft: "-2px" }}
                                    />
                                  </i>
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <a
                                  href="javascript confirm_delete('search_note.php?action=delete&id=2&Search=&Search_Message=&Search_sender=&Search_booking_id=');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Delete"
                                >
                                  {/*<img src="images/delete.gif" alt="Delete" border=0>*/}
                                  <i className="fa fa-trash" />
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td align="center">&nbsp;dsdfffdfdf</td>
                          <td align="center">&nbsp;183 </td>
                          <td align="center">&nbsp;TD1503071</td>
                          <td align="center">&nbsp;</td>
                          {/*<td align=center>&nbsp;17-Aug-2019 17:55:08</td>*/}
                          <td align="center">
                            {/*26-Jul-2023 11:24:32 */}
                            <div className="dateWrapper withTime">
                              <div className="onlyDate">17</div>
                              <div className="monthYear">
                                Aug
                                <br />
                                2019
                              </div>
                            </div>
                            <div className="secCont">17:55</div>
                          </td>
                          <td align="center" className="actionlink">
                            <div className="actionCont">
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.BOOKINGSREMINDERSVIEW
                                  }
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="View"
                                >
                                  {/*<img src="images/view.gif" border=0 alt="View">*/}
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={
                                    Constants.URLConstants.BOOKINGSREMINDERSSET
                                  }
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Set Reminder"
                                >
                                  {/*<img src="images/reminder_set_icon.gif" border=0 alt="Set Reminder">*/}
                                  <i class="fa-regular fa-clipboard">
                                    <sub
                                      className="fa-regular fa-clock"
                                      style={{ marginLeft: "-2px" }}
                                    />
                                  </i>
                                </Link>
                              </div>
                              <div className="input-group-addon">
                                <a
                                  href="javascript confirm_delete('search_note.php?action=delete&id=1&Search=&Search_Message=&Search_sender=&Search_booking_id=');"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title
                                  data-original-title="Delete"
                                >
                                  {/*<img src="images/delete.gif" alt="Delete" border=0>*/}
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default BookingReminderSearch;
