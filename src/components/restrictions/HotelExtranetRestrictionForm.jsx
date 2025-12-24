import React, { useEffect, useRef, useState } from "react";
import MultiSelect from "../reactMultiSelect";
import LookupSelectWithManage from "../lookups/LookupSelectWithManage";
import {
  listHotels,
  listContracts,
  listRooms,
  createRestrictionGlobal,
  updateRestriction,
  getRestriction,
} from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";

const defaultRestriction = {
  hotelId: "",
  contractId: "",
  roomTypeId: "",
  level: "",
  scope_value: "",
  start_date: "",
  end_date: "",
  min_los: "",
  max_los: "",
  cta: false,
  ctd: false,
  stop_sell: false,
  release_days: "",
};

export default function HotelExtranetRestrictionForm({
  mode = "create",
  initialValue,
  onSubmit,
  submitting = false,
  wizardConfig = null,
  baseDefaults = null,
}) {
  const [form, setForm] = useState(initialValue || defaultRestriction);
  const [hotelOptions, setHotelOptions] = useState([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const [contractOptions, setContractOptions] = useState([]);
  const [isLoadingContracts, setIsLoadingContracts] = useState(false);
  const [roomOptions, setRoomOptions] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const submitIntentRef = useRef("save");
  const [submitIntent, setSubmitIntent] = useState("save");
  const wizardActive = Boolean(wizardConfig?.isActive);
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
    setForm(initialValue || defaultRestriction);
  }, [initialValue]);
  useEffect(() => {
    if (!wizardActive) return;
    if (!baseDefaults) return;
    if (mode !== "create") return;
    setForm((prev) => ({ ...prev, ...baseDefaults }));
  }, [wizardActive, baseDefaults, mode]);

  // Normalize initialValue shapes on edit/view
  useEffect(() => {
    if (!initialValue) return;
    if (!(isEdit || isView)) return;
    const api = initialValue;
    const next = {
      hotelId: api.hotel_id || api.hotelId || "",
      contractId: api.contract_id || api.contractId || "",
      roomTypeId: api.room_type_id || api.roomTypeId || "",
      level: api.level || "",
      scope_value: api.scope_value || "",
      start_date: api.start_date || api.startDate || "",
      end_date: api.end_date || api.endDate || "",
      min_los: api.min_los ?? api.minLos ?? "",
      max_los: api.max_los ?? api.maxLos ?? "",
      cta: Boolean(api.cta),
      ctd: Boolean(api.ctd),
      stop_sell: Boolean(api.stop_sell ?? api.stopSell),
      release_days: api.release_days ?? api.releaseDays ?? "",
    };
    setForm((p) => ({ ...p, ...next }));
  }, [initialValue, isEdit, isView]);

  // Auto-derive scope_value from selected inputs.
  // Rule: If a room is selected, prefer room and force level="room" (unless level is "date").
  // Else if a contract is selected, prefer contract; else hotel.
  useEffect(() => {
    if (isView) return;
    const { level, hotelId, contractId, roomTypeId } = form || {};
    if (level !== "date") {
      if (roomTypeId) {
        if (form.scope_value !== roomTypeId || level !== "room")
          setForm((p) => ({ ...p, level: "room", scope_value: roomTypeId }));
        return;
      }
      if (contractId) {
        const nextScope = contractId || "";
        if (form.scope_value !== nextScope || level !== "contract")
          setForm((p) => ({ ...p, level: "contract", scope_value: nextScope }));
        return;
      }
      if (hotelId) {
        const nextScope = hotelId || "";
        if (form.scope_value !== nextScope || level !== "hotel")
          setForm((p) => ({ ...p, level: "hotel", scope_value: nextScope }));
        return;
      }
      // nothing selected, clear scope
      if (form.scope_value) setForm((p) => ({ ...p, scope_value: "" }));
    }
  }, [form.level, form.hotelId, form.contractId, form.roomTypeId]);

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

  useEffect(() => {
    const loadDeps = async () => {
      setForm((p) => ({ ...p, contractId: "", roomTypeId: p.roomTypeId }));
      setContractOptions([]);
      setRoomOptions([]);
      if (!form.hotelId) return;
      try {
        setIsLoadingContracts(true);
        const resp = await listContracts(form.hotelId, { page: 1, size: 100 });
        const carr = Array.isArray(resp?.items)
          ? resp.items
          : Array.isArray(resp?.data)
          ? resp.data
          : Array.isArray(resp)
          ? resp
          : [];
        setContractOptions(
          carr.map((c) => ({ value: c.id || c.contractId, label: c.name }))
        );
      } finally {
        setIsLoadingContracts(false);
      }
      try {
        setIsLoadingRooms(true);
        const rresp = await listRooms(form.hotelId, { page: 1, size: 100 });
        const rarr = Array.isArray(rresp?.items)
          ? rresp.items
          : Array.isArray(rresp?.data)
          ? rresp.data
          : Array.isArray(rresp)
          ? rresp
          : [];
        setRoomOptions(
          rarr.map((r) => ({ value: r.id, label: r.name || r.code }))
        );
      } finally {
        setIsLoadingRooms(false);
      }
    };
    loadDeps();
  }, [form.hotelId]);

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
    if (!form.hotelId) err.hotelId = "Hotel ID is required";
    if (!form.level) err.level = "Level is required";
    if (!form.start_date) err.start_date = "Start date is required";
    if (!form.end_date) err.end_date = "End date is required";
    if (form.start_date && form.end_date) {
      const start = new Date(form.start_date);
      const end = new Date(form.end_date);
      if (end < start) {
        err.end_date = "End date must be after start date";
      }
    }
    if (form.level === "hotel" && !form.hotelId) err.hotelId = "Select a hotel";
    if (form.level === "contract" && !form.contractId)
      err.contractId = "Select a contract";
    if (form.level === "room" && !form.roomTypeId)
      err.roomTypeId = "Select a room";
    if (form.level === "date" && !form.scope_value)
      err.scope_value = "Scope date is required";
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
    if (!validate()) return;
    const body = {
      level: form.level,
      start_date: form.start_date,
      end_date: form.end_date,
      scope_value:
        form.level === "date"
          ? form.scope_value || undefined
          : form.level === "hotel"
          ? form.hotelId || undefined
          : form.level === "contract"
          ? form.contractId || undefined
          : form.level === "room"
          ? form.roomTypeId || undefined
          : undefined,
      min_los: form.min_los === "" ? undefined : Number(form.min_los),
      max_los: form.max_los === "" ? undefined : Number(form.max_los),
      cta: form.cta === true ? true : false,
      ctd: form.ctd === true ? true : false,
      stop_sell: form.stop_sell === true ? true : false,
      release_days:
        form.release_days === "" ? undefined : Number(form.release_days),
      hotel_id: form.level === "hotel" ? form.hotelId || undefined : undefined,
      contract_id:
        form.level === "contract" ? form.contractId || undefined : undefined,
      room_type_id:
        form.level === "room" ? form.roomTypeId || undefined : undefined,
    };
    onSubmit && onSubmit(body, submitIntentRef.current);
    submitIntentRef.current = "save";
    setSubmitIntent("save");
  };

  return (
    <form onSubmit={handleSubmit}>
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
            className="col-md-4 form-group"
            ref={registerField("contractId")}
          >
            <label>Contract</label>
            <MultiSelect
              isSearchable
              isMulti={false}
              isLoading={isLoadingContracts}
              options={contractOptions}
              placeholder="- Select Contract -"
              className="custom-select"
              value={
                contractOptions.find((o) => o.value === form.contractId) || null
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
          <div
            className="col-md-4 form-group"
            ref={registerField("roomTypeId")}
          >
            <label>Room</label>
            <MultiSelect
              isSearchable
              isMulti={false}
              isLoading={isLoadingRooms}
              options={roomOptions}
              placeholder="- Select Room -"
              className="custom-select"
              value={
                roomOptions.find((o) => o.value === form.roomTypeId) || null
              }
              onChange={(opt) => setField("roomTypeId", opt ? opt.value : "")}
              noOptionsMessage={() =>
                isLoadingRooms ? "Loading..." : "Type to search"
              }
              isDisabled={isView}
              isInvalid={Boolean(errors.roomTypeId)}
            />
            {errors.roomTypeId ? (
              <div className="invalid-feedback d-block">
                {errors.roomTypeId}
              </div>
            ) : null}
          </div>
        </div>

        <div className="row mt-2 g-2 align-items-end">
          <div className="col-md-3 form-group" ref={registerField("level")}>
            <label>
              Level <span className="text-danger">*</span>
            </label>
            <LookupSelectWithManage
              category="restriction_levels"
              label="Level"
              value={form.level}
              onChange={(val) => setField("level", val)}
              disabled={isView}
              isInvalid={Boolean(errors.level)}
              errorMessage={errors.level}
            />
          </div>
          {form.level === "date" ? (
            <div
              className="col-md-3 form-group"
              ref={registerField("scope_value")}
            >
              <label>Scope Date</label>
              <input
                type="date"
                className={`form-control form-control-sm ${
                  errors.scope_value ? "is-invalid" : ""
                }`}
                value={form.scope_value}
                onChange={(e) => setField("scope_value", e.target.value)}
                disabled={isView}
              />
              {errors.scope_value ? (
                <div className="invalid-feedback d-block">
                  {errors.scope_value}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="col-md-3 form-group">
              <label>Scope Value</label>
              <input
                className="form-control form-control-sm"
                value={form.scope_value}
                onChange={(e) => setField("scope_value", e.target.value)}
                disabled={isView || true}
                readOnly
                placeholder="Auto-set from selection"
              />
            </div>
          )}
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
          <div className="col-md-3 form-group">
            <label>Min LOS</label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={form.min_los}
              onChange={(e) => setField("min_los", e.target.value)}
              disabled={isView}
            />
          </div>
          <div className="col-md-3 form-group">
            <label>Max LOS</label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={form.max_los}
              onChange={(e) => setField("max_los", e.target.value)}
              disabled={isView}
            />
          </div>
          <div className="col-md-2 form-group">
            <label className="mb-1 small text-muted d-block">CTA</label>
            <input
              type="checkbox"
              style={{ accentColor: "var(--color-secondary)" }}
              checked={Boolean(form.cta)}
              onChange={(e) => setField("cta", e.target.checked)}
              disabled={isView}
            />
          </div>
          <div className="col-md-2 form-group">
            <label className="mb-1 small text-muted d-block">CTD</label>
            <input
              type="checkbox"
              style={{ accentColor: "var(--color-secondary)" }}
              checked={Boolean(form.ctd)}
              onChange={(e) => setField("ctd", e.target.checked)}
              disabled={isView}
            />
          </div>
          <div className="col-md-2 form-group">
            <label className="mb-1 small text-muted d-block">Stop Sell</label>
            <input
              type="checkbox"
              style={{ accentColor: "var(--color-secondary)" }}
              checked={Boolean(form.stop_sell)}
              onChange={(e) => setField("stop_sell", e.target.checked)}
              disabled={isView}
            />
          </div>
          <div className="col-md-3 form-group">
            <label>Release Days</label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={form.release_days}
              onChange={(e) => setField("release_days", e.target.value)}
              disabled={isView}
            />
          </div>
        </div>

        {!isView && (
          <div className="row mt-3">
            <div className="col-md-12 d-flex flex-wrap gap-2">
              {!wizardActive && (
                <button
                  type="submit"
                  className="btn btn-dark btn-sm"
                  disabled={submitting}
                  onClick={() => {
                    submitIntentRef.current = "save";
                    setSubmitIntent("save");
                  }}
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
                onClick={() => {
                  submitIntentRef.current = "save-stay";
                  setSubmitIntent("save-stay");
                }}
              >
                {submitting && submitIntent === "save-stay"
                  ? "Saving..."
                  : "Save & Add Another"}
              </button>
              {wizardActive && (
                <button
                  type="submit"
                  className="btn btn-dark btn-sm"
                  disabled={submitting}
                  onClick={() => {
                    submitIntentRef.current = "save-next";
                    setSubmitIntent("save-next");
                  }}
                >
                  {submitting && submitIntent === "save-next"
                    ? "Continuing..."
                    : wizardConfig?.continueLabel || "Save & Continue"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
