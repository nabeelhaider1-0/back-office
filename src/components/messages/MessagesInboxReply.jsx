import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";

const MessagesInboxReply = () => {
  return (
    <>
      <div classNames="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="MESSAGE REPLY"
          linkText1="Message Inbox"
          linkText2="Compose Message Reply"
          link1={Constants.URLConstants.MESSAGESINBOX}
        />

        <div className="row">
          <div
            className="col-md-3 form-group"
            style={{ fontFamily: "", fontSize: "13px!important" }}
          >
            <div className="panel-body" style={{ padding: "8px 12px" }}>
              <form style={{ paddingRight: "14px" }}>
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
                  <li>
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
            </div>
          </div>
          <div className="col-md-9">
            <div
              className="panel-body sectHeader"
              style={{
                backgroundColor: "#FF5015",
                paddingBottom: "1px",
                paddingTop: "4px",
              }}
            >
              <div className="row">
                <div className="col-md-3">
                  <h5
                    style={{
                      color: "white",
                      fontSize: "15px",
                      marginLeft: "20px",
                    }}
                  >
                    Booking ID : TD903159
                  </h5>
                </div>
              </div>
            </div>
            <form
              action="add_message.php"
              method="post"
              name="add_message_form"
            >
              <input type="hidden" name="action" defaultValue="edit" />
              <input type="hidden" name="sender" defaultValue />
              <input
                type="hidden"
                name="redirect"
                defaultValue="message_inbox.php?reservation_id="
              />
              <input type="hidden" name="sel_receiver" defaultValue />
              <input type="hidden" name="msg_id" defaultValue={21} />
              <input type="hidden" name="sel_booking" defaultValue={3159} />
              <div className="panel-body">
                <div className="row">
                  <div className="form-group col-md-2">
                    <label>Reply To</label>
                    <div>
                      <input
                        type="hidden"
                        name="rdReceiver"
                        defaultValue="A"
                        defaultChecked="checked"
                      />
                      Snehal02 (Nida){" "}
                    </div>
                  </div>
                  <div className="form-group col-md-12">
                    <label>Message Subject</label>
                    <input
                      type="text"
                      className="input_style4 selectpicker form-control show-menu-arrow selectstyle required test123"
                      name="txt_msg_subject"
                      size={45}
                      maxLength={200}
                      defaultValue="RE: test"
                      data-live-search="true"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-12">
                    <textarea
                      name="txtar_msg"
                      rows={6}
                      cols={80}
                      className="input_style4 form-control required selectstyle mt-2"
                      defaultValue={""}
                    />
                    {/* <div class="summernote required" name="txtar_msg" style="height:20px;">
      </div> */}
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="form-group col-md-12">
                    <h5 style={{ fontSize: "16px" }}>
                      Last Original Message :{" "}
                    </h5>{" "}
                    testing
                  </div>
                </div>
                <br />
                <button
                  type="button"
                  className="btn btn-dark btn-sm form-group"
                  name="b1"
                  id="b1"
                  value="SUBMIT"
                  onclick="submit_form(document.forms['add_message_form']);"
                >
                  <i className="fa fa-floppy-o" aria-hidden="true" />
                  &nbsp;Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default MessagesInboxReply;
