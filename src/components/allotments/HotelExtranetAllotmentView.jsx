import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getAllotment } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelExtranetAllotmentForm from "./HotelExtranetAllotmentForm";

export default function HotelExtranetAllotmentView({ setShowHeaderAndMenuBar }) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Header2 title="VIEW ALLOTMENT" linkText1="Allotments" linkText2="View Allotment" link1={Constants.URLConstants.HOTELSEXTRANETALLOTMENTSLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (<div>Loading...</div>) : (<HotelExtranetAllotmentForm mode="view" initialValue={data} />)}
      </div>
    </>
  );
}


