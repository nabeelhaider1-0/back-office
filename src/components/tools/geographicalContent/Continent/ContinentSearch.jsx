import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
// import Constants from "../../constants/routes";
import Header2 from "../../../header2/header2";
import { apiHandler } from "../../../../Apis/backOfficeApiHandler";
import { toast } from "react-toastify";
import Constants from "../../../../constants/routes";
import Swal from "sweetalert2";

const ContinentSearch = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [continents, setContinents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Use a simple ref to store the timer ID
  const debounceTimer = useRef(null);

  // Handle input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (value.length >= 2) {
      debounceTimer.current = setTimeout(() => {
        setDebouncedSearch(value);
        setCurrentPage(1); // reset page
      }, 300); // delay after user stops typing
    } else {
      setDebouncedSearch(""); // clear debounced search if < 2 chars
    }
  };

  // API call
  useEffect(() => {
    const loadContinents = async (query) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiHandler.get("/api/continent", {
          params: {
            page: currentPage,
            limit: pageSize,
            search: query,
          },
        });

        if (result.status === 200) {
          const dataArray = result.data.data || result.data;
          const mappedContinents = dataArray.map((c) => ({
            id: c.id,
            name: c.name ?? c?.name_json?.[0]?.name ?? "",
            name_full: c.name_full ?? c?.name_json?.[0]?.name_full ?? "",
            country_code: c.country_code ?? "",
            is_active: Boolean(c.is_active),
            center_latitude: c.center_latitude ?? "",
            center_longitude: c.center_longitude ?? "",
            createdAt: c.createdAt,
            updatedAt: c.updatedAt,
          }));
          setContinents(mappedContinents);

          const total = Number(result.total);
          const limit = Number(result.limit);
          console.log(total, limit);

          setTotalPages(Math.max(1, Math.ceil(total / limit)));
        } else {
          setContinents([]);
          toast.error(result.message || "Failed to fetch continents");
        }
      } catch (err) {
        setContinents([]);
        toast.error(
          err.response?.data?.message || "Failed to fetch continents"
        );
      }
      setLoading(false);
    };

    // Only trigger API if >= 2 chars or empty (initial load)
    const queryToUse =
      debouncedSearch.length >= 2
        ? debouncedSearch
        : debouncedSearch === ""
        ? ""
        : null;
    if (queryToUse !== null) loadContinents(queryToUse);
  }, [debouncedSearch, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleStatusChange = async (id, currentStatus) => {
    const newStatusBool = !currentStatus; // true/false
    const newStatusLabel = newStatusBool ? "active" : "inactive";

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the status to ${newStatusLabel}?`,
      icon: "question",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a",
      confirmButtonText: `Yes, set to ${newStatusLabel}!`,
    });

    if (!confirm.isConfirmed) return;

    // keep a copy to restore on failure
    const original = [...continents];

    // optimistic UI
    setContinents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, is_active: newStatusBool } : c))
    );

    try {
      // ✅ Adjust the endpoint/body to match your API
      // Option A (common): PATCH /api/countries/:id  body: { is_active: true/false }
      const res = await apiHandler.patch(`/api/continent/${id}`, {
        is_active: newStatusBool,
      });

      const ok =
        res?.status === 200 ||
        res?.status === 204 ||
        res?.data?.status === 200 ||
        res?.data?.success === true;

      if (ok) {
        Swal.fire("Success", `Status changed to ${newStatusLabel}.`, "success");
      } else {
        setContinents(original); // revert
        Swal.fire(
          "Error",
          res?.data?.message || "Failed to update status",
          "error"
        );
      }
    } catch (err) {
      setContinents(original); // revert
      const msg = err?.response?.data?.message || "Failed to update status";
      Swal.fire("Error", msg, "error");
    }
  };
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a ",
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    const original = [...continents];
    // optimistic UI
    setContinents((prev) => prev.filter((c) => c.id !== id));
    // optimistic UI
    setContinents((prev) => prev.filter((c) => c.id !== id));

    try {
      const res = await apiHandler.delete(`/api/continent/${id}`);

      if (res?.status === 200) {
        Swal.fire("Deleted!", "Continent has been deleted.", "success");
      } else {
        setContinents(original); // revert
        Swal.fire("Error", res?.data?.message || "Failed to delete", "error");
      }
    } catch (err) {
      setContinents(original); // revert
      const msg = err?.response?.data?.message || "Failed to delete Continent";
      Swal.fire("Error", msg, "error");
    }
  };

  return (
    <>
      <Header2
        title="Continents"
        linkText1="Continents List"
        linkText2="Add Continent"
        link2={Constants.URLConstants.TOOLSGEOGRAPHICALCONTENTCONTINENTSADD}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="form-group col-md-3 mb-3">
          <input
            type="search"
            className="form-control form-control-sm"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="row mt-2">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table table-bordered ">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Name Full</th>
                    <th>Status</th>
                    <th>Center Latitude</th>
                    <th>Center Longitude</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading && continents.length > 0 ? (
                    continents.map((continent) => (
                      <tr key={continent.id}>
                        <td>{continent.id}</td>
                        <td>{continent.name}</td>
                        <td>{continent.name_full}</td>
                        <td className="text-center">
                          <span
                            role="button"
                            className="d-inline-block"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleStatusChange(
                                continent.id,
                                continent.is_active
                              )
                            }
                            title={
                              continent.is_active ? "Deactivate" : "Activate"
                            }
                          >
                            {continent.is_active ? (
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
                          </span>
                        </td>
                        <td>{continent.center_latitude}</td>
                        <td>{continent.center_longitude}</td>
                        <td>
                          <div className="actionCont d-flex align-items-center">
                            <Link
                              to={`/toolsGeographicalContentContinentsView/${continent.id}`}
                              className="input-group-addon addFirst mr-2"
                              data-toggle="tooltip"
                              title="View"
                            >
                              <i className="fa fa-eye" />
                            </Link>
                            <Link
                              to={`/toolsGeographicalContentContinentsEdit/${continent.id}`}
                              className="input-group-addon addFirst mr-2"
                              data-toggle="tooltip"
                              title="Edit"
                            >
                              <i className="fa fa-edit" />
                            </Link>
                            <div
                              className="input-group-addon addFirst mr-2"
                              onClick={() => handleDelete(continent.id)}
                              data-toggle="tooltip"
                              title="Delete"
                            >
                              <i className="fa fa-trash" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="text-center">
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

export default ContinentSearch;
