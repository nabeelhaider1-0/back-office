/* eslint-disable react-hooks/exhaustive-deps */
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
import {
  getAllAgents,
  getAllBranches,
  getDATA,
  updateFlightRulesAll,
} from "../../../Apis/API";
import excelfilereader from "../../../constants/excelfilereader";
import excelFileContent from "../../../ExcelFiles/Airport_and_Airline_Code_List.xlsx";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Constants from "../../../constants/routes";
import { connect } from "react-redux";
import { ErrorApiAlert, filterOptionsByLabel } from "../../../constants/globalfunctions";
import ApiRoutes from "../../../constants/ApiRoutes"

const FlightEditRule = ({ data }) => {
  const [airportData, setAirportData] = useState([]);
  const [fromselectedCountry, setfromSelectedCountry] = useState(null);
  const [fromairportOptions, setfromAirportOptions] = useState([]);
  const [toselectedCountry, settoSelectedCountry] = useState(null);
  const [toairportOptions, settoAirportOptions] = useState([]);
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
    ruleAppliedOn: "",
    markupBy: "",
    charges: "",
    applyDifferentMarkupAncillary: "false",
  });

  const [branches, setBranches] = useState();
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
        setFormData((prevFormData) => {
          const updatedBranches = filterOptionsByBranches(
            options,
            data.branches
          );
          return {
            ...prevFormData,
            branches: updatedBranches,
          };
        });
      }
    } catch (error) {}
  };

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
      const dataa = await excelfilereader(excelFileContent);
     
      
      setAirlineData(dataa.AirlineList);
      setAirportData(dataa.AirportCodes);
    } catch (error) {}
  };
  function filterOptionsByValue(options, value) {
    const filteredOption = options.filter((option) => option.value === value);
    return filteredOption[0];
  }
  function filterOptionsByMyltivalues(options, value) {
    const filteredOptionMulti = options.filter((option) =>
      value.includes(option.value)
    );

    return filteredOptionMulti;
  }

  function filterOptionsByBranches(options, value) {
    if (!options || !value) {
      // Return a default option when either options or value is null or undefined
      return [{ value: "", label: "- Select -" }];
    }

    const optionbranches = value.map((branch) => ({
      value: branch.uuid,
      label: branch.branchName,
    }));

    const filteredOptionMulti = options.filter((option) =>
      optionbranches.some((branch) => branch.value === option.value)
    );

    return filteredOptionMulti;
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
  const navigateOnRefresh = useNavigate();
  useEffect(() => {
    getCurrencies();
    fetchExcelData();
    getAgents();
    getbranches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
  
      setFormData({
        ruleIdentifier: data.ruleIdentifier,
        ruleType: data.ruleType, // Assuming RATE_POLICY is selected by default
        markupDiscount: data.markupDiscount, // Assuming MARKUP is selected by default
        status: data.status, // Assuming Active status is selected by default
        branches: [],
        agents: [],
        currency: filterOptionsByLabel(currencyOptions, data.currency),
        fromCountry: data.fromCountry,
        fromAirport: data.fromAirport,
        toCountry: data.toCountry,
        toAirport: data.toAirport,
        airline: data.airline,
        classofTravel: data.classofTravel,
        fareClass: data.fareClass,
        flightProvider: data.flightProvider,
        availableSeatFrom: data.availableSeatFrom,
        availableSeatTo: data.availableSeatTo,
        bookingPolicy: data.bookingPolicy,
        journeyType: data.journeyType,
        lastMinute: data.lastMinute,
        paxRangeFrom: data.paxRangeFrom,
        paxRangeTo: data.paxRangeTo,
        BookingAmountRangeFrom: data.BookingAmountRangeFrom,
        BookingAmountRangeTo: data.BookingAmountRangeTo,
        ruleAppliedOn: data.ruleAppliedOn,
        markupBy: filterOptionsByValue(cancel_options, data.markupBy),
        charges: data.charges,
        applyDifferentMarkupAncillary: data.applyDifferentMarkupAncillary,
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
    if (
      data &&
      data.bookingDateFrom &&
      data.bookingDateTo &&
      data.travelDateFrom &&
      data.travelDateTo
    ) {
      setStartDate(datePassObject(data.bookingDateFrom));
      setEndDate(datePassObject(data.bookingDateTo));
      setStartDate1(datePassObject(data.travelDateFrom));
      setEndDate1(datePassObject(data.travelDateTo));
    } else {
      navigateOnRefresh(Constants.URLConstants.FLIGHTFLIGHTSEARCHRULES);
    }
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
        // setfromSelectedAirport(null);
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
        // settoSelectedAirport(null);
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
  function extractValuesFromArray(arr, prop) {
    return arr.map((item) => item.value);
  }
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

    formData.currency = formData.currency.value;
    formData.markupBy = formData.markupBy.value;
    formData.agents = extractValuesFromArray(formData.agents, "value");
    formData.branches = extractValuesFromArray(formData.branches, "value");

    formData.applyDifferentMarkupAncillary =
      formData.applyDifferentMarkupAncillary === true ? "true" : "false";
    try {
      const response = await updateFlightRulesAll(data.uuid, formData);

      if (response.data.statusCode === 200) {
        toast.success("Flight Rules Updated Successfully", {
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
          applyDifferentMarkupAncillary: "",
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

    setFormData({ ...formData, [name]: checked });
  };

  useEffect(() => {}, [formData]);

  const [airlineMultiSelectCounter, setAirlineMultiSelectCounter] = useState(0);
  const [classOfTravelMultiSelectCounter, setClassOfTravelMultiSelectCounter] =
    useState(0);
  const [fairClassMultiSelectCounter, setFairClassMultiSelectCounter] =
    useState(0);
  const [
    flightProviderMultiSelectCounter,
    setFlightProviderMultiSelectCounter,
  ] = useState(0);
  const [bookingPolicyMultiSelectCounter, setBookingPolicyrMultiSelectCounter] =
    useState(0);
  const [journeyTypeMultiSelectCounter, setJourneyTypeMultiSelectCounter] =
    useState(0);
  const [fromCountrySelectCounter, setFromCountryMultiSelectCounter] =
    useState(0);
  const [fromAirportSelectCounter, setFromAirportMultiSelectCounter] =
    useState(0);
  const [toCountrySelectCounter, setToCountryMultiSelectCounter] = useState(0);
  const [toAirportSelectCounter, setToAirportMultiSelectCounter] = useState(0);
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
    if (multiSelectName === "classOfTravelMultiSelect") {
      if (!formData.classofTravel || formData.classofTravel.length === 0) {
        if (calledCounter === 0) {
          return (formData.classofTravel = filterOptionsByMyltivalues(
            multiSelectData,
            data.classofTravel
          )); // Replace defaultValue with your desired value
        } else {
          return (formData.classofTravel = filterOptionsByMyltivalues(
            multiSelectData,
            formData.classofTravel
          )); // Replace defaultValue with your desired value
        }
      } else {
        // Apply the filtering logic
        return filterOptionsByMyltivalues(
          multiSelectData,
          formData.classofTravel
        );
      }
    }
    if (multiSelectName === "fairClassMultiSelect") {
      if (!formData.fareClass || formData.fareClass.length === 0) {
        if (calledCounter === 0) {
          return (formData.fareClass = filterOptionsByMyltivalues(
            multiSelectData,
            data.fareClass
          )); // Replace defaultValue with your desired value
        } else {
          return (formData.fareClass = filterOptionsByMyltivalues(
            multiSelectData,
            formData.fareClass
          )); // Replace defaultValue with your desired value
        }
      } else {
        // Apply the filtering logic
        return filterOptionsByMyltivalues(multiSelectData, formData.fareClass);
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
    if (multiSelectName === "bookingPolicyMultiSelect") {
      if (!formData.bookingPolicy || formData.bookingPolicy.length === 0) {
        if (calledCounter === 0) {
          return (formData.bookingPolicy = filterOptionsByMyltivalues(
            multiSelectData,
            data.bookingPolicy
          )); // Replace defaultValue with your desired value
        } else {
          return (formData.bookingPolicy = filterOptionsByMyltivalues(
            multiSelectData,
            formData.bookingPolicy
          )); // Replace defaultValue with your desired value
        }
      } else {
        // Apply the filtering logic
        return filterOptionsByMyltivalues(
          multiSelectData,
          formData.bookingPolicy
        );
      }
    }
    if (multiSelectName === "journeyTypeMultiSelect") {
      if (!formData.journeyType || formData.journeyType.length === 0) {
        if (calledCounter === 0) {
          return (formData.journeyType = filterOptionsByMyltivalues(
            multiSelectData,
            data.journeyType
          )); // Replace defaultValue with your desired value
        } else {
          return (formData.journeyType = filterOptionsByMyltivalues(
            multiSelectData,
            formData.journeyType
          )); // Replace defaultValue with your desired value
        }
      } else {
        // Apply the filtering logic
        return filterOptionsByMyltivalues(
          multiSelectData,
          formData.journeyType
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
        title={`EDIT RULE -- ${data.ruleIdentifier}`}
        linkText1="Rule List"
        linkText2="Edit Rule"
        link1={Constants.URLConstants.FLIGHTFLIGHTSEARCHRULES}
      />
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
                  className="custom-select"
                  noOptionsMessage={() => "No Branch Found"}
                  value={formData.branches}
                  onChange={(selectedOptions) => {
                    // Update state and use the callback function to log the updated state
                    setFormData((prevFormData) => {
                      const updatedBranches = selectedOptions.map(
                        (option) => option
                      );

                      return {
                        ...prevFormData,
                        branches: updatedBranches,
                      };
                    });
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
                  placeholder="- Select Agent -"
                  className="custom-select"
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

              <div className="col-md-3 form-group phps_row_0 padd_5">
                <label>Currency:</label>
                {/* Replace MultiSelect with your actual MultiSelect component */}
                <MultiSelect
                  options={currencyOptions}
                  isSearchable
                  placeholder="- Select Currency -"
                  className="custom-select"
                  noOptionsMessage={() => "No Currency Found"}
                  value={formData.currency}
                  onChange={(selectedOption) =>
                    setFormData({
                      ...formData,
                      currency: selectedOption ? selectedOption : "",
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
                        // isDisabled={!fromselectedCountry}
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
            <br />
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
              <div className="col-md-3 form-group phps_row_1 padd_5">
                <label>Class of Travel </label>
                <MultiSelect
                  options={travel_class_options}
                  isSearchable
                  isMulti
                  value={multiSelectValueSetter(
                    "classOfTravelMultiSelect",
                    travel_class_options,
                    classOfTravelMultiSelectCounter
                  )}
                  placeholder="- Select Travel Class -"
                  className="custom-select"
                  noOptionsMessage={() => "No Travel Class Found"}
                  onChange={(selectedOptions) => {
                    setClassOfTravelMultiSelectCounter(
                      (prevCounter) => prevCounter + 1
                    );
                    setFormData({
                      ...formData,
                      classofTravel: selectedOptions.map(
                        (option) => option.value
                      ),
                    });
                  }}
                />
              </div>
              <div className="col-md-3 form-group phps_row_0 padd_5">
                <label>Fare Class </label>
                <MultiSelect
                  options={fare_class_options}
                  isSearchable
                  isMulti
                  value={multiSelectValueSetter(
                    "fairClassMultiSelect",
                    fare_class_options,
                    fairClassMultiSelectCounter
                  )}
                  placeholder="- Select Fare Class -"
                  className="custom-select"
                  noOptionsMessage={() => "No Fare Class Found"}
                  onChange={(selectedOptions) => {
                    setFairClassMultiSelectCounter(
                      (prevCounter) => prevCounter + 1
                    );
                    setFormData({
                      ...formData,
                      fareClass: selectedOptions.map((option) => option.value),
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
                  value={multiSelectValueSetter(
                    "bookingPolicyMultiSelect",
                    refund_options,
                    bookingPolicyMultiSelectCounter
                  )}
                  placeholder="- Select Booking Policy -"
                  className="custom-select"
                  noOptionsMessage={() => "No Booking Policy Found"}
                  onChange={(selectedOptions) => {
                    setBookingPolicyrMultiSelectCounter(
                      (prevCounter) => prevCounter + 1
                    );
                    setFormData({
                      ...formData,
                      bookingPolicy: selectedOptions.map(
                        (option) => option.value
                      ),
                    });
                  }}
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Journey Type: </label>
                <MultiSelect
                  options={Journey_options}
                  isSearchable
                  isMulti
                  value={multiSelectValueSetter(
                    "journeyTypeMultiSelect",
                    Journey_options,
                    journeyTypeMultiSelectCounter
                  )}
                  placeholder="- Select Journey Type -"
                  className="custom-select"
                  noOptionsMessage={() => "No Journey Type Found"}
                  onChange={(selectedOptions) => {
                    setJourneyTypeMultiSelectCounter(
                      (prevCounter) => prevCounter + 1
                    );
                    setFormData({
                      ...formData,
                      journeyType: selectedOptions.map(
                        (option) => option.value
                      ),
                    });
                  }}
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
                          checked={formData.ruleAppliedOn === "GROSS_FARE"}
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
                      value={formData.markupBy}
                      onChange={(selectedOption) =>
                        setFormData({
                          ...formData,
                          markupBy: selectedOption ? selectedOption : "",
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
                      value={formData.charges}
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
                        checked={
                          formData.applyDifferentMarkupAncillary === "true" ||
                          formData.applyDifferentMarkupAncillary === true
                            ? true
                            : false
                        }
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
                      Update Rule
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
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps)(FlightEditRule);
