import React, { useEffect, useMemo, useState, useRef } from "react";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import LookupSelectWithManage from "../lookups/LookupSelectWithManage";
import { listHotels, listRooms } from "../../Apis/hotelExtranetApi";
import uploadFileExtranet from "../../constants/filesuploaderExtranet";
import { toast } from "react-toastify";

const defaultMedia = {
  hotelId: "",
  roomTypeId: "",
  url: "",
  type: "",
  category: "",
  alt: "",
  caption: "",
  sort_order: "",
  license: "",
};

function MediaUploader({
  onFileSelected,
  uploading,
  accept = "image/*,video/*,.pdf,.doc,.docx",
}) {
  const inputRef = useRef(null);
  const onPick = () => inputRef.current && inputRef.current.click();
  return (
    <div className="col-md-12 form-group">
      <div className="card" style={{ border: "1px solid #e5e7eb" }}>
        <div className="card-body">
          <label className="form-label">
            Upload Media (S3 bucket: extranet)
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
              const files = Array.from(e.dataTransfer.files || []);
              if (files.length > 0) onFileSelected && onFileSelected(files[0]);
            }}
          >
            <div className="mb-1">
              <i
                className="fa fa-cloud-upload"
                style={{
                  color: "#FF5015",
                  fontSize: 30,
                  background: "#FFEAE3",
                  borderRadius: "50%",
                  padding: 6,
                }}
              ></i>
            </div>
            <div>Drag & drop media here or click to browse</div>
            <small>Images, Videos, Documents up to your S3 limits</small>
          </div>
          <input
            ref={inputRef}
            type="file"
            style={{ display: "none" }}
            accept={accept}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFileSelected && onFileSelected(file);
              e.target.value = null;
            }}
          />
          {uploading && <div style={{ marginTop: 6 }}>Uploading...</div>}
        </div>
      </div>
    </div>
  );
}

