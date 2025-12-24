import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";



const MessagesMassMailCampaignNew = () => {



  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">

        <Header2 title="STEP 1 : ADD NAME CAMPAIGN" linkText1="Campaigns"  linkText2="Add Campaign" link1={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSEARCH} />



        <div>
  {/* First Row*/}
  <div className="panel-footer" style={{backgroundColor: '#f5f5f5'}}>
    <style type="text/css" dangerouslySetInnerHTML={{__html: "\n                .steps {\n                    display: inline-block;\n                }\n            " }} />
    <div className="text-center">
      <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANNEW}>
        <div className="btn btn-dark btn-sm steps">Step 1 : Add Name Campaign </div></Link>
      <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSTEP2}>
        <div className="btn btn-default btn-sm steps">Step 2 : Add Setup</div></Link>
      <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSTEP3}>
        <div className="steps btn btn-default btn-sm">Step 3 : Add Content</div></Link>
      <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSTEP4}>
        <div className="steps btn btn-default btn-sm">Step 4 : Preview</div></Link>
      <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSTEP5}>
        <div className="steps btn btn-default btn-sm">Step 5 : Schedule</div></Link>
    </div>
    <br />
  </div>
  <form>
    <div className="panel-body">
      <div className="form-group row mt-1">
        <div className="col-md-3 form-group  phps_row_0">
          <label>Select Campaign Type</label><br />
          <div className="radioline1">
            <div className="radio radio-success radio-inline">
              <input type="radio" className="padd_3 test123" id="plain" name="campaign_type[]" defaultValue="plain_text" />
              <label htmlFor="plain">Plain Text</label>
            </div>
            <div className="radio radio-success radio-inline">
              <input type="radio" className="padd_3" id="app" name="campaign_type[]" defaultValue="html" />
              <label htmlFor="html">HTML</label>
            </div>
          </div>
        </div>
        <div className="col-md-3 form-group phps_row_1">
          <label>Name this Campaign</label>
          <input type="text" className="form-control form-control-sm required" name="txt_name" size={45} maxLength={255}  tabIndex={1} />
        </div>
        <div className="col-md-3 form-group  phps_row_0">
          <label>Add Short Description</label>
          <input type="text" className="form-control form-control-sm" name="txt_short_desc" size={45} maxLength={255} tabIndex={1}  />
        </div>
        <div className="col-md-12 form-group phps_row_1">
          <label>Select list/s to send it to html</label>
          <font color="#ff0000" size={5}> * </font><br />
          <div className="col-md-3">
            <div className="checkbox checkbox-success checkbox-inline">
              <input type="checkbox" className="padd_3" name="sub_lists[]" id="lbl_1" defaultValue={1} style={{marginLeft: '23px'}} />
              <label htmlFor="lbl_1">Qtech Profile</label>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12 form-group  phps_row_0">
          <a href="MessagesMassMailCampaignsNewStep2.html" className="btn btn-dark btn-sm" name="add" value="SUBMIT" onclick="return validate_name_campaign(document.forms['frm_add_name_campaign']);">
            <i className="fa fa-floppy-o" />
            &nbsp;Save
          </a>
        </div>
      </div>
    </div>
  </form>
  {/* End */}
</div>




      </div>
    </>
  );
};
export default MessagesMassMailCampaignNew;