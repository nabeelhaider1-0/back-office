import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useBookingData } from "../../../Apis/DashboardAPI";
import paymentDone from "../../../assets/images/paymentDone.png";
import paymentFailed from "../../../assets/images/paymentFailed.png";
import pnrFailed from "../../../assets/images/redTick.png";
import pnrDone from "../../../assets/images/PNRDone.png";
import pnrInQueue from "../../../assets/images/pnrQueue.png";
import ticketed from "../../../assets/images/ticketed.png";
import refundRequest from "../../../assets/images/refundRequest.png";
import cancelled from "../../../assets/images/cancelled.png";
import refunded from "../../../assets/images/refunded.png";
import confirmed from "../../../assets/images/greenTick.png";
import voucheredPending from "../../../assets/images/voucheredPending.png";
import pending from "../../../assets/images/pending.png";
import "./BookingCard.css"; // Import CSS
const BookingCard = () => {
  const [bookingPeriod, setBookingPeriod] = useState("monthly");
  const { data, loading, error } = useBookingData(bookingPeriod);
  const toWordCase = (str) => {
    if (!str) return "";

    // words to keep lowercase (optional)
    const smallWords = ["in", "on", "at", "of", "to", "for"];

    return str
      .split(" ")
      .map((word) => {
        if (word.toLowerCase() === "pnr") {
          return "PNR";
        }
        if (smallWords.includes(word.toLowerCase())) {
          return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  // Filter bookings with non-zero counts
  const filteredData = data;
  const typeImageMap = {
    "payment done": paymentDone,
    "payment failed": paymentFailed,
    "pnr done": pnrDone, // you can change this if needed
    failed: pnrFailed,

    "pnr in queue": pnrInQueue,

    ticketed: ticketed,
    cancelled: cancelled,

    "refunded request": refundRequest,
    refunded: refunded,

    confirmed: confirmed,
    "vouchered issued": voucheredPending,

    pending: pending,
  };
  const normalizeType = (str = "") => str.trim().toLowerCase();

  return (
    <div className="bookingDahboardMain">
      <div className="bookingDahboardWithRange">
        <h2>Bookings</h2>
        <select
          className="form-select"
          onChange={(e) => setBookingPeriod(e.target.value)}
          value={bookingPeriod}
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      {!loading && !error && filteredData.length > 0 && (
        <div className="bookingDahboardMainRow">
          {filteredData.map((booking) => {
            return (
              <Link
                to={`/SearchBookings?status=${booking.type}`} // pass booking type in query param
                key={booking.type}
                className="bookingCards text-decoration-none"
              >
                <img
                  src={typeImageMap[normalizeType(booking.type)] || pending}
                  alt={booking.type}
                  className="bookingCardImage"
                />

                <div className="bookingCardsTexter">
                  <div className="bookingCardsCount">{booking.count}</div>
                  <div className="bookingCardsStatus">
                    {toWordCase(booking.type)}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      {!loading && !error && filteredData.length === 0 && (
        <div className="noData">No bookings available for this period.</div>
      )}
    </div>
  );
};

export default BookingCard;
