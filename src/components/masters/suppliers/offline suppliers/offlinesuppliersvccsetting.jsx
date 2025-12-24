
import React, { useState} from 'react';
import Header2 from '../../../header2/header2';
import Constants from '../../../../constants/routes';
const MastersSuppliersOfflineSupplierVccSetting = () => {
    const [displayBookingDate, setDisplayBookingDate] = useState(false);

    const handleVccCheckboxChange = (event) => {
      setDisplayBookingDate(event.target.checked);
    };
  
    const handleCreditIdChange = (event) => {
      // Handle credit_id radio button change here
    };
  return (
    <>
      <Header2 title="SELECT OPTIONS FOR SUPPLIER -> TRAVELQTECH (S000000893)" linkText1="List Offline Suppliers" linkText2="VCC Settings Supplier" link1={Constants.URLConstants.MASTERSSUPPLIERSOFFLINESUPPLIERSSEARCH} />
      <div class="container-fluid pt-0 p-4" id="content-pad">

      <form>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-12">
                <div className="checkbox checkbox-success checkbox-inline">
                  <input
                    type="checkbox"
                    name="vcc_enable"
                    id="vcc"
                    value="vcc"
                    onChange={handleVccCheckboxChange}
                    className="test123"
                  />
                  <label htmlFor="vcc">VCC</label>
                </div>
                {displayBookingDate && (
                  <div className=" col-md-12" style={{display:'inline-grid'}}>
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="credit_id"
                        value="on_confirmed_date"
                        id="on_confirmed_date"
                        onChange={handleCreditIdChange}
                      />
                      <label htmlFor="on_confirmed_date">On Booking Confirmed Date</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="credit_id"
                        value="on_voucher_date"
                        id="on_voucher_date"
                        onChange={handleCreditIdChange}
                      />
                      <label htmlFor="on_voucher_date">On Voucher Date</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="credit_id"
                        value="expiration_date"
                        id="expiration_date"
                        onChange={handleCreditIdChange}
                      />
                      <label htmlFor="expiration_date">On Expiration Date</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="credit_id"
                        value="before_check_in"
                        id="before_check_in"
                        onChange={handleCreditIdChange}
                      />
                      <label htmlFor="before_check_in">Before Check In</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="credit_id"
                        value="check_out_date"
                        id="check_out_date"
                        onChange={handleCreditIdChange}
                      />
                      <label htmlFor="check_out_date">On Check Out Date</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="credit_id"
                        value="service_date"
                        id="service_date"
                        onChange={handleCreditIdChange}
                      />
                      <label htmlFor="service_date">On Service Date</label>
                    </div>
                    {/* Add more radio buttons here */}
                  </div>
                )}
              </div>

              <div className="form-group col-md-3" id="show_days" style={{ display: 'none' }}>
                <label>Before Days</label>
                {/* Your dropdown select goes here */}
              </div>
              <div className="form-group col-md-12">
                <br />
                <button type="submit" className="btn btn-dark btn-sm" name="Save" value="Save">
                  <i className="fa fa-floppy-o" aria-hidden="true"></i>
                  &nbsp;Save
                </button>
              </div>
            </div>
          </div>
        </form>

      </div>
    </>
  );
};
export default MastersSuppliersOfflineSupplierVccSetting;
