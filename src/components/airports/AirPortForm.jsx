import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import Header2 from "../header2/header2";
import { apiHandler } from "../../Apis/backOfficeApiHandler";
import Constants from "../../constants/routes";
import * as XLSX from "xlsx";
import { useLocation } from "react-router-dom";

const AirportForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState("create"); // 'create', 'edit', or 'view'
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
    reset,
    watch,
    setValue,
    clearErrors,
    trigger, // Add trigger to manually trigger validation
  } = useForm({
    defaultValues: {
      name: "",
      name_full: "",
      country_code: "",
      iata_airport_code: "",
      center_latitude: "",
      center_longitude: "",
      is_active: false,
    },
    mode: "onChange", // Real-time validation
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  // Watch all values for real-time validation
  const formValues = watch();

  useEffect(() => {
    apiHandler.setToastConfig({
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

    if (id) {
      const path = window.location.pathname;
      setMode(path.includes("view") ? "view" : "edit");
      fetchAirport();
    }
  }, [id, location.pathname]);

  const fetchAirport = async () => {
    try {
      const response = await apiHandler.get(`/api/airports/${id}`);
      if (response.status) {
        const airportData = {
          name: response.data.name || "",
          name_full: response.data.name_full || "",
          country_code: response.data.country_code || "",
          iata_airport_code: response.data.iata_airport_code || "",
          center_latitude: response.data.center_latitude?.toString() || "",
          center_longitude: response.data.center_longitude?.toString() || "",
          is_active: response.data.is_active || false,
        };

        // Reset form with fetched data
        reset(airportData);

        // Manually set values and trigger validation after a small delay
        // This ensures the form state is properly updated
        setTimeout(() => {
          Object.keys(airportData).forEach((field) => {
            setValue(field, airportData[field], { shouldValidate: true });
          });

          // Trigger validation for all fields
          trigger();

          // Clear any existing errors
          Object.keys(airportData).forEach((field) => {
            clearErrors(field);
          });
        }, 100);
      } else {
        toast.error(response.message || "Failed to fetch airport details");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch airport details";
      toast.error(errorMessage);
    }
  };

  // Validation schema - Updated to handle empty strings better
  const validationSchema = {
    name: {
      required: {
        value: true,
        message: "Airport name is required",
      },
      validate: (value) => {
        if (!value || value.trim().length === 0) {
          return "Airport name is required";
        }
        if (value.trim().length > 300) {
          return "Name must not exceed 300 characters";
        }
        if (value.trim().length < 2) {
          return "Name must be at least 2 characters";
        }
        return true;
      },
    },
    name_full: {
      required: {
        value: true,
        message: "Full name is required",
      },
      validate: (value) => {
        if (!value || value.trim().length === 0) {
          return "Full name is required";
        }
        if (value.trim().length > 300) {
          return "Full name must not exceed 300 characters";
        }
        if (value.trim().length < 2) {
          return "Full name must be at least 2 characters";
        }
        return true;
      },
    },
    country_code: {
      required: {
        value: true,
        message: "Country code is required",
      },
      validate: (value) => {
        const trimmedValue = value?.trim() || "";
        if (!trimmedValue) {
          return "Country code is required";
        }
        if (trimmedValue.length !== 2) {
          return "Country code must be exactly 2 characters";
        }
        if (!/^[A-Z]{2}$/.test(trimmedValue)) {
          return "Country code must be a 2-letter uppercase code (e.g., US)";
        }
        return true;
      },
    },
    iata_airport_code: {
      validate: (value) => {
        const trimmedValue = value?.trim() || "";
        if (trimmedValue.length > 0) {
          if (trimmedValue.length !== 3) {
            return "IATA code must be exactly 3 characters";
          }
          if (!/^[A-Z]{3}$/.test(trimmedValue)) {
            return "IATA code must be exactly 3 uppercase letters";
          }
        }
        return true;
      },
    },
    center_latitude: {
      validate: (value) => {
        if (value !== "" && value !== null && value !== undefined) {
          const numValue = parseFloat(value);
          if (isNaN(numValue)) {
            return "Latitude must be a valid number";
          }
          if (numValue < -90 || numValue > 90) {
            return "Latitude must be between -90 and 90";
          }
        }
        return true;
      },
    },
    center_longitude: {
      validate: (value) => {
        if (value !== "" && value !== null && value !== undefined) {
          const numValue = parseFloat(value);
          if (isNaN(numValue)) {
            return "Longitude must be a valid number";
          }
          if (numValue < -180 || numValue > 180) {
            return "Longitude must be between -180 and 180";
          }
        }
        return true;
      },
    },
  };

  const onSubmit = async (data) => {
    if (mode === "view") return;
    setIsSubmitting(true);

    // Clean data before submitting
    const cleanedData = {
      ...data,
      name: data.name?.trim() || "",
      name_full: data.name_full?.trim() || "",
      country_code: data.country_code?.trim() || "",
      iata_airport_code: data.iata_airport_code?.trim() || "",
      center_latitude: data.center_latitude
        ? parseFloat(data.center_latitude)
        : null,
      center_longitude: data.center_longitude
        ? parseFloat(data.center_longitude)
        : null,
      is_active: Boolean(data.is_active),
    };

    try {
      const response =
        mode === "create"
          ? await apiHandler.post("/api/airports", cleanedData)
          : await apiHandler.put(`/api/airports/${id}`, cleanedData);

      if (response.status) {
        toast.success(
          mode === "create"
            ? "Airport Created Successfully"
            : "Airport Updated Successfully"
        );
        navigate("/airports");
      } else {
        toast.error(
          response.message ||
            `Failed to ${mode === "create" ? "create" : "update"} airport`
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        `Failed to ${mode === "create" ? "create" : "update"} airport`;
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    if (mode === "view") return;
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const formattedData = jsonData.map((row) => ({
          name: (row["Name"] || "").toString().trim(),
          name_full: (row["Full Name"] || "").toString().trim(),
          country_code: (row["Country Code"] || "").toString().trim(),
          iata_airport_code: (row["IATA Airport Code"] || "").toString().trim(),
          center_latitude: row["center_latitude"]
            ? parseFloat(row["center_latitude"])
            : null,
          center_longitude: row["center_longitude"]
            ? parseFloat(row["center_longitude"])
            : null,
          is_active:
            row["Is Active"] === "yes" ||
            row["Is Active"] === true ||
            row["Is Active"] === 1,
        }));

        // Validate each row using the same validation schema
        const validationErrors = [];
        for (let i = 0; i < formattedData.length; i++) {
          const rowErrors = [];

          // Validate each field
          Object.keys(validationSchema).forEach((field) => {
            const fieldValue = formattedData[i][field];
            const rules = validationSchema[field];

            // For bulk upload, we need to simulate the validation
            if (field === "name" || field === "name_full") {
              if (!fieldValue || fieldValue.trim().length === 0) {
                rowErrors.push(`${field.replace("_", " ")} is required`);
              } else if (fieldValue.trim().length > 300) {
                rowErrors.push(
                  `${field.replace("_", " ")} must not exceed 300 characters`
                );
              } else if (fieldValue.trim().length < 2) {
                rowErrors.push(
                  `${field.replace("_", " ")} must be at least 2 characters`
                );
              }
            } else if (field === "country_code") {
              if (!fieldValue || fieldValue.trim().length === 0) {
                rowErrors.push("Country code is required");
              } else if (fieldValue.trim().length !== 2) {
                rowErrors.push("Country code must be exactly 2 characters");
              } else if (!/^[A-Z]{2}$/.test(fieldValue.trim())) {
                rowErrors.push(
                  "Country code must be a 2-letter uppercase code"
                );
              }
            } else if (field === "iata_airport_code") {
              if (fieldValue && fieldValue.trim().length > 0) {
                if (fieldValue.trim().length !== 3) {
                  rowErrors.push("IATA code must be exactly 3 characters");
                } else if (!/^[A-Z]{3}$/.test(fieldValue.trim())) {
                  rowErrors.push(
                    "IATA code must be exactly 3 uppercase letters"
                  );
                }
              }
            } else if (field === "center_latitude") {
              if (
                fieldValue !== null &&
                fieldValue !== undefined &&
                !isNaN(fieldValue)
              ) {
                if (fieldValue < -90 || fieldValue > 90) {
                  rowErrors.push("Latitude must be between -90 and 90");
                }
              }
            } else if (field === "center_longitude") {
              if (
                fieldValue !== null &&
                fieldValue !== undefined &&
                !isNaN(fieldValue)
              ) {
                if (fieldValue < -180 || fieldValue > 180) {
                  rowErrors.push("Longitude must be between -180 and 180");
                }
              }
            }
          });

          if (rowErrors.length > 0) {
            validationErrors.push(`Row ${i + 1}: ${rowErrors.join(", ")}`);
          }
        }

        if (validationErrors.length > 0) {
          const errorMsg = `Validation failed: ${validationErrors.join(" | ")}`;
          toast.error(errorMsg);
          return;
        }

        setIsSubmitting(true);
        try {
          const response = await apiHandler.post(
            "/api/airports/bulk",
            formattedData
          );
          if (response.status) {
            toast.success(
              `Bulk Import Successful: ${response.data.createdCount} airports added`
            );
            navigate("/airports");
          } else {
            toast.error(response.message || "Failed to import airports");
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Failed to import airports";
          toast.error(errorMessage);
        } finally {
          setIsSubmitting(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      toast.error("Failed to process Excel file");
    }
  };

  // Helper function to get error message
  const getErrorMessage = (fieldName) => {
    return errors[fieldName]?.message || "";
  };

  // Helper function to check if field has error
  const hasError = (fieldName) => {
    return !!errors[fieldName];
  };

  // Helper function to get field value for display
  const getFieldValue = (fieldName) => {
    return watch(fieldName) || "";
  };

  return (
    <>
      <Header2
        title={
          mode === "view"
            ? "VIEW AIRPORT"
            : mode === "edit"
            ? "EDIT AIRPORT"
            : "NEW AIRPORT"
        }
        linkText1="Airport List"
        linkText2={
          mode === "view"
            ? "View Airport"
            : mode === "edit"
            ? "Edit Airport"
            : "Add Airport"
        }
        link1={"/airports"}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mt-2">
            <div className="col-md-3 form-group">
              <label>
                Name <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control form-control-sm  ${
                  hasError("name") ? "is-invalid" : ""
                }`}
                type="text"
                {...register("name", validationSchema.name)}
                readOnly={mode === "view"}
                disabled={mode === "view"}
                maxLength={300}
                placeholder="Enter airport name"
              />
              {hasError("name") && (
                <div className="invalid-feedback d-block">
                  {getErrorMessage("name")}
                </div>
              )}
            </div>

            <div className="col-md-3 form-group">
              <label>
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control form-control-sm  ${
                  hasError("name_full") ? "is-invalid" : ""
                }`}
                type="text"
                {...register("name_full", validationSchema.name_full)}
                readOnly={mode === "view"}
                disabled={mode === "view"}
                maxLength={300}
                placeholder="Enter full airport name"
              />
              {hasError("name_full") && (
                <div className="invalid-feedback d-block">
                  {getErrorMessage("name_full")}
                </div>
              )}
            </div>

            <div className="col-md-3 form-group">
              <label>
                Country Code <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control form-control-sm  ${
                  hasError("country_code") ? "is-invalid" : ""
                }`}
                type="text"
                placeholder="US"
                {...register("country_code", validationSchema.country_code)}
                readOnly={mode === "view"}
                disabled={mode === "view"}
                style={{ textTransform: "uppercase" }}
                maxLength={2}
                onChange={(e) => {
                  const upperCaseValue = e.target.value.toUpperCase();
                  setValue("country_code", upperCaseValue, {
                    shouldValidate: true,
                  });
                }}
              />
              {hasError("country_code") && (
                <div className="invalid-feedback d-block">
                  {getErrorMessage("country_code")}
                </div>
              )}
              <small className="form-text text-muted">
                2-letter ISO country code (e.g., US, CA, GB)
              </small>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-3 form-group">
              <label>IATA Airport Code</label>
              <input
                className={`form-control form-control-sm ${
                  hasError("iata_airport_code") ? "is-invalid" : ""
                }`}
                type="text"
                placeholder="JFK"
                {...register(
                  "iata_airport_code",
                  validationSchema.iata_airport_code
                )}
                readOnly={mode === "view"}
                disabled={mode === "view"}
                style={{ textTransform: "uppercase" }}
                maxLength={3}
                onChange={(e) => {
                  const upperCaseValue = e.target.value.toUpperCase();
                  setValue("iata_airport_code", upperCaseValue, {
                    shouldValidate: true,
                  });
                }}
              />
              {hasError("iata_airport_code") && (
                <div className="invalid-feedback d-block">
                  {getErrorMessage("iata_airport_code")}
                </div>
              )}
              <small className="form-text text-muted">
                3-letter IATA code (e.g., JFK, LAX, CDG)
              </small>
            </div>

            <div className="col-md-3 form-group">
              <label>Center Latitude</label>
              <input
                className={`form-control form-control-sm ${
                  hasError("center_latitude") ? "is-invalid" : ""
                }`}
                type="number"
                step="any"
                {...register(
                  "center_latitude",
                  validationSchema.center_latitude
                )}
                readOnly={mode === "view"}
                disabled={mode === "view"}
                placeholder="0.0000"
              />
              {hasError("center_latitude") && (
                <div className="invalid-feedback d-block">
                  {getErrorMessage("center_latitude")}
                </div>
              )}
              <small className="form-text text-muted">-90 to 90 degrees</small>
            </div>

            <div className="col-md-3 form-group">
              <label>Center Longitude</label>
              <input
                className={`form-control form-control-sm ${
                  hasError("center_longitude") ? "is-invalid" : ""
                }`}
                type="number"
                step="any"
                {...register(
                  "center_longitude",
                  validationSchema.center_longitude
                )}
                readOnly={mode === "view"}
                disabled={mode === "view"}
                placeholder="0.0000"
              />
              {hasError("center_longitude") && (
                <div className="invalid-feedback d-block">
                  {getErrorMessage("center_longitude")}
                </div>
              )}
              <small className="form-text text-muted">
                -180 to 180 degrees
              </small>
            </div>

            <div className="col-md-3 form-group d-flex align-items-center">
              <div className="form-check mt-4">
                <Controller
                  name="is_active"
                  control={control}
                  render={({ field }) => (
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_active"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      disabled={mode === "view"}
                    />
                  )}
                />
                <label className="form-check-label ms-2" htmlFor="is_active">
                  Is Active
                </label>
              </div>
            </div>
          </div>

          {mode !== "view" ? (
            <div className="form-group col-md-2 mt-3 mb-4">
              <button
                type="submit"
                className={`btn btn-sm btn-dark`}
                disabled={isSubmitting || !isValid}
              >
                <i className="fa-solid fa-floppy-disk"></i>{" "}
                {isSubmitting ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm ms-2"
                onClick={() => navigate("/airports")}
                disabled={isSubmitting}
              >
                <i className="fa fa-arrow-left me-1" /> Back
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-end align-items-end mt-4 gap-2">
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => navigate(`/airports/edit/${id}`)}
              >
                <i className="fa fa-edit" /> Edit Airport
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate("/airports")}
              >
                <i className="fa fa-arrow-left me-1" /> Back
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default AirportForm;
