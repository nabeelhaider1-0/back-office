import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getPromotion } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelExtranetPromotionForm from "./HotelExtranetPromotionForm";

export default function HotelExtranetPromotionView({ setShowHeaderAndMenuBar }) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true); }, [setShowHeaderAndMenuBar]);
  
  useEffect(() => {
    const load = async () => {
      if (!id) {
        setError("No promotion ID provided");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await getPromotion(id);
        console.log("View page - API response:", res);
        // Handle both response formats: { data, status } or direct data
        const promotionData = res?.data || res;
        console.log("View page - Promotion data:", promotionData);
        if (promotionData && (promotionData.id || promotionData.contractId || promotionData.type)) {
          setData(promotionData);
        } else {
          setError("Invalid promotion data received");
          toast.error("Invalid promotion data received");
        }
      } catch (e) {
        console.error("View page - Error loading promotion:", e);
        const errorMsg = e?.response?.data?.message || e?.response?.data?.error || e?.message || "Unknown error";
        setError(errorMsg);
        toast.error("Failed to load promotion: " + errorMsg);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  return (
    <>
      <Header2 title="VIEW PROMOTION" linkText1="Promotions" linkText2="View Promotion" link1={Constants.URLConstants.HOTELSEXTRANETPROMOTIONSLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (
          <div className="text-center p-4">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-2">Loading promotion...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger">
            <h5>Error Loading Promotion</h5>
            <p>{error}</p>
            <a href={Constants.URLConstants.HOTELSEXTRANETPROMOTIONSLIST} className="btn btn-sm btn-primary">Back to Promotions</a>
          </div>
        ) : data ? (
          <React.Suspense fallback={<div>Loading form...</div>}>
            <HotelExtranetPromotionForm mode="view" initialValue={data} />
          </React.Suspense>
        ) : (
          <div className="alert alert-warning">
            <h5>No Promotion Data</h5>
            <p>Unable to load promotion data. Please try again.</p>
            <a href={Constants.URLConstants.HOTELSEXTRANETPROMOTIONSLIST} className="btn btn-sm btn-primary">Back to Promotions</a>
          </div>
        )}
      </div>
    </>
  );
}


