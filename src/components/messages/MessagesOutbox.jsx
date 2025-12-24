import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";



const MessagesOutbox = () => {



  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">

        <Header2 title="MESSAGE OUTBOX" linkText1="Message Outbox"/>



        <div className="row">
  <div className="col-md-3 form-group" style={{fontFamily: '', fontSize: '13px!important'}}>
    <div className="panel-body" style={{padding: '8px 12px'}}>
      <form style={{paddingRight: '14px'}}>
        <ul className="mailbox-list" style={{marginTop: 0, marginBottom: '10px'}}>
          <li> {/* class="active" */}
          <Link to={Constants.URLConstants.MESSAGESNEW} style={{cursor: 'pointer', color: 'var(--color-text)', textDecoration: 'none'}}>
              {/* <span class="pull-right">12</span> */}
              <i className="fa fa-pencil" style={{cursor: 'pointer', color: 'var(--color-text)', textDecoration: 'none'}}/> &nbsp;&nbsp;New
            </Link>
          </li>
          <li> {/* class="active" */}
          <Link to={Constants.URLConstants.MESSAGESINBOX} style={{cursor: 'pointer', color: 'var(--color-text)', textDecoration: 'none'}}>
              {/* <span class="pull-right">12</span> */}
              <i className="fa fa-envelope" style={{cursor: 'pointer', color: 'var(--color-text)', textDecoration: 'none'}}/> &nbsp;&nbsp;Inbox
            </Link>
          </li>
          <li className="active">
          <Link to={Constants.URLConstants.MESSAGESOUTBOX} style={{cursor: 'pointer', color: 'var(--color-text)', textDecoration: 'none'}}><i className="fa fa-envelope-open-text" style={{cursor: 'pointer', color: 'var(--color-text)', textDecoration: 'none'}} /> &nbsp;&nbsp;Outbox</Link>
          </li>
        </ul>
      </form>
    </div>
  </div>
  <div className="col-md-9">
    <div className="panel-body noTableMargin" style={{padding: '22px 12px'}}>
      <form style={{paddingRight: '14px'}}>
        <div className="dataTables_scroll">
          <div className="alert alert-danger text-center form-group" style={{top: '23px', marginBottom: '7px', marginTop: '-22px', borderRadius: 0, border: '1px solid #e4e5e7', borderBottom: 'none', color: 'var(--color-red)', backgroundColor: '#f2dede', borderColor: '#ebccd1'}}>
            <h6 style={{margin: '2px 0px', color: '#842029 !important', fontWeight: 400}}>No Message found in the system.
            </h6>
          </div>
        </div>
      </form></div>
  </div>
</div>


      </div>
    </>
  );
};
export default MessagesOutbox;