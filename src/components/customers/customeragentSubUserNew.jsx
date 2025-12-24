/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";

import {  markupOptions, natureOfBusinessOptions, timezoneOptions } from "../../constants/contants";
import {

  
  putDATA,
} from "../../Apis/API";
import uploadFile from "../../constants/filesuploader";

import excelFileContent from "../../ExcelFiles/worldcities.xlsx";
import excelfilereader from "../../constants/excelfilereader";
import Swal from "sweetalert2";
import Constants from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { ErrorApiAlert, SuccessApiToast } from "../../constants/globalfunctions";
import { connect } from "react-redux";
import ApiRoutes from "../../constants/ApiRoutes"

const CustomersAgentSubUserNew = ({data}) => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [countryOptions, setCountryOptions] = useState([]);
  const [countrycitydata, setCountryCityData] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigateOnRefresh = useNavigate();

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
    
   
   
    }
     else {
      navigateOnRefresh(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
    }
  }, [data, navigateOnRefresh]);
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const [branchData, setBranchData] = useState({
    branchCountry: "",
    branchCity: "",
  });

  const [rightsData, setRightsData] = useState([{

    
  }]);

  const getRights = async () => {
    try {
     setRightsData([{
        uuid:"Block Agent E-mail",
        rightName:"Block Agent E-mail"
          },{
            uuid:"Can Book",
            rightName:"Can Book"
              },{
                uuid:"Allow Book Under Cancellation Policy?",
                rightName:"Allow Book Under Cancellation Policy?"
                  },{
                    uuid:"Can Voucher",
                    rightName:"Can Voucher"
                      },{
                        uuid:"Allow Flight Ticketing",
                        rightName:"Allow Flight Ticketing"
                          },{
                            uuid:"Display with Markup",
                            rightName:"Display with Markup"
                              }]);
    } catch (error) {}
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
    setSelectedCity(selectedOption);
    setBranchData((prevData) => ({
      ...prevData,
      branchCity: selectedOption.label,
    }));
  };

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    companyname:"",
    companynameinotherlanguage:"",
    country: "",
    city: "",
    companyregno:"",
    firstName:"",
    middleName:"",
    lastName:"",
    markup:"",
    designation:"",
    natureofbusiness:"",//additional change field
    address:"",//additional change field
    addressinotherlanguage:"",
    postalcode:"",
    email:"",
    phone: "",
    mobile:"",
    fax:"",
    website:"",
    status:true,
   agentLogo: "",
   timeZone: "",
 
  });
   // State to track the visibility of the reminder div
   

   const handleRadioChange = (e) => {
       const status = e.target.value === "true"; // Convert 'Y' to true, 'N' to false
      
       setFormData(prevState => ({
           ...prevState,
           status: status
       }));
   };


  const navigate = useNavigate();



 

  const checkRequired = (bdata) => {
  

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
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
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
   
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      formData.agentLogo = "";
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
   formData.rights=checkedRightsUuids;
   formData.country= branchData.branchCountry;
   formData.city= branchData.branchCity;

    const isSuccessfull = checkRequired(formData);
    delete formData.confirmPassword;
    if (isSuccessfull) {
      try {
        
        const response = await putDATA(ApiRoutes.CUSTOMER_AGENTS.SUB_AGENT,data.uuid ,formData);
     
        
        if (response.data.statusCode === 200) {
       
          SuccessApiToast( "Sub Agent Created Successfully");
          setFormData(  {userName: "",
            password: "",
            confirmPassword: "",
            companyname:"",
            companynameinotherlanguage:"",
            companyregno:"",
            firstName:"",
            middleName:"",
            lastName:"",
            country:"",
            city:"",
            markup:"",
            designation:"",
            natureofbusiness:"",//additional change field
            address:"",//additional change field
            addressinotherlanguage:"",
            postalcode:"",
            email:"",
            phone: "",
            mobile:"",
            fax:"",
            website:"",
            status:true,
           agentLogo: "",
           timeZone: "",});
          navigate(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
        }
      } catch (error) {
        ErrorApiAlert('Error Adding Sub Agent');
      }
    }
    
 
};

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="ADD USER DETAILS" linkText1=" Create New Sub Agent" />

        <form onSubmit={handleSubmit}>
          {/* Access */}
         
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
            <div className="form-group col-md-3">
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
            </div>
            <div className="form-group col-md-3">
              <label>Company Name</label>
              <input
                type="text"
                name="companyname"
                value={formData.companyname}
                onChange={(e) =>
                  setFormData({ ...formData, companyname: e.target.value })
                }
                className="form-control form-control-sm required"
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label>Company Name in Other Language</label>
              <input
                type="text"
                name="companynameinotherlanguage"
                value={formData.companynameinotherlanguage}
                onChange={(e) =>
                  setFormData({ ...formData, companynameinotherlanguage: e.target.value })
                }
                className="form-control form-control-sm required"
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label>Company Registration No </label>
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
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="form-control form-control-sm required"
                required
              />
            </div>


            <div className="form-group col-md-3">
              <label>Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={(e) =>
                  setFormData({ ...formData, middleName: e.target.value })
                }
                className="form-control form-control-sm "
                
              />
            </div>

            <div className="form-group col-md-3">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="form-control form-control-sm required"
                required
              />
            </div>


            <div className="form-group col-md-3">
              <label>Mark Up (%)</label>
              <MultiSelect
                options={markupOptions}
                isSearchable
                placeholder="- Select Markup -"
                noOptionsMessage={() => "No Markup Found"}
                className="custom-select "
                onChange={(selectedOptions) =>
                  setFormData({ ...formData, markup: selectedOptions.value })
                }
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
                onChange={(selectedOptions) =>
                  setFormData({ ...formData, natureofbusiness: selectedOptions.value })
                }
              />
            </div>
          </div>
          {/* Agent Information */}
         
           

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


            <div className="form-group col-md-12">
              <label>Address in Other Language</label>
              <textarea 
                   
                    name="addressinotherlanguage"
                    id="addressinotherlanguage"
                    value={formData.addressinotherlanguage}
                onChange={(e) =>
                  setFormData({ ...formData, addressinotherlanguage: e.target.value })
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
            <div className="row">
            <div className="form-group col-md-3">
              <label>Country</label>
              <MultiSelect
                options={countryOptions}
                isSearchable
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
                value={selectedCity}
                onChange={handleCityChange}
                isDisabled={!selectedCountry}
                noOptionsMessage={() => "No City Found"}
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label>Postal Code</label>
              <input
                type="text"
                name="postalcode"
                value={formData.postalcode}
                onChange={(e) =>
                  setFormData({ ...formData, postalcode: e.target.value })
                }
                className="form-control form-control-sm required"
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
                onChange={(selectedOptions) =>
                  setFormData({ ...formData, timeZone: selectedOptions.label })
                }
                required
              />
            </div>

            <div className="form-group col-md-3">
              <label>Telephone</label>
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
              <label>Mobile Number</label>
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
              <label>Fax </label>
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
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="form-control form-control-sm required"
                required
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
           
            <div className="form-group col-md-3">
              <label>Sub Agent Logo</label>
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
                                <label>Status</label>
                                <div>
                                    <div className="radioline1 mt-2">
                                        <div className="radio radio-success" style={{ position: 'relative', display: 'inline-block' }}>
                                            <input type="radio" id="singleRadio1" name="rdReceiver" value={true} onChange={handleRadioChange} checked={formData.status === true} />
                                            <label htmlFor="singleRadio1">Active</label>
                                        </div>&nbsp;&nbsp;
                                        <div className="radio radio-success" style={{ position: 'relative', display: 'inline-block' }}>
                                            <input type="radio" id="singleRadio2" name="rdReceiver" value={false} onChange={handleRadioChange}
                                                checked={formData.status === false} />
                                            <label htmlFor="singleRadio2">In Active</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>        
   
          <div className="row">
            <div className="form-group">
             
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
                      defaultValue={1}
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
              <i className="fa-solid fa-plus" /> Add Sub Agent
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
  
  export default connect(mapStateToProps)(CustomersAgentSubUserNew);
