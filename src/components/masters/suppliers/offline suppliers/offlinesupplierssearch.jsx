/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";

import React, { useEffect, useRef, useState } from "react";
import Header2 from "../../../header2/header2";
import Constants from "../../../../constants/routes";
import MultiSelect from "../../../reactMultiSelect";
import { countries } from "../../../../constants/Country-City-Data";
import {
  ErrorApiAlert,
  PaginationSetter,
  deleteConfirmation,
} from "../../../../constants/globalfunctions";
import { delDATA } from "../../../../Apis/API";
import { connect } from "react-redux";
import { setEditOfflineSuppliersData } from "../../../../state/action/actions";
import ApiRoutes from "../../../../constants/ApiRoutes";

const bookingemail = [
  { label: "- Select-", value: "" },
  { label: "Yes", value: "1" },
  { label: "No", value: "2" },
];

const supplierServicesOptions = [
  { label: "Hotel", value: "hotel_supplier" },
  { label: "Sightseeing", value: "tour_supplier" },
  { label: "Transfer", value: "transfer_supplier" },
  { label: "Visa", value: "visa_supplier" },
  { label: "FIT Package", value: "fit_package_supplier" },
  { label: "Airline", value: "airline_supplier" },
];

const suppliertype = [
  { label: "- Select-", value: "" },
  { label: "External", value: "1" },
  { label: "Internal", value: "2" },
  { label: "Substitue", value: "3" },
];
const vcc = [
  { label: "Yes", value: "1" },
  { label: "No", value: "2" },
];
const taxregistration = [
  { label: "- All-", value: "" },
  { label: "Yes", value: "1" },
  { label: "No", value: "2" },
];

