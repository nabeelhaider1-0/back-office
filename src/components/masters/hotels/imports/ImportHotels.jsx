import { useCallback, useEffect, useRef, useState } from "react";
import Header2 from "../../../header2/header2";
import MultiSelect from "../../../reactMultiSelect";
import Constants from "../../../../constants/routes";
import {
  SuccessApiToast,
  ErrorApiAlert,
} from "../../../../constants/globalfunctions";
import {
  startImportMultipart,
  startImportFromUrl,
  getImportStatus,
  getImportErrorsLink,
  downloadImportErrors,
  regenerateImportReport,
  cleanupImportReports,
  debugImportJob,
} from "../../../../Apis/importsApi";

// Reusable hollow info icon (outlined circle with 'i')
const InfoIcon = ({ title }) => (
  <span
    title={title}
    aria-label={title}
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 18,
      height: 18,
      borderRadius: "50%",
      border: "1px solid #FF5015",
      color: "#FF5015",
      fontSize: 11,
      fontWeight: 700,
      lineHeight: 1,
      userSelect: "none",
      marginLeft: 4,
      cursor: "default",
    }}
  >
    i
  </span>
);

const TEMPLATE_URL =
  "https://escapra-assets.s3.eu-west-1.amazonaws.com/extranet/Hotel_Extranet_Templates_v1.1.xlsx";

const importTypeOptions = [
  { value: "all", label: "All" },
  { value: "hotels", label: "Hotels" },
  { value: "rooms", label: "Rooms" },
  { value: "seasons", label: "Seasons" },
  { value: "contracts", label: "Contracts" },
  { value: "rates", label: "Rates" },
  { value: "allotments", label: "Allotments" },
  { value: "restrictions", label: "Restrictions" },
  { value: "blackouts", label: "Blackouts" },
  { value: "promotions", label: "Promotions" },
  { value: "media", label: "Media" },
];

const terminalStatuses = new Set(["completed", "partial_success", "failed"]);

const StatusBadge = ({ status }) => {
  const cls =
    status === "completed"
      ? "badge bg-success"
      : status === "partial_success"
      ? "badge bg-warning"
      : status === "failed"
      ? "badge bg-danger"
      : "badge bg-secondary";
  return <span className={cls}>{status || "queued"}</span>;
};

const StatusTimeline = ({ status }) => {
  const stages = ["queued", "validating", "completed"];
  const idx =
    status === "partial_success" || status === "failed"
      ? 2
      : stages.indexOf(status);
  const items = [
    { key: "queued", label: "Queued" },
    { key: "validating", label: "Validating" },
    {
      key: "done",
      label:
        status === "partial_success"
          ? "Partial Success"
          : status === "failed"
          ? "Failed"
          : "Completed",
    },
  ];
  return (
    <div className="timeline small">
      {items.map((it, i) => (
        <span
          key={it.key}
          className={`me-2 ${i <= idx ? "text-primary" : "text-muted"}`}
        >
          <i
            className={`fa ${i <= idx ? "fa-check-circle" : "fa-circle-o"}`}
          ></i>{" "}
          {it.label}
        </span>
      ))}
    </div>
  );
};

