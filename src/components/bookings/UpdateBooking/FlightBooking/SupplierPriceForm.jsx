import React from "react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";

const SupplierPriceForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  // Watch required values
  const supplierCurrency = useWatch({ control, name: "supplierCurrency" });
  const supplierTotalRate = useWatch({ control, name: "supplierTotalRate" }) || 0;
  const passengers = useWatch({ control, name: "passengers" }) || [];
  const fareBreakdown = useWatch({ control, name: "fareBreakdown" }) || [];

  // useFieldArray for fare breakdown (always 3: adult, child, infant)
  const { fields } = useFieldArray({
    control,
    name: "fareBreakdown",
  });

  // Calculate totals
  const totals = fareBreakdown.reduce(
    (acc, fare) => {
      const total = parseFloat(fare.total) || 0;
      const tax = parseFloat(fare.tax) || 0;
      acc.baseFare += total;
      acc.tax += tax;
      acc.grandTotal += total + tax;
      return acc;
    },
    { baseFare: 0, tax: 0, grandTotal: 0 }
  );

  const isGrandTotalValid =
    Math.abs(totals.grandTotal - parseFloat(supplierTotalRate)) <= 0.01;

  // Map passenger types present
  const hasPassengerType = {
    adult: passengers.some((p) => p.passengertype === "AD"),
    child: passengers.some((p) => p.passengertype === "CH"),
    infant: passengers.some((p) => p.passengertype === "IN"),
  };

  return (
    <div className="card shadow-sm mb-4">
      <div
        className="card-header text-white"
        style={{ borderRadius: "8px 8px 0 0", background: "#1a385a" }}
      >
        <h5 className="mb-0">
          <i className="fas fa-calculator me-2"></i>Supplier Price Breakdown
        </h5>
      </div>

      <div className="card-body bg-white">
        <div className="row">
          <div className="form-group col-md-4 mb-3">
            <label className="font-weight-bold text-muted">
              Supplier Currency <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              {...register("supplierCurrency", {
                required: "Supplier currency is required",
              })}
              className="form-control form-control-sm"
              placeholder="e.g., USD"
              style={{ borderColor: "#6c757d" }}
            />
            {errors.supplierCurrency && (
              <small className="text-danger">{errors.supplierCurrency.message}</small>
            )}
          </div>

          <div className="form-group col-md-4 mb-3">
            <label className="font-weight-bold text-muted">
              Supplier Base Fare <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register("supplierRate", {
                required: "Base fare is required",
                min: { value: 0, message: "Must be ≥ 0" },
                valueAsNumber: true,
              })}
              className="form-control form-control-sm"
              placeholder="Base Fare"
              style={{ borderColor: "#6c757d" }}
            />
            {errors.supplierRate && (
              <small className="text-danger">{errors.supplierRate.message}</small>
            )}
          </div>

          <div className="form-group col-md-4 mb-3">
            <label className="font-weight-bold text-muted">
              Supplier Total Fare <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register("supplierTotalRate", {
                required: "Total fare is required",
                min: { value: 0, message: "Must be ≥ 0" },
                valueAsNumber: true,
              })}
              className="form-control form-control-sm"
              placeholder="Total Fare"
              style={{ borderColor: "#6c757d" }}
            />
            {errors.supplierTotalRate && (
              <small className="text-danger">{errors.supplierTotalRate.message}</small>
            )}
          </div>
        </div>

        <div className="mt-4">
          <h6 className="font-weight-bold text-muted">Fare Breakdown</h6>

          {fields.map((field, index) => {
            const type = field.type; // "adult" | "child" | "infant"
            const isDisabled = !hasPassengerType[type];

            return (
              <div key={field.id} className="mb-3 p-3 border rounded bg-light">
                <div className="row align-items-end">
                  <div className="form-group col-md-4">
                    <label className="font-weight-bold text-muted small">
                      Passenger Type
                    </label>
                    <select
                      className="form-control form-control-sm border-secondary"
                      {...register(`fareBreakdown.${index}.type`)}
                      disabled
                      style={{ borderColor: "#6c757d" }}
                    >
                      <option value="adult">Adult</option>
                      <option value="child">Child</option>
                      <option value="infant">Infant</option>
                    </select>
                  </div>

                  <div className="form-group col-md-4">
                    <label className="font-weight-bold text-muted small">
                      Base Fare {isDisabled && "(No passengers)"}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      disabled={isDisabled}
                      {...register(`fareBreakdown.${index}.total`, {
                        valueAsNumber: true,
                        min: { value: 0, message: "≥ 0" },
                      })}
                      className="form-control form-control-sm border-secondary"
                      style={{ borderColor: "#6c757d" }}
                    />
                  </div>

                  <div className="form-group col-md-4">
                    <label className="font-weight-bold text-muted small">Tax</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      disabled={isDisabled}
                      {...register(`fareBreakdown.${index}.tax`, {
                        valueAsNumber: true,
                        min: { value: 0, message: "≥ 0" },
                      })}
                      className="form-control form-control-sm border-secondary"
                      style={{ borderColor: "#6c757d" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Totals Summary */}
        <div className="row mt-4 pt-3 border-top">
          <div className="col-md-4">
            <p className="font-weight-bold text-muted mb-1">Total Base Fare</p>
            <p className="text-dark h5">
              {supplierCurrency} {totals.baseFare.toFixed(2)}
            </p>
          </div>
          <div className="col-md-4">
            <p className="font-weight-bold text-muted mb-1">Total Tax</p>
            <p className="text-dark h5">
              {supplierCurrency} {totals.tax.toFixed(2)}
            </p>
          </div>
          <div className="col-md-4">
            <p className="font-weight-bold text-muted mb-1">Grand Total</p>
            <p className={`h5 ${isGrandTotalValid ? "text-dark" : "text-danger"}`}>
              {supplierCurrency} {totals.grandTotal.toFixed(2)}
              {!isGrandTotalValid && (
                <small className="d-block text-danger">
                  Must equal Supplier Total Fare ({supplierTotalRate})
                </small>
              )}
            </p>
          </div>
        </div>

        {/* Custom cross-field validation message */}
        {!isGrandTotalValid && (
          <div className="alert alert-danger mt-3" role="alert">
            <strong>Validation Error:</strong> The sum of all passenger fares (Grand Total) must exactly match the Supplier Total Fare.
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierPriceForm;