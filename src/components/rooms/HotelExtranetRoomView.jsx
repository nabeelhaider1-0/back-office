import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { getRoom } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelExtranetRoomForm from "./HotelExtranetRoomForm";

export default function HotelExtranetRoomView({ setShowHeaderAndMenuBar }) {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Header2 title="VIEW ROOM" linkText1="Rooms" linkText2="View Room" link1={Constants.URLConstants.HOTELSEXTRANETROOMSLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <HotelExtranetRoomForm mode="view" initialValue={room} />
        )}
      </div>
    </>
  );
}