export default function HotelExtranetMediaForm({
  mode = "create",
  initialValue,
  onSubmit,
  submitting = false,
  wizardConfig = null,
  baseDefaults = null,
}) {
  const computedDefaults = useMemo(() => {
    if (baseDefaults && typeof baseDefaults === "object") {
      return { ...defaultMedia, ...baseDefaults };
    }
    return defaultMedia;
  }, [baseDefaults]);
  const [form, setForm] = useState(() => {
    try {
      return initialValue || computedDefaults;
    } catch (e) {
      console.error("Form - Error initializing form state:", e);
      return computedDefaults;
    }
  });
  const [hotelOptions, setHotelOptions] = useState([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const [roomOptions, setRoomOptions] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const urlRef = useRef(null);
  const typeRef = useRef(null);
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const [submitIntent, setSubmitIntent] = useState("save");
  const submitIntentRef = useRef("save");
  const updateSubmitIntent = (intent) => {
    submitIntentRef.current = intent;
    setSubmitIntent(intent);
  };
  const isWizard = Boolean(wizardConfig?.isActive);
  const continueLabel = wizardConfig?.continueLabel || "Save & Continue";

  // Normalize and set form data from initialValue
  useEffect(() => {
    if (!initialValue) {
      if (mode === "create") {
        setForm(computedDefaults);
      }
      return;
    }

    console.log("Form - initialValue received:", initialValue);
    const api = initialValue;
    const next = {
      hotelId: api.hotel_id || api.hotelId || "",
      roomTypeId: api.room_type_id || api.roomTypeId || "",
      url: api.url || "",
      type: api.type || "",
      category: api.category || "",
      alt: api.alt || "",
      caption: api.caption || "",
      sort_order: api.sort_order || api.sortOrder || "",
      license: api.license || "",
    };
    console.log("Form - normalized data:", next);
    setForm(next);
  }, [initialValue, mode, computedDefaults]);

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

  useEffect(() => {
    if (baseDefaults?.hotelId) {
      setForm((prev) =>
        prev.hotelId ? prev : { ...prev, hotelId: baseDefaults.hotelId }
      );
    }
  }, [baseDefaults?.hotelId]);

  useEffect(() => {
    const loadRooms = async () => {
      if (!form.hotelId) {
        setRoomOptions([]);
        return;
      }
      try {
        setIsLoadingRooms(true);
        console.log("Form - Loading rooms for hotelId:", form.hotelId);
        const resp = await listRooms(form.hotelId, { page: 1, size: 100 });
        const arr = Array.isArray(resp?.items)
          ? resp.items
          : Array.isArray(resp?.data)
          ? resp.data
          : Array.isArray(resp)
          ? resp
          : [];
        const options = arr.map((r) => ({
          value: r.id || r.roomId,
          label: r.name || r.code,
        }));
        console.log("Form - Rooms loaded:", options);
        setRoomOptions(options);
      } catch (e) {
        console.error("Form - Error loading rooms:", e);
        setRoomOptions([]);
      } finally {
        setIsLoadingRooms(false);
      }
    };
    loadRooms();
  }, [form.hotelId]);

  const setField = (name, value) => {
    if (isView) return;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const resp = await uploadFileExtranet(file);
      if (resp?.success) {
        setField("url", resp.imagelink);
        toast.success("Media uploaded successfully");
      } else {
        toast.error("Media upload failed: " + (resp?.error || "Unknown error"));
      }
    } catch (e) {
      toast.error("Media upload failed: " + (e?.message || "Unknown error"));
    } finally {
      setUploading(false);
    }
  };

  const fieldRefs = {
    url: urlRef,
    type: typeRef,
  };

  const focusField = (key) => {
    const ref = fieldRefs[key]?.current;
    if (!ref) return;
    if (typeof ref.focus === "function") {
      ref.focus();
      return;
    }
    const input = ref.querySelector?.("input");
    if (input) input.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) return;
    const intent = submitIntentRef.current || "save";
    updateSubmitIntent("save");
    const validationErrors = {};
    if (!form.url || !String(form.url).trim())
      validationErrors.url = "URL is required";
    if (!form.type || !String(form.type).trim())
      validationErrors.type = "Type is required";
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      focusField(Object.keys(validationErrors)[0]);
      toast.error("Please fill the highlighted required fields");
      return;
    }
    setErrors({});
    const payload = {
      hotel_id: form.hotelId || undefined,
      room_type_id: form.roomTypeId || undefined,
      url: form.url,
      type: form.type,
      category: form.category || undefined,
      alt: form.alt || undefined,
      caption: form.caption || undefined,
      sort_order: form.sort_order ? Number(form.sort_order) : undefined,
      license: form.license || undefined,
    };
    onSubmit ? onSubmit(payload, intent) : null;
  };

  // Safety check - ensure form has all required fields
  const safeForm = {
    hotelId: form?.hotelId || "",
    roomTypeId: form?.roomTypeId || "",
    url: form?.url || "",
    type: form?.type || "",
    category: form?.category || "",
    alt: form?.alt || "",
    caption: form?.caption || "",
    sort_order: form?.sort_order || "",
    license: form?.license || "",
  };

  return (
    <form onSubmit={handleSubmit} className="form" autoComplete="off">
      <div className="panel-body">
        <div className="row g-3 align-items-end">
          <div className="col-md-4 form-group">
            <label>Hotel</label>
            <MultiSelect
              isSearchable
              isMulti={false}
              isLoading={isLoadingHotels}
              options={hotelOptions}
              placeholder="- Select Hotel -"
              className="custom-select"
              value={
                hotelOptions.find((o) => o.value === safeForm.hotelId) || null
              }
              onChange={(opt) => setField("hotelId", opt ? opt.value : "")}
              noOptionsMessage={() =>
                isLoadingHotels ? "Loading..." : "Type to search"
              }
              isDisabled={isView}
            />
          </div>
          <div className="col-md-4 form-group">
            <label>Room Type</label>
            <MultiSelect
              isSearchable
              isMulti={false}
              isLoading={isLoadingRooms}
              options={roomOptions}
              placeholder="- Optional -"
              className="custom-select"
              value={
                roomOptions.find((o) => o.value === safeForm.roomTypeId) || null
              }
              onChange={(opt) => setField("roomTypeId", opt ? opt.value : "")}
              noOptionsMessage={() =>
                isLoadingRooms ? "Loading..." : "Type to search"
              }
              isDisabled={isView}
            />
          </div>
          <div className="col-md-4 form-group" ref={typeRef}>
            <label>
              Type <span className="text-danger">*</span>
            </label>
            <LookupSelectWithManage
              category="media_types"
              label="Type"
              value={safeForm.type}
              onChange={(val) => setField("type", val)}
              disabled={isView}
              isInvalid={Boolean(errors.type)}
              errorMessage={errors.type}
            />
          </div>
        </div>

        <div className="row mt-3 g-2 align-items-end">
          {!isView && (
            <MediaUploader
              onFileSelected={handleFileUpload}
              uploading={uploading}
            />
          )}
          <div className="col-md-12 form-group">
            <label>
              URL <span className="text-danger">*</span>
            </label>
            <input
              ref={urlRef}
              type="url"
              className={`form-control form-control-sm ${
                errors.url ? "is-invalid" : ""
              }`}
              value={safeForm.url}
              onChange={(e) => setField("url", e.target.value)}
              disabled={isView}
              placeholder="https://example.com/media.jpg"
            />
            {errors.url ? (
              <div className="invalid-feedback d-block">{errors.url}</div>
            ) : null}
          </div>
          <div className="col-md-4 form-group">
            <label>Category</label>
            <LookupSelectWithManage
              category="media_categories"
              label="Category"
              value={safeForm.category}
              onChange={(val) => setField("category", val)}
              disabled={isView}
            />
          </div>
          <div className="col-md-4 form-group">
            <label>License</label>
            <LookupSelectWithManage
              category="media_licenses"
              label="License"
              value={safeForm.license}
              onChange={(val) => setField("license", val)}
              disabled={isView}
            />
          </div>
          <div className="col-md-4 form-group">
            <label>Sort Order</label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={safeForm.sort_order}
              onChange={(e) => setField("sort_order", e.target.value)}
              disabled={isView}
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Alt Text</label>
            <input
              className="form-control form-control-sm"
              value={safeForm.alt}
              onChange={(e) => setField("alt", e.target.value)}
              disabled={isView}
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Caption</label>
            <input
              className="form-control form-control-sm"
              value={safeForm.caption}
              onChange={(e) => setField("caption", e.target.value)}
              disabled={isView}
            />
          </div>
          {safeForm.url && (
            <div className="col-md-12 form-group">
              <label>Preview</label>
              <div className="mt-2">
                {safeForm.type === "image" ||
                safeForm.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                  <img
                    src={safeForm.url}
                    alt={safeForm.alt || "Preview"}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                  />
                ) : safeForm.type === "video" ||
                  safeForm.url.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video
                    src={safeForm.url}
                    controls
                    style={{ maxWidth: "100%", maxHeight: "300px" }}
                  />
                ) : (
                  <a
                    href={safeForm.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-dark"
                  >
                    View Media
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {!isView && (
          <div className="row mt-4">
            <div className="col-md-12 d-flex flex-wrap gap-2">
              {!isWizard && (
                <button
                  type="submit"
                  className="btn btn-dark btn-sm"
                  disabled={submitting || uploading}
                  onClick={() => updateSubmitIntent("save")}
                >
                  {submitting && submitIntent === "save"
                    ? isEdit
                      ? "Updating..."
                      : "Saving..."
                    : isEdit
                    ? "Update"
                    : "Save"}
                </button>
              )}
              <button
                type="submit"
                className="btn btn-outline-secondary btn-sm"
                disabled={submitting || uploading}
                onClick={() => updateSubmitIntent("save-stay")}
              >
                {submitting && submitIntent === "save-stay"
                  ? "Saving..."
                  : "Save & Add Another"}
              </button>
              {isWizard && (
                <button
                  type="submit"
                  className="btn btn-dark btn-sm"
                  disabled={submitting || uploading}
                  onClick={() => updateSubmitIntent("save-next")}
                >
                  {submitting && submitIntent === "save-next"
                    ? "Continuing..."
                    : continueLabel}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
