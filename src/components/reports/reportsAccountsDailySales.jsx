
import Flatpickr from "react-flatpickr";
import React, { useState } from 'react';
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { AgencyOptions, add_options, addrule_currencyOptions, consultantsOptions, reports_supplierOptions, searchbooking_types_options, selectedServiceOptions } from "../../constants/contants";



  



const ReportsAccountsDailySales = () => {

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

    const [showBookingDate, setShowBookingDate] = useState(false);

    const toggleBookingDate = () => {
        setShowBookingDate(!showBookingDate);
    };

    const [showServiceDate, setShowserviceDate] = useState(false);

    const toggleServiceDate = () => {
        setShowserviceDate(!showServiceDate);
    };

    const [showDocumentDate, setDocumentDate] = useState(false);

    const toggleDocumentDate = () => {
        setDocumentDate(!showDocumentDate);
    };
    const [showStatusDate, setStatusDate] = useState(false);

    const toggleStatusDate = () => {
        setStatusDate(!showStatusDate);
    };





    return (
        <>
            <Header2 title="DAILY SALES" />
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
                                <label>Currency</label>
                                <MultiSelect
                                    options={addrule_currencyOptions}
                                    isSearchable
                                    placeholder=" Select Currency "
                                    className="custom-select required"
                                    noOptionsMessage={() => "No Currency Found"}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Suppliers</label>
                                <MultiSelect
                                    options={reports_supplierOptions}
                                    isSearchable
                                    placeholder=" Select Supplier "
                                    className="custom-select"
                                    noOptionsMessage={() => "No Supplier Found"}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Branches</label>
                                <MultiSelect
                                    options={add_options}
                                    isSearchable
                                    placeholder=" All Branches "
                                    className="custom-select"
                                    noOptionsMessage={() => "No Branch Found"}
                                />
                            </div>
                            <div className="form-group col-md-3 mt-2">
                                <label>Consultant</label>
                                <MultiSelect
                                options={consultantsOptions}
                                isSearchable
                                placeholder=" Select Consultant "
                                className="custom-select"
                                noOptionsMessage={() => "No Consultant Found"}
                            />
                            </div>
                            <div className="form-group col-md-3 mt-2">
                                <label>Services</label>
                                <MultiSelect
                                    options={selectedServiceOptions}
                                    isSearchable
                                    placeholder=" All Services "
                                    className="custom-select"
                                    noOptionsMessage={() => "No Service Found"}
                                />
                            </div>
                            <div className="form-group col-md-3 mt-2">
                                <label>Booking Type</label>
                                <MultiSelect
                                options={searchbooking_types_options}
                                isSearchable
                                placeholder=" All "
                                className="custom-select"
                                noOptionsMessage={() => "No Type Found"}
                            />
                            </div>
                            <div className="form-group col-md-3 mt-2">
                                <label>Booking Id</label>
                                <input type="text" className="form-control form-control-sm selectpicker show-menu-arrow" name="txt_booking_refno" id="txt_booking_refno" size={40} data-live-search="true" />
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
                                    <input type="checkbox" defaultValue={1} name="chk_booking_date" id="chk_booking_date" onChange={toggleStatusDate} />
                                    <label htmlFor="chk_booking_date"> Status Date</label>
                                </div>&nbsp;&nbsp;
                                <div name="booking_date" id="booking_date" style={{ display: showStatusDate ? 'block' : 'none' }}>
                                    <div className="input-daterange input-group date" id="datetimepicker1">
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
                                        <span className="input-group-addon" onClick={handleTrashClick3}><i className="fa fa-trash" /></span>
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
                                    <input type="checkbox" defaultValue={1} id="chk_check_out_date" name="chk_check_out_date" onChange={toggleDocumentDate} />
                                    <label htmlFor="check_out">Document Date</label>
                                </div>
                                <div name="check_out_date" id="check_out_date" style={{ display: showDocumentDate ? 'block' : 'none' }}>
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
export default ReportsAccountsDailySales;
