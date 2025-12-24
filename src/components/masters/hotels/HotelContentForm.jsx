/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import Header2 from "../../header2/header2";
import { apiHandler } from "../../../Apis/backOfficeApiHandler";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import uploadFileMasterContentHotel from "../../../constants/masterContentUploader";

const HotelContentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [mode, setMode] = useState("create"); // 'create' | 'edit' | 'view'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lists
  const [countries, setCountries] = useState([]); // [{ value, label }]
  const [cities, setCities] = useState([]); // [{ value, label }]
  const [facilities, setFacilities] = useState([]); // [{ value, label }]

  // Countries search/menu state
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [debouncedCountrySearch, setDebouncedCountrySearch] = useState("");
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);
  const [countryLabelCache, setCountryLabelCache] = useState(new Map());

  // Cities search/menu state
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [debouncedCitySearch, setDebouncedCitySearch] = useState("");
  const [cityMenuOpen, setCityMenuOpen] = useState(false);
  const [cityLabelCache, setCityLabelCache] = useState(new Map());

  // Suppliers Fetching

  const [suppliers, setSuppliers] = useState([]);
  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(false);
  const [supplierMenuOpen, setSupplierMenuOpen] = useState(false);
  const [suppliersLoaded, setSuppliersLoaded] = useState(false);

  const fetchSuppliers = async () => {
    if (suppliersLoaded) return; // prevent duplicate fetch
    setIsLoadingSuppliers(true);
    try {
      const res = await apiHandler.get("api/supplier");
      const body = res?.data ?? res;

      // Normalize response like you do for facilities
      const list =
        body?.data?.items ??
        body?.result?.items ??
        body?.items ??
        body?.data ??
        body ??
        [];

      const mapped = (Array.isArray(list) ? list : []).map((s) => ({
        value: Number(s.supplier_enum),
        label: s.name ?? `#${s.supplier_enum}`,
      }));

      setSuppliers(mapped);
      setSuppliersLoaded(true);
    } catch (err) {
      console.error("Failed to fetch suppliers:", err);
    } finally {
      setIsLoadingSuppliers(false);
    }
  };

  // Derived: keep open while typing/loading
  const countryMenuShouldBeOpen =
    countryMenuOpen || isLoadingCountries || !!countrySearch;
  const cityMenuShouldBeOpen = cityMenuOpen || isLoadingCities || !!citySearch;

  // Facilities search/menu state
  const [isLoadingFacilities, setIsLoadingFacilities] = useState(false);
  const [facilitySearch, setFacilitySearch] = useState("");
  const [debouncedFacilitySearch, setDebouncedFacilitySearch] = useState("");
  const [facilitiesMenuOpen, setFacilitiesMenuOpen] = useState(false);
  const facilitiesMenuShouldBeOpen =
    facilitiesMenuOpen || isLoadingFacilities || !!facilitySearch;

  // ---------------- Helpers ----------------
  const upsertOption = (list, opt) => {
    if (!opt) return list;
    const seen = new Set(list.map((o) => String(o.value)));
    if (!seen.has(String(opt.value))) return [opt, ...list];
    return list;
  };

  // Facility name cache for id->name
  const facilityNameCache = new Map(); // id -> name

  // Split "Gym;1;Spa" -> ["Gym","1","Spa"]
  const splitFacilities = (raw) => {
    if (!raw) return [];
    if (Array.isArray(raw)) {
      return raw
        .map(String)
        .map((s) => s.trim())
        .filter(Boolean);
    }
    if (typeof raw === "string") {
      return raw
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [];
  };

  const isNumericId = (s) => /^[0-9]+$/.test(s);

  // Resolve a facility name (best-effort); adjust to your API if needed
  const fetchFacilityNameById = async (fid) => {
    if (facilityNameCache.has(fid)) return facilityNameCache.get(fid);
    try {
      // using a generic search since user said no backend change:
      const res = await apiHandler.get(
        `api/facilities?page=1&limit=5&search=${encodeURIComponent(fid)}`
      );
      const body = res?.data ?? res;
      const list =
        body?.data?.items ??
        body?.result?.items ??
        body?.items ??
        body?.data ??
        body ??
        [];
      const m = (Array.isArray(list) ? list : []).find(
        (r) => String(r?.id ?? r?.value) === String(fid)
      );
      const name = m?.name || m?.facility_name || m?.label || m?.title || null;
      if (name) {
        facilityNameCache.set(fid, String(name));
        return String(name);
      }
      return null;
    } catch {
      return null;
    }
  };

  // Normalize any facilities payload into an array of NAMES
  const normalizeFacilitiesToNames = async (raw) => {
    const tokens = splitFacilities(raw);
    if (!tokens.length) return [];
    const names = [];
    const idLookups = [];
    tokens.forEach((t) => {
      if (isNumericId(t)) idLookups.push(t);
      else names.push(t);
    });
    if (idLookups.length) {
      const resolved = await Promise.all(idLookups.map(fetchFacilityNameById));
      resolved.forEach((nm) => {
        if (nm && !names.includes(nm)) names.push(nm);
      });
    }
    return Array.from(new Set(names));
  };

  // Fetch Country option by country_code and show only the name
  const fetchCountryOptionByCode = async (country_code) => {
    if (!country_code) return null;

    try {
      const res = await apiHandler.get(
        `api/countries?page=1&limit=10&search=${encodeURIComponent(
          country_code
        )}`
      );
      const body = res?.data ?? res;
      const list = body?.data ?? body?.items ?? body?.result ?? body ?? [];

      const match = (Array.isArray(list) ? list : []).find(
        (r) =>
          String(r?.country_code ?? r?.code ?? r?.iso2 ?? r?.iso ?? "")
            .toUpperCase()
            .trim() === String(country_code).toUpperCase().trim()
      );

      if (!match) {
        // fallback: show just the code if name not found
        return {
          value: null,
          label: String(country_code).toUpperCase(),
          name: null,
        };
      }

      const id =
        Number(match?.id ?? match?.country_id ?? match?.value ?? 0) || null;

      // ✅ Extract country name
      const name =
        match?.name_full ??
        match?.name ??
        match?.country_name ??
        match?.name_json?.local?.["en-US"]?.name ??
        match?.name_json?.name ??
        "Unknown";

      return {
        value: id,
        label: name, // 👈 only show name
        name,
        _row: match,
      };
    } catch (e) {
      console.error(e);
      return {
        value: null,
        label: String(country_code).toUpperCase(),
        name: null,
      };
    }
  };

  // Resolve City by id (try /:id then search)
  const fetchCityOptionById = async (city_id) => {
    if (city_id == null) return null;
    try {
      const res = await apiHandler.get(`api/cities/${city_id}`);
      const body = res?.data ?? res;
      const row =
        body && body.data && !Array.isArray(body.data)
          ? body.data
          : body?.result || body;
      if (row) {
        const id = Number(row?.id ?? row?.city_id ?? row?.value ?? city_id);
        const namePart =
          row?.name ??
          row?.city_name ??
          row?.label ??
          row?.title ??
          row?.display_name ??
          null;
        const extra =
          row?.country_name ??
          row?.country ??
          row?.state ??
          row?.region ??
          row?.code ??
          null;
        const label = namePart
          ? extra
            ? `${String(namePart)} — ${String(extra)}`
            : String(namePart)
          : `#${id}`;
        return { value: id, label };
      }
    } catch (err) {
      console.log(err);
    }
    try {
      const res = await apiHandler.get(
        `api/cities?page=1&limit=10&search=${encodeURIComponent(city_id)}`
      );
      const body = res?.data ?? res;
      const list = body?.data ?? body?.items ?? body?.result ?? body ?? [];
      const match = (Array.isArray(list) ? list : []).find(
        (r) => Number(r?.id ?? r?.city_id ?? r?.value) === Number(city_id)
      );
      if (match) {
        const id = Number(
          match?.id ?? match?.city_id ?? match?.value ?? city_id
        );
        const namePart =
          match?.name ??
          match?.city_name ??
          match?.label ??
          match?.title ??
          match?.display_name ??
          null;
        const extra =
          match?.country_name ??
          match?.country ??
          match?.state ??
          match?.region ??
          match?.code ??
          null;
        const label = namePart
          ? extra
            ? `${String(namePart)} — ${String(extra)}`
            : String(namePart)
          : `#${id}`;
        return { value: id, label };
      }
    } catch (err) {
      console.log(err);
    }
    return { value: Number(city_id), label: `#${city_id}` };
  };

  // ---------------- Debouncers ----------------
  useEffect(() => {
    const t = setTimeout(
      () => setDebouncedCountrySearch(countrySearch.trim()),
      300
    );
    return () => clearTimeout(t);
  }, [countrySearch]);

  useEffect(() => {
    if (debouncedCountrySearch === "") {
      fetchCountries("");
      return;
    }
    if (debouncedCountrySearch.length < 2) return;
    fetchCountries(debouncedCountrySearch);
  }, [debouncedCountrySearch]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedCitySearch(citySearch.trim()), 300);
    return () => clearTimeout(t);
  }, [citySearch]);

  useEffect(() => {
    if (debouncedCitySearch === "") {
      fetchCities("");
      return;
    }
    if (debouncedCitySearch.length < 2) return;
    fetchCities(debouncedCitySearch);
  }, [debouncedCitySearch]);

  useEffect(() => {
    const t = setTimeout(
      () => setDebouncedFacilitySearch(facilitySearch.trim()),
      300
    );
    return () => clearTimeout(t);
  }, [facilitySearch]);

  // ---------------- Option mappers ----------------
  // Safely extract a readable country name from many possible shapes
  const extractCountryName = (row) => {
    // 1) direct fields first
    if (row?.name_full) return String(row.name_full);
    if (row?.name) return String(row.name);
    if (row?.country_name) return String(row.country_name);

    // 2) name_json fallbacks (common in your payload)
    const nj = row?.name_json;
    if (nj) {
      // Try localized block
      const local = nj.local || nj.localized || nj.locale || null;
      const en = (local && (local["en-US"] || local.en)) || null;

      if (en?.name_full) return String(en.name_full);
      if (en?.name) return String(en.name);

      // Try non-localized keys
      if (nj.name_full) return String(nj.name_full);
      if (nj.name) return String(nj.name);
    }

    // 3) last resorts
    if (row?.title) return String(row.title);
    if (row?.label) return String(row.label);

    return null;
  };

  const mapCountryOption = (row) => {
    const id =
      Number(row?.id ?? row?.country_id ?? row?.value ?? row?.code) || null;

    const codePart =
      row?.code ?? row?.iso2 ?? row?.iso ?? row?.country_code ?? null;

    const displayName = extractCountryName(row);

    const label = displayName
      ? codePart
        ? `${displayName} (${String(codePart).toUpperCase()})`
        : displayName
      : codePart
      ? String(codePart).toUpperCase()
      : id != null
      ? `#${id}`
      : "#?";

    // ✅ include `name` so you can use it elsewhere if needed
    return { value: id, label, name: displayName || null, _row: row };
  };

  const mapCityOption = (row) => {
    const id = Number(row?.id ?? row?.city_id ?? row?.value) || null;
    const namePart =
      row?.name ??
      row?.city_name ??
      row?.label ??
      row?.title ??
      row?.display_name ??
      null;
    const extra =
      row?.country_name ??
      row?.country ??
      row?.state ??
      row?.region ??
      row?.code ??
      null;
    const label = namePart
      ? extra
        ? `${String(namePart)} — ${String(extra)}`
        : String(namePart)
      : id != null
      ? `#${id}`
      : "#?";
    return { value: id, label };
  };

  // ---------------- Fetchers ----------------
  async function fetchCountries(search = "") {
    try {
      setIsLoadingCountries(true);
      const res = await apiHandler.get(
        `api/countries?page=1&limit=10&search=${encodeURIComponent(search)}`
      );
      const body = res?.data ?? res;
      const list = body?.data ?? body?.items ?? body?.result ?? body ?? [];
      const opts = (Array.isArray(list) ? list : []).map(mapCountryOption);
      setCountries(opts);

      setCountryLabelCache((prev) => {
        const next = new Map(prev);
        opts.forEach((o) => next.set(String(o.value), o.label));
        return next;
      });
    } catch (e) {
      console.error("Countries fetch failed", e);
      setCountries([]);
    } finally {
      setIsLoadingCountries(false);
    }
  }

  async function fetchCities(search = "") {
    try {
      setIsLoadingCities(true);
      const res = await apiHandler.get(
        `api/cities?page=1&limit=10&search=${encodeURIComponent(search)}`
      );
      const body = res?.data ?? res;
      const list = body?.data ?? body?.items ?? body?.result ?? body ?? [];
      const opts = (Array.isArray(list) ? list : []).map(mapCityOption);
      setCities(opts);

      setCityLabelCache((prev) => {
        const next = new Map(prev);
        opts.forEach((o) => next.set(String(o.value), o.label));
        return next;
      });
    } catch (e) {
      console.error("Cities fetch failed", e);
      setCities([]);
    } finally {
      setIsLoadingCities(false);
    }
  }

  async function fetchFacilities(search = "") {
    try {
      setIsLoadingFacilities(true);
      const response = await apiHandler.get(
        `api/facilities?page=1&limit=10&search=${encodeURIComponent(search)}`
      );
      const body = response?.data ?? response;
      const list =
        body?.data?.items ??
        body?.result?.items ??
        body?.items ??
        body?.data ??
        body ??
        [];
      const opts = (Array.isArray(list) ? list : []).map((f) => ({
        value: String(f.id ?? f.value),
        label: f.name || f.facility_name || f.label || `#${f.id}`,
      }));
      setFacilities(opts);
    } catch (err) {
      console.error("Failed to fetch facilities:", err);
      setFacilities([]);
    } finally {
      setIsLoadingFacilities(false);
    }
  }

  // ---------------- Init & live search ----------------
  useEffect(() => {
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
      setMode(path.includes("View") ? "view" : "edit");
      fetchRecord(id);
    } else {
      setMode("create");
    }

    fetchCountries("");
    fetchCities("");
    fetchFacilities("");
  }, [id, location.pathname]);

  useEffect(() => {
    if (debouncedCountrySearch === "") {
      fetchCountries("");
      return;
    }
    if (debouncedCountrySearch.length < 2) return;
    fetchCountries(debouncedCountrySearch);
  }, [debouncedCountrySearch]);

  useEffect(() => {
    if (debouncedCitySearch === "") {
      fetchCities("");
      return;
    }
    if (debouncedCitySearch.length < 2) return;
    fetchCities(debouncedCitySearch);
  }, [debouncedCitySearch]);

  useEffect(() => {
    if (debouncedFacilitySearch === "") {
      fetchFacilities("");
      return;
    }
    if (debouncedFacilitySearch.length < 2) return;
    fetchFacilities(debouncedFacilitySearch);
  }, [debouncedFacilitySearch]);

  // ---------------- React Hook Form ----------------
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isValid },
    setValue,
    trigger,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: "",
      country_code: "",
      country_id: null,
      city_id: null,
      lattitude: "",
      longitude: "",
      star_rating: "",
      guest_rating: "",
      trip_advisor_rating: "",
      hotel_chain: "",
      address: "",
      description_json: "",
      accomodation_type: "",
      hotel_code: "", // <-- new UI field
      supplier_enum: null, // <-- new UI field
      is_active: true,
      facilities: [], // array of names in form
      images: [],
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const selectedCountryId = watch("country_id");
  useEffect(() => {
    setValue("city_id", null, { shouldValidate: true });
  }, [selectedCountryId]);

  // ---------------- Load existing (edit/view) ----------------
  const fetchRecord = async (rid) => {
    try {
      const res = await apiHandler.get(`/api/hotelContent/${rid}`);
      const body = res?.data ?? res;
      const h =
        body?.data && !Array.isArray(body.data)
          ? body.data
          : body?.result || body;
      const firstMap =
        Array.isArray(h?.mapping_json) && h.mapping_json.length
          ? h.mapping_json[0]
          : null;

      const facilitiesNames = await normalizeFacilitiesToNames(h?.facilities);
      // Remove <p> tags while preserving paragraph breaks
      const stripPTags = (html = "") => {
        // Replace closing+opening </p><p> with double newline
        let out = html.replace(/<\/p>\s*<p>/gi, "\n\n");
        // Remove any remaining single <p> or </p>
        out = out.replace(/<\/?p[^>]*>/gi, "");
        return out.trim();
      };
      // Turn any server shape into a plain string for the form (without <p> tags)
      const extractDescriptionForForm = (desc) => {
        if (!desc) return "";
        if (typeof desc === "string") return stripPTags(desc);

        if (Array.isArray(desc)) {
          // prefer en-US if present
          const en =
            desc.find(
              (o) =>
                String(o?.local || o?.locale || "").toLowerCase() === "en-us"
            ) || desc[0];
          return stripPTags(en?.description || "");
        }

        if (typeof desc === "object") {
          return stripPTags(desc.description || desc["en-US"] || "");
        }

        return "";
      };

      const formData = {
        name: h?.name ?? "",
        country_code: (h?.country_code ?? "").toString().toUpperCase(),
        country_id: h?.country_id ?? null,
        city_id: h?.city_id ?? null,
        lattitude: h?.lattitude ?? h?.latitude ?? "",
        longitude: h?.longitude ?? "",
        star_rating: h?.star_rating ?? "",
        guest_rating: h?.guest_rating ?? "",
        trip_advisor_rating: h?.trip_advisor_rating ?? "",
        hotel_chain: h?.hotel_chain ?? "",
        address: h?.address ?? "",
        accomodation_type: h?.accomodation_type ?? h?.accommodation_type ?? "",
        is_active: Boolean(h?.is_active ?? true),
        facilities: facilitiesNames,
        images: h?.images ?? [], // Ensure this is an array, not a string.
        hotel_code: firstMap?.supplier_id ?? "",
        supplier_enum: firstMap?.supplier_enum ?? null,
        description_json: extractDescriptionForForm(h?.description_json),
      };
      // Update hotel state with fetched images
      setHotel((prev) => ({
        ...prev,
        images: h?.images ?? [], // Set fetched images
      }));

      console.log(formData);

      reset(formData);
      // ensure select shows the label if supplier list not yet fetched
      if (formData.supplier_enum != null) {
        // make sure suppliers are loaded at least once so the label renders
        fetchSuppliers();
      }

      // Ensure facility chips render even if not in current page
      setFacilities((prev) => {
        const byKey = new Map(
          prev.map((o) => [String(o.value) + "|" + String(o.label), o])
        );
        facilitiesNames.forEach((nm) => {
          const key = nm + "|" + nm;
          if (!byKey.has(key)) byKey.set(key, { value: nm, label: nm });
        });
        return Array.from(byKey.values());
      });

      // Resolve and inject selected Country/City options so selects show labels
      const resolvedCountryOpt = await fetchCountryOptionByCode(
        formData.country_code
      );
      if (resolvedCountryOpt) {
        setCountries((prev) => {
          const exists = prev.find(
            (o) => String(o.value) === String(resolvedCountryOpt.value)
          );
          return exists ? prev : [resolvedCountryOpt, ...prev];
        });
        setCountryLabelCache((prev) => {
          const next = new Map(prev);
          next.set(String(resolvedCountryOpt.value), resolvedCountryOpt.label);
          return next;
        });
      }

      const resolvedCityOpt = await fetchCityOptionById(formData.city_id);
      if (resolvedCityOpt) {
        setCities((prev) => upsertOption(prev, resolvedCityOpt));
        setCityLabelCache((prev) => {
          const next = new Map(prev);
          next.set(String(resolvedCityOpt.value), resolvedCityOpt.label);
          return next;
        });
      }

      // Validate and clear errors after values are in place
      setTimeout(() => {
        Object.keys(formData).forEach((k) =>
          setValue(k, formData[k], { shouldValidate: true })
        );
        trigger();
        Object.keys(formData).forEach((k) => clearErrors(k));
      }, 50);
    } catch (e) {
      console.error("Failed to fetch record", e);
      toast.error("Failed to load hotel content");
    }
  };

  // ---------------- Validation ----------------
  const validation = useMemo(
    () => ({
      name: {
        required: { value: true, message: "Hotel name is required" },
        validate: (v) =>
          v?.trim().length < 2 ? "Name must be at least 2 chars" : true,
      },
      hotel_code: {
        validate: () => true,
      },
      supplier_enum: {
        required: { value: true, message: "Supplier is required" },
        validate: (v) =>
          v === null || v === undefined ? "Select a supplier" : true,
      },
      country_code: {
        required: { value: true, message: "Country code is required" },
        validate: (v) =>
          /^[A-Z]{2}$/.test((v || "").toUpperCase())
            ? true
            : "Use 2-letter ISO code, e.g., US",
      },
      country_id: { required: { value: true, message: "Country is required" } },
      city_id: { required: { value: true, message: "City is required" } },
      lattitude: {
        validate: (v) => {
          if (v === "" || v === null || v === undefined) return true;
          const n = parseFloat(v);
          if (Number.isNaN(n)) return "Latitude must be a number";
          if (n < -90 || n > 90) return "Latitude must be between -90 and 90";
          return true;
        },
      },
      longitude: {
        validate: (v) => {
          if (v === "" || v === null || v === undefined) return true;
          const n = parseFloat(v);
          if (Number.isNaN(n)) return "Longitude must be a number";
          if (n < -180 || n > 180)
            return "Longitude must be between -180 and 180";
          return true;
        },
      },
      star_rating: {
        validate: (v) => {
          if (v === "" || v === null || v === undefined) return true;
          const n = Number(v);
          if (Number.isNaN(n)) return "Star rating must be a number";
          if (n < 0 || n > 5) return "Star rating must be 0–5";
          return true;
        },
      },
      guest_rating: {
        validate: (v) => {
          if (v === "" || v === null || v === undefined) return true;
          const n = Number(v);
          if (Number.isNaN(n)) return "Guest rating must be a number";
          if (n < 0 || n > 5) return "Guest rating must be 0–5";
          return true;
        },
      },
      trip_advisor_rating: {
        validate: (v) => {
          if (v === "" || v === null || v === undefined) return true;
          const n = Number(v);
          if (Number.isNaN(n)) return "TripAdvisor rating must be a number";
          if (n < 0 || n > 5) return "TripAdvisor rating must be 0–5";
          return true;
        },
      },
      address: {
        required: { value: true, message: "Address is required" },
        validate: (v) =>
          v?.trim().length < 3 ? "Address must be at least 3 chars" : true,
      },
      description_json: {
        required: { value: true, message: "Description is required" },
        validate: (v) => {
          if (typeof v !== "string") return "Invalid description format";
          if (v.trim().length < 10)
            return "Description must be at least 10 characters long";
          return true;
        },
      },
    }),
    []
  );

  const hasError = (f) => !!errors?.[f];
  const errMsg = (f) => errors?.[f]?.message || "";

  // ---------------- Submit ----------------
  const onSubmit = async (data) => {
    if (mode === "view") return;
    setIsSubmitting(true);
    // Validate image fields if images exist
    if (hotel.images && hotel.images.length) {
      const errs = {};
      hotel.images.forEach((im, i) => {
        const missingType = !im?.image_type || !String(im.image_type).trim();
        const missingCaption =
          !im?.image_caption || !String(im.image_caption).trim();
        if (missingType || missingCaption)
          errs[i] = { image_type: missingType, image_caption: missingCaption };
      });
      if (Object.keys(errs).length) {
        setImageErrors(errs);
        toast.error("Please fill Type and Caption for all images");
        setIsSubmitting(false);
        return;
      }
    }
    setImageErrors({});
    // Use current order for images; first card acts as primary
    const images = hotel.images.map((image, idx) => {
      return {
        ...image, // Keep existing properties of the image
        main_image: idx === 0 ? "Y" : "N", // Set main_image to "Y" for the first image, else "N"
      };
    });
    // build mapping_json with the first record = selected supplier + code
    const mappingFirst = {
      supplier_enum: Number(data.supplier_enum), // from dropdown
      supplier_id: String(data.hotel_code || "").trim(), // hotel code
    };
    // If you later want to keep other existing mappings, you can merge them here.
    // For now we only set the first one as requested:
    const mapping_json = [mappingFirst];
    // Build the array your API uses from the form's string
    const buildDescriptionForSave = (text) => {
      const t = (text || "").trim();
      return t ? [{ local: "en-US", description: t }] : [];
    };

    const payload = {
      name: data.name?.trim(),
      country_code: data.country_code?.trim().toUpperCase(),
      country_id: Number(data.country_id),
      city_id: Number(data.city_id),
      lattitude: data.lattitude === "" ? null : parseFloat(data.lattitude),
      longitude: data.longitude === "" ? null : parseFloat(data.longitude),
      star_rating: data.star_rating === "" ? null : Number(data.star_rating),
      guest_rating: data.guest_rating === "" ? null : Number(data.guest_rating),
      trip_advisor_rating:
        data.trip_advisor_rating === ""
          ? null
          : Number(data.trip_advisor_rating),
      hotel_chain: data.hotel_chain?.trim() || "",
      address: data.address?.trim(),
      description_json: buildDescriptionForSave(data.description_json),
      accomodation_type: data.accomodation_type?.trim() || "",
      is_active: Boolean(data.is_active),
      facilities:
        Array.isArray(data.facilities) && data.facilities.length
          ? data.facilities.join(";")
          : "",
      images: images,
      // 🔹 NEW: send mapping_json to backend
      mapping_json,
    };
    try {
      const resp =
        mode === "create"
          ? await apiHandler.post("/api/hotelContent", payload)
          : await apiHandler.patch(`/api/hotelContent/${id}`, payload);

      const ok =
        resp?.status === 200 ||
        resp?.status === 201 ||
        resp?.data?.status === 200 ||
        resp?.data?.success === true;

      if (ok) {
        toast.success(
          mode === "create" ? "Hotel content created" : "Hotel content updated"
        );
        navigate(
          Constants.URLConstants.MASTERSHOTELSSEARCH || "/mastersHotelsSearch"
        );
      } else {
        toast.error(resp?.data?.message || "Save failed");
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.message ||
          `Failed to ${mode === "create" ? "create" : "update"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  //Hotel Images Mapping
  const [uploading, setUploading] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [primaryIdx, setPrimaryIdx] = useState(null);
  const [hotel, setHotel] = useState({
    images: [],
  });
  const onChange = (path, value) => {
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
  };

  const title =
    mode === "view"
      ? "VIEW HOTEL CONTENT"
      : mode === "edit"
      ? "EDIT HOTEL CONTENT"
      : "Add Hotel Content";

  return (
    <>
      <Header2
        title={title}
        linkText1="Hotels List"
        linkText2={title}
        link1={Constants.URLConstants.MASTERSHOTELSSEARCH}
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
                placeholder="Hotel name"
                readOnly={mode === "view"}
                disabled={mode === "view"}
                maxLength={300}
                {...register("name", validation.name)}
              />
              {hasError("name") && (
                <div className="invalid-feedback d-block">{errMsg("name")}</div>
              )}
            </div>
            <div className="col-md-3 form-group">
              <label className="d-flex justify-content-between align-items-center">
                <span>Hotel Code</span>
                <small className="text-muted fst-italic">Auto-generated</small>
              </label>
              <input
                className={`form-control form-control-sm ${
                  hasError("hotel_code") ? "is-invalid" : ""
                }`}
                type="text"
                placeholder="Will be assigned by backend"
                readOnly
                maxLength={50}
                {...register("hotel_code", validation.hotel_code)}
              />
              {hasError("hotel_code") && (
                <div className="invalid-feedback d-block">
                  {errMsg("hotel_code")}
                </div>
              )}
            </div>
            <div className="col-md-3 form-group">
              <label>
                Description <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control form-control-sm ${
                  hasError("description_json") ? "is-invalid" : ""
                }`}
                type="text"
                placeholder="hotel description"
                readOnly={mode === "view"}
                disabled={mode === "view"}
                {...register("description_json", validation.description_json)}
              />
              {hasError("description_json") && (
                <div className="invalid-feedback d-block">
                  {errMsg("description_json")}
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
                readOnly={mode === "view"}
                disabled={mode === "view"}
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
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-3 form-group">
              <label>
                Country <span className="text-danger">*</span>
              </label>
              <Controller
                name="country_id"
                control={control}
                rules={validation.country_id}
                render={({ field }) => {
                  const selectedId =
                    field.value == null ? null : Number(field.value);
                  const selectedOption =
                    selectedId == null
                      ? null
                      : {
                          value: selectedId,
                          label:
                            countries.find(
                              (o) => Number(o.value) === selectedId
                            )?.label ||
                            countryLabelCache.get(String(selectedId)) ||
                            `#${selectedId}`,
                        };

                  const byId = new Map(
                    countries.map((o) => [String(o.value), o])
                  );
                  if (
                    selectedOption &&
                    !byId.has(String(selectedOption.value))
                  ) {
                    byId.set(String(selectedOption.value), selectedOption);
                  }
                  const mergedOptions = Array.from(byId.values());

                  return (
                    <MultiSelect
                      isSearchable
                      isClearable
                      classNamePrefix="react-select"
                      options={mergedOptions}
                      isDisabled={mode === "view" || isLoadingCountries}
                      isLoading={isLoadingCountries}
                      menuIsOpen={countryMenuShouldBeOpen}
                      onMenuOpen={() => {
                        setCountryMenuOpen(true);
                        if (!countries.length) fetchCountries("");
                      }}
                      onMenuClose={() => {
                        if (!isLoadingCountries && !countrySearch) {
                          setCountryMenuOpen(false);
                        }
                      }}
                      onFocus={() => setCountryMenuOpen(true)}
                      placeholder={
                        isLoadingCountries
                          ? "Loading countries..."
                          : "- Select Country -"
                      }
                      inputValue={countrySearch}
                      onInputChange={(val, action) => {
                        if (action?.action === "input-change") {
                          setCountrySearch(val || "");
                          setCountryMenuOpen(true);
                        }
                        return val;
                      }}
                      filterOption={() => true}
                      value={selectedOption}
                      onChange={(opt) => {
                        const newId = opt ? Number(opt.value) : null;
                        if (opt) {
                          setCountryLabelCache((prev) => {
                            const next = new Map(prev);
                            next.set(String(newId), opt.label);
                            return next;
                          });
                        }
                        field.onChange(newId);
                        setCountrySearch("");
                        setCountryMenuOpen(false);
                      }}
                      blurInputOnSelect={true}
                      closeMenuOnSelect={true}
                      hideSelectedOptions={false}
                      noOptionsMessage={() => {
                        if (isLoadingCountries) return "Searching...";
                        if (countrySearch && countrySearch.length < 2)
                          return "Type at least 2 characters…";
                        return "No countries found";
                      }}
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                    />
                  );
                }}
              />
              {hasError("country_id") && (
                <small className="text-danger d-block">
                  {errMsg("country_id")}
                </small>
              )}
            </div>

            <div className="col-md-3 form-group">
              <label>
                City <span className="text-danger">*</span>
              </label>
              <Controller
                name="city_id"
                control={control}
                rules={validation.city_id}
                render={({ field }) => {
                  const selectedId =
                    field.value == null ? null : Number(field.value);
                  const selectedOption =
                    selectedId == null
                      ? null
                      : {
                          value: selectedId,
                          label:
                            cities.find((o) => Number(o.value) === selectedId)
                              ?.label ||
                            cityLabelCache.get(String(selectedId)) ||
                            `#${selectedId}`,
                        };

                  const byId = new Map(cities.map((o) => [String(o.value), o]));
                  if (
                    selectedOption &&
                    !byId.has(String(selectedOption.value))
                  ) {
                    byId.set(String(selectedOption.value), selectedOption);
                  }
                  const mergedOptions = Array.from(byId.values());

                  return (
                    <MultiSelect
                      isSearchable
                      isClearable
                      classNamePrefix="react-select"
                      options={mergedOptions}
                      isDisabled={mode === "view" || isLoadingCities}
                      isLoading={isLoadingCities}
                      menuIsOpen={cityMenuShouldBeOpen}
                      onMenuOpen={() => {
                        setCityMenuOpen(true);
                        if (!cities.length) fetchCities("");
                      }}
                      onMenuClose={() => {
                        if (!isLoadingCities && !citySearch)
                          setCityMenuOpen(false);
                      }}
                      onFocus={() => setCityMenuOpen(true)}
                      placeholder={
                        isLoadingCities
                          ? "Loading cities..."
                          : "- Select City -"
                      }
                      inputValue={citySearch}
                      onInputChange={(val, action) => {
                        if (action?.action === "input-change") {
                          setCitySearch(val || "");
                          setCityMenuOpen(true);
                        }
                        return val;
                      }}
                      filterOption={() => true}
                      value={selectedOption}
                      onChange={(opt) => {
                        const newId = opt ? Number(opt.value) : null;
                        if (opt) {
                          setCityLabelCache((prev) => {
                            const next = new Map(prev);
                            next.set(String(newId), opt.label);
                            return next;
                          });
                        }
                        field.onChange(newId);
                        setCitySearch("");
                        setCityMenuOpen(false);
                      }}
                      blurInputOnSelect={true}
                      closeMenuOnSelect={true}
                      hideSelectedOptions={false}
                      noOptionsMessage={() => {
                        if (isLoadingCities) return "Searching...";
                        if (citySearch && citySearch.length < 2)
                          return "Type at least 2 characters…";
                        return "No cities found";
                      }}
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                    />
                  );
                }}
              />
              {hasError("city_id") && (
                <small className="text-danger d-block">
                  {errMsg("city_id")}
                </small>
              )}
            </div>
            <div className="col-md-3 form-group">
              <label>
                Supplier <span className="text-danger">*</span>
              </label>
              <Controller
                name="supplier_enum"
                control={control}
                rules={validation.supplier_enum}
                render={({ field }) => {
                  const selectedVal =
                    field.value == null ? null : Number(field.value);
                  const selectedOption =
                    selectedVal == null
                      ? null
                      : suppliers.find(
                          (o) => Number(o.value) === selectedVal
                        ) || {
                          value: selectedVal,
                          label: `#${selectedVal}`,
                        };

                  return (
                    <MultiSelect
                      isSearchable={false}
                      isClearable
                      classNamePrefix="react-select"
                      options={suppliers}
                      isDisabled={mode === "view" || isLoadingSuppliers}
                      isLoading={isLoadingSuppliers}
                      menuIsOpen={supplierMenuOpen}
                      onMenuOpen={() => {
                        setSupplierMenuOpen(true);
                        fetchSuppliers(); // 🔹 fetch on open
                      }}
                      onMenuClose={() => setSupplierMenuOpen(false)}
                      placeholder={
                        isLoadingSuppliers
                          ? "Loading suppliers..."
                          : "- Select Supplier -"
                      }
                      value={selectedOption}
                      onChange={(opt) => {
                        const newVal = opt ? Number(opt.value) : null;
                        field.onChange(newVal);
                        setSupplierMenuOpen(false);
                      }}
                      blurInputOnSelect
                      closeMenuOnSelect
                      hideSelectedOptions={false}
                      noOptionsMessage={() =>
                        isLoadingSuppliers ? "Loading..." : "No suppliers found"
                      }
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                    />
                  );
                }}
              />
              {hasError("supplier_enum") && (
                <small className="text-danger d-block">
                  {errMsg("supplier_enum")}
                </small>
              )}
            </div>
            <div className="col-md-3 form-group">
              <label>Facilities</label>
              <Controller
                name="facilities" // array of names
                control={control}
                render={({ field }) => {
                  const selectedNames = (field.value || []).map((s) =>
                    String(s)
                  );
                  const selectedOptions = selectedNames.map((name) => {
                    const pageOpt = facilities.find(
                      (o) =>
                        String(o.label).toLowerCase() === name.toLowerCase()
                    );
                    return pageOpt || { value: name, label: name };
                  });
                  const byId = new Map(
                    facilities.map((o) => [
                      String(o.value) + "|" + String(o.label),
                      o,
                    ])
                  );
                  selectedOptions.forEach((o) => {
                    const key = String(o.value) + "|" + String(o.label);
                    if (!byId.has(key)) byId.set(key, o);
                  });
                  const mergedOptions = Array.from(byId.values());

                  return (
                    <MultiSelect
                      isMulti
                      isSearchable
                      classNamePrefix="react-select"
                      options={mergedOptions}
                      isDisabled={mode === "view" || isLoadingFacilities}
                      isLoading={isLoadingFacilities}
                      menuIsOpen={facilitiesMenuShouldBeOpen}
                      onMenuOpen={() => {
                        setFacilitiesMenuOpen(true);
                        if (!facilities.length) fetchFacilities("");
                      }}
                      onMenuClose={() => {
                        if (!isLoadingFacilities && !facilitySearch) {
                          setFacilitiesMenuOpen(false);
                        }
                      }}
                      onFocus={() => setFacilitiesMenuOpen(true)}
                      placeholder={
                        isLoadingFacilities
                          ? "Loading facilities..."
                          : "- Select facilities -"
                      }
                      inputValue={facilitySearch}
                      onInputChange={(val, action) => {
                        if (action?.action === "input-change") {
                          setFacilitySearch(val || "");
                          setFacilitiesMenuOpen(true);
                        }
                        return val;
                      }}
                      value={selectedOptions}
                      onChange={(selected) => {
                        const nextNames = Array.from(
                          new Set(
                            (selected || []).map((s) => String(s.label).trim())
                          )
                        );
                        field.onChange(nextNames);
                        setFacilitySearch("");
                        setFacilitiesMenuOpen(true);
                      }}
                      blurInputOnSelect={false}
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      noOptionsMessage={() => {
                        if (isLoadingFacilities) return "Searching...";
                        if (facilitySearch && facilitySearch.length < 2)
                          return "Type at least 2 characters…";
                        return "No facilities found";
                      }}
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                    />
                  );
                }}
              />
              <small className="form-text text-muted">
                Will be saved as a ';' separated string of names.
              </small>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-3 form-group">
              <label>Latitude</label>
              <input
                className={`form-control form-control-sm ${
                  hasError("lattitude") ? "is-invalid" : ""
                }`}
                type="number"
                step="any"
                placeholder="0.0000"
                readOnly={mode === "view"}
                disabled={mode === "view"}
                {...register("lattitude", validation.lattitude)}
              />
              {hasError("lattitude") && (
                <div className="invalid-feedback d-block">
                  {errMsg("lattitude")}
                </div>
              )}
            </div>
            <div className="col-md-3 form-group">
              <label>Longitude</label>
              <input
                className={`form-control form-control-sm ${
                  hasError("longitude") ? "is-invalid" : ""
                }`}
                type="number"
                step="any"
                placeholder="0.0000"
                readOnly={mode === "view"}
                disabled={mode === "view"}
                {...register("longitude", validation.longitude)}
              />
              {hasError("longitude") && (
                <div className="invalid-feedback d-block">
                  {errMsg("longitude")}
                </div>
              )}
            </div>
            <div className="col-md-3 form-group">
              <label>Star Rating (0–5)</label>
              <input
                className={`form-control form-control-sm ${
                  hasError("star_rating") ? "is-invalid" : ""
                }`}
                type="number"
                step="1"
                min={0}
                max={5}
                readOnly={mode === "view"}
                disabled={mode === "view"}
                {...register("star_rating", validation.star_rating)}
              />
              {hasError("star_rating") && (
                <div className="invalid-feedback d-block">
                  {errMsg("star_rating")}
                </div>
              )}
            </div>
            <div className="col-md-3 form-group">
              <label>Guest Rating (0–5)</label>
              <input
                className={`form-control form-control-sm ${
                  hasError("guest_rating") ? "is-invalid" : ""
                }`}
                type="number"
                step="1"
                min={0}
                max={5}
                readOnly={mode === "view"}
                disabled={mode === "view"}
                {...register("guest_rating", validation.guest_rating)}
              />
              {hasError("guest_rating") && (
                <div className="invalid-feedback d-block">
                  {errMsg("guest_rating")}
                </div>
              )}
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-3 form-group">
              <label>TripAdvisor Rating (0–5)</label>
              <input
                className={`form-control form-control-sm ${
                  hasError("trip_advisor_rating") ? "is-invalid" : ""
                }`}
                type="number"
                step="1"
                min={0}
                max={5}
                readOnly={mode === "view"}
                disabled={mode === "view"}
                {...register(
                  "trip_advisor_rating",
                  validation.trip_advisor_rating
                )}
              />
              {hasError("trip_advisor_rating") && (
                <div className="invalid-feedback d-block">
                  {errMsg("trip_advisor_rating")}
                </div>
              )}
            </div>
            <div className="col-md-3 form-group">
              <label>Hotel Chain</label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="e.g., Shariah Hotels"
                readOnly={mode === "view"}
                disabled={mode === "view"}
                {...register("hotel_chain")}
              />
            </div>
            <div className="col-md-3 form-group">
              <label>Accommodation Type</label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="e.g., Resort / Hotel / Apartment"
                readOnly={mode === "view"}
                disabled={mode === "view"}
                {...register("accomodation_type")}
              />
            </div>
            <div className="col-md-3 form-group d-flex align-items-center">
              <div className="form-check mt-4">
                <Controller
                  name="is_active"
                  control={control}
                  render={({ field }) => (
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_active"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      disabled={mode === "view"}
                    />
                  )}
                />
                <label className="form-check-label ms-2" htmlFor="is_active">
                  Is Active
                </label>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-3 form-group">
              <label>
                Address <span className="text-danger">*</span>
              </label>
              <textarea
                className={`form-control form-control-sm ${
                  hasError("address") ? "is-invalid" : ""
                }`}
                rows={3}
                readOnly={mode === "view"}
                disabled={mode === "view"}
                {...register("address", validation.address)}
              />
              {hasError("address") && (
                <div className="invalid-feedback d-block">
                  {errMsg("address")}
                </div>
              )}
            </div>
          </div>
          <hr />
          <div className="form-group mt-2">
            <h5>Images</h5>
          </div>

          {mode !== "view" && (
            <div className="row">
              <ImageUploader
                onFilesSelected={async (files) => {
                  if (!files?.length) return;
                  setUploading(true);
                  try {
                    for (const f of files) {
                      const resp = await uploadFileMasterContentHotel(f);
                      if (resp?.success) {
                        setHotel((p) => ({
                          ...p,
                          images: [
                            ...p.images,
                            {
                              image_url: resp.imagelink,
                              image_type: "",
                              image_caption: "",
                            },
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
                    <div className="input-group input-group-sm mb-2">
                      <span className="input-group-text">Type</span>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="e.g., exterior"
                        value={hotel._newImageType || ""}
                        onChange={(e) =>
                          onChange("_newImageType", e.target.value)
                        }
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
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        if (hotel._newImageUrl) {
                          setHotel((p) => ({
                            ...p,
                            images: [
                              ...p.images,
                              {
                                image_url: p._newImageUrl,
                                image_type: p._newImageType || "",
                                image_caption: p._newImageCaption || "",
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
                        e.preventDefault();
                        if (dragOverIndex !== idx) setDragOverIndex(idx);
                      }}
                      onDrop={(e) => {
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
                            primaryIdx === idx
                              ? "2px solid #111"
                              : dragOverIndex === idx
                              ? "2px dashed #94a3b8"
                              : "1px solid #e5e7eb",
                          borderRadius: 10,
                          overflow: "hidden",
                        }}
                        draggable={mode !== "view"} // Disable dragging in view mode
                        onDragStart={() => setDragIndex(idx)}
                        onDragEnd={() => {
                          setDragIndex(null);
                          setDragOverIndex(null);
                        }}
                      >
                        {/* Top utility bar with filename and quick actions */}
                        <div
                          className="d-flex align-items-center justify-content-between px-2 py-1"
                          style={{
                            background: "#f1f5f9",
                            borderBottom: "1px solid #e5e7eb",
                          }}
                        >
                          <div
                            className="text-truncate"
                            style={{
                              maxWidth: "70%",
                              fontSize: 12,
                              color: "#334155",
                            }}
                            title={im.image_url}
                          >
                            {String(im.image_url || "")
                              .split("/")
                              .pop()}
                          </div>
                          <div className="btn-group btn-group-sm">
                            <a
                              className="btn btn-outline-secondary btn-sm"
                              href={im.image_url}
                              target="_blank"
                              rel="noreferrer"
                              title="Open in new tab"
                              style={{ border: "1px solid #e5e7eb" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                            </a>
                            <button
                              type="button"
                              className="btn btn-light"
                              style={{ border: "1px solid #e5e7eb" }}
                              title="Copy URL"
                              onClick={async () => {
                                try {
                                  await navigator.clipboard.writeText(
                                    im.image_url
                                  );
                                  toast.success("URL copied");
                                } catch (e) {
                                  console.log(e);
                                }
                              }}
                            >
                              <i className="fa fa-clipboard" />
                            </button>
                          </div>
                        </div>
                        {idx === 0 && (
                          <span
                            className="badge bg-dark position-absolute"
                            style={{ top: 8, left: 8, zIndex: 2 }}
                          >
                            Primary
                          </span>
                        )}
                        <div
                          className="position-absolute"
                          style={{ top: 8, right: 8, zIndex: 2 }}
                        >
                          <div className="btn-group">
                            {/* Delete Button Disabled in View Mode */}
                            {mode !== "view" && (
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
                            )}
                          </div>
                        </div>
                        <img
                          src={im.image_url}
                          alt={im.image_caption || "image"}
                          className="card-img-top"
                          style={{ height: 220, objectFit: "cover" }}
                        />
                        <div
                          className="card-body"
                          style={{ background: "#fafafa" }}
                        >
                          <div className="row g-2">
                            <div className="col-12">
                              <div className="input-group input-group-sm">
                                <span
                                  className="input-group-text"
                                  style={{ minWidth: 60 }}
                                >
                                  Type
                                </span>
                                {/* Disabled in View Mode */}
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={im.image_type}
                                  onChange={(e) => {
                                    if (mode !== "view") {
                                      const next = [...hotel.images];
                                      next[idx] = {
                                        ...next[idx],
                                        image_type: e.target.value,
                                      };
                                      setHotel((p) => ({ ...p, images: next }));
                                    }
                                  }}
                                  readOnly={mode === "view"} // Disable editing in view mode
                                />
                                {imageErrors[idx]?.image_type && (
                                  <div className="invalid-feedback d-block">
                                    Type is required
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="input-group input-group-sm">
                                <span
                                  className="input-group-text"
                                  style={{ minWidth: 60 }}
                                >
                                  Caption
                                </span>
                                {/* Disabled in View Mode */}
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={im.image_caption}
                                  onChange={(e) => {
                                    if (mode !== "view") {
                                      const next = [...hotel.images];
                                      next[idx] = {
                                        ...next[idx],
                                        image_caption: e.target.value,
                                      };
                                      setHotel((p) => ({ ...p, images: next }));
                                    }
                                  }}
                                  readOnly={mode === "view"} // Disable editing in view mode
                                />
                                {imageErrors[idx]?.image_caption && (
                                  <div className="invalid-feedback d-block">
                                    Caption is required
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-12 d-flex align-items-center justify-content-end mt-1">
                              <span
                                className="text-muted"
                                style={{ fontSize: 12 }}
                              >
                                #{idx + 1}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-end mt-2">
                  {!!hotel.images.length && mode !== "view" && (
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        setHotel((p) => ({ ...p, images: [] }));
                        setPrimaryIdx(null);
                      }}
                    >
                      Remove All
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : null}

          {mode !== "view" ? (
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
                    Constants.URLConstants.MASTERSHOTELSSEARCH ||
                      "/mastersHotelsSearch"
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
                onClick={() => navigate(`/MastersHotelsEdit/${id}`)}
              >
                <i className="fa fa-edit" /> Edit
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  navigate(
                    Constants.URLConstants.MASTERSHOTELSSEARCH ||
                      "/mastersHotelsSearch"
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

export default HotelContentForm;
function ImageUploader({ onFilesSelected, uploading }) {
  const inputRef = useRef(null);
  const onPick = () => inputRef.current && inputRef.current.click();
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
              cursor: "pointer",
            }}
            onClick={onPick}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const files = Array.from(e.dataTransfer.files || []).filter((f) =>
                f.image_type.startsWith("image/")
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
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              onFilesSelected && onFilesSelected(files);
              e.target.value = null;
            }}
          />
          {uploading && <div style={{ marginTop: 6 }}>Uploading...</div>}
        </div>
      </div>
    </div>
  );
}
// {hotel.images.length ? (
//   <div className="row">
//     <div className="col-md-12">
//       <div className="row">
//         {hotel.images.map((im, idx) => (
//           <div
//             className="col-md-3 form-group"
//             key={idx}
//             onDragOver={(e) => {
//               e.preventDefault();
//               if (dragOverIndex !== idx) setDragOverIndex(idx);
//             }}
//             onDrop={(e) => {
//               e.preventDefault();
//               if (dragIndex === null || dragIndex === idx) {
//                 setDragIndex(null);
//                 setDragOverIndex(null);
//                 return;
//               }
//               const next = [...hotel.images];
//               const [moved] = next.splice(dragIndex, 1);
//               next.splice(idx, 0, moved);
//               setHotel((p) => ({ ...p, images: next }));
//               // primary is implicit (index 0)
//               setDragIndex(null);
//               setDragOverIndex(null);
//             }}
//           >
//             <div
//               className="card shadow-sm position-relative"
//               style={{
//                 border:
//                   primaryIdx === idx
//                     ? "2px solid #111"
//                     : dragOverIndex === idx
//                     ? "2px dashed #94a3b8"
//                     : "1px solid #e5e7eb",
//                 borderRadius: 10,
//                 overflow: "hidden",
//               }}
//               draggable
//               onDragStart={() => setDragIndex(idx)}
//               onDragEnd={() => {
//                 setDragIndex(null);
//                 setDragOverIndex(null);
//               }}
//             >
//               {/* Top utility bar with filename and quick actions */}
//               <div
//                 className="d-flex align-items-center justify-content-between px-2 py-1"
//                 style={{
//                   background: "#f1f5f9",
//                   borderBottom: "1px solid #e5e7eb",
//                 }}
//               >
//                 <div
//                   className="text-truncate"
//                   style={{
//                     maxWidth: "70%",
//                     fontSize: 12,
//                     color: "#334155",
//                   }}
//                   title={im.image_url}
//                 >
//                   {String(im.image_url || "")
//                     .split("/")
//                     .pop()}
//                 </div>
//                 <div className="btn-group btn-group-sm">
//                   <a
//                     className="btn btn-outline-secondary btn-sm"
//                     href={im.image_url}
//                     target="_blank"
//                     rel="noreferrer"
//                     title="Open in new tab"
//                     style={{ border: "1px solid #e5e7eb" }}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="12"
//                       height="12"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
//                       <polyline points="15 3 21 3 21 9" />
//                       <line x1="10" y1="14" x2="21" y2="3" />
//                     </svg>
//                   </a>
//                   <button
//                     type="button"
//                     className="btn btn-light"
//                     style={{ border: "1px solid #e5e7eb" }}
//                     title="Copy URL"
//                     onClick={async () => {
//                       try {
//                         await navigator.clipboard.writeText(
//                           im.image_url
//                         );
//                         toast.success("URL copied");
//                       } catch (e) {
//                         console.log(e);

//                         /* noop */
//                       }
//                     }}
//                   >
//                     <i className="fa fa-clipboard" />
//                   </button>
//                 </div>
//               </div>
//               {idx === 0 && (
//                 <span
//                   className="badge bg-dark position-absolute"
//                   style={{ top: 8, left: 8, zIndex: 2 }}
//                 >
//                   Primary
//                 </span>
//               )}
//               <div
//                 className="position-absolute"
//                 style={{ top: 8, right: 8, zIndex: 2 }}
//               >
//                 <div className="btn-group">
//                   <button
//                     type="button"
//                     className="btn btn-danger btn-sm"
//                     title="Remove image"
//                     onClick={() => {
//                       const next = hotel.images.filter(
//                         (_, i) => i !== idx
//                       );
//                       setHotel((p) => ({ ...p, images: next }));
//                       // primary remains index 0 by order
//                     }}
//                   >
//                     <i className="fa fa-trash"></i>
//                   </button>
//                 </div>
//               </div>
//               <img
//                 src={im.image_url}
//                 alt={im.image_caption || "image"}
//                 className="card-img-top"
//                 style={{ height: 220, objectFit: "cover" }}
//               />
//               <div
//                 className="card-body"
//                 style={{ background: "#fafafa" }}
//               >
//                 <div className="row g-2">
//                   <div className="col-12">
//                     <div className="input-group input-group-sm">
//                       <span
//                         className="input-group-text"
//                         style={{ minWidth: 60 }}
//                       >
//                         Type
//                       </span>
//                       <input
//                         type="text"
//                         className={`form-control form-control-sm ${
//                           imageErrors[idx]?.image_type
//                             ? "is-invalid"
//                             : ""
//                         }`}
//                         placeholder="e.g., exterior"
//                         value={im.image_type}
//                         onChange={(e) => {
//                           const next = [...hotel.images];
//                           next[idx] = {
//                             ...next[idx],
//                             image_type: e.target.value,
//                           };
//                           setHotel((p) => ({ ...p, images: next }));
//                           setImageErrors((prev) => ({
//                             ...prev,
//                             [idx]: {
//                               ...(prev[idx] || {}),
//                               image_type: false,
//                             },
//                           }));
//                         }}
//                       />
//                       {imageErrors[idx]?.image_type ? (
//                         <div className="invalid-feedback d-block">
//                           Type is required
//                         </div>
//                       ) : null}
//                     </div>
//                   </div>
//                   <div className="col-12">
//                     <div className="input-group input-group-sm">
//                       <span
//                         className="input-group-text"
//                         style={{ minWidth: 60 }}
//                       >
//                         Caption
//                       </span>
//                       <input
//                         type="text"
//                         className={`form-control form-control-sm ${
//                           imageErrors[idx]?.image_caption
//                             ? "is-invalid"
//                             : ""
//                         }`}
//                         placeholder="e.g., Front view"
//                         value={im.image_caption}
//                         onChange={(e) => {
//                           const next = [...hotel.images];
//                           next[idx] = {
//                             ...next[idx],
//                             image_caption: e.target.value,
//                           };
//                           setHotel((p) => ({ ...p, images: next }));
//                           setImageErrors((prev) => ({
//                             ...prev,
//                             [idx]: {
//                               ...(prev[idx] || {}),
//                               image_caption: false,
//                             },
//                           }));
//                         }}
//                       />
//                       {imageErrors[idx]?.image_caption ? (
//                         <div className="invalid-feedback d-block">
//                           Caption is required
//                         </div>
//                       ) : null}
//                     </div>
//                   </div>
//                   <div className="col-12 d-flex align-items-center justify-content-end mt-1">
//                     <span
//                       className="text-muted"
//                       style={{ fontSize: 12 }}
//                     >
//                       #{idx + 1}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="d-flex justify-content-end mt-2">
//         {!!hotel.images.length && (
//           <button
//             type="button"
//             className="btn btn-outline-danger btn-sm"
//             onClick={() => {
//               setHotel((p) => ({ ...p, images: [] }));
//               setPrimaryIdx(null);
//             }}
//           >
//             Remove All
//           </button>
//         )}
//       </div>
//     </div>
//   </div>
// ) : null}
