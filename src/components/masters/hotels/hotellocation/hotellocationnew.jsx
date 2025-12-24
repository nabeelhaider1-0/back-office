import { useEffect, useState } from "react";
import Header2 from "../../../header2/header2";
import Constants from "../../../../constants/routes";
import MultiSelect from "../../../reactMultiSelect";
import excelfilereader from "../../../../constants/excelfilereader";
import excelFileContent from "../../../../ExcelFiles/worldcities.xlsx";
import { useNavigate } from "react-router-dom";
import { postDATA } from "../../../../Apis/API";
import {
  ErrorApiAlert,
  RequiredFieldAlert,
  SuccessApiToast,
} from "../../../../constants/globalfunctions";
import ApiRoutes from "../../../../constants/ApiRoutes"

const MastersHotelLocationNew = () => {
  const [countrycitydata, setCountryCityData] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [formData, setFormData] = useState({
    country: "",
    city: "",
    locationName: "",
    status: true,
  });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  const handleCountryChange = (selectedOption) => {
   
    setSelectedCountry(selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      country: selectedOption.label,
      city: "", // Reset city when country changes
    }));
    setSelectedCity(null); // Reset city selection when country changes
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      city: selectedOption.value,
    }));
  };
  const handleCitySelection = () => {
    if (!selectedCountry) {
      // If no country is selected, display a warning
      RequiredFieldAlert("Please select a country first", "", "warning");
    }
  };
  // Event handler for form inputs change
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      const updatedValues = checked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value);
      setFormData({ ...formData, [name]: updatedValues });
    } else if (type === "radio") {
      // For radio buttons, directly update the value
      setFormData({ ...formData, [name]: value === "true" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const checkRequired = (locationData) => {
    if (locationData.country === "" || locationData.country === undefined) {
      RequiredFieldAlert(
        "Country is required",
        "Please select Country",
        "error"
      );
      return false;
    }
    if (locationData.city === "" || locationData.city === undefined) {
      RequiredFieldAlert("City is required", "Please select City", "error");
      return false;
    }
    if (
      locationData.locationName === "" ||
      locationData.locationName === undefined
    ) {
      RequiredFieldAlert(
        "Location Name is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }
    return true;
  };
  const navigate = useNavigate();

  //  hanlesubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isSuccessfull = checkRequired(formData);
    if (isSuccessfull) {
      try {
        const response = await postDATA(
          formData,
          ApiRoutes.HOTELS.HOTEL_LOCATION
        );
        if (response.data.statusCode === 200) {
          SuccessApiToast("Location Added Successfully");

          navigate(Constants.URLConstants.MASTERSHOTELLOCATIONSEARCH);
        }
      } catch (error) {
        ErrorApiAlert("Error Adding Location Name");
      }
    }
  };

  return (
    <>
      <Header2
        title="ADD LOCATION"
        linkText1="Search Location"
        linkText2="Add Location"
        link1={Constants.URLConstants.MASTERSHOTELLOCATIONSEARCH}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="action" defaultValue="insert" />
          <input
            type="hidden"
            name="goahead_areaname"
            id="goahead"
            defaultValue
          />
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
              <div className="col-sm-3">
                <div className="form-group">
                  <label>Location Name</label>
                  <input
                    className="form-control form-control-sm required"
                    type="text"
                    name="locationName"
                    value={formData.locationName}
                    onChange={handleInputChange}
                    size={20}
                    maxLength={50}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3 form-group">
                <label>Status:</label>
                <br />
                <div className="radioline1">
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      id="status_active"
                      value={true}
                      checked={formData.status === true}
                      onChange={handleInputChange}
                      name="status"
                    />
                    <label htmlFor="status_active">Active</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      id="status_inactive"
                      value={false}
                      checked={formData.status === false}
                      onChange={handleInputChange}
                      name="status"
                    />
                    <label htmlFor="status_inactive">In-Active</label>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div id="save_btn">
              <button
                type="submit"
                name="b1"
                className="btn btn-dark btn-sm form-group"
              >
                <i className="fa fa-save" />
                &nbsp;&nbsp;Save
              </button>
            </div>
            {/* <div id='save_loading' style='display:none'><img src='/cpfv3/images/ajax_pagination_loading.gif' alt=""></div> */}
          </div>
        </form>
      </div>
    </>
  );
};
export default MastersHotelLocationNew;
