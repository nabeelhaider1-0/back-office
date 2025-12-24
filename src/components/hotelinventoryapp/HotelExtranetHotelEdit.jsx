import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getHotel, updateHotel } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelExtranetHotelForm from "./HotelExtranetHotelForm";
import WizardGuideAssistant from "../hotelWizard/WizardGuideAssistant";

function normalizeHotel(api) {
  if (!api) return null;
  const display_name = api.display_name || api.displayName || api.name || "";
  const hotel_code = api.hotel_code || api.code || "";
  const legal_name = api.legal_name || api.legalName || "";
  const brand = api.brand || "";
  const chain = api.chain ?? null;
  const star_rating = api.star_rating ?? api.starRating ?? 0;
  const email = api.email || "";
  const phone = api.phone || "";
  const timezone = api.timezone || "";
  const addressLine = typeof api.address === "string" ? api.address : (api.address?.line1 || "");
  const city = api.city || api.address?.city || "";
  const country = api.country || api.address?.country || "";
  const geo = api.geo || { lat: "", lng: "" };
  const contacts = Array.isArray(api.contacts) ? api.contacts : [{ type: "sales", email: "", phone: "" }];
  const amenities = Array.isArray(api.amenities) ? api.amenities : [];
  const facilities = Array.isArray(api.facilities) ? api.facilities : [];
  const languages = Array.isArray(api.languages) ? api.languages : [];
  const status = api.status || "draft";
  const policies = api.policies || { checkin: api.checkin || "", checkout: api.checkout || "" };
  const images = Array.isArray(api.images) ? api.images : [];
  return {
    hotel_code,
    display_name,
    legal_name,
    brand,
    chain,
    star_rating,
    address: { line1: addressLine, city, country },
    geo: { lat: geo?.lat ?? "", lng: geo?.lng ?? "" },
    timezone,
    contacts,
    email,
    phone,
    amenities,
    facilities,
    policies,
    images,
    status,
    languages,
  };
}

export default function HotelExtranetHotelEdit({ setShowHeaderAndMenuBar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [etag, setEtag] = useState(null);

  useEffect(() => {
    setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getHotel(id);
        if (res?.status === 200) {
          setHotel(normalizeHotel(res.data));
          setEtag(res?.etag || null);
        } else {
          toast.error(res?.data?.message || "Failed to load hotel");
        }
      } catch (e) {
        toast.error("Failed to load hotel");
      }
      setLoading(false);
    };
    if (id) load();
  }, [id]);

  const onSubmit = async (payload) => {
    setSubmitting(true);
    try {
      const res = await updateHotel(id, payload, etag);
      if (res?.status === 200) {
        toast.success("Hotel updated successfully");
        navigate(Constants.URLConstants.HOTELSEXTRANETLIST);
      } else {
        toast.error(res?.data?.message || "Failed to update hotel");
      }
    } catch (_) {
      toast.error("Failed to update hotel");
    }
    setSubmitting(false);
  };

  return (
    <>
      <Header2
        title="EDIT HOTEL"
        linkText1="Hotels"
        linkText2="Edit Hotel"
        link1={Constants.URLConstants.HOTELSEXTRANETLIST}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <HotelExtranetHotelForm mode="edit" initialValue={hotel} onSubmit={onSubmit} submitting={submitting} />
        )}
      </div>
      <WizardGuideAssistant stepId="hotelEdit" />
    </>
  );
}


