import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";

const AccountsSuppliersPaymentView = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="PAYMENTS" />

        {/* First Row*/}
        <form>
          <div className="panel-body">
            <div className="row mb-3">
              <div className="form-group col-md-12 col-xs-12">
                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  value="Print"
                  onClick={() => window.print()}
                >
                  <i className="fa fa-print" />
                  &nbsp;Print
                </button>
                &nbsp;&nbsp;
                <Link
                  to={Constants.URLConstants.ACCOUNTSSUPPLIERSPAYMENTSEARCH}
                  style={{ textDecoration: "none" }}
                >
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    value="Back"
                  >
                    <i className="fa fa-reply" />
                    &nbsp;Back
                  </button>
                </Link>
              </div>
            </div>
            <div className="row">
              <div className=" form-group col-md-3">
                <label>Supplier</label>
                <div>Sabre</div>
              </div>
              <div className=" form-group col-md-3">
                <label>Payment No.</label>
                <div>2021/11355</div>
              </div>
              <div className=" form-group col-md-3">
                <label>Date of Payment</label>
                <div>Feb 22, 2021</div>
              </div>
              <div className=" form-group col-md-3">
                <label>Particulars</label>
                <div>Dedit Note for :- 27954 Booking Modified</div>
              </div>
              <div className=" form-group col-md-3">
                <label>Amount Paid</label>
                <div>BHD&nbsp; 10.000</div>
              </div>
              <div className=" form-group col-md-3">
                <label>Mode of Payment</label>
                <div>&nbsp;&nbsp;Debit Note </div>
              </div>
              <div className=" form-group col-md-3">
                <span className="actionlink" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default AccountsSuppliersPaymentView;
