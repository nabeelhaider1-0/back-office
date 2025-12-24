import React, { useEffect, useMemo, useRef, useState } from "react";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import LookupSelectWithManage from "../lookups/LookupSelectWithManage";
import {
  listHotels,
  listContracts,
  listAllContracts,
  getContract,
} from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";

const defaultPromotion = {
  hotelId: "",
  contractId: "",
  type: "",
  promo_code: "",
  description: "",
  discount_type: "",
  discount_value: "",
  params: "{}",
  start_date: "",
  end_date: "",
  combinability: "",
};

export default function HotelExtranetPromotionForm({
  mode = "create",
  initialValue,
  onSubmit,
  submitting = false,
  wizardConfig = null,
  baseDefaults = null,
}) {
  const computedDefaults = useMemo(() => {
    if (baseDefaults && typeof baseDefaults === "object") {
      return { ...defaultPromotion, ...baseDefaults };
    }
    return defaultPromotion;
  }, [baseDefaults]);
  const [form, setForm] = useState(() => {
    try {
      return initialValue || computedDefaults;
    } catch (e) {
      console.error("Form - Error initializing form state:", e);
      return computedDefaults;
    }
  });
  const [hotelOptions, setHotelOptions] = useState([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const [contractOptions, setContractOptions] = useState([]);
  const [isLoadingContracts, setIsLoadingContracts] = useState(false);
  const [errors, setErrors] = useState({});
  const fieldRefs = useRef({
    hotelId: null,
    contractId: null,
    type: null,
    discount_type: null,
    discount_value: null,
    start_date: null,
    end_date: null,
  });
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const [paramsError, setParamsError] = useState("");
  const [submitIntent, setSubmitIntent] = useState("save");
  const submitIntentRef = useRef("save");
  const updateSubmitIntent = (intent) => {
    submitIntentRef.current = intent;
    setSubmitIntent(intent);
  };
  const isWizard = Boolean(wizardConfig?.isActive);
  const continueLabel = wizardConfig?.continueLabel || "Save & Continue";

  // Normalize and set form data from initialValue
  useEffect(() => {
    if (!initialValue) {
      if (mode === "create") {
        setForm(computedDefaults);
      }
      return;
    }

    console.log("Form - initialValue received:", initialValue);
    const api = initialValue;
    const contractId = api.contract_id || api.contractId || "";

    // If we have contractId but no hotelId, fetch contract to get hotelId
    const loadWithContract = async () => {
      let hotelId = api.hotel_id || api.hotelId || "";

      if (contractId && !hotelId && (isEdit || isView)) {
        try {
          console.log("Form - Fetching contract to get hotelId:", contractId);
          const contractRes = await getContract(contractId);
          const contract = contractRes?.data || contractRes;
          console.log("Form - Contract data:", contract);
          if (contract?.hotelId || contract?.hotel_id) {
            hotelId = contract.hotelId || contract.hotel_id;
            console.log("Form - Got hotelId from contract:", hotelId);
          }
        } catch (e) {
          console.warn("Form - Could not fetch contract to get hotelId:", e);
        }
      }

      const next = {
        hotelId: hotelId,
        contractId: contractId,
        type: api.type || "",
        promo_code: api.promo_code || api.promoCode || "",
        description: api.description || "",
        discount_type: api.discount_type || api.discountType || "",
        discount_value: api.discount_value ?? api.discountValue ?? "",
        params: api.params
          ? typeof api.params === "string"
            ? api.params
            : JSON.stringify(api.params)
          : "{}",
        start_date: api.start_date || api.startDate || "",
        end_date: api.end_date || api.endDate || "",
        combinability: api.combinability || "",
      };
      console.log("Form - normalized data:", next);
      setForm(next);
    };

    loadWithContract();
  }, [initialValue, mode, isEdit, isView]);

  useEffect(() => {
    async function fetchHotels() {
      setIsLoadingHotels(true);
      try {
        const resp = await listHotels({ page: 1, size: 100 });
        const arr = Array.isArray(resp?.items)
          ? resp.items
          : Array.isArray(resp?.data)
          ? resp.data
          : Array.isArray(resp)
          ? resp
          : [];
        setHotelOptions(
          arr.map((h) => ({
            value: h.id || h._id || h.hotelId,
            label: h.display_name || h.displayName || h.name,
          }))
        );
      } finally {
        setIsLoadingHotels(false);
      }
    }
    fetchHotels();
  }, []);

  // Load contracts - use all contracts in edit/view mode, hotel-specific in create mode
  useEffect(() => {
    const loadContracts = async () => {
      // In edit/view mode, load all contracts immediately
      if (isEdit || isView) {
        try {
          setIsLoadingContracts(true);
          console.log(
            "Form - Loading all contracts for edit/view mode, current contractId:",
            form.contractId
          );
          const resp = await listAllContracts({ page: 1, size: 100 });
          const items = Array.isArray(resp?.data?.items)
            ? resp.data.items
            : Array.isArray(resp?.data?.data)
            ? resp.data.data
            : Array.isArray(resp?.data)
            ? resp.data
            : [];
          const options = items.map((c) => ({
            value: c.id || c.contractId,
            label: c.name || c.contractCode || c.contract_code || c.id,
          }));
          console.log(
            "Form - All contracts loaded:",
            options.length,
            "contracts"
          );
          console.log(
            "Form - Looking for contractId:",
            form.contractId,
            "in options:",
            options.find((o) => o.value === form.contractId)
          );
          setContractOptions(options);
        } catch (e) {
          console.error("Form - Error loading all contracts:", e);
          setContractOptions([]);
        } finally {
          setIsLoadingContracts(false);
        }
        return;
      }

      // In create mode, load contracts for selected hotel
      if (!form.hotelId) {
        setContractOptions([]);
        return;
      }
      try {
        setIsLoadingContracts(true);
        console.log("Form - Loading contracts for hotelId:", form.hotelId);
        const resp = await listContracts(form.hotelId, { page: 1, size: 100 });
        const arr = Array.isArray(resp?.items)
          ? resp.items
          : Array.isArray(resp?.data)
          ? resp.data
          : Array.isArray(resp)
          ? resp
          : [];
        const options = arr.map((c) => ({
          value: c.id || c.contractId,
          label: c.name,
        }));
        console.log("Form - Contracts loaded:", options);
        setContractOptions(options);
      } catch (e) {
        console.error("Form - Error loading contracts:", e);
        setContractOptions([]);
      } finally {
        setIsLoadingContracts(false);
      }
    };
    loadContracts();
  }, [form.hotelId, isEdit, isView, form.contractId]);

  // Debug: Log when contractId or contractOptions change
  useEffect(() => {
    if (form.contractId && contractOptions.length > 0) {
      const found = contractOptions.find((o) => o.value === form.contractId);
      console.log(
        "Form - Contract selection check - contractId:",
        form.contractId,
        "found in options:",
        found
      );
    }
  }, [form.contractId, contractOptions]);

  const setField = (name, value) => {
    if (isView) return;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const assignRef = (key) => (node) => {
    if (!fieldRefs.current) fieldRefs.current = {};
    fieldRefs.current[key] = node;
  };

  const focusField = (key) => {
    const node = fieldRefs.current?.[key];
    if (!node) return;
    if (typeof node.focus === "function") {
      node.focus();
      return;
    }
    const input = node.querySelector?.("input,textarea,select");
    if (input && typeof input.focus === "function") {
      input.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) return;
    const intent = submitIntentRef.current || "save";
    updateSubmitIntent("save");
    const validationErrors = {};
    if (!form.hotelId || !String(form.hotelId).trim())
      validationErrors.hotelId = "Hotel is required";
    if (!form.type || !String(form.type).trim())
      validationErrors.type = "Promotion type is required";
    if (!form.discount_type || !String(form.discount_type).trim())
      validationErrors.discount_type = "Discount type is required";
    if (
      form.discount_value === "" ||
      form.discount_value === null ||
      isNaN(Number(form.discount_value))
    ) {
      validationErrors.discount_value = "Discount value is required";
    }
    if (!form.start_date)
      validationErrors.start_date = "Start date is required";
    if (!form.end_date) validationErrors.end_date = "End date is required";
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      focusField(Object.keys(validationErrors)[0]);
      toast.error("Please fill the highlighted required fields");
      return;
    }
    setErrors({});
    let paramsObj = undefined;
    if (form.params && String(form.params).trim()) {
      try {
        paramsObj = JSON.parse(form.params);
      } catch {
        toast.error("Params must be valid JSON");
        return;
      }
    }
    const payload = {
      contract_id: form.contractId || undefined,
      type: form.type,
      promo_code: form.promo_code || undefined,
      description: form.description || undefined,
      discount_type: form.discount_type || undefined,
      discount_value:
        form.discount_value === "" ? undefined : Number(form.discount_value),
      params: paramsObj,
      start_date: form.start_date,
      end_date: form.end_date,
      combinability: form.combinability || undefined,
    };
    onSubmit ? onSubmit(payload, intent) : null;
  };

  // Live-validate params JSON
  useEffect(() => {
    if (!form?.params || !String(form.params).trim()) {
      setParamsError("");
      return;
    }
    try {
      JSON.parse(form.params);
      setParamsError("");
    } catch {
      setParamsError("Invalid JSON");
    }
  }, [form.params]);

  const prettyPrintParams = () => {
    if (!form?.params || !String(form.params).trim()) {
      setField("params", "{}");
      return;
    }
    try {
      const obj = JSON.parse(form.params);
      setField("params", JSON.stringify(obj, null, 2));
    } catch {
      /* ignore, validation already shows error */
    }
  };
  const minifyParams = () => {
    if (!form?.params || !String(form.params).trim()) {
      setField("params", "{}");
      return;
    }
    try {
      const obj = JSON.parse(form.params);
      setField("params", JSON.stringify(obj));
    } catch {
      /* ignore */
    }
  };
  const insertSampleParams = () => {
    const sample = { pct: "", book_by: "" };
    setField("params", JSON.stringify(sample, null, 2));
  };

  // Safety check - ensure form has all required fields
  const safeForm = {
    hotelId: form?.hotelId || "",
    contractId: form?.contractId || "",
    type: form?.type || "",
    promo_code: form?.promo_code || "",
    description: form?.description || "",
    discount_type: form?.discount_type || "",
    discount_value: form?.discount_value || "",
    params: form?.params || "{}",
    start_date: form?.start_date || "",
    end_date: form?.end_date || "",
    combinability: form?.combinability || "",
  };

  return (
    <form onSubmit={handleSubmit} className="form" autoComplete="off">
      <div className="panel-body">
        <div className="row g-3 align-items-end">
          <div className="col-md-4 form-group" ref={assignRef("hotelId")}>
            <label>
              Hotel <span className="text-danger">*</span>
            </label>
            <MultiSelect
              isSearchable
              isMulti={false}
              isLoading={isLoadingHotels}
              options={hotelOptions}
              placeholder="- Select Hotel -"
              className="custom-select"
              value={
                hotelOptions.find((o) => o.value === safeForm.hotelId) || null
              }
              onChange={(opt) => setField("hotelId", opt ? opt.value : "")}
              noOptionsMessage={() =>
                isLoadingHotels ? "Loading..." : "Type to search"
              }
              isDisabled={isView}
              isInvalid={Boolean(errors.hotelId)}
            />
            {errors.hotelId ? (
              <div className="invalid-feedback d-block">{errors.hotelId}</div>
            ) : null}
          </div>
          <div className="col-md-4 form-group" ref={assignRef("contractId")}>
            <label>Contract</label>
            <MultiSelect
              isSearchable
              isMulti={false}
              isLoading={isLoadingContracts}
              options={contractOptions}
              placeholder="- Optional -"
              className="custom-select"
              value={
                contractOptions.find((o) => o.value === safeForm.contractId) ||
                null
              }
              onChange={(opt) => setField("contractId", opt ? opt.value : "")}
              noOptionsMessage={() =>
                isLoadingContracts ? "Loading..." : "Type to search"
              }
              isDisabled={isView}
              isInvalid={Boolean(errors.contractId)}
            />
            {errors.contractId ? (
              <div className="invalid-feedback d-block">
                {errors.contractId}
              </div>
            ) : null}
          </div>
          <div className="col-md-4 form-group" ref={assignRef("type")}>
            <label>
              Type <span className="text-danger">*</span>
            </label>
            <LookupSelectWithManage
              category="promotion_types"
              label="Type"
              value={safeForm.type}
              onChange={(val) => setField("type", val)}
              disabled={isView}
              isInvalid={Boolean(errors.type)}
              errorMessage={errors.type}
            />
          </div>
        </div>

        <div className="row g-2 align-items-end">
          <div className="col-md-3 form-group">
            <label>Promo Code</label>
            <input
              className="form-control form-control-sm"
              value={safeForm.promo_code}
              onChange={(e) => setField("promo_code", e.target.value)}
              disabled={isView}
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Description</label>
            <input
              className="form-control form-control-sm"
              value={safeForm.description}
              onChange={(e) => setField("description", e.target.value)}
              disabled={isView}
            />
          </div>
          <div className="col-md-3 form-group">
            <label>Combinability</label>
            <LookupSelectWithManage
              category="promotion_combinability"
              label="Combinability"
              value={safeForm.combinability}
              onChange={(val) => setField("combinability", val)}
              disabled={isView}
            />
          </div>
          <div className="col-md-3 form-group" ref={assignRef("discount_type")}>
            <label>
              Discount Type <span className="text-danger">*</span>
            </label>
            <LookupSelectWithManage
              category="discount_types"
              label="Discount Type"
              value={safeForm.discount_type}
              onChange={(val) => setField("discount_type", val)}
              disabled={isView}
              isInvalid={Boolean(errors.discount_type)}
              errorMessage={errors.discount_type}
            />
          </div>
          <div
            className="col-md-3 form-group"
            ref={assignRef("discount_value")}
          >
            <label>
              Discount Value <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className={`form-control form-control-sm ${
                errors.discount_value ? "is-invalid" : ""
              }`}
              value={safeForm.discount_value}
              onChange={(e) => setField("discount_value", e.target.value)}
              disabled={isView}
            />
            {errors.discount_value ? (
              <div className="invalid-feedback d-block">
                {errors.discount_value}
              </div>
            ) : null}
          </div>
          <div className="col-md-3 form-group" ref={assignRef("start_date")}>
            <label>
              Start Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className={`form-control form-control-sm ${
                errors.start_date ? "is-invalid" : ""
              }`}
              value={safeForm.start_date}
              onChange={(e) => setField("start_date", e.target.value)}
              disabled={isView}
            />
            {errors.start_date ? (
              <div className="invalid-feedback d-block">
                {errors.start_date}
              </div>
            ) : null}
          </div>
          <div className="col-md-3 form-group" ref={assignRef("end_date")}>
            <label>
              End Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className={`form-control form-control-sm ${
                errors.end_date ? "is-invalid" : ""
              }`}
              value={safeForm.end_date}
              onChange={(e) => setField("end_date", e.target.value)}
              disabled={isView}
            />
            {errors.end_date ? (
              <div className="invalid-feedback d-block">{errors.end_date}</div>
            ) : null}
          </div>
          <div className="col-md-12 form-group">
            <label>Params (JSON)</label>
            {!isView && (
              <div className="mb-2 d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={prettyPrintParams}
                >
                  Pretty
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={minifyParams}
                >
                  Minify
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={insertSampleParams}
                >
                  Sample
                </button>
                {paramsError && (
                  <span
                    className="text-danger ms-2"
                    style={{ alignSelf: "center" }}
                  >
                    {paramsError}
                  </span>
                )}
              </div>
            )}
            {isView ? (
              <pre
                className="form-control form-control-sm"
                style={{
                  height: "auto",
                  minHeight: 120,
                  whiteSpace: "pre-wrap",
                }}
              >
                {(() => {
                  try {
                    // Handle both string and object cases
                    if (typeof safeForm.params === "string") {
                      const parsed = JSON.parse(safeForm.params || "{}");
                      return JSON.stringify(parsed, null, 2);
                    } else if (
                      typeof safeForm.params === "object" &&
                      safeForm.params !== null
                    ) {
                      return JSON.stringify(safeForm.params, null, 2);
                    } else {
                      return "{}";
                    }
                  } catch (e) {
                    // If parsing fails, try to stringify if it's an object
                    if (
                      typeof safeForm.params === "object" &&
                      safeForm.params !== null
                    ) {
                      return JSON.stringify(safeForm.params, null, 2);
                    }
                    return String(safeForm.params || "{}");
                  }
                })()}
              </pre>
            ) : (
              <textarea
                rows={6}
                className="form-control form-control-sm"
                value={
                  typeof safeForm.params === "string"
                    ? safeForm.params
                    : JSON.stringify(safeForm.params || {}, null, 2)
                }
                onChange={(e) => setField("params", e.target.value)}
                placeholder='{"pct":10,"book_by":"2025-10-15"}'
              />
            )}
          </div>
        </div>

        {!isView && (
          <div className="row mt-4">
            <div className="col-md-12 d-flex flex-wrap gap-2">
              {!isWizard && (
                <button
                  type="submit"
                  className="btn btn-dark btn-sm"
                  disabled={submitting}
                  onClick={() => updateSubmitIntent("save")}
                >
                  {submitting && submitIntent === "save"
                    ? isEdit
                      ? "Updating..."
                      : "Saving..."
                    : isEdit
                    ? "Update"
                    : "Save"}
                </button>
              )}
              <button
                type="submit"
                className="btn btn-outline-secondary btn-sm"
                disabled={submitting}
                onClick={() => updateSubmitIntent("save-stay")}
              >
                {submitting && submitIntent === "save-stay"
                  ? "Saving..."
                  : "Save & Add Another"}
              </button>
              {isWizard && (
                <button
                  type="submit"
                  className="btn btn-dark btn-sm"
                  disabled={submitting}
                  onClick={() => updateSubmitIntent("save-next")}
                >
                  {submitting && submitIntent === "save-next"
                    ? "Continuing..."
                    : continueLabel}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
