/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { pickupPointOptions } from "../../../constants/contants";
import excelfilereader from "../../../constants/excelfilereader";
import excelFileContent from '../../../ExcelFiles/worldcities.xlsx';
import {  RequiredFieldAlert, SimpleAlert, SuccessApiToast, filterOptionsByLabel } from "../../../constants/globalfunctions";
import Constants from "../../../constants/routes";
import {  putDATA } from "../../../Apis/API";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import ApiRoutes from "../../../constants/ApiRoutes";






const MastersTransfersLocationsEdit = ({ data }) => {
  const [countryOptions, setcountryOptions] = useState([]);
  const [countrycitydata, setcountrycitydata] = useState([]);
  const [selectedCountry, setselectedCountry] = useState(null);
  const [cityOptions, setcityOptions] = useState([]);
  const [selectedCity, setselectedCity] = useState(null);
  const [formData,setFormData]=useState({
    locationName: "",transferType:""});

    const navigateOnRefresh = useNavigate();

  const fetchExcelData = async () => {
    try {
        // Pass the Excel file content directly to the readExcelFile function
        const data = await excelfilereader(excelFileContent);
        setcountrycitydata(data);

 const uniqueCountries = Array.from(new Set(data.CountryCities.map((item) => item.country)))
 .map((country) => ({
   value: data.CountryCities.find((item) => item.country === country).iso3,
   label: country,
 }));
 setcountryOptions(uniqueCountries);

    } catch (error) {
       
    }
};
  useEffect(() => {
    fetchExcelData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    // Extract city options based on selected country
    if (selectedCountry) {
      const cities = countrycitydata.CountryCities
        .filter((item) => item.iso3 === selectedCountry.value)
        .map((item) => ({ value: item.city, label: item.city }));
      setcityOptions(cities);
    } else {
      setcityOptions([]);
    }
  }, [selectedCountry]);


 
  const handleCountryChange = (selectedOption) => {
    setselectedCountry(selectedOption);
    setselectedCity(null); 
  };

  const handleCityChange = (selectedOption) => {
    setselectedCity(selectedOption); 
  };
  const handleSingleSelectChange = (selectedOption, name) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: selectedOption.value // Assuming the option object has a 'value' property
    }));
  };
  const handleCitySelection = () => {
    if (!selectedCountry) {
      // If no country is selected, display a warning
      RequiredFieldAlert("Please select country first", "", "warning");
    }
  };

  const checkRequired = (locationData) => {
    if (locationData.country === "" || locationData.country === undefined) {
        RequiredFieldAlert("Country is required", "Please select Country", "error");
      return false;
    }
    if (locationData.city === "" || locationData.city === undefined) {
        RequiredFieldAlert("City is required", "Please select City", "error");
      return false;
    }
    if (locationData.transferType === "" || locationData.transferType === undefined) {
        RequiredFieldAlert("Transfer Type is required", "Please select Transfer Type", "error");
      return false;
    }
    if (
      locationData.locationName === "" ||
      locationData.locationName === undefined
    ) {
        RequiredFieldAlert(
        "Location Name is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }
    return true;
  };


  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData({
        locationName: data.locationName,
        transferType:data.transferType,
      });
    } else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(Constants.URLConstants.MASTERSTRANSFERSLOCATIONSSEARCH);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, navigateOnRefresh]);
  //  hanlesubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestBody={
        "locationName": (formData.locationName && formData.locationName)||'',
        "country": (selectedCountry && selectedCountry.label) || '',
        "city": (selectedCity && selectedCity.label) || data.city,
        "transferType": (formData.transferType && formData.transferType)||'',
       
      }
  
    const isSuccessfull = checkRequired(requestBody);
    if (isSuccessfull) {
        try {
            // Make an API call to update the staff's active status
            
            const response = await putDATA(ApiRoutes.TRANSFERS.TRANSFER_LOCATION,data.uuid ,requestBody);
      
            // Check the response and handle it accordingly
            if (response.data.statusCode === 200) {
            
                SuccessApiToast( "Location Updated Successfully");
                navigateOnRefresh(Constants.URLConstants.MASTERSTRANSFERSLOCATIONSSEARCH);

            } else {
                    
              SimpleAlert("error",
               "Error",
            "Failed to Update Location");
            }
          } catch (error) {
            // Handle errors from the API call
      
            SimpleAlert(  "error",
             "Error",
           "An unexpected error occurred.");
          }
    }
  };
  const countryValue = selectedCountry
  ? selectedCountry
  : filterOptionsByLabel(countryOptions, data.country);
