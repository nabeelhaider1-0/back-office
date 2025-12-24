import Header2 from "../header2/header2";
import React, { useState, } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import { add_options, bookingtype_options, recon_options, suppliersOnlineOptions } from "../../constants/contants";
import MultiSelect from "../reactMultiSelect";
const BookingReConcilationManual = () => {

    const [startDate, setStartDate] = useState(null); // State for the start date
    const [endDate, setEndDate] = useState(null); // State for the start date

  
    const handleTrashClick = () => {
      // Function to clear both start and end dates
      setStartDate(null);
      setEndDate(null);

    };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">

        <Header2 title="RECONCILIATION"/>


        <form>
  <div className="panel-body">
    <div className="row">
      <div className="col-md-5 form-group">
        <label>Booking Reference No#</label>
        <input type="text" name="booking_id" className="form-control form-control-sm test123" size={50}/>
      </div>
      <div className="col-md-1 text-center form-group">
        <label htmlFor="exampleInputEmail1">&nbsp;</label>
        <div>
          <h5><kbd>&nbsp;OR&nbsp;</kbd></h5>
        </div>
      </div>
      <div className="col-md-6 form-group">
        <label>Booking Dates</label>
        <div className="input-daterange input-group date" id="datetimepicker6">
        <Flatpickr
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  options={{ dateFormat: "Y-m-d" }}
                  style={{width:'360px'}}
                />
          <span className="input-group-addon">to</span>
          <Flatpickr
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  options={{ dateFormat: "Y-m-d" }}
                  style={{width:'360px'}}
                />
          <span className="input-group-addon" id="bookingTrashBtn" onClick={handleTrashClick}>
            <i className="fa fa-trash" />
          </span>
        </div>
      </div>
    </div>
    <div className="row mt-2">
      <div className="col-md-3 form-group">
        <label>Suppliers</label>
        <MultiSelect
                  options={suppliersOnlineOptions}
                  isMulti
                  isSearchable
                  placeholder="- Select -"
                  noOptionsMessage={() => "No Supplier Found"}
                  className="custom-select"
                />
        
      </div>
      <div className="col-md-3 form-group">
        <label>Branch</label>
        <MultiSelect
                  options={add_options}
                  isMulti
                  isSearchable
                  placeholder="- Select Branch -"
                  noOptionsMessage={() => "No Branch Found"}
                  className="custom-select "

                />
      
      </div>
      <div className="col-md-3 form-group">
        <label>Recon Status</label>
        
        <MultiSelect
                  options={recon_options}
                  isMulti
                  isSearchable
                  placeholder="- Select -"
                  noOptionsMessage={() => "No Options Found"}
                  className="custom-select "

                />
      
        
      </div>
      <div className="col-md-3 form-group">
        <label>Booking Type</label>
        
        <MultiSelect
                  options={bookingtype_options}
                  isMulti
                  isSearchable
                  placeholder="- Select -"
                  noOptionsMessage={() => "No Options Found"}
                  className="custom-select "

                />
       
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-md-3 form-group">
        <button type="button" className="btn btn-dark btn-sm" name="sbt1" value="View Bookings" onclick="submit_form()">
          <i className="fa fa-eye" />&nbsp;&nbsp;View Bookings
        </button>
      </div>
    </div>
  </div>
</form>



      </div>
    </>
  );
};
export default BookingReConcilationManual;
