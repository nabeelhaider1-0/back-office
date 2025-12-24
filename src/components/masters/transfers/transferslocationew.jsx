/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { pickupPointOptions } from "../../../constants/contants";
import excelfilereader from "../../../constants/excelfilereader";
import excelFileContent from "../../../ExcelFiles/worldcities.xlsx";
import {
  ErrorApiAlert,
  RequiredFieldAlert,
  SuccessApiToast,
} from "../../../constants/globalfunctions";
import Constants from "../../../constants/routes";
import { postDATA } from "../../../Apis/API";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../../../constants/ApiRoutes";

const MastersTransfersLocationsNew = () => {
  const [countryOptions, setcountryOptions] = useState([]);
  const [countrycitydata, setcountrycitydata] = useState([]);
  const [selectedCountry, setselectedCountry] = useState(null);
  const [cityOptions, setcityOptions] = useState([]);
  const [selectedCity, setselectedCity] = useState(null);
  const [formData, setFormData] = useState({
    locationName: "",
    transferType: "",
  });
  const fetchExcelData = async () => {
    try {
      // Pass the Excel file content directly to the readExcelFile function
      const data = await excelfilereader(excelFileContent);
      setcountrycitydata(data);

      const uniqueCountries = Array.from(
        new Set(data.CountryCities.map((item) => item.country))
      ).map((country) => ({
        value: data.CountryCities.find((item) => item.country === country).iso3,
        label: country,
      }));
      setcountryOptions(uniqueCountries);
    } catch (error) {}
  };
  useEffect(() => {
    fetchExcelData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Extract city options based on selected country
    if (selectedCountry) {
      const cities = countrycitydata.CountryCities.filter(
        (item) => item.iso3 === selectedCountry.value
      ).map((item) => ({ value: item.city, label: item.city }));
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
  const handleSingleSelectChange = (selectedOption, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption.value, // Assuming the option object has a 'value' property
    }));
  };
  const handleCitySelection = () => {
    if (!selectedCountry) {
      // If no country is selected, display a warning
      RequiredFieldAlert("Please select country first", "", "warning");
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assign values to formData fields based on conditions
    const requestBody = {
      locationName: (formData.locationName && formData.locationName) || "",
      country: (selectedCountry && selectedCountry.label) || "",
      city: (selectedCity && selectedCity.label) || "",
      transferType: (formData.transferType && formData.transferType) || "",
      status: true,
    };
    try {
      const response = await postDATA(
        requestBody,
        ApiRoutes.TRANSFERS.TRANSFER_LOCATION
      );

      if (response.data.statusCode === 200) {
        SuccessApiToast("Location Added Successfully");

        navigate(Constants.URLConstants.MASTERSTRANSFERSLOCATIONSSEARCH);
      }
    } catch (error) {
      ErrorApiAlert("Error Adding Location");
    }
  };
  return (
    <>
      <Header2 title="ADD LOCATION" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="f_action" id="f_action" />
          <div className="panel-body">
            <div className="mesID" style={{ display: "none" }}></div>
            <div className="row">
              <div className="col-md-2 form-group">
                <label>Select Country</label>
                <MultiSelect
                  options={countryOptions}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select required"
                  onChange={handleCountryChange}
                  noOptionsMessage={() => "No Country Found"}
                  required
                />
                <img
                  src="images/loader.gif"
                  alt="cri"
                  name="loader"
                  width="20px"
                  height="15px"
                  id="loader"
                  style={{ visibility: "hidden" }}
                />
              </div>
              {/* [START] Added code for row - 7 January 2015 - swapnil nagaonkar */}
              <div
                className="col-md-2 form-group"
                onClick={handleCitySelection}
              >
                <label>Select City</label>
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
              {/* [END] Ended code for row - 7 January 2015 - swapnil nagaonkar */}
              <div className="col-md-2 form-group">
                <label>Transfer Type </label>
                <MultiSelect
                  options={pickupPointOptions}
                  isSearchable
                  placeholder="- Select Transfer Type -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Transfer Type Found"}
                  value={pickupPointOptions.find(
                    (option) => option.value === formData.transferType
                  )}
                  onChange={(selectedOption) =>
                    handleSingleSelectChange(selectedOption, "transferType")
                  }
                  required
                />
                <img
                  src="images/loader.gif"
                  alt="cri"
                  name="loader_1"
                  width="20px"
                  height="15px"
                  id="loader_1"
                  style={{ visibility: "hidden" }}
                />
              </div>
              <div
                className="col-md-2 form-group"
                id="other_city"
                style={{ display: "none" }}
              >
                <label>Other City</label>
                <MultiSelect
                  //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
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

              <div className="col-md-2 form-group">
                <label>Transfer Location Name </label>
                <input
                  className="form-control form-control-sm required"
                  name="locationName"
                  type="text"
                  id="locationName"
                  value={formData.locationName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 form-group">
                <button
                  type="submit"
                  className="btn btn-dark btn-sm"
                  name="button"
                  id="button"
                  value="ADD"
                  onclick="addLocation()"
                >
                  <i className="fa fa-plus" />
                  &nbsp;Add
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default MastersTransfersLocationsNew;
