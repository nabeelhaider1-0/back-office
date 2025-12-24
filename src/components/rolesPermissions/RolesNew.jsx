import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import Header2 from "../header2/header2";
import { apiHandler } from "../../Apis/apiHandler2";
import Constants from "../../constants/routes";

const RolesNew = () => {
  const [rightsOptions, setRightsOptions] = useState([]); // Array of { id, module_name, actions }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
    clearErrors,
    trigger,
  } = useForm({
    defaultValues: {
      name: "",
      status: "active",
      rights: [],
    },
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  // Watch all values for real-time validation
  // const formValues = watch();

  // Validation schema
  const validationSchema = {
    name: {
      required: {
        value: true,
        message: "Role name is required",
      },
      validate: (value) => {
        if (!value || value.trim().length === 0) {
          return "Role name is required";
        }
        if (value.trim().length > 100) {
          return "Role name must not exceed 100 characters";
        }
        if (!/^[a-zA-Z0-9\s\-_]+$/.test(value.trim())) {
          return "Role name can only contain letters, numbers, spaces, hyphens, and underscores";
        }
        return true;
      },
    },
    status: {
      required: {
        value: true,
        message: "Status is required",
      },
    },
    rights: {
      validate: (rights) => {
        if (!rights || rights.length === 0) {
          return "At least one right with actions must be selected";
        }

        // Check if any right has actions
        const hasValidRights = rights.some(
          (right) => right.allowed_actions && right.allowed_actions.length > 0
        );

        if (!hasValidRights) {
          return "At least one right must have selected actions";
        }

        return true;
      },
    },
  };

  useEffect(() => {
    apiHandler.setToastConfig({
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });

    const fetchRights = async () => {
      try {
        const response = await apiHandler.get("/admin/rights", {
          params: { limit: 100 },
        });
        if (response.success) {
          const options = response.data.rights.map((right) => ({
            id: right.id,
            module_name: right.module_name,
            actions: right.actions,
          }));
          setRightsOptions(options);
        } else {
          toast.error("Failed to fetch rights");
        }
      } catch (error) {
        toast.error("Failed to fetch rights", error);
      }
    };

    fetchRights();
  }, []);

  // Get current rights from form values
  const currentRights = watch("rights") || [];

  const handleRightChange = (rightId, checked) => {
    const updatedRights = [...(watch("rights") || [])];
    const right = rightsOptions.find((r) => r.id === rightId);

    if (checked) {
      if (!updatedRights.some((r) => r.id === rightId)) {
        updatedRights.push({
          id: rightId,
          allowed_actions: [...right.actions],
        });
      }
    } else {
      // Remove all actions for this right when unchecked
      const filteredRights = updatedRights.filter((r) => r.id !== rightId);
      updatedRights.splice(0, updatedRights.length, ...filteredRights);
    }

    setValue("rights", updatedRights, { shouldValidate: true });
    clearErrors("rights");
    trigger("rights");
  };

  const handleActionChange = (rightId, action, checked) => {
    const updatedRights = [...(watch("rights") || [])];
    const rightIndex = updatedRights.findIndex((r) => r.id === rightId);

    if (rightIndex >= 0) {
      const currentActions = updatedRights[rightIndex].allowed_actions || [];
      if (checked) {
        if (!currentActions.includes(action)) {
          updatedRights[rightIndex].allowed_actions = [
            ...currentActions,
            action,
          ];
        }
      } else {
        updatedRights[rightIndex].allowed_actions = currentActions.filter(
          (a) => a !== action
        );
        // Remove right if no actions left
        if (updatedRights[rightIndex].allowed_actions.length === 0) {
          updatedRights.splice(rightIndex, 1);
        }
      }
    } else if (checked) {
      updatedRights.push({
        id: rightId,
        allowed_actions: [action],
      });
    }

    setValue("rights", updatedRights, { shouldValidate: true });
    clearErrors("rights");
    trigger("rights");
  };

  // Helper functions
  const getErrorMessage = (fieldName) => {
    return errors[fieldName]?.message || "";
  };

  const hasError = (fieldName) => {
    return !!errors[fieldName];
  };

  // const getFieldValue = (fieldName) => {
  //   return watch(fieldName) || "";
  // };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Clean data before submitting
    const cleanedData = {
      ...data,
      name: data.name?.trim() || "",
      rights: data.rights || [],
    };

    try {
      const response = await apiHandler.post("/admin/roles", cleanedData);
      if (response.success) {
        toast.success("Role created successfully");
        // Reset form
        reset({
          name: "",
          status: "active",
          rights: [],
        });
        setRightsOptions([]);
        navigate("/roles");
      } else {
        toast.error(response.message || "Failed to create role");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create role";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header2
        title="NEW ROLE"
        linkText1="Roles List"
        linkText2="Add Role"
        link1={Constants.URLConstants.ROLESMANAGEMENT}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mt-2">
            <div className="col-md-3 form-group">
              <label>
                Role Name <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control form-control-sm ${
                  hasError("name") ? "is-invalid" : ""
                }`}
                type="text"
                name="name"
                id="name"
                maxLength="100"
                {...register("name", validationSchema.name)}
                placeholder="Enter role name"
              />
              {hasError("name") && (
                <div className="invalid-feedback d-block">
                  {getErrorMessage("name")}
                </div>
              )}
            </div>

            <div className="col-md-3 form-group">
              <label>
                Status <span className="text-danger">*</span>
              </label>
              <Controller
                name="status"
                control={control}
                rules={validationSchema.status}
                render={({ field }) => (
                  <select
                    className={`form-control form-control-sm ${
                      hasError("status") ? "is-invalid" : ""
                    }`}
                    {...field}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                )}
              />
              {hasError("status") && (
                <div className="invalid-feedback d-block">
                  {getErrorMessage("status")}
                </div>
              )}
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-12 form-group">
              <label className="form-label">
                Rights Selection <span className="text-danger">*</span>
              </label>
              <div className="mt-4">
                {rightsOptions.map((right) => (
                  <div key={right.id} className="mb-3">
                    <div>
                      <input
                        type="checkbox"
                        style={{
                          marginTop: "5px",
                          accentColor: "var(--color-secondary)",
                        }}
                        id={`right-${right.id}`}
                        checked={currentRights.some((r) => r.id === right.id)}
                        onChange={(e) =>
                          handleRightChange(right.id, e.target.checked)
                        }
                      />
                      <label
                        className="form-check-label ms-2 text-dark fs-6"
                        htmlFor={`right-${right.id}`}
                      >
                        {right.module_name}
                      </label>
                    </div>

                    <div className="d-flex flex-wrap gap-3 mt-2">
                      {right.actions.map((action) => (
                        <div key={action}>
                          <input
                            type="checkbox"
                            style={{
                              marginTop: "0px",
                              accentColor: "var(--color-secondary)",
                              verticalAlign: "middle",
                            }}
                            id={`action-${right.id}-${action}`}
                            checked={
                              currentRights
                                .find((r) => r.id === right.id)
                                ?.allowed_actions.includes(action) || false
                            }
                            onChange={(e) =>
                              handleActionChange(
                                right.id,
                                action,
                                e.target.checked
                              )
                            }
                          />
                          <label
                            className="ms-2 text-muted"
                            style={{ fontSize: "14px" }}
                            htmlFor={`action-${right.id}-${action}`}
                          >
                            {action}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {rightsOptions.length === 0 && (
                  <div className="alert alert-info">No rights available</div>
                )}

                {hasError("rights") && (
                  <div className="invalid-feedback d-block mt-2">
                    {getErrorMessage("rights")}
                  </div>
                )}
              </div>
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
              onClick={() => navigate("/roles")}
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

export default RolesNew;
