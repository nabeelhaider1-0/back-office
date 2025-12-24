/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import Header2 from '../header2/header2';
import Constants from '../../constants/routes';
import MultiSelect from '../reactMultiSelect';
import excelFileContent from "../../ExcelFiles/worldcities.xlsx";

import {  natureOfBusinessOptions, timezoneOptions } from '../../constants/contants';
import uploadFile from '../../constants/filesuploader';
import Swal from 'sweetalert2';
import { getAllBranches, getAllRights, getAllStaff, getDATA, putDATA } from '../../Apis/API';
import { useNavigate } from 'react-router-dom';
import excelfilereader from '../../constants/excelfilereader';
import { ErrorApiAlert, filterOptionsByLabel, filterOptionsByValue, SimpleAlert, SuccessApiToast } from '../../constants/globalfunctions';
import { connect } from 'react-redux';
import ApiRoutes from "../../constants/ApiRoutes"



const CustomersAgentEdit = ({data}) => {

  const [staffconsultantData, setStaffconsultantData] = useState([]);
  const [staffsalesmanagerData, setStaffsalesmanagerData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [countryOptions, setCountryOptions] = useState([]);
  const [countrycitydata, setCountryCityData] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [currencyOptions, setcurrencyOptions] = useState([]);
  const [iscityChanged, setiscityChanged] = useState(false);
  const navigate = useNavigate();
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    agentName: "",
    agentEmail: "",
    agencyName: "",
    agencyEmail: "",
    countryCodePhone: "",
    designation:"",//additional change field
    natureofbusiness:"",//additional change field
    tagline:"",//additional change field
    address:"",//additional change field
    pinorzip:"",//additional change field
    iatastatus:false,//additional change field
    iatano:"",//additional change field
    mobile:"",//additional change field
    fax:"",//additional change field
    website:"",//additional change field
    accountantname:"",//additional change field
    accountantemail:"",//additional change field
    accountantphone:"",//additional change field
    managementname:"",//additional change field
    managementemail:"",//additional change field
    managementphone:"",//additional change field
   reservationname:"",//additional change field
   reservationemail:"",//additional change field
   reservationphone:"",//additional change field
   remarks:"",//additional change field
   companyregno:"",//additional change field
    phone: "",
    agentLogo: "",
    currency: "",
    timeZone: "",
    branch: "",
    salesmanager: "",
    consultant: "",
    multiCurrencySearch: false,
    makeBookings: false,
    allowQuotation: false,
    allowBookingsWithinCancellation: false,
    allowVoucherBookings: false,
    flightsAllowTicketing: false,
    allowCreditToUse: false,
    allowInvoiceQRCode: false,
    allowCoBranding: false,
  });
  
  const [branchData, setBranchData] = useState({
    branchCountry: "",
    branchCity: "",
  });

  const [rightsData, setRightsData] = useState([]);
  const [selectedRights, setSelectedRights] = useState(new Set());

  const getRights = async () => {
    try {
      const response = await getAllRights();

      if (response.data.statusCode === 200) {
        const rights = response.data.data || [];

        setRightsData(rights);
        const initialSelectedRights = new Set(
          data.rights ? data.rights.map(userRight => userRight.uuid) : []
        );
        setSelectedRights(initialSelectedRights);
      }
    } catch (error) {}
  };

//   const isRightSelected = (rightUuid) => {
//     return   data.rights && data.rights.length>0? data.rights.some(userRight => userRight.uuid === rightUuid):false;
// };
const handleCheckboxChange = (rightUuid) => {
  setSelectedRights((prevSelectedRights) => {
    const newSelectedRights = new Set(prevSelectedRights);

    if (newSelectedRights.has(rightUuid)) {
      newSelectedRights.delete(rightUuid);
    } else {
      newSelectedRights.add(rightUuid);
    }

    return newSelectedRights;
  });
};

