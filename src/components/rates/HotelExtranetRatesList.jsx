import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Swal from "sweetalert2";
import MultiSelect from "../reactMultiSelect";
import {
  listRates,
  listContracts,
  listHotels,
  listSeasons,
  listRooms,
  deleteRate,
} from "../../Apis/hotelExtranetApi";
import Constants from "../../constants/routes";
import { toast } from "react-toastify";
import WizardGuideAssistant from "../hotelWizard/WizardGuideAssistant";

export default function HotelExtranetRatesList({ setShowHeaderAndMenuBar }) {
  const [hotelId, setHotelId] = useState("");
  const [hotelOptions, setHotelOptions] = useState([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);

  const [contractId, setContractId] = useState("");
  const [contractOptions, setContractOptions] = useState([]);
  const [isLoadingContracts, setIsLoadingContracts] = useState(false);

  const [seasonId, setSeasonId] = useState("");
  const [seasonOptions, setSeasonOptions] = useState([]);
  const [isLoadingSeasons, setIsLoadingSeasons] = useState(false);

  const [roomId, setRoomId] = useState("");
  const [roomOptions, setRoomOptions] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [contractsMap, setContractsMap] = useState({});
  const [seasonsMap, setSeasonsMap] = useState({});
  const [roomsMap, setRoomsMap] = useState({});
  const [rates, setRates] = useState([]);
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

  // initial hotels
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

  // when hotel changes, load contracts, seasons, rooms
  useEffect(() => {
    const loadDeps = async () => {
      setContractId("");
      setSeasonId("");
      setRoomId("");
      setContractOptions([]);
      setSeasonOptions([]);
      setRoomOptions([]);
      if (!hotelId) return;
      try {
        setIsLoadingContracts(true);
        const resp = await listContracts(hotelId, { page: 1, size: 100 });
        const carr = Array.isArray(resp?.items)
          ? resp.items
          : Array.isArray(resp?.data)
          ? resp.data
          : Array.isArray(resp)
          ? resp
          : [];
        setContractOptions(
          carr.map((c) => ({ value: c.id || c.contractId, label: c.name }))
        );
        const map = {};
        carr.forEach((c) => {
          map[c.id || c.contractId] = c.name || c.contractId;
        });
        setContractsMap(map);
      } catch {
        setContractOptions([]);
      } finally {
        setIsLoadingContracts(false);
      }
      try {
        setIsLoadingSeasons(true);
        const sresp = await listSeasons(hotelId, { page: 1, size: 100 });
        const sarr = Array.isArray(sresp?.items)
          ? sresp.items
          : Array.isArray(sresp?.data)
          ? sresp.data
          : Array.isArray(sresp)
          ? sresp
          : [];
        setSeasonOptions(
          sarr.map((s) => ({
            value: s.id,
            label:
              s.name ||
              `${s.start_date || s.startDate} - ${s.end_date || s.endDate}`,
          }))
        );
        const smap = {};
        sarr.forEach((s) => {
          smap[s.id] =
            s.name ||
            `${s.start_date || s.startDate} - ${s.end_date || s.endDate}`;
        });
        setSeasonsMap(smap);
      } catch {
        setSeasonOptions([]);
      } finally {
        setIsLoadingSeasons(false);
      }
      try {
        setIsLoadingRooms(true);
        const rresp = await listRooms(hotelId, { page: 1, size: 100 });
        const rarr = Array.isArray(rresp?.items)
          ? rresp.items
          : Array.isArray(rresp?.data)
          ? rresp.data
          : Array.isArray(rresp)
          ? rresp
          : [];
        setRoomOptions(
          rarr.map((r) => ({ value: r.id, label: r.name || r.code }))
        );
        const rmap = {};
        rarr.forEach((r) => {
          rmap[r.id] = r.name || r.code;
        });
        setRoomsMap(rmap);
      } catch {
        setRoomOptions([]);
      } finally {
        setIsLoadingRooms(false);
      }
    };
    loadDeps();
  }, [hotelId]);

  const fetchRates = async () => {
    if (!contractId) return;
    setLoading(true);
    setError("");
    try {
      const data = await listRates(contractId, {
        page,
        size,
        seasonId,
        roomTypeId: roomId,
        search: debouncedSearch || undefined,
      });
      const items = Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
        ? data
        : [];
      setRates(items);
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
      setRates([]);
      setError("Failed to load rates");
      toast.error("Failed to load rates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contractId) fetchRates();
  }, [contractId, seasonId, roomId, page, size, debouncedSearch]);

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
    const original = [...rates];
    setRates((prev) => prev.filter((r) => r.id !== id));
    try {
      const res = await deleteRate(id, true);
      if (!(res?.status === 200 || res?.status === 204)) throw new Error();
      Swal.fire("Deleted!", "Rate deleted.", "success");
      fetchRates();
    } catch {
      setRates(original);
      Swal.fire("Error", "Failed to delete rate", "error");
    }
  };

  return (
    <>
      <Header2
        title="Rates"
        linkText1="Rates List"
        linkText2="Add Rate"
        link2={Constants.URLConstants.HOTELSEXTRANETRATESADD}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="row">
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
            <label>
              Contract <span className="text-danger">*</span>
            </label>
            <MultiSelect
              isSearchable
              isMulti={false}
              isLoading={isLoadingContracts}
              options={contractOptions}
              placeholder="- Select Contract -"
              value={
                contractOptions.find((o) => o.value === contractId) || null
              }
              onChange={(opt) => {
                setContractId(opt ? opt.value : "");
                setPage(1);
              }}
              className="custom-select"
              noOptionsMessage={() =>
                isLoadingContracts ? "Loading..." : "Type to search"
              }
            />
          </div>
          <div className="form-group col-md-3 mb-3">
            <label>Season</label>
            <MultiSelect
              isSearchable
              isMulti={false}
              isLoading={isLoadingSeasons}
              options={seasonOptions}
              placeholder="- Select Season -"
              value={seasonOptions.find((o) => o.value === seasonId) || null}
              onChange={(opt) => {
                setSeasonId(opt ? opt.value : "");
                setPage(1);
              }}
              className="custom-select"
              noOptionsMessage={() =>
                isLoadingSeasons ? "Loading..." : "Type to search"
              }
            />
          </div>
          <div className="form-group col-md-3 mb-3">
            <label>Room</label>
            <MultiSelect
              isSearchable
              isMulti={false}
              isLoading={isLoadingRooms}
              options={roomOptions}
              placeholder="- Select Room -"
              value={roomOptions.find((o) => o.value === roomId) || null}
              onChange={(opt) => {
                setRoomId(opt ? opt.value : "");
                setPage(1);
              }}
              className="custom-select"
              noOptionsMessage={() =>
                isLoadingRooms ? "Loading..." : "Type to search"
              }
            />
          </div>
          <div className="form-group col-md-3 mb-3">
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Search by name, code, currency..."
              value={search}
              onChange={onSearchChange}
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
                    <th>Season</th>
                    <th>Room</th>
                    <th>Meal</th>
                    <th>Occ</th>
                    <th>Base</th>
                    <th>Currency</th>
                    <th>Child Policy</th>
                    <th>Extra Bed</th>
                    <th>Taxes</th>
                    <th>Inclusions</th>
                    <th>Segment</th>
                    <th>Nationalities</th>
                    <th>Rate Type</th>
                    <th>Contract</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading && rates.length > 0 ? (
                    rates.map((r) => (
                      <tr key={r.id || r.rateId || r._id || r.uuid}>
                        <td>{r.id || r.rateId || r._id || r.uuid}</td>
                        <td>
                          {(() => {
                            const sid = r.season_id || r.seasonId;
                            return sid ? seasonsMap[sid] || sid : "-";
                          })()}
                        </td>
                        <td>
                          {(() => {
                            const rid = r.room_type_id || r.roomTypeId;
                            return rid ? roomsMap[rid] || rid : "-";
                          })()}
                        </td>
                        <td>{r.meal_plan || r.mealPlan || "-"}</td>
                        <td>{r.occ_key || r.occKey || "-"}</td>
                        <td>{r.base_price ?? r.basePrice ?? "-"}</td>
                        <td>{r.currency}</td>
                        <td>
                          {r.child_policy || r.childPolicy
                            ? (() => {
                                const cp = r.child_policy || r.childPolicy;
                                return `free≤${
                                  cp.child_free_until ??
                                  cp.childFreeUntil ??
                                  "-"
                                } | pct ${
                                  cp.child_rate_pct ?? cp.childRatePct ?? "-"
                                }`;
                              })()
                            : "-"}
                        </td>
                        <td>
                          {r.extra_bed_price
                            ? typeof r.extra_bed_price === "object"
                              ? `A:${r.extra_bed_price.Adult || "-"}, C:${
                                  r.extra_bed_price.child || "-"
                                }`
                              : r.extra_bed_price
                            : r.extraBedPrice ?? "-"}
                        </td>
                        <td>
                          {(() => {
                            const tp = r.tax_policy || r.taxPolicy;
                            if (!tp) return "-";
                            const itemsTxt = Array.isArray(tp.items)
                              ? tp.items
                                  .map(
                                    (t) =>
                                      `${t.name}:${t.mode}${
                                        t.included ? "(inc)" : ""
                                      }@${t.value}`
                                  )
                                  .join("; ")
                              : "";
                            const city = tp.cityTax || tp.city_tax;
                            const cityTxt =
                              city && (city.mode || city.amount)
                                ? ` | City: ${city.mode}@${city.amount} ${
                                    city.currency || ""
                                  }${city.included ? " inc" : ""}`
                                : "";
                            const out = `${itemsTxt}${cityTxt}`.trim();
                            return out || "-";
                          })()}
                        </td>
                        <td>
                          {Array.isArray(r.inclusions)
                            ? r.inclusions.join(", ")
                            : "-"}
                        </td>
                        <td>{r.market_segment || r.marketSegment || "-"}</td>
                        <td>
                          {Array.isArray(
                            r.nationality_bands || r.nationalityBands
                          )
                            ? (r.nationality_bands || r.nationalityBands).join(
                                ", "
                              )
                            : "-"}
                        </td>
                        <td>{r.rate_type || r.rateType || "-"}</td>
                        <td>{contractsMap[r.contractId] || r.contractId}</td>
                        <td>
                          <div className="actionCont d-flex align-items-center">
                            <Link
                              to={`${Constants.URLConstants.HOTELSEXTRANETRATESVIEW}/${r.id}`}
                              className="input-group-addon addFirst mr-2"
                              title="View"
                            >
                              <i className="fa fa-eye" />
                            </Link>
                            <Link
                              to={`${Constants.URLConstants.HOTELSEXTRANETRATESEDIT}/${r.id}`}
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
                      <td colSpan={17} className="text-center">
                        {loading ? "Loading..." : "No rates found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {contractId && (
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
      <WizardGuideAssistant stepId="ratesList" />
    </>
  );
}
