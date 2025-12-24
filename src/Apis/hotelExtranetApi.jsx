import axios from "axios";

const RAW_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
const BASE = (RAW_BASE_URL || "").replace(/\/+$/, "");
const authHeader = () => ({
  Authorization: `Bearer ${window.localStorage.getItem("token")}`,
});

export const listHotels = async (params = {}) => {
  const { page = 1, size = 50, city, country, star, status, search } = params;
  const query = new URLSearchParams();
  if (page) query.set("page", page);
  if (size) query.set("size", size);
  if (city) query.set("city", city);
  if (country) query.set("country", country);
  if (star) query.set("star", star);
  if (status) query.set("status", status);
  if (typeof search === "string" && search.trim().length > 0) query.set("search", search.trim());
  const url = `${BASE}/api/contracts/hotels${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader() });
  return res.data;
};

export const createHotel = async (hotel) => {
  const url = `${BASE}/api/contracts/hotels`;
  const res = await axios.post(url, hotel, {
    headers: { "Content-Type": "application/json", ...authHeader() },
    validateStatus: () => true,
  });
  return { data: res.data, status: res.status, etag: res.headers?.etag };
};

export const getHotel = async (hotelId) => {
  const url = `${BASE}/api/contracts/hotels/${hotelId}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status, etag: res.headers?.etag };
};

export const updateHotel = async (hotelId, hotel, etag) => {
  const url = `${BASE}/api/contracts/hotels/${hotelId}`;
  const headers = { "Content-Type": "application/json", ...authHeader() };
  if (etag) headers["If-Match"] = etag;
  const res = await axios.put(url, hotel, { headers, validateStatus: () => true });
  return { data: res.data, status: res.status };
};

