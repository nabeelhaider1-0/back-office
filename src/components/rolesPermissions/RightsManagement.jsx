import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Header2 from "../header2/header2";
import { apiHandler } from "../../Apis/apiHandler2";
import { FaTrash, FaToggleOn, FaToggleOff, FaEdit } from "react-icons/fa";

const RightsManagement = () => {
  const [rights, setRights] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRights = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiHandler.get("/admin/rights", {
          params: { page: currentPage, limit: pageSize, search: searchQuery },
        });
        if (result.success) {
          setRights(result.data.rights);
          setTotalPages(Math.ceil(result.data.totalPages || 1));
        } else {
          setError(result.message);
          setRights([]);
          toast.error(result.message);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch rights list";
        setError(errorMessage);
        setRights([]);
        toast.error(errorMessage);
      }
      setLoading(false);
    };
    loadRights();
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
        const originalRights = [...rights];
        setRights((prev) => prev.filter((r) => r.id !== id));
        try {
          const deleteResult = await apiHandler.delete(`/admin/rights/${id}`);
          if (deleteResult.success) {
            Swal.fire("Deleted!", "Right has been deleted.", "success");
          } else {
            setRights(originalRights);
            Swal.fire("Error", deleteResult.message, "error");
          }
        } catch (error) {
          setRights(originalRights);
          const errorMessage =
            error.response?.data?.message || "Failed to delete right";
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
      <Header2 title="RIGHTS MANAGEMENT" linkText1="Rights List" />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="row mt-4">
          <div className="form-group col-md-3 mb-3">
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Search by module name..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="form-group col-md-3">
            <button
              type="button"
              className="btn btn-dark btn-sm me-3"
              onClick={() => navigate("/rights/new")}
            >
              <i className="fa fa-plus" /> Add Right
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
                    <th>Module Name</th>
                    <th>Actions</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading && rights.length > 0 ? (
                    rights.map((right) => (
                      <tr key={right.id}>
                        <td>{right.id}</td>
                        <td>{right.module_name}</td>
                        <td>{right.actions.join(", ")}</td>
                        <td>{right.description || "N/A"}</td>
                        <td>
                          <div className="actionCont d-flex align-items-center">
                            <Link
                              to={`/rights/edit/${right.id}`}
                              className="input-group-addon addFirst mr-2"
                              data-toggle="tooltip"
                              title="Edit"
                            >
                              <i class="fa fa-edit" aria-hidden="true"></i>
                            </Link>
                            {/* <div
                              className="input-group-addon addFirst mr-2"
                              onClick={() => handleDelete(right.id)}
                              data-toggle="tooltip"
                              title="Delete"
                            >
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                            </div> */}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
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

export default RightsManagement;
