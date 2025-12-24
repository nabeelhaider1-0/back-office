import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import MultiSelect from "../reactMultiSelect";
import { room_options, upto100_options } from "../../constants/contants";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getDATA } from "../../Apis/API";
import {
  ErrorApiAlert,
  formatDate,
  formatDateTime,
  RequiredFieldAlert,
} from "../../constants/globalfunctions";
import { setOfflineBookingHotelData } from "../../state/action/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../../constants/ApiRoutes";

const BookingAddOfflineHotels = ({ setOfflineBookingHotelData }) => {
  const [startDate, setStartDate] = useState(new Date()); // Set default to today's date
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  ); // Set default to tomorrow
  const [totalNights, setTotalNights] = useState(1); // Default to 1 night
  const [agentsOptionsData, setAgentsOptionsData] = useState([]);
  const [agentsData, setAgentsData] = useState([]);
  const [rows, setRows] = useState([{ roomType: null, totalRooms: null }]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedSubAgent, setSelectedSubAgent] = useState(null);
  const navigate = useNavigate();

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
        setAgentsOptionsData(options);
        setAgentsData(agents);
      }
    } catch (error) {
      ErrorApiAlert("Error Fetching Agents");
    }
  };

  useEffect(() => {
    getAgents();
  }, []);

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(new Date());
    setEndDate(new Date(new Date().setDate(new Date().getDate() + 1)));
    setTotalNights(1);
  };

  const validateRow = (row) => {
    return row.roomType && row.totalRooms;
  };

  const addRow = () => {
    const lastRow = rows[rows.length - 1];
    if (validateRow(lastRow)) {
      setRows([...rows, { roomType: null, totalRooms: null }]);
    } else {
      RequiredFieldAlert(
        "Please Select The Required Fields",
        "Please select room type and total rooms for the current row before adding a new one.",
        "error"
      );
    }
  };

  const removeRow = (index) => {
    const newRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(newRows);
  };

  const handleRoomTypeChange = (selectedOptions, rowIndex) => {
    const newRows = rows.map((row, index) =>
      index === rowIndex ? { ...row, roomType: selectedOptions } : row
    );
    setRows(newRows);
  };

  const handleTotalRoomsChange = (selectedOptions, rowIndex) => {
    const newRows = rows.map((row, index) =>
      index === rowIndex ? { ...row, totalRooms: selectedOptions } : row
    );
    setRows(newRows);
  };

  const handleAgentChange = (selectedOption) => {
    setSelectedSubAgent(null);
    setSelectedAgent(selectedOption ? selectedOption.value : null);
  };

  const handleSubAgentChange = (event) => {
    setSelectedSubAgent(event.target.value);
  };

  const handleTotalNightsChange = (selectedOption) => {
    const nights = selectedOption ? selectedOption.value : 1;
    setTotalNights(nights);
    const newEndDate = new Date(startDate);
    newEndDate.setDate(newEndDate.getDate() + nights);
    setEndDate(newEndDate);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;

    // Ensure start and end are Date objects
    const startDate = start instanceof Date ? start : new Date(start);
    const endDate = end instanceof Date ? end : new Date(end);

    setStartDate(startDate);
    setEndDate(endDate);

    if (startDate && endDate) {
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      setTotalNights(differenceInDays);
    }
  };

  const selectedAgentData = agentsData.find(
    (agent) => agent.uuid === selectedAgent
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomTypes = rows.map((row) =>
      row.roomType ? row.roomType.value : null
    );
    const totalRooms = rows.map((row) =>
      row.totalRooms ? row.totalRooms.value : null
    );
    const checkin = new Date(startDate);
    const checkout = new Date(endDate);
    const formData = {
      agentUuid: selectedSubAgent || selectedAgent,
      checkIn: startDate ? formatDate(checkin) : null,
      checkOut: endDate ? formatDate(checkout) : null,
      totalNights: totalNights,
      roomType: roomTypes,
      totalRooms: totalRooms,
    };
    setOfflineBookingHotelData(formData);
    navigate(Constants.URLConstants.BOOKINGSADDOFFLINEHOTELSINNER);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="ADD OFFLINE BOOKING"
          linkText1="Search Bookings"
          linkText2="Add Offline Booking"
          link1="/"
        />
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
                  Booking Date : {formatDateTime()}
                </h5>
              </div>
            </div>
          </div>
          <form id="bookingofflinebookinghotels" onSubmit={handleSubmit}>
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-3 mb-2">
                  <label>Agent Information</label>
                  <MultiSelect
                    options={agentsOptionsData}
                    isSearchable
                    onChange={handleAgentChange}
                    placeholder="Select Agent..."
                    className="custom-select required"
                    noOptionsMessage={() => "No Agent Found"}
                    required
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="exampleInputEmail1">Credit Value</label>
                  <div id="id_credit_value">
                    {selectedAgentData?.creditLimit?.[0]
                      ?.availableCreditLimit || 0}
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="exampleInputEmail1">Credit Usage</label>
                  <div id="id_credit_usage">
                    {selectedAgentData?.creditLimit?.[0]
                      ?.availableCreditLimit || 0}
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="form-group col-md-12">
                    {selectedAgentData &&
                      selectedAgentData.subAgents.length > 0 && (
                        <>
                          <label>Sub Agent</label>
                          <div className="row mt-1">
                            <div
                              className="col-md-3"
                              style={{ marginLeft: "1.9vw" }}
                            >
                              <b>Company Name</b>
                            </div>
                            <div className="col-md-3">
                              <b>User Name</b>
                            </div>
                          </div>
                          {selectedAgentData.subAgents.map((subAgent) => (
                            <div className="row mt-3" key={subAgent.uuid}>
                              <div className="col-md-3">
                                <input
                                  type="radio"
                                  name="subAgent"
                                  onChange={handleSubAgentChange}
                                  value={subAgent.uuid}
                                  style={{ marginRight: "8px" }}
                                />
                                <label>{subAgent.companyname}</label>
                              </div>
                              <div
                                className="col-md-3"
                                style={{ marginLeft: "2.2vw" }}
                              >
                                {subAgent.userName}
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="exampleInputEmail1">
                    Check-in / Check-out
                  </label>
                  <div
                    className="input-daterange input-group date"
                    id="checkinOut"
                  >
                    <Flatpickr
                      value={startDate}
                      onChange={(date) => handleDateChange([date, endDate])}
                      options={{ dateFormat: "Y-m-d" }}
                    />
                    <span className="input-group-addon">to</span>
                    <Flatpickr
                      value={endDate}
                      onChange={(date) => handleDateChange([startDate, date])}
                      options={{ dateFormat: "Y-m-d" }}
                    />
                    <span
                      className="input-group-addon"
                      id="checkTrashBtn"
                      onClick={handleTrashClick}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="exampleInputEmail1">Total Nights</label>
                  <MultiSelect
                    options={upto100_options}
                    isSearchable
                    onChange={handleTotalNightsChange}
                    value={{ label: `${totalNights}`, value: totalNights }}
                    placeholder="Select"
                    className="custom-select required"
                    noOptionsMessage={() => "No Options Found"}
                    required
                  />
                </div>
              </div>
              <hr />
              <div className="row form-group">
                <div className="form-group col-md-12 mb-2">
                  <h5>Room Type</h5>
                </div>
                <div
                  className="add_more_rooms"
                  style={{ paddingRight: "15px", paddingLeft: "15px" }}
                >
                  {rows.map((row, index) => (
                    <div className="row remove_room mt-2" key={index}>
                      <div className="form-group col-md-3" id="rooms">
                        <MultiSelect
                          options={room_options}
                          isSearchable
                          placeholder="Select Room"
                          className="custom-select required"
                          noOptionsMessage={() => "No Options Found"}
                          value={row.roomType}
                          onChange={(selectedOptions) =>
                            handleRoomTypeChange(selectedOptions, index)
                          }
                          required
                        />
                      </div>
                      <div className="form-group col-md-3" id="numbr">
                        <MultiSelect
                          options={upto100_options}
                          isSearchable
                          placeholder="Select Number of Rooms"
                          className="custom-select required"
                          noOptionsMessage={() => "No Options Found"}
                          value={row.totalRooms}
                          onChange={(selectedOptions) =>
                            handleTotalRoomsChange(selectedOptions, index)
                          }
                          required
                        />
                      </div>
                      {index === 0 && (
                        <div className="form-group col-md-3">
                          <button
                            type="button"
                            className="btn btn-dark btn-sm repeat"
                            onClick={addRow}
                          >
                            <i className="fa fa-plus" />
                            &nbsp;Add More
                          </button>
                          {rows.length > 1 && (
                            <button
                              style={{ marginLeft: "4px" }}
                              type="button"
                              className="btn btn-outline-secondary btn-sm rmv "
                              onClick={() => removeRow(index)}
                            >
                              <i className="fa fa-times" />
                              &nbsp;Remove
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group mt-3">
                <button
                  className="btn btn-dark btn-sm"
                  type="submit"
                  name="modify"
                  value="Add Offline Booking"
                >
                  <i className="fa fa-plus" />
                  &nbsp;Add Offline Booking
                </button>
                &nbsp;&nbsp;
                <button
                  className="btn btn-outline-secondary btn-sm"
                  type="button"
                  name="cancel"
                  value="Cancel"
                  onClick={() => console.log("Cancelled")}
                >
                  <i className="fa fa-times" />
                  &nbsp;Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default connect(null, { setOfflineBookingHotelData })(
  BookingAddOfflineHotels
);
