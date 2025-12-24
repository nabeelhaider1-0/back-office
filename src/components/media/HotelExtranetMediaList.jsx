import React, { useEffect, useState } from "react";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import {
  listHotels,
  listMedia,
  deleteMedia,
  getHotel,
} from "../../Apis/hotelExtranetApi";
import Constants from "../../constants/routes";
import Swal from "sweetalert2";
import WizardGuideAssistant from "../hotelWizard/WizardGuideAssistant";

export default function HotelExtranetMediaList({ setShowHeaderAndMenuBar }) {
  const [hotelId, setHotelId] = useState("");
  const [hotelOptions, setHotelOptions] = useState([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hotelNames, setHotelNames] = useState({});

  useEffect(() => {
    setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);

  useEffect(() => {
    async function fetchHotels() {
      setIsLoadingHotels(true);
      try {
        const resp = await listHotels({ page: 1, size: 100 });
        const arr = Array.isArray(resp?.items)
          ? resp.items
          : Array.isArray(resp?.data)
          ? resp.data
          : Array.isArray(resp)
          ? resp
          : [];
        setHotelOptions(
          arr.map((h) => ({
            value: h.id || h._id || h.hotelId,
            label: h.display_name || h.displayName || h.name,
          }))
        );
      } finally {
        setIsLoadingHotels(false);
      }
    }
    fetchHotels();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await listMedia({
        hotelId: hotelId || undefined,
        type: type || undefined,
        category: category || undefined,
        q: search || undefined,
      });
      const ok = res?.status === 200;
      const items = ok
        ? Array.isArray(res?.data?.items)
          ? res.data.items
          : Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
          ? res.data
          : []
        : [];
      setMedia(items);

      // Fetch hotel names for display
      const hotelIds = new Set();
      items.forEach((m) => {
        if (m.hotelId) hotelIds.add(m.hotelId);
        if (m.hotel_id) hotelIds.add(m.hotel_id);
      });

      const hotelPromises = Array.from(hotelIds).map(async (id) => {
        if (hotelNames[id]) return;
        try {
          const res = await getHotel(id);
          const hotel = res?.data || res;
          if (hotel) {
            setHotelNames((prev) => ({
              ...prev,
              [id]: hotel.display_name || hotel.displayName || hotel.name || id,
            }));
          }
        } catch (_) {
          setHotelNames((prev) => ({ ...prev, [id]: id }));
        }
      });

      await Promise.all(hotelPromises);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [hotelId, type, category, search]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the media asset.",
      icon: "warning",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a",
    });
    if (!confirm.isConfirmed) return;
    const original = [...media];
    setMedia((prev) => prev.filter((x) => x.id !== id));
    try {
      const res = await deleteMedia(id, true);
      const ok =
        res && typeof res === "object" && "status" in res
          ? res.status === 200 || res.status === 204
          : res?.success === true || res?.data?.success === true;
      if (!ok) throw new Error();
      Swal.fire("Deleted!", "Media asset deleted.", "success");
    } catch (_) {
      setMedia(original);
      Swal.fire("Error", "Failed to delete media asset", "error");
    }
  };

  return (
    <>
      <Header2
        title="Media Assets"
        linkText1="Media"
        linkText2="Add Media"
        link2={Constants.URLConstants.HOTELSEXTRANETMEDIAADD}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div className="row g-3">
          <div className="form-group col-md-3">
            <label>Hotel</label>
            <MultiSelect
              isSearchable
              isMulti={false}
              isLoading={isLoadingHotels}
              options={hotelOptions}
              placeholder="- Select Hotel -"
              className="custom-select"
              value={hotelOptions.find((o) => o.value === hotelId) || null}
              onChange={(opt) => setHotelId(opt ? opt.value : "")}
              noOptionsMessage={() =>
                isLoadingHotels ? "Loading..." : "Type to search"
              }
            />
          </div>
          <div className="form-group col-md-2">
            <label>Type</label>
            <select
              className="form-control form-control-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="document">Document</option>
              <option value="360_view">360 View</option>
              <option value="virtual_tour">Virtual Tour</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label>Category</label>
            <select
              className="form-control form-control-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Exterior">Exterior</option>
              <option value="Lobby">Lobby</option>
              <option value="Room">Room</option>
              <option value="Bathroom">Bathroom</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Pool">Pool</option>
              <option value="Spa">Spa</option>
              <option value="Gym">Gym</option>
              <option value="Meeting Room">Meeting Room</option>
              <option value="Amenity">Amenity</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group col-md-3">
            <label>Search</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search URL, alt, caption..."
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table table-bordered ">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Hotel</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>URL</th>
                    <th>Alt</th>
                    <th>Caption</th>
                    <th>Sort Order</th>
                    <th>License</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {media.length === 0 && !loading && (
                    <tr>
                      <td colSpan={10} className="text-center text-muted">
                        No media assets found.
                      </td>
                    </tr>
                  )}
                  {loading && (
                    <tr>
                      <td colSpan={10} className="text-center text-muted">
                        Loading...
                      </td>
                    </tr>
                  )}
                  {media.map((m) => {
                    const hId = m.hotelId || m.hotel_id;
                    const hotelName = hId
                      ? hotelNames[hId] ||
                        hotelOptions.find((h) => h.value === hId)?.label ||
                        hId
                      : "-";
                    return (
                      <tr key={m.id}>
                        <td>{m.id}</td>
                        <td>{hotelName}</td>
                        <td>{m.type || "-"}</td>
                        <td>{m.category || "-"}</td>
                        <td>
                          <a
                            href={m.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary"
                          >
                            {m.url?.substring(0, 30)}...
                          </a>
                        </td>
                        <td>{m.alt || "-"}</td>
                        <td>{m.caption || "-"}</td>
                        <td>{m.sort_order || m.sortOrder || "-"}</td>
                        <td>{m.license || "-"}</td>
                        <td>
                          <a
                            href={`${Constants.URLConstants.HOTELSEXTRANETMEDIAVIEW}/${m.id}`}
                            className="input-group-addon addFirst mr-2"
                            title="View"
                          >
                            <i className="fa fa-eye" />
                          </a>
                          <a
                            href={`${Constants.URLConstants.HOTELSEXTRANETMEDIAEDIT}/${m.id}`}
                            className="input-group-addon addFirst mr-2"
                            title="Edit"
                          >
                            <i className="fa fa-edit" />
                          </a>
                          <span
                            className="input-group-addon addFirst mr-2"
                            style={{ cursor: "pointer" }}
                            title="Delete"
                            onClick={() => handleDelete(m.id)}
                          >
                            <i className="fa fa-trash" />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <WizardGuideAssistant stepId="mediaList" />
    </>
  );
}
