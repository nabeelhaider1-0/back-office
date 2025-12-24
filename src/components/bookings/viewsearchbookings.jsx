// src/components/bookings/ViewBookingComponents/ViewSearchBookings.js
import React, { useState } from "react";
import HeaderSection from "./ViewBookingComponents/HeaderSection";
import BookingInfo from "./ViewBookingComponents/BookingInfo";
import TermsConditions from "./ViewBookingComponents/TermsConditions";
import PassengerDetails from "./ViewBookingComponents/PassengerDetails";
import FlightPassengerDetails from "./ViewBookingComponents/FlightPassengerDetails";
import FlightFareRules from "./ViewBookingComponents/FlightFareRules";
import AgentInfo from "./ViewBookingComponents/AgentInfo";
import RateInfo from "./ViewBookingComponents/RateInfo";
import HotelRateInfo from "./ViewBookingComponents/HotelRateInfo";
import SupplierInfo from "./ViewBookingComponents/SupplierInfo";
import { useBookingDetails } from "../../Apis/DashboardAPI";
import { useParams } from "react-router-dom";
import Transactionslist from "./ViewBookingComponents/Transactionslist";
import "./ViewBookingComponents/booking-detail.css";
import EscapraRateInfo from "./ViewBookingComponents/EscapraRateInfo";

const ViewSearchBookings = ({ setShowHeaderAndMenuBar }) => {
  const [editAgentRefId, setEditAgentRefId] = useState(null);
  const [editManagerId, setEditManagerId] = useState(null);
  const [agentRef, setAgentRef] = useState(""); // State for agent reference
  const { booking_id } = useParams();
  // Fetch booking details using the hook
  const bookingId = booking_id; // Hardcoded for now; replace with dynamic value (e.g., from URL params)
  const { data: bookingData, loading, error } = useBookingDetails(bookingId);

  React.useEffect(() => {
    setShowHeaderAndMenuBar(false);
    return () => setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);
  const show_span_id = (action, id) => {
    console.log(`show_span_id: ${action}, ${id}`);
    // Implement toggle logic for voucher ID
  };

  const show_span_remark = (action, id) => {
    console.log(`show_span_remark: ${action}, ${id}`);
    // Implement toggle logic for remarks
  };
  // Toggle edit mode for agent reference
  const show_span_agent_ref = (action, id) => {
    if (action === "edit") {
      setEditAgentRefId(id);
    } else if (action === "save") {
      const newRef = document.getElementById(`agent_ref_${id}`).value;
      setAgentRef(newRef);
      // TODO: Make API call to update agent reference
      console.log(`Saving agent reference for ID ${id}: ${newRef}`);
      setEditAgentRefId(null);
    } else if (action === "cancel") {
      setEditAgentRefId(null);
    }
  };

  // Toggle edit mode for manager
  const show_span = (action, id) => {
    if (action === "edit") {
      setEditManagerId(id);
    } else if (action === "save") {
      // TODO: Implement save logic for manager selection
      console.log(`Saving manager for ID ${id}`);
      setEditManagerId(null);
    } else if (action === "cancel") {
      setEditManagerId(null);
    }
  };

  const edit_pessenger = (room, index, code) => {
    console.log(`edit_pessenger: ${room}, ${index}, ${code}`);
    // Implement edit logic
  };

  const update_passenger = (room, index, count, flag, id) => {
    console.log(
      `update_passenger: ${room}, ${index}, ${count}, ${flag}, ${id}`
    );
    // Implement update logic
  };

  const cancel_passenger = (room, index, count) => {
    console.log(`cancel_passenger: ${room}, ${index}, ${count}`);
    // Implement cancel logic
  };

  // Handle loading and error states
  if (loading) {
    return <div>Loading booking details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!bookingData & !loading) {
    return <div>Loading booking details...</div>;
  }

  return (
    <form>
      <HeaderSection />
      <div className="printe row mt-3" style={{ clear: "both" }}>
        <div className="col-md-12">
          <table
            width="100%"
            cellPadding={2}
            cellSpacing={1}
            align="center"
            border={0}
            className="table table-responsive table-box tableborder bookingTbl"
          >
            <tbody className="bg-white">
              <BookingInfo
                show_span_id={show_span_id}
                bookingData={bookingData}
              />

              {/* Conditionally render PassengerDetails or FlightPassengerDetails */}
              {bookingData.service_type?.toLowerCase() === "flight" ? (
                <>
                  <FlightFareRules
                    bookingData={bookingData}
                    show_span_remark={show_span_remark}
                  ></FlightFareRules>
                  <FlightPassengerDetails
                    bookingData={bookingData}
                    edit_pessenger={edit_pessenger}
                    update_passenger={update_passenger}
                    cancel_passenger={cancel_passenger}
                    passengers={bookingData.passengersinfo}
                  />
                  <SupplierInfo bookingData={bookingData} />
                  <RateInfo bookingData={bookingData} />
                  <EscapraRateInfo bookingData={bookingData} />
                </>
              ) : (
                <>
                  <TermsConditions
                    bookingData={bookingData}
                    show_span_remark={show_span_remark}
                  />
                  <PassengerDetails
                    bookingData={bookingData}
                    edit_pessenger={edit_pessenger}
                    update_passenger={update_passenger}
                    cancel_passenger={cancel_passenger}
                    passengers={bookingData.passengers}
                  />
                  <SupplierInfo bookingData={bookingData} />
                  <HotelRateInfo bookingData={bookingData} />
                </>
              )}
              <Transactionslist bookingData={bookingData} />
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="siteFooter"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <span style={{ marginRight: "10px" }}>Powered By</span>
        <img
          src="https://beta.tdonlines.com/project_folder/tdonline/images/logo.png"
          style={{ width: "100px" }}
          alt="Powered By Logo"
        />
      </div>
    </form>
  );
};

export default ViewSearchBookings;
