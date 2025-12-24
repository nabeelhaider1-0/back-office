import React, { useEffect, useState } from "react";
import ReactFlatpickr from "react-flatpickr";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod Schema - Dynamic based on profileType
const getSchema = (profileType) =>
  z.object({
    rule_name: z.string().min(1, "Rule Name is required"),
    business_channel: z.string().min(1, "Business Channel is required"),
    product_type: z.string().min(1, "Product Type is required"),
    fare_type: z.string().min(1, "Fare Type is required"),
    distribution_channel: z.string().min(1, "Distribution Channel is required"),
    markup_type: profileType === "markup" ? z.string().min(1, "Markup Type is required") : z.string().optional(),
    discount_type: profileType === "discount" ? z.string().min(1, "Discount Type is required") : z.string().optional(),
    markup_value: profileType === "markup" ? z.coerce.number().min(0, "Markup Value is required") : z.coerce.number().optional(),
    discount_value: profileType === "discount" ? z.coerce.number().min(0, "Discount Value is required") : z.coerce.number().optional(),
    description: z.string().optional(),
    total_discount_consumption: z.coerce.number().optional(),
    max_discount_cap: z.coerce.number().optional(),
    promotion_text: z.string().optional(),
    expiry_date: z.string().optional().nullable(),
    status: z.boolean(),
    strike_through: z.boolean().optional(),
    is_promotion: z.boolean().optional(),
    auto_apply: z.boolean().optional(),
    double_dip: z.boolean().optional(),
    availability_dates: z.object({
      from_date: z.string().optional().nullable(),
      to_date: z.string().optional().nullable(),
    }),
    rules: z
      .array(
        z.object({
          parameterUuid: z.string().min(1, "Parameter is required"),
          value: z.any(), // Will be validated conditionally based on type
        })
      )
      .min(1, "At least one rule is required"),
  });

