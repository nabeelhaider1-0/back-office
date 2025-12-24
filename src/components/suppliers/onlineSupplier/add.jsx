/* eslint-disable react-hooks/exhaustive-deps */
import Header2 from "../../header2/header2";
import { useEffect, useState } from "react";
import excelfilereader from "../../../constants/excelfilereader";
import excelFileContentt from "../../../ExcelFiles/worldcities.xlsx";
import {
  ErrorApiAlert,
  SuccessApiToast,
} from "../../../constants/globalfunctions";
import { insertSupplier } from "../../../Apis/API";
import { useNavigate } from "react-router-dom";
import { fetchActiveCurrencies } from "../../exchangeRates/CurrencyService";
import Select from "react-select";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod Schema
const supplierSchema = z.object({
  supplierName: z.string().min(1, "Supplier Name is required"),
  productType: z.string().min(1, "Product Type is required"),
  environment: z.string().min(1, "Environment is required"),
  supplierCountry: z.string().min(1, "Supplier Country is required"),
  supplierCurrency: z.string().min(1, "Currency is required"),
  supplierConfig: z
    .array(
      z.object({
        key: z.string(),
        value: z.string(),
      })
    )
    .min(1, "At least one configuration key-value pair is required")
    .refine(
      (configs) =>
        configs.some((config) => config.key.trim() && config.value.trim()),
      {
        message: "At least one key-value pair must have both key and value filled",
      }
    ),
});