const dummyApiData = [
  {
    userName: "superAdmin@tdo.com",
    password: "123",
    supplierName: "Kashif Ayub",
    supplierType: [
      "Hotel Supplier",
      "FIT Package Supplier",
      "Airline Supplier",
    ],
    supplierAddress: "Dhoke Elahi Buksh PO Nih Chack Shehzad Islamabad",
    telephone: "03113477394",
    country: "Pakistan",
    mobile: "03113477394",
    city: "Islamabad",
    timeZone: -10,
    currency: "630",
    fax: "FAX",
    email: "kayub988@gmail.com",
    reservationEmail: "kayub@gmail.com",
    cancellationEmail: "ka2gmail.com",
    contactPerson1: "CONTACT 1",
    contactPerson2: "CONTACT 2",
    remarks: "",
    openingBalance: "10000",
    jointVenture: "Yes",
    sendEmail: "No",
    editHotels: "Yes",
    editAdminRates: "No",
  },
  {
    userName: "superAdmin@tdo.com",
    password: "123",
    supplierName: "Kashif Ayub",
    supplierType: [
      "Hotel Supplier",
      "FIT Package Supplier",
      "Airline Supplier",
    ],
    supplierAddress: "Dhoke Elahi Buksh PO Nih Chack Shehzad Islamabad",
    telephone: "03113477394",
    country: "Pakistan",
    mobile: "03113477394",
    city: "Islamabad",
    timeZone: -10,
    currency: "630",
    fax: "FAX",
    email: "kayub988@gmail.com",
    reservationEmail: "kayub@gmail.com",
    cancellationEmail: "ka2gmail.com",
    contactPerson1: "CONTACT 1",
    contactPerson2: "CONTACT 2",
    remarks: "",
    openingBalance: "10000",
    jointVenture: "Yes",
    sendEmail: "No",
    editHotels: "Yes",
    editAdminRates: "No",
  },
  {
    userName: "superAdmin@tdo.com",
    password: "123",
    supplierName: "Kashif Ayub",
    supplierType: [
      "Hotel Supplier",
      "FIT Package Supplier",
      "Airline Supplier",
    ],
    supplierAddress: "Dhoke Elahi Buksh PO Nih Chack Shehzad Islamabad",
    telephone: "03113477394",
    country: "Pakistan",
    mobile: "03113477394",
    city: "Islamabad",
    timeZone: -10,
    currency: "630",
    fax: "FAX",
    email: "kayub988@gmail.com",
    reservationEmail: "kayub@gmail.com",
    cancellationEmail: "ka2gmail.com",
    contactPerson1: "CONTACT 1",
    contactPerson2: "CONTACT 2",
    remarks: "",
    openingBalance: "10000",
    jointVenture: "Yes",
    sendEmail: "No",
    editHotels: "Yes",
    editAdminRates: "No",
  },
  {
    userName: "superAdmin@tdo.com",
    password: "123",
    supplierName: "Kashif Ayub",
    supplierType: [
      "Hotel Supplier",
      "FIT Package Supplier",
      "Airline Supplier",
    ],
    supplierAddress: "Dhoke Elahi Buksh PO Nih Chack Shehzad Islamabad",
    telephone: "03113477394",
    country: "Pakistan",
    mobile: "03113477394",
    city: "Islamabad",
    timeZone: -10,
    currency: "630",
    fax: "FAX",
    email: "kayub988@gmail.com",
    reservationEmail: "kayub@gmail.com",
    cancellationEmail: "ka2gmail.com",
    contactPerson1: "CONTACT 1",
    contactPerson2: "CONTACT 2",
    remarks: "",
    openingBalance: "10000",
    jointVenture: "Yes",
    sendEmail: "No",
    editHotels: "Yes",
    editAdminRates: "No",
  },
  {
    userName: "superAdmin@tdo.com",
    password: "123",
    supplierName: "Kashif Ayub",
    supplierType: [
      "Hotel Supplier",
      "FIT Package Supplier",
      "Airline Supplier",
    ],
    supplierAddress: "Dhoke Elahi Buksh PO Nih Chack Shehzad Islamabad",
    telephone: "03113477394",
    country: "Pakistan",
    mobile: "03113477394",
    city: "Islamabad",
    timeZone: -10,
    currency: "630",
    fax: "FAX",
    email: "kayub988@gmail.com",
    reservationEmail: "kayub@gmail.com",
    cancellationEmail: "ka2gmail.com",
    contactPerson1: "CONTACT 1",
    contactPerson2: "CONTACT 2",
    remarks: "",
    openingBalance: "10000",
    jointVenture: "Yes",
    sendEmail: "No",
    editHotels: "Yes",
    editAdminRates: "No",
  },
  {
    userName: "superAdmin@tdo.com",
    password: "123",
    supplierName: "Kashif Ayub",
    supplierType: [
      "Hotel Supplier",
      "FIT Package Supplier",
      "Airline Supplier",
    ],
    supplierAddress: "Dhoke Elahi Buksh PO Nih Chack Shehzad Islamabad",
    telephone: "03113477394",
    country: "Pakistan",
    mobile: "03113477394",
    city: "Islamabad",
    timeZone: -10,
    currency: "630",
    fax: "FAX",
    email: "kayub988@gmail.com",
    reservationEmail: "kayub@gmail.com",
    cancellationEmail: "ka2gmail.com",
    contactPerson1: "CONTACT 1",
    contactPerson2: "CONTACT 2",
    remarks: "",
    openingBalance: "10000",
    jointVenture: "Yes",
    sendEmail: "No",
    editHotels: "Yes",
    editAdminRates: "No",
  },
  {
    userName: "superAdmin@tdo.com",
    password: "123",
    supplierName: "Kashif Ayub",
    supplierType: [
      "Hotel Supplier",
      "FIT Package Supplier",
      "Airline Supplier",
    ],
    supplierAddress: "Dhoke Elahi Buksh PO Nih Chack Shehzad Islamabad",
    telephone: "03113477394",
    country: "Pakistan",
    mobile: "03113477394",
    city: "Islamabad",
    timeZone: -10,
    currency: "630",
    fax: "FAX",
    email: "kayub988@gmail.com",
    reservationEmail: "kayub@gmail.com",
    cancellationEmail: "ka2gmail.com",
    contactPerson1: "CONTACT 1",
    contactPerson2: "CONTACT 2",
    remarks: "",
    openingBalance: "10000",
    jointVenture: "Yes",
    sendEmail: "No",
    editHotels: "Yes",
    editAdminRates: "No",
  },
  {
    userName: "superAdmin@tdo.com",
    password: "123",
    supplierName: "Kashif Ayub",
    supplierType: [
      "Hotel Supplier",
      "FIT Package Supplier",
      "Airline Supplier",
    ],
    supplierAddress: "Dhoke Elahi Buksh PO Nih Chack Shehzad Islamabad",
    telephone: "03113477394",
    country: "Pakistan",
    mobile: "03113477394",
    city: "Islamabad",
    timeZone: -10,
    currency: "630",
    fax: "FAX",
    email: "kayub988@gmail.com",
    reservationEmail: "kayub@gmail.com",
    cancellationEmail: "ka2gmail.com",
    contactPerson1: "CONTACT 1",
    contactPerson2: "CONTACT 2",
    remarks: "",
    openingBalance: "10000",
    jointVenture: "Yes",
    sendEmail: "No",
    editHotels: "Yes",
    editAdminRates: "No",
  },
  {
    userName: "superAdmin@tdo.com",
    password: "123",
    supplierName: "Kashif Ayub",
    supplierType: [
      "Hotel Supplier",
      "FIT Package Supplier",
      "Airline Supplier",
    ],
    supplierAddress: "Dhoke Elahi Buksh PO Nih Chack Shehzad Islamabad",
    telephone: "03113477394",
    country: "Pakistan",
    mobile: "03113477394",
    city: "Islamabad",
    timeZone: -10,
    currency: "630",
    fax: "FAX",
    email: "kayub988@gmail.com",
    reservationEmail: "kayub@gmail.com",
    cancellationEmail: "ka2gmail.com",
    contactPerson1: "CONTACT 1",
    contactPerson2: "CONTACT 2",
    remarks: "",
    openingBalance: "10000",
    jointVenture: "Yes",
    sendEmail: "No",
    editHotels: "Yes",
    editAdminRates: "No",
  },
  {
    userName: "superAdmin@tdo.com",
    password: "123",
    supplierName: "Kashif Ayub",
    supplierType: [
      "Hotel Supplier",
      "FIT Package Supplier",
      "Airline Supplier",
    ],
    supplierAddress: "Dhoke Elahi Buksh PO Nih Chack Shehzad Islamabad",
    telephone: "03113477394",
    country: "Pakistan",
    mobile: "03113477394",
    city: "Islamabad",
    timeZone: -10,
    currency: "630",
    fax: "FAX",
    email: "kayub988@gmail.com",
    reservationEmail: "kayub@gmail.com",
    cancellationEmail: "ka2gmail.com",
    contactPerson1: "CONTACT 1",
    contactPerson2: "CONTACT 2",
    remarks: "",
    openingBalance: "10000",
    jointVenture: "Yes",
    sendEmail: "No",
    editHotels: "Yes",
    editAdminRates: "No",
  },
  {
    userName: "superAdmin@tdo.com",
    password: "123",
    supplierName: "Kashif Ayub",
    supplierType: [
      "Hotel Supplier",
      "FIT Package Supplier",
      "Airline Supplier",
    ],
    supplierAddress: "Dhoke Elahi Buksh PO Nih Chack Shehzad Islamabad",
    telephone: "03113477394",
    country: "Pakistan",
    mobile: "03113477394",
    city: "Islamabad",
    timeZone: -10,
    currency: "630",
    fax: "FAX",
    email: "kayub988@gmail.com",
    reservationEmail: "kayub@gmail.com",
    cancellationEmail: "ka2gmail.com",
    contactPerson1: "CONTACT 1",
    contactPerson2: "CONTACT 2",
    remarks: "",
    openingBalance: "10000",
    jointVenture: "Yes",
    sendEmail: "No",
    editHotels: "Yes",
    editAdminRates: "No",
  },
  {
    userName: "superAdmin@tdo.com",
    password: "123",
    supplierName: "Kashif Ayub",
    supplierType: [
      "Hotel Supplier",
      "FIT Package Supplier",
      "Airline Supplier",
    ],
    supplierAddress: "Dhoke Elahi Buksh PO Nih Chack Shehzad Islamabad",
    telephone: "03113477394",
    country: "Pakistan",
    mobile: "03113477394",
    city: "Islamabad",
    timeZone: -10,
    currency: "630",
    fax: "FAX",
    email: "kayub988@gmail.com",
    reservationEmail: "kayub@gmail.com",
    cancellationEmail: "ka2gmail.com",
    contactPerson1: "CONTACT 1",
    contactPerson2: "CONTACT 2",
    remarks: "",
    openingBalance: "10000",
    jointVenture: "Yes",
    sendEmail: "No",
    editHotels: "Yes",
    editAdminRates: "No",
  },
  {
    userName: "superAdmin@tdo.com",
    password: "123",
    supplierName: "Kashif Ayub",
    supplierType: [
      "Hotel Supplier",
      "FIT Package Supplier",
      "Airline Supplier",
    ],
    supplierAddress: "Dhoke Elahi Buksh PO Nih Chack Shehzad Islamabad",
    telephone: "03113477394",
    country: "Pakistan",
    mobile: "03113477394",
    city: "Islamabad",
    timeZone: -10,
    currency: "630",
    fax: "FAX",
    email: "kayub988@gmail.com",
    reservationEmail: "kayub@gmail.com",
    cancellationEmail: "ka2gmail.com",
    contactPerson1: "CONTACT 1",
    contactPerson2: "CONTACT 2",
    remarks: "",
    openingBalance: "10000",
    jointVenture: "Yes",
    sendEmail: "No",
    editHotels: "Yes",
    editAdminRates: "No",
  },
  {
    userName: "superAdmin@tdo.com",
    password: "123",
    supplierName: "Kashif Ayub",
    supplierType: [
      "Hotel Supplier",
      "FIT Package Supplier",
      "Airline Supplier",
    ],
    supplierAddress: "Dhoke Elahi Buksh PO Nih Chack Shehzad Islamabad",
    telephone: "03113477394",
    country: "Pakistan",
    mobile: "03113477394",
    city: "Islamabad",
    timeZone: -10,
    currency: "630",
    fax: "FAX",
    email: "kayub988@gmail.com",
    reservationEmail: "kayub@gmail.com",
    cancellationEmail: "ka2gmail.com",
    contactPerson1: "CONTACT 1",
    contactPerson2: "CONTACT 2",
    remarks: "",
    openingBalance: "10000",
    jointVenture: "Yes",
    sendEmail: "No",
    editHotels: "Yes",
    editAdminRates: "No",
  },
  {
    userName: "superAdmin@tdo.com",
    password: "123",
    supplierName: "Kashif Ayub",
    supplierType: [
      "Hotel Supplier",
      "FIT Package Supplier",
      "Airline Supplier",
    ],
    supplierAddress: "Dhoke Elahi Buksh PO Nih Chack Shehzad Islamabad",
    telephone: "03113477394",
    country: "Pakistan",
    mobile: "03113477394",
    city: "Islamabad",
    timeZone: -10,
    currency: "630",
    fax: "FAX",
    email: "kayub988@gmail.com",
    reservationEmail: "kayub@gmail.com",
    cancellationEmail: "ka2gmail.com",
    contactPerson1: "CONTACT 1",
    contactPerson2: "CONTACT 2",
    remarks: "",
    openingBalance: "10000",
    jointVenture: "Yes",
    sendEmail: "No",
    editHotels: "Yes",
    editAdminRates: "No",
  },
  {
    userName: "superAdmin@tdo.com",
    password: "123",
    supplierName: "Kashif Ayub",
    supplierType: [
      "Hotel Supplier",
      "FIT Package Supplier",
      "Airline Supplier",
    ],
    supplierAddress: "Dhoke Elahi Buksh PO Nih Chack Shehzad Islamabad",
    telephone: "03113477394",
    country: "Pakistan",
    mobile: "03113477394",
    city: "Islamabad",
    timeZone: -10,
    currency: "630",
    fax: "FAX",
    email: "kayub988@gmail.com",
    reservationEmail: "kayub@gmail.com",
    cancellationEmail: "ka2gmail.com",
    contactPerson1: "CONTACT 1",
    contactPerson2: "CONTACT 2",
    remarks: "",
    openingBalance: "10000",
    jointVenture: "Yes",
    sendEmail: "No",
    editHotels: "Yes",
    editAdminRates: "No",
  },
];

