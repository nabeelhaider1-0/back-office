/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react"; // Import React and useState

import { useNavigate } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import excelFileContent from '../../../ExcelFiles/worldcities.xlsx';
import {  timezoneOptions } from "../../../constants/contants";
import excelfilereader from "../../../constants/excelfilereader";
import { ErrorApiAlert, RequiredFieldAlert, SimpleAlert, SuccessApiToast } from "../../../constants/globalfunctions";
import { getDATA, postDATA } from "../../../Apis/API";
import ApiRoutes from "../../../constants/ApiRoutes";






const SuppliersDetails = () => {


    const [countryOptions, setcountryOptions] = useState([]);
    const [countrycitydata, setcountrycitydata] = useState([]);
    const [selectedCountry, setselectedCountry] = useState(null);
    const [cityOptions, setcityOptions] = useState([]);
    const [selectedCity, setselectedCity] = useState(null);
    const [currencyOptions, setcurrencyOptions] = useState([]);
   const [formData, setFormData] = useState({
    userName: "",
    password: "",
    code:"",
    supplierName: "",
    supplierType: [],
    supplierAddress: "",
    telephone: "",
    country: "",
    mobile: "",
    city: "",
    timeZone: "",
    currency: "",
    fax: "",
    email: [],
    reservationEmail: [],
    cancellationEmail: [],
    contactPerson1: "",
    contactPerson2: "",
    remarks: "",
    openingBalance: "",
    jointVenture: "no",
    sendEmail: "no",
    editHotels: "no",
    editAdminRates: "no",
    VCC : "no", 
    taxRegistration : "no"
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
  const getCurrencies = async () => {

    try {

      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.CURRENCIES.CURRENCY);
      if (response.data.statusCode === 200) {
        const currencies =response && response.data.data ? response.data.data : [];
       
      
        const options = currencies.map((curr) => ({
          value: curr.currencyCode,
          label: curr.currency,
        }));
        setcurrencyOptions(options);
        
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert('Error Fetching Currencies');
    } finally {

      // Set loading to false after data is fetched (whether successful or not)
    }
  };


  useEffect(() => {
    fetchExcelData();
    getCurrencies();
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
  
  const handleSupplierCheckboxChange = (e) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;
  
    if (isChecked) {
      // Add the selected checkbox value to supplierType array
      setFormData(prevFormData => ({
        ...prevFormData,
        supplierType: [...prevFormData.supplierType, checkboxValue]
      }));
    } else {
      // Remove the checkbox value from supplierType array if it's unchecked
      setFormData(prevFormData => ({
        ...prevFormData,
        supplierType: prevFormData.supplierType.filter(type => type !== checkboxValue)
      }));
    }
  };

  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
  
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: checked ? "yes" : "no" // Set "yes" if checked, otherwise "No"
    }));
  };
  const handleSingleSelectChange = (selectedOption, name) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: selectedOption.value // Assuming the option object has a 'value' property
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
  formData.country=(selectedCountry && selectedCountry.label) || '';
  formData.city=(selectedCity && selectedCity.label) || '';
  formData.email= emails;
  formData.reservationEmail= reservationemails;
  formData.cancellationEmail= cancellationemails;


  try {
    
     formData.timeZone=formData.timeZone.toString();
 
    const response = await postDATA(ApiRoutes.SUPPLIERS.OFFLINE);

    if (response.data.statusCode === 200) {
     
      SuccessApiToast( "Offline Supplier Added Successfully");
      
      navigate(Constants.URLConstants.OFFLINESUPPLIERSEARCH);
    }
  } catch (error) {
    ErrorApiAlert('Error Adding Offline Supplier');
    //  console.error(error)
  }
  }

// EMAIL MULTI INPUTS 
const [emails, setEmails] = useState(['']);

const handleEmailInputChange = (index, e) => {
  const newEmails = [...emails];
  newEmails[index] = e.target.value;
  setEmails(newEmails);
};

const addEmailField = (event) => {
  event.preventDefault();
  if (emails.length < 5) {
    setEmails([...emails, '']);
  } else {
    SimpleAlert("warning","","Sorry, you can add a maximum of 5 emails only");
    
  }
};

const removeEmailField = (event) => {
  event.preventDefault();
  if (emails.length > 1) {
    setEmails(emails.slice(0, -1));
  }
};

// EMAIL MULTI INPUTS END 

// RESERVATION EMAIL MULTI INPUTS 
const [reservationemails, setReservationEmails] = useState(['']);