const cityValue = selectedCity
  ? selectedCity
  : filterOptionsByLabel(cityOptions, data.city);
useEffect(() => {
  if (!selectedCountry && countryOptions && countryOptions.length > 0) {
    setselectedCountry(countryValue);
    
  }

}, [selectedCountry, countryOptions, countryValue]);
  return (
    <>
      <Header2 title="EDIT LOCATION" />
      <div class="container-fluid pt-0 p-4" id="content-pad">

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="f_action" id="f_action" />
          <div className="panel-body">
            <div className="mesID" style={{ display: 'none' }}>
            </div>
            <div className="row">
              <div className="col-md-2 form-group">
                <label>Select Country</label>
                <MultiSelect
                  options={countryOptions}
                  isSearchable
                  placeholder="- Select Country -"
                   name="country"
                  value={countryValue}
                  className="custom-select required"
                  onChange={handleCountryChange}
                    noOptionsMessage={() => "No Country Found"}

                />
                <img src="images/loader.gif" alt="cri" name="loader" width="20px" height="15px" id="loader" style={{ visibility: 'hidden' }} />
              </div>
              {/* [START] Added code for row - 7 January 2015 - swapnil nagaonkar */}
              <div className="col-md-2 form-group" onClick={handleCitySelection} >
                <label>Select City</label>
                <MultiSelect
                  
                    options={cityOptions}
                    value={cityValue}
                    isSearchable
                    name="city"
                    placeholder="- Select City -"
                    className="custom-select required"
                    onChange={handleCityChange}
                    isDisabled={!selectedCountry}
                    noOptionsMessage={() => "No City Found"}

                  />
              </div>
              {/* [END] Ended code for row - 7 January 2015 - swapnil nagaonkar */}
              <div className="col-md-2 form-group">
                <label>Transfer Type </label>
                <MultiSelect
                  options={pickupPointOptions}
                  isSearchable
                  name="transferType"
                  placeholder="- Select Transfer Type -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Transfer Type Found"}
                  value={pickupPointOptions.find(option => option.value === formData.transferType)}
                    onChange={(selectedOption) => handleSingleSelectChange(selectedOption, 'transferType')}
       />
                <img src="images/loader.gif" alt="cri" name="loader_1" width="20px" height="15px" id="loader_1" style={{ visibility: 'hidden' }} />
              </div>
              <div className="col-md-2 form-group" id="other_city" style={{ display: 'none' }}>
                <label>Other City</label>
                <MultiSelect
                    //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                    options={cityOptions}
                    value={selectedCity}
                    isSearchable
                    placeholder="- Select City -"
                    className="custom-select required"
                    onChange={handleCityChange}
                    isDisabled={!selectedCountry}
                    noOptionsMessage={() => "No City Found"}

                  />
              </div>

              <div className="col-md-2 form-group">
                <label>Transfer Location Name </label>
                <input className="form-control form-control-sm required" name="locationName" type="text" id="locationName"
                
                value={formData.locationName}
                onChange={handleInputChange}
               
                />
              </div>

            </div>
            <div className="row">
              <div className="col-sm-12 form-group">
                <button type="submit" className="btn btn-dark btn-sm" name="button" id="button" value="ADD" onclick="addLocation()">
                  <i className="fa fa-save" />&nbsp;Save
                </button>
              </div>
            </div>
          </div>
        </form>



      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
    data: state.data,
  });
export default connect(mapStateToProps)(MastersTransfersLocationsEdit);