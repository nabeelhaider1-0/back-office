import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import Swal from "sweetalert2";
import {
  listHotels,
  listContracts,
  listRooms,
  listSeasons,
  listAllotmentsByHotel,
  deleteAllotment,
} from "../../Apis/hotelExtranetApi";
import Constants from "../../constants/routes";
import WizardGuideAssistant from "../hotelWizard/WizardGuideAssistant";

export default function HotelExtranetAllotmentsList({
  setShowHeaderAndMenuBar,
}) {
  const [hotelId, setHotelId] = useState("");
  const [hotelOptions, setHotelOptions] = useState([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const [contractId, setContractId] = useState("");
  const [contractOptions, setContractOptions] = useState([]);
  const [isLoadingContracts, setIsLoadingContracts] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [roomOptions, setRoomOptions] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [seasonOptions, setSeasonOptions] = useState([]);
  const [isLoadingSeasons, setIsLoadingSeasons] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

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
      } finally {
        setIsLoadingHotels(false);
      }
    }
    fetchHotels();
  }, []);

  useEffect(() => {
    const loadDeps = async () => {
      setContractId("");
      setRoomId("");
      setContractOptions([]);
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
      } finally {
        setIsLoadingRooms(false);
      }
    };
    loadDeps();
  }, [hotelId]);

  const fetchData = async () => {
    if (!hotelId) return;
    setLoading(true);
    try {
      const res = await listAllotmentsByHotel(hotelId, {
        from,
        to,
        roomTypeId: roomId || undefined,
      });
      const ok = res?.status === 200;
      const data = ok
        ? Array.isArray(res?.data?.items)
          ? res.data.items
          : Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
          ? res.data
          : []
        : [];
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [hotelId, roomId, from, to]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the allotment.",
      icon: "warning",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a",
    });
    if (!confirm.isConfirmed) return;
    const original = [...items];
    setItems((prev) => prev.filter((x) => x.id !== id));
    try {
      const res = await deleteAllotment(id, true);
      const ok =
        res && typeof res === "object" && "status" in res
          ? res.status === 200 || res.status === 204
          : res?.success === true || res?.data?.success === true;
      if (!ok) throw new Error();
      Swal.fire("Deleted!", "Allotment deleted.", "success");
    } catch (_) {
      setItems(original);
      Swal.fire("Error", "Failed to delete allotment", "error");
    }
  };

  return (
    <>
      <Header2
        title="Allotments"
        linkText1="Allotments"
        linkText2="Add Allotments"
        link2={Constants.URLConstants?.HOTELSEXTRANETALLOTMENTSADD || "#"}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="row g-3">
          <div className="form-group col-md-3">
            <label>
              Hotel <span className="text-danger">*</span>
            </label>
            <MultiSelect
              isSearchable
              isMulti={false}
              isLoading={isLoadingHotels}
              options={hotelOptions}
              placeholder="- Select Hotel -"
              className="custom-select"
              value={hotelOptions.find((o) => o.value === hotelId) || null}
              onChange={(opt) => setHotelId(opt ? opt.value : "")}
              noOptionsMessage={() =>
                isLoadingHotels ? "Loading..." : "Type to search"
              }
            />
          </div>
          <div className="form-group col-md-3">
            <label>Contract</label>
            <MultiSelect
              isSearchable
              isMulti={false}
              isLoading={isLoadingContracts}
              options={contractOptions}
              placeholder="- Select Contract -"
              className="custom-select"
              value={
                contractOptions.find((o) => o.value === contractId) || null
              }
              onChange={(opt) => setContractId(opt ? opt.value : "")}
              noOptionsMessage={() =>
                isLoadingContracts ? "Loading..." : "Type to search"
              }
            />
          </div>
          <div className="form-group col-md-3">
            <label>Room</label>
            <MultiSelect
              isSearchable
              isMulti={false}
              isLoading={isLoadingRooms}
              options={roomOptions}
              placeholder="- Select Room -"
              className="custom-select"
              value={roomOptions.find((o) => o.value === roomId) || null}
              onChange={(opt) => setRoomId(opt ? opt.value : "")}
              noOptionsMessage={() =>
                isLoadingRooms ? "Loading..." : "Type to search"
              }
            />
          </div>
          <div className="form-group col-md-1">
            <label>From</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="form-group col-md-1">
            <label>To</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={to}
              onChange={(e) => setTo(e.target.value)}
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
                    <th>Hotel</th>
                    <th>Date Range</th>
                    <th>Room</th>
                    <th>Season</th>
                    <th>Contract</th>
                    <th>Qty</th>
                    <th>Source</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading && items.length > 0 ? (
                    items.map((a) => (
                      <tr key={a.id || a._id}>
                        <td>{a.id || a._id}</td>
                        <td>
                          {(() => {
                            const o = hotelOptions.find(
                              (h) => h.value === (a.hotel_id || a.hotelId)
                            );
                            return o ? o.label : a.hotel_id || a.hotelId || "-";
                          })()}
                        </td>
                        <td>
                          {(() => {
                            const start =
                              a.start_date ||
                              a.startDate ||
                              a.date ||
                              a.day ||
                              a.for_date ||
                              "";
                            const end =
                              a.end_date ||
                              a.endDate ||
                              a.date ||
                              a.day ||
                              a.for_date ||
                              "";
                            if (!start && !end) return "-";
                            if (!end || start === end) return start || end;
                            return `${start} – ${end}`;
                          })()}
                        </td>
                        <td>
                          {(() => {
                            const o = roomOptions.find(
                              (r) =>
                                r.value === (a.room_type_id || a.roomTypeId)
                            );
                            return o
                              ? o.label
                              : a.room_type_id || a.roomTypeId || "-";
                          })()}
                        </td>
                        <td>
                          {(() => {
                            const o = seasonOptions.find(
                              (s) => s.value === (a.season_id || a.seasonId)
                            );
                            return o
                              ? o.label
                              : a.season_id || a.seasonId || "-";
                          })()}
                        </td>
                        <td>
                          {(() => {
                            const o = contractOptions.find(
                              (c) => c.value === (a.contract_id || a.contractId)
                            );
                            return o
                              ? o.label
                              : a.contract_id || a.contractId || "-";
                          })()}
                        </td>
                        <td>{a.qty}</td>
                        <td>{a.source || "-"}</td>
                        <td>
                          <div className="actionCont d-flex align-items-center">
                            <Link
                              to={`${Constants.URLConstants.HOTELSEXTRANETALLOTMENTSVIEW}/${a.id}`}
                              className="input-group-addon addFirst mr-2"
                              title="View"
                            >
                              <i className="fa fa-eye" />
                            </Link>
                            <Link
                              to={`${Constants.URLConstants.HOTELSEXTRANETALLOTMENTSEDIT}/${a.id}`}
                              className="input-group-addon addFirst mr-2"
                              title="Edit"
                            >
                              <i className="fa fa-edit" />
                            </Link>
                            <div
                              className="input-group-addon addFirst mr-2"
                              onClick={() => handleDelete(a.id)}
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
                      <td colSpan={9} className="text-center">
                        {loading ? "Loading..." : "No allotments found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <WizardGuideAssistant stepId="allotmentsList" />
    </>
  );
}
