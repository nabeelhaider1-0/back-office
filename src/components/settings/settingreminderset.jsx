import Flatpickr from "react-flatpickr";
import React, { useEffect, useState } from "react";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { updateReminderSetting } from "../../Apis/API";
import { Slide, toast } from "react-toastify";

const SettingReminderSet = ({ data }) => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [formData, setFormData] = useState({
    remindMe: "",
  });

  const navigate = useNavigate();
  const handleSaveClick = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const selectedDate = startDate ? startDate[0] : null;
    let remindMeTime = null;

    if (selectedDate) {
      // Get the timezone offset in minutes and convert it to milliseconds
      const timezoneOffset = selectedDate.getTimezoneOffset() * 60000;

      // Adjust the date by adding the timezone offset
      const adjustedDate = new Date(selectedDate.getTime() - timezoneOffset);

      // Format the adjusted date as required
      remindMeTime = adjustedDate.toISOString().split("T")[0];
    }

    // Update formData with the selected date
    setFormData((prevState) => ({
      ...prevState,
      remindMe: remindMeTime,
    }));

    try {
      const response = await updateReminderSetting(data.uuid, {
        branch: data.branch,
        bookingId: data.bookingId,
        remindMe: remindMeTime,
        reminderSet: data.reminderSet,
        note: data.note,
      });

      if (response.data.statusCode === 200) {
        setFormData({
          remindMe: "",
        });
        data = null;
        // localStorage.setItem('token', response.data.data.token)

        toast.success("Reminder Updated Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
        navigate(Constants.URLConstants.SETTINGREMINDERSEARCH);
      }
    } catch (error) {
      // console.error(error);
    }
  };
  const navigateOnRefresh = useNavigate();
  useEffect(() => {
    if (!data || Object.keys(data).length === 0) {
      // If data is not available or if it's an empty object, navigate to the branch search page
      navigateOnRefresh(Constants.URLConstants.SETTINGREMINDERSEARCH);
    }
  }, [data, navigateOnRefresh]);

  if (!data || Object.keys(data).length === 0) {
    // Return null to prevent rendering anything else in this component if data is not available
    return null;
  }

  const createdAt = new Date(data.timestamps.createdAt);

  const day = createdAt.getDate().toString().padStart(2, "0"); // Get day with leading zero if necessary
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[createdAt.getMonth()]; // Get month name from array
  const year = createdAt.getFullYear().toString(); // Get full year
  const hours = createdAt.getHours().toString().padStart(2, "0"); // Get hours with leading zero if necessary
  const minutes = createdAt.getMinutes().toString().padStart(2, "0"); // Get minutes with leading zero if necessary
  const seconds = createdAt.getSeconds().toString().padStart(2, "0"); // Get seconds with leading zero if necessary

  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="SET NOTE REMINDER"
          linkText1="Search Note"
          linkText2="Set Note Reminder"
          link1={Constants.URLConstants.SETTINGREMINDERSEARCH}
        />
        <div>
          <div
            className="panel-body sectHeader"
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
                  Booking ID : {data.bookingId}
                </h5>
              </div>
            </div>
          </div>
          <form onSubmit={handleSaveClick}>
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-3">
                  <label htmlFor="exampleInputEmail1">Note Set By</label>
                  <div> {data.userName}</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Note Set Date</label>
                  <div>{formattedDate}</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Note</label>
                  <div> {data.note}</div>
                </div>
                <div className="form-group col-md-3 col-xs-12">
                  <label>Remind Date Time?</label>
                  <div
                    className="input-group date col-md-12 col-xs-12"
                    id="reminddatetime"
                  >
                    <Flatpickr
                      value={startDate || [new Date(data.remindMe)]}
                      onChange={(date) => setStartDate(date)}
                      options={{ dateFormat: "Y-m-d" }}
                    />
                    <span className="input-group-addon dateIcon">
                      <span className="fa fa-th" />
                    </span>
                  </div>
                  {/* Hidden input for remindMe */}
                  <input
                    type="hidden"
                    name="remindMe"
                    value={formData.remindMe}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="form-group col-md-12">
                  <button
                    className="btn btn-dark btn-sm"
                    name="b1"
                    id="b1"
                    type="submit"
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
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps)(SettingReminderSet);
