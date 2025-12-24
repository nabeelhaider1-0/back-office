import Header2 from "../header2/header2";
import Flatpickr from "react-flatpickr";
import React, { useState } from 'react';
import MultiSelect from "../reactMultiSelect";
import { citiesByCountry, countries } from "../../constants/Country-City-Data";
import { AgencyOptions, add_options } from "../../constants/contants";




const bookingStatusOptions = [
    { label: "All", value: "All" },
    { label: "Confirmed and On Request", value: "cor" },
    { label: "Vouchered", value: "vouchered" },
    { label: "On Request", value: "on_request" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Cancelled", value: "cancelled" },
    { label: "In Process Cancel", value: "inprocess_cancel" },
    { label: "Sold Out", value: "failed" },
    { label: "Rejected", value: "rejected" },
    { label: "Inprocess-Booking", value: "inprocess-booking" },
    { label: "Vouchered Invoiced", value: "vouchered_invoiced" },
    { label: "Cancelled Invoiced", value: "cancelled_invoiced" },
];


const invoicedOptions = [
    { value: "Select", label: "Select" },
    { value: "All", label: "All" },
    { value: "yes", label: "yes" },
    { value: "no", label: "no" },
];



const bookingTypeOptions = [
    { value: "Select Booking Type", label: "Select Booking Type" },
    { value: "All", label: "All", selected: true },
    { value: "offline", label: "Offline" },
    { value: "online", label: "Online" },
    { value: "modified", label: "Modified" },
];



const sourceTypeOptions = [
    { value: "localtransfer", label: "localtransfer (Contracted Transfer)" },
    { value: "localsightseeing", label: "localsightseeing (Contracted Sightseeing)" },
    { value: "hbsight", label: "hbsight (Hotelbeds Sightseeing (TEST))" },
    { value: "hotelbedstransfer", label: "hotelbedstransfer (Hotelbeds Transfer)" },
];



const reportTypeOptions = [
    { value: "accounts", label: "Accounts" },
    { value: "transfer", label: "Transfer" },
    { value: "activity", label: "Activity" },
];












const ReportsOperationsBookingReport = () => {

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


    const [branchData, setBranchData] = useState({

        branchCountry: "",
        branchCity: "",

    });



    const handleCountryChange = (selectedCountry) => {
        setBranchData((prevData) => ({
            ...prevData,
            branchCountry: selectedCountry.value,
            branchCity: "", // Reset city when country changes
        }));
    };

    const handleCityChange = (selectedCity) => {
        setBranchData((prevData) => ({
            ...prevData,
            branchCity: selectedCity.value,
        }));
    };







    return (
        <>
            <Header2 title="BOOKINGS REPORT" />
            <div class="container-fluid pt-0 p-4" id="content-pad">



                <form>
                    <div className="row">
                        <div className="form-group col-md-2">
                            <label>Booking Id</label>
                            <input type="text" name="txt_booking_refno" data-toggle="tooltip" data-original-title="e.g I400638,I1300609" data-placement="bottom" size={40} className="form-control form-control-sm test123" placeholder />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Voucher Id</label>
                            <input type="text" name="txt_booking_voucherno" data-toggle="tooltip" data-placement="bottom" size={40} className="form-control form-control-sm" placeholder data-original-title title />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Booking Status</label>
                            <MultiSelect
                                options={bookingStatusOptions}
                                isSearchable
                                placeholder=" All "
                                className="custom-select"
                                noOptionsMessage={() => "No Status Found"}
                            />
                        </div>
                        <div className="form-group col-md-2" id="invoiced-type">
                            <label>Invoiced</label>
                            <MultiSelect
                                options={invoicedOptions}
                                isSearchable
                                placeholder=" Select "
                                className="custom-select"
                                noOptionsMessage={() => "No Invoice Found"}
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Agent</label>
                            <MultiSelect
                                options={AgencyOptions}
                                isSearchable
                                placeholder=" Select "
                                className="custom-select"
                                noOptionsMessage={() => "No Agent Found"}
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Branch</label>
                            <MultiSelect
                                options={add_options}
                                isSearchable
                                placeholder=" Select "
                                className="custom-select"
                                noOptionsMessage={() => "No Branch Found"}
                            />
                        </div>
                    </div>
                    {/* 2nd Row*/}
                    <div className="row mt-3">
                        <div className="form-group col-md-2">
                            <label>Leader Name</label>
                            <input type="text" name="txt_leader_name" size={40} className="form-control form-control-sm" autoComplete="off" />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Booking Type</label>
                            <MultiSelect
                                options={bookingTypeOptions}
                                isSearchable
                                placeholder=" All "
                                className="custom-select"
                                noOptionsMessage={() => "No Type Found"}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Cash Agent Vouchered Booking No Payment</label><br />
                            <div className="checkbox checkbox-success checkbox-inline">
                                <input id="hotel_supplier" type="checkbox" name="hotel_supplier" defaultValue={1} />
                                <label htmlFor="withoutpaymentVouchered" />
                            </div>
                        </div>
                    </div>
                    {/* 3rd Row*/}
                    <div className="row mt-3">
                        <div className="form-group col-md-2">
                            <label>Country</label>
                            <MultiSelect
                                options={countries}
                                isSearchable
                                placeholder="- Select Country -"
                                className="custom-select"
                                onChange={handleCountryChange}
                                noOptionsMessage={() => "No Country Found"}

                            />
                            <input type="hidden" name="selected_countries" id="selected_countries" size={40} />
                        </div>
                        <div className="form-group col-md-2">
                            <label>City</label>
                            <MultiSelect
                                //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                                options={citiesByCountry[branchData.branchCountry] || []}
                                isSearchable
                                placeholder="- Select City -"
                                className="custom-select"
                                onChange={handleCityChange}
                                noOptionsMessage={() => "No City Found"}

                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Service Name</label>
                            <input type="text" name="type_search_txt" className="form-control form-control-sm" size={40} />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Supplier Ref. #</label>
                            <input type="text" name="txt_confirmation_number" size={40} className="form-control form-control-sm" />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Supplier</label>
                            <MultiSelect
                                options={sourceTypeOptions  }
                                isSearchable
                                placeholder=" Select "
                                className="custom-select"
                                noOptionsMessage={() => "No Supplier Found"}
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Service Type</label>
                            <MultiSelect
                                options={reportTypeOptions  }
                                isSearchable
                                placeholder=" Select Service "
                                className="custom-select"
                                noOptionsMessage={() => "No Service Found"}
                            />
                        </div>

                    </div>
                    {/* 4th Row */}
                    <div className="row mt-3">
                        <div className="form-group col-md-3">
                            <label id="date_range_1">Booking Date</label>
                            <div id="datetimepicker6" className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12">
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
                                <span onClick={handleTrashClick} title="clear" alt="clear" className="input-group-addon" id="bTrashBtn">
                                    <i className="fa fa-trash" />
                                </span>
                            </div>
                        </div>
                        <div className="form-group col-md-3">
                            <label id="date_range_1">Service Date</label>
                            <div id="datetimepicker7" className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12">
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
                                <span onClick={handleTrashClick1} title="clear" alt="clear" className="input-group-addon" id="sTrashBtn">
                                    <i className="fa fa-trash" />
                                </span>
                            </div>
                        </div>
                        <div className="form-group col-md-3">
                            <label id="date_range_1">Deadline Date</label>
                            <div id="datetimepicker8" className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12">
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
                                <span onClick={handleTrashClick2} title="clear" alt="clear" className="input-group-addon" id="dTrashBtn">
                                    <i className="fa fa-trash" />
                                </span>
                            </div>
                        </div>
                        <div className="form-group col-md-3">
                            <label id="date_range_1">Voucher Date</label>
                            <div id="datetimepicker9" className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12">
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
                                <span onClick={handleTrashClick3} title="clear" alt="clear" className="input-group-addon" id="vTrashBtn">
                                    <i className="fa fa-trash" />
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* 5th Row */}
                    <div className="row mt-3">
                        <div className="form-group col-md-6">
                            <button type="button" className="form-group btn btn-dark btn-sm" id="search_report"><i className="fa fa-search" />&nbsp;Search Bookings</button>
                        </div>
                    </div>
                </form>






            </div>
        </>
    );
};
export default ReportsOperationsBookingReport;
