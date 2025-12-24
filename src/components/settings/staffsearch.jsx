import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Header2 from "../header2/header2";
import { apiHandler } from "../../Apis/ApiHandler";
import { FaUser, FaToggleOn, FaToggleOff } from "react-icons/fa";
import {
  getPermittedMenuItems,
  isSuperAdmin as checkIfSuperAdmin,
  hasPermission as checkActionPermission,
} from "../../authUtils";
import routeConfig from "../../routeConfig";

const StaffSearch = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permittedItems, setPermittedItems] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setPermittedItems(
      getPermittedMenuItems(routeConfig).filter(
        (item) => item.module_name === "staff"
      )
    );
    setIsSuperAdmin(checkIfSuperAdmin());
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiHandler.get("/admin/list", {
          params: { page: currentPage, limit: pageSize, search: searchQuery },
        });
        if (result.success) {
          const mappedUsers = result.data.map((user) => ({
            id: user.id,
            email: user.email,
            name: `${user.first_name} ${user.last_name || ""}`.trim(),
            status: user.status === true, // Ensure it's boolean
            roleIds: user.roles || [],
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          }));
          setUsers(mappedUsers);
          setTotalPages(Math.ceil(result.meta?.total || 1) / pageSize);
        } else {
          setError(result.message);
          setUsers([]);
          toast.error(result.message);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch staff list";
        setError(errorMessage);
        setUsers([]);
        toast.error(errorMessage);
      }
      setLoading(false);
    };
    loadUsers();
  }, [currentPage, searchQuery, pageSize]);

  const userhasPermission = (routePaths) => {
    return isSuperAdmin || checkActionPermission("staff", routePaths);
  };

  const handleDelete = async (id) => {
    if (!userhasPermission(["delete"])) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const originalUsers = [...users];
        setUsers((prev) => prev.filter((u) => u.id !== id));

        try {
          const deleteResult = await apiHandler.delete(`/admin/delete/${id}`);
          if (deleteResult.success) {
            toast.success("Staff deleted successfully");
          } else {
            setUsers(originalUsers);
            toast.error(deleteResult.message || "Failed to delete");
          }
        } catch (error) {
          setUsers(originalUsers);
          toast.error("Failed to delete staff");
        }
      }
    });
  };

  const handleStatusChange = async (id, currentStatus) => {
    if (!userhasPermission(["change_status"])) return;

    const newStatus = !currentStatus; // Toggle boolean
    const statusText = newStatus ? "active" : "inactive";

    Swal.fire({
      title: "Change Status?",
      text: `Set status to ${statusText}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a",
      confirmButtonText: `Yes, set to ${statusText}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const originalUsers = [...users];
        // Optimistically update UI
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u))
        );

        try {
          const response = await apiHandler.put(`/admin/status/${id}`, {
            status: statusText, // Send "active" or "inactive" as expected by backend
          });

          if (response.success) {
            toast.success(`Status updated to ${statusText}`);
          } else {
            setUsers(originalUsers);
            toast.error(response.message || "Failed to update status");
          }
        } catch (error) {
          setUsers(originalUsers);
          toast.error("Failed to update status");
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
    edit: "update",
    delete: "delete",
    status: "change_status",
    add: "actions",
  };

  const hasAnyActionPermission = userhasPermission([
    actionRoutes.view,
    actionRoutes.edit,
    actionRoutes.delete,
    actionRoutes.status,
  ]);

  return (
    <>
      <Header2 title="STAFF MANAGEMENT" linkText1="Staff List" />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="row d-flex mt-4">
          <div className="form-group col-md-3 mb-3">
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Search by email or name..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="form-group col-md-2">
            {userhasPermission([actionRoutes.add]) && (
              <button
                type="button"
                className="btn btn-dark btn-sm me-3"
                onClick={() => navigate("/staffNew")}
              >
                <i className="fa fa-plus" /> Add Staff
              </button>
            )}
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Role</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    {hasAnyActionPermission && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={hasAnyActionPermission ? 8 : 7}
                        className="text-center py-4"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td className="textUsersLeft">
                          <FaUser className="me-2 text-muted" />
                          {user.name || "N/A"}
                        </td>

                        {/* STATUS TOGGLE - FIXED */}
                        <td>
                          {userhasPermission([actionRoutes.status]) ? (
                            <div
                              className="d-inline-block cursor-pointer"
                              onClick={() =>
                                handleStatusChange(user.id, user.status)
                              }
                              title={
                                user.status
                                  ? "Click to deactivate"
                                  : "Click to activate"
                              }
                            >
                              {user.status ? (
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
                                user.status ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {user.status ? "Active" : "Inactive"}
                            </span>
                          )}
                        </td>

                        <td>
                          {user.roleIds.length > 0
                            ? user.roleIds[0]?.name || "None"
                            : "None"}
                        </td>
                        <td>
                          {new Date(user.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </td>
                        <td>
                          {new Date(user.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </td>

                        {hasAnyActionPermission && (
                          <td>
                            <div className="actionCont d-flex align-items-center">
                              {userhasPermission([actionRoutes.view]) && (
                                <Link
                                  to={`/staff/view/${user.id}`}
                                  className="input-group-addon addFirst mr-2"
                                  title="View"
                                >
                                  <i class="fa fa-eye" aria-hidden="true"></i>
                                </Link>
                              )}
                              {userhasPermission([actionRoutes.edit]) && (
                                <Link
                                  to={`/staff/edit/${user.id}`}
                                  className="input-group-addon addFirst mr-2"
                                  data-toggle="tooltip"
                                  title="Edit"
                                >
                                  <i class="fa fa-edit" aria-hidden="true"></i>
                                </Link>
                              )}
                              {userhasPermission([actionRoutes.delete]) && (
                                <div
                                  className="input-group-addon addFirst mr-2"
                                  onClick={() => handleDelete(user.id)}
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
                        colSpan={hasAnyActionPermission ? 8 : 7}
                        className="text-center py-4"
                      >
                        No staff found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div>
                <select
                  className="form-select form-select-sm"
                  style={{ width: "auto" }}
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
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

export default StaffSearch;
