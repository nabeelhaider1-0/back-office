// import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
// import Constants from "../../../constants/routes";
// import Header2 from "../../header2/header2";
// import { useState, useEffect } from "react";
// import {
//   getOnePaymentGateway,
//   updatePaymentGateway,
// } from "../../../Apis/PaymentService";
// import {
//   ErrorApiAlert,
//   SuccessApiToast,
// } from "../../../constants/globalfunctions";
// import { hasPermission, isSuperAdmin } from "../../../authUtils";
// import COUNTRIES from "../../../constants/countries";
// import MultiSelect from "../../reactMultiSelect";

// const MasterPaymentEdit = () => {
//   const navigate = useNavigate();
//   const { uuid } = useParams();
//   const location = useLocation();
//   const isEditMode = location.pathname.includes("edit");
//   const mode = isEditMode ? "edit" : "view";
//   const [formData, setFormData] = useState({
//     paymentGatewayName: "",
//     paymentGatewayURL: "",
//     code: "",
//     markup: "",
//     availableCountries: [], // Will store country codes, e.g., ["PK", "US"]
//     capture_method: "None",
//     settings: {},
//     status: "yes",
//   });
//   const [selectedGateway, setSelectedGateway] = useState("");
//   const [loading, setLoading] = useState(true);

//   const revolutSettingsKeys = ["apiVersion", "secretKey"];
//   const alfalahSettingsKeys = [
//     "key1",
//     "key2",
//     "hashKey",
//     "storeId",
//     "password",
//     "username",
//     "returnUrl",
//     "apiVersion",
//     "merchantId",
//   ];
//   const captureMethods = ["Automatic", "Manual", "None"];

//   const getSettingsKeys = (gatewayName) => {
//     if (gatewayName === "Revolut") return revolutSettingsKeys;
//     if (gatewayName === "Alfalah Bank") return alfalahSettingsKeys;
//     return [];
//   };

//   const formatLabel = (key) => {
//     return (
//       key.charAt(0).toUpperCase() +
//       key
//         .slice(1)
//         .replace(/([A-Z])/g, " $1")
//         .trim()
//     );
//   };

//   useEffect(() => {
//     const fetchGateway = async () => {
//       const requiredPermission = isEditMode ? "update" : "read";
//       if (
//         !isSuperAdmin() &&
//         !hasPermission("Payment Gateways", requiredPermission)
//       ) {
//         ErrorApiAlert("You do not have permission to access this page");
//         navigate(Constants.URLConstants.MASTERSPAYMENTSEARCH);
//         return;
//       }

//       try {
//         const response = await getOnePaymentGateway(uuid);
//         if (response.data.statusCode === 200) {
//           const gateway = response.data.data;
//           // Store country codes directly as they come from the API
//           setFormData({
//             paymentGatewayName: gateway.paymentGatewayName || "",
//             paymentGatewayURL: gateway.paymentGatewayURL || "",
//             code: gateway.code || "",
//             markup: gateway.markup || "",
//             availableCountries: Array.isArray(gateway.availableCountries)
//               ? gateway.availableCountries
//               : [],
//             capture_method: gateway.capture_method || "None",
//             settings: gateway.settings || {},
//             status: gateway.status?.toString() || "yes",
//           });
//           setSelectedGateway(gateway.paymentGatewayName || "");
//         } else {
//           ErrorApiAlert("Failed to fetch payment gateway");
//           navigate(Constants.URLConstants.MASTERSPAYMENTSEARCH);
//         }
//       } catch (error) {
//         ErrorApiAlert("Error fetching payment gateway");
//         navigate(Constants.URLConstants.MASTERSPAYMENTSEARCH);
//       }
//       setLoading(false);
//     };
//     fetchGateway();
//   }, [uuid, navigate, isEditMode]);

//   const handleInputChange = (e) => {
//     if (!isEditMode) return;
//     const { name, value } = e.target;
//     if (name.startsWith("settings.")) {
//       const key = name.split(".")[1];
//       setFormData((prevState) => ({
//         ...prevState,
//         settings: {
//           ...prevState.settings,
//           [key]: value,
//         },
//       }));
//     } else {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };

//   const handleGatewayChange = (e) => {
//     if (!isEditMode) return;
//     const { name, value } = e.target;
//     handleInputChange(e);
//     setSelectedGateway(value);
//     setFormData((prevState) => ({
//       ...prevState,
//       settings: {},
//     }));
//   };

//   const handleCountriesChange = (selected) => {
//     // Store only the country codes (values) in formData.availableCountries
//     const countryCodes = selected.map((option) => option.value);
//     setFormData((prevState) => ({
//       ...prevState,
//       availableCountries: countryCodes,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isEditMode) return;
//     try {
//       // availableCountries is already an array of country codes
//       const payload = { ...formData };
//       const response = await updatePaymentGateway(uuid, payload);
//       if (response.data.statusCode === 200) {
//         SuccessApiToast("Payment Gateway Updated Successfully");
//         navigate(Constants.URLConstants.MASTERSPAYMENTSEARCH);
//       }
//     } catch (error) {
//       ErrorApiAlert("Error Updating Payment Gateway");
//     }
//   };

//   const handleCancel = () => {
//     navigate(Constants.URLConstants.MASTERSPAYMENTSEARCH);
//   };

//   // Convert country codes to objects for MultiSelect value prop
//   const selectedCountries = formData.availableCountries.map((code) => {
//     const country = COUNTRIES.find((c) => c.value === code);
//     return country || { label: code, value: code }; // Fallback in case code is not found
//   });

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Header2
//         title={isEditMode ? "EDIT PAYMENT GATEWAY" : "VIEW PAYMENT GATEWAY"}
//         linkText1="List Payment Gateways"
//         linkText2="Add Payment Gateways"
//         link1={Constants.URLConstants.MASTERSPAYMENTSEARCH}
//       />
//       <div className="container-fluid pt-0 p-4" id="content-pad">
//         <form onSubmit={handleSubmit} id="paymentgatewayeditview">
//           <input
//             type="hidden"
//             name="action"
//             value={isEditMode ? "edit" : "view"}
//           />
//           <div className="panel-body">
//             <div className="row">
//               <div className="form-group col-md-3">
//                 <label>
//                   Payment Gateway Name <span className="text-danger">*</span>
//                 </label>
//                 <select
//                   className=" form-control form-control-sm test123"
//                   name="paymentGatewayName"
//                   id="paymentGatewayName"
//                   value={formData.paymentGatewayName}
//                   onChange={handleGatewayChange}
//                   required={isEditMode}
//                   disabled={!isEditMode}
//                 >
//                   <option value="">Select a gateway</option>
//                   <option value="Revolut">Revolut</option>
//                   <option value="Alfalah Bank">Alfalah Bank</option>
//                 </select>
//               </div>
//               <div className="form-group col-md-3">
//                 <label>
//                   Payment Gateway URL <span className="text-danger">*</span>
//                 </label>
//                 <input
//                   className=" form-control form-control-sm"
//                   type="text"
//                   name="paymentGatewayURL"
//                   id="paymentGatewayURL"
//                   value={formData.paymentGatewayURL}
//                   onChange={handleInputChange}
//                   required={isEditMode}
//                   disabled={!isEditMode}
//                 />
//               </div>
//               <div className="form-group col-md-3">
//                 <label>
//                   Code <span className="text-danger">*</span>
//                 </label>
//                 <input
//                   className=" form-control form-control-sm"
//                   type="text"
//                   name="code"
//                   id="code"
//                   value={formData.code}
//                   onChange={handleInputChange}
//                   required={isEditMode}
//                   disabled={!isEditMode}
//                 />
//               </div>
//               <div className="form-group col-md-3">
//                 <label>
//                   Markup (%) <span className="text-danger">*</span>
//                 </label>
//                 <input
//                   className=" form-control form-control-sm"
//                   type="text"
//                   name="markup"
//                   id="markup"
//                   value={formData.markup}
//                   onChange={handleInputChange}
//                   required={isEditMode}
//                   disabled={!isEditMode}
//                 />
//               </div>
//             </div>
//             <div className="row mt-2">
//               <div className="form-group col-md-3">
//                 <label>
//                   Available Countries <span className="text-danger">*</span>
//                 </label>
//                 <MultiSelect
//                   options={COUNTRIES}
//                   value={selectedCountries}
//                   onChange={handleCountriesChange}
//                   isMulti
//                   isSearchable
//                   placeholder="- Supported Countries -"
//                   noOptionsMessage={() => "No countries found"}
//                   className=""
//                   name="availableCountries"
//                   id="availableCountries"
//                 />
//               </div>
//               <div className="form-group col-md-3">
//                 <label>
//                   Capture Method <span className="text-danger">*</span>
//                 </label>
//                 <select
//                   className=" form-control form-control-sm"
//                   name="capture_method"
//                   id="capture_method"
//                   value={formData.capture_method.toLowerCase()}
//                   onChange={handleInputChange}
//                   required={isEditMode}
//                   disabled={!isEditMode}
//                 >
//                   {captureMethods.map((method) => (
//                     <option key={method} value={method.toLowerCase()}>
//                       {method}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             {selectedGateway && (
//               <>
//                 <br />
//                 <div className="row">
//                   {getSettingsKeys(selectedGateway).map((key) => (
//                     <div key={key} className="form-group col-md-3">
//                       <label>
//                         {formatLabel(key)}{" "}
//                         <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         className=" form-control form-control-sm"
//                         type="text"
//                         name={`settings.${key}`}
//                         id={`settings.${key}`}
//                         value={formData.settings[key] || ""}
//                         onChange={handleInputChange}
//                         required={isEditMode}
//                         disabled={!isEditMode}
//                         placeholder={isEditMode ? `Enter ${key}` : ""}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//             <br />
//             {isEditMode && (
//               <div className="row mt-4">
//                 <div className="form-group offset-md-9 col-md-3 d-flex justify-content-end">
//                   <button
//                     type="submit"
//                     className="btn btn-dark btn-sm me-2"
//                     onClick={handleSubmit}
//                   >
//                     <i className="fa fa-floppy-o me-1" /> Save
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary btn-sm me-2"
//                     onClick={() => navigate(`/payment-gateways`)}
//                   >
//                     <i className="fa fa-times me-1" /> Cancel
//                   </button>
//                 </div>
//               </div>
//             )}
//             {!isEditMode && (
//               <div className="d-flex justify-content-end align-items-end mt-4 gap-2">
//                 <Link
//                   to={`/payment-gateways/edit/${uuid}`}
//                   className="btn btn-dark"
//                   data-toggle="tooltip"
//                   title="Edit"
//                 >
//                   <i className="fa fa-edit" /> Edit
//                 </Link>