const handleReservationEmailInputChange = (index, e) => {
  const newEmails = [...reservationemails];
  newEmails[index] = e.target.value;
  setReservationEmails(newEmails);
};

const addReservationEmailField = (event) => {
  event.preventDefault();
  if (reservationemails.length < 5) {
    setReservationEmails([...reservationemails, '']);
  } else {
    SimpleAlert("warning","","Sorry, you can add a maximum of 5 emails only");
    
  }
};

const removeReservationEmailField = (event) => {
  event.preventDefault();
  if (reservationemails.length > 1) {
    setReservationEmails(reservationemails.slice(0, -1));
  }
};

// RESERVATION MULTI INPUTS END 


// Cancellation EMAIL MULTI INPUTS 
const [cancellationemails, setCancellationEmails] = useState(['']);

const handleCancellationEmailInputChange = (index, e) => {
  const newEmails = [...cancellationemails];
  newEmails[index] = e.target.value;
  setCancellationEmails(newEmails);
};

const addCancellationEmailField = (event) => {
  event.preventDefault();
  if (cancellationemails.length < 5) {
    setCancellationEmails([...cancellationemails, '']);
  } else {
    SimpleAlert("warning","","Sorry, you can add a maximum of 5 emails only");
    
  }
};

const removeCancellationEmailField = (event) => {
  event.preventDefault();
  if (cancellationemails.length > 1) {
    setCancellationEmails(cancellationemails.slice(0, -1));
  }
};

