import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import LookupSelectWithManage from "../lookups/LookupSelectWithManage";
import {
  listHotels,
  createContract,
  updateContract,
} from "../../Apis/hotelExtranetApi";
import Constants from "../../constants/routes";

const defaultContract = {
  hotelId: "",
  name: "",
  contract_code: "",
  status: "active",
  start_date: "",
  end_date: "",
  reference: "",
  currency: "",
  type: "FIT",
  commission: { type: "percent", value: 0 },
  payment_terms: "",
  release_period_days: 0,
  markup_rules: [],
  signing_date: "",
  description: "",
};

export default function HotelExtranetContractForm({
  mode = "create",
  initialValue,
  onSubmit,
  submitting = false,
  wizardConfig = null,
  baseDefaults = null,
}) {
  const computedDefaults = useMemo(() => {
    if (baseDefaults && typeof baseDefaults === "object") {
      return { ...defaultContract, ...baseDefaults };
    }
    return defaultContract;
  }, [baseDefaults]);
  const [form, setForm] = useState(initialValue || computedDefaults);
  const [hotelOptions, setHotelOptions] = useState([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const [newRule, setNewRule] = useState({
    scope: "market",
    market: "",
    channel: "",
    segment: "",
    nationality: "",
    from: "",
    to: "",
    type: "percent",
    currency: "",
    markup: 0,
  });
  const [newCancellation, setNewCancellation] = useState({
    days_before: 0,
    penalty: { type: "percent", value: 0, currency: "" },
  });
  const [submitIntent, setSubmitIntent] = useState("save");
  const submitIntentRef = useRef("save");
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
  const clearFieldError = (key) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  useEffect(() => {
    setForm(initialValue || computedDefaults);
  }, [initialValue, computedDefaults]);

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

  const onChange = (field, value) => {
    if (isView) return;
    setForm((prev) => ({ ...prev, [field]: value }));
    clearFieldError(field);
  };

  const validate = () => {
    const err = {};
    if (!form.hotelId && !isEdit) err.hotelId = "Hotel is required";
    if (!form.name || !String(form.name).trim())
      err.name = "Contract name is required";
    if (!form.start_date) err.start_date = "Start date is required";
    if (!form.end_date) err.end_date = "End date is required";
    if (form.start_date && form.end_date) {
      const start = new Date(form.start_date);
      const end = new Date(form.end_date);
      if (end < start) {
        err.end_date = "End date must be after start date";
      }
    }
    if (!form.currency) err.currency = "Currency is required";
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
    try {
      console.log("Submitting contract payload", form);
    } catch {}
    if (onSubmit) {
      onSubmit(form, intent);
      return;
    }
    // Fallback: call API directly if parent didn't provide onSubmit
    try {
      if (mode === "create") {
        const { hotelId, ...payload } = form; // send hotelId as path param only
        const res = await createContract(hotelId, payload);
        try {
          console.log("Form fallback createContract response", res);
        } catch {}
        if (res?.status === 201 || res?.status === 200) {
          toast.success("Contract created successfully");
          window.location.href =
            Constants.URLConstants.HOTELSEXTRANETCONTRACTSLIST;
        } else {
          toast.error(res?.data?.message || "Failed to create contract");
        }
      } else if (mode === "edit") {
        const contractId =
          initialValue?.id || initialValue?._id || initialValue?.contractId;
        if (!contractId) {
          toast.error("Missing contract id");
          return;
        }
        const { hotelId: _hid, ...payload } = form;
        const res = await updateContract(contractId, payload);
        try {
          console.log("Form fallback updateContract response", res);
        } catch {}
        if (res?.status === 200) {
          toast.success("Contract updated successfully");
          window.location.href =
            Constants.URLConstants.HOTELSEXTRANETCONTRACTSLIST;
        } else {
          toast.error(res?.data?.message || "Failed to update contract");
        }
      }
    } catch (err) {
      try {
        console.error("Form fallback submit error", err);
      } catch {}
      toast.error("Contract save failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
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
              className="custom-select"
              value={hotelOptions.find((o) => o.value === form.hotelId) || null}
              onChange={(opt) => onChange("hotelId", opt ? opt.value : "")}
              isDisabled={isView || isEdit}
              isInvalid={Boolean(errors.hotelId)}
            />
            {errors.hotelId ? (
              <div className="invalid-feedback d-block">{errors.hotelId}</div>
            ) : null}
          </div>
          <div className="col-md-4 form-group">
            <label>
              Contract Name <span className="text-danger">*</span>
            </label>
            <input
              ref={registerField("name")}
              type="text"
              className={`form-control form-control-sm ${
                errors.name ? "is-invalid" : ""
              }`}
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
              disabled={isView}
            />
            {errors.name ? (
              <div className="invalid-feedback d-block">{errors.name}</div>
            ) : null}
          </div>
          <div className="col-md-4 form-group">
            <label>Status</label>
            <LookupSelectWithManage
              category="hotel_statuses"
              label="Status"
              value={form.status}
              onChange={(val) => onChange("status", val)}
              disabled={isView}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-3 form-group">
            <label>Type</label>
            <div className="d-flex align-items-center" style={{ gap: 8 }}>
              {["FIT", "Static", "Dynamic"].map((t) => (
                <label key={t}>
                  <input
                    type="radio"
                    name="ctype"
                    style={{
                      accentColor: "var(--color-secondary)",
                      verticalAlign: "middle",
                    }}
                    checked={form.type === t}
                    onChange={() => onChange("type", t)}
                    disabled={isView}
                  />{" "}
                  {t}
                </label>
              ))}
            </div>
          </div>
          <div className="col-md-3 form-group">
            <label>Commission</label>
            <div className="input-group input-group-sm">
              <select
                className="form-control form-control-sm"
                value={form.commission?.type || "percent"}
                onChange={(e) =>
                  onChange("commission", {
                    ...(form.commission || {}),
                    type: e.target.value,
                  })
                }
                disabled={isView}
              >
                <option value="percent">percent</option>
                <option value="flat">flat</option>
                <option value="net">net</option>
              </select>
              {form.commission?.type !== "net" && (
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="value"
                  value={form.commission?.value || 0}
                  onChange={(e) =>
                    onChange("commission", {
                      ...(form.commission || {}),
                      value: parseFloat(e.target.value) || 0,
                    })
                  }
                  disabled={isView}
                />
              )}
            </div>
          </div>
          <div className="col-md-3 form-group">
            <label>Payment Terms</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={form.payment_terms}
              onChange={(e) => onChange("payment_terms", e.target.value)}
              disabled={isView}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-2 form-group">
            <label>Release Days</label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={form.release_period_days}
              onChange={(e) =>
                onChange(
                  "release_period_days",
                  parseInt(e.target.value, 10) || 0
                )
              }
              disabled={isView}
            />
          </div>
          <div className="col-md-2 form-group">
            <label>Effective From</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={form.effective_from || ""}
              onChange={(e) => onChange("effective_from", e.target.value)}
              disabled={isView}
            />
          </div>
          <div className="col-md-2 form-group">
            <label>Effective To</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={form.effective_to || ""}
              onChange={(e) => onChange("effective_to", e.target.value)}
              disabled={isView}
            />
          </div>
          <div className="col-md-12 form-group mt-3">
            <h5>Markup Rules</h5>
            <div className="row g-2 align-items-end">
              <div className="col-md-2">
                <label>Scope</label>
                <select
                  className="form-control form-control-sm"
                  value={newRule.scope}
                  onChange={(e) =>
                    setNewRule((r) => ({ ...r, scope: e.target.value }))
                  }
                  disabled={isView}
                >
                  <option value="market">Market</option>
                  <option value="channel">Channel</option>
                  <option value="both">Market + Channel</option>
                </select>
              </div>
              {(newRule.scope === "market" || newRule.scope === "both") && (
                <div className="col-md-2">
                  <label>Market</label>
                  <LookupSelectWithManage
                    category="markets"
                    label="Market"
                    value={newRule.market}
                    onChange={(val) =>
                      setNewRule((r) => ({ ...r, market: val }))
                    }
                    disabled={isView}
                    showManage={true}
                  />
                </div>
              )}
              {(newRule.scope === "channel" || newRule.scope === "both") && (
                <div className="col-md-2">
                  <label>Channel</label>
                  <LookupSelectWithManage
                    category="channels"
                    label="Channel"
                    value={newRule.channel}
                    onChange={(val) =>
                      setNewRule((r) => ({ ...r, channel: val }))
                    }
                    disabled={isView}
                    showManage={true}
                  />
                </div>
              )}
              <div className="col-md-2">
                <label>Segment</label>
                <LookupSelectWithManage
                  category="market_segments"
                  label="Segment"
                  value={newRule.segment}
                  onChange={(val) =>
                    setNewRule((r) => ({ ...r, segment: val }))
                  }
                  disabled={isView}
                  showManage={true}
                />
              </div>
              <div className="col-md-2">
                <label>Nationality</label>
                <LookupSelectWithManage
                  category="nationality_bands"
                  label="Nationality"
                  value={newRule.nationality}
                  onChange={(val) =>
                    setNewRule((r) => ({ ...r, nationality: val }))
                  }
                  disabled={isView}
                  showManage={true}
                />
              </div>
              <div className="col-md-2">
                <label>From</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={newRule.from}
                  onChange={(e) =>
                    setNewRule((r) => ({ ...r, from: e.target.value }))
                  }
                  disabled={isView}
                />
              </div>
              <div className="col-md-2">
                <label>To</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={newRule.to}
                  onChange={(e) =>
                    setNewRule((r) => ({ ...r, to: e.target.value }))
                  }
                  disabled={isView}
                />
              </div>
              <div className="col-md-2">
                <label>Type</label>
                <select
                  className="form-control form-control-sm"
                  value={newRule.type}
                  onChange={(e) =>
                    setNewRule((r) => ({ ...r, type: e.target.value }))
                  }
                  disabled={isView}
                >
                  <option value="percent">percent</option>
                  <option value="fixed">fixed</option>
                </select>
              </div>
              {newRule.type === "fixed" && (
                <div className="col-md-2">
                  <label>Currency</label>
                  <LookupSelectWithManage
                    category="currencies"
                    label="Currency"
                    value={newRule.currency}
                    onChange={(val) =>
                      setNewRule((r) => ({ ...r, currency: val }))
                    }
                    disabled={isView}
                    showManage={false}
                  />
                </div>
              )}
              <div className="col-md-2">
                <label>
                  {newRule.type === "fixed" ? "Amount" : "Markup %"}
                </label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={newRule.markup}
                  onChange={(e) =>
                    setNewRule((r) => ({
                      ...r,
                      markup: parseFloat(e.target.value) || 0,
                    }))
                  }
                  disabled={isView}
                />
              </div>
              {!isView && (
                <div className="col-md-2">
                  <label>&nbsp;</label>
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    onClick={() => {
                      const base = {};
                      if (
                        (newRule.scope === "market" ||
                          newRule.scope === "both") &&
                        newRule.market
                      )
                        base.market = newRule.market;
                      if (
                        (newRule.scope === "channel" ||
                          newRule.scope === "both") &&
                        newRule.channel
                      )
                        base.channel = newRule.channel;
                      if (Object.keys(base).length === 0) {
                        return;
                      }
                      const opt = {};
                      if (newRule.segment) opt.segment = newRule.segment;
                      if (newRule.nationality)
                        opt.nationality = newRule.nationality;
                      if (newRule.from) opt.from = newRule.from;
                      if (newRule.to) opt.to = newRule.to;
                      if (newRule.type) opt.type = newRule.type;
                      if (newRule.type === "fixed" && newRule.currency)
                        opt.currency = newRule.currency;
                      const obj = { ...base, ...opt, markup: newRule.markup };
                      onChange("markup_rules", [
                        ...(form.markup_rules || []),
                        obj,
                      ]);
                      setNewRule({
                        scope: "market",
                        market: "",
                        channel: "",
                        segment: "",
                        nationality: "",
                        from: "",
                        to: "",
                        type: "percent",
                        currency: "",
                        markup: 0,
                      });
                    }}
                    title="Add rule"
                  >
                    <i className="fa fa-plus" />
                  </button>
                </div>
              )}
            </div>
            {(form.markup_rules || []).length ? (
              <div className="mt-2 table-responsive">
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th style={{ minWidth: 110 }}>Kind</th>
                      <th style={{ minWidth: 180 }}>Value</th>
                      <th style={{ minWidth: 160 }}>Segment</th>
                      <th style={{ minWidth: 160 }}>Nationality</th>
                      <th style={{ minWidth: 130 }}>From</th>
                      <th style={{ minWidth: 130 }}>To</th>
                      <th style={{ minWidth: 120 }}>Markup %</th>
                      <th style={{ width: 80 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {(form.markup_rules || []).map((r, idx) => {
                      const kind = r.market
                        ? "market"
                        : r.channel
                        ? "channel"
                        : "market";
                      const value = r.market || r.channel || "";
                      return (
                        <tr key={idx}>
                          <td>
                            <select
                              className="form-control form-control-sm"
                              value={kind}
                              onChange={(e) => {
                                const k = e.target.value;
                                const v = value;
                                const next = [...form.markup_rules];
                                next[idx] =
                                  k === "market"
                                    ? {
                                        market: v,
                                        markup: r.markup,
                                        segment: r.segment,
                                        nationality: r.nationality,
                                        from: r.from,
                                        to: r.to,
                                      }
                                    : {
                                        channel: v,
                                        markup: r.markup,
                                        segment: r.segment,
                                        nationality: r.nationality,
                                        from: r.from,
                                        to: r.to,
                                      };
                                onChange("markup_rules", next);
                              }}
                              disabled={isView}
                            >
                              <option value="market">Market</option>
                              <option value="channel">Channel</option>
                            </select>
                          </td>
                          <td>
                            {kind === "market" ? (
                              <LookupSelectWithManage
                                category="markets"
                                label="Market"
                                value={value}
                                onChange={(val) => {
                                  const next = [...form.markup_rules];
                                  next[idx] = {
                                    market: val,
                                    markup: r.markup,
                                    segment: r.segment,
                                    nationality: r.nationality,
                                    from: r.from,
                                    to: r.to,
                                  };
                                  onChange("markup_rules", next);
                                }}
                                disabled={isView}
                                showManage={true}
                              />
                            ) : (
                              <LookupSelectWithManage
                                category="channels"
                                label="Channel"
                                value={value}
                                onChange={(val) => {
                                  const next = [...form.markup_rules];
                                  next[idx] = {
                                    channel: val,
                                    markup: r.markup,
                                    segment: r.segment,
                                    nationality: r.nationality,
                                    from: r.from,
                                    to: r.to,
                                  };
                                  onChange("markup_rules", next);
                                }}
                                disabled={isView}
                                showManage={true}
                              />
                            )}
                          </td>
                          <td>
                            <LookupSelectWithManage
                              category="market_segments"
                              label="Segment"
                              value={r.segment || ""}
                              onChange={(val) => {
                                const next = [...form.markup_rules];
                                next[idx] = {
                                  ...(kind === "market"
                                    ? { market: value }
                                    : { channel: value }),
                                  segment: val,
                                  nationality: r.nationality,
                                  from: r.from,
                                  to: r.to,
                                  markup: r.markup,
                                };
                                onChange("markup_rules", next);
                              }}
                              disabled={isView}
                              showManage={true}
                            />
                          </td>
                          <td>
                            <LookupSelectWithManage
                              category="nationality_bands"
                              label="Nationality"
                              value={r.nationality || ""}
                              onChange={(val) => {
                                const next = [...form.markup_rules];
                                next[idx] = {
                                  ...(kind === "market"
                                    ? { market: value }
                                    : { channel: value }),
                                  segment: r.segment,
                                  nationality: val,
                                  from: r.from,
                                  to: r.to,
                                  markup: r.markup,
                                };
                                onChange("markup_rules", next);
                              }}
                              disabled={isView}
                              showManage={true}
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              className="form-control form-control-sm"
                              value={r.from || ""}
                              onChange={(e) => {
                                const next = [...form.markup_rules];
                                next[idx] = {
                                  ...(kind === "market"
                                    ? { market: value }
                                    : { channel: value }),
                                  segment: r.segment,
                                  nationality: r.nationality,
                                  from: e.target.value,
                                  to: r.to,
                                  markup: r.markup,
                                };
                                onChange("markup_rules", next);
                              }}
                              disabled={isView}
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              className="form-control form-control-sm"
                              value={r.to || ""}
                              onChange={(e) => {
                                const next = [...form.markup_rules];
                                next[idx] = {
                                  ...(kind === "market"
                                    ? { market: value }
                                    : { channel: value }),
                                  segment: r.segment,
                                  nationality: r.nationality,
                                  from: r.from,
                                  to: e.target.value,
                                  markup: r.markup,
                                };
                                onChange("markup_rules", next);
                              }}
                              disabled={isView}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={r.markup}
                              onChange={(e) => {
                                const next = [...form.markup_rules];
                                next[idx] = {
                                  ...(kind === "market"
                                    ? { market: value }
                                    : { channel: value }),
                                  segment: r.segment,
                                  nationality: r.nationality,
                                  from: r.from,
                                  to: r.to,
                                  markup: parseFloat(e.target.value) || 0,
                                };
                                onChange("markup_rules", next);
                              }}
                              disabled={isView}
                            />
                          </td>
                          <td>
                            {!isView && (
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  const next = form.markup_rules.filter(
                                    (_, i) => i !== idx
                                  );
                                  onChange("markup_rules", next);
                                }}
                                title="Remove"
                              >
                                <i className="fa fa-minus" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 form-group">
            <label>Cancellation Rules</label>
            <div className="row g-2 align-items-end">
              <div className="col-md-2">
                <label>Days before</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={newCancellation.days_before}
                  onChange={(e) =>
                    setNewCancellation((r) => ({
                      ...r,
                      days_before: parseInt(e.target.value, 10) || 0,
                    }))
                  }
                  disabled={isView}
                />
              </div>
              <div className="col-md-2">
                <label>Penalty type</label>
                <select
                  className="form-control form-control-sm"
                  value={newCancellation.penalty.type}
                  onChange={(e) =>
                    setNewCancellation((r) => ({
                      ...r,
                      penalty: { ...r.penalty, type: e.target.value },
                    }))
                  }
                  disabled={isView}
                >
                  <option value="percent">percent</option>
                  <option value="nights">nights</option>
                  <option value="amount">amount</option>
                </select>
              </div>
              <div className="col-md-2">
                <label>
                  {newCancellation.penalty.type === "percent"
                    ? "Percent %"
                    : newCancellation.penalty.type === "nights"
                    ? "Nights"
                    : "Amount"}
                </label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={newCancellation.penalty.value}
                  onChange={(e) =>
                    setNewCancellation((r) => ({
                      ...r,
                      penalty: {
                        ...r.penalty,
                        value: parseFloat(e.target.value) || 0,
                      },
                    }))
                  }
                  disabled={isView}
                />
              </div>
              {newCancellation.penalty.type === "amount" && (
                <div className="col-md-2">
                  <label>Currency</label>
                  <LookupSelectWithManage
                    category="currencies"
                    label="Currency"
                    value={newCancellation.penalty.currency}
                    onChange={(val) =>
                      setNewCancellation((r) => ({
                        ...r,
                        penalty: { ...r.penalty, currency: val },
                      }))
                    }
                    disabled={isView}
                    showManage={false}
                  />
                </div>
              )}
              {!isView && (
                <div className="col-md-2">
                  <label>&nbsp;</label>
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    onClick={() => {
                      const rule = {
                        days_before: newCancellation.days_before,
                        penalty: {
                          type: newCancellation.penalty.type,
                          value: newCancellation.penalty.value,
                          ...(newCancellation.penalty.type === "amount" &&
                          newCancellation.penalty.currency
                            ? { currency: newCancellation.penalty.currency }
                            : {}),
                        },
                      };
                      onChange("cancellation_rules", [
                        ...(form.cancellation_rules || []),
                        rule,
                      ]);
                      setNewCancellation({
                        days_before: 0,
                        penalty: { type: "percent", value: 0, currency: "" },
                      });
                    }}
                    title="Add rule"
                  >
                    <i className="fa fa-plus" />
                  </button>
                </div>
              )}
            </div>
            {(form.cancellation_rules || []).length ? (
              <div className="mt-2">
                {(form.cancellation_rules || []).map((r, idx) => (
                  <div key={idx} className="row g-2 align-items-center mb-1">
                    <div className="col-md-2">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={r.days_before}
                        onChange={(e) => {
                          const next = [...form.cancellation_rules];
                          next[idx] = {
                            ...next[idx],
                            days_before: parseInt(e.target.value, 10) || 0,
                          };
                          onChange("cancellation_rules", next);
                        }}
                        disabled={isView}
                      />
                    </div>
                    <div className="col-md-2">
                      <select
                        className="form-control form-control-sm"
                        value={r.penalty?.type || "percent"}
                        onChange={(e) => {
                          const next = [...form.cancellation_rules];
                          next[idx] = {
                            ...next[idx],
                            penalty: {
                              ...(r.penalty || {}),
                              type: e.target.value,
                            },
                          };
                          onChange("cancellation_rules", next);
                        }}
                        disabled={isView}
                      >
                        <option value="percent">percent</option>
                        <option value="nights">nights</option>
                        <option value="amount">amount</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={r.penalty?.value || 0}
                        onChange={(e) => {
                          const next = [...form.cancellation_rules];
                          next[idx] = {
                            ...next[idx],
                            penalty: {
                              ...(r.penalty || {}),
                              value: parseFloat(e.target.value) || 0,
                            },
                          };
                          onChange("cancellation_rules", next);
                        }}
                        disabled={isView}
                      />
                    </div>
                    {r.penalty?.type === "amount" && (
                      <div className="col-md-2">
                        <LookupSelectWithManage
                          category="currencies"
                          label="Currency"
                          value={r.penalty?.currency || ""}
                          onChange={(val) => {
                            const next = [...form.cancellation_rules];
                            next[idx] = {
                              ...next[idx],
                              penalty: { ...(r.penalty || {}), currency: val },
                            };
                            onChange("cancellation_rules", next);
                          }}
                          disabled={isView}
                          showManage={false}
                        />
                      </div>
                    )}
                    {!isView && (
                      <div className="col-md-2">
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            const next = form.cancellation_rules.filter(
                              (_, i) => i !== idx
                            );
                            onChange("cancellation_rules", next);
                          }}
                          title="Remove"
                        >
                          <i className="fa fa-minus" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="row mt-3">
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
              onChange={(e) => onChange("start_date", e.target.value)}
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
              onChange={(e) => onChange("end_date", e.target.value)}
              disabled={isView}
            />
            {errors.end_date ? (
              <div className="invalid-feedback d-block">{errors.end_date}</div>
            ) : null}
          </div>
          <div className="col-md-3 form-group">
            <label>Signing Date</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={form.signing_date}
              onChange={(e) => onChange("signing_date", e.target.value)}
              disabled={isView}
            />
          </div>
          <div className="col-md-3 form-group">
            <label>Reference</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={form.reference}
              onChange={(e) => onChange("reference", e.target.value)}
              disabled={isView}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4 form-group" ref={registerField("currency")}>
            <label>
              Currency <span className="text-danger">*</span>
            </label>
            <LookupSelectWithManage
              category="currencies"
              label="Currency"
              value={form.currency}
              onChange={(val) => onChange("currency", val)}
              disabled={isView}
              isInvalid={Boolean(errors.currency)}
              errorMessage={errors.currency}
            />
          </div>
          <div className="col-md-8 form-group">
            <label>Description</label>
            <textarea
              rows={2}
              className="form-control form-control-sm"
              value={form.description}
              onChange={(e) => onChange("description", e.target.value)}
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