const isRightSelected = (rightUuid) => {
  return selectedRights.has(rightUuid);
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
        if (data.currency && options.length > 0) {
          const selectedOption = filterOptionsByLabel(options, data.currency);
          setFormData((prevFormData) => ({
            ...prevFormData,
            currency: selectedOption,
          }));
        }
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert('Error Fetching Currencies');
    } finally {

      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  const fetchExcelData = async () => {
    try {
      // Pass the Excel file content directly to the readExcelFile function
      const data = await excelfilereader(excelFileContent);

      setCountryCityData(data);
      const uniqueCountries = Array.from(
        new Set(data.CountryCities.map((item) => item.country))
      ).map((country) => ({
        value: data.CountryCities.find((item) => item.country === country).iso3,
        label: country,
      }));
      setCountryOptions(uniqueCountries);
    } catch (error) {}
  };
  useEffect(() => {
    fetchExcelData();
    getRights();
    getCurrencies();
  }, []);

  useEffect(() => {
    // Extract city options based on selected country
    if (selectedCountry) {
      const cities = countrycitydata.CountryCities.filter(
        (item) => item.iso3 === selectedCountry.value
      ).map((item) => ({ value: item.city, label: item.city }));
      setCityOptions(cities);
    } else {
      setCityOptions([]);
    }
  }, [selectedCountry]);
  const checkAndConvert = (value) => {
    return value !== null && value !== undefined ? value : "";
  };
  useEffect(() => {
         
       
    if (data && Object.keys(data).length > 0) {
    
     
      setFormData({
        userName: checkAndConvert(data.userName),
        password: checkAndConvert(data.password),
        confirmPassword: checkAndConvert(data.password),
        agentName: checkAndConvert(data.agentName),
        agentEmail: checkAndConvert(data.agentEmail),
        agencyName: checkAndConvert(data.agencyName),
        agencyEmail: checkAndConvert(data.agencyEmail),
        countryCodePhone: checkAndConvert(data.countryCodePhone),
        designation: checkAndConvert(data.designation),
        natureofbusiness: checkAndConvert(filterOptionsByValue(natureOfBusinessOptions, data.natureofbusiness)),
        tagline: checkAndConvert(data.tagline),
        address: checkAndConvert(data.address),
        pinorzip: checkAndConvert(data.pinorzip),
        iatastatus: checkAndConvert(data.iatastatus),
        iatano: checkAndConvert(data.iatano),
        mobile: checkAndConvert(data.mobile),
        fax: checkAndConvert(data.fax),
        website: checkAndConvert(data.website),
        accountantname: checkAndConvert(data.accountantname),
        accountantemail: checkAndConvert(data.accountantemail),
        accountantphone: checkAndConvert(data.accountantphone),
        managementname: checkAndConvert(data.managementname),
        managementemail: checkAndConvert(data.managementemail),
        managementphone: checkAndConvert(data.managementphone),
        reservationname: checkAndConvert(data.reservationname),
        reservationemail: checkAndConvert(data.reservationemail),
        reservationphone: checkAndConvert(data.reservationphone),
        remarks: checkAndConvert(data.remarks),
        companyregno: checkAndConvert(data.companyregno),
        phone: checkAndConvert(data.phone),
        agentLogo: checkAndConvert(data.agentLogo),
        currency: checkAndConvert(data.currency),
        timeZone: checkAndConvert(filterOptionsByLabel(timezoneOptions, data.timeZone)),
        branch: checkAndConvert(data.branch.uuid),
        salesmanager: checkAndConvert(data.salesmanager.uuid),
        consultant: checkAndConvert(data.consultant.uuid),
        multiCurrencySearch: checkAndConvert(data.multiCurrencySearch),
        makeBookings: checkAndConvert(data.makeBookings),
        allowQuotation: checkAndConvert(data.allowQuotation),
        allowBookingsWithinCancellation: checkAndConvert(data.allowBookingsWithinCancellation),
        allowVoucherBookings: checkAndConvert(data.allowVoucherBookings),
        flightsAllowTicketing: checkAndConvert(data.flightsAllowTicketing),
        allowCreditToUse: checkAndConvert(data.allowCreditToUse),
        allowInvoiceQRCode: checkAndConvert(data.allowInvoiceQRCode),
        allowCoBranding: checkAndConvert(data.allowCoBranding),
      });
setShowIataTextField(data.iatastatus);
     }
  
     else {
      // If data is not available, navigate to the branch search page
      navigate(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
    }
  }, [data, navigate]);
  
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setBranchData((prevData) => ({
      ...prevData,
      branchCountry: selectedOption.label,
      branchCity: "", // Reset city when country changes
    }));
    setSelectedCity(null); // Reset city selection when country changes
  };

  const handleCityChange = (selectedOption) => {
    setiscityChanged(true);
    setSelectedCity(selectedOption);
    setBranchData((prevData) => ({
      ...prevData,
      branchCity: selectedOption.label,
    }));
  };

 
   // State to track the visibility of the reminder div
   const [showIataTextField, setShowIataTextField] = useState(false);

   const handleRadioChange = (e) => {
       const iatastatus = e.target.value === "true"; // Convert 'Y' to true, 'N' to false
       setShowIataTextField(iatastatus);
       setFormData(prevState => ({
           ...prevState,
           iatastatus: iatastatus
       }));
   };
  const handleMultiSelectChange = (selectedOptions) => {
    setFormData((prevState) => ({
      ...prevState,
      branch: selectedOptions,
    }));
  };

  const [branches, setBranches] = useState();

  const getStaff = async () => {
    try {
      // Set loading to true when fetching data
      const response = await getAllStaff();

      if (response.data.statusCode === 200) {
        const staffData =
          response && response.data.data ? response.data.data : [];

        

        // Handle the staff data as needed
        // For example, update state, perform further processing, etc.

        const options = staffData.map((staff) => ({
          value: staff.uuid,
          label: staff.userName,
        }));
        
        setStaffconsultantData(options);
        setStaffsalesmanagerData(options);
        if (data.salesmanager && options.length > 0) {
          const selectedSalesManager = options.find(option => option.value === data.salesmanager.uuid);
          setFormData(prevFormData => ({
            ...prevFormData,
            salesmanager: selectedSalesManager
          }));
        }

        if (data.consultant && options.length > 0) {
          const selectedConsultant = options.find(option => option.value === data.consultant.uuid);
          setFormData(prevFormData => ({
            ...prevFormData,
            consultant: selectedConsultant
          }));
        }
        
      }

      // Handle successFful response, e.g., set user state, redirect, etc.
    } catch (error) {
      // Handle errors
    } finally {
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  const getbranches = async () => {
    try {
      const response = await getAllBranches();

      if (response.data.statusCode === 200) {
        const branches = response.data.data || [];

        const options = branches.map((branch) => ({
          value: branch.uuid,
          label: branch.branchName,
        }));
        setBranches(options); 
        if (data.branch && options.length > 0) {
          const selectedBranch = options.find(option => option.value === data.branch.uuid);
          setFormData(prevFormData => ({
            ...prevFormData,
            branch: selectedBranch
          }));
        }
        // Set branches in the new state
      }
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    getbranches();
    getStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkRequired = (bdata) => {
    if (bdata.userName === "" || bdata.userName === undefined) {
      Swal.fire(
        "User Name is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    // Email validation

    if (bdata.password === "" || bdata.password === undefined) {
      Swal.fire(
        "Password is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;
    if (!passwordRegex.test(bdata.password)) {
      Swal.fire(
        "Password Validation",
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 special symbol.",
        "error"
      );
      return false;
    }

    if (
      formData.confirmPassword === "" ||
      formData.confirmPassword === undefined
    ) {
      Swal.fire(
        "Confirm Password is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }
    if (bdata.agentName === "" || bdata.agentName === undefined) {
      Swal.fire(
        "Agent Name is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }
    if (bdata.agentEmail === "" || bdata.agentEmail === undefined) {
      Swal.fire(
        "Agent Email is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(bdata.agentEmail.trim())) {
      Swal.fire(
        "Agent Email Validation",
        "Please enter a valid email address.",
        "error"
      );
      return false;
    }

    if (bdata.agencyName === "" || bdata.agencyName === undefined) {
      Swal.fire(
        "Agency Name is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }
    if (bdata.agencyEmail === "" || bdata.agencyEmail === undefined) {
      Swal.fire(
        "Agency Email is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (!emailRegex.test(bdata.agencyEmail.trim())) {
      Swal.fire(
        "Agency Email Validation",
        "Please enter a valid email address.",
        "error"
      );
      return false;
    }

    if (bdata.country === "" || bdata.country === undefined) {
      Swal.fire("Country is required", "Please select Country", "error");
      return false;
    }
    if (bdata.city === "" || bdata.city === undefined) {
      Swal.fire("City is required", "Please select City", "error");
      return false;
    }

    if (bdata.currency === "" || bdata.currency === undefined) {
      Swal.fire("Currency is required", "Please select Currency", "error");
      return false;
    }
    if (bdata.timeZone === "" || bdata.timeZone === undefined) {
      Swal.fire("Time Zone is required", "Please select Time Zone", "error");
      return false;
    }
    if (bdata.branch === "" || bdata.branch === undefined) {
      Swal.fire("Branch is required", "Please select Branch", "error");
      return false;
    }

    if (bdata.password !== "" || formData.confirmPassword !== "") {
      if (bdata.password !== formData.confirmPassword) {
        Swal.fire(
          "Password and Confirm Password must match",
          "kindly enter correct passwords",
          "error"
        );
        return false;
      }
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      formData.agentLogo = data.agentLogo;
    } else {
      const resp = await uploadFile(selectedFile);
      if (resp.success === true) {
        formData.agentLogo = resp.imagelink;
      } else {
      }
    }
    const checkedRightsUuids = rightsData
      .filter((right) => document.getElementById(`chk_${right.uuid}`).checked)
      .map((right) => right.uuid);
    const requestBody = {
      userName: formData.userName || '',
      password: formData.password || '',
      agentName: formData.agentName || '',
      agentEmail: formData.agentEmail || '',
      agencyName: formData.agencyName || '',
      agencyEmail: formData.agencyEmail || '',
      designation: formData.designation || '', // additional change field
      natureofbusiness: formData.natureofbusiness && formData.natureofbusiness.value ? formData.natureofbusiness.value : data.natureofbusiness,
      tagline: formData.tagline || '', // additional change field
      address: formData.address || '', // additional change field
      pinorzip: formData.pinorzip || '', // additional change field
      iatastatus: formData.iatastatus || '', // additional change field
      iatano: formData.iatastatus ? (formData.iatano || '') : '', // additional change field
      mobile: formData.mobile || '', // additional change field
      fax: formData.fax || '', // additional change field
      website: formData.website || '', // additional change field
      accountantname: formData.accountantname || '', // additional change field
      accountantemail: formData.accountantemail || '', // additional change field
      accountantphone: formData.accountantphone || '', // additional change field
      managementname: formData.managementname || '', // additional change field
      managementemail: formData.managementemail || '', // additional change field
      managementphone: formData.managementphone || '', // additional change field
      reservationname: formData.reservationname || '', // additional change field
      reservationemail: formData.reservationemail || '', // additional change field
      reservationphone: formData.reservationphone || '', // additional change field
      remarks: formData.remarks || '', // additional change field
      companyregno: formData.companyregno || '', // additional change field
      country: branchData.branchCountry || data.country || '',
      phone: formData.phone || '',
      city: branchData.branchCity || data.city || '',
      timeZone: formData.timeZone && formData.timeZone.label ? formData.timeZone.label : '',
      currency: formData.currency && formData.currency.label ? formData.currency.label : '',
      salesmanager: formData.salesmanager && formData.salesmanager.value ? formData.salesmanager.value : '',
      branch: formData.branch && formData.branch.value ? formData.branch.value : '',
      consultant: formData.consultant && formData.consultant.value ? formData.consultant.value : '',
      rightsUuid: checkedRightsUuids || [],
      image: formData.agentLogo || '',
      updatepassword:false
    };


    const isSuccessfull = checkRequired(requestBody);
    if (isSuccessfull) {
      try {
        // Make an API call to update the staff's active status
        
        const response = await putDATA(ApiRoutes.CUSTOMER_AGENTS.AGENT,data.uuid ,requestBody);
      
        // Check the response and handle it accordingly
        if (response.data.statusCode === 200) {
        
            SuccessApiToast( "Agent Updated Successfully");
            navigate(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
      
        } else {
                
          SimpleAlert("error",
           "Error",
        "Failed to Update Agent");
        }
      } catch (error) {
        // Handle errors from the API call
      
        SimpleAlert(  "error",
         "Error",
       "An unexpected error occurred.");
      }
     
    }
    // Handle form submission logic here
  };

  useEffect(() => {
    // Check if pickupcountryOptions has some length
    if (countryOptions && countryOptions.length > 0) {
      // Check if pickupselectedCountry is not set and pickupcountryValue has some value
      if (!selectedCountry) {
        // Ensure data.pickupCountry is defined before calling filterOptionsByLabel
        if (data.country) {
          const countryValue = filterOptionsByLabel(countryOptions, data.country);
          setSelectedCountry(countryValue);
  
              const cityValue = filterOptionsByLabel(cityOptions, data.city);
              setSelectedCity(cityValue);
        }
      }
    }
  }, [countryOptions, selectedCountry, data.country]);
  
 
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="CREATE NEW AGENT" linkText1=" Create New Agent" />

        <form onSubmit={handleSubmit}>
          {/* Access */}
          <div className="form-group mt-2">
            <h5>Access</h5>
          </div>
          <div className="row mt-4">
            <div className="form-group col-md-3">
              <label>Username</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
                className="form-control form-control-sm required"
                required
              />
            </div>
            {/* <div className="form-group col-md-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="form-control form-control-sm required"
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="form-control form-control-sm required"
                required
              />
            </div> */}
          </div>
          {/* Agent Information */}
          <div className="form-group mt-4">
            <h5>Agency Information</h5>
          </div>
          <div className="row mt-4">
          <div className="form-group col-md-3">
              <label>Agency Name</label>
              <input
                type="text"
                name="agencyName"
                value={formData.agencyName}
                onChange={(e) =>
                  setFormData({ ...formData, agencyName: e.target.value })
                }
                className="form-control form-control-sm required"
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label>Agent Name</label>
              <input
                type="text"
                name="agentName"
                value={formData.agentName}
                onChange={(e) =>
                  setFormData({ ...formData, agentName: e.target.value })
                }
                className="form-control form-control-sm required"
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label>Agent Email</label>
              <input
                type="email"
                name="agentEmail"
                value={formData.agentEmail}
                onChange={(e) =>
                  setFormData({ ...formData, agentEmail: e.target.value })
                }
                className="form-control form-control-sm required"
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label>Company Registration #</label>
              <input
                type="text"
                name="companyregno"
                value={formData.companyregno}
                onChange={(e) =>
                  setFormData({ ...formData, companyregno: e.target.value })
                }
                className="form-control form-control-sm "
                
              />
            </div>
            <div className="form-group col-md-3">
              <label>Agency Email</label>
              <input
                type="email"
                name="agencyEmail"
                value={formData.agencyEmail}
                onChange={(e) =>
                  setFormData({ ...formData, agencyEmail: e.target.value })
                }
                className="form-control form-control-sm required"
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label>Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
                className="form-control form-control-sm "
                
              />
            </div>
            <div className="form-group col-md-3">
              <label>Nature of Business</label>
              <MultiSelect
                options={natureOfBusinessOptions}
                isSearchable
                placeholder="- Select Nature Of Business -"
                noOptionsMessage={() => "No Nature Of Business Found"}
                className="custom-select "
                value={formData.natureofbusiness}
                onChange={(selectedOptions) =>
                  setFormData({ ...formData, natureofbusiness: selectedOptions })
                }
              />
            </div>
            <div className="form-group col-md-3">
              <label>Tag Line</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={(e) =>
                  setFormData({ ...formData, tagline: e.target.value })
                }
                className="form-control form-control-sm "
                
              />
            </div>

            <div className="form-group col-md-12">
              <label>Address</label>
              <textarea 
                    className="required"
                    name="address"
                    id="address"
                    value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                    defaultValue={""} style={{
  width: '100%',
  height: '10em',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
  boxSizing: 'border-box',
  outline: 'none',
  transition: 'border-color 0.2s',
}} 
required
/>
             
            </div>
            <div className="form-group col-md-3">
              <label>Country</label>
              <MultiSelect
                options={countryOptions}
                isSearchable
                value={selectedCountry}
                placeholder="- Select Country -"
                noOptionsMessage={() => "No Country Found"}
                className="custom-select required"
                onChange={handleCountryChange}
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label>City</label>
              <MultiSelect
                isSearchable
                placeholder="- Please select a city -"
                className="custom-select required"
                options={cityOptions}
                value={iscityChanged===false?selectedCountry?filterOptionsByLabel(cityOptions,data.city):'':selectedCountry?filterOptionsByLabel(cityOptions,selectedCity):''}
                onChange={handleCityChange}
                isDisabled={!selectedCountry}
                noOptionsMessage={() => "No City Found"}
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label>Pincode/ Zipcode</label>
              <input
                type="text"
                name="pinorzip"
                value={formData.pinorzip}
                onChange={(e) =>
                  setFormData({ ...formData, pinorzip: e.target.value })
                }
                className="form-control form-control-sm "
                
              />
            </div>
            <div className="form-group col-md-3">
              <label>Agent Logo</label>
              <span className="uniqFile input-group">
                <span className="input-group-addon fa fa-upload myInputFile">
                  <input
                    type="file"
                    name="agentLogo"
                    accept="image/*"
                    //  onChange={(e) => setFormData({ ...formData, agentLogo: e.target.value })}
                    onChange={handleFileInput}
                    size={40}
                    data-toggle="tooltip"
                    data-placement="top"
                    data-original-title="150 pixels x 150 pixels"
                  />
                </span>
              </span>
            </div>
            <div className="form-group col-md-3">
                                <label>IATA Status</label>
                                <div>
                                    <div className="radioline1 mt-2">
                                        <div className="radio radio-success" style={{ position: 'relative', display: 'inline-block' }}>
                                            <input type="radio" id="singleRadio1" name="rdReceiver" value={true} onChange={handleRadioChange} checked={formData.iatastatus === true} />
                                            <label htmlFor="singleRadio1">Approved</label>
                                        </div>&nbsp;&nbsp;
                                        <div className="radio radio-success" style={{ position: 'relative', display: 'inline-block' }}>
                                            <input type="radio" id="singleRadio2" name="rdReceiver" value={false} onChange={handleRadioChange}
                                                checked={formData.iatastatus === false} />
                                            <label htmlFor="singleRadio2">Not Approved</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-2" id="CalImg" style={{ display: showIataTextField ? 'block' : 'none' }}>
                                <label>Iata No #</label>

                                    
                                <input
                type="text"
                name="iatano"
                value={formData.iatano}
                onChange={(e) =>
                  setFormData({ ...formData, iatano: e.target.value })
                }
                className={`form-control form-control-sm ${
                  showIataTextField ? 'required' : ''
                }`}
                required={showIataTextField}
              />
                                  
                               
                            </div>
                            <div className="form-group col-md-3">
              <label>Phone #</label>
              <input
                className="form-control form-control-sm required"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                size={15}
                maxLength={15}
                required
              />

            </div>
            <div className="form-group col-md-3">
              <label>Mobile # </label>
              <input
                className="form-control form-control-sm required"
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                size={15}
                maxLength={15}
                required
              />

            </div>
            <div className="form-group col-md-3">
              <label>Fax # </label>
              <input
                className="form-control form-control-sm "
                type="text"
                name="fax"
                value={formData.fax}
                onChange={(e) =>
                  setFormData({ ...formData, fax: e.target.value })
                }
          
                
              />

            </div>
            <div className="form-group col-md-3">
              <label>Website </label>
              <input
                className="form-control form-control-sm "
                type="text"
                name="website"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
             
                
              />

            </div>
          </div>
          {/* Contact Information */}
          
      
          <div className="row form-group mt-3">
            <h5>Agency Contact Information</h5>
          </div>
        
          <div className="row form-group mt-2">
            <h6>Accountant</h6>
          </div>
          <div className="row">
          <div className="form-group col-md-3">
              <label>Name </label>
              <input
                className="form-control form-control-sm required"
                type="text"
                name="accountantname"
                value={formData.accountantname}
                onChange={(e) =>
                  setFormData({ ...formData, accountantname: e.target.value })
                }
              
                required
              />

            </div>
            <div className="form-group col-md-3">
              <label>Email </label>
              <input
                className="form-control form-control-sm required"
                type="text"
                name="accountantemail"
                value={formData.accountantemail}
                onChange={(e) =>
                  setFormData({ ...formData, accountantemail: e.target.value })
                }
              
                required
              />

            </div>
            <div className="form-group col-md-3">
              <label>Phone </label>
              <input
                className="form-control form-control-sm "
                type="text"
                name="accountantphone"
                value={formData.accountantphone}
                onChange={(e) =>
                  setFormData({ ...formData, accountantphone: e.target.value })
                }
                size={15}
                maxLength={15}
                
              />

            </div>
            </div>
            <div className="row form-group mt-2">
            <h6>Management</h6>
          </div>
          <div className="row">
          <div className="form-group col-md-3">
              <label>Name </label>
              <input
                className="form-control form-control-sm "
                type="text"
                name="managementname"
                value={formData.managementname}
                onChange={(e) =>
                  setFormData({ ...formData, managementname: e.target.value })
                }
               
                
              />

            </div>
            <div className="form-group col-md-3">
              <label>Email </label>
              <input
                className="form-control form-control-sm "
                type="text"
                name="managementemail"
                value={formData.managementemail}
                onChange={(e) =>
                  setFormData({ ...formData, managementemail: e.target.value })
                }
            
                
              />

            </div>
            <div className="form-group col-md-3">
              <label>Phone </label>
              <input
                className="form-control form-control-sm "
                type="text"
                name="managementphone"
                value={formData.managementphone}
                onChange={(e) =>
                  setFormData({ ...formData, managementphone: e.target.value })
                }
                size={15}
                maxLength={15}
                
              />

            </div>
            </div>  


             <div className="row form-group mt-2">
            <h6>Reservation</h6>
          </div>
          <div className="row">
          <div className="form-group col-md-3">
              <label>Name </label>
              <input
                className="form-control form-control-sm "
                type="text"
                name="reservationname"
                value={formData.reservationname}
                onChange={(e) =>
                  setFormData({ ...formData, reservationname: e.target.value })
                }
             
              />

            </div>
            <div className="form-group col-md-3">
              <label>Email </label>
              <input
                className="form-control form-control-sm "
                type="text"
                name="reservationemail"
                value={formData.reservationemail}
                onChange={(e) =>
                  setFormData({ ...formData, reservationemail: e.target.value })
                }
          
                
              />

            </div>
            <div className="form-group col-md-3">
              <label>Phone </label>
              <input
                className="form-control form-control-sm "
                type="text"
                name="reservationphone"
                value={formData.reservationphone}
                onChange={(e) =>
                  setFormData({ ...formData, reservationphone: e.target.value })
                }
                size={15}
                maxLength={15}
                
              />

            </div>
            <div className="form-group col-md-12">
              <label>Remarks</label>
              <textarea 
                    
                    name="remarks"
                    id="remarks"
                    value={formData.remarks}
                onChange={(e) =>
                  setFormData({ ...formData, remarks: e.target.value })
                }
                    defaultValue={""} style={{
  width: '100%',
  height: '10em',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
  boxSizing: 'border-box',
  outline: 'none',
  transition: 'border-color 0.2s',
}} 

/>
             
            </div>
            </div>   
          <br />
          {/* 12th Row */}
          <div className="row form-group mt-3">
            <h5>Agent Setting</h5>
          </div>
          
          {/* 13th Row */}
          <div className="row">
            <div className="form-group col-md-3">
              <label>Currency</label>
              <MultiSelect
                options={currencyOptions}
                isSearchable
                placeholder="- Select Currency -"
                value={formData.currency}
                noOptionsMessage={() => "No Currency Found"}
                className="custom-select required"
                onChange={(selectedOptions) =>
                  setFormData({ ...formData, currency: selectedOptions })
                }
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label>Time Zone</label>
              <MultiSelect
                options={timezoneOptions}
                isSearchable
                placeholder="--Select--"
                noOptionsMessage={() => "No Time Zone Found"}
                className="custom-select required"
                value={formData.timeZone}
                onChange={(selectedOptions) =>
                  setFormData({ ...formData, timeZone: selectedOptions })
                }
                required
              />
            </div>
          </div>
          {/* 14th Row */}
          <div className="row mt-3">
            <div className="form-group col-md-3">
              <label>Branch</label>
              <MultiSelect
                options={branches}
                isSearchable
                value={formData.branch}
                placeholder="- Select Branch -"
                noOptionsMessage={() => "No Branch Found"}
                className="custom-select required"
                onChange={handleMultiSelectChange}
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label>Sales Manager</label>
              <MultiSelect
                options={staffsalesmanagerData}
                isSearchable
                placeholder="--Select--"
                value={formData.salesmanager}
                noOptionsMessage={() => "No Sales Manager Found"}
                className="custom-select"
                onChange={(selectedOptions) =>
                  setFormData({
                    ...formData,
                    salesmanager: selectedOptions,
                  })
                }
              />
            </div>
            <div className="form-group col-md-3">
              <label>Consultant</label>
              <MultiSelect
                options={staffconsultantData}
                isSearchable
                placeholder="--Select--"
                value={formData.consultant}
                noOptionsMessage={() => "No Consultant Found"}
                className="custom-select required"
                onChange={(selectedOptions) =>
                  setFormData({
                    ...formData,
                    consultant: selectedOptions,
                  })
                }
                required
              />
            </div>
          </div>
          <br />
          <br />
          {/* 15th Row */}
          <div className="row">
            <div className="form-group">
              <h5>Rights</h5>
              <div className="form-group col-md-12" id="tickschecks">
              {rightsData.map((right) => (
      <div
        key={right.uuid}
        className="checkbox checkbox-success checkbox-inline"
        id={`tickspc-${right.uuid}`}
      >
        <input
          id={`chk_${right.uuid}`}
          type="checkbox"
          name={`chk_${right.uuid}`}
          value={1}
          checked={isRightSelected(right.uuid)}
          onChange={() => handleCheckboxChange(right.uuid)}
        />
        <label htmlFor={`chk_${right.uuid}`}>
          {right.rightName}
        </label>
      </div>
    ))}
              </div>
            </div>
            <br />
          </div>
          <div className="form-group col-md-2 mt-3 mb-4">
            <button className="btn btn-dark btn-sm">
              <i className="fa-solid fa-floppy-disk" /> Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};


const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(CustomersAgentEdit);