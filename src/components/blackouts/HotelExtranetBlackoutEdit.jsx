import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getBlackout, updateBlackout } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelExtranetBlackoutForm from "./HotelExtranetBlackoutForm";

export default function HotelExtranetBlackoutEdit({ setShowHeaderAndMenuBar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true); }, [setShowHeaderAndMenuBar]);
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try { const res = await getBlackout(id); setData(res?.data || res); }
      catch (_) { toast.error("Failed to load blackout"); }
      setLoading(false);
    };
    if (id) load();
  }, [id]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      const res = await updateBlackout(id, payload);
      const ok = (res && typeof res === 'object' && 'status' in res) ? (res.status === 200) : (res?.success === true || res?.data?.success === true);
      if (ok) { toast.success("Blackout updated successfully"); navigate(Constants.URLConstants.HOTELSEXTRANETBLACKOUTSLIST); }
      else { const raw = res?.data?.message ?? res?.data?.error ?? res?.statusText ?? res?.message; const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to update blackout"); toast.error(msg); }
    } catch (e) { const raw = e?.response?.data?.message ?? e?.response?.data?.error ?? e?.message; const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to update blackout"); toast.error(msg); }
    setSubmitting(false);
  };

  return (
    <>
      <Header2 title="EDIT BLACKOUT" linkText1="Blackouts" linkText2="Edit Blackout" link1={Constants.URLConstants.HOTELSEXTRANETBLACKOUTSLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (<div>Loading...</div>) : (<HotelExtranetBlackoutForm mode="edit" initialValue={data} onSubmit={handleSubmit} submitting={submitting} />)}
      </div>
    </>
  );
}


