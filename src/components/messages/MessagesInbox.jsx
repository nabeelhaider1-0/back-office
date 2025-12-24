import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import {
  searchSenderOptions,
  searchStatusOptions,
} from "../../constants/contants";

const MessagesInbox = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="MESSAGE INBOX"
          linkText1="Message Inbox"
          linkText2="Add Message"
          link2={Constants.URLConstants.MESSAGESNEW}
        />

        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n.fa-envelope-open-text{\n color: var(--color-text) !important;\n cursor:pointer;\n}\n.fa-envelope-open-text:hover{\n color: black !important;\n }\n.fa-envelope{\n color: var(--color-text) !important;\n cursor:pointer;\n}\n.fa-envelope:hover{\n color: black !important;\n}\n.fa-reply{\n color: var(--color-text) !important;\n cursor:pointer;\n}\n.fa-reply:hover{\n color: black !important;\n}\n.fa-trash{\n color: var(--color-text) !important;\n cursor:pointer;\n}\n.fa-trash:hover{\n color: black !important;\n}\n",
          }}
        />

        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n        .table>tbody>tr>td a {\n            color: var(--color-text) !important;\n            text-decoration: none;\n        }\n\n        .table>tbody>tr>td a:hover {\n\n            text-decoration: none !important;\n        }\n",
          }}
        />
        <div className="row">
          <div
            className="col-md-3 form-group"
            style={{ fontFamily: "", fontSize: "13px!important" }}
          >
            <div className="panel-body" style={{ padding: "8px 12px" }}>
              <form style={{ paddingRight: "14px", paddingBottom: "3px" }}>
                <ul
                  className="mailbox-list"
                  style={{ marginTop: 0, marginBottom: "10px" }}
                >
                  <li>
                    {" "}
                    {/* class="active" */}
                    <Link
                      to={Constants.URLConstants.MESSAGESNEW}
                      style={{
                        cursor: "pointer",
                        color: "var(--color-text)",
                        textDecoration: "none",
                      }}
                    >
                      {/* <span class="pull-right">12</span> */}
                      <i
                        className="fa fa-pencil"
                        style={{
                          cursor: "pointer",
                          color: "var(--color-text)",
                          textDecoration: "none",
                        }}
                      />{" "}
                      &nbsp;&nbsp;New
                    </Link>
                  </li>
                  <li className="active">
                    {" "}
                    {/* class="active" */}
                    <Link
                      to={Constants.URLConstants.MESSAGESINBOX}
                      style={{
                        cursor: "pointer",
                        color: "var(--color-text)",
                        textDecoration: "none",
                      }}
                    >
                      {/* <span class="pull-right">12</span> */}
                      <i
                        className="fa fa-envelope"
                        style={{
                          cursor: "pointer",
                          color: "var(--color-text)",
                          textDecoration: "none",
                        }}
                      />{" "}
                      &nbsp;&nbsp;Inbox
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={Constants.URLConstants.MESSAGESOUTBOX}
                      style={{
                        cursor: "pointer",
                        color: "var(--color-text)",
                        textDecoration: "none",
                      }}
                    >
                      <i
                        className="fa fa-envelope-open-text"
                        style={{
                          cursor: "pointer",
                          color: "var(--color-text)",
                          textDecoration: "none",
                        }}
                      />{" "}
                      &nbsp;&nbsp;Outbox
                    </Link>
                  </li>
                </ul>
              </form>
              <div
                className="panel-body sectHeader"
                style={{
                  backgroundColor: "#FF5015",
                  paddingBottom: "1px",
                  paddingTop: "4px",
                }}
              >
                <div className="row">
                  <h5
                    style={{
                      color: "white",
                      fontSize: "15px",
                      marginLeft: "20px",
                      fontFamily: "MONTSERRAT",
                    }}
                  >
                    Search
                  </h5>
                </div>
              </div>
              <div className="panel-body ">
                <form style={{ paddingRight: "14px" }}>
                  <br />
                  <ul className="mailbox-list">
                    <li>
                      <label>Subject</label>
                      <input
                        className="form-control form-control-sm test123"
                        type="text"
                        name="Search_Subject"
                        size={30}
                      />
                    </li>
                    <br />
                    <li>
                      <label>Message</label>
                      <input
                        className="form-control for  m-control-sm"
                        type="text"
                        name="Search_Message"
                        size={30}
                      />
                    </li>
                    <br />
                    <li>
                      <label>Sender</label>
                      <MultiSelect
                        options={searchSenderOptions}
                        isSearchable
                        placeholder="- Select Sender -"
                        noOptionsMessage={() => "No Sender Found"}
                        className="custom-select"
                      />
                    </li>
                    <br />
                    <li className="row">
                      <div className="col-md-6 col-sm-12 col-xs-12 form-group">
                        <label>Booking ID</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="Search_booking_id"
                        />
                        {/* <select name='Search_booking_id'>

                          <option value='0'>- Select Booking ID -</option>

                           

                          </select> */}
                      </div>
                      <div className="col-md-6 col-sm-12 col-xs-12">
                        <label>Status</label>
                        <MultiSelect
                          options={searchStatusOptions}
                          isSearchable
                          placeholder="- Select Status -"
                          noOptionsMessage={() => "No Status Found"}
                          className="custom-select"
                        />
                      </div>
                    </li>
                    <br />
                    <li>
                      <button
                        type="button"
                        className="btn btn-dark btn-sm "
                        value="Search"
                      >
                        <i className="fa fa-search" />
                        &nbsp;Search
                      </button>
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-9 form-group">
            <div className="panel-body noTableMargin removeMargins">
              <form>
                <div className="dataTables_scroll">
                  <div className="mesID" style={{ display: "none" }}></div>
                  {/* <div class="row">

                      <div class="col-md-12 text-right form-group">

                          <button type="button" name="Delete" value="Delete" class="btn btn-danger" onclick="javascript:validate_chk(document.forms['message_inbox_from'],'multi_delete');"><h6><i class="fa fa-trash-o"></i>&nbsp;Delete</h6></button>			                                

                      </div>

                  </div> */}
                  {/* 		<div class="col-md-6">



                          <div class="actionCont pull-right">

                              <div class="input-group-addon" style="cursor:pointer" onclick="checkAll();">

                                  <i class="fa fa-check" title="Select / Deselect All" data-toggle="tooltip" data-placement="top"></i>

                              </div>

                              <div class="input-group-addon" onclick="deleteMultiple()">

                              
                                  <Link>

                                      <i class="fa fa-trash" title="Delete Item(s)" data-toggle="tooltip" data-placement="top"></i>

                                  </Link>

                              
                              </div>

                          </div>

                          </div> */}
                  <div className="row pd_tp">
                    <div className="row">
                      <div className="col-md-2 col_hide">
                        <div className="form-group col-md-12">&nbsp;</div>
                      </div>
                      <div className="col-md-8 col_hide">
                        <nav aria-label="Page navigation example">
                          <ul className="pagination pagination-sm justify-content-center">
                            <li className="page-item active">
                              <Link className="page-link" to="#">
                                2
                              </Link>
                            </li>
                            <li className="page-item">
                              <Link
                                className="page-link"
                                to="#"
                                aria-label="Next"
                              >
                                <span aria-hidden="true">NEXT »</span>
                              </Link>
                            </li>
                          </ul>
                        </nav>
                      </div>
                      <div className="col-md-2">
                        <style
                          dangerouslySetInnerHTML={{
                            __html:
                              "\n                                            .table tr[visible='false'],\n                                            .no-result {\n                                                display: none;\n                                                border: 1px solid #ddd;\n                                                padding: 10px;\n                                                margin-top: -2px;\n                                            }\n\n                                            .table tr[visible='true'] {\n                                                display: table-row;\n                                            }\n\n                                            .counter {\n                                                padding: 8px;\n                                                color: #ccc;\n                                            }\n\n                                            .search_new {\n                                                float: right;\n                                                height: 35px;\n                                                margin-bottom: 0px;\n                                                padding-left: 5px;\n                                            }\n                                        ",
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
                            width: "1082px",
                          }}
                        >
                          <div
                            className="suwala-doubleScroll-scroll"
                            style={{ height: "20px", width: "1082px" }}
                          ></div>
                        </div>
                        <div id="wrapper2" style={{ overflow: "auto" }}>
                          <table
                            id="inboxmails"
                            className="table table-bordered dataTable table-responsive  table-mailbox no-footer"
                            role="grid"
                            aria-describedby="search_sup_info"
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  className="no-sort sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Edit"
                                  style={{ width: "21.2px" }}
                                >
                                  Edit
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="search_sup"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Sender: activate to sort column ascending"
                                  style={{ width: "172.2px" }}
                                >
                                  Sender
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="search_sup"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Subject: activate to sort column ascending"
                                  style={{ width: "263.2px" }}
                                >
                                  Subject
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="search_sup"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Booking ID: activate to sort column ascending"
                                  style={{ width: "81.2px" }}
                                >
                                  Booking ID
                                </th>
                                <th
                                  className="no-sort sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Status"
                                  style={{ width: "52.2px" }}
                                >
                                  Status
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="search_sup"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Read counter: activate to sort column ascending"
                                  style={{ width: "105.2px" }}
                                >
                                  Read counter
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="search_sup"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Send Date: activate to sort column ascending"
                                  style={{ width: "122.2px" }}
                                >
                                  Send Date
                                </th>
                                <th
                                  className="no-sort sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="&nbsp;Actions"
                                  style={{ width: "113px" }}
                                >
                                  &nbsp;Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="phps_row_1 odd" role="row">
                                <td>
                                  <Link
                                    to={
                                      Constants.URLConstants.MESSAGESINBOXEDIT
                                    }
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Edit"
                                  >
                                    {/*<img title="Edit" src="images/edit.gif" border=0 alt="Edit"> */}
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=21&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    Snehal02 (Nida){" "}
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=21&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    test
                                  </Link>
                                </td>
                                <td>
                                  <Link to="view_booking_transfer.php?booking_id=3159&reservation_id=OT4674">
                                    TD903159
                                  </Link>
                                </td>
                                <td>
                                  &nbsp;
                                  <i
                                    className="fa fa-envelope-open-text"
                                    style={{ fontSize: "20px" }}
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Read"
                                  />
                                </td>
                                <td>&nbsp;1</td>
                                <td>03 Sep 2019 15:34</td>
                                <td className="row">
                                  <div
                                    className="col-md-12 col-sm-12 col-xs-12"
                                    style={{ minWidth: "75px" }}
                                  >
                                    <Link
                                      to={
                                        Constants.URLConstants
                                          .MESSAGESINBOXREPLY
                                      }
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Reply"
                                    >
                                      <i className="fa fa-reply" />
                                    </Link>
                                    &nbsp;
                                    <Link
                                      to=" confirm_delete('message_inbox.php?action=delete&id=21&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=');"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      <i className="fa fa-trash" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr className="phps_row_0 even" role="row">
                                {/* <td>

                                  <div class="checkbox checkbox-single checkbox-inline checkbox-success">

                                      <input type="checkbox" name="chk[]" id="chk[]" class="Checkbox" value="20" style="position: absolute; margin-left: -20px;" />

                                         <label for="chk[]"></label>

                                  </div>

                              </td> */}
                                <td>
                                  <Link
                                    to="message_inbox.php?action=edit&id=20&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Edit"
                                  >
                                    {/*<img title="Edit" src="images/edit.gif" border=0 alt="Edit"> */}
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=20&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    Snehal02 (Nida){" "}
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=20&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    test_subject
                                  </Link>
                                </td>
                                <td>
                                  <Link to="view_booking_transfer.php?booking_id=3096&reservation_id=OT3992">
                                    TD903096
                                  </Link>
                                </td>
                                <td>
                                  &nbsp;
                                  <i
                                    className="fa fa-envelope-open-text"
                                    style={{ fontSize: "20px" }}
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Read"
                                  />
                                </td>
                                <td>&nbsp;1</td>
                                <td>19 Aug 2019 15:03</td>
                                <td className="row">
                                  <div
                                    className="col-md-12 col-sm-12 col-xs-12"
                                    style={{ minWidth: "75px" }}
                                  >
                                    <Link
                                      to="message_inbox.php?action=reply&id=20&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Reply"
                                    >
                                      <i className="fa fa-reply" />
                                    </Link>
                                    &nbsp;
                                    <Link
                                      to=" confirm_delete('message_inbox.php?action=delete&id=20&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=');"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      <i className="fa fa-trash" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr className="phps_row_1 odd" role="row">
                                {/* <td>

                                  <div class="checkbox checkbox-single checkbox-inline checkbox-success">

                                      <input type="checkbox" name="chk[]" id="chk[]" class="Checkbox" value="19" style="position: absolute; margin-left: -20px;" />

                                         <label for="chk[]"></label>

                                  </div>

                              </td> */}
                                <td>
                                  <Link
                                    to="message_inbox.php?action=edit&id=19&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Edit"
                                  >
                                    {/*<img title="Edit" src="images/edit.gif" border=0 alt="Edit"> */}
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=19&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    Snehal02 (Nida){" "}
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=19&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    test
                                  </Link>
                                </td>
                                <td>
                                  <Link to="view_booking_transfer.php?booking_id=3078&reservation_id=OT3891">
                                    TD903078
                                  </Link>
                                </td>
                                <td>
                                  &nbsp;
                                  <i
                                    className="fa fa-envelope-open-text"
                                    style={{ fontSize: "20px" }}
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Read"
                                  />
                                </td>
                                <td>&nbsp;1</td>
                                <td>17 Aug 2019 18:14</td>
                                <td className="row">
                                  <div
                                    className="col-md-12 col-sm-12 col-xs-12"
                                    style={{ minWidth: "75px" }}
                                  >
                                    <Link
                                      to="message_inbox.php?action=reply&id=19&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Reply"
                                    >
                                      <i className="fa fa-reply" />
                                    </Link>
                                    &nbsp;
                                    <Link
                                      to=" confirm_delete('message_inbox.php?action=delete&id=19&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=');"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      <i className="fa fa-trash" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr className="phps_row_0 even" role="row">
                                {/* <td>

                                  <div class="checkbox checkbox-single checkbox-inline checkbox-success">

                                      <input type="checkbox" name="chk[]" id="chk[]" class="Checkbox" value="18" style="position: absolute; margin-left: -20px;" />

                                         <label for="chk[]"></label>

                                  </div>

                              </td> */}
                                <td>
                                  <Link
                                    to="message_inbox.php?action=edit&id=18&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Edit"
                                  >
                                    {/*<img title="Edit" src="images/edit.gif" border=0 alt="Edit"> */}
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=18&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    TestU
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=18&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    RE: Test
                                  </Link>
                                </td>
                                <td>
                                  <Link to="view_booking_transfer.php?booking_id=3024&reservation_id=OT3533">
                                    TD903024
                                  </Link>
                                </td>
                                <td>
                                  &nbsp;
                                  <i
                                    className="fa fa-envelope-open-text"
                                    style={{ fontSize: "20px" }}
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Read"
                                  />
                                </td>
                                <td>&nbsp;1</td>
                                <td>12 Aug 2019 15:19</td>
                                <td className="row">
                                  <div
                                    className="col-md-12 col-sm-12 col-xs-12"
                                    style={{ minWidth: "75px" }}
                                  >
                                    <Link
                                      to="message_inbox.php?action=reply&id=18&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Reply"
                                    >
                                      <i className="fa fa-reply" />
                                    </Link>
                                    &nbsp;
                                    <Link
                                      to="confirm_delete('message_inbox.php?action=delete&id=18&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=');"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      <i className="fa fa-trash" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr className="phps_row_1 odd" role="row">
                                {/* <td>

                                  <div class="checkbox checkbox-single checkbox-inline checkbox-success">

                                      <input type="checkbox" name="chk[]" id="chk[]" class="Checkbox" value="17" style="position: absolute; margin-left: -20px;" />

                                         <label for="chk[]"></label>

                                  </div>

                              </td> */}
                                <td>
                                  <Link
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Edit"
                                  >
                                    {/*<img title="Edit" src="images/edit.gif" border=0 alt="Edit"> */}
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=17&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    Snehal02 (Nida){" "}
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=17&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    Test
                                  </Link>
                                </td>
                                <td>
                                  <Link to="view_booking_transfer.php?booking_id=3024&reservation_id=OT3533">
                                    TD903024
                                  </Link>
                                </td>
                                <td>
                                  &nbsp;
                                  <i
                                    className="fa fa-envelope-open-text"
                                    style={{ fontSize: "20px" }}
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Read"
                                  />
                                </td>
                                <td>&nbsp;2</td>
                                <td>12 Aug 2019 15:18</td>
                                <td className="row">
                                  <div
                                    className="col-md-12 col-sm-12 col-xs-12"
                                    style={{ minWidth: "75px" }}
                                  >
                                    <Link
                                      to="message_inbox.php?action=reply&id=17&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Reply"
                                    >
                                      <i className="fa fa-reply" />
                                    </Link>
                                    &nbsp;
                                    <Link
                                      to=" confirm_delete('message_inbox.php?action=delete&id=17&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=');"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      <i className="fa fa-trash" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr className="phps_row_0 unread even" role="row">
                                {/* <td>

                                  <div class="checkbox checkbox-single checkbox-inline checkbox-success">

                                      <input type="checkbox" name="chk[]" id="chk[]" class="Checkbox" value="16" style="position: absolute; margin-left: -20px;" />

                                         <label for="chk[]"></label>

                                  </div>

                              </td> */}
                                <td>
                                  <Link
                                    to="message_inbox.php?action=edit&id=16&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Edit"
                                  >
                                    {/*<img title="Edit" src="images/edit.gif" border=0 alt="Edit"> */}
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=16&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    v3otramslive
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=16&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    Testing
                                  </Link>
                                </td>
                                <td>
                                  <Link to="view_booking.php?booking_id=1330&reservation_id=OT1443">
                                    TD801330
                                  </Link>
                                </td>
                                <td>
                                  &nbsp;
                                  <i
                                    className="fa-regular fa-envelope"
                                    style={{ fontSize: "20px" }}
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Unread"
                                  />
                                </td>
                                <td>&nbsp;0</td>
                                <td>17 Jun 2019 15:35</td>
                                <td className="row">
                                  <div
                                    className="col-md-12 col-sm-12 col-xs-12"
                                    style={{ minWidth: "75px" }}
                                  >
                                    <Link
                                      to="message_inbox.php?action=reply&id=16&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Reply"
                                    >
                                      <i className="fa fa-reply" />
                                    </Link>
                                    &nbsp;
                                    <Link
                                      to=" confirm_delete('message_inbox.php?action=delete&id=16&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=');"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      <i className="fa fa-trash" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr className="phps_row_1 unread odd" role="row">
                                {/* <td>

                                  <div class="checkbox checkbox-single checkbox-inline checkbox-success">

                                      <input type="checkbox" name="chk[]" id="chk[]" class="Checkbox" value="15" style="position: absolute; margin-left: -20px;" />

                                         <label for="chk[]"></label>

                                  </div>

                              </td> */}
                                <td>
                                  <Link
                                    to="message_inbox.php?action=edit&id=15&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Edit"
                                  >
                                    {/*<img title="Edit" src="images/edit.gif" border=0 alt="Edit"> */}
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=15&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    v3otramslive
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=15&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    Testing
                                  </Link>
                                </td>
                                <td>
                                  <Link to="view_booking.php?booking_id=1326&reservation_id=OT1441">
                                    TD801326
                                  </Link>
                                </td>
                                <td>
                                  &nbsp;
                                  <i
                                    className="fa-regular fa-envelope"
                                    style={{ fontSize: "20px" }}
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Unread"
                                  />
                                </td>
                                <td>&nbsp;0</td>
                                <td>14 Jun 2019 10:14</td>
                                <td className="row">
                                  <div
                                    className="col-md-12 col-sm-12 col-xs-12"
                                    style={{ minWidth: "75px" }}
                                  >
                                    <Link
                                      to="message_inbox.php?action=reply&id=15&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Reply"
                                    >
                                      <i className="fa fa-reply" />
                                    </Link>
                                    &nbsp;
                                    <Link
                                      to=" confirm_delete('message_inbox.php?action=delete&id=15&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=');"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      <i className="fa fa-trash" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr className="phps_row_0 unread even" role="row">
                                {/* <td>

                                  <div class="checkbox checkbox-single checkbox-inline checkbox-success">

                                      <input type="checkbox" name="chk[]" id="chk[]" class="Checkbox" value="14" style="position: absolute; margin-left: -20px;" />

                                         <label for="chk[]"></label>

                                  </div>

                              </td> */}
                                <td>
                                  <Link
                                    to="message_inbox.php?action=edit&id=14&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Edit"
                                  >
                                    {/*<img title="Edit" src="images/edit.gif" border=0 alt="Edit"> */}
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=14&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    v3otramslive
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=14&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    Hello
                                  </Link>
                                </td>
                                <td>
                                  <Link to="view_booking.php?booking_id=2701&reservation_id=OT2319">
                                    02701
                                  </Link>
                                </td>
                                <td>
                                  &nbsp;
                                  <i
                                    className="fa-regular fa-envelope"
                                    style={{ fontSize: "20px" }}
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Unread"
                                  />
                                </td>
                                <td>&nbsp;0</td>
                                <td>05 Jun 2019 18:15</td>
                                <td className="row">
                                  <div
                                    className="col-md-12 col-sm-12 col-xs-12"
                                    style={{ minWidth: "75px" }}
                                  >
                                    <Link
                                      to="message_inbox.php?action=reply&id=14&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Reply"
                                    >
                                      <i className="fa fa-reply" />
                                    </Link>
                                    &nbsp;
                                    <Link
                                      to=" confirm_delete('message_inbox.php?action=delete&id=14&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=');"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      <i className="fa fa-trash" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr className="phps_row_1 unread odd" role="row">
                                {/* <td>

                                  <div class="checkbox checkbox-single checkbox-inline checkbox-success">

                                      <input type="checkbox" name="chk[]" id="chk[]" class="Checkbox" value="13" style="position: absolute; margin-left: -20px;" />

                                         <label for="chk[]"></label>

                                  </div>

                              </td> */}
                                <td>
                                  <Link
                                    to="message_inbox.php?action=edit&id=13&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Edit"
                                  >
                                    {/*<img title="Edit" src="images/edit.gif" border=0 alt="Edit"> */}
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=13&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    v3otramslive
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=13&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    Test
                                  </Link>
                                </td>
                                <td>
                                  <Link to="view_booking.php?booking_id=2701&reservation_id=OT2319">
                                    02701
                                  </Link>
                                </td>
                                <td>
                                  &nbsp;
                                  <i
                                    className="fa-regular fa-envelope"
                                    style={{ fontSize: "20px" }}
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Unread"
                                  />
                                </td>
                                <td>&nbsp;0</td>
                                <td>05 Jun 2019 18:12</td>
                                <td className="row">
                                  <div
                                    className="col-md-12 col-sm-12 col-xs-12"
                                    style={{ minWidth: "75px" }}
                                  >
                                    <Link
                                      to="message_inbox.php?action=reply&id=13&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Reply"
                                    >
                                      <i className="fa fa-reply" />
                                    </Link>
                                    &nbsp;
                                    <Link
                                      to=" confirm_delete('message_inbox.php?action=delete&id=13&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=');"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      <i className="fa fa-trash" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr className="phps_row_0 unread even" role="row">
                                {/* <td>

                                  <div class="checkbox checkbox-single checkbox-inline checkbox-success">

                                      <input type="checkbox" name="chk[]" id="chk[]" class="Checkbox" value="10" style="position: absolute; margin-left: -20px;" />

                                         <label for="chk[]"></label>

                                  </div>

                              </td> */}
                                <td>
                                  <Link
                                    to="message_inbox.php?action=edit&id=10&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Edit"
                                  >
                                    {/*<img title="Edit" src="images/edit.gif" border=0 alt="Edit"> */}
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=10&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    nida_agent (Test){" "}
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=10&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    abc
                                  </Link>
                                </td>
                                <td>
                                  <Link to="view_booking.php?booking_id=1989&reservation_id=OT1788">
                                    TD1801989
                                  </Link>
                                </td>
                                <td>
                                  &nbsp;
                                  <i
                                    className="fa-regular fa-envelope"
                                    style={{ fontSize: "20px" }}
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Unread"
                                  />
                                </td>
                                <td>&nbsp;0</td>
                                <td>20 Apr 2019 17:35</td>
                                <td className="row">
                                  <div
                                    className="col-md-12 col-sm-12 col-xs-12"
                                    style={{ minWidth: "75px" }}
                                  >
                                    <Link
                                      to="message_inbox.php?action=reply&id=10&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Reply"
                                    >
                                      <i className="fa fa-reply" />
                                    </Link>
                                    &nbsp;
                                    <Link
                                      to=" confirm_delete('message_inbox.php?action=delete&id=10&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=');"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      <i className="fa fa-trash" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr className="phps_row_1 odd" role="row">
                                {/* <td>

                                  <div class="checkbox checkbox-single checkbox-inline checkbox-success">

                                      <input type="checkbox" name="chk[]" id="chk[]" class="Checkbox" value="9" style="position: absolute; margin-left: -20px;" />

                                         <label for="chk[]"></label>

                                  </div>

                              </td> */}
                                <td>
                                  <Link
                                    to="message_inbox.php?action=edit&id=9&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Edit"
                                  >
                                    {/*<img title="Edit" src="images/edit.gif" border=0 alt="Edit"> */}
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=9&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    Test Agent (Travel tax){" "}
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=9&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    assssssssssssssssssssssssss...
                                  </Link>
                                </td>
                                <td>
                                  <Link to="visa_details.php?booking_id=1316&reservation_id=OT1429&action=view_booking_visa_details">
                                    TD301316
                                  </Link>
                                </td>
                                <td>
                                  &nbsp;
                                  <i
                                    className="fa fa-envelope-open-text"
                                    style={{ fontSize: "20px" }}
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Read"
                                  />
                                </td>
                                <td>&nbsp;1</td>
                                <td>05 Feb 2019 12:48</td>
                                <td className="row">
                                  <div
                                    className="col-md-12 col-sm-12 col-xs-12"
                                    style={{ minWidth: "75px" }}
                                  >
                                    <Link
                                      to="message_inbox.php?action=reply&id=9&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Reply"
                                    >
                                      <i className="fa fa-reply" />
                                    </Link>
                                    &nbsp;
                                    <Link
                                      to=" confirm_delete('message_inbox.php?action=delete&id=9&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=');"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      <i className="fa fa-trash" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr className="phps_row_0 unread even" role="row">
                                {/* <td>

                                  <div class="checkbox checkbox-single checkbox-inline checkbox-success">

                                      <input type="checkbox" name="chk[]" id="chk[]" class="Checkbox" value="8" style="position: absolute; margin-left: -20px;" />

                                         <label for="chk[]"></label>

                                  </div>

                              </td> */}
                                <td>
                                  <Link
                                    to="message_inbox.php?action=edit&id=8&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Edit"
                                  >
                                    {/*<img title="Edit" src="images/edit.gif" border=0 alt="Edit"> */}
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=8&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    allwin_1122 (Qtech){" "}
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=8&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    ghhhhhhhhhhhhhhvbn fhgggggg...
                                  </Link>
                                </td>
                                <td>
                                  <Link to="visa_details.php?booking_id=1238&reservation_id=OT1354&action=view_booking_visa_details">
                                    TD301238
                                  </Link>
                                </td>
                                <td>
                                  &nbsp;
                                  <i
                                    className="fa-regular fa-envelope"
                                    style={{ fontSize: "20px" }}
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Unread"
                                  />
                                </td>
                                <td>&nbsp;0</td>
                                <td>05 Feb 2019 11:45</td>
                                <td className="row">
                                  <div
                                    className="col-md-12 col-sm-12 col-xs-12"
                                    style={{ minWidth: "75px" }}
                                  >
                                    <Link
                                      to="message_inbox.php?action=reply&id=8&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Reply"
                                    >
                                      <i className="fa fa-reply" />
                                    </Link>
                                    &nbsp;
                                    <Link
                                      to=" confirm_delete('message_inbox.php?action=delete&id=8&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=');"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      <i className="fa fa-trash" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr className="phps_row_1 unread odd" role="row">
                                {/* <td>

                                  <div class="checkbox checkbox-single checkbox-inline checkbox-success">

                                      <input type="checkbox" name="chk[]" id="chk[]" class="Checkbox" value="7" style="position: absolute; margin-left: -20px;" />

                                         <label for="chk[]"></label>

                                  </div>

                              </td> */}
                                <td>
                                  <Link
                                    to="message_inbox.php?action=edit&id=7&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Edit"
                                  >
                                    {/*<img title="Edit" src="images/edit.gif" border=0 alt="Edit"> */}
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=7&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    Test Agent (Travel tax){" "}
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=7&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    aditi
                                  </Link>
                                </td>
                                <td>
                                  <Link to="visa_details.php?booking_id=1316&reservation_id=OT1429&action=view_booking_visa_details">
                                    TD301316
                                  </Link>
                                </td>
                                <td>
                                  &nbsp;
                                  <i
                                    className="fa-regular fa-envelope"
                                    style={{ fontSize: "20px" }}
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Unread"
                                  />
                                </td>
                                <td>&nbsp;0</td>
                                <td>24 Jan 2019 18:32</td>
                                <td className="row">
                                  <div
                                    className="col-md-12 col-sm-12 col-xs-12"
                                    style={{ minWidth: "75px" }}
                                  >
                                    <Link
                                      to="message_inbox.php?action=reply&id=7&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Reply"
                                    >
                                      <i className="fa fa-reply" />
                                    </Link>
                                    &nbsp;
                                    <Link
                                      to=" confirm_delete('message_inbox.php?action=delete&id=7&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=');"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      <i className="fa fa-trash" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr className="phps_row_0 unread even" role="row">
                                {/* <td>

                                  <div class="checkbox checkbox-single checkbox-inline checkbox-success">

                                      <input type="checkbox" name="chk[]" id="chk[]" class="Checkbox" value="6" style="position: absolute; margin-left: -20px;" />

                                         <label for="chk[]"></label>

                                  </div>

                              </td> */}
                                <td>
                                  <Link
                                    to="message_inbox.php?action=edit&id=6&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Edit"
                                  >
                                    {/*<img title="Edit" src="images/edit.gif" border=0 alt="Edit"> */}
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=6&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    Test Agent (Travel tax){" "}
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=6&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    fdsg
                                  </Link>
                                </td>
                                <td>
                                  <Link to="visa_details.php?booking_id=1316&reservation_id=OT1429&action=view_booking_visa_details">
                                    TD301316
                                  </Link>
                                </td>
                                <td>
                                  &nbsp;
                                  <i
                                    className="fa-regular fa-envelope"
                                    style={{ fontSize: "20px" }}
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Unread"
                                  />
                                </td>
                                <td>&nbsp;0</td>
                                <td>24 Jan 2019 18:26</td>
                                <td className="row">
                                  <div
                                    className="col-md-12 col-sm-12 col-xs-12"
                                    style={{ minWidth: "75px" }}
                                  >
                                    <Link
                                      to="message_inbox.php?action=reply&id=6&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Reply"
                                    >
                                      <i className="fa fa-reply" />
                                    </Link>
                                    &nbsp;
                                    <Link
                                      to=" confirm_delete('message_inbox.php?action=delete&id=6&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=');"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      <i className="fa fa-trash" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr className="phps_row_1 unread odd" role="row">
                                {/* <td>

                                  <div class="checkbox checkbox-single checkbox-inline checkbox-success">

                                      <input type="checkbox" name="chk[]" id="chk[]" class="Checkbox" value="5" style="position: absolute; margin-left: -20px;" />

                                         <label for="chk[]"></label>

                                  </div>

                              </td> */}
                                <td>
                                  <Link
                                    to="message_inbox.php?action=edit&id=5&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Edit"
                                  >
                                    {/*<img title="Edit" src="images/edit.gif" border=0 alt="Edit"> */}
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=5&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    allwin_5oct (Allwin){" "}
                                  </Link>
                                </td>
                                <td>
                                  <Link to="message_inbox.php?action=view&id=5&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=">
                                    testjkkljh
                                  </Link>
                                </td>
                                <td>
                                  <Link to="visa_details.php?booking_id=1303&reservation_id=OT1414&action=view_booking_visa_details">
                                    TD301303
                                  </Link>
                                </td>
                                <td>
                                  &nbsp;
                                  <i
                                    className="fa-regular fa-envelope"
                                    style={{ fontSize: "20px" }}
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Unread"
                                  />
                                </td>
                                <td>&nbsp;0</td>
                                <td>17 Jan 2019 12:12</td>
                                <td className="row">
                                  <div
                                    className="col-md-12 col-sm-12 col-xs-12"
                                    style={{ minWidth: "75px" }}
                                  >
                                    <Link
                                      to="message_inbox.php?action=reply&id=5&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Reply"
                                    >
                                      <i className="fa fa-reply" />
                                    </Link>
                                    &nbsp;
                                    <Link
                                      to=" confirm_delete('message_inbox.php?action=delete&id=5&Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status=');"
                                      title
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      <i className="fa fa-trash" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group no-result">
                    <h5 className="text-center">
                      No Message found in the system.
                    </h5>
                  </div>
                  <div className="row pd_tp">
                    <div className="row">
                      <div className="col-md-4 col_hide">
                        <div className="form-group col-md-6 col_hide">
                          &nbsp;
                        </div>
                      </div>
                      <div className="col-md-5 col_hide">
                        <div className="form-group" />
                      </div>
                      <div className="col-md-3 col_hide">&nbsp;</div>
                    </div>
                  </div>
                  <br />
                </div>
                <br />
                <div className="row">
                  <div className="form-group col-md-12">
                    <Link
                      to="download_msg_inbox.php?Search=&Search_Subject=&Search_Message=&Search_sender=&Search_booking_id=&Search_status="
                      className="btn btn-outline-secondary btn-sm"
                    >
                      <i className="fa fa-download" />
                      &nbsp;Download MS Word Doc
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MessagesInbox;
