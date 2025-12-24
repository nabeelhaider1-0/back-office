import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";

const AccountsAgentDebitView = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="DEBIT NOTES" />

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
                  <i className="fa fa-print" aria-hidden="true" />
                  &nbsp;Print
                </button>
                &nbsp;&nbsp;
                <Link
                  to={Constants.URLConstants.ACCOUNTSAGENTDEBITSEARCH}
                  style={{ textDecoration: "none" }}
                >
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    value="Back"
                  >
                    <i className="fa fa-reply" aria-hidden="true" />
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
                <label>Booking Id</label>
                <div>TD1128819</div>
              </div>
              <div className="form-group col-md-3">
                <label>Debit Note No</label>
                <div>DN00000009</div>
              </div>
              <div className="form-group col-md-3">
                <label>Date of Debit Note</label>
                <div>Jun 8, 2021</div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-3">
                <label>Particulars</label>
                <div>Debit Note For TD1128819</div>
              </div>
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
export default AccountsAgentDebitView;
