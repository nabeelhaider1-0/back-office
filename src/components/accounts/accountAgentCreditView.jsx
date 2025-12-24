import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";

const AccountsAgentCreditView = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="CREDIT NOTES" />

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
                  to={Constants.URLConstants.ACCOUNTSAGENTCREDITSEARCH}
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
              <div className="form-group col-md-3">
                <label>Agent</label>
                <div>Vartak Holidazzle</div>
              </div>
              <div className="form-group col-md-3">
                <label>Credit Note No</label>
                <div>2021/12102</div>
              </div>
              <div className="form-group col-md-3">
                <label>Date of Credit Note</label>
                <div>Oct 13, 2021</div>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="exampleInputEmail1">Particulars</label>
                <div>Credit Note for :- TD1728884 Misc Booking Cancelled</div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-3">
                <label>Amount Received</label>
                <div>INR&nbsp;114.321</div>
              </div>
            </div>
            {/* End */}
          </div>
        </form>
      </div>
    </>
  );
};
export default AccountsAgentCreditView;
