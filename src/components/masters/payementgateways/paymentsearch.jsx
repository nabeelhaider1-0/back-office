import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header2 from "../../header2/header2";
import {
  getAllPaymentGateways,
  deletePaymentGateway,
  setDefaultPaymentGateway,
  updatePaymentGatewayStatus,
} from "../../../Apis/PaymentService";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaStar,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import {
  getPermittedMenuItems,
  isSuperAdmin as checkIfSuperAdmin,
  hasPermission as checkActionPermission,
} from "../../../authUtils";
import routeConfig from "../../../routeConfig";
import Constants from "../../../constants/routes";

const MasterPaymentSearch = () => {
  const [gateways, setGateways] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [permittedItems, setPermittedItems] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch permitted items and super admin status for 'Payment Gateways' module
    setPermittedItems(
      getPermittedMenuItems(routeConfig).filter(
        (item) => item.module_name === "Payment Gateways"
      )
    );
    setIsSuperAdmin(checkIfSuperAdmin());
  }, []);

  useEffect(() => {
    const loadGateways = async () => {
      setLoading(true);
      try {
        const result = await getAllPaymentGateways(
          currentPage,
          pageSize,
          searchQuery,
          sortBy,
          sortOrder
        );
        if (result.data.success) {
          setGateways(result.data.data.data || []);
          setTotalPages(result.data.data.meta?.totalPages || 1);
        } else {
          Swal.fire(
            "Error",
            result.data.message || "Failed to fetch payment gateways",
            "error"
          );
          setGateways([]);
          setTotalPages(1);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch payment gateways";
        Swal.fire("Error", errorMessage, "error");
        setGateways([]);
        setTotalPages(1);
      }
      setLoading(false);
    };
    loadGateways();
  }, [currentPage, searchQuery, pageSize, sortBy, sortOrder]);

  const userhasPermission = (routePaths) => {
    const isPermitted =
      isSuperAdmin || checkActionPermission("Payment Gateways", routePaths);
    return isPermitted;
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(column);
      setSortOrder("ASC");
    }
    setCurrentPage(1);
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return <FaSort className="ms-1" />;
    return sortOrder === "ASC" ? (
      <FaSortUp className="ms-1" />
    ) : (
      <FaSortDown className="ms-1" />
    );
  };

  const handleSetDefault = async (uuid) => {
    if (!userhasPermission(["set_default"])) return;
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to set this gateway as the default?",
      icon: "question",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a",
      confirmButtonText: "Yes, set as default!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const originalGateways = [...gateways];
        setGateways((prev) =>
          prev.map((g) =>
            g.uuid === uuid
              ? { ...g, is_default: true }
              : { ...g, is_default: false }
          )
        );
        try {
          const setDefaultResult = await setDefaultPaymentGateway(uuid);
          if (setDefaultResult.data.success) {
            Swal.fire(
              "Success",
              "Gateway set as default successfully",
              "success"
            );
          } else {
            setGateways(originalGateways);
            Swal.fire(
              "Error",
              setDefaultResult.data.message || "Failed to set default gateway",
              "error"
            );
          }
        } catch (error) {
          setGateways(originalGateways);
          const errorMessage =
            error.response?.data?.message || "Failed to set default gateway";
          Swal.fire("Error", errorMessage, "error");
        }
      }
    });
  };

  const handleDelete = async (uuid) => {
    if (!userhasPermission(["delete"])) return;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a ",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const originalGateways = [...gateways];
        setGateways((prev) => prev.filter((g) => g.uuid !== uuid));
        try {
          const deleteResult = await deletePaymentGateway(uuid);
          if (deleteResult.data.statusCode === 200) {
            Swal.fire(
              "Deleted!",
              "Payment gateway has been deleted.",
              "success"
            );
          } else {
            setGateways(originalGateways);
            Swal.fire(
              "Error",
              deleteResult.data.message || "Failed to delete gateway",
              "error"
            );
          }
        } catch (error) {
          setGateways(originalGateways);
          const errorMessage =
            error.response?.data?.message || "Failed to delete gateway";
          Swal.fire("Error", errorMessage, "error");
        }
      }
    });
  };

  const handleStatusToggle = async (uuid, currentStatus) => {
    if (!userhasPermission(["change_status"])) return;
    const newStatus = currentStatus === "yes" ? "no" : "yes";
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${
        newStatus === "yes" ? "activate" : "deactivate"
      } this gateway?`,
      icon: "question",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a",
      confirmButtonText: `Yes, ${
        newStatus === "yes" ? "activate" : "deactivate"
      } it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const originalGateways = [...gateways];
        setGateways((prev) =>
          prev.map((g) => (g.uuid === uuid ? { ...g, status: newStatus } : g))
        );
        try {
          const updateResult = await updatePaymentGatewayStatus(
            uuid,
            newStatus
          );
          if (updateResult.data.statusCode === 200) {
            Swal.fire(
              "Success",
              `Gateway ${
                newStatus === "yes" ? "activated" : "deactivated"
              } successfully`,
              "success"
            );
          } else {
            setGateways(originalGateways);
            Swal.fire(
              "Error",
              updateResult.data.message || "Failed to update gateway status",
              "error"
            );
          }
        } catch (error) {
          setGateways(originalGateways);
          const errorMessage =
            error.response?.data?.message || "Failed to update gateway status";
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

  // Define action routes
  const actionRoutes = {
    view: "read",
    edit: "update",
    delete: "delete",
    set_default: "set_default",
    update: "update", // Added for status toggle permission
    add: "actions",
  };

  // Check if any actions are permitted to show the Actions column
  const hasAnyActionPermission = userhasPermission([
    actionRoutes.view,
    actionRoutes.edit,
    actionRoutes.delete,
    actionRoutes.set_default,
    actionRoutes.update,
  ]);

  return (
    <>
      <Header2
        title="PAYMENT GATEWAY MANAGEMENT"
        linkText1="Payment Gateways"
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="row mt-4">
          <div className="form-group col-md-3 mb-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search by name, URL, or code..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="form-group col-md-3">
            {userhasPermission([actionRoutes.add]) && (
              <button
                type="button"
                className="btn btn-dark btn-sm me-3"
                onClick={() =>
                  navigate(Constants.URLConstants.MASTERSPAYMENTNEW)
                }
              >
                <i className="fa fa-plus" /> Add Gateway
              </button>
            )}
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table table-bordered ">
                <thead>
                  <tr>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("uuid")}
                    >
                      ID {getSortIcon("uuid")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("paymentGatewayName")}
                    >
                      Gateway Name {getSortIcon("paymentGatewayName")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("paymentGatewayURL")}
                    >
                      URL {getSortIcon("paymentGatewayURL")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("code")}
                    >
                      Code {getSortIcon("code")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("markup")}
                    >
                      Markup (%) {getSortIcon("markup")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      Status {getSortIcon("status")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("is_default")}
                    >
                      is Default? {getSortIcon("is_default")}
                    </th>

                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("createdAt")}
                    >
                      Created At {getSortIcon("createdAt")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("updatedAt")}
                    >
                      Modified At {getSortIcon("updatedAt")}
                    </th>
                    {hasAnyActionPermission && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading && gateways.length > 0 ? (
                    gateways.map((gateway) => (
                      <tr key={gateway.uuid}>
                        <td>{gateway.uuid}</td>
                        <td>{gateway.paymentGatewayName}</td>
                        <td>{gateway.paymentGatewayURL}</td>
                        <td>{gateway.code}</td>
                        <td>{gateway.markup}</td>
                        <td>
                          {userhasPermission(["change_status"]) ? (
                            <div
                              className="cursor-pointer"
                              onClick={() =>
                                handleStatusToggle(gateway.uuid, gateway.status)
                              }
                              data-toggle="tooltip"
                              title={
                                gateway.status === "yes"
                                  ? "Deactivate"
                                  : "Activate"
                              }
                            >
                              {gateway.status === "yes" ? (
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
                                gateway.status === "yes"
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {gateway.status === "yes" ? "Active" : "Inactive"}
                            </span>
                          )}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              gateway.is_default === true
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {gateway.is_default === true ? "Yes" : "No"}
                          </span>
                        </td>
                        <td>
                          {gateway.createdAt
                            ? new Date(gateway.createdAt).toLocaleString()
                            : "N/A"}
                        </td>
                        <td>
                          {gateway.updatedAt
                            ? new Date(gateway.updatedAt).toLocaleString()
                            : "N/A"}
                        </td>
                        {hasAnyActionPermission && (
                          <td>
                            <div className="actionCont d-flex align-items-center">
                              {userhasPermission([actionRoutes.view]) && (
                                <Link
                                  to={`/payment-gateways/view/${gateway.uuid}`}
                                  className="input-group-addon addFirst mr-2"
                                  data-toggle="tooltip"
                                  title="View"
                                >
                                  <i class="fa fa-eye" aria-hidden="true"></i>
                                </Link>
                              )}
                              {userhasPermission([actionRoutes.edit]) && (
                                <Link
                                  to={`/payment-gateways/edit/${gateway.uuid}`}
                                  className="input-group-addon addFirst mr-2"
                                  data-toggle="tooltip"
                                  title="Edit"
                                >
                                  <i class="fa fa-edit" aria-hidden="true"></i>
                                </Link>
                              )}
                              {userhasPermission([
                                actionRoutes.set_default,
                              ]) && (
                                <div
                                  className="input-group-addon addFirst mr-2"
                                  onClick={() => handleSetDefault(gateway.uuid)}
                                  data-toggle="tooltip"
                                  title="Set as Default"
                                >
                                  <FaStar
                                    className={
                                      gateway.is_default ? "text-success" : ""
                                    }
                                  />
                                </div>
                              )}
                              {userhasPermission([actionRoutes.delete]) && (
                                <div
                                  className="input-group-addon addFirst mr-2"
                                  onClick={() => handleDelete(gateway.uuid)}
                                  data-toggle="tooltip"
                                  title="Delete"
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
                      <td
                        colSpan={hasAnyActionPermission ? 12 : 12}
                        className="text-center"
                      >
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
    </>
  );
};

export default MasterPaymentSearch;
