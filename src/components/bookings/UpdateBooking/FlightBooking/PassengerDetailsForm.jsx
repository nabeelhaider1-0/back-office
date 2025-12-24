import React from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";

const PassengerDetailsForm = () => {
 const {
  control,
  register,
  watch,
  formState: { errors },
} = useFormContext();
;
  
  const {
    fields: passengerRows,
    append: handleAddPassengerRow,
    remove: handleRemovePassengerRow,
  } = useFieldArray({
    control,
    name: "passengers", // Form field name: passengers[]
  });
const watchedPassengers = watch("passengers", []);

  // Determine if we can add another passenger (max 9, and last one should be meaningfully filled)
 const lastPassenger =
  watchedPassengers[watchedPassengers.length - 1];

const canAddPassenger =
  watchedPassengers.length > 0 &&
  watchedPassengers.length < 9 &&
  lastPassenger?.salutation &&
  lastPassenger?.firstname &&
  lastPassenger?.lastname &&
  lastPassenger?.passengertype &&
  lastPassenger?.dateofbirth &&
  lastPassenger?.passportnumber &&
  lastPassenger?.passportexpirydate &&
  lastPassenger?.country;


  return (
    <div className="card shadow-sm mb-4" style={{ borderRadius: "8px" }}>
      <div
        className="card-header text-white p-3"
        style={{ borderRadius: "8px 8px 0 0", background: "#1a385a" }}
      >
        <h5 className="mb-0">Passenger Details</h5>
      </div>

      <div className="card-body bg-white">
        {passengerRows.length === 0 ? (
          <div className="text-center text-muted py-5">
            <p>No passengers added yet.</p>
          </div>
        ) : (
          passengerRows.map((passenger, index) => (
            <div
              key={passenger.id}
              className="mb-4 pb-4 border-bottom position-relative"
            >
              {/* Delete Button (only for passengers after the first) */}
              {index > 0 && (
               
                 <i
                className="fa fa-trash"
                type="button"
                onClick={() => handleRemovePassengerRow(index)}
                style={{
                  position: "absolute",
                  top: "15%",
                  right: "2.5%",
                  zIndex: "10",
                  color: "#FF5555",
                  fontSize: "16px",
                }}
              ></i>
              )}

              <h6
                className="mb-4"
                style={{
                  color: "#1A385A",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                Passenger # {index + 1}
              </h6>

              <div className="row">
                <div className="form-group col-md-2 mb-3">
                  <label className="font-weight-bold text-muted small">
                    Salutation <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Mr/Mrs/Ms"
                    className="form-control form-control-sm border-secondary"
                    {...register(`passengers.${index}.salutation`, {
                      required: "Salutation is required",
                    })}
                    style={{ borderColor: "#6c757d" }}
                  />
                  {errors.passengers?.[index]?.salutation && (
                    <small className="text-danger">
                      {errors.passengers[index].salutation.message}
                    </small>
                  )}
                </div>

                <div className="form-group col-md-3 mb-3">
                  <label className="font-weight-bold text-muted small">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control form-control-sm border-secondary"
                    {...register(`passengers.${index}.firstname`, {
                      required: "First name is required",
                    })}
                    style={{ borderColor: "#6c757d" }}
                  />
                  {errors.passengers?.[index]?.firstname && (
                    <small className="text-danger">
                      {errors.passengers[index].firstname.message}
                    </small>
                  )}
                </div>

                <div className="form-group col-md-3 mb-3">
                  <label className="font-weight-bold text-muted small">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control form-control-sm border-secondary"
                    {...register(`passengers.${index}.lastname`, {
                      required: "Last name is required",
                    })}
                    style={{ borderColor: "#6c757d" }}
                  />
                  {errors.passengers?.[index]?.lastname && (
                    <small className="text-danger">
                      {errors.passengers[index].lastname.message}
                    </small>
                  )}
                </div>

                <div className="form-group col-md-2 mb-3">
                  <label className="font-weight-bold text-muted small">
                    Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control form-control-sm border-secondary"
                    {...register(`passengers.${index}.passengertype`, {
                      required: "Passenger type is required",
                    })}
                    style={{ borderColor: "#6c757d" }}
                  >
                    <option value="">Select</option>
                    <option value="AD">Adult</option>
                    <option value="CH">Child</option>
                    <option value="IN">Infant</option>
                  </select>
                  {errors.passengers?.[index]?.passengertype && (
                    <small className="text-danger">
                      {errors.passengers[index].passengertype.message}
                    </small>
                  )}
                </div>

                <div className="form-group col-md-2 mb-3">
                  <label className="font-weight-bold text-muted small">
                    Country <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Pakistan"
                    className="form-control form-control-sm border-secondary"
                    {...register(`passengers.${index}.country`, {
                      required: "Country is required",
                    })}
                    style={{ borderColor: "#6c757d" }}
                  />
                  {errors.passengers?.[index]?.country && (
                    <small className="text-danger">
                      {errors.passengers[index].country.message}
                    </small>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="form-group col-md-3 mb-3">
                  <label className="font-weight-bold text-muted small">
                    Ticket Number
                  </label>
                  <input
                    type="text"
                    placeholder="Ticket Number"
                    className="form-control form-control-sm border-secondary"
                    {...register(`passengers.${index}.ticketnumber`)}
                    style={{ borderColor: "#6c757d" }}
                  />
                </div>

                <div className="form-group col-md-3 mb-3">
                  <label className="font-weight-bold text-muted small">
                    Passport Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Passport Number"
                    className="form-control form-control-sm border-secondary"
                    {...register(`passengers.${index}.passportnumber`, {
                      required: "Passport number is required",
                    })}
                    style={{ borderColor: "#6c757d" }}
                  />
                  {errors.passengers?.[index]?.passportnumber && (
                    <small className="text-danger">
                      {errors.passengers[index].passportnumber.message}
                    </small>
                  )}
                </div>

                <div className="form-group col-md-3 mb-3">
                  <label className="font-weight-bold text-muted small">
                    Date of Birth <span className="text-danger">*</span>
                  </label>
                  <Controller
                    control={control}
                    name={`passengers.${index}.dateofbirth`}
                    rules={{ required: "Date of birth is required" }}
                    render={({ field }) => (
                      <div className="input-group">
                        <Flatpickr
                          value={field.value}
                          onChange={(date) => field.onChange(date[0])}
                          options={{
                            dateFormat: "Y-m-d",
                            maxDate: "today", // Optional: prevent future dates
                          }}
                          className="form-control form-control-sm border-secondary"
                          placeholder="YYYY-MM-DD"
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
                    )}
                  />
                  {errors.passengers?.[index]?.dateofbirth && (
                    <small className="text-danger">
                      {errors.passengers[index].dateofbirth.message}
                    </small>
                  )}
                </div>

                <div className="form-group col-md-3 mb-3">
                  <label className="font-weight-bold text-muted small">
                    Passport Expiry <span className="text-danger">*</span>
                  </label>
                  <Controller
                    control={control}
                    name={`passengers.${index}.passportexpirydate`}
                    rules={{ required: "Passport expiry is required" }}
                    render={({ field }) => (
                      <div className="input-group">
                        <Flatpickr
                          value={field.value}
                          onChange={(date) => field.onChange(date[0])}
                          options={{
                            dateFormat: "Y-m-d",
                            minDate: "today", // Passport can't expire in the past
                          }}
                          className="form-control form-control-sm border-secondary"
                          placeholder="YYYY-MM-DD"
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
                    )}
                  />
                  {errors.passengers?.[index]?.passportexpirydate && (
                    <small className="text-danger">
                      {errors.passengers[index].passportexpirydate.message}
                    </small>
                  )}
                </div>
              </div>

              {/* Add Button - shown only on last passenger if conditions met */}
              {index === passengerRows.length - 1 && canAddPassenger && (
                <div className="row justify-content-end mt-3">
                  <div className="col-auto">
                      <i
                      type="button"
                      className="fas fa-plus"
                      style={{
                        width: "auto",
                        display: "inline-block",
                        padding: "0",
                        background: "none",
                        border: "none",
                        color: "#ff5015",
                        borderBottom: "3px solid #ff5015",
                      }}
                     onClick={() =>
                        handleAddPassengerRow({
                          salutation: "",
                          firstname: "",
                          lastname: "",
                          passengertype: "",
                          country: "",
                          ticketnumber: "",
                          passportnumber: "",
                          dateofbirth: null,
                          passportexpirydate: null,
                        })
                      }
                    >
                      Add
                    </i>
                    
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {/* Hint when cannot add more */}
        {passengerRows.length >= 9 && (
          <div className="text-center mt-3">
            <small className="text-muted">Maximum 9 passengers allowed</small>
          </div>
        )}
        {passengerRows.length > 0 && !canAddPassenger && passengerRows.length < 9 && (
          <div className="text-center mt-3">
            <small className="text-muted">
              Complete the current passenger details to add another
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default PassengerDetailsForm;