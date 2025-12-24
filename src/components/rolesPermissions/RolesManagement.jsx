import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Header2 from "../header2/header2";
import { apiHandler } from "../../Apis/apiHandler2";
import { FaToggleOn, FaToggleOff, FaEdit } from "react-icons/fa";

const RolesManagement = () => {
  const [roles, setRoles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRoles = async () => {
      setLoading(true);
      try {
        const result = await apiHandler.get("/admin/roles", {
          params: { page: currentPage, limit: pageSize, search: searchQuery },
        });
        if (result.success) {
          setRoles(result.data.roles);
          setTotalPages(Math.ceil(result.data.totalPages || 1));
        } else {
          setRoles([]);
          toast.error(result.message);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch roles list";
        setRoles([]);
        toast.error(errorMessage);
      }
      setLoading(false);
    };
    loadRoles();
  }, [currentPage, searchQuery, pageSize]);

  const handleDelete = async (id) => {
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
        const originalRoles = [...roles];
        setRoles((prev) => prev.filter((r) => r.id !== id));
        try {
          const deleteResult = await apiHandler.delete(`/admin/roles/${id}`);
          if (deleteResult.success) {
            Swal.fire("Deleted!", "Role has been deleted.", "success");
          } else {
            setRoles(originalRoles);
            Swal.fire("Error", deleteResult.message, "error");
          }
        } catch (error) {
          setRoles(originalRoles);
          const errorMessage =
            error.response?.data?.message || "Failed to delete role";
          Swal.fire("Error", errorMessage, "error");
        }
      }
    });
  };

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the status to ${newStatus}?`,
      icon: "question",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a",
      confirmButtonText: `Yes, set to ${newStatus}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const originalRoles = [...roles];
        setRoles((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
        try {
          const statusResult = await apiHandler.put(
            `/admin/roles/${id}/status`,
            {
              status: newStatus,
            }
          );
          if (statusResult.success) {
            Swal.fire("Success", `Status changed to ${newStatus}.`, "success");
          } else {
            setRoles(originalRoles);
            Swal.fire("Error", statusResult.message, "error");
          }
        } catch (error) {
          setRoles(originalRoles);
          const errorMessage =
            error.response?.data?.message || "Failed to update status";
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

  return (
    <>
      <Header2 title="ROLES MANAGEMENT" linkText1="Roles List" />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="row mt-4">
          <div className="form-group col-md-3 mb-3">
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Search by role name..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="form-group col-md-3">
            <button
              type="button"
              className="btn btn-dark btn-sm me-3"
              onClick={() => navigate("/roles/new")}
            >
              <i className="fa fa-plus" /> Add Role
            </button>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table table-bordered ">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Rights</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading && roles.length > 0 ? (
                    roles.map((role) => (
                      <tr key={role.id}>
                        <td>{role.id}</td>
                        <td>{role.name}</td>
                        <td style={{ width: "7%" }}>
                          <Link
                            className="cursor-pointer"
                            onClick={() =>
                              handleStatusChange(role.id, role.status)
                            }
                            data-toggle="tooltip"
                            title={
                              role.status === "active"
                                ? "Deactivate"
                                : "Activate"
                            }
                          >
                            {role.status === "active" ? (
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
                          </Link>
                        </td>
                        <td>
                          {role.roleRights.map((rr) => (
                            <div key={rr.id}>
                              <span
                                style={{ fontWeight: "600", fontSize: "13px" }}
                              >
                                {rr.right.module_name}:{" "}
                              </span>
                              {rr.allowed_actions.join(", ")}
                            </div>
                          ))}
                        </td>
                        <td>
                          {new Date(role.created_at).toLocaleString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </td>
                        <td>
                          {new Date(role.updated_at).toLocaleString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </td>
                        <td>
                          <div className="actionCont d-flex align-items-center">
                            <Link
                              to={`/roles/edit/${role.id}`}
                              className="input-group-addon addFirst mr-2"
                              data-toggle="tooltip"
                              title="Edit"
                            >
                              <i class="fa fa-edit" aria-hidden="true"></i>
                            </Link>
                            <div
                              className="input-group-addon addFirst mr-2"
                              onClick={() => handleDelete(role.id)}
                              data-toggle="tooltip"
                              title="Delete"
                            >
                              <i class="fa fa-trash" aria-hidden="true"></i>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
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

export default RolesManagement;
