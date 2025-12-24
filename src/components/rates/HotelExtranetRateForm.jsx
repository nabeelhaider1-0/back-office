import React, { useEffect, useMemo, useRef, useState } from "react";
import MultiSelect from "../reactMultiSelect";
import LookupSelectWithManage from "../lookups/LookupSelectWithManage";
import {
  listHotels,
  listContracts,
  getContract,
  listSeasons,
  listRooms,
} from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";

const defaultRate = { contractId: "" };

export default function HotelExtranetRateForm({
  mode = "create",
  initialValue,
  onSubmit,
  submitting = false,
  wizardConfig = null,
  baseDefaults = null,
}) {
  const computedDefaults = useMemo(() => {
    if (baseDefaults && typeof baseDefaults === "object") {
      return { ...defaultRate, ...baseDefaults };
    }
    return defaultRate;
  }, [baseDefaults]);
  const [form, setForm] = useState(initialValue || computedDefaults);
  const [contracts, setContracts] = useState([]);
  const [contractOptions, setContractOptions] = useState([]);
  const [isLoadingContracts, setIsLoadingContracts] = useState(false);
  const [errors, setErrors] = useState({});
  const [hotelId, setHotelId] = useState("");
  const [hotelOptions, setHotelOptions] = useState([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const [seasonOptions, setSeasonOptions] = useState([]);
  const [isLoadingSeasons, setIsLoadingSeasons] = useState(false);
  const [roomOptions, setRoomOptions] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const defaultTaxItem = {
    name: "",
    mode: "percent",
    value: "",
    included: false,
  };
  const blankRow = () => ({
    seasonId: "",
    roomTypeId: "",
    mealPlan: "",
    occKey: "",
    basePrice: "",
    currency: "",
    marketSegment: "",
    nationalityBands: [],
    inclusions: [],
    rateType: "",
    child_free_until: "",
    child_rate_pct: "",
    extra_bed_adult: "",
    extra_bed_child: "",
    tax_items: [{ ...defaultTaxItem }],
    city_tax: { mode: "", amount: "", currency: "", included: false },
  });
  const [rows, setRows] = useState([blankRow()]);
  const isView = mode === "view";
  const isEdit = mode === "edit";
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
    if (el) fieldRefs.current[key] = el;
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
    } else if (el.scrollIntoView) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
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
  const isRowValid = (r) =>
    r.seasonId &&
    r.roomTypeId &&
    r.mealPlan &&
    r.occKey &&
    r.basePrice !== "" &&
    r.currency;

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
    const child = api.child_policy || api.childPolicy || {};
    const extra = api.extra_bed_price || api.extraBedPrice || {};
    const tax = api.tax_policy || api.taxPolicy || {};
    const city = tax.cityTax || tax.city_tax || {};
    const row = {
      seasonId: api.season_id || api.seasonId || "",
      roomTypeId: api.room_type_id || api.roomTypeId || "",
      mealPlan: api.meal_plan || api.mealPlan || "",
      occKey: api.occ_key || api.occKey || "",
      basePrice: api.base_price ?? api.basePrice ?? "",
      currency: api.currency || "",
      marketSegment: api.market_segment || api.marketSegment || "",
      nationalityBands: api.nationality_bands || api.nationalityBands || [],
      inclusions: api.inclusions || [],
      rateType: api.rate_type || api.rateType || "",
      child_free_until: child.child_free_until ?? child.childFreeUntil ?? "",
      child_rate_pct: child.child_rate_pct ?? child.childRatePct ?? "",
      extra_bed_adult: typeof extra === "object" ? extra.Adult ?? "" : "",
      extra_bed_child: typeof extra === "object" ? extra.child ?? "" : "",
      tax_items: Array.isArray(tax.items)
        ? tax.items.map((t) => ({
            name: t.name || "",
            mode: t.mode || "percent",
            value: t.value || "",
            included: Boolean(t.included),
          }))
        : [{ ...defaultTaxItem }],
      city_tax: {
        mode: city.mode || "",
        amount: city.amount ?? "",
        currency: city.currency || "",
        included: Boolean(city.included),
      },
    };
    setRows([row]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue, isEdit, isView]);

  // Load contracts only after a hotel is selected (prevent 404 on empty hotelId)
  useEffect(() => {
    async function fetchContractsForHotel() {
      if (!hotelId) {
        setContractOptions([]);
        return;
      }
      setIsLoadingContracts(true);
      try {
        console.debug("RatesForm: fetching contracts for hotel", hotelId);
        const resp = await listContracts(hotelId, { page: 1, size: 100 });
        const arr = Array.isArray(resp?.items)
          ? resp.items
          : Array.isArray(resp?.data)
          ? resp.data
          : Array.isArray(resp)
          ? resp
          : [];
        setContracts(arr);
        setContractOptions(
          arr.map((c) => ({ value: c.id || c.contractId, label: c.name }))
        );
      } catch (e) {
        console.error("RatesForm: contracts fetch failed", e);
        setContracts([]);
        setContractOptions([]);
      } finally {
        setIsLoadingContracts(false);
      }
    }
    fetchContractsForHotel();
  }, [hotelId]);

  // initial hotels load
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
      } catch {
        setHotelOptions([]);
      } finally {
        setIsLoadingHotels(false);
      }
    }
    fetchHotels();
  }, []);

  useEffect(() => {
    const loadRelated = async () => {
      if (!form.contractId) {
        setSeasonOptions([]);
        setRoomOptions([]);
        return;
      }
      try {
        console.debug("RatesForm: contract selected", form.contractId);
        const c = await getContract(form.contractId);
        const hid = c?.data?.hotelId || "";
        setHotelId(hid);
        if (hid) {
          setIsLoadingSeasons(true);
          console.debug("RatesForm: fetching seasons for hotel", hid);
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
          console.debug("RatesForm: fetching rooms for hotel", hid);
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

  // when hotel changes manually, reload contracts/seasons/rooms for that hotel
  useEffect(() => {
    const loadByHotel = async () => {
      if (!hotelId) {
        setContractOptions([]);
        setSeasonOptions([]);
        setRoomOptions([]);
        return;
      }
      try {
        const contractsResp = await listContracts(hotelId, {
          page: 1,
          size: 100,
        });
        const carr = Array.isArray(contractsResp?.items)
          ? contractsResp.items
          : Array.isArray(contractsResp?.data)
          ? contractsResp.data
          : Array.isArray(contractsResp)
          ? contractsResp
          : [];
        setContractOptions(
          carr.map((c) => ({ value: c.id || c.contractId, label: c.name }))
        );
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
      } catch (_) {
        setContractOptions([]);
        setSeasonOptions([]);
        setRoomOptions([]);
      }
    };
    loadByHotel();
  }, [hotelId]);

  const validate = () => {
    const err = {};
    if (!form.contractId) err.contractId = "Contract is required";
    if (!form.hotelId) err.hotelId = "Hotel ID is required";
    if (!isEdit) {
      const validRows = rows.filter(isRowValid);
      if (!validRows.length) {
        err.rows =
          "Add at least one complete row (season, room, meal plan, occ key, base price, currency)";
      }
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

  const onChange = (field, value) => {
    if (isView) return;
    setForm((prev) => ({ ...prev, [field]: value }));
    clearFieldError(field);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) return;
    const intent = submitIntentRef.current || "save";
    updateSubmitIntent("save");
    if (!validate()) return;
    if (isEdit) {
      const r = rows[0] || {};
      const body = {
        season_id: r.seasonId,
        room_type_id: r.roomTypeId,
        meal_plan: r.mealPlan,
        occ_key: r.occKey,
        base_price: Number(r.basePrice),
        currency: r.currency,
        child_policy:
          r.child_free_until !== "" || r.child_rate_pct !== ""
            ? {
                child_free_until:
                  r.child_free_until === ""
                    ? undefined
                    : Number(r.child_free_until),
                child_rate_pct:
                  r.child_rate_pct === ""
                    ? undefined
                    : Number(r.child_rate_pct),
              }
            : undefined,
        extra_bed_price:
          r.extra_bed_adult !== "" || r.extra_bed_child !== ""
            ? {
                Adult:
                  r.extra_bed_adult === ""
                    ? undefined
                    : Number(r.extra_bed_adult),
                child:
                  r.extra_bed_child === ""
                    ? undefined
                    : Number(r.extra_bed_child),
              }
            : undefined,
        tax_policy:
          (Array.isArray(r.tax_items) && r.tax_items.length) ||
          (r.city_tax && (r.city_tax.mode || r.city_tax.amount))
            ? {
                items: (r.tax_items || []).map((t) => ({
                  name: t.name || "",
                  mode: t.mode || "percent",
                  value: Number(t.value || 0),
                  included: Boolean(t.included),
                })),
                cityTax:
                  r.city_tax && r.city_tax.mode
                    ? {
                        mode: r.city_tax.mode,
                        amount:
                          r.city_tax.amount === ""
                            ? 0
                            : Number(r.city_tax.amount),
                        currency: r.city_tax.currency || "",
                        included: Boolean(r.city_tax.included),
                      }
                    : undefined,
              }
            : undefined,
        inclusions:
          r.inclusions && r.inclusions.length ? r.inclusions : undefined,
        market_segment: r.marketSegment || undefined,
        nationality_bands:
          r.nationalityBands && r.nationalityBands.length
            ? r.nationalityBands
            : undefined,
        rate_type: r.rateType || undefined,
      };
      onSubmit && onSubmit({ ...form, ...body, hotelId }, intent);
      return;
    }
    const items = rows
      .map((r) => ({
        season_id: r.seasonId,
        room_type_id: r.roomTypeId,
        meal_plan: r.mealPlan,
        occ_key: r.occKey,
        base_price: Number(r.basePrice),
        currency: r.currency,
        child_policy:
          r.child_free_until !== "" || r.child_rate_pct !== ""
            ? {
                child_free_until:
                  r.child_free_until === ""
                    ? undefined
                    : Number(r.child_free_until),
                child_rate_pct:
                  r.child_rate_pct === ""
                    ? undefined
                    : Number(r.child_rate_pct),
              }
            : undefined,
        extra_bed_price:
          r.extra_bed_adult !== "" || r.extra_bed_child !== ""
            ? {
                Adult:
                  r.extra_bed_adult === ""
                    ? undefined
                    : Number(r.extra_bed_adult),
                child:
                  r.extra_bed_child === ""
                    ? undefined
                    : Number(r.extra_bed_child),
              }
            : undefined,
        tax_policy:
          (Array.isArray(r.tax_items) && r.tax_items.length) ||
          (r.city_tax && (r.city_tax.mode || r.city_tax.amount))
            ? {
                items: (r.tax_items || []).map((t) => ({
                  name: t.name || "",
                  mode: t.mode || "percent",
                  value: Number(t.value || 0),
                  included: Boolean(t.included),
                })),
                cityTax:
                  r.city_tax && r.city_tax.mode
                    ? {
                        mode: r.city_tax.mode,
                        amount:
                          r.city_tax.amount === ""
                            ? 0
                            : Number(r.city_tax.amount),
                        currency: r.city_tax.currency || "",
                        included: Boolean(r.city_tax.included),
                      }
                    : undefined,
              }
            : undefined,
        inclusions:
          r.inclusions && r.inclusions.length ? r.inclusions : undefined,
        market_segment: r.marketSegment || undefined,
        nationality_bands:
          r.nationalityBands && r.nationalityBands.length
            ? r.nationalityBands
            : undefined,
        rate_type: r.rateType || undefined,
      }))
      .filter(
        (x) =>
          x.season_id &&
          x.room_type_id &&
          x.meal_plan &&
          x.occ_key &&
          Number.isFinite(x.base_price) &&
          x.currency
      );
    onSubmit &&
      onSubmit({ contractId: form.contractId, hotelId, items }, intent);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="panel-body">
        <div className="row g-3 align-items-end">
          <div className="col-md-4 form-group">
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
              }}
              isDisabled={isView}
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
              className={`custom-select${
                errors.contractId ? " is-invalid" : ""
              }`}
              value={
                contractOptions.find((o) => o.value === form.contractId) || null
              }
              onChange={(opt) =>
                setForm((p) => ({ ...p, contractId: opt ? opt.value : "" }))
              }
              isDisabled={isView}
              noOptionsMessage={() =>
                isLoadingContracts ? "Loading..." : "Type to search"
              }
              isInvalid={Boolean(errors.contractId)}
            />
            {errors.contractId && (
              <div className="invalid-feedback d-block">
                {typeof errors.contractId === "string"
                  ? errors.contractId
                  : "Contract is required"}
              </div>
            )}
          </div>
          <div className="col-md-4">
            <div className="text-muted" style={{ fontSize: 12 }}>
              Select a hotel to load its contracts. Contract determines
              available seasons and rooms.
            </div>
          </div>
        </div>

        {!isEdit && (
          <>
            <div className="form-group mt-2" ref={registerField("rows")}>
              <h5>Bulk Rates</h5>
              <div className="text-muted" style={{ fontSize: 12 }}>
                Add multiple rate rows at once. Use + to add and - to remove
                rows.
              </div>
              {errors.rows && (
                <div className="invalid-feedback d-block">
                  {typeof errors.rows === "string"
                    ? errors.rows
                    : "Add at least one complete row"}
                </div>
              )}
            </div>
            {rows.map((row, idx) => (
              <div className="row mt-3 align-items-end g-2">
                <div className="col-md-2 form-group">
                  <label>Season</label>
                  <MultiSelect
                    isSearchable
                    isMulti={false}
                    options={seasonOptions}
                    isLoading={isLoadingSeasons}
                    placeholder="- Select -"
                    value={
                      seasonOptions.find((o) => o.value === row.seasonId) ||
                      null
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
                  />
                </div>
                <div className="col-md-2 form-group">
                  <label>Room</label>
                  <MultiSelect
                    isSearchable
                    isMulti={false}
                    options={roomOptions}
                    isLoading={isLoadingRooms}
                    placeholder="- Select -"
                    value={
                      roomOptions.find((o) => o.value === row.roomTypeId) ||
                      null
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
                  />
                </div>
                <div className="col-md-2 form-group">
                  <label>Meal Plan</label>
                  <LookupSelectWithManage
                    category="meal_plans"
                    label="Meal Plan"
                    value={row.mealPlan}
                    onChange={(val) => {
                      const next = [...rows];
                      next[idx] = { ...next[idx], mealPlan: val };
                      setRows(next);
                    }}
                  />
                </div>
                <div className="col-md-2 form-group">
                  <label>Occ Key</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={row.occKey}
                    onChange={(e) => {
                      const next = [...rows];
                      next[idx] = { ...next[idx], occKey: e.target.value };
                      setRows(next);
                    }}
                  />
                </div>
                <div className="col-md-2 form-group">
                  <label>Base Price</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={row.basePrice}
                    onChange={(e) => {
                      const next = [...rows];
                      next[idx] = {
                        ...next[idx],
                        basePrice: e.target.value,
                      };
                      setRows(next);
                    }}
                  />
                </div>
                <div className="col-md-2 form-group">
                  <label>Currency</label>
                  <LookupSelectWithManage
                    category="currencies"
                    label="Currency"
                    value={row.currency}
                    onChange={(val) => {
                      const next = [...rows];
                      next[idx] = { ...next[idx], currency: val };
                      setRows(next);
                    }}
                    showManage={true}
                  />
                </div>
                <div className="col-md-12 form-group">
                  <h5 className="mb-2">Child Policy</h5>
                </div>
                <div className="col-md-3 form-group">
                  <label>Child Free Until</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={row.child_free_until}
                    onChange={(e) => {
                      const next = [...rows];
                      next[idx] = {
                        ...next[idx],
                        child_free_until: e.target.value,
                      };
                      setRows(next);
                    }}
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Child Rate %</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={row.child_rate_pct}
                    onChange={(e) => {
                      const next = [...rows];
                      next[idx] = {
                        ...next[idx],
                        child_rate_pct: e.target.value,
                      };
                      setRows(next);
                    }}
                  />
                </div>

                <div className="col-md-12 form-group mt-2">
                  <h5 className="mb-2">Extra Bed</h5>
                </div>
                <div className="col-md-3 form-group">
                  <label>Extra Bed Adult</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={row.extra_bed_adult}
                    onChange={(e) => {
                      const next = [...rows];
                      next[idx] = {
                        ...next[idx],
                        extra_bed_adult: e.target.value,
                      };
                      setRows(next);
                    }}
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Extra Bed Child</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={row.extra_bed_child}
                    onChange={(e) => {
                      const next = [...rows];
                      next[idx] = {
                        ...next[idx],
                        extra_bed_child: e.target.value,
                      };
                      setRows(next);
                    }}
                  />
                </div>
                <div className="col-md-12 form-group mt-2">
                  <h5 className="mb-2">Tax Policy</h5>
                </div>
                <div className="col-md-12 form-group">
                  <label className="mb-0">Tax Items</label>
                  <div
                    className="row g-1 mb-1 text-muted"
                    style={{ fontSize: 12 }}
                  >
                    <div className="col-4">Name</div>
                    <div className="col-3">Mode</div>
                    <div className="col-3">Value</div>
                    <div className="col-2">Included</div>
                  </div>
                  {(row.tax_items || []).map((t, tidx) => (
                    <div key={tidx} className="row g-1 align-items-center mb-1">
                      <div className="col-4">
                        <input
                          className="form-control form-control-sm"
                          placeholder="Name"
                          value={t.name || ""}
                          onChange={(e) => {
                            const next = [...rows];
                            const arr = [...(next[idx].tax_items || [])];
                            arr[tidx] = {
                              ...arr[tidx],
                              name: e.target.value,
                            };
                            next[idx] = { ...next[idx], tax_items: arr };
                            setRows(next);
                          }}
                        />
                      </div>
                      <div className="col-3">
                        <select
                          className="form-control form-control-sm"
                          value={t.mode || "percent"}
                          onChange={(e) => {
                            const next = [...rows];
                            const arr = [...(next[idx].tax_items || [])];
                            arr[tidx] = {
                              ...arr[tidx],
                              mode: e.target.value,
                            };
                            next[idx] = { ...next[idx], tax_items: arr };
                            setRows(next);
                          }}
                        >
                          <option value="percent">percent</option>
                          <option value="per_night">per_night</option>
                          <option value="flat">flat</option>
                        </select>
                      </div>
                      <div className="col-3">
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          placeholder="Value"
                          value={t.value || ""}
                          onChange={(e) => {
                            const next = [...rows];
                            const arr = [...(next[idx].tax_items || [])];
                            arr[tidx] = {
                              ...arr[tidx],
                              value: e.target.value,
                            };
                            next[idx] = { ...next[idx], tax_items: arr };
                            setRows(next);
                          }}
                        />
                      </div>
                      <div className="col-2 d-flex align-items-center">
                        <input
                          type="checkbox"
                          className=" me-1"
                          style={{ accentColor: "var(--color-secondary)" }}
                          checked={Boolean(t.included)}
                          onChange={(e) => {
                            const next = [...rows];
                            const arr = [...(next[idx].tax_items || [])];
                            arr[tidx] = {
                              ...arr[tidx],
                              included: e.target.checked,
                            };
                            next[idx] = { ...next[idx], tax_items: arr };
                            setRows(next);
                          }}
                        />
                        {tidx > 0 && (
                          <button
                            type="button"
                            className="btn btn-danger btn-sm ms-1"
                            onClick={() => {
                              const next = [...rows];
                              let arr = [...(next[idx].tax_items || [])];
                              arr.splice(tidx, 1);
                              if (arr.length === 0)
                                arr = [{ ...defaultTaxItem }];
                              next[idx] = { ...next[idx], tax_items: arr };
                              setRows(next);
                            }}
                            title="Remove"
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                        )}
                        {tidx === (row.tax_items?.length || 0) - 1 && (
                          <button
                            type="button"
                            className="btn btn-dark btn-sm ms-1"
                            onClick={() => {
                              const next = [...rows];
                              const arr = [...(next[idx].tax_items || [])];
                              arr.push({ ...defaultTaxItem });
                              next[idx] = { ...next[idx], tax_items: arr };
                              setRows(next);
                            }}
                            title="Add"
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-md-12 form-group mt-2">
                  <label>City Tax</label>
                  <div className="row g-2">
                    <div className="col-md-2">
                      <label className="mb-1 small text-muted">Mode</label>
                      <select
                        className="form-control form-control-sm"
                        value={row.city_tax?.mode || ""}
                        onChange={(e) => {
                          const next = [...rows];
                          next[idx] = {
                            ...next[idx],
                            city_tax: {
                              ...(next[idx].city_tax || {}),
                              mode: e.target.value,
                            },
                          };
                          setRows(next);
                        }}
                      >
                        <option value="">-</option>
                        <option value="per_night">per_night</option>
                        <option value="percent">percent</option>
                        <option value="flat">flat</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      <label className="mb-1 small text-muted">Amount</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Amount"
                        value={row.city_tax?.amount || ""}
                        onChange={(e) => {
                          const next = [...rows];
                          next[idx] = {
                            ...next[idx],
                            city_tax: {
                              ...(next[idx].city_tax || {}),
                              amount: e.target.value,
                            },
                          };
                          setRows(next);
                        }}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="mb-1 small text-muted">Currency</label>
                      <LookupSelectWithManage
                        category="currencies"
                        label="Currency"
                        value={row.city_tax?.currency || ""}
                        onChange={(val) => {
                          const next = [...rows];
                          next[idx] = {
                            ...next[idx],
                            city_tax: {
                              ...(next[idx].city_tax || {}),
                              currency: val,
                            },
                          };
                          setRows(next);
                        }}
                        showManage={true}
                      />
                    </div>
                    <div className="col-md-1">
                      <label className="mb-1 small text-muted d-block">
                        Incl.
                      </label>
                      <div className="d-flex align-items-center">
                        <input
                          type="checkbox"
                          style={{ accentColor: "var(--color-secondary)" }}
                          checked={Boolean(row.city_tax?.included)}
                          onChange={(e) => {
                            const next = [...rows];
                            next[idx] = {
                              ...next[idx],
                              city_tax: {
                                ...(next[idx].city_tax || {}),
                                included: e.target.checked,
                              },
                            };
                            setRows(next);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 form-group">
                  <label>Segment</label>
                  <LookupSelectWithManage
                    category="market_segments"
                    label="Segment"
                    value={row.marketSegment}
                    onChange={(val) => {
                      const next = [...rows];
                      next[idx] = { ...next[idx], marketSegment: val };
                      setRows(next);
                    }}
                  />
                </div>
                <div className="col-md-2 form-group">
                  <label>Nationality Bands</label>
                  <LookupSelectWithManage
                    category="nationality_bands"
                    label="Nationality Bands"
                    isMulti
                    value={row.nationalityBands}
                    onChange={(vals) => {
                      const next = [...rows];
                      next[idx] = { ...next[idx], nationalityBands: vals };
                      setRows(next);
                    }}
                  />
                </div>
                <div className="col-md-4 form-group">
                  <label>Inclusions</label>
                  <LookupSelectWithManage
                    category="rate_inclusions"
                    label="Inclusions"
                    isMulti
                    value={row.inclusions}
                    onChange={(vals) => {
                      const next = [...rows];
                      next[idx] = { ...next[idx], inclusions: vals };
                      setRows(next);
                    }}
                  />
                </div>
                <div className="col-md-2 form-group">
                  <label>Rate Type</label>
                  <LookupSelectWithManage
                    category="rate_types"
                    label="Rate Type"
                    value={row.rateType}
                    onChange={(val) => {
                      const next = [...rows];
                      next[idx] = { ...next[idx], rateType: val };
                      setRows(next);
                    }}
                  />
                </div>
                <div className="col-md-2 form-group text-end">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      const next = rows.filter((_, i) => i !== idx);
                      setRows(next.length ? next : [blankRow()]);
                    }}
                  >
                    <i className="fa fa-minus"></i>
                  </button>
                  {idx === rows.length - 1 && (
                    <button
                      type="button"
                      className="btn btn-dark btn-sm ms-2"
                      onClick={() => setRows([...rows, blankRow()])}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
        {(isEdit || isView) && (
          <>
            <div className="form-group mt-2">
              <h5>{isView ? "Rate Details" : "Edit Rate"}</h5>
              <div className="text-muted" style={{ fontSize: 12 }}>
                Edit the details below. Fields are read-only in view mode.
              </div>
            </div>
            {rows.map((row, idx) => (
              <div
                className="card shadow-sm mb-3"
                key={idx}
                style={{ border: "1px solid #e5e7eb" }}
              >
                <div className="card-body">
                  <div className="row align-items-end g-2">
                    <div className="col-md-2 form-group">
                      <label>Season</label>
                      <MultiSelect
                        isSearchable
                        isMulti={false}
                        options={seasonOptions}
                        isLoading={isLoadingSeasons}
                        placeholder="- Select -"
                        value={
                          seasonOptions.find((o) => o.value === row.seasonId) ||
                          null
                        }
                        onChange={(opt) => {
                          if (isView) return;
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
                      <label>Room</label>
                      <MultiSelect
                        isSearchable
                        isMulti={false}
                        options={roomOptions}
                        isLoading={isLoadingRooms}
                        placeholder="- Select -"
                        value={
                          roomOptions.find((o) => o.value === row.roomTypeId) ||
                          null
                        }
                        onChange={(opt) => {
                          if (isView) return;
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
                      <label>Meal Plan</label>
                      <LookupSelectWithManage
                        category="meal_plans"
                        label="Meal Plan"
                        value={row.mealPlan}
                        onChange={(val) => {
                          if (isView) return;
                          const next = [...rows];
                          next[idx] = { ...next[idx], mealPlan: val };
                          setRows(next);
                        }}
                        disabled={isView}
                      />
                    </div>
                    <div className="col-md-2 form-group">
                      <label>Occ Key</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={row.occKey}
                        onChange={(e) => {
                          if (isView) return;
                          const next = [...rows];
                          next[idx] = { ...next[idx], occKey: e.target.value };
                          setRows(next);
                        }}
                        disabled={isView}
                      />
                    </div>
                    <div className="col-md-2 form-group">
                      <label>Base Price</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={row.basePrice}
                        onChange={(e) => {
                          if (isView) return;
                          const next = [...rows];
                          next[idx] = {
                            ...next[idx],
                            basePrice: e.target.value,
                          };
                          setRows(next);
                        }}
                        disabled={isView}
                      />
                    </div>
                    <div className="col-md-2 form-group">
                      <label>Currency</label>
                      <LookupSelectWithManage
                        category="currencies"
                        label="Currency"
                        value={row.currency}
                        onChange={(val) => {
                          if (isView) return;
                          const next = [...rows];
                          next[idx] = { ...next[idx], currency: val };
                          setRows(next);
                        }}
                        showManage={true}
                        disabled={isView}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <h5 className="mb-2">Child Policy</h5>
                    </div>
                    <div className="col-md-3 form-group">
                      <label>Child Free Until</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={row.child_free_until}
                        onChange={(e) => {
                          if (isView) return;
                          const next = [...rows];
                          next[idx] = {
                            ...next[idx],
                            child_free_until: e.target.value,
                          };
                          setRows(next);
                        }}
                        disabled={isView}
                      />
                    </div>
                    <div className="col-md-3 form-group">
                      <label>Child Rate %</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={row.child_rate_pct}
                        onChange={(e) => {
                          if (isView) return;
                          const next = [...rows];
                          next[idx] = {
                            ...next[idx],
                            child_rate_pct: e.target.value,
                          };
                          setRows(next);
                        }}
                        disabled={isView}
                      />
                    </div>
                    <div className="col-md-12 form-group mt-2">
                      <h5 className="mb-2">Extra Bed</h5>
                    </div>
                    <div className="col-md-3 form-group">
                      <label>Extra Bed Adult</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={row.extra_bed_adult}
                        onChange={(e) => {
                          if (isView) return;
                          const next = [...rows];
                          next[idx] = {
                            ...next[idx],
                            extra_bed_adult: e.target.value,
                          };
                          setRows(next);
                        }}
                        disabled={isView}
                      />
                    </div>
                    <div className="col-md-3 form-group">
                      <label>Extra Bed Child</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={row.extra_bed_child}
                        onChange={(e) => {
                          if (isView) return;
                          const next = [...rows];
                          next[idx] = {
                            ...next[idx],
                            extra_bed_child: e.target.value,
                          };
                          setRows(next);
                        }}
                        disabled={isView}
                      />
                    </div>
                    <div className="col-md-12 form-group mt-2">
                      <h5 className="mb-2">Tax Policy</h5>
                    </div>
                    <div className="col-md-12 form-group">
                      <label className="mb-0">Tax Items</label>
                      <div
                        className="row g-1 mb-1 text-muted"
                        style={{ fontSize: 12 }}
                      >
                        <div className="col-4">Name</div>
                        <div className="col-3">Mode</div>
                        <div className="col-3">Value</div>
                        <div className="col-2">Included</div>
                      </div>
                      {(row.tax_items || []).map((t, tidx) => (
                        <div
                          key={tidx}
                          className="row g-1 align-items-center mb-1"
                        >
                          <div className="col-4">
                            <input
                              className="form-control form-control-sm"
                              placeholder="Name"
                              value={t.name || ""}
                              onChange={(e) => {
                                if (isView) return;
                                const next = [...rows];
                                const arr = [...(next[idx].tax_items || [])];
                                arr[tidx] = {
                                  ...arr[tidx],
                                  name: e.target.value,
                                };
                                next[idx] = { ...next[idx], tax_items: arr };
                                setRows(next);
                              }}
                              disabled={isView}
                            />
                          </div>
                          <div className="col-3">
                            <select
                              className="form-control form-control-sm"
                              value={t.mode || "percent"}
                              onChange={(e) => {
                                if (isView) return;
                                const next = [...rows];
                                const arr = [...(next[idx].tax_items || [])];
                                arr[tidx] = {
                                  ...arr[tidx],
                                  mode: e.target.value,
                                };
                                next[idx] = { ...next[idx], tax_items: arr };
                                setRows(next);
                              }}
                              disabled={isView}
                            >
                              <option value="percent">percent</option>
                              <option value="per_night">per_night</option>
                              <option value="flat">flat</option>
                            </select>
                          </div>
                          <div className="col-3">
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              placeholder="Value"
                              value={t.value || ""}
                              onChange={(e) => {
                                if (isView) return;
                                const next = [...rows];
                                const arr = [...(next[idx].tax_items || [])];
                                arr[tidx] = {
                                  ...arr[tidx],
                                  value: e.target.value,
                                };
                                next[idx] = { ...next[idx], tax_items: arr };
                                setRows(next);
                              }}
                              disabled={isView}
                            />
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            <input
                              type="checkbox"
                              className=" me-1"
                              checked={Boolean(t.included)}
                              style={{ accentColor: "var(--color-secondary)" }}
                              onChange={(e) => {
                                if (isView) return;
                                const next = [...rows];
                                const arr = [...(next[idx].tax_items || [])];
                                arr[tidx] = {
                                  ...arr[tidx],
                                  included: e.target.checked,
                                };
                                next[idx] = { ...next[idx], tax_items: arr };
                                setRows(next);
                              }}
                              disabled={isView}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="col-md-12 form-group mt-2">
                      <label>City Tax</label>
                      <div className="row g-2">
                        <div className="col-md-2">
                          <label className="mb-1 small text-muted">Mode</label>
                          <select
                            className="form-control form-control-sm"
                            value={row.city_tax?.mode || ""}
                            onChange={(e) => {
                              if (isView) return;
                              const next = [...rows];
                              next[idx] = {
                                ...next[idx],
                                city_tax: {
                                  ...(next[idx].city_tax || {}),
                                  mode: e.target.value,
                                },
                              };
                              setRows(next);
                            }}
                            disabled={isView}
                          >
                            <option value="">-</option>
                            <option value="per_night">per_night</option>
                            <option value="percent">percent</option>
                            <option value="flat">flat</option>
                          </select>
                        </div>
                        <div className="col-md-2">
                          <label className="mb-1 small text-muted">
                            Amount
                          </label>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="Amount"
                            value={row.city_tax?.amount || ""}
                            onChange={(e) => {
                              if (isView) return;
                              const next = [...rows];
                              next[idx] = {
                                ...next[idx],
                                city_tax: {
                                  ...(next[idx].city_tax || {}),
                                  amount: e.target.value,
                                },
                              };
                              setRows(next);
                            }}
                            disabled={isView}
                          />
                        </div>
                        <div className="col-md-3">
                          <label className="mb-1 small text-muted">
                            Currency
                          </label>
                          <LookupSelectWithManage
                            category="currencies"
                            label="Currency"
                            value={row.city_tax?.currency || ""}
                            onChange={(val) => {
                              if (isView) return;
                              const next = [...rows];
                              next[idx] = {
                                ...next[idx],
                                city_tax: {
                                  ...(next[idx].city_tax || {}),
                                  currency: val,
                                },
                              };
                              setRows(next);
                            }}
                            showManage={true}
                            disabled={isView}
                          />
                        </div>
                        <div className="col-md-1">
                          <label className="mb-1 small text-muted d-block">
                            Incl.
                          </label>
                          <div className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              style={{ accentColor: "var(--color-secondary)" }}
                              checked={Boolean(row.city_tax?.included)}
                              onChange={(e) => {
                                if (isView) return;
                                const next = [...rows];
                                next[idx] = {
                                  ...next[idx],
                                  city_tax: {
                                    ...(next[idx].city_tax || {}),
                                    included: e.target.checked,
                                  },
                                };
                                setRows(next);
                              }}
                              disabled={isView}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 form-group">
                      <label>Segment</label>
                      <LookupSelectWithManage
                        category="market_segments"
                        label="Segment"
                        value={row.marketSegment}
                        onChange={(val) => {
                          if (isView) return;
                          const next = [...rows];
                          next[idx] = { ...next[idx], marketSegment: val };
                          setRows(next);
                        }}
                        disabled={isView}
                      />
                    </div>
                    <div className="col-md-2 form-group">
                      <label>Nationality Bands</label>
                      <LookupSelectWithManage
                        category="nationality_bands"
                        label="Nationality Bands"
                        isMulti
                        value={row.nationalityBands}
                        onChange={(vals) => {
                          if (isView) return;
                          const next = [...rows];
                          next[idx] = { ...next[idx], nationalityBands: vals };
                          setRows(next);
                        }}
                        disabled={isView}
                      />
                    </div>
                    <div className="col-md-4 form-group">
                      <label>Inclusions</label>
                      <LookupSelectWithManage
                        category="rate_inclusions"
                        label="Inclusions"
                        isMulti
                        value={row.inclusions}
                        onChange={(vals) => {
                          if (isView) return;
                          const next = [...rows];
                          next[idx] = { ...next[idx], inclusions: vals };
                          setRows(next);
                        }}
                        disabled={isView}
                      />
                    </div>
                    <div className="col-md-2 form-group">
                      <label>Rate Type</label>
                      <LookupSelectWithManage
                        category="rate_types"
                        label="Rate Type"
                        value={row.rateType}
                        onChange={(val) => {
                          if (isView) return;
                          const next = [...rows];
                          next[idx] = { ...next[idx], rateType: val };
                          setRows(next);
                        }}
                        disabled={isView}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
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
