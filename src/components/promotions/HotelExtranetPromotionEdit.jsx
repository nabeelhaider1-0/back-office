import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getPromotion, updatePromotion } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelExtranetPromotionForm from "./HotelExtranetPromotionForm";

export default function HotelExtranetPromotionEdit({ setShowHeaderAndMenuBar }) {
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
        const res = await getPromotion(id);
        console.log("Edit page - API response:", res);
        // Handle both response formats: { data, status } or direct data
        const promotionData = res?.data || res;
        console.log("Edit page - Promotion data:", promotionData);
        if (promotionData && (promotionData.id || promotionData.contractId || promotionData.type)) {
          setData(promotionData);
        } else {
          toast.error("Invalid promotion data received");
        }
      } catch (e) {
        console.error("Edit page - Error loading promotion:", e);
        toast.error("Failed to load promotion: " + (e?.message || "Unknown error"));
      }
      setLoading(false);
    };
    if (id) load();
  }, [id]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      const res = await updatePromotion(id, payload);
      const ok = (res && typeof res === 'object' && 'status' in res) ? (res.status === 200) : (res?.success === true || res?.data?.success === true);
      if (ok) { toast.success("Promotion updated successfully"); navigate(Constants.URLConstants.HOTELSEXTRANETPROMOTIONSLIST); }
      else { const raw = res?.data?.message ?? res?.data?.error ?? res?.statusText ?? res?.message; const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to update promotion"); toast.error(msg); }
    } catch (e) { const raw = e?.response?.data?.message ?? e?.response?.data?.error ?? e?.message; const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to update promotion"); toast.error(msg); }
    setSubmitting(false);
  };

  return (
    <>
      <Header2 title="EDIT PROMOTION" linkText1="Promotions" linkText2="Edit Promotion" link1={Constants.URLConstants.HOTELSEXTRANETPROMOTIONSLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (<div>Loading...</div>) : (<HotelExtranetPromotionForm mode="edit" initialValue={data} onSubmit={handleSubmit} submitting={submitting} />)}
      </div>
    </>
  );
}


