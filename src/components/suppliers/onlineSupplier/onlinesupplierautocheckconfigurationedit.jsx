import React from 'react';
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import Header2 from "../../header2/header2";
import excelFileContent from '../../../ExcelFiles/worldcities.xlsx';
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";

import { getDATA, putDATA } from "../../../Apis/API";
import { ErrorApiAlert, filterOptionsByLabel, filterOptionsByValue, RequiredFieldAlert, SimpleAlert, SuccessApiToast } from "../../../constants/globalfunctions";
import excelfilereader from "../../../constants/excelfilereader";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import ApiRoutes from '../../../constants/ApiRoutes';



const serviceTypeOptions = [

  { value: 'Hotel', label: 'Hotel' },
  { value: 'Tour', label: 'Tour' },
  { value: 'Transfer', label: 'Transfer' },
  { value: 'Packages', label: 'Packages' }
];

const AdultsOptions = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
];
 function Onlinesupplierautocheckconfigurationedit({data}) {
    const [currencyOptions, setcurrencyOptions] = useState([]);
    const [SupplierOptions, setSupplierOptions] = useState([]);
    const [countryOptions, setcountryOptions] = useState([]);
    const [nationalityOptions, setnationalityOptions] = useState([]);
    const [residenceOptions, setresidenceOptions] = useState([]);
    const [countrycitydata, setcountrycitydata] = useState([]);
    const [selectedCountry, setselectedCountry] = useState(null);
    const [cityOptions, setcityOptions] = useState([]);
    const [selectedCity, setselectedCity] = useState(null);
    const [selectedServiceType, setSelectedServiceType] = useState(null);
    const [selectedNationality, setSelectedNationality] = useState(null);
    const [selectedResidence, setSelectedResidence] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const [selectedAdults, setSelectedAdults] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [selectedStarRatings, setSelectedStarRatings] = useState([]);
    const [iscityChanged, setiscityChanged] = useState(false);
    const [agent, setAgent] = useState('');
    
    const redirect = async () => {
        navigate(Constants.URLConstants.SUPPLIERSONLINESUPPLIERSAUTOCHECKCONFIGURATIONBUTTON);
      };
      
      // Perform checks and redirect in useEffect
      useEffect(() => {
        if (!data) {
          redirect();
        }
      }, [data]);
    const fetchExcelData = async () => {
      try {
        const data = await excelfilereader(excelFileContent);
        setcountrycitydata(data);
  
        const uniqueCountries = Array.from(new Set(data.CountryCities.map((item) => item.country)))
          .map((country) => ({
            value: data.CountryCities.find((item) => item.country === country).iso3,
            label: country,
          }));
        setcountryOptions(uniqueCountries);
        setnationalityOptions(uniqueCountries);
        setresidenceOptions(uniqueCountries);
      } catch (error) {
        ErrorApiAlert('Error Fetching Excel Data');
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
              setselectedCountry(countryValue);
      
                  const cityValue = filterOptionsByLabel(cityOptions, data.city);
                  setselectedCity(cityValue);
            }
          }
        }
      }, [countryOptions, selectedCountry, data.country]);

      useEffect(() => {
        // Check if pickupcountryOptions has some length
        if (nationalityOptions && nationalityOptions.length > 0) {
          // Check if pickupselectedCountry is not set and pickupcountryValue has some value
          if (!selectedNationality) {
            // Ensure data.pickupCountry is defined before calling filterOptionsByLabel
            if (data.nationality) {
              const countryValue = filterOptionsByLabel(nationalityOptions, data.nationality);
              setSelectedNationality(countryValue);
      
                  
            }
          }
        }
      }, [nationalityOptions, selectedNationality, data.nationality]);
  
      useEffect(() => {
        // Check if pickupcountryOptions has some length
        if (residenceOptions && residenceOptions.length > 0) {
          // Check if pickupselectedCountry is not set and pickupcountryValue has some value
          if (!selectedResidence) {
            // Ensure data.pickupCountry is defined before calling filterOptionsByLabel
            if (data.residenceCountry) {
              const countryValue = filterOptionsByLabel(residenceOptions, data.residenceCountry);
              setSelectedResidence(countryValue);
      
                  
            }
          }
        }
      }, [residenceOptions, selectedResidence, data.residenceCountry]);

    const getCurrencies = async () => {
      try {
        const response = await getDATA(ApiRoutes.CURRENCIES.CURRENCY);
        if (response.data.statusCode === 200) {
          const currencies = response && response.data.data ? response.data.data : [];
          const options = currencies.map((curr) => ({
            value: curr.currencyCode,
            label: curr.currency,
          }));
          setcurrencyOptions(options);

      
          if ( data.currency && options.length > 0) {
            const selectedOption = filterOptionsByLabel(options, data.currency);
            setSelectedCurrency(selectedOption);
          }
        }
      } catch (error) {
        ErrorApiAlert('Error Fetching Currencies');
      }
    };
  
    const getOnlineSuppliers = async () => {
      try {
        const response = await getDATA(ApiRoutes.SUPPLIERS.ONLINE.SUPPLIER);
        if (response.data.statusCode === 200) {
          const supplier = response && response.data.data ? response.data.data : [];
          const options = supplier.map((sup) => ({
            value: sup.uuid,
            label: sup.supplierName,
          }));
          setSupplierOptions(options);
          if (data.onlineSupplier && options.length > 0) {

            const selectedOption = filterOptionsByValue(options, data.onlineSupplier.uuid);
            setSelectedSupplier(selectedOption);
          }
        
        }
      } catch (error) {
        ErrorApiAlert('Error Fetching Suppliers');
      }
    };
  
    useEffect(() => {
      fetchExcelData();
      getCurrencies();
      getOnlineSuppliers();
    }, []);
  
    useEffect(() => {
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
        setiscityChanged(true);
      setselectedCity(selectedOption);
    };
  
    const handleServiceTypeChange = (selectedOption) => {
      setSelectedServiceType(selectedOption);
    };
  
    const handleNationalityChange = (selectedOption) => {
      setSelectedNationality(selectedOption);
    };
  
    const handleResidenceChange = (selectedOption) => {
      setSelectedResidence(selectedOption);
    };
  
    const handleCurrencyChange = (selectedOption) => {
      setSelectedCurrency(selectedOption);
    };
  
    const handleAdultsChange = (selectedOption) => {
      setSelectedAdults(selectedOption);
    };
  
    const handleSupplierChange = (selectedOption) => {
      setSelectedSupplier(selectedOption);
    };
  
    const handleStarRatingChange = (event) => {
      const value = parseFloat(event.target.value);
      setSelectedStarRatings((prev) =>
        event.target.checked ? [...prev, value] : prev.filter((rating) => rating !== value)
      );
    };
  
    const handleCitySelection = () => {
      if (!selectedCountry) {
        RequiredFieldAlert("Please select country first", "", "warning");
      }
    };

    
  
    const navigate = useNavigate();
    useEffect(() => {
         
       
        if (data && Object.keys(data).length > 0) {
       
        setAgent(data.agent);
        setSelectedServiceType(filterOptionsByValue(serviceTypeOptions,data.serviceType));
    setSelectedAdults(filterOptionsByValue(AdultsOptions,data.adults));
    setSelectedStarRatings(data.rating);
   
         }
      
         else {
          // If data is not available, navigate to the branch search page
          navigate(Constants.URLConstants.SUPPLIERSONLINESUPPLIERSAUTOCHECKCONFIGURATIONBUTTON);
        }
      }, [data, navigate]);
      
    const handleSubmit = async(event) => {
      event.preventDefault();
      const formData = {
        country:(selectedCountry && selectedCountry.label)||data.country,
        city: iscityChanged?(selectedCity && selectedCity.label) || '':data.city,
        serviceType: (selectedServiceType && selectedServiceType.value)||data.serviceType,
        nationality: (selectedNationality && selectedNationality.label)||data.nationality,
        residenceCountry:(selectedResidence && selectedResidence.label)||data.residenceCountry,
        currency: (selectedCurrency && selectedCurrency.label)||data.currency,
        adults:  (selectedAdults && selectedAdults.value)||data.adults,
        onlineSupplier: (selectedSupplier &&  selectedSupplier.value)||data.onlineSupplier.uuid,
        rating: selectedStarRatings ?? data.rating,
        agent:(agent && agent  ),
      };
;
     try {
        // Make an API call to update the staff's active status
        
        const response = await putDATA(ApiRoutes.SUPPLIERS.ONLINE.SEARCH_REPORT_CONFIG,data.uuid ,formData);
      
        // Check the response and handle it accordingly
        if (response.data.statusCode === 200) {
        
            SuccessApiToast( "Online Supplier Search Report Detail Updated Successfully");
            navigate(Constants.URLConstants.SUPPLIERSONLINESUPPLIERSAUTOCHECKCONFIGURATIONBUTTON);
      
        } else {
                
          SimpleAlert("error",
           "Error",
        "Failed to Update Online Supplier Search Report Detail");
        }
      } catch (error) {
        // Handle errors from the API call
      
        SimpleAlert(  "error",
         "Error",
       "An unexpected error occurred.");
      }
 
    };
  
    return (
      <>
        <Header2 title="ONLINE SUPPLIER SEARCH REPORT DETAILS" linkText1="Search Supplier Report" linkText2="Add Search Supplier Report" link1={Constants.URLConstants.SUPPLIERSONLINESUPPLIERSAUTOCHECKCONFIGURATIONBUTTON} />
        <div className="container-fluid pt-0 p-4" id="content-pad">
          <form onSubmit={handleSubmit}>
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-3 ">
                  <label>Country</label>
                  <MultiSelect
                    options={countryOptions}
                    isSearchable
                    placeholder="- Select Country -"
                    value={selectedCountry}
                    className="custom-select required"
                    onChange={handleCountryChange}
                    noOptionsMessage={() => "No Country Found"}
                    required
                  />
                </div>
                <div className="form-group col-md-3" onClick={handleCitySelection}>
                  <label>City</label>
                  <MultiSelect
                    options={cityOptions}
                    value={iscityChanged===false?selectedCountry?filterOptionsByLabel(cityOptions,data.city):'':selectedCountry?filterOptionsByLabel(cityOptions,selectedCity):''}
                    isSearchable
                    placeholder="- Select City -"
                    className="custom-select required"
                    onChange={handleCityChange}
                    isDisabled={!selectedCountry}
                    noOptionsMessage={() => "No City Found"}
                    required
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Agent</label>
                  <input
                    name="sel_agent_suggest"
                    id="sel_agent_suggest"
                    autoComplete="off"
                    type="text"
                    className="form-control form-control-sm ui-autocomplete-input"
                    value={agent}
                    onChange={(e) => setAgent(e.target.value)}
                  />
                  <input name="sel_agent" id="sel_agent" type="hidden" />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <div className="row">
                    <div className="form-group col-md-3">
                      <label>Service Type</label>
                      <MultiSelect
                        options={serviceTypeOptions}
                        value={selectedServiceType}
                        isSearchable
                        placeholder="- Select Service -"
                        className="custom-select required"
                        onChange={handleServiceTypeChange}
                        required
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label>Nationality</label>
                      <MultiSelect
                        options={nationalityOptions}
                        value={selectedNationality}
                        isSearchable
                        placeholder="- Select Nationality -"
                        className="custom-select required"
  onChange={handleNationalityChange}
  required                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label>Country Of Residence</label>
                      <MultiSelect
                        options={residenceOptions}
                        value={selectedResidence}
                        isSearchable
                        placeholder="- Select Residence -"
                        className="custom-select required"
                        onChange={handleResidenceChange}
                        required
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label>Supplier Currency</label>
                      <MultiSelect
                        options={currencyOptions}
                        isSearchable
                       value={selectedCurrency}
                        placeholder="- Select Currency -"
                        className="custom-select required"
                        onChange={handleCurrencyChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-md-3">
                      <label>Star Rating</label>
                      <br />
                      <div className="radioline1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <div className="checkbox checkbox-success checkbox-inline" key={rating}>
                            <input
                              type="checkbox"
                              value={rating}
                              name="star_rating[]"
                              id={`${rating} Star`}
                              onChange={handleStarRatingChange}
                              checked={selectedStarRatings.includes(rating)}
                            />
                            <label htmlFor={`${rating} Star`}>{rating}.0</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="form-group col-md-3">
                      <label>Adults</label>
                      <MultiSelect
                        options={AdultsOptions}
                        isSearchable
                        value={selectedAdults}
                        placeholder="- Select -"
                        className="custom-select"
                        onChange={handleAdultsChange}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label>Supplier</label>
                      <MultiSelect
                        options={SupplierOptions}
                        isSearchable
                        value={selectedSupplier}
                        placeholder="- Select Supplier -"
                        className="custom-select"
                        onChange={handleSupplierChange}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <br />
                      <button type="submit" className="btn btn-dark btn-sm" name="b1" value="SUBMIT">
                        <i className="fa fa-floppy-o" />&nbsp;Save
                      </button>
                    </div>
                  </div>
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
  
  export default connect(mapStateToProps)(Onlinesupplierautocheckconfigurationedit);