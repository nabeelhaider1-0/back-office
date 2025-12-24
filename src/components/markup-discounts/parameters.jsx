import React, { useState, useEffect, useCallback } from "react";
import Constants from "../../constants/routes";
import Header2 from "../header2/header2";
import {
  ErrorApiAlert,
  RequiredFieldAlert,
  SimpleAlert,
  SuccessApiToast,
} from "../../constants/functions";
import { postData } from "../../Apis/MarkupApis";
import Swal from "sweetalert2"; // Import SweetAlert2

const ParameterManagement = () => {
  // State for managing parameters list with pagination and search
  const [parameters, setParameters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // State for form data (add/edit)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    priority: 0,
    type: "string",
    options: "",
    description: "",
    isActive: true,
    productType: "Flights",
  });

  // State for form visibility
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch parameters from API with search and pagination
  const fetchParameters = useCallback(
    async (page = 1, search = "") => {
      setIsLoading(true);
      try {
        const response = await postData({
          url: `/api/markup-discounts/parameters?page=${page}&limit=${pageSize}&search=${search}`,
          method: "GET",
        });

        if (response.success) {
          setParameters(response.data.data);
          setTotalPages(
            response.data.meta.totalPages > 0
              ? response.data.meta.totalPages
              : 1
          );
          setCurrentPage(response.data.meta.page);
        } else {
          throw new Error("Failed to fetch parameters");
        }
      } catch (error) {
        console.error("Error fetching parameters:", error);
        // ErrorApiAlert("Failed to fetch parameters");
      } finally {
        setIsLoading(false);
      }
    },
    [pageSize, setParameters, setTotalPages, setCurrentPage, setIsLoading]
  );

  // Initial fetch on component mount
  useEffect(() => {
    fetchParameters();
  }, [fetchParameters]);

  // Fetch when page, search query, or page size changes
  useEffect(() => {
    fetchParameters(currentPage, searchQuery);
  }, [currentPage, searchQuery, pageSize, fetchParameters]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle form input changes
  const handleChange = (key, value) => {
    if (key === "priority") {
      // Ensure priority is a number
      const numericValue = value.replace(/\D/g, ""); // Remove non-digit characters
      setFormData({ ...formData, [key]: numericValue });
      return;
    }
    setFormData({ ...formData, [key]: value });
  };

  // Handle checkbox change for "Is Active"
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData({ ...formData, isActive: checked });
  };

  // Add a new parameter
  const addParameter = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.productType) {
      RequiredFieldAlert(
        "All fields are required",
        "Please fill in all required fields",
        "error"
      );
      return;
    }

    try {
      const response = await postData({
        url: "/api/markup-discounts/parameters",
        method: "POST",

        data: {
          name: formData.name,
          priority: parseInt(formData.priority),
          type: formData.type,
          options: formData.options,
          description: formData.description,
          isActive: formData.isActive,
          productType: formData.productType,
        },
      });

      if (response.success) {
        SuccessApiToast("Parameter added successfully!");
        fetchParameters(1, searchQuery); // Refresh the list
        resetForm();
      }
    } catch (error) {
      ErrorApiAlert("Failed to add parameter");
    }
  };

  // Edit an existing parameter
  const editParameter = (param) => {
    setFormData({
      id: param.uuid,
      name: param.name,
      priority: param.priority.toString(),
      type: param.type,
      options: param.options || "",
      description: param.description,
      isActive: param.isActive,
      productType: param.productType || "Flights",
    });
    setIsFormVisible(true);
  };

  // Update an existing parameter
  const updateParameter = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.productType) {
      RequiredFieldAlert(
        "All fields are required",
        "Please fill in all required fields",
        "error"
      );
      return;
    }

    try {
      const response = await postData({
        url: `/api/markup-discounts/parameters/${formData.id}`,
        method: "PUT",
        data: {
          name: formData.name,
          priority: parseInt(formData.priority),
          type: formData.type,
          options: formData.options,
          description: formData.description,
          isActive: formData.isActive,
          productType: formData.productType,
        },
      });

      if (response.success) {
        SuccessApiToast("Parameter updated successfully!");
        fetchParameters(currentPage, searchQuery); // Refresh the list
        resetForm();
      }
    } catch (error) {
      ErrorApiAlert("Failed to update parameter");
    }
  };

  // Delete a parameter with SweetAlert2 confirmation
  const deleteParameter = async (uuid) => {
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
        try {
          const response = await postData({
            url: `/api/markup-discounts/parameters/${uuid}`,
            method: "DELETE",
          });

          if (response.success) {
            Swal.fire("Deleted!", "Parameter has been deleted.", "success");
            SuccessApiToast("Parameter deleted successfully!");
            fetchParameters(currentPage, searchQuery); // Refresh the list
          }
        } catch (error) {
          ErrorApiAlert("Failed to delete parameter");
        }
      }
    });
  };

  // Reset the form
  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      priority: "",
      type: "string",
      options: "",
      description: "",
      isActive: true,
      productType: "Flights",
    });
    setIsFormVisible(false);
  };

  return (
    <>
      <Header2
        title="PARAMETER MANAGEMENT"
        linkText1="Search Parameters"
        linkText2="Add Parameter"
        link1={Constants.URLConstants.MASTERSMARKUPPROFILESEARCH}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        {/* Add/Edit Parameter Form */}
        {isFormVisible && (
          <form
            name="add_parameter_form"
            id="add_parameter_form"
            onSubmit={formData.id ? updateParameter : addParameter}
          >
            <div className="panel-body removeMargins">
              <div className="form-group row mt-2">
                <div className="form-group col-md-3 ">
                  <label>
                    Parameter Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm  test123"
                    id="txt_parameter_name"
                    name="txt_parameter_name"
                    size={10}
                    maxLength={50}
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-2 mb-2">
                  <label>
                    Priority <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-sm  test123"
                    id="txt_priority"
                    name="txt_priority"
                    min="0"
                    step={1}
                    value={formData.priority}
                    onChange={(e) => handleChange("priority", e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-2 mb-2">
                  <label>
                    Product Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control form-control-sm  test123"
                    id="txt_vertical_product"
                    name="txt_vertical_product"
                    value={formData.productType}
                    onChange={(e) =>
                      handleChange("productType", e.target.value)
                    }
                    required
                  >
                    <option value="Flights">Flights</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Umrah">Umrah</option>
                  </select>
                </div>
                <div className="form-group col-md-2 mb-2">
                  <label>
                    Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control form-control-sm  test123"
                    id="txt_type"
                    name="txt_type"
                    value={formData.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                  >
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="valuerange">Value Range</option>
                    <option value="date">Date</option>
                    <option value="daterange">Date Range</option>
                    <option value="enum">Enum</option>
                    <option value="multiselect">Multi Select</option>
                    <option value="autocomplete">Autocomplete</option>
                  </select>
                </div>
                {(formData.type === "enum" ||
                  formData.type === "multiselect") && (
                  <div className="form-group col-md-3 mb-2">
                    <label>
                      Options (Comma-Separated){" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm  test123"
                      id="txt_options"
                      name="txt_options"
                      placeholder="e.g., Option1, Option2"
                      value={formData.options}
                      onChange={(e) => handleChange("options", e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="form-group col-md-3 mb-2">
                  <label>
                    Description <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm  test123"
                    id="txt_description"
                    name="txt_description"
                    size={10}
                    maxLength={100}
                    value={formData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    required
                    placeholder="Enter parameter description"
                  />
                </div>

                <div className="form-group col-md-2 ">
                  <label>Status</label>
                  <br />
                  <div className="checkbox checkbox-success">
                    <input
                      id="chk_is_active"
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="chk_is_active">Is Active</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group col-md-3">
                <button
                  type="submit"
                  className="btn btn-dark btn-sm me-2"
                  name="save"
                  value="Submit"
                >
                  <i className="fa fa-floppy-o me-1" />
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={resetForm}
                >
                  <i className="fa fa-times me-1" />
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Parameter List Table with Search and Pagination */}
        <div className="row mt-4">
          <div className="form-group col-md-3 mb-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search by name, description, or product..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          {!isFormVisible && (
            <div className="form-group col-md-3">
              <button
                type="button"
                className="btn btn-dark btn-sm"
                onClick={() => setIsFormVisible(true)}
              >
                <i className="fa fa-plus" />
                Add Parameter
              </button>
            </div>
          )}

          {/* Datatable */}
          <table className="table table-bordered  table-responsive">
            <thead>
              <tr>
                <th className="my_td">Parameter Name</th>
                <th className="my_td">Priority</th>
                <th className="my_td">Type</th>
                <th className="my_td">Options</th>
                <th className="my_td">Description</th>
                <th className="my_td">Vertical Product</th>
                <th className="my_td">Status</th>
                <th className="my_td">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white" id="data">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : parameters.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center">
                    No parameters found
                  </td>
                </tr>
              ) : (
                parameters.map((param) => (
                  <tr className="aaa rows" height={22} key={param.uuid}>
                    <td className="form-group">{param.name}</td>
                    <td className="form-group">{param.priority}</td>
                    <td className="form-group">{param.type}</td>
                    <td className="form-group">{param.options || "N/A"}</td>
                    <td className="form-group">{param.description}</td>
                    <td className="form-group">{param.productType}</td>

                    <td className="form-group">
                      {param.isActive ? "Active" : "Inactive"}
                    </td>
                    <td className="actionlink form-group">
                      <div className="actionCont d-flex align-items-center">
                        <div
                          className="input-group-addon addFirst mr-2"
                          onClick={() => editParameter(param)}
                          data-toggle="tooltip"
                          title="Edit"
                          data-original-title="Edit"
                          data-placement="top"
                        >
                          <i className="fa fa-edit" />
                        </div>
                        <div
                          className="input-group-addon addFirst"
                          onClick={() => deleteParameter(param.uuid)}
                          data-toggle="tooltip"
                          title="Delete"
                          data-original-title="Delete"
                          data-placement="top"
                        >
                          <i className="fa fa-trash" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <select
                className="form-control form-control-sm"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(parseInt(e.target.value));
                  setCurrentPage(1); // Reset to first page when page size changes
                }}
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
            <div>
              <button
                className="btn btn-dark btn-sm me-2"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-dark btn-sm ms-2"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParameterManagement;
