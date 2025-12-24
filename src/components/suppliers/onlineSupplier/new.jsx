/* eslint-disable react-hooks/exhaustive-deps */
import Header2 from "../../header2/header2";



import { useEffect, useState } from "react";
import { supplierServicesOptions, timezoneOptions } from "../../../constants/contants";
import MultiSelect from "../../reactMultiSelect";

import excelfilereader from "../../../constants/excelfilereader";

import excelFileContent from '../../../ExcelFiles/worldcities.xlsx';
import { ErrorApiAlert, RequiredFieldAlert, SuccessApiToast } from "../../../constants/globalfunctions";
import { postDATA } from "../../../Apis/API";
import Constants from "../../../constants/routes";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../../../constants/ApiRoutes";

  



const SuppliersDetails = () => {



  const [countryOptions, setcountryOptions] = useState([]);
  const [countrycitydata, setcountrycitydata] = useState([]);
  const [selectedCountry, setselectedCountry] = useState(null);
  const [cityOptions, setcityOptions] = useState([]);
  const [selectedCity, setselectedCity] = useState(null);

 const [formData, setFormData] = useState({
  companyName: "",
  supplierName: "",
  supplierType: "",
  firstName: "",
  middleName: "",
  lastName: "",
  Address: "",
  country: "",
  city: "",
  pinCode: "",
  timeZone: "",
  phone: "",
  mobile: "",
  email: "",
  b2bAvailabilityTimeout: "",
  b2cAvailabilityTimeout: "",
  bookNowTimeout: "",
  supplierPreference: "",
  supplierFolder: "",
  originalSource: "",
  switchPayment: "no"
  });



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


const handleCitySelection = () => {
  if (!selectedCountry) {
    // If no country is selected, display a warning
    RequiredFieldAlert("Please select country first", "", "warning");
  }
};
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const handleSingleSelectChange = (selectedOption, name) => {
  setFormData(prevState => ({
    ...prevState,
    [name]: selectedOption.value // Assuming the option object has a 'value' property
  }));
};
const handleCheckboxChange = (e) => {
  const { name, checked } = e.target;

  setFormData(prevFormData => ({
    ...prevFormData,
    [name]: checked ? "yes" : "no" // Set "yes" if checked, otherwise "No"
  }));
};

const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
  formData.country=(selectedCountry && selectedCountry.label) || '';
  formData.city=(selectedCity && selectedCity.label) || '';

  
  try {
    
     formData.timeZone=formData.timeZone.toString();
 
    const response = await postDATA(formData,ApiRoutes.SUPPLIERS.OFFLINE.SUPPLIER);

    if (response.data.statusCode === 200) {
     
      SuccessApiToast( "Online Supplier Added Successfully");
      
      navigate(Constants.URLConstants.SUPPLIERSEARCH);
    }
  } catch (error) {
    ErrorApiAlert('Error Adding Online Supplier');
    //  console.error(error)
  }
  }
  return (
    <>
      <Header2 title={"SUPPLIER DETAILS"} linkText1="Add Supplier" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit} id="onlinesuppliernewform">
          <div class="panel-body">
            <div class="row">
              <div class="form-group col-md-3 phps_row_1">
                <label>Company Name</label>
                <input
                  type="text"
                
                  class="form-control form-control-sm required test123"
                  size="45"
                  maxlength="90"
                  name="companyName" 
                  id="companyName"
                 value={formData.companyName}
                 onChange={handleInputChange}
                 required
                />
              </div>
              <div class="form-group col-md-3 phps_row_0">
                <label>Supplier</label>
                <input
                  type="text"
                 
                  class="form-control form-control-sm required"
                  size="20"
                  maxlength="30"
                  name="supplierName" 
                  id="supplierName"
                 value={formData.supplierName}
                 onChange={handleInputChange}
                 required
                />
              </div>
              <div class="form-group col-md-3 phps_row_1">
                <label>Supplier Type</label>
                <br />
                <MultiSelect
                  options={supplierServicesOptions}
                  isSearchable
                  placeholder="All"
                  className="custom-select"
                  value={supplierServicesOptions.find(option => option.value === formData.supplierType)}
                  onChange={(selectedOption) => handleSingleSelectChange(selectedOption, 'supplierType')}
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="form-group col-md-3 phps_row_0">
                <label>First Name</label>
                <input
                  class="form-control form-control-sm required"
                  type="type"
                
                  size="20"
                  maxlength="100"
                  name="firstName" 
                  id="firstName"
                 value={formData.firstName}
                 onChange={handleInputChange}
                 required
                />
              </div>
              <div class="form-group col-md-3 phps_row_1">
                <label>Middle Name</label>
                <input
                  type="type"
                  class="form-control form-control-sm"
                 
                  size="20"
                  maxlength="100"
                  name="middleName" 
                  id="middleName"
                 value={formData.middleName}
                 onChange={handleInputChange}
          
                />
              </div>
              <div class="form-group col-md-3 phps_row_0">
                <label>Last Name</label>
                <input
                  type="type"
                  class="form-control form-control-sm required"
                  
                  size="20"
                  maxlength="100"
                  name="lastName" 
                  id="lastName"
                 value={formData.lastName}
                 onChange={handleInputChange}
                 required
                />
              </div>
            </div>

            <div class="row mt-2">
              <div class="form-group col-md-12 phps_row_1">
                <label>Address</label>
                <textarea
               
                  rows="4"
                  class="form-control form-control-sm"
                  cols="30"
                  name="Address" 
                  id="Address"
                 value={formData.Address}
                 onChange={handleInputChange}
                 
                ></textarea>
              </div>
              <div class="form-group col-md-3 phps_row_0 mt-2">
                <label>Country</label>
                <MultiSelect
                    options={countryOptions}
                    isSearchable
                    placeholder="- Select Country -"
                    className="custom-select required"
                    onChange={handleCountryChange}
                    noOptionsMessage={() => "No Country Found"}
  required
                  />
              </div>
              <div class="form-group col-md-3 phps_row_1 mt-2" onClick={handleCitySelection}>
                <label>City</label>
                <br />
                <MultiSelect
             options={cityOptions}
             value={selectedCity}
                    isSearchable
                    placeholder="- Select City -"
                    className="custom-select required"
                    onChange={handleCityChange}
                    isDisabled={!selectedCountry}
                    noOptionsMessage={() => "No City Found"}
  required
                  />
              </div>
              <div class="form-group col-md-3 phps_row_0 mt-2">
                <label>Pincode</label>
                <input
                  type="text"
                 
                  class="form-control form-control-sm"
                  size="6"
                  maxlength="6"
                  name="pinCode" 
                  id="pinCode"
                 value={formData.pinCode}
                 onChange={handleInputChange}
                />
              </div>
              <div class="col-md-3 phps_row_1 form-group mt-2">
                <label>Time Zone</label>
                <MultiSelect
                  options={timezoneOptions}
                  isSearchable
                  placeholder="Select Time Zone"
                  className="custom-select required"
                  value={timezoneOptions.find(option => option.value === formData.timeZone)}
                  onChange={(selectedOption) => handleSingleSelectChange(selectedOption, 'timeZone')}
                  required
                
                />
              </div>
              <div class="form-group col-md-3 phps_row_0 mt-2">
                <label>Phone Number</label>
                <input
                  class="form-control form-control-sm"
                  
                  type="tel"
                 
                  size="30"
                  maxlength="20"
                  name="phone" 
                  id="phone"
                 value={formData.phone}
                 onChange={handleInputChange}
                />
              </div>
              <div class="form-group col-md-3 phps_row_1 mt-2">
                <label>Mobile Number</label>
                <input
                  type="tel"
          
                  
                  size="30"
                  maxlength="20"
                  class="form-control form-control-sm required"
                  name="mobile" 
                  id="mobile"
                 value={formData.mobile}
                 onChange={handleInputChange}
                 required
                />
              </div>
              <div class="form-group col-md-3 phps_row_0 mt-2">
                <label>Email</label>
                <input
                  class="form-control form-control-sm required"
                  type="text"
                 
                  size="30"
                  maxlength="70"
                  name="email" 
                  id="email"
                 value={formData.email}
                 onChange={handleInputChange}
                 required
                />
              </div>
              <div class="form-group col-md-3 phps_row_1 mt-2">
                <label>B2B Availability Timeout</label>
                <input
                  class="form-control form-control-sm"
                  type="text"
               
                  size="2"
                  maxlength="2"
                  name="b2bAvailabilityTimeout" 
                  id="b2bAvailabilityTimeout"
                 value={formData.b2bAvailabilityTimeout}
                 onChange={handleInputChange}
                
                />
              </div>
              <div class="form-group col-md-3 phps_row_0 mt-2">
                <label>B2C Availability Timeout</label>
                <input
                  class="form-control form-control-sm"
                  type="text"
                 
                  size="2"
                  maxlength="2"
                  name="b2cAvailabilityTimeout" 
                  id="b2cAvailabilityTimeout"
                 value={formData.b2cAvailabilityTimeout}
                 onChange={handleInputChange}
                />
              </div>
              <div class="col-md-3 phps_row_1 form-group mt-2">
                <label>Book Now time out (Minute)</label>
                <input
                  class="form-control form-control-sm"
                  type="text"
               
                  size="10"
                  name="bookNowTimeout" 
                  id="bookNowTimeout"
                 value={formData.bookNowTimeout}
                 onChange={handleInputChange}
             
                />
              </div>
              <div class="col-md-3 phps_row_0 form-group mt-2">
                <label>Supplier Preference</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
             
                  size="10"
                  name="supplierPreference" 
                  id="supplierPreference"
                 value={formData.supplierPreference}
                 onChange={handleInputChange}
                />
              </div>
              <div class="form-group col-md-3 phps_row_1 mt-2">
                <label>Supplier Folder</label>
                <input
                  class="form-control form-control-sm"
                  type="text"
              
                  name="supplierFolder" 
                  id="supplierFolder"
                 value={formData.supplierFolder}
                 onChange={handleInputChange}
                />
              </div>
              <div class="form-group col-md-3 phps_row_0 mt-2">
                <label>Original Source</label>
                <input
                  class="form-control form-control-sm"
                  type="text"
               
                  name="originalSource" 
                  id="originalSource"
                 value={formData.originalSource}
                 onChange={handleInputChange}
                />
              </div>
              <div class="form-group col-md-4 phps_row_1 mt-5">
                <label>
                  Allow Switch Payment :{" "}
                  <input
                    type="checkbox"
                    
                    name="switchPayment"
                     value="yes"
                     onChange={handleCheckboxChange} checked={formData.switchPayment === "yes"} 
                  />
                </label>
              </div>
            </div>
            <br />
            <div class="row mt-2">
              <div class="col-md-12 form-group">
                <button
                  type="submit"
                  class="btn btn-dark btn-sm"
                  name="b1"
            
                >
                  <i class="fa fa-floppy-o"></i>&nbsp;Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default SuppliersDetails;
