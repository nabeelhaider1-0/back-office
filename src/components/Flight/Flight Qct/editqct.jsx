import React, { useEffect, useState } from "react"; // Import React and useState

import Flatpickr from "react-flatpickr";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import {
  bookingPCC,
  flightproviders_options,
  ticketingPCC,
} from "../../../constants/contants";
import excelfilereader from "../../../constants/excelfilereader";
import excelFileContent from "../../../ExcelFiles/Airport_and_Airline_Code_List.xlsx";
import { getAllAgents, updateFlightQCTRulesAll } from "../../../Apis/API";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";

const FlightQctEditRule = ({ data }) => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date
  const [airportData, setAirportData] = useState([]);
  const [fromselectedCountry, setfromSelectedCountry] = useState(null);
  const [fromairportOptions, setfromAirportOptions] = useState([]);
  const [toselectedCountry, settoSelectedCountry] = useState(null);
  const [toairportOptions, settoAirportOptions] = useState([]);

  const [airlineData, setAirlineData] = useState([]);

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };
  const [formData, setFormData] = useState({
    fromCountry: [],
    fromAirport: [],
    toCountry: [],
    toAirport: [],
    airline: [],
    agents: [],
    flightProvider: [],
    journeyType: ["One-way"],
    status: "Active",
    queueIdentifier: "",
    DateFrom: "",
    DateTo: "",
    ruleType: "",
    bookingPCC: "",
    ticketingPCC: "",
  });

  const [agents, setAgents] = useState();
  const navigateOnRefresh = useNavigate();

  function filterOptionsByValue(options, value) {
    const filteredOption = options.filter((option) => option.value === value);

    return filteredOption[0];
  }

  function datePassObject(value) {
    var bookingDateArray = value.split("/"); // Splitting the string into an array ["04", "08", "2024"]
    var bookingDateObject = new Date(
      bookingDateArray[2],
      bookingDateArray[0] - 1,
      bookingDateArray[1]
    ); // Creating a Date object
    return bookingDateObject;
  }

  const getAgents = async () => {
    try {
      const response = await getAllAgents();

      if (response.data.statusCode === 200) {
        const agents = response.data.data || [];

        const options = agents.map((agent) => ({
          value: agent.uuid,
          label: agent.agentName,
        }));

        setAgents(options); // Set branches in the new state
        setFormData((prevFormData) => {
          const updatedAgents = filterOptionsByAgents(options, data.agents);

          return {
            ...prevFormData,
            agents: updatedAgents,
          };
        });
      }
    } catch (error) {}
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
    getAgents();
    fetchExcelData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
   
    if (data && Object.keys(data).length > 0) {
      setFormData({
        fromCountry: data.fromCountry,
        fromAirport: data.fromAirport,
        toCountry: data.toCountry,
        toAirport: data.toAirport,
        airline: data.airline,
        agents: [],
        flightProvider: data.flightProvider,
        journeyType: data.journeyType,
        status: data.status,
        queueIdentifier: data.queueIdentifier,
        ruleType: data.ruleType,
        bookingPCC: filterOptionsByValue(bookingPCC, data.bookingPCC),
        ticketingPCC: filterOptionsByValue(ticketingPCC, data.ticketingPCC),
      });
    }
    const transformedfromArray = data.fromCountry.map(airport => ({
      label: airport,
      value: airport
    }));
    
    setfromSelectedCountry(transformedfromArray);

    const transformedtoArray = data.toCountry.map(airport => ({
      label: airport,
      value: airport
    }));
    
    settoSelectedCountry(transformedtoArray);
    if (data && data.DateFrom && data.DateTo) {
      setStartDate(datePassObject(data.DateFrom));
      setEndDate(datePassObject(data.DateTo));
      // Other logic...
    } else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(Constants.URLConstants.FLIGHTFLIGHTQCTSEARCHRULES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, navigateOnRefresh]);
  useEffect(() => {
    if (fromselectedCountry) {
      if (fromselectedCountry.length > 0) {
        const filteredAirports = airportData.filter((airport) =>
          fromselectedCountry.some(
            (country) => airport.countryCode === country.value
          )
        );
        setfromAirportOptions(filteredAirports);
      }
    } else {
      setfromAirportOptions([]);
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
      }
    } else {
      settoAirportOptions([]);
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
  };
  const handlefromAirportChange = (selectedOption, fieldName) => {
    const selectedValues = selectedOption.map((option) => option.value);
    const updatedValues = selectedValues.includes("")
      ? selectedValues.filter((val) => val !== "")
      : selectedValues;
    setFormData({ ...formData, [fieldName]: updatedValues });
  };
  const handletoAirportChange = (selectedOption, fieldName) => {
    const selectedValues = selectedOption.map((option) => option.value);
    const updatedValues = selectedValues.includes("")
      ? selectedValues.filter((val) => val !== "")
      : selectedValues;
    setFormData({ ...formData, [fieldName]: updatedValues });
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
      label: airport.airportName,
      value: airport.airportCode,
    })),
  ];
  const toairportSelectOptions = [
    { label: "- Select Airport -", value: null }, // Default option
    ...toairportOptions.map((airport) => ({
      label: airport.airportName,
      value: airport.airportCode,
    })),
  ];

  const airlineOptions = airlineData.map((airline) => ({
    label: airline.Airlinename,
    value: airline.Airlinecode,
  }));

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
    const newValue = checked ? "default" : ""; // Convert boolean to string
    setFormData({ ...formData, [name]: newValue });
  };

  function extractValuesFromArray(arr, prop) {
    return arr.map((item) => item.value);
  }

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.bookingPCC = formData.bookingPCC.value;
    formData.agents = extractValuesFromArray(formData.agents, "value");
    formData.ticketingPCC = formData.ticketingPCC.value;
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding leading zero if needed
      const day = date.getDate().toString().padStart(2, "0"); // Adding leading zero if needed
      return `${month}/${day}/${year}`;
    };

    const dateObject = new Date(startDate);
    const dateObject1 = new Date(endDate);
    formData.DateFrom = formatDate(dateObject);
    formData.DateTo = formatDate(dateObject1);
    try {
      const response = await updateFlightQCTRulesAll(data.uuid, formData);
      if (response.data.statusCode === 200) {
        setFormData({
          fromCountry: [],
          fromAirport: [],
          toCountry: [],
          toAirport: [],
          airline: [],
          agents: [],
          flightProvider: [],
          journeyType: ["One-way"],
          status: "Active",
          queueIdentifier: "",
          DateFrom: "",
          DateTo: "",
          ruleType: "",
          bookingPCC: "",
          ticketingPCC: "",
        });

        toast.success("QCT Rules Updated Successfully", {
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
        navigate(Constants.URLConstants.FLIGHTFLIGHTQCTSEARCHRULES);
      }
    } catch (error) {}
  };

  function filterOptionsByMyltivalues(options, value) {
    const filteredOptionMulti = options.filter((option) =>
      value.includes(option.value)
    );

    return filteredOptionMulti;
  }

  function filterOptionsByAgents(options, value) {
    if (!options || !value) {
      // Return a default option when either options or value is null or undefined
      return [{ value: "", label: "- Select -" }];
    }

    const optionsAgents = value.map((agent) => ({
      value: agent.uuid,
      label: agent.agentName,
    }));

    const filteredOptionMulti = options.filter((option) =>
      optionsAgents.some((agent) => agent.value === option.value)
    );

    return filteredOptionMulti;
  }
  const [airlineMultiSelectCounter, setAirlineMultiSelectCounter] = useState(0);
  const [
    flightProviderMultiSelectCounter,
    setFlightProviderMultiSelectCounter,
  ] = useState(0);
  const [fromCountrySelectCounter, setFromCountryMultiSelectCounter] =
    useState(0);
  const [fromAirportSelectCounter, setFromAirportMultiSelectCounter] =
    useState(0);
  const [toCountrySelectCounter, setToCountryMultiSelectCounter] = useState(0);
  const [toAirportSelectCounter, setToAirportMultiSelectCounter] = useState(0);
  function multiSelectValueSetter(
    multiSelectName,
    multiSelectData,
    calledCounter
  ) {
    if (multiSelectName === "airlineMultiSelect") {
      if (!formData.airline || formData.airline.length === 0) {
        if (calledCounter === 0) {
          return (formData.airline = filterOptionsByMyltivalues(
            multiSelectData,
            data.airline
          )); // Replace defaultValue with your desired value
        } else {
          return (formData.airline = filterOptionsByMyltivalues(
            multiSelectData,
            formData.airline
          )); // Replace defaultValue with your desired value
        }
      } else {
        // Apply the filtering logic
        return filterOptionsByMyltivalues(multiSelectData, formData.airline);
      }
    }
    if (multiSelectName === "flightProviderMultiSelect") {
      if (!formData.flightProvider || formData.flightProvider.length === 0) {
        if (calledCounter === 0) {
          return (formData.flightProvider = filterOptionsByMyltivalues(
            multiSelectData,
            data.flightProvider
          )); // Replace defaultValue with your desired value
        } else {
          return (formData.flightProvider = filterOptionsByMyltivalues(
            multiSelectData,
            formData.flightProvider
          )); // Replace defaultValue with your desired value
        }
      } else {
        // Apply the filtering logic
        return filterOptionsByMyltivalues(
          multiSelectData,
          formData.flightProvider
        );
      }
    }
    if (multiSelectName === "fromCountryMultiSelect") {
      if (!formData.fromCountry || formData.fromCountry.length === 0) {
        if (calledCounter === 0) {
          return (formData.fromCountry = filterOptionsByMyltivalues(
            multiSelectData,
            data.fromCountry
          )); // Replace defaultValue with your desired value
        } else {
          return (formData.fromCountry = filterOptionsByMyltivalues(
            multiSelectData,
            formData.fromCountry
          )); // Replace defaultValue with your desired value
        }
      } else {
        // Apply the filtering logic
        return filterOptionsByMyltivalues(
          multiSelectData,
          formData.fromCountry
        );
      }
    }
    if (multiSelectName === "fromAirportMultiSelect") {
      if (!formData.fromAirport || formData.fromAirport.length === 0) {
        if (calledCounter === 0) {
          return (formData.fromAirport = filterOptionsByMyltivalues(
            multiSelectData,
            data.fromAirport
          )); // Replace defaultValue with your desired value
        } else {
          return (formData.fromAirport = filterOptionsByMyltivalues(
            multiSelectData,
            formData.fromAirport
          )); // Replace defaultValue with your desired value
        }
      } else {
        // Apply the filtering logic
        return filterOptionsByMyltivalues(
          multiSelectData,
          formData.fromAirport
        );
      }
    }
    if (multiSelectName === "toCountryMultiSelect") {
      if (!formData.toCountry || formData.toCountry.length === 0) {
        if (calledCounter === 0) {
          return (formData.toCountry = filterOptionsByMyltivalues(
            multiSelectData,
            data.toCountry
          )); // Replace defaultValue with your desired value
        } else {
          return (formData.toCountry = filterOptionsByMyltivalues(
            multiSelectData,
            formData.toCountry
          )); // Replace defaultValue with your desired value
        }
      } else {
        // Apply the filtering logic
        return filterOptionsByMyltivalues(multiSelectData, formData.toCountry);
      }
    }
    if (multiSelectName === "toAirportMultiSelect") {
      if (!formData.toAirport || formData.toAirport.length === 0) {
        if (calledCounter === 0) {
          return (formData.fromAirport = filterOptionsByMyltivalues(
            multiSelectData,
            data.toAirport
          )); // Replace defaultValue with your desired value
        } else {
          return (formData.fromAirport = filterOptionsByMyltivalues(
            multiSelectData,
            formData.toAirport
          )); // Replace defaultValue with your desired value
        }
      } else {
        // Apply the filtering logic
        return filterOptionsByMyltivalues(multiSelectData, formData.toAirport);
      }
    }
  }
  return (
    <>
      <Header2
        title="EDIT QCT RULE"
        linkText1="QCT Rules List"
        linkText2="Edit QCT Rule"
        link1={Constants.URLConstants.FLIGHTFLIGHTQCTSEARCHRULES}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-4 form-group">
                <label>Journey Type: </label>
                <br />
                <div className="radioline1 mt-1">
                  <div className="checkbox checkbox-success checkbox-inline">
                    <input
                      type="checkbox"
                      name="journeyType"
                      value="One-way"
                      checked={formData.journeyType.includes("One-way")}
                      onChange={handleInputChange}
                      id="id_rate_policy"
                    />
                    <label htmlFor="oneway">&nbsp;One-Way</label>
                  </div>
                  <div className="checkbox checkbox-success checkbox-inline">
                    <input
                      type="checkbox"
                      name="journeyType"
                      value="Round-Trip"
                      checked={formData.journeyType.includes("Round-Trip")}
                      onChange={handleInputChange}
                      id="id_reissue"
                    />
                    <label htmlFor="round_trip">&nbsp;Round-Trip</label>
                  </div>
                  <div className="checkbox checkbox-success checkbox-inline">
                    <input
                      type="checkbox"
                      name="journeyType"
                      value="Multi-City"
                      checked={formData.journeyType.includes("Multi-City")}
                      onChange={handleInputChange}
                      id="id_reissue"
                    />
                    <label htmlFor="multi_city">&nbsp;Multi-City</label>
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
            <div className="row mt-2">
              <div className="col-md-3 form-group">
                <label>Rule Type: </label>
                <br />
                <div className="checkbox checkbox-success checkbox-inline mt-1">
                  <input
                    type="checkbox"
                    name="ruleType"
                    value={formData.ruleType}
                    checked={formData.ruleType}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="is_default">&nbsp;Default</label>
                </div>
              </div>
            </div>
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
                        value={multiSelectValueSetter(
                          "fromCountryMultiSelect",
                          countryOptions,
                          fromCountrySelectCounter
                        )}
                        onChange={(selectedOptions) => {
                          setFromCountryMultiSelectCounter(
                            (prevCounter) => prevCounter + 1
                          );
                          handleCountryChange(selectedOptions, "fromCountry");
                        }}
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
                        value={multiSelectValueSetter(
                          "fromAirportMultiSelect",
                          airportSelectOptions,
                          fromAirportSelectCounter
                        )}
                        isDisabled={!fromselectedCountry}
                        onChange={(selectedOptions) => {
                          setFromAirportMultiSelectCounter(
                            (prevCounter) => prevCounter + 1
                          );
                          handlefromAirportChange(
                            selectedOptions,
                            "fromAirport"
                          );
                        }}
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
                        value={multiSelectValueSetter(
                          "toCountryMultiSelect",
                          countryOptions,
                          toCountrySelectCounter
                        )}
                        isMulti
                        onChange={(selectedOptions) => {
                          setToCountryMultiSelectCounter(
                            (prevCounter) => prevCounter + 1
                          );
                          handletoCountryChange(selectedOptions, "toCountry");
                        }}
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
                        value={multiSelectValueSetter(
                          "toAirportMultiSelect",
                          toairportSelectOptions,
                          toAirportSelectCounter
                        )}
                        isMulti
                        isSearchable
                        onChange={(selectedOptions) => {
                          setToAirportMultiSelectCounter(
                            (prevCounter) => prevCounter + 1
                          );
                          handletoAirportChange(selectedOptions, "toAirport");
                        }}
                        placeholder="- Select Airport -"
                        className="custom-select"
                        noOptionsMessage={() => "No Airport Found"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-3 form-group">
                <label>Airline: </label>
                <MultiSelect
                  options={airlineOptions}
                  isSearchable
                  isMulti
                  value={multiSelectValueSetter(
                    "airlineMultiSelect",
                    airlineOptions,
                    airlineMultiSelectCounter
                  )}
                  placeholder="- Select Airline -"
                  className="custom-select"
                  noOptionsMessage={() => "No Airline Found"}
                  onChange={(selectedOptions) => {
                    setAirlineMultiSelectCounter(
                      (prevCounter) => prevCounter + 1
                    );
                    setFormData({
                      ...formData,
                      airline: selectedOptions.map((option) => option.value),
                    });
                  }}
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Flight Providers: </label>
                <MultiSelect
                  options={flightproviders_options}
                  isSearchable
                  isMulti
                  value={multiSelectValueSetter(
                    "flightProviderMultiSelect",
                    flightproviders_options,
                    flightProviderMultiSelectCounter
                  )}
                  placeholder="- Select Flight Providers -"
                  className="custom-select"
                  noOptionsMessage={() => "No Flight Providers Found"}
                  onChange={(selectedOptions) => {
                    setFlightProviderMultiSelectCounter(
                      (prevCounter) => prevCounter + 1
                    );
                    setFormData({
                      ...formData,
                      flightProvider: selectedOptions.map(
                        (option) => option.value
                      ),
                    });
                  }}
                />
              </div>
              <div className="col-md-3 form-group">
                <label className="valuefor_txt">Dates: </label>
                <div
                  className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12"
                  id="valid_from_date"
                >
                  <Flatpickr
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    options={{ dateFormat: "d-m-Y" }}
                    name="DateFrom"
                  />

                  <span class="input-group-addon">to</span>
                  <Flatpickr
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    options={{ dateFormat: "d-m-Y" }}
                    name="DateTo"
                  />
                  <span
                    className="input-group-addon"
                    id="dTrashBtn"
                    onClick={handleTrashClick}
                  >
                    <i className="fa fa-trash" />
                  </span>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-3 form-group" id="agent_list">
                <label>Agent: </label>
                <MultiSelect
                  options={agents}
                  isSearchable
                  isMulti
                  placeholder="- Select Agent -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Agent Found"}
                  value={formData.agents}
                  onChange={(selectedOptions) => {
                    // Update state and use the callback function to log the updated state
                    setFormData((prevFormData) => {
                      const updatedAgents = selectedOptions.map(
                        (option) => option
                      );

                      return {
                        ...prevFormData,
                        agents: updatedAgents,
                      };
                    });
                  }}
                />
              </div>
              <div className="col-md-3 form-group" id="book_pcc_list">
                <label>Booking PCC: </label>
                <MultiSelect
                  options={bookingPCC}
                  isSearchable
                  placeholder="- Select Booking PCC -"
                  className="custom-select"
                  value={formData.bookingPCC}
                  noOptionsMessage={() => "No Booking PCC Found"}
                  onChange={(selectedOption) =>
                    setFormData({
                      ...formData,
                      bookingPCC: selectedOption ? selectedOption : "",
                    })
                  }
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Ticketing PCC: </label>
                <MultiSelect
                  options={ticketingPCC}
                  isSearchable
                  placeholder="- Select Ticketing PCC -"
                  className="custom-select"
                  noOptionsMessage={() => "No Ticketing PCC Found"}
                  value={formData.ticketingPCC}
                  onChange={(selectedOption) =>
                    setFormData({
                      ...formData,
                      ticketingPCC: selectedOption ? selectedOption : "",
                    })
                  }
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Queue Identifier: </label>
                <input
                  type="text"
                  name="queueIdentifier"
                  value={formData.queueIdentifier}
                  onChange={handleInputChange}
                  maxLength={100}
                  className="form-control form-control-sm  required"
                />
              </div>
            </div>
            <div className="clearfix" />
            <div className="row mt-2">
              <div className="form-group col-md-12">
                <button
                  type="submit"
                  name="b1"
                  value="SUBMIT"
                  onclick=" submit_form(document.forms['qct_rules_module'],'insert_qct_rules') "
                  className="btn btn-dark btn-sm"
                >
                  <i className="fa fa-plus" />
                  &nbsp;Add QCT Rule
                </button>
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
export default connect(mapStateToProps)(FlightQctEditRule);
