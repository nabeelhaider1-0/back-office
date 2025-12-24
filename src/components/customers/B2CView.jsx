// import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";

const B2CView = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="VIEW B2C DETAILS"
          linkText1=" Search B2C"
          linkText2="View B2C"
          link1={Constants.URLConstants.CUSTOMERSB2CSEARCH}
        />

        <div>
          <form>
            <div className="panel-body">
              <br />
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Username</label>
                  <div>Kashif Mughal</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Email</label>
                  <div>kashif@gmail.com</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Phone Number</label>
                  <div>03028911301</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Password</label>
                  <div>*******</div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="form-group col-md-3">
                  <label>Last Booking Date</label>
                  <div>12/08/24</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Trips Booked</label>
                  <div>03</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Status</label>
                  <div>Active</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default B2CView;