const MastersSuppliersOfflineSuppliersSearch = ({
  setEditOfflineSuppliersData,
}) => {
  const [supplierData, setSupplierData] = useState([]);
  const [originalsupplierData, setOriginalSupplierData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [cityoptions, setCityOptions] = useState([]);
  const [countryoptions, setCountryOptions] = useState([]);

  const getOfflineSuppliers = async () => {
    try {
      setLoading(true);
      // // Set loading to true when fetching data
      // const response = await getDATA(ApiRoutes.SUPPLIERS.OFFLINE.SUPPLIER);
      // if (response.data.statusCode === 200) {
      //   const offlinesuppliers =response && response.data.data ? response.data.data : [];

      setSupplierData(dummyApiData);
      setOriginalSupplierData(dummyApiData);

      setCountryCityOptions(dummyApiData);

      // }

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
    // Format unique cities as an array of objects
    const uniqueCitiesOptions = uniqueCities.map((city) => ({
      label: city,
      value: city,
    }));
    // Add a default option
    uniqueCitiesOptions.unshift({ label: "-Select City-", value: "" });
    // Format unique countries as an array of objects
    const uniqueCountriesOptions = uniqueCountries.map((country) => ({
      label: country,
      value: country,
    }));
    // Add a default option
    uniqueCountriesOptions.unshift({ label: "-Select Country-", value: "" });
    setCountryOptions(uniqueCountriesOptions);
    setCityOptions(uniqueCitiesOptions);
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
  const { currentdata, noofPages } = PaginationSetter(
    currentPage,
    supplierData
  );
  const totalPages = noofPages;
  const currentSuppliers = currentdata;
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <form name="search_area_from">
            <div class="panel-body">
              <div class="row">
                <div class="col-md-3 form-group">
                  <label>Code</label>
                  <input
                    class="form-control form-control-sm test123"
                    type="text"
                    name="supplier_code"
                    value=""
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label>Supplier</label>
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    name="supplier_name"
                    value=""
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label>Username</label>
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    name="supplier_username"
                    value=""
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label>Contact Person</label>
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    name="contact_person"
                    value=""
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-3 form-group">
                  <label>Country</label>
                  <MultiSelect
                    options={countries}
                    isSearchable
                    placeholder="- Select Country -"
                    className="custom-select"
                  />
                  <input
                    type="hidden"
                    name="selected_countries"
                    id="selected_countries"
                    size="40"
                    value=""
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label>Phone</label>
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    name="phone"
                    value=""
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label>Email</label>
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    name="supplier_email"
                    value=""
                    size="30"
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label>Booking Emails</label>
                  <MultiSelect
                    options={bookingemail}
                    isSearchable
                    className="custom-select"
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-3 form-group">
                  <label>Supplier Services</label>
                  <MultiSelect
                    options={supplierServicesOptions}
                    isSearchable
                    placeholder="Hotel"
                    className="custom-select"
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label>Supplier Type</label>
                  <MultiSelect
                    options={suppliertype}
                    isSearchable
                    placeholder="- Select -"
                    className="custom-select"
                  />
                </div>
                <div class="col-md-3 form-group">
                  <label>VCC</label>
                  <MultiSelect
                    options={vcc}
                    isSearchable
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
                    className="custom-select"
                  />
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-md-3 form-group">
                  <button
                    class="btn btn-dark btn-sm"
                    type="button"
                    onclick="GetSupplier('no');"
                    value="Search"
                  >
                    <i class="fa fa-search"></i> Search
                  </button>
                </div>
              </div>
            </div>
          </form>
          <br />
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
                      <div id="search_sup_filter" className="dataTables_filter">
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
                            type="search"
                            className="form-control input-sm"
                            placeholder
                            aria-controls="search_creadit_note"
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
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="search_sup"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Code: activate to sort column ascending"
                                style={{ width: "57.2px" }}
                              >
                                Code
                              </th>
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
                                  <td>S000000892</td>
                                  <td>{supplier.supplierName}</td>
                                  <td>{supplier.userName}</td>
                                  <td>{supplier.contactPerson1}</td>
                                  <td>{supplier.supplierAddress}</td>
                                  <td>{supplier.phone}</td>
                                  <td style={{ lineHeight: "20px" }}>
                                    {supplier.email}
                                  </td>
                                  <td>{supplier.bookingemail}</td>
                                  <td></td>
                                  <td>{supplier.supplierType.join("\n")}</td>
                                  <td>NO</td>
                                  <td>NO</td>
                                  <td className="actionlink">
                                    <div className="actionCont col4">
                                      <div className="input-group-addon">
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .MASTERSSUPPLIERSOFFLINESUPPLIERSCHANGEPASSWORD
                                          }
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title
                                          data-original-title="Change Password"
                                        >
                                          {" "}
                                          <i className="fa fa-key" />
                                        </Link>
                                      </div>
                                      <div className="input-group-addon">
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .MASTERSSUPPLIERSOFFLINESUPPLIERSEDIT
                                          }
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title
                                          data-original-title="Edit"
                                        >
                                          <i className="fa fa-pencil-square-o" />
                                        </Link>
                                      </div>
                                      <div className="input-group-addon">
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .MASTERSSUPPLIERSOFFLINESUPPLIERSVIEW
                                          }
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title
                                          data-original-title="View"
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
                                          onclick='uploadDocument("S000000892")'
                                        >
                                          <i className="fa fa-upload" />
                                        </Link>
                                      </div>
                                      <div className="input-group-addon">
                                        <Link
                                          to="edit_local_supplier.php?action=hide&id=S000000892&supplier_code=&supplier_name=&supplier_username=&contact_person=&address=&phone=&supplier_email=&send_email="
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title
                                          data-original-title="Click to Deactivate"
                                        >
                                          <i className="fa fa-check-circle" />
                                        </Link>
                                      </div>
                                      <div className="input-group-addon">
                                        <Link
                                          to="search_local_suppliers.php?action=deactivate_user&id=S000000892&supplier_code=&supplier_name=&supplier_username=&contact_person=&address=&phone=&supplier_email=&send_email="
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title
                                          data-original-title="Click to Deactivate Account"
                                        >
                                          <i
                                            className="fa fa-user"
                                            style={{ color: "green" }}
                                            aria-hidden="true"
                                          />
                                        </Link>
                                      </div>
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
                                              .MASTERSSUPPLIERSOFFLINESUPPLIERSVCCSETTING
                                          }
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title
                                          data-original-title="VCC Setting"
                                        >
                                          <i className="fa fa-cog" />
                                        </Link>
                                      </div>
                                      <Link
                                        to="vcc_setting_local_supplier.php?id=S000000892&supplier_code=&supplier_name=&supplier_username=&contact_person=&address=&phone=&supplier_email=&send_email="
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title
                                        data-original-title="VCC Setting"
                                      ></Link>
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
                                              .MASTERSSUPPLIERSOFFLINESUPPLIERSTAXREGISTRATION
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
        </div>
      </div>
    </>
  );
};

export default connect(null, { setEditOfflineSuppliersData })(
  MastersSuppliersOfflineSuppliersSearch
);
