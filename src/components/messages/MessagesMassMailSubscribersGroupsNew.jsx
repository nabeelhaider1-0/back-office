import Constants from "../../constants/routes";
import Header2 from "../header2/header2";



const MessagesMassMailSubscribersGroupNew = () => {



  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">

        <Header2 title="SUBSCRIBER GROUP" linkText1="List Subscriber Group" linkText2="Add Subscriber Group" link1={Constants.URLConstants.MESSAGESMASSMAILSUBSCRIBERGROUPSEARCH} />

        <form>
  <div className="panel-body">
    <div className="row">
      <div className="col-md-3 phps_row_0 form-group">	
        <label>Name this List</label>
        <input className="form-control form-control-sm required test123" type="text" name="txt_name" size={45} maxLength={255} tabIndex={1} />
      </div>
      <div className="col-md-3 phps_row_1 form-group">	
        <label>Specify From Name</label>
        <input className="form-control form-control-sm required" type="text" name="txt_from_name" size={45} maxLength={255} tabIndex={1} />
      </div>
      <div className="col-md-3 phps_row_0 form-group">	
        <label>Specify Reply-to email</label>
        <input className="form-control form-control-sm required" type="text" name="txt_reply_to" size={45} maxLength={255} tabIndex={1} />	
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-md-12 phps_row_1 form-group">	
        <button className="btn btn-dark btn-sm" type="submit" name="add" value="SUBMIT">
          <i className="fa fa-floppy-o" aria-hidden="true" />
          &nbsp;Save
        </button>
      </div>
    </div>
  </div>
</form>




      </div>
    </>
  );
};
export default MessagesMassMailSubscribersGroupNew;