import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import { add_options } from "../../constants/contants";




const MessagesNew = () => {



  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">

        <Header2 title="COMPOSE MESSAGE" linkText1="Message Inbox" linkText2="Compose Message" link1={Constants.URLConstants.MESSAGESINBOX} />



        <div className="row">
          <div className="col-md-3 form-group" style={{ fontFamily: '', fontSize: '13px!important' }}>
            <div className="panel-body" style={{ padding: '8px 12px' }}>
              <form style={{ paddingRight: '14px' }}>
                <ul className="mailbox-list" style={{ marginTop: 0, marginBottom: '10px' }}>
                  <li className="active"> {/* class="active" */}
                    <Link to={Constants.URLConstants.MESSAGESNEW} style={{ cursor: 'pointer', color: 'var(--color-text)', textDecoration: 'none' }}>
                      {/* <span class="pull-right">12</span> */}
                      <i className="fa fa-pencil" style={{ cursor: 'pointer', color: 'var(--color-text)', textDecoration: 'none' }} /> &nbsp;&nbsp;New
                    </Link>
                  </li>
                  <li> {/* class="active" */}
                    <Link to={Constants.URLConstants.MESSAGESINBOX} style={{ cursor: 'pointer', color: 'var(--color-text)', textDecoration: 'none' }}>
                      {/* <span class="pull-right">12</span> */}
                      <i className="fa fa-envelope" style={{ cursor: 'pointer', color: 'var(--color-text)', textDecoration: 'none' }} /> &nbsp;&nbsp;Inbox
                    </Link>
                  </li>
                  <li>
                    <Link to={Constants.URLConstants.MESSAGESOUTBOX} style={{ cursor: 'pointer', color: 'var(--color-text)', textDecoration: 'none' }}><i className="fa fa-envelope-open-text" style={{ cursor: 'pointer', color: 'var(--color-text)', textDecoration: 'none' }} /> &nbsp;&nbsp;Outbox</Link>
                  </li>
                </ul>
              </form>
            </div>
          </div>
          <div className="col-md-9 form-group">
            <div className="panel-body">
              <form action="add_message.php" method="post" name="add_message_form">
                <input type="hidden" name="action" defaultValue="add" />
                <input type="hidden" name="sender" defaultValue="Beta_Tdo" />
                <br />
                <div className="row">

                  <div className="col-md-12 ">
                    <div className="form-group">
                      <h5><b>To:</b><input className="form-control" type="hidden" name="rdReceiver" defaultValue="A" defaultChecked="checked" />&nbsp;Agent </h5>
                    </div>
                  </div>
                  <div className="col-md-12 ">
                    <div className="form-group">
                      <label>Subject:</label>
                      {/* <td>&nbsp;:&nbsp;</td> */}
                      <input className="form-control form-control-sm required test123" type="text" name="txt_msg_subject" size={45} maxLength={200} />
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-sm-12 ">
                    <div className="form-group">
                      <label>Message:</label>
                      {/* <td>&nbsp;:&nbsp;</td> */}
                      <textarea className="form-control form-control-sm required" name="txtar_msg" rows={5} cols={45} defaultValue={""} />
                      {/* <div class="summernote required"  name="txtar_msg">
                              </div> */}
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-3 ">
                    <div className="form-group">
                      <label>Branch</label>
                      <MultiSelect
                        options={add_options}
                        isSearchable
                        placeholder="- Select Branch -"
                        noOptionsMessage={() => "No Branch Found"}
                        className="custom-select"

                      />
                    </div>
                  </div>
                  <div className="col-md-3 ">
                    <div className="form-group">
                      <label>Booking ID</label>
                      {/* <td>&nbsp;:&nbsp;</td> */}
                      {/* <select name="sel_booking" id="booking" >
                                      <option value="0">--Select Booking--</option>
                                      
                                  </select> */}
                      <input className="form-control form-control-sm required" type="text" name="sel_booking" id="sel_booking" />
                    </div>
                  </div>
                </div>
                <br />
                <button className="btn btn-dark btn-sm form-group" type="button" name="b1" id="b1" value="SUBMIT" onclick="Javascriptsubmit_form(document.forms['add_message_form'])">{/* onblur="Javascript:checkBookingId( */}
                  <i className="fa fa-floppy-o" />
                  &nbsp;Send
                </button>
              </form>
            </div>
          </div>
        </div>


      </div>
    </>
  );
};
export default MessagesNew;