const JobDetailModal = ({ job, onClose }) => {
  if (!job) return null;
  return (
    <div
      className="modal"
      style={{ display: "block", background: "rgba(0,0,0,.35)" }}
    >
      <div className="modal-dialog modal-lg" style={{ marginTop: 60 }}>
        <div
          className="modal-content"
          style={{
            borderRadius: 10,
            boxShadow: "0 12px 28px rgba(0,0,0,.18)",
            position: "relative",
          }}
        >
          <div
            className="modal-header d-flex align-items-center"
            style={{
              padding: 14,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <h5
              className="modal-title"
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <i className="fa fa-file-excel-o" aria-hidden="true"></i>
              Import Job Details
            </h5>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              style={{
                position: "absolute",
                top: 8,
                right: 10,
                background: "transparent",
                border: 0,
                padding: 4,
                cursor: "pointer",
              }}
              title="Close"
            >
              <i
                className="fa fa-times"
                style={{ fontSize: 18, color: "#6c757d" }}
              ></i>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-8">
                <div className="mb-2">
                  <strong>ID:</strong> {job.id}
                </div>
                <div className="mb-2">
                  <strong>Type:</strong> {job.import_type || "-"}
                </div>
                <div className="mb-2">
                  <strong>Status:</strong> <StatusBadge status={job.status} />
                </div>
                <div className="mb-2">
                  <StatusTimeline status={job.status} />
                </div>
              </div>
              <div className="col-md-4 text-right"></div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-3">
                <strong>Total</strong>
                <div>{job.total ?? "-"}</div>
              </div>
              <div className="col-md-3">
                <strong>Valid</strong>
                <div>{job.valid ?? "-"}</div>
              </div>
              <div className="col-md-3">
                <strong>Invalid</strong>
                <div>{job.invalid ?? "-"}</div>
              </div>
              <div className="col-md-3">
                <strong>Errors</strong>
                <div>{job.errors_count ?? "-"}</div>
              </div>
            </div>
            {job.errors_link && (
              <div className="alert alert-info mt-3">
                Error report available. You can download the XLSX report.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ImportHotels = () => {
  const [source, setSource] = useState("file"); // 'file' | 'url'
  const [jobs, setJobs] = useState([]); // recent jobs in-memory
  const [uploadForm, setUploadForm] = useState({
    file: null,
    import_type: "all",
    upsert: false,
    dry_run: false,
    allow_overlaps: false,
    merge_overlaps: false,
    transactional: true,
    idempotency_key: "",
  });
  const [urlForm, setUrlForm] = useState({
    file_url: "",
    import_type: "all",
    sheet: "",
    upsert: false,
    dry_run: false,
    allow_overlaps: false,
    merge_overlaps: false,
    transactional: true,
    idempotency_key: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [debugData, setDebugData] = useState(null);
  const jobStatusRef = useRef({});

  const pollTimers = useRef({});
  const fileInputRef = useRef(null);

  const startPolling = useCallback((id) => {
    if (pollTimers.current[id]) return; // already polling
    const tick = async () => {
      try {
        const s = await getImportStatus(id);
        const prevStatus = jobStatusRef.current[id];
        jobStatusRef.current[id] = s.status;
        setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...s } : j)));
        if (prevStatus !== s.status && terminalStatuses.has(s.status)) {
          if (s.status === "completed") {
            SuccessApiToast(`Job ${id} completed`);
          } else if (s.status === "partial_success") {
            SuccessApiToast(`Job ${id} finished with partial success`);
          } else if (s.status === "failed") {
            ErrorApiAlert(`Job ${id} failed`);
          }
        }
        if (terminalStatuses.has(s.status)) {
          clearInterval(pollTimers.current[id]);
          delete pollTimers.current[id];
        }
      } catch (e) {
        // stop polling on error to avoid loops
        clearInterval(pollTimers.current[id]);
        delete pollTimers.current[id];
      }
    };
    pollTimers.current[id] = setInterval(tick, 1500);
  }, []);

  useEffect(
    () => () => {
      // cleanup timers on unmount
      Object.values(pollTimers.current).forEach(clearInterval);
    },
    []
  );

  const onUploadSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    if (!uploadForm.file && !uploadForm.file_url) {
      setErrors("Please provide a file or a file URL.");
      return;
    }
    if (uploadForm.file) {
      const maxSize = 50 * 1024 * 1024; // ~50MB
      if (uploadForm.file.size > maxSize) {
        setErrors("File exceeds 50MB limit.");
        return;
      }
      const allowed = [".xlsx", ".xls", ".csv"];
      const name = (uploadForm.file.name || "").toLowerCase();
      if (!allowed.some((ext) => name.endsWith(ext))) {
        setErrors("Unsupported file type. Allowed: .xlsx, .xls, .csv");
        return;
      }
    }
    setSubmitting(true);
    try {
      const flags = {
        upsert: uploadForm.upsert,
        dry_run: uploadForm.dry_run,
        allow_overlaps: uploadForm.allow_overlaps,
        merge_overlaps: uploadForm.merge_overlaps,
        transactional: uploadForm.transactional,
      };
      const data = await startImportMultipart({
        file: uploadForm.file,
        fileUrl: uploadForm.file_url,
        importType: uploadForm.import_type,
        flags,
        idempotencyKey: uploadForm.idempotency_key || undefined,
      });
      setJobs((prev) => [{ ...data }, ...prev].slice(0, 20));
      SuccessApiToast(
        data?.id ? `Import started · Job ${data.id}` : "Import started"
      );
      if (data?.id) startPolling(data.id);
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Import failed.";
      setErrors(msg);
      ErrorApiAlert(msg || "Import failed");
    } finally {
      setSubmitting(false);
    }
  };

  const onUrlSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    if (!urlForm.file_url) {
      setErrors("Please enter a file URL.");
      return;
    }
    setSubmitting(true);
    try {
      const options = {
        upsert: urlForm.upsert,
        dry_run: urlForm.dry_run,
        allow_overlaps: urlForm.allow_overlaps,
        merge_overlaps: urlForm.merge_overlaps,
        transactional: urlForm.transactional,
      };
      if (urlForm.sheet) options.sheet = urlForm.sheet;
      const data = await startImportFromUrl({
        importType: urlForm.import_type,
        fileUrl: urlForm.file_url,
        options,
        idempotencyKey: urlForm.idempotency_key || undefined,
      });
      setJobs((prev) => [{ ...data }, ...prev].slice(0, 20));
      SuccessApiToast(
        data?.id
          ? `Import started from URL · Job ${data.id}`
          : "Import started from URL"
      );
      if (data?.id) startPolling(data.id);
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Import failed.";
      setErrors(msg);
      ErrorApiAlert(msg || "Import failed");
    } finally {
      setSubmitting(false);
    }
  };

  const onDownloadErrors = async (id) => {
    try {
      const r = await downloadImportErrors(id);
      if (r && r.status === 200) {
        const blob = r.data;
        const contentDisposition =
          r.headers &&
          (r.headers["content-disposition"] ||
            r.headers["Content-Disposition"]);
        let filename = `import-errors-${id}.xlsx`;
        if (contentDisposition) {
          const match = /filename\*=UTF-8''([^;]+)|filename=([^;]+)/i.exec(
            contentDisposition
          );
          if (match) {
            filename = decodeURIComponent(
              (match[1] || match[2] || filename).replace(/\"/g, "")
            );
          }
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        setErrors("Error report not available for this job yet.");
        ErrorApiAlert("Error report not available for this job yet.");
      }
    } catch (e) {
      setErrors("Could not download error report.");
      ErrorApiAlert("Could not download error report.");
    }
  };

  const onRegenerate = async (id) => {
    try {
      await regenerateImportReport(id);
      SuccessApiToast("Regeneration requested");
    } catch (e) {
      setErrors("Could not regenerate error report.");
      ErrorApiAlert("Could not regenerate error report.");
    }
  };

  const onCleanup = async () => {
    try {
      const res = await cleanupImportReports(7);
      const msg = (res && (res.message || res.msg)) || "Cleanup triggered";
      SuccessApiToast(msg);
    } catch (e) {
      setErrors("Cleanup failed.");
      ErrorApiAlert("Cleanup failed.");
    }
  };

  const onDebug = async (id) => {
    try {
      const data = await debugImportJob(id);
      setDebugData(data);
    } catch (e) {
      setErrors("Debug fetch failed.");
    }
  };

  const formatBytes = (bytes) => {
    if (!bytes && bytes !== 0) return "";
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.min(
      Math.floor(Math.log(bytes) / Math.log(1024)),
      sizes.length - 1
    );
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const autoGenerateIdempotency = () => {
    const type =
      source === "file" ? uploadForm.import_type : urlForm.import_type;
    const key = `ui-${type}-${Date.now()}`;
    if (source === "file")
      setUploadForm({ ...uploadForm, idempotency_key: key });
    else setUrlForm({ ...urlForm, idempotency_key: key });
  };

  const downloadTemplate = () => {
    try {
      const link = document.createElement("a");
      link.href = TEMPLATE_URL;
      link.download = "";
      link.target = "_blank";
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (_) {
      window.open(TEMPLATE_URL, "_blank", "noopener");
    }
  };

  return (
    <>
      <Header2
        title="Import Hotels"
        linkText1="Search Hotels"
        link1={Constants.URLConstants.MASTERSHOTELSSEARCH}
      />
      <div
        className="container-fluid pt-0 p-4"
        id="content-pad"
        style={{ margin: "0 auto" }}
      >
        <div className="d-flex justify-content-end mb-2">
          <button
            type="button"
            className="btn btn-outline-dark btn-sm"
            style={{
              borderRadius: 8,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#FF5015",
              borderColor: "#FF5015",
            }}
            onClick={downloadTemplate}
          >
            <i
              className="fa fa-download"
              aria-hidden="true"
              style={{ color: "#FF5015" }}
            />
            Download template
          </button>
        </div>

        {/* Tabs: Upload File | Import from URL */}
        <div className="row" style={{ marginBottom: 12 }}>
          <div className="col-md-12">
            <div
              role="tablist"
              aria-label="Import source"
              style={{ display: "inline-flex", gap: 8 }}
            >
              <button
                type="button"
                className="btn btn-sm"
                style={{
                  borderRadius: 8,
                  border: `1px solid ${
                    source === "file" ? "#FF5015" : "#e5e7eb"
                  }`,
                  background: source === "file" ? "#FFF0EB" : "#ffffff",
                  color: "#111827",
                  padding: "8px 18px",
                }}
                onClick={() => setSource("file")}
              >
                Upload File
              </button>
              <button
                type="button"
                className="btn btn-sm"
                style={{
                  borderRadius: 8,
                  border: `1px solid ${
                    source === "url" ? "#FF5015" : "#e5e7eb"
                  }`,
                  background: source === "url" ? "#FFF0EB" : "#ffffff",
                  color: "#111827",
                  padding: "8px 18px",
                }}
                onClick={() => setSource("url")}
              >
                Import from URL
              </button>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginTop: 4 }}>
          <div className="col-md-12" style={{ marginBottom: 16 }}>
            <div
              className="panel panel-default"
              style={{
                boxShadow: "0 2px 8px rgba(0,0,0,.04)",
                borderRadius: 10,
                border: "1px solid #edf2f7",
              }}
            >
              <div
                className="panel-body"
                style={{ padding: 18, background: "white" }}
              >
                {errors && <div className="alert alert-danger">{errors}</div>}

                {source === "file" ? (
                  <form onSubmit={onUploadSubmit}>
                    {/* Drop zone */}
                    <div
                      className="row form-group"
                      style={{ marginBottom: 12 }}
                    >
                      <div className="col-md-12">
                        <label className="d-block">Upload Hotel File</label>
                        <div
                          className={`text-center ${
                            dragOver ? "bg-light" : ""
                          }`}
                          style={{
                            padding: 0,
                            background: "#fff",
                            border: "1px solid #e5e7eb",
                            borderRadius: 10,
                            height: 100,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragOver(true);
                          }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragOver(false);
                            if (
                              e.dataTransfer.files &&
                              e.dataTransfer.files[0]
                            ) {
                              const f = e.dataTransfer.files[0];
                              setUploadForm({ ...uploadForm, file: f });
                            }
                          }}
                          onClick={() =>
                            fileInputRef.current && fileInputRef.current.click()
                          }
                        >
                          <div>
                            <div className="mb-1">
                              <i
                                className="fa fa-cloud-upload"
                                style={{
                                  color: "#FF5015",
                                  fontSize: 18,
                                  background: "#FFEAE3",
                                  borderRadius: "50%",
                                  padding: 6,
                                }}
                              ></i>
                            </div>
                            <div
                              style={{
                                color: "#FF5015",
                                fontWeight: 600,
                                fontSize: 13,
                              }}
                            >
                              Click to upload
                            </div>
                            <div
                              className="small text-muted"
                              style={{ fontSize: 12 }}
                            >
                              Drag and drop · xlsx, xls, csv up to 50MB
                            </div>
                          </div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            name="importFile"
                            accept=".xlsx,.xls,.csv"
                            onChange={(e) =>
                              setUploadForm({
                                ...uploadForm,
                                file: e.target.files?.[0] || null,
                              })
                            }
                            style={{ display: "none" }}
                          />
                        </div>
                        {uploadForm.file && (
                          <div className="mt-2" style={{ marginTop: 8 }}>
                            <span className="badge bg-secondary me-2">
                              {uploadForm.file.name}
                            </span>
                            <span className="text-muted">
                              {formatBytes(uploadForm.file.size)}
                            </span>
                            <button
                              type="button"
                              className="btn btn-xs btn-link ms-2"
                              onClick={() =>
                                setUploadForm({ ...uploadForm, file: null })
                              }
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Checks */}
                    <div className="row form-group" style={{ marginTop: 8 }}>
                      <div className="col-md-12">
                        <div className="mb-1" style={{ fontWeight: 600 }}>
                          Quick Checks
                        </div>
                        <label className="me-3">
                          <input
                            type="checkbox"
                            style={{
                              accentColor: "#FF5015",
                              verticalAlign: "middle",
                            }}
                            checked={!!uploadForm.upsert}
                            onChange={(e) =>
                              setUploadForm({
                                ...uploadForm,
                                upsert: e.target.checked,
                              })
                            }
                          />{" "}
                          upsert
                        </label>
                        <label className="me-3">
                          <input
                            type="checkbox"
                            style={{
                              accentColor: "#FF5015",
                              verticalAlign: "middle",
                            }}
                            checked={!!uploadForm.dry_run}
                            onChange={(e) =>
                              setUploadForm({
                                ...uploadForm,
                                dry_run: e.target.checked,
                              })
                            }
                          />{" "}
                          dry run
                        </label>
                      </div>
                    </div>

                    {/* Settings */}
                    <div className="row form-group" style={{ marginTop: 8 }}>
                      <div className="col-md-12">
                        <div
                          className="d-flex align-items-center mb-1"
                          style={{ gap: 6 }}
                        >
                          <div style={{ fontWeight: 600 }}>Settings</div>
                          <InfoIcon title="Set import type and behavior." />
                        </div>
                        <label className="d-block" style={{ fontSize: 12 }}>
                          Import Type
                        </label>
                        <div className="input-group">
                          <select
                            className="form-control"
                            value={uploadForm.import_type}
                            onChange={(e) =>
                              setUploadForm({
                                ...uploadForm,
                                import_type: e.target.value,
                              })
                            }
                          >
                            {importTypeOptions.map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Conflict Strategy & Run Mode */}
                    <div className="row form-group" style={{ marginTop: 8 }}>
                      <div className="col-md-6">
                        <div
                          className="d-flex align-items-center mb-1"
                          style={{ gap: 6 }}
                        >
                          <div>Conflict Strategy</div>
                          <InfoIcon title="Insert only will not update; Upsert updates if exists." />
                        </div>
                        <label className="me-3">
                          <input
                            type="radio"
                            name="strategy"
                            style={{
                              accentColor: "#FF5015",
                              verticalAlign: "middle",
                            }}
                            checked={!uploadForm.upsert}
                            onChange={() =>
                              setUploadForm({ ...uploadForm, upsert: false })
                            }
                          />{" "}
                          Insert only
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="strategy"
                            style={{
                              accentColor: "#FF5015",
                              verticalAlign: "middle",
                            }}
                            checked={uploadForm.upsert}
                            onChange={() =>
                              setUploadForm({ ...uploadForm, upsert: true })
                            }
                          />{" "}
                          Upsert (Existing)
                        </label>
                      </div>
                      <div className="col-md-6">
                        <div
                          className="d-flex align-items-center mb-1"
                          style={{ gap: 6 }}
                        >
                          <div>Run Mode</div>
                          <InfoIcon title="Validate only performs a dry-run; Import writes data." />
                        </div>
                        <label className="me-3">
                          <input
                            type="radio"
                            name="runmode"
                            style={{
                              accentColor: "#FF5015",
                              verticalAlign: "middle",
                            }}
                            checked={uploadForm.dry_run === true}
                            onChange={() =>
                              setUploadForm({ ...uploadForm, dry_run: true })
                            }
                          />{" "}
                          Validate only (Dry Run)
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="runmode"
                            style={{
                              accentColor: "#FF5015",
                              verticalAlign: "middle",
                            }}
                            checked={uploadForm.dry_run === false}
                            onChange={() =>
                              setUploadForm({ ...uploadForm, dry_run: false })
                            }
                          />{" "}
                          Import (Write)
                        </label>
                      </div>
                    </div>

                    {/* Overlaps & Transactional */}
                    <div className="row form-group" style={{ marginTop: 8 }}>
                      <div className="col-md-6">
                        <div className="mb-1">
                          Overlaps (Schedules){" "}
                          <InfoIcon title="Use for Seasons/Rates/Allotments only." />
                        </div>
                        <div>
                          <label className="me-3">
                            <input
                              type="checkbox"
                              style={{
                                accentColor: "#FF5015",
                                verticalAlign: "middle",
                              }}
                              checked={!!uploadForm.allow_overlaps}
                              onChange={(e) =>
                                setUploadForm({
                                  ...uploadForm,
                                  allow_overlaps: e.target.checked,
                                })
                              }
                            />{" "}
                            Allow overlaps
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              style={{
                                accentColor: "#FF5015",
                                verticalAlign: "middle",
                              }}
                              checked={!!uploadForm.merge_overlaps}
                              onChange={(e) =>
                                setUploadForm({
                                  ...uploadForm,
                                  merge_overlaps: e.target.checked,
                                })
                              }
                            />{" "}
                            Merge overlaps
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-1">
                          Transactional{" "}
                          <InfoIcon title="Roll back the whole job on critical errors." />
                        </div>
                        <label>
                          <input
                            type="checkbox"
                            style={{
                              accentColor: "#FF5015",
                              verticalAlign: "middle",
                            }}
                            checked={!!uploadForm.transactional}
                            onChange={(e) =>
                              setUploadForm({
                                ...uploadForm,
                                transactional: e.target.checked,
                              })
                            }
                          />{" "}
                          transactional
                        </label>
                      </div>
                    </div>

                    {/* Idempotency */}
                    <div
                      className="panel panel-default mt-3"
                      style={{
                        marginTop: 12,
                        boxShadow: "none",
                        border: "1px solid #f0f0f0",
                        borderRadius: 8,
                      }}
                    >
                      <div
                        className="panel-heading d-flex justify-content-between align-items-center"
                        style={{
                          padding: 10,
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                        }}
                      >
                        <span>
                          Idempotency Key{" "}
                          <InfoIcon title="Same key returns the first job. Safe for retries." />
                        </span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                          onClick={autoGenerateIdempotency}
                        >
                          Auto Generate
                        </button>
                      </div>
                      <div className="panel-body" style={{ padding: 12 }}>
                        <label style={{ fontSize: 12 }}>
                          Write or Generate Key
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="optional"
                            value={uploadForm.idempotency_key || ""}
                            onChange={(e) =>
                              setUploadForm({
                                ...uploadForm,
                                idempotency_key: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="small text-muted mt-1">
                          Same key returns the first job; useful for retries.
                        </div>
                      </div>
                    </div>

                    <div
                      className="d-flex justify-content-start mt-3"
                      style={{ marginTop: 16, gap: 10 }}
                    >
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setUploadForm({
                            ...uploadForm,
                            file: null,
                            idempotency_key: "",
                          });
                          setErrors("");
                        }}
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        className="btn btn-dark"
                        disabled={submitting}
                      >
                        {submitting ? "Submitting..." : "Save"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={onUrlSubmit}>
                    <div
                      className="row form-group"
                      style={{ marginBottom: 12 }}
                    >
                      <div className="col-md-12">
                        <label className="d-block">Import from URL</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="https://... (Google Sheets edit link ok)"
                          value={urlForm.file_url}
                          onChange={(e) =>
                            setUrlForm({ ...urlForm, file_url: e.target.value })
                          }
                          required
                        />
                        <div className="small text-muted mt-1">
                          URL must resolve to an Excel file; Google Sheets links
                          are auto-converted.
                        </div>
                      </div>
                    </div>

                    <div className="row form-group" style={{ marginTop: 12 }}>
                      <div className="col-md-12">
                        <div
                          className="d-flex align-items-center mb-1"
                          style={{ gap: 6 }}
                        >
                          <div style={{ fontWeight: 600 }}>Settings</div>
                          <InfoIcon title="Set import type and behavior." />
                        </div>
                        <label className="d-block" style={{ fontSize: 12 }}>
                          Import Type
                        </label>
                        <div className="input-group">
                          <select
                            className="form-control"
                            value={urlForm.import_type}
                            onChange={(e) =>
                              setUrlForm({
                                ...urlForm,
                                import_type: e.target.value,
                              })
                            }
                          >
                            {importTypeOptions.map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row form-group" style={{ marginTop: 8 }}>
                      <div className="col-md-6">
                        <div
                          className="d-flex align-items-center mb-1"
                          style={{ gap: 6 }}
                        >
                          <div>Run Mode</div>
                          <InfoIcon title="Validate only performs a dry-run; Import writes data." />
                        </div>
                        <label className="me-3">
                          <input
                            type="radio"
                            name="runmode-url"
                            style={{
                              accentColor: "#FF5015",
                              verticalAlign: "middle",
                            }}
                            checked={urlForm.dry_run === true}
                            onChange={() =>
                              setUrlForm({ ...urlForm, dry_run: true })
                            }
                          />{" "}
                          Validate only (Dry Run)
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="runmode-url"
                            style={{
                              accentColor: "#FF5015",
                              verticalAlign: "middle",
                            }}
                            checked={urlForm.dry_run === false}
                            onChange={() =>
                              setUrlForm({ ...urlForm, dry_run: false })
                            }
                          />{" "}
                          Import (Write)
                        </label>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-1">
                          Transactional{" "}
                          <InfoIcon title="Roll back the whole job on critical errors." />
                        </div>
                        <label>
                          <input
                            type="checkbox"
                            style={{ accentColor: "#16a34a" }}
                            checked={!!urlForm.transactional}
                            onChange={(e) =>
                              setUrlForm({
                                ...urlForm,
                                transactional: e.target.checked,
                              })
                            }
                          />{" "}
                          transactional
                        </label>
                      </div>
                    </div>

                    <div
                      className="panel panel-default mt-3"
                      style={{
                        marginTop: 12,
                        boxShadow: "none",
                        border: "1px solid #f0f0f0",
                        borderRadius: 8,
                      }}
                    >
                      <div
                        className="panel-heading d-flex justify-content-between align-items-center"
                        style={{
                          padding: 10,
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                        }}
                      >
                        <span>
                          Idempotency Key{" "}
                          <InfoIcon title="Same key returns the first job. Safe for retries." />
                        </span>
                        <button
                          className="btn btn-xs"
                          type="button"
                          onClick={autoGenerateIdempotency}
                          style={{
                            border: "1px solid #FF5015",
                            color: "#FF5015",
                            padding: "3px 10px",
                            borderRadius: 12,
                            background: "#fff",
                          }}
                        >
                          Auto Generate
                        </button>
                      </div>
                      <div className="panel-body" style={{ padding: 12 }}>
                        <label style={{ fontSize: 12 }}>
                          Write or Generate Key
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="optional"
                            value={urlForm.idempotency_key || ""}
                            onChange={(e) =>
                              setUrlForm({
                                ...urlForm,
                                idempotency_key: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="small text-muted mt-1">
                          Same key returns the first job; useful for retries.
                        </div>
                      </div>
                    </div>

                    <div
                      className="d-flex justify-content-start mt-3"
                      style={{ marginTop: 16, gap: 10 }}
                    >
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setUrlForm({
                            ...urlForm,
                            file_url: "",
                            sheet: "",
                            idempotency_key: "",
                          });
                          setErrors("");
                        }}
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        className="btn btn-dark"
                        disabled={submitting}
                      >
                        {submitting ? "Submitting..." : "Save"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Jobs stays as-is */}
        <div className="row mt-3" style={{ marginTop: 16 }}>
          <div className="col-md-12">
            <div
              className="panel panel-default"
              style={{
                boxShadow: "0 2px 8px rgba(0,0,0,.04)",
                borderRadius: 8,
              }}
            >
              <div
                className="panel-heading d-flex justify-content-between align-items-center"
                style={{
                  padding: 12,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              >
                <span>Recent Imports</span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  aria-label="Refresh recent jobs"
                  title="Refresh recent jobs"
                  onClick={() => {
                    setJobs((j) => [...j]);
                    SuccessApiToast("Job list refreshed");
                  }}
                  style={{ borderRadius: 6 }}
                >
                  <i className="fa fa-refresh" style={{ marginRight: 6 }}></i>
                  Refresh
                </button>
              </div>
              <div
                className="panel-body"
                style={{ overflowX: "auto", padding: 16 }}
              >
                {jobs.length === 0 ? (
                  <div className="text-muted">
                    No Imports yet—run your first import above.
                  </div>
                ) : (
                  <table className="table table-striped  table-sm">
                    <thead>
                      <tr>
                        <th>Job ID</th>
                        <th>Type</th>
                        <th>Mode</th>
                        <th>Total</th>
                        <th>Valid</th>
                        <th>Invalid</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {jobs.map((j) => (
                        <tr key={j.id}>
                          <td className="small" title={j.id}>
                            {j.id}
                          </td>
                          <td className="small">{j.import_type || "-"}</td>
                          <td className="small">
                            {j.dry_run ? "Dry run" : "Write"}
                          </td>
                          <td className="small">{j.total ?? "-"}</td>
                          <td className="small">{j.valid ?? "-"}</td>
                          <td className="small">{j.invalid ?? "-"}</td>
                          <td className="small">
                            <StatusBadge status={j.status} />
                          </td>
                          <td className="small actionlink">
                            <div
                              className="actionCont"
                              style={{ width: "auto", whiteSpace: "nowrap" }}
                            >
                              <div
                                className="input-group-addon"
                                title="Details"
                                style={{
                                  display: "inline-block",
                                  marginRight: 6,
                                }}
                              >
                                <a onClick={() => setSelectedJob(j)}>
                                  <i className="fa fa-eye" />
                                </a>
                              </div>
                              <div
                                className="input-group-addon"
                                title="Download Errors"
                                style={{
                                  display: "inline-block",
                                  marginRight: 6,
                                }}
                              >
                                <a onClick={() => onDownloadErrors(j.id)}>
                                  <i className="fa fa-download" />
                                </a>
                              </div>
                              <div
                                className="input-group-addon"
                                title="Regenerate Report"
                                style={{
                                  display: "inline-block",
                                  marginRight: 6,
                                }}
                              >
                                <a onClick={() => onRegenerate(j.id)}>
                                  <i className="fa fa-refresh" />
                                </a>
                              </div>
                              <div
                                className="input-group-addon"
                                title="Debug"
                                style={{ display: "inline-block" }}
                              >
                                <a onClick={() => onDebug(j.id)}>
                                  <i className="fa fa-bug" />
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {debugData && (
        <div
          className="modal"
          style={{ display: "block", background: "rgba(0,0,0,.35)" }}
        >
          <div className="modal-dialog modal-lg" style={{ marginTop: 60 }}>
            <div
              className="modal-content"
              style={{
                borderRadius: 10,
                boxShadow: "0 12px 28px rgba(0,0,0,.18)",
              }}
            >
              <div
                className="modal-header d-flex align-items-center"
                style={{
                  padding: 12,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  position: "relative",
                }}
              >
                <h5
                  className="modal-title"
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <i className="fa fa-bug" aria-hidden="true"></i>
                  Debug Details
                </h5>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setDebugData(null)}
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 10,
                    background: "transparent",
                    border: 0,
                    padding: 4,
                    cursor: "pointer",
                  }}
                  title="Close"
                >
                  <i
                    className="fa fa-times"
                    style={{ fontSize: 18, color: "#6c757d" }}
                  ></i>
                </button>
              </div>
              <div
                className="modal-body"
                style={{ maxHeight: 520, overflowY: "auto", padding: 16 }}
              >
                <pre
                  className="small"
                  style={{
                    whiteSpace: "pre-wrap",
                    background: "#f8f9fa",
                    padding: 12,
                    borderRadius: 6,
                    maxHeight: 460,
                    overflow: "auto",
                  }}
                >
                  {JSON.stringify(debugData, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onDownload={onDownloadErrors}
          onRegenerate={onRegenerate}
        />
      )}
    </>
  );
};

export default ImportHotels;
