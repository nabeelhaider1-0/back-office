import { Link } from "react-router-dom";

import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { modules } from "../../constants/contants";


const MessagesMassMailCampaignStep2 = () => {

  const [value, setValue] = useState('');
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">

        <Header2 title="STEP 2 : ADD SETUP" linkText1="Campaigns"  linkText2="Add Campaign" link1={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSEARCH} />
        <div className="panel-footer" style={{backgroundColor: '#f5f5f5'}}>
    <style type="text/css" dangerouslySetInnerHTML={{__html: "\n                .steps {\n                    display: inline-block;\n                }\n            " }} />
    <div className="text-center">
    <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANNEW}>
        <div className="btn btn-default bt btn-sm steps">Step 1 : Add Name Campaign </div></Link>
      <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSTEP2}>
        <div className="btn btn-dark btn-sm steps">Step 2 : Add Setup</div></Link>
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
    <div className="row form-group">	
      <div className="col-md-3 form-group phps_row_0">	
        <label>From Name</label>
        <input type="text" className="form-control form-control-sm test123" name="txt_from_name" size={45}  maxLength={255} tabIndex={1} />
      </div>
      <div className="col-md-3 form-group phps_row_1">
        <label>From Email Address</label>
        <input type="text" className="form-control form-control-sm " name="txt_from_email" size={45}  maxLength={255} tabIndex={2} />
      </div>
      <div className="col-md-3 form-group phps_row_0">
        <label>Subject</label>&nbsp;&nbsp;Character(s) left: <input readOnly type="text" id="remLen" name="remLen" size={2} maxLength={3} defaultValue={40} style={{border: 'medium none'}} />
        <input type="text" title data-toggle="tooltip" data-placement="top" className="form-control form-control-sm  required" id="subject" required name="txt_subject" size={45}  maxLength={255} tabIndex={3} onkeyup="imiter();" onblur="limiter();" data-original-title="40 characters" />
      </div>
      <div className="col-md-3 form-group phps_row_1">
        <label>Reply-to Email Address</label>
        <input type="text" className="form-control form-control-sm " name="txt_reply_to" size={45}  maxLength={255} tabIndex={4} />
      </div>
      <div className="col-md-12 form-group phps_row_0">
        <label>Footer Details (Optional, Will override generic footer)</label>
        {/* <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} className="editor-input"/> */}
      </div>
    </div>
    <div className="row mt-5">
      <div className="col-md-3 form-group phps_row_1 mt-5">
        {/* <button type="button" name="add"  class="btn btn-primary" value ="PREVIOUS" onclick="window.location='campaigns.php?action=add_name_campaign&cid=3&'">
                      <h6>
                          <i class="fa fa-arrow-circle-left"></i>
                          &nbsp;Previous
                      </h6>
                  </button> */}
        <a href="MessagesMassMailCampaignsNewStep3.html" className="btn btn-dark btn-sm" name="add" value="SAVE" tabIndex={6} onclick="return validate_setup(document.forms['frm_add_setup']);">
          <i className="fa fa-floppy-o" />
          &nbsp;Save
        </a>
        {/* <button type="button" name="add" class="btn btn-primary" value="NEXT" onclick="window.location='campaigns.php?action=add_content&cid=3&'">
                      <h6>
                          <i class="fa fa-arrow-circle-right"></i>
                          &nbsp;Next
                      </h6>
                  </button> */}
      </div>
    </div>
  </div>
</form>



      </div>
    </>
  );
};
export default MessagesMassMailCampaignStep2;