const ProfileForm = ({
  formData: initialData,
  parameters,
  loadingParameters,
  parametersError,
  loadParameterOptions,
  profileType,
  isEditMode,
  readOnly = false,
  onSubmit: externalSubmit,
}) => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState({});

  const schema = getSchema(profileType);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      rule_name: initialData.rule_name || "",
      business_channel: initialData.business_channel || "",
      product_type: initialData.product_type || "Flights",
      fare_type: initialData.fare_type || "Total Fare",
      distribution_channel: initialData.distribution_channel || "",
      markup_type: initialData.markup_type || "",
      discount_type: initialData.discount_type || "",
      markup_value: initialData.markup_value || "",
      discount_value: initialData.discount_value || "",
      description: initialData.description || "",
      total_discount_consumption: initialData.total_discount_consumption || "",
      max_discount_cap: initialData.max_discount_cap || "",
      promotion_text: initialData.promotion_text || "",
      expiry_date: initialData.expiry_date || null,
      status: initialData.status || false,
      strike_through: initialData.strike_through || false,
      is_promotion: initialData.is_promotion || false,
      auto_apply: initialData.auto_apply || false,
      double_dip: initialData.double_dip || false,
      availability_dates: {
        from_date: initialData.availability_dates?.from_date || null,
        to_date: initialData.availability_dates?.to_date || null,
      },
      rules: initialData.rules?.length > 0 ? initialData.rules : [{ parameterUuid: "", value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rules",
  });

  // Watch profile type for conditional rendering
  const watchedProductType = watch("product_type");
  const watchedType = profileType === "markup" ? watch("markup_type") : watch("discount_type");
  const watchedValue = profileType === "markup" ? watch("markup_value") : watch("discount_value");

  // Reset form when initialData changes (e.g., edit mode)
  useEffect(() => {
    reset({
      rule_name: initialData.rule_name || "",
      business_channel: initialData.business_channel || "",
      product_type: initialData.product_type || "Flights",
      fare_type: initialData.fare_type || "Total Fare",
      distribution_channel: initialData.distribution_channel || "",
      markup_type: initialData.markup_type || "",
      discount_type: initialData.discount_type || "",
      markup_value: initialData.markup_value || "",
      discount_value: initialData.discount_value || "",
      description: initialData.description || "",
      total_discount_consumption: initialData.total_discount_consumption || "",
      max_discount_cap: initialData.max_discount_cap || "",
      promotion_text: initialData.promotion_text || "",
      expiry_date: initialData.expiry_date || null,
      status: initialData.status || false,
      strike_through: initialData.strike_through || false,
      is_promotion: initialData.is_promotion || false,
      auto_apply: initialData.auto_apply || false,
      double_dip: initialData.double_dip || false,
      availability_dates: {
        from_date: initialData.availability_dates?.from_date || null,
        to_date: initialData.availability_dates?.to_date || null,
      },
      rules: initialData.rules?.length > 0 ? initialData.rules : [{ parameterUuid: "", value: "" }],
    });
  }, [initialData, reset]);

  const formatDateToString = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchSuggestions = async (query, ruleIndex) => {
    if (!query || query.length < 3 || readOnly) {
      setSuggestions((prev) => ({ ...prev, [ruleIndex]: [] }));
      return;
    }
    try {
      const response = await fetch(
        `https://master-content.escapra.com/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSuggestions((prev) => ({ ...prev, [ruleIndex]: data.results || [] }));
    } catch (error) {
      toast.error("Failed to fetch suggestions");
    }
  };

  const reactSelectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "31px",
      fontSize: "0.875rem",
      backgroundColor: readOnly ? "#e9ecef" : "#fff",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      display: readOnly ? "none" : "flex",
    }),
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
  };

  const renderValueInput = (ruleIndex) => {
    const parameterUuid = watch(`rules.${ruleIndex}.parameterUuid`);
    const selectedParam = parameters.find((p) => p.uuid === parameterUuid);
    if (!selectedParam) return '';

    const fieldName = `rules.${ruleIndex}.value`;

    switch (selectedParam.type) {
      case "number":
        return (
          <input
            type="number"
            className="form-control p-2"
            {...register(fieldName, { valueAsNumber: true })}
            disabled={readOnly}
          />
        );
      case "date":
        return (
          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
              <ReactFlatpickr
                value={field.value ? new Date(field.value) : null}
                onChange={(dates) => field.onChange(dates[0] ? formatDateToString(dates[0]) : "")}
                options={{ dateFormat: "Y-m-d" }}
                className="form-control p-2"
                disabled={readOnly}
              />
            )}
          />
        );
      case "enum":
        const options = selectedParam.options?.split(",").map((o) => o.trim()) || [];
        return (
          <select className="form-control p-2" {...register(fieldName)} disabled={readOnly}>
            <option value="">Select Option</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      case "multiselect":
        const multiOptions = (selectedParam.options?.split(",").map((o) => o.trim()) || []).map((o) => ({
          value: o,
          label: o,
        }));
        return (
          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
              <Select
                isMulti
                options={multiOptions}
                value={multiOptions.filter((o) => field.value?.includes(o.value))}
                onChange={(selected) => field.onChange(selected ? selected.map((s) => s.value) : [])}
                styles={reactSelectStyles}
                isDisabled={readOnly}
              />
            )}
          />
        );
      case "daterange":
        return (
          <div className="d-flex align-items-center">
            <Controller
              name={`${fieldName}.from_date`}
              control={control}
              render={({ field }) => (
                <ReactFlatpickr
                  value={field.value ? new Date(field.value) : null}
                  onChange={(d) => field.onChange(d[0] ? formatDateToString(d[0]) : "")}
                  options={{ dateFormat: "Y-m-d" }}
                  className="form-control p-2 mr-2"
                  disabled={readOnly}
                />
              )}
            />
            <span className="mx-2">-</span>
            <Controller
              name={`${fieldName}.to_date`}
              control={control}
              render={({ field }) => (
                <ReactFlatpickr
                  value={field.value ? new Date(field.value) : null}
                  onChange={(d) => field.onChange(d[0] ? formatDateToString(d[0]) : "")}
                  options={{ dateFormat: "Y-m-d" }}
                  className="form-control p-2"
                  disabled={readOnly}
                />
              )}
            />
          </div>
        );
      case "range":
      case "valuerange":
        return (
          <div className="d-flex align-items-center">
            <input
              type="number"
              className="form-control p-2 mr-2"
              placeholder="From"
              {...register(`${fieldName}.from`, { valueAsNumber: true })}
              disabled={readOnly}
            />
            <span className="mx-2">-</span>
            <input
              type="number"
              className="form-control p-2"
              placeholder="To"
              {...register(`${fieldName}.to`, { valueAsNumber: true })}
              disabled={readOnly}
            />
          </div>
        );
      case "autocomplete":
        return (
          <div className="autocomplete-container">
            <input
              type="text"
              className="form-control p-2"
              {...register(fieldName)}
              onChange={(e) => {
                register(fieldName).onChange(e);
                fetchSuggestions(e.target.value, ruleIndex);
              }}
              onFocus={(e) => fetchSuggestions(e.target.value, ruleIndex)}
              disabled={readOnly}
            />
            {!readOnly && suggestions[ruleIndex]?.length > 0 && (
              <ul className="suggestions-list">
                {suggestions[ruleIndex].map((item, idx) => {
                  const icon = item.type === "airport" ? "✈️" : item.type === "hotel" ? "🏨" : "📍";
                  return (
                    <li
                      key={idx}
                      onMouseDown={() => {
                        setValue(fieldName, item.name_full);
                        setSuggestions((prev) => ({ ...prev, [ruleIndex]: [] }));
                      }}
                    >
                      <span className="suggestion-icon">{icon}</span>
                      {item.name_full}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      default:
        return <input type="text" className="form-control p-2" {...register(fieldName)} disabled={readOnly} />;
    }
  };

  const onSubmit = (data) => {
    if (readOnly) return;
    externalSubmit(data);
  };

  return (
    <div className="container-fluid pt-0 p-4" id="content-pad">
      <style>{`
        .autocomplete-container { position: relative; }
        .suggestions-list {
          position: absolute; width: 100%; background: white; border: 1px solid #ced4da;
          border-radius: 4px; max-height: 200px; overflow-y: auto; z-index: 9999; margin: 0; padding: 0;
        }
        .suggestions-list li { padding: 8px 12px; cursor: pointer; display: flex; align-items: center; }
        .suggestions-list li:hover { background: #f8f9fa; }
        .suggestion-icon { margin-right: 8px; }
      `}</style>

      {loadingParameters && <p>Loading parameters...</p>}
      {parametersError && <p className="text-danger">{parametersError}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Main Fields */}
        <div className="form-group row mt-2">
          <div className="form-group col-md-3">
            <label>Rule Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" {...register("rule_name")} disabled={readOnly} />
            {errors.rule_name && <span className="text-danger small">{errors.rule_name.message}</span>}
          </div>
          <div className="form-group col-md-3">
            <label>Business Channel <span className="text-danger">*</span></label>
            <select className="form-control" {...register("business_channel")} disabled={readOnly}>
              <option value="B2C">B2C</option>
              <option value="B2B">B2B</option>
              <option value="Both">Both</option>
            </select>
            {errors.business_channel && <span className="text-danger small">{errors.business_channel.message}</span>}
          </div>
          <div className="form-group col-md-3">
            <label>Product Type <span className="text-danger">*</span></label>
            <select className="form-control" {...register("product_type")} disabled={readOnly}>
              <option value="Flights">Flights</option>
              <option value="Hotel">Hotel</option>
              <option value="Umrah">Umrah</option>
            </select>
          </div>
          <div className="form-group col-md-3">
            <label>Fare Type <span className="text-danger">*</span></label>
            <select className="form-control" {...register("fare_type")} disabled={readOnly}>
              <option value="Base Fare">Base Fare</option>
              <option value="Taxes">Taxes</option>
              <option value="Total Fare">Total Fare</option>
            </select>
          </div>
        </div>

               <div className="form-group row mt-2">
          <div className="form-group col-md-3">
            <label>Distribution Channel <span className="text-danger">*</span></label>
            <select className="form-control" {...register("distribution_channel")} disabled={readOnly}>
              <option value="website">Website</option>
              <option value="mobile_app">Mobile App</option>
              <option value="android_app">Android App</option>
              <option value="ios_app">iOS App</option>
              <option value="all">All</option>
            </select>
            {errors.distribution_channel && (
              <span className="text-danger small">{errors.distribution_channel.message}</span>
            )}
          </div>

          <div className="form-group col-md-3">
            <label>
              {profileType === "markup" ? "Markup Type" : "Discount Type"}{" "}
              <span className="text-danger">*</span>
            </label>
            <select
              className="form-control"
              {...register(profileType === "markup" ? "markup_type" : "discount_type")}
              disabled={readOnly}
            >
              <option value="">Select Type</option>
              <option value="percentage">Percentage</option>
              <option value="value">Value</option>
            </select>
            {errors[profileType === "markup" ? "markup_type" : "discount_type"] && (
              <span className="text-danger small">
                {errors[profileType === "markup" ? "markup_type" : "discount_type"]?.message}
              </span>
            )}
          </div>

          <div className="form-group col-md-3">
            <label>
              {profileType === "markup" ? "Markup Value" : "Discount Value"}{" "}
              <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              {...register(profileType === "markup" ? "markup_value" : "discount_value", {
                valueAsNumber: true,
              })}
              disabled={readOnly}
            />
            {errors[profileType === "markup" ? "markup_value" : "discount_value"] && (
              <span className="text-danger small">
                {errors[profileType === "markup" ? "markup_value" : "discount_value"]?.message ||
                  "Value is required and must be a number"}
              </span>
            )}
          </div>

          <div className="form-group col-md-3">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              {...register("description")}
              disabled={readOnly}
            />
          </div>
        </div>

        {/* Conditional Discount Fields */}
        <div className="form-group row mt-2">
          {profileType === "discount" && (
            <>
              <div className="form-group col-md-3">
                <label>Total Discount Consumption</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  {...register("total_discount_consumption", { valueAsNumber: true })}
                  disabled={readOnly}
                />
              </div>

              <div className="form-group col-md-3">
                <label>Max Discount Cap</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  {...register("max_discount_cap", { valueAsNumber: true })}
                  disabled={readOnly}
                />
              </div>

              <div className="form-group col-md-3">
                <label>Promotion Text</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("promotion_text")}
                  disabled={readOnly}
                />
              </div>
            </>
          )}

          <div className="form-group col-md-3">
            <label>Expiry Date</label>
            <Controller
              name="expiry_date"
              control={control}
              render={({ field }) => (
                <ReactFlatpickr
                  value={field.value ? new Date(field.value) : null}
                  onChange={(dates) =>
                    field.onChange(dates[0] ? formatDateToString(dates[0]) : null)
                  }
                  options={{ dateFormat: "Y-m-d" }}
                  className="form-control"
                  disabled={readOnly}
                />
              )}
            />
          </div>
        </div>

        {/* Status & Checkboxes */}
        <div className="form-group row mt-2">
          <div className="form-group col-md-3">
            <label>Status</label>
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                className="me-2"
                {...register("status")}
                disabled={readOnly}
                id="statusCheckbox"
                style={{ accentColor: "var(--color-secondary)" }}
              />
              <label className="form-check-label" htmlFor="statusCheckbox">
                Active
              </label>
            </div>
          </div>

          {profileType === "discount" && (
            <>
              <div className="form-group col-md-3">
                <label>Strike Through</label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    {...register("strike_through")}
                    disabled={readOnly}
                    id="strikeThroughCheckbox"
                  />
                  <label className="form-check-label" htmlFor="strikeThroughCheckbox">
                    Enabled
                  </label>
                </div>
              </div>

              <div className="form-group col-md-3">
                <label>Is Promotion</label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    {...register("is_promotion")}
                    disabled={readOnly}
                    id="isPromotionCheckbox"
                  />
                  <label className="form-check-label" htmlFor="isPromotionCheckbox">
                    Enabled
                  </label>
                </div>
              </div>

              <div className="form-group col-md-3">
                <label>Auto Apply</label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    {...register("auto_apply")}
                    disabled={readOnly}
                    id="autoApplyCheckbox"
                  />
                  <label className="form-check-label" htmlFor="autoApplyCheckbox">
                    Enabled
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        {profileType === "discount" && (
          <div className="form-group row mt-2">
            <div className="form-group col-md-3">
              <label>Double Dip</label>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  {...register("double_dip")}
                  disabled={readOnly}
                  id="doubleDipCheckbox"
                />
                <label className="form-check-label" htmlFor="doubleDipCheckbox">
                  Enabled
                </label>
              </div>
            </div>
          </div>
        )}

        <hr />
        <h5>Availability Dates</h5>
        <div className="d-flex row align-items-center mb-2">
          <div className="col-md-3">
            <label>From Date</label>
            <Controller
              name="availability_dates.from_date"
              control={control}
              render={({ field }) => (
                <ReactFlatpickr
                  value={field.value ? new Date(field.value) : null}
                  onChange={(dates) =>
                    field.onChange(dates[0] ? formatDateToString(dates[0]) : null)
                  }
                  options={{ dateFormat: "Y-m-d" }}
                  className="form-control"
                  disabled={readOnly}
                />
              )}
            />
          </div>
          <div className="col-md-1 d-flex align-items-center justify-content-center">
            <span className="mx-2 fs-2">-</span>
          </div>
          <div className="col-md-3">
            <label>To Date</label>
            <Controller
              name="availability_dates.to_date"
              control={control}
              render={({ field }) => (
                <ReactFlatpickr
                  value={field.value ? new Date(field.value) : null}
                  onChange={(dates) =>
                    field.onChange(dates[0] ? formatDateToString(dates[0]) : null)
                  }
                  options={{ dateFormat: "Y-m-d" }}
                  className="form-control"
                  disabled={readOnly}
                />
              )}
            />
          </div>
        </div>

        {/* Rules Section */}
        <hr />
        <h5>Rules</h5>
        {errors.rules && <div className="text-danger small mb-2">{errors.rules.message}</div>}

        {fields.map((field, index) => (
          <div key={field.id} className="border p-3 mb-3">
            <div className="row">
              <div className="col-md-3">
                <label>Parameter</label>
                <Controller
                  name={`rules.${index}.parameterUuid`}
                  control={control}
                  render={({ field }) => (
                    <AsyncSelect
                      cacheOptions
                      defaultOptions={parameters.map((p) => ({ value: p.uuid, label: p.name }))}
                      value={parameters.find((p) => p.uuid === field.value) ? { value: field.value, label: parameters.find((p) => p.uuid === field.value)?.name } : null}
                      loadOptions={loadParameterOptions}
                      onChange={(opt) => field.onChange(opt?.value || "")}
                      styles={reactSelectStyles}
                      isDisabled={readOnly}
                      isClearable={!readOnly}
                    />
                  )}
                />
                {errors.rules?.[index]?.parameterUuid && (
                  <span className="text-danger small">{errors.rules[index].parameterUuid.message}</span>
                )}
              </div>
              <div className="col-md-7">
                <label>Value</label>
                {renderValueInput(index)}
              </div>
              {!readOnly && fields.length > 1 && (
                <div className="col-md-2 d-flex align-items-end">
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => remove(index)}>
                    Remove Rule
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {!readOnly && (
          <button type="button" className="btn btn-dark btn-sm mb-3" onClick={() => append({ parameterUuid: "", value: "" })}>
            Add More Rule
          </button>
        )}

        {/* Submit Buttons */}
        {!readOnly && (
          <div className="row mt-4">
            <div className="col-md-3 offset-md-9 d-flex justify-content-end gap-2">
              <button type="submit" className="btn btn-dark btn-sm" disabled={!isValid}>
                <i className="fa fa-floppy-o me-1" /> Save
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => navigate(`/${profileType}-profiles`)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {readOnly && (
          <div className="d-flex justify-content-end mt-4 gap-2">
            <Link to={`/${profileType}-profiles/edit-profile/${initialData.id}`} className="btn btn-dark">
              <i className="fa fa-edit" /> Edit Profile
            </Link>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(`/${profileType}-profiles`)}>
              Back
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;