export const deleteHotel = async (hotelId, hard = false) => {
  const url = `${BASE}/api/contracts/hotels/${hotelId}?hard=${hard}`;
  const res = await axios.delete(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};

export const setHotelStatus = async (hotelId, status) => {
  const url = `${BASE}/api/contracts/hotels/${hotelId}/status`;
  const res = await axios.patch(
    url,
    { status },
    { headers: { "Content-Type": "application/json", ...authHeader() }, validateStatus: () => true }
  );
  return { data: res.data, status: res.status };
};

// Hotel contracts holistic overview
export const getHotelContractsOverview = async (hotelId) => {
  const url = `${BASE}/api/contracts/hotels/${hotelId}/overview`;
  const res = await axios.get(url, {
    headers: authHeader(),
    validateStatus: () => true,
  });
  return { data: res.data, status: res.status };
};

// --- ROOMS ---
export const listRooms = async (hotelId, params = {}) => {
  // params: { page, size }
  const { page = 1, size = 50 } = params;
  const query = new URLSearchParams();
  if (page) query.set("page", page);
  if (size) query.set("size", size);
  const url = `${BASE}/api/contracts/hotels/${hotelId}/rooms${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader() });
  return res.data;
};

export const createRoom = async (hotelId, room) => {
  const url = `${BASE}/api/contracts/hotels/${hotelId}/rooms`;
  const res = await axios.post(url, room, {
    headers: { "Content-Type": "application/json", ...authHeader() },
    validateStatus: () => true,
  });
  return { data: res.data, status: res.status };
};

export const getRoom = async (roomId) => {
  const url = `${BASE}/api/contracts/rooms/${roomId}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};

export const updateRoom = async (roomId, room) => {
  const url = `${BASE}/api/contracts/rooms/${roomId}`;
  const res = await axios.put(url, room, {
    headers: { "Content-Type": "application/json", ...authHeader() },
    validateStatus: () => true,
  });
  return { data: res.data, status: res.status };
};

export const deleteRoom = async (roomId, hard = false) => {
  const url = `${BASE}/api/contracts/rooms/${roomId}?hard=${hard}`;
  const res = await axios.delete(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};

// --- SEASONS ---
export const listSeasons = async (hotelId, params = {}) => {
  const { page = 1, size = 50, activeOn } = params;
  const query = new URLSearchParams();
  if (page) query.set("page", page);
  if (size) query.set("size", size);
  if (activeOn) query.set("activeOn", activeOn);
  const url = `${BASE}/api/contracts/hotels/${hotelId}/seasons${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader() });
  return res.data;
};
export const createSeason = async (hotelId, payload) => {
  const url = `${BASE}/api/contracts/hotels/${hotelId}/seasons`;
  const res = await axios.post(url, payload, {
    headers: { "Content-Type": "application/json", ...authHeader() },
    validateStatus: () => true,
  });
  return { data: res.data, status: res.status };
};
export const getSeason = async (seasonId) => {
  const url = `${BASE}/api/contracts/seasons/${seasonId}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};
export const updateSeason = async (seasonId, payload) => {
  const url = `${BASE}/api/contracts/seasons/${seasonId}`;
  const res = await axios.put(url, payload, {
    headers: { "Content-Type": "application/json", ...authHeader() },
    validateStatus: () => true,
  });
  return { data: res.data, status: res.status };
};
export const deleteSeason = async (seasonId, hard = false) => {
  const url = `${BASE}/api/contracts/seasons/${seasonId}?hard=${hard}`;
  const res = await axios.delete(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};

// --- CONTRACTS ---
export const listContracts = async (hotelId, params = {}) => {
  const { page = 1, size = 50, status } = params;
  const query = new URLSearchParams();
  if (page) query.set("page", page);
  if (size) query.set("size", size);
  if (status) query.set("status", status);
  if (!hotelId) {
    console.warn("listContracts called without hotelId; returning empty list to avoid 404");
    return { items: [] };
  }
  const url = `${BASE}/api/contracts/hotels/${hotelId}/contracts${query.toString() ? `?${query.toString()}` : ""}`;
  console.debug("API listContracts URL:", url);
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return res.data;
};
// List all contracts (without hotel filter)
export const listAllContracts = async (params = {}) => {
  const { page = 1, size = 100 } = params;
  const query = new URLSearchParams();
  if (page) query.set("page", page);
  if (size) query.set("size", size);
  const url = `${BASE}/api/contracts/contracts${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};
export const createContract = async (hotelId, payload) => {
  const url = `${BASE}/api/contracts/hotels/${hotelId}/contracts`;
  try { console.log("API createContract →", url, payload); } catch {}
  const res = await axios.post(url, payload, { headers: { "Content-Type": "application/json", ...authHeader() }, validateStatus: () => true });
  return { data: res.data, status: res.status };
};
export const getContract = async (contractId) => {
  const url = `${BASE}/api/contracts/contracts/${contractId}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};
export const updateContract = async (contractId, payload) => {
  const url = `${BASE}/api/contracts/contracts/${contractId}`;
  try { console.log("API updateContract →", url, payload); } catch {}
  const res = await axios.put(url, payload, { headers: { "Content-Type": "application/json", ...authHeader() }, validateStatus: () => true });
  return { data: res.data, status: res.status };
};
export const deleteContract = async (contractId, hard = false) => {
  const url = `${BASE}/api/contracts/contracts/${contractId}?hard=${hard}`;
  const res = await axios.delete(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};
export const setContractStatus = async (contractId, status) => {
  const url = `${BASE}/api/contracts/contracts/${contractId}/status`;
  const res = await axios.patch(
    url,
    { status },
    { headers: { "Content-Type": "application/json", ...authHeader() }, validateStatus: () => true }
  );
  return { data: res.data, status: res.status };
};
// --- RATES ---
export const listRates = async (contractId, params = {}) => {
  const { page = 1, size = 50, seasonId, roomTypeId, mealPlan, marketSegment } = params;
  const query = new URLSearchParams();
  if (page) query.set("page", page);
  if (size) query.set("size", size);
  if (seasonId) query.set("seasonId", seasonId);
  if (roomTypeId) query.set("roomTypeId", roomTypeId);
  if (mealPlan) query.set("mealPlan", mealPlan);
  if (marketSegment) query.set("marketSegment", marketSegment);
  const url = `${BASE}/api/contracts/contracts/${contractId}/rates${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader() });
  return res.data;
};
export const createRate = async (contractId, payload) => {
  const url = `${BASE}/api/contracts/contracts/${contractId}/rates`;
  const res = await axios.post(url, payload, { headers: { "Content-Type": "application/json", ...authHeader() }, validateStatus: () => true });
  return { data: res.data, status: res.status };
};
export const createRatesBulk = async (contractId, items) => {
  const url = `${BASE}/api/contracts/contracts/${contractId}/rates/bulk`;
  const res = await axios.post(url, items, { headers: { "Content-Type": "application/json", ...authHeader() }, validateStatus: () => true });
  return { data: res.data, status: res.status };
};
export const getRate = async (rateId) => {
  const url = `${BASE}/api/contracts/rates/${rateId}`;
  const res = await axios.get(url, { headers: authHeader() });
  return res.data;
};
export const updateRate = async (rateId, payload) => {
  const url = `${BASE}/api/contracts/rates/${rateId}`;
  const res = await axios.put(url, payload, { headers: { "Content-Type": "application/json", ...authHeader() }, validateStatus: () => true });
  return { data: res.data, status: res.status };
};
export const deleteRate = async (rateId, hard = false) => {
  const url = `${BASE}/api/contracts/rates/${rateId}?hard=${hard}`;
  const res = await axios.delete(url, { headers: authHeader() });
  return res.data;
};
// --- ALLOTMENTS ---
export const listAllotments = async (contractId, params = {}) => {
  const { page = 1, size = 50 } = params;
  const query = new URLSearchParams();
  if (page) query.set("page", page);
  if (size) query.set("size", size);
  const url = `${BASE}/api/contracts/contracts/${contractId}/allotments${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader() });
  return res.data;
};
// List allotments by hotel with date range and optional room type filter
export const listAllotmentsByHotel = async (hotelId, params = {}) => {
  const { from, to, roomTypeId } = params;
  const query = new URLSearchParams();
  if (from) query.set("from", from);
  if (to) query.set("to", to);
  if (roomTypeId) query.set("roomTypeId", roomTypeId);
  const url = `${BASE}/api/contracts/hotels/${hotelId}/allotments${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};
export const createAllotment = async (contractId, payload) => {
  const url = `${BASE}/api/contracts/contracts/${contractId}/allotments`;
  const res = await axios.post(url, payload, { headers: { "Content-Type": "application/json", ...authHeader() } });
  return res.data;
};
// Bulk upsert allotments
export const upsertAllotmentsBulk = async (contractId, items) => {
  const url = `${BASE}/api/contracts/contracts/${contractId}/allotments/bulk`;
  const res = await axios.post(url, items, { headers: { "Content-Type": "application/json", ...authHeader() }, validateStatus: () => true });
  return { data: res.data, status: res.status };
};
export const getAllotment = async (allotmentId) => {
  const url = `${BASE}/api/contracts/allotments/${allotmentId}`;
  const res = await axios.get(url, { headers: authHeader() });
  return res.data;
};
export const updateAllotment = async (allotmentId, payload) => {
  const url = `${BASE}/api/contracts/allotments/${allotmentId}`;
  const res = await axios.put(url, payload, { headers: { "Content-Type": "application/json", ...authHeader() } });
  return res.data;
};
export const deleteAllotment = async (allotmentId, hard = false) => {
  const url = `${BASE}/api/contracts/allotments/${allotmentId}?hard=${hard}`;
  const res = await axios.delete(url, { headers: authHeader() });
  return res.data;
};
// --- RESTRICTIONS ---
export const listRestrictions = async (contractId, params = {}) => {
  const { page = 1, size = 50 } = params;
  const query = new URLSearchParams();
  if (page) query.set("page", page);
  if (size) query.set("size", size);
  const url = `${BASE}/api/contracts/contracts/${contractId}/restrictions${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader() });
  return res.data;
};
// Global restrictions list with filters
export const searchRestrictions = async (params = {}) => {
  const { hotelId, contractId, roomTypeId, from, to } = params;
  const query = new URLSearchParams();
  if (hotelId) query.set("hotelId", hotelId);
  if (contractId) query.set("contractId", contractId);
  if (roomTypeId) query.set("roomTypeId", roomTypeId);
  if (from) query.set("from", from);
  if (to) query.set("to", to);
  const url = `${BASE}/api/contracts/restrictions${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};
export const createRestriction = async (contractId, payload) => {
  const url = `${BASE}/api/contracts/contracts/${contractId}/restrictions`;
  const res = await axios.post(url, payload, { headers: { "Content-Type": "application/json", ...authHeader() } });
  return res.data;
};
// Global restriction create
export const createRestrictionGlobal = async (payload) => {
  const url = `${BASE}/api/contracts/restrictions`;
  const res = await axios.post(url, payload, { headers: { "Content-Type": "application/json", ...authHeader() }, validateStatus: () => true });
  return { data: res.data, status: res.status };
};
export const getRestriction = async (restrictionId) => {
  const url = `${BASE}/api/contracts/restrictions/${restrictionId}`;
  const res = await axios.get(url, { headers: authHeader() });
  return res.data;
};
export const updateRestriction = async (restrictionId, payload) => {
  const url = `${BASE}/api/contracts/restrictions/${restrictionId}`;
  const res = await axios.put(url, payload, { headers: { "Content-Type": "application/json", ...authHeader() } });
  return res.data;
};
export const deleteRestriction = async (restrictionId, hard = false) => {
  const url = `${BASE}/api/contracts/restrictions/${restrictionId}?hard=${hard}`;
  const res = await axios.delete(url, { headers: authHeader() });
  return res.data;
};
// --- BLACKOUTS ---
export const listBlackouts = async (contractId, params = {}) => {
  const { page = 1, size = 50 } = params;
  const query = new URLSearchParams();
  if (page) query.set("page", page);
  if (size) query.set("size", size);
  const url = `${BASE}/api/contracts/${contractId}/blackouts${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader() });
  return res.data;
};
// Global blackouts list with filters
export const searchBlackouts = async (params = {}) => {
  const { hotelId, activeOn, q } = params;
  const query = new URLSearchParams();
  if (hotelId) query.set("hotelId", hotelId);
  if (activeOn) query.set("activeOn", activeOn);
  if (q) query.set("q", q);
  const url = `${BASE}/api/contracts/blackouts${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};
export const createBlackout = async (contractId, payload) => {
  const url = `${BASE}/api/contracts/blackouts`;
  const res = await axios.post(url, payload, { headers: { "Content-Type": "application/json", ...authHeader() } });
  return res.data;
};
export const getBlackout = async (blackoutId) => {
  const url = `${BASE}/api/contracts/blackouts/${blackoutId}`;
  const res = await axios.get(url, { headers: authHeader() });
  return res.data;
};
export const updateBlackout = async (blackoutId, payload) => {
  const url = `${BASE}/api/contracts/blackouts/${blackoutId}`;
  const res = await axios.put(url, payload, { headers: { "Content-Type": "application/json", ...authHeader() } });
  return res.data;
};
export const deleteBlackout = async (blackoutId, hard = false) => {
  const url = `${BASE}/api/contracts/blackouts/${blackoutId}?hard=${hard}`;
  const res = await axios.delete(url, { headers: authHeader() });
  return res.data;
};
// --- PROMOTIONS ---
export const listPromotions = async (contractId, params = {}) => {
  const { page = 1, size = 50 } = params;
  const query = new URLSearchParams();
  if (page) query.set("page", page);
  if (size) query.set("size", size);
  const url = `${BASE}/api/contracts/${contractId}/promotions${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader() });
  return res.data;
};
// Global promotions list with filters
export const searchPromotions = async (params = {}) => {
  const { activeOn } = params;
  const query = new URLSearchParams();
  if (activeOn) query.set("activeOn", activeOn);
  const url = `${BASE}/api/contracts/promotions${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};
export const createPromotion = async (contractId, payload) => {
  const url = `${BASE}/api/contracts/promotions`;
  const res = await axios.post(url, payload, { headers: { "Content-Type": "application/json", ...authHeader() } });
  return res.data;
};
export const getPromotion = async (promotionId) => {
  const url = `${BASE}/api/contracts/promotions/${promotionId}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};
