import React, { useEffect, useState, useMemo } from "react";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constants from "../../constants/routes";
import Header2 from "../header2/header2";
import SuppliersDetails from "../suppliers/onlineSupplier/add";
import {
  ErrorApiAlert,
  SuccessApiToast,
} from "../../constants/globalfunctions";
import {
  getAllSuppliers,
  deleteSupplier,
  updateSupplier,
  toggleSupplierStatus,
} from "../../Apis/API";
import { Spinner } from "react-bootstrap";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

const APISConfiguration = ({ setReminderDataRedux }) => {
  const [activeTab, setActiveTab] = useState("suppliers"); // reminders | suppliers

  // ==========================
  // Supplier states
  // ==========================
  const [suppliers, setSuppliers] = useState([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  // ✅ sorting state
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // ✅ sort handler
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // toggle direction
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  // ✅ sorted data (memoized for performance)
  const sortedSuppliers = useMemo(() => {
    let sortable = [...suppliers];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        const aVal = a[sortConfig.key]
          ? a[sortConfig.key].toString().toLowerCase()
          : "";
        const bVal = b[sortConfig.key]
          ? b[sortConfig.key].toString().toLowerCase()
          : "";
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [suppliers, sortConfig]);

  const renderSortHeader = (label, key) => {
    return (
      <span
        style={{
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
        }}
        onClick={() => handleSort(key)}
      >
        {label}
        {sortConfig.key === key &&
          (sortConfig.direction === "asc" ? (
            <span title="Ascending">▲</span>
          ) : (
            <span title="Descending">▼</span>
          ))}
      </span>
    );
  };

  // ==========================
  // Fetch suppliers
  // ==========================
  const fetchSuppliers = async () => {
    setLoadingSuppliers(true);
    try {
      const response = await getAllSuppliers();
      console.log("response-", response);
      if (response?.data?.statusCode === 200) {
        setSuppliers(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching suppliers", err);
      ErrorApiAlert("Error fetching suppliers", err);
    } finally {
      setLoadingSuppliers(false);
    }
  };

  useEffect(() => {
    if (activeTab === "suppliers") {
      fetchSuppliers();
    }
  }, [activeTab]);

  // ==========================
  // Delete supplier
  // ==========================
  const handleDeleteSupplier = async (id) => {
    Swal.fire({
      text: "Are you sure you want to delete this supplier?",
      icon: "warning",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a ",
      confirmButtonText: "yes delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteSupplier(
            id,
            window.localStorage.getItem("token")
          );

          if (response?.statusCode === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Supplier deleted successfully.",
              icon: "success",
            });

            // Refresh suppliers list
            fetchSuppliers();
          }
        } catch (err) {
          Swal.fire({
            title: "Error On Deletion",
            text: "Something went wrong while deleting supplier.",
            icon: "error",
          });
          console.error("Error deleting supplier", err);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Supplier deletion has been cancelled.",
          icon: "error",
        });
      }
    });
  };

  // ==========================
  // Update supplier
  // ==========================
  const handleUpdateSupplier = async (id, updatedData) => {
    try {
      const response = await updateSupplier(
        id,
        updatedData,
        window.localStorage.getItem("token")
      );
      if (response?.statusCode === 200) {
        SuccessApiToast("Supplier updated successfully!");
        setEditingSupplier(null);
        fetchSuppliers();
      }
    } catch (err) {
      ErrorApiAlert("Error updating supplier", err);
      console.error("Error updating supplier", err);
    }
  };

  // ==========================
  // Enable / Disable supplier
  // ==========================
  // const handleToggleStatus = async (id, status) => {
  //   try {
  //     const response = await toggleSupplierStatus(
  //       id,
  //       status,
  //       window.localStorage.getItem("token")
  //     );
  //     if (response?.statusCode === 200) {

  //       SuccessApiToast(`Supplier ${status} successfully!`);
  //       fetchSuppliers();
  //     }
  //   } catch (err) {
  //      ErrorApiAlert("Error toggling supplier status", err);
  //     console.error("Error toggling supplier status", err);
  //   }
  // };

  // ==========================
  // Enable / Disable supplier (with confirmation + rollback like currencies example)
  // ==========================
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "enabled" ? "disabled" : "enabled";

    Swal.fire({
      title: `Are you sure you want to ${newStatus} this supplier?`,
      icon: "warning",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a ",
      confirmButtonText: `Yes, ${newStatus} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Save original list (for rollback in case of error)
        const originalSuppliers = [...suppliers];

        // Optimistic UI update
        setSuppliers((prev) =>
          prev.map((sup) =>
            sup.uiid === id ? { ...sup, status: newStatus } : sup
          )
        );

        try {
          const response = await toggleSupplierStatus(
            id,
            newStatus,
            window.localStorage.getItem("token")
          );

          if (response?.statusCode === 200) {
            Swal.fire(
              "Success",
              `Supplier ${newStatus} successfully!`,
              "success"
            );
          } else {
            // Rollback if failed
            setSuppliers(originalSuppliers);
            Swal.fire(
              "Error",
              response?.message || "Failed to change supplier status",
              "error"
            );
          }
        } catch (err) {
          // Rollback on exception
          setSuppliers(originalSuppliers);
          const errorMessage =
            err.response?.data?.message ||
            "Something went wrong while changing supplier status";
          Swal.fire("Error", errorMessage, "error");
          console.error("Error toggling supplier status", err);
        }
      }
    });
  };

  return (
    <div className="container-fluid pt-0 p-4" id="content-pad">
      {/* <Header2
        // title="API CONFIGURATION"
        // linkText1="Reminders"
        // linkText2="Suppliers"
        // link2={Constants.URLConstants.SETTINGREMINDERNEW}
      /> */}

      {/* Tab Switcher */}
      {/* <div className="mb-3">
        <button
          className={`btn btn-sm ${activeTab === "reminders" ? "btn-dark" : "btn-light"}`}
          onClick={() => setActiveTab("reminders")}
        >
          Reminder Settings
        </button>
        <button
          className={`btn btn-sm ms-2 ${activeTab === "suppliers" ? "btn-dark" : "btn-light"}`}
          onClick={() => setActiveTab("suppliers")}
        >
          Suppliers
        </button>
      </div> */}

      {/* ================= Reminders Section ================= */}
      {/* {activeTab === "reminders" && (
        <div className="card shadow-sm p-3">
          <h5 className="mb-3">Reminder Settings</h5>
          <p>Reminder configuration UI here...</p>
        </div>
      )} */}

      {/* ================= Suppliers Section ================= */}
      {/* {activeTab === "suppliers" && ( */}
      <h5 className="mb-3">Supplier Management</h5>

      {/* Supplier Form */}
      <SuppliersDetails
        onSuccess={fetchSuppliers}
        editingSupplier={editingSupplier}
        onUpdate={handleUpdateSupplier}
      />

      {/* Supplier List */}
      <div className="px-4 mt-4">
        <h6>Supplier List</h6>
        {loadingSuppliers ? (
          <div className="text-center">
            <Spinner animation="border" size="sm" />
          </div>
        ) : suppliers.length > 0 ? (
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th>{renderSortHeader("ID", "id")}</th>
                <th>{renderSortHeader("Supplier", "supplierName")}</th>
                <th>{renderSortHeader("Product Type", "productType")}</th>
                <th>{renderSortHeader("Country", "supplierCountry")}</th>
                <th>{renderSortHeader("Status", "status")}</th>
                <th>{renderSortHeader("Environment", "environment")}</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {sortedSuppliers.map((sup) => (
                <tr key={sup.uiid}>
                  <td>{sup.id}</td>
                  <td>{sup.supplierName}</td>
                  <td>{sup.productType}</td>
                  <td>{sup.supplierCountry}</td>
                  <td>
                    <div
                      className="cursor-pointer"
                      onClick={() => handleToggleStatus(sup.uiid, sup.status)}
                      title={sup.status === "enabled" ? "Disable" : "Enable"}
                    >
                      {sup.status === "enabled" ? (
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
                  </td>
                  <td>{sup.environment}</td>
                  <td>
                    <div className="actionCont d-flex align-items-center">
                      <Link
                        onClick={() => setEditingSupplier(sup)}
                        className="input-group-addon addFirst mr-2"
                        data-toggle="tooltip"
                        title="Edit"
                      >
                        <i className="fa fa-pencil-square-o"></i>
                      </Link>
                      <Link
                        onClick={() => handleDeleteSupplier(sup.uiid)}
                        className="input-group-addon addFirst mr-2"
                        data-toggle="tooltip"
                        title="Delete"
                      >
                        <i className="fa fa-trash"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No suppliers found.</p>
        )}
      </div>
    </div>
  );
};

export default APISConfiguration;
