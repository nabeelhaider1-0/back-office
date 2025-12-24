/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";

import {
  Journey_options,
  cancel_options,
  fare_class_options,
  flightproviders_options,
  refund_options,
  travel_class_options,
} from "../../../constants/contants";
import { flightAddRules, getAllBranches, getDATA } from "../../../Apis/API";
import excelfilereader from "../../../constants/excelfilereader";
import excelFileContent from "../../../ExcelFiles/Airport_and_Airline_Code_List.xlsx";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Constants from "../../../constants/routes";
import { ErrorApiAlert } from "../../../constants/globalfunctions";
import ApiRoutes from "../../../constants/ApiRoutes"

const FlightAddRule = () => {
  const [airportData, setAirportData] = useState([]);
  const [fromselectedCountry, setfromSelectedCountry] = useState(null);
  const [fromairportOptions, setfromAirportOptions] = useState([]);
  const [toselectedCountry, settoSelectedCountry] = useState(null);
  const [toairportOptions, settoAirportOptions] = useState([]);
  const [fromselectedAirport, setfromSelectedAirport] = useState(null);
  const [toselectedAirport, settoSelectedAirport] = useState(null);
  const [airlineData, setAirlineData] = useState([]);
  const [currencyOptions, setcurrencyOptions] = useState([]);
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date
  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };
  const [startDate1, setStartDate1] = useState(null); // State for the start date
  const [endDate1, setEndDate1] = useState(null); // State for the end date

  const handleTrashClick1 = () => {
    // Function to clear both start and end dates
    setStartDate1(null);
    setEndDate1(null);
  };
  const [formData, setFormData] = useState({
    ruleIdentifier: "",
    ruleType: ["RATE_POLICY"], // Assuming RATE_POLICY is selected by default
    markupDiscount: "MARKUP", // Assuming MARKUP is selected by default
    status: "Active", // Assuming Active status is selected by default
    branches: [],
    agents: [],
    currency: "",
    fromCountry: [],
    fromAirport: [],
    toCountry: [],
    toAirport: [],
    airline: [],
    classofTravel: [],
    fareClass: [],
    flightProvider: [],
    availableSeatFrom: "",
    availableSeatTo: "",
    bookingPolicy: [],
    journeyType: [],
    lastMinute: "",
    bookingDateFrom: "",
    bookingDateTo: "",
    travelDateFrom: "",
    travelDateTo: "",
    paxRangeFrom: "",
    paxRangeTo: "",
    BookingAmountRangeFrom: "",
    BookingAmountRangeTo: "",
    ruleAppliedOn: "GROSS_FARE",
    markupBy: "",
    charges: "",
    applyDifferentMarkupAncillary: "false",
  });

  const [branches, setBranches] = useState();
  const [allBranches, setAllBranches] = useState();
  const [selectedAgentsOpions, setSelectedAgentsOpions] = useState([]);
  const [agents, setAgents] = useState();

  const getbranches = async () => {
    try {
      const response = await getAllBranches();

      if (response.data.statusCode === 200) {
        const branches = response.data.data || [];

        const options = branches.map((branch) => ({
          value: branch.uuid,
          label: branch.branchName,
        }));

        setBranches(options); // Set branches in the new state
        setAllBranches(branches);
      }
    } catch (error) {}
  };
  const getCurrencies = async () => {

    try {

      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.CURRENCIES.CURRENCY);
      if (response.data.statusCode === 200) {
        const currencies =response && response.data.data ? response.data.data : [];
       
      
        const options = currencies.map((curr) => ({
          value: curr.currencyCode,
          label: curr.currency,
        }));
        setcurrencyOptions(options);
        
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert('Error Fetching Currencies');
    } finally {

      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  const fetchExcelData = async () => {
    try {
      // Pass the Excel file content directly to the readExcelFile function
      const data = await excelfilereader(excelFileContent);

      setAirlineData(data.AirlineList);
      setAirportData(data.AirportCodes);
    } catch (error) {}
  };
  useEffect(() => {
    fetchExcelData();

    getbranches();
    getCurrencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (fromselectedCountry) {
      if (fromselectedCountry.length > 0) {
        const filteredAirports = airportData.filter((airport) =>
          fromselectedCountry.some(
            (country) => airport.countryCode === country.value
          )
        );

        setfromAirportOptions(filteredAirports);
        // setfromSelectedAirport(null);
      }
    } else {
      setfromAirportOptions([]);
      setfromSelectedAirport(null);
    }
  }, [fromselectedCountry, airportData]);
  useEffect(() => {
    if (toselectedCountry) {
      if (toselectedCountry.length > 0) {
        const filteredAirports = airportData.filter((airport) =>
          toselectedCountry.some(
            (country) => airport.countryCode === country.value
          )
        );
        settoAirportOptions(filteredAirports);
        // settoSelectedAirport(null);
      }
    } else {
      setfromAirportOptions([]);
      settoSelectedAirport(null);
    }
  }, [toselectedCountry, airportData]);
  const countryOptions = [
    { label: "- Select Country -", value: null }, // Default option
    ...airportData.reduce((uniqueCountries, airport) => {
      if (
        !uniqueCountries.some(
          (country) => country.value === airport.countryCode
        )
      ) {
        uniqueCountries.push({
          label: airport.countryName,
          value: airport.countryCode,
        });
      }
      return uniqueCountries;
    }, []),
  ];

  const handleCountryChange = (selectedOption, fieldName) => {
    const selectedValues = selectedOption.map((option) => option.value);
    const updatedValues = selectedValues.includes("")
      ? selectedValues.filter((val) => val !== "")
      : selectedValues;
    setFormData({ ...formData, [fieldName]: updatedValues });
    setfromSelectedCountry(selectedOption);
    setfromSelectedAirport(null);
  };
  const handlefromAirportChange = (selectedOption, fieldName) => {
    const selectedValues = selectedOption.map((option) => option.value);
    const updatedValues = selectedValues.includes("")
      ? selectedValues.filter((val) => val !== "")
      : selectedValues;
    setFormData({ ...formData, [fieldName]: updatedValues });
    setfromSelectedAirport(selectedOption);
  };
  const handletoAirportChange = (selectedOption, fieldName) => {
    const selectedValues = selectedOption.map((option) => option.value);
    const updatedValues = selectedValues.includes("")
      ? selectedValues.filter((val) => val !== "")
      : selectedValues;
    setFormData({ ...formData, [fieldName]: updatedValues });
    settoSelectedAirport(selectedOption);
  };
  const handletoCountryChange = (selectedOption, fieldName) => {
    const selectedValues = selectedOption.map((option) => option.value);
    const updatedValues = selectedValues.includes("")
      ? selectedValues.filter((val) => val !== "")
      : selectedValues;
    setFormData({ ...formData, [fieldName]: updatedValues });
    settoSelectedCountry(selectedOption);
  };
  const airportSelectOptions = [
    { label: "- Select Airport -", value: null }, // Default option
    ...fromairportOptions.map((airport) => ({
      label: `${airport.airportName} [${airport.airportCode}] - (${airport.cityName})`,
      value: airport.airportCode,
    })),
  ];
  const toairportSelectOptions = [
    { label: "- Select Airport -", value: null }, // Default option
    ...toairportOptions.map((airport) => ({
      label: `${airport.airportName} [${airport.airportCode}] - (${airport.cityName})`,
      value: airport.airportCode,
    })),
  ];

  const airlineOptions = airlineData.map((airline) => ({
    label: airline.Airlinename,
    value: airline.Airlinecode,
  }));
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding leading zero if needed
      const day = date.getDate().toString().padStart(2, "0"); // Adding leading zero if needed
      return `${month}/${day}/${year}`;
    };

    const dateObject = new Date(startDate);
    const dateObject1 = new Date(startDate1);
    const dateObject2 = new Date(endDate);
    const dateObject3 = new Date(endDate1);
    formData.bookingDateFrom = formatDate(dateObject);
    formData.bookingDateTo = formatDate(dateObject2);
    formData.travelDateFrom = formatDate(dateObject1);
    formData.travelDateTo = formatDate(dateObject3);

    try {
      const response = await flightAddRules(formData);

      if (response.data.statusCode === 200) {
        toast.success("Flight Rules Added Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });

        setFormData({
          ruleIdentifier: "",
          ruleType: ["RATE_POLICY"],
          markupDiscount: "MARKUP",
          status: "Active",
          branches: [],
          agents: [],
          currency: "",
          fromCountry: [],
          fromAirport: [],
          toCountry: [],
          toAirport: [],
          airline: [],
          classofTravel: [],
          fareClass: [],
          flightProvider: [],
          availableSeatFrom: "",
          availableSeatTo: "",
          bookingPolicy: [],
          journeyType: [],
          lastMinute: "",
          bookingDateFrom: "",
          bookingDateTo: "",
          travelDateFrom: "",
          travelDateTo: "",
          paxRangeFrom: "",
          paxRangeTo: "",
          BookingAmountRangeFrom: "",
          BookingAmountRangeTo: "",
          ruleAppliedOn: "",
          markupBy: "",
          charges: "",
          applyDifferentMarkupAncillary: "false",
        });
        navigate(Constants.URLConstants.FLIGHTFLIGHTSEARCHRULES);
      }
    } catch (error) {}
  };

  // Event handler for form inputs change
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      const updatedValues = checked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value);
      setFormData({ ...formData, [name]: updatedValues });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const newValue = checked ? "true" : "false"; // Convert boolean to string
    setFormData({ ...formData, [name]: newValue });
  };

  const handleMultiSelectChange = (selectedOption, fieldName) => {
    const selectedValues = selectedOption.map((option) => option.value);
    const updatedValues = selectedValues.includes("")
      ? selectedValues.filter((val) => val !== "")
      : selectedValues;
    setFormData({ ...formData, [fieldName]: updatedValues });
  };
  return (
    <>
      <Header2 title="ADD RULE" linkText1="Add Applicable Rule" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div className="panel-body">
          <form name="rules_module" id="rules_module" onSubmit={handleSubmit}>
            <div className="row mt-2">
              <div className="col-md-3 form-group phps_row_0 padd_5">
                <label>Rule Identifier</label>
                <input
                  type="text"
                  name="ruleIdentifier"
                  value={formData.ruleIdentifier}
                  onChange={handleInputChange}
                  autoComplete="off"
                  maxLength={50}
                  className="form-control form-control-sm required test123"
                  required
                />
                <br />
              </div>

              <div className="col-md-4 form-group">
                <label>Rule Type:</label>
                <br />
                <div className="radioline1 mt-2">
                  <div className="checkbox checkbox-success checkbox-inline">
                    <input
                      type="checkbox"
                      name="ruleType"
                      value="RATE_POLICY"
                      checked={formData.ruleType.includes("RATE_POLICY")}
                      onChange={handleInputChange}
                      id="id_rate_policy"
                    />
                    <label htmlFor="id_rate_policy">Rate Policy</label>
                  </div>
                  <div className="checkbox checkbox-success checkbox-inline">
                    <input
                      type="checkbox"
                      name="ruleType"
                      value="REISSUE"
                      checked={formData.ruleType.includes("REISSUE")}
                      onChange={handleInputChange}
                      id="id_reissue"
                    />
                    <label htmlFor="id_reissue">Reissue Charges</label>
                  </div>
                  <div className="checkbox checkbox-success checkbox-inline">
                    <input
                      type="checkbox"
                      name="ruleType"
                      value="CANCELLATION"
                      checked={formData.ruleType.includes("CANCELLATION")}
                      onChange={handleInputChange}
                      id="id_cancellation"
                    />
                    <label htmlFor="id_cancellation">
                      Cancellation Charges
                    </label>
                  </div>
                </div>
              </div>

              <div
                id="rate_policy_show"
                className="col-md-2 form-group"
                style={{ display: "block" }}
              >
                <label>&nbsp;</label>
                <br />
                <div className="radioline1">
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="markupDiscount"
                      value="MARKUP"
                      checked={formData.markupDiscount === "MARKUP"}
                      onChange={handleInputChange}
                      id="id_markup"
                    />
                    <label htmlFor="id_markup">Mark up</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="markupDiscount"
                      value="DISCOUNT"
                      checked={formData.markupDiscount === "DISCOUNT"}
                      onChange={handleInputChange}
                      id="id_discount"
                    />
                    <label htmlFor="id_discount">Discount</label>
                  </div>
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
                      value="Active"
                      checked={formData.status === "Active"}
                      onChange={handleInputChange}
                      name="status"
                    />
                    <label htmlFor="status_active">Active</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      id="status_inactive"
                      value="In Active"
                      checked={formData.status === "In Active"}
                      onChange={handleInputChange}
                      name="status"
                    />
                    <label htmlFor="status_inactive">In Active</label>
                  </div>
                </div>
              </div>
            </div>

            {/* MultiSelect components */}
            <div className="row">
              <div className="col-md-3 form-group phps_row_0 padd_5">
                <label>Branch</label>
                {/* Replace MultiSelect with your actual MultiSelect component */}
                <MultiSelect
                  options={branches}
                  isSearchable
                  isMulti
                  placeholder="- Select Branch -"
                  noOptionsMessage={() => "No Branch Found"}
                  className="custom-select"
                  onChange={(selectedOptions) => {
                    // Initialize an empty array to store filtered agents
                    const filteredAgents = [];

                    // Loop through each selected option
                    selectedOptions.forEach((selectedOption) => {
                      // Find the branch in allBranches matching the selected option's value
                      const selectedBranch = allBranches.find(
                        (branch) => branch.uuid === selectedOption.value
                      );

                      if (selectedBranch) {
                        // If the branch is found, map over its agents list
                        selectedBranch.agent.forEach((agent) => {
                          // Push each agent to the filteredAgents array
                          filteredAgents.push({
                            value: agent.uuid,
                            label: agent.agentName,
                          });
                        });
                      }
                    });

                    // Set agents options in the new state
                    setAgents(filteredAgents);

                    // Update formData
                    setFormData({
                      ...formData,
                      branches: selectedOptions.map((option) => option.value),
                    });
                    const updatedSelectedAgentsOptions = [];

                    selectedAgentsOpions.forEach((option) => {
                      if (filteredAgents.includes(option.value)) {
                        updatedSelectedAgentsOptions.push(option);
                      }
                    });

                    // Update selectedAgentsOptions state
                    setSelectedAgentsOpions(updatedSelectedAgentsOptions);
                  }}
                />
              </div>

              <div className="col-md-3 form-group phps_row_1 padd_5">
                <label>Agent</label>
                {/* Replace MultiSelect with your actual MultiSelect component */}
                <MultiSelect
                  options={agents}
                  isSearchable
                  isMulti
                  value={selectedAgentsOpions}
                  placeholder="- Select Agent -"
                  className="custom-select"
                  noOptionsMessage={() => "No Agent Found"}
                  onChange={(selectedOptions) => {
                    setFormData({
                      ...formData,
                      agents: selectedOptions.map((option) => option.value),
                    });
                    setSelectedAgentsOpions(
                      selectedOptions.map((option) => option)
                    );
                  }}
                />
              </div>

              <div className="col-md-3 form-group phps_row_0 padd_5">
                <label>Currency:</label>
                {/* Replace MultiSelect with your actual MultiSelect component */}
                <MultiSelect
                  options={currencyOptions}
                  isSearchable
                  placeholder="- Select Currency -"
                  className="custom-select"
                  noOptionsMessage={() => "No Currency Found"}
                  onChange={(selectedOption) =>
                    setFormData({
                      ...formData,
                      currency: selectedOption ? selectedOption.value : "",
                    })
                  }
                />
              </div>
            </div>

            <br />

            <div className="row mt-1">
              <div className="col-md-6 form-group">
                <div
                  className="card"
                  style={{
                    paddingRight: "44px",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    paddingLeft: "23px",
                  }}
                >
                  <h6>From</h6>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label>Country: </label>
                      <MultiSelect
                        options={countryOptions}
                        isMulti
                        noOptionsMessage={() => "No Country Found"}
                        value={fromselectedCountry}
                        onChange={(selectedOption) =>
                          handleCountryChange(selectedOption, "fromCountry")
                        }
                        isSearchable
                        placeholder="- Select Country -"
                        className="custom-select"
                      />
                    </div>

                    <div className="col-md-6 form-group">
                      <label>Airport: </label>
                      <MultiSelect
                        options={airportSelectOptions}
                        isMulti
                        value={fromselectedAirport}
                        isDisabled={!fromselectedCountry}
                        onChange={(selectedOption) =>
                          handlefromAirportChange(selectedOption, "fromAirport")
                        }
                        isSearchable
                        noOptionsMessage={() => "No Airport Found"}
                        placeholder="- Select Airport -"
                        className="custom-select"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <div
                  className="card"
                  style={{
                    paddingRight: "44px",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    paddingLeft: "24px",
                  }}
                >
                  <h6>To</h6>
                  <div className="row">
                    <div className="col-md-6 form-group ">
                      <label>Country: </label>
                      <MultiSelect
                        options={countryOptions}
                        value={toselectedCountry}
                        isMulti
                        onChange={(selectedOption) =>
                          handletoCountryChange(selectedOption, "toCountry")
                        }
                        isSearchable
                        noOptionsMessage={() => "No Country Found"}
                        placeholder="- Select Country -"
                        className="custom-select"
                      />
                    </div>
                    <div className="col-md-6 form-group ">
                      <label>Airport: </label>
                      <MultiSelect
                        options={toairportSelectOptions}
                        isDisabled={!toselectedCountry}
                        value={toselectedAirport}
                        isMulti
                        isSearchable
                        onChange={(selectedOption) =>
                          handletoAirportChange(selectedOption, "toAirport")
                        }
                        placeholder="- Select Airport -"
                        className="custom-select"
                        noOptionsMessage={() => "No Airport Found"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="row mt-2">
              <div className="col-md-3 form-group">
                <label>Airline: </label>
                <MultiSelect
                  options={airlineOptions}
                  isSearchable
                  isMulti
                  placeholder="- Select Airline -"
                  className="custom-select"
                  onChange={(selectedOption) =>
                    handleMultiSelectChange(selectedOption, "airline")
                  }
                  noOptionsMessage={() => "No Airline Found"}
                />
              </div>
              <div className="col-md-3 form-group phps_row_1 padd_5">
                <label>Class of Travel </label>
                <MultiSelect
                  options={travel_class_options}
                  isSearchable
                  isMulti
                  placeholder="- Select Travel Class -"
                  onChange={(selectedOption) =>
                    handleMultiSelectChange(selectedOption, "classofTravel")
                  }
                  className="custom-select"
                  noOptionsMessage={() => "No Travel Class Found"}
                />
              </div>
              <div className="col-md-3 form-group phps_row_0 padd_5">
                <label>Fare Class </label>
                <MultiSelect
                  options={fare_class_options}
                  isSearchable
                  isMulti
                  placeholder="- Select Fare Class -"
                  className="custom-select"
                  onChange={(selectedOption) =>
                    handleMultiSelectChange(selectedOption, "fareClass")
                  }
                  noOptionsMessage={() => "No Fare Class Found"}
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Flight Providers: </label>
                <MultiSelect
                  options={flightproviders_options}
                  isSearchable
                  isMulti
                  placeholder="- Select Flight Providers -"
                  onChange={(selectedOption) =>
                    handleMultiSelectChange(selectedOption, "flightProvider")
                  }
                  className="custom-select"
                  noOptionsMessage={() => "No Flight Providers Found"}
                />
              </div>
            </div>
            <br />
            <div>
              <label>
                <h6>Last Available Seats </h6>
              </label>
            </div>
            <div className="row">
              <div className="col-md-3 form-group phps_row_1 padd_5">
                <label>From: </label>
                <input
                  type="number"
                  min={0}
                  className="form-control form-control-sm"
                  name="availableSeatFrom"
                  value={formData.availableSeatFrom}
                  onChange={handleInputChange}
                />
                <span
                  id="seat_left_between_error"
                  style={{ color: "Red", display: "none" }}
                >
                  *Please enter numeric value for Last Available Seats From
                </span>
              </div>
              <div className="col-md-3 form-group phps_row_0 padd_5">
                <label>To: </label>
                <input
                  type="number"
                  min={0}
                  className="form-control form-control-sm"
                  name="availableSeatTo"
                  value={formData.availableSeatTo}
                  onChange={handleInputChange}
                />
                <span
                  id="seat_left_to_error"
                  style={{ color: "Red", display: "none" }}
                >
                  *Please enter numeric value for Last Available Seats to
                </span>
              </div>
              <div className="col-md-3 form-group">
                <label>Booking Policy: </label>
                <MultiSelect
                  options={refund_options}
                  isSearchable
                  isMulti
                  placeholder="- Select Booking Policy -"
                  className="custom-select"
                  noOptionsMessage={() => "No Booking Policy Found"}
                  onChange={(selectedOption) =>
                    handleMultiSelectChange(selectedOption, "bookingPolicy")
                  }
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Journey Type: </label>
                <MultiSelect
                  options={Journey_options}
                  isSearchable
                  isMulti
                  placeholder="- Select Journey Type -"
                  className="custom-select"
                  noOptionsMessage={() => "No Journey Type Found"}
                  onChange={(selectedOption) =>
                    handleMultiSelectChange(selectedOption, "journeyType")
                  }
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-3 form-group phps_row_1 padd_5">
                <label className="valuefor_txt">Last Minute</label>
                <input
                  type="text"
                  name="lastMinute"
                  value={formData.lastMinute}
                  onChange={handleInputChange}
                  maxLength={10}
                  className="form-control form-control-sm "
                />
                <p>Search Days before Departure</p>
                <span
                  id="last_minute_error"
                  style={{ color: "Red", display: "none" }}
                >
                  *Please enter numeric value
                </span>
              </div>
              <div className="col-md-3 form-group phps_row_0 padd_5">
                <label className="valuefor_txt">Booking Dates</label>
                <div
                  className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12"
                  id="search_from_date"
                >
                  <Flatpickr
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    options={{ dateFormat: "d-m-Y" }}
                    name="bookingDateFrom"
                  />
                  <span className="input-group-addon">to</span>
                  <Flatpickr
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    options={{ dateFormat: "d-m-Y" }}
                    name="bookingDateTo"
                  />
                  <span
                    className="input-group-addon"
                    id="bookTrashBtn"
                    onClick={handleTrashClick}
                  >
                    <i className="fa fa-trash" />
                  </span>
                </div>
              </div>
              <div className="col-md-3 form-group phps_row_1 padd_5">
                <label className="valuefor_txt">Travel date</label>
                <div
                  className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12"
                  id="departure_date_from"
                >
                  <Flatpickr
                    value={startDate1}
                    onChange={(date) => setStartDate1(date)}
                    options={{ dateFormat: "d-m-Y" }}
                    name="travelDateFrom"
                  />
                  <span className="input-group-addon">to</span>
                  <Flatpickr
                    value={endDate1}
                    onChange={(date) => setEndDate1(date)}
                    options={{ dateFormat: "d-m-Y" }}
                    name="travelDateTo"
                  />
                  <span
                    className="input-group-addon"
                    id="travelTrashBtn"
                    onClick={handleTrashClick1}
                  >
                    <i className="fa fa-trash" />
                  </span>
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-6 form-group phps_row_0 padd_5">
                <div>
                  <label>
                    <b>Pax Range</b>
                  </label>
                </div>
                <div className="row">
                  <div className="col-md-6 form-group phps_row_1 padd_5">
                    <label>From:</label>
                    <input
                      type="number"
                      min={0}
                      maxLength={25}
                      className="form-control form-control-sm"
                      name="paxRangeFrom"
                      value={formData.paxRangeFrom}
                      onChange={handleInputChange}
                    />
                    <span
                      id="pax_range_from_error"
                      style={{ color: "Red", display: "none" }}
                    >
                      *Please enter numeric value for Pax From range
                    </span>
                  </div>
                  <div className="col-md-6 form-group phps_row_0 padd_5">
                    <label>To:</label>
                    <input
                      type="number"
                      min={0}
                      maxLength={25}
                      className="form-control form-control-sm"
                      name="paxRangeTo"
                      value={formData.paxRangeTo}
                      onChange={handleInputChange}
                    />
                    <span
                      id="pax_range_to_error"
                      style={{ color: "Red", display: "none" }}
                    >
                      *Please enter numeric value for Pax To range
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 form-group phps_row_1 padd_5">
                <div>
                  <label>
                    <b>Booking Amount Range</b>
                  </label>
                </div>
                <div className="row">
                  <div className="col-md-6 form-group phps_row_0 padd_5">
                    <label>From:</label>
                    <input
                      type="number"
                      min={0}
                      maxLength={25}
                      className="form-control form-control-sm"
                      name="BookingAmountRangeFrom"
                      value={formData.BookingAmountRangeFrom}
                      onChange={handleInputChange}
                    />
                    <span
                      id="booking_amount_range_from_error"
                      style={{ color: "Red", display: "none" }}
                    >
                      *Please enter numeric value for booking amount From range
                    </span>
                  </div>
                  <div className="col-md-6 form-group phps_row_1 padd_5">
                    <label>To:</label>
                    <input
                      type="number"
                      min={0}
                      maxLength={25}
                      className="form-control form-control-sm"
                      name="BookingAmountRangeTo"
                      value={formData.BookingAmountRangeTo}
                      onChange={handleInputChange}
                    />
                    <span
                      id="booking_amount_range_to_error"
                      style={{ color: "Red", display: "none" }}
                    >
                      *Please enter numeric value for booking amount To range
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <div className="panel-body">
              {/* 						<h3><span id="heading">Mark Up</span></h3>
               */}
              <h4>
                <span id="heading">Applicable Charges</span>
              </h4>
              <div className>
                <div
                  className="row"
                  id="display_rule_applied"
                  style={{ display: "block" }}
                >
                  <div className="col-md-12 form-group" id="rule_applied_type">
                    <label>Rule Applied On: </label>
                    <br />
                    <div className="radioline1 mt-2">
                      <div className="radio radio-success radio-inline">
                        <input
                          type="radio"
                          name="ruleAppliedOn"
                          id="id_gross_fare"
                          value="GROSS_FARE"
                          defaultChecked={
                            formData.ruleAppliedOn === "GROSS_FARE"
                          }
                          onChange={handleInputChange}
                        />
                        <label htmlFor="id_gross_fare">Gross Fare</label>
                      </div>
                      <div className="radio radio-success radio-inline">
                        <input
                          type="radio"
                          name="ruleAppliedOn"
                          id="app"
                          value="BASE_FARE"
                          checked={formData.ruleAppliedOn === "BASE_FARE"}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="id_base_fare">Base Fare</label>
                      </div>
                      <br />
                    </div>
                  </div>
                </div>
                <div className="row mt-2" id="display_markup_charges">
                  <div className="col-md-12">
                    <h5>
                      <span id="heading">Mark Up</span>
                    </h5>
                  </div>
                  <div className="col-md-3 form-group phps_row_0 padd_5">
                    <label>Mark up by: </label>

                    <MultiSelect
                      options={cancel_options}
                      isSearchable
                      placeholder="- Select Journey Type -"
                      className="custom-select required"
                      noOptionsMessage={() => "No Journey Type Found"}
                      onChange={(selectedOption) =>
                        setFormData({
                          ...formData,
                          markupBy: selectedOption ? selectedOption.value : "",
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-3 form-group phps_row_1 padd_5">
                    <label>Charges: </label>
                    <input
                      type="text"
                      name="charges"
                      id="markup_charge_value"
                      maxLength={25}
                      className="form-control form-control-sm required"
                      onChange={handleInputChange}
                      required
                    />
                    <span
                      id="markup_charge_value_error"
                      style={{ color: "Red", display: "none" }}
                    >
                      *Please enter numeric value
                    </span>
                    <br />
                  </div>
                  <div className="col-md-3 form-group phps_row_0 padd_5">
                    <label style={{ width: "100%", float: "left" }}>
                      &nbsp;
                    </label>
                    <div className="checkbox checkbox-success checkbox-inline">
                      <input
                        type="checkbox"
                        name="applyDifferentMarkupAncillary"
                        id="id_cancellation_service_charges"
                        value={formData.applyDifferentMarkupAncillary}
                        // defaultChecked={formData.applyDifferentMarkupAncillary}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="id_cancellation_service_charges">
                        &nbsp;Apply different markup for ancillary
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  className="row"
                  id="display_ancillary_charges"
                  style={{ display: "none" }}
                >
                  <div className="col-md-12">
                    <h4>
                      <span id="heading">Mark Up</span>
                    </h4>
                  </div>
                  <div className="col-md-3 form-group phps_row_1 padd_5">
                    <label>Mark up on ancillary services: </label>
                    <select
                      className="selectpicker form-control show-menu-arrow input_width_2 setfonts required bs-select-hidden"
                      id="ancillary_markup_charge_type"
                      name="ancillary_markup_charge_type"
                      data-live-search="true"
                    >
                      <option label="-Select-" value>
                        -Select-
                      </option>
                      <option label="Amount" value="amount">
                        Amount
                      </option>
                      <option label="Percentage" value="percentage">
                        Percentage
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3 form-group phps_row_0 padd_5">
                    <label>Charges: </label>
                    <input
                      type="text"
                      name="ancillary_markup_charge_value"
                      id="ancillary_markup_charge_value"
                      defaultValue
                      disabled
                      maxLength={25}
                      className="form-control required"
                      onblur="return removeError(this.id);"
                      onkeypress="return IsNumeric(event,this);"
                      ondrop="return false;"
                    />
                    <span
                      id="ancillary_markup_charge_value_error"
                      style={{ color: "Red", display: "none" }}
                    >
                      *Please enter numeric value
                    </span>
                    <br />
                  </div>
                </div>
                <div
                  className="row"
                  id="display_discount_charges"
                  style={{ display: "none" }}
                >
                  <div className="col-md-12">
                    <h4>
                      <span id="heading">Discount</span>
                    </h4>
                  </div>
                  <div className="col-md-12 form-group" id="discount_types">
                    <label>Types: </label>
                    <br />
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="discount_type"
                        id="id_normal_codes"
                        defaultValue="NORMAL"
                      />
                      <label htmlFor="id_normal_codes">Normal Discount</label>
                    </div>
                    <div className="radio radio-success radio-inline">
                      <input
                        type="radio"
                        name="discount_type"
                        id="id_supplier_codes"
                        defaultValue="SUPP_CODES"
                      />
                      <label htmlFor="id_supplier_codes">
                        Supplier Codes Discount
                      </label>
                    </div>
                    <br />
                  </div>
                  <div
                    className="normal_discount"
                    id="normal_discount"
                    style={{ display: "block" }}
                  >
                    <div className="col-md-3 form-group phps_row_1 padd_5">
                      <label>Discount by: </label>
                      <select
                        className="selectpicker form-control show-menu-arrow input_width_2 setfonts required bs-select-hidden"
                        id="normal_discount_charge_type"
                        name="normal_discount_charge_type"
                        data-live-search="true"
                      >
                        <option label="-Select-" value>
                          -Select-
                        </option>
                        <option label="Amount" value="amount">
                          Amount
                        </option>
                        <option label="Percentage" value="percentage">
                          Percentage
                        </option>
                      </select>
                    </div>
                    <div className="col-md-3 form-group phps_row_0 padd_5">
                      <label>Charges: </label>
                      <input
                        type="text"
                        name="normal_discount_charge_value"
                        id="normal_discount_charge_value"
                        defaultValue
                        maxLength={25}
                        className="form-control required"
                        onblur="return removeError(this.id);"
                        onkeypress="return IsNumeric(event,this);"
                        ondrop="return false;"
                      />
                      <span
                        id="normal_discount_charge_value_error"
                        style={{ color: "Red", display: "none" }}
                      >
                        *Please enter numeric value
                      </span>
                    </div>
                  </div>
                  <div
                    className="add_more_discounts"
                    id="add_more_discounts"
                    style={{ display: "none" }}
                  >
                    <input
                      type="hidden"
                      name="discount_count_row"
                      defaultValue={1}
                      id="discount_count_row"
                    />
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="checkbox checkbox-success checkbox-inline">
                            <input
                              type="checkbox"
                              name="deal_code[]"
                              id="id_deal_code1"
                              defaultValue="DEAL_CODE"
                              data-element="Deal code"
                              defaultChecked
                              onclick="showhide_deal_code(this)"
                            />
                            <label htmlFor="id_deal_code">Deal Code</label>
                          </div>
                        </div>
                        <div className="col-md-1" style={{ paddingRight: 0 }}>
                          <div className="checkbox checkbox-success checkbox-inline">
                            <input
                              type="checkbox"
                              name="special_remark[]"
                              id="id_special_remark1"
                              defaultValue="SPECIAL_REMARK"
                              data-element="Special remark"
                              disabled
                              onclick="showhide_supplier_remark(this)"
                            />
                            <label htmlFor="id_airline_remark">Remarks</label>
                          </div>
                        </div>
                        <i
                          className="fa fa-info"
                          data-toggle="tooltip"
                          style={{
                            background: "black",
                            padding: "2px 6px",
                            marginLeft: "-30px",
                            color: "white",
                            borderRadius: "50%",
                          }}
                          data-placement="top"
                          data-html="true"
                          data-css="true"
                          title
                          data-original-title="Please select airline to enable this option."
                        />
                      </div>
                    </div>
                    <div className="col-md-3 ">
                      <div
                        className="form-group"
                        name="deal_codes_div1[]"
                        id="deal_codes_div"
                        style={{ display: "block" }}
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <label>
                              <b>Type of Codes:</b>
                            </label>
                          </div>
                          <div className="col-md-12">
                            <div className="radio radio-success radio-inline">
                              <input
                                type="radio"
                                name="special_code[]"
                                id="id_corporate_code1"
                                defaultValue="CORPORATE_CODE"
                                defaultChecked
                              />
                              <label htmlFor="id_corporate_code">
                                Corporate Code
                              </label>
                            </div>
                            <div className="radio radio-success radio-inline">
                              <input
                                type="radio"
                                name="special_code[]"
                                id="id_accounting_code1"
                                defaultValue="ACCOUNTING_CODE"
                              />
                              <label htmlFor="id_accounting_code">
                                Accounting Code
                              </label>
                            </div>
                          </div>
                          <div className="col-md-12 form-group phps_row_1 padd_5">
                            <label>Discount Code: </label>
                            <input
                              type="text"
                              name="discount_code[]"
                              id="discount_code1"
                              defaultValue
                              maxLength={25}
                              className="form-control required"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-3 form-group"
                      name="airline_remark_div1[]"
                      id="airline_remark_div"
                      style={{ display: "none" }}
                    >
                      <div className="row">
                        <div
                          className="col-md-12 form-group"
                          style={{ paddingTop: "40px" }}
                        >
                          <label>Remark: </label>
                          <div className="form-group phps_row_0 padd_5">
                            <input
                              type="text"
                              name="remarks_text[]"
                              id="remarks_text1"
                              defaultValue
                              maxLength={100}
                              className="form-control required"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="row"
                  id="display_reissue_charges"
                  style={{ display: "none" }}
                >
                  <div className="col-md-12">
                    <h4>
                      <span id="heading">Reissue Charges</span>
                    </h4>
                  </div>
                  <div className="col-md-3 form-group phps_row_1 padd_5">
                    <label>Reissue by: </label>
                    <select
                      className="selectpicker form-control show-menu-arrow input_width_2 setfonts required bs-select-hidden"
                      id="reissue_charge_type"
                      name="reissue_charge_type"
                      data-live-search="true"
                    >
                      <option label="-Select-" value>
                        -Select-
                      </option>
                      <option label="Amount" value="amount">
                        Amount
                      </option>
                      <option label="Percentage" value="percentage">
                        Percentage
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3 form-group phps_row_0 padd_5">
                    <label>Charges: </label>
                    <input
                      type="text"
                      name="reissue_charge_value"
                      id="reissue_charge_value"
                      defaultValue
                      maxLength={25}
                      className="form-control required"
                      onblur="return removeError(this.id);"
                      onkeypress="return IsNumeric(event,this);"
                      ondrop="return false;"
                    />
                    <span
                      id="reissue_charge_value_error"
                      style={{ color: "Red", display: "none" }}
                    >
                      *Please enter numeric value
                    </span>
                    <br />
                  </div>
                </div>
                <div className="clearfix" />
                <div
                  className="row"
                  id="display_cancellation_charges"
                  style={{ display: "none" }}
                >
                  <div className="col-md-12">
                    <h4>
                      <span id="heading">Cancellation Charges</span>
                    </h4>
                  </div>
                  <div className="col-md-3 form-group phps_row_1 padd_5">
                    <label>Cancel by: </label>
                    <select
                      className="selectpicker form-control show-menu-arrow input_width_2 setfonts required bs-select-hidden"
                      id="cancellation_charge_type"
                      name="cancellation_charge_type"
                      data-live-search="true"
                    >
                      <option label="-Select-" value>
                        -Select-
                      </option>
                      <option label="Amount" value="amount">
                        Amount
                      </option>
                      <option label="Percentage" value="percentage">
                        Percentage
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3 form-group phps_row_0 padd_5">
                    <label>Charges: </label>
                    <input
                      type="text"
                      name="cancellation_charge_value"
                      id="cancellation_charge_value"
                      maxLength={25}
                      className="form-control form-control-sm required"
                    />
                    <span
                      id="cancellation_charge_value_error"
                      style={{ color: "Red", display: "none" }}
                    >
                      *Please enter numeric value
                    </span>
                    <br />
                  </div>
                  {/* <span><b>*Note:-</b> The cancellation, Rate policy  and reissue will be applied over and above the supplier charges.</span>

							<div class="row">
								<div class="col-md-10 form-group phps_row_1 padd_5">
									<label>Remarks</label>
									<textarea name="remarks_text" id="remarks_text" class="form-control" rows="6" cols="50" ></textarea>
								</div>
							</div> */}
                </div>
                <div className="clearfix" />
                <div className="row">
                  <div className="form-group col-md-12">
                    <button
                      type="submit"
                      name="b1"
                      value="SUBMIT"
                      className="btn btn-dark btn-sm"
                    >
                      <i className="fa fa-plus" />
                      &nbsp;Add Rule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default FlightAddRule;
