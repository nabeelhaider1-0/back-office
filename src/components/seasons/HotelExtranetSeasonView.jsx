import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getSeason } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelExtranetSeasonForm from "./HotelExtranetSeasonForm";

export default function HotelExtranetSeasonView({ setShowHeaderAndMenuBar }) {
  const { id } = useParams();
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Header2 title="VIEW SEASON" linkText1="Seasons" linkText2="View Season" link1={Constants.URLConstants.HOTELSEXTRANETSEASONSLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <HotelExtranetSeasonForm mode="view" initialValue={season} />
        )}
      </div>
    </>
  );
}
