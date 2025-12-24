import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getRate } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelExtranetRateForm from "./HotelExtranetRateForm";

export default function HotelExtranetRateView({ setShowHeaderAndMenuBar }) {
  const { id } = useParams();
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Header2 title="VIEW RATE" linkText1="Rates" linkText2="View Rate" link1={Constants.URLConstants.HOTELSEXTRANETRATESLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <HotelExtranetRateForm mode="view" initialValue={rate} />
        )}
      </div>
    </>
  );
}
