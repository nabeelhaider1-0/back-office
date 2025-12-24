/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";

import loadingGif from "../../../assets/images/loadingblue.gif";
import {
  delMultiDATA,
  getDATA,
  putDATA,
  putDataActivate_DeactivateMulti,
} from "../../../Apis/API";
import {
  ErrorApiAlert,
  PaginationSetter,
  SimpleAlert,
  activedeactiveConfiramtionMulti,
  deleteConfirmation,
  deleteMultiConfirmation,
} from "../../../constants/globalfunctions";
import { setEditToursData } from "../../../state/action/actions";
import { connect } from "react-redux";
import ApiRoutes from "../../../constants/ApiRoutes";

const tourActivityOptions = [
  { label: " - Select Activity Type -", value: 0 },
  { label: "Activities", value: 17 },
  { label: "Flight Ticket", value: 22 },
  { label: "Food", value: 20 },
  { label: "Golf", value: 23 },
  { label: "Insurance Premium Tax", value: 24 },
  { label: "Other", value: 10 },
  { label: "Tickets", value: 11 },
  { label: "Tour", value: 19 },
  { label: "Transportation", value: 18 },
];

const tourActivitySubTypeOptions = [
  { label: " - Select Activity Sub Type -", value: 0 },
  { label: "gggg", value: 11 },
];

const tourCategoryOptions = [
  { label: " - Select Activity Category -", value: 0 },
  { label: "Adventure Trip", value: 8 },
  { label: "bangkok dream world", value: 2 },
  { label: "ferrari world", value: 1 },
  { label: "Fishing", value: 5 },
  { label: "Monumant", value: 4 },
  { label: "Palace", value: 7 },
  { label: "Religous", value: 9 },
  { label: "Safari", value: 6 },
  { label: "Shopping Mall", value: 3 },
  { label: "vvvv", value: 12 },
];

const transferIncludedOptions = [
  { label: "Select Transfer Included", value: "" },
  { label: "YES", value: "Y" },
  { label: "NO", value: "N" },
];

