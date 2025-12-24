import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header2 from "../header2/header2";
import { apiHandler } from "../../Apis/ApiHandler";
import { FaUser } from "react-icons/fa";
import {
  getPermittedMenuItems,
  isSuperAdmin as checkIfSuperAdmin,
  hasPermission as checkActionPermission,
} from "../../authUtils";
import routeConfig from "../../routeConfig";

const B2CSearch = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [permittedItems, setPermittedItems] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const navigate = useNavigate();
  const handleViewBookings = (userId) => {
    navigate(`/SearchBookings?userId=${userId}`);
  };
  useEffect(() => {
    // Fetch permitted items and super admin status for 'User Management' module
    setPermittedItems(
      getPermittedMenuItems(routeConfig).filter(
        (item) => item.module_name === "User Management"
      )
    );
    setIsSuperAdmin(checkIfSuperAdmin());
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiHandler.get("/users/list", {
          params: { page: currentPage, limit: pageSize, search: searchQuery },
        });
        console.log("API Response:", result);
        if (result.success) {
          const mappedUsers = Array.isArray(result.data)
            ? result.data.map((user) => ({
                id: user.id,
                email: user.email,
                name: user.full_name,
                provider: user.provider,
                email_verified_at: user.email_verified_at,
                createdAt: user.created_at,
                updatedAt: user.updated_at,
                user_type: user.user_type || "N/A",
              }))
            : [];
          setUsers(mappedUsers);
          setTotalPages(Math.ceil(result.meta?.totalPages || 1));
        } else {
          setError(result.message);
          setUsers([]);
          toast.error(result.message);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch user list";
        setError(errorMessage);
        setUsers([]);
        toast.error(errorMessage);
      }
      setLoading(false);
    };
    loadUsers();
  }, [currentPage, searchQuery, pageSize]);

  const userhasPermission = (routePaths) => {
    const isPermitted =
      isSuperAdmin || checkActionPermission("User Management", routePaths);
    console.log("permittedItems", permittedItems, routePaths, isPermitted);
    return isPermitted;
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewUser = async (id) => {
    if (!userhasPermission(["read"])) return; // Prevent action if no permission
    setError(null);
    try {
      const result = await apiHandler.get(`/users/${id}`);
      console.log("API Response:", result);
      if (result.success) {
        setSelectedUser({
          id: result.data.id,
          email: result.data.email,
          full_name: result.data.full_name || "N/A",
          phone_number: result.data.phone_number || "N/A",
          provider: result.data.provider,
          provider_id: result.data.provider_id || "N/A",
          email_verified_at: result.data.email_verified_at,
          business_channel: result.data.business_channel || "N/A",
          user_type: result.data.user_type || "N/A",
          country: result.data.country || "N/A",
          city: result.data.city || "N/A",
          created_at: result.data.created_at,
          updated_at: result.data.updated_at,
        });
        setShowModal(true);
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch user details";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // Define action routes
  const actionRoutes = {
    view: "read",
  };

  // Check if any actions are permitted to show the Actions column
  const hasAnyActionPermission = userhasPermission([actionRoutes.view]);

  return (
    <>
      <Header2 title="USER MANAGEMENT" linkText1="User List" />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="row mt-4">
          <div className="form-group col-md-3 mb-3">
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Search by email or name..."
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
                    <th>Email</th>
                    <th>Name</th>
                    <th>Provider</th>
                    <th>Email Verified</th>
                    <th>User Type</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    {hasAnyActionPermission && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading && users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td className="textUsersLeft">
                          <FaUser className="me-2 fs-6" />
                          {user?.name
                            ? user.name
                            : user?.provider?.toLowerCase() === "apple" &&
                              user?.email
                            ? user.email.split("@")[0]
                            : ""}
                        </td>
                        <td>
                          <span
                            className="td_label label-social"
                            style={{ fontSize: "11px" }}
                          >
                            {user.provider}
                          </span>
                        </td>
                        <td>
                          <span
                            style={{ fontSize: "11px" }}
                            className={`td_label ${
                              user.email_verified_at
                                ? "label-success"
                                : "label-primary"
                            }`}
                          >
                            {user.email_verified_at
                              ? "Verified"
                              : "Not Verified"}
                          </span>
                        </td>
                        <td>
                          <span
                            style={{ fontSize: "11px" }}
                            className="td_label label-info"
                          >
                            {user.user_type}
                          </span>
                        </td>
                        <td>
                          {new Date(user.createdAt).toLocaleString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </td>
                        <td>
                          {new Date(user.updatedAt).toLocaleString("en-US", {
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
                              {userhasPermission([actionRoutes.view]) && (
                                <div
                                  className="input-group-addon addFirst mr-2"
                                  onClick={() => handleViewUser(user.id)}
                                  data-toggle="tooltip"
                                  title="View"
                                >
                                  <i class="fa fa-eye" aria-hidden="true"></i>
                                </div>
                              )}
                              <div
                                className="input-group-addon addFirst mr-2"
                                onClick={() => handleViewBookings(user.id)}
                                data-toggle="tooltip"
                                title="View Bookings"
                                style={{ cursor: "pointer", marginLeft: "8px" }}
                              >
                                📖{" "}
                                {/* You can replace this with an icon like FaBookOpen */}
                              </div>
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

      {/* Modal for User Details */}
      {showModal && selectedUser && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row colorBlacker">
                  <div className="col-md-6">
                    <p>
                      <strong>ID:</strong> {selectedUser.id}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedUser.email}
                    </p>
                    <p>
                      <strong>Name:</strong> {selectedUser.full_name}
                    </p>
                    <p>
                      <strong>Phone Number:</strong> {selectedUser.phone_number}
                    </p>
                    <p>
                      <strong>Provider:</strong> {selectedUser.provider}
                    </p>
                    <p>
                      <strong>Provider ID:</strong> {selectedUser.provider_id}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Email Verified:</strong>{" "}
                      <span
                        className={`badge ${
                          selectedUser.email_verified_at
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {selectedUser.email_verified_at
                          ? "Verified"
                          : "Not Verified"}
                      </span>
                    </p>
                    <p>
                      <strong>Business Channel:</strong>{" "}
                      {selectedUser.business_channel}
                    </p>
                    <p>
                      <strong>User Type:</strong> {selectedUser.user_type}
                    </p>
                    <p>
                      <strong>Country:</strong> {selectedUser.country}
                    </p>
                    <p>
                      <strong>City:</strong> {selectedUser.city}
                    </p>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {new Date(selectedUser.created_at).toLocaleString(
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
                    </p>
                    <p>
                      <strong>Updated At:</strong>{" "}
                      {new Date(selectedUser.updated_at).toLocaleString(
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

export default B2CSearch;
