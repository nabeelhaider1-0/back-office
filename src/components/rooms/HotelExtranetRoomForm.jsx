import React, { useEffect, useMemo, useRef, useState } from "react";
import MultiSelect from "../reactMultiSelect";
import { listHotels } from "../../Apis/hotelExtranetApi";
import { toast } from "react-toastify";
import HotelsImageUploader from "../hotelinventoryapp/HotelExtranetAddHotel.jsx";
import LookupSelectWithManage from "../lookups/LookupSelectWithManage";
import uploadFileExtranet from "../../constants/filesuploaderExtranet";

const defaultRoom = {
  code: "",
  name: "",
  // description removed from state as per API
  max_adults: 2,
  max_children: 0,
  amenities: [],
  area_sqm: 0,
  hotelId: "",
  occupancy: { adults: 1, children: 0, max_guest: 1 },
  bedding: [],
  images: [],
};

export default function HotelExtranetRoomForm({
  mode = "create",
  initialValue,
  onSubmit,
  submitting = false,
  wizardConfig = null,
  baseDefaults = null,
}) {
  const computedDefaults = useMemo(() => {
    if (baseDefaults && typeof baseDefaults === "object") {
      return { ...defaultRoom, ...baseDefaults };
    }
    return defaultRoom;
  }, [baseDefaults]);
  const [room, setRoom] = useState(initialValue || computedDefaults);
  const [hotels, setHotels] = useState([]);
  const [hotelOptions, setHotelOptions] = useState([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const hotelSearchRef = useRef(""); // for optional debounce hotel search later
  const debounceRef = useRef(null);
  const isView = mode === "view";
  const isEdit = mode === "edit";
  // Add field-level validity
  const [errors, setErrors] = useState({});
  const [newBedding, setNewBedding] = useState("");
  const [imageUpload, setImageUpload] = useState(false);
  const [uploading, setUploading] = useState(false); // for upload spinner
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [primaryIdx, setPrimaryIdx] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageLabel, setNewImageLabel] = useState("");
  const [imageErrors, setImageErrors] = useState({});
  const [submitIntent, setSubmitIntent] = useState("save");
  const submitIntentRef = useRef("save");
  const updateSubmitIntent = (intent) => {
    submitIntentRef.current = intent;
    setSubmitIntent(intent);
  };
  const isWizard = Boolean(wizardConfig?.isActive);
  const continueLabel = wizardConfig?.continueLabel || "Save & Continue";
  const fieldRefs = useRef({});
  const registerField = (key) => (el) => {
    if (el) {
      fieldRefs.current[key] = el;
    }
  };
  const focusField = (key) => {
    const el = fieldRefs.current[key];
    if (!el) return;
    const target = el.querySelector?.("input,textarea,select") || el;
    if (target && typeof target.focus === "function") {
      target.focus();
      if (target.scrollIntoView) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };
  const clearFieldError = (key) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = () => {
    const err = {};
    if (!room.hotelId) err.hotelId = "Hotel is required";
    if (!room.name) err.name = "Room name is required";
    setErrors(err);
    const keys = Object.keys(err);
    if (keys.length) {
      focusField(keys[0]);
      toast.error("Please fill the highlighted required fields");
      return false;
    }
    return true;
  };

  useEffect(() => {
    setRoom(initialValue || computedDefaults);
  }, [initialValue, computedDefaults]);

  useEffect(() => {
    async function fetchHotels() {
      setIsLoadingHotels(true);
      try {
        const resp = await listHotels({ page: 1, size: 100 });
        // Correct parsing from actual response
        const arr = Array.isArray(resp?.items) ? resp.items : [];
        setHotels(arr);
        setHotelOptions(
          arr.map((h) => ({ value: h.id, label: h.displayName }))
        );
      } catch (e) {
        setHotels([]);
        setHotelOptions([]);
      } finally {
        setIsLoadingHotels(false);
      }
    }
    fetchHotels();
    // You could add a search debounce here if needed.
  }, []);

  const onChange = (field, value) => {
    if (isView) return;
    setRoom((prev) => ({ ...prev, [field]: value }));
    clearFieldError(field);
  };

  const onOccupancyChange = (field, val) => {
    if (isView) return;
    setRoom((prev) => ({
      ...prev,
      occupancy: { ...prev.occupancy, [field]: val },
    }));
  };

  const handleAddBedding = () => {
    if (!newBedding.trim()) return;
    setRoom((r) => ({ ...r, bedding: [...r.bedding, newBedding.trim()] }));
    setNewBedding("");
  };
  const handleRemoveBedding = (i) => {
    setRoom((r) => ({
      ...r,
      bedding: r.bedding.filter((_, idx) => idx !== i),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) return;
    const intent = submitIntentRef.current || "save";
    updateSubmitIntent("save");
    if (!validate()) return;
    onSubmit && onSubmit(room, intent);
  };

  const handleImagesSelected = async (files) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const resp = await uploadFileExtranet(file);
        if (resp?.success) {
          setRoom((prev) => ({
            ...prev,
            images: [
              ...(prev.images || []),
              { url: resp.imagelink, label: "" },
            ],
          }));
        } else {
          toast.error("Image upload failed");
        }
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="panel-body">
        {/* Basic Room Info */}
        <div className="form-group mt-2">
          <h5>Basic Info</h5>
        </div>
        <div className="row">
          <div className="col-md-4 form-group" ref={registerField("hotelId")}>
            <label>
              Hotel <span className="text-danger">*</span>
            </label>
            <MultiSelect
              isSearchable
              isMulti={false}
              isLoading={isLoadingHotels}
              options={hotelOptions}
              placeholder="- Select Hotel -"
              className={`custom-select${errors.hotelId ? " is-invalid" : ""}`}
              value={hotelOptions.find((o) => o.value === room.hotelId) || null}
              onChange={(opt) => onChange("hotelId", opt ? opt.value : "")}
              isDisabled={isView}
              isInvalid={Boolean(errors.hotelId)}
            />
            {errors.hotelId && (
              <div className="invalid-feedback d-block">
                {typeof errors.hotelId === "string"
                  ? errors.hotelId
                  : "Hotel is required"}
              </div>
            )}
          </div>
          <div className="col-md-4 form-group" ref={registerField("name")}>
            <label>
              Room Name <span className="text-danger">*</span>
            </label>
            <LookupSelectWithManage
              category="room_names"
              label="Room Name"
              value={room.name || ""}
              onChange={(val) => onChange("name", val || "")}
              disabled={isView}
              showManage
              placeholder="- Select Room Name -"
              isInvalid={Boolean(errors.name)}
              errorMessage={
                errors.name &&
                (typeof errors.name === "string"
                  ? errors.name
                  : "Room name is required")
              }
            />
            {errors.name && (
              <div className="invalid-feedback d-block">
                {typeof errors.name === "string"
                  ? errors.name
                  : "Room name is required"}
              </div>
            )}
          </div>
        </div>
        <div className="row">
          {/* Description removed as per API */}
          <div className="col-md-2 form-group">
            <label>Max Adults</label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={room.max_adults}
              onChange={(e) =>
                onChange("max_adults", parseInt(e.target.value, 10) || 0)
              }
              min={1}
              step={1}
              max={9}
              disabled={isView}
            />
          </div>
          <div className="col-md-2 form-group">
            <label>Max Children</label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={room.max_children}
              onChange={(e) =>
                onChange("max_children", parseInt(e.target.value, 10) || 0)
              }
              min={0}
              step={1}
              max={9}
              disabled={isView}
            />
          </div>
          <div className="col-md-2 form-group">
            <label>Area (sqm)</label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={room.area_sqm}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10);
                onChange("area_sqm", Number.isFinite(n) && n >= 0 ? n : 0);
              }}
              min={0}
              step={1}
              disabled={isView}
            />
          </div>
        </div>
        {/* Occupancy Section */}
        <div className="form-group">
          <h5>Occupancy</h5>
        </div>
        <div className="row">
          <div className="col-md-3 form-group">
            <label>
              Adults <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={room.occupancy.adults}
              min={1}
              max={9}
              disabled={isView}
              onChange={(e) =>
                onOccupancyChange("adults", Number(e.target.value))
              }
            />
          </div>
          <div className="col-md-3 form-group">
            <label>
              Children <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={room.occupancy.children}
              min={0}
              max={9}
              disabled={isView}
              onChange={(e) =>
                onOccupancyChange("children", Number(e.target.value))
              }
            />
          </div>
          <div className="col-md-3 form-group">
            <label>
              Max Guests <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={room.occupancy.max_guest}
              min={1}
              max={18}
              disabled={isView}
              onChange={(e) =>
                onOccupancyChange("max_guest", Number(e.target.value))
              }
            />
          </div>
        </div>
        {/* Bedding & Amenities (managed lookups) */}
        <div className="row">
          <div className="col-md-6 form-group">
            <label>Bedding</label>
            <LookupSelectWithManage
              category="bedding_types"
              label="Bedding"
              isMulti
              disabled={isView}
              value={room.bedding}
              onChange={(vals) => onChange("bedding", vals)}
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Amenities</label>
            <LookupSelectWithManage
              category="room_amenities"
              label="Amenities"
              isMulti
              disabled={isView}
              value={room.amenities}
              onChange={(vals) => onChange("amenities", vals)}
            />
          </div>
        </div>
        {/* Removed old tag-based amenities to avoid duplicates */}
        {/* Images Section */}
        <div className="form-group mt-2">
          <h5>Images</h5>
        </div>
        {!isView && (
          <div className="row">
            {/* Drag/drop uploader from Hotels form */}
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
                    onClick={() =>
                      document.getElementById("imageUploadInput").click()
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const files = Array.from(
                        e.dataTransfer.files || []
                      ).filter((f) => f.type.startsWith("image/"));
                      handleImagesSelected(files);
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
                    id="imageUploadInput"
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      handleImagesSelected(Array.from(e.target.files || []))
                    }
                  />
                  {uploading && (
                    <div style={{ marginTop: 6 }}>Uploading...</div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-4 form-group">
              <div className="card" style={{ border: "1px solid #e5e7eb" }}>
                <div className="card-body">
                  <label className="form-label">Add by URL</label>
                  <input
                    type="text"
                    className="form-control form-control-sm mb-2"
                    placeholder="https://..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                  />
                  <div className="mb-2">
                    <label className="form-label" style={{ fontSize: 12 }}>
                      Label
                    </label>
                    <LookupSelectWithManage
                      category="media_categories"
                      label="Label"
                      value={newImageLabel || ""}
                      onChange={(val) => setNewImageLabel(val || "")}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    onClick={() => {
                      if (newImageUrl) {
                        setRoom((prev) => ({
                          ...prev,
                          images: [
                            ...(prev.images || []),
                            { url: newImageUrl, label: newImageLabel || "" },
                          ],
                        }));
                        setNewImageUrl("");
                        setNewImageLabel("");
                      }
                    }}
                    title="Add image"
                  >
                    <i className="fa fa-plus" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {!!room.images.length && (
          <div className="row pt-2">
            <div className="col-md-12">
              <div className="row">
                {room.images.map((img, idx) => (
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
                      const next = [...room.images];
                      const [moved] = next.splice(dragIndex, 1);
                      next.splice(idx, 0, moved);
                      setRoom((p) => ({ ...p, images: next }));
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
                          title={img.url}
                        >
                          {String(img.url || "")
                            .split("/")
                            .pop()}
                        </div>
                        <div className="btn-group btn-group-sm">
                          <a
                            className="btn btn-outline-secondary btn-sm"
                            href={img.url}
                            target="_blank"
                            rel="noreferrer"
                            title="Open in new tab"
                            style={{ border: "1px solid #e5e7eb" }}
                          >
                            <i className="fa fa-external-link" />
                          </a>
                          <button
                            type="button"
                            className="btn btn-light"
                            style={{ border: "1px solid #e5e7eb" }}
                            title="Copy URL"
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(img.url);
                                toast.success("URL copied");
                              } catch (_) {}
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
                            onClick={() =>
                              setRoom((p) => ({
                                ...p,
                                images: p.images.filter((_, i) => i !== idx),
                              }))
                            }
                          >
                            <i className="fa fa-trash" />
                          </button>
                        </div>
                      </div>
                      <img
                        src={img.url}
                        alt={img.label || "image"}
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
                              Label <span className="text-danger">*</span>
                            </label>
                            <LookupSelectWithManage
                              category="media_categories"
                              label="Label"
                              value={img.label || ""}
                              onChange={(val) => {
                                const next = [...room.images];
                                next[idx] = { ...next[idx], label: val || "" };
                                setRoom((p) => ({ ...p, images: next }));
                                setImageErrors((prev) => ({
                                  ...prev,
                                  [idx]: { ...(prev[idx] || {}), label: false },
                                }));
                              }}
                              disabled={isView}
                            />
                            {imageErrors[idx]?.label ? (
                              <div className="invalid-feedback d-block">
                                Label is required
                              </div>
                            ) : null}
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
            </div>
            <div className="d-flex justify-content-end mt-2">
              {!!room.images.length && (
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() =>
                    setRoom((p) => ({ ...p, images: [] })) &&
                    setPrimaryIdx(null)
                  }
                >
                  Remove All
                </button>
              )}
            </div>
          </div>
        )}
        {/* Existing Save/Update button row... */}
        {!isView && (
          <div className="row mt-4">
            <div className="col-md-12 d-flex flex-wrap gap-2">
              {!isWizard && (
                <button
                  type="submit"
                  className="btn btn-dark btn-sm"
                  disabled={submitting}
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
                disabled={submitting}
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
                  disabled={submitting}
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

function TagInput({ values, onAdd, onRemove, placeholder, disabled }) {
  const [input, setInput] = useState("");
  return (
    <>
      <div className="input-group input-group-sm mb-2">
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === "Enter" && input.trim()) {
              onAdd(input.trim());
              setInput("");
            }
          }}
          disabled={disabled}
        />
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => {
            if (disabled) return;
            if (!input.trim()) return;
            onAdd(input.trim());
            setInput("");
          }}
          title="Add"
          disabled={disabled}
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
      <div>
        {values.map((v, i) => (
          <span
            key={i}
            className="badge bg-light text-dark me-1 mb-1"
            style={{ border: "1px solid #e5e7eb" }}
          >
            {v}
            {!disabled && (
              <button
                type="button"
                className="btn btn-sm btn-danger ms-2 py-0 px-1"
                onClick={() => onRemove(i)}
                title="Remove"
              >
                <i className="fa fa-minus"></i>
              </button>
            )}
          </span>
        ))}
      </div>
    </>
  );
}
