import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Header2 from "../header2/header2";
import { useTransactionsList } from "../../Apis/DashboardAPI";
import { apiHandler } from "../../Apis/ApiHandler";
import { FaEye } from "react-icons/fa";
import {
  getPermittedMenuItems,
  isSuperAdmin as checkIfSuperAdmin,
  hasPermission as checkActionPermission,
} from "../../authUtils";
import routeConfig from "../../routeConfig";
import Constants from "../../constants/routes";

const OrdersTransactionsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [permittedItems, setPermittedItems] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const location = useLocation();

  // Call useTransactionsList unconditionally, but use enabled option to delay API call
  const {
    data: transactions,
    total,
    totalPages,
    loading,
    error,
  } = useTransactionsList(currentPage, pageSize, searchQuery, {
    enabled: isInitialized,
  });

  useEffect(() => {
    // Extract txid from query parameters
    const queryParams = new URLSearchParams(location.search);
    const txid = queryParams.get("txid");

    // Set searchQuery to txid if it exists
    if (txid) {
      setSearchQuery(txid);
    }

    // Fetch permitted items and super admin status
    setPermittedItems(
      getPermittedMenuItems(routeConfig).filter(
        (item) => item.module_name === "Transaction Management"
      )
    );
    setIsSuperAdmin(checkIfSuperAdmin());

    // Mark initialization as complete to trigger API call
    setIsInitialized(true);
  }, [location.search]);

  const userHasPermission = (routePaths) => {
    return (
      isSuperAdmin ||
      checkActionPermission("Transaction Management", routePaths)
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleViewTransaction = (transaction) => {
    if (!userHasPermission(["read"])) return;
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
  };

  const formatAmount = (amount) => {
    if (!amount?.value) {
      return amount && amount > 0
        ? `${amount.currency || "USD"} ${amount / 100}`
        : "N/A";
    }
    return amount?.value && amount.value > 0
      ? `${amount.currency} ${amount.value / 100}`
      : "N/A";
  };

  const formatNestedObject = (obj) => {
    if (!obj || Object.keys(obj).length === 0) return "N/A";
    return Object.entries(obj)
      .map(
        ([key, value]) =>
          `${key.replace(/([A-Z])/g, " $1").trim()}: ${value || "N/A"}`
      )
      .join(", ");
  };

  const formatFees = (fees) => {
    if (!fees || fees.length === 0) return "N/A";
    return fees
      .map((fee, index) => `Fee ${index + 1}: ${formatNestedObject(fee)}`)
      .join("; ");
  };

  const toCapitalCase = (str) => {
    if (!str) return "N/A";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const actionRoutes = {
    view: "read",
  };

  const hasAnyActionPermission = userHasPermission([actionRoutes.view]);

  return (
    <>
      <Header2 title="TRANSACTION MANAGEMENT" linkText1="Transaction List" />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="row mt-4">
          <div className="form-group col-md-3 mb-3">
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Search by ID, type, state, description, or URL..."
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
                    <th>Transaction ID</th>
                    <th>Booking ID</th>
                    <th>Type</th>
                    <th>State</th>
                    <th>Order Amount</th>
                    <th>Created At</th>
                    {hasAnyActionPermission && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading && transactions && transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>
                          <Link
                            to={`${Constants.URLConstants.BOOKINGSVIEWBOOKING}/${transaction.booking_id}`}
                            target="_blank"
                          >
                            {transaction.booking_id}
                          </Link>
                        </td>
                        <td>
                          <span className="badge bg-info">
                            {toCapitalCase(transaction.type)}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              transaction.state === "pending"
                                ? "bg-warning"
                                : "bg-success"
                            }`}
                          >
                            {toCapitalCase(transaction.state)}
                          </span>
                        </td>
                        <td>{formatAmount(transaction?.orderAmount)}</td>
                        <td>
                          {transaction.createdAt
                            ? new Date(transaction.createdAt).toLocaleString(
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
                            : "N/A"}
                        </td>
                        {hasAnyActionPermission && (
                          <td>
                            <div className="actionCont d-flex align-items-center">
                              {userHasPermission([actionRoutes.view]) && (
                                <div
                                  className="input-group-addon addFirst mr-2"
                                  onClick={() =>
                                    handleViewTransaction(transaction)
                                  }
                                  data-toggle="tooltip"
                                  title="View"
                                >
                                  <i class="fa fa-eye" aria-hidden="true"></i>
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
                        colSpan={hasAnyActionPermission ? 7 : 6}
                        className="text-center"
                      >
                        {loading
                          ? "Loading..."
                          : isInitialized
                          ? "No transactions found"
                          : "Initializing..."}
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
                  <option value={100}>100 per page</option>
                </select>
              </div>
              <div>
                <button
                  className="btn btn-dark btn-sm me-2"
                  disabled={currentPage === 1 || !isInitialized}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <span>
                  Page {currentPage} of {totalPages >= 1 ? totalPages : 1}
                </span>
                <button
                  className="btn btn-dark btn-sm ms-2"
                  disabled={currentPage === totalPages || !isInitialized}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Transaction Details */}
      {showModal && selectedTransaction && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Transaction Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Transaction ID:</strong> {selectedTransaction.id}
                    </p>
                    <p>
                      <strong>Revolut Order ID:</strong>{" "}
                      {selectedTransaction.revolutOrderId || "N/A"}
                    </p>
                    <p>
                      <strong>Token:</strong>{" "}
                      {selectedTransaction.token || "N/A"}
                    </p>
                    <p>
                      <strong>Type:</strong>{" "}
                      {toCapitalCase(selectedTransaction.type)}
                    </p>
                    <p>
                      <strong>State:</strong>{" "}
                      {toCapitalCase(selectedTransaction.state)}
                    </p>
                    <p>
                      <strong>Order Amount:</strong>{" "}
                      {formatAmount(selectedTransaction.orderAmount)}
                    </p>
                    <p>
                      <strong>Outstanding Amount:</strong>{" "}
                      {formatAmount(selectedTransaction.orderOutstandingAmount)}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {toCapitalCase(selectedTransaction.description) || "N/A"}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Created At:</strong>{" "}
                      {selectedTransaction.createdAt
                        ? new Date(
                            selectedTransaction.createdAt
                          ).toLocaleString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Updated At:</strong>{" "}
                      {selectedTransaction.updatedAt
                        ? new Date(
                            selectedTransaction.updatedAt
                          ).toLocaleString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Capture Mode:</strong>{" "}
                      {toCapitalCase(selectedTransaction.captureMode) || "N/A"}
                    </p>
                    <p>
                      <strong>Fees:</strong>{" "}
                      {formatFees(selectedTransaction.fees)}
                    </p>
                    <p>
                      <strong>Payment Method:</strong>{" "}
                      {formatNestedObject(selectedTransaction.paymentMethod)}
                    </p>
                    <p>
                      <strong>Checkout URL:</strong>{" "}
                      {selectedTransaction.checkout_url ? (
                        <a
                          href={selectedTransaction.checkout_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Link
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                    <p>
                      <strong>Risk Level:</strong>{" "}
                      {toCapitalCase(selectedTransaction.riskLevel) || "N/A"}
                    </p>
                    <p>
                      <strong>Settled Amount:</strong>{" "}
                      {formatAmount({
                        currency:
                          selectedTransaction.orderAmount?.currency || "USD",
                        value: selectedTransaction.settledAmount,
                      })}
                    </p>
                    <p>
                      <strong>Enforce Challenge:</strong>{" "}
                      {toCapitalCase(selectedTransaction.enforceChallenge) ||
                        "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default OrdersTransactionsList;
