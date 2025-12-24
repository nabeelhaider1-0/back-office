/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Flatpickr from "react-flatpickr";
import MultiSelect from "../../reactMultiSelect";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  add_options,
  consultantsOptions,
  country_options,
  searchbooking_channnel_manager_options,
  // searchbooking_options,
  searchbooking_pending_options,
  searchbooking_salaes_managers_options,
  searchbooking_status_options,
  searchbooking_summary_options,
  searchbooking_types_options,
  searchbooking_whitelabel_options,
  searchbookings_results_options,
  supplierTypeOptions,
  suppliersOnlineOptions,
  taxregistration,
} from "../../../constants/contants";
import { apiHandler } from "../../../Apis/ApiHandler";

const SearchForm = ({ onSearch, onReset, initialUserId }) => {
  const [isMoreVisible, setMoreVisibility] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Added for URL manipulation
  const hasSearchedRef = useRef(false); // Track if initial search has been performed

  const [formData, setFormData] = useState({
    bookingId: "",
    bookingStatus: [],
    supplierRef: "",
    supplier: [],
    bookingDate: null,
    serviceType: [],
    userId: initialUserId || null,
  });
  const [users, setUsers] = useState([]);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    const statusParam = searchParams.get("status");
    console.log("URL Query status:", statusParam); // Debug status param
    if (statusParam && !hasSearchedRef.current) {
      // Find matching status option from searchbooking_status_options
      const statusOption = searchbooking_status_options.find(
        (option) => option.value.toLowerCase() === statusParam.toLowerCase()
      );
      if (statusOption) {
        setFormData((prev) => ({
          ...prev,
          bookingStatus: [statusOption],
        }));
        // Trigger search with the status parameter
        onSearch({
          ...formData,
          bookingStatus: [statusOption],
        });
        hasSearchedRef.current = true; // Mark as searched to prevent re-trigger
      }
    }
  }, [searchParams]);

  useEffect(() => {
    // Fetch user details if initialUserId is provided
    if (initialUserId) {
      const fetchUserDetails = async () => {
        setLoadingUsers(true);
        try {
          const result = await apiHandler.get(`/users/${initialUserId}`);
          console.log("User Details API Result:", result);
          if (result.success) {
            const user = result.data;
            if (user) {
              console.log("Fetched user:", user);
              setUserSearchQuery(user.full_name || "N/A");
            } else {
              console.log("User not found for ID:", initialUserId);
              setError("User not found");
            }
          } else {
            setError(result.message || "Failed to fetch user details");
          }
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Failed to fetch user details";
          setError(errorMessage);
        }
        setLoadingUsers(false);
      };
      fetchUserDetails();
    }
  }, [initialUserId]);

  useEffect(() => {
    // Fetch users when userSearchQuery changes and dropdown is visible
    const fetchUsers = async () => {
      if (!userSearchQuery || !showUserDropdown) {
        setUsers([]);
        return;
      }
      setLoadingUsers(true);
      try {
        const result = await apiHandler.get("/users/list", {
          params: { page: 1, limit: 1000, search: userSearchQuery },
        });
        console.log("User List API Result:", result);
        if (result.success) {
          const mappedUsers = Array.isArray(result.data)
            ? result.data
                .filter((user) => user.email_verified_at !== null)
                .map((user) => ({
                  id: user.id,
                  email: user.email,
                  name: user.full_name || "N/A",
                  provider: user.provider,
                  email_verified_at: user.email_verified_at,
                  createdAt: user.created_at,
                  updatedAt: user.updated_at,
                  user_type: user.user_type || "N/A",
                }))
            : [];
          console.log("Mapped Users:", mappedUsers);
          setUsers(mappedUsers);
        } else {
          setError(result.message);
          setUsers([]);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch user list";
        setError(errorMessage);
        setUsers([]);
      }
      setLoadingUsers(false);
    };
    fetchUsers();
  }, [userSearchQuery, showUserDropdown]);

  const handleMoreClick = () => setMoreVisibility(false);
  const handleLessClick = () => setMoreVisibility(true);

  const handleInputChange = (key, value) => {
    console.log("handleInputChange", key, value);
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (keyStart, keyEnd, date) => {
    setFormData((prev) => ({
      ...prev,
      [keyStart]: date || null,
      [keyEnd]: date || null,
    }));
  };

  const handleTrashClick = (keyStart, keyEnd) => {
    setFormData((prev) => ({
      ...prev,
      [keyStart]: null,
      [keyEnd]: null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting formData:", formData);
    onSearch(formData);
  };

  const handleResetClick = (e) => {
    e.preventDefault();
    setFormData({
      bookingId: "",
      bookingStatus: [],
      supplierRef: "",
      supplier: [],
      bookingDate: null,
      serviceType: [],
      userId: null,
    });
    setUserSearchQuery("");
    setUsers([]);
    setShowUserDropdown(false);
    setMoreVisibility(true);
    hasSearchedRef.current = false; // Reset search flag
    navigate({ search: "" }); // Remove all query parameters from URL
    onReset();
  };

  const formatDateToString = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Row 1 */}
      <div className="row">
        <div className="form-group col-md-2 d-none">
          <label>Consultant</label>
          <MultiSelect
            options={consultantsOptions}
            isSearchable
            placeholder="--Select--"
            noOptionsMessage={() => "No Consultant Found"}
            className="custom-select"
            onChange={(selected) => handleInputChange("consultant", selected)}
          />
        </div>
        <div className="form-group col-md-2 d-none">
          <label>Branch</label>
          <MultiSelect
            options={add_options}
            isMulti={false}
            isSearchable
            placeholder="- Select Branch -"
            noOptionsMessage={() => "No Branch Found"}
            className="custom-select"
            onChange={(selected) => handleInputChange("branch", selected)}
          />
        </div>
        <div className="form-group col-md-2 d-none">
          <label>Agent</label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="agent"
            value={formData.agent || ""}
            onChange={(e) => handleInputChange("agent", e.target.value)}
          />
        </div>
        <div className="form-group col-md-2 d-none">
          <label>Leader Name</label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="leaderName"
            value={formData.leaderName}
            onChange={(e) => handleInputChange("leaderName", e.target.value)}
          />
        </div>
        <div className="form-group col-md-3 d-none">
          <label>Service Date</label>
          <div className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12">
            <Flatpickr
              value={formData.serviceDate}
              onChange={(dates) =>
                handleDateChange("serviceDate", "serviceDateEnd", dates)
              }
              options={{ dateFormat: "Y-m-d", mode: "range" }}
            />
            <span
              className="input-group-addon"
              onClick={() =>
                handleTrashClick("serviceDateStart", "serviceDateEnd")
              }
            >
              <i className="fa fa-trash" />
            </span>
          </div>
        </div>
      </div>
      {/* Row 2 */}
      <div className="row mt-2">
        <div className="form-group col-md-2">
          <label>Booking ID</label>
          <input
            type="search"
            className="form-control form-control-sm"
            name="bookingId"
            value={formData.bookingId}
            onChange={(e) => handleInputChange("bookingId", e.target.value)}
          />
        </div>
        <div className="form-group col-md-2">
          <label>Booking Status</label>
          <MultiSelect
            options={searchbooking_status_options}
            isMulti={true}
            isSearchable
            placeholder="--Select--"
            noOptionsMessage={() => "No Status Found"}
            className="custom-select"
            value={formData.bookingStatus}
            onChange={(selected) =>
              handleInputChange("bookingStatus", selected)
            }
          />
        </div>
        <div className="form-group col-md-2">
          <label>Supplier Ref. #</label>
          <input
            type="search"
            className="form-control form-control-sm"
            name="supplierRef"
            value={formData.supplierRef}
            onChange={(e) => handleInputChange("supplierRef", e.target.value)}
          />
        </div>
        <div className="form-group col-md-2">
          <label>Supplier</label>
          <MultiSelect
            options={suppliersOnlineOptions}
            isMulti={true}
            isSearchable
            placeholder="- Select -"
            noOptionsMessage={() => "No Supplier Found"}
            className="custom-select"
            onChange={(selected) => handleInputChange("supplier", selected)}
          />
        </div>
        <div className="form-group col-md-2">
          <label>Customer</label>
          <div style={{ position: "relative" }}>
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Search Customers"
              value={userSearchQuery}
              onChange={(e) => {
                setUserSearchQuery(e.target.value);
                setShowUserDropdown(true);
                if (!e.target.value) {
                  setFormData((prev) => ({ ...prev, userId: null }));
                  setUsers([]);
                }
              }}
              onFocus={() => userSearchQuery && setShowUserDropdown(true)}
            />
            {showUserDropdown && (
              <div
                className="dropdown"
                style={{
                  position: "absolute",
                  zIndex: 1000,
                  background: "#fff",
                  width: "100%",
                  maxHeight: "200px",
                  overflowY: "auto",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                {loadingUsers ? (
                  <div className="dropdown-item">Loading...</div>
                ) : error ? (
                  <div className="dropdown-item text-danger">{error}</div>
                ) : users.length === 0 ? (
                  <div className="dropdown-item">No users found</div>
                ) : (
                  users.map((user) => (
                    <div
                      key={user.id}
                      className="dropdown-item"
                      style={{ cursor: "pointer", padding: "8px" }}
                      onClick={() => {
                        console.log("Selected user:", user);
                        setFormData((prev) => ({ ...prev, userId: user.id }));
                        setUserSearchQuery(user.name);
                        setUsers([]);
                        setShowUserDropdown(false);
                      }}
                    >
                      {user.name} ({user.email})
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        <div className="form-group col-md-2">
          <label>Booking Date</label>
          <div className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12">
            <Flatpickr
              value={formData.bookingDate}
              onChange={(date) => {
                const formattedDate = date[0]
                  ? formatDateToString(date[0])
                  : "";
                handleDateChange(
                  "bookingDate",
                  "bookingDateEnd",
                  formattedDate
                );
              }}
              options={{ dateFormat: "Y-m-d" }}
            />
            <span
              className="input-group-addon"
              onClick={() => handleTrashClick("bookingDate", "bookingDateEnd")}
            >
              <i className="fa fa-trash" />
            </span>
          </div>
        </div>
      </div>
      {/* Row 3 (Hidden) */}
      <div className="row mt-2">
        <div className="form-group col-md-3 d-none">
          <label>Voucher Date</label>
          <div className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12">
            <Flatpickr
              value={[formData.voucherDateStart, formData.voucherDateEnd]}
              onChange={(dates) =>
                handleDateChange("voucherDateStart", "voucherDateEnd", dates)
              }
              options={{ dateFormat: "Y-m-d", mode: "range" }}
            />
            <span
              className="input-group-addon"
              onClick={() =>
                handleTrashClick("voucherDateStart", "voucherDateEnd")
              }
            >
              <i className="fa fa-trash" />
            </span>
          </div>
        </div>
        <div className="form-group col-md-3 d-none">
          <label>Status Date</label>
          <div className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12">
            <Flatpickr
              value={[formData.statusDateStart, formData.statusDateEnd]}
              onChange={(dates) =>
                handleDateChange("statusDateStart", "statusDateEnd", dates)
              }
              options={{ dateFormat: "Y-m-d", mode: "range" }}
            />
            <span
              className="input-group-addon"
              onClick={() =>
                handleTrashClick("statusDateStart", "statusDateEnd")
              }
            >
              <i className="fa fa-trash" />
            </span>
          </div>
        </div>
        <div className="form-group col-md-1 mt-3 d-none">
          <label> </label>
          <button
            className={`btn btn-dark btn-sm ${isMoreVisible ? "" : "d-none"}`}
            type="button"
            onClick={handleMoreClick}
          >
            + More
          </button>
        </div>
      </div>
      {/* Row 4 */}
      <div
        className={`row mt-2 content-container ${
          isMoreVisible ? "d-none" : ""
        }`}
      >
        <div className="form-group col-md-2">
          <label>Country</label>
          <MultiSelect
            options={country_options}
            isMulti
            isSearchable
            placeholder="- Select a country -"
            noOptionsMessage={() => "No Country Found"}
            className="custom-select"
            onChange={(selected) => handleInputChange("country", selected)}
          />
        </div>
        <div className="form-group col-md-2">
          <label>City</label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="city"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
          />
        </div>
        <div className="form-group col-md-2">
          <label>Hotel Name</label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="hotelName"
            value={formData.hotelName}
            onChange={(e) => handleInputChange("hotelName", e.target.value)}
          />
        </div>
        <div className="form-group col-md-2">
          <label>Sales Manager</label>
          <MultiSelect
            options={searchbooking_salaes_managers_options}
            isMulti
            isSearchable
            placeholder="- Select -"
            noOptionsMessage={() => "No Options Found"}
            className="custom-select"
            onChange={(selected) => handleInputChange("salesManager", selected)}
          />
        </div>
        <div className="form-group col-md-3">
          <label>Last Modification Date</label>
          <div className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12">
            <Flatpickr
              value={[
                formData.lastModificationDateStart,
                formData.lastModificationDateEnd,
              ]}
              onChange={(dates) =>
                handleDateChange(
                  "lastModificationDateStart",
                  "lastModificationDateEnd",
                  dates
                )
              }
              options={{ dateFormat: "Y-m-d", mode: "range" }}
            />
            <span
              className="input-group-addon"
              onClick={() =>
                handleTrashClick(
                  "lastModificationDateStart",
                  "lastModificationDateEnd"
                )
              }
            >
              <i className="fa fa-trash" />
            </span>
          </div>
        </div>
      </div>
      {/* Row 5 */}
      <div
        className={`row mt-2 content-container ${
          isMoreVisible ? "d-none" : ""
        }`}
      >
        <div className="form-group col-md-2">
          <label>Payment Gateway</label>
          <MultiSelect
            options={taxregistration}
            isMulti
            isSearchable
            placeholder="- All -"
            noOptionsMessage={() => "No Options Found"}
            className="custom-select"
            onChange={(selected) =>
              handleInputChange("paymentGateway", selected)
            }
          />
        </div>
        <div className="form-group col-md-2">
          <label>Booking Type</label>
          <MultiSelect
            options={searchbooking_types_options}
            isMulti
            isSearchable
            placeholder="- All -"
            noOptionsMessage={() => "No Options Found"}
            className="custom-select"
            onChange={(selected) => handleInputChange("bookingType", selected)}
          />
        </div>
        <div className="form-group col-md-2">
          <label>XML Bookings</label>
          <MultiSelect
            options={taxregistration}
            isMulti
            isSearchable
            placeholder="- All -"
            noOptionsMessage={() => "No Options Found"}
            className="custom-select"
            onChange={(selected) => handleInputChange("xmlBookings", selected)}
          />
        </div>
        <div className="form-group col-md-2">
          <label>Results per page</label>
          <MultiSelect
            options={searchbookings_results_options}
            isMulti
            isSearchable
            placeholder="- All -"
            noOptionsMessage={() => "No Options Found"}
            className="custom-select"
            onChange={(selected) =>
              handleInputChange("resultsPerPage", selected)
            }
          />
        </div>
        <div className="form-group col-md-3">
          <label>Cancellation Deadline Date</label>
          <div className="input-daterange input-group date col-md-12 col-sm-12 col-xs-12">
            <Flatpickr
              value={[
                formData.cancellationDeadlineDateStart,
                formData.cancellationDeadlineDateEnd,
              ]}
              onChange={(dates) =>
                handleDateChange(
                  "cancellationDeadlineDateStart",
                  "cancellationDeadlineDateEnd",
                  dates
                )
              }
              options={{ dateFormat: "Y-m-d", mode: "range" }}
            />
            <span
              className="input-group-addon"
              onClick={() =>
                handleTrashClick(
                  "cancellationDeadlineDateStart",
                  "cancellationDeadlineDateEnd"
                )
              }
            >
              <i className="fa fa-trash" />
            </span>
          </div>
        </div>
      </div>
      {/* Row 6 */}
      <div
        className={`row mt-2 content-container ${
          isMoreVisible ? "d-none" : ""
        }`}
      >
        <div className="form-group col-md-2">
          <label>Is Mobile</label>
          <MultiSelect
            options={taxregistration}
            isMulti
            isSearchable
            placeholder="- All -"
            noOptionsMessage={() => "No Options Found"}
            className="custom-select"
            onChange={(selected) => handleInputChange("isMobile", selected)}
          />
        </div>
        <div className="form-group col-md-2">
          <label>Channel Manager</label>
          <MultiSelect
            options={searchbooking_channnel_manager_options}
            isMulti
            isSearchable
            placeholder="- All -"
            noOptionsMessage={() => "No Options Found"}
            className="custom-select"
            onChange={(selected) =>
              handleInputChange("channelManager", selected)
            }
          />
        </div>
        <div className="form-group col-md-1">
          <label> </label>
          <br />
          <button
            className={`btn btn-dark btn-sm ${isMoreVisible ? "d-none" : ""}`}
            type="button"
            onClick={handleLessClick}
          >
            - Less
          </button>
        </div>
      </div>
      {/* Row 7 */}
      <div className="row mt-2">
        <div className="form-group col-md-2 d-none">
          <label>Pending Filter</label>
          <MultiSelect
            options={searchbooking_pending_options}
            isMulti
            isSearchable
            placeholder="--Select--"
            noOptionsMessage={() => "No Options Found"}
            className="custom-select"
            onChange={(selected) =>
              handleInputChange("pendingFilter", selected)
            }
          />
        </div>
        <div className="form-group col-md-2 d-none">
          <label>View Summary</label>
          <MultiSelect
            options={searchbooking_summary_options}
            isMulti
            isSearchable
            placeholder="--Select--"
            noOptionsMessage={() => "No Options Found"}
            className="custom-select"
            onChange={(selected) => handleInputChange("viewSummary", selected)}
          />
        </div>
        <div className="form-group col-md-2 d-none">
          <label>Whitelabel</label>
          <MultiSelect
            options={searchbooking_whitelabel_options}
            isMulti
            isSearchable
            placeholder="--Select--"
            noOptionsMessage={() => "No Options Found"}
            className="custom-select"
            onChange={(selected) => handleInputChange("whitelabel", selected)}
          />
        </div>
        <div className="form-group col-md-2">
          <label>Service Type</label>
          <MultiSelect
            options={supplierTypeOptions}
            isMulti={true}
            isSearchable
            placeholder="- Select Service -"
            noOptionsMessage={() => "No Agent Found"}
            className="custom-select"
            onChange={(selected) => handleInputChange("serviceType", selected)}
          />
        </div>
        <div className="form-group col-md-3 col-lg-2 d-none">
          <label>Is Hotel Confirmation Added</label>
          <MultiSelect
            options={taxregistration}
            isMulti
            isSearchable
            placeholder="- All -"
            noOptionsMessage={() => "No Options Found"}
            className="custom-select"
            onChange={(selected) =>
              handleInputChange("isHotelConfirmationAdded", selected)
            }
          />
        </div>
      </div>
      {/* Submit and Reset Buttons */}
      <div className="row mt-3">
        <div className="form-group col-md-4">
          <button type="submit" className="btn btn-dark btn-sm me-2">
            <i className="fa fa-search" /> Search Bookings
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={handleResetClick}
          >
            <i className="fa fa-undo" /> Reset Filters
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
