/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";

import React, { useRef, useEffect, useState } from "react"; // Import React and useState
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import loadingGif from "../../../assets/images/loadingblue.gif";
import {
  bookingemail,
  documentsType,
  supplierServicesOptions,
  taxregistration,
  vcc,
} from "../../../constants/contants";
import { connect } from "react-redux";
import { delDATA, getDATA, putDATA } from "../../../Apis/API";
import {
  ErrorApiAlert,
  PaginationSetter,
  RequiredFieldAlert,
  SimpleAlert,
  SuccessApiToast,
  deleteConfirmation,
} from "../../../constants/globalfunctions";
import { setEditOfflineSuppliersData } from "../../../state/action/actions";
import uploadFile from "../../../constants/filesuploader";
import ApiRoutes from "../../../constants/ApiRoutes";

const OfflineSuppliersSearch = ({ setEditOfflineSuppliersData }) => {
  const [supplierData, setSupplierData] = useState([]);
  const [originalsupplierData, setOriginalSupplierData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [selectedSupplier, setSelectedSuplier] = useState("");
  const [countryoptions, setCountryOptions] = useState([]);
  const [formData, setFormData] = useState({
    userName: "",
    supplierName: "",
    supplierType: "",
    country: "",
    mobile: "",
    email: "",
    contactPerson: "",
    sendEmail: "",
    VCC: "",
    taxRegistration: "",
  });

  const [documentsData, setDocumentsData] = useState({
    documentType: "",
    description: "",
    doclink: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = async (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDocumentInputChange = (event) => {
    const { name, value } = event.target;
    setDocumentsData({
      ...documentsData,
      [name]: value,
    });
  };

  const handleSingleSelectChange = (selectedOption, name) => {
    setDocumentsData((prevState) => ({
      ...prevState,
      [name]: selectedOption.value, // Assuming the option object has a 'value' property
    }));
  };
  const getOfflineSuppliers = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.SUPPLIERS.OFFLINE.SUPPLIER);
      if (response.data.statusCode === 200) {
        const offlinesuppliers =
          response && response.data.data ? response.data.data : [];

        setSupplierData(offlinesuppliers);
        setOriginalSupplierData(offlinesuppliers);

        setCountryCityOptions(offlinesuppliers);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Offline Suppliers");
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };

  const setCountryCityOptions = async (suppliers) => {
    let uniqueCities = [];
    let uniqueCountries = [];
    // Loop through transfers to collect unique values
    suppliers.forEach((supplier) => {
      // Collect unique cities
      if (!uniqueCities.includes(supplier.city)) {
        uniqueCities.push(supplier.city);
      }

      // Collect unique countries
      if (!uniqueCountries.includes(supplier.country)) {
        uniqueCountries.push(supplier.country);
      }
    });

    // Format unique countries as an array of objects
    const uniqueCountriesOptions = uniqueCountries.map((country) => ({
      label: country,
      value: country,
    }));
    // Add a default option
    uniqueCountriesOptions.unshift({ label: "-Select Country-", value: "" });
    setCountryOptions(uniqueCountriesOptions);
  };

  useEffect(() => {
    getOfflineSuppliers();
  }, []);

  const handleEdditClick = (supplier) => {
    setEditOfflineSuppliersData(supplier);
  };
  const wrapper1Ref = useRef(null);
  const wrapper2Ref = useRef(null);

  useEffect(() => {
    const wrapper1 = wrapper1Ref.current;
    const wrapper2 = wrapper2Ref.current;

    const handleWrapper1Scroll = () => {
      wrapper2.scrollLeft = wrapper1.scrollLeft;
    };

    const handleWrapper2Scroll = () => {
      wrapper1.scrollLeft = wrapper2.scrollLeft;
    };

    if (wrapper1 && wrapper2) {
      wrapper1.addEventListener("scroll", handleWrapper1Scroll);
      wrapper2.addEventListener("scroll", handleWrapper2Scroll);
    }
    // Cleanup event listeners when component unmounts
    return () => {
      if (wrapper1 && wrapper2) {
        wrapper1.removeEventListener("scroll", handleWrapper1Scroll);
        wrapper2.removeEventListener("scroll", handleWrapper2Scroll);
      }
    };
  }, []);

  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Supplier?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Supplier has been deleted successfully.",
        ApiRoutes.SUPPLIERS.OFFLINE.SUPPLIER
      );

      if (isDeleted) {
        setOriginalSupplierData((suppliers) =>
          suppliers.filter((supplier) => supplier.uuid !== uuid)
        );
        setSupplierData((suppliers) =>
          suppliers.filter((supplier) => supplier.uuid !== uuid)
        );
        setCountryCityOptions(originalsupplierData);
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filtereData = originalsupplierData.filter((sp) =>
      sp.supplierName.toLowerCase().includes(value.toLowerCase())
    );

    setSupplierData(filtereData);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const UploadDocument = async (event) => {
    event.preventDefault();

    if (!documentsData.documentType) {
      RequiredFieldAlert(
        "Document Type is required",
        "Please fill in the required fields",
        "error"
      );

      return;
    }
    if (!selectedFile) {
      RequiredFieldAlert(
        "Attachment is required",
        "Please fill in the required fields",
        "error"
      );
      return;
    }
    const resp = await uploadFile(selectedFile);
    if (resp.success === true) {
      setDocumentsData((prevState) => ({
        ...prevState,
        doclink: resp.imagelink,
      }));
    } else {
    }
    if (!documentsData.doclink) {
      RequiredFieldAlert(
        "Attachment is required",
        "Error In Uploading the File try To Resubmit",
        "error"
      );
      return;
    }
    try {
      const response = await putDATA(
        ApiRoutes.SUPPLIERS.OFFLINE.DOCUMENTS,
        selectedSupplier.uuid,
        documentsData
      );
      if (response.data.statusCode === 200) {
        SuccessApiToast("Documents Updated Successfully");
        handleCloseModal();
      }
    } catch (error) {
      ErrorApiAlert("Error Updating Documents");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredSuppliers = originalsupplierData.filter((supplier) => {
      // Convert supplier data to lowercase for case-insensitive comparison
      const lowerSupplierName = (supplier.supplierName || "").toLowerCase();
      const lowerUserName = (supplier.userName || "").toLowerCase();
      const lowerEmail = supplier.email.map((email) => email.toLowerCase());
      const lowerMobile = (supplier.mobile || "").toLowerCase();
      const lowerContactPerson1 = (supplier.contactPerson1 || "").toLowerCase();
      const lowerContactPerson2 = (supplier.contactPerson2 || "").toLowerCase();
      const lowerCountry = (supplier.country || "").toLowerCase();
      const lowerVcc = (supplier.VCC || "").toLowerCase();
      const lowerTaxRegistration = (
        supplier.taxRegistration || ""
      ).toLowerCase();
      const lowerSendEmail = (supplier.sendEmail || "").toLowerCase();
      const lowerSupplierType = supplier.supplierType.map((type) =>
        type.toLowerCase()
      );

      // Match criteria with form data
      const matchesSupplierName = lowerSupplierName.includes(
        (formData.supplierName || "").toLowerCase()
      );
      const matchesUserName = lowerUserName.includes(
        (formData.userName || "").toLowerCase()
      );
      const matchesEmail =
        !formData.email ||
        formData.email === "" ||
        lowerEmail.includes((formData.email || "").toLowerCase());
      const matchesMobile = lowerMobile.includes(
        (formData.mobile || "").toLowerCase()
      );
      const matchesContactPerson =
        lowerContactPerson1.includes(
          (formData.contactPerson || "").toLowerCase()
        ) ||
        lowerContactPerson2.includes(
          (formData.contactPerson || "").toLowerCase()
        );
      const matchesCountry =
        !formData.country ||
        formData.country === "" ||
        lowerCountry.includes((formData.country.value || "").toLowerCase());
      const matchesVcc =
        !formData.VCC ||
        formData.VCC === "" ||
        lowerVcc === (formData.VCC.value || "").toLowerCase();
      const matchesTaxRegistration =
        !formData.taxRegistration ||
        formData.taxRegistration === "" ||
        lowerTaxRegistration ===
          (formData.taxRegistration.value || "").toLowerCase();
      const matchesSendEmail =
        !formData.sendEmail ||
        formData.sendEmail === "" ||
        lowerSendEmail === (formData.sendEmail.value || "").toLowerCase();
      const matchesSupplierType =
        !formData.supplierType ||
        formData.supplierType.value === "" ||
        lowerSupplierType.includes(
          (formData.supplierType.value || "").toLowerCase()
        );

      // Return true if all search criteria match
      return (
        matchesSupplierName &&
        matchesUserName &&
        matchesEmail &&
        matchesMobile &&
        matchesContactPerson &&
        matchesCountry &&
        matchesVcc &&
        matchesTaxRegistration &&
        matchesSendEmail &&
        matchesSupplierType
      );
    });

    setSupplierData(filteredSuppliers);
  };

  const resetform = (event) => {
    event.preventDefault();

    // First, set the form data
    setFormData({
      userName: "",
      supplierName: "",
      supplierType: "",
      country: "",
      mobile: "",
      email: "",
      contactPerson: "",
      sendEmail: "",
      VCC: "",
      taxRegistration: "",
    });
    setSupplierData(originalsupplierData);
  };

  const { currentdata, noofPages } = PaginationSetter(
    currentPage,
    supplierData
  );
  const totalPages = noofPages;
  const currentSuppliers = currentdata;
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUpdateStatus = async (uuid, status) => {
    try {
      const response = await putDATA(ApiRoutes.SUPPLIERS.OFFLINE.STATUS, uuid, {
        status: status,
      });

      if (response.data.statusCode === 200) {
        SimpleAlert(
          "success",
          "Success",
          `Offline Supplier is now ${status === true ? "Active" : "In Active"}`
        );

        const updatedOriginalsupplierData = originalsupplierData.map(
          (supplier) =>
            supplier.uuid === uuid ? { ...supplier, status: status } : supplier
        );
        setSupplierData(updatedOriginalsupplierData);
        setOriginalSupplierData(updatedOriginalsupplierData);
      } else {
        SimpleAlert(
          "error",
          "Error",
          "Failed to Update Offline Supplier status"
        );
      }
    } catch (error) {
      // Handle errors from the API call

      SimpleAlert("error", "Error", "An unexpected error occurred.");
    }
  };
  // MODAL STATES
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = (sup) => {
    setSelectedSuplier(sup);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFile(null);
    setSelectedSuplier("");
    setDocumentsData({ documentType: "", description: "", doclink: "" });
  };
  // MODAL END
  return (
    <>
      <Header2
        title="SEARCH OFFLINE SUPPLIER"
        linkText1="Search Offline Suppliers"
        linkText2="Add Offline Supplier"
        link2={Constants.URLConstants.MASTERSSUPPLIERSOFFLINESUPPLIERSNEW}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form onSubmit={handleSubmit} name="search_area_from">
            <div class="panel-body">
              <div class="row">
                {/* <div class="col-md-3 form-group">
                <label>Code</label>
                <input
                  class="form-control form-control-sm test123"
                  type="text"
                  name="supplier_code"
                  value=""
                />
              </div> */}
                <div class="col-md-3 form-group">
                  <label>Supplier </label>
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    name="supplierName"
                    id="supplierName"
                    value={formData.supplierName}
                    onChange={handleInputChange}
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label>Username</label>
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    name="userName"
                    id="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label>Contact Person</label>
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    name="contactPerson"
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label>Country</label>
                  <MultiSelect
                    options={countryoptions}
                    isSearchable
                    value={formData.country}
                    onChange={(selectedOption) =>
                      setFormData({ ...formData, country: selectedOption })
                    }
                    placeholder="- Select Country -"
                    className="custom-select"
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-3 form-group">
                  <label>Phone</label>
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    name="mobile"
                    id="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label>Email</label>
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    size="30"
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label>Booking Emails</label>
                  <MultiSelect
                    options={bookingemail}
                    isSearchable
                    value={formData.sendEmail}
                    onChange={(selectedOption) =>
                      setFormData({ ...formData, sendEmail: selectedOption })
                    }
                    className="custom-select"
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label>Supplier Services</label>
                  <MultiSelect
                    options={supplierServicesOptions}
                    isSearchable
                    placeholder="- Supplier Services - "
                    value={formData.supplierType}
                    onChange={(selectedOption) =>
                      setFormData({ ...formData, supplierType: selectedOption })
                    }
                    className="custom-select"
                  />
                </div>
              </div>
              <div class="row mt-2">
                {/* <div class="col-md-3 form-group">
                <label>Supplier Type</label>
                <MultiSelect
                  options={suppliertype}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select"
                 
                />
              </div> */}
                <div class="col-md-3 form-group">
                  <label>VCC</label>
                  <MultiSelect
                    options={vcc}
                    isSearchable
                    value={formData.VCC}
                    onChange={(selectedOption) =>
                      setFormData({ ...formData, VCC: selectedOption })
                    }
                    placeholder="Nothing Selected"
                    className="custom-select"
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label>Tax Registration</label>
                  <MultiSelect
                    options={taxregistration}
                    isSearchable
                    placeholder="- All -"
                    value={formData.taxRegistration}
                    onChange={(selectedOption) =>
                      setFormData({
                        ...formData,
                        taxRegistration: selectedOption,
                      })
                    }
                    className="custom-select"
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-2 form-group">
                  <span id="submit_td">
                    <button type="submit" className="btn btn-dark btn-sm">
                      <i className="fa fa-search" aria-hidden="true"></i> Search
                    </button>
                  </span>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    type="reset"
                    id="reset"
                    name="reset"
                    value="reset"
                    onClick={resetform}
                    data
                  >
                    <i className="fa fa-repeat" /> &nbsp;Reset
                  </button>
                </div>
              </div>
            </div>
          </form>
          <br />
          {loading && (
            <div className="text-center">
              <img src={loadingGif} alt="Loading..." height={250} />
            </div>
          )}
          {!loading && (
            <>
              <form>
                <div className="panel-body removeMargins">
                  <div className="dataTables_scroll">
                    <div className="row pd_tp">
                      <div className="row mt-4">
                        <div className="col-md-5"></div>
                        <div className="col-md-3 col_hide">
                          <div className="form-group">
                            {/*Pagination panel*/}
                            <nav aria-label="Page navigation example">
                              <ul className="pagination pagination-sm justify-content-center mt-4">
                                {Array.from({ length: totalPages }).map(
                                  (_, index) => (
                                    <li key={index} className="page-item">
                                      <Link
                                        to="#"
                                        className="page-link"
                                        onClick={() => paginate(index + 1)}
                                        style={{
                                          backgroundColor:
                                            currentPage === index + 1
                                              ? "#FF5015"
                                              : "transparent",
                                          color:
                                            currentPage === index + 1
                                              ? "white"
                                              : "black", // Highlighting logic
                                          // Add more styles as needed
                                        }}
                                      >
                                        {index + 1}
                                      </Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            </nav>
                          </div>
                        </div>
                        <div className="col-md-2" />
                        <div className="col-md-2">
                          <div
                            id="search_sup_filter"
                            className="dataTables_filter"
                          >
                            <label>
                              <h5 style={{ display: "inline" }}>
                                <i
                                  className="fa fa-search srchWithinPg"
                                  id="magnifier"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Search within this table"
                                />
                              </h5>
                              <input
                                type="text"
                                className="tablesearch form-control form-control-sm search_new"
                                placeholder="Supplier"
                                value={searchInput}
                                onChange={handleInputSearchChange}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div class="table-responsive overflw" data-pattern="priority-columns"> */}
                    <div
                      id="search_transfer_wrapper"
                      className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                    >
                      <div className="row">
                        <div className="col-sm-6" />
                        <div className="col-sm-6" />
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div
                            className="doubleScroll-scroll-wrapper"
                            id="wrapper1"
                            ref={wrapper1Ref}
                            style={{
                              height: "20px",
                              overflow: "scroll hidden",
                              width: "1630px",
                            }}
                          >
                            <div
                              className="suwala-doubleScroll-scroll"
                              style={{ height: "20px", width: "1630px" }}
                            />
                          </div>
                          <div
                            id="wrapper2"
                            ref={wrapper2Ref}
                            style={{ overflow: "auto" }}
                          >
                            <table
                              id="search_sup"
                              className="table table-bordered   table-responsive dataTable no-footer"
                              role="grid"
                              aria-describedby="search_sup_info"
                              style={{ width: "1630px" }}
                            >
                              <thead>
                                <tr role="row">
                                  {/* <th className="sorting" tabIndex={0} aria-controls="search_sup" rowSpan={1} colSpan={1} aria-label="Code: activate to sort column ascending" style={{width: '57.2px'}}>Code</th> */}
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="search_sup"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Supplier: activate to sort column ascending"
                                    style={{ width: "116.2px" }}
                                  >
                                    Supplier
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="search_sup"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Username: activate to sort column ascending"
                                    style={{ width: "116.2px" }}
                                  >
                                    Username
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="search_sup"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Contact Person: activate to sort column ascending"
                                    style={{ width: "87.2px" }}
                                  >
                                    Contact Person
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="search_sup"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Address: activate to sort column ascending"
                                    style={{ width: "116.2px" }}
                                  >
                                    Address
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="search_sup"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Phone: activate to sort column ascending"
                                    style={{ width: "62.2px" }}
                                  >
                                    Phone
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="search_sup"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Email: activate to sort column ascending"
                                    style={{ width: "266.2px" }}
                                  >
                                    Email
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="search_sup"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Booking Emails: activate to sort column ascending"
                                    style={{ width: "83.2px" }}
                                  >
                                    Booking Emails
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="search_sup"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Supplier Services: activate to sort column ascending"
                                    style={{ width: "97.2px" }}
                                  >
                                    Supplier Services
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="search_sup"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Supplier Type: activate to sort column ascending"
                                    style={{ width: "75.2px" }}
                                  >
                                    Supplier Type
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="search_sup"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="VCC: activate to sort column ascending"
                                    style={{ width: "19.2px" }}
                                  >
                                    VCC
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="search_sup"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Tax Registration: activate to sort column ascending"
                                    style={{ width: "92.2px" }}
                                  >
                                    Tax Registration
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="search_sup"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Actions: activate to sort column ascending"
                                    style={{ width: "114px" }}
                                  >
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {currentSuppliers.map((supplier, index) => (
                                  <React.Fragment key={index}>
                                    <tr
                                      role="row"
                                      className={
                                        "phps_row_" +
                                        (index % 2 === 0 ? "0 even" : "1 odd")
                                      }
                                    >
                                      {/* <td>S000000892</td> */}
                                      <td>{supplier.supplierName}</td>
                                      <td>{supplier.userName}</td>
                                      <td>
                                        {supplier.contactPerson1}
                                        <br />
                                        {supplier.contactPerson2}
                                      </td>
                                      <td>{supplier.supplierAddress}</td>
                                      <td>{supplier.mobile}</td>
                                      <td style={{ lineHeight: "20px" }}>
                                        {supplier.email.map((email, index) => (
                                          <React.Fragment key={index}>
                                            {email}
                                            {index <
                                              supplier.email.length - 1 && (
                                              <br />
                                            )}
                                          </React.Fragment>
                                        ))}
                                      </td>
                                      <td>{supplier.sendEmail}</td>
                                      <td>
                                        {supplier.supplierType.map(
                                          (email, index) => (
                                            <React.Fragment key={index}>
                                              {email}
                                              {index <
                                                supplier.supplierType.length -
                                                  1 && <br />}
                                            </React.Fragment>
                                          )
                                        )}
                                      </td>
                                      <td>EXTERNAL</td>
                                      <td>{supplier.VCC}</td>
                                      <td>{supplier.taxRegistration}</td>
                                      <td className="actionlink">
                                        <div className="actionCont col4">
                                          <div className="input-group-addon">
                                            <Link
                                              to={
                                                Constants.URLConstants
                                                  .OFFLINESUPPLIERSCHANGEPASSWORD
                                              }
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title
                                              data-original-title="Change Password"
                                              onClick={() =>
                                                handleEdditClick(supplier)
                                              }
                                            >
                                              {" "}
                                              <i className="fa fa-key" />
                                            </Link>
                                          </div>
                                          <div className="input-group-addon">
                                            <Link
                                              to={
                                                Constants.URLConstants
                                                  .OFFLINESUPPLIEREDIT
                                              }
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title
                                              data-original-title="Edit"
                                              onClick={() =>
                                                handleEdditClick(supplier)
                                              }
                                            >
                                              <i className="fa fa-pencil-square-o" />
                                            </Link>
                                          </div>
                                          <div className="input-group-addon">
                                            <Link
                                              to={
                                                Constants.URLConstants
                                                  .OFFLINESUPPLIERVIEW
                                              }
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title
                                              data-original-title="View"
                                              onClick={() =>
                                                handleEdditClick(supplier)
                                              }
                                            >
                                              <i className="fa fa-eye" />
                                            </Link>
                                          </div>
                                          <div
                                            className="input-group-addon"
                                            data-toggle="tooltip"
                                            data-original-title="Upload Document"
                                            data-placement="top"
                                          >
                                            <Link
                                              data-toggle="modal"
                                              data-target="#uploadDocument"
                                              onClick={() =>
                                                handleButtonClick(supplier)
                                              }
                                            >
                                              <i className="fa fa-upload" />
                                            </Link>
                                          </div>
                                          <div
                                            className="input-group-addon"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title=""
                                            data-original-title="Click To Deactivate"
                                          >
                                            {supplier.status === true ? (
                                              <Link
                                                onClick={() => {
                                                  handleUpdateStatus(
                                                    supplier.uuid,
                                                    false
                                                  );
                                                }}
                                              >
                                                <i className="fa fa-check-circle"></i>
                                              </Link>
                                            ) : (
                                              <Link
                                                onClick={() => {
                                                  handleUpdateStatus(
                                                    supplier.uuid,
                                                    true
                                                  );
                                                }}
                                              >
                                                <i className="fa fa-times-circle"></i>
                                              </Link>
                                            )}
                                          </div>
                                          {/* <div className="input-group-addon">
                            <Link to="" 
                            onClick={() => {
                              handleUpdateStatus(
                                supplier.uuid,false
                              );
                            }}
                            data-toggle="tooltip" data-placement="top" title data-original-title="Click to Deactivate Account">
                              <i className="fa fa-user" style={{color: 'green'}} aria-hidden="true" />
                            </Link>
                          </div> */}
                                          <div className="input-group-addon">
                                            <Link
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title
                                              data-original-title="Delete"
                                              onClick={() =>
                                                handleDeleteClick(supplier.uuid)
                                              }
                                            >
                                              <i className="fa fa-trash" />{" "}
                                            </Link>
                                          </div>
                                          <div className="input-group-addon">
                                            <Link
                                              to={
                                                Constants.URLConstants
                                                  .OFFLINESUPPLIERVCCSETTING
                                              }
                                              onClick={() =>
                                                handleEdditClick(supplier)
                                              }
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title
                                              data-original-title="VCC Setting"
                                            >
                                              <i className="fa fa-cog" />
                                            </Link>
                                          </div>

                                          <div className="input-group-addon">
                                            <Link
                                              to="vcc_setting_local_supplier.php?id=S000000892&supplier_code=&supplier_name=&supplier_username=&contact_person=&address=&phone=&supplier_email=&send_email="
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title
                                              data-original-title="VCC Setting"
                                            ></Link>
                                            <Link
                                              to={
                                                Constants.URLConstants
                                                  .OFFLINESUPPLIERTAXREGISTRATION
                                              }
                                              onClick={() =>
                                                handleEdditClick(supplier)
                                              }
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title
                                              data-original-title="Tax Registration"
                                            >
                                              <i
                                                className="fa fa-cogs"
                                                aria-hidden="true"
                                              />
                                            </Link>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </React.Fragment>
                                ))}
                              </tbody>
                            </table>
                            {showModal && (
                              <div className="modal-wrapper-theme">
                                <div
                                  className="modal-theme"
                                  style={{ height: "400px" }}
                                >
                                  <div className="modal-header-theme">
                                    <h5 className="modal-title-theme">
                                      SUPPLIER DOCUMENTS FOR{" "}
                                      {selectedSupplier.supplierName.toUpperCase()}
                                    </h5>
                                    <button
                                      type="button"
                                      className="close-theme"
                                      aria-label="Close"
                                      onClick={handleCloseModal}
                                    >
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div className="modal-body-theme ">
                                    {/* Form with text fields, textarea, checkbox, and add button */}

                                    <form id="addnewthemeform">
                                      {/* <input type="hidden" name="action" defaultValue="insert" /> */}
                                      <div className="panel-body">
                                        {/* <div className="message" style={{ display: 'none' }}></div> */}
                                        <div className="row">
                                          <div className="form-group col-md-6">
                                            <label>Document Type</label>
                                            <MultiSelect
                                              options={documentsType}
                                              isSearchable
                                              name="documentType"
                                              placeholder="- Select Option -"
                                              onChange={(selectedOption) =>
                                                handleSingleSelectChange(
                                                  selectedOption,
                                                  "documentType"
                                                )
                                              }
                                              className="custom-select required "
                                              noOptionsMessage={() =>
                                                "No Document Type Found"
                                              }
                                            />
                                          </div>

                                          <div className="form-group col-md-6 ml-5">
                                            <label>Attachment</label>
                                            <span className="uniqFile input-group">
                                              <span className="input-group-addon fa fa-upload myInputFile">
                                                <input
                                                  type="file"
                                                  name="docfile"
                                                  size={39}
                                                  className="file_font"
                                                  accept="*"
                                                  onChange={handleFileInput}
                                                />
                                              </span>
                                            </span>
                                          </div>
                                        </div>
                                        <div className="form-group col-md-12">
                                          <label>Description</label>
                                          <textarea
                                            className="form-control form-control-sm"
                                            rows={4}
                                            cols={50}
                                            name="description"
                                            id="description"
                                            value={documentsData.description}
                                            onChange={(event) =>
                                              handleDocumentInputChange(event)
                                            }
                                          />
                                        </div>

                                        <button
                                          className="btn btn-dark btn-sm form-group mt-3"
                                          type="button"
                                          onClick={(event) =>
                                            UploadDocument(event)
                                          }
                                        >
                                          <i className="fa fa-upload" />
                                          &nbsp;Upload
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div
                            className="dataTables_info"
                            id="search_transfer_info"
                            role="status"
                            aria-live="polite"
                          ></div>
                        </div>
                        <div className="col-sm-6" />
                      </div>
                    </div>
                    <div className="form-group no-result"></div>
                    <div className="row pd_tp">
                      <div className="row mt-3">
                        <div className="col-md-4 col_hide">
                          <div className="form-group col-md-6">&nbsp;</div>
                        </div>
                        <div className="col-md-5">
                          <div className="form-group">
                            {/*Pagination panel*/}
                            {/* <nav aria-label="Page navigation example">
                  <ul className="pagination pagination-sm justify-content-center">
                    <li className="page-item active"><Link className="page-link" to="#">2</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">4</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">5</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">6</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">7</Link></li>
                    <li className="page-item">
                      <Link className="page-link" to="#" aria-label="Next">
                        <span aria-hidden="true">Next »</span>
                      </Link>
                    </li>
                  </ul>
                </nav> */}
                          </div>
                        </div>
                        <div className="col-md-3 col_hide">&nbsp;</div>
                      </div>
                    </div>
                    <br />
                    <br />
                    {/* </div> */}
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default connect(null, { setEditOfflineSuppliersData })(
  OfflineSuppliersSearch
);
