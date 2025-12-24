import React, { useEffect, useMemo, useState } from "react";
import MultiSelect from "../reactMultiSelect";
import LookupSelectWithManage from "../lookups/LookupSelectWithManage";
import {
  listHotels,
  listContracts,
  listRooms,
  upsertAllotmentsBulk,
  getContract,
  listSeasons,
} from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";

const defaultForm = { contractId: "" };
const blankRow = () => ({
  roomTypeId: "",
  startDate: "",
  endDate: "",
  qty: "",
  seasonId: "",
  source: "",
});

export default function HotelExtranetAllotmentForm({
  mode = "create",
  initialValue,
  onSubmit,
  submitting = false,
  wizardConfig = null,
  baseDefaults = null,
}) {
  const computedDefaults = useMemo(() => {
    if (baseDefaults && typeof baseDefaults === "object") {
      return { ...defaultForm, ...baseDefaults };
    }
    return defaultForm;
  }, [baseDefaults]);
  const [form, setForm] = useState(initialValue || computedDefaults);
  const [hotelId, setHotelId] = useState(baseDefaults?.hotelId || "");
  const [hotelOptions, setHotelOptions] = useState([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const [contractOptions, setContractOptions] = useState([]);
  const [isLoadingContracts, setIsLoadingContracts] = useState(false);
  const [roomOptions, setRoomOptions] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [seasonOptions, setSeasonOptions] = useState([]);
  const [isLoadingSeasons, setIsLoadingSeasons] = useState(false);
  const [rows, setRows] = useState([blankRow()]);
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
  const fieldRefs = React.useRef({});
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
  const isRowValid = (row) =>
    row.roomTypeId &&
    row.startDate &&
    row.endDate &&
    row.qty !== "" &&
    !Number.isNaN(Number(row.qty));

  useEffect(() => {
    setForm(initialValue || computedDefaults);
  }, [initialValue, computedDefaults]);
  useEffect(() => {
    if (baseDefaults?.hotelId) {
      setHotelId((prev) => prev || baseDefaults.hotelId);
    }
  }, [baseDefaults?.hotelId]);

  // Normalize initialValue into a single editable row for edit/view
  useEffect(() => {
    if (!initialValue) return;
    if (!(isEdit || isView)) return;
    const api = initialValue;
    const legacyDate = api.date || api.day || api.for_date || "";
    const row = {
      roomTypeId: api.room_type_id || api.roomTypeId || "",
      startDate: api.start_date || api.startDate || legacyDate || "",
      endDate: api.end_date || api.endDate || legacyDate || "",
      qty: api.qty ?? api.quantity ?? "",
      seasonId: api.season_id || api.seasonId || "",
      source: api.source || "",
    };
    setRows([row]);
  }, [initialValue, isEdit, isView]);

  // Load hotels initially
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

  // When contract selected, back-resolve hotel and load seasons/rooms
  useEffect(() => {
    const loadRelated = async () => {
      if (!form.contractId) {
        setSeasonOptions([]);
        setRoomOptions([]);
        return;
      }
      try {
        const c = await getContract(form.contractId);
        const hid = c?.data?.hotelId || "";
        setHotelId(hid);
        if (hid) {
          setIsLoadingSeasons(true);
          const seasons = await listSeasons(hid, { page: 1, size: 100 });
          const sItems = Array.isArray(seasons?.items)
            ? seasons.items
            : Array.isArray(seasons?.data)
            ? seasons.data
            : Array.isArray(seasons)
            ? seasons
            : [];
          setSeasonOptions(
            sItems.map((s) => ({
              value: s.id,
              label:
                s.name ||
                `${s.start_date || s.startDate} - ${s.end_date || s.endDate}`,
            }))
          );
          setIsLoadingSeasons(false);
          setIsLoadingRooms(true);
          const rooms = await listRooms(hid, { page: 1, size: 100 });
          const rItems = Array.isArray(rooms?.items)
            ? rooms.items
            : Array.isArray(rooms?.data)
            ? rooms.data
            : Array.isArray(rooms)
            ? rooms
            : [];
          setRoomOptions(
            rItems.map((r) => ({ value: r.id, label: r.name || r.code }))
          );
          setIsLoadingRooms(false);
        }
      } catch (_) {
        setSeasonOptions([]);
        setRoomOptions([]);
        setIsLoadingSeasons(false);
        setIsLoadingRooms(false);
      }
    };
    loadRelated();
  }, [form.contractId]);

  // When hotel changes manually, load its contracts/rooms/seasons
  useEffect(() => {
    const loadByHotel = async () => {
      if (!hotelId) {
        setContractOptions([]);
        setSeasonOptions([]);
        setRoomOptions([]);
        return;
      }
      try {
        setIsLoadingContracts(true);
        const resp = await listContracts(hotelId, { page: 1, size: 100 });
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
        setIsLoadingSeasons(true);
        const seasons = await listSeasons(hotelId, { page: 1, size: 100 });
        const sItems = Array.isArray(seasons?.items)
          ? seasons.items
          : Array.isArray(seasons?.data)
          ? seasons.data
          : Array.isArray(seasons)
          ? seasons
          : [];
        setSeasonOptions(
          sItems.map((s) => ({
            value: s.id,
            label:
              s.name ||
              `${s.start_date || s.startDate} - ${s.end_date || s.endDate}`,
          }))
        );
        setIsLoadingSeasons(false);
        setIsLoadingRooms(true);
        const rooms = await listRooms(hotelId, { page: 1, size: 100 });
        const rItems = Array.isArray(rooms?.items)
          ? rooms.items
          : Array.isArray(rooms?.data)
          ? rooms.data
          : Array.isArray(rooms)
          ? rooms
          : [];
        setRoomOptions(
          rItems.map((r) => ({ value: r.id, label: r.name || r.code }))
        );
        setIsLoadingRooms(false);
      } catch (_) {
        setSeasonOptions([]);
        setRoomOptions([]);
        setIsLoadingSeasons(false);
        setIsLoadingRooms(false);
      }
    };
    loadByHotel();
  }, [hotelId]);

  useEffect(() => {
    if (!errors.rows) return;
    if (rows.some(isRowValid)) {
      setErrors((prev) => {
        if (!prev.rows) return prev;
        const next = { ...prev };
        delete next.rows;
        return next;
      });
    }
  }, [rows, errors.rows]);

  const validate = () => {
    const err = {};
    if (!form.contractId && !isEdit) err.contractId = "Contract is required";
    if (!form.hotelId && !isEdit) err.hotelId = "Hotel ID is required";
    const hasValidRow = rows.some(isRowValid);
    if (!hasValidRow) {
      err.rows = "Add at least one row with room, date range, and quantity";
    }
    const invalidRange = rows.some(
      (row) =>
        row.startDate &&
        row.endDate &&
        new Date(row.startDate) > new Date(row.endDate)
    );
    if (invalidRange) {
      err.rows = "Start date cannot be after end date";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isView) return;
    const intent = submitIntentRef.current || "save";
    updateSubmitIntent("save");
    if (!validate()) return;
    if (isEdit) {
      const r = rows[0] || {};
      const body = {
        room_type_id: r.roomTypeId,
        start_date: r.startDate,
        end_date: r.endDate,
        qty: r.qty === "" ? 0 : Number(r.qty),
        season_id: r.seasonId || undefined,
        source: r.source || undefined,
      };
      onSubmit && onSubmit(body, intent);
      return;
    }
    const items = rows
      .map((r) => ({
        room_type_id: r.roomTypeId,
        start_date: r.startDate,
        end_date: r.endDate,
        qty: Number(r.qty),
        season_id: r.seasonId || undefined,
        source: r.source || undefined,
        hotel_id: hotelId || undefined,
      }))
      .filter(
        (x) =>
          x.room_type_id && x.start_date && x.end_date && Number.isFinite(x.qty)
      );
    onSubmit
      ? onSubmit({ contractId: form.contractId, items, hotelId }, intent)
      : null;
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
              value={hotelOptions.find((o) => o.value === hotelId) || null}
              onChange={(opt) => {
                setHotelId(opt ? opt.value : "");
                setForm((p) => ({ ...p, contractId: "" }));
                clearFieldError("hotelId");
              }}
              noOptionsMessage={() =>
                isLoadingHotels ? "Loading..." : "Type to search"
              }
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
            <label>
              Contract <span className="text-danger">*</span>
            </label>
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
              onChange={(opt) => {
                setForm((p) => ({
                  ...p,
                  contractId: opt ? opt.value : "",
                }));
                clearFieldError("contractId");
              }}
              noOptionsMessage={() =>
                isLoadingContracts ? "Loading..." : "Type to search"
              }
              isInvalid={Boolean(errors.contractId)}
            />
            {errors.contractId ? (
              <div className="invalid-feedback d-block">
                {errors.contractId}
              </div>
            ) : null}
          </div>
          <div className="col-md-4">
            <div className="text-muted" style={{ fontSize: 12 }}>
              Select hotel to load contracts, rooms and seasons. You can upsert
              multiple rows below.
            </div>
          </div>
        </div>

        <div className="form-group mt-2" ref={registerField("rows")}>
          <h5>Bulk Allotments</h5>
          <div className="text-muted" style={{ fontSize: 12 }}>
            Add multiple allotment rows. Use + to add and - to remove rows.
          </div>
          {errors.rows ? (
            <div className="invalid-feedback d-block">{errors.rows}</div>
          ) : null}
        </div>
        {rows.map((row, idx) => (
          <div className="row mt-3 g-2 align-items-end">
            <div className="col-md-3 form-group">
              <label>Room</label>
              <MultiSelect
                isSearchable
                isMulti={false}
                isLoading={isLoadingRooms}
                options={roomOptions}
                placeholder="- Select Room -"
                value={
                  roomOptions.find((o) => o.value === row.roomTypeId) || null
                }
                onChange={(opt) => {
                  const next = [...rows];
                  next[idx] = {
                    ...next[idx],
                    roomTypeId: opt ? opt.value : "",
                  };
                  setRows(next);
                }}
                className="custom-select"
                noOptionsMessage={() =>
                  isLoadingRooms ? "Loading..." : "Type to search"
                }
                isDisabled={isView}
              />
            </div>
            <div className="col-md-2 form-group">
              <label>Start Date</label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={row.startDate}
                onChange={(e) => {
                  const next = [...rows];
                  next[idx] = { ...next[idx], startDate: e.target.value };
                  setRows(next);
                }}
                disabled={isView}
              />
            </div>
            <div className="col-md-2 form-group">
              <label>End Date</label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={row.endDate}
                onChange={(e) => {
                  const next = [...rows];
                  next[idx] = { ...next[idx], endDate: e.target.value };
                  setRows(next);
                }}
                disabled={isView}
              />
            </div>
            <div className="col-md-1 form-group">
              <label>Qty</label>
              <input
                type="number"
                className="form-control form-control-sm"
                value={row.qty}
                onChange={(e) => {
                  const next = [...rows];
                  next[idx] = { ...next[idx], qty: e.target.value };
                  setRows(next);
                }}
                disabled={isView}
              />
            </div>
            <div className="col-md-2 form-group">
              <label>Season</label>
              <MultiSelect
                isSearchable
                isMulti={false}
                isLoading={isLoadingSeasons}
                options={seasonOptions}
                placeholder="- Optional -"
                value={
                  seasonOptions.find((o) => o.value === row.seasonId) || null
                }
                onChange={(opt) => {
                  const next = [...rows];
                  next[idx] = {
                    ...next[idx],
                    seasonId: opt ? opt.value : "",
                  };
                  setRows(next);
                }}
                className="custom-select"
                noOptionsMessage={() =>
                  isLoadingSeasons ? "Loading..." : "Type to search"
                }
                isDisabled={isView}
              />
            </div>
            <div className="col-md-2 form-group">
              <label>Source</label>
              <LookupSelectWithManage
                category="allotment_sources"
                label="Source"
                value={row.source}
                onChange={(val) => {
                  const next = [...rows];
                  next[idx] = { ...next[idx], source: val };
                  setRows(next);
                }}
                disabled={isView}
              />
            </div>
            {!isView && (
              <div className="col-md-12 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    const next = rows.filter((_, i) => i !== idx);
                    setRows(next.length ? next : [blankRow()]);
                  }}
                  title="Remove"
                >
                  <i className="fa fa-minus"></i>
                </button>
                {idx === rows.length - 1 && (
                  <button
                    type="button"
                    className="btn btn-dark btn-sm ms-2"
                    onClick={() => setRows([...rows, blankRow()])}
                    title="Add"
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

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
