import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import TimezoneSelect from "react-timezone-select";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import uploadFileExtranet from "../../constants/filesuploaderExtranet";
import { apiHandler } from "../../Apis/backOfficeApiHandler";
import MultiSelect from "../reactMultiSelect";
import LookupSelectWithManage from "../lookups/LookupSelectWithManage";
import {
  createHotel,
  listLookups,
  createLookup,
  getHotel,
  updateHotel,
} from "../../Apis/hotelExtranetApi";
import { Loader } from "@googlemaps/js-api-loader";
import HotelProfileWizardProgress from "../hotelWizard/HotelProfileWizardProgress";
import {
  ensureWizardActive,
  getNextWizardStep,
  getWizardStepRef,
  markStepComplete,
  resetWizardState,
  setWizardEditStep,
  setWizardStepRef,
  updateWizardState,
  wouldCompleteAllBlockers,
} from "../hotelWizard/hotelProfileWizardUtils";
import useWizardMode from "../hotelWizard/useWizardMode";
import WizardModeChrome from "../hotelWizard/WizardModeChrome";
import useWizardBackNavigation from "../hotelWizard/useWizardBackNavigation";

const initialHotel = {
  hotel_code: "",
  display_name: "",
  legal_name: "",
  brand: "",
  chain: null,
  star_rating: 3,
  address: {
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  },
  geo: { lat: "", lng: "" },
  timezone: "",
  contacts: [{ type: "sales", email: "", phone: "" }],
  email: "",
  phone: "",
  website: "",
  amenities: [],
  facilities: [],
  policies: { checkin: "", checkout: "" },
  images: [],
  status: "draft",
  languages: [],
};

const normalizeHotelResponse = (api) => {
  if (!api) return initialHotel;
  const display_name = api.display_name || api.displayName || api.name || "";
  const hotel_code = api.hotel_code || api.code || "";
  const legal_name = api.legal_name || api.legalName || "";
  const brand = api.brand || "";
  const chain = api.chain ?? null;
  const star_rating = api.star_rating ?? api.starRating ?? 0;
  const email = api.email || "";
  const phone = api.phone || "";
  const website = api.website || "";
  const timezone = api.timezone || "";
  const addressLine =
    typeof api.address === "string" ? api.address : api.address?.line1 || "";
  const addressLine2 =
    typeof api.address === "string"
      ? ""
      : api.address?.line2 || api.address2 || "";
  const city = api.city || api.address?.city || "";
  const state = api.address?.state || api.state || "";
  const postalCode = api.address?.postal_code || api.postal_code || "";
  const country = api.country || api.address?.country || "";
  const geo = api.geo || { lat: "", lng: "" };
  const contacts = Array.isArray(api.contacts)
    ? api.contacts
    : [{ type: "sales", email: "", phone: "" }];
  const amenities = Array.isArray(api.amenities) ? api.amenities : [];
  const facilities = Array.isArray(api.facilities) ? api.facilities : [];
  const languages = Array.isArray(api.languages) ? api.languages : [];
  const status = api.status || "draft";
  const policies = api.policies || {
    checkin: api.checkin || "",
    checkout: api.checkout || "",
  };
  const images = Array.isArray(api.images) ? api.images : [];
  return {
    hotel_code,
    display_name,
    legal_name,
    brand,
    chain,
    star_rating,
    address: {
      line1: addressLine,
      line2: addressLine2,
      city,
      state,
      postal_code: postalCode,
      country,
    },
    geo: { lat: geo?.lat ?? "", lng: geo?.lng ?? "" },
    timezone,
    contacts,
    email,
    phone,
    website,
    amenities,
    facilities,
    policies,
    images,
    status,
    languages,
  };
};

