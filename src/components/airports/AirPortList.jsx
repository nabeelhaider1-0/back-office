import React, { useState, useEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import Header2 from "../header2/header2";
import { apiHandler } from "../../Apis/backOfficeApiHandler";
import {
  getPermittedMenuItems,
  isSuperAdmin,
  hasPermission,
} from "../../authUtils";
import routeConfig from "../../routeConfig";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Button,
  Form,
  Spinner,
  ProgressBar,
  Alert,
} from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

const CHUNK_SIZE = 100; // Upload 100 records per request

const AirportList = () => {
  const [airports, setAirports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permittedItems, setPermittedItems] = useState([]);
  const [isSuperAdminState, setIsSuperAdminState] = useState(false);

  // import modal & import states
  const [showImportModal, setShowImportModal] = useState(false);
  const [importedData, setImportedData] = useState([]);
  const [importSearchQuery, setImportSearchQuery] = useState("");
  const [importCurrentPage, setImportCurrentPage] = useState(1);
  const [importPageSize, setImportPageSize] = useState(10);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [importLoading, setImportLoading] = useState(false);
  const [progress, setProgress] = useState({
    total: 0,
    processed: 0,
    succeeded: 0,
    updated: 0,
    failed: 0,
  });
  const [errors, setErrors] = useState([]);
  const cancelRef = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {
    setPermittedItems(
      getPermittedMenuItems(routeConfig).filter(
        (item) => item.module_name === "Airport Management"
      )
    );
    setIsSuperAdminState(isSuperAdmin());
  }, []);

  // load airports with robust response handling (handles 304 and different apiHandler shapes)
  useEffect(() => {
    const loadAirports = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiHandler.get("/api/airports", {
          params: { page: currentPage, limit: pageSize, search: searchQuery },
          // optional: disable caching in some environments - apiHandler may ignore headers but safe to add
          headers: { "Cache-Control": "no-cache" },
        });

        // apiHandler might return { status: true, data: [...] } OR Axios-like response with numeric status
        if (result?.status === 304) {
          // Not Modified - keep existing state
          console.info("Airports: 304 Not Modified — keeping current state");
        } else if (result?.status === true && Array.isArray(result?.data)) {
          // custom apiHandler shape: { status: true, data: [...] }
          const mappedAirports = result.data.map((airport, idx) => ({
            id: idx + 1 + (currentPage - 1) * pageSize,
            airport_id: airport?.id || null,
            name: airport.name || "",
            name_full: airport.name_full || "",
            iata_code: airport.iata_airport_code || "N/A",
            country_name: airport.country_code || "N/A",
            is_active:
              typeof airport.is_active === "boolean"
                ? airport.is_active
                : !!airport.is_active,
            createdAt: airport.createdAt || airport.created_at || null,
            updatedAt: airport.updatedAt || airport.updated_at || null,
          }));
          setAirports(mappedAirports);
          setTotalPages(
            Math.ceil((result.meta?.total || mappedAirports.length) / pageSize)
          );
        } else if (
          typeof result?.status === "number" &&
          result?.status >= 200 &&
          result?.status < 300 &&
          Array.isArray(result?.data)
        ) {
          // Axios-like
          const mappedAirports = result.data.map((airport, idx) => ({
            id: idx + 1 + (currentPage - 1) * pageSize,
            airport_id: airport?.id || null,
            name: airport.name || "",
            iata_code: airport.iata_airport_code || "N/A",
            country_name: airport.country_code || "N/A",
            is_active:
              typeof airport.is_active === "boolean"
                ? airport.is_active
                : !!airport.is_active,
            createdAt: airport.createdAt || airport.created_at || null,
            updatedAt: airport.updatedAt || airport.updated_at || null,
          }));
          setAirports(mappedAirports);
          setTotalPages(
            Math.ceil(
              (result.data?.meta?.total || mappedAirports.length) / pageSize
            )
          );
        } else if (Array.isArray(result)) {
          // just an array returned directly
          setAirports(result.map((a, idx) => ({ id: idx + 1, ...a })));
          setTotalPages(Math.ceil(result.length / pageSize));
        } else {
          // unknown shape but may contain data
          const data = result?.data ?? [];
          if (Array.isArray(data)) {
            setAirports(
              data.map((airport, idx) => ({
                id: idx + 1,
                airport_id: airport.id,
                name: airport.name || "",
                iata_code: airport.iata_airport_code || "N/A",
                country_name: airport.country_code || "N/A",
                is_active: airport.is_active,
                createdAt: airport.created_at || airport.createdAt || null,
                updatedAt: airport.updated_at || airport.updatedAt || null,
              }))
            );
            setTotalPages(
              Math.ceil((result?.meta?.total || data.length) / pageSize)
            );
          } else {
            // fallback to empty
            setAirports([]);
            setTotalPages(1);
            if (result && result?.message) {
              toast.error(result.message);
            }
          }
        }
      } catch (err) {
        console.error("loadAirports error:", err);
        const errMsg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch airports";
        setError(errMsg);
        setAirports([]);
        toast.error(errMsg);
      } finally {
        setLoading(false);
      }
    };

    loadAirports();
  }, [currentPage, searchQuery, pageSize]);

  const userHasPermission = (routePaths) =>
    isSuperAdminState || hasPermission("Airport Management", routePaths);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const handleViewAirport = (id) => {
    if (!userHasPermission(["read"])) return;
    navigate(`/airports/view/${id}`);
  };

  const handleEditAirport = (id) => {
    if (!userHasPermission(["update"])) return;
    navigate(`/airports/edit/${id}`);
  };

  const handleAddNewAirport = () => {
    if (!userHasPermission(["create"])) return;
    navigate("/airports/new");
  };

  const actionRoutes = {
    view: "read",
    edit: "update",
    create: "create",
    delete: "delete",
    status: "status",
  };
  const hasAnyActionPermission = userHasPermission([
    actionRoutes.view,
    actionRoutes.edit,
    actionRoutes.create,
    actionRoutes.status,
  ]);

  // Download sample excel
  const downloadSampleExcel = () => {
    const sampleData = [
      {
        name: "John F Kennedy International",
        latitude_deg: 40.6398,
        longitude_deg: -73.7789,
        iso_country: "US",
        iata_code: "JFK",
      },
    ];
    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sample");
    XLSX.writeFile(wb, "sample_airports.xlsx");
  };

  // Dropzone setup
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        toast.error("Please upload a valid Excel file (.xlsx or .xls)");
        return;
      }
      setImportLoading(true);
      const file = acceptedFiles[0];
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[1] || workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          // defval avoids undefined cells
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

          // Normalize & add ids
          const validatedData = jsonData.map((row, index) => ({
            id: index + 1,
            name: row.name ?? row.Name ?? "",
            iata_code: row.iata_code ?? row.IATA ?? row.iata ?? "",
            iso_country: row.iso_country ?? row.country ?? row.Country ?? "",
            latitude_deg: row.latitude_deg ?? row.latitude ?? "",
            longitude_deg: row.longitude_deg ?? row.longitude ?? "",
            is_active:
              row.is_active === "" || row.is_active == null
                ? true
                : Boolean(row.is_active),
            raw: row,
          }));

          setImportedData(validatedData);
          setSelectedRecords(validatedData.map((r) => r.id));
          setProgress((p) => ({ ...p, total: validatedData.length }));
          if (validatedData.length === 0)
            toast.warn("No rows found in the uploaded file.");
        };
        reader.readAsArrayBuffer(file);
      } catch (err) {
        console.error("read file error", err);
        toast.error("Failed to read Excel file");
      } finally {
        setImportLoading(false);
      }
    },
  });

  // chunked sequential upload: CHUNK_SIZE per request, await each
  const handleSaveAirports = async () => {
    if (selectedRecords.length === 0) {
      toast.error("Please select at least one record to upload");
      return;
    }
    setImportLoading(true);
    setErrors([]);
    cancelRef.current = false;
    const selectedData = importedData.filter((row) =>
      selectedRecords.includes(row.id)
    );
    setProgress({
      total: selectedData.length,
      processed: 0,
      succeeded: 0,
      updated: 0,
      failed: 0,
    });

    for (let i = 0; i < selectedData.length; i += CHUNK_SIZE) {
      if (cancelRef.current) break;

      const chunkRows = selectedData.slice(i, i + CHUNK_SIZE);
      console.log(chunkRows);
      const payload = chunkRows.map((row) => ({
        name: row.name,
        //expedia_id: row.iata_code,
        name_full: `${row?.raw?.municipality}, ${row?.raw?.country_name} (${row.iata_code})`,
        country_name: `${row.country_name}`,
        country_code: row.iso_country,
        iata_airport_code: row.iata_code,
        center_latitude: row.latitude_deg,
        center_longitude: row.longitude_deg,
        is_active: row.is_active,
      }));

      try {
        // sequential call - wait for completion before continuing
        const result = await apiHandler.post("/api/airports/bulk", payload);
        // same defensive checking as earlier:
        if (result?.status === 304) {
          // server says nothing changed for this chunk — count as processed but not created
          setProgress((prev) => ({
            ...prev,
            processed: prev.processed + payload.length,
          }));
        } else if (
          result?.status === true ||
          (typeof result?.status === "number" &&
            result.status >= 200 &&
            result.status < 300)
        ) {
          const createdCount = Number(
            result?.data?.createdCount ?? payload.length
          );
          const updatedCount = Number(result?.data?.updatedCount ?? 0);
          setProgress((prev) => ({
            ...prev,
            processed: prev.processed + payload.length,
            succeeded: prev.succeeded + createdCount,
            updated: prev.updated + updatedCount,
          }));
        } else {
          // treat as failure chunk
          const msg = result?.message ?? "Unknown server error";
          setErrors((prev) => [
            ...prev,
            `Chunk starting at row ${i + 1} failed: ${msg}`,
          ]);
          setProgress((prev) => ({
            ...prev,
            processed: prev.processed + payload.length,
            failed: prev.failed + payload.length,
          }));
        }
      } catch (err) {
        console.error("chunk upload error", err);
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to upload chunk";
        setErrors((prev) => [
          ...prev,
          `Chunk starting at row ${i + 1} failed: ${msg}`,
        ]);
        setProgress((prev) => ({
          ...prev,
          processed: prev.processed + payload.length,
          failed: prev.failed + payload.length,
        }));
      }
    }

    setImportLoading(false);

    if (!cancelRef.current) {
      toast.success(
        "Import process finished (check succeeded/updated/failed counts)."
      );
      // refresh first page
      setCurrentPage(1);
      try {
        const refresh = await apiHandler.get("/api/airports", {
          params: { page: 1, limit: pageSize, search: searchQuery },
          headers: { "Cache-Control": "no-cache" },
        });
        if (refresh?.status === 304) {
          // nothing to do
        } else if (refresh?.status === true && Array.isArray(refresh.data)) {
          const mapped = refresh.data.map((airport, idx) => ({
            id: idx + 1,
            airport_id: airport.id,
            name: airport.name || "",
            iata_code: airport.iata_airport_code || "N/A",
            country_name: airport.country_code || "N/A",
            is_active: airport.is_active,
            createdAt: airport.created_at || airport.createdAt || null,
            updatedAt: airport.updated_at || airport.updatedAt || null,
          }));
          setAirports(mapped);
          setTotalPages(
            Math.ceil((refresh.meta?.total || mapped.length) / pageSize)
          );
        } else if (Array.isArray(refresh?.data)) {
          const mapped = refresh.data.map((airport, idx) => ({
            id: idx + 1,
            airport_id: airport.id,
            name: airport.name || "",
            iata_code: airport.iata_airport_code || "N/A",
            country_name: airport.country_code || "N/A",
            is_active: airport.is_active,
            createdAt: airport.created_at || airport.createdAt || null,
            updatedAt: airport.updated_at || airport.updatedAt || null,
          }));
          setAirports(mapped);
          setTotalPages(Math.ceil(refresh.data.length / pageSize));
        }
      } catch (refreshErr) {
        // do not block user for refresh failures
        console.error("refresh after import failed", refreshErr);
      }
    } else {
      toast.info("Import cancelled by user.");
    }
  };

  const handleCancelImport = () => {
    cancelRef.current = true;
  };

  const filteredImportedData = useMemo(() => {
    const q = (importSearchQuery || "").toLowerCase();
    return importedData.filter(
      (row) =>
        String(row.name || "")
          .toLowerCase()
          .includes(q) ||
        String(row.iata_code || "")
          .toLowerCase()
          .includes(q) ||
        String(row.iso_country || "")
          .toLowerCase()
          .includes(q) ||
        ((q.toLowerCase() === "true" || q.toLowerCase() === "active") &&
          row.is_active === true) ||
        ((q.toLowerCase() === "false" || q.toLowerCase() === "inactive") &&
          row.is_active === false) ||
        String(row.is_active || "")
          .toLowerCase()
          .includes(q)
    );
  }, [importedData, importSearchQuery]);

  const paginatedImportedData = useMemo(() => {
    const start = (importCurrentPage - 1) * importPageSize;
    const end = start + importPageSize;
    return filteredImportedData.slice(start, end);
  }, [filteredImportedData, importCurrentPage, importPageSize]);

  const importTotalPages = Math.max(
    1,
    Math.ceil(filteredImportedData.length / importPageSize)
  );

  const handleDeleteAirport = async (id) => {
    if (!userHasPermission([actionRoutes.delete])) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this airport? This action cannot be undone.",
      icon: "warning",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a ",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await apiHandler.delete(`/api/airports/${id}`);
      if (response?.status) {
        toast.success("Airport deleted successfully");
        setAirports((prev) => prev.filter((a) => a.airport_id !== id));
      } else {
        toast.error(response?.message || "Failed to delete airport");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error deleting airport");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    if (!userHasPermission([actionRoutes.status])) return;
    try {
      const response = await apiHandler.patch(`/api/airports/${id}/status`, {
        is_active: !currentStatus,
      });
      if (response?.status) {
        toast.success(
          `Airport ${!currentStatus ? "activated" : "deactivated"} successfully`
        );
        setAirports((prev) =>
          prev.map((a) =>
            a.airport_id === id ? { ...a, is_active: !currentStatus } : a
          )
        );
      } else {
        toast.error(response?.message || "Failed to update status");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error updating status");
    }
  };
  return (
    <>
      <Header2
        title="AIRPORT MANAGEMENT"
        linkText1="Airport List"
        linkText2="Add Airport"
        link2="/airports/new"
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="row mt-4 mb-4 align-items-center">
          <div className="col-md-6">
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Search by name, IATA code, or country..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {userHasPermission([actionRoutes.create]) && (
            <div className="col-md-6 d-flex justify-content-end">
              <Button
                variant="dark"
                size="sm"
                className="me-2"
                onClick={handleAddNewAirport}
              >
                Add New Airport
              </Button>
              <button
                className="btn btn-outline-secondary btn-sm ms-2"
                size="sm"
                onClick={() => {
                  setShowImportModal(true);
                  setImportedData([]);
                  setSelectedRecords([]);
                  setImportCurrentPage(1);
                  setImportPageSize(10);
                  setImportSearchQuery("");
                  setImportLoading(false);
                  setProgress({
                    total: 0,
                    processed: 0,
                    succeeded: 0,
                    updated: 0,
                    failed: 0,
                  });
                  setErrors([]);
                }}
              >
                Import Airports
              </button>
            </div>
          )}
        </div>

        <div className="row mt-2">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table table-bordered ">
                <thead>
                  <tr>
                    <th>Sr#</th>
                    <th>Name</th>
                    <th>Full Name</th>
                    <th>IATA Code</th>
                    <th>Country</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    {hasAnyActionPermission && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading && airports.length > 0 ? (
                    airports.map((airport) => (
                      <tr key={airport.id}>
                        <td>{airport.id}</td>
                        <td>{airport.name}</td>
                        <td>{airport?.name_full}</td>
                        <td>{airport.iata_code}</td>
                        <td>{airport.country_name}</td>
                        <td>
                          {userHasPermission([actionRoutes.status]) ? (
                            <div
                              className="cursor-pointer"
                              onClick={() =>
                                handleToggleStatus(
                                  airport.airport_id,
                                  airport.is_active
                                )
                              }
                              title={
                                airport.is_active ? "Deactivate" : "Activate"
                              }
                            >
                              {airport.is_active ? (
                                <FaToggleOn
                                  className="fs-2"
                                  style={{ color: "var(--color-secondary)" }}
                                />
                              ) : (
                                <FaToggleOff
                                  className="fs-2 fa-solid"
                                  style={{
                                    color: "var(--color-deactive)",
                                  }}
                                />
                              )}
                            </div>
                          ) : (
                            <span
                              className={`badge ${
                                airport.is_active ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {airport.is_active ? "Active" : "Inactive"}
                            </span>
                          )}
                        </td>
                        <td>
                          {airport.createdAt
                            ? new Date(airport.createdAt).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )
                            : "—"}
                        </td>
                        <td>
                          {airport.updatedAt
                            ? new Date(airport.updatedAt).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )
                            : "—"}
                        </td>
                        {hasAnyActionPermission && (
                          <td>
                            <div className="actionCont d-flex align-items-center">
                              {userHasPermission([actionRoutes.view]) && (
                                <div
                                  className="input-group-addon addFirst mr-2"
                                  onClick={() =>
                                    handleViewAirport(airport.airport_id)
                                  }
                                  data-toggle="tooltip"
                                  title="View"
                                  role="button"
                                  tabIndex={0}
                                >
                                  <i class="fa fa-eye" aria-hidden="true"></i>
                                </div>
                              )}
                              {userHasPermission([actionRoutes.edit]) && (
                                <div
                                  className="input-group-addon addFirst mr-2"
                                  onClick={() =>
                                    handleEditAirport(airport.airport_id)
                                  }
                                  data-toggle="tooltip"
                                  title="Edit"
                                  role="button"
                                  tabIndex={0}
                                >
                                  <i class="fa fa-edit" aria-hidden="true"></i>
                                </div>
                              )}

                              {userHasPermission([actionRoutes.delete]) && (
                                <div
                                  className="input-group-addon addFirst mr-2"
                                  onClick={() =>
                                    handleDeleteAirport(airport.airport_id)
                                  }
                                  data-toggle="tooltip"
                                  title="Delete"
                                  role="button"
                                  tabIndex={0}
                                >
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </div>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={12} className="text-center">
                        {loading ? "Loading..." : "No data found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <select
                  className="form-control form-control-sm"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(parseInt(e.target.value, 10));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value={50}>50 per page</option>
                  <option value={100}>100 per page</option>
                </select>
              </div>
              <div>
                <button
                  className="btn btn-dark btn-sm me-2"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-dark btn-sm ms-2"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showImportModal}
        onHide={() => {
          if (!importLoading) {
            setShowImportModal(false);
            setImportedData([]);
            setSelectedRecords([]);
            setImportCurrentPage(1);
            setImportPageSize(10);
            setImportSearchQuery("");
            setImportLoading(false);
            setProgress({
              total: 0,
              processed: 0,
              succeeded: 0,
              updated: 0,
              failed: 0,
            });
            setErrors([]);
          }
        }}
        size="xl"
        backdrop={importLoading ? "static" : true}
        keyboard={!importLoading}
      >
        <Modal.Header
          closeButton={!importLoading}
          onClick={() => {
            setShowImportModal(false);
            setImportedData([]);
            setSelectedRecords([]);
            setImportCurrentPage(1);
            setImportPageSize(10);
            setImportSearchQuery("");
            setImportLoading(false);
            setProgress({
              total: 0,
              processed: 0,
              succeeded: 0,
              updated: 0,
              failed: 0,
            });
            setErrors([]);
          }}
        >
          <Modal.Title>Import Airports</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {importLoading && (
            <Alert variant="warning" className="text-center">
              Import in progress. Please do not close or refresh the window.
            </Alert>
          )}

          <div className="mb-3">
            <Button
              variant="dark"
              size="sm"
              onClick={downloadSampleExcel}
              disabled={importLoading}
            >
              Download Sample Excel
            </Button>
          </div>

          <div
            {...getRootProps()}
            className={`border p-4 text-center ${
              isDragActive ? "bg-light" : ""
            }`}
            style={{
              borderRadius: "8px",
              borderStyle: "dashed",
              cursor: importLoading ? "not-allowed" : "pointer",
            }}
          >
            <input {...getInputProps()} disabled={importLoading} />
            {isDragActive ? (
              <p>Drop the Excel file here...</p>
            ) : (
              <p>
                Drag & drop an Excel file here, or click to select one (.xlsx,
                .xls)
              </p>
            )}
          </div>

          {progress.total > 0 && (
            <div className="my-3">
              <ProgressBar
                now={Math.round((progress.processed / progress.total) * 100)}
                label={`${progress.processed}/${progress.total}`}
              />
              <p className="mt-2">
                Succeeded: {progress.succeeded} | Updated: {progress.updated}{" "}
                |Failed: {progress.failed}
              </p>
            </div>
          )}

          {errors.length > 0 && (
            <Alert variant="danger">
              <ul className="mb-0">
                {errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </Alert>
          )}

          {importedData.length > 0 && !importLoading && (
            <>
              <div className="form-group mt-3">
                <input
                  type="search"
                  className="form-control form-control-sm"
                  placeholder="Search imported data by name, IATA code, country, or status as(true || false || active || inactive)..."
                  value={importSearchQuery}
                  onChange={(e) => {
                    setImportSearchQuery(e.target.value);
                    setImportCurrentPage(1);
                  }}
                />
              </div>

              <div
                className="table-responsive mt-3"
                style={{ maxHeight: 420, overflow: "auto" }}
              >
                <table className="table table-bordered ">
                  <thead>
                    <tr>
                      <th style={{ width: 40 }}>
                        <Form.Check
                          checked={
                            selectedRecords.length ===
                              filteredImportedData.length &&
                            filteredImportedData.length > 0
                          }
                          onChange={() =>
                            setSelectedRecords(
                              selectedRecords.length ===
                                filteredImportedData.length
                                ? []
                                : filteredImportedData.map((r) => r.id)
                            )
                          }
                        />
                      </th>
                      <th>ID</th>
                      <th>Name</th>
                      <th>IATA Code</th>
                      <th>Country</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                      <th>Is Active</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {paginatedImportedData.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <Form.Check
                            checked={selectedRecords.includes(row.id)}
                            onChange={() =>
                              setSelectedRecords((prev) =>
                                prev.includes(row.id)
                                  ? prev.filter((id) => id !== row.id)
                                  : [...prev, row.id]
                              )
                            }
                          />
                        </td>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.iata_code}</td>
                        <td>{row.iso_country}</td>
                        <td>{row.latitude_deg}</td>
                        <td>{row.longitude_deg}</td>
                        <td>
                          <Form.Check
                            checked={!!row.is_active}
                            onChange={() =>
                              setImportedData((prev) =>
                                prev.map((r) =>
                                  r.id === row.id
                                    ? { ...r, is_active: !r.is_active }
                                    : r
                                )
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <select
                    className="form-control form-control-sm"
                    value={importPageSize}
                    onChange={(e) => {
                      setImportPageSize(parseInt(e.target.value, 10));
                      setImportCurrentPage(1);
                    }}
                    disabled={importLoading}
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                    <option value={100}>100 per page</option>
                  </select>
                </div>
                <div>
                  <button
                    className="btn btn-dark btn-sm me-2"
                    disabled={importCurrentPage === 1 || importLoading}
                    onClick={() => setImportCurrentPage(importCurrentPage - 1)}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <span>
                    Page {importCurrentPage} of {importTotalPages}
                  </span>
                  <button
                    className="btn btn-dark btn-sm ms-2"
                    disabled={
                      importCurrentPage === importTotalPages || importLoading
                    }
                    onClick={() => setImportCurrentPage(importCurrentPage + 1)}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!importLoading && (
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setShowImportModal(false);
                setImportedData([]);
                setSelectedRecords([]);
                setImportSearchQuery("");
                setImportCurrentPage(1);
              }}
            >
              Close
            </Button>
          )}
          {importLoading && (
            <Button variant="danger" size="md" onClick={handleCancelImport}>
              Cancel Import
            </Button>
          )}
          {importedData.length > 0 && !importLoading && (
            <Button
              variant="dark"
              size="md"
              style={{ fontSize: "unset !important", fontWeight: "unset" }}
              onClick={handleSaveAirports}
            >
              Start Import
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AirportList;
