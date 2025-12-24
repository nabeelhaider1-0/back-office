import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Header2 from "../header2/header2";
import {
  fetchMarkupProfiles,
  deleteMarkupProfile,
  syncMarkupProfilesWithElastic,
  changeStatus,
} from "./services/MarkupProfileService";
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
} from "../../authUtils";
import routeConfig from "../../routeConfig";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [permittedItems, setPermittedItems] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch permitted items and super admin status for 'Markup Profiles' module
    setPermittedItems(
      getPermittedMenuItems(routeConfig).filter(
        (item) => item.module_name === "Markup Profiles"
      )
    );
    setIsSuperAdmin(checkIfSuperAdmin());
  }, []);

  useEffect(() => {
    const loadProfiles = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchMarkupProfiles(
          currentPage,
          pageSize,
          searchQuery,
          sortBy,
          sortOrder
        );
        if (result.success) {
          const mappedProfiles = result.data.data.map((profile) => ({
            id: profile.id,
            ruleName: profile.rule_name,
            businessChannel: profile.business_channel,
            productType: profile.product_type,
            distributionChannel: profile.distribution_channel,
            markupType: profile.markup_type,
            markupValue: profile.markup_value,
            status: profile.is_active,
            expiryDate: profile.expiry_date,
            description: profile.description,
            createdBy: profile.created_by || "Unknown",
            createdAt: profile.created_at,
            modifiedAt: profile.updated_at,
          }));
          setProfiles(mappedProfiles);
          setTotalPages(Math.ceil(result.data.meta?.totalPages || 1));
        } else {
          setError(result.message);
          setProfiles([]);
          toast.error(result.message);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch markup profiles";
        setError(errorMessage);
        setProfiles([]);
        toast.error(errorMessage);
      }
      setLoading(false);
    };
    loadProfiles();
  }, [currentPage, searchQuery, pageSize, sortBy, sortOrder]);

  const userhasPermission = (routePaths) => {
    const isPermitted =
      isSuperAdmin || checkActionPermission("Markup Profiles", routePaths);
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
      const syncResult = await syncMarkupProfilesWithElastic();
      if (syncResult.success) {
        Swal.fire("Success", "Markup profiles synced successfully", "success");
      } else {
        Swal.fire(
          "Error",
          syncResult.message || "Failed to sync markup profiles",
          "error"
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to sync markup profiles";
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setSyncLoading(false);
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
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
          prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
        );
        try {
          const changeResult = await changeStatus(id, newStatus);
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

  const deleteProfile = async (id) => {
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
        setProfiles((prev) => prev.filter((p) => p.id !== id));
        try {
          const deleteResult = await deleteMarkupProfile(id);
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
      <Header2 title="MARKUP PROFILE MANAGEMENT" linkText1="Markup Profiles" />
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
          <div className="form-group mb-3" style={{ width: "6%" }}>
            {userhasPermission([actionRoutes.sync]) && (
              <button
                type="button"
                className="btn btn-dark equipe-btn btn-sm"
                onClick={handleSync}
                disabled={syncLoading}
                data-toggle="tooltip"
                title="Sync Markup Profiles"
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
                onClick={() => navigate("/markup-profiles/add-profile")}
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
                      onClick={() => handleSort("ruleName")}
                    >
                      Rule Name {getSortIcon("ruleName")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("businessChannel")}
                    >
                      Business Channel {getSortIcon("businessChannel")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("productType")}
                    >
                      Product Type {getSortIcon("productType")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("distributionChannel")}
                    >
                      Distribution Channel {getSortIcon("distributionChannel")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("markupValue")}
                    >
                      Markup {getSortIcon("markupValue")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      Status {getSortIcon("status")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("expiryDate")}
                    >
                      Expiry Date {getSortIcon("expiryDate")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("createdBy")}
                    >
                      Created By {getSortIcon("createdBy")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("createdAt")}
                    >
                      Created At {getSortIcon("createdAt")}
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("modifiedAt")}
                    >
                      Modified At {getSortIcon("modifiedAt")}
                    </th>
                    {hasAnyActionPermission && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading && profiles.length > 0 ? (
                    profiles.map((profile) => (
                      <tr key={profile.id}>
                        <td>{profile.id}</td>
                        <td>{profile.ruleName}</td>
                        <td>
                          {profile.businessChannel
                            ? formatSnakeToTitleCase(profile.businessChannel)
                            : "Any"}
                        </td>
                        <td>
                          {renderProductIcon(profile.productType)}
                          {profile.productType}
                        </td>
                        <td>
                          {profile.distributionChannel
                            ? formatSnakeToTitleCase(
                                profile.distributionChannel
                              )
                            : "Any"}
                        </td>
                        <td>
                          {profile.markupValue
                            ? `${profile.markupValue} ${
                                profile.markupType === "percentage" ? "%" : ""
                              }`
                            : "N/A"}
                        </td>
                        <td>
                          {userhasPermission([actionRoutes.status]) ? (
                            <div
                              className="cursor-pointer"
                              onClick={() =>
                                handleStatusChange(profile.id, profile.status)
                              }
                              data-toggle="tooltip"
                              title={profile.status ? "Deactivate" : "Activate"}
                            >
                              {profile.status ? (
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
                                profile.status ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {profile.status ? "Active" : "Inactive"}
                            </span>
                          )}
                        </td>
                        <td>{profile.expiryDate || "N/A"}</td>
                        <td>{profile.createdBy}</td>
                        <td>
                          {new Date(profile.createdAt).toLocaleString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </td>
                        <td>
                          {new Date(profile.modifiedAt).toLocaleString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </td>
                        {hasAnyActionPermission && (
                          <td>
                            <div className="actionCont d-flex align-items-center">
                              {userhasPermission([actionRoutes.view]) && (
                                <Link
                                  to={`/markup-profiles/view-profile/${profile.id}`}
                                  className="input-group-addon addFirst mr-2"
                                  data-toggle="tooltip"
                                  title="View"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              )}
                              {userhasPermission([actionRoutes.edit]) && (
                                <Link
                                  to={`/markup-profiles/edit-profile/${profile.id}`}
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

export default ProfileList;
