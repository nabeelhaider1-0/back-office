import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";

const AccountsSuppliersPaymentEdit = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="EDIT PAYMENT" />

        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className=" form-group col-md-3">
                  <label>Supplier</label>
                  <div>Sabre</div>
                </div>
                <div className=" form-group col-md-3">
                  <label>Supplier Type</label>
                  <div>Online</div>
                </div>
                {/*<div class=" form-group col-md-3">
              <label>Payment No.</label>
              <div>
                  55
              </div>
          </div>*/}
                <div className=" form-group col-md-3">
                  <label>Payment No.</label>
                  <div>
                    <span id="doc_no">2021/11355</span>
                  </div>
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
                <div className="form-group col-md-3">
                  <label>
                    Payment /Paid Amount in BHD
                    <span id="supplier_curr" />
                    <input
                      type="text"
                      style={{ border: "none", display: "none" }}
                      id="payment_received"
                    />
                  </label>
                  <input
                    type="text"
                    id="txt_amount_received"
                    className="required selectpicker form-control form-control-sm show-menu-arrow  test123"
                    name="txt_amount_received"
                    size={8}
                    defaultValue={10.0}
                    onbur="extractNumber(this,3,true);"
                    onkeyup="extractNumber(this,3,true);"
                    data-live-search="true"
                  />
                </div>
                <div className=" form-group col-md-3">
                  <label>Unadjusted Amount</label>
                  <div>BHD&nbsp; 10.000</div>
                </div>
                <div className=" form-group col-md-3">
                  <label>Mode of Payment</label>
                  <div>Debit Note</div>
                </div>
              </div>
              <div className="row"></div>
            </div>
          </form>
          <div className="row mt-3">
            <div className="form-group col-md-12">
              <button
                type="button"
                className="btn btn-dark btn-sm"
                value="Submit"
                onclick="javaScript submit_form(document.forms['edit_payment_form'],0);"
              >
                <i className="fa fa-floppy-o" />
                &nbsp;Save
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
        </div>
      </div>
    </>
  );
};
export default AccountsSuppliersPaymentEdit;
