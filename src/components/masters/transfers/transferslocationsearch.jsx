/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import MultiSelect from "../../reactMultiSelect";
import Header2 from "../../header2/header2";
import loadingGif from "../../../assets/images/loadingblue.gif";
import { Link } from "react-router-dom";
import Constants from "../../../constants/routes";
import { pickupPointOptions } from "../../../constants/contants";
import {
  ErrorApiAlert,
  PaginationSetter,
  SimpleAlert,
  deleteConfirmation,
} from "../../../constants/globalfunctions";
import { delDATA, getDATA, putDATA } from "../../../Apis/API";
import { connect } from "react-redux";
import { setEditTransferLocationData } from "../../../state/action/actions";
import ApiRoutes from "../../../constants/ApiRoutes";
const MastersTransfersLocationsSearch = ({ setEditTransferLocationData }) => {
  const [transferlocationData, setTransferLocationData] = useState([]);
  const [originaltransferlocationData, setOriginalTransferLocationData] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [cityoptions, setCityOptions] = useState([]);
  const [countryoptions, setCountryOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [formData, setFormData] = useState({
    locationName: "",
    transferType: "",
    country: "",
    city: "",
  });
  const getTransferLocations = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.TRANSFERS.TRANSFER_LOCATION);
      if (response.data.statusCode === 200) {
        const transferslocations =
          response && response.data.data ? response.data.data : [];

        setTransferLocationData(transferslocations);
        setOriginalTransferLocationData(transferslocations);
        setCountryCityOptions(transferslocations);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Transfers Locations");
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
    getTransferLocations();
  }, []);
  const handleEdditClick = (loc) => {
    setEditTransferLocationData(loc);
  };
  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filtereData = originaltransferlocationData.filter((loc) =>
      loc.locationName.toLowerCase().includes(value.toLowerCase())
    );

    setTransferLocationData(filtereData);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const setCountryCityOptions = async (transferslocations) => {
    let uniqueCities = [];
    let uniqueCountries = [];
    // Loop through transfers to collect unique values
    transferslocations.forEach((locations) => {
      // Collect unique cities
      if (!uniqueCities.includes(locations.city)) {
        uniqueCities.push(locations.city);
      }

      // Collect unique countries
      if (!uniqueCountries.includes(locations.country)) {
        uniqueCountries.push(locations.country);
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

  const handleUpdateStatus = async (uuid, status) => {
    try {
      // Make an API call to update the staff's active status

      const response = await putDATA(
        ApiRoutes.TRANSFERS.TRANSFER_LOCATION,
        uuid,
        { status: status === "true" ? false : true }
      );

      // Check the response and handle it accordingly
      if (response.data.statusCode === 200) {
        SimpleAlert(
          "success",
          "Success",
          `Transfer is now ${status === "true" ? "In Active" : "Active"}`
        );

        // Find the transfer with the matching UUID in the original data
        const updatedOriginalTransferLoactionData =
          originaltransferlocationData.map((loaction) =>
            loaction.uuid === uuid
              ? { ...loaction, status: status === "true" ? "false" : "true" }
              : loaction
          );
        // Set the updated original transfer data back to state
        setOriginalTransferLocationData(updatedOriginalTransferLoactionData);
        // Also, update the transfer data displayed on the page
        setTransferLocationData(updatedOriginalTransferLoactionData);
        // You may want to fetch the updated staff data or update the local state accordingly
      } else {
        // Handle other response statuses or errors

        // Show SweetAlert notification for error

        SimpleAlert("error", "Error", "Failed to update Location status");
      }
    } catch (error) {
      // Handle errors from the API call

      SimpleAlert("error", "Error", "An unexpected error occurred.");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredTransfers = originaltransferlocationData.filter(
      (location) => {
        // Convert strings to lowercase for case-insensitive comparison
        const lowerlocationName = (location.locationName || "").toLowerCase();
        const lowerCountry = (location.country || "").toLowerCase();
        const lowerCity = (location.city || "").toLowerCase();
        const lowertransferType = (location.transferType || "").toLowerCase();

        // Check if each field matches the corresponding search criteria
        const matcheslocationName = lowerlocationName.includes(
          (formData.locationName || "").toLowerCase()
        );

        // Check if formData.country is defined before accessing its value property
        const matchesCountry =
          !formData.country ||
          formData.country === "" ||
          lowerCountry.includes((formData.country.value || "").toLowerCase());

        // Check if formData.city is defined before accessing its value property
        const matchesCity =
          !formData.city ||
          formData.city === "" ||
          lowerCity.includes((formData.city.value || "").toLowerCase());

        // Check if formData.transferType is defined before accessing its value property
        const matchestransfertype =
          !formData.transferType ||
          formData.transferType === "" ||
          lowertransferType.includes(
            (formData.transferType.value || "").toLowerCase()
          );

        // Return true if all search criteria match
        return (
          matchesCountry &&
          matchesCity &&
          matchestransfertype &&
          matcheslocationName
        );
      }
    );

    setTransferLocationData(filteredTransfers);
  };

  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Location?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Location has been deleted successfully.",
        ApiRoutes.TRANSFERS.TRANSFER_LOCATION
      );

      if (isDeleted) {
        setOriginalTransferLocationData((location) =>
          location.filter((loc) => loc.uuid !== uuid)
        );
        setTransferLocationData((location) =>
          location.filter((loc) => loc.uuid !== uuid)
        );
        setCountryCityOptions(originaltransferlocationData);
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };
  const resetform = (event) => {
    event.preventDefault();

    // First, set the form data
    setFormData({
      locationName: "",
      transferType: "",
      country: "",
      city: "",
    });
  };

  useEffect(() => {
    // After the form data is updated, set the transfer location data
    setTransferLocationData(originaltransferlocationData);
  }, [formData]);

  const { currentdata, noofPages } = PaginationSetter(
    currentPage,
    transferlocationData
  );
  const totalPages = noofPages;
  const currentTransfersLocations = currentdata;
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Header2 title="SEARCH LOCATION" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onClick={handleSubmit}>
          <input type="hidden" name="f_action" id="f_action" />
          <div className="panel-body">
            <div className="mesID" style={{ display: "none" }}></div>
            <div className="row">
              <div className="col-md-3 form-group">
                <label>Country</label>
                <MultiSelect
                  options={countryoptions}
                  isSearchable
                  placeholder="- Select Country -"
                  name="country"
                  value={formData.country}
                  onChange={(selectedOption) =>
                    setFormData({ ...formData, country: selectedOption })
                  }
                  noOptionsMessage={() => "No Country Found"}
                />
                <img
                  src="images/loader.gif"
                  alt="cri"
                  name="loader"
                  width="20px"
                  height="15px"
                  id="loader"
                  style={{ visibility: "hidden" }}
                />
              </div>
              {/* [START] Added code for row - 7 January 2015 - swapnil nagaonkar */}
              <div className="col-md-3 form-group">
                <label>City</label>
                <MultiSelect
                  //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                  options={cityoptions}
                  isSearchable
                  placeholder="- Select City -"
                  className="custom-select"
                  name="city"
                  value={formData.city}
                  onChange={(selectedOption) =>
                    setFormData({ ...formData, city: selectedOption })
                  }
                />
              </div>
              {/* [END] Ended code for row - 7 January 2015 - swapnil nagaonkar */}
              <div className="col-md-3 form-group">
                <label>Transfer Type </label>
                <MultiSelect
                  options={pickupPointOptions}
                  isSearchable
                  placeholder="- Select Transfer Type -"
                  className="custom-select"
                  value={formData.transferType}
                  onChange={(selectedOption) =>
                    setFormData({ ...formData, transferType: selectedOption })
                  }
                  noOptionsMessage={() => "No Transfer Type Found"}
                />
              </div>

              <div className="col-md-3 form-group">
                <label>Transfer Location Name </label>
                <input
                  className="form-control form-control-sm"
                  name="locationName"
                  id="locationName"
                  value={formData.locationName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 form-group">
                <span id="submit_td">
                  <button className="btn btn-dark btn-sm">
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
        {loading && (
          <div className="text-center">
            <img src={loadingGif} alt="Loading..." height={250} />
          </div>
        )}
        {!loading && (
          <>
            <form className="mt-4">
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
                        <style
                          dangerouslySetInnerHTML={{
                            __html:
                              "\n                                    .table tr[visible='false'],\n                                    .no-result {\n                                        display: none;\n                                        border: 1px solid #ddd;\n                                        padding: 10px;\n                                        margin-top: -2px;\n                                    }\n\n                                    .table tr[visible='true'] {\n                                        display: table-row;\n                                    }\n\n                                    .counter {\n                                        padding: 8px;\n                                        color: #ccc;\n                                    }\n\n                                    .search_new {\n                                        float: right;\n                                        height: 35px;\n                                        margin-bottom: 0px;\n                                        padding-left: 5px;\n                                    }\n                                ",
                          }}
                        />
                        <div
                          className="form-group col-md-2 new_search_icon"
                          style={{ textAlign: "right", paddingRight: "0px" }}
                        >
                          <h5 style={{ display: "inline" }}>
                            <i
                              className="fa fa-search srchWithinPg"
                              id="magnifiers"
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Search within this table"
                            />
                          </h5>
                        </div>
                        <div className="form-group col-md-10 bookingsrc">
                          <input
                            type="text"
                            className="tablesearch form-control form-control-sm search_new"
                            placeholder="Location Name"
                            value={searchInput}
                            onChange={handleInputSearchChange}
                          />
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
                          style={{
                            height: "20px",
                            overflow: "scroll hidden",
                            width: "1320px",
                          }}
                        >
                          <div
                            className="suwala-doubleScroll-scroll"
                            style={{ height: "20px", width: "1320px" }}
                          />
                        </div>
                        <div id="wrapper2" style={{ overflow: "auto" }}>
                          <table
                            id="search_transfer"
                            className="table table-bordered   table-responsive dataTable no-footer"
                            role="grid"
                            aria-describedby="search_transfer_info"
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "192px" }}
                                >
                                  Location Name
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "192px" }}
                                >
                                  Country
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "332px" }}
                                >
                                  City
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "423px" }}
                                >
                                  Tranfer Type
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "223px" }}
                                >
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {currentTransfersLocations.map(
                                (location, index) => (
                                  <React.Fragment key={index}>
                                    <tr
                                      className={
                                        "phps_row_" +
                                        (index % 2 === 0 ? "0 even" : "1 odd")
                                      }
                                      role="row"
                                    >
                                      <td>&nbsp;{location.locationName}</td>
                                      <td>&nbsp;{location.country}</td>
                                      <td>&nbsp;{location.city}</td>
                                      <td>&nbsp; {location.transferType}</td>
                                      <td align="center" className="actionlink">
                                        <div className="actionCont">
                                          <div className="input-group-addon">
                                            <Link
                                              to={
                                                Constants.URLConstants
                                                  .MASTERSTRANSFERSLOCATIONEDIT
                                              }
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title
                                              data-original-title="Edit"
                                              onClick={() =>
                                                handleEdditClick(location)
                                              }
                                            >
                                              <i className="fa fa-pencil-square-o" />
                                            </Link>
                                          </div>
                                          <div className="input-group-addon">
                                            <Link
                                              to={
                                                Constants.URLConstants
                                                  .MASTERSTRANSFERSLOCATIONVIEW
                                              }
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title
                                              data-original-title="View"
                                              onClick={() =>
                                                handleEdditClick(location)
                                              }
                                            >
                                              <i className="fa fa-eye" />
                                            </Link>
                                          </div>
                                          <div
                                            className="input-group-addon"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title=""
                                            data-original-title="Click To Deactivate"
                                          >
                                            {location.status === "true" ? (
                                              <Link
                                                onClick={() => {
                                                  handleUpdateStatus(
                                                    location.uuid,
                                                    location.status
                                                  );
                                                }}
                                              >
                                                <i className="fa fa-check-circle"></i>
                                              </Link>
                                            ) : (
                                              <Link
                                                onClick={() => {
                                                  handleUpdateStatus(
                                                    location.uuid,
                                                    location.status
                                                  );
                                                }}
                                              >
                                                <i className="fa fa-times-circle"></i>
                                              </Link>
                                            )}
                                          </div>
                                          <div className="input-group-addon">
                                            <Link
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title
                                              data-original-title="Delete"
                                              onClick={() =>
                                                handleDeleteClick(location.uuid)
                                              }
                                            >
                                              <i className="fa fa-trash" />
                                            </Link>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </React.Fragment>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* </div> */}
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default connect(null, { setEditTransferLocationData })(
  MastersTransfersLocationsSearch
);
