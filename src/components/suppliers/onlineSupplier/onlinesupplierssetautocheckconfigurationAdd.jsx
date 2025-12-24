/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import Header2 from "../../header2/header2";
import excelFileContent from '../../../ExcelFiles/worldcities.xlsx';
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";

import { getDATA, postDATA } from "../../../Apis/API";
import { ErrorApiAlert, RequiredFieldAlert, SuccessApiToast } from "../../../constants/globalfunctions";
import excelfilereader from "../../../constants/excelfilereader";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../../../constants/ApiRoutes";


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

const SuppliersSetAutoCheckConfigurationAdd = () => {
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
  const [agent, setAgent] = useState('');

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
      }
    } catch (error) {
      ErrorApiAlert('Error Fetching Suppliers');
    }
  };

  useEffect(() => {
    getCurrencies();
    fetchExcelData();
   
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
  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = {
      country:(selectedCountry && selectedCountry.label)||'',
      city: (selectedCity && selectedCity.label)||'',
      serviceType: (selectedServiceType && selectedServiceType.value)||'',
      nationality: (selectedNationality && selectedNationality.label)||'',
      residenceCountry:(selectedResidence && selectedResidence.label)||'',
      currency: (selectedCurrency && selectedCurrency.label)||'',
      adults:  (selectedAdults && selectedAdults.value)||'',
      onlineSupplier: (selectedSupplier &&  selectedSupplier.value)||null,
      rating: selectedStarRatings ?? [],
      agent:(agent && agent ),
    };
   

    try {
    
      
  
     const response = await postDATA(formData,ApiRoutes.SUPPLIERS.ONLINE.SEARCH_REPORT_CONFIG);
 
     if (response.data.statusCode === 200) {
      
       SuccessApiToast( "Search Report Detail Added Successfully");
       
       navigate(Constants.URLConstants.SUPPLIERSONLINESUPPLIERSAUTOCHECKCONFIGURATIONBUTTON);
     }
   } catch (error) {
     ErrorApiAlert('Error Adding Search Report Details');
     //  console.error(error)
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
export default SuppliersSetAutoCheckConfigurationAdd;