const MastersTourAndActivitySearch = ({ setEditToursData }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [toursData, setToursData] = useState([]);
  const [originaltoursData, setOriginalToursData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [cityoptions, setCityOptions] = useState([]);
  const [countryoptions, setCountryOptions] = useState([]);
  const handleEdditClick = (tour) => {
    setEditToursData(tour);
  };
  const getTours = async () => {
    try {
      setLoading(true);
      // // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.TOURS_AND_ACTIVITIES.TOURS);
      if (response.data.statusCode === 200) {
        const tours = response && response.data.data ? response.data.data : [];

        setToursData(tours);
        setOriginalToursData(tours);

        setCountryCityOptions(tours);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Tours");
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };

  const setCountryCityOptions = async (tours) => {
    let uniqueCities = [];
    let uniqueCountries = [];
    // Loop through transfers to collect unique values
    tours.forEach((tour) => {
      // Collect unique cities
      if (!uniqueCities.includes(tour.city)) {
        uniqueCities.push(tour.city);
      }

      // Collect unique countries
      if (!uniqueCountries.includes(tour.country)) {
        uniqueCountries.push(tour.country);
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
    getTours();
  }, []);
  // const [selectAll, setSelectAll] = useState(false);

  // const handleSelectAll = () => {
  //   setSelectAll(!selectAll);
  //   const checkboxes = document.querySelectorAll(".select-option");
  //   checkboxes.forEach((checkbox) => {
  //     checkbox.checked = !selectAll;
  //   });
  // };

  const handleDeleteClickButton = async () => {
    try {
      const isDeleted = await deleteMultiConfirmation(
        "Are You Sure You Want To Delete These Checked Tours ?",
        "warning",
        "OK",
        "Cancel",
        checkedItems,
        delMultiDATA, // Pass delDATA function as an argument
        "Checked Tours have been deleted successfully",
        ApiRoutes.TOURS_AND_ACTIVITIES.TOURS
      );

      if (isDeleted) {
        const updatedTransferData = originaltoursData.filter(
          (transfer) => !checkedItems.includes(transfer.uuid)
        );

        setOriginalToursData(updatedTransferData);
        setToursData(updatedTransferData);
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };
  const handleActivateorDeActivateStatusClickButton = async (
    activedeactive
  ) => {
    const updateslist = checkedItems.map((uuid) => ({
      uuid,
      status: activedeactive ? true : false,
    }));
    activedeactiveConfiramtionMulti(
      "Are you sure?",
      activedeactive
        ? "You are about to activate selected tours."
        : "You are about to deactivate selected tours.",
      "warning", // Icon type (info, warning, error, etc.)
      activedeactive ? "Activate" : "Deactivate", // Text for the confirmation button
      "Cancel", // Text for the cancel button
      "Selected Tours have been activated.", // Text for the success message
      activedeactive ? "Activated!" : "Deactivated!", // Title for the success message
      "success", // Icon type for the success message
      putDataActivate_DeactivateMulti, // Function for making the API call
      updateslist, // Data to be sent in the API call
      ApiRoutes.TOURS_AND_ACTIVITIES.TOURS // API endpoint
    ).then((success) => {
      if (success) {
        const updatedData = originaltoursData.map((transfer) => {
          if (checkedItems.includes(transfer.uuid)) {
            return { ...transfer, status: activedeactive ? true : false };
          }
          return transfer;
        });

        setOriginalToursData(updatedData);
        setToursData(updatedData);
        setCheckedItems([]);
      } else {
        // API call failed or was canceled
      }
    });
  };

  const handleCheckboxChange = (uuid) => {
    const isChecked = checkedItems.includes(uuid);
    if (isChecked) {
      // Remove UUID if already checked
      setCheckedItems(checkedItems.filter((item) => item !== uuid));
    } else {
      // Add UUID if not checked
      setCheckedItems([...checkedItems, uuid]);
    }
  };

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filtereData = originaltoursData.filter((tour) =>
      tour.activityTypeUuid.includes(value.toLowerCase())
    );

    setToursData(filtereData);
  };

  const handleUpdateStatus = async (uuid, status) => {
    try {
      // Make an API call to update the staff's active status

      const response = await putDATA(
        ApiRoutes.TOURS_AND_ACTIVITIES.TOURS,
        uuid,
        { status: status }
      );

      // Check the response and handle it accordingly
      if (response.data.statusCode === 200) {
        // Successfully updated staff's active status, update the UI or perform other action
        // Show SweetAlert notification
        SimpleAlert(
          "success",
          "Success",
          `Tour is now ${status === true ? "Active" : "In Active"}`
        );

        // Find the transfer with the matching UUID in the original data
        const updatedOriginalToursData = originaltoursData.map((transfer) =>
          transfer.uuid === uuid ? { ...transfer, status: status } : transfer
        );
        // Set the updated original transfer data back to state
        setOriginalToursData(updatedOriginalToursData);
        // Also, update the transfer data displayed on the page
        setToursData(updatedOriginalToursData);
        // You may want to fetch the updated staff data or update the local state accordingly
      } else {
        // Handle other response statuses or errors

        // Show SweetAlert notification for error

        SimpleAlert("error", "Error", "Failed to update Tour status");
      }
    } catch (error) {
      // Handle errors from the API call

      SimpleAlert("error", "Error", "An unexpected error occurred.");
    }
  };
  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Tour?",
        "warning",
        "OK",
        "Cancel",
        { uuids: [uuid] },
        delMultiDATA, // Pass delDATA function as an argument
        "Tour has been deleted successfully.",
        ApiRoutes.TOURS_AND_ACTIVITIES.TOURS
      );

      if (isDeleted) {
        setOriginalToursData((tourdata) =>
          tourdata.filter((transfer) => transfer.uuid !== uuid)
        );
        setToursData((tourdata) =>
          tourdata.filter((transfer) => transfer.uuid !== uuid)
        );
        setCountryCityOptions(originaltoursData);
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };
  const { currentdata, noofPages } = PaginationSetter(currentPage, toursData);
  const totalPages = noofPages;
  const currentTours = currentdata;
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header2
        title="SEARCH ACTIVITY"
        linkText1="List Activity"
        linkText2="Add Activity"
        link2={Constants.URLConstants.MASTERSTOURSANDACTIVITIESNEW}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form name="search_tour_from" method="get" action="tours.php">
          <input type="hidden" name="action" />
          <input type="hidden" name="Search" defaultValue="N" />
          <div className="panel-body">
            <div className="row">
              <div className="col-md-2 form-group">
                <label>Activity Type</label>
                <MultiSelect
                  options={tourActivityOptions}
                  isSearchable
                  placeholder="- Select Activity Type -"
                  className="custom-select"
                  noOptionsMessage={() => "No Activity Type Found"}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Activity Sub Type</label>
                <MultiSelect
                  options={tourActivitySubTypeOptions}
                  isSearchable
                  placeholder="- Select Activity Sub Type -"
                  className="custom-select"
                  noOptionsMessage={() => "No Activity Sub Type Found"}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Activity Category</label>
                <MultiSelect
                  options={tourCategoryOptions}
                  isSearchable
                  placeholder="- Select Category -"
                  className="custom-select  "
                  noOptionsMessage={() => "No Category Found"}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Activity</label>
                <input
                  type="text"
                  className="form-control form-control-sm colPos"
                  name="Search_tour_name"
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Transfer Included</label>
                <MultiSelect
                  options={transferIncludedOptions}
                  isSearchable
                  placeholder="- Select Transfer -"
                  className="custom-select  "
                  noOptionsMessage={() => "No Transfer Found"}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Country</label>
                <MultiSelect
                  options={countryoptions}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select"
                  noOptionsMessage={() => "No Country Found"}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>City</label>
                <MultiSelect
                  options={cityoptions}
                  isSearchable
                  placeholder="- Select City -"
                  className="custom-select"
                  noOptionsMessage={() => "No City Found"}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12 form-group">
                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  value="Search"
                  id="btn-submit"
                >
                  <i className="fa fa-search" />
                  &nbsp;Search
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
                <div id="tour_div" className="dataTables_scroll">
                  <div
                    id="tbl_tour_wrapper"
                    className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                  >
                    <div className="row mt-4">
                      <div className="row pd_tp ">
                        <div className="row mt-2">
                          <div className="col-md-5">
                            <div className="col-md-12 form-group">
                              <button
                                type="button"
                                onClick={handleDeleteClickButton}
                                className="btn btn-danger btn-sm mx-1"
                                value="Delete"
                                disabled={checkedItems.length === 0} // Disable if no items are checked
                              >
                                <i className="fa fa-trash-o" />
                                &nbsp;Delete
                              </button>
                              <button
                                type="button"
                                value="Activate"
                                className="btn btn-success btn-sm mx-1"
                                name="Activate"
                                onClick={() =>
                                  handleActivateorDeActivateStatusClickButton(
                                    true
                                  )
                                }
                                disabled={checkedItems.length === 0} // Disable if no items are checked
                              >
                                <i
                                  className="fa fa-check-circle"
                                  style={{ color: "white !important" }}
                                />
                                &nbsp;Activate
                              </button>
                              <button
                                type="button"
                                value="Deactivate"
                                className="btn btn-deactivate btn-sm"
                                name="Deactivate"
                                onClick={() =>
                                  handleActivateorDeActivateStatusClickButton(
                                    false
                                  )
                                }
                                disabled={checkedItems.length === 0} // Disable if no items are checked
                              >
                                <i
                                  className="fa fa-times-circle"
                                  style={{ color: "grey !important" }}
                                />
                                &nbsp;Deactivate
                              </button>
                            </div>
                          </div>
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
                                  "\n.table tr[visible='false'],\n.no-result {\n display: none;\nborder: 1px solid #ddd;\npadding: 10px;\n margin-top: -2px;\n }\n\n .table tr[visible='true'] {\n display: table-row;\n                                    }\n\n                                    .counter {\n                                        padding: 8px;\n                                        color: #ccc;\n                                    }\n\n                                    .search_new {\n                                        float: right;\n                                        height: 35px;\n                                        margin-bottom: 0px;\n                                        padding-left: 5px;\n                                    }\n                                ",
                              }}
                            />
                            <div
                              className="form-group col-md-2 new_search_icon"
                              style={{
                                textAlign: "right",
                                paddingRight: "0px",
                              }}
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
                                placeholder="Activity Type"
                                value={searchInput}
                                onChange={handleInputSearchChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
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
                            id="tbl_tour"
                            className="table table-bordered   table-responsive dataTable no-footer"
                            role="grid"
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  className="no-sort sorting_desc"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="
									
									"
                                  style={{ width: "55.2px" }}
                                >
                                  {/* <div className="checkbox checkbox-success">
                                <input
                                  type="checkbox"
                                  name="select-all"
                                  id="selectAll"
                                  onChange={handleSelectAll}
                                  checked={selectAll}
                                />
                                <label />
                              </div> */}
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="&nbsp;Activity Type"
                                  style={{ width: "103.2px" }}
                                >
                                  &nbsp;Activity Type
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="&nbsp;Activity Sub Type"
                                  style={{ width: "133.2px" }}
                                >
                                  &nbsp;Activity Sub Type
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="&nbsp;Activity Category"
                                  style={{ width: "138.2px" }}
                                >
                                  &nbsp;Activity Category
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="tbl_tour"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="&nbsp;Activity: activate to sort column ascending"
                                  style={{ width: "418.2px" }}
                                >
                                  &nbsp;Activity
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="&nbsp;Transfer Included"
                                  style={{ width: "145.2px" }}
                                >
                                  &nbsp;Transfer Included
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="tbl_tour"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="&nbsp;Country: activate to sort column ascending"
                                  style={{ width: "161.2px" }}
                                >
                                  &nbsp;Country
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="tbl_tour"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="&nbsp;City: activate to sort column ascending"
                                  style={{ width: "59.2px" }}
                                >
                                  &nbsp;City
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="&nbsp;Actions"
                                  style={{ width: "125px" }}
                                >
                                  &nbsp;Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {currentTours.map((tour, index) => (
                                <React.Fragment key={index}>
                                  <tr
                                    role="row"
                                    className={
                                      "phps_row_" +
                                      (index % 2 === 0 ? "0 even" : "1 odd")
                                    }
                                  >
                                    <td className="sorting_1">
                                      <div className="checkbox checkbox-success">
                                        <input
                                          className="select-option"
                                          type="checkbox"
                                          name="del[]"
                                          checked={checkedItems.includes(
                                            tour.uuid
                                          )}
                                          onChange={() =>
                                            handleCheckboxChange(tour.uuid)
                                          }
                                        />
                                        <label />
                                      </div>
                                    </td>
                                    <td>{tour.activityTypeUuid}</td>
                                    <td>{tour.subActivityTypeUuid}</td>
                                    <td>{tour.activityCategoryUuid}</td>
                                    <td>
                                      {tour.activityName}
                                      <b>Duration: {tour.duration}</b>
                                      <b>
                                        PAX: {tour.minPax}-{tour.maxPax}
                                      </b>
                                    </td>
                                    <td>{tour.transferInclude}</td>
                                    <td>{tour.country}</td>
                                    <td>{tour.city}</td>
                                    <td>
                                      <div className="actionCont">
                                        <div
                                          className="input-group-addon"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="Map Supplier"
                                        >
                                          <Link
                                            to={
                                              Constants.URLConstants
                                                .MASTERSTOURSANDACTIVITIESMAPPING
                                            }
                                            target="_blank"
                                          >
                                            <i className="fa fa-exchange" />
                                          </Link>
                                        </div>
                                        <div
                                          className="input-group-addon"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="Add Activity Rates"
                                        >
                                          {" "}
                                          <Link
                                            to={
                                              Constants.URLConstants
                                                .CONTRACTSTOURSANDACTIVITIESRATESLIST
                                            }
                                            target="_blank"
                                          >
                                            {" "}
                                            <i className="fa fa-building-o">
                                              <small>
                                                <sub className="fa fa-plus fa-xs" />
                                              </small>
                                            </i>{" "}
                                          </Link>
                                        </div>
                                        <div
                                          className="input-group-addon"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="Edit"
                                        >
                                          {" "}
                                          <Link
                                            to={
                                              Constants.URLConstants
                                                .MASTERSTOURSANDACTIVITIESEDIT
                                            }
                                            onClick={() =>
                                              handleEdditClick(tour)
                                            }
                                          >
                                            {" "}
                                            <i className="fa fa-pencil-square-o" />{" "}
                                          </Link>{" "}
                                        </div>
                                        <div
                                          className="input-group-addon"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="View"
                                        >
                                          {" "}
                                          <Link
                                            to={
                                              Constants.URLConstants
                                                .MASTERSTOURSANDACTIVITIESVIEW
                                            }
                                            onClick={() =>
                                              handleEdditClick(tour)
                                            }
                                          >
                                            {" "}
                                            <i className="fa fa-eye" />{" "}
                                          </Link>{" "}
                                        </div>
                                        <div
                                          className="input-group-addon"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title=""
                                          data-original-title="Click To Deactivate"
                                        >
                                          {tour.status === "true" ||
                                          tour.status === true ? (
                                            <Link
                                              onClick={() => {
                                                handleUpdateStatus(
                                                  tour.uuid,
                                                  "false"
                                                );
                                              }}
                                            >
                                              <i className="fa fa-check-circle"></i>
                                            </Link>
                                          ) : (
                                            <Link
                                              onClick={() => {
                                                handleUpdateStatus(
                                                  tour.uuid,
                                                  "true"
                                                );
                                              }}
                                            >
                                              <i className="fa fa-times-circle"></i>
                                            </Link>
                                          )}
                                        </div>
                                        <div
                                          className="input-group-addon"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="Delete"
                                        >
                                          {" "}
                                          <Link
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title
                                            data-original-title="Delete"
                                            onClick={() =>
                                              handleDeleteClick(tour.uuid)
                                            }
                                          >
                                            <i className="fa fa-trash" />{" "}
                                          </Link>{" "}
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
                  </div>
                  <br />
                  <br />
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default connect(null, { setEditToursData })(
  MastersTourAndActivitySearch
);
