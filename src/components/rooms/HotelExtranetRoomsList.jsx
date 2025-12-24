import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { listRooms, deleteRoom, listHotels } from "../../Apis/hotelExtranetApi";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import Swal from "sweetalert2";
import MultiSelect from "../reactMultiSelect";
import WizardGuideAssistant from "../hotelWizard/WizardGuideAssistant";

export default function HotelExtranetRoomsList({ setShowHeaderAndMenuBar }) {
  const [hotelId, setHotelId] = useState("");
  const [hotels, setHotels] = useState([]);
  const [hotelOptions, setHotelOptions] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
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
        const arr = Array.isArray(resp?.items) ? resp.items : [];
        setHotels(arr);
        setHotelOptions(
          arr.map((h) => ({ value: h.id, label: h.displayName }))
        );
      } catch {
        setHotels([]);
        setHotelOptions([]);
      } finally {
        setIsLoadingHotels(false);
      }
    }
    fetchHotels();
  }, []);

  const fetchRooms = async () => {
    if (!hotelId) return;
    setLoading(true);
    setError("");
    try {
      // search not implemented in API, so just paginating for now
      const data = await listRooms(hotelId, { page, size });
      const items = Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
        ? data
        : [];
      setRooms(items);
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
      setRooms([]);
      setTotalPages(1);
      setError("Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hotelId) fetchRooms();
  }, [hotelId, page, size]);

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
    const original = [...rooms];
    setRooms((prev) => prev.filter((r) => r.id !== id));
    try {
      const res = await deleteRoom(id);
      if (!(res?.status === 200 || res?.status === 204)) throw new Error();
      Swal.fire("Deleted!", "Room deleted.", "success");
      fetchRooms();
    } catch {
      setRooms(original);
      Swal.fire("Error", "Failed to delete room", "error");
    }
  };

  // Add search input at the top
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

  return (
    <>
      <Header2
        title="Rooms"
        linkText1="Rooms List"
        linkText2="Add Room"
        link2={Constants.URLConstants.HOTELSEXTRANETROOMSADD}
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
            placeholder="Search by code, name, etc..."
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
                    <th>Code</th>
                    <th>Name</th>
                    <th>Max Adults</th>
                    <th>Max Children</th>
                    <th>Bedding</th>
                    <th>Amenities</th>
                    <th>Area (sqm)</th>
                    <th>Images</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading && rooms.length > 0 ? (
                    rooms.map((r) => (
                      <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.code}</td>
                        <td>{r.name}</td>
                        <td>{r.maxAdults}</td>
                        <td>{r.maxChildren}</td>
                        <td>{(r.bedding || []).join(", ")}</td>
                        <td>{(r.amenities || []).join(", ")}</td>
                        <td>{r.areaSqm}</td>
                        <td>
                          {Array.isArray(r.images) && r.images.length > 0 ? (
                            <div className="d-flex">
                              {r.images.slice(0, 2).map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img.url}
                                  alt="img"
                                  style={{
                                    width: 32,
                                    height: 32,
                                    objectFit: "cover",
                                    marginRight: 2,
                                  }}
                                />
                              ))}
                              {r.images.length > 2 && (
                                <span>+{r.images.length - 2}</span>
                              )}
                            </div>
                          ) : null}
                        </td>
                        <td>
                          <div className="actionCont d-flex align-items-center">
                            <Link
                              to={`${Constants.URLConstants.HOTELSEXTRANETROOMSVIEW}/${r.id}`}
                              className="input-group-addon addFirst mr-2"
                              title="View"
                            >
                              <i className="fa fa-eye" />
                            </Link>
                            <Link
                              to={`${Constants.URLConstants.HOTELSEXTRANETROOMSEDIT}/${r.id}`}
                              className="input-group-addon addFirst mr-2"
                              title="Edit"
                            >
                              <i className="fa fa-edit" />
                            </Link>
                            <div
                              className="input-group-addon addFirst mr-2"
                              onClick={() => handleDelete(r.id)}
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
                      <td colSpan={10} className="text-center">
                        {loading ? "Loading..." : "No rooms found"}
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
      <WizardGuideAssistant stepId="roomsList" />
    </>
  );
}
