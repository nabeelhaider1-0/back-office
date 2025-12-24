import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getRestriction } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelExtranetRestrictionForm from "./HotelExtranetRestrictionForm";

export default function HotelExtranetRestrictionView({ setShowHeaderAndMenuBar }) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true); }, [setShowHeaderAndMenuBar]);
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try { const res = await getRestriction(id); setData(res?.data || res); }
      catch (_) { toast.error("Failed to load restriction"); }
      setLoading(false);
    };
    if (id) load();
  }, [id]);
  return (
    <>
      <Header2 title="VIEW RESTRICTION" linkText1="Restrictions" linkText2="View Restriction" link1={Constants.URLConstants.HOTELSEXTRANETRESTRICTIONSLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (<div>Loading...</div>) : (<HotelExtranetRestrictionForm mode="view" initialValue={data} />)}
      </div>
    </>
  );
}


