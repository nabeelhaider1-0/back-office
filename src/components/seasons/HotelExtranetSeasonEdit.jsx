import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getSeason, updateSeason } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelExtranetSeasonForm from "./HotelExtranetSeasonForm";

export default function HotelExtranetSeasonEdit({ setShowHeaderAndMenuBar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getSeason(id);
        if (res?.status === 200) {
          const api = res.data || {};
          const normalized = {
            ...api,
            start_date: api.start_date || api.startDate || "",
            end_date: api.end_date || api.endDate || "",
          };
          setSeason(normalized);
        } else {
          toast.error(res?.data?.message || "Failed to load season");
        }
      } catch (e) {
        toast.error("Failed to load season");
      }
      setLoading(false);
    };
    if (id) load();
  }, [id]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { hotelId: _hid, id: _id, timestamps: _ts, start_date, end_date, startDate, endDate, ...rest } = formData || {};
      const apiPayload = {
        ...rest,
        start_date: start_date || startDate || "",
        end_date: end_date || endDate || "",
      };
      const res = await updateSeason(id, apiPayload);
      if (res?.status === 200) {
        toast.success("Season updated successfully");
        navigate(Constants.URLConstants.HOTELSEXTRANETSEASONSLIST);
      } else {
        const raw = res?.data?.message ?? res?.data?.error ?? res?.statusText;
        const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to update season");
        toast.error(msg);
      }
    } catch (e) {
      const raw = e?.response?.data?.message ?? e?.response?.data?.error ?? e?.message;
      const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to update season");
      toast.error(msg);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Header2 title="EDIT SEASON" linkText1="Seasons" linkText2="Edit Season" link1={Constants.URLConstants.HOTELSEXTRANETSEASONSLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <HotelExtranetSeasonForm mode="edit" initialValue={season} onSubmit={handleSubmit} submitting={submitting} />
        )}
      </div>
    </>
  );
}
