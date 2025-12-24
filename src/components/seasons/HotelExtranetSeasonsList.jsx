import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Swal from "sweetalert2";
import MultiSelect from "../reactMultiSelect";
import {
  listHotels,
  listSeasons,
  deleteSeason,
} from "../../Apis/hotelExtranetApi";
import Constants from "../../constants/routes";
import { toast } from "react-toastify";
import WizardGuideAssistant from "../hotelWizard/WizardGuideAssistant";

export default function HotelExtranetSeasonsList({ setShowHeaderAndMenuBar }) {
  const [hotelId, setHotelId] = useState("");
  const [hotelOptions, setHotelOptions] = useState([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const [seasons, setSeasons] = useState([]);
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

  useEffect(() => {
    async function fetchHotels() {
      setIsLoadingHotels(true);
      try {
        const resp = await listHotels({ page: 1, size: 100 });
        const arr = Array.isArray(resp?.items)
          ? resp.items
          : Array.isArray(resp?.data)
          ? resp.data
          : Array.isArray(resp)
          ? resp
          : [];
        setHotelOptions(
          arr.map((h) => ({
            value: h.id || h._id || h.hotelId,
            label: h.display_name || h.displayName || h.name,
          }))
        );
      } catch {
        setHotelOptions([]);
      } finally {
        setIsLoadingHotels(false);
      }
    }
    fetchHotels();
  }, []);

  const fetchSeasons = async () => {
    if (!hotelId) return;
    setLoading(true);
    setError("");
    try {
      const data = await listSeasons(hotelId, {
        page,
        size,
        search: debouncedSearch || undefined,
      });
      // flexible API result handling
      const items = Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
        ? data
        : [];
      setSeasons(items);
      const total = Number(data?.total || data?.meta?.total || 0);
      const pageSize = Number(data?.size || data?.meta?.limit || size);
      const computed =
        total && pageSize
          ? Math.max(1, Math.ceil(total / pageSize))
          : items.length < size && page === 1
          ? 1
          : page + (items.length === size ? 1 : 0);
      setTotalPages(computed || 1);
    } catch {
      setSeasons([]);
      setError("Failed to load seasons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hotelId) fetchSeasons();
  }, [hotelId, page, size, debouncedSearch]);

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
    const original = [...seasons];
    setSeasons((prev) => prev.filter((s) => s.id !== id));
    try {
      const res = await deleteSeason(id, true);
      if (!(res?.status === 200 || res?.status === 204)) throw new Error();
      Swal.fire("Deleted!", "Season deleted.", "success");
      fetchSeasons();
    } catch {
      setSeasons(original);
      Swal.fire("Error", "Failed to delete season", "error");
    }
  };

  return (
    <>
      <Header2
        title="Seasons"
        linkText1="Seasons List"
        linkText2="Add Season"
        link2={Constants.URLConstants.HOTELSEXTRANETSEASONSADD}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="form-group col-md-3 mb-3">
          <label>
            Hotel <span className="text-danger">*</span>
          </label>
          <MultiSelect
            isSearchable
            isMulti={false}
            isLoading={isLoadingHotels}
            options={hotelOptions}
            placeholder="- Select Hotel -"
            value={hotelOptions.find((o) => o.value === hotelId) || null}
            onChange={(opt) => {
              setHotelId(opt ? opt.value : "");
              setPage(1);
            }}
            className="custom-select"
            noOptionsMessage={() =>
              isLoadingHotels ? "Loading..." : "Type to search"
            }
          />
        </div>
        <div className="form-group col-md-3 mb-3">
          <input
            type="search"
            className="form-control form-control-sm"
            placeholder="Search by name, market, etc..."
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
                    <th>Hotel</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Markets</th>
                    <th>Channels</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading && seasons.length > 0 ? (
                    seasons.map((s) => (
                      <tr key={s.id || s._id || s.uuid || s.seasonId}>
                        <td>{s.id || s._id || s.uuid || s.seasonId}</td>
                        <td>{s.name}</td>
                        <td>
                          {hotelOptions.find(
                            (h) => h.value === (s.hotelId || s.hotel_id)
                          )?.label ||
                            s.hotelId ||
                            s.hotel_id ||
                            ""}
                        </td>
                        <td>{s.start_date || s.startDate || "-"}</td>
                        <td>{s.end_date || s.endDate || "-"}</td>
                        <td>
                          {Array.isArray(s.markets)
                            ? s.markets.join(", ")
                            : s.markets}
                        </td>
                        <td>
                          {Array.isArray(s.channels)
                            ? s.channels.join(", ")
                            : s.channels}
                        </td>
                        <td>
                          <div className="actionCont d-flex align-items-center">
                            <Link
                              to={`${Constants.URLConstants.HOTELSEXTRANETSEASONSVIEW}/${s.id}`}
                              className="input-group-addon addFirst mr-2"
                              title="View"
                            >
                              <i className="fa fa-eye" />
                            </Link>
                            <Link
                              to={`${Constants.URLConstants.HOTELSEXTRANETSEASONSEDIT}/${s.id}`}
                              className="input-group-addon addFirst mr-2"
                              title="Edit"
                            >
                              <i className="fa fa-edit" />
                            </Link>
                            <div
                              className="input-group-addon addFirst mr-2"
                              onClick={() => handleDelete(s.id)}
                              title="Delete"
                              style={{ cursor: "pointer" }}
                            >
                              <i className="fa fa-trash" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center">
                        {loading ? "Loading..." : "No seasons found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {hotelId && (
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
            )}
          </div>
        </div>
      </div>
      <WizardGuideAssistant stepId="seasonsList" />
    </>
  );
}
