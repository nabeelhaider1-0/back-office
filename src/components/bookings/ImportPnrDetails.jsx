import React, { useState } from "react";
import axios from "axios";
import Header2 from "../header2/header2";
import PnrInfo from "./PnrInfo";

const ImportPnrDetails = () => {
  const API_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3000"; // Fallback URL

  const [pnr, setPnr] = useState("");
  const [supplier, setSupplier] = useState("Mistifly");
  const [tripDetails, setTripDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  // Common Axios instance with auth headers
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });

  // Handle PNR search
  const handleSearch = async () => {
    setError(null);
    setResponseMessage(null);
    setLoading(true);
    try {
      const response = await axiosInstance.post("api/booking/getTripDetailsByPnr", {
        supplier,
        booking_id: pnr,
      });

      if (!response.data) {
        throw new Error("No data returned from API");
      }

      setTripDetails(response.data.data);
    } catch (err) {
      const message =
        err.response?.status === 404
          ? "No PNR Details Found"
          : err.message || "Error fetching trip details. Please try again.";
      setError(message);
      setTripDetails(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle create new booking
  const handleCreateNewBooking = async () => {
    setError(null);
    setResponseMessage(null);
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `api/booking/createOrUpdateBooking`,
        {
          supplier: supplier.toLowerCase(),
          pnr_id: pnr,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to create booking");
      }
      console.log('response.dataresponse.data',response.data)
      setResponseMessage(response.data.message+', BookingId:'+response.data.data.bookingId);
      // Refresh trip details after creating
      //await handleSearch();
    } catch (err) {
      const message = err.message || "Error creating booking. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Handle update booking
  const handleUpdate = async () => {
    setError(null);
    setResponseMessage(null);
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `api/booking/createOrUpdateBooking`,
        {
          supplier: supplier.toLowerCase(),
          pnr_id: pnr,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to update booking");
      }

      setResponseMessage(response.data.message+', BookingId:'+response.data.data.bookingId);
      console.log('responseMessageresponseMessage',responseMessage)
      // Refresh trip details after updating
     // await handleSearch();
    } catch (err) {
      const message = err.message || "Error updating booking. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header2 title="PNR Details" linkText1="PNR Details" />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="row mt-3 align-items-center">
          <div className="form-group col-md-2">
            <input
              type="text"
              className="form-control form-control-sm"
              name="bookingId"
              placeholder="Enter Your PNR/Reference#"
              value={pnr}
              onChange={(e) => setPnr(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="form-group col-md-2">
            <select
              className="form-control form-control-sm"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              disabled={loading}
            >
              <option value="Mistifly">Mistifly</option>
              <option value="Travelport">Travelport</option>
            </select>
          </div>
          <div className="form-group col-md-3">
            <button
              type="button"
              className="btn btn-dark btn-sm"
              onClick={handleSearch}
              disabled={!pnr || loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                <>
                  <i className="fa fa-search" /> Search
                </>
              )}
            </button>
          </div>
          <div className="form-group col-md-5 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-dark btn-sm me-2"
              onClick={handleUpdate}
              disabled={!tripDetails || loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                "Update"
              )}
            </button>
            <button
              type="button"
              className="btn btn-dark btn-sm"
              onClick={handleCreateNewBooking}
              disabled={!tripDetails || loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                "Create a New Booking"
              )}
            </button>
          </div>
        </div>
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
        {responseMessage && (
          <div className="alert alert-success mt-3" role="alert">
            {responseMessage}
          </div>
        )}
        <div className="mt-5">
          <div id="wrapper2">
            {tripDetails ? (
              <PnrInfo tripDetails={tripDetails} />
            ) : (
              <p>No trip details available. Please search for a PNR.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportPnrDetails;