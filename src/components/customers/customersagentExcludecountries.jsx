/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import {
  RequiredFieldAlert,
  SimpleAlert,
  SuccessApiToast,
} from "../../constants/globalfunctions";
import Header2 from "../header2/header2";
import excelfilereader from "../../constants/excelfilereader";

import excelFileContent from "../../ExcelFiles/worldcities.xlsx";
import { useNavigate } from "react-router-dom";
import Constants from "../../constants/routes";
import { connect } from "react-redux";
import { putDATA } from "../../Apis/API";
import ApiRoutes from "../../constants/ApiRoutes"

const CustomersAgentExcludeCountries = ({ data }) => {
  const [rightCountryOptions, setrightCountryOptions] = useState([]);
  const [countryOptions, setcountryOptions] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [cityOptions, setcityOptions] = useState([]);
  const navigate = useNavigate();

  const [selectedRightOptions, setSelectedRightOptions] = useState([]);

  const fetchData = async () => {
    try {
      // Fetch Excel data and update countryOptions
      const excel = await excelfilereader(excelFileContent);

      const uniqueCountries = Array.from(
        new Set(excel.CountryCities.map((item) => item.country))
      ).map((country) => ({
        value: excel.CountryCities.find((item) => item.country === country)
          .iso3,
        label: country,
      }));

      setcountryOptions(uniqueCountries);

      // Check if excludecountries is available and update rightCountryOptions accordingly
      if (data.excludecountries && data.excludecountries.length > 0) {
        const filteredRightCountryOptions = uniqueCountries.filter((option) =>
          data.excludecountries.includes(option.label)
        );

        setrightCountryOptions(filteredRightCountryOptions);
      }
    } catch (error) {
      // console.error("Error fetching Excel data:", error);
    }
  };

  // Empty dependency array ensures useEffect runs only once on mount

  useEffect(() => {
    // Ensure navigation if data is not available
    if (!data || Object.keys(data).length === 0) {
      navigate(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
    } else {
      fetchData();
    }
  }, [data, navigate]);

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
    setrightCountryOptions((prevCity) => {
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
      const combinedcities = [...prevCity, ...uniqueSelectedOptions];

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
      const updatedRightCities = rightCountryOptions.filter(
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
      const combinedCities = [...prevCities, ...uniqueSelectedOptions];

      // Filter out duplicates from combinedAmenities
      const uniqueCities = combinedCities.filter(
        (option, index, self) =>
          index === self.findIndex((o) => o.value === option.value)
      );

      // Update rightAmenities and amenities
      setrightCountryOptions(updatedRightCities);
      return uniqueCities;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rightCountryOptions && rightCountryOptions.length > 0) {
      const excludecountries = rightCountryOptions.map((item) => item.label);

      try {
        // Make an API call to update the staff's active status
        const requestBody = {
          excludecountries: excludecountries,
          updatepassword: false,
        };
        const response = await putDATA(
          ApiRoutes.CUSTOMER_AGENTS.AGENT,
          data.uuid,
          requestBody
        );

        // Check the response and handle it accordingly
        if (response.data.statusCode === 200) {
          SuccessApiToast("Agent Exclude Countries Updated Successfully");
          navigate(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
        } else {
          SimpleAlert("error", "Error", "Failed to Update Agent");
        }
      } catch (error) {
        // Handle errors from the API call

        SimpleAlert("error", "Error", "An unexpected error occurred.");
      }
    } else {
      RequiredFieldAlert(
        "No Excluded Countries Selected",
        "Please select Countries",
        "error"
      );
    }
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="EXCLUDE COUNTIRES" />

        <div>
          <div
            className="panel-body"
            style={{
              backgroundColor: "#FF5015",
              paddingBottom: "1px",
              paddingTop: "4px",
            }}
          >
            <div className="row">
              <div className="col-md-12">
                <h5
                  style={{
                    color: "white",
                    fontSize: "15px",
                    marginLeft: "20px",
                  }}
                >
                  Agent :{" "}
                  {data.agentName && data.agentName !== null
                    ? data.agentName
                    : ""}
                </h5>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} id="customersexcludedcountries">
            <input type="hidden" name="action" defaultValue="add_cities" />
            <div className="panel-body">
              <div className="row mt-4">
                <div className="col-md-12 phps_row_0 mb-1">
                  <label>Country</label>
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
                    {countryOptions.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
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
                    {rightCountryOptions.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-md-12 form-group">
                  <br />
                  <button
                    type="submit"
                    className="btn btn-dark btn-sm"
                    name="btn1"
                    value="Submit"
                    onclick="JavaScriptsubmit_form()"
                  >
                    <i className="fa fa-floppy-o" />
                    &nbsp;Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(CustomersAgentExcludeCountries);
