import React, { useCallback, useEffect, useRef, useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";

import Header2 from "../header2/header2";
import excelFileContent from "../../ExcelFiles/Airport_and_Airline_Code_List.xlsx";
import MultiSelect from "../reactMultiSelect";
import {
  SelHrsOptions,
  flightproviders_options,
  gender_options,
  minutesOptions,
  offlineflightbookingoptions,
  salutations,
  unit_options,
} from "../../constants/contants";
import { flightGetPccRules, getDATA } from "../../Apis/API";
import {
  ErrorApiAlert,
  RequiredFieldAlert,
} from "../../constants/globalfunctions";
import excelfilereader from "../../constants/excelfilereader";
import excelFileContentt from "../../ExcelFiles/worldcities.xlsx";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../state/action/commonApisActions";
import ApiRoutes from "../../constants/ApiRoutes";
const libraries = ["places"];
const googleMapsApiKey = import.meta.env.VITE_REACT_APP_PLACESAPIKEY;

const BookingAddOfflineBookingFlight = () => {
  const dispatch = useDispatch();
  const checkCountries = useSelector((state) => state?.countries?.countries);
  console.log(checkCountries, "check");
  const [agentsOptionsData, setAgentsOptionsData] = useState([]);
  const [agentsData, setAgentsData] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [rows, setRows] = useState([createEmptyRow()]);
  const [airlineData, setAirlineData] = useState([]);
  const [currencyOptions, setcurrencyOptions] = useState([]);
  const [countryOptions, setcountryOptions] = useState([]);
  const [pccdetails, setPccDetails] = useState([]);
  const [travelerdetailrow, Settravelerdetailrow] = useState([
    createEmptyRoww(),
  ]);
  const [pnrformData, setPnrFormData] = useState({
    agentuuid: "",
    flightprovider: "",
    pccdetails: "",
    pnr: "",
  });

  const searchBoxRefs = useRef([]);

  // Initialize the ref array for search boxes
  const setRef = useCallback((index, ref) => {
    if (ref) {
      // Ensure the ref array is properly updated
      searchBoxRefs.current[index] = ref;
    }
  }, []);
  const onLoadSearchBox = useCallback(
    (index) => (ref) => {
      // Debugging
      if (ref) {
        setRef(index, ref);
      }
    },
    [setRef]
  );

  // Handle places changed
  const onPlacesChanged = useCallback(
    (index, field) => () => {
      const searchBox = searchBoxRefs.current[index];
      if (!searchBox) {
        console.error(`SearchBox ref not found for index ${index}`);
        return;
      }

      const places = searchBox.getPlaces();
      if (!places || places.length === 0) return;

      const place = places[0];
      const address = place.formatted_address || place.name;

      setRows((prevRows) =>
        prevRows.map((row, i) =>
          i === index ? { ...row, [field]: address } : row
        )
      );
    },
    []
  );
  // ARRIVAL PLACES HANDLING
  const searchBoxArrlivalRefs = useRef([]);

  // Initialize the ref array for search boxes
  const setArrlivalRef = useCallback((index, ref) => {
    if (ref) {
      // Ensure the ref array is properly updated
      searchBoxArrlivalRefs.current[index] = ref;
    }
  }, []);
  const onLoadSearchArrivalBox = useCallback(
    (index) => (ref) => {
      // Debugging
      if (ref) {
        setArrlivalRef(index, ref);
      }
    },
    [setArrlivalRef]
  );

  // Handle places changed
  const onPlacesArrivalChanged = useCallback(
    (index, field) => () => {
      const searchBox = searchBoxArrlivalRefs.current[index];
      if (!searchBox) {
        return;
      }

      const places = searchBox.getPlaces();
      if (!places || places.length === 0) return;

      const place = places[0];
      const address = place.formatted_address || place.name;

      setRows((prevRows) =>
        prevRows.map((row, i) =>
          i === index ? { ...row, [field]: address } : row
        )
      );
    },
    []
  );

  const [formData, setFormData] = useState({
    contactSaluation: "",
    contactFirstName: "",
    contactLastName: "",
    contactemail: "",
    street: "",
    town: "",
    postalCode: "",
    province: "",
    contactCountry: "",
    phone: "",
    areacode: "",
    intcode: "",
    supplierCurrency: "",
    agentCurrency: "",
    currencyMultiplier: "",
    currentRate: "",
    supplierRate: "",
    agentMarkup: "",
    totalMarkup: "",
    bookingAmount: "",
    tripType: "",
    agentUuid: "",
    flightProvider: "",
    bookingPNR: "",
    ticketingPNR: "",
    oldbookingUuid: "",
    bookingStatus: "",
    flightpccUuid: "",
  });

  const [isOldBookingChecked, setIsOldBookingChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsOldBookingChecked(event.target.checked);
  };

  const handleTripTypeChange = (event) => {
    setFormData({ ...formData, tripType: event.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlepnrInputChange = (e) => {
    const { name, value } = e.target;
    setPnrFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function createEmptyRoww() {
    return {
      salutation: "",
      firstname: "",
      lastname: "",
      passengertype: "",
      dateofbirth: null,
      passportnumber: "",
      passportexpirydate: null,
      country: "",
      ticketnumber: "",
      airlinefrequentflyer: "",
      frequentflyernumber: "",
    };
  }

  function createEmptyRow() {
    return {
      airline: "",
      flightnumber: "",
      flightpnr: "",
      classoftravel: "",
      departure: "",
      arrival: "",
      departuredate: null,
      arrivaldate: null,
      departuretime: { hour: "", minute: "" },
      arrivaltime: { hour: "", minute: "" },
      travelduration: { hour: "", minute: "" },
      meal: "",
      baggageqty: "",
      baggageunit: "",
    };
  }

  const handleAddRoww = () => {
    console.log("TRAVELLER DETAILS ROW", travelerdetailrow);
    const lastRow = travelerdetailrow[travelerdetailrow.length - 1];
    console.log("Last Row Is ", lastRow);
    const isLastRowFilled = Object.values(lastRow).every(
      (value) => value !== "" && value !== null
    );

    if (isLastRowFilled) {
      if (travelerdetailrow.length < 5) {
        Settravelerdetailrow([...travelerdetailrow, createEmptyRoww()]);
      } else {
        alert("Maximum of 5 rows allowed");
      }
    } else {
      alert(
        "Please fill all fields in the current row before adding a new one"
      );
    }
  };

  const handleRemoveRoww = () => {
    Settravelerdetailrow(travelerdetailrow.slice(0, -1));
  };

  const handleChangee = (index, field, value) => {
    const newRows = travelerdetailrow.map((row, i) => {
      if (i === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    Settravelerdetailrow(newRows);
  };

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  const fetchCountryOptions = async () => {
    try {
      // Pass the Excel file content directly to the readExcelFile function
      const data = await excelfilereader(excelFileContentt);
      console.log(data, "hey");
      const uniqueCountries = Array.from(
        new Set(data.CountryCities.map((item) => item.country))
      ).map((country) => ({
        value: data.CountryCities.find((item) => item.country === country).iso3,
        label: country,
      }));
      setcountryOptions(uniqueCountries);
    } catch (error) {}
  };
  console.log(countryOptions, "hello");
  const getPccRules = async () => {
    try {
      // Set loading to true when fetching data
      const response = await flightGetPccRules();

      if (response.data.statusCode === 200) {
        const PccRulesData =
          response && response.data.data ? response.data.data : [];
        console.log(PccRulesData);
        setPccDetails(PccRulesData);
      }
    } catch (error) {
    } finally {
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  const getCurrencies = async () => {
    try {
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.CURRENCIES.CURRENCY);
      if (response.data.statusCode === 200) {
        const currencies =
          response && response.data.data ? response.data.data : [];

        const options = currencies.map((curr) => ({
          value: curr.uuid,
          label: curr.currency,
        }));
        setcurrencyOptions(options);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Currencies");
    } finally {
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  const fetchExcelData = async () => {
    try {
      // Pass the Excel file content directly to the readExcelFile function
      const data = await excelfilereader(excelFileContent);

      setAirlineData(data.AirlineList);
    } catch (error) {}
  };
  useEffect(() => {
    getPccRules();

    getCurrencies();
    fetchCountryOptions();
    fetchExcelData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const airlineOptions = airlineData.map((airline) => ({
    label: airline.Airlinename,
    value: airline.Airlinecode,
  }));
  const handleAddRow = () => {
    console.log(rows);
    const lastRow = rows[rows.length - 1];
    const isLastRowFilled = Object.values(lastRow).every((value) => {
      if (typeof value === "object" && value !== null) {
        return Object.values(value).every((v) => v !== "");
      }
      return value !== "";
    });

    if (isLastRowFilled) {
      setRows([...rows, createEmptyRow()]);
    } else {
      RequiredFieldAlert(
        "Please fill all fields in the current row before adding a new one",
        "",
        "warning"
      );
    }
  };

  const handleRemoveRow = () => {
    setRows(rows.slice(0, -1));
  };

  const handleChange = (index, field, value) => {
    const newRows = rows.map((row, i) => {
      if (i === index) {
        if (typeof field === "string") {
          return { ...row, [field]: value };
        } else if (typeof field === "object" && field.type === "time") {
          return {
            ...row,
            [field.name]: { ...row[field.name], [field.subfield]: value },
          };
        }
      }
      return row;
    });
    setRows(newRows);
  };

  const handleSingleSelectChange = (selectedOption, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption.value, // Assuming the option object has a 'value' property
    }));
  };
  const handlepnrSingleSelectChange = (selectedOption, name) => {
    setPnrFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption.value, // Assuming the option object has a 'value' property
    }));
  };
  const getAgents = async () => {
    try {
      const response = await getDATA(ApiRoutes.CUSTOMER_AGENTS.AGENT);
      if (response.data.statusCode === 200) {
        const agents = response && response.data.data ? response.data.data : [];
        console.log("AGENTS", agents);
        const options = agents
          .filter((agent) => agent.status === true)
          .map((agent) => ({
            value: agent.uuid,
            label: agent.agencyName,
          }));
        setAgentsData(agents);
        setAgentsOptionsData(options);
      }
    } catch (error) {
      ErrorApiAlert("Error Fetching Agents");
    }
  };
  const handleAgentChange = (selectedOption) => {
    setPnrFormData((prevState) => ({
      ...prevState,
      agentuuid: selectedOption.value, // Assuming the option object has a 'value' property
    }));

    setSelectedAgent(selectedOption ? selectedOption.value : null);
  };
  useEffect(() => {
    getAgents();
  }, []);

  const handleTrashClick = (type, name, index) => {
    if (type === "flight" && name === "departure") {
      // Create a new array based on the current state
      const newRows = [...rows];
      // Update the specific row
      newRows[index].departuredate = null;
      // Set the state with the new array
      setRows(newRows);
    } else if (type === "flight" && name === "arrival") {
      const newRows = [...rows];
      // Update the specific row
      newRows[index].arrivaldate = null;
      // Set the state with the new array
      setRows(newRows);
    } else if (type === "traveller" && name === "dob") {
      const newRows = [...travelerdetailrow];
      // Update the specific row
      newRows[index].dateofbirth = null;
      // Set the state with the new array
      Settravelerdetailrow(newRows);
    } else if (type === "traveller" && name === "passportexpdate") {
      const newRows = [...travelerdetailrow];
      // Update the specific row
      newRows[index].passportexpirydate = null;
      // Set the state with the new array
      Settravelerdetailrow(newRows);
    }
  };

  const getPccOptions = () => {
    // Find matching pccdetails based on the selected agent and flight provider
    console.log(formData.flightProvider);
    console.log(formData.agentUuid);
    const matchingPccDetails = pccdetails.filter(
      (detail) =>
        detail.flightProvider === formData.flightProvider &&
        detail.status === "Active" &&
        detail.agents.some((agent) => agent.uuid === formData.agentUuid)
    );

    // Map officeIds to the required options format
    const pccOptions = matchingPccDetails.flatMap((detail) =>
      detail.officeIds.map((office) => ({
        label: office.pccName,
        value: office.uuid,
      }))
    );

    return pccOptions;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.flightdetails = rows;
    formData.travelleradetails = travelerdetailrow;
    console.log("Complete Form Data Is ", formData);
  };
  const getPccOptionss = () => {
    // Find matching pccdetails based on the selected agent and flight provider

    const matchingPccDetails = pccdetails.filter(
      (detail) =>
        detail.flightProvider === pnrformData.flightprovider &&
        detail.status === "Active" &&
        detail.agents.some((agent) => agent.uuid === pnrformData.agentuuid)
    );

    // Map officeIds to the required options format
    const pccOptions = matchingPccDetails.flatMap((detail) =>
      detail.officeIds.map((office) => ({
        label: office.pccName,
        value: office.uuid,
      }))
    );

    return pccOptions;
  };

  const pccOptions = getPccOptions();
  const pccOptionss = getPccOptionss();

  const selectedAgentData = agentsData.find(
    (agent) => agent.uuid === selectedAgent
  );
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="ADD OFFLINE FLIGHT BOOKING"
          linkText1="Search Bookings"
          linkText2="Add Offline Flight Booking"
          link1="/"
        />

        <form onSubmit={(e) => handleSubmit(e)}>
          <div
            className="tab-content panel-body"
            style={{
              border: "1px solid #e4e5e7",
              paddingTop: "7px",
              paddingBottom: "23px",
              paddingLeft: "13px",
              paddingRight: "20px",
              borderTop: "2px solid #FF5015!important",
            }}
          >
            <div
              id="tab2"
              className="tab-pane active ui-tabs-panel ui-widget-content ui-corner-bottom"
              aria-labelledby="ui-id-1"
              role="tabpanel"
              aria-hidden="false"
            >
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Agent</label>
                  <MultiSelect
                    options={agentsOptionsData}
                    isSearchable
                    onChange={handleAgentChange}
                    placeholder="- Select Agent -"
                    noOptionsMessage={() => "No Agent Found"}
                    className="custom-select required"
                    required
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Flight Provider</label>

                  <MultiSelect
                    options={flightproviders_options}
                    value={flightproviders_options.find(
                      (option) => option.value === pnrformData.flightprovider
                    )}
                    onChange={(selectedOption) =>
                      handlepnrSingleSelectChange(
                        selectedOption,
                        "flightprovider"
                      )
                    }
                    isSearchable
                    placeholder="- Select  -"
                    noOptionsMessage={() => "No Option Found"}
                    className="custom-select required"
                    required
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>PCC Details</label>
                  <MultiSelect
                    options={pccOptionss}
                    value={pccOptionss.find(
                      (option) => option.value === pnrformData.pccdetails
                    )}
                    onChange={(selectedOption) =>
                      handlepnrSingleSelectChange(selectedOption, "pccdetails")
                    }
                    isSearchable
                    placeholder="- Select -"
                    noOptionsMessage={() => "No Option Found"}
                    className="custom-select required"
                    required
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>PNR</label>
                  <input
                    type="text"
                    name="pnr"
                    id="pnr"
                    value={pnrformData.pnr}
                    onChange={handlepnrInputChange}
                    required
                    className="required form-control form-control-sm required"
                  />
                </div>
                {/* <div class="form-group col-md-3">
          <label>Status</label>
          <select name=sel_booking_status class="dropdown_medium form-control selectpicker show-menu-arrow" id="sel_booking_status">
              <option value="">--Select Status--</option>
              <option label="Confirmed" value="confirmed">Confirmed</option>
    <option label="Ticketed" value="vouchered">Ticketed</option>
    
          </select>
      </div> */}
                {/* 11/2/2013 added by vrushali  */}
                {/* 11/2/2013 added by vrushali  */}
                <div className="form-group col-md-4 mt-3">
                  <label>Agent Code</label>
                  <br />
                  <span id="agent_code"> {selectedAgentData?.uuid || ""}</span>
                </div>
                <div className="form-group col-md-4 mt-3">
                  <label>Agent Name</label>
                  <br />
                  <span id="first_name">
                    {selectedAgentData?.agentName || ""}
                  </span>
                </div>

                <div className="form-group col-md-4 mt-3">
                  <label>Agency Name</label>
                  <br />
                  <span id="agency_name">
                    {selectedAgentData?.agencyName || ""}
                  </span>
                </div>
                <div className="form-group col-md-3 mt-2">
                  <button
                    className="btn btn-outline-secondary btn-sm from-group"
                    type="button"
                    name="send"
                    id="send"
                    value="Send"
                    onclick="Javascript pnr_search();"
                  >
                    <i className="fa fa-floppy-o" />
                    &nbsp;Retrieve PNR
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-content panel-body"
            style={{
              border: "1px solid #e4e5e7",
              paddingTop: "7px",
              paddingBottom: "23px",
              paddingLeft: "13px",
              paddingRight: "20px",
              borderTop: "2px solid #FF5015!important",
            }}
          >
            <div id="tab1" className="tab-pane active">
              <div id="flight_data" className="flight_data">
                <div className="form-group mt-2">
                  <h5>Booking Details</h5>
                </div>
                <div className="row">
                  <div className="form-group col-md-12">
                    <label>Trip Type</label>
                    <br />
                    <div className="radioline1">
                      <div className="radio radio-success radio-inline">
                        <input
                          type="radio"
                          id="rd_oneway"
                          name="trip_type"
                          value="One Way"
                          onChange={handleTripTypeChange}
                        />
                        <label htmlFor="rd_oneway">One Way</label>
                      </div>
                      <div className="radio radio-success radio-inline">
                        <input
                          type="radio"
                          id="rd_round_trip"
                          name="trip_type"
                          value="Round Trip"
                          onChange={handleTripTypeChange}
                        />
                        <label htmlFor="rd_round_trip">Round Trip</label>
                      </div>
                      <div className="radio radio-success radio-inline">
                        <input
                          type="radio"
                          id="rd_multi_city"
                          name="trip_type"
                          value="Multi City"
                          onChange={handleTripTypeChange}
                        />
                        <label htmlFor="rd_multi_city">Multi City</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md-12 mt-2">
                    <div className="row">
                      <div className="col-md-3" style={{ width: "auto" }}>
                        <input
                          type="checkbox"
                          name="oldBookingId"
                          id="oldBookingId"
                          onChange={handleCheckboxChange}
                        />
                        <label
                          htmlFor="oldBookingId"
                          style={{ verticalAlign: "middle" }}
                        >
                          &nbsp;&nbsp;Old Booking
                        </label>
                      </div>
                      {isOldBookingChecked && (
                        <div className="col-md-2" id="old_booking_id_section">
                          <label>Old Booking ID</label>
                          <input
                            type="text"
                            name="oldbookingUuid"
                            id="oldbookingUuid"
                            value={formData.oldbookingUuid}
                            onChange={handleInputChange}
                            className="required form-control"
                            placeholder="Old Booking ID"
                            required={isOldBookingChecked}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* <div class="form-group col-md-3">
              <label>Booking Date</label><br />
              <input type="text" name="agent_name" id="agent_name" value="27-Jul-2023 08:00:37" readonly="readonly" class="form-control"/>
          </div> */}
                <div className="row mt-2">
                  <div className="form-group col-md-2">
                    <label>Agent</label>
                    <MultiSelect
                      options={agentsOptionsData}
                      isSearchable
                      value={agentsOptionsData.find(
                        (option) => option.value === formData.agentUuid
                      )}
                      onChange={(selectedOption) =>
                        handleSingleSelectChange(selectedOption, "agentUuid")
                      }
                      placeholder="- Select Agent -"
                      noOptionsMessage={() => "No Agent Found"}
                      className="custom-select required"
                      required
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label>Flight Provider</label>

                    <MultiSelect
                      options={flightproviders_options}
                      value={flightproviders_options.find(
                        (option) => option.value === formData.flightProvider
                      )}
                      onChange={(selectedOption) =>
                        handleSingleSelectChange(
                          selectedOption,
                          "flightProvider"
                        )
                      }
                      isSearchable
                      placeholder="- Select Supplier -"
                      noOptionsMessage={() => "No Supplier Found"}
                      className="custom-select required"
                      required
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label>PCC Details</label>

                    <MultiSelect
                      options={pccOptions}
                      value={pccOptions.find(
                        (option) => option.value === formData.flightpccUuid
                      )}
                      onChange={(selectedOption) =>
                        handleSingleSelectChange(
                          selectedOption,
                          "flightpccUuid"
                        )
                      }
                      isSearchable
                      placeholder="- Select -"
                      noOptionsMessage={() => "No Option Found"}
                      className="custom-select required"
                      required
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label>Booking PNR</label>
                    <input
                      type="text"
                      name="bookingPNR"
                      id="bookingPNR"
                      value={formData.bookingPNR}
                      onChange={handleInputChange}
                      required
                      className="form-control form-control-sm required "
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label>Ticketing PNR</label>
                    <input
                      type="text"
                      name="ticketingPNR"
                      id="ticketingPNR"
                      value={formData.ticketingPNR}
                      onChange={handleInputChange}
                      required
                      className="form-control form-control-sm required "
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label>Booking Status </label>
                    <MultiSelect
                      options={offlineflightbookingoptions}
                      isSearchable
                      value={offlineflightbookingoptions.find(
                        (option) => option.value === formData.bookingStatus
                      )}
                      onChange={(selectedOption) =>
                        handleSingleSelectChange(
                          selectedOption,
                          "bookingStatus"
                        )
                      }
                      placeholder="- Select -"
                      noOptionsMessage={() => "No Option Found"}
                      className="custom-select required"
                      required
                    />
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <br />
                </div>
                <div className="form-group">
                  <h5>Flight Details </h5>
                </div>
                <div className="col-md-12">
                  <LoadScript
                    googleMapsApiKey={googleMapsApiKey}
                    libraries={libraries}
                  >
                    {rows.map((row, index) => (
                      <div key={index} className="row form-group mt-4">
                        <div className="row">
                          <div className="form-group col-md-2">
                            <label>Airline</label>
                            <MultiSelect
                              options={airlineOptions}
                              isSearchable
                              placeholder="- Select Airline -"
                              className="custom-select required"
                              noOptionsMessage={() => "No Airline Found"}
                              value={airlineOptions.find(
                                (option) => option.value === row.airline
                              )}
                              onChange={(selectedOption) =>
                                handleChange(
                                  index,
                                  "airline",
                                  selectedOption.value
                                )
                              }
                              required
                            />
                          </div>
                          <div className="form-group col-md-2">
                            <label>Flight Number</label>
                            <input
                              type="text"
                              name={`flight_info[${index}][flightnumber]`}
                              id={`flightnumber_${index}`}
                              maxLength={5}
                              className="required form-control form-control-sm"
                              value={row.flightnumber}
                              required
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "flightnumber",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="form-group col-md-2">
                            <label>Flight PNR</label>
                            <input
                              type="text"
                              name={`flight_info[${index}][flightpnr]`}
                              id={`flightpnr_${index}`}
                              maxLength={20}
                              className="required form-control form-control-sm"
                              value={row.flightpnr}
                              required
                              onChange={(e) =>
                                handleChange(index, "flightpnr", e.target.value)
                              }
                            />
                          </div>
                          <div className="form-group col-md-2">
                            <label>Class Of Travel</label>
                            <input
                              type="text"
                              name={`flight_info[${index}][classoftravel]`}
                              id={`classoftravel_${index}`}
                              maxLength={15}
                              required
                              className="required form-control form-control-sm"
                              value={row.classoftravel}
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "classoftravel",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="form-group col-md-2">
                            <label>Departure</label>

                            <StandaloneSearchBox
                              onLoad={onLoadSearchBox(index)}
                              onPlacesChanged={onPlacesChanged(
                                index,
                                "departure"
                              )}
                            >
                              <input
                                className="clearable form-control form-control-sm required"
                                type="text"
                                name={`flight_info[${index}][departure]`}
                                id={`departure_${index}`}
                                required
                                placeholder="Any worldwide city or airport"
                                // value={row.departure}
                                // onChange={(e) => handleChange(index, 'departure', e.target.value)}
                              />
                            </StandaloneSearchBox>
                          </div>
                          <div className="form-group col-md-2">
                            <label>Arrival</label>

                            <StandaloneSearchBox
                              onLoad={onLoadSearchArrivalBox(index)}
                              onPlacesChanged={onPlacesArrivalChanged(
                                index,
                                "arrival"
                              )}
                            >
                              <input
                                className="clearable form-control required form-control-sm"
                                type="text"
                                // ref={(ref) => { searchBoxRefsArrival.current[index] = ref; }}
                                name={`flight_info[${index}][arrival]`}
                                id={`arrival_${index}`}
                                placeholder="Any worldwide city or airport"
                                // value={row.arrival}
                                required
                                // onChange={(e) => handleChange(index, 'arrival', e.target.value)}
                              />
                            </StandaloneSearchBox>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="form-group col-md-2">
                            <label>Departure Date</label>
                            {/* <Flatpickr
                value={row.departuredate}
                onChange={(date) => handleChange(index, 'departuredate', date)}
                options={{ dateFormat: "Y-m-d" }}
                className="form-control form-control-sm"
              /> */}
                            <div
                              className="input-group date col-md-12 col-sm-12 col-xs-12 departure_date required"
                              id="departure_date"
                            >
                              <Flatpickr
                                value={row.departuredate}
                                onChange={(date) =>
                                  handleChange(index, "departuredate", date)
                                }
                                options={{ dateFormat: "Y-m-d" }}
                                style={{ width: "142px" }}
                                required
                              />
                              {/* <span className="input-group-addon"><i className="fa fa-th" /></span> */}
                              <span
                                className="input-group-addon pointer"
                                id="departTrashBtn"
                                onClick={() =>
                                  handleTrashClick("flight", "departure", index)
                                }
                              >
                                <i className="fa fa-trash" />
                              </span>
                            </div>
                          </div>

                          <div className="form-group col-md-2">
                            <label>Arrival Date</label>

                            <div
                              className="input-group date col-md-12 col-sm-12 col-xs-12 departure_date required"
                              id="departure_date"
                            >
                              <Flatpickr
                                value={row.arrivaldate}
                                onChange={(date) =>
                                  handleChange(index, "arrivaldate", date)
                                }
                                options={{ dateFormat: "Y-m-d" }}
                                required
                                style={{ width: "142px" }}
                              />
                              {/* <span className="input-group-addon"><i className="fa fa-th" /></span> */}
                              <span
                                className="input-group-addon pointer"
                                id="departTrashBtn"
                                onClick={() =>
                                  handleTrashClick("flight", "arrival", index)
                                }
                              >
                                <i className="fa fa-trash" />
                              </span>
                            </div>
                          </div>
                          <div className="form-group col-md-2">
                            <label>Departure Time (hh:mm)</label>
                            <div
                              className="mt-2"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <MultiSelect
                                options={SelHrsOptions}
                                isSearchable
                                placeholder="00"
                                className="custom-select required w-50"
                                value={SelHrsOptions.find(
                                  (option) =>
                                    option.value === row.departuretime.hour
                                )}
                                onChange={(selectedOption) =>
                                  handleChange(
                                    index,
                                    {
                                      type: "time",
                                      name: "departuretime",
                                      subfield: "hour",
                                    },
                                    selectedOption.value
                                  )
                                }
                                noOptionsMessage={() => "No Hrs Found"}
                                required
                              />
                              <MultiSelect
                                options={minutesOptions}
                                isSearchable
                                placeholder="00"
                                className="custom-select required w-50"
                                required
                                value={minutesOptions.find(
                                  (option) =>
                                    option.value === row.departuretime.minute
                                )}
                                onChange={(selectedOption) =>
                                  handleChange(
                                    index,
                                    {
                                      type: "time",
                                      name: "departuretime",
                                      subfield: "minute",
                                    },
                                    selectedOption.value
                                  )
                                }
                                noOptionsMessage={() => "No Mins Found"}
                              />
                            </div>
                          </div>
                          <div className="form-group col-md-2">
                            <label>Arrival Time (hh:mm)</label>
                            <div
                              className="mt-2"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <MultiSelect
                                options={SelHrsOptions}
                                isSearchable
                                placeholder="00"
                                className="custom-select required w-50"
                                value={SelHrsOptions.find(
                                  (option) =>
                                    option.value === row.arrivaltime.hour
                                )}
                                onChange={(selectedOption) =>
                                  handleChange(
                                    index,
                                    {
                                      type: "time",
                                      name: "arrivaltime",
                                      subfield: "hour",
                                    },
                                    selectedOption.value
                                  )
                                }
                                noOptionsMessage={() => "No Hrs Found"}
                                required
                              />
                              <MultiSelect
                                options={minutesOptions}
                                isSearchable
                                placeholder="00"
                                className="custom-select required w-50"
                                value={minutesOptions.find(
                                  (option) =>
                                    option.value === row.arrivaltime.minute
                                )}
                                onChange={(selectedOption) =>
                                  handleChange(
                                    index,
                                    {
                                      type: "time",
                                      name: "arrivaltime",
                                      subfield: "minute",
                                    },
                                    selectedOption.value
                                  )
                                }
                                noOptionsMessage={() => "No Mins Found"}
                                required
                              />
                            </div>
                          </div>
                          <div className="form-group col-md-2">
                            <label>Travel Duration (hh:mm)</label>
                            <div
                              className="mt-2"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <MultiSelect
                                options={SelHrsOptions}
                                isSearchable
                                placeholder="00"
                                className="custom-select required w-50"
                                value={SelHrsOptions.find(
                                  (option) =>
                                    option.value === row.travelduration.hour
                                )}
                                onChange={(selectedOption) =>
                                  handleChange(
                                    index,
                                    {
                                      type: "time",
                                      name: "travelduration",
                                      subfield: "hour",
                                    },
                                    selectedOption.value
                                  )
                                }
                                noOptionsMessage={() => "No Hrs Found"}
                                required
                              />
                              <MultiSelect
                                options={minutesOptions}
                                isSearchable
                                placeholder="00"
                                className="custom-select required w-50"
                                value={minutesOptions.find(
                                  (option) =>
                                    option.value === row.travelduration.minute
                                )}
                                onChange={(selectedOption) =>
                                  handleChange(
                                    index,
                                    {
                                      type: "time",
                                      name: "travelduration",
                                      subfield: "minute",
                                    },
                                    selectedOption.value
                                  )
                                }
                                noOptionsMessage={() => "No Mins Found"}
                                required
                              />
                            </div>
                          </div>
                          <div className="form-group col-md-2">
                            <label>Meal</label>
                            <input
                              type="text"
                              name={`flight_info[${index}][meal]`}
                              id={`meal_${index}`}
                              maxLength={100}
                              className="required form-control form-control-sm"
                              value={row.meal}
                              onChange={(e) =>
                                handleChange(index, "meal", e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="form-group col-md-2">
                            <label>Baggage Qty</label>
                            <input
                              type="text"
                              name={`flight_info[${index}][baggageqty]`}
                              id={`baggageqty_${index}`}
                              maxLength={100}
                              className="required form-control form-control-sm"
                              value={row.baggageqty}
                              required
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "baggageqty",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="form-group col-md-2">
                            <label>Baggage Unit</label>
                            <MultiSelect
                              options={unit_options}
                              isSearchable
                              placeholder="- Select Unit -"
                              className="custom-select required"
                              required
                              value={unit_options.find(
                                (option) => option.value === row.baggageunit
                              )}
                              onChange={(selectedOption) =>
                                handleChange(
                                  index,
                                  "baggageunit",
                                  selectedOption.value
                                )
                              }
                              noOptionsMessage={() => "No Unit Found"}
                            />
                          </div>
                          <div className="row mt-2">
                            <div className="col-md-2">
                              {index === rows.length - 1 && rows.length < 4 && (
                                <button
                                  type="button"
                                  className="btn mt-4"
                                  onClick={handleAddRow}
                                  style={{
                                    backgroundColor: "#FF5015",
                                    border: "none",
                                    color: "white",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <i className="fa fa-plus"></i>
                                </button>
                              )}
                              {index === rows.length - 1 && rows.length > 1 && (
                                <button
                                  type="button"
                                  className="btn mt-4 ml-2"
                                  onClick={handleRemoveRow}
                                  style={{
                                    backgroundColor: "#C0392B",
                                    border: "none",
                                    color: "white",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginLeft: "8px",
                                  }}
                                >
                                  <i className="fa fa-minus"></i>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-5"></div>
                        <hr />
                      </div>
                    ))}
                  </LoadScript>
                </div>
                <div className="col-md-12">
                  <br />
                </div>
                <div className="row form-group">
                  <div className="form-group col-md-3">
                    <label>Supplier Currency</label>
                    <MultiSelect
                      options={currencyOptions}
                      isSearchable
                      value={currencyOptions.find(
                        (option) => option.value === formData.supplierCurrency
                      )}
                      onChange={(selectedOption) =>
                        handleSingleSelectChange(
                          selectedOption,
                          "supplierCurrency"
                        )
                      }
                      placeholder="- Select Currency -"
                      noOptionsMessage={() => "No Currency Found"}
                      className="custom-select required"
                      required
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Agent Currency </label>
                    <MultiSelect
                      options={currencyOptions}
                      isSearchable
                      value={currencyOptions.find(
                        (option) => option.value === formData.agentCurrency
                      )}
                      onChange={(selectedOption) =>
                        handleSingleSelectChange(
                          selectedOption,
                          "agentCurrency"
                        )
                      }
                      placeholder="- Select Currency -"
                      noOptionsMessage={() => "No Currency Found"}
                      className="custom-select required"
                      required
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Currency Multiplier</label>
                    <div className="input-group date col-md-12 col-xs-12">
                      <input
                        type="text"
                        name="currencyMultiplier"
                        id="currencyMultiplier"
                        value={formData.currencyMultiplier}
                        onChange={handleInputChange}
                        className="form-control form-control-sm"
                      />
                      <span className="input-group-addon">
                        &nbsp;<span id="nc1"> </span> To <span id="dc1"> </span>
                        &nbsp;
                      </span>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <label>Current Rate</label>
                    <br />
                    <input
                      type="text"
                      name="currentRate"
                      id="currentRate"
                      value={formData.currentRate}
                      onChange={handleInputChange}
                      size={5}
                      readOnly="readonly"
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div style={{ display: "none" }}>
                    <div className="form-group col-md-3">
                      <label>Basecurrency Multiplier</label>
                      <input
                        type="text"
                        name="basecurrency_multiplier"
                        id="basecurrency_multiplier"
                        onblur="extractNumber(this,5,false);"
                        onkeyup="extractNumber(this,6,false);"
                      />
                      <span id="dc2" /> To USD
                    </div>
                    <div className="form-group col-md-3">
                      <label>Current Rate</label>
                      <br />
                      <span id="currency_conversion_2" />
                    </div>
                    <div className="form-group col-md-3">
                      <label>Basecurrency Multiplier Native</label>
                      <input
                        type="text"
                        name="basecurrency_multiplier_native"
                        id="basecurrency_multiplier_native"
                        onblur="extractNumber(this,5,false);"
                        onkeyup="extractNumber(this,6,false);"
                      />
                      <span id="nc2"> </span> To USD
                    </div>
                    <div className="form-group col-md-3">
                      <label>Current Rate</label>
                      <br />
                      <span id="currency_conversion_3" />
                    </div>
                    <div className="form-group col-md-3">
                      <label>
                        Booking Currency To Agent Currency Multiplier
                      </label>
                      <input
                        type="text"
                        name="agent_currency_multiplier"
                        id="agent_currency_multiplier"
                        onblur="extractNumber(this,5,false);"
                        onkeyup="extractNumber(this,6,false);"
                      />
                      <span id="dc4"> </span> To <span id="dc5" />
                    </div>
                    <div className="form-group col-md-3">
                      <label>Current Rate</label>
                      <br />
                      <span id="currency_conversion_4" />
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="form-group col-md-3">
                    <label>Supplier Rate</label>
                    <input
                      type="text"
                      name="supplierRate"
                      id="supplierRate"
                      value={formData.supplierRate}
                      onChange={handleInputChange}
                      required
                      className="required form-control form-control-sm"
                    />
                    <span id="nc4" />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Agent Mark-up (%)</label>
                    <input
                      type="text"
                      name="agentMarkup"
                      id="agentMarkup"
                      value={formData.agentMarkup}
                      onChange={handleInputChange}
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div
                    className="form-group col-md-3"
                    style={{ display: "none" }}
                  >
                    <label>Sub Agent Mark-up (%)</label>
                    <input
                      type="text"
                      name="txt_sub_agent_markup"
                      id="txt_sub_agent_markup"
                      size={5}
                      onchange="cal_total_markup();"
                      onblur="extractNumber(this,2,false);"
                      onkeyup="extractNumber(this,2,false);"
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Total Mark-up(%)</label>
                    <input
                      type="text"
                      n
                      size={5}
                      readOnly="readonly"
                      name="totalMarkup"
                      id="totalMarkup"
                      value={formData.totalMarkup}
                      onChange={handleInputChange}
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Booking Amount</label>
                    <input
                      type="text"
                      name="bookingAmount"
                      id="bookingAmount"
                      value={formData.bookingAmount}
                      onChange={handleInputChange}
                      readOnly="readonly"
                      className="form-control form-control-sm"
                    />
                    <span id="dc6"> </span>
                  </div>
                </div>
                {/* <div class="row">
          <div class="form-group col-md-3" >
              <label>No. Of Passanger</label>
              <select name='sel_adults' id="sel_adults" class="form-control selectpicker show-menu-arrow" onchange="set_pax();">
                                 <option value='' 
                     selected >
                                        </option>
                                </select>
             </div>
      </div> */}
                <hr />
                <div className="form-group">
                  <h5>Traveller Details </h5>
                </div>
                <input
                  type="hidden"
                  defaultValue={0}
                  name="total_passanger"
                  id="total_passanger"
                />
                <div>
                  {travelerdetailrow.map((row, index) => (
                    <div key={index} className="row" id="pax_details">
                      <div className="form-group col-md-3">
                        <label>Salutation</label>
                        <MultiSelect
                          options={salutations}
                          isSearchable
                          placeholder="- Title -"
                          noOptionsMessage={() => "No Option Found"}
                          className="custom-select required"
                          required
                          value={salutations.find(
                            (option) => option.value === row.salutation
                          )}
                          onChange={(selectedOption) =>
                            handleChangee(
                              index,
                              "salutation",
                              selectedOption.value
                            )
                          }
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>First Name</label>
                        <input
                          type="text"
                          id={`fname_${index}`}
                          name={`passangers[firstname][${index}]`}
                          className="txt fname form-control form-control-sm required"
                          placeholder="First Name"
                          required
                          value={row.firstname}
                          onChange={(e) =>
                            handleChangee(index, "firstname", e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Last Name</label>
                        <input
                          type="text"
                          id={`lname_${index}`}
                          name={`passangers[lastname][${index}]`}
                          required
                          className="txt lname form-control form-control-sm required"
                          placeholder="Last Name"
                          value={row.lastname}
                          onChange={(e) =>
                            handleChangee(index, "lastname", e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Passenger Type</label>
                        <MultiSelect
                          options={gender_options}
                          isSearchable
                          required
                          placeholder="- Select Gender -"
                          noOptionsMessage={() => "No Option Found"}
                          className="custom-select required"
                          value={gender_options.find(
                            (option) => option.value === row.passengertype
                          )}
                          onChange={(selectedOption) =>
                            handleChangee(
                              index,
                              "passengertype",
                              selectedOption.value
                            )
                          }
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Date Of Birth</label>

                        <div
                          className="input-group date col-md-12 col-sm-12 col-xs-12 dob_date required"
                          id="departure_date"
                        >
                          <Flatpickr
                            value={row.dateofbirth}
                            onChange={(date) =>
                              handleChangee(index, "dateofbirth", date)
                            }
                            options={{ dateFormat: "Y-m-d" }}
                            required
                            style={{ width: "250px" }}
                          />
                          {/* <span className="input-group-addon"><i className="fa fa-th" /></span> */}
                          <span
                            className="input-group-addon pointer"
                            id="departTrashBtn"
                            onClick={() =>
                              handleTrashClick("traveller", "dob", index)
                            }
                          >
                            <i className="fa fa-trash" />
                          </span>
                        </div>
                      </div>
                      <div className="form-group col-md-3">
                        <label>Passport Number</label>
                        <input
                          type="text"
                          id={`passenger_passport_no_${index}`}
                          name={`passangers[passport_no][${index}]`}
                          className="txt float_left form-control form-control-sm required"
                          placeholder="Passport Number"
                          required
                          value={row.passportnumber}
                          onChange={(e) =>
                            handleChangee(
                              index,
                              "passportnumber",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Passport Expiry Date</label>
                        <div
                          className="input-group date col-md-12 col-sm-12 col-xs-12 dob_date"
                          id="departure_date"
                        >
                          <Flatpickr
                            value={row.passportexpirydate}
                            onChange={(date) =>
                              handleChangee(index, "passportexpirydate", date)
                            }
                            options={{ dateFormat: "Y-m-d" }}
                            style={{ width: "250px" }}
                          />
                          {/* <span className="input-group-addon"><i className="fa fa-th" /></span> */}
                          <span
                            className="input-group-addon pointer"
                            id="departTrashBtn"
                            onClick={() =>
                              handleTrashClick(
                                "traveller",
                                "passportexpdate",
                                index
                              )
                            }
                          >
                            <i className="fa fa-trash" />
                          </span>
                        </div>
                      </div>
                      <div className="form-group col-md-3">
                        <label>Country</label>
                        <MultiSelect
                          options={countryOptions}
                          isSearchable
                          placeholder="- Select a country -"
                          noOptionsMessage={() => "No Country Found"}
                          className="custom-select required"
                          required
                          value={countryOptions.find(
                            (option) => option.value === row.country
                          )}
                          onChange={(selectedOption) =>
                            handleChangee(
                              index,
                              "country",
                              selectedOption.value
                            )
                          }
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Ticket Number</label>
                        <input
                          type="text"
                          id={`ticket_number_${index}`}
                          name={`passangers[ticket_number][${index}]`}
                          className="txt float_left ticket_number form-control form-control-sm"
                          placeholder="Ticket Number"
                          value={row.ticketnumber}
                          onChange={(e) =>
                            handleChangee(index, "ticketnumber", e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Airline (Frequent Flyer)</label>
                        <MultiSelect
                          options={airlineOptions}
                          isSearchable
                          placeholder="- Select Airline -"
                          className="custom-select required"
                          noOptionsMessage={() => "No Airline Found"}
                          value={airlineOptions.find(
                            (option) =>
                              option.value === row.airlinefrequentflyer
                          )}
                          onChange={(selectedOption) =>
                            handleChangee(
                              index,
                              "airlinefrequentflyer",
                              selectedOption.value
                            )
                          }
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Frequent Flyer Number</label>
                        <input
                          type="text"
                          id={`FrequentFlyerNumber_${index}`}
                          name={`passangers[FrequentFlyerNumber][${index}]`}
                          className="txt float_left form-control form-control-sm"
                          placeholder="Frequent Flyer Number"
                          value={row.frequentflyernumber}
                          onChange={(e) =>
                            handleChangee(
                              index,
                              "frequentflyernumber",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-2">
                          {index === travelerdetailrow.length - 1 &&
                            travelerdetailrow.length < 5 && (
                              <button
                                type="button"
                                className="btn mt-4"
                                onClick={handleAddRoww}
                                style={{
                                  backgroundColor: "#FF5015",
                                  border: "none",
                                  color: "white",
                                  padding: "10px",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                }}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            )}
                          {index === travelerdetailrow.length - 1 &&
                            travelerdetailrow.length > 1 && (
                              <button
                                type="button"
                                className="btn mt-4 ml-2"
                                onClick={handleRemoveRoww}
                                style={{
                                  backgroundColor: "#C0392B",
                                  border: "none",
                                  color: "white",
                                  padding: "10px",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  marginLeft: "8px",
                                }}
                              >
                                <i className="fa fa-minus"></i>
                              </button>
                            )}
                        </div>
                      </div>
                      <div className="mt-5"></div>
                      <hr />
                    </div>
                  ))}
                </div>
                <input
                  type="hidden"
                  name="pax_cnt"
                  id="paxcnt"
                  defaultValue={0}
                />
                <div className="row mt-3">
                  <div className="form-group col-md-12">
                    <h5>Contact Details </h5>
                  </div>
                  <div className="form-group col-md-3">
                    <label>Salutation</label>
                    <MultiSelect
                      options={salutations}
                      value={salutations.find(
                        (option) => option.value === formData.contactSaluation
                      )}
                      onChange={(selectedOption) =>
                        handleSingleSelectChange(
                          selectedOption,
                          "contactSaluation"
                        )
                      }
                      isSearchable
                      placeholder="- Title -"
                      noOptionsMessage={() => "No Option Found"}
                      className="custom-select required"
                      required
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="txt contct form-control form-control-sm required"
                      placeholder="First Name"
                      name="contactFirstName"
                      id="contactFirstName"
                      value={formData.contactFirstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="contactLastName"
                      id="contactLastName"
                      value={formData.contactLastName}
                      onChange={handleInputChange}
                      required
                      className="txt contct form-control  form-control-sm required"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Street</label>
                    <input
                      type="text"
                      style={{ disply: "block", float: "left" }}
                      name="street"
                      id="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="txt contct form-control form-control-sm"
                      placeholder="Street"
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="form-group col-md-3">
                    <label>Town</label>
                    <input
                      type="text"
                      name="town"
                      id="town"
                      value={formData.town}
                      onChange={handleInputChange}
                      className="txt contct form-control form-control-sm "
                      placeholder="Town"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="txt contct form-control form-control-sm "
                      placeholder="Postal Code"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Province</label>
                    <input
                      type="text"
                      name="province"
                      id="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      className="txt contct form-control form-control-sm "
                      placeholder="Province"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Country</label>
                    <MultiSelect
                      options={countryOptions}
                      isSearchable
                      placeholder="- Select a country -"
                      noOptionsMessage={() => "No Country Found"}
                      className="custom-select "
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="form-group col-md-3">
                    <label>Phone</label>
                    <div className="row">
                      <div className="col-md-3 padR0">
                        <input
                          type="text"
                          name="intcode"
                          id="intcode"
                          value={formData.intcode}
                          onChange={handleInputChange}
                          required
                          className="txt contct form-control form-control-sm required "
                          placeholder="Int. Code"
                          size={4}
                        />
                      </div>
                      <div className="col-md-3 padR0">
                        <input
                          type="text"
                          className="txt contct form-control form-control-sm required "
                          name="areacode"
                          id="areacode"
                          value={formData.areacode}
                          onChange={handleInputChange}
                          required
                          placeholder="Area Code"
                          size={4}
                          style={{ width: "75px" }}
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="txt contct form-control form-control-sm required "
                          placeholder="Contact Phone"
                          size={11}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md-3">
                    <label>Email</label>
                    <input
                      type="text"
                      name="contactemail"
                      id="contactemail"
                      value={formData.contactemail}
                      onChange={handleInputChange}
                      className="txt contct form-control form-control-sm required"
                      required
                      placeholder="Contact Email"
                    />
                  </div>
                </div>
                <br />
                <div className="form-group col-md-12">
                  <button
                    className="btn btn-dark btn-sm from-group"
                    type="submit"
                    name="b1"
                    id="b1"
                    value="Save"
                    onclick="Javascript submit_form(document.forms['offline_booking_form']);"
                  >
                    <i className="fa fa-floppy-o" />
                    &nbsp;Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* End */}
        </form>
      </div>
    </>
  );
};
export default BookingAddOfflineBookingFlight;
