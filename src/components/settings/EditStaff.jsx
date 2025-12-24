import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import Header2 from "../header2/header2";
import { Slide, toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { apiHandler } from "../../Apis/ApiHandler";
import uploadFile from "../../constants/filesuploader";
import PhoneInput from "react-phone-input-2";
import { isValidPhoneNumber } from "libphonenumber-js";

const EditStaff = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [roles, setRoles] = useState([]);
  const [roleRights, setRoleRights] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState("edit"); // 'edit' or 'view'
  const [currentCountry, setCurrentCountry] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(""); // To display existing image
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      user_name: "",
      first_name: "",
      middleName: "",
      last_name: "",
      email: "",
      phone_number: "",
      roleIds: [],
    },
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const formValues = watch();

  // Convert string to capital case
  const toCapitalCase = (str) => {
    if (!str) return str;
    return str
      .toLowerCase()
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Phone validation
  const validatePhone = (phone_number) => {
    if (!phone_number || phone_number.trim() === "" || phone_number.length < 2) {
      return "Phone number is required";
    }

    const cleanNumber = phone_number.replace(/[^0-9+]/g, "");
    if (cleanNumber.length < 10) {
      return "Phone number is too short";
    }

    if (currentCountry && currentCountry.countryCode) {
      const countryCode = currentCountry.countryCode.toUpperCase();
      if (!isValidPhoneNumber(phone_number, countryCode)) {
        return "Invalid phone number format";
      }
    }

    return true;
  };

  const validateEmail = (email) => {
    if (!email || email.trim().length === 0) {
      return "Email is required";
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email.trim())) {
      return "Invalid email format";
    }

    if (email.trim().length > 50) {
      return "Email must not exceed 50 characters";
    }

    return true;
  };

  const validationSchema = {
    first_name: {
      required: { value: true, message: "First name is required" },
      validate: (value) => {
        if (!value || value.trim().length === 0) return "First name is required";
        if (value.trim().length > 25) return "First name must not exceed 25 characters";
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return "First name can only contain letters and spaces";
        return true;
      },
    },
    last_name: {
      required: { value: true, message: "Last name is required" },
      validate: (value) => {
        if (!value || value.trim().length === 0) return "Last name is required";
        if (value.trim().length > 25) return "Last name must not exceed 25 characters";
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return "Last name can only contain letters and spaces";
        return true;
      },
    },
    middleName: {
      validate: (value) => {
        if (value && value.trim().length > 25) return "Middle name must not exceed 25 characters";
        if (value && !/^[a-zA-Z\s]+$/.test(value.trim())) return "Middle name can only contain letters and spaces";
        return true;
      },
    },
    email: {
      required: { value: true, message: "Email is required" },
      validate: validateEmail,
    },
    phone_number: {
      required: { value: true, message: "Phone number is required" },
      validate: validatePhone,
    },
    roleIds: {
      validate: (value) => (value && value.length > 0) || "At least one role must be selected",
    },
  };

  useEffect(() => {
    if (!id) {
      toast.error("Invalid staff ID");
      navigate(Constants.URLConstants.STAFFSEARCH);
      return;
    }

    const path = window.location.pathname;
    setMode(path.includes("view") ? "view" : "edit");

    apiHandler.setToastConfig({
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Slide,
    });

    const fetchRoles = async () => {
      try {
        const response = await apiHandler.getRoles();
        if (response?.success) {
          const roleOptions = response.data.map((role) => ({
            value: role.id,
            label: toCapitalCase(role.name),
          }));
          setRoles(roleOptions);
          setRoleRights(response.data);
        } else {
          toast.error(response.message || "Failed to fetch roles");
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast.error("Failed to fetch roles");
      }
    };

    const fetchStaff = async () => {
      try {
        const response = await apiHandler.get(`/admin/profile/${id}`);
        if (response?.success) {
          const user = response.data;
          const staffData = {
            user_name: user.user_name || "",
            first_name: user.first_name || "",
            middleName: user.middle_name || "",
            last_name: user.last_name || "",
            email: user.email || "",
            phone_number: user.phone_number || "",
            roleIds: user.roles?.map((role) => role.roleId) || [],
          };

          reset(staffData);
          setProfileImageUrl(user.profile_picture || "");
        } else {
          toast.error(response.message || "Failed to fetch staff details");
        }
      } catch (error) {
        console.error("Error fetching staff:", error);
        toast.error("Failed to fetch staff details");
      }
    };

    fetchRoles();
    fetchStaff();
  }, [id, navigate, reset]);

  const getSelectedRoleRights = () => {
    if (!formValues.roleIds || formValues.roleIds.length === 0) return [];
    const selectedRoleId = formValues.roleIds[0];
    const selectedRole = roleRights.find((role) => role.id === selectedRoleId);
    return selectedRole ? selectedRole.roleRights : [];
  };

  const handleFileInput = (e) => {
    if (mode === "view") return;
    setSelectedFile(e.target.files[0]);
  };

  const getErrorMessage = (fieldName) => errors[fieldName]?.message || "";
  const hasError = (fieldName) => !!errors[fieldName];

  const onSubmit = async (data) => {
    if (mode === "view") return;
    setIsSubmitting(true);

    const cleanedData = {
      ...data,
      first_name: data.first_name?.trim() || "",
      middleName: data.middleName?.trim() || "",
      last_name: data.last_name?.trim() || "",
      email: data.email?.trim() || "",
      phone_number: data.phone_number || "",
      roleIds: data.roleIds || [],
    };

    if (selectedFile) {
      try {
        const resp = await uploadFile(selectedFile);
        if (resp.success) {
          cleanedData.image = resp.imagelink;
        } else {
          toast.error("Failed to upload image");
          setIsSubmitting(false);
          return;
        }
      } catch (error) {
        toast.error("Failed to upload image");
        setIsSubmitting(false);
        return;
      }
    } else {
      cleanedData.image = profileImageUrl || "";
    }

    try {
      const response = await apiHandler.put(`/admin/update/${id}`, cleanedData);
      if (response?.success) {
        toast.success("Staff Updated Successfully");
        navigate(Constants.URLConstants.STAFFSEARCH);
      } else {
        toast.error(response.message || "Failed to update staff");
      }
    } catch (error) {
      console.error("Error updating staff:", error);
      toast.error("Failed to update staff");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <Header2
          title={mode === "view" ? "VIEW USER" : "EDIT USER"}
          linkText1="List Users"
          linkText2={mode === "view" ? "View User" : "Edit User"}
          link1={Constants.URLConstants.STAFFSEARCH}
        />
      </div>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mt-2">
            <div className="col-md-3 form-group">
              <label>
                Username <span className="text-danger">*</span>
              </label>
              <input
                className="form-control form-control-sm"
                type="text"
                value={formValues.user_name || ""}
                readOnly
                disabled
                placeholder="Username"
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-3 form-group">
              <label>
                First Name <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control form-control-sm ${hasError("first_name") ? "is-invalid" : ""}`}
                type="text"
                maxLength="25"
                {...register("first_name", validationSchema.first_name)}
                readOnly={mode === "view"}
                disabled={mode === "view"}
                placeholder="Enter first name"
              />
              {hasError("first_name") && (
                <div className="invalid-feedback d-block">{getErrorMessage("first_name")}</div>
              )}
            </div>

            <div className="col-md-3 form-group">
              <label>Middle Name</label>
              <input
                className={`form-control form-control-sm ${hasError("middleName") ? "is-invalid" : ""}`}
                type="text"
                maxLength="25"
                {...register("middleName", validationSchema.middleName)}
                readOnly={mode === "view"}
                disabled={mode === "view"}
                placeholder="Enter middle name (optional)"
              />
              {hasError("middleName") && (
                <div className="invalid-feedback d-block">{getErrorMessage("middleName")}</div>
              )}
            </div>

            <div className="col-md-3 form-group">
              <label>
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control form-control-sm ${hasError("last_name") ? "is-invalid" : ""}`}
                type="text"
                maxLength="25"
                {...register("last_name", validationSchema.last_name)}
                readOnly={mode === "view"}
                disabled={mode === "view"}
                placeholder="Enter last name"
              />
              {hasError("last_name") && (
                <div className="invalid-feedback d-block">{getErrorMessage("last_name")}</div>
              )}
            </div>

            <div className="col-md-3 form-group">
              <label>
                Email <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control form-control-sm ${hasError("email") ? "is-invalid" : ""}`}
                type="email"
                maxLength="50"
                {...register("email", validationSchema.email)}
                readOnly
                disabled
                placeholder="Enter email address"
              />
              {hasError("email") && (
                <div className="invalid-feedback d-block">{getErrorMessage("email")}</div>
              )}
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-3 form-group">
              <label>
                Phone <span className="text-danger">*</span>
              </label>
              <Controller
                name="phone_number"
                control={control}
                rules={validationSchema.phone_number}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <>
                    <PhoneInput
                      country="pk"
                      value={value}
                      onChange={(phone, countryData) => {
                        if (mode !== "view") {
                          onChange(phone);
                          setCurrentCountry(countryData);
                        }
                      }}
                      inputProps={{
                        name: "phone_number",
                        required: true,
                      }}
                      inputClass={`form-control w-100 form-control-sm ${error ? "is-invalid" : ""}`}
                      containerClass="phone-input-container"
                      buttonClass="phone-dropdown"
                      disabled={mode === "view"}
                    />
                    {error && (
                      <div className="invalid-feedback d-block">{error.message}</div>
                    )}
                  </>
                )}
              />
            </div>

            <div className="col-md-3 form-group d-none">
              <label>Profile Image</label>
              <span className="uniqFile input-group">
                <span
                  className="input-group-addon fa fa-upload myInputFile"
                  style={{ cursor: mode === "view" ? "not-allowed" : "pointer" }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    disabled={mode === "view"}
                  />
                </span>
              </span>
              {profileImageUrl && (
                <div className="mt-2">
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </div>
              )}
            </div>

            <div className="col-md-3 form-group">
              <label>
                Role <span className="text-danger">*</span>
              </label>
              <Controller
                name="roleIds"
                control={control}
                rules={validationSchema.roleIds}
                render={({ field }) => (
                  <>
                    <MultiSelect
                      options={roles}
                      isMulti={false}
                      isSearchable
                      placeholder="- Select Role -"
                      noOptionsMessage={() => "No Roles Found"}
                      className={`custom-select ${hasError("roleIds") ? "is-invalid" : ""}`}
                      value={roles.find((opt) => opt.value === field.value?.[0]) || null}
                      onChange={(selected) =>
                        mode !== "view" && field.onChange(selected ? [selected.value] : [])
                      }
                      isDisabled={mode === "view"}
                    />
                    {hasError("roleIds") && (
                      <div className="invalid-feedback d-block">{getErrorMessage("roleIds")}</div>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-12">
              <h5>Role Rights</h5>
              {formValues.roleIds?.length > 0 ? (
                <div className="row">
                  {getSelectedRoleRights().map((roleRight) => (
                    <div key={roleRight.id} className="col-md-3 mb-3">
                      <div className="card cardinger h-100">
                        <div className="card-body">
                          <h6 className="card-title">
                            {toCapitalCase(roleRight.right.module_name)}
                          </h6>
                          <ul className="list-unstyled">
                            {roleRight.allowed_actions.map((action) => (
                              <li key={action} className="mb-1">
                                {toCapitalCase(action)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No role selected or rights available.</p>
              )}
            </div>
          </div>

          {mode === "edit" ? (
            <div className="form-group col-md-2 mt-3 mb-4">
              <button
                type="submit"
                className="btn btn-sm btn-dark"
                disabled={isSubmitting || !isValid || !isDirty}
              >
                <i className="fa-solid fa-floppy-disk"></i>{" "}
                {isSubmitting ? "Saving..." : "Update"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm ms-2"
                onClick={() => navigate(Constants.URLConstants.STAFFSEARCH)}
                disabled={isSubmitting}
              >
                <i className="fa fa-arrow-left me-1" /> Back
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-end align-items-end mt-4 gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate(`/staff/edit/${id}`)}
              >
                <i className="fa fa-edit" /> Edit Profile
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => navigate(Constants.URLConstants.STAFFSEARCH)}
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

export default EditStaff;