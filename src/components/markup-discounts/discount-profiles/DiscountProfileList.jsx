import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header2 from "../../header2/header2";
import {
  fetchDiscountProfiles,
  deleteDiscountProfile,
  syncDiscountProfilesWithElastic,
  changeStatus,
} from "../services/DiscountProfileService";
import {
  FaPlane,
  FaSync,
  FaHotel,
  FaKaaba,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaToggleOn,
  FaToggleOff,
  FaTrash,
} from "react-icons/fa";
import {
  getPermittedMenuItems,
  isSuperAdmin as checkIfSuperAdmin,
  hasPermission as checkActionPermission,
} from "../../../authUtils";
import routeConfig from "../../../routeConfig";

const DiscountProfileList = () => {
  const [profiles, setProfiles] = useState([]);
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
    // Fetch permitted items and super admin status for 'Discount Profiles' module
    setPermittedItems(
      getPermittedMenuItems(routeConfig).filter(
        (item) => item.module_name === "Discount Profiles"
      )
    );
    setIsSuperAdmin(checkIfSuperAdmin());
  }, []);

  useEffect(() => {
    const loadProfiles = async () => {
      setLoading(true);
      try {
        const result = await fetchDiscountProfiles(
          currentPage,
          pageSize,
          searchQuery,
          sortBy,
          sortOrder
        );
        console.log("Fetched profiles:", result);
        if (result.success) {
          setProfiles(result.data || []);
          setTotalPages(result.data.meta?.totalPages || 1);
        } else {
          Swal.fire("Error", result.message, "error");
          setProfiles([]);
          setTotalPages(1);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch discount profiles";
        Swal.fire("Error", errorMessage, "error");
        setProfiles([]);
        setTotalPages(1);
      }
      setLoading(false);
    };
    loadProfiles();
  }, [currentPage, searchQuery, pageSize, sortBy, sortOrder]);

  const userhasPermission = (routePaths) => {
    const isPermitted =
      isSuperAdmin || checkActionPermission("Discount Profiles", routePaths);
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
      const syncResult = await syncDiscountProfilesWithElastic();
      console.log("Sync result:", syncResult.success);
      if (syncResult.success) {
        Swal.fire(
          "Success",
          "Discount profiles synced successfully",
          "success"
        );
      } else {
        Swal.fire(
          "Error",
          syncResult.message || "Failed to sync discount profiles",
          "error"
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to sync discount profiles";
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setSyncLoading(false);
    }
  };

  const handleStatusChange = async (uuid, currentStatus) => {
    if (!userhasPermission(["change_status"])) return; // Prevent action if no permission
    const newStatus = !currentStatus;
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${
        newStatus ? "activate" : "deactivate"
      } this profile?`,
      icon: "question",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a",
      confirmButtonText: `Yes, ${newStatus ? "activate" : "deactivate"} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const originalProfiles = [...profiles];
        setProfiles((prev) =>
          prev.map((p) => (p.id === uuid ? { ...p, is_active: newStatus } : p))
        );
        try {
          const changeResult = await changeStatus(uuid, newStatus);
          if (changeResult.success) {
            Swal.fire(
              "Success",
              `Profile ${newStatus ? "activated" : "deactivated"} successfully`,
              "success"
            );
          } else {
            setProfiles(originalProfiles);
            Swal.fire(
              "Error",
              changeResult.message || "Failed to change profile status",
              "error"
            );
          }
        } catch (error) {
          setProfiles(originalProfiles);
          const errorMessage =
            error.response?.data?.message || "Failed to change profile status";
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

  const deleteProfile = async (uuid) => {
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
        const originalProfiles = [...profiles];
        setProfiles((prev) => prev.filter((p) => p.id !== uuid));
        try {
          const deleteResult = await deleteDiscountProfile(uuid);
          if (deleteResult.success) {
            Swal.fire("Deleted!", "Profile has been deleted.", "success");
          } else {
            setProfiles(originalProfiles);
            Swal.fire(
              "Error",
              deleteResult.message || "Failed to delete profile",
              "error"
            );
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Failed to delete profile";
          Swal.fire("Error", errorMessage, "error");
        }
      }
    });
  };

  const renderProductIcon = (type) => {
    switch (type) {
      case "Flights":
        return <FaPlane title="Flight" className="me-2 fs-6" />;
      case "Hotel":
        return <FaHotel title="Hotel" className="me-2 fs-6" />;
      case "Umrah":
        return <FaKaaba title="Umrah" className="me-2 fs-6" />;
      default:
        return null;
    }
  };

  const formatSnakeToTitleCase = (str) => {
    if (!str) return "";
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Define action routes
  const actionRoutes = {
    view: "read",
    edit: "update",
    delete: "delete",
    status: "change_status",
    sync: "sync",
    add: "actions",
  };

  // Check if any actions are permitted to show the Actions column
  const hasAnyActionPermission = userhasPermission([
    actionRoutes.view,
    actionRoutes.edit,
    actionRoutes.delete,
    actionRoutes.status,
  ]);

  return (
    <>
      <Header2
        title="DISCOUNT PROFILE MANAGEMENT"
        linkText1="Discount Profiles"
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="row mt-4">
          <div className="form-group col-md-3 mb-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search by title, description, or product..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="form-group col-md-1 mb-3">
            {userhasPermission([actionRoutes.sync]) && (
              <button
                type="button"
                className="btn btn-dark equipe-btn btn-sm"
                onClick={handleSync}
                disabled={syncLoading}
                data-toggle="tooltip"
                title="Sync Discount Profiles"
              >
                <FaSync className={syncLoading ? "fa-spin" : ""} /> Sync
              </button>
            )}
          </div>
          <div className="form-group col-md-3">
            {userhasPermission([actionRoutes.add]) && (
              <button
                type="button"
                className="btn btn-dark btn-sm me-3"
                onClick={() => navigate("/discount-profiles/add-profile")}
              >
                <i className="fa fa-plus" /> Add Profile
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
                      onClick={() => handleSort("rule_name")}
                    >
                      Rule Name {getSortIcon("rule_name")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("business_channel")}
                    >
                      Business Channel {getSortIcon("business_channel")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("product_type")}
                    >
                      Product Type {getSortIcon("product_type")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("distribution_channel")}
                    >
                      Distribution Channel {getSortIcon("distribution_channel")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("discount_value")}
                    >
                      Discount {getSortIcon("discount_value")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("is_active")}
                    >
                      Status {getSortIcon("is_active")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("expiry_date")}
                    >
                      Expiry Date {getSortIcon("expiry_date")}
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
                      Modified At {getSortIcon("updated_at")}
                    </th>
                    {hasAnyActionPermission && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading && profiles.length > 0 ? (
                    profiles.map((profile) => (
                      <tr key={profile.id}>
                        <td>{profile.id}</td>
                        <td>{profile.rule_name}</td>
                        <td>
                          {profile.business_channel
                            ? formatSnakeToTitleCase(profile.business_channel)
                            : "Any"}
                        </td>
                        <td>
                          {renderProductIcon(profile.product_type)}
                          {profile.product_type}
                        </td>
                        <td>
                          {profile.distribution_channel
                            ? formatSnakeToTitleCase(
                                profile.distribution_channel
                              )
                            : "Any"}
                        </td>
                        <td>
                          {profile.discount_value
                            ? `${profile.discount_value} ${
                                profile.discount_type === "percentage"
                                  ? "%"
                                  : ""
                              }`
                            : "N/A"}
                        </td>
                        <td>
                          {userhasPermission([actionRoutes.status]) ? (
                            <div
                              className="cursor-pointer"
                              onClick={() =>
                                handleStatusChange(
                                  profile.id,
                                  profile.is_active
                                )
                              }
                              data-toggle="tooltip"
                              title={
                                profile.is_active ? "Deactivate" : "Activate"
                              }
                            >
                              {profile.is_active ? (
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
                                profile.is_active ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {profile.is_active ? "Active" : "Inactive"}
                            </span>
                          )}
                        </td>
                        <td>{profile.expiry_date || "N/A"}</td>
                        <td>{profile.created_by || "N/A"}</td>
                        <td>
                          {profile.created_at
                            ? new Date(profile.created_at).toLocaleString()
                            : "N/A"}
                        </td>
                        <td>
                          {profile.updated_at
                            ? new Date(profile.updated_at).toLocaleString()
                            : "N/A"}
                        </td>
                        {hasAnyActionPermission && (
                          <td>
                            <div className="actionCont d-flex align-items-center">
                              {userhasPermission([actionRoutes.view]) && (
                                <Link
                                  to={`/discount-profiles/view-profile/${profile.id}`}
                                  className="input-group-addon addFirst mr-2"
                                  data-toggle="tooltip"
                                  title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              )}
                              {userhasPermission([actionRoutes.edit]) && (
                                <Link
                                  to={`/discount-profiles/edit-profile/${profile.id}`}
                                  className="input-group-addon addFirst mr-2"
                                  data-toggle="tooltip"
                                  title="Edit"
                                >
                                  <i className="fa fa-edit" />
                                </Link>
                              )}
                              {userhasPermission([actionRoutes.delete]) && (
                                <div
                                  className="input-group-addon addFirst mr-2"
                                  onClick={() => deleteProfile(profile.id)}
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
                        colSpan={hasAnyActionPermission ? 12 : 11}
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

export default DiscountProfileList;
