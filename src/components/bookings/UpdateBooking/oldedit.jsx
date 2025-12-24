import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import Header2 from "../../header2/header2";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import PhoneInput from "react-phone-input-2";

const libraries = ["places"];
const googleMapsApiKey = import.meta.env.VITE_REACT_APP_PLACESAPIKEY;

const EditFlightBooking = () => {
  // Initial data from JSON with updated fare object
  const initialBookingData = {
    booking_id: "ESP0002836",
    service_type: "Flight",
    supplier: "mistifly",
    supplierrefno: null,
    service_start_date: "2025-10-09T12:55:00",
    service_end_date: "2025-10-09T15:30:00",
    pnr: "",
    booking_timestamps: { date: "2025-09-10", time: "05:18:20" },
    amount: "196.00",
    currency: "USD",
    booking_status: "",
    contact: {
      email: "mariatariq694@gmail.com",
      countryCode: "+92",
      phoneNumber: "3064639834",
    },
    passengers: [
      {
        Gender: "M",
        tickets: [],
        NationalID: "",
        DateOfBirth: "1996-09-10",
        PassengerType: "AD",
        PassengerTitle: "MR",
        PassportNumber: "ESP",
        PassportCountry: "",
        PassengerLastName: "Ahmed",
        PassengerFirstName: "Amir",
        PassportExpiryDate: "2000-01-01",
        PassengerNationality: "",
      },
    ],
    iternary_details: {
      segments: [
        {
          origin: "LHE",
          destination: "DXB",
          departure_date: "2025-10-09",
          departure_time: "12:55:00",
          arrival_date: "2025-10-09",
          arrival_time: "15:30:00",
          airline_image: "PK.png",
          operated_by: "PK",
          flight_number: "203",
          aircraft: "AIRBUS A320",
          estimate_time: "3h 35m",
          layover_time: "0m",
          total_time: "3h 35m",
          baggage_info: {
            checkin_baggage: [{ type: "ADT", value: "30KG" }],
            cabin_baggage: [{ type: "ADT", value: "7KG" }],
          },
        },
      ],
      cabin: "economy",
      total_fare: 196,
      original_total_fare: 196,
      fare_currency: "USD",
      fare: [
        {
          adult: {
            total: 123,
            tax: 73,
          },
        },
        {
          child: {
            total: 0,
            tax: 0,
          },
        },
        {
          infant: {
            total: 0,
            tax: 0,
          },
        },
      ],
    },
    fare_rules: [
      {
        category: "RULE_APPLICATION",
        ruleText:
          "APPLICATION AND OTHER CONDITIONS<br/>RULE - 033/4510<br/>BETWEEN PAKISTAN AND AREA 2<br/>NET FARES----NON COMMISSIONABLE<br/>EXCURSION FARES FROM PAKISTAN TO UNITED ARAB EMIRATES AND<br/>GULF<br/> APPLICATION<br/> AREA<br/> THESE FARES APPLY<br/> FROM PAKISTAN TO UNITED ARAB EMIRATES<br/> AND MIDDLE EAST.<br/> CLASS OF SERVICE<br/> THESE FARES APPLY FOR BUSINESS/ECONOMY CLASS SERVICE.<br/> TYPES OF TRANSPORTATION<br/> FARES GOVERNED BY THIS RULE CAN BE USED TO CREATE<br/> ONE-WAY/ROUND-TRIP/CIRCLE-TRIP/SINGLE OPEN-JAW/DOUBLE<br/> OPEN-JAW JOURNEYS.<br/> CAPACITY LIMITATIONS<br/> THE CARRIER SHALL LIMIT THE NUMBER OF PASSENGERS CARRIED<br/> ON ANY ONE FLIGHT AT FARES GOVERNED BY THIS RULE AND SUCH<br/> FARES WILL NOT NECESSARILY BE AVAILABLE ON ALL FLIGHTS.<br/> THE NUMBER OF SEATS WHICH THE CARRIER SHALL MAKE<br/> AVAILABLE ON A GIVEN FLIGHT WILL BE DETERMINED BY THE<br/> CARRIERS BEST JUDGMENT<br/>",
      },
    ],
    transactions: [
      {
        orderAmount: { value: 19600, currency: "USD" },
        orderOutstandingAmount: { value: 19600, currency: "USD" },
      },
    ],
  };

  // State for form data
  const [formData, setFormData] = useState({
    booking_id: initialBookingData.booking_id,
    supplier: initialBookingData.supplier,
    pnr: initialBookingData.pnr,
    booking_status: initialBookingData.booking_status,
    contactemail: initialBookingData.contact.email,
    phone:
      initialBookingData.contact.countryCode +
      initialBookingData.contact.phoneNumber,
    trip_type: "oneway",
    cabin_type: initialBookingData.iternary_details.cabin,
    bookingCurrency: initialBookingData.currency,
    bookingAmount: initialBookingData.amount,
    supplierCurrency: initialBookingData.currency,
    supplierRate:
      initialBookingData.iternary_details.original_total_fare.toString() || "0",
    supplierTotalRate:
      initialBookingData.iternary_details?.total_fare.toString() || "0",
  });

  // State for flight and passenger rows
  const [flightRows, setFlightRows] = useState(
    initialBookingData.iternary_details.segments.map((segment) => ({
      airline: segment.operated_by,
      flightnumber: segment.flight_number,
      flightpnr: initialBookingData.pnr,
      classoftravel: initialBookingData.iternary_details.cabin,
      departure: segment.origin,
      arrival: segment.destination,
      departuredate: segment.departure_date,
      arrivaldate: segment.arrival_date,
      departuretime: segment.departure_time,
      arrivaltime: segment.arrival_time,
      travelduration: segment.total_time,
      meal: "",
      baggageqty:
        segment.baggage_info.checkin_baggage[0]?.value.replace(/[^0-9]/g, "") ||
        "",
      baggageunit: segment.baggage_info.checkin_baggage[0]?.value.includes("KG")
        ? "KG"
        : "LB",
    }))
  );

  const [passengerRows, setPassengerRows] = useState(
    initialBookingData.passengers.map((passenger) => ({
      salutation: passenger.PassengerTitle,
      firstname: passenger.PassengerFirstName,
      lastname: passenger.PassengerLastName,
      passengertype: passenger.PassengerType,
      dateofbirth: passenger.DateOfBirth,
      passportnumber: passenger.PassportNumber,
      passportexpirydate: passenger.PassportExpiryDate,
      country: passenger.PassportCountry,
      ticketnumber: passenger.tickets[0] || "",
    }))
  );

  // State for fare rules
  const [fareRules, setFareRules] = useState(
    initialBookingData.fare_rules.map((rule) => ({
      category: rule.category,
      ruleText: rule.ruleText,
      changes: rule.changes || "",
      cancellations: rule.cancellations || "",
    }))
  );

  // State for fare breakdown
  const [fareBreakdown, setFareBreakdown] = useState(
    initialBookingData.iternary_details.fare.map((fare) => ({
      type: Object.keys(fare)[0],
      total: fare[Object.keys(fare)[0]].total,
      tax: fare[Object.keys(fare)[0]].tax,
    }))
  );

  // Enhanced button styles
  const buttonStyles = {
    plusButton: {
      background: "linear-gradient(135deg, #FF5015 0%, #E43F15 100%)",
      border: "none",
      color: "white",
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      fontWeight: "bold",
      boxShadow: "0 2px 8px rgba(255, 80, 21, 0.3)",
      transition: "all 0.2s ease",
      padding: 0,
      marginLeft: "8px",
    },
    minusButton: {
      background: "linear-gradient(135deg, #C0392B 0%, #A93226 100%)",
      border: "none",
      color: "white",
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      fontWeight: "bold",
      boxShadow: "0 2px 8px rgba(192, 57, 43, 0.3)",
      transition: "all 0.2s ease",
      padding: 0,
      marginLeft: "8px",
    },
    buttonHover: {
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      phone: value,
    }));
  };

  const handleFlightChange = (index, field, value) => {
    const newRows = flightRows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setFlightRows(newRows);
  };

  const handlePassengerChange = (index, field, value) => {
    const newRows = passengerRows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setPassengerRows(newRows);
  };

  const handleFareRuleChange = (index, field, value) => {
    const newRules = fareRules.map((rule, i) =>
      i === index ? { ...rule, [field]: value } : rule
    );
    setFareRules(newRules);
  };

  const handleFareBreakdownChange = (index, field, value) => {
    const newFareBreakdown = fareBreakdown.map((fare, i) =>
      i === index ? { ...fare, [field]: parseFloat(value) || 0 } : fare
    );
    setFareBreakdown(newFareBreakdown);
  };

  const handleAddFareRule = () => {
    const lastRule = fareRules[fareRules.length - 1];
    const isLastRuleFilled = lastRule.category && lastRule.ruleText;
    if (isLastRuleFilled) {
      setFareRules([
        ...fareRules,
        { category: "", ruleText: "", changes: "", cancellations: "" },
      ]);
    } else {
      console.log(
        "Please fill all fields in the current fare rule before adding a new one"
      );
    }
  };

  const handleRemoveFareRule = (index) => {
    if (fareRules.length > 1) {
      setFareRules(fareRules.filter((_, i) => i !== index));
    }
  };

  const handleAddFlightRow = () => {
    const lastRow = flightRows[flightRows.length - 1];
    const isLastRowFilled = Object.values(lastRow).every(
      (value) => value !== "" && value !== null
    );
    if (isLastRowFilled) {
      if (flightRows.length < 4) {
        setFlightRows([
          ...flightRows,
          {
            airline: "",
            flightnumber: "",
            flightpnr: "",
            classoftravel: "",
            departure: "",
            arrival: "",
            departuredate: null,
            arrivaldate: null,
            departuretime: "",
            arrivaltime: "",
            travelduration: "",
            meal: "",
            baggageqty: "",
            baggageunit: "KG",
          },
        ]);
      } else {
        console.log("Maximum of 4 flight segments allowed");
      }
    } else {
      console.log(
        "Please fill all fields in the current flight row before adding a new one"
      );
    }
  };

  const handleRemoveFlightRow = () => {
    if (flightRows.length > 1) {
      setFlightRows(flightRows.slice(0, -1));
    }
  };

  const handleAddPassengerRow = () => {
    const lastRow = passengerRows[passengerRows.length - 1];
    const isLastRowFilled = Object.values(lastRow).every(
      (value) => value !== "" && value !== null
    );
    if (isLastRowFilled) {
      if (passengerRows.length < 5) {
        setPassengerRows([
          ...passengerRows,
          {
            salutation: "",
            firstname: "",
            lastname: "",
            passengertype: "",
            dateofbirth: null,
            passportnumber: "",
            passportexpirydate: null,
            country: "",
            ticketnumber: "",
          },
        ]);
      } else {
        console.log("Maximum of 5 passengers allowed");
      }
    } else {
      console.log(
        "Please fill all fields in the current passenger row before adding a new one"
      );
    }
  };

  const handleRemovePassengerRow = () => {
    if (passengerRows.length > 1) {
      setPassengerRows(passengerRows.slice(0, -1));
    }
  };

  const handleTrashClick = (type, name, index) => {
    if (type === "flight" && name === "departure") {
      const newRows = [...flightRows];
      newRows[index].departuredate = null;
      setFlightRows(newRows);
    } else if (type === "flight" && name === "arrival") {
      const newRows = [...flightRows];
      newRows[index].arrivaldate = null;
      setFlightRows(newRows);
    } else if (type === "passenger" && name === "dob") {
      const newRows = [...passengerRows];
      newRows[index].dateofbirth = null;
      setPassengerRows(newRows);
    } else if (type === "passenger" && name === "passportexpdate") {
      const newRows = [...passengerRows];
      newRows[index].passportexpirydate = null;
      setPassengerRows(newRows);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Map flightRows to segments format
    const segments = flightRows.map((row) => ({
      origin: row.departure,
      destination: row.arrival,
      departure_date: row.departuredate,
      departure_time: row.departuretime,
      arrival_date: row.arrivaldate,
      arrival_time: row.arrivaltime,
      airline_image: `${row.airline.toLowerCase()}.png`,
      operated_by: row.airline,
      flight_number: row.flightnumber,
      aircraft: "", // Not captured in form, set as empty
      estimate_time: row.travelduration,
      layover_time: "0m", // Placeholder, as layover logic isn't implemented
      total_time: row.travelduration,
      baggage_info: {
        checkin_baggage: [
          { type: "ADT", value: `${row.baggageqty}${row.baggageunit}` },
        ],
        cabin_baggage: [{ type: "ADT", value: "SB" }], // Placeholder
      },
    }));

    // Map passengerRows to passengers format
    const passengers = passengerRows.map((row) => ({
      Gender:
        row.passengertype === "AD"
          ? "M"
          : row.passengertype === "CH"
          ? "M"
          : "U", // Placeholder logic
      tickets: [row.ticketnumber].filter(Boolean),
      NationalID: "",
      DateOfBirth: row.dateofbirth,
      PassengerType: row.passengertype,
      PassengerTitle: row.salutation,
      PassportNumber: row.passportnumber,
      PassportCountry: row.country,
      PassengerLastName: row.lastname,
      PassengerFirstName: row.firstname,
      PassportExpiryDate: row.passportexpirydate,
      PassengerNationality: row.country,
    }));

    // Map fareBreakdown to fare format
    const fare = fareBreakdown.map((fare) => ({
      [fare.type]: {
        total: fare.total,
        tax: fare.tax,
      },
    }));

    // Construct iternary_details based on trip_type
    const iternary_details = {
      api: initialBookingData.iternary_details.api || "mistifly",
      api_code: initialBookingData.iternary_details.api_code || "mf-0001",
      cabin: formData.cabin_type,
      pax: {
        AD: passengerRows.filter((p) => p.passengertype === "AD").length,
        CH: passengerRows.filter((p) => p.passengertype === "CH").length,
        IN: passengerRows.filter((p) => p.passengertype === "IN").length,
      },
      fare,
      total_fare: parseFloat(formData.supplierTotalRate) || 0,
      original_total_fare: parseFloat(formData.supplierRate) || 0,
      fare_currency: formData.supplierCurrency,
      marketed_by: "Public",
      operated_by: "",
      flight_id: initialBookingData.iternary_details.flight_id || 0,
      strikeThrough: false,
      promo: null,
      currency_metadata: {
        base_conversion: { from: "USD", to: "USD", applied: false, rate: "1" },
        user_conversion: { from: "USD", to: "USD", applied: false, rate: "1" },
      },
      appliedRevenueRules: {
        supplier_passenger: {
          adult: {
            base:
              fareBreakdown.find((f) => f.type === "adult")?.total -
                fareBreakdown.find((f) => f.type === "adult")?.tax || 0,
            tax: fareBreakdown.find((f) => f.type === "adult")?.tax || 0,
            final: fareBreakdown.find((f) => f.type === "adult")?.total || 0,
          },
          child: {
            base:
              fareBreakdown.find((f) => f.type === "child")?.total -
                fareBreakdown.find((f) => f.type === "child")?.tax || 0,
            tax: fareBreakdown.find((f) => f.type === "child")?.tax || 0,
            final: fareBreakdown.find((f) => f.type === "child")?.total || 0,
          },
          infant: {
            base:
              fareBreakdown.find((f) => f.type === "infant")?.total -
                fareBreakdown.find((f) => f.type === "infant")?.tax || 0,
            tax: fareBreakdown.find((f) => f.type === "infant")?.tax || 0,
            final: fareBreakdown.find((f) => f.type === "infant")?.total || 0,
          },
        },
        escapra_passenger: {
          adult: {
            markup: 0,
            discount: 0,
            final: fareBreakdown.find((f) => f.type === "adult")?.total || 0,
          },
          child: {
            markup: 0,
            discount: 0,
            final: fareBreakdown.find((f) => f.type === "child")?.total || 0,
          },
          infant: {
            markup: 0,
            discount: 0,
            final: fareBreakdown.find((f) => f.type === "infant")?.total || 0,
          },
        },
        supplier_total: {
          originalTotalFare: parseFloat(formData.supplierRate) || 0,
          finalTotalFare: parseFloat(formData.supplierTotalRate) || 0,
        },
        escapra_total: {
          totalMarkup: 0,
          totalDiscount: 0,
          finalTotalFare: parseFloat(formData.supplierTotalRate) || 0,
          totalPromo: null,
          totalStrikeThrough: false,
          totalDoubleDip: false,
          rules: [],
        },
      },
    };

    // Handle segments or legs based on trip_type
    if (formData.trip_type === "oneway") {
      iternary_details.segments = segments;
      iternary_details.total_estimate_time = segments.reduce((total, seg) => {
        const [hours, minutes] = seg.total_time.split("h ");
        return (
          total + parseInt(hours) * 60 + parseInt(minutes.replace("m", ""))
        );
      }, 0);
      iternary_details.total_estimate_time = `${Math.floor(
        iternary_details.total_estimate_time / 60
      )}h ${iternary_details.total_estimate_time % 60}m`;
    } else {
      // For return or multicity, group segments into legs
      // Simple logic: assume all current segments belong to one leg for return, or split based on UI logic
      iternary_details.legs = [segments]; // Placeholder: assumes one leg for return; multicity needs UI to define legs
      iternary_details.total_estimate_time = segments.reduce((total, seg) => {
        const [hours, minutes] = seg.total_time.split("h ");
        return (
          total + parseInt(hours) * 60 + parseInt(minutes.replace("m", ""))
        );
      }, 0);
      iternary_details.total_estimate_time = `${Math.floor(
        iternary_details.total_estimate_time / 60
      )}h ${iternary_details.total_estimate_time % 60}m`;
    }

    // Split phone into countryCode and phoneNumber
    const phoneMatch = formData.phone.match(/(\+\d{1,3})(\d+)/);
    const countryCode = phoneMatch ? phoneMatch[1] : "+92";
    const phoneNumber = phoneMatch ? phoneMatch[2] : formData.phone;

    const updatedData = {
      booking_id: formData.booking_id,
      service_type: initialBookingData.service_type,
      supplier: formData.supplier,
      supplierrefno: initialBookingData.supplierrefno,
      service_start_date:
        segments[0]?.departure_date + "T" + segments[0]?.departure_time,
      service_end_date:
        segments[segments.length - 1]?.arrival_date +
        "T" +
        segments[segments.length - 1]?.arrival_time,
      pnr: formData.pnr,
      booking_timestamps: initialBookingData.booking_timestamps,
      amount: formData.bookingAmount,
      currency: formData.bookingCurrency,
      booking_status: formData.booking_status,
      contact: {
        email: formData.contactemail,
        countryCode,
        phoneNumber,
      },
      passengers,
      iternary_details,
      fare_rules: fareRules,
      transactions: initialBookingData.transactions,
    };

    console.log("Updated Form Data:", JSON.stringify(updatedData, null, 2));
  };

  // Calculate totals for fare breakdown
  const fareBreakdownTotals = fareBreakdown.reduce(
    (acc, fare) => {
      const baseFare = fare.total - fare.tax;
      acc.baseFare += baseFare;
      acc.tax += fare.tax;
      acc.total += fare.total;
      return acc;
    },
    { baseFare: 0, tax: 0, total: 0 }
  );

  return (
    <div
      className="container-fluid pt-0 p-4"
      id="content-pad"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Header2
        title="✈️ Edit Flight Booking"
        linkText1="Search Bookings"
        linkText2="Edit Flight Booking"
        link1="/"
      />

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* Booking Information Section */}
        <div className="card shadow-sm mb-4" style={{ borderRadius: "8px" }}>
          <div
            className="card-header text-white p-3"
            style={{ borderRadius: "8px 8px 0 0", backgroundColor: "#FF5015" }}
          >
            <h5 className="mb-0">
              <i className="fas fa-info-circle me-2"></i>Booking Information
            </h5>
          </div>
          <div className="card-body p-4">
            <div className="row">
              <div className="form-group col-md-3 mb-3">
                <label className="font-weight-bold text-muted">
                  Booking ID
                </label>
                <input
                  type="text"
                  name="booking_id"
                  value={formData.booking_id}
                  onChange={handleInputChange}
                  className="form-control form-control-sm"
                  readOnly
                  style={{ backgroundColor: "#f8f9fa" }}
                />
              </div>
              <div className="form-group col-md-3 mb-3">
                <label className="font-weight-bold text-muted">Supplier</label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleInputChange}
                  className="form-control form-control-sm required"
                  required
                  disabled
                  style={{ borderColor: "#FF5015" }}
                />
              </div>
              <div className="form-group col-md-3 mb-3">
                <label className="font-weight-bold text-muted">PNR</label>
                <input
                  type="text"
                  name="pnr"
                  value={formData.pnr}
                  onChange={handleInputChange}
                  className="form-control form-control-sm required"
                  required
                  style={{ borderColor: "#FF5015" }}
                />
              </div>
              <div className="form-group col-md-3 mb-3">
                <label className="font-weight-bold text-muted">
                  Booking Status
                </label>
                <select
                  name="booking_status"
                  value={formData.booking_status}
                  onChange={handleInputChange}
                  className="form-control form-control-sm required"
                  required
                  style={{ borderColor: "#FF5015" }}
                >
                  <option value="">Select Status</option>
                  <option value="Confirmed">✅ Confirmed</option>
                  <option value="Pending">⏳ Pending</option>
                  <option value="Cancelled">❌ Cancelled</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-3 mb-3">
                <label className="font-weight-bold text-muted">
                  Contact Email
                </label>
                <div className="input-group">
                  <input
                    type="email"
                    name="contactemail"
                    value={formData.contactemail}
                    onChange={handleInputChange}
                    className="form-control form-control-sm required"
                    required
                    style={{ borderColor: "#FF5015" }}
                  />
                </div>
              </div>
              <div className="form-group col-md-3 mb-3">
                <label className="font-weight-bold text-muted">
                  Contact Number
                </label>
                <div className="input-group">
                  <PhoneInput
                    country={"pk"}
                    className="ReactTelNumber phoneInputBookingDetails ReactTelNumberSignUp"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    inputProps={{
                      name: "phone",
                      required: true,
                      className: "form-control",
                      style: { width: "100%", borderColor: "#FF5015" },
                    }}
                  />
                </div>
              </div>
              <div className="form-group col-md-3 mb-3">
                <label className="font-weight-bold text-muted">
                  Cabin Type
                </label>
                <select
                  name="cabin_type"
                  value={formData.cabin_type}
                  onChange={handleInputChange}
                  className="form-control form-control-sm required"
                  required
                  style={{ borderColor: "#FF5015" }}
                >
                  <option value="economy">🛫 Economy</option>
                  <option value="business">💼 Business</option>
                  <option value="first">✈️ First</option>
                </select>
              </div>
              <div className="form-group col-md-3 mb-3">
                <label className="font-weight-bold text-muted d-block w-100">
                  Trip Type
                </label>
                <div className="d-flex justify-content-between">
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      id="oneway"
                      name="trip_type"
                      value="oneway"
                      checked={formData.trip_type === "oneway"}
                      onChange={handleInputChange}
                      className="form-check-input"
                      style={{ marginRight: "8px" }}
                    />
                    <label
                      htmlFor="oneway"
                      className="form-check-label"
                      style={{
                        padding: "6px 12px",
                        border: `1px solid ${
                          formData.trip_type === "oneway"
                            ? "#343a40"
                            : "#FF5015"
                        }`,
                        backgroundColor:
                          formData.trip_type === "oneway"
                            ? "#343a40"
                            : "transparent",
                        color:
                          formData.trip_type === "oneway" ? "white" : "#FF5015",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      One Way
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      id="return"
                      name="trip_type"
                      value="return"
                      checked={formData.trip_type === "return"}
                      onChange={handleInputChange}
                      className="form-check-input"
                      style={{ marginRight: "8px" }}
                    />
                    <label
                      htmlFor="return"
                      className="form-check-label"
                      style={{
                        padding: "6px 12px",
                        border: `1px solid ${
                          formData.trip_type === "return"
                            ? "#343a40"
                            : "#FF5015"
                        }`,
                        backgroundColor:
                          formData.trip_type === "return"
                            ? "#343a40"
                            : "transparent",
                        color:
                          formData.trip_type === "return" ? "white" : "#FF5015",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Return
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      id="multicity"
                      name="trip_type"
                      value="multicity"
                      checked={formData.trip_type === "multicity"}
                      onChange={handleInputChange}
                      className="form-check-input"
                      style={{ marginRight: "8px" }}
                    />
                    <label
                      htmlFor="multicity"
                      className="form-check-label"
                      style={{
                        padding: "6px 12px",
                        border: `1px solid ${
                          formData.trip_type === "multicity"
                            ? "#343a40"
                            : "#FF5015"
                        }`,
                        backgroundColor:
                          formData.trip_type === "multicity"
                            ? "#343a40"
                            : "transparent",
                        color:
                          formData.trip_type === "multicity"
                            ? "white"
                            : "#FF5015",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Multi City
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <label className="font-weight-bold text-muted">
                  Booking Currency
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    name="bookingCurrency"
                    value={formData.bookingCurrency}
                    onChange={handleInputChange}
                    className="form-control form-control-sm required"
                    required
                    style={{ borderColor: "#FF5015" }}
                  />
                </div>
              </div>
              <div className="form-group col-md-6 mb-3">
                <label className="font-weight-bold text-muted">
                  Booking Amount
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    name="bookingAmount"
                    value={formData.bookingAmount}
                    onChange={handleInputChange}
                    className="form-control form-control-sm required"
                    required
                    style={{ borderColor: "#FF5015" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fare Rules Section */}
        <div
          className="card shadow-sm mb-4"
          style={{ borderTop: "4px solid #FF5015", borderRadius: "8px" }}
        >
          <div
            className="card-header bg-success text-white p-3"
            style={{ borderRadius: "8px 8px 0 0" }}
          >
            <h5 className="mb-0">
              <i className="fas fa-file-alt me-2"></i>Fare Rules
            </h5>
          </div>
          <div className="card-body p-4">
            {fareRules.map((rule, index) => (
              <div
                key={index}
                className="card mb-3"
                style={{ border: "1px solid #dee2e6", borderRadius: "6px" }}
              >
                <div className="card-body p-3">
                  <div className="row">
                    <div className="form-group col-md-3 mb-2">
                      <label className="font-weight-bold text-muted small">
                        Category
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm border-secondary"
                        placeholder="Category"
                        value={rule.category}
                        onChange={(e) =>
                          handleFareRuleChange(
                            index,
                            "category",
                            e.target.value
                          )
                        }
                        required
                        style={{ borderColor: "#6c757d" }}
                      />
                    </div>
                    <div className="form-group col-md-9 mb-2">
                      <label className="font-weight-bold text-muted small">
                        Rule Text
                      </label>
                      <textarea
                        className="form-control form-control-sm border-secondary"
                        rows="3"
                        value={rule.ruleText}
                        onChange={(e) =>
                          handleFareRuleChange(
                            index,
                            "ruleText",
                            e.target.value
                          )
                        }
                        required
                        style={{ borderColor: "#6c757d", resize: "vertical" }}
                      />
                    </div>
                  </div>

                  {rule.changes && (
                    <div className="row">
                      <div className="form-group col-md-6 mb-2">
                        <label className="font-weight-bold text-muted small">
                          Changes
                        </label>
                        <textarea
                          className="form-control form-control-sm border-secondary"
                          rows="2"
                          value={rule.changes}
                          onChange={(e) =>
                            handleFareRuleChange(
                              index,
                              "changes",
                              e.target.value
                            )
                          }
                          style={{ borderColor: "#6c757d", resize: "vertical" }}
                        />
                      </div>
                      <div className="form-group col-md-6 mb-2">
                        <label className="font-weight-bold text-muted small">
                          Cancellations
                        </label>
                        <textarea
                          className="form-control form-control-sm border-secondary"
                          rows="2"
                          value={rule.cancellations}
                          onChange={(e) =>
                            handleFareRuleChange(
                              index,
                              "cancellations",
                              e.target.value
                            )
                          }
                          style={{ borderColor: "#6c757d", resize: "vertical" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Buttons - Right Aligned */}
                  <div className="row justify-content-end mt-3">
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn"
                        onClick={() => handleRemoveFareRule(index)}
                        onMouseEnter={(e) =>
                          (e.target.style.transform = "translateY(-1px)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.transform = "translateY(0)")
                        }
                        disabled={fareRules.length === 1}
                        style={
                          fareRules.length === 1
                            ? {
                                ...buttonStyles.minusButton,
                                opacity: 0.5,
                                cursor: "not-allowed",
                              }
                            : buttonStyles.minusButton
                        }
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      {index === fareRules.length - 1 && (
                        <button
                          type="button"
                          className="btn"
                          onClick={handleAddFareRule}
                          onMouseEnter={(e) =>
                            (e.target.style.transform = "translateY(-1px)")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.transform = "translateY(0)")
                          }
                          style={buttonStyles.plusButton}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Passenger Details Section */}
        <div
          className="card shadow-sm mb-4"
          style={{ borderTop: "4px solid #FF5015", borderRadius: "8px" }}
        >
          <div
            className="card-header bg-info text-white p-3"
            style={{ borderRadius: "8px 8px 0 0" }}
          >
            <h5 className="mb-0">
              <i className="fas fa-users me-2"></i>Passenger Details
            </h5>
          </div>
          <div className="card-body p-4">
            {passengerRows.map((row, index) => (
              <div
                key={index}
                className="card mb-3"
                style={{ border: "1px solid #dee2e6", borderRadius: "6px" }}
              >
                <div className="card-body p-3">
                  <div className="row">
                    <div className="form-group col-md-2 mb-2">
                      <label className="font-weight-bold text-muted small">
                        Salutation
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm border-secondary"
                        placeholder="Mr/Mrs"
                        value={row.salutation}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "salutation",
                            e.target.value
                          )
                        }
                        required
                        style={{ borderColor: "#6c757d" }}
                      />
                    </div>
                    <div className="form-group col-md-3 mb-2">
                      <label className="font-weight-bold text-muted small">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm border-secondary"
                        placeholder="First Name"
                        value={row.firstname}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "firstname",
                            e.target.value
                          )
                        }
                        required
                        style={{ borderColor: "#6c757d" }}
                      />
                    </div>
                    <div className="form-group col-md-3 mb-2">
                      <label className="font-weight-bold text-muted small">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm border-secondary"
                        placeholder="Last Name"
                        value={row.lastname}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "lastname",
                            e.target.value
                          )
                        }
                        required
                        style={{ borderColor: "#6c757d" }}
                      />
                    </div>
                    <div className="form-group col-md-2 mb-2">
                      <label className="font-weight-bold text-muted small">
                        Type
                      </label>
                      <select
                        className="form-control form-control-sm border-secondary"
                        value={row.passengertype}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "passengertype",
                            e.target.value
                          )
                        }
                        required
                        style={{ borderColor: "#6c757d" }}
                      >
                        <option value="AD">Adult</option>
                        <option value="CH">Child</option>
                        <option value="IN">Infant</option>
                      </select>
                    </div>
                    <div className="form-group col-md-2 mb-2">
                      <label className="font-weight-bold text-muted small">
                        Country
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm border-secondary"
                        placeholder="Country"
                        value={row.country}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "country",
                            e.target.value
                          )
                        }
                        required
                        style={{ borderColor: "#6c757d" }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-3 mb-2">
                      <label className="font-weight-bold text-muted small">
                        Ticket Number
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm border-secondary"
                        placeholder="Ticket Number"
                        value={row.ticketnumber}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "ticketnumber",
                            e.target.value
                          )
                        }
                        style={{ borderColor: "#6c757d" }}
                      />
                    </div>
                    <div className="form-group col-md-3 mb-2">
                      <label className="font-weight-bold text-muted small">
                        Passport Number
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm border-secondary"
                        placeholder="Passport Number"
                        value={row.passportnumber}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "passportnumber",
                            e.target.value
                          )
                        }
                        required
                        style={{ borderColor: "#6c757d" }}
                      />
                    </div>
                    <div className="form-group col-md-3 mb-2">
                      <label className="font-weight-bold text-muted small">
                        Date of Birth
                      </label>
                      <div className="input-group">
                        <Flatpickr
                          value={row.dateofbirth}
                          onChange={(date) =>
                            handlePassengerChange(index, "dateofbirth", date[0])
                          }
                          options={{ dateFormat: "Y-m-d" }}
                          className="form-control form-control-sm border-secondary"
                          required
                        />
                        <div className="input-group-append">
                          <span
                            className="input-group-text border-secondary"
                            style={{
                              borderColor: "#6c757d",
                              backgroundColor: "white",
                            }}
                          >
                            <i className="fas fa-calendar-alt text-muted"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-3 mb-2">
                      <label className="font-weight-bold text-muted small">
                        Passport Expiry
                      </label>
                      <div className="input-group">
                        <Flatpickr
                          value={row.passportexpirydate}
                          onChange={(date) =>
                            handlePassengerChange(
                              index,
                              "passportexpirydate",
                              date[0]
                            )
                          }
                          options={{ dateFormat: "Y-m-d" }}
                          className="form-control form-control-sm border-secondary"
                        />
                        <div className="input-group-append">
                          <span
                            className="input-group-text border-secondary"
                            style={{
                              borderColor: "#6c757d",
                              backgroundColor: "white",
                            }}
                          >
                            <i className="fas fa-calendar-alt text-muted"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Right Aligned */}
                  <div className="row justify-content-end mt-3">
                    <div className="col-auto">
                      {index === passengerRows.length - 1 &&
                        passengerRows.length < 5 && (
                          <button
                            type="button"
                            className="btn"
                            onClick={handleAddPassengerRow}
                            onMouseEnter={(e) =>
                              (e.target.style.transform = "translateY(-1px)")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.transform = "translateY(0)")
                            }
                            style={buttonStyles.plusButton}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        )}
                      {index === passengerRows.length - 1 &&
                        passengerRows.length > 1 && (
                          <button
                            type="button"
                            className="btn"
                            onClick={handleRemovePassengerRow}
                            onMouseEnter={(e) =>
                              (e.target.style.transform = "translateY(-1px)")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.transform = "translateY(0)")
                            }
                            style={buttonStyles.minusButton}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flight Information Section */}
        <div
          className="card shadow-sm mb-4"
          style={{ borderTop: "4px solid #FF5015", borderRadius: "8px" }}
        >
          <div
            className="card-header bg-warning text-dark p-3"
            style={{ borderRadius: "8px 8px 0 0" }}
          >
            <h5 className="mb-0">
              <i className="fas fa-plane me-2"></i>Flight Information
            </h5>
          </div>
          <div className="card-body p-4">
            <LoadScript
              googleMapsApiKey={googleMapsApiKey}
              libraries={libraries}
            >
              {flightRows.map((row, index) => (
                <div
                  key={index}
                  className="card mb-3"
                  style={{ border: "1px solid #dee2e6", borderRadius: "6px" }}
                >
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="form-group col-md-2 mb-2">
                        <label className="font-weight-bold text-muted small">
                          Airline
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm border-secondary"
                          placeholder="Airline"
                          value={row.airline}
                          onChange={(e) =>
                            handleFlightChange(index, "airline", e.target.value)
                          }
                          required
                          style={{ borderColor: "#6c757d" }}
                        />
                      </div>
                      <div className="form-group col-md-2 mb-2">
                        <label className="font-weight-bold text-muted small">
                          Flight #
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm border-secondary"
                          placeholder="Flight Number"
                          value={row.flightnumber}
                          onChange={(e) =>
                            handleFlightChange(
                              index,
                              "flightnumber",
                              e.target.value
                            )
                          }
                          required
                          style={{ borderColor: "#6c757d" }}
                        />
                      </div>
                      <div className="form-group col-md-2 mb-2">
                        <label className="font-weight-bold text-muted small">
                          PNR
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm border-secondary"
                          placeholder="Flight PNR"
                          value={row.flightpnr}
                          onChange={(e) =>
                            handleFlightChange(
                              index,
                              "flightpnr",
                              e.target.value
                            )
                          }
                          required
                          style={{ borderColor: "#6c757d" }}
                        />
                      </div>
                      <div className="form-group col-md-2 mb-2">
                        <label className="font-weight-bold text-muted small">
                          Class
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm border-secondary"
                          placeholder="Class"
                          value={row.classoftravel}
                          onChange={(e) =>
                            handleFlightChange(
                              index,
                              "classoftravel",
                              e.target.value
                            )
                          }
                          required
                          style={{ borderColor: "#6c757d" }}
                        />
                      </div>
                      <div className="form-group col-md-2 mb-2">
                        <label className="font-weight-bold text-muted small">
                          From
                        </label>
                        <StandaloneSearchBox>
                          <input
                            type="text"
                            className="form-control form-control-sm border-secondary"
                            placeholder="Departure"
                            value={row.departure}
                            onChange={(e) =>
                              handleFlightChange(
                                index,
                                "departure",
                                e.target.value
                              )
                            }
                            required
                            style={{ borderColor: "#6c757d" }}
                          />
                        </StandaloneSearchBox>
                      </div>
                      <div className="form-group col-md-2 mb-2">
                        <label className="font-weight-bold text-muted small">
                          To
                        </label>
                        <StandaloneSearchBox>
                          <input
                            type="text"
                            className="form-control form-control-sm border-secondary"
                            placeholder="Arrival"
                            value={row.arrival}
                            onChange={(e) =>
                              handleFlightChange(
                                index,
                                "arrival",
                                e.target.value
                              )
                            }
                            required
                            style={{ borderColor: "#6c757d" }}
                          />
                        </StandaloneSearchBox>
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group col-md-2 mb-2">
                        <label className="font-weight-bold text-muted small">
                          Depart Date
                        </label>
                        <div className="input-group">
                          <Flatpickr
                            value={row.departuredate}
                            onChange={(date) =>
                              handleFlightChange(
                                index,
                                "departuredate",
                                date[0]
                              )
                            }
                            options={{ dateFormat: "Y-m-d" }}
                            className="form-control form-control-sm border-secondary"
                            required
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text border-secondary"
                              style={{
                                borderColor: "#6c757d",
                                backgroundColor: "white",
                              }}
                            >
                              <i className="fas fa-calendar-alt text-muted"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-md-2 mb-2">
                        <label className="font-weight-bold text-muted small">
                          Arrive Date
                        </label>
                        <div className="input-group">
                          <Flatpickr
                            value={row.arrivaldate}
                            onChange={(date) =>
                              handleFlightChange(index, "arrivaldate", date[0])
                            }
                            options={{ dateFormat: "Y-m-d" }}
                            className="form-control form-control-sm border-secondary"
                            required
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text border-secondary"
                              style={{
                                borderColor: "#6c757d",
                                backgroundColor: "white",
                              }}
                            >
                              <i className="fas fa-calendar-alt text-muted"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-md-2 mb-2">
                        <label className="font-weight-bold text-muted small">
                          Depart Time
                        </label>
                        <input
                          type="time"
                          className="form-control form-control-sm border-secondary"
                          value={row.departuretime}
                          onChange={(e) =>
                            handleFlightChange(
                              index,
                              "departuretime",
                              e.target.value
                            )
                          }
                          required
                          style={{ borderColor: "#6c757d" }}
                        />
                      </div>
                      <div className="form-group col-md-2 mb-2">
                        <label className="font-weight-bold text-muted small">
                          Arrive Time
                        </label>
                        <input
                          type="time"
                          className="form-control form-control-sm border-secondary"
                          value={row.arrivaltime}
                          onChange={(e) =>
                            handleFlightChange(
                              index,
                              "arrivaltime",
                              e.target.value
                            )
                          }
                          required
                          style={{ borderColor: "#6c757d" }}
                        />
                      </div>
                      <div className="form-group col-md-2 mb-2">
                        <label className="font-weight-bold text-muted small">
                          Duration
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm border-secondary"
                          placeholder="hh:mm"
                          value={row.travelduration}
                          onChange={(e) =>
                            handleFlightChange(
                              index,
                              "travelduration",
                              e.target.value
                            )
                          }
                          required
                          style={{ borderColor: "#6c757d" }}
                        />
                      </div>
                      <div className="form-group col-md-2 mb-2">
                        <label className="font-weight-bold text-muted small">
                          Meal
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm border-secondary"
                          placeholder="Meal"
                          value={row.meal}
                          onChange={(e) =>
                            handleFlightChange(index, "meal", e.target.value)
                          }
                          style={{ borderColor: "#6c757d" }}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group col-md-3 mb-2">
                        <label className="font-weight-bold text-muted small">
                          Baggage Qty
                        </label>
                        <input
                          type="number"
                          className="form-control form-control-sm border-secondary"
                          placeholder="Quantity"
                          value={row.baggageqty}
                          onChange={(e) =>
                            handleFlightChange(
                              index,
                              "baggageqty",
                              e.target.value
                            )
                          }
                          required
                          style={{ borderColor: "#6c757d" }}
                        />
                      </div>
                      <div className="form-group col-md-3 mb-2">
                        <label className="font-weight-bold text-muted small">
                          Baggage Unit
                        </label>
                        <select
                          className="form-control form-control-sm border-secondary"
                          value={row.baggageunit}
                          onChange={(e) =>
                            handleFlightChange(
                              index,
                              "baggageunit",
                              e.target.value
                            )
                          }
                          required
                          style={{ borderColor: "#6c757d" }}
                        >
                          <option value="KG">KG</option>
                          <option value="LB">LB</option>
                        </select>
                      </div>
                      <div className="form-group col-md-6 d-flex justify-content-end align-items-center">
                        <div className="d-flex align-items-center">
                          {index === flightRows.length - 1 &&
                            flightRows.length < 4 && (
                              <button
                                type="button"
                                className="btn"
                                onClick={handleAddFlightRow}
                                onMouseEnter={(e) =>
                                  (e.target.style.transform =
                                    "translateY(-1px)")
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.transform = "translateY(0)")
                                }
                                style={buttonStyles.plusButton}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            )}
                          {index === flightRows.length - 1 &&
                            flightRows.length > 1 && (
                              <button
                                type="button"
                                className="btn"
                                onClick={handleRemoveFlightRow}
                                onMouseEnter={(e) =>
                                  (e.target.style.transform =
                                    "translateY(-1px)")
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.transform = "translateY(0)")
                                }
                                style={buttonStyles.minusButton}
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </LoadScript>
          </div>
        </div>

        {/* Supplier Price Breakdown Section */}
        <div
          className="card shadow-sm mb-4"
          style={{ borderTop: "4px solid #FF5015", borderRadius: "8px" }}
        >
          <div
            className="card-header bg-secondary text-white p-3"
            style={{ borderRadius: "8px 8px 0 0" }}
          >
            <h5 className="mb-0">
              <i className="fas fa-calculator me-2"></i>Supplier Price Breakdown
            </h5>
          </div>
          <div className="card-body p-4">
            <div className="row">
              <div className="form-group col-md-4 mb-3">
                <label className="font-weight-bold text-muted">
                  Supplier Currency
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-light border-secondary">
                      <i className="fas fa-exchange-alt text-secondary"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    name="supplierCurrency"
                    value={formData.supplierCurrency}
                    onChange={handleInputChange}
                    className="form-control form-control-sm border-secondary required"
                    required
                    style={{ borderColor: "#6c757d" }}
                  />
                </div>
              </div>
              <div className="form-group col-md-4 mb-3">
                <label className="font-weight-bold text-muted">Base Fare</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-light border-secondary">
                      <i className="fas fa-minus text-secondary"></i>
                    </span>
                  </div>
                  <input
                    type="number"
                    name="supplierRate"
                    value={formData.supplierRate}
                    onChange={handleInputChange}
                    className="form-control form-control-sm border-secondary required"
                    required
                    style={{ borderColor: "#6c757d" }}
                  />
                </div>
              </div>
              <div className="form-group col-md-4 mb-3">
                <label className="font-weight-bold text-muted">
                  Total Fare
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-light border-secondary">
                      <i className="fas fa-equals text-secondary"></i>
                    </span>
                  </div>
                  <input
                    type="number"
                    name="supplierTotalRate"
                    value={formData.supplierTotalRate}
                    onChange={handleInputChange}
                    className="form-control form-control-sm border-secondary required"
                    required
                    style={{ borderColor: "#6c757d" }}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <h6 className="text-muted mb-3">
                  <i className="fas fa-chart-pie me-1"></i>Passenger Fare
                  Breakdown
                </h6>
                <div className="table-responsive">
                  <table className="table  table-sm">
                    <thead className="thead-light">
                      <tr>
                        <th className="border-0">Passenger Type</th>
                        <th className="border-0 text-right">Base Fare</th>
                        <th className="border-0 text-right">Tax</th>
                        <th className="border-0 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {fareBreakdown.map((fare, index) => {
                        const baseFare = fare.total - (fare.tax || 0);
                        return (
                          <tr key={index} className="border-bottom">
                            <td className="font-weight-bold">
                              {fare.type.charAt(0).toUpperCase() +
                                fare.type.slice(1)}
                            </td>
                            <td className="text-right">
                              <input
                                type="number"
                                className="form-control form-control-sm w-75 mx-auto border-secondary"
                                value={baseFare}
                                onChange={(e) =>
                                  handleFareBreakdownChange(
                                    index,
                                    "total",
                                    parseFloat(e.target.value) + (fare.tax || 0)
                                  )
                                }
                                style={{ borderColor: "#6c757d" }}
                              />
                            </td>
                            <td className="text-right">
                              <input
                                type="number"
                                className="form-control form-control-sm w-75 mx-auto border-secondary"
                                value={fare.tax}
                                onChange={(e) =>
                                  handleFareBreakdownChange(
                                    index,
                                    "tax",
                                    parseFloat(e.target.value)
                                  )
                                }
                                style={{ borderColor: "#6c757d" }}
                              />
                            </td>
                            <td className="text-right font-weight-bold text-success">
                              <input
                                type="number"
                                className="form-control form-control-sm w-75 mx-auto border-success"
                                value={fare.total}
                                onChange={(e) =>
                                  handleFareBreakdownChange(
                                    index,
                                    "total",
                                    parseFloat(e.target.value)
                                  )
                                }
                                style={{
                                  borderColor: "#28a745",
                                  backgroundColor: "#d4edda",
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="table-info">
                        <td className="font-weight-bold">Total</td>
                        <td className="text-right font-weight-bold">
                          <input
                            type="number"
                            className="form-control form-control-sm w-75 mx-auto bg-light"
                            value={fareBreakdownTotals.baseFare}
                            readOnly
                            style={{
                              borderColor: "#007bff",
                              backgroundColor: "#e3f2fd",
                            }}
                          />
                        </td>
                        <td className="text-right font-weight-bold text-primary">
                          <input
                            type="number"
                            className="form-control form-control-sm w-75 mx-auto bg-light"
                            value={fareBreakdownTotals.tax}
                            readOnly
                            style={{
                              borderColor: "#007bff",
                              backgroundColor: "#e3f2fd",
                            }}
                          />
                        </td>
                        <td className="text-right font-weight-bold text-success">
                          <input
                            type="number"
                            className="form-control form-control-sm w-75 mx-auto border-success bg-light"
                            value={fareBreakdownTotals.total}
                            readOnly
                            style={{
                              borderColor: "#28a745",
                              backgroundColor: "#d4edda",
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className="text-center mb-4">
          <button
            type="submit"
            className="btn btn-lg btn-dark shadow-lg"
            style={{
              border: "none",
              color: "white",
              padding: "12px 40px",
              borderRadius: "50px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(0, 123, 255, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(0, 123, 255, 0.3)";
            }}
          >
            <i className="fas fa-save me-2"></i>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFlightBooking;
