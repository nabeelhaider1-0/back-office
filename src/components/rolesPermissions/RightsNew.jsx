import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Header2 from "../header2/header2";
import { apiHandler } from "../../Apis/apiHandler2";
import Constants from "../../constants/routes";

const RightsNew = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
    setValue,
    clearErrors,
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      module_name: "",
      actions: "",
      description: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  // Watch all values for real-time validation
  const formValues = watch();

  // Custom validation functions
  const validateModuleName = (value) => {
    if (!value || value.trim().length === 0) {
      return "Module name is required";
    }

    if (value.trim().length < 2) {
      return "Module name must be at least 2 characters long";
    }

    if (value.trim().length > 100) {
      return "Module name must not exceed 100 characters";
    }

    if (!/^[a-zA-Z0-9\s\-_]+$/.test(value.trim())) {
      return "Module name can only contain letters, numbers, spaces, hyphens, and underscores";
    }

    return true;
  };

  const validateActions = (value) => {
    if (!value || value.trim().length === 0) {
      return "Actions are required";
    }

    // Split by comma and validate each action
    const actions = value
      .split(",")
      .map((action) => action.trim())
      .filter((action) => action.length > 0);

    if (actions.length === 0) {
      return "At least one action is required";
    }

    if (actions.length > 20) {
      return "Maximum 20 actions allowed";
    }

    // Validate each action format
    const invalidActions = actions.filter(
      (action) => !/^[a-zA-Z][a-zA-Z0-9_]*$/.test(action)
    );

    if (invalidActions.length > 0) {
      return `Invalid action format: ${invalidActions.join(
        ", "
      )}. Actions must start with a letter and contain only letters, numbers, and underscores`;
    }

    // Check for duplicates
    const uniqueActions = [...new Set(actions)];
    if (uniqueActions.length !== actions.length) {
      return "Duplicate actions are not allowed";
    }

    return true;
  };

  const validateDescription = (value) => {
    if (value && value.trim().length > 500) {
      return "Description must not exceed 500 characters";
    }

    if (value && !/^[a-zA-Z0-9\s\-_.,!?'"()]*$/.test(value.trim())) {
      return "Description can only contain letters, numbers, spaces, and common punctuation";
    }

    return true;
  };

  // Validation schema
  const validationSchema = {
    module_name: {
      required: {
        value: true,
        message: "Module name is required",
      },
      validate: validateModuleName,
    },
    actions: {
      required: {
        value: true,
        message: "Actions are required",
      },
      validate: validateActions,
    },
    description: {
      validate: validateDescription,
    },
  };

  // Helper function to preview actions
  const getActionsPreview = () => {
    const actionsValue = watch("actions") || "";
    if (!actionsValue.trim()) return [];

    return actionsValue
      .split(",")
      .map((action) => action.trim())
      .filter((action) => action.length > 0);
  };

  // Helper functions
  const getErrorMessage = (fieldName) => {
    return errors[fieldName]?.message || "";
  };

  const hasError = (fieldName) => {
    return !!errors[fieldName];
  };

  const getFieldValue = (fieldName) => {
    return watch(fieldName) || "";
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Clean data before submitting
    const cleanedData = {
      ...data,
      module_name: data.module_name?.trim() || "",
      actions: data.actions
        .split(",")
        .map((action) => action.trim())
        .filter((action) => action.length > 0),
      description: data.description?.trim() || null,
    };

    try {
      const response = await apiHandler.post("/admin/rights", cleanedData);
      if (response.success) {
        toast.success("Right created successfully");
        // Reset form
        reset({
          module_name: "",
          actions: "",
          description: "",
        });
        navigate("/rights");
      } else {
        toast.error(response.message || "Failed to create right");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create right";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const actionsPreview = getActionsPreview();

  return (
    <>
      <Header2
        title="NEW RIGHT"
        linkText1="Rights List"
        linkText2="Add Right"
        link1={"/rights"}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mt-2">
            <div className="col-md-4 form-group">
              <label>
                Module Name <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control form-control-sm ${
                  hasError("module_name") ? "is-invalid" : ""
                }`}
                type="text"
                name="module_name"
                id="module_name"
                maxLength="100"
                {...register("module_name", validationSchema.module_name)}
                placeholder="Enter module name (e.g., User Management)"
              />
              {hasError("module_name") && (
                <div className="invalid-feedback d-block">
                  {getErrorMessage("module_name")}
                </div>
              )}
              <small className="form-text text-muted">
                Maximum 100 characters. Letters, numbers, spaces, hyphens, and
                underscores only.
              </small>
            </div>

            <div className="col-md-4 form-group">
              <label>
                Actions (comma-separated) <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control form-control-sm ${
                  hasError("actions") ? "is-invalid" : ""
                }`}
                type="text"
                name="actions"
                id="actions"
                maxLength="500"
                {...register("actions", validationSchema.actions)}
                placeholder="e.g., create,read,update,delete"
              />
              {hasError("actions") && (
                <div className="invalid-feedback d-block">
                  {getErrorMessage("actions")}
                </div>
              )}
              <small className="form-text text-muted">
                Comma-separated actions. Each action must start with a letter
                and contain only letters, numbers, and underscores. Maximum 20
                actions.
              </small>

              {/* Actions Preview */}
              {actionsPreview.length > 0 && !hasError("actions") && (
                <div className="mt-2">
                  <h5 style={{ fontWeight: "500", fontSize: "20px" }}>
                    Preview:
                  </h5>
                  <div className="mt-1">
                    {actionsPreview.map((action, index) => (
                      <span
                        key={index}
                        className="td_label label-info me-1 mb-1"
                        style={{ fontSize: "0.8em" }}
                      >
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="col-md-4 form-group">
              <label>Description</label>
              <input
                className={`form-control form-control-sm ${
                  hasError("description") ? "is-invalid" : ""
                }`}
                type="text"
                name="description"
                id="description"
                maxLength="500"
                {...register("description", validationSchema.description)}
                placeholder="Enter description (optional)"
              />
              {hasError("description") && (
                <div className="invalid-feedback d-block">
                  {getErrorMessage("description")}
                </div>
              )}
              <small className="form-text text-muted">
                Optional. Maximum 500 characters.
              </small>
            </div>
          </div>

          <div className="form-group col-md-2 mt-3 mb-4">
            <button
              type="submit"
              className={`btn btn-sm btn-dark`}
              disabled={isSubmitting || !isValid}
            >
              <i className="fa-solid fa-floppy-disk"></i>{" "}
              {isSubmitting ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm ms-2"
              onClick={() => navigate("/rights")}
              disabled={isSubmitting}
            >
              <i className="fa fa-arrow-left me-1" /> Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RightsNew;
