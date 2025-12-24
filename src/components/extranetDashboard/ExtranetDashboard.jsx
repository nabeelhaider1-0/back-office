/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
// Recharts imports (install with: npm i recharts)
import {
  ResponsiveContainer,
  PieChart as RPieChart,
  Pie as RPie,
  Cell as RCell,
  Tooltip as RTooltip,
  Legend as RLegend,
  LineChart as RLineChart,
  Line as RLine,
  XAxis as RXAxis,
  YAxis as RYAxis,
  CartesianGrid as RGrid,
  BarChart as RBarChart,
  Bar as RBar,
} from "recharts";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import {
  listHotels,
  dashboardOverview,
  dashboardImportsSummary,
  dashboardContractsSummary,
  dashboardInventorySummary,
  dashboardImportsTimeseries,
  dashboardContractsTimeseries,
  dashboardFullOverview,
} from "../../Apis/hotelExtranetApi";

function SkeletonKpi() {
  return (
    <div className="col-xxl-3 col-lg-4 col-md-6 mb-3">
      <div className="skeleton skeleton__shimmer skeleton--rounded skeleton-kpi">
        <div className="skeleton-kpi__icon"></div>
        <div className="flex-grow-1">
          <div className="skeleton-kpi__line skeleton-kpi__line--lg"></div>
          <div className="skeleton-kpi__line skeleton-kpi__line--md"></div>
          <div className="skeleton-kpi__line skeleton-kpi__line--sm"></div>
        </div>
      </div>
    </div>
  );
}

function SkeletonRect({ height = 220 }) {
  return (
    <div
      className="skeleton skeleton__shimmer skeleton--rounded skeleton-rect"
      style={{ height }}
    />
  );
}

const palette = ["#1A385A", "#f7c408", "#FFA384", "#FF5015"];

const formatNumber = (value) => {
  if (
    value === null ||
    typeof value === "undefined" ||
    Number.isNaN(Number(value))
  )
    return "0";
  if (typeof value === "number") return value.toLocaleString();
  const num = Number(value);
  if (!Number.isNaN(num)) return num.toLocaleString();
  return String(value);
};

const formatDateTime = (value) => {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};
// Local YYYY-MM-DD (avoid UTC shift)
const formatLocalDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

function SectionTitle({ title, description, meta }) {
  return (
    <div className="dashboard-section-header">
      <div>
        <h5 className="dashboard-section-title">{title}</h5>
        {description ? (
          <p className="dashboard-section-subtitle">{description}</p>
        ) : null}
      </div>
      {meta ? <div className="dashboard-meta-chip">{meta}</div> : null}
    </div>
  );
}

