import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import {
  listHotels,
  deleteHotel,
  setHotelStatus,
} from "../../Apis/hotelExtranetApi";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import Swal from "sweetalert2";
import WizardGuideAssistant from "../hotelWizard/WizardGuideAssistant";

export default function HotelExtranetHotelsList({ setShowHeaderAndMenuBar }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceTimer = useRef(null);

  useEffect(() => {
    setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const searchParam =
        debouncedSearch && debouncedSearch.length >= 2
          ? debouncedSearch
          : undefined;
      const data = await listHotels({
        page,
        size,
        city: undefined,
        country: undefined,
        star: undefined,
        status: undefined,
        search: searchParam,
      });
      const items = Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
        ? data
        : [];
      setHotels(items);
      const total = Number(data?.total || data?.meta?.total || 0);
      const pageSize = Number(data?.size || data?.meta?.limit || size);
      const computed =
        total && pageSize
          ? Math.max(1, Math.ceil(total / pageSize))
          : items.length < size && page === 1
          ? 1
          : page + (items.length === size ? 1 : 0);
      setTotalPages(computed || 1);
    } catch (e) {
      setError("Failed to load hotels");
      setHotels([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, size, debouncedSearch]);

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (value.length >= 2 || value === "") {
      debounceTimer.current = setTimeout(() => {
        setDebouncedSearch(value);
        setPage(1);
      }, 300);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Change status to ${newStatus}?`,
      icon: "question",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a",
    });
    if (!confirm.isConfirmed) return;
    const original = [...hotels];
    setHotels((prev) =>
      prev.map((h) => (h.id === id ? { ...h, status: newStatus } : h))
    );
    try {
      const res = await setHotelStatus(id, newStatus);
      const ok = res?.status === 200 || res?.status === 204;
      if (!ok) throw new Error();
    } catch (_) {
      setHotels(original);
      Swal.fire("Error", "Failed to update status", "error");
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
      cancelButtonColor: "#1a385a",
    });
    if (!confirm.isConfirmed) return;
    const original = [...hotels];
    setHotels((prev) => prev.filter((h) => h.id !== id));
    try {
      const res = await deleteHotel(id, true);
      const ok = res?.status === 200 || res?.status === 204;
      if (!ok) throw new Error();
      Swal.fire("Deleted!", "Hotel deleted.", "success");
    } catch (_) {
      setHotels(original);
      Swal.fire("Error", "Failed to delete hotel", "error");
    }
  };

  return (
    <>
      <Header2
        title="Hotels"
        linkText1="Hotels List"
        linkText2="Add Hotel"
        link2={Constants.URLConstants.HOTELSEXTRANETADD}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="form-group col-md-3 mb-3">
          <input
            type="search"
            className="form-control form-control-sm"
            placeholder="Search by name, city, country..."
            value={search}
            onChange={onSearchChange}
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
                    <th>Legal Name</th>
                    <th>Brand</th>
                    <th>Chain</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Star</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading && hotels.length > 0 ? (
                    hotels.map((h) => (
                      <tr key={h.id || h._id || h.uuid || h.hotelId}>
                        <td>{h.id || h._id || h.uuid || h.hotelId}</td>
                        <td>{h.display_name || h.displayName || h.name}</td>
                        <td>{h.legal_name || h.legalName || ""}</td>
                        <td>{h.brand || ""}</td>
                        <td>{h.chain || ""}</td>
                        <td>{h.address?.city || h.city}</td>
                        <td>{h.address?.country || h.country}</td>
                        <td>{h.star_rating || h.starRating}</td>
                        <td className="text-center">
                          <span
                            role="button"
                            className="d-inline-block"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleStatusToggle(h.id, h.status)}
                            title={
                              h.status === "active" ? "Deactivate" : "Activate"
                            }
                          >
                            {h.status === "active" ? (
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
                        <td>
                          <div className="actionCont d-flex align-items-center">
                            <Link
                              to={`${Constants.URLConstants.HOTELSEXTRANETLIST}/overview/${h.id}`}
                              className="input-group-addon addFirst mr-2"
                              title="Contracts overview"
                            >
                              <i className="fa fa-sitemap" />
                            </Link>
                            <Link
                              to={`${Constants.URLConstants.HOTELSEXTRANETVIEW}/${h.id}`}
                              className="input-group-addon addFirst mr-2"
                              title="View"
                            >
                              <i className="fa fa-eye" />
                            </Link>
                            <Link
                              to={`${Constants.URLConstants.HOTELSEXTRANETEDIT}/${h.id}`}
                              className="input-group-addon addFirst mr-2"
                              title="Edit"
                            >
                              <i className="fa fa-edit" />
                            </Link>
                            <div
                              className="input-group-addon addFirst mr-2"
                              onClick={() => handleDelete(h.id)}
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
                      <td colSpan={7} className="text-center">
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
                  value={size}
                  onChange={(e) => {
                    setSize(parseInt(e.target.value));
                    setPage(1);
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
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  className="btn btn-dark btn-sm ms-2"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WizardGuideAssistant stepId="hotelsList" />
    </>
  );
}
