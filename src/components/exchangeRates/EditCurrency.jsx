import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import Header2 from "../header2/header2";
import { fetchCurrencyById, updateCurrency } from "./CurrencyService";
import Constants from "../../constants/routes";

const EditCurrency = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [originalCurrencyCode, setOriginalCurrencyCode] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
    watch,
    setValue,
    clearErrors,
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      currency: "",
      currency_code: "",
      currency_rate: "",
      is_base_currency: false,
      is_active: true,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  // Watch all values for real-time validation
  const formValues = watch();

  // Custom validation functions
  const validateCurrencyName = (value) => {
    if (!value || value.trim().length === 0) {
      return "Currency name is required";
    }

    if (value.trim().length < 2) {
      return "Currency name must be at least 2 characters long";
    }

    if (value.trim().length > 100) {
      return "Currency name must not exceed 100 characters";
    }

    if (!/^[a-zA-Z\s&.,'-]+$/.test(value.trim())) {
      return "Currency name can only contain letters, spaces, and common punctuation (&, ., ,, ', -)";
    }

    return true;
  };

  const validateCurrencyCode = (value) => {
    // For edit form, currency code is read-only, so we validate the original value
    if (!originalCurrencyCode) {
      return "Currency code is required";
    }

    const trimmedValue = originalCurrencyCode.trim().toUpperCase();

    if (trimmedValue.length !== 3) {
      return "Currency code must be exactly 3 characters long";
    }

    if (!/^[A-Z]{3}$/.test(trimmedValue)) {
      return "Currency code must be a 3-letter uppercase ISO 4217 code (e.g., USD, EUR, GBP)";
    }

    // Base currency code validation - check if it's the original code
    if (formValues.is_base_currency && trimmedValue !== originalCurrencyCode) {
      return "Cannot change currency code for base currency";
    }

    // Common ISO 4217 validation
    const validCurrencyCodes = [
      "AED",
      "AFN",
      "ALL",
      "AMD",
      "ANG",
      "AOA",
      "ARS",
      "AUD",
      "AWG",
      "AZN",
      "BAM",
      "BBD",
      "BDT",
      "BGN",
      "BHD",
      "BIF",
      "BMD",
      "BND",
      "BOB",
      "BRL",
      "BSD",
      "BTN",
      "BWP",
      "BYN",
      "BZD",
      "CAD",
      "CDF",
      "CHF",
      "CLP",
      "CNY",
      "COP",
      "CRC",
      "CUC",
      "CUP",
      "CVE",
      "CZK",
      "DJF",
      "DKK",
      "DOP",
      "DZD",
      "EGP",
      "ERN",
      "ETB",
      "EUR",
      "FJD",
      "FKP",
      "GBP",
      "GEL",
      "GHS",
      "GIP",
      "GMD",
      "GNF",
      "GTQ",
      "GYD",
      "HKD",
      "HNL",
      "HRK",
      "HTG",
      "HUF",
      "IDR",
      "ILS",
      "INR",
      "IQD",
      "IRR",
      "ISK",
      "JMD",
      "JOD",
      "JPY",
      "KES",
      "KGS",
      "KHR",
      "KMF",
      "KPW",
      "KRW",
      "KWD",
      "KYD",
      "KZT",
      "LAK",
      "LBP",
      "LKR",
      "LRD",
      "LSL",
      "LYD",
      "MAD",
      "MDL",
      "MGA",
      "MKD",
      "MMK",
      "MNT",
      "MOP",
      "MRU",
      "MUR",
      "MVR",
      "MWK",
      "MXN",
      "MYR",
      "MZN",
      "NAD",
      "NGN",
      "NIO",
      "NOK",
      "NPR",
      "NZD",
      "OMR",
      "PAB",
      "PEN",
      "PGK",
      "PHP",
      "PKR",
      "PLN",
      "PYG",
      "QAR",
      "RON",
      "RSD",
      "RUB",
      "RWF",
      "SAR",
      "SBD",
      "SCR",
      "SDG",
      "SEK",
      "SGD",
      "SHP",
      "SLE",
      "SLL",
      "SOS",
      "SRD",
      "SSP",
      "STN",
      "SYP",
      "SZL",
      "THB",
      "TJS",
      "TMT",
      "TND",
      "TOP",
      "TRY",
      "TTD",
      "TVD",
      "TWD",
      "TZS",
      "UAH",
      "UGX",
      "USD",
      "UYU",
      "UZS",
      "VES",
      "VND",
      "VUV",
      "WST",
      "XAF",
      "XCD",
      "XOF",
      "XPF",
      "YER",
      "ZAR",
      "ZMW",
      "ZWL",
    ];

    if (!validCurrencyCodes.includes(trimmedValue)) {
      return `${trimmedValue} is not a valid ISO 4217 currency code`;
    }

    return true;
  };

  const validateCurrencyRate = (value) => {
    if (!value || value.trim().length === 0) {
      return "Currency rate is required";
    }

    const rateValue = parseFloat(value);

    if (isNaN(rateValue)) {
      return "Currency rate must be a valid number";
    }

    if (rateValue <= 0) {
      return "Currency rate must be greater than 0";
    }

    if (rateValue > 999999.9999) {
      return "Currency rate must not exceed 999,999.9999";
    }

    return true;
  };

  // Validation schema
  const validationSchema = {
    currency: {
      required: {
        value: true,
        message: "Currency name is required",
      },
      validate: validateCurrencyName,
    },
    currency_code: {
      required: {
        value: true,
        message: "Currency code is required",
      },
      validate: validateCurrencyCode,
    },
    currency_rate: {
      required: {
        value: true,
        message: "Currency rate is required",
      },
      validate: validateCurrencyRate,
    },
    is_base_currency: {
      validate: (value) => {
        // Base currency validation handled in currency_code validation
        return true;
      },
    },
    is_active: {
      validate: (value) => {
        // Status validation can be handled in backend
        return true;
      },
    },
  };

  // Helper function to check base currency restrictions
  const baseCurrencyWarning = () => {
    if (formValues.is_base_currency) {
      return (
        <small className="text-warning2 d-block">
          <i className="fa fa-exclamation-triangle triangularFA me-1"></i>
          Base currency: Currency code and name cannot be changed
        </small>
      );
    }
    return null;
  };

  useEffect(() => {
    const loadCurrency = async () => {
      setLoading(true);
      try {
        const result = await fetchCurrencyById(id);
        if (result.success && result.data) {
          const currencyData = {
            currency: result.data.currency || "",
            currency_code: result.data.currency_code || "",
            currency_rate: result.data.currency_rate?.toString() || "",
            is_base_currency: result.data.is_base_currency || false,
            is_active: result.data.is_active !== false, // Default to true if undefined
          };

          // Store original currency code for validation
          setOriginalCurrencyCode(result.data.currency_code || "");

          // Reset form with fetched data
          reset(currencyData);

          // Manually set values and trigger validation after a small delay
          setTimeout(() => {
            Object.keys(currencyData).forEach((field) => {
              setValue(field, currencyData[field], { shouldValidate: true });
            });

            // Trigger validation for all fields
            trigger();

            // Clear any existing errors
            Object.keys(currencyData).forEach((field) => {
              clearErrors(field);
            });
          }, 100);
        } else {
          toast.error(result.message || "Failed to fetch currency");
          navigate("/exchange-rates");
        }
      } catch (error) {
        const errorMessage = error.message || "Failed to fetch currency";
        toast.error(errorMessage);
        navigate("/exchange-rates");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCurrency();
    } else {
      toast.error("Invalid currency ID");
      navigate("/exchange-rates");
      setLoading(false);
    }
  }, [id, navigate, reset, setValue, clearErrors, trigger]);

  // Helper functions
  const getErrorMessage = (fieldName) => {
    return errors[fieldName]?.message || "";
  };

  const hasError = (fieldName) => {
    return !!errors[fieldName];
  };

  const getFieldValue = (fieldName) => {
    return watch(fieldName) || "";
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Clean data before submitting
    const cleanedData = {
      ...data,
      currency: data.currency?.trim() || "",
      currency_rate: parseFloat(data.currency_rate) || 0,
      is_base_currency: Boolean(data.is_base_currency),
      is_active: Boolean(data.is_active),
    };

    // Note: currency_code is not included in payload for update since it's not editable
    // The original currency_code is maintained in the database

    try {
      const result = await updateCurrency(id, cleanedData);
      if (result.success) {
        toast.success("Currency updated successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
        navigate("/exchange-rates");
      } else {
        toast.error(result.message || "Failed to update currency", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      }
    } catch (error) {
      const errorMessage = error.message || "Failed to update currency";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "400px" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header2
        title="EDIT CURRENCY"
        linkText1="Currencies"
        linkText2="Edit Currency"
        link1="/exchange-rates"
      />
      <div className="container-fluid pt-4 p-4" id="content-pad">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="panel-body removeMargins">
            <div className="form-group row mt-2">
              <div className="form-group col-md-3">
                <label>
                  Currency Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control form-control-sm  ${
                    hasError("currency") ? "is-invalid" : ""
                  }`}
                  {...register("currency", validationSchema.currency)}
                  placeholder="e.g., United States Dollar"
                  maxLength="100"
                  disabled={formValues.is_base_currency}
                  style={{
                    backgroundColor: formValues.is_base_currency
                      ? "#e9ecef"
                      : "white",
                  }}
                />
                {hasError("currency") && (
                  <div className="invalid-feedback d-block">
                    {getErrorMessage("currency")}
                  </div>
                )}
                <small className="form-text text-muted">
                  Maximum 100 characters
                </small>
                {baseCurrencyWarning()}
              </div>

              <div className="form-group col-md-3">
                <label>
                  Currency Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control form-control-sm  ${
                    hasError("currency_code") ? "is-invalid" : ""
                  }`}
                  value={getFieldValue("currency_code")}
                  readOnly={true}
                  disabled={formValues.is_base_currency}
                  style={{
                    backgroundColor: formValues.is_base_currency
                      ? "#e9ecef"
                      : "#f8f9fa",
                    textTransform: "uppercase",
                    color: formValues.is_base_currency ? "#6c757d" : "inherit",
                  }}
                  placeholder="e.g., USD"
                />
                {hasError("currency_code") && (
                  <div className="invalid-feedback d-block">
                    {getErrorMessage("currency_code")}
                  </div>
                )}
                <small className="form-text text-muted">
                  3-letter ISO 4217 code (read-only)
                </small>
              </div>

              <div className="form-group col-md-3">
                <label>
                  Currency Rate <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className={`form-control form-control-sm  ${
                    hasError("currency_rate") ? "is-invalid" : ""
                  }`}
                  step="0.0001"
                  min="0.0001"
                  {...register("currency_rate", validationSchema.currency_rate)}
                  placeholder="e.g., 1.0000"
                />
                {hasError("currency_rate") && (
                  <div className="invalid-feedback d-block">
                    {getErrorMessage("currency_rate")}
                  </div>
                )}
                <small className="form-text text-muted">
                  Rate relative to base currency
                </small>
              </div>

              <div className="form-group col-md-3">
                <label>Base Currency</label>
                <Controller
                  name="is_base_currency"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        type="checkbox"
                        className="me-2"
                        style={{
                          accentColor: "var(--color-secondary)",
                          verticalAlign: "middle",
                        }}
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                          // Re-validate currency code when base currency status changes
                          trigger("currency_code");
                        }}
                        id="baseCurrencyCheckbox"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="baseCurrencyCheckbox"
                      >
                        Is Base Currency
                      </label>
                    </div>
                  )}
                />
                {formValues.is_base_currency && (
                  <small className="text-warning2 d-block">
                    <i className="fa fa-info-circle me-1 triangularFA"></i>
                    This currency is used as the base for all rate calculations
                  </small>
                )}
                <small className="form-text text-muted d-block">
                  Only one currency can be the base currency system-wide
                </small>
              </div>

              <div className="form-group col-md-3 mt-2">
                <label>Status</label>
                <Controller
                  name="is_active"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        type="checkbox"
                        className="me-2"
                        style={{
                          accentColor: "var(--color-secondary)",
                          verticalAlign: "middle",
                        }}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        id="statusCheckbox"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="statusCheckbox"
                      >
                        Active
                      </label>
                    </div>
                  )}
                />
                {!formValues.is_active && (
                  <small className="text-warning2 d-block">
                    <i className="fa fa-exclamation-triangle triangularFA me-1"></i>
                    Inactive currencies cannot be used in transactions
                  </small>
                )}
                <small className="form-text text-muted d-block">
                  Controls whether this currency can be used in transactions
                </small>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="form-group offset-md-9 col-md-3 d-flex justify-content-end">
              <button
                type="submit"
                className={`btn btn-sm btn-dark me-2`}
                disabled={isSubmitting || !isValid || loading}
              >
                <i className="fa fa-floppy-o me-1" />
                {isSubmitting ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => navigate("/exchange-rates")}
                disabled={isSubmitting || loading}
              >
                <i className="fa fa-times me-1" /> Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCurrency;
