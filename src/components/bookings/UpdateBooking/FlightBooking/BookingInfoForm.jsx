import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { isValidPhoneNumber } from "libphonenumber-js";


const BookingInfoForm = () => {
  const [currentCountry, setCurrentCountry] = useState(null);
  const validatePhone = (value, country) => {
    if (!value || value.trim() === "") {
      return "Phone number is required";
    }

    // react-phone-input-2 returns numbers only → convert to E.164
    const phoneE164 = value.startsWith("+") ? value : `+${value}`;

    if (phoneE164.length < 10) {
      return "Phone number is too short";
    }

    try {
      if (country?.countryCode) {
        const isoCode = country.countryCode.toUpperCase(); // PK, US, etc
        if (!isValidPhoneNumber(phoneE164, isoCode)) {
          return "Invalid phone number";
        }
      } else {
        if (!isValidPhoneNumber(phoneE164)) {
          return "Invalid phone number";
        }
      }
    } catch (e) {
      return "Invalid phone number";
    }

    return true;
  };
  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const phoneValue = watch("phone");

  const handlePhoneChange = (value) => {
    setValue("phone", value, { shouldValidate: true });
  };

  return (
    <div className="card shadow-sm mb-4" style={{ borderRadius: "8px" }}>
      <div
        className="card-header text-white p-3"
        style={{ borderRadius: "8px 8px 0 0", backgroundColor: "#1A385A" }}
      >
        <h5 className="mb-0">Booking Information</h5>
      </div>
      <div className="card-body" style={{ background: "white" }}>
        <div className="row">
          <div className="form-group col-md-3 mb-3">
            <label className="font-weight-bold text-muted">Booking ID</label>
            <input
              type="text"
              {...register("booking_id")}
              className="form-control form-control-sm"
              readOnly
              style={{ backgroundColor: "#f8f9fa" }}
            />
          </div>

          <div className="form-group col-md-3 mb-3">
            <label className="font-weight-bold text-muted">
              Supplier <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              {...register("supplier", { required: "Supplier is required" })}
              className="form-control form-control-sm"
              disabled
            />
            {errors.supplier && <small className="text-danger">{errors.supplier.message}</small>}
          </div>

          <div className="form-group col-md-3 mb-3">
            <label className="font-weight-bold text-muted">PNR</label>
            <input
              type="text"
              {...register("pnr")}
              className="form-control form-control-sm"
            />
          </div>

          <div className="form-group col-md-3 mb-3">
            <label className="font-weight-bold text-muted">
              Booking Status <span className="text-danger">*</span>
            </label>
            <select
              {...register("booking_status", { required: "Booking status is required" })}
              className="form-control form-control-sm dollyselect"
            >
              <option value="">Select Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            {errors.booking_status && <small className="text-danger">{errors.booking_status.message}</small>}
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-3 mb-3">
            <label className="font-weight-bold text-muted">
              Contact Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              {...register("contactemail", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="form-control form-control-sm"
            />
            {errors.contactemail && <small className="text-danger">{errors.contactemail.message}</small>}
          </div>

          <div className="form-group col-md-3 mb-3">
            <label className="font-weight-bold text-muted">
              Contact Number <span className="text-danger">*</span>
            </label>
            <Controller
              name="phone"
              control={control}
              rules={{
                validate: (value) => validatePhone(value, currentCountry),
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <PhoneInput
                    country="pk"
                    value={value}
                    onChange={(phone, countryData) => {
                      onChange(phone);          // update RHF
                      setCurrentCountry(countryData); // store country
                    }}
                    inputProps={{
                      name: "phone",
                      required: true,
                    }}
                    containerClass="phone-input-container"
                    inputClass={`form-control w-100 form-control-sm ${error ? "is-invalid" : ""
                      }`}
                    buttonClass="phone-dropdown"
                  />

                  {error && (
                    <div className="invalid-feedback d-block">
                      {error.message}
                    </div>
                  )}
                </>
              )}
            />


          </div>

          <div className="form-group col-md-3 mb-3">
            <label className="font-weight-bold text-muted">
              Cabin Type <span className="text-danger">*</span>
            </label>
            <select
              {...register("cabin_type", { required: "Cabin type is required" })}
              className="form-control form-control-sm"
            >
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="first">First</option>
            </select>
            {errors.cabin_type && <small className="text-danger">{errors.cabin_type.message}</small>}
          </div>

          <div className="form-group col-md-3 mb-3">
            <label className="font-weight-bold text-muted d-block w-100">Trip Type</label>
            <div className="d-flex justify-content-between align-item-center">
              {["oneway", "return", "multicity"].map((type) => (
                <div key={type} className="form-check form-check-inline p-0">
                  <input
                    type="radio"
                    id={type}
                    value={type}
                    {...register("trip_type", { required: true })}
                    className="radioInline"
                  />
                  <label htmlFor={type} className="form-check-label" style={{ /* styles */ }}>
                    {type.charAt(0).toUpperCase() + type.slice(1).replace("multicity", "Multi City")}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-6 mb-3">
            <label className="font-weight-bold text-muted">
              Booking Currency <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              {...register("bookingCurrency", { required: "Booking currency is required" })}
              className="form-control form-control-sm"
            />
            {errors.bookingCurrency && <small className="text-danger">{errors.bookingCurrency.message}</small>}
          </div>

          <div className="form-group col-md-6 mb-3">
            <label className="font-weight-bold text-muted">
              Booking Amount <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              {...register("bookingAmount", {
                required: "Booking amount is required",
                min: { value: 0.01, message: "Amount must be greater than 0" },
              })}
              className="form-control form-control-sm"
            />
            {errors.bookingAmount && <small className="text-danger">{errors.bookingAmount.message}</small>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingInfoForm;