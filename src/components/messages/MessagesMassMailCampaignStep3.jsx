import { Link } from "react-router-dom";

import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { modules } from "../../constants/contants";




const MessagesMassMailCampaignStep3 = () => {

  const [value, setValue] = useState('');
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">

        <Header2 title="STEP 3 : ADD CONTENT" linkText1="Campaigns"  linkText2="Add Campaign" link1={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSEARCH} />
        <div className="panel-footer" style={{backgroundColor: '#f5f5f5'}}>
    <style type="text/css" dangerouslySetInnerHTML={{__html: "\n                .steps {\n                    display: inline-block;\n                }\n            " }} />
    <div className="text-center">
    <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANNEW}>
        <div className="btn btn-default bt btn-sm steps">Step 1 : Add Name Campaign </div></Link>
      <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSTEP2}>
        <div className="btn btn-default btn-sm steps">Step 2 : Add Setup</div></Link>
      <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSTEP3}>
        <div className="steps btn btn-dark btn-sm">Step 3 : Add Content</div></Link>
      <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSTEP4}>
        <div className="steps btn btn-default btn-sm">Step 4 : Preview</div></Link>
      <Link to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSTEP5}>
        <div className="steps btn btn-default btn-sm">Step 5 : Schedule</div></Link>
    </div>
    <br />
  </div>

  <form>
  <div className="panel-body">
    <div className="row">
      <div className="col-md-12 form-group  phps_row_0">
        <label>Please choose one of the below option for message :</label><br /><p>To add dynamic User Name
          in the content, use "###SUBSCRIBER_NAME###" in your below HTML area where you want to show.</p>
      </div>
      <div className="col-md-12 form-group phps_row_1 ">
        <div className="radio radio-success radio-inline"style={{paddingLeft:'0px !important'}}>
          <input type="radio" name="content_type[]" id="content_type_message" defaultValue={1} className="test123" />
          <label htmlFor="content_type_message">Image and Text</label>
        </div>
        {/* <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} className="editor-input"/> */}
      </div>
      <div className="col-md-12 form-group  phps_row_0 mt-5">
        <div className="radio radio-success radio-inline mt-5">
          <input type="radio" name="content_type[]" id="content_type_up_image" defaultValue={2} />
          <label htmlFor="content_type_up_image">Upload Image</label>
        </div>
        <span className="uniqFile input-group"><span className="input-group-addon fa fa-upload myInputFile"><input type="file" name="file_up" id="file_up" /></span></span>
      </div>
      <div className="col-md-12 form-group phps_row_1 mt-2 ">
        <div className="col-md-3 row">
          <div className="radio radio-success radio-inline">
            <input type="radio" name="content_type[]" id="content_type_choose_image" defaultValue={3} onclick=":add_modal();" title="Choose an Image" data-toggle="modal" data-target="#myModal1" />
            <label htmlFor="content_type_choose_image">Choose an Image</label>
          </div>
        </div>
      </div>
      <br />
      <div className="col-md-3 form-group  phps_row_0">
        <button type="button" className="btn btn-dark btn-sm" name="add" value="SAVE" tabIndex={6} onclick="return validate_content(document.forms['frm_add_content'],'html');">
          <i className="fa fa-floppy-o" />
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
export default MessagesMassMailCampaignStep3;