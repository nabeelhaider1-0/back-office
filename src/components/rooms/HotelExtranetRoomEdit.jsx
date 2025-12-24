import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getRoom, updateRoom } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelExtranetRoomForm from "./HotelExtranetRoomForm";

export default function HotelExtranetRoomEdit({ setShowHeaderAndMenuBar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);

  const normalizeRoom = (api) => ({
    id: api.id,
    hotelId: api.hotelId,
    code: api.code,
    name: api.name,
    max_adults: api.maxAdults,
    max_children: api.maxChildren,
    area_sqm: api.areaSqm,
    bedding: api.bedding,
    amenities: api.amenities,
    images: api.images,
    occupancy: api.occupancy,
    // add further mapping if form expects more fields
    status: api.status || 'active',
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getRoom(id);
        if (res?.status === 200) {
          setRoom(normalizeRoom(res.data));
        } else {
          toast.error(res?.data?.message || "Failed to load room");
        }
      } catch (e) {
        toast.error("Failed to load room");
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      const sanitizedPayload = {
        code: payload.code,
        name: payload.name,
        max_adults: Number.isFinite(Number(payload.max_adults)) ? Number(payload.max_adults) : 0,
        max_children: Number.isFinite(Number(payload.max_children)) ? Number(payload.max_children) : 0,
        amenities: Array.isArray(payload.amenities) ? payload.amenities : [],
        area_sqm: (() => {
          const n = parseInt(payload.area_sqm, 10);
          return Number.isFinite(n) && n >= 0 ? n : 0;
        })(),
        // hotelId and status should NOT be sent on update as per API validation
        occupancy: payload.occupancy && typeof payload.occupancy === "object" ? {
          adults: Number.isFinite(Number(payload.occupancy.adults)) ? Number(payload.occupancy.adults) : 0,
          children: Number.isFinite(Number(payload.occupancy.children)) ? Number(payload.occupancy.children) : 0,
          max_guest: Number.isFinite(Number(payload.occupancy.max_guest)) ? Number(payload.occupancy.max_guest) : 0,
        } : undefined,
        bedding: Array.isArray(payload.bedding) ? payload.bedding : undefined,
        images: Array.isArray(payload.images) ? payload.images.map((img) => ({
          url: img?.url || "",
          label: img?.label || "",
        })) : undefined,
      };
      const res = await updateRoom(id, sanitizedPayload);
      if (res?.status === 200) {
        toast.success("Room updated successfully");
        navigate(Constants.URLConstants.HOTELSEXTRANETROOMSLIST);
      } else {
        const msg = Array.isArray(res?.data?.message) ? res.data.message.join("\n") : (res?.data?.message || "Failed to update room");
        toast.error(msg);
      }
    } catch (e) {
      const msg = Array.isArray(e?.response?.data?.message) ? e.response.data.message.join("\n") : (e?.response?.data?.message || "Failed to update room");
      toast.error(msg);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Header2 title="EDIT ROOM" linkText1="Rooms" linkText2="Edit Room" link1={Constants.URLConstants.HOTELSEXTRANETROOMSLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <HotelExtranetRoomForm mode="edit" initialValue={room} onSubmit={handleSubmit} submitting={submitting} />
        )}
      </div>
    </>
  );
}
