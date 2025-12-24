import Constants from "../../constants/routes";
import Header2 from "../header2/header2";

const BookingReminderView = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="NOTE DETAILS"
          linkText1="Search Note"
          linkText2="Note Details"
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
                  <label>Note Set By</label>
                  <div>195</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Note Set Date</label>
                  <div>30-Aug-2022 15:31:08</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Assigned to </label>
                  <div></div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Note</label>
                  <div>sadasd ad asd asd</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default BookingReminderView;
