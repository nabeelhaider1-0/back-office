import React, { useEffect, useState } from "react";
import { DefaultEditor } from "react-simple-wysiwyg";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaUpload,
  FaUndo,
  FaPlus,
} from "react-icons/fa";
import Swal from "sweetalert2";
import {
  getAllLabels,
  getAllPages,
  getAllPageSections,
  getAllAlerts,
  getAllFaqs,
  createLabel,
  updateLabel,
  deleteLabel,
  createPage,
  updatePage,
  deletePage,
  createPageSection,
  updatePageSection,
  deletePageSection,
  createAlert,
  updateAlert,
  deleteAlert,
  createFaq,
  updateFaq,
  deleteFaq,
  publishItem,
  rejectItem,
  createItem,
  getHeaderLabels,
  getPageDetailsWithSections,
  getPageVersions,
  restorePageVersion,
} from "../../Apis/API";
import { Spinner, Modal, Button, Form } from "react-bootstrap";
import {
  ErrorApiAlert,
  SuccessApiToast,
} from "../../constants/globalfunctions";
import axios from "axios";

const StaticContentManagement = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [contentType, setContentType] = useState("labels"); // labels | pages | sections | alerts | faqs | header
  const [items, setItems] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const [newLang, setNewLang] = useState("");

  // Page-specific state (for pages tab)
  const [selectedPage, setSelectedPage] = useState(null);
  const [pageDetails, setPageDetails] = useState({});
  const [pageSections, setPageSections] = useState([]);
  const [pageVersions, setPageVersions] = useState([]);

  // Modals & forms
  const [showViewPageModal, setShowViewPageModal] = useState(false);
  const [showEditPageModal, setShowEditPageModal] = useState(false);
  const [editPageData, setEditPageData] = useState({});
  // ...existing code...

  // --- AWS S3 Upload Helper ---

  const uploadImageToS3 = async (file, token) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload/s3`, // ✅ Your backend S3 upload route
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data?.url; // return the uploaded image URL
    } catch (error) {
      console.error("S3 upload error:", error);
      throw new Error("Image upload failed");
    }
  };

  // 🧠 Fetch data when language changes
  // useEffect(() => {
  //   fetchContentData(selectedLang);
  // }, [selectedLang]);

  // ...existing code...
  const handleViewPage = () => {
    setViewData(pageDetails); // ✅ pass details to modal
    setShowViewPageModal(true);
  };

  const handleEditPage = () => {
    setEditPageData(pageDetails || {});
    setShowEditPageModal(true);
  };

  const handleSaveEditPage = async () => {
    try {
      await updatePage(editPageData.slug, editPageData, token); // ✅ always use slug
      SuccessApiToast("Page updated successfully!");
      setShowEditPageModal(false);
      if (selectedPage?.slug) fetchPageDetails(selectedPage.slug);
    } catch (err) {
      ErrorApiAlert("Error updating page", err);
    }
  };

  const handleEditPageChange = (e) => {
    const { name, value } = e.target;
    setEditPageData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSaveEditPage = async () => {
  //   try {
  //     await updatePage(editPageData.slug, editPageData, token);
  //     SuccessApiToast("Page updated successfully!");
  //     setShowEditPageModal(false);
  //     if (selectedPage?.slug) fetchPageDetails(selectedPage.slug);
  //   } catch (err) {
  //     ErrorApiAlert("Error updating page", err);
  //   }
  // };
  // ...existing code...
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewData, setViewData] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);

  useEffect(() => {
    if (editData && editData.pages) {
      // Map existing Page objects to their IDs
      setEditData((prev) => ({
        ...prev,
        pageId: editData.pages.map((p) => p.id),
      }));
    }
  }, [editData?.pages]);

  const supportedLangs = ["en", "ar"];
  const [selectedEditLang, setSelectedEditLang] = useState("en");
  const [selectedLangTitle, setSelectedLangTitle] = React.useState("en");

  // Add label form
  const [newLabel, setNewLabel] = useState({
    namespace: "",
    key: "",
    link: "",
    icon: "",
    order_idx: 0,
    value: { en: "" },
    description: { en: "" },
    meta: {
      en: [], // directly an array of key/value pairs
    },
  });

  // Add section form
  const [newSection, setNewSection] = useState({
    pageId: "",
    sectionKey: "",
    title: {}, // 🟢 Now multilingual
    description: {}, // 🟢 Now multilingual
    componentType: "",
    order_idx: 0,
    images: [],
    lang: "en",
    content: {},
    items: [],
    status: "draft",
  });

  const [showAddPageModal, setShowAddPageModal] = useState(false);
  const [newPage, setNewPage] = useState({
    slug: "",
    lang: "en", // default language
    title: "",
    body_html: "",
    content_blocks: {}, // JSON object
    meta: {
      title: "",
      description: "",
      canonical: "",
    },
    tags: [], // array of strings
    // status: "draft",
  });

  const token = localStorage.getItem("token");

  // Helper to decode JWT and extract role
  function getUserRoleFromToken(token) {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      // console.log("Decoded JWT Payload:", payload);

      // ✅ Extract role name safely from the roles array
      const userRole = payload.roles?.[0]?.role_name || null;
      return userRole;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  const userRole = getUserRoleFromToken(token);
  // console.log("User Role:", userRole);

  // Now you can use userRole in your component
  // ...existing code...

  const [pages, setPages] = useState([]);
  // Fetch all pages when component mounts
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await getAllPages(token, selectedLang);
        setPages(response.data || []);
        // console.log("Fetched pages:", response.data);
      } catch (err) {
        console.error("Error fetching pages:", err);
      }
    };

    fetchPages();
  }, [token]);

  // Fetch items depending on selected contentType
  const fetchItems = async () => {
    setLoading(true);
    try {
      let response;
      switch (contentType) {
        case "labels":
          response = await getAllLabels(token, selectedLang);
          break;
        case "pages":
          response = await getAllPages(token, selectedLang);
          break;
        case "page-sections":
          response = await getAllPageSections(token, selectedLang);
          break;
        case "alerts":
          response = await getAllAlerts(token, selectedLang);
          break;
        case "faqs":
          response = await getAllFaqs(token, selectedLang);
          break;
        case "header":
          response = await getHeaderLabels(token, selectedLang);
          break;
        default:
          response = { data: [] };
      }

      const allItems = response?.data || [];
      const filteredByStatus = statusFilter
        ? allItems.filter((i) => i.status === statusFilter)
        : allItems;
      setItems(filteredByStatus);
    } catch (err) {
      ErrorApiAlert("Error fetching content", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch page details including sections and versions
  const fetchPageDetails = async (slug) => {
    try {
      // 1️⃣ Fetch page details (published sections)
      const response = await getPageDetailsWithSections(
        slug,
        token,
        selectedLang
      );
      const pageData = response.data || {};
      setPageDetails(pageData);
      console.log("📄 Page Details Response:", pageData);

      // 2️⃣ Fetch ALL sections (includes drafts, published, etc.)
      const allSectionsRes = await getAllPageSections(token);
      const allSections = Array.isArray(allSectionsRes.data)
        ? allSectionsRes.data
        : allSectionsRes.data?.sections || [];

      console.log("🧩 All Page Sections (Raw):", allSections);

      // 3️⃣ Filter only draft sections belonging to this page
      // 3️⃣ Filter draft + published sections for this page
      const relevantSections = allSections.filter(
        (sec) =>
          ["draft", "published"].includes(sec.status) &&
          (sec.pageId === pageData.id ||
            sec.pages?.some((p) => p.id === pageData.id))
      );

      console.log("🟡 Draft Sections for this page:", relevantSections);

      // 4️⃣ Combine published + drafts
      const combinedSections = [
        ...(pageData.sections || []),
        ...relevantSections,
      ];
      console.log("🔄 Combined Sections (Before Dedup):", combinedSections);
      // 5️⃣ Remove duplicates
      const uniqueSections = combinedSections.filter(
        (s, idx, arr) => arr.findIndex((x) => x.id === s.id) === idx
      );

      console.log(
        "✅ Final Combined Sections (Published + Draft):",
        uniqueSections
      );

      // 6️⃣ Set to state
      setPageSections(uniqueSections);

      // 7️⃣ Fetch versions as before
      const versionsRes = await getPageVersions(slug, token);
      setPageVersions(
        Array.isArray(versionsRes.data)
          ? versionsRes.data
          : versionsRes.data?.versions || []
      );
    } catch (err) {
      ErrorApiAlert("Error fetching page details", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [contentType, statusFilter]);

  const filteredItems = items.filter((i) =>
    JSON.stringify(i).toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredPages = pages.filter((i) =>
    JSON.stringify(i).toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Handlers
  const handleView = (item) => {
    setViewData(item);
    setShowViewModal(true);
  };
  const openEditModal = (item = {}) => {
    setEditData(item || {});
    setShowEditModal(true);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Save / update depending on type
  const handleSaveEdit = async () => {
    try {
      if (contentType === "labels") {
        editData.id
          ? await updateLabel(editData.id, editData, token)
          : await createLabel(editData, token);
      } else if (contentType === "pages") {
        editData.id
          ? await updatePage(editData.id, editData, token)
          : await createPage(editData, token);
      } else if (contentType === "page-sections") {
        editData.id
          ? await updatePageSection(editData.id, editData, token)
          : await createPageSection(editData, token);
      } else if (contentType === "alerts") {
        editData.id
          ? await updateAlert(editData.id, editData, token)
          : await createAlert(editData, token);
      } else if (contentType === "faqs") {
        editData.id
          ? await updateFaq(editData.id, editData, token)
          : await createFaq(editData, token);
      }

      SuccessApiToast("Saved successfully!");
      setShowEditModal(false);
      fetchItems();
    } catch (err) {
      ErrorApiAlert("Error saving item", err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      text: "Delete this item?",
      icon: "warning",
      showCancelButton: true,
    });
    if (!confirm.isConfirmed) return;
    try {
      if (contentType === "labels") await deleteLabel(id, token);
      else if (contentType === "pages") await deletePage(id, token);
      else if (contentType === "page-sections")
        await deletePageSection(id, token);
      else if (contentType === "alerts") await deleteAlert(id, token);
      else if (contentType === "faqs") await deleteFaq(id, token);
      SuccessApiToast("Item deleted!");
      fetchItems();
    } catch (err) {
      ErrorApiAlert("Error deleting item", err);
    }
  };

  // Publish / Reject
  const handlePublish = async (id) => {
    try {
      await publishItem(contentType, id, token);
      SuccessApiToast("Published successfully!");
      fetchItems();
    } catch (err) {
      ErrorApiAlert("Error publishing item", err);
    }
  };

  const handleReject = async (id) => {
    const { value: reason } = await Swal.fire({
      title: "Reject Reason",
      input: "text",
      showCancelButton: true,
    });
    if (!reason) return;
    try {
      await rejectItem(contentType, id, reason, token);
      SuccessApiToast("Item rejected!");
      fetchItems();
    } catch (err) {
      ErrorApiAlert("Error rejecting item", err);
    }
  };

  // Restore page version
  const handleRestoreVersion = async (versionId) => {
    const confirm = await Swal.fire({
      text: "Restore this version?",
      icon: "question",
      showCancelButton: true,
    });
    if (!confirm.isConfirmed) return;
    try {
      await restorePageVersion(versionId, token);
      SuccessApiToast("Page restored to selected version!");
      if (selectedPage?.slug) fetchPageDetails(selectedPage.slug);
    } catch (err) {
      ErrorApiAlert("Error restoring version", err);
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="card shadow-sm p-3">
        {/*
        <div className="d-flex justify-content-end mb-3">
        <select
          className="form-select"
          style={{ width: "180px" }}
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="ur">Urdu</option>
          <option value="fr">French</option>
        </select>
      </div>
      */}

        {/* Tabs */}
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "general" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("general");
                setSelectedPage(null); // Deactivate any selected page tab
              }}
            >
              General
            </button>
          </li>
          {/* <li className="nav-item"><button className={`nav-link ${activeTab === "pages" ? "active" : ""}`} onClick={() => { setActiveTab("pages"); setContentType("pages"); fetchItems(); }}>Pages</button></li> */}

          {/* Dynamic Page Tabs */}
          {filteredPages.map((p) => (
            <li key={p.id} className="nav-item">
              <button
                className={`nav-link ${
                  selectedPage?.id === p.id ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedPage(p);
                  setActiveTab(null); // Remove "general" tab activeness
                  fetchPageDetails(p.slug);
                }}
              >
                {p.title}
              </button>
            </li>
          ))}

          <li className="nav-item">
            <button
              className="nav-link text-success fw-bold"
              onClick={() => setShowAddPageModal(true)}
            >
              <FaPlus /> Add Page
            </button>
          </li>
        </ul>

        {/* GENERAL TAB */}
        {activeTab === "general" && (
          <>
            <div className="d-flex justify-content-between mb-3">
              <h5>General Content</h5>
              <div className="d-flex gap-2">
                <Button
                  variant="success"
                  size="sm"
                  className="d-flex align-items-center gap-1"
                  onClick={() => {
                    if (contentType === "labels") setShowAddModal(true);
                    else openEditModal();
                  }}
                >
                  <FaPlus size={12} /> Add
                </Button>

                <select
                  className="form-select form-select-sm"
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                >
                  <option value="labels">Labels</option>
                  {/* <option value="header">Header</option> */}
                  {/* <option value="alerts">Alerts</option> */}
                  {/* <option value="faqs">FAQs</option> */}
                  {/* <option value="page-sections">Sections</option> */}
                </select>
                <select
                  className="form-select form-select-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="rejected">Rejected</option>
                </select>
                <input
                  className="form-control form-control-sm"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <Spinner animation="border" />
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Key / Title</th>
                    <th>Namespace</th>
                    <th>Status</th>
                    <th>Order</th>
                    <th>Version</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.key || item.title || item.question || "—"}</td>
                      <td>{item.namespace}</td>
                      <td>{item.status}</td>
                      <td>{item.order_idx}</td>
                      <td>{item.version}</td>
                      <td>
                        <FaEye
                          className="text-primary mx-1 cursor-pointer"
                          onClick={() => handleView(item)}
                        />
                        <FaEdit
                          className="text-warning mx-1 cursor-pointer"
                          onClick={() => openEditModal(item)}
                        />
                        <FaUpload
                          className="text-success mx-1 cursor-pointer"
                          onClick={() => handlePublish(item.id)}
                        />
                        <FaUndo
                          className="text-danger mx-1 cursor-pointer"
                          onClick={() => handleReject(item.id)}
                        />
                        <FaTrash
                          className="text-secondary mx-1 cursor-pointer"
                          onClick={() => handleDelete(item.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {selectedPage && (
          <>
            <div className="d-flex justify-content-between mb-3">
              <input
                className="form-control form-control-sm"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {loading ? (
              <Spinner animation="border" />
            ) : (
              <div className="row">
                <div className="col-md-12">
                  {/* Page Header */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <h6 className="mb-0">
                        {pageDetails?.title}{" "}
                        <small className="text-muted">
                          ({pageDetails?.slug})
                        </small>
                      </h6>
                      <p className="text-secondary mb-0">
                        {pageDetails?.description}
                      </p>
                    </div>

                    <div className="d-flex gap-2 align-items-center">
                      {pageDetails?.status === "published" ? (
                        <>
                          <FaEye
                            className="text-primary cursor-pointer"
                            title="View Page"
                            onClick={handleViewPage}
                          />
                          <FaEdit
                            className="text-warning cursor-pointer"
                            title="Edit Page"
                            onClick={handleEditPage}
                          />
                          <FaTrash
                            className="text-danger cursor-pointer"
                            title="Delete Page"
                            onClick={async () => {
                              //await deleteItem("pages", pageDetails.slug, token);
                              setContentType("pages");
                              handleDelete(pageDetails.id);
                              setSelectedPage(null);
                            }}
                          />
                        </>
                      ) : (
                        <Button
                          size="sm"
                          variant="success"
                          className="d-flex align-items-center gap-1"
                          onClick={async () => {
                            try {
                              await publishItem(
                                "pages",
                                pageDetails.slug,
                                token
                              );
                              SuccessApiToast("Page published successfully!");
                              fetchItems(); // Refresh the page list
                              if (selectedPage?.slug)
                                fetchPageDetails(selectedPage.slug); // Refresh current page details
                            } catch (err) {
                              ErrorApiAlert("Error publishing page", err);
                            }
                          }}
                        >
                          <FaUpload size={12} /> Publish
                        </Button>
                      )}
                    </div>
                  </div>

                  <h6 className="d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-between mb-2">
                      <h5>Page Sections Management</h5>
                    </div>
                    Sections {pageSections.length}
                    <Button
                      variant="success"
                      size="sm"
                      className="d-flex align-items-center gap-1"
                      onClick={() => {
                        setNewSection({
                          pageId: selectedPage?.id || "",
                          sectionKey: "",
                          title: {}, // 🟢 Now multilingual
                          description: {}, // 🟢 Now multilingual
                          componentType: "", // e.g. "HomeStartingPoints"
                          order_idx: 0,

                          content: {},
                          items: [],
                          status: "draft",
                        });
                        setShowAddSectionModal(true);
                      }}
                    >
                      <FaPlus size={12} /> Add Section
                    </Button>
                  </h6>

                  <table className="table table-sm table-bordered">
                    <thead>
                      <tr>
                        <th>Key</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Order</th>
                        <th>Version</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {pageSections.map((s) => (
                        <tr key={s.id}>
                          <td>{s.sectionKey}</td>
                          {/* <td>{s.title}</td>
                  <td>{s.description}</td> */}
                          <td>
                            {(() => {
                              if (!s.title) return "—";
                              if (typeof s.title === "string") return s.title;
                              if (typeof s.title === "object") {
                                // Handle stringified JSON case too
                                try {
                                  const parsed =
                                    typeof s.title === "string"
                                      ? JSON.parse(s.title)
                                      : s.title;
                                  return (
                                    parsed.en ||
                                    Object.values(parsed)[0] ||
                                    JSON.stringify(parsed)
                                  );
                                } catch {
                                  return JSON.stringify(s.title);
                                }
                              }
                              return "—";
                            })()}
                          </td>

                          <td>
                            {(() => {
                              if (!s.description) return "—";
                              if (typeof s.description === "string")
                                return s.description;
                              if (typeof s.description === "object") {
                                try {
                                  const parsed =
                                    typeof s.description === "string"
                                      ? JSON.parse(s.description)
                                      : s.description;
                                  return (
                                    parsed.en ||
                                    Object.values(parsed)[0] ||
                                    JSON.stringify(parsed)
                                  );
                                } catch {
                                  return JSON.stringify(s.description);
                                }
                              }
                              return "—";
                            })()}
                          </td>

                          <td>{s.status}</td>
                          <td>{s.order_idx}</td>
                          <td>{s.version}</td>
                          {/* <td>
                    <Button size="sm" variant="outline-primary" onClick={() => { setContentType('page-section'); setViewData(s); setShowViewModal(true); }}>View</Button>
{' '}
                    <Button size="sm" variant="outline-warning" onClick={() => openEditModal(s)}>Edit</Button>
                  </td> */}
                          <td>
                            <FaEye
                              className="text-primary mx-1 cursor-pointer"
                              onClick={() => {
                                setContentType("page-sections");
                                setViewData(s);
                                setShowViewModal(true);
                              }}
                            />
                            <FaEdit
                              className="text-warning mx-1 cursor-pointer"
                              onClick={() => {
                                setContentType("page-sections");
                                openEditModal(s);
                              }}
                            />
                            <FaUpload
                              className={`mx-1 cursor-pointer ${
                                s.status === "draft" || s.updates
                                  ? "text-success"
                                  : "text-secondary opacity-50 cursor-not-allowed"
                              }`}
                              onClick={() => {
                                if (s.status === "draft") {
                                  setContentType("page-sections");
                                  handlePublish(s.id);
                                }
                              }}
                              title={
                                s.status === "draft"
                                  ? "Publish section"
                                  : "No updates available to publish"
                              }
                            />

                            <FaUndo
                              className="text-danger mx-1 cursor-pointer"
                              onClick={() => {
                                setContentType("page-sections");
                                handleReject(s.id);
                              }}
                            />
                            <FaTrash
                              className="text-secondary mx-1 cursor-pointer"
                              onClick={() => {
                                setContentType("page-sections");
                                handleDelete(s.id);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h6>Versions</h6>
                  <table className="table table-sm table-bordered">
                    <thead>
                      <tr>
                        <th>Version</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {pageVersions.map((v) => (
                        <tr key={v.id}>
                          <td>{v.version}</td>
                          <td>{v.author}</td>
                          <td>{new Date(v.created_at).toLocaleString()}</td>
                          <td>
                            <Button
                              size="sm"
                              variant="outline-secondary"
                              onClick={() => handleRestoreVersion(v.id)}
                            >
                              Restore
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* ---------------------- VIEW MODAL ---------------------- */}
        <Modal
          show={showViewModal}
          onHide={() => setShowViewModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              View{" "}
              {(() => {
                const title = viewData?.title;

                if (!title) return viewData?.key || "Item";

                try {
                  // 🧠 If title is a JSON string
                  if (typeof title === "string" && title.startsWith("{")) {
                    const parsed = JSON.parse(title);
                    return parsed.en || Object.values(parsed)[0] || "Item";
                  }

                  // 🧠 If title is an object
                  if (typeof title === "object") {
                    return title.en || Object.values(title)[0] || "Item";
                  }

                  // 🧠 Otherwise, plain string
                  return title;
                } catch {
                  return typeof title === "string" ? title : "Item";
                }
              })()}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* ---------- LABELS (Dynamic) ---------- */}
            {/* ---------- VIEW LABEL (Multilingual) ---------- */}
            {contentType === "labels" ? (
              <>
                {["namespace", "key", "link", "icon", "order_idx"].map(
                  (field) =>
                    viewData[field] ? (
                      <Form.Group key={field} className="mb-2">
                        <Form.Label>{field}</Form.Label>
                        <Form.Control value={viewData[field]} readOnly />
                      </Form.Group>
                    ) : null
                )}

                {/* ---------- Show available languages ---------- */}
                {(() => {
                  const langs = new Set([
                    ...Object.keys(viewData.value || {}),
                    ...Object.keys(viewData.description || {}),
                    ...(viewData.meta ? Object.keys(viewData.meta) : []),
                  ]);

                  return [...langs].map((lang) => (
                    <div key={lang} className="border rounded p-2 mb-3">
                      <h6 className="text-primary mb-2">
                        Language: {lang.toUpperCase()}
                      </h6>

                      {/* Value */}
                      {viewData.value?.[lang] && (
                        <Form.Group className="mb-2">
                          <Form.Label>Value</Form.Label>
                          <Form.Control value={viewData.value[lang]} readOnly />
                        </Form.Group>
                      )}

                      {/* Description */}
                      {viewData.description?.[lang] && (
                        <Form.Group className="mb-2">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={viewData.description[lang]}
                            readOnly
                          />
                        </Form.Group>
                      )}

                      {/* Meta */}
                      {viewData.meta?.[lang] &&
                      viewData.meta[lang].length > 0 ? (
                        <>
                          <strong>Meta Children</strong>
                          <ul className="mt-2">
                            {viewData.meta[lang].map((child, idx) => (
                              <li key={idx}>
                                {Object.entries(child).map(([k, v]) => (
                                  <div key={k}>
                                    <strong>{k}: </strong> {String(v)}
                                  </div>
                                ))}
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                    </div>
                  ));
                })()}
              </>
            ) : contentType === "page-sections" || viewData?.items ? (
              /* ---------- PAGE SECTIONS (Dynamic) ---------- */
              <>
                {["pageId", "sectionKey", "title", "description"].map(
                  (field) => {
                    const value = viewData[field];

                    console.log(`🧩 Field: ${field}`, value); // ✅ Debug: check if value exists

                    if (!value) {
                      console.warn(`⚠️ Missing value for field: ${field}`);
                      return null;
                    }

                    // 🧩 Handle multilingual or stringified JSON values
                    let displayValue = value;
                    if (typeof value === "string" && value.startsWith("{")) {
                      try {
                        displayValue = JSON.parse(value);
                      } catch (err) {
                        console.error(`❌ Failed to parse ${field}:`, err);
                        displayValue = value; // fallback
                      }
                    }

                    return (
                      <Form.Group key={field} className="mb-2">
                        <Form.Label className="text-capitalize">
                          {field}
                        </Form.Label>

                        {/* 🧠 If multilingual object */}
                        {typeof displayValue === "object" &&
                        !Array.isArray(displayValue) ? (
                          Object.entries(displayValue).map(([lang, val]) => (
                            <Form.Control
                              key={lang}
                              readOnly
                              value={`${lang.toUpperCase()}: ${val || "—"}`}
                              className="mb-1"
                            />
                          ))
                        ) : (
                          // 📝 If normal string
                          <Form.Control readOnly value={displayValue} />
                        )}
                      </Form.Group>
                    );
                  }
                )}

                {/* ✅ Log content too */}
                {console.log("🧾 viewData.content:", viewData.content)}

                {/* ---------- Content ---------- */}
                {(() => {
                  const contentObj = viewData?.content || {};

                  if (Object.keys(contentObj).length === 0)
                    return <p className="text-muted">No content available.</p>;

                  return Object.entries(contentObj).map(([lang, content]) => (
                    <div key={lang} className="mb-3 border rounded p-2">
                      <Form.Label className="fw-bold">
                        Content ({lang.toUpperCase()})
                      </Form.Label>
                      <div
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          padding: "10px",
                          minHeight: "200px",
                          background: "#fff",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: typeof content === "string" ? content : "",
                        }}
                      />
                    </div>
                  ));
                })()}

                <h6 className="mt-3">Items</h6>

                {(() => {
                  console.log("📦 viewData.items:", viewData.items);

                  // 🧩 Handle both multilingual and single array formats
                  const items =
                    typeof viewData.items === "object" &&
                    !Array.isArray(viewData.items)
                      ? Object.entries(viewData.items)
                      : [["default", viewData.items]];

                  if (!items.length)
                    return <p className="text-muted">No items available.</p>;

                  return items.map(([lang, list]) => (
                    <div key={lang} className="mb-3">
                      <h6 className="mt-3 text-primary">
                        Items ({lang.toUpperCase()})
                      </h6>
                      {Array.isArray(list) && list.length > 0 ? (
                        <table className="table table-sm table-bordered">
                          <thead>
                            <tr>
                              {Array.from(
                                new Set(
                                  list.flatMap((item) =>
                                    Object.keys(item || {})
                                  )
                                )
                              ).map((key) => (
                                <th key={key}>{key}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {list.map((item, idx) => (
                              <tr key={idx}>
                                {Object.keys(item).map((key) => (
                                  <td key={key}>{item[key]}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-muted">No items in this language.</p>
                      )}
                    </div>
                  ));
                })()}
              </>
            ) : (
              /* ---------- FALLBACK (Generic View) ---------- */
              <pre>{JSON.stringify(viewData, null, 2)}</pre>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowViewModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ---------------------- EDIT MODAL ---------------------- */}
        <Modal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {editData?.id ? "Edit Item" : "Add New Item"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {contentType === "labels" ? (
                <>
                  {/* ---------- Basic Fields ---------- */}
                  {["namespace", "key", "link", "icon", "order_idx"].map(
                    (field) => (
                      <Form.Group key={field} className="mb-2">
                        <Form.Label>{field}</Form.Label>
                        <Form.Control
                          name={field}
                          value={editData[field] ?? ""}
                          onChange={handleEditChange}
                        />
                      </Form.Group>
                    )
                  )}

                  {/* ---------- Multilingual Handling ---------- */}
                  {(() => {
                    const langsFromValue = Object.keys(editData.value || {});
                    const langsFromDesc = Object.keys(
                      editData.description || {}
                    );
                    const langsFromMeta =
                      editData.meta && typeof editData.meta === "object"
                        ? Object.keys(editData.meta)
                        : [];
                    const existingLangs = Array.from(
                      new Set([
                        ...langsFromValue,
                        ...langsFromDesc,
                        ...langsFromMeta,
                      ])
                    );
                    if (existingLangs.length === 0) existingLangs.push("en");

                    return (
                      <>
                        {/* ---------- Language Tabs ---------- */}
                        <div className="mb-2 d-flex align-items-center flex-wrap">
                          <strong className="me-2">Languages:</strong>
                          {existingLangs.map((lang) => (
                            <button
                              key={lang}
                              type="button"
                              className={`btn btn-sm me-1 mb-1 ${
                                selectedLang === lang
                                  ? "btn-primary"
                                  : "btn-outline-secondary"
                              }`}
                              onClick={() => setSelectedLang(lang)}
                            >
                              {lang.toUpperCase()}
                            </button>
                          ))}

                          {/* ---------- Add new language ---------- */}
                          <div className="d-flex align-items-center ms-2">
                            <Form.Control
                              size="sm"
                              placeholder="Add new lang (e.g. fr)"
                              value={newLang || ""}
                              onChange={(e) =>
                                setNewLang(e.target.value.trim().toLowerCase())
                              }
                              style={{ width: "140px" }}
                            />
                            <Button
                              size="sm"
                              className="ms-2"
                              onClick={() => {
                                if (
                                  newLang &&
                                  !existingLangs.includes(newLang)
                                ) {
                                  setEditData((prev) => ({
                                    ...prev,
                                    value: { ...prev.value, [newLang]: "" },
                                    description: {
                                      ...prev.description,
                                      [newLang]: "",
                                    },
                                    meta: {
                                      ...prev.meta,
                                      [newLang]: [],
                                    },
                                  }));
                                  setSelectedLang(newLang);
                                  setNewLang("");
                                }
                              }}
                            >
                              + Add
                            </Button>
                          </div>
                        </div>

                        {/* ---------- VALUE ---------- */}
                        <Form.Group className="mb-2">
                          <Form.Label>
                            Value ({selectedLang.toUpperCase()})
                          </Form.Label>
                          {selectedLang !== "en" && (
                            <div className="p-2 mb-2 border rounded bg-light text-muted">
                              <small>
                                <strong>Original (EN):</strong>{" "}
                                {editData.value?.en ||
                                  "No English value available"}
                              </small>
                            </div>
                          )}
                          <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder={`Enter value for ${selectedLang.toUpperCase()}`}
                            value={editData.value?.[selectedLang] || ""}
                            onChange={(e) =>
                              setEditData((prev) => ({
                                ...prev,
                                value: {
                                  ...prev.value,
                                  [selectedLang]: e.target.value,
                                },
                              }))
                            }
                          />
                        </Form.Group>

                        {/* ---------- DESCRIPTION ---------- */}
                        <Form.Group className="mb-2">
                          <Form.Label>
                            Description ({selectedLang.toUpperCase()})
                          </Form.Label>
                          {selectedLang !== "en" && (
                            <div className="p-2 mb-2 border rounded bg-light text-muted">
                              <small>
                                <strong>Original (EN):</strong>{" "}
                                {editData.description?.en ||
                                  "No English description available"}
                              </small>
                            </div>
                          )}
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={editData.description?.[selectedLang] || ""}
                            onChange={(e) =>
                              setEditData((prev) => ({
                                ...prev,
                                description: {
                                  ...prev.description,
                                  [selectedLang]: e.target.value,
                                },
                              }))
                            }
                          />
                        </Form.Group>

                        {/* ---------- META ITEMS ---------- */}
                        <h6 className="mt-3">
                          Meta Items ({selectedLang.toUpperCase()})
                        </h6>
                        {(() => {
                          const englishMeta = editData.meta?.en || [];

                          // Sync current language keys with English
                          if (selectedLang !== "en") {
                            const current = editData.meta?.[selectedLang] || [];
                            const synced = englishMeta.map((enItem, i) => {
                              const newItem = {};
                              Object.keys(enItem).forEach((key) => {
                                newItem[key] = current[i]?.[key] || "";
                              });
                              return newItem;
                            });

                            if (
                              JSON.stringify(current) !== JSON.stringify(synced)
                            ) {
                              setEditData((prev) => ({
                                ...prev,
                                meta: { ...prev.meta, [selectedLang]: synced },
                              }));
                            }
                          }

                          const metaItems =
                            editData.meta?.[selectedLang] || englishMeta;

                          return Array.isArray(metaItems) &&
                            metaItems.length > 0 ? (
                            <table className="table table-sm table-bordered">
                              <thead>
                                <tr>
                                  <th>Key</th>
                                  <th>Value</th>
                                  {selectedLang === "en" && <th>Actions</th>}
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {metaItems.map((item, idx) => (
                                  <React.Fragment key={idx}>
                                    {Object.entries(item).map(
                                      ([key, value]) => (
                                        <tr key={`${idx}-${key}`}>
                                          <td style={{ width: "30%" }}>
                                            {selectedLang === "en" ? (
                                              <Form.Control
                                                value={key}
                                                onChange={(e) => {
                                                  const newKey = e.target.value;
                                                  const updated = [
                                                    ...englishMeta,
                                                  ];
                                                  const oldVal =
                                                    updated[idx][key];
                                                  delete updated[idx][key];
                                                  updated[idx][newKey] = oldVal;

                                                  const allLangs = {
                                                    ...editData.meta,
                                                  };
                                                  Object.keys(allLangs).forEach(
                                                    (lang) => {
                                                      if (lang !== "en") {
                                                        const items =
                                                          allLangs[lang] || [];
                                                        if (items[idx]) {
                                                          const oldValue =
                                                            items[idx][key] ||
                                                            "";
                                                          delete items[idx][
                                                            key
                                                          ];
                                                          items[idx][newKey] =
                                                            oldValue;
                                                        }
                                                        allLangs[lang] = items;
                                                      }
                                                    }
                                                  );

                                                  setEditData({
                                                    ...editData,
                                                    meta: {
                                                      ...allLangs,
                                                      en: updated,
                                                    },
                                                  });
                                                }}
                                              />
                                            ) : (
                                              <span>{key}</span>
                                            )}
                                          </td>
                                          <td>
                                            {selectedLang !== "en" && (
                                              <div className="p-1 mb-1 border rounded bg-light text-muted small">
                                                {englishMeta[idx]?.[key] || "—"}
                                              </div>
                                            )}
                                            <Form.Control
                                              as="textarea"
                                              rows={2}
                                              value={value}
                                              onChange={(e) => {
                                                const updated = [...metaItems];
                                                updated[idx][key] =
                                                  e.target.value;
                                                setEditData((prev) => ({
                                                  ...prev,
                                                  meta: {
                                                    ...prev.meta,
                                                    [selectedLang]: updated,
                                                  },
                                                }));
                                              }}
                                            />
                                          </td>
                                          {selectedLang === "en" && (
                                            <td>
                                              <Button
                                                size="sm"
                                                variant="danger"
                                                onClick={() => {
                                                  const updated =
                                                    englishMeta.filter(
                                                      (_, i) => i !== idx
                                                    );
                                                  const allLangs = {
                                                    ...editData.meta,
                                                  };
                                                  Object.keys(allLangs).forEach(
                                                    (lang) => {
                                                      allLangs[lang] = allLangs[
                                                        lang
                                                      ]?.filter(
                                                        (_, i) => i !== idx
                                                      );
                                                    }
                                                  );
                                                  setEditData({
                                                    ...editData,
                                                    meta: allLangs,
                                                  });
                                                }}
                                              >
                                                Remove
                                              </Button>
                                            </td>
                                          )}
                                        </tr>
                                      )
                                    )}
                                  </React.Fragment>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p className="text-muted">
                              No meta items yet for {selectedLang.toUpperCase()}
                              .
                            </p>
                          );
                        })()}

                        {/* Add Meta Item (Only EN) */}
                        {selectedLang === "en" && (
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => {
                              const englishMeta = editData.meta?.en || [];
                              const updated = [...englishMeta, {}];

                              const allLangs = { ...editData.meta };
                              Object.keys(allLangs).forEach((lang) => {
                                if (lang !== "en") {
                                  const items = allLangs[lang] || [];
                                  items.push({});
                                  allLangs[lang] = items;
                                }
                              });

                              setEditData({
                                ...editData,
                                meta: { ...allLangs, en: updated },
                              });
                            }}
                          >
                            + Add Meta Item (EN)
                          </Button>
                        )}
                      </>
                    );
                  })()}
                </>
              ) : contentType === "page-sections" ? (
                <>
                  {/* ---------- Basic Info ---------- */}
                  {["sectionKey", "componentType"].map((field) => (
                    <Form.Group key={field} className="mb-2">
                      <Form.Label>{field}</Form.Label>
                      <Form.Control
                        name={field}
                        value={editData[field] || ""}
                        onChange={handleEditChange}
                      />
                    </Form.Group>
                  ))}

                  {/* ---------- Order Index ---------- */}
                  <Form.Group className="mb-2">
                    <Form.Label>Display Order (order_idx)</Form.Label>
                    <Form.Control
                      type="number"
                      name="order_idx"
                      value={editData.order_idx || 0}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          order_idx: Number(e.target.value),
                        })
                      }
                    />
                  </Form.Group>

                  {/* ---------- Pages Selection ---------- */}
                  <Form.Group className="mb-2">
                    <Form.Label>Pages</Form.Label>
                    <div className="d-flex flex-wrap gap-2">
                      {pages.map((page) => {
                        const isSelected = editData.pageId?.includes(page.id);
                        return (
                          <Button
                            key={page.id}
                            size="sm"
                            variant={
                              isSelected ? "primary" : "outline-secondary"
                            }
                            onClick={() => {
                              const updatedIds = isSelected
                                ? editData.pageId.filter((id) => id !== page.id)
                                : [...(editData.pageId || []), page.id];
                              setEditData({ ...editData, pageId: updatedIds });
                            }}
                          >
                            {page.title}
                          </Button>
                        );
                      })}
                    </div>
                  </Form.Group>

                  {/* ---------- Multilingual Handling ---------- */}
                  {(() => {
                    const allLangs = new Set([
                      ...Object.keys(editData.title || {}),
                      ...Object.keys(editData.description || {}),
                      ...Object.keys(editData.content || {}),
                      ...(editData.items ? Object.keys(editData.items) : []),
                    ]);
                    if (allLangs.size === 0) allLangs.add("en");

                    return (
                      <>
                        {/* ---------- Language Tabs ---------- */}
                        <div className="mb-2 d-flex align-items-center flex-wrap">
                          <strong className="me-2">Languages:</strong>
                          {(() => {
                            const langsFromTitle = Object.keys(
                              editData.title || {}
                            );
                            const langsFromDesc = Object.keys(
                              editData.description || {}
                            );
                            const langsFromContent = Object.keys(
                              editData.content || {}
                            );
                            const langsFromItems =
                              editData.items &&
                              typeof editData.items === "object" &&
                              !Array.isArray(editData.items)
                                ? Object.keys(editData.items)
                                : [];
                            const existingLangs = Array.from(
                              new Set([
                                ...langsFromTitle,
                                ...langsFromDesc,
                                ...langsFromContent,
                                ...langsFromItems,
                              ])
                            );
                            if (existingLangs.length === 0)
                              existingLangs.push("en");

                            return existingLangs.map((lang) => (
                              <button
                                key={lang}
                                type="button"
                                className={`btn btn-sm me-1 mb-1 ${
                                  selectedLang === lang
                                    ? "btn-primary"
                                    : "btn-outline-secondary"
                                }`}
                                onClick={() => setSelectedLang(lang)}
                              >
                                {lang.toUpperCase()}
                              </button>
                            ));
                          })()}

                          {/* Add New Language */}
                          <div className="d-flex align-items-center ms-2">
                            <Form.Control
                              size="sm"
                              placeholder="Add new lang (e.g. fr)"
                              value={newLang || ""}
                              onChange={(e) =>
                                setNewLang(e.target.value.trim().toLowerCase())
                              }
                              style={{ width: "140px" }}
                            />
                            <Button
                              size="sm"
                              className="ms-2"
                              onClick={() => {
                                if (newLang && !allLangs.has(newLang)) {
                                  setEditData((prev) => ({
                                    ...prev,
                                    title: { ...prev.title, [newLang]: "" },
                                    description: {
                                      ...prev.description,
                                      [newLang]: "",
                                    },
                                    content: { ...prev.content, [newLang]: {} },
                                    items: { ...prev.items, [newLang]: [] },
                                  }));
                                  setSelectedLang(newLang);
                                  setNewLang("");
                                }
                              }}
                            >
                              + Add
                            </Button>
                          </div>
                        </div>

                        {/* ---------- TITLE ---------- */}
                        <Form.Group className="mb-2">
                          <Form.Label>
                            Title ({selectedLang.toUpperCase()})
                          </Form.Label>
                          {selectedLang !== "en" && (
                            <div className="p-2 mb-2 border rounded bg-light text-muted">
                              <small>
                                <strong>Original (EN):</strong>{" "}
                                {editData.title?.en ||
                                  "No English title available"}
                              </small>
                            </div>
                          )}
                          <Form.Control
                            placeholder={`Enter title in ${selectedLang.toUpperCase()}`}
                            value={editData.title?.[selectedLang] || ""}
                            onChange={(e) =>
                              setEditData((prev) => ({
                                ...prev,
                                title: {
                                  ...prev.title,
                                  [selectedLang]: e.target.value,
                                },
                              }))
                            }
                          />
                        </Form.Group>

                        {/* ---------- DESCRIPTION ---------- */}
                        <Form.Group className="mb-2">
                          <Form.Label>
                            Description ({selectedLang.toUpperCase()})
                          </Form.Label>
                          {selectedLang !== "en" && (
                            <div className="p-2 mb-2 border rounded bg-light text-muted">
                              <small>
                                <strong>Original (EN):</strong>{" "}
                                {editData.description?.en ||
                                  "No English description available"}
                              </small>
                            </div>
                          )}
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder={`Enter description in ${selectedLang.toUpperCase()}`}
                            value={editData.description?.[selectedLang] || ""}
                            onChange={(e) => {
                              setEditData((prev) => ({
                                ...prev,
                                description: {
                                  ...prev.description,
                                  [selectedLang]: e.target.value,
                                },
                              }));
                            }}
                          />
                        </Form.Group>

                        {/* ---------- CONTENT ---------- */}
                        {/* ---------- Content (Rich Text for Policy/About Pages) ---------- */}
                        {(() => {
                          if (
                            [
                              "privacy-policy",
                              "terms-conditions",
                              "about-us",
                            ].includes(editData.componentType)
                          ) {
                            return (
                              <div className="mb-3">
                                <Form.Label>
                                  Content ({selectedLang.toUpperCase()})
                                </Form.Label>

                                <DefaultEditor
                                  value={editData.content?.[selectedLang] || ""}
                                  onChange={(e) =>
                                    setEditData((prev) => ({
                                      ...prev,
                                      content: {
                                        ...prev.content,
                                        [selectedLang]: e.target.value,
                                      },
                                    }))
                                  }
                                  style={{
                                    minHeight: "250px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    padding: "10px",
                                    backgroundColor: "#fff",
                                  }}
                                />
                              </div>
                            );
                          }

                          // 🟢 Default JSON-based content (for other component types)
                          return (
                            <Form.Group className="mb-2">
                              <Form.Label>
                                Content ({selectedLang.toUpperCase()})
                              </Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={5}
                                value={
                                  editData.content?.[selectedLang]
                                    ? JSON.stringify(
                                        editData.content[selectedLang],
                                        null,
                                        2
                                      )
                                    : "{}"
                                }
                                onChange={(e) => {
                                  try {
                                    const parsed = JSON.parse(e.target.value);
                                    setEditData((prev) => ({
                                      ...prev,
                                      content: {
                                        ...prev.content,
                                        [selectedLang]: parsed,
                                      },
                                    }));
                                  } catch {
                                    // Ignore invalid JSON
                                  }
                                }}
                              />
                            </Form.Group>
                          );
                        })()}

                        {/* ---------- ITEMS ---------- */}
                        <h6 className="mt-3">
                          Items ({selectedLang.toUpperCase()})
                        </h6>
                        {Array.isArray(editData.items?.[selectedLang]) &&
                        editData.items[selectedLang].length > 0 ? (
                          <table className="table table-sm table-bordered">
                            <thead>
                              <tr>
                                {Array.from(
                                  new Set([
                                    ...(editData.items[selectedLang]?.flatMap(
                                      (item) => Object.keys(item || {})
                                    ) || []),
                                    ...(editData.items.en?.flatMap((item) =>
                                      Object.keys(item || {})
                                    ) || []),
                                  ])
                                ).map((key) => (
                                  <th key={key}>{key}</th>
                                ))}
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {editData.items[selectedLang].map((item, idx) => {
                                const allKeys = Array.from(
                                  new Set([
                                    ...(editData.items[selectedLang]?.flatMap(
                                      (itm) => Object.keys(itm || {})
                                    ) || []),
                                    ...(editData.items.en?.flatMap((itm) =>
                                      Object.keys(itm || {})
                                    ) || []),
                                  ])
                                );
                                return (
                                  <tr key={idx}>
                                    {allKeys.map((key) => (
                                      <td key={key}>
                                        {selectedLang !== "en" && (
                                          <div className="p-1 mb-1 border rounded bg-light text-muted small">
                                            {editData.items.en?.[idx]?.[key] ||
                                              "—"}
                                          </div>
                                        )}
                                        <Form.Control
                                          value={item[key] || ""}
                                          onChange={(e) => {
                                            const updated = [
                                              ...editData.items[selectedLang],
                                            ];
                                            updated[idx][key] = e.target.value;
                                            setEditData((prev) => ({
                                              ...prev,
                                              items: {
                                                ...prev.items,
                                                [selectedLang]: updated,
                                              },
                                            }));
                                          }}
                                        />
                                      </td>
                                    ))}
                                    <td>
                                      <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() => {
                                          const updated = editData.items[
                                            selectedLang
                                          ].filter((_, i) => i !== idx);
                                          setEditData((prev) => ({
                                            ...prev,
                                            items: {
                                              ...prev.items,
                                              [selectedLang]: updated,
                                            },
                                          }));
                                        }}
                                      >
                                        Remove
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        ) : (
                          <p className="text-muted">
                            No items added yet for {selectedLang.toUpperCase()}.
                            Showing English as reference.
                          </p>
                        )}

                        <Button
                          size="sm"
                          variant="success"
                          onClick={() => {
                            const existing =
                              editData.items?.[selectedLang] || [];
                            const allKeys = Array.from(
                              new Set(
                                existing.flatMap((itm) =>
                                  Object.keys(itm || {})
                                )
                              )
                            );
                            const newItem = {};
                            allKeys.forEach((key) => (newItem[key] = ""));
                            const updated = [...existing, newItem];
                            setEditData((prev) => ({
                              ...prev,
                              items: {
                                ...prev.items,
                                [selectedLang]: updated,
                              },
                            }));
                          }}
                        >
                          + Add Item ({selectedLang.toUpperCase()})
                        </Button>
                      </>
                    );
                  })()}
                </>
              ) : (
                /* ---------- GENERIC EDIT FORM ---------- */
                Object.keys(editData || {}).map((key) =>
                  [
                    "id",
                    "created_at",
                    "updated_at",
                    "status",
                    "version",
                  ].includes(key) ? null : (
                    <Form.Group key={key} className="mb-2">
                      <Form.Label>{key}</Form.Label>
                      <Form.Control
                        name={key}
                        value={editData[key] || ""}
                        onChange={handleEditChange}
                      />
                    </Form.Group>
                  )
                )
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button variant="success" size="sm" onClick={handleSaveEdit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ---------------------- ADD LABEL MODAL ---------------------- */}
        <Modal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Label</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* ---------- BASIC FIELDS ---------- */}
              {["namespace", "key", "link", "icon"].map((field) => (
                <Form.Group key={field} className="mb-2">
                  <Form.Label>{field}</Form.Label>
                  <Form.Control
                    value={newLabel[field] || ""}
                    onChange={(e) =>
                      setNewLabel({ ...newLabel, [field]: e.target.value })
                    }
                  />
                </Form.Group>
              ))}

              {/* ---------- ORDER INDEX ---------- */}
              <Form.Group className="mb-2">
                <Form.Label>Order Index</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={newLabel.order_idx ?? 0}
                  onChange={(e) =>
                    setNewLabel({
                      ...newLabel,
                      order_idx: Number(e.target.value) || 0,
                    })
                  }
                />
              </Form.Group>

              {/* ---------- MULTILINGUAL HANDLING ---------- */}
              {(() => {
                const langs = new Set([
                  ...Object.keys(newLabel.value || {}),
                  ...Object.keys(newLabel.description || {}),
                  ...(newLabel.meta ? Object.keys(newLabel.meta) : []),
                ]);
                if (langs.size === 0) langs.add("en");

                return (
                  <>
                    {/* ---------- LANGUAGE TABS ---------- */}
                    <div className="mb-2 d-flex align-items-center flex-wrap">
                      <strong className="me-2">Languages:</strong>
                      {[...langs].map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          className={`btn btn-sm me-1 mb-1 ${
                            selectedLang === lang
                              ? "btn-primary"
                              : "btn-outline-secondary"
                          }`}
                          onClick={() => setSelectedLang(lang)}
                        >
                          {lang.toUpperCase()}
                        </button>
                      ))}

                      {/* Add new language */}
                      <div className="d-flex align-items-center ms-2">
                        <Form.Control
                          size="sm"
                          placeholder="Add new lang (e.g. fr)"
                          value={newLang || ""}
                          onChange={(e) =>
                            setNewLang(e.target.value.trim().toLowerCase())
                          }
                          style={{ width: "140px" }}
                        />
                        <Button
                          size="sm"
                          className="ms-2"
                          onClick={() => {
                            if (newLang && !langs.has(newLang)) {
                              setNewLabel((prev) => ({
                                ...prev,
                                value: { ...prev.value, [newLang]: "" },
                                description: {
                                  ...prev.description,
                                  [newLang]: "",
                                },
                                meta: { ...prev.meta, [newLang]: [] },
                              }));
                              setSelectedLang(newLang);
                              setNewLang("");
                            }
                          }}
                        >
                          + Add
                        </Button>
                      </div>
                    </div>

                    {/* ---------- VALUE ---------- */}
                    <Form.Group className="mb-2">
                      <Form.Label>
                        Value ({selectedLang.toUpperCase()})
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={newLabel.value?.[selectedLang] || ""}
                        onChange={(e) =>
                          setNewLabel((prev) => ({
                            ...prev,
                            value: {
                              ...prev.value,
                              [selectedLang]: e.target.value,
                            },
                          }))
                        }
                      />
                    </Form.Group>

                    {/* ---------- DESCRIPTION ---------- */}
                    <Form.Group className="mb-2">
                      <Form.Label>
                        Description ({selectedLang.toUpperCase()})
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={newLabel.description?.[selectedLang] || ""}
                        onChange={(e) =>
                          setNewLabel((prev) => ({
                            ...prev,
                            description: {
                              ...prev.description,
                              [selectedLang]: e.target.value,
                            },
                          }))
                        }
                      />
                    </Form.Group>

                    {/* ---------- META (Dynamic Key/Value Pairs) ---------- */}
                    <h6 className="mt-3">
                      Meta ({selectedLang.toUpperCase()})
                    </h6>

                    {Array.isArray(newLabel.meta?.[selectedLang]) &&
                    newLabel.meta[selectedLang].length > 0 ? (
                      <table className="table table-sm table-bordered">
                        <thead>
                          <tr>
                            <th>Key</th>
                            <th>Value</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {newLabel.meta[selectedLang].map((item, idx) => (
                            <React.Fragment key={idx}>
                              {Object.entries(item).map(
                                ([key, value], kidx) => (
                                  <tr key={`${idx}-${kidx}`}>
                                    <td>
                                      <Form.Control
                                        value={key}
                                        onChange={(e) => {
                                          const updated = [
                                            ...newLabel.meta[selectedLang],
                                          ];
                                          const keys = Object.keys(
                                            updated[idx]
                                          );
                                          const vals = Object.values(
                                            updated[idx]
                                          );
                                          delete updated[idx][keys[kidx]];
                                          updated[idx][e.target.value] =
                                            vals[kidx];
                                          setNewLabel({
                                            ...newLabel,
                                            meta: {
                                              ...newLabel.meta,
                                              [selectedLang]: updated,
                                            },
                                          });
                                        }}
                                      />
                                    </td>

                                    <td>
                                      <Form.Control
                                        as="textarea"
                                        rows={2}
                                        value={
                                          typeof value === "object"
                                            ? JSON.stringify(value, null, 2)
                                            : value
                                        }
                                        onChange={(e) => {
                                          const updated = [
                                            ...newLabel.meta[selectedLang],
                                          ];
                                          try {
                                            updated[idx][key] = JSON.parse(
                                              e.target.value
                                            );
                                          } catch {
                                            updated[idx][key] = e.target.value;
                                          }
                                          setNewLabel({
                                            ...newLabel,
                                            meta: {
                                              ...newLabel.meta,
                                              [selectedLang]: updated,
                                            },
                                          });
                                        }}
                                      />
                                    </td>

                                    <td>
                                      <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() => {
                                          const updated = [
                                            ...newLabel.meta[selectedLang],
                                          ];
                                          const newItem = { ...updated[idx] };
                                          delete newItem[key];
                                          updated[idx] = newItem;
                                          setNewLabel({
                                            ...newLabel,
                                            meta: {
                                              ...newLabel.meta,
                                              [selectedLang]: updated,
                                            },
                                          });
                                        }}
                                      >
                                        Remove Field
                                      </Button>
                                    </td>
                                  </tr>
                                )
                              )}
                              <tr>
                                <td colSpan={3}>
                                  <Button
                                    size="sm"
                                    variant="success"
                                    onClick={() => {
                                      const updated = [
                                        ...newLabel.meta[selectedLang],
                                      ];
                                      updated[idx] = {
                                        ...updated[idx],
                                        newKey: "",
                                      };
                                      setNewLabel({
                                        ...newLabel,
                                        meta: {
                                          ...newLabel.meta,
                                          [selectedLang]: updated,
                                        },
                                      });
                                    }}
                                  >
                                    + Add Field
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="danger"
                                    className="ms-2"
                                    onClick={() => {
                                      const updated = newLabel.meta[
                                        selectedLang
                                      ].filter((_, i) => i !== idx);
                                      setNewLabel({
                                        ...newLabel,
                                        meta: {
                                          ...newLabel.meta,
                                          [selectedLang]: updated,
                                        },
                                      });
                                    }}
                                  >
                                    Remove Item
                                  </Button>
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-muted">
                        No meta items yet for {selectedLang.toUpperCase()}.
                      </p>
                    )}

                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => {
                        const existing = newLabel.meta?.[selectedLang] || [];
                        const updated = [...existing, {}];
                        setNewLabel({
                          ...newLabel,
                          meta: { ...newLabel.meta, [selectedLang]: updated },
                        });
                      }}
                    >
                      + Add Meta Item ({selectedLang.toUpperCase()})
                    </Button>
                  </>
                );
              })()}
            </Form>
          </Modal.Body>

          {/* ---------- FOOTER ---------- */}
          <Modal.Footer>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={async () => {
                try {
                  await createItem("labels", newLabel, token);
                  SuccessApiToast("Label created successfully!");
                  setShowAddModal(false);
                  setNewLabel({
                    namespace: "",
                    key: "",
                    link: "",
                    icon: "",
                    order_idx: 0,
                    value: { en: "" },
                    description: { en: "" },
                    meta: { en: [] },
                  });
                  fetchItems();
                } catch (err) {
                  ErrorApiAlert("Error creating label", err);
                }
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ---------------------- ADD SECTION MODAL ---------------------- */}
        {/* ---------------------- ADD SECTION MODAL ---------------------- */}
        {/* <Modal show={showAddSectionModal} onHide={() => setShowAddSectionModal(false)} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Add New Section</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-2">
        <Form.Label>Page ID</Form.Label>
        <Form.Control 
          name="pageId" 
          value={newSection.pageId} 
          disabled
    readOnly
          placeholder="Linked Page ID" 
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Section Key</Form.Label>
        <Form.Control 
          name="sectionKey" 
          value={newSection.sectionKey} 
          onChange={(e) => setNewSection({ ...newSection, sectionKey: e.target.value })} 
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Title</Form.Label>
        <Form.Control 
          name="title" 
          value={newSection.title} 
          onChange={(e) => setNewSection({ ...newSection, title: e.target.value })} 
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Description</Form.Label>
        <Form.Control 
          name="description" 
          value={newSection.description} 
          onChange={(e) => setNewSection({ ...newSection, description: e.target.value })} 
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Lang</Form.Label>
        <Form.Control 
          name="lang" 
          value={newSection.lang} 
          onChange={(e) => setNewSection({ ...newSection, lang: e.target.value })} 
        />
      </Form.Group>

      <Form.Group className="mb-2">
  <Form.Label>Order Index</Form.Label>
  <Form.Control
    type="number"
    min="0"
    value={newSection.order_idx ?? 0}
    onChange={(e) =>
      setNewLabel({
        ...newSection,
        order_idx: Number(e.target.value) || 0, // Ensures numeric type
      })
    }
  />
</Form.Group>


      <Form.Group className="mb-2">
        <Form.Label>Content (JSON)</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3} 
          value={JSON.stringify(newSection.content, null, 2)} 
          onChange={(e) => {
            try {
              setNewSection({ ...newSection, content: JSON.parse(e.target.value) });
            } catch {}
          }} 
        />
      </Form.Group>
      <h6 className="mt-3">Items</h6>
<table className="table table-sm table-bordered">
  <thead>
    <tr>
      <th>Key</th>
      <th>Value</th>
      <th>Actions</th>
    </tr>
  </thead>
    <tbody className="bg-white">
    {(newSection.items || []).map((item, idx) => (
      <tr key={idx}>
        <td colSpan={3}>
          <table className="table table-sm mb-0">
              <tbody className="bg-white">
              {Object.entries(item).map(([key, value], kidx) => (
                <tr key={kidx}>
                  <td style={{ width: "30%" }}>
                    <Form.Control
                      value={key}
                      onChange={(e) => {
                        const updated = [...newSection.items];
                        const keys = Object.keys(updated[idx]);
                        const vals = Object.values(updated[idx]);
                        // rename key
                        delete updated[idx][keys[kidx]];
                        updated[idx][e.target.value] = vals[kidx];
                        setNewSection({ ...newSection, items: updated });
                      }}
                    />
                  </td>
                  <td>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={
                        typeof value === "object"
                          ? JSON.stringify(value, null, 2)
                          : value
                      }
                      onChange={(e) => {
                        const updated = [...newSection.items];
                        try {
                          updated[idx][key] = JSON.parse(e.target.value);
                        } catch {
                          updated[idx][key] = e.target.value;
                        }
                        setNewSection({ ...newSection, items: updated });
                      }}
                    />
                  </td>
                  <td style={{ width: "15%" }}>
                   <Button
  size="sm"
  variant="danger"
  onClick={() => {
    const updated = [...newSection.items];
    const newItem = { ...updated[idx] }; // clone the item
    delete newItem[key]; // remove only this field
    updated[idx] = newItem; // put updated item back
    setNewSection({ ...newSection, items: updated });
  }}
>
  Remove Field
</Button>

                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={3}>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => {
                      const updated = [...(newSection.items || [])];
                      updated[idx] = {
                        ...updated[idx],
                        ["newKey"]: ""
                      };
                      setNewSection({ ...newSection, items: updated });
                    }}
                  >
                    + Add Field
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="ms-2"
                    onClick={() => {
                      const updated = (newSection.items || []).filter(
                        (_, i) => i !== idx
                      );
                      setNewSection({ ...newSection, items: updated });
                    }}
                  >
                    Remove Item
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    ))}
  </tbody>
</table>

<Button
  size="sm"
  variant="success"
  onClick={() =>
    setNewSection({
      ...newSection,
      items: [...(newSection.items || []), {}]
    })
  }
>
  + Add Item
</Button>

{/* 
      <h6 className="mt-3">Items</h6>
      <table className="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Title</th><th>Description</th><th>Image</th><th>Badge</th><th>Price</th><th>Sub</th><th>Actions</th>
          </tr>
        </thead>
          <tbody className="bg-white">
          {newSection.items.map((it, idx) => (
            <tr key={idx}>
              <td><Form.Control value={it.title} onChange={(e) => {
                const updated = [...newSection.items]; updated[idx].title = e.target.value;
                setNewSection({ ...newSection, items: updated });
              }} /></td>
              <td><Form.Control value={it.desc} onChange={(e) => {
                const updated = [...newSection.items]; updated[idx].desc = e.target.value;
                setNewSection({ ...newSection, items: updated });
              }} /></td>
              <td><Form.Control value={it.img} onChange={(e) => {
                const updated = [...newSection.items]; updated[idx].img = e.target.value;
                setNewSection({ ...newSection, items: updated });
              }} /></td>
              <td><Form.Control value={it.badge} onChange={(e) => {
                const updated = [...newSection.items]; updated[idx].badge = e.target.value;
                setNewSection({ ...newSection, items: updated });
              }} /></td>
              <td><Form.Control value={it.price} onChange={(e) => {
                const updated = [...newSection.items]; updated[idx].price = e.target.value;
                setNewSection({ ...newSection, items: updated });
              }} /></td>
               <td><Form.Control value={it.sub} onChange={(e) => {
                const updated = [...newSection.items]; updated[idx].sub = e.target.value;
                setNewSection({ ...newSection, items: updated });
              }} /></td>
              <td>
                <Button 
                  size="sm" 
                  variant="danger" 
                  onClick={() => {
                    const updated = newSection.items.filter((_, i) => i !== idx);
                    setNewSection({ ...newSection, items: updated });
                  }}
                >Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button 
        size="sm" 
        variant="success" 
        onClick={() => setNewSection({ ...newSection, items: [...newSection.items, { title: '', desc: '', img: '', badge: '', price: '' }] })}
      >
        + Add Item
      </Button> 
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" size="sm" onClick={() => setShowAddSectionModal(false)}>Cancel</Button>
    <Button 
      variant="primary" 
      size="sm" 
      onClick={async () => {
        try {
          await createPageSection(newSection, token);
          SuccessApiToast('Section created successfully!');
          setShowAddSectionModal(false);
          setNewSection({ pageId: "", sectionKey: "", title: "", description: "", content: {}, items: [], status: "draft" });
          if (selectedPage?.slug) fetchPageDetails(selectedPage.slug);
        } catch (err) {
          ErrorApiAlert('Error creating section', err);
        }
      }}
    >
      Save
    </Button>
  </Modal.Footer>
</Modal> */}

        <Modal
          show={showAddPageModal}
          onHide={() => setShowAddPageModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Page</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  value={newPage.slug}
                  onChange={(e) =>
                    setNewPage({ ...newPage, slug: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Language</Form.Label>
                <Form.Control
                  value={newPage.lang}
                  onChange={(e) =>
                    setNewPage({ ...newPage, lang: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={newPage.title}
                  onChange={(e) =>
                    setNewPage({ ...newPage, title: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Body HTML</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newPage.body_html}
                  onChange={(e) =>
                    setNewPage({ ...newPage, body_html: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Intro Content Block</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder='{"intro": "<p>We are a global company</p>"}'
                  value={JSON.stringify(newPage.content_blocks, null, 2)}
                  onChange={(e) => {
                    try {
                      setNewPage({
                        ...newPage,
                        content_blocks: JSON.parse(e.target.value),
                      });
                    } catch {}
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Meta Info</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder='{"title": "Home Page | Escapra", "description": "Learn more about Escapra", "canonical": "https://staging.escapra.com/"}'
                  value={JSON.stringify(newPage.meta, null, 2)}
                  onChange={(e) => {
                    try {
                      setNewPage({
                        ...newPage,
                        meta: JSON.parse(e.target.value),
                      });
                    } catch {}
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Tags (comma separated)</Form.Label>
                <Form.Control
                  placeholder="corporate, about"
                  value={newPage.tags.join(", ")}
                  onChange={(e) =>
                    setNewPage({
                      ...newPage,
                      tags: e.target.value.split(",").map((t) => t.trim()),
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowAddPageModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={async () => {
                try {
                  await createPage(newPage, token);
                  SuccessApiToast("Page created successfully!");
                  setShowAddPageModal(false);
                  fetchItems();
                } catch (err) {
                  ErrorApiAlert("Error creating page", err);
                }
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showAddSectionModal}
          onHide={() => setShowAddSectionModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Section</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* ---------- Basic Info ---------- */}
              {/* ---------- Page Selector (instead of just ID) ---------- */}
              <Form.Group className="mb-2">
                <Form.Label>Page</Form.Label>
                <Form.Select
                  value={newSection.pageId || selectedPage?.id || ""}
                  onChange={(e) =>
                    setNewSection({ ...newSection, pageId: e.target.value })
                  }
                >
                  <option value="">Select Page</option>
                  {pages?.map((page) => (
                    <option key={page.id} value={page.id}>
                      {page.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Section Key</Form.Label>
                <Form.Control
                  value={newSection.sectionKey}
                  onChange={(e) =>
                    setNewSection({ ...newSection, sectionKey: e.target.value })
                  }
                />
              </Form.Group>

              {/* ✅ Component Type Selector */}
              <Form.Group className="mb-2">
                <Form.Label>Component Type</Form.Label>
                <Form.Select
                  value={newSection.componentType || ""}
                  onChange={(e) =>
                    setNewSection({
                      ...newSection,
                      componentType: e.target.value,
                    })
                  }
                >
                  <option value="">Select Component Type</option>

                  {/* Static / Content-Only Pages */}
                  <option value="faqs">FAQs</option>

                  <option value="contents">
                    Contents (About Us, Privacy Policy, Terms & Conditions)
                  </option>

                  {/* Dynamic Section Components (matching your sectionComponents.js) */}
                  <option value="home_starting_points">
                    Home Starting Points
                  </option>
                  <option value="home_discounts_flights">
                    Home Discounts - Flights
                  </option>
                  <option value="home_discounts_hotels">
                    Home Discounts - Hotels
                  </option>
                  <option value="home_explore_destinations">
                    Home Explore Destinations
                  </option>
                  <option value="home_explore_activities">
                    Home Explore Activities
                  </option>
                  <option value="home_airlines">
                    Home Airlines / Feature Partner
                  </option>
                  <option value="home_umrah_deals">Home Umrah Deals</option>
                  <option value="get_our_app_section">Get Our App</option>
                  <option value="destination_main">Destination Main</option>
                </Form.Select>
              </Form.Group>

              {/* ---------- Upload Section Images ---------- */}
              {/* ---------- Upload Section Images ---------- */}

              {/* ---------- Upload Section Images ---------- */}
              <Form.Group className="mb-3">
                <Form.Label>Upload Section Images</Form.Label>

                <Form.Control
                  type="file"
                  className="static_ImagesUploader"
                  multiple
                  accept="image/*"
                  onChange={async (e) => {
                    const files = Array.from(e.target.files);
                    const uploadedUrls = [];

                    for (const file of files) {
                      const url = await uploadImageToS3(file, token);
                      uploadedUrls.push(url);
                    }

                    setNewSection((prev) => ({
                      ...prev,
                      images: [...(prev.images || []), ...uploadedUrls],
                    }));
                  }}
                />

                {/* Preview Image List */}
                {Array.isArray(newSection.images) &&
                  newSection.images.length > 0 && (
                    <div className="mt-2 d-flex flex-wrap gap-2">
                      {newSection.images.map((url, idx) => (
                        <div
                          key={idx}
                          className="position-relative border rounded p-1"
                          style={{ width: 80, height: 80 }}
                        >
                          <button
                            type="button"
                            className="btn-close position-absolute top-0 end-0"
                            onClick={() => {
                              const filtered = newSection.images.filter(
                                (_, i) => i !== idx
                              );
                              setNewSection((prev) => ({
                                ...prev,
                                images: filtered,
                              }));
                            }}
                          />

                          <img
                            src={url}
                            className="img-fluid rounded"
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
              </Form.Group>

              {/* ---------- Multilingual Language Tabs ---------- */}
              {(() => {
                const existingLangs = Object.keys(newSection.title || {});
                if (existingLangs.length === 0) existingLangs.push("en");

                return (
                  <>
                    <div className="mb-3 d-flex align-items-center flex-wrap">
                      <strong className="me-2">Languages:</strong>
                      {existingLangs.map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          className={`btn btn-sm me-1 mb-1 ${
                            selectedLang === lang
                              ? "btn-primary"
                              : "btn-outline-secondary"
                          }`}
                          onClick={() => setSelectedLang(lang)}
                        >
                          {lang.toUpperCase()}
                        </button>
                      ))}

                      {/* Add new language */}
                      <div className="d-flex align-items-center ms-2">
                        <Form.Control
                          size="sm"
                          placeholder="Add new lang (e.g. fr)"
                          value={newLang || ""}
                          onChange={(e) =>
                            setNewLang(e.target.value.trim().toLowerCase())
                          }
                          style={{ width: "140px" }}
                        />
                        <Button
                          size="sm"
                          className="ms-2"
                          onClick={() => {
                            if (newLang && !existingLangs.includes(newLang)) {
                              setNewSection((prev) => ({
                                ...prev,
                                title: { ...prev.title, [newLang]: "" },
                                description: {
                                  ...prev.description,
                                  [newLang]: "",
                                },
                                content: { ...prev.content, [newLang]: {} },
                                items: { ...prev.items, [newLang]: [] },
                              }));
                              setSelectedLang(newLang);
                              setNewLang("");
                            }
                          }}
                        >
                          + Add
                        </Button>
                      </div>
                    </div>

                    {/* ---------- Title & Description ---------- */}
                    <Form.Group className="mb-2">
                      <Form.Label>
                        Title ({selectedLang.toUpperCase()})
                      </Form.Label>
                      <Form.Control
                        value={newSection.title?.[selectedLang] || ""}
                        onChange={(e) =>
                          setNewSection((prev) => ({
                            ...prev,
                            title: {
                              ...prev.title,
                              [selectedLang]: e.target.value,
                            },
                          }))
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label>
                        Description ({selectedLang.toUpperCase()})
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={newSection.description?.[selectedLang] || ""}
                        onChange={(e) =>
                          setNewSection((prev) => ({
                            ...prev,
                            description: {
                              ...prev.description,
                              [selectedLang]: e.target.value,
                            },
                          }))
                        }
                      />
                    </Form.Group>

                    {/* ---------- Dynamic Content Based on Component Type ---------- */}
                    {(() => {
                      // 🟢 CASE 1: Word-style editor for Policy/About pages
                      if (["contents"].includes(newSection.componentType)) {
                        return (
                          <div className="mb-3">
                            <Form.Label>
                              Content ({selectedLang.toUpperCase()})
                            </Form.Label>

                            <DefaultEditor
                              value={newSection.content?.[selectedLang] || ""}
                              onChange={(e) =>
                                setNewSection((prev) => ({
                                  ...prev,
                                  content: {
                                    ...prev.content,
                                    [selectedLang]: e.target.value,
                                  },
                                }))
                              }
                              style={{
                                minHeight: "250px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                padding: "10px",
                                backgroundColor: "#fff",
                              }}
                            />
                          </div>
                        );
                      }

                      // 🟢 CASE 2: FAQ structure (Question + Answer)
                      if (newSection.componentType === "faqs") {
                        const faqs = newSection.items?.[selectedLang] || [];
                        return (
                          <div className="mt-3">
                            <h6>FAQs ({selectedLang.toUpperCase()})</h6>
                            {faqs.map((faq, idx) => (
                              <div
                                key={idx}
                                className="border rounded p-2 mb-2 bg-light"
                              >
                                <Form.Group className="mb-2">
                                  <Form.Label>Question</Form.Label>
                                  <Form.Control
                                    value={faq.question || ""}
                                    onChange={(e) => {
                                      const updated = [...faqs];
                                      updated[idx].question = e.target.value;
                                      setNewSection({
                                        ...newSection,
                                        items: {
                                          ...newSection.items,
                                          [selectedLang]: updated,
                                        },
                                      });
                                    }}
                                  />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                  <Form.Label>Answer</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={faq.answer || ""}
                                    onChange={(e) => {
                                      const updated = [...faqs];
                                      updated[idx].answer = e.target.value;
                                      setNewSection({
                                        ...newSection,
                                        items: {
                                          ...newSection.items,
                                          [selectedLang]: updated,
                                        },
                                      });
                                    }}
                                  />
                                </Form.Group>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => {
                                    const updated = faqs.filter(
                                      (_, i) => i !== idx
                                    );
                                    setNewSection({
                                      ...newSection,
                                      items: {
                                        ...newSection.items,
                                        [selectedLang]: updated,
                                      },
                                    });
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => {
                                const updated = [
                                  ...(newSection.items?.[selectedLang] || []),
                                  { question: "", answer: "" },
                                ];
                                setNewSection({
                                  ...newSection,
                                  items: {
                                    ...newSection.items,
                                    [selectedLang]: updated,
                                  },
                                });
                              }}
                            >
                              + Add FAQ
                            </Button>
                          </div>
                        );
                      }

                      // 🟢 CASE 3: Default (restore full multilingual + dynamic key-value items)
                      return (
                        <>
                          <Form.Group className="mb-2">
                            <Form.Label>
                              Content ({selectedLang.toUpperCase()})
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={
                                newSection.content?.[selectedLang]
                                  ? JSON.stringify(
                                      newSection.content[selectedLang],
                                      null,
                                      2
                                    )
                                  : "{}"
                              }
                              onChange={(e) => {
                                try {
                                  const parsed = JSON.parse(e.target.value);
                                  setNewSection((prev) => ({
                                    ...prev,
                                    content: {
                                      ...prev.content,
                                      [selectedLang]: parsed,
                                    },
                                  }));
                                } catch {
                                  // ignore invalid JSON
                                }
                              }}
                            />
                          </Form.Group>

                          {/* ✅ Original Items Flow Restored */}
                          <h6 className="mt-3">
                            Items ({selectedLang.toUpperCase()})
                          </h6>
                          {Array.isArray(newSection.items?.[selectedLang]) &&
                          newSection.items[selectedLang].length > 0 ? (
                            <table className="table table-sm table-bordered">
                              <thead>
                                <tr>
                                  <th>Key</th>
                                  <th>Value</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {newSection.items[selectedLang].map(
                                  (item, idx) => (
                                    <tr key={idx}>
                                      <td colSpan={3}>
                                        <table className="table table-sm mb-0">
                                          <tbody className="bg-white">
                                            {Object.entries(item).map(
                                              ([key, value], kidx) => (
                                                <tr key={kidx}>
                                                  <td style={{ width: "30%" }}>
                                                    <Form.Control
                                                      value={key}
                                                      onChange={(e) => {
                                                        const updated = [
                                                          ...newSection.items[
                                                            selectedLang
                                                          ],
                                                        ];
                                                        const keys =
                                                          Object.keys(
                                                            updated[idx]
                                                          );
                                                        const vals =
                                                          Object.values(
                                                            updated[idx]
                                                          );
                                                        delete updated[idx][
                                                          keys[kidx]
                                                        ];
                                                        updated[idx][
                                                          e.target.value
                                                        ] = vals[kidx];
                                                        setNewSection({
                                                          ...newSection,
                                                          items: {
                                                            ...newSection.items,
                                                            [selectedLang]:
                                                              updated,
                                                          },
                                                        });
                                                      }}
                                                    />
                                                  </td>

                                                  <td>
                                                    {[
                                                      "image",
                                                      "img",
                                                      "photo",
                                                      "thumbnail",
                                                    ].includes(
                                                      key.toLowerCase()
                                                    ) ? (
                                                      <>
                                                        <Form.Control
                                                          type="file"
                                                          className="static_ImagesUploader"
                                                          accept="image/*"
                                                          onChange={async (
                                                            e
                                                          ) => {
                                                            const file =
                                                              e.target.files[0];
                                                            if (!file) return;
                                                            try {
                                                              const imageUrl =
                                                                await uploadImageToS3(
                                                                  file,
                                                                  token
                                                                );
                                                              const updated = [
                                                                ...newSection
                                                                  .items[
                                                                  selectedLang
                                                                ],
                                                              ];
                                                              updated[idx][
                                                                key
                                                              ] = imageUrl;
                                                              setNewSection({
                                                                ...newSection,
                                                                items: {
                                                                  ...newSection.items,
                                                                  [selectedLang]:
                                                                    updated,
                                                                },
                                                              });
                                                              SuccessApiToast(
                                                                "Image uploaded successfully!"
                                                              );
                                                            } catch (err) {
                                                              ErrorApiAlert(
                                                                "Image upload failed",
                                                                err
                                                              );
                                                            }
                                                          }}
                                                        />
                                                        {value &&
                                                          value.startsWith(
                                                            "http"
                                                          ) && (
                                                            <img
                                                              src={value}
                                                              alt="Preview"
                                                              style={{
                                                                width: "100px",
                                                                marginTop:
                                                                  "5px",
                                                                borderRadius:
                                                                  "5px",
                                                              }}
                                                            />
                                                          )}
                                                      </>
                                                    ) : (
                                                      <Form.Control
                                                        as="textarea"
                                                        rows={2}
                                                        value={
                                                          typeof value ===
                                                          "object"
                                                            ? JSON.stringify(
                                                                value,
                                                                null,
                                                                2
                                                              )
                                                            : value
                                                        }
                                                        onChange={(e) => {
                                                          const updated = [
                                                            ...newSection.items[
                                                              selectedLang
                                                            ],
                                                          ];
                                                          try {
                                                            updated[idx][key] =
                                                              JSON.parse(
                                                                e.target.value
                                                              );
                                                          } catch {
                                                            updated[idx][key] =
                                                              e.target.value;
                                                          }
                                                          setNewSection({
                                                            ...newSection,
                                                            items: {
                                                              ...newSection.items,
                                                              [selectedLang]:
                                                                updated,
                                                            },
                                                          });
                                                        }}
                                                      />
                                                    )}
                                                  </td>

                                                  <td style={{ width: "15%" }}>
                                                    <Button
                                                      size="sm"
                                                      variant="danger"
                                                      onClick={() => {
                                                        const updated = [
                                                          ...newSection.items[
                                                            selectedLang
                                                          ],
                                                        ];
                                                        const newItem = {
                                                          ...updated[idx],
                                                        };
                                                        delete newItem[key];
                                                        updated[idx] = newItem;
                                                        setNewSection({
                                                          ...newSection,
                                                          items: {
                                                            ...newSection.items,
                                                            [selectedLang]:
                                                              updated,
                                                          },
                                                        });
                                                      }}
                                                    >
                                                      Remove Field
                                                    </Button>
                                                  </td>
                                                </tr>
                                              )
                                            )}

                                            <tr>
                                              <td colSpan={3}>
                                                <Button
                                                  size="sm"
                                                  variant="success"
                                                  onClick={() => {
                                                    const updated = [
                                                      ...newSection.items[
                                                        selectedLang
                                                      ],
                                                    ];
                                                    updated[idx] = {
                                                      ...updated[idx],
                                                      newKey: "",
                                                    };
                                                    setNewSection({
                                                      ...newSection,
                                                      items: {
                                                        ...newSection.items,
                                                        [selectedLang]: updated,
                                                      },
                                                    });
                                                  }}
                                                >
                                                  + Add Field
                                                </Button>
                                                <Button
                                                  size="sm"
                                                  variant="danger"
                                                  className="ms-2"
                                                  onClick={() => {
                                                    const updated =
                                                      newSection.items[
                                                        selectedLang
                                                      ].filter(
                                                        (_, i) => i !== idx
                                                      );
                                                    setNewSection({
                                                      ...newSection,
                                                      items: {
                                                        ...newSection.items,
                                                        [selectedLang]: updated,
                                                      },
                                                    });
                                                  }}
                                                >
                                                  Remove Item
                                                </Button>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          ) : (
                            <p className="text-muted">
                              No items yet for {selectedLang.toUpperCase()}.
                            </p>
                          )}

                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => {
                              const existing =
                                newSection.items?.[selectedLang] || [];
                              const updated = [...existing, {}];
                              setNewSection({
                                ...newSection,
                                items: {
                                  ...newSection.items,
                                  [selectedLang]: updated,
                                },
                              });
                            }}
                          >
                            + Add Item ({selectedLang.toUpperCase()})
                          </Button>
                        </>
                      );
                    })()}
                  </>
                );
              })()}

              {/* ---------- Order Index ---------- */}
              <Form.Group className="mb-2 mt-3">
                <Form.Label>Display Order (order_idx)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={newSection.order_idx ?? 0}
                  onChange={(e) =>
                    setNewSection({
                      ...newSection,
                      order_idx: Number(e.target.value) || 0,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowAddSectionModal(false)}
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={async () => {
                try {
                  await createPageSection(newSection, token);
                  SuccessApiToast("Section created successfully!");
                  setShowAddSectionModal(false);

                  // Reset new section
                  setNewSection({
                    pageId: "",
                    sectionKey: "",
                    title: "",
                    description: "",
                    componentType: "",
                    order_idx: 0,
                    images: [],
                    content: {},
                    items: {},
                    status: "draft",
                  });

                  if (selectedPage?.slug) fetchPageDetails(selectedPage.slug);
                } catch (err) {
                  ErrorApiAlert("Error creating section", err);
                }
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ---------------------- ADD PAGE MODAL ---------------------- */}
        <Modal
          show={showAddPageModal}
          onHide={() => setShowAddPageModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Page</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* Slug */}
              <Form.Group className="mb-2">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  value={newPage.slug}
                  onChange={(e) =>
                    setNewPage({ ...newPage, slug: e.target.value })
                  }
                />
              </Form.Group>

              {/* Language */}
              <Form.Group className="mb-2">
                <Form.Label>Language</Form.Label>
                <Form.Control
                  value={newPage.lang}
                  onChange={(e) =>
                    setNewPage({ ...newPage, lang: e.target.value })
                  }
                />
              </Form.Group>

              {/* Title */}
              <Form.Group className="mb-2">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={newPage.title}
                  onChange={(e) =>
                    setNewPage({ ...newPage, title: e.target.value })
                  }
                />
              </Form.Group>

              {/* Body HTML */}
              <Form.Group className="mb-2">
                <Form.Label>Body HTML</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={newPage.body_html}
                  onChange={(e) =>
                    setNewPage({ ...newPage, body_html: e.target.value })
                  }
                />
              </Form.Group>

              {/* Content Blocks (JSON editor) */}
              <Form.Group className="mb-2">
                <Form.Label>Content Blocks (JSON)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={JSON.stringify(newPage.content_blocks, null, 2)}
                  onChange={(e) => {
                    try {
                      setNewPage({
                        ...newPage,
                        content_blocks: JSON.parse(e.target.value),
                      });
                    } catch {}
                  }}
                />
              </Form.Group>

              {/* Meta Info */}
              <h6 className="mt-3">SEO Meta</h6>
              <Form.Group className="mb-2">
                <Form.Label>Meta Title</Form.Label>
                <Form.Control
                  value={newPage.meta?.title || ""}
                  onChange={(e) =>
                    setNewPage({
                      ...newPage,
                      meta: { ...newPage.meta, title: e.target.value },
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Meta Description</Form.Label>
                <Form.Control
                  value={newPage.meta?.description || ""}
                  onChange={(e) =>
                    setNewPage({
                      ...newPage,
                      meta: { ...newPage.meta, description: e.target.value },
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Canonical URL</Form.Label>
                <Form.Control
                  value={newPage.meta?.canonical || ""}
                  onChange={(e) =>
                    setNewPage({
                      ...newPage,
                      meta: { ...newPage.meta, canonical: e.target.value },
                    })
                  }
                />
              </Form.Group>

              {/* Tags */}
              <Form.Group className="mb-2">
                <Form.Label>Tags (comma separated)</Form.Label>
                <Form.Control
                  value={newPage.tags?.join(", ") || ""}
                  onChange={(e) =>
                    setNewPage({
                      ...newPage,
                      tags: e.target.value.split(",").map((t) => t.trim()),
                    })
                  }
                />
              </Form.Group>

              {/* Status */}
              {/* <Form.Group className="mb-2">
        <Form.Label>Status</Form.Label>
        <select
          className="form-select"
          value={newPage.status}
          onChange={(e) => setNewPage({ ...newPage, status: e.target.value })}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </Form.Group> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowAddPageModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={async () => {
                try {
                  await createPage(newPage, token);
                  SuccessApiToast("Page created successfully!");
                  setShowAddPageModal(false);
                  setNewPage({
                    slug: "",
                    lang: "en",
                    title: "",
                    body_html: "",
                    content_blocks: {},
                    meta: { title: "", description: "", canonical: "" },
                    tags: [],
                    status: "draft",
                  });
                  fetchItems();
                } catch (err) {
                  ErrorApiAlert("Error creating page", err);
                }
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showViewPageModal}
          onHide={() => setShowViewPageModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>View Page Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Slug</Form.Label>
                <Form.Control value={pageDetails.slug || ""} readOnly />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Language</Form.Label>
                <Form.Control value={pageDetails.lang || ""} readOnly />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Title</Form.Label>
                <Form.Control value={pageDetails.title || ""} readOnly />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Body HTML</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={pageDetails.body_html || ""}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Content Blocks (JSON)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={JSON.stringify(
                    pageDetails.content_blocks || {},
                    null,
                    2
                  )}
                  readOnly
                />
              </Form.Group>
              <h6 className="mt-3">SEO Meta</h6>
              <Form.Group className="mb-2">
                <Form.Label>Meta Title</Form.Label>
                <Form.Control value={pageDetails.meta?.title || ""} readOnly />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Meta Description</Form.Label>
                <Form.Control
                  value={pageDetails.meta?.description || ""}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Canonical URL</Form.Label>
                <Form.Control
                  value={pageDetails.meta?.canonical || ""}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  value={pageDetails.tags?.join(", ") || ""}
                  readOnly
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowViewPageModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showEditPageModal}
          onHide={() => setShowEditPageModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Page Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  name="slug"
                  value={editPageData.slug || ""}
                  onChange={handleEditPageChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Language</Form.Label>
                <Form.Control
                  name="lang"
                  value={editPageData.lang || ""}
                  onChange={handleEditPageChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  value={editPageData.title || ""}
                  onChange={handleEditPageChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Body HTML</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="body_html"
                  value={editPageData.body_html || ""}
                  onChange={handleEditPageChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Content Blocks (JSON)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="content_blocks"
                  value={JSON.stringify(
                    editPageData.content_blocks || {},
                    null,
                    2
                  )}
                  onChange={(e) => {
                    try {
                      setEditPageData({
                        ...editPageData,
                        content_blocks: JSON.parse(e.target.value),
                      });
                    } catch {}
                  }}
                />
              </Form.Group>
              <h6 className="mt-3">SEO Meta</h6>
              <Form.Group className="mb-2">
                <Form.Label>Meta Title</Form.Label>
                <Form.Control
                  name="meta_title"
                  value={editPageData.meta?.title || ""}
                  onChange={(e) =>
                    setEditPageData({
                      ...editPageData,
                      meta: { ...editPageData.meta, title: e.target.value },
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Meta Description</Form.Label>
                <Form.Control
                  name="meta_description"
                  value={editPageData.meta?.description || ""}
                  onChange={(e) =>
                    setEditPageData({
                      ...editPageData,
                      meta: {
                        ...editPageData.meta,
                        description: e.target.value,
                      },
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Canonical URL</Form.Label>
                <Form.Control
                  name="meta_canonical"
                  value={editPageData.meta?.canonical || ""}
                  onChange={(e) =>
                    setEditPageData({
                      ...editPageData,
                      meta: { ...editPageData.meta, canonical: e.target.value },
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Tags (comma separated)</Form.Label>
                <Form.Control
                  name="tags"
                  value={editPageData.tags?.join(", ") || ""}
                  onChange={(e) =>
                    setEditPageData({
                      ...editPageData,
                      tags: e.target.value.split(",").map((t) => t.trim()),
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowEditPageModal(false)}
            >
              Cancel
            </Button>
            <Button variant="success" size="sm" onClick={handleSaveEditPage}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default StaticContentManagement;
