import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getBlackout } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelExtranetBlackoutForm from "./HotelExtranetBlackoutForm";

export default function HotelExtranetBlackoutView({ setShowHeaderAndMenuBar }) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
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
  return (
    <>
      <Header2 title="VIEW BLACKOUT" linkText1="Blackouts" linkText2="View Blackout" link1={Constants.URLConstants.HOTELSEXTRANETBLACKOUTSLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (<div>Loading...</div>) : (<HotelExtranetBlackoutForm mode="view" initialValue={data} />)}
      </div>
    </>
  );
}


