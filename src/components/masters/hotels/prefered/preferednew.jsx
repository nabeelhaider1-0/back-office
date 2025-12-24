
import { useEffect, useState } from "react";
import Header2 from "../../../header2/header2";
import MultiSelect from "../../../reactMultiSelect";
import { getDATA, postDATA } from "../../../../Apis/API";
import excelfilereader from "../../../../constants/excelfilereader";
import excelFileContent from "../../../../ExcelFiles/worldcities.xlsx";
import { ErrorApiAlert, RequiredFieldAlert, SuccessApiToast } from "../../../../constants/globalfunctions";
import { useNavigate } from "react-router-dom";
import Constants from "../../../../constants/routes";
import ApiRoutes from "../../../../constants/ApiRoutes";
const MastersHotelPreferedNew = () => {
  const [hotelsleft, setLeftHotels] = useState([]);
  const [righthotels, setRightHotels] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedRightOptions, setSelectedRightOptions] = useState([]);
  
  const [countrycitydata, setCountryCityData] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
 



  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    
    setSelectedCity(null); // Reset city selection when country changes
  };

  const handleCityChange = (selectedOption) => {
    filterHotelsByCity(selectedOption.value);
    setSelectedCity(selectedOption);
   
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
  function filterHotelsByCity(cityName) {
    // Filter hotels by the provided city name
    const filteredHotels = hotels.filter(hotel => hotel.city.toLowerCase() === cityName.toLowerCase());
    
    // Map the filtered hotels to options
    const options = filteredHotels.map(hotel => ({
        value: hotel.uuid,
        label: hotel.hotelName,
    }));

    // Set the options to the desired state (e.g., setLeftHotels)
    setLeftHotels(options);
}
  const getHotels = async () => {
    try {
      const response = await getDATA(ApiRoutes.HOTELS.MASTERS_HOTELS);

      if (response.data.statusCode === 200) {
        const hotels =
          response && response.data.data ? response.data.data : [];
     
        setHotels(hotels);
      }
    } catch (error) {}
  };
 
  useEffect(() => {
    getHotels();
    fetchExcelData();
   
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
    setRightHotels((prevRightAmenities) => {
      // Filter out selected options from amenities
      const updatedAmenities = hotelsleft.filter(
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
      setLeftHotels(updatedAmenities);
      return uniqueRightAmenities;
    });
  };
  const assignedSelectToLeft = () => {
    setLeftHotels((prevAmenities) => {
      // Filter out selected options from rightAmenities
      const updatedRightAmenities = righthotels.filter(
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
      setRightHotels(updatedRightAmenities);
      return uniqueAmenities;
    });
  };
  const handleCitySelection = () => {
    if (!selectedCountry) {
      // If no country is selected, display a warning
      RequiredFieldAlert("Please select a country first", "", "warning");
    }
  };
  const navigate = useNavigate();
  const checkRequired = () => {
    if (righthotels.length===0 || righthotels === undefined) {
      RequiredFieldAlert(
        "No preffered hotel is set",
        "Please set a hotel to preffered",
        "error"
      );
      return false;
    }
   
    return true;
  };
  // create handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isSuccessfull = checkRequired();
    
    if (isSuccessfull) {
      let prefhotels=[];
      if (righthotels && righthotels.length > 0) {
        const photels = righthotels.map(item => item.value);
        prefhotels = photels;
      }
      const requestbody={
        country: (selectedCountry && selectedCountry.label) || '',
        city: (selectedCity && selectedCity.label) || '',
        hotels: prefhotels
    }
      try {
        const response = await postDATA(
          requestbody,
          ApiRoutes.HOTELS.PREFERRED_HOTEL
        );

        if (response.data.statusCode === 200) {
          SuccessApiToast("Preffered Hotel Added Successfully");

          navigate(Constants.URLConstants.MASTERSHOTELSPREFEREDSEARCH);
        }
      } catch (error) {
        ErrorApiAlert("Error Adding Preffered Hotel");
      }
    }
  };
  return (
    <>
      <Header2 title="PREFERRED HOTEL" linkText1="Preferred Hotel" />
      <div class="container-fluid pt-0 p-4" id="content-pad">

        <form onSubmit={handleSubmit} name="preferred_hotel_form" id="preferred_hotel_form">
          <input type="hidden" name="action" defaultValue />
          <div className="panel-body">
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
              <div
                className="form-group col-md-3"
                onClick={handleCitySelection}
              >
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
            </div>
            <div className="row">
              <div className="col-md-12 form-group">
                <label>Hotels</label>
              </div>
              <div className="col-md-12">
                <div className="row">
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
                  {hotelsleft.map((hotel) => (
                    <option key={hotel.value} value={hotel.value}>
                      {hotel.label}
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
                  {righthotels.map((hotel) => (
                    <option key={hotel.value} value={hotel.value}>
                      {hotel.label}
                    </option>
                  ))}
                </select>
              </div>
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12">
                <button type="submit" className="btn btn-dark btn-sm form-group" name="b1" value="SUBMIT" onclick="Javascript submit_form(document.forms['preferred_hotel_form']);">
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
export default MastersHotelPreferedNew;
