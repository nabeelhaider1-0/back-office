import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaStar,
  FaSync,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import Header2 from "../header2/header2";
import {
  fetchAllCurrencies,
  deactivateCurrency,
  setBaseCurrency,
  deleteCurrency,
  syncExchangeRatesWithElastic,
} from "./CurrencyService";
import {
  getPermittedMenuItems,
  isSuperAdmin as checkIfSuperAdmin,
  hasPermission as checkActionPermission,
} from "../../authUtils";
import routeConfig from "../../routeConfig";

const CurrencyList = () => {
  const [currencies, setCurrencies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [permittedItems, setPermittedItems] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch permitted items and super admin status for 'Currencies' module
    setPermittedItems(
      getPermittedMenuItems(routeConfig).filter(
        (item) => item.module_name === "Currencies"
      )
    );
    setIsSuperAdmin(checkIfSuperAdmin());
  }, []);

  useEffect(() => {
    const loadCurrencies = async () => {
      setLoading(true);
      try {
        const result = await fetchAllCurrencies(
          currentPage,
          pageSize,
          searchQuery,
          sortBy,
          sortOrder
        );
        console.log("Fetched currencies:", result);
        if (result.success) {
          setCurrencies(result.data || []);
          setTotalPages(result.meta?.totalPages || 1);
        } else {
          Swal.fire("Error", result.message, "error");
          setCurrencies([]);
          setTotalPages(1);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch currencies";
        Swal.fire("Error", errorMessage, "error");
        setCurrencies([]);
        setTotalPages(1);
      }
      setLoading(false);
    };
    loadCurrencies();
  }, [currentPage, searchQuery, pageSize, sortBy, sortOrder]);

  const userhasPermission = (routePaths) => {
    const isPermitted =
      isSuperAdmin || checkActionPermission("Currencies", routePaths);
    console.log("permittedItems", permittedItems, routePaths, isPermitted);
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

  const handleSync = async () => {
    if (!userhasPermission(["sync"])) return; // Prevent action if no permission
    setSyncLoading(true);
    try {
      const syncResult = await syncExchangeRatesWithElastic();
      console.log("Sync result:", syncResult.success);
      if (syncResult.success) {
        Swal.fire("Success", "Exchange rates synced successfully", "success");
      } else {
        Swal.fire(
          "Error",
          syncResult.message || "Failed to sync exchange rates",
          "error"
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to sync exchange rates";
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setSyncLoading(false);
    }
  };

  const handleToggleStatus = async (id, is_active) => {
    if (!userhasPermission(["change_status"])) return; // Prevent action if no permission
    const newStatus = !is_active;
    Swal.fire({
      title: `Are you sure you want to ${
        newStatus ? "activate" : "deactivate"
      } this currency?`,
      icon: "warning",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a ",
      confirmButtonText: `Yes, ${newStatus ? "activate" : "deactivate"} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const originalCurrencies = [...currencies];
        setCurrencies((prev) =>
          prev.map((c) => (c.id === id ? { ...c, is_active: newStatus } : c))
        );
        try {
          const toggleResult = await deactivateCurrency(id, newStatus);
          if (toggleResult.success) {
            Swal.fire(
              "Success",
              `Currency ${newStatus ? "activated" : "deactivated"}.`,
              "success"
            );
          } else {
            setCurrencies(originalCurrencies);
            Swal.fire(
              "Error",
              toggleResult.message || "Failed to change currency status",
              "error"
            );
          }
        } catch (error) {
          setCurrencies(originalCurrencies);
          const errorMessage =
            error.response?.data?.message || "Failed to change currency status";
          Swal.fire("Error", errorMessage, "error");
        }
      }
    });
  };

  const handleSetBaseCurrency = async (id) => {
    if (!userhasPermission(["set_base_currency"])) return; // Prevent action if no permission
    Swal.fire({
      title: "Are you sure you want to set this as the base currency?",
      text: "This will unset the current base currency.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, set it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const originalCurrencies = [...currencies];
        setCurrencies((prev) =>
          prev.map((c) =>
            c.id === id
              ? { ...c, is_base_currency: true }
              : { ...c, is_base_currency: false }
          )
        );
        try {
          const setBaseResult = await setBaseCurrency(id);
          if (setBaseResult.success) {
            Swal.fire("Success", "Base currency set successfully.", "success");
          } else {
            setCurrencies(originalCurrencies);
            Swal.fire(
              "Error",
              setBaseResult.message || "Failed to set base currency",
              "error"
            );
          }
        } catch (error) {
          setCurrencies(originalCurrencies);
          const errorMessage =
            error.response?.data?.message || "Failed to set base currency";
          Swal.fire("Error", errorMessage, "error");
        }
      }
    });
  };

  const handleDelete = async (id) => {
    if (!userhasPermission(["delete"])) return; // Prevent action if no permission
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
        const originalCurrencies = [...currencies];
        setCurrencies((prev) => prev.filter((c) => c.id !== id));
        try {
          const deleteResult = await deleteCurrency(id);
          if (deleteResult.success) {
            Swal.fire("Deleted!", "Currency has been deleted.", "success");
          } else {
            setCurrencies(originalCurrencies);
            Swal.fire(
              "Error",
              deleteResult.message || "Failed to delete currency",
              "error"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Failed to delete currency";
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
    status: "change_status",
    set_base_currency: "set_base_currency",
    sync: "sync",
    add: "actions",
  };

  // Check if any actions are permitted to show the Actions column
  const hasAnyActionPermission = userhasPermission([
    actionRoutes.view,
    actionRoutes.edit,
    actionRoutes.delete,
    actionRoutes.status,
    actionRoutes.set_base_currency,
  ]);

  return (
    <>
      <Header2 title="CURRENCY MANAGEMENT" linkText1="Currencies" />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="row mt-4">
          <div className="form-group col-md-3 mb-3">
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Search by title, description, or product..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="form-group col-md-3 mb-3">
            {userhasPermission([actionRoutes.sync]) && (
              <button
                type="button"
                className="btn btn-dark equipe-btn btn-sm"
                onClick={handleSync}
                disabled={syncLoading}
                data-toggle="tooltip"
                title="Sync Exchange Rates"
              >
                <FaSync className={syncLoading ? "fa-spin" : ""} /> Sync
              </button>
            )}
          </div>
          <div className="form-group col-md-3 offset-md-3 text-end mb-3">
            {userhasPermission([actionRoutes.add]) && (
              <button
                type="button"
                className="btn btn-dark btn-sm me-3"
                onClick={() => navigate("/exchange-rates/add")}
              >
                <i className="fa fa-plus" /> Add Currency
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
                      onClick={() => handleSort("id")}
                    >
                      ID {getSortIcon("id")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("id")}
                    >
                      Currency Name {getSortIcon("currency")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("currency_code")}
                    >
                      Currency Code {getSortIcon("currency_code")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("currency_rate")}
                    >
                      Rate {getSortIcon("currency_rate")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("is_base_currency")}
                    >
                      Base? {getSortIcon("is_base_currency")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("is_active")}
                    >
                      Status {getSortIcon("is_active")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("created_by")}
                    >
                      Created By {getSortIcon("created_by")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("created_at")}
                    >
                      Created At {getSortIcon("created_at")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("updated_at")}
                    >
                      Updated At {getSortIcon("updated_at")}
                    </th>
                    {hasAnyActionPermission && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading && currencies.length > 0 ? (
                    currencies.map((currency) => (
                      <tr key={currency.id}>
                        <td>{currency.id}</td>
                        <td>{currency.currency}</td>
                        <td>
                          <img
                            src={`https://escapra-assets.s3.eu-west-1.amazonaws.com/public/${currency.currency_code}.png`}
                            alt={currency.currency_code}
                            style={{
                              width: "20px",
                              height: "20px",
                              marginRight: "8px",
                              borderRadius: "50%",
                            }}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                          {currency.currency_code}
                        </td>
                        <td>{currency.currency_rate}</td>
                        <td>
                          {userhasPermission([
                            actionRoutes.set_base_currency,
                          ]) ? (
                            <div
                              className="cursor-pointer"
                              onClick={() => handleSetBaseCurrency(currency.id)}
                              data-toggle="tooltip"
                              title="Set as Base Currency"
                            >
                              <span
                                className={`badge ${
                                  currency.is_base_currency
                                    ? "bg-success"
                                    : "bg-secondary"
                                }`}
                              >
                                {currency.is_base_currency ? "Yes" : "No"}
                              </span>
                            </div>
                          ) : (
                            <span
                              className={`badge ${
                                currency.is_base_currency
                                  ? "bg-success"
                                  : "bg-secondary"
                              }`}
                            >
                              {currency.is_base_currency ? "Yes" : "No"}
                            </span>
                          )}
                        </td>
                        <td>
                          {userhasPermission([actionRoutes.status]) ? (
                            <div
                              className="cursor-pointer"
                              onClick={() =>
                                handleToggleStatus(
                                  currency.id,
                                  currency.is_active
                                )
                              }
                              data-toggle="tooltip"
                              title={
                                currency.is_active ? "Deactivate" : "Activate"
                              }
                            >
                              {currency.is_active ? (
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
                                currency.is_active ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {currency.is_active ? "Active" : "Inactive"}
                            </span>
                          )}
                        </td>
                        <td>{currency.created_by || "N/A"}</td>
                        <td>
                          {currency.created_at
                            ? new Date(currency.created_at).toLocaleString()
                            : "N/A"}
                        </td>
                        <td>
                          {currency.updated_at
                            ? new Date(currency.updated_at).toLocaleString()
                            : "N/A"}
                        </td>
                        {hasAnyActionPermission && (
                          <td>
                            <div className="actionCont d-flex align-items-center">
                              {userhasPermission([actionRoutes.view]) && (
                                <Link
                                  to={`/exchange-rates/view/${currency.id}`}
                                  className="input-group-addon addFirst mr-2"
                                  data-toggle="tooltip"
                                  title="View"
                                >
                                  <i class="fa fa-eye" aria-hidden="true"></i>
                                </Link>
                              )}
                              {userhasPermission([actionRoutes.edit]) && (
                                <Link
                                  to={`/exchange-rates/edit/${currency.id}`}
                                  className="input-group-addon addFirst mr-2"
                                  data-toggle="tooltip"
                                  title="Edit"
                                >
                                  <i class="fa fa-edit" aria-hidden="true"></i>
                                </Link>
                              )}
                              {userhasPermission([
                                actionRoutes.set_base_currency,
                              ]) && (
                                <div
                                  className="input-group-addon addFirst mr-2"
                                  onClick={() =>
                                    handleSetBaseCurrency(currency.id)
                                  }
                                  data-toggle="tooltip"
                                  title="Set as Base Currency"
                                >
                                  <FaStar
                                    className={
                                      currency.is_base_currency
                                        ? "text-success"
                                        : ""
                                    }
                                  />
                                </div>
                              )}
                              {userhasPermission([actionRoutes.delete]) && (
                                <div
                                  className="input-group-addon addFirst mr-2"
                                  onClick={() => handleDelete(currency.id)}
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
                        colSpan={hasAnyActionPermission ? 9 : 8}
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
        <div className="row mt-4"></div>
      </div>
    </>
  );
};

export default CurrencyList;
