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

import Constants from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { ErrorApiAlert, filterOptionsByLabel, filterOptionsByValue, SuccessApiToast } from "../../constants/globalfunctions";
import { connect } from "react-redux";
import ApiRoutes from "../../constants/ApiRoutes"

const CustomersAgentSubUserEdit = ({data}) => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [countryOptions, setCountryOptions] = useState([]);
  const [countrycitydata, setCountryCityData] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigateOnRefresh = useNavigate();
  const [iscityChanged, setiscityChanged] = useState(false);
  const checkAndConvert = (value) => {
    return value !== null && value !== undefined ? value : "";
  };
  const [selectedRights, setSelectedRights] = useState(new Set());
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
    natureofbusiness: "",
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
   updatepassword:false
  });const [rightsData, setRightsData] = useState([{

    
  }]);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
    
     
     setFormData({
        userName:checkAndConvert(data.userName),
        
        companyname:checkAndConvert(data.companyname),
        companynameinotherlanguage:checkAndConvert(data.companynameinotherlanguage),
        country: checkAndConvert(data.country),
        city: checkAndConvert(data.city),
        companyregno:checkAndConvert(data.companyregno),
        firstName:checkAndConvert(data.firstName),
        middleName:checkAndConvert(data.middleName),
        lastName:checkAndConvert(data.lastName),
        markup:checkAndConvert(filterOptionsByValue(markupOptions, parseFloat(data.markup))[0]),
        designation:checkAndConvert(data.designation),
        natureofbusiness:checkAndConvert(filterOptionsByValue(natureOfBusinessOptions, data.natureofbusiness)),//additional change field
        address:checkAndConvert(data.address),//additional change field
        addressinotherlanguage:checkAndConvert(data.addressinotherlanguage),
        postalcode:checkAndConvert(data.postalcode),
        email:checkAndConvert(data.email),
        phone: checkAndConvert(data.phone),
        mobile:checkAndConvert(data.mobile),
        fax:checkAndConvert(data.fax),
        website:checkAndConvert(data.fax),
        status:checkAndConvert(data.status),
       agentLogo: checkAndConvert(data.agentLogo),
       timeZone: checkAndConvert(filterOptionsByLabel(timezoneOptions, data.timeZone)),
     
      });
      getRights(data);
   
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

  

  const getRights = async (data) => {
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

                              const initialSelectedRights = new Set(
                                data.rights ? data.rights.map(userRight => userRight) : []
                              );
                              setSelectedRights(initialSelectedRights);  
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
    setiscityChanged(true);
    setSelectedCity(selectedOption);
    setBranchData((prevData) => ({
      ...prevData,
      branchCity: selectedOption.label,
    }));
  };

 
   // State to track the visibility of the reminder div
   

   const handleRadioChange = (e) => {
       const status = e.target.value === "true"; // Convert 'Y' to true, 'N' to false
      
       setFormData(prevState => ({
           ...prevState,
           status: status
       }));
   };


  const navigate = useNavigate();



 

 
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
   formData.country= branchData.branchCountry || data.country || '';
   formData.city= branchData.branchCity || data.city || '';
formData.natureofbusiness=formData.natureofbusiness && formData.natureofbusiness.value ? formData.natureofbusiness.value : data.natureofbusiness;
formData.timeZone= formData.timeZone && formData.timeZone.label ? formData.timeZone.label : '';
formData.markup = formData.markup && formData.markup.value ? formData.markup.value : (formData.markup[0] && formData.markup[0].value ? formData.markup[0].value : '');

    
      try {
        
        const response = await putDATA(ApiRoutes.CUSTOMER_AGENTS.UPDATE_SUB_AGENT,data.uuid ,formData);
        
        if (response.data.statusCode === 200) {
       
          SuccessApiToast( "Sub Agent Updated Successfully");
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
                value={formData.markup}
                onChange={(selectedOptions) =>
                  setFormData({ ...formData, markup: selectedOptions })
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
                value={formData.natureofbusiness}
                onChange={(selectedOptions) =>
                  setFormData({ ...formData, natureofbusiness: selectedOptions })
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
                value={formData.timeZone}
                onChange={(selectedOptions) =>
                  setFormData({ ...formData, timeZone: selectedOptions })
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
  
  export default connect(mapStateToProps)(CustomersAgentSubUserEdit);
 