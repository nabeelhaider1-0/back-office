import React, { useEffect, useMemo, useRef, useState } from "react";
import TimezoneSelect from "react-timezone-select";
import { toast } from "react-toastify";
import MultiSelect from "../reactMultiSelect";
import LookupSelectWithManage from "../lookups/LookupSelectWithManage";
import uploadFileExtranet from "../../constants/filesuploaderExtranet";
import { apiHandler } from "../../Apis/backOfficeApiHandler";
import Swal from "sweetalert2";
import { listLookups, createLookup } from "../../Apis/hotelExtranetApi";

const defaultHotel = {
  hotel_code: "",
  display_name: "",
  legal_name: "",
  brand: "",
  chain: null,
  star_rating: 3,
  address: { line1: "", city: "", country: "" },
  geo: { lat: "", lng: "" },
  timezone: "",
  contacts: [{ type: "sales", email: "", phone: "" }],
  email: "",
  phone: "",
  amenities: [],
  facilities: [],
  policies: { checkin: "", checkout: "" },
  images: [],
  status: "draft",
  languages: [],
};

export default function HotelExtranetHotelForm({
  mode = "create", // create | edit | view
  initialValue,
  onSubmit,
  submitting = false,
}) {
  const [hotel, setHotel] = useState(initialValue || defaultHotel);
  const [uploading, setUploading] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [timezoneError, setTimezoneError] = useState(false);
  const [errors, setErrors] = useState({});
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // Country/City async dropdown state (copied from Add form)
  const [countryDebounced, setCountryDebounced] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [countryLabelCache, setCountryLabelCache] = useState(new Map());
  const [cityDebounced, setCityDebounced] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [cityLabelCache, setCityLabelCache] = useState(new Map());
  const debounceRef = useRef(null);
  // Lookups (amenities, facilities)
  const [amenitiesOptions, setAmenitiesOptions] = useState([]);
  const [facilitiesOptions, setFacilitiesOptions] = useState([]);
  const [isLoadingAmenities, setIsLoadingAmenities] = useState(false);
  const [isLoadingFacilities, setIsLoadingFacilities] = useState(false);
  const [amenitiesSearch, setAmenitiesSearch] = useState("");
  const [facilitiesSearch, setFacilitiesSearch] = useState("");

  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isCreate = mode === "create";
  const canEditImages = !isView;

  useEffect(() => {
    setHotel(initialValue || defaultHotel);
  }, [initialValue]);

  const setDebounced = (setter, value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setter(value), 300);
  };

  useEffect(
    () => () => debounceRef.current && clearTimeout(debounceRef.current),
    []
  );

  // Lookups initial load
  useEffect(() => {
    (async () => {
      try {
        setIsLoadingAmenities(true);
        const am = await listLookups("hotel_amenities", { active: true });
        const amArr = Array.isArray(am)
          ? am
          : Array.isArray(am?.items)
          ? am.items
          : [];
        // Sort by order field (ascending), then by label as fallback
        const sortedAm = [...amArr].sort((a, b) => {
          const orderA = Number(a.order ?? 0);
          const orderB = Number(b.order ?? 0);
          if (orderA !== orderB) return orderA - orderB;
          return (a.label || "").localeCompare(b.label || "");
        });
        setAmenitiesOptions(
          sortedAm.map((e) => ({ value: e.label, label: e.label }))
        );
      } catch (_) {
        setAmenitiesOptions([]);
      } finally {
        setIsLoadingAmenities(false);
      }
      try {
        setIsLoadingFacilities(true);
        const fc = await listLookups("hotel_facilities", { active: true });
        const fcArr = Array.isArray(fc)
          ? fc
          : Array.isArray(fc?.items)
          ? fc.items
          : [];
        // Sort by order field (ascending), then by label as fallback
        const sortedFc = [...fcArr].sort((a, b) => {
          const orderA = Number(a.order ?? 0);
          const orderB = Number(b.order ?? 0);
          if (orderA !== orderB) return orderA - orderB;
          return (a.label || "").localeCompare(b.label || "");
        });
        setFacilitiesOptions(
          sortedFc.map((e) => ({ value: e.label, label: e.label }))
        );
      } catch (_) {
        setFacilitiesOptions([]);
      } finally {
        setIsLoadingFacilities(false);
      }
    })();
  }, []);

  // countries fetch
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoadingCountries(true);
        const res = await apiHandler.get("/api/countries", {
          params: { page: 1, limit: 20, search: countryDebounced },
        });
        const ok =
          res?.status === 200 || Array.isArray(res?.data) || Array.isArray(res);
        if (ok) {
          const arr = Array.isArray(res?.data)
            ? res.data
            : Array.isArray(res)
            ? res
            : res?.data?.data || res?.data || [];
          const mapped = arr.map((c) => ({
            code: c.country_code || c.code || "",
            name: c.name ?? c?.name_json?.[0]?.name ?? "",
          }));
          setCountryOptions(mapped);
          setCountryLabelCache((prev) => {
            const next = new Map(prev);
            mapped.forEach((m) => next.set(m.code || m.name, m.name || m.code));
            return next;
          });
        } else setCountryOptions([]);
      } catch (_) {
        setCountryOptions([]);
      } finally {
        setIsLoadingCountries(false);
      }
    };
    if (countryDebounced.length >= 2 || countryDebounced === "") load();
  }, [countryDebounced]);

  // cities fetch
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoadingCities(true);
        const res = await apiHandler.get("/api/cities", {
          params: {
            page: 1,
            limit: 20,
            search: cityDebounced,
            country_code: hotel.address.country || undefined,
          },
        });
        const ok =
          res?.status === 200 || Array.isArray(res?.data) || Array.isArray(res);
        if (ok) {
          const arr = Array.isArray(res?.data)
            ? res.data
            : Array.isArray(res)
            ? res
            : res?.data?.data || res?.data || [];
          const mapped = arr.map((c) => ({
            name: c.name ?? c?.name_json?.[0]?.name ?? "",
          }));
          setCityOptions(mapped);
          setCityLabelCache((prev) => {
            const next = new Map(prev);
            mapped.forEach((m) => next.set(m.name, m.name));
            return next;
          });
        } else setCityOptions([]);
      } catch (_) {
        setCityOptions([]);
      } finally {
        setIsLoadingCities(false);
      }
    };
    if (cityDebounced.length >= 0) load();
  }, [cityDebounced, hotel.address.country]);

  const onChange = (path, value) => {
    if (isView) return; // prevent edits in view mode
    setHotel((prev) => {
      const clone = { ...prev };
      const keys = path.split(".");
      let ref = clone;
      for (let i = 0; i < keys.length - 1; i++) {
        ref[keys[i]] = { ...ref[keys[i]] };
        ref = ref[keys[i]];
      }
      ref[keys[keys.length - 1]] = value;
      return clone;
    });
    setErrors((prev) => {
      if (!prev[path]) return prev;
      const next = { ...prev };
      delete next[path];
      return next;
    });
  };

  const validate = () => {
    const nextErrors = {};

    const requiredFields = [
      { key: "display_name", value: hotel.display_name, label: "Display name" },
      { key: "legal_name", value: hotel.legal_name, label: "Legal name" },
      { key: "email", value: hotel.email, label: "Email" },
      { key: "phone", value: hotel.phone, label: "Phone" },
      {
        key: "address.line1",
        value: hotel.address?.line1,
        label: "Address line 1",
      },
      {
        key: "address.country",
        value: hotel.address?.country,
        label: "Country",
      },
      { key: "address.city", value: hotel.address?.city, label: "City" },
    ];

    requiredFields.forEach(({ key, value, label }) => {
      if (!value || !String(value).trim()) {
        nextErrors[key] = `Please fill the required field (${label})`;
      }
    });

    if (!hotel.timezone || !String(hotel.timezone).trim()) {
      nextErrors["timezone"] = "Please fill the required field (Timezone)";
      setTimezoneError(true);
    } else {
      setTimezoneError(false);
    }

    // images: if present, require type & caption
    if (hotel.images && hotel.images.length) {
      const errs = {};
      hotel.images.forEach((im, i) => {
        const missingType = !im?.type || !String(im.type).trim();
        const missingCaption = !im?.caption || !String(im.caption).trim();
        if (missingType || missingCaption)
          errs[i] = { type: missingType, caption: missingCaption };
      });
      if (Object.keys(errs).length) {
        setImageErrors(errs);
        toast.error("Please fill Type and Caption for all images");
        return false;
      }
    }
    setImageErrors({});

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      toast.error("Please fill the highlighted required fields");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) return;
    if (!validate()) return;
    const payload = {
      ...hotel,
      geo: {
        lat: hotel.geo.lat === "" ? null : Number(hotel.geo.lat),
        lng: hotel.geo.lng === "" ? null : Number(hotel.geo.lng),
      },
    };
    if (!payload.hotel_code) {
      delete payload.hotel_code;
    }
    onSubmit && onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="panel-body">
        <div className="row">
          <div className="col-md-3 form-group">
            <label>
              Display Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={hotel.display_name}
              onChange={(e) => onChange("display_name", e.target.value)}
              disabled={isView}
              style={
                errors["display_name"]
                  ? { border: "2px solid #dc2626", backgroundColor: "#fff5f5" }
                  : undefined
              }
            />
            {errors["display_name"] && (
              <div className="text-danger small mt-1">
                {errors["display_name"]}
              </div>
            )}
          </div>
          <div className="col-md-3 form-group">
            <label>
              Legal Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={hotel.legal_name}
              onChange={(e) => onChange("legal_name", e.target.value)}
              disabled={isView}
              style={
                errors["legal_name"]
                  ? { border: "2px solid #dc2626", backgroundColor: "#fff5f5" }
                  : undefined
              }
            />
            {errors["legal_name"] && (
              <div className="text-danger small mt-1">
                {errors["legal_name"]}
              </div>
            )}
          </div>
          <div className="col-md-3 form-group">
            <label>Brand</label>
            <LookupSelectWithManage
              category="hotel_brands"
              label="Brand"
              value={hotel.brand}
              onChange={(val) => onChange("brand", val)}
              disabled={isView}
            />
          </div>
          <div className="col-md-3 form-group">
            <label>Chain</label>
            <LookupSelectWithManage
              category="hotel_chains"
              label="Chain"
              value={hotel.chain || ""}
              onChange={(val) => onChange("chain", val || null)}
              disabled={isView}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control form-control-sm"
              value={hotel.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="hotel@domain.com"
              disabled={isView}
              style={
                errors["email"]
                  ? { border: "2px solid #dc2626", backgroundColor: "#fff5f5" }
                  : undefined
              }
            />
            {errors["email"] && (
              <div className="text-danger small mt-1">{errors["email"]}</div>
            )}
          </div>
          <div className="col-md-3 form-group">
            <label>Phone</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={hotel.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="+974-1234-5678"
              disabled={isView}
              style={
                errors["phone"]
                  ? { border: "2px solid #dc2626", backgroundColor: "#fff5f5" }
                  : undefined
              }
            />
            {errors["phone"] && (
              <div className="text-danger small mt-1">{errors["phone"]}</div>
            )}
          </div>
          <div className="col-md-3 form-group">
            <label>Star Rating</label>
            <div
              role="group"
              aria-label="Star rating"
              className="d-flex align-items-center gap-1"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  className="btn btn-link p-0"
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  onClick={() => !isView && onChange("star_rating", n)}
                  onKeyDown={(e) => {
                    if (!isView && (e.key === "Enter" || e.key === " "))
                      onChange("star_rating", n);
                  }}
                  style={{ textDecoration: "none" }}
                  disabled={isView}
                >
                  {hotel.star_rating >= n ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="#f59e0b"
                    >
                      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.869 1.401-8.168L.132 9.21l8.2-1.192z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  )}
                </button>
              ))}
              <span className="ms-1" style={{ fontSize: 12, color: "#64748b" }}>
                {hotel.star_rating}/5
              </span>
            </div>
          </div>
          <div className="col-md-3 form-group">
            <label>Timezone</label>
            <div
              className={`custom-select ${timezoneError ? "is-invalid" : ""}`}
              style={{ padding: 0, border: "none" }}
            >
              <TimezoneSelect
                value={hotel.timezone || ""}
                onChange={(tz) => {
                  if (isView) return;
                  const val = typeof tz === "string" ? tz : tz?.value || "";
                  onChange("timezone", val);
                  if (val) setTimezoneError(false);
                }}
                classNamePrefix="tz"
                placeholder="- Select Timezone -"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: 31,
                    height: 31,
                    borderColor: timezoneError ? "#dc3545" : "#ced4da",
                    boxShadow: "none",
                  }),
                  valueContainer: (b) => ({ ...b, padding: "0 8px" }),
                  indicatorsContainer: (b) => ({ ...b, height: 31 }),
                  dropdownIndicator: (b) => ({ ...b, padding: "0 6px" }),
                  clearIndicator: (b) => ({ ...b, padding: "0 6px" }),
                  placeholder: (b) => ({
                    ...b,
                    color: "#6c757d",
                    fontSize: 13,
                  }),
                  singleValue: (b) => ({ ...b, fontSize: 13 }),
                  input: (b) => ({ ...b, fontSize: 13 }),
                  option: (b) => ({ ...b, fontSize: 13 }),
                  menu: (b) => ({ ...b, zIndex: 5 }),
                }}
                isDisabled={isView}
              />
            </div>
            {timezoneError || errors["timezone"] ? (
              <div className="text-danger small mt-1">
                {errors["timezone"] || "Timezone is required"}
              </div>
            ) : null}
          </div>
        </div>

        <hr />
        <div className="form-group mt-2">
          <h5>Address</h5>
        </div>
        <div className="row">
          <div className="col-md-4 form-group">
            <label>
              Address Line 1 <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={hotel.address.line1}
              onChange={(e) => onChange("address.line1", e.target.value)}
              disabled={isView}
              style={
                errors["address.line1"]
                  ? { border: "2px solid #dc2626", backgroundColor: "#fff5f5" }
                  : undefined
              }
            />
            {errors["address.line1"] && (
              <div className="text-danger small mt-1">
                {errors["address.line1"]}
              </div>
            )}
          </div>
          <div className="col-md-4 form-group">
            <label>
              Country <span className="text-danger">*</span>
            </label>
            <MultiSelect
              isSearchable
              isMulti={false}
              isLoading={isLoadingCountries}
              options={(() => {
                const mapped = countryOptions.map((c) => ({
                  value: c.code || c.name || "",
                  label: c.name || c.code || "Unknown",
                }));
                const map = new Map(mapped.map((o) => [o.value, o]));
                const current = hotel.address.country || "";
                if (current && !map.has(current)) {
                  map.set(current, {
                    value: current,
                    label: countryLabelCache.get(current) || current,
                  });
                }
                return Array.from(map.values());
              })()}
              placeholder="- Select Country -"
              noOptionsMessage={() =>
                isLoadingCountries
                  ? "Loading..."
                  : countryDebounced
                  ? "No results"
                  : "Type to search"
              }
              className="custom-select"
              value={(() => {
                const v = hotel.address.country || "";
                return v
                  ? { value: v, label: countryLabelCache.get(v) || v }
                  : null;
              })()}
              onChange={(opt) =>
                onChange("address.country", opt ? opt.value : "")
              }
              onInputChange={(inputValue, meta) => {
                if (meta.action === "input-change")
                  setDebounced(setCountryDebounced, inputValue);
                return inputValue;
              }}
              isDisabled={isView}
            />
            {errors["address.country"] && (
              <div className="text-danger small mt-1">
                {errors["address.country"]}
              </div>
            )}
          </div>
          <div className="col-md-4 form-group">
            <label>
              City <span className="text-danger">*</span>
            </label>
            <MultiSelect
              isSearchable
              isMulti={false}
              isLoading={isLoadingCities}
              options={(() => {
                const mapped = cityOptions.map((c) => ({
                  value: c.name || "",
                  label: c.name || "Unknown",
                }));
                const map = new Map(mapped.map((o) => [o.value, o]));
                const current = hotel.address.city || "";
                if (current && !map.has(current)) {
                  map.set(current, {
                    value: current,
                    label: cityLabelCache.get(current) || current,
                  });
                }
                return Array.from(map.values());
              })()}
              placeholder="- Select City -"
              noOptionsMessage={() =>
                isLoadingCities
                  ? "Loading..."
                  : cityDebounced
                  ? "No results"
                  : hotel.address.country
                  ? "Type to search"
                  : "Select country first"
              }
              className="custom-select"
              value={(() => {
                const v = hotel.address.city || "";
                return v
                  ? { value: v, label: cityLabelCache.get(v) || v }
                  : null;
              })()}
              onChange={(opt) => onChange("address.city", opt ? opt.value : "")}
              onInputChange={(inputValue, meta) => {
                if (meta.action === "input-change")
                  setDebounced(setCityDebounced, inputValue);
                return inputValue;
              }}
              isDisabled={isView}
            />
            {errors["address.city"] && (
              <div className="text-danger small mt-1">
                {errors["address.city"]}
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 form-group">
            <label>Latitude</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={hotel.geo.lat}
              onChange={(e) => onChange("geo.lat", e.target.value)}
              disabled={isView}
            />
          </div>
          <div className="col-md-3 form-group">
            <label>Longitude</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={hotel.geo.lng}
              onChange={(e) => onChange("geo.lng", e.target.value)}
              disabled={isView}
            />
          </div>
          <div className="col-md-3 form-group">
            <label>Status</label>
            <LookupSelectWithManage
              category="hotel_statuses"
              label="Status"
              value={hotel.status}
              onChange={(val) => onChange("status", val)}
              disabled={isView}
            />
          </div>
        </div>

        <hr />
        <div className="form-group mt-2">
          <h5>Contacts</h5>
        </div>
        {hotel.contacts.map((c, idx) => (
          <div className="row align-items-end" key={idx}>
            <div className="col-md-3 form-group">
              <label>Type</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="e.g., sales, reservations"
                value={c.type || ""}
                onChange={(e) => {
                  const next = [...hotel.contacts];
                  next[idx] = { ...(next[idx] || {}), type: e.target.value };
                  setHotel((p) => ({ ...p, contacts: next }));
                }}
                disabled={isView}
              />
            </div>
            <div className="col-md-4 form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control form-control-sm"
                value={c.email || ""}
                onChange={(e) => {
                  const next = [...hotel.contacts];
                  next[idx] = { ...(next[idx] || {}), email: e.target.value };
                  setHotel((p) => ({ ...p, contacts: next }));
                }}
                disabled={isView}
              />
            </div>
            <div className="col-md-3 form-group">
              <label>Phone</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={c.phone || ""}
                onChange={(e) => {
                  const next = [...hotel.contacts];
                  next[idx] = { ...(next[idx] || {}), phone: e.target.value };
                  setHotel((p) => ({ ...p, contacts: next }));
                }}
                disabled={isView}
              />
            </div>
            <div className="col-md-2 form-group">
              {!isView && (
                <div className="d-flex justify-content-end gap-2 align-items-end">
                  {idx > 0 && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      title="Remove contact"
                      onClick={() => {
                        const next = hotel.contacts.filter((_, i) => i !== idx);
                        setHotel((p) => ({
                          ...p,
                          contacts: next.length
                            ? next
                            : [{ type: "sales", email: "", phone: "" }],
                        }));
                      }}
                    >
                      <i className="fa fa-minus"></i>
                    </button>
                  )}
                  {idx === hotel.contacts.length - 1 && (
                    <button
                      type="button"
                      className="btn btn-dark btn-sm"
                      title="Add contact"
                      onClick={() =>
                        setHotel((p) => ({
                          ...p,
                          contacts: [
                            ...p.contacts,
                            { type: "sales", email: "", phone: "" },
                          ],
                        }))
                      }
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        <hr />
        <div className="row">
          <div className="col-md-6 form-group">
            <label>Amenities</label>
            <div className="d-flex align-items-center" style={{ gap: 8 }}>
              <div style={{ flex: 1 }}>
                <MultiSelect
                  isSearchable
                  isMulti
                  isLoading={isLoadingAmenities}
                  options={amenitiesOptions}
                  placeholder="- Select amenities -"
                  value={(hotel.amenities || []).map((v) => ({
                    value: v,
                    label: v,
                  }))}
                  onChange={(opts) =>
                    !isView &&
                    setHotel((p) => ({
                      ...p,
                      amenities: (opts || []).map((o) => o.value),
                    }))
                  }
                  onInputChange={(input, meta) => {
                    if (meta.action === "input-change") {
                      setAmenitiesSearch(input);
                      if (debounceRef.current)
                        clearTimeout(debounceRef.current);
                      debounceRef.current = setTimeout(() => {
                        listLookups("hotel_amenities", {
                          q: input,
                          active: true,
                        })
                          .then((data) => {
                            const arr = Array.isArray(data)
                              ? data
                              : Array.isArray(data?.items)
                              ? data.items
                              : [];
                            const sorted = [...arr].sort((a, b) => {
                              const orderA = Number(a.order ?? 0);
                              const orderB = Number(b.order ?? 0);
                              if (orderA !== orderB) return orderA - orderB;
                              return (a.label || "").localeCompare(
                                b.label || ""
                              );
                            });
                            setAmenitiesOptions(
                              sorted.map((e) => ({
                                value: e.label,
                                label: e.label,
                              }))
                            );
                          })
                          .catch(() => setAmenitiesOptions([]));
                      }, 300);
                    }
                    return input;
                  }}
                  isDisabled={isView}
                />
              </div>
              {!isView && (
                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  title="Add amenity"
                  onClick={async () => {
                    const label = (amenitiesSearch || "").trim();
                    if (!label) {
                      Swal.fire("Type a name to add", "", "info");
                      return;
                    }
                    const confirm = await Swal.fire({
                      title: `Add \"${label}\"?`,
                      icon: "question",
                      showCancelButton: true,
                    });
                    if (!confirm.isConfirmed) return;
                    try {
                      await createLookup("hotel_amenities", { label });
                      const data = await listLookups("hotel_amenities", {
                        q: label,
                        active: true,
                      });
                      const arr = Array.isArray(data)
                        ? data
                        : Array.isArray(data?.items)
                        ? data.items
                        : [];
                      const sorted = [...arr].sort((a, b) => {
                        const orderA = Number(a.order ?? 0);
                        const orderB = Number(b.order ?? 0);
                        if (orderA !== orderB) return orderA - orderB;
                        return (a.label || "").localeCompare(b.label || "");
                      });
                      setAmenitiesOptions(
                        sorted.map((e) => ({ value: e.label, label: e.label }))
                      );
                      setHotel((p) => ({
                        ...p,
                        amenities: Array.from(
                          new Set([...(p.amenities || []), label])
                        ),
                      }));
                    } catch (_) {
                      Swal.fire("Failed", "Could not add amenity", "error");
                    }
                  }}
                >
                  <i className="fa fa-plus"></i>
                </button>
              )}
            </div>
          </div>
          <div className="col-md-6 form-group">
            <label>Facilities</label>
            <div className="d-flex align-items-center" style={{ gap: 8 }}>
              <div style={{ flex: 1 }}>
                <MultiSelect
                  isSearchable
                  isMulti
                  isLoading={isLoadingFacilities}
                  options={facilitiesOptions}
                  placeholder="- Select facilities -"
                  value={(hotel.facilities || []).map((v) => ({
                    value: v,
                    label: v,
                  }))}
                  onChange={(opts) =>
                    !isView &&
                    setHotel((p) => ({
                      ...p,
                      facilities: (opts || []).map((o) => o.value),
                    }))
                  }
                  onInputChange={(input, meta) => {
                    if (meta.action === "input-change") {
                      setFacilitiesSearch(input);
                      if (debounceRef.current)
                        clearTimeout(debounceRef.current);
                      debounceRef.current = setTimeout(() => {
                        listLookups("hotel_facilities", {
                          q: input,
                          active: true,
                        })
                          .then((data) => {
                            const arr = Array.isArray(data)
                              ? data
                              : Array.isArray(data?.items)
                              ? data.items
                              : [];
                            const sorted = [...arr].sort((a, b) => {
                              const orderA = Number(a.order ?? 0);
                              const orderB = Number(b.order ?? 0);
                              if (orderA !== orderB) return orderA - orderB;
                              return (a.label || "").localeCompare(
                                b.label || ""
                              );
                            });
                            setFacilitiesOptions(
                              sorted.map((e) => ({
                                value: e.label,
                                label: e.label,
                              }))
                            );
                          })
                          .catch(() => setFacilitiesOptions([]));
                      }, 300);
                    }
                    return input;
                  }}
                  isDisabled={isView}
                />
              </div>
              {!isView && (
                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  title="Add facility"
                  onClick={async () => {
                    const label = (facilitiesSearch || "").trim();
                    if (!label) {
                      Swal.fire("Type a name to add", "", "info");
                      return;
                    }
                    const confirm = await Swal.fire({
                      title: `Add \"${label}\"?`,
                      icon: "question",
                      showCancelButton: true,
                    });
                    if (!confirm.isConfirmed) return;
                    try {
                      await createLookup("hotel_facilities", { label });
                      const data = await listLookups("hotel_facilities", {
                        q: label,
                        active: true,
                      });
                      const arr = Array.isArray(data)
                        ? data
                        : Array.isArray(data?.items)
                        ? data.items
                        : [];
                      const sorted = [...arr].sort((a, b) => {
                        const orderA = Number(a.order ?? 0);
                        const orderB = Number(b.order ?? 0);
                        if (orderA !== orderB) return orderA - orderB;
                        return (a.label || "").localeCompare(b.label || "");
                      });
                      setFacilitiesOptions(
                        sorted.map((e) => ({ value: e.label, label: e.label }))
                      );
                      setHotel((p) => ({
                        ...p,
                        facilities: Array.from(
                          new Set([...(p.facilities || []), label])
                        ),
                      }));
                    } catch (_) {
                      Swal.fire("Failed", "Could not add facility", "error");
                    }
                  }}
                >
                  <i className="fa fa-plus"></i>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 form-group">
            <label>Check-in</label>
            <LookupSelectWithManage
              category="checkin_times"
              label="Check-in"
              value={hotel.policies?.checkin || ""}
              onChange={(val) => onChange("policies.checkin", val)}
              disabled={isView}
            />
          </div>
          <div className="col-md-3 form-group">
            <label>Check-out</label>
            <LookupSelectWithManage
              category="checkout_times"
              label="Check-out"
              value={hotel.policies?.checkout || ""}
              onChange={(val) => onChange("policies.checkout", val)}
              disabled={isView}
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Languages</label>
            <LookupSelectWithManage
              category="languages"
              label="Languages"
              isMulti
              value={hotel.languages || []}
              onChange={(vals) =>
                setHotel((p) => ({ ...p, languages: vals || [] }))
              }
              disabled={isView}
            />
          </div>
        </div>

        <div className="form-group mt-2">
          <h5>Images</h5>
        </div>
        {canEditImages && (
          <div className="row">
            <ImageUploader
              disabled={!canEditImages}
              onFilesSelected={async (files) => {
                if (!files?.length) return;
                setUploading(true);
                try {
                  for (const f of files) {
                    const resp = await uploadFileExtranet(f);
                    if (resp?.success) {
                      setHotel((p) => ({
                        ...p,
                        images: [
                          ...p.images,
                          { url: resp.imagelink, type: "", caption: "" },
                        ],
                      }));
                    } else {
                      toast.error("Image upload failed");
                    }
                  }
                } finally {
                  setUploading(false);
                }
              }}
              uploading={uploading}
            />
            <div className="col-md-4 form-group">
              <div className="card" style={{ border: "1px solid #e5e7eb" }}>
                <div className="card-body">
                  <label className="form-label">Add by URL</label>
                  <input
                    type="text"
                    className="form-control form-control-sm mb-2"
                    placeholder="https://..."
                    value={hotel._newImageUrl || ""}
                    onChange={(e) => onChange("_newImageUrl", e.target.value)}
                  />
                  <div className="mb-2">
                    <label className="form-label" style={{ fontSize: 12 }}>
                      Type
                    </label>
                    <LookupSelectWithManage
                      category="media_categories"
                      label="Type"
                      value={hotel._newImageType || ""}
                      onChange={(val) => onChange("_newImageType", val || "")}
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control form-control-sm mb-2"
                    placeholder="Caption"
                    value={hotel._newImageCaption || ""}
                    onChange={(e) =>
                      onChange("_newImageCaption", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    onClick={() => {
                      if (hotel._newImageUrl) {
                        setHotel((p) => ({
                          ...p,
                          images: [
                            ...p.images,
                            {
                              url: p._newImageUrl,
                              type: p._newImageType || "",
                              caption: p._newImageCaption || "",
                            },
                          ],
                          _newImageUrl: "",
                          _newImageType: "",
                          _newImageCaption: "",
                        }));
                      }
                    }}
                    title="Add image"
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {hotel.images.length ? (
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                {hotel.images.map((im, idx) => (
                  <div
                    className="col-md-3 form-group"
                    key={idx}
                    onDragOver={(e) => {
                      if (isView) return;
                      e.preventDefault();
                      if (dragOverIndex !== idx) setDragOverIndex(idx);
                    }}
                    onDrop={(e) => {
                      if (isView) return;
                      e.preventDefault();
                      if (dragIndex === null || dragIndex === idx) {
                        setDragIndex(null);
                        setDragOverIndex(null);
                        return;
                      }
                      const next = [...hotel.images];
                      const [moved] = next.splice(dragIndex, 1);
                      next.splice(idx, 0, moved);
                      setHotel((p) => ({ ...p, images: next }));
                      setDragIndex(null);
                      setDragOverIndex(null);
                    }}
                  >
                    <div
                      className="card shadow-sm position-relative"
                      style={{
                        border:
                          dragOverIndex === idx
                            ? "2px dashed #94a3b8"
                            : "1px solid #e5e7eb",
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                      draggable={!isView}
                      onDragStart={() => !isView && setDragIndex(idx)}
                      onDragEnd={() => {
                        setDragIndex(null);
                        setDragOverIndex(null);
                      }}
                    >
                      <img
                        src={im.url}
                        alt={im.caption || "image"}
                        className="card-img-top"
                        style={{ height: 220, objectFit: "cover" }}
                      />
                      <div
                        className="card-body"
                        style={{ background: "#fafafa" }}
                      >
                        {!isView && (
                          <div className="row g-2">
                            <div className="col-12">
                              <label
                                className="form-label"
                                style={{ fontSize: 12 }}
                              >
                                Type <span className="text-danger">*</span>
                              </label>
                              <LookupSelectWithManage
                                category="media_categories"
                                label="Type"
                                value={im.type || ""}
                                onChange={(val) => {
                                  const next = [...hotel.images];
                                  next[idx] = { ...next[idx], type: val || "" };
                                  setHotel((p) => ({ ...p, images: next }));
                                  setImageErrors((prev) => ({
                                    ...prev,
                                    [idx]: {
                                      ...(prev[idx] || {}),
                                      type: false,
                                    },
                                  }));
                                }}
                                disabled={isView}
                              />
                              {imageErrors[idx]?.type ? (
                                <div className="invalid-feedback d-block">
                                  Type is required
                                </div>
                              ) : null}
                            </div>
                            <div className="col-12">
                              <div className="input-group input-group-sm">
                                <span
                                  className="input-group-text"
                                  style={{ minWidth: 60 }}
                                >
                                  Caption
                                </span>
                                <input
                                  type="text"
                                  className={`form-control form-control-sm ${
                                    imageErrors[idx]?.caption
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="e.g., Front view"
                                  value={im.caption}
                                  onChange={(e) => {
                                    const next = [...hotel.images];
                                    next[idx] = {
                                      ...next[idx],
                                      caption: e.target.value,
                                    };
                                    setHotel((p) => ({ ...p, images: next }));
                                    setImageErrors((prev) => ({
                                      ...prev,
                                      [idx]: {
                                        ...(prev[idx] || {}),
                                        caption: false,
                                      },
                                    }));
                                  }}
                                />
                                {imageErrors[idx]?.caption ? (
                                  <div className="invalid-feedback d-block">
                                    Caption is required
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        )}
                        {isView && (
                          <div className="text-muted" style={{ fontSize: 12 }}>
                            {im.type} — {im.caption}
                          </div>
                        )}
                        {!isView && (
                          <div
                            className="position-absolute"
                            style={{ top: 8, right: 8, zIndex: 2 }}
                          >
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                title="Remove image"
                                onClick={() => {
                                  const next = hotel.images.filter(
                                    (_, i) => i !== idx
                                  );
                                  setHotel((p) => ({ ...p, images: next }));
                                }}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {!isView && (
          <div className="row mt-3">
            <div className="col-md-12 form-group">
              <button
                type="submit"
                className="btn btn-dark btn-sm"
                disabled={submitting}
              >
                {submitting
                  ? isEdit
                    ? "Updating..."
                    : "Saving..."
                  : isEdit
                  ? "Update"
                  : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

function ImageUploader({ onFilesSelected, uploading, disabled = false }) {
  const inputRef = useRef(null);
  const onPick = () => {
    if (disabled) return;
    inputRef.current && inputRef.current.click();
  };
  return (
    <div className="col-md-8 form-group">
      <div className="card" style={{ border: "1px solid #e5e7eb" }}>
        <div className="card-body">
          <label className="form-label">
            Upload Images (S3 bucket: extranet)
          </label>
          <div
            style={{
              border: "2px dashed #cbd5e1",
              borderRadius: 6,
              padding: 16,
              textAlign: "center",
              background: "#f8fafc",
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.6 : 1,
            }}
            onClick={disabled ? undefined : onPick}
            onDragOver={(e) => {
              if (disabled) return;
              e.preventDefault();
            }}
            onDrop={(e) => {
              if (disabled) return;
              e.preventDefault();
              const files = Array.from(e.dataTransfer.files || []).filter((f) =>
                f.type.startsWith("image/")
              );
              onFilesSelected && onFilesSelected(files);
            }}
          >
            <div>Drag & drop images here or click to browse</div>
            <small>PNG, JPG up to your S3 limits</small>
          </div>
          <input
            ref={inputRef}
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            multiple
            disabled={disabled}
            onChange={(e) => {
              if (disabled) {
                e.target.value = null;
                return;
              }
              const files = Array.from(e.target.files || []);
              onFilesSelected && onFilesSelected(files);
              e.target.value = null;
            }}
          />
          {uploading && !disabled && (
            <div style={{ marginTop: 6 }}>Uploading...</div>
          )}
          {disabled && (
            <div style={{ marginTop: 6 }} className="text-muted">
              Uploads disabled in view mode
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
