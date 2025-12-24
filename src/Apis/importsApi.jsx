import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const authHeader = () => ({
  Authorization: `Bearer ${window.localStorage.getItem("token")}`,
});

export const startImportMultipart = async ({
  file,
  fileUrl,
  importType,
  flags = {},
  idempotencyKey,
}) => {
  const form = new FormData();
  if (file) form.append("file", file);
  if (fileUrl) form.append("file_url", fileUrl);
  form.append("import_type", importType);
  Object.entries(flags).forEach(([k, v]) => {
    if (v !== undefined && v !== null) form.append(k, String(v));
  });

  const headers = { ...authHeader() };
  if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;
  const res = await axios.post(`${BASE_URL}api/imports`, form, { headers });
  return res.data;
};

export const startImportFromUrl = async ({
  importType,
  fileUrl,
  options = {},
  idempotencyKey,
}) => {
  const headers = { ...authHeader(), "Content-Type": "application/json" };
  if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;
  const body = { import_type: importType, file_url: fileUrl, options };
  const res = await axios.post(`${BASE_URL}api/imports/from-url`, body, {
    headers,
  });
  return res.data;
};

export const getImportStatus = async (id) => {
  const res = await axios.get(`${BASE_URL}api/imports/${id}`, {
    headers: authHeader(),
  });
  return res.data;
};

export const getImportErrorsLink = async (id) => {
  const res = await axios.get(`${BASE_URL}api/imports/${id}/errors`, {
    headers: authHeader(),
  });
  return res.data;
};

export const downloadImportErrors = async (id) => {
  const res = await axios.get(`${BASE_URL}api/imports/${id}/download-errors`, {
    headers: authHeader(),
    responseType: "blob",
  });
  console.log(res);
  return res;
};

export const regenerateImportReport = async (id) => {
  const res = await axios.post(
    `${BASE_URL}api/imports/${id}/regenerate-report`,
    {},
    { headers: { ...authHeader(), "Content-Type": "application/json" } }
  );
  return res.data;
};

export const debugImportJob = async (id) => {
  const res = await axios.get(`${BASE_URL}api/imports/${id}/debug`, {
    headers: authHeader(),
  });
  return res.data;
};

export const cleanupImportReports = async (olderThanDays = 7) => {
  const res = await axios.post(
    `${BASE_URL}api/imports/cleanup`,
    { olderThanDays },
    { headers: { ...authHeader(), "Content-Type": "application/json" } }
  );
  return res.data;
};


