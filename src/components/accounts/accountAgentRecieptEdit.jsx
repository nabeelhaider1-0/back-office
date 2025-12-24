import React, { useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { paymentModeOptions } from "../../constants/contants";

const AccountsAgentRecieptEdit = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="EDIT RECEIPT" />

        <form>
          <div className="panel-body">
            <div className="row">
              <div className=" form-group col-md-3">
                <label>Agent</label>
                <div>sqtech [ sqtech - CD0291 ]</div>
              </div>
              <div className=" form-group col-md-3">
                <label>Document No.</label>
                <div>Rcpt00000602</div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="form-group col-md-3">
                <label>Date of Payment</label>
                <div className="row">
                  <div className="col-md-11 col-sm-11 col-xs-11 dateField">
                    <div
                      className="input-group date col-md-12 col-sm-12 col-xs-12"
                      id="booking_to_date_cal"
                    >
                      <Flatpickr
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        options={{ dateFormat: "Y-m-d" }}
                        style={{ width: "277.2px" }}
                      />
                      <span className="input-group-addon">
                        <i className=" fas fa-th" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  <div
                    className="col-md-1 col-sm-1 col-xs-1 row"
                    style={{ padding: "0px", cursor: "pointer" }}
                  >
                    <span
                      className="input-group-addon pointer"
                      onClick={handleTrashClick}
                      style={{ textAlign: "center" }}
                    >
                      <i className="fa fa-trash" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
              <div className=" form-group col-md-3">
                <label>Particulars</label>
                <div>
                  <textarea
                    rows={5}
                    className="form-control form-control-sm"
                    cols={4}
                    id="particulars"
                    name="particulars"
                    defaultValue={"Booking done from TAPPAY payment gateway."}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className=" form-group col-md-3">
                <label>Amount Paid</label>
                <div>SAR&nbsp; 114.321</div>
              </div>
              <div className="form-group col-md-3">
                <label>
                  Payment /Paid Amount in SAR
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
                  className="required selectpicker form-control form-control-sm show-menu-arrow "
                  name="txt_amount_received"
                  size={8}
                  defaultValue="114.321"
                  onbur="extractNumber(this,3,true);"
                  onkeyup="extractNumber(this,3,true);"
                  data-live-search="true"
                />
              </div>
              <div className=" form-group col-md-3">
                <label>Unadjusted Amount</label>
                <div>SAR&nbsp; 0.000</div>
              </div>
              <div className=" form-group col-md-3">
                <label>Mode of Payment</label>
                <div>
                  <MultiSelect
                    options={paymentModeOptions}
                    isSearchable
                    placeholder="- Select Receipt -"
                    noOptionsMessage={() => "No Receipt Found"}
                    className="custom-select"
                  />
                </div>
              </div>
              {/* Added by brynal  on 22feb17 START*/}
              {/* added by rupesh 13jan2017 */}
            </div>
            {/* added by rupesh 13jan2017 */}
            <div className="row">
              <div className=" form-group col-md-3">
                <label>Remarks/Notes</label>
                <div>
                  <textarea
                    name="txt_remarks"
                    id="particulars"
                    rows={5}
                    className="form-control form-control-sm"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="form-group col-md-12 mt-2">
                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  value="Submit"
                  onclick="javaScript submit_form(document.forms['edit_receipt_form'],0);"
                >
                  <i className="fa fa-floppy-o" />
                  &nbsp;Save
                </button>
                &nbsp;&nbsp;
                <a
                  href="AccountsAgentsRecieptsSearch.html"
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
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default AccountsAgentRecieptEdit;
