import React, { useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import Header2 from "../header2/header2";
import {
  addrule_agent_options,
  bookingOptions,
} from "../../constants/contants";
import MultiSelect from "../reactMultiSelect";

const AccountsAgentDebitNew = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="ADD DEBIT NOTE" />

        <form>
          <div className="form-group row">
            <div className="form-group col-md-3">
              <label>Agent</label>
              <MultiSelect
                options={addrule_agent_options}
                isSearchable
                placeholder="- Select Agent -"
                noOptionsMessage={() => "No Agent Found"}
                className="custom-select required"
              />
            </div>
            <div className="form-group col-md-3">
              <label>Booking ID</label>
              <div
                id="loading"
                style={{ position: "absolute", display: "none" }}
              >
                <img src="/cpfv3/images/loading.gif" alt="" />
              </div>
              <MultiSelect
                options={bookingOptions}
                isSearchable
                placeholder="- Select Booking ID -"
                noOptionsMessage={() => "No Booking ID Found"}
                className="custom-select required"
              />
            </div>
          </div>
          {/* 2nd Row */}
          <div className="row mt-3">
            <div className="form-group col-md-3">
              <label>&nbsp;</label>
              <br />
              <label>Booking Amount : </label>
              <span id="booking_amount">--</span>&nbsp;&nbsp;
              <span id="currency_bam" />
            </div>
            <div className="form-group col-md-3">
              <label>&nbsp;</label>
              <br />
              <label>Receipt Amount : </label>
              <span id="receipt_amount">Not Allocated</span>&nbsp;&nbsp;
              <span id="currency_ram" />
            </div>
            <div className="form-group col-md-3 phps_row_0">
              <label>Created on</label>
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
                    onClick={handleTrashClick}
                    style={{ textAlign: "center" }}
                  >
                    <i className="fa fa-trash" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
            <div className="form-group col-md-3">
              <label>
                Amount &nbsp; (<span id="currency">--</span>)
              </label>
              <input
                height={28}
                type="text"
                className="required form-control form-control-sm name="
                size={9}
                maxLength={8}
                onblur="extractNumber(this,2,true);"
                onkeyup="extractNumber(this,2,true);"
              />
            </div>
            <div className="form-group col-md-12 mt-3">
              {/* <label>Particulars</label> */}
              <textarea
                name="txtar_particulars"
                className="required form-control form-control-sm"
                rows={5}
                cols={27}
                defaultValue={""}
              />
            </div>
          </div>
          {/* 3rd Row */}
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
export default AccountsAgentDebitNew;
