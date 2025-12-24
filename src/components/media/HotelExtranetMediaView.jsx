import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getMedia } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelExtranetMediaForm from "./HotelExtranetMediaForm";

export default function HotelExtranetMediaView({ setShowHeaderAndMenuBar }) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true); }, [setShowHeaderAndMenuBar]);
  
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getMedia(id);
        console.log("View page - API response:", res);
        const mediaData = res?.data || res;
        console.log("View page - Media data:", mediaData);
        if (mediaData && (mediaData.id || mediaData.url || mediaData.type)) {
          setData(mediaData);
        } else {
          toast.error("Invalid media data received");
        }
      } catch (e) {
        console.error("View page - Error loading media:", e);
        toast.error("Failed to load media: " + (e?.message || "Unknown error"));
      }
      setLoading(false);
    };
    if (id) load();
  }, [id]);

  return (
    <>
      <Header2 title="VIEW MEDIA ASSET" linkText1="Media" linkText2="View Media" link1={Constants.URLConstants.HOTELSEXTRANETMEDIALIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (<div>Loading...</div>) : (<HotelExtranetMediaForm mode="view" initialValue={data} />)}
      </div>
    </>
  );
}

