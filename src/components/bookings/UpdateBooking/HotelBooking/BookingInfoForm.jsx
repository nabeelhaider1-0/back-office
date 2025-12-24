import React from "react";
import PhoneInput from "react-phone-input-2";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";

const BookingInfoForm = ({ formData, handleInputChange, handlePhoneChange }) => (
  <div className="card shadow-sm mb-4" style={{ borderRadius: "8px" }}>
    <div className="card-header text-white p-3" style={{ borderRadius: "8px 8px 0 0", backgroundColor: "#FF5015" }}>
      <h5 className="mb-0">
        <i className="fas fa-info-circle me-2"></i>Booking Information
      </h5>
    </div>
    <div className="card-body p-4">
      <div className="row">
        <div className="form-group col-md-3 mb-3">
          <label className="font-weight-bold text-muted">Booking ID</label>
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
          <label className="font-weight-bold text-muted">Hotel Booking ID</label>
          <input
            type="text"
            name="hotel_booking_id"
            value={formData.hotel_booking_id}
            onChange={handleInputChange}
            className="form-control form-control-sm"
          />
        </div>
        <div className="form-group col-md-3 mb-3">
          <label className="font-weight-bold text-muted">Booking Status</label>
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
          <label className="font-weight-bold text-muted">Contact Email</label>
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
        <div className="form-group col-md-3 mb-3">
          <label className="font-weight-bold text-muted">Contact Number</label>
          <PhoneInput
            country={"pk"}
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
        <div className="form-group col-md-3 mb-3">
          <label className="font-weight-bold text-muted">Check-in Date</label>
          <Flatpickr
            value={formData.checkIn}
            onChange={(date) => handleInputChange({ target: { name: "checkIn", value: date[0] } })}
            options={{ dateFormat: "Y-m-d" }}
            className="form-control form-control-sm"
            required
          />
        </div>
        <div className="form-group col-md-3 mb-3">
          <label className="font-weight-bold text-muted">Check-out Date</label>
          <Flatpickr
            value={formData.checkOut}
            onChange={(date) => handleInputChange({ target: { name: "checkOut", value: date[0] } })}
            options={{ dateFormat: "Y-m-d" }}
            className="form-control form-control-sm"
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-3 mb-3">
          <label className="font-weight-bold text-muted">Currency</label>
          <input
            type="text"
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            className="form-control form-control-sm required"
            required
            style={{ borderColor: "#FF5015" }}
          />
        </div>
        <div className="form-group col-md-3 mb-3">
          <label className="font-weight-bold text-muted">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="form-control form-control-sm required"
            required
            style={{ borderColor: "#FF5015" }}
          />
        </div>
        <div className="form-group col-md-3 mb-3">
          <label className="font-weight-bold text-muted">Supplier Currency</label>
          <input
            type="text"
            name="supplierCurrency"
            value={formData.supplierCurrency}
            onChange={handleInputChange}
            className="form-control form-control-sm required"
            required
            style={{ borderColor: "#FF5015" }}
          />
        </div>
        <div className="form-group col-md-3 mb-3">
          <label className="font-weight-bold text-muted">Supplier Base Price</label>
          <input
            type="number"
            name="supplierBasePrice"
            value={formData.supplierBasePrice}
            onChange={handleInputChange}
            className="form-control form-control-sm required"
            required
            style={{ borderColor: "#FF5015" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-3 mb-3">
          <label className="font-weight-bold text-muted">Supplier Total Price</label>
          <input
            type="number"
            name="supplierTotalPrice"
            value={formData.supplierTotalPrice}
            onChange={handleInputChange}
            className="form-control form-control-sm required"
            required
            style={{ borderColor: "#FF5015" }}
          />
        </div>
        <div className="form-group col-md-3 mb-3">
          <label className="font-weight-bold text-muted">Hotel Name</label>
          <input
            type="text"
            name="hotelName"
            value={formData.hotelName}
            onChange={handleInputChange}
            className="form-control form-control-sm required"
            required
            style={{ borderColor: "#FF5015" }}
          />
        </div>
        <div className="form-group col-md-6 mb-3">
          <label className="font-weight-bold text-muted">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="form-control form-control-sm required"
            required
            style={{ borderColor: "#FF5015" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-3 mb-3">
          <label className="font-weight-bold text-muted">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="form-control form-control-sm required"
            required
            style={{ borderColor: "#FF5015" }}
          />
        </div>
        <div className="form-group col-md-3 mb-3">
          <label className="font-weight-bold text-muted">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="form-control form-control-sm required"
            required
            style={{ borderColor: "#FF5015" }}
          />
        </div>
        <div className="form-group col-md-3 mb-3">
          <label className="font-weight-bold text-muted">Category (Stars)</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-control form-control-sm required"
            required
            style={{ borderColor: "#FF5015" }}
          >
            <option value="">Select</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-12 mb-3">
          <label className="font-weight-bold text-muted">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-control form-control-sm"
            rows="4"
            style={{ borderColor: "#FF5015" }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default BookingInfoForm;