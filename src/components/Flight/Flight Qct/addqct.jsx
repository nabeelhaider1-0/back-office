import React, { useEffect, useState } from "react"; // Import React and useState

import Flatpickr from "react-flatpickr";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { Slide, toast } from "react-toastify";
import {
  bookingPCC,
  flightproviders_options,
  ticketingPCC,
} from "../../../constants/contants";
import excelfilereader from "../../../constants/excelfilereader";
import { useNavigate } from "react-router-dom";
import excelFileContent from "../../../ExcelFiles/Airport_and_Airline_Code_List.xlsx";
import { flightAddQCTRules, getAllAgents } from "../../../Apis/API";
import Constants from "../../../constants/routes";
import Swal from "sweetalert2";

const FlightQctAddRule = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date
  const [airportData, setAirportData] = useState([]);
  const [fromselectedCountry, setfromSelectedCountry] = useState(null);
  const [fromairportOptions, setfromAirportOptions] = useState([]);
  const [toselectedCountry, settoSelectedCountry] = useState(null);
  const [toairportOptions, settoAirportOptions] = useState([]);
  const [fromselectedAirport, setfromSelectedAirport] = useState(null);
  const [toselectedAirport, settoSelectedAirport] = useState(null);
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
    fetchExcelData();
    getAgents();
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
  const handleMultiSelectChange = (selectedOption, fieldName) => {
    const selectedValues = selectedOption.map((option) => option.value);
    const updatedValues = selectedValues.includes("")
      ? selectedValues.filter((val) => val !== "")
      : selectedValues;
    setFormData({ ...formData, [fieldName]: updatedValues });
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
    const newValue = checked ? "default" : ""; // Convert boolean to string
    setFormData({ ...formData, [name]: newValue });
  };

  const checkRequired = (qctdata) => {
    if (!qctdata.agents || qctdata.agents.length === 0) {
      Swal.fire(
        "Agent is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }
    if (
      qctdata.queueIdentifier === "" ||
      qctdata.queueIdentifier === undefined
    ) {
      Swal.fire(
        "Queue Identifier is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    return true;
  };

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
    const dateObject1 = new Date(endDate);
    formData.DateFrom = formatDate(dateObject);
    formData.DateTo = formatDate(dateObject1);

    const isSuccessfull = checkRequired(formData);
    if (isSuccessfull) {
      try {
        const response = await flightAddQCTRules(formData);

        if (response.data.statusCode === 200) {
          toast.success("Flight QCT Rules Added Successfully", {
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
          navigate(Constants.URLConstants.FLIGHTFLIGHTQCTSEARCHRULES);
        }
      } catch (error) {}
    }
  };
  return (
    <>
      <Header2 title="ADD QCT RULE" linkText1="Add QCT Rule" />
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
                    // defaultChecked={formData.applyDifferentMarkupAncillary}
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
            <div className="row mt-2">
              <div className="col-md-3 form-group">
                <label>Airline: </label>
                <MultiSelect
                  options={airlineOptions}
                  isSearchable
                  isMulti
                  placeholder="- Select Airline -"
                  className="custom-select"
                  noOptionsMessage={() => "No Airline Found"}
                  onChange={(selectedOption) =>
                    handleMultiSelectChange(selectedOption, "airline")
                  }
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
                  onChange={(selectedOptions) =>
                    setFormData({
                      ...formData,
                      agents: selectedOptions.map((option) => option.value),
                    })
                  }
                />
              </div>
              <div className="col-md-3 form-group" id="book_pcc_list">
                <label>Booking PCC: </label>
                <MultiSelect
                  options={bookingPCC}
                  isSearchable
                  placeholder="- Select Booking PCC -"
                  className="custom-select"
                  noOptionsMessage={() => "No Booking PCC Found"}
                  onChange={(selectedOption) =>
                    setFormData({
                      ...formData,
                      bookingPCC: selectedOption ? selectedOption.value : "",
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
                  onChange={(selectedOption) =>
                    setFormData({
                      ...formData,
                      ticketingPCC: selectedOption ? selectedOption.value : "",
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
export default FlightQctAddRule;
