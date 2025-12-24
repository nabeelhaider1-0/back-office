import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../../../header2/header2";
import { apiHandler } from "../../../../Apis/backOfficeApiHandler";
import { toast } from "react-toastify";
import Constants from "../../../../constants/routes";
import Swal from "sweetalert2";

const MastersHotelAmenitiesSearch = () => {
  const [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [facilities, setFacilities] = useState([]);
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
    const loadFacilities = async (query) => {
      setLoading(true);
      try {
        const result = await apiHandler.get("/api/facilities", {
          params: {
            page: currentPage,
            limit: pageSize,
            search: query,
          },
        });

        if (result.status === 200) {
          const dataArray = result.data.data || result.data;
          const mappedfacilities = dataArray.map((c) => ({
            id: c.id,
            name: c.facility_name,
            createdAt: c.createdAt,
            updatedAt: c.updatedAt,
          }));
          setFacilities(mappedfacilities);

          const total = Number(result.total);
          const limit = Number(result.limit);
          setTotalPages(Math.max(1, Math.ceil(total / limit)));
        } else {
          setFacilities([]);
          toast.error(result.message || "Failed to fetch cities");
        }
      } catch (err) {
        setFacilities([]);
        toast.error(err.response?.data?.message || "Failed to fetch cities");
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
    if (queryToUse !== null) loadFacilities(queryToUse);
  }, [debouncedSearch, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

    const original = [...facilities];
    // optimistic UI
    setFacilities((prev) => prev.filter((c) => c.id !== id));
    // optimistic UI
    setFacilities((prev) => prev.filter((c) => c.id !== id));

    try {
      const res = await apiHandler.delete(`/api/facilities/${id}`);

      if (res?.status === 200) {
        Swal.fire("Deleted!", "Facility has been deleted.", "success");
      } else {
        setFacilities(original); // revert
        Swal.fire("Error", res?.data?.message || "Failed to delete", "error");
      }
    } catch (err) {
      setFacilities(original); // revert
      const msg = err?.response?.data?.message || "Failed to delete Facility";
      Swal.fire("Error", msg, "error");
    }
  };

  return (
    <>
      <Header2
        title="Facilities"
        linkText1="Facilities List"
        linkText2="Add Facility"
        link2={Constants.URLConstants.MASTERSHOTELAMENITIESNEW}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="form-group col-md-3 mb-3">
          <input
            type="search"
            className="form-control form-control-sm"
            placeholder="Search by name, full name, or country code..."
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
                    <th>Facility Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading && facilities.length > 0 ? (
                    facilities.map((facility) => (
                      <tr key={facility.id}>
                        <td>{facility.id}</td>
                        <td>{facility.name}</td>
                        <td>
                          <div className="actionCont d-flex align-items-center">
                            <Link
                              to={`/MastersHotelsAmenitiesView/${facility.id}`}
                              className="input-group-addon addFirst mr-2"
                              data-toggle="tooltip"
                              title="View"
                            >
                              <i className="fa fa-eye" />
                            </Link>
                            <Link
                              to={`/MastersHotelsAmenitiesEdit/${facility.id}`}
                              className="input-group-addon addFirst mr-2"
                              data-toggle="tooltip"
                              title="Edit"
                            >
                              <i className="fa fa-edit" />
                            </Link>
                            <div
                              className="input-group-addon addFirst mr-2"
                              onClick={() => handleDelete(facility.id)}
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

export default MastersHotelAmenitiesSearch;
