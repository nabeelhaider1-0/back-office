/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Header2 from "../../../header2/header2";
import { apiHandler } from "../../../../Apis/backOfficeApiHandler";
import Constants from "../../../../constants/routes";

const HotelFacilityForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [mode, setMode] = useState("create"); // 'create' | 'edit' | 'view'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      facility_name: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const validation = {
    facility_name: {
      required: { value: true, message: "Hotel Facility is required" },
      maxLength: {
        value: 255,
        message: "Hotel Facility cannot exceed 255 characters",
      },
    },
  };

  useEffect(() => {
    const path = window.location.pathname;
    setMode(
      path.includes("MastersHotelsAmenitiesView")
        ? "MastersHotelsAmenitiesView"
        : path.includes("MastersHotelsAmenitiesEdit")
        ? "MastersHotelsAmenitiesEdit"
        : "create"
    );
    if (id) {
      fetchHotelFacility(); // Fetch data if editing
    }
  }, [id, location.pathname]);

  const fetchHotelFacility = async () => {
    try {
      const response = await apiHandler.get(`/api/facilities/${id}`);
      if (response?.status === 200) {
        reset(response?.data);
        setValue("hotelFacilityName", response?.data?.name);
      } else {
        toast.error("Failed to fetch hotel Facility details");
      }
    } catch (err) {
      toast.error("Error fetching hotel Facility details");
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    if (mode === "MastersHotelsAmenitiesView") return; // Do nothing in view mode

    setIsSubmitting(true);
    try {
      const payload = {
        facility_name: data.facility_name.trim(),
      };

      const response =
        mode === "create"
          ? await apiHandler.post("/api/facilities", payload)
          : await apiHandler.patch(`/api/facilities/${id}`, payload);

      if (response?.status) {
        toast.success(
          mode === "create"
            ? "Hotel Facility created successfully"
            : "Hotel Facility updated successfully"
        );
        navigate(Constants.URLConstants.MASTERSHOTELAMENITIESSEARCH);
      } else {
        toast.error("Failed to save hotel Facility");
      }
    } catch (err) {
      toast.error("Error saving hotel Facility");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasError = (f) => !!errors[f];
  const errMsg = (f) => errors?.[f]?.message || "";

  const title =
    mode === "MastersHotelsAmenitiesView"
      ? "VIEW HOTEL Facility"
      : mode === "MastersHotelsAmenitiesEdit"
      ? "EDIT HOTEL Facility"
      : "ADD HOTEL Facility";

  return (
    <>
      <Header2
        title={title}
        linkText1="Hotel Facilities List"
        linkText2={title}
        link1={Constants.URLConstants.MASTERSHOTELAMENITIESSEARCH}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="panel-body">
            <div className="row form-group">
              <div className="col-md-3 form-group">
                <label>
                  Hotel Facility <span className="text-danger">*</span>
                </label>
                <input
                  className={`form-control form-control-sm ${
                    hasError("hotelFacilityName") ? "is-invalid" : ""
                  }`}
                  type="text"
                  size={45}
                  maxLength={255}
                  placeholder="Hotel Facility"
                  readOnly={mode === "MastersHotelsAmenitiesView"}
                  disabled={mode === "MastersHotelsAmenitiesView"}
                  {...register("facility_name", validation.facility_name)}
                />
                {hasError("facility_name") && (
                  <div className="invalid-feedback d-block">
                    {errMsg("facility_name")}
                  </div>
                )}
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-12">
                {mode !== "MastersHotelsAmenitiesView" && (
                  <button
                    type="submit"
                    className="btn btn-dark btn-sm form-group"
                    name="b1"
                    value="SUBMIT"
                    disabled={isSubmitting || !isValid}
                  >
                    <i className="fa fa-floppy-o" />
                    &nbsp;
                    {isSubmitting
                      ? "Saving..."
                      : mode === "MastersHotelsAmenitiesEdit"
                      ? "Update"
                      : "Save"}
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm ms-2"
                  onClick={() =>
                    navigate(Constants.URLConstants.MASTERSHOTELAMENITIESSEARCH)
                  }
                  disabled={isSubmitting}
                >
                  <i className="fa fa-arrow-left me-1" /> Back
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default HotelFacilityForm;
