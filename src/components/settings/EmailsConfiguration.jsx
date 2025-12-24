import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiHandler } from "../../Apis/EmailHandler";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const EmailsConfiguration = () => {
  const [activeTab, setActiveTab] = useState("smtp");
  const [settingsList, setSettingsList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      key: "smtp",
      name: "",
      settings: {},
      is_default: false,
    },
    mode: "onChange",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await apiHandler.get("/api/v1/settings");
        if (response?.status === "success") {
          setSettingsList(response.data);
          const defaultSetting = response.data.find((s) => s.is_default);
          setActiveTab(defaultSetting ? defaultSetting.key : "smtp");
          if (defaultSetting) {
            reset({
              id: defaultSetting.id,
              key: defaultSetting.key,
              name: defaultSetting.name,
              settings: defaultSetting.settings,
              is_default: defaultSetting.is_default,
            });
          }
        }
      } catch (error) {
        // Error handling is now in apiHandler
      }
    };

    fetchSettings();
  }, [reset]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    const setting = settingsList.find((s) => s.key === key);
    reset(
      setting
        ? {
            id: setting.id,
            key,
            name: setting.name,
            settings: setting.settings,
            is_default: setting.is_default,
          }
        : { key, name: "", settings: {}, is_default: false }
    );
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const cleanedData = {
        key: data.key,
        name: data.name.trim(),
        settings: Object.fromEntries(
          Object.entries(data.settings).filter(
            ([_, v]) => v !== undefined && v !== ""
          )
        ),
        is_default: data.is_default,
      };

      let response;
      if (data.id) {
        response = await apiHandler.put(
          `/api/v1/settings/${data.id}`,
          cleanedData
        );
      } else {
        response = await apiHandler.post("/api/v1/settings", cleanedData);
      }

      if (response?.status === "success") {
        toast.success(
          data.id
            ? "Setting updated successfully"
            : "Setting created successfully"
        );
        const updatedSettings = await apiHandler.get("/api/v1/settings");
        setSettingsList(updatedSettings.data);
        if (cleanedData.is_default) {
          await apiHandler.patch(
            `/api/v1/settings/${response.data.id}/set-default`
          );
        }
        reset({ key: data.key, name: "", settings: {}, is_default: false });
      }
    } catch (error) {
      // Error handling is now in apiHandler
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this setting?")) {
      try {
        await apiHandler.delete(`/api/v1/settings/${id}`);
        toast.success("Setting deleted successfully");
        const updatedSettings = await apiHandler.get("/api/v1/settings");
        setSettingsList(updatedSettings.data);
        if (settingsList.find((s) => s.id === id)?.key === activeTab) {
          setActiveTab("smtp");
          reset({ key: "smtp", name: "", settings: {}, is_default: false });
        }
      } catch (error) {
        // Error handling is now in apiHandler
      }
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await apiHandler.patch(`/api/v1/settings/${id}/set-default`);
      toast.success("Default provider set successfully");
      const updatedSettings = await apiHandler.get("/api/v1/settings");
      setSettingsList(updatedSettings.data);
      const defaultSetting = updatedSettings.data.find((s) => s.is_default);
      setActiveTab(defaultSetting ? defaultSetting.key : "smtp");
    } catch (error) {
      // Error handling is now in apiHandler
    }
  };

  const renderFormFields = () => {
    // ✅ Enhanced Validation Version

    switch (activeTab) {
      case "smtp":
        return (
          <>
            <div className="col-md-3 form-group">
              <label>
                Host <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control form-control-sm ${
                  errors.settings?.host ? "is-invalid" : ""
                }`}
                {...register("settings.host", {
                  required: "Host is required",
                  pattern: {
                    value:
                      /^(?=.{1,255}$)([a-zA-Z0-9][-a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/i,
                    message: "Invalid host (e.g., smtp.mailserver.com)",
                  },
                })}
                placeholder="e.g., smtp.mailserver.com"
              />
              {errors.settings?.host && (
                <div className="invalid-feedback">
                  {errors.settings.host.message}
                </div>
              )}
            </div>

            <div className="col-md-3 form-group">
              <label>
                Port <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className={`form-control form-control-sm ${
                  errors.settings?.port ? "is-invalid" : ""
                }`}
                {...register("settings.port", {
                  required: "Port is required",
                  min: {
                    value: 1,
                    message: "Port must be between 1 and 65535",
                  },
                  max: {
                    value: 65535,
                    message: "Port must be between 1 and 65535",
                  },
                })}
                placeholder="e.g., 465 or 587"
              />
              {errors.settings?.port && (
                <div className="invalid-feedback">
                  {errors.settings.port.message}
                </div>
              )}
            </div>

            <div className="col-md-3 form-group">
              <label>
                Username <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control form-control-sm ${
                  errors.settings?.username ? "is-invalid" : ""
                }`}
                {...register("settings.username", {
                  required: "Username is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-@]+$/,
                    message: "Invalid username or email format",
                  },
                })}
                placeholder="e.g., user@example.com"
              />
              {errors.settings?.username && (
                <div className="invalid-feedback">
                  {errors.settings.username.message}
                </div>
              )}
            </div>

            <div className="col-md-3 form-group">
              <label>
                Password <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control form-control-sm ${
                    errors.settings?.password ? "is-invalid" : ""
                  }`}
                  {...register("settings.password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter password"
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.settings?.password && (
                <div className="invalid-feedback">
                  {errors.settings.password.message}
                </div>
              )}
            </div>
          </>
        );

      case "amazon_ses":
        return (
          <>
            <div className="col-md-3 form-group">
              <label>
                Access Key ID <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control form-control-sm ${
                  errors.settings?.accessKeyId ? "is-invalid" : ""
                }`}
                {...register("settings.accessKeyId", {
                  required: "Access Key ID is required",
                  pattern: {
                    value: /^AKIA[0-9A-Z]{16}$/,
                    message:
                      "Invalid Access Key ID format (starts with AKIA...)",
                  },
                })}
                placeholder="e.g., AKIAIOSFODNN7EXAMPLE"
              />
              {errors.settings?.accessKeyId && (
                <div className="invalid-feedback">
                  {errors.settings.accessKeyId.message}
                </div>
              )}
            </div>

            <div className="col-md-3 form-group">
              <label>
                Secret Access Key <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control form-control-sm ${
                    errors.settings?.secretAccessKey ? "is-invalid" : ""
                  }`}
                  {...register("settings.secretAccessKey", {
                    required: "Secret Access Key is required",
                    pattern: {
                      value: /^[A-Za-z0-9/+=]{40}$/,
                      message:
                        "Invalid Secret Access Key format (40-char Base64-like string)",
                    },
                  })}
                  placeholder="Enter secret access key"
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.settings?.secretAccessKey && (
                <div className="invalid-feedback">
                  {errors.settings.secretAccessKey.message}
                </div>
              )}
            </div>

            <div className="col-md-3 form-group">
              <label>
                Region <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control form-control-sm ${
                  errors.settings?.region ? "is-invalid" : ""
                }`}
                {...register("settings.region", {
                  required: "Region is required",
                  pattern: {
                    value: /^[a-z]{2}-[a-z]+-\d+$/,
                    message: "Invalid AWS region (e.g., us-east-1)",
                  },
                })}
                placeholder="e.g., us-east-1"
              />
              {errors.settings?.region && (
                <div className="invalid-feedback">
                  {errors.settings.region.message}
                </div>
              )}
            </div>
          </>
        );

      case "firebase":
        return (
          <div className="col-md-6 form-group">
            <label>
              Service Account JSON <span className="text-danger">*</span>
            </label>
            <textarea
              className={`form-control form-control-sm ${
                errors.settings?.serviceAccount ? "is-invalid" : ""
              }`}
              {...register("settings.serviceAccount", {
                required: "Service Account JSON is required",
                validate: (value) => {
                  try {
                    const json = JSON.parse(value);
                    if (json.type !== "service_account") {
                      return 'JSON must contain "type": "service_account"';
                    }
                    return true;
                  } catch {
                    return "Invalid JSON format";
                  }
                },
              })}
              placeholder='Paste JSON (e.g., {"type": "service_account", ...})'
              rows={6}
            />
            {errors.settings?.serviceAccount && (
              <div className="invalid-feedback">
                {errors.settings.serviceAccount.message}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const renderAllConfigurations = () => (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Provider</th>
            <th>Default</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {settingsList.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">
                No configurations found
              </td>
            </tr>
          ) : (
            settingsList.map((setting) => (
              <tr key={setting.id}>
                <td>{setting.name}</td>
                <td>{setting.key}</td>
                <td>{setting.is_default ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => {
                      setActiveTab(setting.key);
                      reset({
                        id: setting.id,
                        key: setting.key,
                        name: setting.name,
                        settings: setting.settings,
                        is_default: setting.is_default,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(setting.id)}
                    disabled={setting.is_default}
                  >
                    Delete
                  </button>
                  {!setting.is_default && (
                    <button
                      className="btn btn-sm btn-success ms-2"
                      onClick={() => handleSetDefault(setting.id)}
                    >
                      Set Default
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <div>
        <Header2
          title="SETTINGS INTEGRATIONS"
          linkText1="Dashboard"
          linkText2="Settings"
          link1={Constants.URLConstants.DASHBOARD}
        />
      </div>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <ul className="nav nav-tabs">
          {["All Configurations", "SMTP", "Amazon SES", "Firebase"].map(
            (tab) => (
              <li className="nav-item" key={tab}>
                <button
                  className={`nav-link ${
                    activeTab === tab.toLowerCase().replace(" ", "_")
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleTabChange(tab.toLowerCase().replace(" ", "_"))
                  }
                >
                  {tab}
                </button>
              </li>
            )
          )}
        </ul>
        <div className="tab-content mt-4">
          {activeTab === "all_configurations" ? (
            renderAllConfigurations()
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-3 form-group">
                  <label>
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className={`form-control form-control-sm ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    {...register("name", {
                      required: "Name is required",
                      maxLength: {
                        value: 50,
                        message: "Name must not exceed 50 characters",
                      },
                    })}
                    placeholder="Enter provider name"
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.message}
                    </div>
                  )}
                </div>
                <input type="hidden" {...register("key")} value={activeTab} />
                {activeTab !== "firebase" && (
                  <div className="col-md-3 form-group">
                    <label>
                      Default Provider <span className="text-danger">*</span>
                    </label>
                    <div>
                      <input
                        type="checkbox"
                        {...register("is_default")}
                        className="form-check-input"
                      />
                      <label className="form-check-label ms-2">
                        Set as default
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <div className="row mt-4">{renderFormFields()}</div>
              <div className="form-group col-md-2 mt-3 mb-4">
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
                  onClick={() => navigate(Constants.URLConstants.DASHBOARD)}
                  disabled={isSubmitting}
                >
                  <i className="fa fa-arrow-left me-1" /> Back
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailsConfiguration;
