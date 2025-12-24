import React, { useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { paymentModeOptionss, supplierOptions } from "../../constants/contants";

const AccountsSuppliersPaymentNew = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [startDate1, setStartDate1] = useState(null);
  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
  };
  const handleTrashClick1 = () => {
    // Function to clear both start and end dates
    setStartDate1(null);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="ADD NEW PAYMENT" />

        <form>
          <div className="form-group row ">
            <div className="form-group col-md-3">
              <label>Supplier</label>
              <MultiSelect
                options={supplierOptions}
                isSearchable
                placeholder="- Select Supplier-"
                noOptionsMessage={() => "No Supplier Found"}
                className="custom-select required"
              />
              <input type="hidden" id="supplier_type" name="supplier_type" />
            </div>
            <div className="form-group col-md-3 ">
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
                      <i className="fa fa-th" />
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
          </div>
          {/* 2nd Row */}
          <div className="row mt-4">
            <div className="form-group col-md-3">
              <label>Particulars</label>
              <textarea
                name="txtar_particulars"
                rows={5}
                cols={27}
                className="required selectpicker form-control form-control-sm show-menu-arrow selectstyle"
                data-live-search="true"
                defaultValue={""}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Payments Due Till Date</label>
              <input
                type="text"
                name="txt_balance"
                className="form-control form-control-sm"
                onkeypress="return false;"
                id="txt_balance"
                size={9}
                readOnly
              />
            </div>
            <div className="form-group col-md-3">
              <label>
                Payment Amount
                <span id="supplier_curr" />
              </label>
              <input
                type="text"
                style={{ border: "none", display: "none" }}
                id="payment_received"
              />
              <input
                type="text"
                id="txt_amount_received"
                className="required selectpicker form-control form-control-sm show-menu-arrow selectstyle"
                name="txt_amount_received"
                size={9}
                onchange="get_payment_exchange_amount(this);"
                onblur="extractNumber(this,3,true);"
                onkeyup="extractNumber(this,3,true);"
                data-live-search="true"
              />
              <input
                type="hidden"
                id="txt_amount_received_original"
                name="txt_amount_received_original"
                size={9}
              />
              <span style={{ display: "block" }} id="supplier_payables_div" />
            </div>
            <div className="form-group col-md-3 ">
              <label>Rate of Exchange</label>
              <input
                className="required form-control form-control-sm"
                type="text"
                name="txt_system_exchange_rate"
                size={11}
                id="txt_system_exchange_rate"
              />
            </div>
            <div
              className="form-group col-md-3 "
              style={{ marginLeft: "426px", marginTop: "-59px!important" }}
            >
              <label>Amount in (USD) currency</label>
              <input
                className="required form-control form-control-sm"
                type="text"
                name="system_exchange_rate"
                size={11}
                defaultValue={0.0}
                id="system_exchange_rate"
                readOnly
              />
            </div>
            <div
              className="form-group col-md-3"
              style={{ marginTop: "-59px!important" }}
            >
              <label>Mode of Payment</label>
              <MultiSelect
                options={paymentModeOptionss}
                isSearchable
                placeholder="- Select Payment-"
                noOptionsMessage={() => "No Payment Found"}
                className="custom-select "
              />
            </div>
          </div>
          {/* 3rd Row */}
          <div id="hide" style={{ display: "block" }}>
            <div className="form-group row mt-3">
              <div className="form-group col-md-12">
                <h5>Supplier Bank Details (To) :</h5>
              </div>
              <div className="form-group col-md-3">
                <label className="bName">Cheque Bank Name</label>
                <input
                  type="text"
                  className="selectpicker form-control form-control-sm show-menu-arrow selectstyle"
                  name="txt_bank_name"
                  size={29}
                  data-live-search="true"
                />
              </div>
              <div className="form-group col-md-3">
                <label className="bInst">Cheque Instrument No</label>
                <input
                  type="text"
                  className="selectpicker form-control form-control-sm show-menu-arrow selectstyle"
                  name="txt_instrument_no"
                  size={29}
                  data-live-search="true"
                />
              </div>
              <div className="form-group col-md-3 ">
                <label className="bDate">Cheque Date</label>
                <div className="row">
                  <div className="col-md-11 col-sm-11 col-xs-11 dateField">
                    <div
                      className="input-group date col-md-12 col-sm-12 col-xs-12"
                      id="booking_to_date_cal"
                    >
                      <Flatpickr
                        value={startDate1}
                        onChange={(date) => setStartDate1(date)}
                        options={{ dateFormat: "Y-m-d" }}
                        style={{ width: "277.6px" }}
                      />
                      <span className="input-group-addon">
                        <i className="fa fa-th" />
                      </span>
                    </div>
                  </div>
                  <div
                    className="col-md-1 col-sm-1 col-xs-1 row"
                    style={{ padding: "0px", cursor: "pointer" }}
                  >
                    <span
                      className="input-group-addon pointer"
                      onClick={handleTrashClick1}
                      style={{ textAlign: "center" }}
                    >
                      <i className="fa fa-trash" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 4th Row */}
          <div className="row mt-3">
            <div className="form-group col-md-12">
              <button
                type="button"
                className="btn btn-dark btn-sm"
                value="Submit"
                id="submit_button"
                onclick="javaScript submit_form(document.forms['rec_frm'],'save');"
              >
                <i className="fa fa-floppy-o" />
                &nbsp;Save
              </button>
              &nbsp;&nbsp;
              <button
                type="reset"
                className="btn btn-outline-secondary btn-sm"
                value="Reset"
                onclick="reset1();"
              >
                <i className="fa fa-repeat" />
                &nbsp;Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default AccountsSuppliersPaymentNew;
