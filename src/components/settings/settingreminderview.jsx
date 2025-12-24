import { connect } from "react-redux";
import Constants from "../../constants/routes";
import Header2 from "../header2/header2";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SettingReminderView = ({ data }) => {
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
          title="NOTE DETAILS"
          linkText1="Search Note"
          linkText2="Note Details"
          link1={Constants.URLConstants.SETTINGREMINDERSEARCH}
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
                  Booking ID : {data.bookingId}
                </h5>
              </div>
            </div>
          </div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Note Set By</label>
                  <div>{data.userName}</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Note Set Date</label>
                  <div>{formattedDate}</div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Note</label>
                  <div>{data.note}</div>
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
export default connect(mapStateToProps)(SettingReminderView);
