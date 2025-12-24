
import { useEffect, useState } from "react";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";

import { ErrorApiAlert, RequiredFieldAlert, SuccessApiToast } from "../../../constants/globalfunctions";

import { getDATA, postDATA } from "../../../Apis/API";

import excelfilereader from "../../../constants/excelfilereader";
import excelFileContent from '../../../ExcelFiles/worldcities.xlsx';
import ApiRoutes from "../../../constants/ApiRoutes";

const MastersTourAndActivityMapping = () => {

  const [toursleft, setLeftTours] = useState([]);
  const [righttours, setRightTours] = useState([]);
  const [tours, setTours] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedRightOptions, setSelectedRightOptions] = useState([]);
  const [supplierOptions, setsupplierOptions] = useState([]);
  const [countrycitydata, setCountryCityData] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
 
  const [formData, setFormData] = useState({
    uuid:""
      });


  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    
    setSelectedCity(null); // Reset city selection when country changes
  };

  const handleCityChange = (selectedOption) => {
    filterToursByCity(selectedOption.value);
    setSelectedCity(selectedOption);
   
  };

  const getOfflineSuppliers = async () => {

    try {

      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.SUPPLIERS.OFFLINE.SUPPLIER);
      if (response.data.statusCode === 200) {
        const supplier =response && response.data.data ? response.data.data : [];
       
      
        const options = supplier.map((sup) => ({
          value: sup.uuid,
          label: sup.supplierName,
        }));
        setsupplierOptions(options);


        
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert('Error Fetching Suppliers');
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
    // Extract city options based on selected country
    if (selectedCountry) {
      const cities = countrycitydata.CountryCities.filter(
        (item) => item.iso3 === selectedCountry.value
      ).map((item) => ({ value: item.city, label: item.city }));
      setCityOptions(cities);
    } else {
      setCityOptions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);
  function filterToursByCity(cityName) {
    // Filter hotels by the provided city name
    const filteredTours = tours.filter(tour => tour.city.toLowerCase() === cityName.toLowerCase());
    
    // Map the filtered hotels to options
    const options = filteredTours.map(hotel => ({
        value: hotel.uuid,
        label: hotel.activityName,
    }));

    // Set the options to the desired state (e.g., setLeftHotels)
    setLeftTours(options);
}
  const getTours = async () => {
    try {
      const response = await getDATA(ApiRoutes.TOURS_AND_ACTIVITIES.TOURS);

      if (response.data.statusCode === 200) {
        const hotels =
          response && response.data.data ? response.data.data : [];
    
        setTours(hotels);
      }
    } catch (error) {}
  };
 
  useEffect(() => {
    getTours();
    fetchExcelData();
    getOfflineSuppliers();
   
  }, []);
  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => ({
        label: option.label,
        value: option.value,
      })
    );
    setSelectedOptions(selectedOptions);
  };
  const handleSelectRightChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => ({
        label: option.label,
        value: option.value,
      })
    );
    setSelectedRightOptions(selectedOptions);
  };

  const assignedSelectToRight = () => {
    setRightTours((prevRightAmenities) => {
      // Filter out selected options from amenities
      const updatedAmenities = toursleft.filter(
        (amenity) =>
          !selectedOptions.find((selected) => selected.value === amenity.value)
      );

      // Filter out duplicate options from selectedOptions
      const uniqueSelectedOptions = selectedOptions.filter(
        (option, index, self) =>
          index === self.findIndex((o) => o.value === option.value)
      );

      // Combine existing rightAmenities with uniqueSelectedOptions
      const combinedAmenities = [
        ...prevRightAmenities,
        ...uniqueSelectedOptions,
      ];

      // Filter out duplicates from combinedAmenities
      const uniqueRightAmenities = combinedAmenities.filter(
        (option, index, self) =>
          index === self.findIndex((o) => o.value === option.value)
      );

      // Update amenities and rightAmenities
      setLeftTours(updatedAmenities);
      return uniqueRightAmenities;
    });
  };
  const assignedSelectToLeft = () => {
    setLeftTours((prevAmenities) => {
      // Filter out selected options from rightAmenities
      const updatedRightAmenities = righttours.filter(
        (amenity) =>
          !selectedRightOptions.find(
            (selected) => selected.value === amenity.value
          )
      );

      // Filter out duplicate options from selectedOptions
      const uniqueSelectedOptions = selectedRightOptions.filter(
        (option, index, self) =>
          index === self.findIndex((o) => o.value === option.value)
      );

      // Combine existing amenities with uniqueSelectedOptions
      const combinedAmenities = [...prevAmenities, ...uniqueSelectedOptions];

      // Filter out duplicates from combinedAmenities
      const uniqueAmenities = combinedAmenities.filter(
        (option, index, self) =>
          index === self.findIndex((o) => o.value === option.value)
      );

      // Update rightAmenities and amenities
      setRightTours(updatedRightAmenities);
      return uniqueAmenities;
    });
  };
  const handleCitySelection = () => {
    if (!selectedCountry) {
      // If no country is selected, display a warning
      RequiredFieldAlert("Please select a country first", "", "warning");
    }
  };
 
  // create handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
  let requestBody="";
  if (righttours.length===0 || righttours === undefined) {
    RequiredFieldAlert(
      "No Activity is Mapped",
      "Please set an activity to map ",
      "error"
    );
    return ;
  }
    if (righttours && righttours.length > 0) {
      const tours = righttours.map(item => item.value);
      // country:(selectedCountry && selectedCountry.label) || '',city: (selectedCity && selectedCity.label) || '',
       requestBody={uuid:formData.uuid,
        tourUuid:tours

       };
    }


  
  try {
    
  

    const response = await postDATA(requestBody,ApiRoutes.SUPPLIERS.OFFLINE.TOUR_MAPPING);

    if (response.data.statusCode === 200) {
     
      SuccessApiToast( "Supplier Mapping Added Successfully");
      
      
    }
  } catch (error) {
    ErrorApiAlert('Error Adding Supplier Mapping');
    //  console.error(error)
  }
  }
  const handleSingleSelectChange = (selectedOption, name) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: selectedOption.value // Assuming the option object has a 'value' property
    }));
  };
  return (
    <>
      <Header2 title="ACTIVITY SUPPLIER MAPPING" linkText1="Activity And Supplier Mapping"/>
      <div class="container-fluid pt-0 p-4" id="content-pad">
     


      <form onSubmit={handleSubmit}>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label>Supplier Code</label>
                <MultiSelect
                    options={supplierOptions}
                    isSearchable
                    placeholder=" Select Supplier"
                    className="custom-select required"
                    noOptionsMessage={() => "No Supplier Found"}
                    value={supplierOptions.find(option => option.value === formData.uuid)}
                    onChange={(selectedOption) => handleSingleSelectChange(selectedOption, 'uuid')}
                  
                    required
                  />
              </div>
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
              <div className="form-group col-md-3"   onClick={handleCitySelection}>
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
              <div className="row mt-4">
              <div className="col-md-12 phps_row_0 mb-1">
                <label>Activity</label>
              </div>
              <div className="form-group col-md-5 phps_row_1">
                <select
                  name="sel_amenities"
                  id="sel_amenities"
                  className="form-control form-control-sm"
                  multiple
                  size={9}
                  style={{ height: "210px" }}
                  onChange={handleSelectChange}
                >
                  {toursleft.map((tran) => (
                    <option key={tran.value} value={tran.value}>
                      {tran.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center col-md-2 phps_row_0">
                <input
                  type="button"
                  className="btn w-xs btn-dark"
                  onClick={assignedSelectToRight}
                  defaultValue=">>"
                  style={{
                    marginTop: "2em",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                  }}
                />
                <br />
                <input
                  type="button"
                  className="btn w-xs btn-dark"
                  onClick={assignedSelectToLeft}
                  defaultValue="<<"
                  style={{
                    marginTop: "2em",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                  }}
                />
              </div>
              <div className="form-group col-md-5 phps_row_1">
                <select
                  name="sel_right_amenities"
                  id="sel_right_amenities"
                  className="form-control form-control-sm"
                  multiple
                  size={9}
                  style={{ height: "210px" }}
                  onChange={handleSelectRightChange}
                >
                  {righttours.map((amenity) => (
                    <option key={amenity.value} value={amenity.value}>
                      {amenity.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />
            <div className="row mt-3">
              <div className="form-group col-md-6">
                <button className="btn btn-dark btn-sm" type="submit" name="b1" value="SUBMIT" onclick="Javascript submit_form(document.forms['flight_supplier_mapping_form']);">
                  <i className="fa fa-floppy-o" />
                  &nbsp;Save
                </button>
              </div>
            </div>
          </div>
          </div>
        </form>



      </div>
    </>
  );
};
export default MastersTourAndActivityMapping;
