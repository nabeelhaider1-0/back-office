import { useEffect, useState } from "react";
import Header2 from "../../../header2/header2";
import Constants from "../../../../constants/routes";
import MultiSelect from "../../../reactMultiSelect";
import excelfilereader from "../../../../constants/excelfilereader";
import excelFileContent from "../../../../ExcelFiles/worldcities.xlsx";
import { useNavigate } from "react-router-dom";
import { putDATA } from "../../../../Apis/API";
import { connect } from "react-redux";
import {
  ErrorApiAlert,
  RequiredFieldAlert,
  SuccessApiToast,
} from "../../../../constants/globalfunctions";
import ApiRoutes from "../../../../constants/ApiRoutes"

const MastersHotelLocationEdit = ({ data }) => {
  console.log("My Data location coming is", data);

  const [countrycitydata, setCountryCityData] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [branchData, setBranchData] = useState({
    branchCountry: "",
    branchCity: "",
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
    setBranchData((prevData) => ({
      ...prevData,
      branchCountry: selectedOption.value,
      branchCity: "", // Reset city when country changes
    }));
    setSelectedCity(null); // Reset city selection when country changes
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setBranchData((prevData) => ({
      ...prevData,
      branchCity: selectedOption.value,
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
  const [formData, setFormData] = useState({
    locationName: "",
    status: true,
  });

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
  function filterOptionsByValue(options, value) {
    const filteredOption = options.filter((option) => option.value === value);
    return filteredOption[0];
  }
  const navigate = useNavigate();
  const navigateOnRefresh = useNavigate();
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData({
        locationName: data.locationName,
        status: data.status === "true",
      });
    } else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(Constants.URLConstants.MASTERSHOTELLOCATIONSEARCH);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, navigateOnRefresh]);
  //  hanlesubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      country: branchData.branchCountry,
      city: branchData.branchCity,
      locationName: formData.locationName,
      status: formData.status,
    };
    const isSuccessfull = checkRequired(requestBody);
    if (isSuccessfull) {
      try {
        const response = await putDATA(
          ApiRoutes.HOTELS.HOTEL_LOCATION,
          data.uuid,
          requestBody
        );

        if (response.data.statusCode === 200) {
          SuccessApiToast("Location Updated Successfully");

          navigate(Constants.URLConstants.MASTERSHOTELLOCATIONSEARCH);
        }
      } catch (error) {
        ErrorApiAlert("Error Updating Location");
      }
    }
  };
  // Use the selectedCountry state when it's available, otherwise use the default value from data.country
  const countryValue = selectedCountry
    ? selectedCountry
    : filterOptionsByValue(countryOptions, data.country);
  const cityValue = selectedCity
    ? selectedCity
    : filterOptionsByValue(cityOptions, data.city);
  useEffect(() => {
    if (!selectedCountry && countryOptions && countryOptions.length > 0) {
      setSelectedCountry(countryValue);
    }
    console.log("selectedCountry", selectedCountry);
  }, [selectedCountry, countryOptions, countryValue]);

  return (
    <>
      <Header2
        title="EDIT LOCATION"
        linkText1="Search Location"
        linkText2="Edit Location"
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
                  value={countryValue}
                  noOptionsMessage={() => "No Country Found"}
                  className="custom-select required"
                  onChange={handleCountryChange}
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
                  value={cityValue}
                  onChange={handleCityChange}
                  isDisabled={!selectedCountry}
                  noOptionsMessage={() => "No City Found"}
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
          </div>
        </form>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps)(MastersHotelLocationEdit);
