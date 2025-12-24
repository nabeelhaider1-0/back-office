import React, { useEffect, useMemo, useState, useRef } from "react";
import MultiSelect from "../reactMultiSelect";
import LookupSelectWithManage from "../lookups/LookupSelectWithManage";
import { listHotels } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";

const defaultSeason = {
  hotelId: "",
  name: "",
  start_date: "",
  end_date: "",
  markets: [],
  channels: [],
};

export default function HotelExtranetSeasonForm({
  mode = "create",
  initialValue,
  onSubmit,
  submitting = false,
  wizardConfig = null,
  baseDefaults = null,
}) {
  const computedDefaults = useMemo(() => {
    if (baseDefaults && typeof baseDefaults === "object") {
      return { ...defaultSeason, ...baseDefaults };
    }
    return defaultSeason;
  }, [baseDefaults]);
  const [season, setSeason] = useState(initialValue || computedDefaults);
  const [hotels, setHotels] = useState([]);
  const [hotelOptions, setHotelOptions] = useState([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const hotelSearchRef = useRef("");
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const [errors, setErrors] = useState({});
  const [submitIntent, setSubmitIntent] = useState("save");
  const submitIntentRef = useRef("save");
  const updateSubmitIntent = (intent) => {
    submitIntentRef.current = intent;
    setSubmitIntent(intent);
  };
  const isWizard = Boolean(wizardConfig?.isActive);
  const continueLabel = wizardConfig?.continueLabel || "Save & Continue";
  const fieldRefs = useRef({});
  const registerField = (key) => (el) => {
    if (el) {
      fieldRefs.current[key] = el;
    }
  };
  const focusField = (key) => {
    const el = fieldRefs.current[key];
    if (!el) return;
    const target = el.querySelector?.("input,textarea,select") || el;
    if (target && typeof target.focus === "function") {
      target.focus();
      if (target.scrollIntoView) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };
  const clearFieldError = (key) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  useEffect(() => {
    setSeason(initialValue || computedDefaults);
  }, [initialValue, computedDefaults]);

  useEffect(() => {
    async function fetchHotels() {
      setIsLoadingHotels(true);
      try {
        const resp = await listHotels({
          page: 1,
          size: 100,
          search: hotelSearchRef.current,
        });
        const raw = resp?.data || resp;
        let arr = [];
        if (Array.isArray(raw?.items)) arr = raw.items;
        else if (Array.isArray(raw?.data)) arr = raw.data;
        else if (Array.isArray(raw)) arr = raw;
        else arr = [];
        setHotels(arr);
        setHotelOptions(
          arr.map((h) => ({
            value: h.id || h._id || h.hotelId,
            label: h.display_name || h.displayName || h.name,
          }))
        );
      } catch {
        setHotels([]);
        setHotelOptions([]);
      } finally {
        setIsLoadingHotels(false);
      }
    }
    fetchHotels();
  }, []);

  const onChange = (field, value) => {
    if (isView) return;
    setSeason((prev) => ({ ...prev, [field]: value }));
    clearFieldError(field);
  };

  const validate = () => {
    const err = {};
    if (!season.hotelId) err.hotelId = "Hotel is required";
    if (!season.name) err.name = "Season name is required";
    if (!season.start_date) err.start_date = "Start date is required";
    if (!season.end_date) err.end_date = "End date is required";
    if (season.start_date && season.end_date) {
      try {
        const sd = new Date(season.start_date);
        const ed = new Date(season.end_date);
        if (ed < sd) {
          err.end_date = "End date must be after start date";
        }
      } catch (_) {}
    }
    setErrors(err);
    const keys = Object.keys(err);
    if (keys.length) {
      focusField(keys[0]);
      toast.error("Please fill the highlighted required fields");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) return;
    const intent = submitIntentRef.current || "save";
    updateSubmitIntent("save");
    if (!validate()) return;
    onSubmit && onSubmit(season, intent);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="panel-body">
        <div className="row">
          <div className="col-md-4 form-group" ref={registerField("hotelId")}>
            <label>
              Hotel <span className="text-danger">*</span>
            </label>
            <MultiSelect
              isSearchable
              isMulti={false}
              isLoading={isLoadingHotels}
              options={hotelOptions}
              placeholder="- Select Hotel -"
              className={`custom-select${errors.hotelId ? " is-invalid" : ""}`}
              value={
                hotelOptions.find((o) => o.value === season.hotelId) || null
              }
              onChange={(opt) => onChange("hotelId", opt ? opt.value : "")}
              isDisabled={isView || isEdit}
              isInvalid={Boolean(errors.hotelId)}
              noOptionsMessage={() =>
                isLoadingHotels ? "Loading..." : "Type to search"
              }
            />
            {errors.hotelId && (
              <div className="invalid-feedback d-block">
                {typeof errors.hotelId === "string"
                  ? errors.hotelId
                  : "Hotel is required"}
              </div>
            )}
          </div>
          <div className="col-md-4 form-group">
            <label>
              Season Name <span className="text-danger">*</span>
            </label>
            <input
              ref={registerField("name")}
              type="text"
              className={`form-control form-control-sm${
                errors.name ? " is-invalid" : ""
              }`}
              value={season.name}
              onChange={(e) => onChange("name", e.target.value)}
              disabled={isView}
            />
            {errors.name && (
              <div className="invalid-feedback d-block">
                {typeof errors.name === "string"
                  ? errors.name
                  : "Season name is required"}
              </div>
            )}
          </div>
          <div className="col-md-2 form-group">
            <label>
              Start Date <span className="text-danger">*</span>
            </label>
            <input
              ref={registerField("start_date")}
              type="date"
              className={`form-control form-control-sm${
                errors.start_date ? " is-invalid" : ""
              }`}
              value={season.start_date}
              onChange={(e) => onChange("start_date", e.target.value)}
              disabled={isView}
            />
            {errors.start_date && (
              <div className="invalid-feedback d-block">
                {typeof errors.start_date === "string"
                  ? errors.start_date
                  : "Start date is required"}
              </div>
            )}
          </div>
          <div className="col-md-2 form-group">
            <label>
              End Date <span className="text-danger">*</span>
            </label>
            <input
              ref={registerField("end_date")}
              type="date"
              className={`form-control form-control-sm${
                errors.end_date ? " is-invalid" : ""
              }`}
              value={season.end_date}
              onChange={(e) => onChange("end_date", e.target.value)}
              disabled={isView}
            />
            {errors.end_date && (
              <div className="invalid-feedback d-block">
                {typeof errors.end_date === "string"
                  ? errors.end_date
                  : "End date is required"}
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 form-group">
            <label>Markets</label>
            <LookupSelectWithManage
              category="markets"
              label="Markets"
              isMulti
              value={season.markets}
              onChange={(vals) => setSeason((p) => ({ ...p, markets: vals }))}
              disabled={isView}
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Channels</label>
            <LookupSelectWithManage
              category="channels"
              label="Channels"
              isMulti
              value={season.channels}
              onChange={(vals) => setSeason((p) => ({ ...p, channels: vals }))}
              disabled={isView}
            />
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

function TagInput({ values, onAdd, onRemove, placeholder, disabled }) {
  const [input, setInput] = useState("");
  return (
    <>
      <div className="input-group input-group-sm mb-2">
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === "Enter" && input.trim()) {
              onAdd(input.trim());
              setInput("");
            }
          }}
          disabled={disabled}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            if (disabled) return;
            if (!input.trim()) return;
            onAdd(input.trim());
            setInput("");
          }}
          title="Add"
          disabled={disabled}
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
      <div>
        {values.map((v, i) => (
          <span
            key={i}
            className="badge bg-light text-dark me-1 mb-1"
            style={{ border: "1px solid #e5e7eb" }}
          >
            {v}
            {!disabled && (
              <button
                type="button"
                className="btn btn-sm btn-danger ms-2 py-0 px-1"
                onClick={() => onRemove(i)}
                title="Remove"
              >
                <i className="fa fa-minus"></i>
              </button>
            )}
          </span>
        ))}
      </div>
    </>
  );
}