// Cancellation MULTI INPUTS END 
    return (
      <>
        <Header2 title="ADD OFFLINE SUPPLIER" linkText1="List Offline Suppliers" linkText2="Add Offline Supplier" link1={Constants.URLConstants.MASTERSSUPPLIERSOFFLINESUPPLIERSSEARCH} />
        <div class="container-fluid pt-0 p-4">
          <form onSubmit={handleSubmit}  id="offlinesuppliernew">
            <div class="panel-body">
            <div className="row" >
                <div className="form-group col-md-3">
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
                <div className="form-group col-md-3"  onClick={handleCitySelection}>
                  <label>City</label>
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
                <div className="form-group col-md-3">
                  <label>Supplier Name</label>
                  <input className="add_width_fnt form-control form-control-sm required" type="text" size={45} maxLength={255} 
                  name="supplierName" 
                   id="supplierName"
                  value={formData.supplierName}
                  onChange={handleInputChange}
                  required
                  />
                </div>
              </div>
              <div class="row mt-2">
  
                <div class="form-group col-md-12">
                  <h5>Supplier Type</h5>
                  <div class="radioline1 mt-2">
                    <div class="checkbox checkbox-success checkbox-inline">
                      <input id="hotel_supplier" type="checkbox" name="hotel_supplier" value="Hotel Supplier"  onChange={handleSupplierCheckboxChange} />
                      <label for="hotel_supplier">Hotel Supplier</label>
                    </div>
                    <div class="checkbox checkbox-success checkbox-inline">
                      <input id="app" type="checkbox" name="sight_supplier" value="Activity Supplier"  onChange={handleSupplierCheckboxChange} />
                      <label for="sight_supplier">Activity Supplier</label>
                    </div>
                    <div class="checkbox checkbox-success checkbox-inline">
                      <input id="app" type="checkbox" name="transfer_supplier" value="Transfer Supplier"  onChange={handleSupplierCheckboxChange} />
                      <label for="transfer_supplier">Transfer Supplier</label>
                    </div>
                    <div class="checkbox checkbox-success checkbox-inline">
                      <input id="app" type="checkbox" name="visa_supplier" value="Visa Supplier"  onChange={handleSupplierCheckboxChange}  />
                      <label for="visa_supplier">Visa Supplier</label>
                    </div>
                    <div class="checkbox checkbox-success checkbox-inline">
                      <input id="app" type="checkbox" name="fit_package_supplier" value="FIT Package Supplier"  onChange={handleSupplierCheckboxChange}/>
                      <label for="fit_package_supplier">FIT Package Supplier</label>
                    </div>
                    <div class="checkbox checkbox-success checkbox-inline">
                      <input id="app" type="checkbox" name="airline_supplier" value="Airline Supplier"  onChange={handleSupplierCheckboxChange} />
                      <label for="airline_supplier">Airline Supplier</label>
                    </div>
                  </div>
                </div>
              </div>
            
              <div class="row mt-2">
                <div class="form-group col-md-12">
                  <label>Supplier Address</label>
                  <textarea class="form-control form-control-sm required"rows="4" cols="32"
                   name="supplierAddress" 
                   id="supplierAddress"
                  value={formData.supplierAddress}
                  onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>
              <div class="row mt-2">
                <div class="form-group col-md-3">
                  <label>Telephone</label>
                  <input type="text" class="form-control form-control-sm required" size="20" maxlength="20"
                     name="telephone" 
                     id="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    required
                   
                   />
                </div>
                <div class="form-group col-md-3">
                  <label> Fax</label>
                  <input type="text" class="form-control form-control-sm"  size="45" maxlength="20" 
                       name="fax" 
                       id="fax"
                      value={formData.fax}
                      onChange={handleInputChange}
                  />
                </div>
                <div class="form-group col-md-3">
                  <label> Mobile</label>
                  <input type="text" class="form-control form-control-sm"  size="20"  maxlength="20"
    name="mobile" 
    id="mobile"
   value={formData.mobile}
   onChange={handleInputChange}/>
                </div>
  
                <div class="col-md-3">
                <label>E-mail</label>
                <div className="row ">
      {emails.map((email, index) => (
        <div className="col-md-10" key={index}>
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-sm required"
              name={`email${index + 1}`}
              id={`email${index + 1}`}
              value={email}
              onChange={(e) => handleEmailInputChange(index, e)}
              required
              size="45"
              maxLength="70"
            />
            {index === 0 && (
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                <button className="input-group-addon" id="plus" onClick={(event)=>addEmailField(event)} style={{ marginRight: '5px' }}>
                  <i className="fa fa-plus" style={{ color: "black", fontSize: "17px" }}></i>
                </button>
                {emails.length > 1 && (
                  <button className="input-group-addon" id="minus" onClick={(event)=>removeEmailField(event)}>
                    <i className="fa fa-minus" style={{ color: "black", fontSize: "17px" }}></i>
                  </button>
                )}
              </div>
            )}
          </div>
          <p>For reference purposes only</p>
        </div>
      ))}
    </div>
                </div>
  
  
  
  
                <div class="col-md-3">
                  <div class="row">
                    <div class="col-md-12 form-group">
                      <label>Reservation Email</label>
                      <br />
                    
                      <div className="row ">
      {reservationemails.map((email, index) => (
        <div className="col-md-10" key={index}>
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-sm required"
              name={`email${index + 1}`}
              id={`email${index + 1}`}
              value={email}
              onChange={(e) => handleReservationEmailInputChange(index, e)}
              required
              size="45"
              maxLength="70"
            />
            {index === 0 && (
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                <button className="input-group-addon" id="plus" onClick={(event)=>addReservationEmailField(event)} style={{ marginRight: '5px' }}>
                  <i className="fa fa-plus" style={{ color: "black", fontSize: "17px" }}></i>
                </button>
                {reservationemails.length > 1 && (
                  <button className="input-group-addon" id="minus" onClick={(event)=>removeReservationEmailField(event)}>
                    <i className="fa fa-minus" style={{ color: "black", fontSize: "17px" }}></i>
                  </button>
                )}
              </div>
            )}
          </div>
          <p>For reference purposes only</p>
        </div>
      ))}
    </div>
                    </div>
                  </div>
                </div>
  
  
  
  
  
                <div class="col-md-3">
                  <div class="row">
                    <div class="col-md-12 form-group">
                      <label>Cancellation Email</label>
                      <br />
                     
                      <div className="row ">
      {cancellationemails.map((email, index) => (
        <div className="col-md-10" key={index}>
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-sm required"
              name={`email${index + 1}`}
              id={`email${index + 1}`}
              value={email}
              onChange={(e) => handleCancellationEmailInputChange(index, e)}
              required
              size="45"
              maxLength="70"
            />
            {index === 0 && (
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                <button className="input-group-addon" id="plus" onClick={(event)=>addCancellationEmailField(event)} style={{ marginRight: '5px' }}>
                  <i className="fa fa-plus" style={{ color: "black", fontSize: "17px" }}></i>
                </button>
                {cancellationemails.length > 1 && (
                  <button className="input-group-addon" id="minus" onClick={(event)=>removeCancellationEmailField(event)}>
                    <i className="fa fa-minus" style={{ color: "black", fontSize: "17px" }}></i>
                  </button>
                )}
              </div>
            )}
          </div>
          <p>For reference purposes only</p>
        </div>
      ))}
    </div>
                    </div>
                  </div>
                </div>
  
              </div>
             
              <div class="row mt-2">
                <div class="form-group col-md-3">
                  <label>Contact Person 1</label>
                  <input class="form-control form-control-sm" type="text"  size="45"
                   name="contactPerson1" 
                   id="contactPerson1"
                  value={formData.contactPerson1}
                  onChange={handleInputChange}
                  
                    maxlength="50" />
                </div>
                <div class="form-group col-md-3">
                  <label>Contact Person 2</label>
                  <input class="form-control form-control-sm" type="text" 
                  name="contactPerson2" 
                  id="contactPerson2"
                 value={formData.contactPerson2}
                 onChange={handleInputChange}
               
                  size="45"
                    maxlength="50" />
                </div>
                <div class="form-group col-md-3">
                  <label>Currency</label>
                  <MultiSelect
                    options={currencyOptions}
                    isSearchable
                    placeholder="- Select Currency-"
                    value={currencyOptions.find(option => option.value === formData.currency)}
                      onChange={(selectedOption) => handleSingleSelectChange(selectedOption, 'currency')}
                    className="custom-select required"
                    required
  
  
                  />
  
                </div>
                <div class="form-group col-md-3">
                  <label>Time Zone</label>
                  <MultiSelect
                    options={timezoneOptions}
                    isSearchable
                    value={timezoneOptions.find(option => option.value === formData.timeZone)}
                    onChange={(selectedOption) => handleSingleSelectChange(selectedOption, 'timeZone')}
                    placeholder="Select Time Zone"
                    className="custom-select"
  
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="form-group col-md-12">
                  <label> Remarks</label>
                  <textarea  rows="4" cols="80" class="form-control form-control-sm"
                   name="remarks" 
                   id="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  
                  ></textarea>
                </div>
              </div>
              <div class="row mt-2">
                <div class="form-group col-md-3">
                  <label>Username</label>
                  <input type="text" class="form-control form-control-sm required"  maxlength="20"
                    minlength="3"  name="userName" 
                    id="userName"
                   value={formData.userName}
                   onChange={handleInputChange} 
                   required
                    
                    />
                </div>
                <div class="form-group col-md-3">
                  <label>Password</label>
                  <input class="form-control form-control-sm required" type="password"  size="45"
                    maxlength="50" 
                    name="password" 
                    id="password"
                   value={formData.password}
                   onChange={handleInputChange} 
                   required />
                </div>
                <div class="form-group col-md-3">
                  <label>Opening Balance</label>
                  <input type="text"  class="form-control form-control-sm" size="45" 
                    maxlength="50"
                    name="openingBalance" 
                    id="openingBalance"
                   value={formData.openingBalance}
                   onChange={handleInputChange} 
                    />
                </div>
                <input type="hidden" name="txt_commission_type" value="P" />
              </div>
              <div className="row mt-2">
        <div className="form-group col-md-12" style={{ display: "flex" }}>
          <div data-toggle="tooltip" data-placement="top" title="" className="checkbox checkbox-success" style={{ display: "inline-block", marginRight: "1%;" }} data-original-title="if you want to send email to supplier then check it otherwise uncheck it.">
            <input data-label-prepend="prefix" type="checkbox" id="send_email" name="sendEmail" value="yes" onChange={handleCheckboxChange} checked={formData.sendEmail === "yes"} />
            <label htmlFor="send_email">Send Email</label>
          </div>
          <div className="checkbox checkbox-success checkbox-inline">
            <input data-label-prepend="prefix" type="checkbox" name="editHotels" id="app" value="yes" onChange={handleCheckboxChange} checked={formData.editHotels === "yes"} />
            <label htmlFor="editHotels">Allow to Edit Hotel Details</label>
          </div>
          <div className="checkbox checkbox-success checkbox-inline">
            <input data-label-prepend="prefix" type="checkbox" name="editAdminRates" id="app" value="yes" onChange={handleCheckboxChange} checked={formData.editAdminRates === "yes"} />
            <label htmlFor="editAdminRates">Allow to Edit Admin Rates</label>
          </div>
          <div className="checkbox checkbox-success checkbox-inline">
            <input data-label-prepend="prefix" type="checkbox" name="jointVenture" id="app" value="yes" onChange={handleCheckboxChange} checked={formData.jointVenture === "yes"} />
            <label htmlFor="jointVenture">Joint Venture</label>
          </div>
        </div>
      </div>
              <br />
              <div class="row">
                <div class="form-group col-md-12">
                  <button type="submit" class="btn btn-dark btn-sm" name="b1" value="SUBMIT"
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
export default SuppliersDetails