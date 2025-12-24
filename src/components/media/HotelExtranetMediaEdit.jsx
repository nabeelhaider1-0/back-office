import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getMedia, updateMedia } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelExtranetMediaForm from "./HotelExtranetMediaForm";

export default function HotelExtranetMediaEdit({ setShowHeaderAndMenuBar }) {
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
        const res = await getMedia(id);
        console.log("Edit page - API response:", res);
        const mediaData = res?.data || res;
        console.log("Edit page - Media data:", mediaData);
        if (mediaData && (mediaData.id || mediaData.url || mediaData.type)) {
          setData(mediaData);
        } else {
          toast.error("Invalid media data received");
        }
      } catch (e) {
        console.error("Edit page - Error loading media:", e);
        toast.error("Failed to load media: " + (e?.message || "Unknown error"));
      }
      setLoading(false);
    };
    if (id) load();
  }, [id]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      const res = await updateMedia(id, payload);
      const ok = (res && typeof res === 'object' && 'status' in res) ? (res.status === 200) : (res?.success === true || res?.data?.success === true);
      if (ok) { toast.success("Media asset updated successfully"); navigate(Constants.URLConstants.HOTELSEXTRANETMEDIALIST); }
      else { const raw = res?.data?.message ?? res?.data?.error ?? res?.statusText ?? res?.message; const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to update media asset"); toast.error(msg); }
    } catch (e) { const raw = e?.response?.data?.message ?? e?.response?.data?.error ?? e?.message; const msg = Array.isArray(raw) ? raw.join(", ") : (raw || "Failed to update media asset"); toast.error(msg); }
    setSubmitting(false);
  };

  return (
    <>
      <Header2 title="EDIT MEDIA ASSET" linkText1="Media" linkText2="Edit Media" link1={Constants.URLConstants.HOTELSEXTRANETMEDIALIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (<div>Loading...</div>) : (<HotelExtranetMediaForm mode="edit" initialValue={data} onSubmit={handleSubmit} submitting={submitting} />)}
      </div>
    </>
  );
}

