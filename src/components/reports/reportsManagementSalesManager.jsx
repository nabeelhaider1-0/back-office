import Header2 from "../header2/header2";
import Flatpickr from "react-flatpickr";
import React, { useState } from 'react';
import MultiSelect from "../reactMultiSelect";



const agencyOptions = [
    { value: '', label: 'Select Agency' },
    { value: 'agency1', label: 'Agency 1' },
    { value: 'agency2', label: 'Agency 2' },
    { value: 'agency3', label: 'Agency 3' },
    // Add more agency options as needed
];

const selectedServiceOptions = [
    { label: 'All', value: 'all' },
    { label: 'Hotel', value: 'hotel' },
    { label: 'Activity', value: 'sightseeing' },
    { label: 'Transfer', value: 'transfer' },
    { label: 'Misc', value: 'misc' },
    { label: 'Airline', value: 'Airline' },
    { label: 'Packages', value: 'packages' },
    { label: 'Visa', value: 'visa' },
    { label: 'Event', value: 'event' },
    { label: 'Offline', value: 'offline' },
];


const salesManagerOptions = [
    { label: "Select Sales Manager", value: "" },
    { label: "rohan  vartak:v3otramslive", value: "v3otramslive" },
    { label: "aniket  shewale:Aniket", value: "Aniket" },
    { label: "aniket  shewale:aniket", value: "aniket" },
    { label: "sukanya  wagh:kishore", value: "kishore" },
    { label: "hemangi  :hemangi", value: "hemangi" },
    { label: "Local supplier  :localsupplier", value: "localsupplier" },
    { label: "ITC Sheraton Chains  :Madhura", value: "Madhura" },
    { label: "hemangi  sawant:hemangi15", value: "hemangi15" },
    { label: "nitin kumar jain:nitin", value: "nitin" },
    { label: "NITIN  nitin:Paresh", value: "Paresh" },
    { label: "Kishore kashyap Kashyap:kishorek", value: "kishorek" },
    { label: "Swarali test local supplier  :Swarali", value: "Swarali" },
    { label: "Swarali Demo Supplier  :Swaralidemo", value: "Swaralidemo" },
    { label: "Sonam  Tripathi:v3_otrams_wh", value: "v3_otrams_wh" },
    { label: "shivraj  shivraj:shivraj", value: "shivraj" },
    { label: "testsupplier  :sanjoli", value: "sanjoli" },
    { label: "Demo supplier  :demosupplier", value: "demosupplier" },
    { label: "simple  singh:simple", value: "simple" },
    { label: "simple  singh:simplee", value: "simplee" },
    { label: "ananya  :ananya", value: "ananya" },
    { label: "ananya1  :ananya1", value: "ananya1" },
    { label: "OtramsA  DemoA:otramsdemo1", value: "otramsdemo1" },
    { label: "OtamsB  DemoB:otramsdemo2", value: "otramsdemo2" },
    // ... (add more options as needed)
    { label: "1bookin  Whitelabel:1booking_wh", value: "1booking_wh" },
    { label: "Milind  Bhuwad:Milind_Qtech", value: "Milind_Qtech" },
  ];
  






const ReportsManagementSalesManager = () => {

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

    const [showBookingDate, setShowBookingDate] = useState(false);

    const toggleBookingDate = () => {
        setShowBookingDate(!showBookingDate);
    };

    const [showServiceDate, setShowserviceDate] = useState(false);

    const toggleServiceDate = () => {
        setShowserviceDate(!showServiceDate);
    };

    const [showCheckOutDate, setCheckOutDate] = useState(false);

    const toggleCheckOutDate = () => {
        setCheckOutDate(!showCheckOutDate);
    };


    return (
        <>
            <Header2 title="SALES MANAGER REPORT" />
            <div class="container-fluid pt-0 p-4" id="content-pad">



                <form>
                    <div className="panel-body">
                        <div className="row">
                            <div className="form-group col-md-3">
                                <label>Sales Manager</label>
                                <div>
                                <MultiSelect
                                    options={salesManagerOptions}
                                    isSearchable
                                    placeholder=" Manager "
                                    className="custom-select"
                                    noOptionsMessage={() => "No Manager Found"}
                                />
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label>Agency</label>
                                <MultiSelect
                                    options={agencyOptions}
                                    isSearchable
                                    placeholder=" Agency "
                                    className="custom-select"
                                    noOptionsMessage={() => "No Agency Found"}
                                />
                            </div>
                            {/*[end]code add by virendra for sales manager report  01-04-2016  */}
                            <div className="form-group col-md-3">
                                <label>Services</label>
                                <MultiSelect
                                    options={selectedServiceOptions}
                                    isSearchable
                                    placeholder="- All -"
                                    className="custom-select"
                                    noOptionsMessage={() => "No Services Found"}
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="form-group col-md-3">
                                <div className="checkbox checkbox-success" style={{ display: 'inline-block' }}>
                                    <input type="checkbox" defaultValue={1} name="chk_booking_date" id="chk_booking_date" onChange={toggleBookingDate} />
                                    <label htmlFor="chk_booking_date"> Booking Date</label>
                                </div>&nbsp;&nbsp;
                                <div name="booking_date" id="booking_date" style={{ display: showBookingDate ? 'block' : 'none' }}>
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
                                        <span className="input-group-addon" onClick={handleTrashClick}><i className="fa fa-trash" /></span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <div className="checkbox checkbox-success" style={{ display: 'inline-block' }}>
                                    <input type="checkbox" defaultValue={1} name="chk_service_date" id="chk_service_date" onChange={toggleServiceDate} />
                                    <label htmlFor="chk_service_date">Service Date</label>
                                </div>&nbsp;&nbsp;
                                <div name="service_date" id="service_date" style={{ display: showServiceDate ? 'block' : 'none' }}>
                                    <div className="input-daterange input-group date" id="datetimepicker2">
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
                                        <span className="input-group-addon" onClick={handleTrashClick1}><i className="fa fa-trash" /></span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <div className="checkbox checkbox-success" style={{ display: 'inline-block' }}>
                                    <input type="checkbox" defaultValue={1} id="chk_check_out_date" name="chk_check_out_date" onChange={toggleCheckOutDate} />
                                    <label htmlFor="check_out">Check Out</label>
                                </div>
                                <div name="check_out_date" id="check_out_date" style={{ display: showCheckOutDate ? 'block' : 'none' }}>
                                    <div className="input-daterange input-group date" id="datetimepicker3">
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
                                        <span className="input-group-addon" onClick={handleTrashClick2}><i className="fa fa-trash" /></span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-12 mt-3">
                                {/*INPUT TYPE="button" name='sbt1' value='View Report' onclick="callAjaxSubmit('')"*/}
                                <button type="button" className="btn btn-dark btn-sm" name="sbt1" value="View Report" onclick="callAjaxSubmit('')">
                                    <i className="fa fa-eye" />&nbsp;&nbsp;View Report
                                </button>
                            </div>
                        </div>
                    </div>
                </form>





            </div>
        </>
    );
};
export default ReportsManagementSalesManager;
