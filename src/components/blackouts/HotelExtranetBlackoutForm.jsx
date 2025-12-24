import React, { useEffect, useMemo, useState, useRef } from "react";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import LookupSelectWithManage from "../lookups/LookupSelectWithManage";
import {
  listHotels,
  createBlackout,
  updateBlackout,
  getBlackout,
} from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";

const defaultBlackout = {
  hotelId: "",
  start_date: "",
  end_date: "",
  reason: "",
};

export default function HotelExtranetBlackoutForm({
  mode = "create",
  initialValue,
  onSubmit,
  submitting = false,
  wizardConfig = null,
  baseDefaults = null,
}) {
  const computedDefaults = useMemo(() => {
    if (baseDefaults && typeof baseDefaults === "object") {
      return { ...defaultBlackout, ...baseDefaults };
    }
    return defaultBlackout;
  }, [baseDefaults]);
  const [form, setForm] = useState(initialValue || computedDefaults);
  const [hotelOptions, setHotelOptions] = useState([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const [submitIntent, setSubmitIntent] = useState("save");
  const submitIntentRef = React.useRef("save");
  const updateSubmitIntent = (intent) => {
    submitIntentRef.current = intent;
    setSubmitIntent(intent);
  };
  const isWizard = Boolean(wizardConfig?.isActive);
  const continueLabel = wizardConfig?.continueLabel || "Save & Continue";
  const [errors, setErrors] = useState({});
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

  useEffect(() => {
    setForm(initialValue || computedDefaults);
  }, [initialValue, computedDefaults]);

  // Normalize initialValue for edit/view so dropdowns show selected values
  useEffect(() => {
    if (!initialValue) return;
    if (!(isEdit || isView)) return;
    const api = initialValue;
    const next = {
      hotelId: api.hotel_id || api.hotelId || "",
      start_date: api.start_date || api.startDate || "",
      end_date: api.end_date || api.endDate || "",
      reason: api.reason || "",
    };
    setForm((p) => ({ ...p, ...next }));
  }, [initialValue, isEdit, isView]);

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

  const validate = () => {
    const err = {};
    if (!form.hotelId && !isWizard) err.hotelId = "Hotel is required";
    if (!form.start_date) err.start_date = "Start date is required";
    if (!form.end_date) err.end_date = "End date is required";
    if (form.start_date && form.end_date) {
      const start = new Date(form.start_date);
      const end = new Date(form.end_date);
      if (end < start) {
        err.end_date = "End date must be after start date";
      }
    }
    if (!form.reason) err.reason = "Reason is required";
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
    const payload = {
      hotel_id: form.hotelId || undefined,
      start_date: form.start_date,
      end_date: form.end_date,
      reason: form.reason || undefined,
    };
    onSubmit ? onSubmit(payload, intent) : null;
  };

  return (
    <form onSubmit={handleSubmit} className="form" autoComplete="off">
      <div className="panel-body">
        <div className="row g-3 align-items-end">
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
              className="custom-select"
              value={hotelOptions.find((o) => o.value === form.hotelId) || null}
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
          <div
            className="col-md-3 form-group"
            ref={registerField("start_date")}
          >
            <label>
              Start Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className={`form-control form-control-sm ${
                errors.start_date ? "is-invalid" : ""
              }`}
              value={form.start_date}
              onChange={(e) => setField("start_date", e.target.value)}
              disabled={isView}
            />
            {errors.start_date ? (
              <div className="invalid-feedback d-block">
                {errors.start_date}
              </div>
            ) : null}
          </div>
          <div className="col-md-3 form-group" ref={registerField("end_date")}>
            <label>
              End Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className={`form-control form-control-sm ${
                errors.end_date ? "is-invalid" : ""
              }`}
              value={form.end_date}
              onChange={(e) => setField("end_date", e.target.value)}
              disabled={isView}
            />
            {errors.end_date ? (
              <div className="invalid-feedback d-block">{errors.end_date}</div>
            ) : null}
          </div>
          <div className="col-md-2 form-group" ref={registerField("reason")}>
            <label>
              Reason <span className="text-danger">*</span>
            </label>
            <LookupSelectWithManage
              category="blackout_reasons"
              label="Reason"
              value={form.reason}
              onChange={(val) => setField("reason", val)}
              disabled={isView}
              isInvalid={Boolean(errors.reason)}
              errorMessage={errors.reason}
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
