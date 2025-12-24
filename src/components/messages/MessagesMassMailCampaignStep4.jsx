import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
;


const MessagesMassMailCampaignStep4 = () => {



  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">

        <Header2 title="STEP 4 : EMAIL PREVIEW" linkText1="Campaigns"  linkText2="Add Campaign" link1={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSEARCH} />



        <div>
  {/* First Row*/}
  <div className="panel-footer" style={{backgroundColor: '#f5f5f5'}}>
    <style type="text/css" dangerouslySetInnerHTML={{__html: "\n                .steps {\n                    display: inline-block;\n                }\n            " }} />
    <div className="text-center">
    <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANNEW}>
        <div className="btn btn-default bt btn-sm steps">Step 1 : Add Name Campaign </div></Link>
      <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSTEP2}>
        <div className="btn btn-default btn-sm steps">Step 2 : Add Setup</div></Link>
      <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSTEP3}>
        <div className="steps btn btn-default btn-sm">Step 3 : Add Content</div></Link>
      <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSTEP4}>
        <div className="steps btn btn-dark btn-sm">Step 4 : Preview</div></Link>
      <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSTEP5}>
        <div className="steps btn btn-default btn-sm">Step 5 : Schedule</div></Link>
    </div>
    <br />
  </div>
  <form>
    <div className="panel-body">
      <div className="row">
        <div className="col-md-3 form-group ">
          <label>Email Preview</label><br />
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 form-group ">
          <button type="button" className="btn btn-dark btn-sm" name="add" value="EDIT" onclick="window.location='campaigns.php?action=schedule&cid=3&'">
            <i className="fa fa-pencil-square-o" style={{color:'#fff'}} />
            &nbsp;Update
          </button>&nbsp;&nbsp;
          <a href="MessagesMassMailCampaignsNewStep5.html" className="btn btn-dark btn-sm" value="NEXT" onclick="window.location='campaigns.php?action=schedule&cid=3&'">
            <i className="fa fa-arrow-circle-right" />
            &nbsp;Next</a>
        </div>
      </div>
    </div>
  </form>
</div>




      </div>
    </>
  );
};
export default MessagesMassMailCampaignStep4;