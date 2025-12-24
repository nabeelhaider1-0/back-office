import React, { useEffect } from "react";
import {
  useFormContext,
  useFieldArray,
  useWatch,
  Controller,
} from "react-hook-form";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";

// Helper functions for duration calculations
const calculateDuration = (depDate, depTime, arrDate, arrTime) => {
  if (!depDate || !depTime || !arrDate || !arrTime) return "";
  const dep = new Date(`${depDate}T${depTime}:00`);
  const arr = new Date(`${arrDate}T${arrTime}:00`);
  if (isNaN(dep.getTime()) || isNaN(arr.getTime()) || arr <= dep) return "";
  const diffMs = arr - dep;
  const hours = Math.floor(diffMs / 3600000);
  const minutes = Math.floor((diffMs % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
};

const parseDuration = (durStr) => {
  if (!durStr) return { hours: 0, minutes: 0 };
  const parts = durStr.match(/(\d+)h (\d+)m/);
  if (!parts) return { hours: 0, minutes: 0 };
  return { hours: parseInt(parts[1]), minutes: parseInt(parts[2]) };
};

const addDurations = (dur1, dur2) => {
  const d1 = parseDuration(dur1);
  const d2 = parseDuration(dur2);
  let totalMinutes = d1.hours * 60 + d1.minutes + d2.hours * 60 + d2.minutes;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

// Separate component for a single Leg (safe nested useFieldArray)
const FlightLeg = ({ legIndex, removeLeg }) => {
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const tripType = useWatch({ control, name: "trip_type" }) || "oneway";

  const {
    fields: segments,
    append: appendSegment,
    remove: removeSegment,
  } = useFieldArray({
    control,
    name: `legs.${legIndex}.segments`,
  });

  // Auto-calculate travel duration and total duration whenever relevant fields change
  useEffect(() => {
    segments.forEach((_, segIndex) => {
      const depDate = watch(`legs.${legIndex}.segments.${segIndex}.departuredate`);
      const depTime = watch(`legs.${legIndex}.segments.${segIndex}.departuretime`);
      const arrDate = watch(`legs.${legIndex}.segments.${segIndex}.arrivaldate`);
      const arrTime = watch(`legs.${legIndex}.segments.${segIndex}.arrivaltime`);
      const layover = watch(`legs.${legIndex}.segments.${segIndex}.layover`) || "0h 0m";

      const depDateStr = depDate ? new Date(depDate).toISOString().split("T")[0] : "";
      const arrDateStr = arrDate ? new Date(arrDate).toISOString().split("T")[0] : "";

      const travelDur = calculateDuration(depDateStr, depTime, arrDateStr, arrTime);
      if (travelDur) {
        setValue(`legs.${legIndex}.segments.${segIndex}.travelduration`, travelDur);
      }

      if (travelDur) {
        const totalDur = addDurations(travelDur, layover);
        setValue(`legs.${legIndex}.segments.${segIndex}.totalduration`, totalDur);
      }
    });
  }, [watch(`legs.${legIndex}.segments`), setValue, legIndex]);

  const handleAddSegment = () => {
    appendSegment({
      airline: "",
      flightnumber: "",
      aircraft: "",
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
    });
  };

  return (
    <div className="mb-5 pb-4 border-bottom position-relative">
      <h6
        style={{
          color: "#1A385A",
          fontWeight: "500",
          fontSize: "20px",
          marginBottom: "1.5rem",
        }}
      >
        Leg {legIndex + 1}{" "}
        {tripType === "return" && legIndex === 0 && "(Outbound)"}
        {tripType === "return" && legIndex === 1 && "(Return)"}
      </h6>

      {segments.map((segment, segIndex) => (
        <div key={segment.id} className="mb-4 p-3 border rounded bg-light">
          <div className="row">
            <div className="form-group col-md-3 mb-3">
              <label className="font-weight-bold text-muted small">
                Airline <span className="text-danger">*</span>
              </label>
              <input
                {...register(`legs.${legIndex}.segments.${segIndex}.airline`, {
                  required: "Airline is required",
                })}
                className="form-control form-control-sm border-secondary"
                placeholder="Airline code e.g., PK, AE, EK"
                style={{ borderColor: "#6c757d" }}
              />
              {errors.legs?.[legIndex]?.segments?.[segIndex]?.airline && (
                <small className="text-danger">
                  {errors.legs[legIndex].segments[segIndex].airline.message}
                </small>
              )}
            </div>

            <div className="form-group col-md-3 mb-3">
              <label className="font-weight-bold text-muted small">
                Flight #
              </label>
              <input
                {...register(`legs.${legIndex}.segments.${segIndex}.flightnumber`, {
                  required: "Flight number is required",
                })}
                className="form-control form-control-sm border-secondary"
                placeholder="Flight Number"
                style={{ borderColor: "#6c757d" }}
              />
              {errors.legs?.[legIndex]?.segments?.[segIndex]?.flightnumber && (
                <small className="text-danger">
                  {errors.legs[legIndex].segments[segIndex].flightnumber.message}
                </small>
              )}
            </div>

            <div className="form-group col-md-3 mb-3">
              <label className="font-weight-bold text-muted small">
                Aircraft
              </label>
              <input
                {...register(`legs.${legIndex}.segments.${segIndex}.aircraft`, {
                  required: "Aircraft is required",
                })}
                className="form-control form-control-sm border-secondary"
                placeholder="Aircraft"
                style={{ borderColor: "#6c757d" }}
              />
              {errors.legs?.[legIndex]?.segments?.[segIndex]?.aircraft && (
                <small className="text-danger">
                  {errors.legs[legIndex].segments[segIndex].aircraft.message}
                </small>
              )}
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-3 mb-3">
              <label className="font-weight-bold text-muted small">
                From <span className="text-danger">*</span>
              </label>
              <input
                {...register(`legs.${legIndex}.segments.${segIndex}.departure`, {
                  required: "Departure airport required",
                  pattern: {
                    value: /^[A-Z]{3}$/,
                    message: "Must be 3-letter code",
                  },
                })}
                className="form-control form-control-sm border-secondary"
                placeholder="Departure (e.g., LHE)"
                style={{ borderColor: "#6c757d" }}
              />
              {errors.legs?.[legIndex]?.segments?.[segIndex]?.departure && (
                <small className="text-danger">
                  {errors.legs[legIndex].segments[segIndex].departure.message}
                </small>
              )}
            </div>

            <div className="form-group col-md-3 mb-3">
              <label className="font-weight-bold text-muted small">
                To <span className="text-danger">*</span>
              </label>
              <input
                {...register(`legs.${legIndex}.segments.${segIndex}.arrival`, {
                  required: "Arrival airport required",
                  pattern: {
                    value: /^[A-Z]{3}$/,
                    message: "Must be 3-letter code",
                  },
                })}
                className="form-control form-control-sm border-secondary"
                placeholder="Arrival (e.g., DXB)"
                style={{ borderColor: "#6c757d" }}
              />
              {errors.legs?.[legIndex]?.segments?.[segIndex]?.arrival && (
                <small className="text-danger">
                  {errors.legs[legIndex].segments[segIndex].arrival.message}
                </small>
              )}
            </div>

            <div className="form-group col-md-3 mb-3">
              <label className="font-weight-bold text-muted small">
                Depart Date <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <Controller
                  control={control}
                  name={`legs.${legIndex}.segments.${segIndex}.departuredate`}
                  rules={{ required: "Departure date required" }}
                  render={({ field }) => (
                    <Flatpickr
                      value={field.value}
                      onChange={(date) => field.onChange(date[0])}
                      options={{ dateFormat: "Y-m-d" }}
                      className="form-control form-control-sm border-secondary"
                    />
                  )}
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text border-secondary"
                    style={{ borderColor: "#6c757d", backgroundColor: "white" }}
                  >
                    <i className="fas fa-calendar-alt text-muted"></i>
                  </span>
                </div>
              </div>
              {errors.legs?.[legIndex]?.segments?.[segIndex]?.departuredate && (
                <small className="text-danger">
                  {errors.legs[legIndex].segments[segIndex].departuredate.message}
                </small>
              )}
            </div>

            <div className="form-group col-md-3 mb-3">
              <label className="font-weight-bold text-muted small">
                Arrive Date <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <Controller
                  control={control}
                  name={`legs.${legIndex}.segments.${segIndex}.arrivaldate`}
                  rules={{ required: "Arrival date required" }}
                  render={({ field }) => (
                    <Flatpickr
                      value={field.value}
                      onChange={(date) => field.onChange(date[0])}
                      options={{ dateFormat: "Y-m-d" }}
                      className="form-control form-control-sm border-secondary"
                    />
                  )}
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text border-secondary"
                    style={{ borderColor: "#6c757d", backgroundColor: "white" }}
                  >
                    <i className="fas fa-calendar-alt text-muted"></i>
                  </span>
                </div>
              </div>
              {errors.legs?.[legIndex]?.segments?.[segIndex]?.arrivaldate && (
                <small className="text-danger">
                  {errors.legs[legIndex].segments[segIndex].arrivaldate.message}
                </small>
              )}
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-3 mb-3">
              <label className="font-weight-bold text-muted small">
                Depart Time <span className="text-danger">*</span>
              </label>
              <input
                type="time"
                {...register(`legs.${legIndex}.segments.${segIndex}.departuretime`, {
                  required: "Departure time required",
                })}
                className="form-control form-control-sm border-secondary"
                style={{ borderColor: "#6c757d" }}
              />
            </div>

            <div className="form-group col-md-3 mb-3">
              <label className="font-weight-bold text-muted small">
                Arrive Time <span className="text-danger">*</span>
              </label>
              <input
                type="time"
                {...register(`legs.${legIndex}.segments.${segIndex}.arrivaltime`, {
                  required: "Arrival time required",
                })}
                className="form-control form-control-sm border-secondary"
                style={{ borderColor: "#6c757d" }}
              />
            </div>

            <div className="form-group col-md-3 mb-3">
              <label className="font-weight-bold text-muted small">
                Flight Duration
              </label>
              <input
                {...register(`legs.${legIndex}.segments.${segIndex}.travelduration`)}
                className="form-control form-control-sm border-secondary"
                disabled
                style={{ borderColor: "#6c757d" }}
              />
            </div>

            <div className="form-group col-md-3 mb-3">
              <label className="font-weight-bold text-muted small">
                Layover
              </label>
              <input
                {...register(`legs.${legIndex}.segments.${segIndex}.layover`)}
                className="form-control form-control-sm border-secondary"
                placeholder="0h 0m"
                style={{ borderColor: "#6c757d" }}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-3 mb-3">
              <label className="font-weight-bold text-muted small">
                Total Duration
              </label>
              <input
                {...register(`legs.${legIndex}.segments.${segIndex}.totalduration`)}
                className="form-control form-control-sm border-secondary"
                disabled
                style={{ borderColor: "#6c757d" }}
              />
            </div>

            <div className="form-group col-md-3 mb-3">
              <label className="font-weight-bold text-muted small">
                Check-in Baggage
              </label>
              <div className="input-group">
                <input
                  type="number"
                  min="0"
                  {...register(`legs.${legIndex}.segments.${segIndex}.baggageqty`, {
                    valueAsNumber: true,
                  })}
                  className="form-control form-control-sm border-secondary"
                  style={{ borderColor: "#6c757d" }}
                />
                <select
                  {...register(`legs.${legIndex}.segments.${segIndex}.baggageunit`)}
                  className="form-control form-control-sm border-secondary"
                  style={{ maxWidth: "70px", borderColor: "#6c757d" }}
                >
                  <option value="KG">KG</option>
                  <option value="LB">LB</option>
                </select>
              </div>
            </div>

            <div className="form-group col-md-3 mb-3">
              <label className="font-weight-bold text-muted small">
                Cabin Baggage
              </label>
              <div className="input-group">
                <Controller
                  control={control}
                  name={`legs.${legIndex}.segments.${segIndex}.cabinbaggageunit`}
                  render={({ field: unitField }) => (
                    <>
                      <input
                        type="number"
                        min="0"
                        disabled={unitField.value === "SB"}
                        {...register(`legs.${legIndex}.segments.${segIndex}.cabinbaggageqty`, {
                          valueAsNumber: true,
                        })}
                        className="form-control form-control-sm border-secondary"
                        style={{ borderColor: "#6c757d" }}
                      />
                      <select
                        {...unitField}
                        className="form-control form-control-sm border-secondary"
                        style={{ maxWidth: "70px", borderColor: "#6c757d" }}
                      >
                        <option value="SB">SB</option>
                        <option value="KG">KG</option>
                        <option value="LB">LB</option>
                      </select>
                    </>
                  )}
                />
              </div>
            </div>

            <div className="form-group col-md-3 mb-3 p-4 text-right">
              <button
                type="button"
                onClick={() => removeSegment(segIndex)}
                disabled={segments.length === 1}
                className="btn btn-link text-danger p-0 mr-3"
              >
                <i className="fa fa-trash" style={{ color: "#ff5015",fontSize: "18px" }}></i>
              </button>

              {segIndex === segments.length - 1 && (
                <button
                  type="button"
                  onClick={handleAddSegment}
                  className="btn btn-link p-0"
                  style={{
                    color: "#ff5015",
                  //  borderBottom: "3px solid #ff5015",
                    fontWeight: "500",
                  }}
                >
                  <i className="fas fa-plus mr-2"></i> Add
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const FlightInfoForm = () => {
  const { control, watch } = useFormContext();

  const {
    fields: legs,
    append: appendLeg,
    remove: removeLeg,
  } = useFieldArray({
    control,
    name: "legs",
  });

  const tripType = watch("trip_type") || "oneway";

  const handleAddLeg = () => {
    if (legs.length >= 10) return;
    appendLeg({
      segments: [
        {
          airline: "",
          flightnumber: "",
          aircraft: "",
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
        },
      ],
    });
  };

  return (
    <div className="card shadow-sm mb-4">
      <div
        className="card-header text-white p-3"
        style={{ borderRadius: "8px 8px 0 0", background: "#1a385a" }}
      >
        <h5 className="mb-0">Flight Information</h5>
      </div>

      <div className="card-body bg-white">
        {legs.map((leg, legIndex) => (
          <FlightLeg
            key={leg.id}
            legIndex={legIndex}
            removeLeg={() => removeLeg(legIndex)}
          />
        ))}

        {tripType === "multicity" && (
          <div className="d-flex justify-content-end mt-4 gap-3">
            <button
              type="button"
              onClick={handleAddLeg}
              disabled={legs.length >= 10}
              className="btn btn-link"
              style={{
                color: "#ff5015",
                borderBottom: "3px solid #ff5015",
                fontWeight: "500",
              }}
            >
              <i className="fas fa-plus mr-1"></i> Add Leg
            </button>

            <button
              type="button"
              onClick={() => removeLeg(legs.length - 1)}
              disabled={legs.length <= 2}
              className="btn btn-link text-danger"
            >
              <i className="fas fa-minus mr-1"></i> Remove Leg
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightInfoForm;