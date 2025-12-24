// import { useNavigate } from "react-router-dom";
// import Constants from "../../../constants/routes";
// import Header2 from "../../header2/header2";
// import { useState } from "react";
// import { createPaymentGateway } from "../../../Apis/PaymentService";
// import {
//   ErrorApiAlert,
//   SuccessApiToast,
// } from "../../../constants/globalfunctions";
// import COUNTRIES from "../../../constants/countries";
// import MultiSelect from "../../reactMultiSelect";

// const MasterPaymentNew = () => {
//   const navigate = useNavigate();
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

//   const handleCountriesChange = (selected) => {
//     // Store only the country codes (values) in formData.availableCountries
//     const countryCodes = selected.map((option) => option.value);
//     setFormData((prevState) => ({
//       ...prevState,
//       availableCountries: countryCodes,
//     }));
//   };

//   const handleInputChange = (e) => {
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
//     const { name, value } = e.target;
//     handleInputChange(e);
//     setSelectedGateway(value);
//     setFormData((prevState) => ({
//       ...prevState,
//       settings: {},
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // availableCountries is already an array of country codes
//       const payload = { ...formData };
//       const response = await createPaymentGateway(payload);
//       if (response.data.statusCode === 201) {
//         SuccessApiToast("Payment Gateway Added Successfully");
//         navigate(Constants.URLConstants.MASTERSPAYMENTSEARCH);
//       }
//     } catch (error) {
//       ErrorApiAlert(
//         error?.response?.data?.message || "Error Adding Payment Gateway"
//       );
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

//   return (
//     <>
//       <Header2
//         title="GATEWAY DETAILS"
//         linkText1="List Payment Gateways"
//         linkText2="Add Payment Gateways"
//         link1={Constants.URLConstants.MASTERSPAYMENTSEARCH}
//       />
//       <div className="container-fluid pt-0 p-4" id="content-pad">
//         <form onSubmit={handleSubmit} id="paymentgatewayaddnew">
//           <input type="hidden" name="action" defaultValue="add" />
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
//                 >
//                   <option value="">Select a gateway</option>
//                   <option value="Revolut">Revolut</option>
//                   <option value="Bank Alfalah">Bank Alfalah</option>
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
//                         placeholder={`Enter ${key}`}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//             <br />

//             <div className="row mt-4">
//               <div className="form-group offset-md-9 col-md-3 d-flex justify-content-end">
//                 <button
//                   type="submit"
//                   className="btn btn-dark btn-sm me-2"
//                   onClick={handleSubmit}
//                 >
//                   <i className="fa fa-floppy-o me-1" /> Save
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-outline-secondary btn-sm me-2"
//                   onClick={() => navigate(`/payment-gateways`)}
//                 >
//                   <i className="fa fa-times me-1" /> Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default MasterPaymentNew;
import { useNavigate } from "react-router-dom";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { createPaymentGateway } from "../../../Apis/PaymentService";
import {
  ErrorApiAlert,
  SuccessApiToast,
} from "../../../constants/globalfunctions";
import COUNTRIES from "../../../constants/countries";
import MultiSelect from "../../reactMultiSelect";

const MasterPaymentNew = () => {
  const navigate = useNavigate();
  const [selectedGateway, setSelectedGateway] = useState("");

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

  // IMPORTANT: your dropdown values are "Revolut" and "Bank Alfalah"
  const getSettingsKeys = (gatewayName) => {
    if (gatewayName === "Revolut") return revolutSettingsKeys;
    if (gatewayName === "Bank Alfalah") return alfalahSettingsKeys;
    return [];
  };

  const captureMethods = ["Automatic", "Manual", "None"];

  const formatLabel = (key) =>
    key.charAt(0).toUpperCase() +
    key
      .slice(1)
      .replace(/([A-Z])/g, " $1")
      .trim();

  const settingsKeys = useMemo(
    () => getSettingsKeys(selectedGateway),
    [selectedGateway]
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      paymentGatewayName: "",
      paymentGatewayURL: "",
      code: "",
      markup: "",
      availableCountries: [], // array of country codes ["PK","US"]
      capture_method: "none",
      status: "yes",
      settings: {}, // dynamic
    },
  });

  const hasError = (name) => !!errors?.[name];
  const getError = (name) => errors?.[name]?.message || "";

  // keep selectedGateway in sync with form
  const paymentGatewayName = watch("paymentGatewayName");
  useEffect(() => {
    setSelectedGateway(paymentGatewayName || "");
    // when gateway changes, reset settings + revalidate
    setValue("settings", {});
    clearErrors("settings");
    // trigger validation so required settings show instantly (optional)
    // trigger();
  }, [paymentGatewayName, setValue, clearErrors]);

  const onSubmit = async (data) => {
    try {
      // Ensure only required settings go out (optional cleanup)
      const payload = {
        ...data,
        markup: String(data.markup).trim(),
        paymentGatewayURL: data.paymentGatewayURL.trim(),
        code: data.code.trim(),
      };

      const response = await createPaymentGateway(payload);

      if (response?.data?.statusCode === 201) {
        SuccessApiToast("Payment Gateway Added Successfully");
        navigate(Constants.URLConstants.MASTERSPAYMENTSEARCH);
      } else {
        ErrorApiAlert(
          response?.data?.message || "Error Adding Payment Gateway"
        );
      }
    } catch (error) {
      // API/Server error only (validation is inline now)
      ErrorApiAlert(
        error?.response?.data?.message || "Error Adding Payment Gateway"
      );
    }
  };

  return (
    <>
      <Header2
        title="GATEWAY DETAILS"
        linkText1="List Payment Gateways"
        linkText2="Add Payment Gateways"
        link1={Constants.URLConstants.MASTERSPAYMENTSEARCH}
      />

      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit(onSubmit)} id="paymentgatewayaddnew">
          <div className="panel-body">
            <div className="row">
              {/* Payment Gateway Name */}
              <div className="form-group col-md-3">
                <label>
                  Payment Gateway Name <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-control form-control-sm ${
                    errors.paymentGatewayName ? "is-invalid" : ""
                  }`}
                  {...register("paymentGatewayName", {
                    required: "Payment gateway name is required",
                  })}
                >
                  <option value="">Select a gateway</option>
                  <option value="Revolut">Revolut</option>
                  <option value="Bank Alfalah">Bank Alfalah</option>
                </select>
                {errors.paymentGatewayName && (
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
                  {...register("paymentGatewayURL", {
                    required: "Payment gateway URL is required",
                    validate: (v) => {
                      const val = (v || "").trim();
                      if (!val) return "Payment gateway URL is required";
                      // simple URL check (you can tighten later)
                      if (!/^https?:\/\/.+/i.test(val))
                        return "URL must start with http:// or https://";
                      return true;
                    },
                  })}
                />
                {errors.paymentGatewayURL && (
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
                  {...register("code", {
                    required: "Code is required",
                    validate: (v) => {
                      const val = (v || "").trim();
                      if (!val) return "Code is required";
                      if (val.length < 2)
                        return "Code must be at least 2 characters";
                      return true;
                    },
                  })}
                />
                {errors.code && (
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
                  {...register("markup", {
                    required: "Markup is required",
                    validate: (v) => {
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
                {errors.markup && (
                  <div className="invalid-feedback d-block">
                    {errors.markup.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row mt-2">
              {/* Countries (MultiSelect) */}
              <div className="form-group col-md-3">
                <label>
                  Available Countries <span className="text-danger">*</span>
                </label>

                <Controller
                  name="availableCountries"
                  control={control}
                  rules={{
                    validate: (arr) => {
                      if (!arr || arr.length === 0)
                        return "Please select at least 1 country";
                      return true;
                    },
                  }}
                  render={({ field }) => {
                    const selectedCountries = (field.value || []).map(
                      (code) => {
                        const found = COUNTRIES.find((c) => c.value === code);
                        return found || { label: code, value: code };
                      }
                    );

                    return (
                      <>
                        <div
                          className={
                            errors.availableCountries ? "is-invalid" : ""
                          }
                        >
                          <MultiSelect
                            options={COUNTRIES}
                            value={selectedCountries}
                            isMulti
                            isSearchable
                            placeholder="- Supported Countries -"
                            noOptionsMessage={() => "No countries found"}
                            onChange={(selected) => {
                              const codes = (selected || []).map(
                                (opt) => opt.value
                              );
                              field.onChange(codes);
                            }}
                          />
                        </div>

                        {errors.availableCountries && (
                          <div className="invalid-feedback d-block">
                            {errors.availableCountries.message}
                          </div>
                        )}
                      </>
                    );
                  }}
                />
              </div>

              {/* Capture method */}
              <div className="form-group col-md-3">
                <label>
                  Capture Method <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-control form-control-sm ${
                    errors.capture_method ? "is-invalid" : ""
                  }`}
                  {...register("capture_method", {
                    required: "Capture method is required",
                  })}
                >
                  {captureMethods.map((method) => (
                    <option key={method} value={method.toLowerCase()}>
                      {method}
                    </option>
                  ))}
                </select>
                {errors.capture_method && (
                  <div className="invalid-feedback d-block">
                    {errors.capture_method.message}
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Settings */}
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
                        placeholder={`Enter ${key}`}
                        {...register(`settings.${key}`, {
                          validate: (v) => {
                            // required only when gateway selected and this key is expected
                            const val = (v || "").trim();
                            if (!val) return `${formatLabel(key)} is required`;
                            return true;
                          },
                        })}
                        onBlur={() => trigger(`settings.${key}`)}
                      />

                      {errors?.settings?.[key] && (
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
          </div>
        </form>
      </div>
    </>
  );
};

export default MasterPaymentNew;
