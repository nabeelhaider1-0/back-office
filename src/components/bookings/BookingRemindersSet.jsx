import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
const BookingReminderSet = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="SET NOTE REMINDER"
          linkText1="Search Note"
          linkText2="Set Note Reminder"
          link1={Constants.URLConstants.BOOKINGSREMINDERSEARCH}
        />

        <div>
          <div
            className="panel-body sectHeader "
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
                  Booking ID : TD829060
                </h5>
              </div>
            </div>
          </div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-3">
                  <label htmlFor="exampleInputEmail1">Note Set By</label>
                  <div>195</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Note Set Date</label>
                  <div>30-Aug-2022 (10:01:08)</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Note</label>
                  <div>sadasd ad asd asd</div>
                </div>
                <div className="form-group col-md-3 col-xs-12">
                  <label>Remind Date Time?</label>
                  <div
                    className="input-group date col-md-12 col-xs-12"
                    id="reminddatetime"
                  >
                    <Flatpickr
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      options={{ dateFormat: "Y-m-d" }}
                    />
                    <span className="input-group-addon dateIcon">
                      <span className="fa fa-th" />
                    </span>
                  </div>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="form-group col-md-12">
                  <button
                    className="btn btn-dark btn-sm"
                    type="button"
                    name="b1"
                    id="b1"
                    value="SUBMIT"
                    onclick="Javascript submit_form(document.forms['add_note_form']);"
                  >
                    <i className="fa fa-floppy-o" />
                    &nbsp;Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default BookingReminderSet;
