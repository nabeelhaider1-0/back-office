import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import {
  listHotelReadiness,
  getHotelReadiness,
  publishHotel,
  getHotelSyncJobs,
} from "../../Apis/hotelExtranetApi";
import {
  startWizardState,
  updateWizardState,
} from "../hotelWizard/hotelProfileWizardUtils";
import "./HotelReadinessList.css";

const WIZARD_STEP_ORDER = [
  "hotel",
  "rooms",
  "seasons",
  "contracts",
  "rates",
  "allotments",
  "restrictions",
  "blackouts",
  "promotions",
  "media",
];

const HOTEL_SECTION_BLUEPRINT = [
  { key: "hotel_profile", label: "Hotel profile", required: true },
  { key: "rooms", label: "Rooms & inventory", required: true },
  { key: "hotel_seasons", label: "Seasons", required: true },
  { key: "contracts", label: "Contracts", required: true },
  { key: "rates", label: "Rates", required: true },
  { key: "allotments", label: "Allotments", required: true },
  { key: "restrictions", label: "Restrictions", required: true },
  { key: "blackouts", label: "Blackouts", required: false },
  { key: "promotions", label: "Promotions", required: false },
  { key: "media", label: "Media", required: false },
];

const CONTRACT_SECTION_KEY_MAP = {
  contract_core: "contracts",
  contracts: "contracts",
  hotel_profile: "hotel_profile",
  rooms: "rooms",
  seasons: "hotel_seasons",
  rates: "rates",
  allotments: "allotments",
  restrictions: "restrictions",
  blackouts: "blackouts",
  promotions: "promotions",
  media: "media",
};

const deriveSectionFromContracts = (sectionKey, row = {}) => {
  if (!row || !Array.isArray(row.contracts)) return null;
  if (sectionKey === "contracts") {
    if (!row.contracts.length) {
      return {
        status: "missing",
        missingReasons: ["No contracts created yet"],
      };
    }
    return {
      status: "complete",
      missingReasons: [],
    };
  }
  const collected = [];
  row.contracts.forEach((contract) => {
    (contract.sections || []).forEach((section) => {
      const mapped = CONTRACT_SECTION_KEY_MAP[section.key];
      if (mapped === sectionKey) {
        collected.push(section);
      }
    });
  });
  if (!collected.length) return null;
  const statuses = collected.map((section) => section.status || "missing");
  let status = "complete";
  if (statuses.every((value) => value === "complete")) status = "complete";
  else if (statuses.every((value) => value === "missing")) status = "missing";
  else status = "partial";
  const missingReasons = collected
    .flatMap((section) => section.missingReasons || [])
    .filter(Boolean);
  return {
    status,
    missingReasons,
  };
};

const normalizeSections = (sections = [], row = {}) => {
  const map = new Map();
  sections.forEach((section) => {
    const key =
      section?.key || section?.id || section?.name || section?.section;
    if (!key) return;
    map.set(key, { ...section, key });
  });

  return HOTEL_SECTION_BLUEPRINT.map((template) => {
    const existing = map.get(template.key);
    if (existing) {
      const missingReasons = Array.isArray(existing.missingReasons)
        ? existing.missingReasons
        : existing.missingReasons
        ? [existing.missingReasons]
        : [];
      return {
        ...template,
        ...existing,
        key: template.key,
        label: existing.label || existing.name || template.label,
        status: existing.status || "missing",
        missingReasons,
        counts: existing.counts || {},
      };
    }
    const derived = deriveSectionFromContracts(template.key, row);
    if (derived) {
      return {
        ...template,
        status: derived.status,
        missingReasons: derived.missingReasons || [],
        counts: {},
      };
    }
    return {
      ...template,
      status: "missing",
      missingReasons: [],
      counts: {},
    };
  });
};

const mergeBlockingSections = (sections = [], provided = []) => {
  const merged = new Set(Array.isArray(provided) ? provided : []);
  sections.forEach((section) => {
    if (section.required && section.status !== "complete") {
      merged.add(section.key);
    }
  });
  return Array.from(merged);
};

const expandFocusSteps = (steps = []) => {
  const set = new Set(steps.filter(Boolean));
  if (set.has("contracts")) {
    const contractIndex = WIZARD_STEP_ORDER.indexOf("contracts");
    if (contractIndex !== -1) {
      WIZARD_STEP_ORDER.slice(contractIndex + 1).forEach((step) =>
        set.add(step)
      );
    }
  }
  return Array.from(set);
};

