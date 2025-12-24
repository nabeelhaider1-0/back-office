import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import Header2 from "../../header2/header2";
import { apiHandler } from "../../../Apis/EmailHandler";
import Constants from "../../../constants/routes";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import {
  getPermittedMenuItems,
  isSuperAdmin,
  hasPermission,
} from "../../../authUtils";
import routeConfig from "../../../routeConfig";
import EmailEditor from "./EmailEditor";

const EmailTemplatesListing = () => {
  const [templates, setTemplates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(null);
  const [permittedItems, setPermittedItems] = useState([]);
  const navigate = useNavigate();

  const actions = {
    view: "read",
    edit: "update",
    delete: "delete",
    status: "change_status",
    add: "create",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      status: "draft",
      subject: "",
      email_body: "",
      placeholders: [],
    },
    mode: "onChange",
  });

  const emailBody = watch("email_body");
  const subjectField = watch("subject");
  const nameField = watch("name");
  const slugField = watch("slug");

  // Auto-populate slug based on name in create mode
  useEffect(() => {
    if (mode === "create" && nameField) {
      const generatedSlug = nameField
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, ""); // Allow only lowercase letters, numbers, and hyphens
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [nameField, setValue, mode]);

  // Transform slug input in real-time
  useEffect(() => {
    if (slugField && mode === "create") {
      const transformedSlug = slugField
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, ""); // Allow only lowercase letters, numbers, and hyphens
      if (transformedSlug !== slugField) {
        setValue("slug", transformedSlug, { shouldValidate: true });
      }
    }
  }, [slugField, setValue, mode]);

  // Function to extract placeholders from text (e.g., {{name}})
  const extractPlaceholders = (text) => {
    if (!text) return [];
    const regex = /{{{?\s*([^{}]+?)\s*}?}}/g;
    const matches = [...(text?.matchAll(regex) || [])];
    return matches.map((match) => match[1].trim());
  };

  // Compute detected placeholders dynamically from current form values
  const detectedPlaceholders = React.useMemo(() => {
    const subjectVars = extractPlaceholders(subjectField);
    const bodyVars = extractPlaceholders(emailBody);
    return [...new Set([...subjectVars, ...bodyVars])];
  }, [subjectField, emailBody]);

  useEffect(() => {
    setPermittedItems(
      getPermittedMenuItems(routeConfig).filter(
        (item) => item.module_name === "email_templates"
      )
    );
    fetchTemplates();
  }, [currentPage, searchQuery, pageSize]);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const result = await apiHandler.get("/api/v1/email-templates", {
        params: {
          page: currentPage,
          limit: pageSize,
          search: searchQuery,
          status: "",
        },
      });
      if (result.status === "success") {
        setTemplates(result.data);
        setTotalPages(Math.ceil(result.meta?.totalPages || 1));
      } else {
        setTemplates([]);
        toast.error(result.message || "Failed to fetch email templates");
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch email templates");
      setTemplates([]);
    }
    setLoading(false);
  };

  const checkPermission = (actionsToCheck) => {
    return (
      isSuperAdmin ||
      (Array.isArray(actionsToCheck) &&
        actionsToCheck.some((action) =>
          hasPermission("email_templates", action)
        ))
    );
  };

  const handleAddNew = () => {
    if (!checkPermission(["create"])) return;
    setMode("create");
    reset({
      name: "",
      slug: "",
      status: "draft",
      subject: "",
      email_body: "",
      placeholders: [],
    });
  };

  const handleEdit = (template) => {
    if (!checkPermission(["update"])) return;
    setMode("edit");
    Object.keys(template).forEach((key) => setValue(key, template[key]));
  };

  const handleView = (template) => {
    if (!checkPermission(["read"])) return;
    setMode("view");
    Object.keys(template).forEach((key) => setValue(key, template[key]));
  };

  const handleDelete = async (id) => {
    if (!checkPermission(["delete"])) return;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a ",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const originalTemplates = [...templates];
        setTemplates((prev) => prev.filter((t) => t.id !== id));
        try {
          const res = await apiHandler.delete(`/api/v1/email-templates/${id}`);
          if (res.status === "success") {
            Swal.fire("Deleted!", "Template deleted successfully", "success");
            fetchTemplates();
          } else {
            setTemplates(originalTemplates);
            Swal.fire(
              "Error",
              res.message || "Failed to delete template",
              "error"
            );
          }
        } catch (err) {
          setTemplates(originalTemplates);
          Swal.fire(
            "Error",
            err.message || "Failed to delete template",
            "error"
          );
        }
      }
    });
  };

  const handleStatusChange = async (id, status) => {
    if (!checkPermission(["change_status"])) return;
    const newStatus = status === "active" ? "inactive" : "active";
    Swal.fire({
      title: "Change Status?",
      text: `Do you want to change the status to ${newStatus}?`,
      icon: "question",
      iconColor: "#ff5015",
      showCancelButton: true,
      confirmButtonColor: "#ff5015",
      cancelButtonColor: "#1a385a",
      confirmButtonText: `Yes, set to ${newStatus}!`,
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await apiHandler.put(`/api/v1/email-templates/${id}`, {
            status: newStatus,
          });
          Swal.fire("Success", `Status changed to ${newStatus}`, "success");
          fetchTemplates();
        } catch (error) {
          Swal.fire(
            "Error",
            error.message || "Failed to change status",
            "error"
          );
        }
      }
    });
  };

  const onSubmit = async (data) => {
    if (mode === "view") return;
    try {
      const subjectVars = extractPlaceholders(data.subject);
      const bodyVars = extractPlaceholders(data.email_body);
      const placeholders = [...new Set([...subjectVars, ...bodyVars])];

      const payload = {
        name: data.name.trim(),
        slug: data.slug.trim(),
        status: data.status,
        subject: data.subject.trim(),
        email_body: data.email_body,
        placeholders,
      };

      const res =
        mode === "edit"
          ? await apiHandler.put(`/api/v1/email-templates/${data.id}`, payload)
          : await apiHandler.post("/api/v1/email-templates", payload);

      if (res.status === "success") {
        toast.success(
          mode === "edit"
            ? "Template updated successfully"
            : "Template created successfully"
        );
        setMode(null);
        reset();
        fetchTemplates();
      }
    } catch (err) {
      toast.error(err.message || "Operation failed");
    }
  };

  const hasAnyActionPermission = checkPermission([
    "read",
    "update",
    "delete",
    "change_status",
  ]);
  const placeholdersToDisplay = detectedPlaceholders;

  return (
    <>
      <Header2
        title="EMAIL TEMPLATES MANAGEMENT"
        linkText1="Dashboard"
        linkText2="Email Templates"
        link1={Constants.URLConstants.DASHBOARD}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {mode ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-2">
              <div className="col-md-3 form-group">
                <label>
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  className={`form-control form-control-sm ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter template name"
                  disabled={mode === "view"}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name.message}</div>
                )}
              </div>

              <div className="col-md-3 form-group">
                <label>
                  Slug <span className="text-danger">*</span>
                </label>
                <input
                  className={`form-control form-control-sm ${
                    errors.slug ? "is-invalid" : ""
                  }`}
                  {...register("slug", {
                    required: "Slug is required",
                    pattern: {
                      value: /^[a-z0-9-]+$/,
                      message:
                        "Slug must be lowercase, contain only letters, numbers, and hyphens, with no spaces",
                    },
                  })}
                  placeholder="e.g., welcome-email"
                  disabled={mode !== "create"} // Editable in create and edit modes
                />
                {errors.slug && (
                  <div className="invalid-feedback">{errors.slug.message}</div>
                )}
              </div>

              <div className="col-md-3 form-group">
                <label>Status</label>
                <select
                  className="form-control form-control-sm"
                  {...register("status")}
                  disabled={mode === "view"}
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6 form-group">
                <label>
                  Subject <span className="text-danger">*</span>
                </label>
                <input
                  className={`form-control form-control-sm ${
                    errors.subject ? "is-invalid" : ""
                  }`}
                  {...register("subject", { required: "Subject is required" })}
                  placeholder="e.g., Welcome {{name}}"
                  disabled={mode === "view"}
                />
                {errors.subject && (
                  <div className="invalid-feedback">
                    {errors.subject.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-12 form-group">
                <label>Email Body</label>
                <EmailEditor
                  value={emailBody}
                  onChange={(content) =>
                    setValue("email_body", content, { shouldValidate: true })
                  }
                  disabled={mode === "view"}
                />
                {errors.email_body && (
                  <div className="invalid-feedback d-block">
                    {errors.email_body.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-12 form-group">
                <label>Detected Placeholders</label>
                {placeholdersToDisplay.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {placeholdersToDisplay.map((placeholder, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <span>{`{{${placeholder}}}`}</span>
                        <span className="badge bg-info">Required</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="alert alert-info">
                    No placeholders detected. Add variables like {"{{name}}"} to
                    subject or body.
                  </div>
                )}
                <small className="form-text text-muted">
                  These variables must be provided with values when sending
                  emails using this template.
                </small>
              </div>
            </div>

            <div className="form-group col-md-2 mt-3 mb-4">
              {mode !== "view" && (
                <button
                  type="submit"
                  className="btn btn-sm btn-dark"
                  disabled={!isValid}
                >
                  <i className="fa-solid fa-floppy-disk"></i> Save
                </button>
              )}
              {mode === "view" && (
                <button
                  type="button"
                  className="btn btn-sm btn-dark"
                  onClick={() => {
                    const currentTemplate = watch();
                    handleEdit(currentTemplate);
                  }}
                >
                  <i className="fa-solid fa-floppy-disk"></i> Edit Template
                </button>
              )}
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm ms-2"
                onClick={() => {
                  setMode(null);
                  reset();
                }}
              >
                <i className="fa fa-arrow-left me-1" /> Back
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="row mt-4">
              <div className="form-group col-md-3 mb-3">
                <input
                  type="search"
                  className="form-control form-control-sm"
                  placeholder="Search by name or slug..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="form-group col-md-3">
                {checkPermission(["create"]) && (
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    onClick={handleAddNew}
                  >
                    <i className="fa fa-plus" /> Add New Template
                  </button>
                )}
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-sm-12">
                <div className="table-responsive">
                  <table className="table table-bordered ">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Subject</th>
                        <th>Created</th>
                        <th>Updated</th>
                        {hasAnyActionPermission && <th>Actions</th>}
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {!loading && templates.length > 0 ? (
                        templates.map((t) => (
                          <tr key={t.id}>
                            <td>{t.id}</td>
                            <td>{t.name}</td>
                            <td>{t.slug}</td>
                            <td>
                              {checkPermission(["change_status"]) ? (
                                <div
                                  className="cursor-pointer"
                                  onClick={() =>
                                    handleStatusChange(t.id, t.status)
                                  }
                                >
                                  {t.status === "active" ? (
                                    <FaToggleOn
                                      className="fs-2"
                                      style={{
                                        color: "var(--color-secondary)",
                                      }}
                                    />
                                  ) : (
                                    <FaToggleOff
                                      className="fs-2 fa-solid"
                                      style={{
                                        color: "var(--color-deactive)",
                                      }}
                                    />
                                  )}
                                </div>
                              ) : (
                                <span
                                  className={`badge ${
                                    t.status === "active"
                                      ? "bg-success"
                                      : "bg-danger"
                                  }`}
                                >
                                  {t.status}
                                </span>
                              )}
                            </td>
                            <td>{t.subject}</td>
                            <td>{new Date(t.created_at).toLocaleString()}</td>
                            <td>{new Date(t.updated_at).toLocaleString()}</td>
                            {hasAnyActionPermission && (
                              <td>
                                <div className="actionCont d-flex align-items-center">
                                  {checkPermission(["read"]) && (
                                    <Link className="input-group-addon addFirst mr-2">
                                      <i
                                        className="fa fa-eye"
                                        onClick={() => handleView(t)}
                                        title="View"
                                      ></i>
                                    </Link>
                                  )}

                                  {checkPermission(["update"]) && (
                                    <Link className="input-group-addon addFirst mr-2">
                                      <i
                                        className="fa fa-edit"
                                        onClick={() => handleEdit(t)}
                                        title="Edit"
                                      ></i>
                                    </Link>
                                  )}

                                  {checkPermission(["delete"]) && (
                                    <div className="input-group-addon addFirst mr-2">
                                      <i
                                        className="fa fa-trash"
                                        onClick={() => handleDelete(t.id)}
                                        title="Delete"
                                      ></i>
                                    </div>
                                  )}
                                </div>
                              </td>
                            )}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="text-center">
                            {loading ? "Loading..." : "No templates found"}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EmailTemplatesListing;