//                 <button
//                   type="button"
//                   className="btn btn-outline-secondary"
//                   onClick={() => navigate(`/payment-gateways`)}
//                 >
//                   <i className="fa fa-arrow-left me-1" /> Back
//                 </button>
//               </div>
//             )}
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default MasterPaymentEdit;
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  getOnePaymentGateway,
  updatePaymentGateway,
} from "../../../Apis/PaymentService";
import {
  ErrorApiAlert,
  SuccessApiToast,
} from "../../../constants/globalfunctions";
import { hasPermission, isSuperAdmin } from "../../../authUtils";
import COUNTRIES from "../../../constants/countries";
import MultiSelect from "../../reactMultiSelect";

const MasterPaymentEdit = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const location = useLocation();

  const isEditMode = location.pathname.includes("edit");
  const mode = isEditMode ? "edit" : "view";

  const [selectedGateway, setSelectedGateway] = useState("");
  const [loading, setLoading] = useState(true);

  const revolutSettingsKeys = ["apiVersion", "secretKey"];
  const alfalahSettingsKeys = [
    "key1",
    "key2",
    "hashKey",
    "storeId",
    "password",
    "username",
    "returnUrl",
    "apiVersion",
    "merchantId",
  ];
  const captureMethods = ["Automatic", "Manual", "None"];

  // IMPORTANT: your file uses "Alfalah Bank" in getSettingsKeys,
  // and options in edit form also use "Alfalah Bank". Keep consistent.
  const getSettingsKeys = (gatewayName) => {
    if (gatewayName === "Revolut") return revolutSettingsKeys;
    if (gatewayName === "Alfalah Bank") return alfalahSettingsKeys;
    return [];
  };

  const formatLabel = (key) =>
    key.charAt(0).toUpperCase() +
    key
      .slice(1)
      .replace(/([A-Z])/g, " $1")
      .trim();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    trigger,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      paymentGatewayName: "",
      paymentGatewayURL: "",
      code: "",
      markup: "",
      availableCountries: [],
      capture_method: "none",
      settings: {},
      status: "yes",
    },
  });

  const watchedGatewayName = watch("paymentGatewayName");
  const settingsKeys = useMemo(
    () => getSettingsKeys(selectedGateway),
    [selectedGateway]
  );

  // Keep selectedGateway in sync with form value
  useEffect(() => {
    setSelectedGateway(watchedGatewayName || "");
  }, [watchedGatewayName]);

  useEffect(() => {
    const fetchGateway = async () => {
      const requiredPermission = isEditMode ? "update" : "read";
      if (
        !isSuperAdmin() &&
        !hasPermission("Payment Gateways", requiredPermission)
      ) {
        ErrorApiAlert("You do not have permission to access this page");
        navigate(Constants.URLConstants.MASTERSPAYMENTSEARCH);
        return;
      }

      try {
        const response = await getOnePaymentGateway(uuid);
        if (response?.data?.statusCode === 200) {
          const gateway = response.data.data;

          // Reset the form with API data
          reset({
            paymentGatewayName: gateway.paymentGatewayName || "",
            paymentGatewayURL: gateway.paymentGatewayURL || "",
            code: gateway.code || "",
            markup: gateway.markup ?? "",
            availableCountries: Array.isArray(gateway.availableCountries)
              ? gateway.availableCountries
              : [],
            capture_method: (gateway.capture_method || "none").toLowerCase(),
            settings: gateway.settings || {},
            status: gateway.status?.toString() || "yes",
          });

          setSelectedGateway(gateway.paymentGatewayName || "");
        } else {
          ErrorApiAlert("Failed to fetch payment gateway");
          navigate(Constants.URLConstants.MASTERSPAYMENTSEARCH);
        }
      } catch (error) {
        ErrorApiAlert("Error fetching payment gateway");
        navigate(Constants.URLConstants.MASTERSPAYMENTSEARCH);
      } finally {
        setLoading(false);
      }
    };

    fetchGateway();
  }, [uuid, navigate, isEditMode, reset]);

  // When gateway changes in EDIT mode, reset settings (same as your old logic)
  const handleGatewayChange = (e) => {
    if (!isEditMode) return;
    const value = e.target.value;
    setValue("paymentGatewayName", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setSelectedGateway(value);
    setValue("settings", {}, { shouldValidate: true, shouldDirty: true });
    clearErrors("settings");
    // optional: trigger validation right away
    // trigger();
  };

  const onSubmit = async (data) => {
    if (!isEditMode) return;

    try {
      const payload = {
        ...data,
        // clean strings
        paymentGatewayURL: (data.paymentGatewayURL || "").trim(),
        code: (data.code || "").trim(),
        markup: String(data.markup ?? "").trim(),
      };

      const response = await updatePaymentGateway(uuid, payload);
      if (response?.data?.statusCode === 200) {
        SuccessApiToast("Payment Gateway Updated Successfully");
        navigate(Constants.URLConstants.MASTERSPAYMENTSEARCH);
      } else {
        ErrorApiAlert(
          response?.data?.message || "Error Updating Payment Gateway"
        );
      }
    } catch (error) {
      ErrorApiAlert(
        error?.response?.data?.message || "Error Updating Payment Gateway"
      );
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header2
        title={isEditMode ? "EDIT PAYMENT GATEWAY" : "VIEW PAYMENT GATEWAY"}
        linkText1="List Payment Gateways"
        linkText2="Add Payment Gateways"
        link1={Constants.URLConstants.MASTERSPAYMENTSEARCH}
      />

      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit(onSubmit)} id="paymentgatewayeditview">
          <input type="hidden" name="action" value={mode} />

          <div className="panel-body">
            <div className="row">
              {/* Gateway Name */}
              <div className="form-group col-md-3">
                <label>
                  Payment Gateway Name <span className="text-danger">*</span>
                </label>

                <select
                  className={`form-control form-control-sm ${
                    errors.paymentGatewayName ? "is-invalid" : ""
                  }`}
                  {...register("paymentGatewayName", {
                    required: isEditMode
                      ? "Payment gateway name is required"
                      : false,
                  })}
                  onChange={handleGatewayChange}
                  disabled={!isEditMode}
                >
                  <option value="">Select a gateway</option>
                  <option value="Revolut">Revolut</option>
                  <option value="Alfalah Bank">Alfalah Bank</option>
                </select>

                {isEditMode && errors.paymentGatewayName && (
                  <div className="invalid-feedback d-block">
                    {errors.paymentGatewayName.message}
                  </div>
                )}
              </div>

              {/* URL */}
              <div className="form-group col-md-3">
                <label>
                  Payment Gateway URL <span className="text-danger">*</span>
                </label>

                <input
                  className={`form-control form-control-sm ${
                    errors.paymentGatewayURL ? "is-invalid" : ""
                  }`}
                  type="text"
                  disabled={!isEditMode}
                  {...register("paymentGatewayURL", {
                    required: isEditMode
                      ? "Payment gateway URL is required"
                      : false,
                    validate: (v) => {
                      if (!isEditMode) return true;
                      const val = (v || "").trim();
                      if (!val) return "Payment gateway URL is required";
                      if (!/^https?:\/\/.+/i.test(val))
                        return "URL must start with http:// or https://";
                      return true;
                    },
                  })}
                />

                {isEditMode && errors.paymentGatewayURL && (
                  <div className="invalid-feedback d-block">
                    {errors.paymentGatewayURL.message}
                  </div>
                )}
              </div>

              {/* Code */}
              <div className="form-group col-md-3">
                <label>
                  Code <span className="text-danger">*</span>
                </label>

                <input
                  className={`form-control form-control-sm ${
                    errors.code ? "is-invalid" : ""
                  }`}
                  type="text"
                  disabled={!isEditMode}
                  {...register("code", {
                    required: isEditMode ? "Code is required" : false,
                    validate: (v) => {
                      if (!isEditMode) return true;
                      const val = (v || "").trim();
                      if (!val) return "Code is required";
                      if (val.length < 2)
                        return "Code must be at least 2 characters";
                      return true;
                    },
                  })}
                />

                {isEditMode && errors.code && (
                  <div className="invalid-feedback d-block">
                    {errors.code.message}
                  </div>
                )}
              </div>

              {/* Markup */}
              <div className="form-group col-md-3">
                <label>
                  Markup (%) <span className="text-danger">*</span>
                </label>

                <input
                  className={`form-control form-control-sm ${
                    errors.markup ? "is-invalid" : ""
                  }`}
                  type="text"
                  disabled={!isEditMode}
                  {...register("markup", {
                    required: isEditMode ? "Markup is required" : false,
                    validate: (v) => {
                      if (!isEditMode) return true;
                      const val = String(v ?? "").trim();
                      if (!val) return "Markup is required";
                      const num = Number(val);
                      if (Number.isNaN(num))
                        return "Markup must be a valid number";
                      if (num < 0) return "Markup cannot be negative";
                      if (num > 100) return "Markup cannot exceed 100";
                      return true;
                    },
                  })}
                />

                {isEditMode && errors.markup && (
                  <div className="invalid-feedback d-block">
                    {errors.markup.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row mt-2">
              {/* Available Countries */}
              <div className="form-group col-md-3">
                <label>
                  Available Countries <span className="text-danger">*</span>
                </label>

                <Controller
                  name="availableCountries"
                  control={control}
                  rules={{
                    validate: (arr) => {
                      if (!isEditMode) return true;
                      if (!arr || arr.length === 0)
                        return "Please select at least 1 country";
                      return true;
                    },
                  }}
                  render={({ field }) => {
                    const selectedCountries = (field.value || []).map(
                      (code) => {
                        const c = COUNTRIES.find((x) => x.value === code);
                        return c || { label: code, value: code };
                      }
                    );

                    return (
                      <>
                        <div
                          className={
                            isEditMode && errors.availableCountries
                              ? "is-invalid"
                              : ""
                          }
                        >
                          <MultiSelect
                            options={COUNTRIES}
                            value={selectedCountries}
                            isMulti
                            isSearchable
                            placeholder="- Supported Countries -"
                            noOptionsMessage={() => "No countries found"}
                            isDisabled={!isEditMode}
                            onChange={(selected) => {
                              const codes = (selected || []).map(
                                (opt) => opt.value
                              );
                              field.onChange(codes);
                            }}
                          />
                        </div>

                        {isEditMode && errors.availableCountries && (
                          <div className="invalid-feedback d-block">
                            {errors.availableCountries.message}
                          </div>
                        )}
                      </>
                    );
                  }}
                />
              </div>

              {/* Capture Method */}
              <div className="form-group col-md-3">
                <label>
                  Capture Method <span className="text-danger">*</span>
                </label>

                <select
                  className={`form-control form-control-sm ${
                    errors.capture_method ? "is-invalid" : ""
                  }`}
                  disabled={!isEditMode}
                  {...register("capture_method", {
                    required: isEditMode ? "Capture method is required" : false,
                  })}
                >
                  {captureMethods.map((method) => (
                    <option key={method} value={method.toLowerCase()}>
                      {method}
                    </option>
                  ))}
                </select>

                {isEditMode && errors.capture_method && (
                  <div className="invalid-feedback d-block">
                    {errors.capture_method.message}
                  </div>
                )}
              </div>
            </div>

            {/* Settings */}
            {selectedGateway && settingsKeys.length > 0 && (
              <>
                <br />
                <div className="row">
                  {settingsKeys.map((key) => (
                    <div key={key} className="form-group col-md-3">
                      <label>
                        {formatLabel(key)}{" "}
                        <span className="text-danger">*</span>
                      </label>

                      <input
                        className={`form-control form-control-sm ${
                          errors?.settings?.[key] ? "is-invalid" : ""
                        }`}
                        type="text"
                        disabled={!isEditMode}
                        placeholder={isEditMode ? `Enter ${key}` : ""}
                        {...register(`settings.${key}`, {
                          validate: (v) => {
                            if (!isEditMode) return true;
                            const val = (v || "").trim();
                            if (!val) return `${formatLabel(key)} is required`;
                            return true;
                          },
                        })}
                        onBlur={() => isEditMode && trigger(`settings.${key}`)}
                      />

                      {isEditMode && errors?.settings?.[key] && (
                        <div className="invalid-feedback d-block">
                          {errors.settings[key].message}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            <br />

            {/* Buttons */}
            {isEditMode ? (
              <div className="row mt-4">
                <div className="form-group offset-md-9 col-md-3 d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-dark btn-sm me-2"
                    disabled={isSubmitting || !isValid}
                  >
                    <i className="fa fa-floppy-o me-1" />{" "}
                    {isSubmitting ? "Saving..." : "Save"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() => navigate(`/payment-gateways`)}
                    disabled={isSubmitting}
                  >
                    <i className="fa fa-times me-1" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-end align-items-end mt-4 gap-2">
                <Link
                  to={`/payment-gateways/edit/${uuid}`}
                  className="btn btn-dark"
                  data-toggle="tooltip"
                  title="Edit"
                >
                  <i className="fa fa-edit" /> Edit
                </Link>

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate(`/payment-gateways`)}
                >
                  <i className="fa fa-arrow-left me-1" /> Back
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default MasterPaymentEdit;
