/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Header2 from "../../../header2/header2";
import { apiHandler } from "../../../../Apis/backOfficeApiHandler";
import Constants from "../../../../constants/routes";
import MultiSelect from "../../../reactMultiSelect";

const CitiesForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [mode, setMode] = useState("create"); // 'create' | 'edit' | 'view'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hotelOptions, setHotelOptions] = useState([]);
  const [hotelLabelCache, setHotelLabelCache] = useState(new Map()); // id -> label
  const [hotelResponseList, setHotelResponseList] = useState([]); // full rows from API
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const [hotelSearch, setHotelSearch] = useState(""); // current search text
  const [debouncedHotelSearch, setDebouncedHotelSearch] = useState(""); // debounced
  useEffect(() => {
    const t = setTimeout(
      () => setDebouncedHotelSearch(hotelSearch.trim()),
      300
    );
    return () => clearTimeout(t);
  }, [hotelSearch]);
  // Fetch active hotels and map to options
  const fetchActiveHotels = async (search = "") => {
    try {
      setIsLoadingHotels(true);
      const response = await apiHandler.get(
        `api/hotels?page=1&limit=10&status=active&search=${encodeURIComponent(
          search
        )}`
      );

      // Support a few common response shapes
      const body = response?.data ?? response;
      const list =
        body?.data?.items ??
        body?.result?.items ??
        body?.items ??
        body?.data ??
        body ??
        [];

      const opts = (Array.isArray(list) ? list : []).map((h) => ({
        value: String(h.id),
        label: h.name || `#${h.id}`,
      }));

      setHotelOptions(opts);
      setHotelResponseList(Array.isArray(list) ? list : []); // ✅ keep full rows
      // ✅ update cache with any new labels
      setHotelLabelCache((prev) => {
        const next = new Map(prev);
        for (const o of opts) next.set(o.value, o.label);
        return next;
      });
    } catch (err) {
      console.error("Failed to fetch active hotels:", err);
      setHotelOptions([]);
      setHotelResponseList([]); // clear on error
    } finally {
      setIsLoadingHotels(false);
    }
  };

  useEffect(() => {
    // Toast defaults
    apiHandler.setToastConfig?.({
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Slide,
    });
    if (id) {
      const path = window.location.pathname;
      setMode(
        path.includes("toolsGeographicalContentCitiesView")
          ? "toolsGeographicalContentCitiesView"
          : "toolsGeographicalContentCitiesEdit"
      );
      fetchCountry();
      fetchActiveHotels(); // 👈 add here for edit mode
    } else {
      // create mode
      setMode("create");
      fetchActiveHotels(); // 👈 add here for create mode too
    }
  }, [id, location.pathname]);
  // Re-fetch when user stops typing (debounced)
  useEffect(() => {
    if (debouncedHotelSearch && debouncedHotelSearch.length < 2) return; // wait for 2+ chars
    fetchActiveHotels(debouncedHotelSearch);
  }, [debouncedHotelSearch]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    setValue,
    trigger,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: "",
      name_full: "",
      country_code: "",
      expedia_id: "null",
      center_latitude: "",
      center_longitude: "",
      parent_type: "",
      is_active: true,
      coords: [{ lat: "", lng: "" }],
      // ✅ keep hotels as array in-form; your submit already turns arrays into CSV string via .toString()
      hotels: [],
    },
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  // Field array for polygon points
  const { fields, append, remove } = useFieldArray({
    control,
    name: "coords",
  });

  const validation = {
    name: {
      required: { value: true, message: "City name is required" },
      validate: (v) =>
        !v || v.trim().length < 2
          ? "Name must be at least 2 characters"
          : v.trim().length > 300
          ? "Name must not exceed 300 characters"
          : true,
    },
    name_full: {
      required: { value: true, message: "Full name is required" },
      validate: (v) =>
        !v || v.trim().length < 2
          ? "Full name must be at least 2 characters"
          : v.trim().length > 300
          ? "Full name must not exceed 300 characters"
          : true,
    },
    country_code: {
      required: { value: true, message: "Country code is required" },
      validate: (v) => {
        const val = (v || "").trim().toUpperCase();
        if (!val) return "Country code is required";
        if (!/^[A-Z]{2}$/.test(val))
          return "Country code must be 2 uppercase letters (e.g., US)";
        return true;
      },
    },
    center_latitude: {
      validate: (v) => {
        if (v === "" || v === null || v === undefined) return true;
        const n = parseFloat(v);
        if (Number.isNaN(n)) return "Latitude must be a valid number";
        if (n < -90 || n > 90) return "Latitude must be between -90 and 90";
        return true;
      },
    },
    center_longitude: {
      validate: (v) => {
        if (v === "" || v === null || v === undefined) return true;
        const n = parseFloat(v);
        if (Number.isNaN(n)) return "Longitude must be a valid number";
        if (n < -180 || n > 180)
          return "Longitude must be between -180 and 180";
        return true;
      },
    },
    // Per-row coord validation is done inline below
  };
  const CACHE_KEY = "hotelLabelCacheV1";

  // Load persistent cache on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const obj = JSON.parse(raw);
        // obj is a plain object: { key: label }
        setHotelLabelCache(new Map(Object.entries(obj)));
      }
    } catch (e) {
      console.warn("Failed to load hotelLabelCache:", e);
    }
  }, []);
  useEffect(() => {
    try {
      const obj = Object.fromEntries(hotelLabelCache);
      localStorage.setItem(CACHE_KEY, JSON.stringify(obj));
    } catch (e) {
      console.warn("Failed to persist hotelLabelCache:", e);
    }
  }, [hotelLabelCache]);

  const fetchCountry = async () => {
    try {
      const response = await apiHandler.get(`/api/cities/${id}`);

      // Normalize various response shapes
      const httpOk = response?.status === 200 || response?.status === 201;
      const body = response?.data ?? response;
      const apiOk =
        body?.status === 200 ||
        body?.status === 201 ||
        body?.status === true ||
        body?.success === true;

      // Where the country object might live
      const c =
        body?.data && !Array.isArray(body.data)
          ? body.data
          : body?.result && !Array.isArray(body.result)
          ? body.result
          : httpOk && body && !body.status && !body.success
          ? body
          : null;
      if ((httpOk || apiOk) && c) {
        // Parse polygon ring -> coords[]
        let coords = [{ lat: "", lng: "" }];
        const ring = c?.bounding_polygon?.coordinates?.[0];
        if (Array.isArray(ring) && ring.length > 0) {
          coords = ring.map((pair) => {
            const [lng, lat] = pair;
            return {
              lat:
                lat === null || lat === undefined || Number.isNaN(lat)
                  ? ""
                  : String(lat),
              lng:
                lng === null || lng === undefined || Number.isNaN(lng)
                  ? ""
                  : String(lng),
            };
          });
        }
        // ✅ hotels: parse to array of ID strings (from CSV or array)
        const parsedHotels = (() => {
          const h = c.hotels;
          // If API returns grouped: [{supplier_enum, hotels:[...]}]
          if (
            Array.isArray(h) &&
            h.length &&
            typeof h[0] === "object" &&
            h[0] !== null &&
            Array.isArray(h[0].hotels)
          ) {
            // flatten to mapping objects so the select can resolve labels:
            return h.flatMap((g) =>
              (g.hotels || []).map((sid) => ({
                supplier_enum: g.supplier_enum,
                supplier_id: String(sid),
              }))
            );
          }
          if (
            Array.isArray(h) &&
            h.length &&
            typeof h[0] === "object" &&
            h[0] !== null
          ) {
            // view mode payload already shaped like [{supplier_enum, supplier_id}, ...]
            return h;
          }
          if (Array.isArray(h)) return h.map((x) => String(x)).filter(Boolean);
          if (typeof h === "string") {
            if (h.toLowerCase() === "null" || h.trim() === "") return [];
            return h
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
          }
          return [];
        })();
        const cityData = {
          name: c.name ?? c?.name_json?.[0]?.name ?? "",
          name_full: c.name_full ?? c?.name_json?.[0]?.name_full ?? "",
          country_code: c.country_code ?? "",
          expedia_id: c.expedia_id === "null" ? "null" : c.expedia_id ?? "",
          hotels: parsedHotels, // ✅ array in form state
          center_latitude:
            c.center_latitude === null || c.center_latitude === undefined
              ? ""
              : String(c.center_latitude),
          center_longitude:
            c.center_longitude === null || c.center_longitude === undefined
              ? ""
              : String(c.center_longitude),
          parent_type: c.parent_type ?? "",
          is_active: Boolean(c.is_active),
          coords: coords.length ? coords : [{ lat: "", lng: "" }],
        };

        reset(cityData);

        // force validation pass on load
        setTimeout(() => {
          Object.keys(cityData).forEach((k) =>
            setValue(k, cityData[k], { shouldValidate: true })
          );
          trigger();
          Object.keys(cityData).forEach((k) => clearErrors(k));
        }, 50);
      } else {
        toast.error(response?.data?.message || "Failed to fetch city");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Failed to fetch city details";
      toast.error(msg);
    }
  };

  const onSubmit = async (data) => {
    if (mode === "toolsGeographicalContentCitiesView") return;
    setIsSubmitting(true);
    // Build payload for API
    // Convert coords[] -> GeoJSON Polygon { type: 'Polygon', coordinates: [ [lng,lat], ... ] }
    const cleanedCoords = (data.coords || [])
      .map((p) => {
        const lat = p.lat === "" ? null : parseFloat(p.lat);
        const lng = p.lng === "" ? null : parseFloat(p.lng);
        return { lat, lng };
      })
      .filter((p) => p.lat !== null && p.lng !== null);

    const bounding_polygon =
      cleanedCoords.length > 0
        ? {
            type: "Polygon",
            coordinates: [cleanedCoords.map((p) => [p.lng, p.lat])], // GeoJSON expects [lng,lat]
          }
        : { type: "Polygon", coordinates: [[]] };

    const payload = {
      name: data.name?.trim(),
      name_full: data.name_full?.trim(),
      country_code: data.country_code?.trim().toUpperCase(),
      expedia_id: data.expedia_id?.toString().trim() || null,
      // ✅ array -> CSV (",") or null if empty (via .toString() === "" → null)
      hotels: (() => {
        // form state stores selected IDs (strings)
        const selectedIds = Array.isArray(data.hotels) ? data.hotels : [];

        // supplier_enum -> Set of supplier_ids
        const bySupplier = new Map();

        for (const id of selectedIds) {
          const row = hotelResponseList.find(
            (h) => String(h.id) === String(id)
          );
          const mappings = Array.isArray(row?.mapping_json)
            ? row.mapping_json
            : [];

          for (const m of mappings) {
            if (!m || m.supplier_enum == null || m.supplier_id == null)
              continue;

            const key = Number(m.supplier_enum); // normalize to number
            if (!bySupplier.has(key)) bySupplier.set(key, new Set());

            // add to this supplier’s set (dedupe)
            bySupplier.get(key).add(String(m.supplier_id));
          }
        }

        // turn the map into the desired array
        return Array.from(bySupplier.entries()).map(
          ([supplier_enum, idsSet]) => ({
            supplier_enum,
            hotels: Array.from(idsSet),
          })
        );
      })(),

      center_latitude:
        data.center_latitude === "" ? null : parseFloat(data.center_latitude),
      center_longitude:
        data.center_longitude === "" ? null : parseFloat(data.center_longitude),
      is_active: Boolean(data.is_active),
      parent_type: data.parent_type?.trim() || "",
      bounding_polygon,
    };
    // 🧭 Debug: final payload
    console.log("[CitiesForm] Final payload:", payload);
    try {
      const response =
        mode === "create"
          ? await apiHandler.post("/api/cities", payload)
          : await apiHandler.patch(`/api/cities/${id}`, payload);

      if (response?.status) {
        toast.success(
          mode === "create"
            ? "City created successfully"
            : "City updated successfully"
        );
        navigate(Constants.URLConstants.TOOLSGEOGRAPHICALCONTENTCITIESSEARCH);
      } else {
        toast.error(
          response?.message ||
            `Failed to ${mode === "create" ? "create" : "update"} city`
        );
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        `Failed to ${mode === "create" ? "create" : "update"} city`;
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasError = (f) => !!errors[f];
  const errMsg = (f) => errors?.[f]?.message || "";

  const title =
    mode === "toolsGeographicalContentCitiesView"
      ? "VIEW CITY"
      : mode === "toolsGeographicalContentCitiesEdit"
      ? "EDIT CITY"
      : "Add City";

  return (
    <>
      <Header2
        title={title}
        linkText1="Cities List"
        linkText2={title}
        link1={Constants.URLConstants.TOOLSGEOGRAPHICALCONTENTCITIESSEARCH}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mt-2">
            <div className="col-md-3 form-group">
              <label>
                Name <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control form-control-sm ${
                  hasError("name") ? "is-invalid" : ""
                }`}
                type="text"
                placeholder="Country name"
                readOnly={mode === "toolsGeographicalContentCitiesView"}
                disabled={mode === "toolsGeographicalContentCitiesView"}
                maxLength={300}
                {...register("name", validation.name)}
              />
              {hasError("name") && (
                <div className="invalid-feedback d-block">{errMsg("name")}</div>
              )}
            </div>

            <div className="col-md-3 form-group">
              <label>
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control form-control-sm ${
                  hasError("name_full") ? "is-invalid" : ""
                }`}
                type="text"
                placeholder="Full country name"
                readOnly={mode === "toolsGeographicalContentCitiesView"}
                disabled={mode === "toolsGeographicalContentCitiesView"}
                maxLength={300}
                {...register("name_full", validation.name_full)}
              />
              {hasError("name_full") && (
                <div className="invalid-feedback d-block">
                  {errMsg("name_full")}
                </div>
              )}
            </div>

            <div className="col-md-3 form-group">
              <label>
                Country Code <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control form-control-sm ${
                  hasError("country_code") ? "is-invalid" : ""
                }`}
                type="text"
                placeholder="US"
                readOnly={mode === "toolsGeographicalContentCitiesView"}
                disabled={mode === "toolsGeographicalContentCitiesView"}
                maxLength={2}
                style={{ textTransform: "uppercase" }}
                {...register("country_code", validation.country_code)}
                onChange={(e) =>
                  setValue("country_code", e.target.value.toUpperCase(), {
                    shouldValidate: true,
                  })
                }
              />
              {hasError("country_code") && (
                <div className="invalid-feedback d-block">
                  {errMsg("country_code")}
                </div>
              )}
              <small className="form-text text-muted">
                2-letter ISO code (e.g., US, GB, AE)
              </small>
            </div>

            <div className="col-md-3 form-group">
              <label>Expedia ID</label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Optional"
                readOnly={mode === "toolsGeographicalContentCitiesView"}
                disabled={mode === "toolsGeographicalContentCitiesView"}
                {...register("expedia_id")}
              />
              <small className="form-text text-muted">
                Will be sent as string or null
              </small>
            </div>

            {/* ✅ HOTELS Multi-Select (labels = hotel names) */}
            <div className="col-md-3 form-group">
              <label>Hotels</label>
              <Controller
                name="hotels"
                control={control}
                render={({ field }) => {
                  const raw = field.value || [];

                  // Resolve a mapping object -> {value,label}
                  const resolveFromMapping = (m) => {
                    if (
                      !m ||
                      m.supplier_enum == null ||
                      m.supplier_id == null
                    ) {
                      const val = JSON.stringify(m ?? {});
                      return { value: val, label: val };
                    }
                    // find a hotel row whose mapping_json contains this pair
                    const matchedRow = hotelResponseList.find(
                      (row) =>
                        Array.isArray(row?.mapping_json) &&
                        row.mapping_json.some(
                          (mm) =>
                            String(mm?.supplier_enum) ===
                              String(m.supplier_enum) &&
                            String(mm?.supplier_id) === String(m.supplier_id)
                        )
                    );
                    if (matchedRow) {
                      const value = String(matchedRow.id);
                      const label = matchedRow.name || `#${value}`;
                      // keep cache fresh
                      if (!hotelLabelCache.get(value)) {
                        setHotelLabelCache((prev) => {
                          const next = new Map(prev);
                          next.set(value, label);
                          return next;
                        });
                      }
                      return { value, label };
                    }
                    // fallback if not resolvable from current page
                    const syntheticValue = `${m.supplier_enum}|${m.supplier_id}`;
                    const syntheticLabel =
                      hotelLabelCache.get(syntheticValue) ||
                      `Supplier ${m.supplier_enum}:${m.supplier_id}`;
                    return { value: syntheticValue, label: syntheticLabel };
                  };

                  // Build selected options from either IDs or mapping objects
                  const selectedOptions = raw.map((item) => {
                    if (typeof item === "string" || typeof item === "number") {
                      const id = String(item);
                      return {
                        value: id,
                        label: hotelLabelCache.get(id) || id,
                      };
                    }
                    return resolveFromMapping(item);
                  });

                  // Union: keep selected options present even if not in current search
                  const optionsById = new Map(
                    hotelOptions.map((o) => [o.value, o])
                  );
                  for (const so of selectedOptions) {
                    if (!optionsById.has(so.value))
                      optionsById.set(so.value, so);
                  }
                  const mergedOptions = Array.from(optionsById.values());

                  return (
                    <MultiSelect
                      isMulti
                      isSearchable
                      isLoading={isLoadingHotels}
                      options={mergedOptions}
                      placeholder="- Select Hotels -"
                      noOptionsMessage={() =>
                        isLoadingHotels
                          ? "Loading..."
                          : debouncedHotelSearch
                          ? "No results"
                          : "Type to search"
                      }
                      isDisabled={mode === "toolsGeographicalContentCitiesView"}
                      classNamePrefix="react-select"
                      className={`custom-select ${
                        hasError("hotels") ? "is-invalid" : ""
                      }`}
                      value={selectedOptions}
                      onChange={(selected) => {
                        const ids = (selected || []).map((s) => s.value);
                        setHotelLabelCache((prev) => {
                          const next = new Map(prev);
                          (selected || []).forEach((s) => {
                            // id -> label
                            next.set(String(s.value), s.label);

                            // Also cache supplier pair -> label for future view mode
                            const row = hotelResponseList.find(
                              (h) => String(h.id) === String(s.value)
                            );
                            if (Array.isArray(row?.mapping_json)) {
                              row.mapping_json.forEach((m) => {
                                if (
                                  m &&
                                  m.supplier_enum != null &&
                                  m.supplier_id != null
                                ) {
                                  next.set(
                                    `${m.supplier_enum}|${m.supplier_id}`,
                                    row.name || s.label
                                  );
                                }
                              });
                            }
                          });
                          return next;
                        });
                        field.onChange(ids);
                      }}
                      onInputChange={(inputValue, meta) => {
                        if (meta.action === "input-change")
                          setHotelSearch(inputValue);
                        return inputValue;
                      }}
                      onMenuOpen={() => {
                        if (!hotelOptions.length)
                          fetchActiveHotels(debouncedHotelSearch);
                      }}
                      hideSelectedOptions={false}
                      closeMenuOnSelect={false}
                    />
                  );
                }}
              />

              <small className="form-text text-muted">
                Will be sent as CSV string or null
              </small>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-3 form-group">
              <label>Center Latitude</label>
              <input
                className={`form-control form-control-sm ${
                  hasError("center_latitude") ? "is-invalid" : ""
                }`}
                type="number"
                step="any"
                placeholder="0.0000"
                readOnly={mode === "toolsGeographicalContentCitiesView"}
                disabled={mode === "toolsGeographicalContentCitiesView"}
                {...register("center_latitude", validation.center_latitude)}
              />
              {hasError("center_latitude") && (
                <div className="invalid-feedback d-block">
                  {errMsg("center_latitude")}
                </div>
              )}
              <small className="form-text text-muted">-90 to 90</small>
            </div>

            <div className="col-md-3 form-group">
              <label>Center Longitude</label>
              <input
                className={`form-control form-control-sm ${
                  hasError("center_longitude") ? "is-invalid" : ""
                }`}
                type="number"
                step="any"
                placeholder="0.0000"
                readOnly={mode === "toolsGeographicalContentCitiesView"}
                disabled={mode === "toolsGeographicalContentCitiesView"}
                {...register("center_longitude", validation.center_longitude)}
              />
              {hasError("center_longitude") && (
                <div className="invalid-feedback d-block">
                  {errMsg("center_longitude")}
                </div>
              )}
              <small className="form-text text-muted">-180 to 180</small>
            </div>

            <div className="col-md-3 form-group">
              <label>Parent Type</label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="continent/country/region..."
                readOnly={mode === "toolsGeographicalContentCitiesView"}
                disabled={mode === "toolsGeographicalContentCitiesView"}
                maxLength={50}
                {...register("parent_type")}
              />
            </div>

            <div className="col-md-3 form-group d-flex align-items-center">
              <div className="mt-4">
                <Controller
                  name="is_active"
                  control={control}
                  render={({ field }) => (
                    <input
                      style={{
                        accentColor: "var(--color-secondary)",
                        verticalAlign: "middle",
                      }}
                      type="checkbox"
                      id="is_active"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      disabled={mode === "toolsGeographicalContentCitiesView"}
                    />
                  )}
                />
                <label className="form-check-label ms-2" htmlFor="is_active">
                  Is Active
                </label>
              </div>
            </div>
          </div>

          {/* Bounding polygon editor */}
          <div className="row mt-4">
            <div className="col-md-12">
              <label className="mb-2">Bounding Polygon Points</label>
              {fields.map((f, idx) => (
                <div className="row mb-2" key={f.id}>
                  <div className="col-md-3">
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Latitude"
                      readOnly={mode === "toolsGeographicalContentCitiesView"}
                      disabled={mode === "toolsGeographicalContentCitiesView"}
                      {...register(`coords.${idx}.lat`, {
                        validate: (v) => {
                          if (v === "" || v === null || v === undefined)
                            return true;
                          const n = parseFloat(v);
                          if (Number.isNaN(n)) return "Lat must be a number";
                          if (n < -90 || n > 90)
                            return "Lat must be between -90 and 90";
                          return true;
                        },
                      })}
                    />
                    {errors?.coords?.[idx]?.lat && (
                      <small className="text-danger d-block">
                        {errors.coords[idx].lat.message}
                      </small>
                    )}
                  </div>
                  <div className="col-md-3">
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Longitude"
                      readOnly={mode === "toolsGeographicalContentCitiesView"}
                      disabled={mode === "toolsGeographicalContentCitiesView"}
                      {...register(`coords.${idx}.lng`, {
                        validate: (v) => {
                          if (v === "" || v === null || v === undefined)
                            return true;
                          const n = parseFloat(v);
                          if (Number.isNaN(n)) return "Lng must be a number";
                          if (n < -180 || n > 180)
                            return "Lng must be between -180 and 180";
                          return true;
                        },
                      })}
                    />
                    {errors?.coords?.[idx]?.lng && (
                      <small className="text-danger d-block">
                        {errors.coords[idx].lng.message}
                      </small>
                    )}
                  </div>

                  {mode !== "toolsGeographicalContentCitiesView" && (
                    <div className="col-md-3 d-flex align-items-center gap-2">
                      {idx === fields.length - 1 && (
                        <button
                          type="button"
                          className="btn btn-dark btn-sm"
                          onClick={() => append({ lat: "", lng: "" })}
                        >
                          <i className="fa fa-plus" />
                        </button>
                      )}
                      {fields.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => remove(idx)}
                        >
                          <i className="fa fa-minus" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <small className="form-text text-muted">
                GeoJSON uses [lng, lat] order; we’ll convert for you on save.
              </small>
            </div>
          </div>

          {mode !== "toolsGeographicalContentCitiesView" ? (
            <div className="form-group mt-4">
              <button
                type="submit"
                className="btn btn-sm btn-dark"
                disabled={isSubmitting || !isValid}
              >
                <i className="fa-solid fa-floppy-disk"></i>{" "}
                {isSubmitting ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm ms-2"
                onClick={() =>
                  navigate(
                    Constants.URLConstants
                      .TOOLSGEOGRAPHICALCONTENTCOUNTRIESSEARCH
                  )
                }
                disabled={isSubmitting}
              >
                <i className="fa fa-arrow-left me-1" /> Back
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-end align-items-end mt-4 gap-2">
              <button
                type="button"
                className="btn btn-dark"
                onClick={() =>
                  navigate(`/toolsGeographicalContentCitiesEdit/${id}`)
                }
              >
                <i className="fa fa-edit" /> Edit Country
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  navigate(
                    Constants.URLConstants
                      .TOOLSGEOGRAPHICALCONTENTCOUNTRIESSEARCH
                  )
                }
              >
                <i className="fa fa-arrow-left me-1" /> Back
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default CitiesForm;