export const updatePromotion = async (promotionId, payload) => {
  const url = `${BASE}/api/contracts/promotions/${promotionId}`;
  const res = await axios.put(url, payload, { headers: { "Content-Type": "application/json", ...authHeader() }, validateStatus: () => true });
  return { data: res.data, status: res.status };
};
export const deletePromotion = async (promotionId, hard = false) => {
  const url = `${BASE}/api/contracts/promotions/${promotionId}?hard=${hard}`;
  const res = await axios.delete(url, { headers: authHeader() });
  return res.data;
};

// --- LOOKUPS (generic dropdown data) ---
export const listLookups = async (category, params = {}) => {
  const { q, active } = params;
  const query = new URLSearchParams();
  if (typeof q === "string") query.set("q", q);
  if (typeof active !== "undefined") query.set("active", String(active));
  const url = `${BASE}/api/contracts/lookups/${category}${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader() });
  return res.data;
};

export const createLookup = async (category, payload) => {
  const url = `${BASE}/api/contracts/lookups/${category}`;
  const res = await axios.post(url, payload, { headers: { "Content-Type": "application/json", ...authHeader() } });
  return res.data;
};

export const updateLookup = async (category, id, payload) => {
  const url = `${BASE}/api/contracts/lookups/${category}/${id}`;
  const res = await axios.put(url, payload, { headers: { "Content-Type": "application/json", ...authHeader() } });
  return res.data;
};

export const deleteLookupEntry = async (category, id) => {
  const url = `${BASE}/api/contracts/lookups/${category}/${id}`;
  const res = await axios.delete(url, { headers: authHeader() });
  return res.data;
};

// --- MEDIA ---
export const listMedia = async (params = {}) => {
  const { page = 1, size = 50, hotelId, roomTypeId, type, category, q } = params;
  const query = new URLSearchParams();
  if (page) query.set("page", page);
  if (size) query.set("size", size);
  if (hotelId) query.set("hotelId", hotelId);
  if (roomTypeId) query.set("roomTypeId", roomTypeId);
  if (type) query.set("type", type);
  if (category) query.set("category", category);
  if (q) query.set("q", q);
  const url = `${BASE}/api/contracts/media${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};

export const createMedia = async (payload) => {
  const url = `${BASE}/api/contracts/media`;
  const res = await axios.post(url, payload, {
    headers: { "Content-Type": "application/json", ...authHeader() },
    validateStatus: () => true,
  });
  return { data: res.data, status: res.status };
};

export const getMedia = async (mediaId) => {
  const url = `${BASE}/api/contracts/media/${mediaId}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};

export const updateMedia = async (mediaId, payload) => {
  const url = `${BASE}/api/contracts/media/${mediaId}`;
  const res = await axios.put(url, payload, {
    headers: { "Content-Type": "application/json", ...authHeader() },
    validateStatus: () => true,
  });
  return { data: res.data, status: res.status };
};

export const deleteMedia = async (mediaId, hard = false) => {
  const url = `${BASE}/api/contracts/media/${mediaId}${hard ? '?hard=true' : ''}`;
  const res = await axios.delete(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};

// --- READINESS ---
export const listHotelReadiness = async (params = {}) => {
  const { page = 1, size = 50, status, q } = params;
  const query = new URLSearchParams();
  if (page) query.set("page", page);
  if (size) query.set("size", size);
  if (status) query.set("status", status);
  if (typeof q === "string" && q.trim()) query.set("q", q.trim());
  const url = `${BASE}/api/contracts/readiness/hotels${query.toString() ? `?${query.toString()}` : "?refreshContracts=true"}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return res.data ?? res;
};

export const getHotelReadiness = async (hotelId, params = {}) => {
  const { refreshContracts } = params;
  const query = new URLSearchParams();
  if (typeof refreshContracts !== "undefined") query.set("refreshContracts", String(refreshContracts));
  const url = `${BASE}/api/contracts/hotels/${hotelId}/readiness${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return res.data ?? res;
};

// Trigger hotel publish (readiness → live)
export const publishHotel = async (hotelId, payload = {}) => {
  if (!hotelId) throw new Error("Hotel ID is required to publish");
  const url = `${BASE}/api/contracts/hotels/${hotelId}/publish`;
  const body = payload && Object.keys(payload).length ? payload : {};
  const res = await axios.post(url, body, {
    headers: { "Content-Type": "application/json", ...authHeader() },
    validateStatus: () => true,
  });
  return { data: res.data, status: res.status };
};

// Read hotel sync jobs to track "syncing/synced/failed" after publish
export const getHotelSyncJobs = async (hotelId) => {
  if (!hotelId) throw new Error("Hotel ID is required to read sync jobs");
  const url = `${BASE}/api/contracts/hotels/${hotelId}/sync-jobs`;
  const res = await axios.get(url, {
    headers: authHeader(),
    validateStatus: () => true,
  });
  return { data: res.data, status: res.status };
};

export const getContractCompletionSummary = async (contractId, params = {}) => {
  const { refresh } = params;
  const query = new URLSearchParams();
  if (typeof refresh !== "undefined") query.set("refresh", String(refresh));
  const url = `${BASE}/api/contracts/contracts/${contractId}/completion${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return res.data ?? res;
};

// --- DASHBOARD (Extranet) ---
export const dashboardOverview = async (params = {}) => {
  const { hotelId, city, country, from, to } = params;
  const query = new URLSearchParams();
  if (hotelId) query.set("hotelId", hotelId);
  if (city) query.set("city", city);
  if (country) query.set("country", country);
  if (from) query.set("from", from);
  if (to) query.set("to", to);
  const url = `${BASE}/api/contracts/dashboard/overview${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};

export const dashboardImportsSummary = async (params = {}) => {
  const { from, to } = params;
  const query = new URLSearchParams();
  if (from) query.set("from", from);
  if (to) query.set("to", to);
  const url = `${BASE}/api/contracts/dashboard/imports${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};

export const dashboardContractsSummary = async (params = {}) => {
  const { hotelId, from, to } = params;
  const query = new URLSearchParams();
  if (hotelId) query.set("hotelId", hotelId);
  if (from) query.set("from", from);
  if (to) query.set("to", to);
  const url = `${BASE}/api/contracts/dashboard/contracts${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};

export const dashboardInventorySummary = async (params = {}) => {
  const { hotelId, from, to } = params;
  const query = new URLSearchParams();
  if (hotelId) query.set("hotelId", hotelId);
  if (from) query.set("from", from);
  if (to) query.set("to", to);
  const url = `${BASE}/api/contracts/dashboard/inventory${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};

export const dashboardImportsTimeseries = async (params) => {
  const { from, to } = params || {};
  const query = new URLSearchParams();
  if (from) query.set("from", from);
  if (to) query.set("to", to);
  const url = `${BASE}/api/contracts/dashboard/imports/timeseries${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};

export const dashboardContractsTimeseries = async (params) => {
  const { from, to, hotelId } = params || {};
  const query = new URLSearchParams();
  if (from) query.set("from", from);
  if (to) query.set("to", to);
  if (hotelId) query.set("hotelId", hotelId);
  const url = `${BASE}/api/contracts/dashboard/contracts/timeseries${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};

// Comprehensive dashboard snapshot
export const dashboardFullOverview = async (params = {}) => {
  const { hotelId, city, country, from, to } = params;
  const query = new URLSearchParams();
  if (hotelId) query.set("hotelId", hotelId);
  if (city) query.set("city", city);
  if (country) query.set("country", country);
  if (from) query.set("from", from);
  if (to) query.set("to", to);
  const url = `${BASE}/api/contracts/dashboard/full-overview${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await axios.get(url, { headers: authHeader(), validateStatus: () => true });
  return { data: res.data, status: res.status };
};
