import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getRate, updateRate } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelExtranetRateForm from "./HotelExtranetRateForm";

export default function HotelExtranetRateEdit({ setShowHeaderAndMenuBar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getRate(id);
        // getRate returns raw data (not wrapped) — handle both shapes defensively
        const data = (res && typeof res === 'object' && 'status' in res) ? (res.status === 200 ? res.data : null) : res;
        if (data && typeof data === 'object') {
          setRate(data);
        } else {
          toast.error((res && res.data && res.data.message) || "Failed to load rate");
        }
      } catch (e) {
        toast.error("Failed to load rate");
      }
      setLoading(false);
    };
    if (id) load();
  }, [id]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      const { contractId: _cid, id: _id, timestamps: _ts, ...body } = payload || {};
      try { console.log("RateEdit submit payload", body); } catch {}
      const res = await updateRate(id, body);
      try { console.log("RateEdit response", res); } catch {}
      if (res?.status === 200) {
        toast.success("Rate updated successfully");
        navigate(Constants.URLConstants.HOTELSEXTRANETRATESLIST);
      } else {
        const raw = res?.data?.message ?? res?.data?.error ?? res?.statusText;
        const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to update rate");
        toast.error(msg);
      }
    } catch (e) {
      try { console.error("RateEdit error", e); } catch {}
      const raw = e?.response?.data?.message ?? e?.response?.data?.error ?? e?.message;
      const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to update rate");
      toast.error(msg);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Header2 title="EDIT RATE" linkText1="Rates" linkText2="Edit Rate" link1={Constants.URLConstants.HOTELSEXTRANETRATESLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <HotelExtranetRateForm mode="edit" initialValue={rate} onSubmit={handleSubmit} submitting={submitting} />
        )}
      </div>
    </>
  );
}
