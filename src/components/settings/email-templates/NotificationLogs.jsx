import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import Header2 from "../../header2/header2";
import { apiHandler } from "../../../Apis/EmailHandler";
import Constants from "../../../constants/routes";
import { FaEye, FaRedo, FaToggleOn, FaToggleOff } from "react-icons/fa";
import {
  getPermittedMenuItems,
  isSuperAdmin,
  hasPermission,
} from "../../../authUtils";
import routeConfig from "../../../routeConfig";

const NotificationLogs = () => {
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [permittedItems, setPermittedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPermittedItems(
      getPermittedMenuItems(routeConfig).filter(
        (item) => item.module_name === "notification_logs"
      )
    );
    fetchLogs();
  }, [currentPage, searchQuery, pageSize]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const result = await apiHandler.get("/api/v1/notification-logs", {
        params: {
          page: currentPage,
          limit: pageSize,
          type: "",
          status: "",
          provider: searchQuery,
        },
      });
      if (result.status === "success") {
        setLogs(result.data);
        setTotalPages(Math.ceil(result.meta?.totalPages || 1));
      } else {
        setLogs([]);
        toast.error(result.message || "Failed to fetch notification logs");
      }
    } catch (error) {
      const errorMessage = error.message || "Failed to fetch notification logs";
      toast.error(errorMessage);
      setLogs([]);
    }
    setLoading(false);
  };

  const hasPermission = (actions) => {
    return (
      isSuperAdmin ||
      actions.some((action) => hasPermission("notification_logs", action))
    );
  };

  const handleView = (log) => {
    if (!hasPermission(["read"])) return;
    setSelectedLog(log);
    setShowModal(true);
  };

  const handleRetry = async (id) => {
    if (!hasPermission(["retry"])) return;
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to retry this notification?",
      icon: "question",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a",
      confirmButtonText: "Yes, retry it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const retryResult = await apiHandler.post(
            `/api/v1/notification-logs/${id}/retry`
          );
          if (retryResult.status === "success") {
            Swal.fire(
              "Success",
              "Notification re-queued successfully.",
              "success"
            );
            fetchLogs();
          } else {
            Swal.fire(
              "Error",
              retryResult.message || "Failed to retry notification",
              "error"
            );
          }
        } catch (error) {
          const errorMessage = error.message || "Failed to retry notification";
          Swal.fire("Error", errorMessage, "error");
        }
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const actionRoutes = {
    view: "read",
    retry: "retry",
  };

  const hasAnyActionPermission = hasPermission(["read", "retry"]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <Header2
        title="NOTIFICATION LOGS MANAGEMENT"
        linkText1="Dashboard"
        linkText2="Notification Logs"
        link1={Constants.URLConstants.DASHBOARD}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="row mt-4">
          <div className="form-group col-md-3 mb-3">
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Search by provider or recipient..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table table-bordered ">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Provider</th>
                    <th>Status</th>
                    <th>Recipient</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    {hasAnyActionPermission && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading && logs.length > 0 ? (
                    logs.map((log) => (
                      <tr key={log.id}>
                        <td>{log.id}</td>
                        <td>{log.type}</td>
                        <td>{log.provider}</td>
                        <td>
                          <span
                            className={`badge ${
                              log.status === "sent" ? "bg-success" : "bg-danger"
                            }`}
                          >
                            {log.status.charAt(0).toUpperCase() +
                              log.status.slice(1)}
                          </span>
                        </td>
                        <td>{log.recipient}</td>
                        <td>
                          {new Date(log.created_at).toLocaleString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </td>
                        <td>
                          {new Date(log.updated_at).toLocaleString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </td>
                        {hasAnyActionPermission && (
                          <td>
                            <div className="actionCont d-flex align-items-center">
                              {hasPermission(["read"]) && (
                                <div
                                  className="input-group-addon addFirst mr-2"
                                  onClick={() => handleView(log)}
                                  data-toggle="tooltip"
                                  title="View"
                                >
                                  <i class="fa fa-eye" aria-hidden="true"></i>
                                </div>
                              )}
                              {hasPermission(["retry"]) &&
                                log.status === "failed" && (
                                  <div
                                    className="input-group-addon addFirst mr-2"
                                    onClick={() => handleRetry(log.id)}
                                    data-toggle="tooltip"
                                    title="Retry"
                                  >
                                    <FaRedo />
                                  </div>
                                )}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={hasAnyActionPermission ? 8 : 7}
                        className="text-center"
                      >
                        {loading ? "Loading..." : "No logs found"}
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
                    setPageSize(parseInt(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value={50}>50 per page</option>
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
      {showModal && selectedLog && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          role="dialog"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Notification Log Detail</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>ID:</strong> {selectedLog.id}
                </p>
                <p>
                  <strong>Type:</strong> {selectedLog.type}
                </p>
                <p>
                  <strong>Provider:</strong> {selectedLog.provider}
                </p>
                <p>
                  <strong>Status:</strong> {selectedLog.status}
                </p>
                <p>
                  <strong>Recipient:</strong> {selectedLog.recipient}
                </p>
                <p>
                  <strong>Payload:</strong>
                </p>
                <pre>{JSON.stringify(selectedLog.payload, null, 2)}</pre>
                <p>
                  <strong>Error:</strong> {selectedLog.error || "None"}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedLog.created_at).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong>{" "}
                  {new Date(selectedLog.updated_at).toLocaleString()}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationLogs;
