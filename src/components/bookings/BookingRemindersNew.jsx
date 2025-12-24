import { add_options, consultantsOptions } from "../../constants/contants";
import Constants from "../../constants/routes";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";



const BookingReminderNew = () => {




  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">

        <Header2 title="COMPOSE NOTE" linkText1="Search Note" linkText2="Compose Note" link1={Constants.URLConstants.BOOKINGSREMINDERSEARCH}/>

        <form>
  <div className="panel-body">
    <div className="row">
      <div className="form-group col-md-3" style={{display: 'none'}}>
        <label>Branch</label>
        <MultiSelect
                  options={add_options}
                  isMulti
                  isSearchable
                  placeholder="- Select Branch -"
                  noOptionsMessage={() => "No Branch Found"}
                  className="custom-select "

                />
      </div>
      <div className="form-group col-md-3">
        <label>Booking ID</label>
        <input className="form-control form-control-sm required test123" type="text" id="sel_booking" name="sel_booking"  />
      </div>
      <div className="form-group col-md-3">
        <label>Set a Reminder</label>
        <div>
          <div className="radioline1 mt-2">
            <div className="radio radio-success" style={{position: 'relative', display: 'inline-block'}}>
              <input type="radio" id="singleRadio1" name="rdReceiver" defaultValue="Y" onclick="javascriptcallCheckReminder(this.value)" />
              <label htmlFor="singleRadio1">Yes</label>
            </div>&nbsp;&nbsp;
            <div className="radio radio-success" style={{position: 'relative', display: 'inline-block'}}>
              <input type="radio" id="singleRadio2" name="rdReceiver" defaultValue="N" defaultChecked="checked" onclick="javascriptcallCheckReminder(this.value)" />
              <label htmlFor="singleRadio2">No</label>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group col-md-3" id="CalImg" style={{display: 'none'}}>
        <label>Remind me at</label>
        <div className="input-group date col-md-12 col-sm-12 col-xs-12" id="reminddatetime">
          <input className="form-control form-control-sm required" id="dateTime" name="dateTime" type="text" onkeydown="return false" />
          <span className="input-group-addon dateIcon"><i className="glyphicon glyphicon-th" /></span>
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Assigned to Consultant</label>
        <MultiSelect
                options={consultantsOptions}
                isSearchable
                placeholder="--Select--"
                noOptionsMessage={() => "No Consultant Found"}
                className="custom-select required"
              />
      </div>
      <div className="form-group col-md-12">
        <label>Note</label>
        {/* <div class="summernote required"name="txtar_msg">
              
          </div> */}
        <textarea name="txtar_msg" className="form-control form-control-sm required" rows={4} cols={80} defaultValue={""} />
      </div>
    </div>
    <br />
    <div className="row">
      <div className="form-group col-md-12">
        <button type="button" className="btn btn-dark btn-sm" name="b1" id="b1" value="SUBMIT" onclick="javascript submit_form(document.forms['add_note_form']);">
          <i className="fa fa-floppy-o" />&nbsp;Submit
        </button>
      </div>
    </div>
  </div>
</form>



      </div>
    </>
  );
};
export default BookingReminderNew;
