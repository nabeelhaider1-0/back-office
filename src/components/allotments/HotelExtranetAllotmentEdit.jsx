import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getAllotment, updateAllotment } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelExtranetAllotmentForm from "./HotelExtranetAllotmentForm";

export default function HotelExtranetAllotmentEdit({ setShowHeaderAndMenuBar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true); }, [setShowHeaderAndMenuBar]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getAllotment(id);
        setData(res?.data || res);
      } catch (_) { toast.error("Failed to load allotment"); }
      setLoading(false);
    };
    if (id) load();
  }, [id]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      const res = await updateAllotment(id, payload);
      const ok = (res && typeof res === 'object' && 'status' in res)
        ? (res.status === 200)
        : (res?.success === true || res?.data?.success === true);
      if (ok) {
        toast.success("Allotment updated successfully");
        navigate(Constants.URLConstants.HOTELSEXTRANETALLOTMENTSLIST);
      } else {
        const raw = res?.data?.message ?? res?.data?.error ?? res?.statusText ?? res?.message;
        const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to update allotment");
        toast.error(msg);
      }
    } catch (e) {
      const raw = e?.response?.data?.message ?? e?.response?.data?.error ?? e?.message;
      const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to update allotment");
      toast.error(msg);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Header2 title="EDIT ALLOTMENT" linkText1="Allotments" linkText2="Edit Allotment" link1={Constants.URLConstants.HOTELSEXTRANETALLOTMENTSLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (<div>Loading...</div>) : (<HotelExtranetAllotmentForm mode="edit" initialValue={data} onSubmit={handleSubmit} submitting={submitting} />)}
      </div>
    </>
  );
}