export default function HotelExtranetAddHotel({ setShowHeaderAndMenuBar }) {
  const PRIMARY_COLOR = "#FF5015";
  const { isWizardMode, toggleMode, searchParams, location, navigate } =
    useWizardMode();
  const { canGoBack, handleBack } = useWizardBackNavigation("hotel", {
    location,
    navigate,
  });
  const [saveIntent, setSaveIntent] = useState("save");
  const submitIntentRef = useRef("save");
  const setSubmitIntent = (intent) => {
    submitIntentRef.current = intent;
    setSaveIntent(intent);
  };
  const [hotel, setHotel] = useState(initialHotel);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const [dedupe, setDedupe] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [primaryIdx, setPrimaryIdx] = useState(null);
  const [newAmenity, setNewAmenity] = useState("");
  const [newFacility, setNewFacility] = useState("");
  const [errors, setErrors] = useState({});
  const fieldRefs = useRef({});
  const registerField = (key) => (el) => {
    if (el) {
      fieldRefs.current[key] = el;
    }
  };
  const focusField = (key) => {
    const el = fieldRefs.current[key];
    if (!el) return;
    const element = el.nodeType === 1 ? el : el.current;
    if (!element) return;
    const focusable =
      element.querySelector?.("input,textarea,select") || element;
    if (focusable && typeof focusable.focus === "function") {
      focusable.focus();
      if (focusable.scrollIntoView) {
        focusable.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else if (element.scrollIntoView) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const pickAddressComponent = (components = [], ...types) =>
    components.find((component) =>
      types.some((type) => component.types.includes(type))
    );

  const [mapsInstance, setMapsInstance] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const mapPreviewRef = useRef(null);
  const mapsLoadPromiseRef = useRef(null);

  const extractAddressFromPlace = (place) => {
    const components = place?.address_components || [];
    const streetNumber =
      pickAddressComponent(components, "street_number")?.long_name || "";
    const route = pickAddressComponent(components, "route")?.long_name || "";
    const locality =
      pickAddressComponent(components, "locality")?.long_name ||
      pickAddressComponent(components, "postal_town")?.long_name ||
      "";
    const adminLevel1 = pickAddressComponent(
      components,
      "administrative_area_level_1"
    );
    const postalCode =
      pickAddressComponent(components, "postal_code")?.long_name || "";
    const countryComponent = pickAddressComponent(components, "country");

    return {
      line1: [streetNumber, route].filter(Boolean).join(" ").trim(),
      city: locality,
      state: adminLevel1?.short_name || adminLevel1?.long_name || "",
      postal_code: postalCode,
      country:
        countryComponent?.short_name || countryComponent?.long_name || "",
    };
  };

  const getLatLngLiteral = (location) => {
    if (!location) return null;
    const lat =
      typeof location.lat === "function" ? location.lat() : location.lat;
    const lng =
      typeof location.lng === "function" ? location.lng() : location.lng;
    if (typeof lat !== "number" || typeof lng !== "number") return null;
    return { lat, lng };
  };

  const extractPlacePhotos = (photos = []) =>
    (photos || [])
      .slice(0, 20)
      .map((photo) => {
        try {
          const url = photo.getUrl({ maxWidth: 640, maxHeight: 480 });
          return {
            url,
            attribution: photo.html_attributions?.[0] || "",
          };
        } catch (_) {
          return null;
        }
      })
      .filter(Boolean);

  const RatingStars = ({ value = 0 }) => {
    const clamped = Math.max(0, Math.min(5, value));
    const pct = `${(clamped / 5) * 100}%`;
    return (
      <span className="rating-stars d-inline-flex align-items-center gap-2">
        <span className="rating-stars-track">
          {[...Array(5)].map((_, idx) => (
            <i key={`base-${idx}`} className="fa fa-star-o" aria-hidden />
          ))}
          <span className="rating-stars-fill" style={{ width: pct }}>
            {[...Array(5)].map((_, idx) => (
              <i key={`fill-${idx}`} className="fa fa-star" aria-hidden />
            ))}
          </span>
        </span>
        <span className="text-muted" style={{ fontSize: 13 }}>
          {Number.isFinite(clamped) ? clamped.toFixed(1) : clamped}
        </span>
      </span>
    );
  };

  const ensureMaps = () => {
    const key = import.meta.env.VITE_GMAPS_KEY || window.__GMAPS_KEY;
    if (!key) {
      setPlaceError("Google Maps key is missing. Set VITE_GMAPS_KEY.");
      return Promise.resolve(null);
    }
    if (mapsInstance) return Promise.resolve(mapsInstance);
    if (mapsLoadPromiseRef.current) return mapsLoadPromiseRef.current;
    const loader = new Loader({
      apiKey: key,
      libraries: ["places"],
      version: "weekly",
    });
    const promise = loader
      .load()
      .then((google) => {
        setMapsInstance(google);
        return google;
      })
      .catch((err) => {
        console.error("Failed to load Google Maps", err);
        setPlaceError("Failed to load Google Maps.");
        return null;
      })
      .finally(() => {
        mapsLoadPromiseRef.current = null;
      });
    mapsLoadPromiseRef.current = promise;
    return promise;
  };

  const getPlacesService = async () => {
    const google = await ensureMaps();
    if (!google) return null;
    if (placesService) return placesService;
    const mapDiv = document.createElement("div");
    const map = new google.maps.Map(mapDiv);
    const service = new google.maps.places.PlacesService(map);
    setPlacesService(service);
    return service;
  };

  const fetchPlaceSuggestions = async (value) => {
    const google = await ensureMaps();
    if (!google) return;
    const sessionToken =
      placeSessionTokenRef.current ||
      new google.maps.places.AutocompleteSessionToken();
    if (!placeSessionTokenRef.current) {
      placeSessionTokenRef.current = sessionToken;
    }
    setPlaceSearchLoading(true);
    setPlaceError(null);
    const autoService = new google.maps.places.AutocompleteService();
    autoService.getPlacePredictions(
      {
        input: value,
        types: ["establishment"],
        sessionToken,
      },
      (predictions, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          predictions?.length
        ) {
          setPlaceSuggestions(predictions);
          setShowPlaceSuggestions(true);
        } else if (
          status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS
        ) {
          setPlaceSuggestions([]);
          setShowPlaceSuggestions(false);
        } else {
          console.error("Google Autocomplete error:", status);
          setPlaceError("Unable to fetch suggestions. Please try again.");
        }
        setPlaceSearchLoading(false);
      }
    );
  };

  const handlePlaceQueryInput = (value) => {
    setPlaceQuery(value);
    setPlaceError(null);
    if (placeSearchDebounceRef.current) {
      clearTimeout(placeSearchDebounceRef.current);
    }
    const trimmed = value?.trim();
    if (!trimmed) {
      setPlaceSuggestions([]);
      setShowPlaceSuggestions(false);
      return;
    }
    const queryForPlaces = /hotel/i.test(trimmed)
      ? trimmed
      : `${trimmed} hotel`;
    placeSearchDebounceRef.current = setTimeout(() => {
      fetchPlaceSuggestions(queryForPlaces);
    }, 400);
  };

  const applyPlaceDetailsToForm = async (place) => {
    if (!place) return;
    const address = extractAddressFromPlace(place);
    const coords = getLatLngLiteral(place.geometry?.location);
    const lat = coords?.lat ?? null;
    const lng = coords?.lng ?? null;

    setHotel((prev) => ({
      ...prev,
      display_name: place.name || prev.display_name || "",
      legal_name: place.name || prev.legal_name || "",
      phone: place.international_phone_number || prev.phone || "",
      website: place.website || prev.website || "",
      star_rating:
        typeof place.rating === "number"
          ? Math.max(0, Math.min(5, Number(place.rating)))
          : prev.star_rating,
      address: {
        ...prev.address,
        line1:
          place.formatted_address ||
          address.line1 ||
          place.name ||
          prev.address.line1,
        city: address.city || prev.address.city,
        state: address.state || prev.address.state || "",
        postal_code: address.postal_code || prev.address.postal_code || "",
        country: address.country || prev.address.country,
      },
      geo: {
        lat: lat ?? prev.geo.lat,
        lng: lng ?? prev.geo.lng,
      },
    }));
    setPlaceQuery(place.name || "");
    setShowPlaceSuggestions(false);

    setGooglePlaceMeta({
      placeId: place.place_id,
      name: place.name,
      rating: place.rating,
      reviewCount: place.user_ratings_total,
      phone: place.international_phone_number,
      url:
        place.url ||
        `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
      address: place.formatted_address,
    });
    setPlacePhotos(extractPlacePhotos(place.photos));

    if (lat != null && lng != null) {
      setTimezoneLookupLoading(true);
      try {
        const apiKey =
          import.meta.env.VITE_GMAPS_KEY || window.__GMAPS_KEY || "";
        if (!apiKey) {
          console.warn("Google Maps API key missing; skipping timezone lookup");
          return;
        }
        const params = new URLSearchParams({
          location: `${lat},${lng}`,
          timestamp: Math.floor(Date.now() / 1000),
          key: apiKey,
        });
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/timezone/json?${params.toString()}`
        );
        const data = await response.json();
        if (data?.status === "OK" && data.timeZoneId) {
          onChange("timezone", data.timeZoneId);
        }
      } catch (error) {
        console.error("Failed to resolve timezone", error);
      } finally {
        setTimezoneLookupLoading(false);
      }
    }
  };

  const handlePlaceSelect = async (prediction) => {
    if (!prediction?.place_id) return;
    setPlaceQuery(prediction.description || "");
    setShowPlaceSuggestions(false);
    setPlaceSuggestions([]);
    setPlaceDetailsLoading(true);
    setPlaceError(null);
    try {
      const google = await ensureMaps();
      if (!google) throw new Error("Google Maps not initialized");
      const service = await getPlacesService();
      if (!service) throw new Error("Places service unavailable");
      const sessionToken =
        placeSessionTokenRef.current ||
        new google.maps.places.AutocompleteSessionToken();
      const place = await new Promise((resolve, reject) => {
        service.getDetails(
          {
            placeId: prediction.place_id,
            fields: [
              "name",
              "formatted_address",
              "address_components",
              "international_phone_number",
              "geometry",
              "url",
              "website",
              "rating",
              "user_ratings_total",
              "photos",
            ],
            sessionToken,
          },
          (result, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              resolve(result);
            } else {
              reject(status);
            }
          }
        );
      });
      if (place) {
        setSelectedPlace(place);
        await applyPlaceDetailsToForm(place);
        placeSessionTokenRef.current = null;
      } else {
        setPlaceError("Unable to load place details.");
      }
    } catch (error) {
      console.error("Unable to load place details", error);
      setPlaceError("Unable to load place details. Please try again.");
    } finally {
      setPlaceDetailsLoading(false);
    }
  };

  const resetPlaceSelection = () => {
    setSelectedPlace(null);
    setPlaceQuery("");
    setGooglePlaceMeta(null);
    setPlaceSuggestions([]);
    setShowPlaceSuggestions(false);
    setPlacePhotos([]);
    placeSessionTokenRef.current = null;
    setHotel((prev) => ({
      ...prev,
      display_name: "",
      legal_name: "",
      phone: "",
      website: "",
      address: {
        ...prev.address,
        line1: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
      },
      geo: { lat: "", lng: "" },
      timezone: "",
    }));
  };

  const reApplyPlaceDetails = () => {
    if (selectedPlace) {
      applyPlaceDetailsToForm(selectedPlace);
    }
  };

  // Country/City async dropdown state
  const [countrySearch, setCountrySearch] = useState("");
  const [countryDebounced, setCountryDebounced] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [countryLabelCache, setCountryLabelCache] = useState(new Map());
  const [citySearch, setCitySearch] = useState("");
  const [cityDebounced, setCityDebounced] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [cityLabelCache, setCityLabelCache] = useState(new Map());
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [timezoneError, setTimezoneError] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [loadingExisting, setLoadingExisting] = useState(false);
  const [editingHotelId, setEditingHotelId] = useState("");
  const [hotelEtag, setHotelEtag] = useState(null);
  const debounceRef = useRef(null);
  const [placeQuery, setPlaceQuery] = useState("");
  const [placeSuggestions, setPlaceSuggestions] = useState([]);
  const [showPlaceSuggestions, setShowPlaceSuggestions] = useState(false);
  const [placeSearchLoading, setPlaceSearchLoading] = useState(false);
  const [placeDetailsLoading, setPlaceDetailsLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeError, setPlaceError] = useState(null);
  const placeSearchDebounceRef = useRef(null);
  const placeSearchContainerRef = useRef(null);
  const [timezoneLookupLoading, setTimezoneLookupLoading] = useState(false);
  const [googlePlaceMeta, setGooglePlaceMeta] = useState(null);
  const [placePhotos, setPlacePhotos] = useState([]);
  const placeSessionTokenRef = useRef(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const renderMap = async () => {
      if (!selectedPlace?.geometry?.location || !mapPreviewRef.current) return;
      const google = await ensureMaps();
      if (!google || cancelled) return;
      const position = getLatLngLiteral(selectedPlace.geometry.location);
      if (!position) return;
      const map = new google.maps.Map(mapPreviewRef.current, {
        zoom: 16,
        center: position,
        disableDefaultUI: true,
      });
      new google.maps.Marker({
        map,
        position,
      });
    };
    renderMap();
    return () => {
      cancelled = true;
    };
  }, [selectedPlace]);
  // Lookups (amenities, facilities)
  const [amenitiesOptions, setAmenitiesOptions] = useState([]);
  const [facilitiesOptions, setFacilitiesOptions] = useState([]);
  const [isLoadingAmenities, setIsLoadingAmenities] = useState(false);
  const [isLoadingFacilities, setIsLoadingFacilities] = useState(false);
  const [amenitiesSearch, setAmenitiesSearch] = useState("");
  const [facilitiesSearch, setFacilitiesSearch] = useState("");
  // Toggles to enable Country first, then City
  const FETCH_COUNTRIES = true;
  const FETCH_CITIES = true; // enabled after confirming countries

  useEffect(() => {
    if (!isWizardMode) return;
    const state = ensureWizardActive();
    if (state.currentStep !== "hotel") {
      updateWizardState({ currentStep: "hotel" });
    }
    const hotelIdFromQuery = searchParams.get("hotelId");
    if (hotelIdFromQuery && state.entities?.hotelId !== hotelIdFromQuery) {
      updateWizardState({
        entities: { ...state.entities, hotelId: hotelIdFromQuery },
      });
    }
  }, [isWizardMode, location.search]);

  useEffect(() => {
    setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true);
  }, [setShowHeaderAndMenuBar]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!placeSearchContainerRef.current) return;
      if (!placeSearchContainerRef.current.contains(event.target)) {
        setShowPlaceSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (placeSearchDebounceRef.current) {
        clearTimeout(placeSearchDebounceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isWizardMode) {
      setFormMode("create");
      setEditingHotelId("");
      return;
    }
    const state = ensureWizardActive();
    const stepRef =
      state.entities?.stepRefs?.hotel || getWizardStepRef("hotel");
    if (state.entities?.editStep === "hotel") {
      const targetHotelId =
        searchParams.get("hotelId") ||
        state.entities?.hotelId ||
        editingHotelId;
      if (targetHotelId) {
        setFormMode("edit");
        setEditingHotelId(targetHotelId);
        loadHotelDetails(targetHotelId);
      } else {
        toast.error("No saved hotel found to edit");
        setFormMode("create");
      }
      setWizardEditStep(null);
      return;
    }
    if (!editingHotelId && stepRef?.id) {
      setFormMode("edit");
      setEditingHotelId(stepRef.id);
      if (stepRef.data) {
        setHotel(stepRef.data);
      } else {
        loadHotelDetails(stepRef.id);
      }
    }
  }, [isWizardMode, location.search, editingHotelId]);

  // debounce utility
  const setDebounced = (setter, value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setter(value), 300);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const loadHotelDetails = async (hotelId) => {
    if (!hotelId) return;
    setLoadingExisting(true);
    try {
      const res = await getHotel(hotelId);
      if (res?.status === 200) {
        setHotel(normalizeHotelResponse(res.data));
        setHotelEtag(res?.etag || null);
      } else {
        toast.error(res?.data?.message || "Failed to load hotel details");
      }
    } catch (_) {
      toast.error("Failed to load hotel details");
    } finally {
      setLoadingExisting(false);
    }
  };

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

  // When country changes, reset city search and trigger an immediate fetch
  useEffect(() => {
    if (!FETCH_CITIES) return;
    // Clear any city text and force empty-search load
    setCitySearch("");
    setCityDebounced("");
  }, [hotel.address.country]);

  // countries fetch
  useEffect(() => {
    if (!FETCH_COUNTRIES) return;
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
        } else {
          setCountryOptions([]);
        }
      } catch (e) {
        setCountryOptions([]);
      } finally {
        setIsLoadingCountries(false);
      }
    };
    if (countryDebounced.length >= 2 || countryDebounced === "") load();
  }, [countryDebounced]);

  // cities fetch
  useEffect(() => {
    if (!FETCH_CITIES) return;
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
        } else {
          setCityOptions([]);
        }
      } catch (e) {
        setCityOptions([]);
      } finally {
        setIsLoadingCities(false);
      }
    };
    // Preload globally on first load even without a country
    if (cityDebounced.length >= 0) load();
  }, [cityDebounced, hotel.address.country]);

  const clearFieldError = (path) => {
    setErrors((prev) => {
      if (!prev[path]) return prev;
      const next = { ...prev };
      delete next[path];
      return next;
    });
    if (path === "timezone") {
      setTimezoneError(false);
    }
  };

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
    clearFieldError(path);
  };

  const onChangeArray = (key, valueStr) => {
    const arr = valueStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setHotel((prev) => ({ ...prev, [key]: arr }));
    clearFieldError(key);
  };

  const validateForm = () => {
    const nextErrors = {};
    const requiredFields = [
      { key: "display_name", value: hotel.display_name, label: "Display name" },
      { key: "legal_name", value: hotel.legal_name, label: "Legal name" },
      { key: "email", value: hotel.email, label: "Email" },
      { key: "phone", value: hotel.phone, label: "Phone" },
      { key: "timezone", value: hotel.timezone, label: "Timezone" },
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
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setTimezoneError(Boolean(nextErrors["timezone"]));
      const firstKey = Object.keys(nextErrors)[0];
      focusField(firstKey);
      toast.error("Please fill the highlighted required fields");
      return false;
    }
    setTimezoneError(false);
    return true;
  };

  const submitCreate = async (payload, intent) => {
    const res = await createHotel(payload);
    if (res?.status === 201 || res?.status === 200) {
      toast.success("Hotel created successfully");
      const createdHotelId =
        res?.data?.id ||
        res?.data?.hotelId ||
        res?.data?.hotel_id ||
        res?.data?.data?.id ||
        res?.data?.data?.hotelId ||
        res?.data?.data?.hotel_id ||
        null;
      const responseHotelData = res?.data?.data || res?.data || {};
      const cachedHotelPayload =
        responseHotelData && Object.keys(responseHotelData).length
          ? normalizeHotelResponse(responseHotelData)
          : payload;

      if (isWizardMode) {
        const currentState = ensureWizardActive();
        const fallbackHotelId = searchParams.get("hotelId") || "";
        const finalHotelId =
          createdHotelId || currentState.entities?.hotelId || fallbackHotelId;
        if (finalHotelId) {
          setWizardStepRef("hotel", {
            id: finalHotelId,
            hotelId: finalHotelId,
            data: { ...(cachedHotelPayload || payload), hotelId: finalHotelId },
          });
        }
        const nextStep = getNextWizardStep("hotel");
        const extra = {
          entities: { ...currentState.entities, hotelId: finalHotelId },
        };
        if (intent === "save-next" && nextStep) {
          extra.currentStep = nextStep.id;
        }

        const allBlockersCleared = wouldCompleteAllBlockers("hotel");

        markStepComplete("hotel", extra);

        if (intent === "save-next") {
          if (allBlockersCleared) {
            resetWizardState();
            setHotel(initialHotel);
            navigate(Constants.URLConstants.HOTELSEXTRANETREADINESSLIST);
            return;
          }
          if (nextStep) {
            const params = new URLSearchParams();
            params.set("wizard", "1");
            if (finalHotelId) params.set("hotelId", finalHotelId);
            if (currentState.entities?.returnToReadiness) {
              params.set("fixMode", "1");
            }
            setHotel(initialHotel);
            navigate(`${nextStep.route}?${params.toString()}`);
            return;
          }
        }
      }

      if (!isWizardMode && intent === "save") {
        setTimeout(() => {
          window.location.href = Constants.URLConstants.HOTELSEXTRANETLIST;
        }, 300);
        return;
      }

      setHotel(initialHotel);
    } else if (res?.status === 409) {
      setDedupe(res?.data);
      const rawMsg = res?.data?.message || res?.data?.error;
      const serverMessage = Array.isArray(rawMsg)
        ? rawMsg.join(", ")
        : rawMsg || "Possible duplicate detected";
      toast.warn(serverMessage);
    } else {
      const rawMsg = res?.data?.message || res?.data?.error;
      const serverMessage = Array.isArray(rawMsg)
        ? rawMsg.join(", ")
        : rawMsg || res?.statusText || "Failed to create hotel";
      toast.error(serverMessage);
    }
  };

  const submitUpdate = async (payload, intent) => {
    const currentState = ensureWizardActive();
    const hotelId =
      editingHotelId ||
      searchParams.get("hotelId") ||
      currentState.entities?.hotelId ||
      "";
    if (!hotelId) {
      toast.error("Unable to determine which hotel to update");
      return;
    }
    try {
      const res = await updateHotel(hotelId, payload, hotelEtag);
      if (res?.status === 200) {
        toast.success("Hotel updated successfully");
        const prevData = currentState.entities?.stepRefs?.hotel?.data || {};
        setWizardStepRef("hotel", {
          id: hotelId,
          hotelId,
          data: { ...prevData, ...payload, hotelId },
        });
        if (isWizardMode) {
          const nextStep = getNextWizardStep("hotel");
          const extra = {
            entities: { ...currentState.entities, hotelId },
          };
          if (intent === "save-next" && nextStep) {
            extra.currentStep = nextStep.id;
          }
          const allBlockersCleared = wouldCompleteAllBlockers("hotel");
          markStepComplete("hotel", extra);
          if (intent === "save-next") {
            if (allBlockersCleared) {
              resetWizardState();
              navigate(Constants.URLConstants.HOTELSEXTRANETREADINESSLIST);
              return;
            }
            if (nextStep) {
              const params = new URLSearchParams();
              params.set("wizard", "1");
              params.set("hotelId", hotelId);
              if (currentState.entities?.returnToReadiness) {
                params.set("fixMode", "1");
              }
              navigate(`${nextStep.route}?${params.toString()}`);
              return;
            }
          } else {
            await loadHotelDetails(hotelId);
          }
        } else {
          setTimeout(() => {
            window.location.href = Constants.URLConstants.HOTELSEXTRANETLIST;
          }, 300);
        }
      } else {
        const rawMsg = res?.data?.message || res?.data?.error;
        const serverMessage = Array.isArray(rawMsg)
          ? rawMsg.join(", ")
          : rawMsg || res?.statusText || "Failed to update hotel";
        toast.error(serverMessage);
      }
    } catch (error) {
      const rawMsg =
        error?.response?.data?.message || error?.response?.data?.error;
      const serverMessage = Array.isArray(rawMsg)
        ? rawMsg.join(", ")
        : rawMsg || "Failed to update hotel";
      toast.error(serverMessage);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const intent = submitIntentRef.current || "save";
    setSubmitIntent("save");
    setMsg("");
    setDedupe(null);
    if (!validateForm()) {
      return;
    }
    // Validate image fields if images exist
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
        return;
      }
    }
    setImageErrors({});
    setSubmitting(true);
    const images = hotel.images;
    const payload = {
      ...hotel,
      images,
      geo: {
        lat: hotel.geo.lat === "" ? null : Number(hotel.geo.lat),
        lng: hotel.geo.lng === "" ? null : Number(hotel.geo.lng),
      },
    };
    if (!payload.hotel_code) {
      delete payload.hotel_code;
    }
    if (
      formMode === "edit" &&
      (editingHotelId || searchParams.get("hotelId"))
    ) {
      await submitUpdate(payload, intent);
    } else {
      await submitCreate(payload, intent);
    }
    setSubmitting(false);
  };

  return (
    <>
      <style>
        {`
          .rating-stars-track {
            position: relative;
            color: #facc15;
            font-size: 14px;
            display: inline-flex;
          }
          .rating-stars-track > .fa {
            margin-right: 2px;
          }
          .rating-stars-fill {
            position: absolute;
            left: 0;
            top: 0;
            white-space: nowrap;
            overflow: hidden;
            color: #f59e0b;
          }
          .gmaps-widget-card {
            border-radius: 18px;
            border: 1px solid #e2e8f0;
            background: linear-gradient(145deg, #ffffff, #f7fbff);
            box-shadow: 0 25px 60px rgba(15, 23, 42, 0.12);
            animation: subtleFloat 12s ease-in-out infinite;
          }
          .gmaps-widget-card .card-body {
            border-radius: 18px;
            position: relative;
            overflow: visible;
          }
          @keyframes subtleFloat {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
            100% { transform: translateY(0px); }
          }
          .place-suggestion-enter {
            animation: fadeSlideIn 260ms ease forwards;
          }
          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(-6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fancy-rating-pill {
            background: #eef2ff;
            border-radius: 999px;
            padding: 4px 12px;
            color: #312e81;
            font-size: 13px;
            box-shadow: inset 0 0 0 1px rgba(99, 102, 241, 0.2);
          }
          .fancy-rating-pill .rating-pill-value {
            font-weight: 600;
            font-size: 15px;
          }
          .star-rating-input {
            display:flex;
            align-items: center;
            gap: 6px;
          }
          .star-button {
            border: none;
            background: transparent;
            padding: 0;
            cursor: pointer;
            line-height: 1;
          }
          .star-button:focus-visible {
            outline: 2px solid #94a3b8;
            border-radius: 4px;
          }
          .star-icon {
            position: relative;
            width: 24px;
            height: 24px;
            display: inline-block;
          }
          .star-icon svg {
            width: 100%;
            height: 100%;
            display: block;
          }
          .star-icon-base svg {
            fill: none;
            stroke: #f59e0b;
            stroke-width: 1.6;
          }
          .star-icon-fill {
            position: absolute;
            inset: 0;
            overflow: hidden;
          }
          .star-icon-fill svg {
            fill: #f59e0b;
            stroke: #f59e0b;
            stroke-width: 0.5;
          }
          .star-rating-value {
            font-size: 12px;
            color: #475569;
            font-weight: 600;
            min-width: 48px;
          }
          .display-name-suggestions {
            z-index: 30;
            max-height: 260px;
            overflow-y: auto;
            border-radius: 12px;
            border: 1px solid rgba(148,163,184,0.35);
            box-shadow: 0 16px 30px rgba(15,23,42,0.15);
            animation: fadeSlideIn 220ms ease forwards;
          }
          .display-name-input-wrapper .input-icon {
            position: absolute;
            top: 50%;
            left: 8px;
            transform: translateY(-50%);
            color: #dc2626; /* strong red for visibility */
            pointer-events: none;
            font-size: 14px;
            z-index: 2;
          }
          .display-name-input-wrapper input {
            padding-left: 28px;
          }
          .form-control.is-invalid,
          .custom-select.is-invalid,
          .tz__control.is-invalid {
            border-color: #dc2626 !important;
            box-shadow: 0 0 0 1px rgba(220,38,38,0.3);
          }
          .form-group.has-error label {
            color: #b91c1c;
          }
          .form-group.has-error .form-control,
          .form-group.has-error .custom-select,
          .form-group.has-error .tz__control,
          .form-group.has-error .react-select__control {
            border-color: #dc2626 !important;
            box-shadow: 0 0 0 2px rgba(220,38,38,0.18);
            background-color: #fff5f5;
          }
          .form-group .invalid-feedback {
            color: #dc2626 !important;
            display: block !important;
          }
          .place-preview-tile {
            background: #ffffff;
            border-radius: 18px;
            padding: 16px 16px 14px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 18px 40px rgba(15,23,42,0.14);
            position: relative;
            overflow: hidden;
            max-width: 440px;
            margin-left: auto;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 200ms ease, transform 200ms ease;
          }
          .place-preview-tile.show {
            opacity: 1;
            transform: translateY(0);
          }
          .place-preview-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
          }
          .place-preview-title {
            font-size: 16px;
            font-weight: 600;
            color: #0f172a;
          }
          .place-preview-subtitle {
            font-size: 12px;
            color: #64748b;
          }
          .place-preview-actions {
            display: flex;
            gap: 6px;
          }
          .place-preview-body {
            margin-top: 12px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .tile-gallery {
            display: flex;
            gap: 8px;
            overflow-x: auto;
            padding-bottom: 2px;
          }
          .tile-gallery img {
            border-radius: 10px;
            width: 90px;
            height: 70px;
            object-fit: cover;
            flex-shrink: 0;
            box-shadow: 0 4px 10px rgba(15,23,42,0.18);
            cursor: pointer;
            transition: transform 120ms ease, box-shadow 120ms ease;
          }
          .tile-gallery img:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 18px rgba(15,23,42,0.25);
          }
          .tile-meta-badges {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }
          .tile-meta-badge {
            background: rgba(255,255,255,0.65);
            border-radius: 999px;
            padding: 4px 10px;
            font-size: 12px;
            color: #1e1b4b;
            border: 1px solid rgba(148,163,184,0.35);
          }
          .tile-map {
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(148,163,184,0.4);
            min-height: 180px;
          }
          .tile-empty {
            min-height: 280px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            color: #475569;
            text-align: center;
          }
          .tile-gallery-title {
            font-size: 13px;
            letter-spacing: 0.02em;
            font-weight: 600;
            color: #475569;
          }
          .image-lightbox-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(15,23,42,0.65);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1050;
          }
          .image-lightbox-content {
            max-width: 80vw;
            max-height: 80vh;
            background: #020617;
            border-radius: 16px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 24px 60px rgba(0,0,0,0.6);
          }
          .image-lightbox-content img {
            display: block;
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
          }
          .image-lightbox-close {
            position: absolute;
            top: 10px;
            right: 10px;
            border: none;
            background: rgba(15,23,42,0.8);
            color: #e5e7eb;
            border-radius: 999px;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          .image-lightbox-close:hover {
            background: rgba(15,23,42,0.95);
          }
        `}
      </style>
      <Header2
        title="ADD HOTEL (Extranet)"
        linkText1="Hotels"
        linkText2="Add Hotel"
        link1={Constants.URLConstants.HOTELSEXTRANETLIST}
        link2={Constants.URLConstants.HOTELSEXTRANETADD}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <WizardModeChrome
          isWizardMode={isWizardMode}
          onToggle={toggleMode}
          progress={<HotelProfileWizardProgress />}
          primaryColor={PRIMARY_COLOR}
          canGoBack={canGoBack}
          onBack={handleBack}
          guideStepId="hotel"
        >
          {loadingExisting ? (
            <div className="p-3 text-muted">Loading hotel…</div>
          ) : (
            <form onSubmit={submit}>
              <div className="panel-body" style={{ overflow: "visible" }}>
                {msg && (
                  <div
                    className="alert alert-info"
                    style={{ marginBottom: 12 }}
                  >
                    {msg}
                  </div>
                )}
                {dedupe?.matches?.length ? (
                  <div
                    className="alert alert-danger"
                    style={{ marginBottom: 12 }}
                  >
                    <div>
                      <b>Duplicate candidates</b>
                    </div>
                    <ul style={{ marginBottom: 0 }}>
                      {dedupe.matches.map((m, idx) => (
                        <li key={idx}>
                          {m.id} - {m.name} (score {m.score})
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="row g-4 align-items-start">
                  <div
                    className={`col-12 ${
                      selectedPlace ? "col-xl-7" : "col-xl-12"
                    }`}
                  >
                    <div className="row mt-3">
                      <div
                        className={`col-md-3 form-group position-relative ${
                          errors["display_name"] ? "has-error" : ""
                        }`}
                        ref={placeSearchContainerRef}
                      >
                        <label>
                          Display Name <span className="text-danger">*</span>
                        </label>
                        <div className="display-name-input-wrapper position-relative">
                          {/* <span className="input-icon">
                            <i
                              className="fa fa-map-marker-alt"
                              style={{ color: "black", left: "-7%" }}
                            />
                          </span> */}
                          <input
                            ref={registerField("display_name")}
                            type="text"
                            className={`form-control form-control-sm ${
                              errors["display_name"] ? "is-invalid" : ""
                            }`}
                            value={hotel.display_name}
                            onChange={(e) => {
                              const value = e.target.value;
                              onChange("display_name", value);
                              if (!value.trim()) {
                                resetPlaceSelection();
                              } else {
                                handlePlaceQueryInput(value);
                              }
                            }}
                            placeholder="Search hotel on Google"
                            style={
                              errors["display_name"]
                                ? {
                                    borderColor: "#dc2626",
                                    backgroundColor: "#fff5f5",
                                  }
                                : undefined
                            }
                          />
                          {placeSearchLoading && (
                            <span
                              className="spinner-border spinner-border-sm text-secondary position-absolute"
                              style={{ top: 10, right: 10 }}
                              role="status"
                            />
                          )}
                        </div>
                        {errors["display_name"] ? (
                          <div className="invalid-feedback d-block">
                            {errors["display_name"]}
                          </div>
                        ) : null}
                        {showPlaceSuggestions &&
                          placeSuggestions.length > 0 && (
                            <div className="display-name-suggestions position-absolute w-100 bg-white mt-1">
                              {placeSuggestions.map((suggestion) => (
                                <button
                                  type="button"
                                  className="list-group-item list-group-item-action place-suggestion-enter"
                                  key={suggestion.place_id}
                                  onClick={() => handlePlaceSelect(suggestion)}
                                  style={{
                                    textAlign: "left",
                                    border: "none",
                                    borderBottom: "1px solid #f1f5f9",
                                    background: "transparent",
                                    padding: "10px 14px",
                                  }}
                                >
                                  <div className="fw-semibold text-truncate">
                                    {suggestion?.structured_formatting
                                      ?.main_text || suggestion.description}
                                  </div>
                                  <div className="small text-muted text-truncate">
                                    {suggestion?.structured_formatting
                                      ?.secondary_text ||
                                      suggestion.description}
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        {placeError && (
                          <div className="text-danger small mt-2">
                            {placeError}
                          </div>
                        )}
                      </div>
                      <div
                        className={`col-md-3 form-group ${
                          errors["legal_name"] ? "has-error" : ""
                        }`}
                      >
                        <label>
                          Legal Name <span className="text-danger">*</span>
                        </label>
                        <input
                          ref={registerField("legal_name")}
                          type="text"
                          className={`form-control form-control-sm ${
                            errors["legal_name"] ? "is-invalid" : ""
                          }`}
                          value={hotel.legal_name}
                          onChange={(e) =>
                            onChange("legal_name", e.target.value)
                          }
                          style={
                            errors["legal_name"]
                              ? {
                                  borderColor: "#dc2626",
                                  backgroundColor: "#fff5f5",
                                }
                              : undefined
                          }
                        />
                        {errors["legal_name"] ? (
                          <div className="invalid-feedback d-block">
                            {errors["legal_name"]}
                          </div>
                        ) : null}
                      </div>
                      <div
                        className={`col-md-3 form-group ${
                          errors["email"] ? "has-error" : ""
                        }`}
                      >
                        <label>
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          ref={registerField("email")}
                          type="email"
                          className={`form-control form-control-sm ${
                            errors["email"] ? "is-invalid" : ""
                          }`}
                          value={hotel.email}
                          onChange={(e) => onChange("email", e.target.value)}
                          placeholder="hotel@domain.com"
                          style={
                            errors["email"]
                              ? {
                                  borderColor: "#dc2626",
                                  backgroundColor: "#fff5f5",
                                }
                              : undefined
                          }
                        />
                        {errors["email"] ? (
                          <div className="invalid-feedback d-block">
                            {errors["email"]}
                          </div>
                        ) : null}
                      </div>
                      <div
                        className={`col-md-3 form-group ${
                          errors["phone"] ? "has-error" : ""
                        }`}
                      >
                        <label>
                          Phone <span className="text-danger">*</span>
                        </label>
                        <input
                          ref={registerField("phone")}
                          type="text"
                          className={`form-control form-control-sm ${
                            errors["phone"] ? "is-invalid" : ""
                          }`}
                          value={hotel.phone}
                          onChange={(e) => onChange("phone", e.target.value)}
                          placeholder="+974-1234-5678"
                          style={
                            errors["phone"]
                              ? {
                                  borderColor: "#dc2626",
                                  backgroundColor: "#fff5f5",
                                }
                              : undefined
                          }
                        />
                        {errors["phone"] ? (
                          <div className="invalid-feedback d-block">
                            {errors["phone"]}
                          </div>
                        ) : null}
                      </div>
                      <div
                        className={`col-md-3 form-group mt-2 ${
                          errors["timezone"] ? "has-error" : ""
                        }`}
                      >
                        <label>
                          Website <span className="text-danger">*</span>
                        </label>
                        <input
                          type="url"
                          className="form-control form-control-sm"
                          value={hotel.website}
                          onChange={(e) => onChange("website", e.target.value)}
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>

                    <div className="row mt-2">
                      <div className="col-md-3 form-group">
                        <label>Star Rating</label>
                        <StarRatingInput
                          value={hotel.star_rating}
                          onChange={(val) => onChange("star_rating", val)}
                        />
                      </div>
                      <div className="col-md-3 form-group">
                        <label>
                          Timezone <span className="text-danger">*</span>
                        </label>
                        <div
                          ref={registerField("timezone")}
                          className={`custom-select ${
                            timezoneError || errors["timezone"]
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{
                            padding: 0,
                            border: "none",
                            ...(timezoneError || errors["timezone"]
                              ? { boxShadow: "0 0 0 1px rgba(220,38,38,0.3)" }
                              : {}),
                          }}
                        >
                          <TimezoneSelect
                            value={hotel.timezone || ""}
                            onChange={(tz) => {
                              const val =
                                typeof tz === "string" ? tz : tz?.value || "";
                              onChange("timezone", val);
                              if (val) setTimezoneError(false);
                            }}
                            classNamePrefix="tz"
                            placeholder="- Select Timezone -"
                            styles={{
                              control: (base, state) => ({
                                ...base,
                                minHeight: 31,
                                height: 31,
                                borderColor:
                                  timezoneError || errors["timezone"]
                                    ? "#dc3545"
                                    : "#ced4da",
                                boxShadow: "none",
                                "&:hover": {
                                  borderColor:
                                    timezoneError || errors["timezone"]
                                      ? "#dc3545"
                                      : "#ced4da",
                                },
                              }),
                              valueContainer: (base) => ({
                                ...base,
                                padding: "0 8px",
                              }),
                              indicatorsContainer: (base) => ({
                                ...base,
                                height: 31,
                              }),
                              dropdownIndicator: (base) => ({
                                ...base,
                                padding: "0 6px",
                              }),
                              clearIndicator: (base) => ({
                                ...base,
                                padding: "0 6px",
                              }),
                              placeholder: (base) => ({
                                ...base,
                                color: "#6c757d",
                                fontSize: 13,
                              }),
                              singleValue: (base) => ({
                                ...base,
                                fontSize: 13,
                              }),
                              input: (base) => ({ ...base, fontSize: 13 }),
                              option: (base, state) => ({
                                ...base,
                                fontSize: 13,
                              }),
                              menu: (base) => ({ ...base, zIndex: 5 }),
                            }}
                          />
                        </div>
                        {timezoneError || errors["timezone"] ? (
                          <div className="invalid-feedback d-block">
                            {errors["timezone"] || "Timezone is required"}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-md-3 form-group">
                        <label>Status</label>
                        <LookupSelectWithManage
                          category="hotel_statuses"
                          label="Status"
                          value={hotel.status}
                          onChange={(val) => onChange("status", val)}
                        />
                      </div>
                    </div>

                    <hr />
                    <div className="form-group mt-2">
                      <h5>Address</h5>
                    </div>
                    <div className="row">
                      <div
                        className={`col-md-4 form-group ${
                          errors["address.line1"] ? "has-error" : ""
                        }`}
                      >
                        <label>
                          Address Line 1 <span className="text-danger">*</span>
                        </label>
                        <input
                          ref={registerField("address.line1")}
                          type="text"
                          className={`form-control form-control-sm ${
                            errors["address.line1"] ? "is-invalid" : ""
                          }`}
                          value={hotel.address.line1}
                          onChange={(e) =>
                            onChange("address.line1", e.target.value)
                          }
                          style={
                            errors["address.line1"]
                              ? {
                                  borderColor: "#dc2626",
                                  backgroundColor: "#fff5f5",
                                }
                              : undefined
                          }
                        />
                        {errors["address.line1"] ? (
                          <div className="invalid-feedback d-block">
                            {errors["address.line1"]}
                          </div>
                        ) : null}
                      </div>
                      <div
                        className={`col-md-4 form-group ${
                          errors["address.country"] ? "has-error" : ""
                        }`}
                        ref={registerField("address.country")}
                      >
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
                            const map = new Map(
                              mapped.map((o) => [o.value, o])
                            );
                            const current = hotel.address.country || "";
                            if (current && !map.has(current)) {
                              map.set(current, {
                                value: current,
                                label:
                                  countryLabelCache.get(current) || current,
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
                              ? {
                                  value: v,
                                  label: countryLabelCache.get(v) || v,
                                }
                              : null;
                          })()}
                          onChange={(opt) =>
                            onChange("address.country", opt ? opt.value : "")
                          }
                          onInputChange={(inputValue, meta) => {
                            if (meta.action === "input-change") {
                              setCountrySearch(inputValue);
                              setDebounced(setCountryDebounced, inputValue);
                            }
                            return inputValue;
                          }}
                          isInvalid={Boolean(errors["address.country"])}
                        />
                        {errors["address.country"] ? (
                          <div className="invalid-feedback d-block">
                            {errors["address.country"]}
                          </div>
                        ) : null}
                      </div>
                      <div
                        className={`col-md-4 form-group ${
                          errors["address.city"] ? "has-error" : ""
                        }`}
                        ref={registerField("address.city")}
                      >
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
                            const map = new Map(
                              mapped.map((o) => [o.value, o])
                            );
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
                          onChange={(opt) =>
                            onChange("address.city", opt ? opt.value : "")
                          }
                          onInputChange={(inputValue, meta) => {
                            if (meta.action === "input-change") {
                              setCitySearch(inputValue);
                              setDebounced(setCityDebounced, inputValue);
                            }
                            return inputValue;
                          }}
                          isDisabled={false}
                          isInvalid={Boolean(errors["address.city"])}
                        />
                        {errors["address.city"] ? (
                          <div className="invalid-feedback d-block">
                            {errors["address.city"]}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-3 form-group">
                        <label>Latitude</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={hotel.geo.lat}
                          onChange={(e) => onChange("geo.lat", e.target.value)}
                        />
                      </div>
                      <div className="col-md-3 form-group">
                        <label>Longitude</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={hotel.geo.lng}
                          onChange={(e) => onChange("geo.lng", e.target.value)}
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
                              next[idx] = {
                                ...(next[idx] || {}),
                                type: e.target.value,
                              };
                              setHotel((p) => ({ ...p, contacts: next }));
                            }}
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
                              next[idx] = {
                                ...(next[idx] || {}),
                                email: e.target.value,
                              };
                              setHotel((p) => ({ ...p, contacts: next }));
                            }}
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
                              next[idx] = {
                                ...(next[idx] || {}),
                                phone: e.target.value,
                              };
                              setHotel((p) => ({ ...p, contacts: next }));
                            }}
                          />
                        </div>
                        <div className="col-md-2 form-group">
                          <div className="d-flex justify-content-end gap-2 align-items-end">
                            {idx > 0 && (
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                title="Remove contact"
                                onClick={() => {
                                  const next = hotel.contacts.filter(
                                    (_, i) => i !== idx
                                  );
                                  setHotel((p) => ({
                                    ...p,
                                    contacts: next.length
                                      ? next
                                      : [
                                          {
                                            type: "sales",
                                            email: "",
                                            phone: "",
                                          },
                                        ],
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
                        </div>
                      </div>
                    ))}

                    <hr />
                    <div className="row">
                      <div className="col-md-4 form-group">
                        <label>Amenities</label>
                        <LookupSelectWithManage
                          category="hotel_amenities"
                          label="Amenities"
                          isMulti
                          value={hotel.amenities}
                          onChange={(vals) =>
                            setHotel((p) => ({ ...p, amenities: vals }))
                          }
                        />
                      </div>
                      <div className="col-md-4 form-group">
                        <label>Facilities</label>
                        <LookupSelectWithManage
                          category="hotel_facilities"
                          label="Facilities"
                          isMulti
                          value={hotel.facilities}
                          onChange={(vals) =>
                            setHotel((p) => ({ ...p, facilities: vals }))
                          }
                        />
                      </div>
                      <div className="col-md-4 form-group">
                        <label>Brand</label>
                        <LookupSelectWithManage
                          category="hotel_brands"
                          label="Brand"
                          value={hotel.brand}
                          onChange={(val) =>
                            setHotel((p) => ({ ...p, brand: val }))
                          }
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-4 form-group">
                        <label>Chain</label>
                        <LookupSelectWithManage
                          category="hotel_chains"
                          label="Chain"
                          value={hotel.chain || ""}
                          onChange={(val) =>
                            setHotel((p) => ({ ...p, chain: val || null }))
                          }
                        />
                      </div>
                      <div className="col-md-4 form-group">
                        <label>Check-in</label>
                        <LookupSelectWithManage
                          category="checkin_times"
                          label="Check-in"
                          value={hotel.policies.checkin}
                          onChange={(val) => onChange("policies.checkin", val)}
                        />
                      </div>
                      <div className="col-md-4 form-group">
                        <label>Check-out</label>
                        <LookupSelectWithManage
                          category="checkout_times"
                          label="Check-out"
                          value={hotel.policies.checkout}
                          onChange={(val) => onChange("policies.checkout", val)}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-4 form-group">
                        <label>Languages</label>
                        <LookupSelectWithManage
                          category="languages"
                          label="Languages"
                          isMulti
                          value={hotel.languages || []}
                          onChange={(vals) =>
                            setHotel((p) => ({ ...p, languages: vals || [] }))
                          }
                        />
                      </div>
                    </div>

                    <hr />
                    <div className="form-group mt-2">
                      <h5>Images</h5>
                    </div>
                    <div className="row">
                      <ImageUploader
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
                                    {
                                      url: resp.imagelink,
                                      type: "",
                                      caption: "",
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
                        <div
                          className="card"
                          style={{ border: "1px solid #e5e7eb" }}
                        >
                          <div className="card-body">
                            <label className="form-label">Add by URL</label>
                            <input
                              type="text"
                              className="form-control form-control-sm mb-2"
                              placeholder="https://..."
                              value={hotel._newImageUrl || ""}
                              onChange={(e) =>
                                onChange("_newImageUrl", e.target.value)
                              }
                            />
                            <div className="mb-2">
                              <label
                                className="form-label"
                                style={{ fontSize: 12 }}
                              >
                                Type
                              </label>
                              <LookupSelectWithManage
                                category="media_categories"
                                label="Type"
                                value={hotel._newImageType || ""}
                                onChange={(val) =>
                                  onChange("_newImageType", val || "")
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
                                  if (dragOverIndex !== idx)
                                    setDragOverIndex(idx);
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
                                  // primary is implicit (index 0)
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
                                  draggable
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
                                      title={im.url}
                                    >
                                      {String(im.url || "")
                                        .split("/")
                                        .pop()}
                                    </div>
                                    <div className="btn-group btn-group-sm">
                                      <a
                                        className="btn btn-outline-secondary btn-sm"
                                        href={im.url}
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
                                          <line
                                            x1="10"
                                            y1="14"
                                            x2="21"
                                            y2="3"
                                          />
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
                                              im.url
                                            );
                                            toast.success("URL copied");
                                          } catch (_) {
                                            /* noop */
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
                                      <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        title="Remove image"
                                        onClick={() => {
                                          const next = hotel.images.filter(
                                            (_, i) => i !== idx
                                          );
                                          setHotel((p) => ({
                                            ...p,
                                            images: next,
                                          }));
                                          // primary remains index 0 by order
                                        }}
                                      >
                                        <i className="fa fa-trash"></i>
                                      </button>
                                    </div>
                                  </div>
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
                                    <div className="row g-2">
                                      <div className="col-12">
                                        <label
                                          className="form-label"
                                          style={{ fontSize: 12 }}
                                        >
                                          Type{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        <LookupSelectWithManage
                                          category="media_categories"
                                          label="Type"
                                          value={im.type || ""}
                                          onChange={(val) => {
                                            const next = [...hotel.images];
                                            next[idx] = {
                                              ...next[idx],
                                              type: val || "",
                                            };
                                            setHotel((p) => ({
                                              ...p,
                                              images: next,
                                            }));
                                            setImageErrors((prev) => ({
                                              ...prev,
                                              [idx]: {
                                                ...(prev[idx] || {}),
                                                type: false,
                                              },
                                            }));
                                          }}
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
                                              setHotel((p) => ({
                                                ...p,
                                                images: next,
                                              }));
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
                            {!!hotel.images.length && (
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

                    <div className="row mt-4">
                      <div className="col-md-12 d-flex flex-wrap gap-2">
                        {!isWizardMode && (
                          <button
                            type="submit"
                            className="btn btn-dark btn-sm"
                            disabled={submitting}
                            onClick={() => setSubmitIntent("save")}
                          >
                            {submitting && saveIntent === "save"
                              ? "Saving..."
                              : "Save"}
                          </button>
                        )}
                        <button
                          type="submit"
                          className="btn btn-outline-secondary btn-sm"
                          disabled={submitting}
                          onClick={() => setSubmitIntent("save-stay")}
                        >
                          {submitting && saveIntent === "save-stay"
                            ? "Saving..."
                            : "Save & Add Another"}
                        </button>
                        {isWizardMode && (
                          <button
                            type="submit"
                            className="btn btn-dark btn-sm"
                            disabled={submitting}
                            onClick={() => setSubmitIntent("save-next")}
                          >
                            {submitting && saveIntent === "save-next"
                              ? "Continuing..."
                              : "Save & Continue"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {selectedPlace ? (
                    <div className="col-12 col-xl-5">
                      <PlacePreviewTile
                        selectedPlace={selectedPlace}
                        googlePlaceMeta={googlePlaceMeta}
                        placePhotos={placePhotos}
                        hotelTimezone={hotel.timezone}
                        mapPreviewRef={mapPreviewRef}
                        mapsInstance={mapsInstance}
                        placeDetailsLoading={placeDetailsLoading}
                        timezoneLookupLoading={timezoneLookupLoading}
                        reApplyPlaceDetails={reApplyPlaceDetails}
                        resetPlaceSelection={resetPlaceSelection}
                        onImageClick={setLightboxImage}
                      />
                    </div>
                  ) : null}
                </div>
                {lightboxImage && (
                  <div
                    className="image-lightbox-backdrop"
                    onClick={() => setLightboxImage(null)}
                  >
                    <div
                      className="image-lightbox-content"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        className="image-lightbox-close"
                        onClick={() => setLightboxImage(null)}
                      >
                        <i className="fa fa-times" />
                      </button>
                      <img src={lightboxImage} alt="Hotel view" />
                    </div>
                  </div>
                )}
              </div>
            </form>
          )}
        </WizardModeChrome>
      </div>
    </>
  );
}

function StarRatingInput({ value = 0, onChange }) {
  const clamp = (val) => Math.max(0, Math.min(5, val));
  const safeValue = clamp(Number(value) || 0);
  const fillRatioFor = (index) => {
    const start = index - 1;
    return Math.max(0, Math.min(1, safeValue - start));
  };
  return (
    <div
      className="star-rating-input"
      role="group"
      aria-label="Select star rating"
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className="star-button"
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onClick={() => onChange && onChange(n)}
        >
          <span className="star-icon" aria-hidden>
            <span className="star-icon-base">
              <StarOutlineSvg />
            </span>
            <span
              className="star-icon-fill"
              style={{ width: `${fillRatioFor(n) * 100}%` }}
            >
              <StarSolidSvg />
            </span>
          </span>
        </button>
      ))}
      <span className="star-rating-value">{safeValue.toFixed(1)} / 5</span>
    </div>
  );
}

function PlacePreviewTile({
  selectedPlace,
  googlePlaceMeta,
  placePhotos,
  hotelTimezone,
  mapPreviewRef,
  mapsInstance,
  placeDetailsLoading,
  timezoneLookupLoading,
  reApplyPlaceDetails,
  resetPlaceSelection,
  onImageClick,
}) {
  if (!selectedPlace) return null;
  const ratingValue = Number(
    googlePlaceMeta?.rating ?? selectedPlace?.rating ?? 0
  );
  const metaBadges = [
    ratingValue
      ? {
          label: "Rating",
          value: `${ratingValue.toFixed(1)}${
            googlePlaceMeta?.reviewCount != null
              ? ` • ${googlePlaceMeta.reviewCount} reviews`
              : ""
          }`,
        }
      : null,
    selectedPlace?.international_phone_number || googlePlaceMeta?.phone
      ? {
          label: "Phone",
          value:
            selectedPlace?.international_phone_number || googlePlaceMeta?.phone,
        }
      : null,
    selectedPlace?.website
      ? { label: "Website", value: selectedPlace.website }
      : null,
    hotelTimezone ? { label: "Timezone", value: hotelTimezone } : null,
  ].filter(Boolean);

  return (
    <div className="place-preview-tile show">
      <div className="place-preview-header">
        <div>
          <div className="place-preview-title">{selectedPlace?.name}</div>
          <div className="place-preview-subtitle">
            {selectedPlace?.formatted_address || googlePlaceMeta?.address}
          </div>
          {ratingValue ? (
            <div className="d-flex align-items-center gap-2 mt-2">
              <span className="rating-stars d-inline-flex align-items-center gap-2">
                <span className="rating-stars-track">
                  {[...Array(5)].map((_, idx) => (
                    <i
                      key={`tile-base-${idx}`}
                      className="fa fa-star-o"
                      aria-hidden
                    />
                  ))}
                  <span
                    className="rating-stars-fill"
                    style={{
                      width: `${
                        (Math.max(0, Math.min(5, ratingValue)) / 5) * 100
                      }%`,
                    }}
                  >
                    {[...Array(5)].map((_, idx) => (
                      <i
                        key={`tile-fill-${idx}`}
                        className="fa fa-star"
                        aria-hidden
                      />
                    ))}
                  </span>
                </span>
                <span className="text-muted" style={{ fontSize: 13 }}>
                  {ratingValue.toFixed(1)}
                </span>
              </span>
              {googlePlaceMeta?.reviewCount != null && (
                <small className="text-muted">
                  ({googlePlaceMeta.reviewCount} reviews)
                </small>
              )}
            </div>
          ) : null}
        </div>
        <div className="place-preview-actions">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={reApplyPlaceDetails}
            disabled={placeDetailsLoading || timezoneLookupLoading}
          >
            {(placeDetailsLoading || timezoneLookupLoading) && (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              />
            )}
            Refresh
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={resetPlaceSelection}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="place-preview-body">
        <div className="tile-map">
          {mapsInstance && selectedPlace?.geometry?.location ? (
            <div ref={mapPreviewRef} style={{ width: "100%", height: 190 }} />
          ) : (
            <div className="tile-empty" style={{ minHeight: 180 }}>
              Loading map preview…
            </div>
          )}
        </div>
        {metaBadges.length ? (
          <div className="tile-meta-badges mt-2">
            {metaBadges.map((badge, idx) => (
              <span key={idx} className="tile-meta-badge">
                <strong>{badge.label}:</strong> {badge.value}
              </span>
            ))}
          </div>
        ) : null}
        {placePhotos.length ? (
          <>
            <div className="tile-gallery-title text-uppercase mt-2">
              Gallery
            </div>
            <div className="tile-gallery">
              {placePhotos.slice(0, 10).map((photo, idx) => (
                <img
                  key={`${photo.url}-${idx}`}
                  src={photo.url}
                  alt={`View ${idx + 1}`}
                  onClick={() => onImageClick && onImageClick(photo.url)}
                />
              ))}
            </div>
          </>
        ) : null}
        <div className="d-flex flex-wrap gap-2 mt-2">
          {googlePlaceMeta?.url && (
            <a
              className="btn btn-sm btn-outline-secondary"
              href={googlePlaceMeta.url}
              target="_blank"
              rel="noreferrer"
            >
              View on Google Maps
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

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
                f.type.startsWith("image/")
              );
              onFilesSelected && onFilesSelected(files);
            }}
          >
            <div className="mb-1">
              <i
                className="fa fa-cloud-upload"
                style={{
                  color: "#FF5015",
                  fontSize: 18,
                  background: "#FFEAE3",
                  borderRadius: "50%",
                  padding: 6,
                }}
              ></i>
            </div>
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

const StarSolidSvg = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.869 1.401-8.168L.132 9.21l8.2-1.192z" />
  </svg>
);

const StarOutlineSvg = () => (
  <svg viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
