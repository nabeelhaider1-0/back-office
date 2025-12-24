import React, { useEffect, useState } from "react";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import {
  listHotels,
  listContracts,
  listRooms,
  searchRestrictions,
  deleteRestriction,
  getContract,
  getRoom,
} from "../../Apis/hotelExtranetApi";
import Swal from "sweetalert2";
import Constants from "../../constants/routes";
import WizardGuideAssistant from "../hotelWizard/WizardGuideAssistant";

export default function HotelExtranetRestrictionsList({
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
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [restrictions, setRestrictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hotelMap, setHotelMap] = useState({});
  const [contractMap, setContractMap] = useState({});
  const [roomMap, setRoomMap] = useState({});

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
        const opts = arr.map((h) => ({
          value: h.id || h._id || h.hotelId,
          label: h.display_name || h.displayName || h.name,
        }));
        setHotelOptions(opts);
        setHotelMap(Object.fromEntries(opts.map((o) => [o.value, o.label])));
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
        const opts = carr.map((c) => ({
          value: c.id || c.contractId,
          label: c.name,
        }));
        setContractOptions(opts);
        setContractMap((prev) => ({
          ...prev,
          ...Object.fromEntries(opts.map((o) => [o.value, o.label])),
        }));
      } finally {
        setIsLoadingContracts(false);
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
        const opts = rarr.map((r) => ({
          value: r.id,
          label: r.name || r.code,
        }));
        setRoomOptions(opts);
        setRoomMap((prev) => ({
          ...prev,
          ...Object.fromEntries(opts.map((o) => [o.value, o.label])),
        }));
      } finally {
        setIsLoadingRooms(false);
      }
    };
    loadDeps();
  }, [hotelId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await searchRestrictions({
        hotelId,
        contractId,
        roomTypeId: roomId || undefined,
        from: from || undefined,
        to: to || undefined,
      });
      const ok = res?.status === 200;
      const items = ok
        ? Array.isArray(res?.data?.items)
          ? res.data.items
          : Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
          ? res.data
          : []
        : [];
      setRestrictions(items);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [hotelId, contractId, roomId, from, to]);

  // Enrich names for any IDs not in current option lists
  useEffect(() => {
    const fillNames = async () => {
      const toFetchContracts = [];
      const toFetchRooms = [];
      const nextContracts = { ...contractMap };
      const nextRooms = { ...roomMap };
      restrictions.forEach((r) => {
        const cid = r.contract_id || r.contractId;
        if (cid && !nextContracts[cid]) toFetchContracts.push(cid);
        const rid = r.room_type_id || r.roomTypeId;
        if (rid && !nextRooms[rid]) toFetchRooms.push(rid);
      });
      const uniq = (arr) => Array.from(new Set(arr));
      const contractPromises = uniq(toFetchContracts).map(async (cid) => {
        try {
          const res = await getContract(cid);
          const name = res?.data?.name || cid;
          nextContracts[cid] = name;
        } catch {}
      });
      const roomPromises = uniq(toFetchRooms).map(async (rid) => {
        try {
          const res = await getRoom(rid);
          const name = res?.data?.name || res?.data?.code || rid;
          nextRooms[rid] = name;
        } catch {}
      });
      if (contractPromises.length || roomPromises.length) {
        await Promise.all([...contractPromises, ...roomPromises]);
        setContractMap(nextContracts);
        setRoomMap(nextRooms);
      }
    };
    if (restrictions && restrictions.length) fillNames();
  }, [restrictions]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the restriction.",
      icon: "warning",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a",
    });
    if (!confirm.isConfirmed) return;
    const original = [...restrictions];
    setRestrictions((prev) => prev.filter((x) => x.id !== id));
    try {
      const res = await deleteRestriction(id, true);
      const ok =
        res && typeof res === "object" && "status" in res
          ? res.status === 200 || res.status === 204
          : res?.success === true || res?.data?.success === true;
      if (!ok) throw new Error();
      Swal.fire("Deleted!", "Restriction deleted.", "success");
    } catch (_) {
      setRestrictions(original);
      Swal.fire("Error", "Failed to delete restriction", "error");
    }
  };
  return (
    <>
      <Header2
        title="Restrictions"
        linkText1="Restrictions"
        linkText2="Add Restriction"
        link2={Constants.URLConstants.HOTELSEXTRANETRESTRICTIONSADD}
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
                    <th>Contract</th>
                    <th>Room</th>
                    <th>Level</th>
                    <th>Dates</th>
                    <th>Min/Max LOS</th>
                    <th>CTA</th>
                    <th>CTD</th>
                    <th>Stop Sell</th>
                    <th>Release</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {restrictions.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} className="text-center text-muted">
                        No restrictions found.
                      </td>
                    </tr>
                  )}
                  {restrictions.map((r) => (
                    <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>
                        {hotelMap[r.hotel_id || r.hotelId] ||
                          r.hotel_id ||
                          r.hotelId ||
                          "-"}
                      </td>
                      <td>
                        {contractMap[r.contract_id || r.contractId] ||
                          r.contract_id ||
                          r.contractId ||
                          "-"}
                      </td>
                      <td>
                        {roomMap[r.room_type_id || r.roomTypeId] ||
                          r.room_type_id ||
                          r.roomTypeId ||
                          "-"}
                      </td>
                      <td>{r.level}</td>
                      <td>
                        {r.start_date || r.startDate || "-"}
                        {" - "}
                        {r.end_date || r.endDate || "-"}
                      </td>
                      <td>
                        {r.min_los ?? r.minLos ?? "-"}/
                        {r.max_los ?? r.maxLos ?? "-"}
                      </td>
                      <td>
                        {r.cta === true ? "Yes" : r.cta === false ? "No" : "-"}
                      </td>
                      <td>
                        {r.ctd === true ? "Yes" : r.ctd === false ? "No" : "-"}
                      </td>
                      <td>
                        {(r.stop_sell ?? r.stopSell) === true
                          ? "Yes"
                          : (r.stop_sell ?? r.stopSell) === false
                          ? "No"
                          : "-"}
                      </td>
                      <td>{r.release_days ?? r.releaseDays ?? "-"}</td>
                      <td>
                        <div className="actionCont d-flex align-items-center">
                          <a
                            href={`${Constants.URLConstants.HOTELSEXTRANETRESTRICTIONSVIEW}/${r.id}`}
                            className="input-group-addon addFirst mr-2"
                            title="View"
                          >
                            <i className="fa fa-eye" />
                          </a>
                          <a
                            href={`${Constants.URLConstants.HOTELSEXTRANETRESTRICTIONSEDIT}/${r.id}`}
                            className="input-group-addon addFirst mr-2"
                            title="Edit"
                          >
                            <i className="fa fa-edit" />
                          </a>
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <WizardGuideAssistant stepId="restrictionsList" />
    </>
  );
}
