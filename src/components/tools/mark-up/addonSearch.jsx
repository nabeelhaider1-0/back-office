import React, { useState, } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import { citiesByCountry, countries } from "../../../constants/Country-City-Data";
import { markupTypeOptions, searchmarkUpType } from "../../../constants/contants";






const AddOnSearch = () => {




    const [markupTypeData, setmarkupTypeDataa] = useState({
        markupCountry: "",
        markupCity: "",

    });


    const handleCountryChange = (selectedCountry) => {
        setmarkupTypeDataa((prevData) => ({
            ...prevData,
            markupCountry: selectedCountry.value,
            markupCity: "", // Reset city when country changes
        }));
    };

    const handleCityChange = (selectedCity) => {
        setmarkupTypeDataa((prevData) => ({
            ...prevData,
            markupCity: selectedCity.value,
        }));
    };



    const [startDate, setStartDate] = useState(null); // State for the start date
    const [endDate, setEndDate] = useState(null); // State for the end date

    const handleTrashClick = () => {
        // Function to clear both start and end dates
        setStartDate(null);
        setEndDate(null);
    };
    return (
        <>
            <Header2
                title="SEARCH MARKUP "
                linkText1="List Markup"
                linkText2="Add Markup"
                link2={Constants.URLConstants.TOOLSADDONNEW}
            />
            <div class="container-fluid pt-0 p-4" id="content-pad">
                <form name="search_area_from" method="get" action="area.php">

                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-2 form-group">
                                <label>Branch Markup</label>
                                <MultiSelect
                            options={searchmarkUpType}
                            isSearchable
                            placeholder="- Select Branch -"
                            noOptionsMessage={() => "No Branch Found"}
                            className="custom-select"

                        />
                    

                            </div>
                            <div class="col-md-2 form-group">
                                <label>Markup Type</label>
                                <MultiSelect
                                    options={markupTypeOptions}
                                    isSearchable
                                    placeholder="Select Markup Type"
                                    noOptionsMessage={() => "No Markup Found"}
                                    className="custom-select"

                                />

                            </div>
                            <div class="form-group col-md-2" id="country_div" style={{ display: 'none' }}>
                                <label>Country</label>
                                <MultiSelect
                                    options={countries}
                                    isSearchable
                                    placeholder="- Please select a country -"
                                    className="custom-select"
                                    onChange={handleCountryChange}
                                    noOptionsMessage={() => "No Country Found"}
                                    value={countries.find(
                                        (c) => c.value === markupTypeData.markupCountry
                                    )}
                                />

                            </div>
                            <div class="form-group col-md-2" id="city_div" style={{ display: 'none' }}>
                                <label>City</label>
                                <MultiSelect
                                    //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                                    options={citiesByCountry[markupTypeData.markupCountry] || []}
                                    isSearchable
                                    placeholder="- Please select a city -"
                                    className="custom-select"
                                    onChange={handleCityChange}
                                    noOptionsMessage={() => "No City Found"}
                                    value={(citiesByCountry[markupTypeData.markupCountry] || []).find(
                                        (c) => c.value === markupTypeData.markupCity
                                    )}
                                />

                            </div>
                            <div class="form-group col-md-3">
                                <label for="exampleInputEmail1">Valid Date</label>
                                <div class="input-daterange input-group date" id="validFromTo">
                                    <Flatpickr
                                        value={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        options={{ dateFormat: "Y-m-d" }}
                                    />
                                    <span class="input-group-addon">to</span>
                                    <Flatpickr
                                        value={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        options={{ dateFormat: "Y-m-d" }}
                                    />
                                    <span class="input-group-addon" id="validTrashBtn" onClick={handleTrashClick}>
                                        <i class="fa fa-trash"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2">
                                <button class="btn btn-dark btn-sm form-group" type="button" value="Search"
                                >
                                    <i class="fa fa-search"></i>&nbsp;Search
                                </button>
                            </div>
                        </div>
                    </div>

                </form>
                <br />


                <form>

                    <div class="panel-body mt-2">
                        <div class="dataTables_scroll">
                            <div id="mesID" style={{ display: 'none' }}></div>

                            <div class="form-group alert alert-danger text-center" style={{ backgroundColor: '#f2dede' }}>
                                <h6 style={{ color: '#c48083!important' }}>No result found.</h6>
                            </div>
                        </div>
                    </div>

                </form>

            </div>
        </>
    );
};
export default AddOnSearch;