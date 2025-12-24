/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useBookingDetails,
  updateBookingService,
} from "../../../Apis/DashboardAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingInfoForm from "./FlightBooking/BookingInfoForm";
import FareRulesForm from "./FlightBooking/FareRulesForm";
import PassengerDetailsForm from "./FlightBooking/PassengerDetailsForm";
import FlightInfoForm from "./FlightBooking/FlightInfoForm";
import SupplierPriceForm from "./FlightBooking/SupplierPriceForm";
import Header2 from "../../header2/header2";
import Swal from "sweetalert2";
import { useForm, FormProvider } from "react-hook-form"; // <-- Add this

// Main component handling logic and state
const EditFlightBooking = () => {
  const { bookingId } = useParams();
  const { data: bookingData, loading, error } = useBookingDetails(bookingId);
  // Initialize React Hook Form
  const methods = useForm({
    mode: "onChange", // or "onBlur" or "onTouched" depending on preference
    defaultValues: {
      booking_id: "",
      supplier: "",
      pnr: "",
      booking_status: "",
      contactemail: "",
      phone: "",
      trip_type: "oneway",
      cabin_type: "economy",
      bookingCurrency: "",
      bookingAmount: "",
      supplierCurrency: "",
      supplierRate: "0",
      supplierTotalRate: "0",
    },
  });

  const { handleSubmit, formState: { isSubmitting, isValid } } = methods;
  // Button styles
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
  };

  // Initialize states
  const [formData, setFormData] = useState({
    booking_id: "",
    supplier: "",
    pnr: "",
    booking_status: "",
    contactemail: "",
    phone: "",
    trip_type: "oneway",
    cabin_type: "economy",
    bookingCurrency: "",
    bookingAmount: "",
    supplierCurrency: "",
    supplierRate: "",
    supplierTotalRate: "",
  });

  const [numLegs, setNumLegs] = useState(1);
  const [flightRows, setFlightRows] = useState([]);
  const [passengerRows, setPassengerRows] = useState([]);
  const [fareRules, setFareRules] = useState([]);
  const [fareBreakdown, setFareBreakdown] = useState([]);

  // Helper function to format date
  const formatDate = (d) => {
    if (!d) return null;
    if (typeof d === "string") return d;
    if (d instanceof Date) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return null;
  };

  // Calculate duration between two datetimes
  const calculateDuration = (startDateStr, startTime, endDateStr, endTime) => {
    if (!startDateStr || !startTime || !endDateStr || !endTime) return "";
    const start = new Date(`${startDateStr}T${startTime}:00`);
    const end = new Date(`${endDateStr}T${endTime}:00`);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start)
      return "";
    const diffMs = end - start;
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  };

  // Parse duration string to hours and minutes
  const parseDuration = (durStr) => {
    if (!durStr) return { hours: 0, minutes: 0 };
    const parts = durStr.match(/(\d+)h (\d+)m/);
    if (!parts) return { hours: 0, minutes: 0 };
    return { hours: parseInt(parts[1]), minutes: parseInt(parts[2]) };
  };

  // Add two durations
  const addDurations = (dur1, dur2) => {
    const d1 = parseDuration(dur1);
    const d2 = parseDuration(dur2);
    let totalHours = d1.hours + d2.hours;
    let totalMinutes = d1.minutes + d2.minutes;
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes %= 60;
    return `${totalHours}h ${totalMinutes}m`;
  };

  // Initialize form data from API response
  useEffect(() => {
    if (bookingData) {
      const { trip_type, numLegs } = determineTripType(
        bookingData.iternary_details
      );
      setFormData({
        booking_id: bookingData.booking_id || "",
        supplier: bookingData.supplier || "",
        pnr: bookingData.pnr || "",
        booking_status: bookingData.booking_status || "",
        contactemail: bookingData.contact?.email || "",
        phone:
          bookingData.contact?.countryCode + bookingData.contact?.phoneNumber ||
          "",
        trip_type,
        cabin_type: bookingData.iternary_details?.cabin || "economy",
        bookingCurrency: bookingData.currency || "",
        bookingAmount: bookingData.amount || "",
        supplierCurrency: bookingData.currency || "",
        supplierRate:
          bookingData.iternary_details?.original_total_fare?.toString() || "0",
        supplierTotalRate:
          bookingData.iternary_details?.total_fare?.toString() || "0",
      });
      setNumLegs(numLegs);
      setFlightRows(initializeFlightRows(bookingData.iternary_details));
      setPassengerRows(
        bookingData.passengers.map((passenger) => ({
          salutation: passenger.PassengerTitle || "",
          firstname: passenger.PassengerFirstName || "",
          lastname: passenger.PassengerLastName || "",
          passengertype: passenger.PassengerType || "",
          dateofbirth: passenger.DateOfBirth || null,
          passportnumber: passenger.PassportNumber || "",
          passportexpirydate: passenger.PassportExpiryDate || null,
          country: passenger.PassportCountry || "",
          ticketnumber: passenger.tickets[0] || "",
        }))
      );
      setFareRules(
        bookingData.fare_rules?.map((rule) => ({
          category: rule.category || "",
          ruleText: rule.ruleText || "",
          changes: rule.changes || "",
          cancellations: rule.cancellations || "",
        })) || []
      );

      // Initialize fareBreakdown with all types: adult, child, infant
      const apiFareBreakdown =
        bookingData.iternary_details.fare?.map((fare) => ({
          type: Object.keys(fare)[0],
          total: fare[Object.keys(fare)[0]].total || 0,
          tax: fare[Object.keys(fare)[0]].tax || 0,
        })) || [];
      const allTypes = ["adult", "child", "infant"];
      const initializedFareBreakdown = allTypes.map((type) => {
        const existingFare = apiFareBreakdown.find((f) => f.type === type);
        return existingFare || { type, total: 0, tax: 0 };
      });
      setFareBreakdown(initializedFareBreakdown);
    }
  }, [bookingData]);

  // Sync fareBreakdown to always include adult, child, infant
  useEffect(() => {
    // const passengerTypeToFareType = (ptype) => {
    //   if (ptype === "AD") return "adult";
    //   if (ptype === "CH") return "child";
    //   if (ptype === "IN") return "infant";
    //   return null;
    // };
    // const passengerTypes = [
    //   ...new Set(
    //     passengerRows
    //       .map((p) => passengerTypeToFareType(p.passengertype))
    //       .filter(Boolean)
    //   ),
    // ];
    const allTypes = ["adult", "child", "infant"];
    const updatedFareBreakdown = allTypes.map((type) => {
      const existingFare = fareBreakdown.find((f) => f.type === type);
      return existingFare || { type, total: 0, tax: 0 };
    });

    // Only update state if fareBreakdown has changed
    if (
      JSON.stringify(updatedFareBreakdown) !== JSON.stringify(fareBreakdown)
    ) {
      setFareBreakdown(updatedFareBreakdown);
    }
  }, [passengerRows]);

  // Validation function
  const validateForm = () => {
    const errors = [];

    // Validate Booking Information
    if (!formData.booking_id) errors.push("Booking ID is required");
    if (!formData.supplier) errors.push("Supplier is required");
    if (!formData.booking_status) errors.push("Booking Status is required");
    if (
      !formData.contactemail ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactemail)
    ) {
      errors.push("Valid Contact Email is required");
    }
    if (!formData.phone || formData.phone.length < 10)
      errors.push("Valid Contact Number is required");
    if (!formData.cabin_type) errors.push("Cabin Type is required");
    if (!formData.trip_type) errors.push("Trip Type is required");
    if (!formData.bookingCurrency) errors.push("Booking Currency is required");
    if (
      !formData.bookingAmount ||
      isNaN(formData.bookingAmount) ||
      formData.bookingAmount <= 0
    ) {
      errors.push("Valid Booking Amount is required");
    }
    if (!formData.supplierCurrency)
      errors.push("Supplier Currency is required");
    if (
      !formData.supplierRate ||
      isNaN(formData.supplierRate) ||
      formData.supplierRate <= 0
    ) {
      errors.push("Valid Supplier Base Fare (>0) is required");
    }
    if (
      !formData.supplierTotalRate ||
      isNaN(formData.supplierTotalRate) ||
      formData.supplierTotalRate <= 0
    ) {
      errors.push("Valid Supplier Total Fare is required");
    }

    // Validate Flight Rows
    flightRows.forEach((row, index) => {
      if (!row.airline) errors.push(`Flight ${index + 1}: Airline is required`);
      // if (!row.flightnumber) errors.push(`Flight ${index + 1}: Flight Number is required`);
      //  if (!row.classoftravel) errors.push(`Flight ${index + 1}: Class of Travel is required`);
      if (!row.aircraft)
        errors.push(`Flight ${index + 1}: Aircraft is required`);
      if (!row.departure || !/^[A-Z]{3}$/.test(row.departure)) {
        errors.push(
          `Flight ${
            index + 1
          }: Valid Departure Airport Code (e.g., LHE) is required`
        );
      }
      if (!row.arrival || !/^[A-Z]{3}$/.test(row.arrival)) {
        errors.push(
          `Flight ${
            index + 1
          }: Valid Arrival Airport Code (e.g., DXB) is required`
        );
      }
      if (!row.departuredate)
        errors.push(`Flight ${index + 1}: Departure Date is required`);
      if (!row.arrivaldate)
        errors.push(`Flight ${index + 1}: Arrival Date is required`);
      if (!row.departuretime || !/^\d{2}:\d{2}$/.test(row.departuretime)) {
        errors.push(
          `Flight ${index + 1}: Valid Departure Time (HH:MM) is required`
        );
      }
      if (!row.arrivaltime || !/^\d{2}:\d{2}$/.test(row.arrivaltime)) {
        errors.push(
          `Flight ${index + 1}: Valid Arrival Time (HH:MM) is required`
        );
      }
      // Validate arrival after departure
      const depDateStr = formatDate(row.departuredate);
      const arrDateStr = formatDate(row.arrivaldate);
      if (depDateStr && arrDateStr && row.departuretime && row.arrivaltime) {
        const dep = new Date(`${depDateStr}T${row.departuretime}:00`);
        const arr = new Date(`${arrDateStr}T${row.arrivaltime}:00`);
        if (isNaN(dep.getTime()) || isNaN(arr.getTime())) {
          errors.push(`Flight ${index + 1}: Invalid date/time format`);
        } else if (arr <= dep) {
          errors.push(`Flight ${index + 1}: Arrival must be after departure`);
        }
      }
      if (!row.travelduration || !/^\d+h \d+m$/.test(row.travelduration)) {
        errors.push(
          `Flight ${
            index + 1
          }: Valid Travel Duration (e.g., 3h 35m) is required`
        );
      }
      if (!row.layover || !/^\d+h \d+m$/.test(row.layover)) {
        errors.push(
          `Flight ${index + 1}: Valid Layover Time (e.g., 0h 0m) is required`
        );
      }
      if (!row.totalduration || !/^\d+h \d+m$/.test(row.totalduration)) {
        errors.push(
          `Flight ${index + 1}: Valid Total Duration (e.g., 3h 35m) is required`
        );
      }
      if (!row.baggageqty || isNaN(row.baggageqty) || row.baggageqty < 0) {
        errors.push(
          `Flight ${index + 1}: Valid Check-in Baggage Quantity is required`
        );
      }
      if (!row.baggageunit)
        errors.push(`Flight ${index + 1}: Check-in Baggage Unit is required`);
      if (!row.cabinbaggageunit)
        errors.push(`Flight ${index + 1}: Cabin Baggage Unit is required`);
      if (
        row.cabinbaggageunit !== "SB" &&
        (!row.cabinbaggageqty ||
          isNaN(row.cabinbaggageqty) ||
          row.cabinbaggageqty < 0)
      ) {
        errors.push(
          `Flight ${index + 1}: Valid Cabin Baggage Quantity is required`
        );
      }
    });

    // Validate Passenger Rows
    passengerRows.forEach((row, index) => {
      if (!row.salutation)
        errors.push(`Passenger ${index + 1}: Salutation is required`);
      if (!row.firstname)
        errors.push(`Passenger ${index + 1}: First Name is required`);
      if (!row.lastname)
        errors.push(`Passenger ${index + 1}: Last Name is required`);
      if (!row.passengertype)
        errors.push(`Passenger ${index + 1}: Passenger Type is required`);
      if (!row.dateofbirth)
        errors.push(`Passenger ${index + 1}: Date of Birth is required`);
      if (!row.passportnumber)
        errors.push(`Passenger ${index + 1}: Passport Number is required`);
      if (!row.passportexpirydate)
        errors.push(`Passenger ${index + 1}: Passport Expiry Date is required`);
      if (!row.country)
        errors.push(`Passenger ${index + 1}: Country is required`);
    });

    // Validate Fare Rules
    fareRules.forEach((rule, index) => {
      if (!rule.category)
        errors.push(`Fare Rule ${index + 1}: Category is required`);
      if (!rule.ruleText)
        errors.push(`Fare Rule ${index + 1}: Rule Text is required`);
    });

    // Validate Fare Breakdown
    const passengerTypeMap = {
      adult: "AD",
      child: "CH",
      infant: "IN",
    };
    const requiredTypes = Object.keys(passengerTypeMap).filter((type) =>
      passengerRows.some((p) => p.passengertype === passengerTypeMap[type])
    );
    requiredTypes.forEach((type) => {
      const fare = fareBreakdown.find((f) => f.type === type);
      if (!fare) {
        errors.push(
          `Fare Breakdown for ${
            type.charAt(0).toUpperCase() + type.slice(1)
          } is required`
        );
      } else {
        if (isNaN(fare.total) || fare.total < 0) {
          errors.push(
            `Fare Breakdown for ${
              type.charAt(0).toUpperCase() + type.slice(1)
            }: Valid Total Fare (>=0) is required`
          );
        }
        if (isNaN(fare.tax) || fare.tax < 0) {
          errors.push(
            `Fare Breakdown for ${
              type.charAt(0).toUpperCase() + type.slice(1)
            }: Valid Tax Amount (>=0) is required`
          );
        }
      }
    });
    console.log("Fare Breakdown:", fareBreakdown);
    const totalFare = fareBreakdown.reduce(
      (sum, fare) => sum + (fare.total + fare.tax || 0),
      0
    );
    if (Math.abs(totalFare - parseFloat(formData.supplierTotalRate)) > 0.01) {
      errors.push(
        `Sum of fare breakdown totals (${totalFare.toFixed(
          2
        )}) must equal Supplier Total Fare (${formData.supplierTotalRate})`
      );
    }

    return errors;
  };

  // Helper functions
  const determineTripType = (iternary) => {
    if (iternary.segments) {
      return { trip_type: "oneway", numLegs: 1 };
    } else if (iternary.legs) {
      return {
        trip_type: iternary.legs.length === 2 ? "return" : "multicity",
        numLegs: iternary.legs.length,
      };
    }
    return { trip_type: "oneway", numLegs: 1 };
  };

  const initializeFlightRows = (iternary) => {
    if (iternary.segments) {
      return iternary.segments.map((segment) => ({
        airline: segment.operated_by || "",
        flightnumber: segment.flight_number || "",
        //flightpnr: bookingData?.pnr || "",
        //classoftravel: iternary.cabin || "",
        departure: segment.origin || "",
        arrival: segment.destination || "",
        departuredate: segment.departure_date || null,
        arrivaldate: segment.arrival_date || null,
        departuretime: segment.departure_time?.slice(0, 5) || "",
        arrivaltime: segment.arrival_time?.slice(0, 5) || "",
        travelduration: segment.estimate_time || "",
        layover:
          segment.layover_time === "0m"
            ? "0h 0m"
            : segment.layover_time || "0h 0m",
        totalduration: segment.total_time || "",
        baggageqty:
          segment.baggage_info?.checkin_baggage[0]?.value.replace(
            /[^0-9]/g,
            ""
          ) || "0",
        baggageunit: segment.baggage_info?.checkin_baggage[0]?.value.includes(
          "KG"
        )
          ? "KG"
          : "LB",
        cabinbaggageqty:
          segment.baggage_info?.cabin_baggage[0]?.value.replace(
            /[^0-9]/g,
            ""
          ) || "0",
        cabinbaggageunit:
          segment.baggage_info?.cabin_baggage[0]?.value.includes("KG")
            ? "KG"
            : "SB",
        aircraft: segment.aircraft || "",
        leg: 1,
      }));
    } else if (iternary.legs) {
      return iternary.legs.flatMap((leg, legIndex) =>
        leg.map((segment) => ({
          airline: segment.operated_by || "",
          flightnumber: segment.flight_number || "",
          //flightpnr: bookingData?.pnr || "",
          //classoftravel: iternary.cabin || "",
          departure: segment.origin || "",
          arrival: segment.destination || "",
          departuredate: segment.departure_date || null,
          arrivaldate: segment.arrival_date || null,
          departuretime: segment.departure_time?.slice(0, 5) || "",
          arrivaltime: segment.arrival_time?.slice(0, 5) || "",
          travelduration: segment.estimate_time || "",
          layover:
            segment.layover_time === "0m"
              ? "0h 0m"
              : segment.layover_time || "0h 0m",
          totalduration: segment.total_time || "",
          baggageqty:
            segment.baggage_info?.checkin_baggage[0]?.value.replace(
              /[^0-9]/g,
              ""
            ) || "0",
          baggageunit: segment.baggage_info?.checkin_baggage[0]?.value.includes(
            "KG"
          )
            ? "KG"
            : "LB",
          cabinbaggageqty:
            segment.baggage_info?.cabin_baggage[0]?.value.replace(
              /[^0-9]/g,
              ""
            ) || "0",
          cabinbaggageunit:
            segment.baggage_info?.cabin_baggage[0]?.value.includes("KG")
              ? "KG"
              : "SB",
          aircraft: segment.aircraft || "",
          leg: legIndex + 1,
        }))
      );
    }
    return [createDefaultFlightRow(1, iternary.cabin || "economy")];
  };

  const createDefaultFlightRow = (legNum) => ({
    airline: "",
    flightnumber: "",
    //flightpnr: "",
    //classoftravel: cabinType,
    departure: "",
    arrival: "",
    departuredate: null,
    arrivaldate: null,
    departuretime: "",
    arrivaltime: "",
    travelduration: "",
    layover: "0h 0m",
    totalduration: "",
    baggageqty: "0",
    baggageunit: "KG",
    cabinbaggageqty: "0",
    cabinbaggageunit: "SB",
    aircraft: "",
    leg: legNum,
  });

  // Event handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "trip_type") {
      let newNumLegs = 1;
      let newFlightRows = flightRows;

      if (value === "oneway") {
        newNumLegs = 1;
        newFlightRows = flightRows.map((row) => ({ ...row, leg: 1 }));
        if (!newFlightRows.some((row) => row.leg === 1)) {
          newFlightRows = [createDefaultFlightRow(1, formData.cabin_type)];
        }
      } else if (value === "return") {
        newNumLegs = 2;
        newFlightRows = flightRows.map((row, index) => ({
          ...row,
          leg: Math.min(index + 1, 2),
        }));
        const leg1Exists = newFlightRows.some((row) => row.leg === 1);
        const leg2Exists = newFlightRows.some((row) => row.leg === 2);
        if (!leg1Exists)
          newFlightRows.push(createDefaultFlightRow(1, formData.cabin_type));
        if (!leg2Exists)
          newFlightRows.push(createDefaultFlightRow(2, formData.cabin_type));
      } else if (value === "multicity") {
        newNumLegs = Math.max(2, numLegs);
        newFlightRows = [...flightRows];
        for (let leg = 1; leg <= newNumLegs; leg++) {
          if (!newFlightRows.some((row) => row.leg === leg)) {
            newFlightRows.push(
              createDefaultFlightRow(leg, formData.cabin_type)
            );
          }
        }
      }

      setNumLegs(newNumLegs);
      setFlightRows(
        newFlightRows.filter(
          (row, index, self) => index === self.findIndex((r) => r === row)
        )
      );
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleFlightChange = (index, field, value) => {
    const newRows = [...flightRows];
    if (
      ["departuredate", "arrivaldate"].includes(field) &&
      value instanceof Date
    ) {
      value = formatDate(value);
    }
    newRows[index][field] = value;
    const row = newRows[index];
    const depDateStr = formatDate(row.departuredate);
    const arrDateStr = formatDate(row.arrivaldate);
    if (depDateStr && arrDateStr && row.departuretime && row.arrivaltime) {
      row.travelduration = calculateDuration(
        depDateStr,
        row.departuretime,
        arrDateStr,
        row.arrivaltime
      );
    }
    if (row.travelduration && row.layover) {
      row.totalduration = addDurations(row.travelduration, row.layover);
    } else if (row.travelduration) {
      row.totalduration = row.travelduration;
    }
    setFlightRows(newRows);
  };

  const handlePassengerChange = (index, field, value) => {
    const newRows = [...passengerRows];
    if (
      ["dateofbirth", "passportexpirydate"].includes(field) &&
      value instanceof Date
    ) {
      value = formatDate(value);
    }
    newRows[index][field] = value;
    setPassengerRows(newRows);
  };

  const handleFareRuleChange = (index, field, value) => {
    const newRules = [...fareRules];
    newRules[index][field] = value;
    setFareRules(newRules);
  };

  const handleFareBreakdownChange = (index, field, value) => {
    const newFareBreakdown = [...fareBreakdown];
    newFareBreakdown[index][field] =
      field === "type" ? value : parseFloat(value) || 0;
    setFareBreakdown(newFareBreakdown);
  };

  const handleAddFareRule = () => {
    if (
      fareRules.length === 0 ||
      (fareRules[fareRules.length - 1].category &&
        fareRules[fareRules.length - 1].ruleText)
    ) {
      setFareRules([
        ...fareRules,
        { category: "", ruleText: "", changes: "", cancellations: "" },
      ]);
    } else {
      toast.error(
        "Please fill all required fields in the current fare rule before adding a new one"
      );
    }
  };

  const handleRemoveFareRule = (index) => {
    if (fareRules.length > 1) {
      setFareRules(fareRules.filter((_, i) => i !== index));
    } else {
      toast.error("At least one fare rule is required");
    }
  };

  const handleAddFlightRow = (legNum) => {
    const legRows = flightRows.filter((row) => row.leg === legNum);
    const lastRow = legRows[legRows.length - 1];
    const isLastRowFilled =
      lastRow &&
      Object.entries(lastRow).every(
        ([key, value]) =>
          key === "flightpnr" || (value !== "" && value !== null)
      );
    if (!lastRow || isLastRowFilled) {
      setFlightRows([
        ...flightRows,
        createDefaultFlightRow(legNum, formData.cabin_type),
      ]);
    } else {
      toast.error(
        "Please fill all required fields in the current flight row before adding a new one"
      );
    }
  };

  const handleRemoveFlightRow = (index) => {
    const leg = flightRows[index].leg;
    if (flightRows.filter((row) => row.leg === leg).length > 1) {
      setFlightRows(flightRows.filter((_, i) => i !== index));
    } else {
      toast.error("Each leg must have at least one segment");
    }
  };

  const handleAddLeg = () => {
    if (formData.trip_type === "multicity" && numLegs < 10) {
      const newLegNum = numLegs + 1;
      setNumLegs(newLegNum);
      setFlightRows([
        ...flightRows,
        createDefaultFlightRow(newLegNum, formData.cabin_type),
      ]);
    } else if (formData.trip_type === "multicity") {
      toast.error("Maximum of 10 legs allowed for multicity trips");
    }
  };

  const handleRemoveLeg = () => {
    if (formData.trip_type === "multicity" && numLegs > 2) {
      setNumLegs(numLegs - 1);
      setFlightRows(flightRows.filter((row) => row.leg <= numLegs - 1));
    } else {
      toast.error("Multicity trips must have at least 2 legs");
    }
  };

  const handleAddPassengerRow = () => {
    const lastRow = passengerRows[passengerRows.length - 1];
    const isLastRowFilled =
      lastRow &&
      Object.entries(lastRow).every(
        ([key, value]) =>
          key === "ticketnumber" || (value !== "" && value !== null)
      );
    if (isLastRowFilled) {
      if (passengerRows.length < 9) {
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
        toast.error("Maximum of 9 passengers allowed");
      }
    } else {
      toast.error(
        "Please fill all required fields in the current passenger row before adding a new one"
      );
    }
  };

  const handleRemovePassengerRow = () => {
    if (passengerRows.length > 1) {
      setPassengerRows(passengerRows.slice(0, -1));
    } else {
      toast.error("At least one passenger is required");
    }
  };

  const onSubmit = async (data) => {
   // e.preventDefault();
    // const errors = validateForm();
    // if (errors.length > 0) {
    //   errors.forEach((error) => toast.error(error));
    //   return;
    // }

    const segments = flightRows.map((row) => ({
      origin: row.departure,
      destination: row.arrival,
      departure_date: formatDate(row.departuredate),
      departure_time: `${row.departuretime}:00`,
      arrival_date: formatDate(row.arrivaldate),
      arrival_time: `${row.arrivaltime}:00`,
      airline_image: `${row.airline.toLowerCase()}.png`,
      operated_by: row.airline,
      flight_number: row.flightnumber,
      aircraft: row.aircraft,
      estimate_time: row.travelduration,
      layover_time: row.layover === "0h 0m" ? "0m" : row.layover,
      total_time: row.totalduration,
      baggage_info: {
        checkin_baggage: [
          { type: "ADT", value: `${row.baggageqty}${row.baggageunit}` },
        ],
        cabin_baggage: [
          {
            type: "ADT",
            value:
              row.cabinbaggageunit === "SB"
                ? "SB"
                : `${row.cabinbaggageqty}${row.cabinbaggageunit}`,
          },
        ],
      },
    }));

    const passengers = passengerRows.map((row) => ({
      Gender:
        row.passengertype === "AD"
          ? "M"
          : row.passengertype === "CH"
          ? "M"
          : "U",
      tickets: [row.ticketnumber].filter(Boolean),
      NationalID:
        bookingData?.passengers.find(
          (p) => p.PassengerFirstName === row.firstname
        )?.NationalID || "",
      DateOfBirth: formatDate(row.dateofbirth),
      PassengerType: row.passengertype,
      PassengerTitle: row.salutation,
      PassportNumber: row.passportnumber,
      PassportCountry: row.country,
      PassengerLastName: row.lastname,
      PassengerFirstName: row.firstname,
      PassportExpiryDate: formatDate(row.passportexpirydate),
      PassengerNationality: row.country,
    }));

    const fare = fareBreakdown.map((fare) => ({
      [fare.type]: {
        total: fare.total,
        tax: fare.tax,
      },
    }));

    const iternary_details = {
      api: bookingData?.iternary_details.api || "mistifly",
      api_code: bookingData?.iternary_details.api_code || "mf-0001",
      cabin: formData.cabin_type,
      pax: {
        AD: passengerRows.filter((p) => p.passengertype === "AD").length,
        CH: passengerRows.filter((p) => p.passengertype === "CH").length,
        IN: passengerRows.filter((p) => p.passengertype === "IN").length,
      },
      fare,
      total_fare: parseFloat(data.supplierTotalRate) || 0,
      original_total_fare: parseFloat(data.supplierRate) || 0,
      fare_currency: data.supplierCurrency,
      marketed_by: bookingData?.iternary_details.marketed_by || "Public",
      operated_by: bookingData?.iternary_details.operated_by || "",
      flight_id: bookingData?.iternary_details.flight_id || 0,
      strikeThrough: bookingData?.iternary_details.strikeThrough || false,
      promo: bookingData?.iternary_details.promo || null,
      currency_metadata: bookingData?.iternary_details.currency_metadata || {
        base_conversion: { from: "USD", to: "USD", applied: false, rate: "1" },
        user_conversion: { from: "USD", to: "USD", applied: false, rate: "1" },
      },
      appliedRevenueRules:
        bookingData?.iternary_details.appliedRevenueRules || null,
    };

    if (formData.trip_type === "oneway") {
      iternary_details.segments = segments;
      iternary_details.total_estimate_time = segments.reduce((total, seg) => {
        const d = parseDuration(seg.estimate_time);
        return total + d.hours * 60 + d.minutes;
      }, 0);
      const hours = Math.floor(iternary_details.total_estimate_time / 60);
      const minutes = iternary_details.total_estimate_time % 60;
      iternary_details.total_estimate_time = `${hours}h ${minutes}m`;
    } else {
      const legs = Array.from({ length: numLegs }, (_, i) => i + 1)
        .map((legNum) =>
          segments.filter((_, index) => flightRows[index].leg === legNum)
        )
        .filter((leg) => leg.length > 0);
      iternary_details.legs = legs;
      iternary_details.total_estimate_time = segments.reduce((total, seg) => {
        const d = parseDuration(seg.estimate_time);
        return total + d.hours * 60 + d.minutes;
      }, 0);
      const hours = Math.floor(iternary_details.total_estimate_time / 60);
      const minutes = iternary_details.total_estimate_time % 60;
      iternary_details.total_estimate_time = `${hours}h ${minutes}m`;
    }

    const phoneMatch = data.phone.match(/(\+\d{1,3})(\d+)/);
    const countryCode = phoneMatch ? phoneMatch[1] : "+92";
    const phoneNumber = phoneMatch ? phoneMatch[2] : data.phone;

    const updatedData = {
      booking_id: data.booking_id,
      service_type: data?.service_type || "Flight",
      supplier: data.supplier,
      supplierrefno: bookingData?.supplierrefno || null,
      service_start_date:
        segments[0]?.departure_date + "T" + segments[0]?.departure_time,
      service_end_date:
        segments[segments.length - 1]?.arrival_date +
        "T" +
        segments[segments.length - 1]?.arrival_time,
      pnr: formData.pnr,
      booking_timestamps: bookingData?.booking_timestamps || {
        date: "",
        time: "",
      },
      amount: data.bookingAmount,
      currency: data.bookingCurrency,
      booking_status: data.booking_status,
      contact: {
        email: data.contactemail,
        countryCode,
        phoneNumber,
      },
      passengers,
      iternary_details,
      fare_rules: fareRules,
      transactions: bookingData?.transactions || [],
    };
    const result = await updateBookingService(
      updatedData.booking_id,
      updatedData
    );
    //console.log("Update Result:", result);
    if (result.success) {
      Swal.fire("Success", "Booking Updated Successfully", "success");
      //navigate('/exchange-rates');
    } else {
      Swal.fire("Error", result.message, "error");
    }
    // console.log("Updated Form Data:", JSON.stringify(updatedData, null, 2));
    //toast.success("Booking updated successfully!");
    return updatedData;
  };
  useEffect(() => {
  if (bookingData) {
    const { trip_type, numLegs } = determineTripType(
      bookingData.iternary_details
    );
    
     const apiFareBreakdown =
      bookingData.iternary_details.fare?.map((fare) => ({
        type: Object.keys(fare)[0],
        total: fare[Object.keys(fare)[0]].total || 0,
        tax: fare[Object.keys(fare)[0]].tax || 0,
      })) || [];
       const allTypes = ["adult", "child", "infant"];
    const initializedFareBreakdown = allTypes.map((type) => {
      const existingFare = apiFareBreakdown.find((f) => f.type === type);
      return existingFare || { type, total: 0, tax: 0 };
    });
   
    setFareBreakdown(initializedFareBreakdown);

    // Reset React Hook Form fields
    methods.reset({
      booking_id: bookingData.booking_id || "",
      supplier: bookingData.supplier || "",
      pnr: bookingData.pnr || "",
      booking_status: bookingData.booking_status || "",
      contactemail: bookingData.contact?.email || "",
      phone:
        bookingData.contact?.countryCode + bookingData.contact?.phoneNumber ||
        "",
      trip_type,
      cabin_type: bookingData.iternary_details?.cabin || "economy",
      bookingCurrency: bookingData.currency || "",
      bookingAmount: bookingData.amount || "",
      supplierCurrency: bookingData.currency || "",
      supplierRate:
        bookingData.iternary_details?.original_total_fare?.toString() || "0",
      supplierTotalRate:
        bookingData.iternary_details?.total_fare?.toString() || "0",
      fareRules:
    bookingData.fare_rules?.map((rule) => ({
      category: rule.category || "",
      ruleText: rule.ruleText || "",
      changes: rule.changes || "",
      cancellations: rule.cancellations || "",
    })) || [{ category: "", ruleText: "", changes: "", cancellations: "" }],
    passengers: bookingData.passengers.map((passenger) => ({
    salutation: passenger.PassengerTitle || "",
    firstname: passenger.PassengerFirstName || "",
    lastname: passenger.PassengerLastName || "",
    passengertype: passenger.PassengerType || "",
    dateofbirth: passenger.DateOfBirth || null,
    passportnumber: passenger.PassportNumber || "",
    passportexpirydate: passenger.PassportExpiryDate || null,
    country: passenger.PassportCountry || "",
    ticketnumber: passenger.tickets[0] || "",
  })),
  legs: initializeFlightRows(bookingData.iternary_details).map(row => ({
    segments: [row] // wrap each in segments array per leg
  })),
  fareBreakdown: initializedFareBreakdown,
    });

    // Set dynamic state values
    setNumLegs(numLegs);
    setFlightRows(initializeFlightRows(bookingData.iternary_details));

    setPassengerRows(
      bookingData.passengers.map((passenger) => ({
        salutation: passenger.PassengerTitle || "",
        firstname: passenger.PassengerFirstName || "",
        lastname: passenger.PassengerLastName || "",
        passengertype: passenger.PassengerType || "",
        dateofbirth: passenger.DateOfBirth || null,
        passportnumber: passenger.PassengerNumber || "",
        passportexpirydate: passenger.PassportExpiryDate || null,
        country: passenger.PassportCountry || "",
        ticketnumber: passenger.tickets[0] || "",
      }))
    );

    setFareRules(
      bookingData.fare_rules?.map((rule) => ({
        category: rule.category || "",
        ruleText: rule.ruleText || "",
        changes: rule.changes || "",
        cancellations: rule.cancellations || "",
      })) || []
    );

    // Initialize fareBreakdown ensuring adult, child, infant are always present
   
  }
}, [bookingData, methods]);
  if (loading) return <div>Loading...</div>;
  if (error) {
    toast.error("Failed to load booking data");
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      className="pt-0 p-4"
      id="content-pad"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Header2
        title="Edit Flight Booking"
        linkText1="Search Bookings"
        linkText2="Edit Flight Booking"
        link1="/"
      />
      <FormProvider {...methods}>
        <form className="editbookingfrom" onSubmit={handleSubmit(onSubmit)}>
    
        <BookingInfoForm
          formData={formData}
          handleInputChange={handleInputChange}
          handlePhoneChange={handlePhoneChange}
        />
        <FareRulesForm
          fareRules={fareRules}
          handleFareRuleChange={handleFareRuleChange}
          handleAddFareRule={handleAddFareRule}
          handleRemoveFareRule={handleRemoveFareRule}
          buttonStyles={buttonStyles}
        />
        <PassengerDetailsForm
          passengerRows={passengerRows}
          handlePassengerChange={handlePassengerChange}
          handleAddPassengerRow={handleAddPassengerRow}
          handleRemovePassengerRow={handleRemovePassengerRow}
          buttonStyles={buttonStyles}
        />
        <FlightInfoForm
          flightRows={flightRows}
          numLegs={numLegs}
          tripType={formData.trip_type}
          cabinType={formData.cabin_type}
          handleFlightChange={handleFlightChange}
          handleAddFlightRow={handleAddFlightRow}
          handleRemoveFlightRow={handleRemoveFlightRow}
          handleAddLeg={handleAddLeg}
          handleRemoveLeg={handleRemoveLeg}
          buttonStyles={buttonStyles}
        />
        <SupplierPriceForm
          formData={formData}
          fareBreakdown={fareBreakdown}
          handleInputChange={handleInputChange}
          handleFareBreakdownChange={handleFareBreakdownChange}
          passengerRows={passengerRows}
        />
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
      </FormProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditFlightBooking;
