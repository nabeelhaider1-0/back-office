import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import Header2 from "../header2/header2";
import { Slide, toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { apiHandler } from "../../Apis/ApiHandler";
import uploadFile from "../../constants/filesuploader";
import PhoneInput from "react-phone-input-2";
import { isValidPhoneNumber } from "libphonenumber-js";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const StaffNew = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [roles, setRoles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
    watch,
    clearErrors,
  } = useForm({
    defaultValues: {
      user_name: "",
      password: "",
      user_confirm_password: "",
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

  // Watch password for confirm password validation
  const password = watch("password");

  // Custom validation functions
  const validateUsername = async (username) => {
    if (!username || username.trim().length === 0) {
      return "Username is required";
    }

    const usernameRegex = /^[a-zA-Z0-9._-]+$/;
    if (!usernameRegex.test(username)) {
      return "Username can only contain letters, digits, underscores, periods, or hyphens";
    }

    if (username.trim().length < 3) {
      return "Username must be at least 3 characters long";
    }

    if (username.trim().length > 20) {
      return "Username must not exceed 20 characters";
    }

    try {
      const response = await apiHandler.get(
        `/admin/validate-username/${username.trim()}`
      );
      if (response?.success && !response?.data?.isValid) {
        return "Username is already taken";
      }
    } catch (error) {
      console.error("Error validating username:", error);
      return "Error validating username";
    }

    return true;
  };

  const validatePassword = (password) => {
    if (!password || password.trim().length === 0) {
      return "Password is required";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must contain at least 1 uppercase, 1 lowercase, and 1 special character";
    }

    return true;
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword || confirmPassword.trim().length === 0) {
      return "Confirm password is required";
    }

    if (confirmPassword !== password) {
      return "Passwords do not match";
    }

    return true;
  };

  const validatePhone = (phone_number) => {
    if (!phone_number || phone_number.trim() === "" || phone_number.length < 2) {
      return "Phone number is required";
    }

    // Remove non-digit characters except +
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

  // Validation schema (passed directly to register/Controller)
  const validationSchema = {
    user_name: {
      required: { value: true, message: "Username is required" },
      validate: validateUsername,
    },
    password: {
      required: { value: true, message: "Password is required" },
      validate: validatePassword,
    },
    user_confirm_password: {
      required: { value: true, message: "Confirm password is required" },
      validate: validateConfirmPassword,
    },
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
      required: { value: true, message: "At least one role must be selected" },
      validate: (value) => (value && value.length > 0) || "At least one role must be selected",
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
      theme: "light",
      transition: Slide,
    });

    const fetchRoles = async () => {
      try {
        const response = await apiHandler.getRoles();
        if (response?.success) {
          const roleOptions = response.data.map((role) => ({
            value: role.id,
            label: role.name,
          }));
          setRoles(roleOptions);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast.error("Failed to fetch roles");
      }
    };

    fetchRoles();
  }, []);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleRolesChange = (selectedOptions) => {
    const roleIds = selectedOptions ? [selectedOptions.value] : [];
    // Controller will handle this via its own field
  };

  const getErrorMessage = (fieldName) => errors[fieldName]?.message || "";
  const hasError = (fieldName) => !!errors[fieldName];

  const getPasswordStrength = () => {
    const pwd = watch("password");
    if (!pwd) return { message: "", isValid: null };

    const result = validatePassword(pwd);
    return {
      message: result === true ? "Strong password" : result,
      isValid: result === true,
    };
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const cleanedData = {
      ...data,
      user_name: data.user_name?.trim() || "",
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
      cleanedData.image = "";
    }

    try {
      const response = await apiHandler.createStaffAdmin(cleanedData);
      if (response?.success) {
        toast.success("Staff Added Successfully");
        setSelectedFile(null);
        setCurrentCountry(null);
        navigate(Constants.URLConstants.STAFFSEARCH);
      } else {
        toast.error(response.message || "Failed to create staff");
      }
    } catch (error) {
      console.error("Error creating staff:", error);
      toast.error("Failed to create staff");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const passwordStrength = getPasswordStrength();

  return (
    <>
      <div>
        <Header2
          title="NEW STAFF USER"
          linkText1="Staff list"
          linkText2="Add Staff"
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
                className={`form-control form-control-sm ${hasError("user_name") ? "is-invalid" : ""}`}
                type="text"
                maxLength="20"
                {...register("user_name", validationSchema.user_name)}
                placeholder="Enter username"
              />
              {hasError("user_name") && (
                <div className="invalid-feedback d-block">{getErrorMessage("user_name")}</div>
              )}
            </div>

            <div className="col-md-3 form-group">
              <label>
                Password <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  className={`form-control form-control-sm ${hasError("password") ? "is-invalid" : ""}`}
                  type={showPassword ? "text" : "password"}
                  maxLength="15"
                  {...register("password", validationSchema.password)}
                  placeholder="Enter password"
                />
                <span className="input-group-text" style={{ cursor: "pointer" }} onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {hasError("password") && (
                <div className="invalid-feedback d-block">{getErrorMessage("password")}</div>
              )}
              {passwordStrength.message && !hasError("password") && (
                <div style={{ color: passwordStrength.isValid ? "green" : "red", fontSize: "12px", marginTop: "5px" }}>
                  {passwordStrength.message}
                </div>
              )}
            </div>

            <div className="col-md-3 form-group">
              <label>
                Confirm Password <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  className={`form-control form-control-sm ${hasError("user_confirm_password") ? "is-invalid" : ""}`}
                  type={showConfirmPassword ? "text" : "password"}
                  maxLength="15"
                  {...register("user_confirm_password", validationSchema.user_confirm_password)}
                  placeholder="Confirm password"
                />
                <span className="input-group-text" style={{ cursor: "pointer" }} onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {hasError("user_confirm_password") && (
                <div className="invalid-feedback d-block">{getErrorMessage("user_confirm_password")}</div>
              )}
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
                className="w-100"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <>
                    <PhoneInput
                      country="pk"
                      value={value}
                      onChange={(phone, countryData) => {
                        onChange(phone);
                        setCurrentCountry(countryData);
                      }}
                      inputProps={{
                        name: "phone_number",
                        required: true,
                      }}
                      containerClass="phone-input-container"
                      inputClass={`form-control w-100 form-control-sm ${error ? "is-invalid" : ""}`}
                      buttonClass="phone-dropdown"
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
                <span className="input-group-addon fa fa-upload myInputFile" style={{ cursor: "pointer" }}>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileInput}
                  />
                </span>
              </span>
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
                      value={roles.find((option) => option.value === field.value?.[0]) || null}
                      onChange={(selected) => field.onChange(selected ? [selected.value] : [])}
                    />
                    {hasError("roleIds") && (
                      <div className="invalid-feedback d-block">{getErrorMessage("roleIds")}</div>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div className="form-group col-md-2 mt-3 mb-4">
            <button
              type="submit"
              className="btn btn-sm btn-dark"
              disabled={isSubmitting || !isValid || !isDirty}
            >
              <i className="fa-solid fa-floppy-disk"></i>{" "}
              {isSubmitting ? "Saving..." : "Save"}
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
        </form>
      </div>
    </>
  );
};

export default StaffNew;