const SuppliersDetails = ({ onSuccess, editingSupplier, onUpdate }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(supplierSchema),
    mode: "onChange", // realtime validation
    defaultValues: {
      supplierName: "",
      supplierCountry: "",
      supplierCurrency: "",
      productType: "",
      environment: "",
      supplierConfig: [{ key: "", value: "" }], // start with one empty row
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "supplierConfig",
  });

  // Load country & currency options
  const [countryOptions, setCountryOptions] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const ENVIRONMENT_OPTIONS = ["pre-production", "Production"];
  const PRODUCT_TYPE_OPTIONS = ["Flight", "Hotel"];

  // Fetch countries from Excel
  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const data = await excelfilereader(excelFileContentt);
        const uniqueCountries = Array.from(
          new Set(data.CountryCities.map((item) => item.country))
        ).map((country) => ({
          value: data.CountryCities.find((item) => item.country === country).iso3,
          label: country,
        }));
        setCountryOptions(uniqueCountries);
      } catch (error) {
        console.error("Error loading countries", error);
      }
    };
    fetchExcelData();
  }, []);

  // Fetch active currencies
  useEffect(() => {
    const loadCurrencies = async () => {
      const result = await fetchActiveCurrencies();
      if (result.success) {
        setCurrencies(result.data);
      }
    };
    loadCurrencies();
  }, []);

  // Prefill form on edit
  useEffect(() => {
    if (editingSupplier) {
      const configArray = editingSupplier.supplierConfig
        ? Object.entries(editingSupplier.supplierConfig).map(([key, value]) => ({
            key,
            value: value || "",
          }))
        : [{ key: "", value: "" }];

      reset({
        supplierName: editingSupplier.supplierName || "",
        supplierCountry: editingSupplier.supplierCountry || "",
        supplierCurrency: editingSupplier.supplierCurrency || "",
        productType: editingSupplier.productType || "",
        environment: editingSupplier.environment || "",
        supplierConfig: configArray.length > 0 ? configArray : [{ key: "", value: "" }],
      });
    }
  }, [editingSupplier, reset]);

  const onSubmit = async (data) => {
    const configObj = {};
    data.supplierConfig.forEach((item) => {
      if (item.key.trim()) {
        configObj[item.key.trim()] = item.value;
      }
    });

    const payload = {
      supplierName: data.supplierName,
      supplierCountry: data.supplierCountry,
      supplierCurrency: data.supplierCurrency,
      productType: data.productType,
      environment: data.environment,
      supplierConfig: configObj,
    };

    try {
      if (editingSupplier) {
        await onUpdate(editingSupplier.uiid, payload);
      } else {
        const token = localStorage.getItem("token");
        await insertSupplier(payload, token);
      }

      if (onSuccess) onSuccess();

      // Reset form after success (except when editing, optional)
      reset({
        supplierName: "",
        supplierCountry: "",
        supplierCurrency: "",
        productType: "",
        environment: "",
        supplierConfig: [{ key: "", value: "" }],
      });
    } catch (error) {
      ErrorApiAlert("Error saving supplier");
    }
  };

  return (
    <>
      <Header2
        title={editingSupplier ? "EDIT SUPPLIER" : "SUPPLIER DETAILS"}
        linkText1={editingSupplier ? "Update Supplier" : "Add Supplier"}
      />
      <div className="px-4" id="content-pad">
        <form onSubmit={handleSubmit(onSubmit)} id="supplierForm">
          <div className="row">
            <div className="form-group col-md-6">
              <label>Supplier Name</label>
              <input
                type="text"
                className="form-control"
                {...register("supplierName")}
              />
              {errors.supplierName && (
                <span className="text-danger small">
                  {errors.supplierName.message}
                </span>
              )}
            </div>

            <div className="form-group col-md-6">
              <label>Product Type</label>
              <select
                className="form-control"
                {...register("productType")}
              >
                <option value="">Select Product Type</option>
                {PRODUCT_TYPE_OPTIONS.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.productType && (
                <span className="text-danger small">
                  {errors.productType.message}
                </span>
              )}
            </div>
          </div>

          <div className="row">
            <div className="form-group mt-2 col-md-6">
              <label>Environment</label>
              <select
                className="form-control"
                {...register("environment")}
              >
                <option value="">Select Environment</option>
                {ENVIRONMENT_OPTIONS.map((env, idx) => (
                  <option key={idx} value={env}>
                    {env}
                  </option>
                ))}
              </select>
              {errors.environment && (
                <span className="text-danger small">
                  {errors.environment.message}
                </span>
              )}
            </div>

            <div className="form-group mt-2 col-md-6">
              <label>Supplier Country</label>
              <Controller
                name="supplierCountry"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={countryOptions}
                    onChange={(option) => field.onChange(option?.label || "")}
                    value={countryOptions.find((opt) => opt.label === field.value)}
                    placeholder="Search or select a country..."
                    isClearable
                  />
                )}
              />
              {errors.supplierCountry && (
                <span className="text-danger small">
                  {errors.supplierCountry.message}
                </span>
              )}
            </div>
          </div>

          <div className="row">
            <div className="form-group mt-2 col-md-6">
              <label>Currency</label>
              <select
                className="form-control"
                {...register("supplierCurrency")}
              >
                <option value="">Select Currency</option>
                {currencies.map((currency, idx) => (
                  <option key={idx} value={currency.currency_code}>
                    {currency.currency_code} - {currency.currency}
                  </option>
                ))}
              </select>
              {errors.supplierCurrency && (
                <span className="text-danger small">
                  {errors.supplierCurrency.message}
                </span>
              )}
            </div>
          </div>

          {/* Supplier Config */}
          <div className="mt-4">
            <h5>Supplier Configuration</h5>
            {errors.supplierConfig && (
              <div className="text-danger small mb-2">
                {errors.supplierConfig.message}
              </div>
            )}

            {fields.map((field, index) => (
              <div className="row align-items-center mb-2" key={field.id}>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Key"
                    {...register(`supplierConfig.${index}.key`)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Value"
                    {...register(`supplierConfig.${index}.value`)}
                  />
                </div>
                <div className="col-md-2 text-end">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-outline-secondary btn-sm mt-2"
              onClick={() => append({ key: "", value: "" })}
            >
              + Add Key Pair
            </button>
          </div>

          <div className="row mt-4">
            <div className="col-md-12 form-group">
              <button
                type="submit"
                className="btn btn-dark btn-sm"
                disabled={!isValid} // Disabled until fully valid
              >
                <i className="fa fa-floppy-o"></i>&nbsp;
                {editingSupplier ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SuppliersDetails;