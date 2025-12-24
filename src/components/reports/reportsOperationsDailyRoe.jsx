
import Flatpickr from "react-flatpickr";
import React, { useState } from 'react';
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";





const consultantOptions = [
  { value: '', label: 'Select Consultant Name' },
  // Add more consultant options as needed
];



const ReportsOperationsDailyRoe = () => {




    const [startDate, setStartDate] = useState(null); // State for the start date
    const [endDate, setEndDate] = useState(null); // State for the end date

    const handleTrashClick = () => {
        // Function to clear both start and end dates
        setStartDate(null);
        setEndDate(null);
    };

    const [showBookingDate, setShowBookingDate] = useState(false);

    const toggleBookingDate = () => {
      setShowBookingDate(!showBookingDate);
    };



    const [isFormVisible, setFormVisibility] = useState(false);

    const toggleFormVisibility = () => {
      setFormVisibility(!isFormVisible);
    };


  


    return (
        <>
            <Header2 title="DAILY ROE" />
            <div class="container-fluid pt-0 p-4" id="content-pad">
            <div>
  <form>
    <div className="panel-body">
      <div className="row">
        <input type="hidden" name="sel_max_results" defaultValue={50} />
        <div className="form-group col-md-3">
          <label>Master Reference</label>
          <input type="text" className="form-control form-control-sm test123" name="reservation_id" size={50}  />
        </div>
        <div className="form-group col-md-3">
          <label>Consultant Name</label>
          <MultiSelect
                  options={consultantOptions}
                  isSearchable
                  placeholder=" Select Consultant "
                  className="custom-select"
                  noOptionsMessage={() => "No Consultant Found"}
                />
        </div>
        <div className="form-group col-md-4">
          <div className="checkbox checkbox-success" style={{display: 'inline-block'}}>
            <input type="checkbox" defaultValue={1} name="chk_booking_date" id="booking_date_cw" onChange={toggleBookingDate} />
            <label htmlFor="booking_date_cw"> Booking Date</label>
          </div>
          <div name="booking_date" id="booking_date" style={{ display: showBookingDate ? 'block' : 'none' }}>
            <div className="input-daterange input-group date" id="datetimepicker1" data-date-end-date="0d">
            <Flatpickr
                                        value={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        options={{ dateFormat: "Y-m-d" }}
                                        style={{width: '131px'}}
                                    />

                                    <span class="input-group-addon">to</span>
                                    <Flatpickr
                                        value={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        options={{ dateFormat: "Y-m-d" }}
                                        style={{width: '131px'}}
                                    />
              <span className="input-group-addon" onClick={handleTrashClick} ><i className="fa fa-trash" /></span>
            </div>
          </div>
        </div>
        <div className="row mt-3">
        <div className="form-group col-md-12">
          <div className="col-md-2 ">
            <button type="button" name="sbt1" className="btn btn-dark btn-sm" value="View Report" onClick={toggleFormVisibility}>
              <i className="fa fa-eye" />&nbsp;&nbsp;View Report
            </button>
          </div>
          <div id="mesID" style={{display: 'none'}} />
        </div>
      </div>
      </div>
    </div>
  </form>
  <br />
  <form id="hideornot" style={{ display: isFormVisible ? 'block' : 'none'}}>
    <div className="panel-body removeMargins">
      <div className="row pd_tp">
        <div className="row">
          <div className="col-md-5 col_hide">
            <div className="col-md-12">
            </div>
          </div>
          <div className="col-md-5 col_hide">
            <div className="form-group" />
          </div>
          <div className="col-md-2">
            <style dangerouslySetInnerHTML={{__html: "\n                                .table tr[visible='false'],\n                                .no-result {\n                                    display: none;\n                                    border: 1px solid #ddd;\n                                    padding: 10px;\n                                    margin-top: -2px;\n                                }\n\n                                .table tr[visible='true'] {\n                                    display: table-row;\n                                }\n\n                                .counter {\n                                    padding: 8px;\n                                    color: #ccc;\n                                }\n\n                                .search_new {\n                                    float: right;\n                                    height: 35px;\n                                    margin-bottom: 0px;\n                                    padding-left: 5px;\n                                }\n                            " }} />
            <div className="form-group col-md-2 new_search_icon" style={{textAlign: 'right', paddingRight: '0px'}}>
              <h5><i className="fa fa-search srchWithinPg" data-toggle="tooltip" data-placement="top" data-original-title="Search within this table" style={{position: 'absolute', marginTop: '6px'}} /></h5>
            </div>
            <div className="form-group col-md-10 bookingsrc" style={{marginLeft: '61px'}}>
              <input type="search" className="tablesearch form-control form-control-sm search_new" placeholder="Search" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <link rel="stylesheet" href="/cpfv3/css/tms/bootstrap_r/css/jquery.dataTables.css" />
        <link rel="stylesheet" href="/cpfv3/css/tms/bootstrap_r/css/bootstrap-select.css" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{__html: "\n                        #search_agents_table1 a {\n                            text-decoration: underline;\n                        }\n\n                        #unallocatedAmountDetailContent {\n                            min-height: 400px;\n                            margin-bottom: 10px;\n                        }\n\n                        .modal-content {\n                            overflow: hidden;\n                        }\n                    " }} />
        {/* code added by himanshu for GT-647 on 15-10-2013 */}
        <div className="alert alert-danger text-center form-group mt-2" style={{backgroundColor: '#f2dede !important', padding: '9px'}}>
          <h5 style={{color: 'var(--color-white) !important', fontSize: '16px'}}>No Results Returned!!</h5>
        </div>
        <style type="text/css" dangerouslySetInnerHTML={{__html: "\n                        /*@media print{\n            .table.dataTable > thead > tr > th, .table.dataTable > thead > tr > td\n            {\n                white-space: normal!important;\n                padding: 8px 5px 8px 5px!important;\n            }\n            \n             tr.bg-primary th { color:#000 !important;}\n        }*/\n                    " }} />
      </div>
      <div className="form-group no-result">
        <h5 className="text-center">No Receipt Found.</h5>
      </div>
    </div>
  </form>
</div>


          </div>
        </>
    );
};
export default ReportsOperationsDailyRoe;
