
import React, { useState, } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { citiesByCountry, countries } from "../../../constants/Country-City-Data";
import { markupTypeOptions } from "../../../constants/contants";







const AddOnNew = () => {

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
                title="MARKUP DETAILS"
                linkText1="Add Markup"
            />
            <div class="container-fluid pt-0 p-4" id="content-pad">
                <form>


                    <div class="panel-body">
                        <div id="message" style={{ display: 'none' }}></div>
                        <div class="row">
                            <div class="form-group col-md-2">
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
                            <div class="form-group col-md-2">
                                <label>Markup</label>
                                <div class="input-group date col-md-12  col-sm-12">
                                    <input class="form-control form-control-sm required" type="text" name="txt_markup" size="20" maxlength="10"
                                        onblur="extractNumber(this,2,true);" onkeyup="extractNumber(this,2,true);" />
                                    <span class="input-group-addon" style={{ cursor: 'default' }}><i>%</i></span>
                                </div>
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
                            <div class="form-group col-md-2">
                                <label>Status</label><br />
                                <div class="radioline1 mt-2">
                                    <div class="radio radio-success radio-inline">
                                        <input type="radio" id="inlineRadio2" name="txt_status" value="A" checked />
                                        <label for="inlineRadio2">Active</label>
                                    </div>
                                    <div class="radio radio-success radio-inline">
                                        <input type="radio" id="app" name="txt_status" value="I" />
                                        <label for="inlineRadio1">In Active</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                        </div>
                        <button type="button" name="b1" value="SUBMIT"
                            class="btn btn-dark btn-sm form-group">
                            <i class="fa fa-floppy-o"></i>&nbsp;Save
                        </button>
                    </div>
                </form>

            </div>
        </>
    );
};
export default AddOnNew;