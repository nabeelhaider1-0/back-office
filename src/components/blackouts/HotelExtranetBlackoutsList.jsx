import React, { useEffect, useState } from "react";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import {
  listHotels,
  searchBlackouts,
  deleteBlackout,
} from "../../Apis/hotelExtranetApi";
import Swal from "sweetalert2";
import Constants from "../../constants/routes";
import WizardGuideAssistant from "../hotelWizard/WizardGuideAssistant";

export default function HotelExtranetBlackoutsList({
  setShowHeaderAndMenuBar,
}) {
  const [hotelId, setHotelId] = useState("");
  const [hotelOptions, setHotelOptions] = useState([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const [activeOn, setActiveOn] = useState("");
  const [blackouts, setBlackouts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await searchBlackouts({
        hotelId: hotelId || undefined,
        activeOn: activeOn || undefined,
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
      setBlackouts(items);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [hotelId, activeOn]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the blackout.",
      icon: "warning",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a",
    });
    if (!confirm.isConfirmed) return;
    const original = [...blackouts];
    setBlackouts((prev) => prev.filter((x) => x.id !== id));
    try {
      const res = await deleteBlackout(id, true);
      const ok =
        res && typeof res === "object" && "status" in res
          ? res.status === 200 || res.status === 204
          : res?.success === true || res?.data?.success === true;
      if (!ok) throw new Error();
      Swal.fire("Deleted!", "Blackout deleted.", "success");
    } catch (_) {
      setBlackouts(original);
      Swal.fire("Error", "Failed to delete blackout", "error");
    }
  };
  return (
    <>
      <Header2
        title="Blackouts"
        linkText1="Blackouts"
        linkText2="Add Blackout"
        link2={Constants.URLConstants.HOTELSEXTRANETBLACKOUTSADD}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="row g-3">
          <div className="form-group col-md-3">
            <label>Hotel</label>
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
          <div className="form-group col-md-2">
            <label>Active On</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={activeOn}
              onChange={(e) => setActiveOn(e.target.value)}
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
                    <th>Start</th>
                    <th>End</th>
                    <th>Reason</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {blackouts.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} className="text-center text-muted">
                        No blackouts found.
                      </td>
                    </tr>
                  )}
                  {blackouts.map((b) => (
                    <tr key={b.id}>
                      <td>{b.id}</td>
                      <td>
                        {hotelOptions.find(
                          (h) => h.value === (b.hotel_id || b.hotelId)
                        )?.label ||
                          b.hotel_id ||
                          b.hotelId ||
                          "-"}
                      </td>
                      <td>{b.start_date || b.startDate}</td>
                      <td>{b.end_date || b.endDate}</td>
                      <td>{b.reason || "-"}</td>
                      <td>
                        <a
                          href={`${Constants.URLConstants.HOTELSEXTRANETBLACKOUTSVIEW}/${b.id}`}
                          className="input-group-addon addFirst mr-2"
                          title="View"
                        >
                          <i className="fa fa-eye" />
                        </a>
                        <a
                          href={`${Constants.URLConstants.HOTELSEXTRANETBLACKOUTSEDIT}/${b.id}`}
                          className="input-group-addon addFirst mr-2"
                          title="Edit"
                        >
                          <i className="fa fa-edit" />
                        </a>
                        <span
                          className="input-group-addon addFirst mr-2"
                          style={{ cursor: "pointer" }}
                          title="Delete"
                          onClick={() => handleDelete(b.id)}
                        >
                          <i className="fa fa-trash" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <WizardGuideAssistant stepId="blackoutsList" />
    </>
  );
}