function KpiCard({
  title,
  value,
  subtitle,
  iconClass,
  accent = "transparent", // Set accent to transparent
  background = "transparent", // Add background as a direct prop for each card
  delay = 0,
}) {
  const style = {
    animationDelay: `${delay}ms`,
    "--kpi-panel-color": accent,
    background: background, // Ensure the background remains transparent
  };
  return (
    <div className="col-xxl-3 col-lg-4 col-md-6 mb-3">
      <div className="kpi-panel fade-in" style={style}>
        <div className="kpi-panel__icon">
          <i className={iconClass} aria-hidden="true" />
        </div>
        <div className="kpi-panel__content">
          <div className="kpi-panel__value">{formatNumber(value)}</div>
          <div className="kpi-panel__title">{title}</div>
          {subtitle ? (
            <div className="kpi-panel__subtitle">{subtitle}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value, max = 100, color = "#2563eb" }) {
  const pct = Math.min(100, Math.round(((value || 0) / (max || 1)) * 100));
  return (
    <div style={{ marginBottom: 10 }}>
      <div className="d-flex justify-content-between align-items-center">
        <span className="dashboard-stat-label">{label}</span>
        <span className="dashboard-stat-value">{formatNumber(value)}</span>
      </div>
      <div className="dashboard-progress">
        <div
          className="dashboard-progress-bar"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

function ReDonut({ data = {}, colors = palette }) {
  const rows = Object.entries(data || {})
    .map(([name, value]) => ({ name, value: Number(value || 0) }))
    .filter((d) => Number.isFinite(d.value) && d.value > 0);
  if (!rows.length) return <div className="text-muted">No data</div>;
  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer>
        <RPieChart>
          <RLegend />
          <RTooltip />
          <RPie
            data={rows}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            isAnimationActive
          >
            {rows.map((_, i) => (
              <RCell key={i} fill={colors[i % colors.length]} />
            ))}
          </RPie>
        </RPieChart>
      </ResponsiveContainer>
    </div>
  );
}

function ReLines({ dates = [], series = {} }) {
  // Always include all series keys so users can see every status in legend,
  // even if counts are zero during the selected range.
  const keys = Object.keys(series || {});
  const data = (dates || []).map((d, i) => {
    const row = { date: d };
    keys.forEach((k) => {
      row[k] = Number(series[k]?.[i] || 0);
    });
    return row;
  });
  if (!data.length || keys.length === 0)
    return <div className="text-muted">No data</div>;
  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <RLineChart
          data={data}
          margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
        >
          <RGrid strokeDasharray="3 3" />
          <RXAxis dataKey="date" tickFormatter={(d) => String(d).slice(5)} />
          <RYAxis />
          <RTooltip />
          <RLegend />
          {keys.map((k, i) => (
            <RLine
              key={k}
              type="monotone"
              dataKey={k}
              stroke={palette[i % palette.length]}
              dot={false}
              strokeWidth={2}
              isAnimationActive
            />
          ))}
        </RLineChart>
      </ResponsiveContainer>
    </div>
  );
}

function ReBarList({
  data = {},
  colors = palette,
  dataKey = "value",
  nameKey = "name",
}) {
  let rows = [];
  if (Array.isArray(data)) {
    rows = data.map((item, idx) => ({
      name:
        (item[nameKey] ?? item.name ?? `Item ${idx + 1}`)?.trim?.() ??
        `Item ${idx + 1}`,
      value: Number(item[dataKey] ?? item.value ?? 0),
    }));
  } else {
    rows = Object.entries(data || {}).map(([name, value]) => ({
      name: (name || "").trim(),
      value: Number(value || 0),
    }));
  }
  rows = rows.filter((r) => Number.isFinite(r.value) && r.value > 0);
  if (!rows.length) return <div className="text-muted">No data</div>;
  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <RBarChart
          data={rows}
          margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
        >
          <RGrid strokeDasharray="3 3" />
          <RXAxis
            dataKey="name"
            interval={0}
            angle={-18}
            textAnchor="end"
            height={70}
            tick={{ fontSize: 13, fill: "#475569" }}
            dx={-4}
            dy={6}
          />
          <RYAxis />
          <RTooltip />
          <RBar
            dataKey="value"
            fill={colors[0] || "#3b82f6"}
            isAnimationActive
          />
        </RBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function ExtranetDashboard({ setShowHeaderAndMenuBar }) {
  const [filterHotelId, setFilterHotelId] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [imports, setImports] = useState(null);
  const [contracts, setContracts] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [importsTrend, setImportsTrend] = useState(null);
  const [contractsTrend, setContractsTrend] = useState(null);
  const [full, setFull] = useState(null);
  const [daysWindow, setDaysWindow] = useState(7);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showRange, setShowRange] = useState(false);

  const setDefaultLast7 = useCallback(() => {
    const t = new Date();
    const s = new Date(t);
    s.setDate(t.getDate() - 6);
    setStartDate(s);
    setEndDate(t);
  }, []);

  useEffect(() => {
    setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);

  const filtersToString = useCallback((filters) => {
    const entries = Object.entries(filters || {}).filter(
      ([, v]) => typeof v !== "undefined" && v !== null && v !== ""
    );
    if (!entries.length) return "No filters";
    return entries.map(([k, v]) => `${k}: ${v}`).join(" • ");
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const hotelRes = await listHotels({ page: 1, size: 100 });
        const arr = Array.isArray(hotelRes?.items)
          ? hotelRes.items
          : Array.isArray(hotelRes?.data)
          ? hotelRes.data
          : Array.isArray(hotelRes)
          ? hotelRes
          : [];
        setHotels(arr);
      } catch (e) {
        e;
      }

      // Build date range from toggle OR explicit range inputs (future dates allowed)
      const to = endDate ? new Date(endDate) : new Date();
      const from = startDate ? new Date(startDate) : new Date(to);
      if (!startDate) {
        const windowSize = Math.max(1, Number(daysWindow) || 7);
        from.setDate(to.getDate() - (windowSize - 1));
      }
      const fmt = (d) => formatLocalDate(d);

      try {
        const [fo, o, im, c, inv, imTs, cTs] = await Promise.all([
          dashboardFullOverview({
            hotelId: filterHotelId || undefined,
            from: fmt(from),
            to: fmt(to),
          }),
          dashboardOverview({
            hotelId: filterHotelId || undefined,
            to: fmt(to),
          }),
          dashboardImportsSummary({ from: fmt(from), to: fmt(to) }),
          dashboardContractsSummary({ hotelId: filterHotelId || undefined }),
          dashboardInventorySummary({
            hotelId: filterHotelId || undefined,
            from: fmt(from),
            to: fmt(to),
          }),
          dashboardImportsTimeseries({ from: fmt(from), to: fmt(to) }),
          dashboardContractsTimeseries({
            from: fmt(from),
            to: fmt(to),
            hotelId: filterHotelId || undefined,
          }),
        ]);
        setFull(fo?.data || fo);
        setOverview(o?.data || o);
        setImports(im?.data || im);
        setContracts(c?.data || c);
        setInventory(inv?.data || inv);
        setImportsTrend(imTs?.data || imTs);
        setContractsTrend(cTs?.data || cTs);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [filterHotelId, daysWindow, startDate, endDate]);

  const kpis = useMemo(() => {
    const src = full?.overview || overview || {};
    const hotelsSummary = src?.hotels || {};
    const contractsTotal = src?.contracts?.total ?? 0;
    const rooms = src?.rooms?.total ?? src?.rooms ?? 0;
    const rates = src?.rates?.total ?? src?.rates ?? 0;
    return [
      {
        title: "Hotels (Active)",
        value: hotelsSummary.active ?? 0,
        subtitle: `Total ${hotelsSummary.total ?? 0}`,
        iconClass: "fa fa-check",
        accent: "#7BCE29", // Green for Hotels
        background: "#D7FFB0",
      },
      {
        title: "Rooms",
        value: rooms,
        iconClass: "fa fa-bed",
        accent: "#FF9976",
        background: "#FFD7B8",
      },
      {
        title: "Contracts",
        value: contractsTotal,
        subtitle: `${
          overview?.contracts?.expiringIn30d ??
          src?.contracts?.expiringIn30d ??
          0
        } expiring in 30d`,
        iconClass: "fa fa-file-text",
        accent: "#83AAED",
        background: "#BCDBFF",
      },
      {
        title: "Rates",
        value: rates,
        iconClass: "fa fa-tags",
        accent: "#8B5CF6",
        background: "#D7C6FF",
      },
    ];
  }, [overview, full]);

  const contractsByStatus =
    full?.contracts?.byStatus ||
    contracts?.byStatus ||
    overview?.contractsBreakdown?.byStatus ||
    overview?.contracts?.status ||
    {};
  const mediaByType =
    full?.overview?.media?.byType || overview?.media?.byType || {};
  const mediaByCategory =
    full?.overview?.media?.byCategory || overview?.media?.byCategory || {};
  const importsStatus =
    imports?.jobsByStatus ||
    full?.imports?.jobsByStatus ||
    overview?.imports?.byStatus ||
    {};
  const contractsByCurrency = full?.contracts?.byCurrency || {};
  const contractsByType = full?.contracts?.byType || {};
  const importsTs = importsTrend || { dates: [], counts: [] };
  const contractsTs = contractsTrend || {
    dates: [],
    draft: [],
    awaiting_approval: [],
    approved: [],
    published: [],
  };
  const hotelsByStatus = full?.overview?.hotels || {};
  const hotelsTopCities = full?.hotelsBreakdown?.byCityTop10 || [];
  const roomsTopHotels = full?.roomsBreakdown?.byHotelTop10 || [];
  const seasonsByMarket = full?.seasonsBreakdown?.byMarket || {};
  const seasonsByChannel = full?.seasonsBreakdown?.byChannel || {};
  const ratesByMealPlan = full?.ratesBreakdown?.byMealPlan || {};
  const ratesByCurrency = full?.ratesBreakdown?.byCurrency || {};
  const ratesBySegment = full?.ratesBreakdown?.byMarketSegment || {};
  const invKpis = full?.overview?.inventory || {};
  const importsKpis = full?.imports || {};
  const overviewMeta = full?.overview?._metadata || overview?._metadata;
  const importsMeta = importsKpis?._metadata || imports?._metadata;
  const contractsMeta = full?.contracts?._metadata || contracts?._metadata;
  const inventoryMeta = full?.inventory?._metadata || inventory?._metadata;
  const hotelsBreakdown = full?.hotelsBreakdown || {};
  const inventoryDistributions =
    full?.inventory?.distributions || full?.overview?.inventoryBreakdown || {};
  const contractsExpiring = full?.contracts?.expiringDetails || {};
  const overviewExpiring = overview?.contracts?.expiringDetails || [];
  const overviewRecentImports =
    overview?.imports?.recentJobs || full?.overview?.imports?.recentJobs || [];
  const importsTopErrors =
    importsKpis?.topErrorCodes || overview?.imports?.topErrorCodes || [];
  const metadataChips = useMemo(() => {
    if (!overviewMeta) return null;
    const chips = [];
    const generated = formatDateTime(overviewMeta.generatedAt);
    if (generated) chips.push({ label: "Generated", value: generated });
    const filterString = filtersToString(overviewMeta.filters || {});
    if (filterString) chips.push({ label: "Filters", value: filterString });
    return chips;
  }, [overviewMeta, filtersToString]);

  const expiringSoonList = useMemo(() => {
    if (Array.isArray(overviewExpiring) && overviewExpiring.length)
      return overviewExpiring;
    const within7 = contractsExpiring?.within7Days || [];
    const within30 = contractsExpiring?.within30Days || [];
    return [...within7, ...within30];
  }, [contractsExpiring, overviewExpiring]);

  const isInitialLoad = loading && !full && !overview;

  if (isInitialLoad) {
    return (
      <>
        <Header2
          title="EXTRANET DASHBOARD"
          linkText1="Dashboard"
          link1={Constants.URLConstants.HOTELSEXTRANETDASHBOARD}
        />
        <div className="container-fluid pt-0 p-4" id="content-pad">
          <div className="row">
            <SkeletonKpi />
            <SkeletonKpi />
            <SkeletonKpi />
            <SkeletonKpi />
          </div>
          <div className="row">
            <SkeletonKpi />
            <SkeletonKpi />
            <SkeletonKpi />
            <SkeletonKpi />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <SkeletonRect height={240} />
            </div>
            <div className="col-md-6 mb-3">
              <SkeletonRect height={240} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <SkeletonRect height={200} />
            </div>
            <div className="col-md-4 mb-3">
              <SkeletonRect height={200} />
            </div>
            <div className="col-md-4 mb-3">
              <SkeletonRect height={200} />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header2
        title="EXTRANET DASHBOARD"
        linkText1="Dashboard"
        link1={Constants.URLConstants.HOTELSEXTRANETDASHBOARD}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="row g-3 mb-2">
          <div className="col-md-3">
            <label className="fw-semibold">Hotel Filter</label>
            <select
              className="form-control form-control-sm"
              value={filterHotelId}
              onChange={(e) => setFilterHotelId(e.target.value)}
            >
              <option value="">All Hotels</option>
              {hotels.map((h) => (
                <option key={h.id || h.hotelId} value={h.id || h.hotelId}>
                  {h.display_name || h.displayName || h.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="fw-semibold d-block">
              Range{" "}
              <span className="text-muted small">(last {daysWindow} days)</span>
            </label>
            <div className="form-switch d-flex align-items-center gap-2">
              <span
                className={`small ${
                  daysWindow === 30 ? "text-muted" : "fw-semibold text-primary"
                }`}
              >
                7d
              </span>
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={daysWindow === 30}
                onChange={(e) => setDaysWindow(e.target.checked ? 30 : 7)}
                style={{ cursor: "pointer" }}
              />
              <span
                className={`small ${
                  daysWindow === 30 ? "fw-semibold text-primary" : "text-muted"
                }`}
              >
                30d
              </span>
            </div>
          </div>
          <div className="col-md-6 position-relative">
            <label className="fw-semibold d-block">
              Custom Dates{" "}
              <span className="text-muted small">
                (max 30 days, future dates allowed)
              </span>
            </label>
            <button
              type="button"
              className="range-chip"
              onClick={() => {
                setShowRange((s) => {
                  const nextOpen = !s;
                  if (nextOpen && !startDate && !endDate) {
                    // Default selection when opening first time
                    setDefaultLast7();
                  }
                  return nextOpen;
                });
              }}
            >
              <i className="fa fa-calendar" />
              {startDate || endDate
                ? `${startDate ? formatLocalDate(startDate) : "auto"} → ${
                    endDate ? formatLocalDate(endDate) : "today"
                  }`
                : "Select date range"}
            </button>
            {showRange && (
              <div className="range-panel mt-2">
                <div className="row g-2">
                  <div className="col-lg-8">
                    <DatePicker
                      inline
                      selectsRange
                      monthsShown={2}
                      calendarStartDay={1}
                      startDate={startDate}
                      endDate={endDate}
                      onChange={(dates) => {
                        const [start, end] = dates || [];
                        if (start && end) {
                          const s = new Date(start);
                          s.setHours(0, 0, 0, 0);
                          const e = new Date(end);
                          e.setHours(0, 0, 0, 0);
                          const diff = Math.ceil((e - s) / 86400000) + 1;
                          if (diff > 30) {
                            toast.error("Please select a range up to 30 days.");
                            return;
                          }
                        }
                        setStartDate(start || null);
                        setEndDate(end || null);
                      }}
                    />
                  </div>
                  <div className="col-lg-4 d-flex flex-column justify-content-between">
                    <div>
                      <div className="text-muted small mb-2">Quick picks</div>
                      <div className="preset-pills">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => {
                            const t = new Date();
                            const s = new Date(t);
                            setStartDate(s);
                            setEndDate(t);
                          }}
                        >
                          Today
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => {
                            const t = new Date();
                            const s = new Date(t);
                            s.setDate(t.getDate() - 6);
                            setStartDate(s);
                            setEndDate(t);
                          }}
                        >
                          Last 7
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => {
                            const t = new Date();
                            const s = new Date(t);
                            s.setDate(t.getDate() - 13);
                            setStartDate(s);
                            setEndDate(t);
                          }}
                        >
                          Last 14
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            const t = new Date();
                            const s = new Date(t);
                            s.setDate(t.getDate() - 29);
                            setStartDate(s);
                            setEndDate(t);
                          }}
                        >
                          Last 30
                        </button>
                      </div>
                    </div>
                    <div className="range-panel__footer">
                      <div className="text-muted small">
                        {startDate && endDate
                          ? `${formatLocalDate(startDate)} → ${formatLocalDate(
                              endDate
                            )}`
                          : "Select a date range"}
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => {
                            // Reset to default 7 days and close
                            setDefaultLast7();
                            setDaysWindow(7);
                            setShowRange(false);
                          }}
                        >
                          Clear
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={() => {
                            if (!startDate || !endDate) {
                              toast.info("Select a date range first.");
                              return;
                            }
                            const s = new Date(startDate);
                            s.setHours(0, 0, 0, 0);
                            const e = new Date(endDate);
                            e.setHours(0, 0, 0, 0);
                            const diff = Math.ceil((e - s) / 86400000) + 1;
                            if (diff > 30) {
                              toast.error(
                                "Please select a range up to 30 days."
                              );
                              return;
                            }
                            setShowRange(false);
                          }}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {metadataChips ? (
          <div
            className="dashboard-meta-row fade-in"
            style={{ animationDelay: "80ms" }}
          >
            {metadataChips.map((chip) => (
              <div key={chip.label} className="dashboard-meta-chip">
                <strong>{chip.label}:</strong> {chip.value}
              </div>
            ))}
          </div>
        ) : null}

        <div className="row">
          {kpis.map((k, i) => (
            <KpiCard key={k.title} {...k} delay={i * 60} />
          ))}
        </div>

        <div className="row">
          <KpiCard
            title="Allotments Next 30d"
            value={invKpis.allotmentsNext30d ?? 0}
            iconClass="fa fa-calendar"
            accent="#FF9976"
            background="#FFD7B8"
            delay={80}
          />
          <KpiCard
            title="Restrictions Active Today"
            value={invKpis.restrictionsActiveToday ?? 0}
            iconClass="fa fa-ban"
            accent="#FF5555"
            background="#FFCCCC"
            delay={140}
          />

          <KpiCard
            title="Promotions Active Today"
            value={invKpis.promotionsActiveToday ?? 0}
            iconClass="fa fa-bullhorn"
            accent="#7BCE29"
            background="#D7FFB0"
            delay={260}
          />
          <KpiCard
            title="Imports Total Jobs"
            value={importsKpis.totalJobs ?? 0}
            iconClass="fa fa-cloud-upload"
            accent="#83AAED"
            background="#BCDBFF"
            delay={320}
          />
        </div>

        <div className="row">
          <KpiCard
            title="Blackouts Active Today"
            value={invKpis.blackoutsActiveToday ?? 0}
            iconClass="fa fa-times"
            accent="#dc2626"
            background="#FFCCCC"
            delay={200}
          />
          <KpiCard
            title="Imports Success Rate"
            value={`${importsKpis.successRate ?? 0}%`}
            iconClass="fa fa-check"
            accent="#7BCE29"
            background="#D7FFB0"
            delay={380}
          />
          <KpiCard
            title="Avg Duration (s)"
            value={importsKpis.avgDurationSeconds ?? 0}
            iconClass="fa fa-clock-o"
            accent="#8B5CF6"
            background="#D7C6FF"
            delay={440}
          />
          <KpiCard
            title="Import Errors"
            value={importsKpis.totalErrors ?? 0}
            iconClass="fa fa-exclamation-triangle"
            accent="#dc2626"
            background="#FFCCCC"
            delay={500}
          />
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-6">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "120ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Contracts by Status"
                  description={
                    contractsMeta?._descriptions?.byStatus ||
                    overview?.contractsBreakdown?._description
                  }
                />
                {Object.keys(contractsByStatus).length === 0 && (
                  <div className="text-muted">No data</div>
                )}
                {Object.entries(contractsByStatus)
                  .filter(([k]) => !String(k).startsWith("_"))
                  .map(([k, v]) => (
                    <StatRow
                      key={k}
                      label={k}
                      value={Number(v)}
                      max={Math.max(
                        ...Object.values(contractsByStatus).map(
                          (x) => Number(x) || 0
                        ),
                        1
                      )}
                      color="#FF5015"
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "160ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Contracts by Type"
                  description={contractsMeta?._descriptions?.byType}
                />
                <ReDonut data={contractsByType} />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-12">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "200ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Contracts by Currency"
                  description={contractsMeta?._descriptions?.byCurrency}
                />
                <ReDonut data={contractsByCurrency} />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-6">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "240ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Imports by Status"
                  description={importsKpis?._descriptions?.jobsByStatus}
                  meta={
                    importsMeta
                      ? `Updated ${
                          formatDateTime(importsMeta.generatedAt) || "recently"
                        }`
                      : null
                  }
                />
                {Object.keys(importsStatus).length === 0 && (
                  <div className="text-muted">No data</div>
                )}
                {Object.entries(importsStatus)
                  .filter(([k]) => !String(k).startsWith("_"))
                  .map(([k, v]) => (
                    <StatRow
                      key={k}
                      label={k}
                      value={Number(v)}
                      max={Math.max(
                        ...Object.values(importsStatus).map(
                          (x) => Number(x) || 0
                        ),
                        1
                      )}
                      color="#10b981"
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "280ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Top Import Error Codes"
                  description={importsKpis?._descriptions?.topErrorCodes}
                />
                {importsTopErrors.length > 0 ? (
                  importsTopErrors.map((e, idx) => (
                    <StatRow
                      key={e.code || idx}
                      label={e.code}
                      value={Number(e.count || 0)}
                      max={Math.max(
                        ...importsTopErrors.map((x) => Number(x.count) || 0),
                        1
                      )}
                      color="#ef4444"
                    />
                  ))
                ) : (
                  <div className="text-muted">No data</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-6">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "320ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Inventory: Blackouts by Reason"
                  description={
                    inventoryMeta?._descriptions?.distributions
                      ?.blackoutsByReason ||
                    full?.overview?.inventoryBreakdown?._description
                  }
                />
                <ReDonut
                  data={
                    inventoryDistributions.blackoutsByReason ||
                    full?.overview?.inventoryBreakdown
                      ?.blackoutsByReasonActiveToday ||
                    {}
                  }
                  colors={["#f97316", "#ef4444", "#facc15", "#6366f1"]}
                />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "360ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Inventory: Promotions by Type"
                  description={
                    inventoryMeta?._descriptions?.distributions
                      ?.promotionsByType
                  }
                />
                <ReDonut
                  data={
                    inventoryDistributions.promotionsByType ||
                    full?.overview?.inventoryBreakdown
                      ?.promotionsByTypeActiveToday ||
                    {}
                  }
                  colors={["#1A385A", "#f7c408", "#FFA384", "#FF5015"]}
                />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-12">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "400ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Inventory: Restrictions by Level"
                  description={
                    inventoryMeta?._descriptions?.distributions
                      ?.restrictionsByLevel
                  }
                />
                <ReDonut
                  data={
                    inventoryDistributions.restrictionsByLevel ||
                    full?.overview?.inventoryBreakdown
                      ?.restrictionsByLevelActiveToday ||
                    {}
                  }
                  colors={["#6366f1", "#f97316", "#0ea5e9"]}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "440ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Media by Type"
                  description={full?.overview?.media?._description}
                />
                <ReDonut data={mediaByType} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "480ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Media by Category"
                  description={full?.overview?.media?._description}
                />
                <ReDonut data={mediaByCategory} />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "520ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Recent Import Jobs"
                  description={
                    overview?.imports?._description || importsMeta?.description
                  }
                />
                <div className="table-responsive dashboard-table-wrapper">
                  <table className="table align-middle bg-white">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Type</th>
                        <th scope="col">Status</th>
                        <th scope="col">Total</th>
                        <th scope="col">Valid</th>
                        <th scope="col">Invalid</th>
                        <th scope="col">Created At</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {overviewRecentImports.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center text-muted">
                            No recent jobs.
                          </td>
                        </tr>
                      ) : (
                        overviewRecentImports.map((j) => (
                          <tr key={j.id}>
                            <td
                              className="text-truncate"
                              style={{ maxWidth: 160 }}
                            >
                              {j.id}
                            </td>
                            <td className="text-uppercase fw-semibold">
                              {j.type}
                            </td>
                            <td>
                              <span
                                className={`badge dashboard-badge status-${j.status}`}
                              >
                                {j.status}
                              </span>
                            </td>
                            <td>{formatNumber(j.total)}</td>
                            <td className="text-success fw-semibold">
                              {formatNumber(j.valid)}
                            </td>
                            <td className="text-danger fw-semibold">
                              {formatNumber(j.invalid)}
                            </td>
                            <td>{formatDateTime(j.createdAt)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "560ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title={
                    startDate || endDate
                      ? "Imports (Custom Range)"
                      : `Imports (Last ${daysWindow} days)`
                  }
                  description={
                    startDate || endDate
                      ? `Daily imports from ${
                          startDate ? formatLocalDate(startDate) : "auto"
                        } to ${endDate ? formatLocalDate(endDate) : "today"}`
                      : `Daily imports volume trend for the last ${daysWindow} days`
                  }
                />
                <ReLines
                  dates={importsTs.dates || []}
                  series={{ imports: importsTs.counts || [] }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "600ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title={
                    startDate || endDate
                      ? "Contracts by Status (Custom Range)"
                      : `Contracts by Status (Last ${daysWindow} days)`
                  }
                  description={
                    startDate || endDate
                      ? `Rolling daily status counts from ${
                          startDate ? formatLocalDate(startDate) : "auto"
                        } to ${endDate ? formatLocalDate(endDate) : "today"}`
                      : `Rolling daily contract status counts over the past ${daysWindow} days`
                  }
                />
                <ReLines
                  dates={contractsTs.dates || []}
                  series={{
                    draft: contractsTs.draft || [],
                    awaiting_approval: contractsTs.awaiting_approval || [],
                    approved: contractsTs.approved || [],
                    published: contractsTs.published || [],
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "640ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Seasons by Market"
                  description={full?.seasonsBreakdown?._description}
                />
                <ReDonut data={seasonsByMarket} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "680ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Seasons by Channel"
                  description={full?.seasonsBreakdown?._description}
                />
                <ReDonut data={seasonsByChannel} />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "720ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Rates by Meal Plan"
                  description={full?.ratesBreakdown?._description}
                />
                <ReDonut data={ratesByMealPlan} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "760ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Rates by Currency"
                  description={full?.ratesBreakdown?._description}
                />
                <ReDonut data={ratesByCurrency} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "800ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Rates by Market Segment"
                  description={full?.ratesBreakdown?._description}
                />
                <ReDonut data={ratesBySegment} />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "840ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Hotels by Status"
                  description={
                    full?.overview?.hotels?._description ||
                    hotelsBreakdown?._description
                  }
                />
                {Object.keys(hotelsByStatus).length === 0 ? (
                  <div className="text-muted">No data</div>
                ) : (
                  Object.entries(hotelsByStatus)
                    .filter(([k]) => !String(k).startsWith("_"))
                    .map(([k, v]) => (
                      <StatRow
                        key={k}
                        label={k}
                        value={Number(v)}
                        max={Math.max(
                          ...Object.values(hotelsByStatus).map(
                            (x) => Number(x) || 0
                          ),
                          1
                        )}
                        color="#FF5015"
                      />
                    ))
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "880ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Top Cities (Hotels)"
                  description={hotelsBreakdown?._description}
                />
                {hotelsTopCities.length === 0 ? (
                  <div className="text-muted">No data</div>
                ) : (
                  hotelsTopCities.map((c) => (
                    <StatRow
                      key={c.city || c.name}
                      label={c.city || c.name}
                      value={Number(c.count || 0)}
                      max={Math.max(
                        ...hotelsTopCities.map((x) => Number(x.count) || 0),
                        1
                      )}
                      color="#FF5015"
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "920ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Top Hotels by Room Types"
                  description={full?.roomsBreakdown?._description}
                />
                <ReBarList
                  data={roomsTopHotels.map((h) => ({
                    name: h.hotel_name || h.hotel_id || h.name,
                    value: h.count,
                  }))}
                  colors={["#1A385A"]}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div
              className="card shadow-sm mb-3 dashboard-card fade-in"
              style={{ animationDelay: "960ms" }}
            >
              <div className="card-body">
                <SectionTitle
                  title="Contracts Expiring Soon"
                  description={
                    contractsMeta?._descriptions?.expiringDetails ||
                    overview?.contracts?._description
                  }
                />
                {expiringSoonList.length === 0 ? (
                  <div className="text-muted">No contracts nearing expiry.</div>
                ) : (
                  <div className="table-responsive dashboard-table-wrapper">
                    <table className="table align-middle bg-white">
                      <thead>
                        <tr>
                          <th scope="col">Contract</th>
                          <th scope="col">Hotel</th>
                          <th scope="col">Type</th>
                          <th scope="col">Status</th>
                          <th scope="col">Expires On</th>
                          <th scope="col">Days Left</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {expiringSoonList.map((item) => (
                          <tr key={`${item.id}-${item.contractCode}`}>
                            <td>
                              <div className="fw-semibold text-uppercase">
                                {item.contractCode || item.name}
                              </div>
                              <div className="text-muted small">
                                {item.name}
                              </div>
                            </td>
                            <td>
                              <div className="fw-semibold">
                                {item.hotelName}
                              </div>
                              <div className="text-muted small">
                                {item.hotelId}
                              </div>
                            </td>
                            <td>{item.type}</td>
                            <td>
                              <span
                                className={`badge dashboard-badge status-${item.status}`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td>{formatDateTime(item.effectiveTo)}</td>
                            <td
                              className={
                                Number(item.daysUntilExpiry) <= 7
                                  ? "text-danger fw-semibold"
                                  : "fw-semibold"
                              }
                            >
                              {item.daysUntilExpiry}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
