import Header2 from "../header2/header2";



const MessagesMassMailCampaignSetting = () => {



  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">

        <Header2 title="CAMPAIGN SETTINGS" linkText1="Campaign Settings" />

        <form>
        <div className="panel-body">
  <div id="mesID" style={{display: 'none'}} />
  <div className="row">
    <div className="col-md-4 form-group phps_row_0">
      <label>Default Sender Name</label>
      <input className="form-control form-control-sm required test123" type="text" name="txt_sender_name" size={43}  />
    </div>
    <div className="col-md-4 form-group phps_row_1">
      <label>Default Sender Email</label>
      <input className="form-control form-control-sm required" type="text" name="txt_sender_email" size={43} maxLength={100}  />
    </div>
    <div className="col-md-4 form-group phps_row_0">
      <label>Default Reply To Email</label>
      <input className="form-control form-control-sm required" type="text" name="txt_reply_to" size={43} maxLength={100}  />
    </div>
    <div className="col-md-12 form-group phps_row_1 mt-2">
      <label>Unsubscribe Text (Please do not change the below format for Unsubscriber URL text, which
        will generate dynamic unsubscribe url as per Subscriber and will be used in Email.)</label>
      <textarea className="form-control form-control-sm" rows={4} cols={40} id="txt_unsubscribe" name="txt_unsubscribe" defaultValue={""} />
      {/* <div class="summernote" >
              
          </div> */}
    </div>
    <div className="col-md-12 form-group phps_row_0 mt-2">
      <label>Address Footer Information</label>
      <textarea className="form-control form-control-sm" rows={4} cols={40} id="txt_address_footer_information" name="txt_address_footer_information" defaultValue={""} />
      {/* <div class="summernote" >
              
          </div> */}
    </div>
  </div>
  <br />
  <div className="row">
    <div className="col-md-12 form-group phps_row_1">
      <button type="submit" className="btn btn-dark btn-sm" name="b1" value="SUBMIT">
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
export default MessagesMassMailCampaignSetting;