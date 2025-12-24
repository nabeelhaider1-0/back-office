
import React, { useState, } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";

const AccountsAgentRecieptPartialAllocation = () => {
    const [startDate, setStartDate] = useState(null); // State for the start date
    const [endDate, setEndDate] = useState(null); 

    const [startDate2, setStartDate2] = useState(null); // State for the start date
    const [endDate2, setEndDate2] = useState(null); 
    const handleTrashClick = () => {
        // Function to clear both start and end dates
        setStartDate(null);
        setEndDate(null);
      };
  
    const handleTrashClick2 = () => {
        // Function to clear both start and end dates
        setStartDate2(null);
        setEndDate2(null);
      };


  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">

        <Header2 title="BOOKING PARTIAL ALLOCATION OF SQTECH [ SQTECH - CD0291 ]" linkText1="Search Reciepts" linkText2="Add Reciepts" link1={Constants.URLConstants.ACCOUNTSAGENTRECIEPTNEW}/>

 
        <div>
  {/* First Row*/}
  <form>
    <div className="panel-body">
      <div className="row form-group">
        <div className="col-md-2 form-group">
          <label>Booking ID</label><span className="form-group" style={{float: 'right', fontSize: '12px', marginTop: '5px'}}>(eg.: l001234<b>,</b>l001234)</span>
          <input type="text" name="txt_booking_id" id="txt_booking_id" size={40}  className="form-control input_text test123" />
        </div>
        <div className="col-md-2 form-group">
          <label htmlFor="txt_invoice_number">Invoice Number</label> <input type="text" name="txt_invoice_number" id="txt_invoice_number" size={40}  className="form-control input_text" />
        </div>
        <div className="col-md-4 form-group">
          <label>Status Date</label>
          <div className="input-group date input-daterange" name="status_in_date" id="status_in_date">
          <Flatpickr
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  options={{ dateFormat: "Y-m-d" }}
                
                />
          <span className="input-group-addon">to</span>
          <Flatpickr
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  options={{ dateFormat: "Y-m-d" }}
                 
                />
            <span className="input-group-addon" onClick={handleTrashClick}>
              <i className="fa fa-trash" />
            </span>
          </div>
        </div>
      
        <div className="col-md-4 form-group">
          <label>Service Date</label>
          <div className="input-group date input-daterange" name="invoice_in_date" id="service_in_date">
          <Flatpickr
                  value={startDate2}
                  onChange={(date) => setStartDate2(date)}
                  options={{ dateFormat: "Y-m-d" }}
                
                />
          <span className="input-group-addon">to</span>
          <Flatpickr
                  value={endDate2}
                  onChange={(date) => setEndDate2(date)}
                  options={{ dateFormat: "Y-m-d" }}
                 
                />
            <span className="input-group-addon"onClick={handleTrashClick2}><i className="fa fa-trash" /></span>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-3 form-group">
          <button type="button" name="sbt1" className="btn btn-dark btn-sm" value="Submit" onclick="$('[name=\'receipts_date_result\']').submit()">
            <i className="fa fa-search" />&nbsp;Search
          </button>
        </div>
      </div>
    </div>
  </form>
  <div>
  <br />
  <form style={{paddingBottom: '1px'}}>
    <div className="panel-body" style={{}}>
      <input type="hidden" name="total_count" defaultValue={0} />
      <input type="hidden" name="action" defaultValue />
      <input type="hidden" name="rec_id" defaultValue={602} />
      <input type="hidden" name="currency_code" defaultValue="SAR" />
      <input type="hidden" name="agent_id" defaultValue={291} />
      <input type="hidden" name="Rec_amount" defaultValue="114.321" />
      <input type="hidden" name="amountRemain" defaultValue="0.001" />
      <input type="hidden" name="allocating_page" defaultValue={1} />
      <div className="form-group alert alert-danger text-center">
        <h5 style={{color: 'var(--color-red)', fontSize: '16px'}}>No Bookings for allocation</h5>
      </div>
    </div>
  </form>
</div>


</div>


      </div>
    </>
  );
};
export default AccountsAgentRecieptPartialAllocation;