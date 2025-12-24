import React, { useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import {
  addrule_currencyOptions,
  agentSectionOptions,
  paymentModeOptions,
} from "../../constants/contants";

const AccountsAgentRecieptNew = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [startDate1, setStartDate1] = useState(null);
  const [startDate2, setStartDate2] = useState(null);
  const [startDate3, setStartDate3] = useState(null);
  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
  };
  const handleTrashClick1 = () => {
    // Function to clear both start and end dates
    setStartDate1(null);
  };
  const handleTrashClick2 = () => {
    // Function to clear both start and end dates
    setStartDate2(null);
  };
  const handleTrashClick3 = () => {
    // Function to clear both start and end dates
    setStartDate3(null);
  };

  const [selectedPaymentMode, setSelectedPaymentMode] = useState("CHQ");

  const handlePaymentModeChange = (selectedOption) => {
    setSelectedPaymentMode(selectedOption.value);
  };

  const renderBankDetails = () => {
    switch (selectedPaymentMode) {
      case "CHQ":
        return (
          <div className="row mt-3">
            <div className="form-group col-md-12">
              <h5>Agent Bank Details (From) :</h5>
            </div>
            <div className="form-group col-md-3">
              <label className="bName">Cheque Bank Name</label>
              <input
                type="text"
                name="txt_bank_name"
                size={29}
                className="input_style4 selectpicker form-control form-control-sm show-menu-arrow selectstyle"
                data-live-search="true"
              />
            </div>
            <div className="form-group col-md-3">
              <label className="bInst">Cheque Instrument No</label>
              <input
                type="text"
                name="txt_instrument_no"
                size={29}
                className="input_style4 selectpicker form-control form-control-sm show-menu-arrow selectstyle"
                data-live-search="true"
              />
            </div>
            <div className="form-group col-md-3">
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
                      style={{ width: "272px" }}
                    />
                    <span className="input-group-addon">
                      <i className="fas fa-th" />
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
        );

      case "EFT":
        return (
          <div className="row mt-3">
            <div className="form-group col-md-12">
              <h5>Agent Bank Details (From) :</h5>
            </div>
            <div className="form-group col-md-3">
              <label className="bName">EFT Bank Name</label>
              <input
                type="text"
                name="txt_bank_name"
                size={29}
                className="input_style4 selectpicker form-control show-menu-arrow selectstyle"
                data-live-search="true"
              />
            </div>
            <div className="form-group col-md-3">
              <label className="bInst">EFT Instrument No</label>
              <input
                type="text"
                name="txt_instrument_no"
                size={29}
                className="input_style4 selectpicker form-control show-menu-arrow selectstyle"
                data-live-search="true"
              />
            </div>
            <div className="form-group col-md-3">
              <label className="bDate">EFT Date</label>
              <div className="row">
                <div className="col-md-10 col-sm-10 col-xs-10 padR0">
                  <div
                    className="input-group date col-md-12 col-sm-12 col-xs-12"
                    id="paymentdate1"
                  >
                    <Flatpickr
                      value={startDate2}
                      onChange={(date) => setStartDate2(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "242px" }}
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
                    onClick={handleTrashClick2}
                    style={{ textAlign: "center" }}
                  >
                    <i className="fa fa-trash" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "DFT":
        return (
          <div className="row mt-3">
            <div className="form-group col-md-12">
              <h5>Agent Bank Details (From) :</h5>
            </div>
            <div className="form-group col-md-3">
              <label className="bName">Draft Bank Name</label>
              <input
                type="text"
                name="txt_bank_name"
                size={29}
                className="input_style4 selectpicker form-control show-menu-arrow selectstyle"
                data-live-search="true"
              />
            </div>
            <div className="form-group col-md-3">
              <label className="bInst">Draft Instrument No</label>
              <input
                type="text"
                name="txt_instrument_no"
                size={29}
                className="input_style4 selectpicker form-control show-menu-arrow selectstyle"
                data-live-search="true"
              />
            </div>
            <div className="form-group col-md-3">
              <label className="bDate">Draft Date</label>
              <div className="row">
                <div className="col-md-10 col-sm-10 col-xs-10 padR0">
                  <div
                    className="input-group date col-md-12 col-sm-12 col-xs-12"
                    id="paymentdate1"
                  >
                    <Flatpickr
                      value={startDate3}
                      onChange={(date) => setStartDate3(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "242px" }}
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
                    onClick={handleTrashClick3}
                    style={{ textAlign: "center" }}
                  >
                    <i className="fa fa-trash" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null; // No additional bank details for other modes
    }
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="ADD RECEIPT" />

        <form>
          <div className="form-group row">
            <div className="form-group col-md-3 class=">
              <label>Agent</label>
              <MultiSelect
                options={agentSectionOptions}
                isSearchable
                placeholder="- Agent-"
                noOptionsMessage={() => "No Agent Found"}
                className="custom-select required"
              />
            </div>
            <div className="form-group col-md-3 phps_row_1">
              <label>Currency</label>
              <div
                id="loading"
                style={{ position: "absolute", display: "none" }}
              >
                <img src="/cpfv3/images/loading.gif" alt="" />
              </div>
              <MultiSelect
                options={addrule_currencyOptions}
                isSearchable
                placeholder="- Select Currency -"
                noOptionsMessage={() => "No Currency Found"}
                className="custom-select required"
              />
            </div>
            <div className="form-group col-md-3">
              <label>Date of Receipt</label>
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
                      style={{ width: "277.1px" }}
                    />
                    <span className="input-group-addon">
                      <i className=" fas fa-th" />
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
            <div className="form-group col-md-3">
              <label>Receipt No</label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="txt_receipt_no"
                size={11}
                id="txt_receipt_no"
              />
            </div>
            {/* 2nd Row */}
            <div className="form-group col-md-12 mt-3">
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
            {/* 3rd Row */}
            <div className="form-group col-md-3 mt-3">
              <label>Dues Till Today</label>
              {/*div>< code modified by Anand on 1 Dec 2012></div*/}
              <input
                type="text"
                className="selectpicker form-control form-control-sm show-menu-arrow selectstyle"
                name="txt_balance"
                disabled
                size={9}
                defaultValue={0.0}
                onkeypress="return false;"
                id="txt_balance"
                data-live-search="true"
              />
            </div>
            <div className="form-group col-md-3 mt-3">
              <label>
                Amount Received <span id="supplier_curr" />
              </label>
              <input
                type="text"
                className="required form-control form-control-sm"
                name="txt_amount_received"
                size={9}
                onchange="get_exchange_amount(this)"
                onblur="extractNumber(this,2,true);"
                onkeyup="extractNumber(this,2,true);"
              />
            </div>
            <div className="form-group col-md-3 mt-3">
              <label>Mode of Payment</label>
              <MultiSelect
                options={paymentModeOptions}
                isSearchable
                placeholder="- Cheque -"
                noOptionsMessage={() => "No Payment Found"}
                className="custom-select"
                onChange={handlePaymentModeChange}
              />
            </div>

            {/*4th Row*/}

            {/* 5th Row */}

            {renderBankDetails()}

            {/*6th Row*/}
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
          </div>
        </form>
      </div>
    </>
  );
};
export default AccountsAgentRecieptNew;
