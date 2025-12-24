import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Header2 from "../header2/header2";
import { updateBookingService } from "../../Apis/DashboardAPI";

const EditBookingDetails = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(location.state || {});
  console.log("Initial formData:", formData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Normalize passengers info when location.state is available
useEffect(() => {
  if (location.state) {
    setFormData((prev) => ({
      ...location.state,
      passengersinfo:
        location.state.passengersinfo ||
        location.state.passengers ||
        []
    }));
  }
}, [location.state]);

  useEffect(() => {
    if (!formData || !bookingId) {
      setMessage("Booking details not found.");
    }
  }, [formData, bookingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPassengers = [...(formData.passengersinfo || [])];

    if (name.startsWith("passport.")) {
      const key = name.split(".")[1];
      updatedPassengers[index].passport = {
        ...updatedPassengers[index].passport,
        [key]: value,
      };
    } else {
      updatedPassengers[index][name] = value;
    }

    setFormData((prev) => ({ ...prev, passengersinfo: updatedPassengers }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Only send keys that exist in Orders entity
    const {
      booking_id,
      order_type,
      flight_id,
      hotel_booking_id,
      pnr_id,
      pnr_time_limit,
      type,
      api,
      platform,
      supplierrefno,
      consultant,
      amount,
      currency,
      data,
      booking_status,
      ticketing_status,
      attempts,
      fare_rules,
      tripdetails,
      flightinfo,
      hotelinfo,
      iternary_details,
      passengersinfo,
      contactinfo,
      ticket_tripdetails,
      timestamps,
      // extra frontend-only fields
      origin,
      destination,
      service_start_date,
      service_end_date,
      supplier,
      supplierRef,
    } = formData;

    const payload = {
      booking_id,
      order_type,
      flight_id,
      hotel_booking_id,
      pnr_id,
      pnr_time_limit,
      type,
      api,
      platform,
      supplierrefno,
      consultant,
      amount,
      currency,
      data,
      booking_status,
      ticketing_status,
      attempts,
      fare_rules,
      tripdetails,
      flightinfo,
      hotelinfo,
      iternary_details,
      passengersinfo,
      contactinfo,
      ticket_tripdetails,
      timestamps,
      // keep extra fields disabled but still in form
      origin,
      destination,
      service_start_date,
      service_end_date,
      supplier,
      supplierRef,
    };

    console.log("Submitting booking payload:", payload);

    const response = await updateBookingService(bookingId, payload);
    setLoading(false);

    if (response.success) {
      setMessage("Booking updated successfully!");
      setTimeout(() => navigate("/SearchBookings"), 1500);
    } else {
      setMessage("Error updating booking: " + response.message);
    }
  };

  return (
    <>
      <Header2 title="EDIT BOOKING DETAILS" linkText1="Edit Booking" />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit} className="row">
          {/* Booking ID */}
          <div className="mb-3 col-md-6">
            <label>Booking ID</label>
            <input
              type="text"
              name="booking_id"
              className="form-control"
              value={formData.booking_id || bookingId}
              disabled
            />
          </div>

          {/* All entity fields */}
          {/* <div className="mb-3 col-md-6">
            <label>Order Type</label>
            <input
              type="text"
              name="order_type"
              className="form-control"
              value={formData.order_type || ""}
              onChange={handleChange}
            />
          </div> */}

          {/* <div className="mb-3 col-md-6">
            <label>Flight ID</label>
            <input
              type="number"
              name="flight_id"
              className="form-control"
              value={formData.flight_id || ""}
              onChange={handleChange}
            />
          </div> */}

          {/* <div className="mb-3 col-md-6">
            <label>Hotel Booking ID</label>
            <input
              type="text"
              name="hotel_booking_id"
              className="form-control"
              value={formData.hotel_booking_id || ""}
              onChange={handleChange}
            />
          </div> */}

          {/* <div className="mb-3 col-md-6">
            <label>PNR ID</label>
            <input
              type="text"
              name="pnr_id"
              className="form-control"
              value={formData.pnr_id || ""}
              onChange={handleChange}
            />
          </div> */}
{/* 
          <div className="mb-3 col-md-6">
            <label>PNR Time Limit</label>
            <input
              type="text"
              name="pnr_time_limit"
              className="form-control"
              value={formData.pnr_time_limit || ""}
              onChange={handleChange}
            />
          </div> */}

          <div className="mb-3 col-md-6">
            <label>Type</label>
            <input
              type="text"
              name="type"
              className="form-control"
              value={formData.service_type || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 col-md-6">
            <label>Supplier</label>
            <input
              type="text"
              name="api"
              className="form-control"
              value={formData.supplier || ""}
              onChange={handleChange}
            />
          </div>

          {/* <div className="mb-3 col-md-6">
            <label>Platform</label>
            <input
              type="text"
              name="platform"
              className="form-control"
              value={formData.platform || ""}
              onChange={handleChange}
            />
          </div> */}

          <div className="mb-3 col-md-6">
            <label>Supplier Ref No</label>
            <input
              type="text"
              name="supplierrefno"
              className="form-control"
              value={formData.supplierRef || ""}
              disabled
            />
          </div>

          <div className="mb-3 col-md-6">
            <label>Consultant</label>
            <input
              type="text"
              name="consultant"
              className="form-control"
              value={formData.consultant || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 col-md-6">
            <label>Amount</label>
            <input
              type="text"
              name="amount"
              className="form-control"
              value={formData.amount || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 col-md-6">
            <label>Currency</label>
            <input
              type="text"
              name="currency"
              className="form-control"
              value={formData.currency || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 col-md-6">
            <label>Booking Status</label>
            <input
              type="text"
              name="booking_status"
              className="form-control"
              value={formData.booking_status || ""}
              onChange={handleChange}
            />
          </div>

          {/* <div className="mb-3 col-md-6">
            <label>Ticketing Status</label>
            <input
              type="text"
              name="ticketing_status"
              className="form-control"
              value={formData.ticketing_status || ""}
              onChange={handleChange}
            />
          </div> */}

          {/* Extra non-entity fields → keep visible but disabled */}
          <div className="mb-3 col-md-6">
            <label>Origin</label>
            <input
              type="text"
              name="origin"
              className="form-control"
              value={formData.origin || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 col-md-6">
            <label>Destination</label>
            <input
              type="text"
              name="destination"
              className="form-control"
              value={formData.destination || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 col-md-6">
            <label>Service Start Date</label>
            <input
              type="datetime-local"
              name="service_start_date"
              className="form-control"
              value={formData.service_start_date || ""}
              disabled
            />
          </div>

          <div className="mb-3 col-md-6">
            <label>Service End Date</label>
            <input
              type="datetime-local"
              name="service_end_date"
              className="form-control"
              value={formData.service_end_date || ""}
              disabled
            />
          </div>

          <div className="mb-3 col-md-6">
            <label>Supplier</label>
            <input
              type="text"
              name="supplier"
              className="form-control"
              value={formData.supplier || ""}
              disabled
            />
          </div>

          {/* Passengers Info */}
          <div className="col-12">
            <h5 className="mt-3">Passengers</h5>
            {formData.passengersinfo?.map((p, i) => (
              <div key={i} className="row border rounded p-3 mb-3">
                <div className="col-md-6 mb-2">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={p.firstName || ""}
                    onChange={(e) => handlePassengerChange(i, e)}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={p.lastName || ""}
                    onChange={(e) => handlePassengerChange(i, e)}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <label>Email</label>
                  <input
                    type="email"
                    name="emailAddress"
                    className="form-control"
                    value={p.emailAddress || ""}
                    onChange={(e) => handlePassengerChange(i, e)}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    className="form-control"
                    value={p.phoneNumber || ""}
                    onChange={(e) => handlePassengerChange(i, e)}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="form-control"
                    value={p.dateOfBirth || ""}
                    onChange={(e) => handlePassengerChange(i, e)}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <label>Gender</label>
                  <input
                    type="text"
                    name="gender"
                    className="form-control"
                    value={p.gender || ""}
                    onChange={(e) => handlePassengerChange(i, e)}
                  />
                </div>

                {/* Passport */}
                <div className="col-12 mt-2">
                  <h6>Passport</h6>
                </div>
                <div className="col-md-4 mb-2">
                  <label>Number</label>
                  <input
                    type="text"
                    name="passport.number"
                    className="form-control"
                    value={p.passport?.number || ""}
                    onChange={(e) => handlePassengerChange(i, e)}
                  />
                </div>
                <div className="col-md-4 mb-2">
                  <label>Nationality</label>
                  <input
                    type="text"
                    name="passport.nationality"
                    className="form-control"
                    value={p.passport?.nationality || ""}
                    onChange={(e) => handlePassengerChange(i, e)}
                  />
                </div>
                <div className="col-md-4 mb-2">
                  <label>Issuance Country</label>
                  <input
                    type="text"
                    name="passport.issuanceCountry"
                    className="form-control"
                    value={p.passport?.issuanceCountry || ""}
                    onChange={(e) => handlePassengerChange(i, e)}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <label>Expires On</label>
                  <input
                    type="date"
                    name="passport.expiresOn"
                    className="form-control"
                    value={p.passport?.expiresOn || ""}
                    onChange={(e) => handlePassengerChange(i, e)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary"  style={{ backgroundColor: "#FF5015", borderColor: "#FF5015" }} disabled={loading}>
              {loading ? "Updating..." : "Update Booking"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBookingDetails;
