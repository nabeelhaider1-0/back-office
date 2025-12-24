
import Flatpickr from "react-flatpickr";
import React, { useState } from 'react';
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { citiesByCountry, countries } from "../../constants/Country-City-Data";
import { AgencyOptions } from "../../constants/contants";







const ReportsAccountsCustomerGlobalStatement = () => {


    const [startDate1, setStartDate1] = useState(null); // State for the start date
    const [endDate1, setEndDate1] = useState(null); // State for the end date

    const handleTrashClick1 = () => {
        // Function to clear both start and end dates
        setStartDate1(null);
        setEndDate1(null);
    };


    const [showServiceDate, setShowserviceDate] = useState(false);

    const toggleServiceDate = () => {
        setShowserviceDate(!showServiceDate);
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
            <Header2 title="DAY WISE AGENT DUE" />
            <div class="container-fluid pt-0 p-4" id="content-pad">



                <form>
                    <div className="panel-body">
                        <div className="row">
                            <div className="form-group col-md-3">
                                <label style={{ marginBottom: '15px' }}>Country</label>
                                <div id="loading_curr" style={{ position: 'absolute', display: 'none' }}><img src="/cpfv3/images/loading.gif" alt="" /> </div>
                                <MultiSelect
                                    options={countries}
                                    isSearchable
                                    placeholder="- Select Country -"
                                    className="custom-select"
                                    onChange={handleCountryChange}
                                    noOptionsMessage={() => "No Country Found"}

                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label style={{ marginBottom: '15px' }}>City</label>
                                <div id="loading_curr" style={{ position: 'absolute', display: 'none' }}><img src="/cpfv3/images/loading.gif" alt="" /> </div>
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
                            <div className="form-group col-md-3">
                                <label style={{ marginBottom: '15px' }}>Agency</label>
                                <MultiSelect
                                    options={AgencyOptions}
                                    isSearchable
                                    placeholder=" Select Agent "
                                    className="custom-select"
                                    noOptionsMessage={() => "No Agency Found"}
                                />
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
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12 form-group">
                                {/*INPUT TYPE="button" name='sbt1' value='View Report' onclick="validate();" class="btn btn-primary"*/}
                                <button type="button" className="btn btn-dark btn-sm" name="sbt1" value="View Report" onclick="validate();">
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
export default ReportsAccountsCustomerGlobalStatement;
