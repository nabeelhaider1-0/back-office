
import Flatpickr from "react-flatpickr";
import React, { useState } from 'react';
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { AgencyOptions, addrule_currencyOptions, invoiceStatusOptions } from "../../constants/contants";


const ReportsAccountsCustomerStatement = () => {

  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };

  const [startDate1, setStartDate1] = useState(null); // State for the start date
  const [endDate1, setEndDate1] = useState(null); // State for the end date

  const handleTrashClick1 = () => {
    // Function to clear both start and end dates
    setStartDate1(null);
    setEndDate1(null);
  };

  const [startDate2, setStartDate2] = useState(null); // State for the start date
  const [endDate2, setEndDate2] = useState(null); // State for the end date

  const handleTrashClick2 = () => {
    // Function to clear both start and end dates
    setStartDate2(null);
    setEndDate2(null);
  };
  const [startDate3, setStartDate3] = useState(null); // State for the start date
  const [endDate3, setEndDate3] = useState(null); // State for the end date

  const handleTrashClick3 = () => {
    // Function to clear both start and end dates
    setStartDate3(null);
    setEndDate3(null);
  };







  return (
    <>
      <Header2 title="CUSTOMER STATEMENT" />
      <div class="container-fluid pt-0 p-4" id="content-pad">




        <form>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label>Agency</label>
                <MultiSelect
                  options={AgencyOptions}
                  isSearchable
                  placeholder=" Select Agent "
                  className="custom-select"
                  noOptionsMessage={() => "No Agency Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Invoice Status</label>
                <MultiSelect
                  options={invoiceStatusOptions}
                  isSearchable
                  placeholder=" Select Status "
                  className="custom-select"
                  noOptionsMessage={() => "No Status Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Currency</label>
                <div id="loading_curr" style={{ position: 'absolute', display: 'none' }}><img src="/cpfv3/images/loading.gif" alt="" /> </div>
                <MultiSelect
                  options={addrule_currencyOptions}
                  isSearchable
                  placeholder=" Select Currency "
                  className="custom-select"
                  noOptionsMessage={() => "No Currency Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Booking ID</label>
                <input type="text" name="txt_booking_refno" id="txt_booking_refno" size={40} className="input_text form-control form-control-sm" />
              </div>
              <div className="form-group col-md-3">
                <label>Invoice No.</label>
                <input type="text" className="form-control form-control-sm" name="txt_invoice_no" size={50} />
              </div>
              {/* code added by himanshu for GT-647 on 15-10-2013 */}
              <div className="form-group col-md-3" id="send-email">
                {/* Added by brynal to hide when INTER_BRANCH_MODULE and logged in via system user */}
                <label>Accountant Email</label>
                <div className="input-group col-md-12 col-xs-12">
                  <input type="text" name="txt_email" className="form-control form-control-sm" id="txt_email" />
                  <div className="input-group-addon">
                    <i className="fa fa-envelope-o" data-placement="top" data-toggle="tooltip" data-original-title="Send Email" />
                  </div>
                </div>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="chk_booking_date">Booking Date</label>
                <div name="booking_date" id="booking_date">
                  <div className="input-daterange input-group date" id="datetimepicker1">
                    <Flatpickr
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: '131px' }}
                    />

                    <span class="input-group-addon">to</span>
                    <Flatpickr
                      value={endDate}
                      onChange={(date) => setEndDate(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: '131px' }}
                    />
                    <span className="input-group-addon" onClick={handleTrashClick}>
                      <i className="fa fa-trash" alt="clear" title="clear" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="chk_status_date">Status Date</label>
                <div name="status_date" id="status_date">
                  <div className="input-daterange input-group date" id="datetimepicker2">
                    <Flatpickr
                      value={startDate3}
                      onChange={(date) => setStartDate3(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: '131px' }}
                    />

                    <span class="input-group-addon">to</span>
                    <Flatpickr
                      value={endDate3}
                      onChange={(date) => setEndDate3(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: '131px' }}
                    />
                    <span className="input-group-addon" onClick={handleTrashClick3}>
                      <i className="fa fa-trash" alt="clear" title="clear" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="chk_service_date">Service Date</label>
                <div name="service_date" id="service_date">
                  <div className="input-daterange input-group date" id="datetimepicker3">
                    <Flatpickr
                      value={startDate1}
                      onChange={(date) => setStartDate1(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: '131px' }}
                    />

                    <span class="input-group-addon">to</span>
                    <Flatpickr
                      value={endDate1}
                      onChange={(date) => setEndDate1(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: '131px' }}
                    />
                    <span className="input-group-addon" onClick={handleTrashClick1}>
                      <i className="fa fa-trash" alt="clear" title="clear" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="chk_voucher_date">Voucher Date</label>
                <div name="voucher_date" id="voucher_date">
                  <div className="input-daterange input-group date" id="datetimepicker4">
                    <Flatpickr
                      value={startDate2}
                      onChange={(date) => setStartDate2(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: '131px' }}
                    />

                    <span class="input-group-addon">to</span>
                    <Flatpickr
                      value={endDate2}
                      onChange={(date) => setEndDate2(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: '131px' }}
                    />
                    <span className="input-group-addon" onClick={handleTrashClick2}>
                      <i className="fa fa-trash" alt="clear" title="clear" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-md-12">
                  <div className="col-md-2 ">
                    <button type="button" name="sbt1" className="btn btn-dark btn-sm" value="View Report" >
                      <i className="fa fa-eye" />&nbsp;&nbsp;View Report
                    </button>
                  </div>
                  <div id="mesID" style={{ display: 'none' }} />
                </div>
              </div>
            </div>

          </div>
        </form>





      </div>
    </>
  );
};
export default ReportsAccountsCustomerStatement;
