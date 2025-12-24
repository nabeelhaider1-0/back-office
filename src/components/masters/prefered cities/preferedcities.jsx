/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import excelfilereader from "../../../constants/excelfilereader";
import excelFileContent from '../../../ExcelFiles/worldcities.xlsx';
import { ErrorApiAlert, RequiredFieldAlert, SuccessApiToast } from "../../../constants/globalfunctions";
import { getDATA, postDATA } from "../../../Apis/API";
import ApiRoutes from "../../../constants/ApiRoutes";

const MastersPrerdfeCities = () => {
  const [rightcityOptions, setRightCityOptions] = useState([]);
  const [countryOptions, setcountryOptions] = useState([]);
  const [countrycitydata, setcountrycitydata] = useState([]);
  const [selectedCountry, setselectedCountry] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [cityOptions, setcityOptions] = useState([]);

  const [prefferedcountrycityData, setPrefferedCountyCityData] = useState([]);
  const [selectedRightOptions, setSelectedRightOptions] = useState([]);

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
  getPrefCountryCities();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
useEffect(() => {
  // Extract city options based on selected country
  if (selectedCountry) {
    const cities = countrycitydata.CountryCities
      .filter((item) => item.iso3 === selectedCountry.value)
      .map((item) => ({ value: item.city, label: item.city }));
    setcityOptions(cities);
    getUniquePreferredCities(prefferedcountrycityData,selectedCountry.label,cities);
   
  } else {
    setcityOptions([]);
   
  }
}, [selectedCountry]);

const getUniquePreferredCities = (data, countryName,cities) => {
  const citySet = new Set();
  
  data.forEach(item => {
    if (item.country === countryName) {
      item.PreferredCities.forEach(city => {
        citySet.add(city.city);
      });
    }
  });

  let citiesToRemove=Array.from(citySet);
  
  const filteredCities = [];
const matchedCities = [];

cities.forEach(city => {
    if (citiesToRemove.includes(city.value)) {
        matchedCities.push(city);
    } else {
        filteredCities.push(city);
    }
});


 
  setcityOptions(filteredCities);
  setRightCityOptions(matchedCities);
};
const handleCountryChange = (selectedOption) => {
  setselectedCountry(selectedOption);
  setRightCityOptions([]);

};

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
  setRightCityOptions((prevCity) => {
    // Filter out selected options from amenities
    const updatedCities = cityOptions.filter(
      (city) =>
        !selectedOptions.find((selected) => selected.value === city.value)
    );

    // Filter out duplicate options from selectedOptions
    const uniqueSelectedOptions = selectedOptions.filter(
      (option, index, self) =>
        index === self.findIndex((o) => o.value === option.value)
    );

    // Combine existing rightAmenities with uniqueSelectedOptions
    const combinedcities = [
      ...prevCity,
      ...uniqueSelectedOptions,
    ];

    // Filter out duplicates from combinedAmenities
    const uniqueRightCities = combinedcities.filter(
      (option, index, self) =>
        index === self.findIndex((o) => o.value === option.value)
    );

    // Update amenities and rightAmenities
  setcityOptions(updatedCities);
    return uniqueRightCities;
  });
};
const assignedSelectToLeft = () => {
  setcityOptions((prevCities) => {
    // Filter out selected options from rightAmenities
    const updatedRightCities= rightcityOptions.filter(
      (city) =>
        !selectedRightOptions.find(
          (selected) => selected.value === city.value
        )
    );

    // Filter out duplicate options from selectedOptions
    const uniqueSelectedOptions = selectedRightOptions.filter(
      (option, index, self) =>
        index === self.findIndex((o) => o.value === option.value)
    );

    // Combine existing amenities with uniqueSelectedOptions
    const combinedCities= [...prevCities, ...uniqueSelectedOptions];

    // Filter out duplicates from combinedAmenities
    const uniqueCities = combinedCities.filter(
      (option, index, self) =>
        index === self.findIndex((o) => o.value === option.value)
    );

    // Update rightAmenities and amenities
    setRightCityOptions(updatedRightCities);
    return uniqueCities;
  });
};
const getPrefCountryCities = async () => {

  try {

    // Set loading to true when fetching data
    const response = await getDATA(ApiRoutes.PREFERRED_LOCATIONS.COUNTRIES);
    if (response.data.statusCode === 200) {
      const prefcountrycitydata =response && response.data.data ? response.data.data : [];
     
   
    setPrefferedCountyCityData(prefcountrycitydata);
      
    }

    // Handle successful authentication, e.g., set user state, redirect, etc.
  } catch (error) {
    ErrorApiAlert('Error Fetching Preffered Country Cities');
  } finally {

    // Set loading to false after data is fetched (whether successful or not)
  }
};

const sendDataToAPI = async (data) => {
  // Replace with your actual API call
  try {
    const response = await postDATA({ city: data }, ApiRoutes.PREFERRED_LOCATIONS.CITIES);
    if (response.data.statusCode === 200) {
      return response.data.data.uuid;
    }
  } catch (error) {
    ErrorApiAlert('Error Adding Cities');
  }
  return null;
};
const handleSubmit = async (e) => {
  e.preventDefault();

  if (rightcityOptions && rightcityOptions.length > 0) {
    const prefferedcities = rightcityOptions.map(item => item.label);

    try {
      const uuidArray = [];
      
      // Use Promise.all to wait for all sendDataToAPI calls to complete
      await Promise.all(prefferedcities.map(async (city) => {
        const newUuid = await sendDataToAPI(city);
        if (newUuid) {
          uuidArray.push({ uuid: newUuid });
        }
      }));

    
      // Now uuidcites should be updated, you can proceed with the next steps
      if (uuidArray.length > 0) {
       

        const requestBody = {
          country: (selectedCountry && selectedCountry.label) || '',
          PreferredCities: uuidArray
        };

        try {
          const response = await postDATA(requestBody, ApiRoutes.PREFERRED_LOCATIONS.CITIES);
          if (response.data.statusCode === 200) {
            SuccessApiToast("Preffered Cities Added Successfully");
          }
        } catch (error) {
          ErrorApiAlert('Error Adding Preffered Cities');
        }
        
      }
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  } else {
    RequiredFieldAlert(
      "No Preffered Cities Selected",
      "Please select Cities",
      "error"
    );
  }
}
  return (
    <>
      <Header2 title="PREFERRED CITIES" linkText1="Preferred Cities" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
      <form onSubmit={handleSubmit}  id="prefferedcitiesaddnew">
  <input type="hidden" name="action" defaultValue="add_cities" />
  <div className="panel-body">
    <div className="row">
      <div className="col-md-3 form-group">
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
    </div>
    <div className="row mt-4">
              <div className="col-md-12 phps_row_0 mb-1">
                <label>City</label>
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
                  {cityOptions.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
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
                  {rightcityOptions.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
    <div className="row mt-1">
      <div className="col-md-12 form-group"><br />
        <button type="submit" className="btn btn-dark btn-sm" name="btn1" value="Submit" onclick="JavaScriptsubmit_form()">
          <i className="fa fa-floppy-o" />&nbsp;Save
        </button>
      </div>
    </div>
  </div>
</form>

      </div>
    </>
  );
};
export default MastersPrerdfeCities;