const augmentReadinessRow = (row = {}) => {
  const normalizedSections = normalizeSections(row.sections || [], row);
  const blockingSections = mergeBlockingSections(
    normalizedSections,
    row.blockingSections
  );
  return {
    ...row,
    sections: normalizedSections,
    blockingSections,
    missingSections: normalizedSections
      .filter((section) => section.status !== "complete")
      .map((section) => section.key),
  };
};

const STATUS_OPTIONS = [
  { label: "All statuses", value: "" },
  { label: "Draft", value: "draft" },
  { label: "Pending", value: "pending" },
  { label: "Published", value: "published" },
];

export default function HotelReadinessList({ setShowHeaderAndMenuBar }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceTimer = useRef(null);

  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [publishingHotelId, setPublishingHotelId] = useState(null);
  const [syncStatuses, setSyncStatuses] = useState({});
  const syncPollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);

  // Clear any running sync polling timer on unmount
  useEffect(() => {
    return () => {
      if (syncPollRef.current) {
        clearInterval(syncPollRef.current);
        syncPollRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await listHotelReadiness({
          page,
          size,
          status: statusFilter || undefined,
          q: debouncedSearch || undefined,
        });
        const items = Array.isArray(res?.items)
          ? res.items
          : Array.isArray(res?.data?.items)
          ? res.data.items
          : Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];
        setRows(items.map((row) => augmentReadinessRow(row)));
        const total = Number(
          res?.total || res?.meta?.total || res?.data?.total || 0
        );
        const limit = Number(res?.size || res?.meta?.size || size);
        if (total && limit) {
          setTotalPages(Math.max(1, Math.ceil(total / limit)));
        } else if (items.length < size && page === 1) {
          setTotalPages(1);
        } else {
          setTotalPages(page + (items.length === size ? 1 : 0));
        }
      } catch (err) {
        console.error("Failed to load readiness list", err);
        setError("Failed to load readiness data");
        setRows([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, size, statusFilter, debouncedSearch]);

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 300);
  };

  const openDetail = async (hotel) => {
    if (!hotel) return;
    setDetail(null);
    setDetailLoading(true);
    try {
      const res = await getHotelReadiness(
        hotel.id || hotel.hotelId || hotel.hotel_id,
        {
          refreshContracts: true,
        }
      );
      const detailData = augmentReadinessRow(res?.data || res || {});
      setDetail(detailData);
    } catch (err) {
      console.error("Failed to load readiness detail", err);
      toast.error("Failed to load readiness detail");
    } finally {
      setDetailLoading(false);
    }
  };

  const fetchSyncStatus = async (hotelId) => {
    try {
      const res = await getHotelSyncJobs(hotelId);
      const payload = res?.data || res;
      const jobs = Array.isArray(payload?.items)
        ? payload.items
        : Array.isArray(payload)
        ? payload
        : [];
      if (!jobs.length) {
        setSyncStatuses((prev) => ({ ...prev, [hotelId]: null }));
        return null;
      }
      const latest = jobs[0];
      const rawStatus = (latest?.status || "").toLowerCase();
      let status = "in_progress";
      if (
        rawStatus === "success" ||
        rawStatus === "succeeded" ||
        rawStatus === "done"
      ) {
        status = "success";
      } else if (rawStatus === "failed" || rawStatus === "error") {
        status = "failed";
      }
      setSyncStatuses((prev) => {
        const prevStatus = prev[hotelId] || null;
        // Fire toasts only when status transitions, so we don't spam notifications
        if (status !== prevStatus) {
          if (status === "in_progress") {
            toast.info(
              "Hotel publish sync started. We’ll update you when it completes.",
              {
                autoClose: 3500,
                position: "bottom-right",
                theme: "colored",
              }
            );
          } else if (status === "success") {
            toast.success("Hotel published and synced successfully.", {
              autoClose: 4000,
              position: "bottom-right",
              theme: "colored",
            });
          } else if (status === "failed") {
            toast.error(
              "Hotel publish sync failed. Please review the logs or try again.",
              {
                autoClose: 5000,
                position: "bottom-right",
                theme: "colored",
              }
            );
          }
        }
        return { ...prev, [hotelId]: status };
      });
      return status;
    } catch (err) {
      console.error("Failed to read sync jobs", err);
      setSyncStatuses((prev) => ({ ...prev, [hotelId]: null }));
      return null;
    }
  };

  const startSyncPolling = (hotelId) => {
    if (!hotelId) return;
    if (syncPollRef.current) {
      clearInterval(syncPollRef.current);
      syncPollRef.current = null;
    }
    let attempts = 0;
    const maxAttempts = 20;
    const timerId = setInterval(async () => {
      attempts += 1;
      const status = await fetchSyncStatus(hotelId);
      if (
        status === "success" ||
        status === "failed" ||
        attempts >= maxAttempts
      ) {
        clearInterval(timerId);
        syncPollRef.current = null;
      }
    }, 5000);
    syncPollRef.current = timerId;
  };

  const handlePublishHotel = async (row) => {
    if (!row) return;
    const hotelId = row.hotelId || row.id || row.hotel_id;
    if (!hotelId) return;
    const actorId = window?.localStorage?.getItem("userId");
    const payload = actorId ? { actor_id: actorId } : {};
    setPublishingHotelId(hotelId);
    try {
      const res = await publishHotel(hotelId, payload);
      const ok = res?.status >= 200 && res?.status < 300;
      if (ok) {
        toast.success("Publishing job started for this hotel.", {
          autoClose: 3000,
          position: "bottom-right",
          theme: "colored",
        });
        // Refresh only this hotel's readiness row so there is no full-table blink.
        try {
          const readinessRes = await getHotelReadiness(hotelId, {
            refreshContracts: true,
          });
          const updated = augmentReadinessRow(
            readinessRes?.data || readinessRes || {}
          );
          setRows((prev) =>
            prev.map((r) =>
              (r.hotelId || r.id || r.hotel_id) ===
              (updated.hotelId || updated.id || updated.hotel_id)
                ? updated
                : r
            )
          );
        } catch (detailErr) {
          console.error(
            "Failed to refresh single hotel readiness after publish",
            detailErr
          );
        }
        // Immediately read sync status once, then start polling so toasts
        // can reflect "Syncing" → "Synced" / "Sync failed".
        fetchSyncStatus(hotelId);
        startSyncPolling(hotelId);
      } else {
        throw new Error(res?.data?.message || "Failed to trigger publish");
      }
    } catch (err) {
      console.error("Failed to publish hotel", err);
      toast.error("Unable to start hotel publish. Please try again.", {
        autoClose: 4000,
        position: "bottom-right",
        theme: "colored",
      });
    } finally {
      setPublishingHotelId(null);
    }
  };

  const formatLocation = (row) => {
    const city =
      row.city ||
      row.hotelCity ||
      row.location?.city ||
      row.address?.city ||
      row.cityName ||
      row.summaryEntries?.[0]?.city ||
      null;
    const country =
      row.country ||
      row.hotelCountry ||
      row.location?.country ||
      row.address?.country ||
      row.countryName ||
      row.summaryEntries?.[0]?.country ||
      null;
    if (!city && !country) return "Not provided";
    if (city && country) return `${city}, ${country}`;
    return city || country || "Not provided";
  };

  const getHotelName = (row = {}) =>
    row.hotelName ||
    row.name ||
    row.display_name ||
    row.displayName ||
    row.hotel?.name ||
    row.hotel?.display_name ||
    row.summaryEntries?.[0]?.hotelName ||
    "Unnamed hotel";

  const getHotelPublishState = (row = {}) => {
    const rawStatus = (row.hotelStatus || row.status || "").toLowerCase();
    const isPublished = rawStatus === "active";
    const isReadyToPublish = !!row.publishReady && !isPublished;
    if (isPublished) return "published";
    if (isReadyToPublish) return "ready";
    return "incomplete";
  };

  const renderStatusCell = (row) => {
    const state = getHotelPublishState(row);

    let label = "Incomplete";
    let statusClass = "pending";
    if (state === "published") {
      label = "Published";
      statusClass = "ready";
    } else if (state === "ready") {
      label = "Ready to publish";
      statusClass = "pending";
    }

    return (
      <div>
        <span className={`readiness-status ${statusClass}`}>{label}</span>
      </div>
    );
  };

  const sectionStatusClass = (status) => {
    switch (status) {
      case "complete":
        return "section-chip complete";
      case "partial":
        return "section-chip partial";
      default:
        return "section-chip missing";
    }
  };

  const renderSectionChips = (sections = []) => {
    if (!sections.length)
      return <span className="text-muted small">No section data</span>;
    return (
      <div className="section-chip-row">
        {sections.map((section) => (
          <span
            key={section.key || section.id || section.name}
            className={sectionStatusClass(section.status)}
          >
            {section.label || section.name || section.key}
          </span>
        ))}
      </div>
    );
  };

  const renderContractCardsDetailed = (contracts = []) => {
    if (!contracts.length)
      return <span className="text-muted small">No contracts</span>;
    return (
      <div className="contract-card-stack detailed">
        {contracts.map((contract) => {
          const pct = Math.round(contract.completionPercent || 0);
          const progressTone = pct >= 80 ? "ready" : pct >= 50 ? "mid" : "low";
          const issues = (contract.sections || []).filter(
            (section) => section.status !== "complete"
          );
          return (
            <div
              key={contract.contractId || contract.id || contract.index}
              className={`contract-card ${
                contract.publishable ? "publishable" : ""
              }`}
            >
              <div className="contract-card__head">
                <div>
                  <strong>
                    {contract.contractName || contract.name || "Contract"}
                  </strong>
                  <div className="text-muted small text-uppercase">
                    {contract.status || "draft"}
                  </div>
                </div>
                <div className={`contract-progress-pill ${progressTone}`}>
                  {pct}%
                </div>
              </div>
              <div className="contract-card__body contract-card__issues">
                {issues.length ? (
                  <ul className="contract-issues-list">
                    {issues.map((section, idx) => {
                      const reasons = Array.isArray(section.missingReasons)
                        ? section.missingReasons
                        : section.missingReasons
                        ? [section.missingReasons]
                        : [];
                      const lines = reasons.length
                        ? reasons
                        : [section.label || section.name || section.key];
                      return (
                        <li key={`${section.key || section.name}-${idx}`}>
                          <strong>
                            {section.label || section.name || section.key}
                          </strong>
                          <ul className="text-muted small mb-1 mt-1">
                            {lines.map((line, lineIdx) => (
                              <li key={lineIdx}>{line}</li>
                            ))}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <span className="text-muted small">
                    No outstanding actions for this contract.
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderContracts = (contracts = []) => {
    if (!contracts.length)
      return <span className="text-muted">No contracts</span>;
    return (
      <div className="contracts-stack">
        {contracts.map((contract) => {
          const blockers =
            (contract.blockingSections && contract.blockingSections.length) ||
            (contract.missingSections && contract.missingSections.length) ||
            0;
          return (
            <div
              key={contract.contractId || contract.id || contract.index}
              className={`contracts-pill ${
                contract.publishable ? "pill-ready" : ""
              }`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <strong>
                  {contract.contractName || contract.name || "Contract"}
                </strong>
                <span className="badge bg-light text-dark text-uppercase">
                  {contract.status || "draft"}
                </span>
              </div>
              <div className="small text-muted d-flex justify-content-between mt-1">
                <span>
                  {Math.round(contract.completionPercent || 0)}% complete
                </span>
                <span>{blockers} blockers</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderSummary = (row) => {
    const text = row.summary || "No summary yet";
    const blockers = row.blockingReasons || [];
    return (
      <div className="summary-cell" title={text}>
        <p className="summary-text">{text}</p>
        {blockers.length ? (
          <div className="summary-tags">
            {blockers.slice(0, 3).map((reason, idx) => (
              <span key={idx} className="summary-chip">
                {reason}
              </span>
            ))}
            {blockers.length > 3 && (
              <span className="summary-chip muted">
                +{blockers.length - 3} more
              </span>
            )}
          </div>
        ) : null}
      </div>
    );
  };

  const renderBlockers = (row, inline = false, limit) => {
    const blockers = row?.blockingReasons || [];
    if (!blockers.length) {
      return (
        <span className="text-muted small">
          {inline ? "All clear" : "No blockers"}
        </span>
      );
    }
    const list =
      typeof limit === "number" ? blockers.slice(0, limit) : blockers;
    const remainder = blockers.length - list.length;
    return (
      <div className={`blocker-chip-row ${inline ? "inline" : ""}`}>
        {list.map((reason, idx) => (
          <span key={idx} className="blocker-chip">
            {reason}
          </span>
        ))}
        {remainder > 0 ? (
          <span className="blocker-chip extra">+{remainder}</span>
        ) : null}
      </div>
    );
  };

  const renderProgress = (value) => {
    const pct = Math.round(value || 0);
    const progressClass =
      pct >= 80
        ? "progress-ready"
        : pct >= 50
        ? "progress-mid"
        : "progress-low";
    return (
      <div>
        <div className={`progress readiness-progress ${progressClass}`}>
          <div
            className="progress-bar bg-dark"
            role="progressbar"
            style={{ width: `${pct}%` }}
            aria-valuenow={pct}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
        <small className="text-muted">{pct}%</small>
      </div>
    );
  };

  const actionStepMap = {
    hotel_profile: "hotel",
    complete_hotel_profile: "hotel",
    rooms: "rooms",
    add_rooms: "rooms",
    hotel_seasons: "seasons",
    add_seasons: "seasons",
    seasons: "seasons",
    rates: "rates",
    allotments: "allotments",
    restrictions: "restrictions",
    media: "media",
    blackouts: "blackouts",
    add_blackouts: "blackouts",
    promotions: "promotions",
    add_promotions: "promotions",
    create_contract: "contracts",
    contract_core: "contracts",
  };

  const buildWizardUrl = (hotelId, action) => {
    const params = new URLSearchParams();
    params.set("wizard", "1");
    params.set("fixMode", "1");
    if (hotelId) params.set("hotelId", hotelId);
    const step = actionStepMap[action?.type] || action?.type || null;
    if (step) params.set("step", step);
    if (action?.contractId) params.set("contractId", action.contractId);
    // Map wizard step → correct module route so we land on the right screen
    const stepRouteMap = {
      hotel: Constants.URLConstants.HOTELSEXTRANETADD,
      rooms: Constants.URLConstants.HOTELSEXTRANETROOMSADD,
      hotel_seasons: Constants.URLConstants.HOTELSEXTRANETSEASONSADD,
      seasons: Constants.URLConstants.HOTELSEXTRANETSEASONSADD,
      rates: Constants.URLConstants.HOTELSEXTRANETRATESADD,
      allotments: Constants.URLConstants.HOTELSEXTRANETALLOTMENTSADD,
      restrictions: Constants.URLConstants.HOTELSEXTRANETRESTRICTIONSADD,
      blackouts: Constants.URLConstants.HOTELSEXTRANETBLACKOUTSADD,
      promotions: Constants.URLConstants.HOTELSEXTRANETPROMOTIONSADD,
      media: Constants.URLConstants.HOTELSEXTRANETMEDIAADD,
      contracts: Constants.URLConstants.HOTELSEXTRANETCONTRACTSADD,
    };
    const baseRoute =
      stepRouteMap[step] || Constants.URLConstants.HOTELSEXTRANETADD;
    return `${baseRoute}?${params.toString()}`;
  };

  const handleWizardRedirect = (row, action) => {
    try {
      const hotelId = row.hotelId || row.id;
      const targetContractId = action?.contractId ?? null;
      const normalizedActions = sortActions(
        (row.nextActions || []).filter(
          (a) => (a.contractId ?? null) === targetContractId
        )
      );
      let focusSteps = normalizedActions
        .map((a) => actionStepMap[a.type] || a.type || "hotel")
        .filter((x, idx, arr) => x && arr.indexOf(x) === idx);
      focusSteps = expandFocusSteps(focusSteps);
      const state = startWizardState();
      updateWizardState({
        active: true,
        currentStep: actionStepMap[action?.type] || action?.type || "hotel",
        entities: {
          ...(state.entities || {}),
          hotelId,
          contractId: targetContractId || null,
          focusSteps,
          returnToReadiness: true,
        },
      });
      const url = buildWizardUrl(hotelId, action || { type: "hotel" });
      navigate(url);
    } catch (err) {
      console.error("Wizard redirect failed", err);
      toast.error("Unable to open wizard");
    }
  };

  const sortActions = (actions = []) =>
    [...actions]
      .map((action) => ({
        ...action,
        step: actionStepMap[action.type] || action.type || "hotel",
      }))
      .sort((a, b) => {
        const aIndex = WIZARD_STEP_ORDER.indexOf(a.step);
        const bIndex = WIZARD_STEP_ORDER.indexOf(b.step);
        return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
      });

  const renderNextSteps = (row) => {
    const actions = sortActions(row.nextActions || []);
    if (!actions.length) {
      return <span className="text-muted small">No pending steps</span>;
    }
    const primaryContractId =
      (row.contracts || []).find(
        (c) => (c.blockingSections || c.missingSections || []).length
      )?.contractId ||
      (row.contracts || [])[0]?.contractId ||
      null;
    const scoped = actions.filter(
      (a) => (a.contractId ?? null) === (primaryContractId ?? null)
    );
    const list = scoped.length ? scoped : actions;
    return (
      <div className="next-actions">
        {list.slice(0, 3).map((action, idx) => (
          <button
            type="button"
            key={`${action.type}-${idx}`}
            className="btn btn-light btn-sm d-flex justify-content-between align-items-center w-100"
            onClick={() => handleWizardRedirect(row, action)}
          >
            <span>{action.label || action.type}</span>
            {action.contractName ? (
              <small className="text-muted ms-2">{action.contractName}</small>
            ) : null}
          </button>
        ))}
        {list.length > 3 && (
          <small className="text-muted mt-1 d-block">
            +{list.length - 3} more steps — open detail view
          </small>
        )}
      </div>
    );
  };

  const renderPublishControl = (row) => {
    const hotelId = row?.hotelId || row?.id || row?.hotel_id;
    if (!row?.publishReady) {
      return null;
    }
    const isPublishing = publishingHotelId === hotelId;
    return (
      <button
        type="button"
        className="btn btn-success btn-sm readiness-icon-btn"
        disabled={isPublishing}
        onClick={() => handlePublishHotel(row)}
        title={isPublishing ? "Publishing hotel…" : "Publish hotel"}
      >
        {isPublishing ? (
          <i className="fa fa-spinner fa-spin" />
        ) : (
          <i className="fa fa-upload" />
        )}
      </button>
    );
  };

  return (
    <>
      <Header2
        title="Hotel Publish Readiness"
        linkText1="Hotels"
        linkText2="Readiness"
        link1={Constants.URLConstants.HOTELSEXTRANETLIST}
      />
      <div
        className="container-fluid pt-0 p-4 readiness-wrapper"
        id="content-pad"
      >
        <div className="card shadow-sm mb-3">
          <div className="card-body">
            <div className="row gy-2 gx-3 align-items-center filter-bar">
              <div className="col-md-4">
                <label className="form-label mb-1 small text-muted">
                  Search
                </label>
                <input
                  type="search"
                  className="form-control form-control-sm"
                  placeholder="Search by name, city, country…"
                  value={search}
                  onChange={onSearchChange}
                />
              </div>
              <div className="col-md-3 col-lg-2">
                <label className="form-label mb-1 small text-muted">
                  Status
                </label>
                <select
                  className="form-select form-select-sm"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table  align-middle readiness-table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Hotel</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Contracts</th>
                  <th>Summary</th>
                  <th>Next steps</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : rows.length ? (
                  rows.map((row) => (
                    <tr key={row.id || row.hotelId || row.hotel_id}>
                      <td className="fw-semibold text-muted small">
                        {row.id || row.hotelId || row.hotel_id}
                      </td>
                      <td>
                        <div className="fw-semibold">{getHotelName(row)}</div>
                        {/* <small className="text-muted">{formatLocation(row)}</small> */}
                      </td>
                      <td>{renderStatusCell(row)}</td>
                      <td>{renderProgress(row.completionPercent)}</td>
                      <td>{renderContracts(row.contracts)}</td>
                      <td>{renderSummary(row)}</td>
                      <td>{renderNextSteps(row)}</td>
                      <td>
                        <div className="actions-col d-flex justify-content-center align-items-center gap-2">
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm readiness-icon-btn"
                            title="View readiness detail"
                            onClick={() => openDetail(row)}
                          >
                            <i className="fa fa-eye" />
                          </button>
                          {renderPublishControl(row)}
                          {row.blockingReasons?.length ? (
                            <button
                              type="button"
                              className="btn btn-outline-dark btn-sm readiness-icon-btn"
                              title="Fix blockers"
                              onClick={() =>
                                handleWizardRedirect(
                                  row,
                                  sortActions(row.nextActions || [])[0] || {
                                    type: "hotel",
                                  }
                                )
                              }
                            >
                              <i className="fa fa-wrench" />
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center py-4">
                      {error || "No data found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
          <div className="pagination-size">
            <select
              className="form-select form-select-sm"
              value={size}
              onChange={(e) => {
                setSize(parseInt(e.target.value, 10));
                setPage(1);
              }}
            >
              {[5, 10, 20, 50].map((opt) => (
                <option key={opt} value={opt}>
                  {opt} per page
                </option>
              ))}
            </select>
          </div>
          <div className="pagination-controls">
            <button
              className="btn btn-dark btn-sm me-2"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <span className="text-muted small">
              Page {page} of {totalPages}
            </span>
            <button
              className="btn btn-dark btn-sm ms-2"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {(detailLoading || detail) && (
          <div className="readiness-modal-overlay">
            <div className="readiness-modal shadow-lg">
              <div className="modal-header">
                <div>
                  <h5 className="mb-1">
                    {detail?.name ||
                      detail?.displayName ||
                      detail?.display_name ||
                      "Hotel"}
                  </h5>
                  <small className="text-muted">
                    {detail ? formatLocation(detail) : "Loading..."}
                  </small>
                </div>
                <div className="d-flex align-items-center gap-3">
                  {detail && <div>{renderStatusCell(detail)}</div>}
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setDetail(null)}
                  />
                </div>
              </div>
              <div className="modal-body">
                {detailLoading ? (
                  <div>Loading detail...</div>
                ) : detail ? (
                  <>
                    <div className="detail-hero-grid">
                      <div className="detail-hero-card">
                        <span className="label">Completion</span>
                        <strong>
                          {Math.round(detail.completionPercent || 0)}%
                        </strong>
                        <div className="mini-progress">
                          {renderProgress(detail.completionPercent)}
                        </div>
                      </div>
                      <div className="detail-hero-card">
                        <span className="label">Blockers</span>
                        <strong>{detail.blockingReasons?.length || 0}</strong>
                        <div className="hero-blockers">
                          {renderBlockers(detail)}
                        </div>
                      </div>
                      <div className="detail-hero-card">
                        <span className="label">Contracts</span>
                        <strong>{detail.contracts?.length || 0}</strong>
                        <small className="text-muted">
                          {detail.publishableContracts?.length || 0}{" "}
                          publish-ready
                        </small>
                      </div>
                    </div>

                    <p className="text-muted mt-3">
                      {detail.summary || "No summary available"}
                    </p>

                    {detail.blockingReasons?.length ? (
                      <div className="detail-section">
                        <div className="section-heading">
                          <h6>Blockers</h6>
                          {detail.blockingSections?.length ? (
                            <small className="text-muted">
                              Focus: {detail.blockingSections.join(", ")}
                            </small>
                          ) : null}
                        </div>
                        {renderBlockers(detail)}
                      </div>
                    ) : null}

                    <div className="detail-section">
                      <div className="section-heading">
                        <h6>Hotel checklist</h6>
                      </div>
                      {renderSectionChips(detail.sections)}
                    </div>

                    {Array.isArray(detail.contracts) &&
                    detail.contracts.length ? (
                      <div className="detail-section">
                        <div className="section-heading">
                          <h6>Contracts</h6>
                        </div>
                        {renderContractCardsDetailed(detail.contracts)}
                      </div>
                    ) : null}

                    {Array.isArray(detail.nextActions) &&
                    detail.nextActions.length ? (
                      <div className="detail-section">
                        <div className="section-heading">
                          <h6>Next steps</h6>
                        </div>
                        <div className="next-actions">
                          {sortActions(detail.nextActions).map(
                            (action, idx) => (
                              <button
                                key={`${action.type}-${idx}`}
                                type="button"
                                className="btn btn-outline-dark btn-sm d-flex justify-content-between align-items-center w-100"
                                onClick={() =>
                                  handleWizardRedirect(detail, action)
                                }
                              >
                                <span>{action.label || action.type}</span>
                                {action.contractName ? (
                                  <small className="text-muted ms-2">
                                    {action.contractName}
                                  </small>
                                ) : null}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <div>No detail selected</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
