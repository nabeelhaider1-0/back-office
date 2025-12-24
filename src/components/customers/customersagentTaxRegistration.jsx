/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { ErrorApiAlert, filterOptionsByLabel, formatDate, RequiredFieldAlert, SuccessApiToast } from "../../constants/globalfunctions";
import { putDATA } from "../../Apis/API";
import Constants from "../../constants/routes";
import excelfilereader from "../../constants/excelfilereader";
import { useNavigate } from "react-router-dom";
import excelFileContent from '../../ExcelFiles/worldcities.xlsx';
import { connect } from "react-redux";
import ApiRoutes from "../../constants/ApiRoutes"

const CustomersAgentTaxRegistration = ({ data }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [registered, setRegistered] = useState('0');
  const [countryOptions, setcountryOptions] = useState([]);
  const [countrycitydata, setcountrycitydata] = useState([]);
  const [selectedCountry, setselectedCountry] = useState(null);
  const [cityOptions, setcityOptions] = useState([]);
  const [selectedCity, setselectedCity] = useState(null);
  const [iscityChanged, setiscityChanged] = useState(false);
  const navigateOnRefresh = useNavigate();
  useEffect(() => {
      if (selectedCountry) {
          const cities = countrycitydata.CountryCities
              .filter((item) => item.iso3 === selectedCountry.value)
              .map((item) => ({ value: item.city, label: item.city }));
          setcityOptions(cities);

          if (data.taxRegistrationData) {
              const cityValue = filterOptionsByLabel(cities, data.taxRegistrationData.city);
              setselectedCity(cityValue);
          }
      } else {
          setcityOptions([]);
      }
  }, [selectedCountry, countrycitydata]);
  useEffect(() => {
      if (data && Object.keys(data).length > 0) {
       
         // Set the initial form data based on the received data
         const taxData = data.taxRegistrationData || {};
         setFormData({
             registration_no: taxData.registration_no || '',
             country: taxData.country ?  taxData.country  : null,
             city: taxData.city ?  taxData.city  : null,
           
             acc_remark: taxData.acc_remark || '',
             registration_date: taxData.registration_date || ''
         });

         setRegistered(data.taxRegistration === 'yes' ? '1' : '0');
      } else {
        // If data is not available, navigate to the branch search page
        navigateOnRefresh(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
      }
    }, [data, navigateOnRefresh]);
 
  const [formData, setFormData] = useState({

      registration_no: '',
      country: null,
      city: null,
    
      acc_remark: '',
      registration_date:''
  });

  const fromDateRef = useRef(null);
  

  const handleTrashClick = () => {
      setStartDate(null);
  };

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
  }, []);

  useEffect(() => {
      if (fromDateRef.current) {
          fromDateRef.current.flatpickr({
              dateFormat: "Y-m-d",
              minDate: "today",
          });
      }
  }, []);




  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
     
      setRegistered(e.target.value );
  };



  const checkRequired = (taxdatadata) => {
    
      if (taxdatadata.registration_date === "" ||taxdatadata.registration_date === "01/01/1970" || taxdatadata.registration_date === undefined) {
          RequiredFieldAlert(
              "Date is required",
              "Please fill in the required fields",
              "error"
            );
        return false;
      }

     
      
     
   
      return true;
    };
    const handleCountryChange = (selectedOption) => {
      setselectedCountry(selectedOption);
      setselectedCity(null);
    };
  
    const handleCityChange = (selectedOption) => {
      setiscityChanged(true);
      setselectedCity(selectedOption); 
    };
    const handleCitySelection = () => {
      if (!selectedCountry) {
        // If no country is selected, display a warning
        RequiredFieldAlert("Please select country first", "", "warning");
      }
    };
  
    useEffect(() => {
      // Check if pickupcountryOptions has some length
      if (countryOptions && countryOptions.length > 0) {
        // Check if pickupselectedCountry is not set and pickupcountryValue has some value
        if (!selectedCountry) {
          // Ensure data.pickupCountry is defined before calling filterOptionsByLabel
          if (data.taxRegistrationData) {
              if (data.taxRegistrationData.city === undefined) {


              }else{
            const countryValue = filterOptionsByLabel(countryOptions, data.taxRegistrationData.country);
            setselectedCountry(countryValue);
  
                const cityValue = filterOptionsByLabel(cityOptions, data.taxRegistrationData.city);
                setselectedCity(cityValue);
              
              
              }
          }
        }
      }
    }, [countryOptions, selectedCountry, data.taxRegistrationData]);
  const handleSubmit = async(e) => {
      e.preventDefault();
      const registration_date = new Date(startDate);
      formData.registration_date=formatDate(registration_date);
      formData.country=(selectedCountry && selectedCountry.label) || '';
      formData.city=iscityChanged?(selectedCity && selectedCity.label) || '':formData.city;

     const requesbody={
          taxRegistration: registered==='0'?'no':'yes',
          taxRegistrationData: formData
      };
      const isSuccessfull = checkRequired(formData);
      if (isSuccessfull) {
       try {
      

           const response = await putDATA(ApiRoutes.CUSTOMER_AGENTS.AGENT, data.uuid, requesbody);
           if (response.data.statusCode === 200) {
          
             SuccessApiToast( "Tax Registration Updated Successfully");
             
             navigateOnRefresh(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
           }
         } catch (error) {
           ErrorApiAlert('Error Updating Tax Registration');
         
         }
   
      }
  };

  return (
      <div>
          <Header2 title="ADD REGISTRATION NUMBER" />
          <div className="container-fluid pt-0 p-4" id="content-pad">
              <form onSubmit={handleSubmit}>
                  <div className="panel-body">
                      <div className="row">
                          <div className="form-group col-md-3">
                              <label>Registered :</label>
                              <div>
                                  <div className="radio radio-success radio-inline">
                                      <input type="radio" id="register_yes" name="registered" value="1" className="test123" onChange={handleRadioChange} checked={registered === '1'} />
                                      <label htmlFor="register_yes">Yes</label>
                                  </div>
                                  <div className="radio radio-success radio-inline">
                                      <input type="radio" id="register_no" name="registered" value="0" 
                                  
                                      onChange={handleRadioChange} checked={registered === '0'} />
                                      <label htmlFor="register_no">No</label>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="row mt-3">
                          <div className="form-group col-md-3">
                              <label htmlFor="registration_no">Registration No. :</label>
                              <input className="form-control form-control-sm" type="text" name="registration_no" id="registration_no" value={formData.registration_no} onChange={handleInputChange} />
                          </div>
                          <div className="form-group col-md-3">
                              <label>Country</label>
                           
                              <MultiSelect
                 id="country"
                 name="country"
                 placeholder="Select Country"
                 options={countryOptions}
                 value={selectedCountry}
                 onChange={handleCountryChange}
                noOptionsMessage={() => "No Country Found"}
required
              />
                          </div>
                          <div className="form-group col-md-3" onClick={handleCitySelection}>
                              <label>City</label>
                           
                              <MultiSelect
          id="city"
          name="city"
          placeholder="Select City"
          options={cityOptions}
          value={selectedCity}
          onChange={handleCityChange}
                noOptionsMessage={() => "No City Found"}
required
              />
                              
                          </div>
                          <div className="form-group col-md-3 mt-2">
                              <label>Registration Date:</label>
                              <div className="row">
                                  <div className="col-md-12 col-sm-12 col-xs-12">
                                      <div className="input-group date col-md-12 col-sm-12 col-xs-12 departure_date required" id="departure_date">
                                          <Flatpickr
                                              value={startDate}
                                              onChange={(date) => setStartDate(date)}
                                              options={{ dateFormat: "Y-m-d" }}
                                              style={{width:'120px'}}
                                          />
                                          <span className="input-group-addon pointer" id="dTrashBtn" onClick={handleTrashClick}>
                                              <i className="fa fa-trash" aria-hidden="true"></i>
                                          </span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      
                      <div className="row mt-3">
                          <div className="form-group col-md-3">
                              <label>Remark (If Any) :</label>
                              <textarea name="acc_remark" className="form-control form-control-sm" rows="5" value={formData.acc_remark} onChange={handleInputChange}></textarea>
                          </div>
                      </div>
                      <div className="row mt-3">
                          <div className="form-group col-md-12">
                              <input type="hidden" name="action" value="insert_tax_registration" />
                              <button type="submit" class="btn btn-dark btn-sm" value="Submit" id="submit_button"
                              >
                                  <i class="fa fa-floppy-o"></i>&nbsp;Save
                              </button>&nbsp;&nbsp;
                          </div>
                      </div>
                  </div>
              </form>

     
          </div>
      </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(CustomersAgentTaxRegistration);