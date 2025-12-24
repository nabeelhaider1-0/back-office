/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Header2 from "../../../header2/header2";
import { apiHandler } from "../../../../Apis/backOfficeApiHandler";
import Constants from "../../../../constants/routes";

const ContinentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [mode, setMode] = useState("create"); // 'create' | 'edit' | 'view'
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        path.includes("toolsGeographicalContentContinentsView")
          ? "toolsGeographicalContentContinentsView"
          : "toolsGeographicalContentContinentsEdit"
      );
      fetchContinent();
    }
  }, [id, location.pathname]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
    trigger,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: "",
      name_full: "",
      expedia_id: "null",
      center_latitude: "",
      center_longitude: "",
      is_active: true,
      coords: [{ lat: "", lng: "" }],
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
      required: { value: true, message: "Continent name is required" },
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

  const fetchContinent = async () => {
    try {
      const response = await apiHandler.get(`/api/continent/${id}`);

      // Normalize various response shapes
      const httpOk = response?.status === 200 || response?.status === 201;
      const body = response?.data ?? response;
      const apiOk =
        body?.status === 200 ||
        body?.status === 201 ||
        body?.status === true ||
        body?.success === true;

      // Where the continent object might live
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

        const continentData = {
          name: c.name ?? c?.name_json?.[0]?.name ?? "",
          name_full: c.name_full ?? c?.name_json?.[0]?.name_full ?? "",
          expedia_id: c.expedia_id === "null" ? "null" : c.expedia_id ?? "",
          center_latitude:
            c.center_latitude === null || c.center_latitude === undefined
              ? ""
              : String(c.center_latitude),
          center_longitude:
            c.center_longitude === null || c.center_longitude === undefined
              ? ""
              : String(c.center_longitude),
          is_active: Boolean(c.is_active),
          coords: coords.length ? coords : [{ lat: "", lng: "" }],
        };

        reset(continentData);

        // force validation pass on load
        setTimeout(() => {
          Object.keys(continentData).forEach((k) =>
            setValue(k, continentData[k], { shouldValidate: true })
          );
          trigger();
          Object.keys(continentData).forEach((k) => clearErrors(k));
        }, 50);
      } else {
        toast.error(response?.data?.message || "Failed to fetch continent");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Failed to fetch continent details";
      toast.error(msg);
    }
  };

  const onSubmit = async (data) => {
    if (mode === "toolsGeographicalContentCountriesView") return;
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
      expedia_id: data.expedia_id?.toString().trim() || null,
      center_latitude:
        data.center_latitude === "" ? null : parseFloat(data.center_latitude),
      center_longitude:
        data.center_longitude === "" ? null : parseFloat(data.center_longitude),
      is_active: Boolean(data.is_active),
      bounding_polygon,
    };

    try {
      const response =
        mode === "create"
          ? await apiHandler.post("/api/continent", payload)
          : await apiHandler.patch(`/api/continent/${id}`, payload);

      if (response?.status) {
        toast.success(
          mode === "create"
            ? "Continent created successfully"
            : "Continent updated successfully"
        );
        navigate(
          Constants.URLConstants.TOOLSGEOGRAPHICALCONTENTCONTINENTSSEARCH
        );
      } else {
        toast.error(
          response?.message ||
            `Failed to ${mode === "create" ? "create" : "update"} continent`
        );
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        `Failed to ${mode === "create" ? "create" : "update"} continent`;
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasError = (f) => !!errors[f];
  const errMsg = (f) => errors?.[f]?.message || "";

  const title =
    mode === "toolsGeographicalContentContinentsView"
      ? "VIEW CONTINENT"
      : mode === "toolsGeographicalContentContinentsEdit"
      ? "EDIT CONTINENT"
      : "Add Continent";

  return (
    <>
      <Header2
        title={title}
        linkText1="Continents List"
        linkText2={title}
        link1={Constants.URLConstants.TOOLSGEOGRAPHICALCONTENTCONTINENTSSEARCH}
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
                placeholder="Continent name"
                readOnly={mode === "toolsGeographicalContentContinentsView"}
                disabled={mode === "toolsGeographicalContentContinentsView"}
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
                placeholder="Full continent name"
                readOnly={mode === "toolsGeographicalContentContinentsView"}
                disabled={mode === "toolsGeographicalContentContinentsView"}
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
              <label>Expedia ID</label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Optional"
                readOnly={mode === "toolsGeographicalContentContinentsView"}
                disabled={mode === "toolsGeographicalContentContinentsView"}
                {...register("expedia_id")}
              />
              <small className="form-text text-muted">
                Will be sent as string or null
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
                readOnly={mode === "toolsGeographicalContentContinentsView"}
                disabled={mode === "toolsGeographicalContentContinentsView"}
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
                readOnly={mode === "toolsGeographicalContentContinentsView"}
                disabled={mode === "toolsGeographicalContentContinentsView"}
                {...register("center_longitude", validation.center_longitude)}
              />
              {hasError("center_longitude") && (
                <div className="invalid-feedback d-block">
                  {errMsg("center_longitude")}
                </div>
              )}
              <small className="form-text text-muted">-180 to 180</small>
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
                      disabled={
                        mode === "toolsGeographicalContentContinentsView"
                      }
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
                      readOnly={
                        mode === "toolsGeographicalContentContinentsView"
                      }
                      disabled={
                        mode === "toolsGeographicalContentContinentsView"
                      }
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
                      readOnly={
                        mode === "toolsGeographicalContentContinentsView"
                      }
                      disabled={
                        mode === "toolsGeographicalContentContinentsView"
                      }
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

                  {mode !== "toolsGeographicalContentContinentsView" && (
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

          {mode !== "toolsGeographicalContentContinentsView" ? (
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
                  navigate(`/toolsGeographicalContentContinentsEdit/${id}`)
                }
              >
                <i className="fa fa-edit" /> Edit Continent
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

export default ContinentForm;
