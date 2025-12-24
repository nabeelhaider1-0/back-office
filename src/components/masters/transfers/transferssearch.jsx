/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import loadingGif from "../../../assets/images/loadingblue.gif";
import {
  delDATA,
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
import { pickupPointOptions, statusoptions } from "../../../constants/contants";
import { connect } from "react-redux";
import { setEditTransferData } from "../../../state/action/actions";
import ApiRoutes from "../../../constants/ApiRoutes";
const MastersTransfersSearch = ({ setEditTransferData }) => {
  // const [selectAll, setSelectAll] = useState(false);
  const [transferData, setTransferData] = useState([]);
  const [cityoptions, setCityOptions] = useState([]);
  const [countryoptions, setCountryOptions] = useState([]);
  const [originaltransferData, setOriginalTransferData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [formData, setFormData] = useState({
    transferName: "",
    selectedCountry: "",
    selectedCity: "",
    pickupPoint: "",
    dropOffPoint: "",
    status: "",
  });
  const handleEdditClick = (transfer) => {
    setEditTransferData(transfer);
  };
  const getTransfers = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.TRANSFERS.ADD_TRANSFER);
      if (response.data.statusCode === 200) {
        const transfers =
          response && response.data.data ? response.data.data : [];

        setTransferData(transfers);
        setOriginalTransferData(transfers);

        setCountryCityOptions(transfers);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Transfers");
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  // Initialize arrays to store unique cities and countries
  const setCountryCityOptions = async (transfers) => {
    let uniqueCities = [];
    let uniqueCountries = [];
    // Loop through transfers to collect unique values
    transfers.forEach((transfer) => {
      // Collect unique cities
      if (!uniqueCities.includes(transfer.fromCity)) {
        uniqueCities.push(transfer.fromCity);
      }
      if (!uniqueCities.includes(transfer.toCity)) {
        uniqueCities.push(transfer.toCity);
      }

      // Collect unique countries
      if (!uniqueCountries.includes(transfer.pickupCountry)) {
        uniqueCountries.push(transfer.pickupCountry);
      }
      if (!uniqueCountries.includes(transfer.dropoffCountry)) {
        uniqueCountries.push(transfer.dropoffCountry);
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
    getTransfers();
  }, []);

  // const handleSelectAll = () => {
  //   setSelectAll(!selectAll);
  //   const checkboxes = document.querySelectorAll('.select-option');
  //   checkboxes.forEach((checkbox) => {
  //     checkbox.checked = !selectAll;
  //   });
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Transfer?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Transfer has been deleted successfully.",
        ApiRoutes.TRANSFERS.ADD_TRANSFER
      );

      if (isDeleted) {
        setOriginalTransferData((transferdata) =>
          transferdata.filter((transfer) => transfer.uuid !== uuid)
        );
        setTransferData((transferdata) =>
          transferdata.filter((transfer) => transfer.uuid !== uuid)
        );
        setCountryCityOptions(originaltransferData);
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };
  const handleUpdateStatus = async (uuid, status) => {
    try {
      // Make an API call to update the staff's active status

      const response = await putDATA(ApiRoutes.TRANSFERS.ADD_TRANSFER, uuid, {
        status: status,
      });

      // Check the response and handle it accordingly
      if (response.data.statusCode === 200) {
        // Successfully updated staff's active status, update the UI or perform other action
        // Show SweetAlert notification
        SimpleAlert("success", "Success", `Transfer is now ${status}`);

        // Find the transfer with the matching UUID in the original data
        const updatedOriginalTransferData = originaltransferData.map(
          (transfer) =>
            transfer.uuid === uuid ? { ...transfer, status: status } : transfer
        );
        // Set the updated original transfer data back to state
        setOriginalTransferData(updatedOriginalTransferData);
        // Also, update the transfer data displayed on the page
        setTransferData(updatedOriginalTransferData);
        // You may want to fetch the updated staff data or update the local state accordingly
      } else {
        // Handle other response statuses or errors

        // Show SweetAlert notification for error

        SimpleAlert("error", "Error", "Failed to update Transfer status");
      }
    } catch (error) {
      // Handle errors from the API call

      SimpleAlert("error", "Error", "An unexpected error occurred.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredTransfers = originaltransferData.filter((transfer) => {
      // Convert strings to lowercase for case-insensitive comparison
      const lowerTransferName = transfer.transferName.toLowerCase();
      const lowerPickupCountry = transfer.pickupCountry.toLowerCase();
      const lowerDropoffCountry = transfer.dropoffCountry.toLowerCase();
      const lowerFromCity = transfer.fromCity.toLowerCase();
      const lowerToCity = transfer.toCity.toLowerCase();
      const lowerPickupPoint = transfer.pickupPoint.toLowerCase();
      const lowerDropOffPoint = transfer.dropOffPoint.toLowerCase();
      const lowerStatus = transfer.status.toLowerCase();

      // Check if each field matches the corresponding search criteria
      const matchesTransferName = lowerTransferName.includes(
        formData.transferName.toLowerCase()
      );
      const matchesCountry =
        formData.selectedCountry === "" ||
        lowerPickupCountry.includes(
          formData.selectedCountry.value.toLowerCase()
        ) ||
        lowerDropoffCountry.includes(
          formData.selectedCountry.value.toLowerCase()
        );
      const matchesCity =
        formData.selectedCity === "" ||
        lowerFromCity.includes(formData.selectedCity.value.toLowerCase()) ||
        lowerToCity.includes(formData.selectedCity.value.toLowerCase());
      const matchesPickupPoint =
        formData.pickupPoint === "" ||
        lowerPickupPoint.includes(formData.pickupPoint.value.toLowerCase());
      const matchesDropOffPoint =
        formData.dropOffPoint === "" ||
        lowerDropOffPoint.includes(formData.dropOffPoint.value.toLowerCase());
      const matchesStatus =
        formData.status === "" ||
        lowerStatus.includes(formData.status.value.toLowerCase());
      // Return true if all search criteria match
      return (
        matchesTransferName &&
        matchesCountry &&
        matchesCity &&
        matchesPickupPoint &&
        matchesDropOffPoint &&
        matchesStatus
      );
    });

    setTransferData(filteredTransfers);
  };

  const resetform = async () => {
    setTransferData(originaltransferData);
    setFormData({
      transferName: "",
      selectedCountry: "",
      selectedCity: "",
      pickupPoint: "",
      dropOffPoint: "",
      status: "",
    });
  };
  const [checkedItems, setCheckedItems] = useState([]);
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

  const handleActivateorDeActivateStatusClickButton = async (
    activedeactive
  ) => {
    const updateslist = checkedItems.map((uuid) => ({
      uuid,
      status: activedeactive ? "Active" : "In Active",
    }));
    activedeactiveConfiramtionMulti(
      "Are you sure?",
      activedeactive
        ? "You are about to activate selected transfers."
        : "You are about to deactivate selected transfers.",
      "warning", // Icon type (info, warning, error, etc.)
      activedeactive ? "Activate" : "Deactivate", // Text for the confirmation button
      "Cancel", // Text for the cancel button
      "Selected transfers have been activated.", // Text for the success message
      activedeactive ? "Activated!" : "Deactivated!", // Title for the success message
      "success", // Icon type for the success message
      putDataActivate_DeactivateMulti, // Function for making the API call
      updateslist, // Data to be sent in the API call
      ApiRoutes.TRANSFERS.ADD_TRANSFER // API endpoint
    ).then((success) => {
      if (success) {
        const updatedData = originaltransferData.map((transfer) => {
          if (checkedItems.includes(transfer.uuid)) {
            return {
              ...transfer,
              status: activedeactive ? "Active" : "In Active",
            };
          }
          return transfer;
        });

        setOriginalTransferData(updatedData);
        setTransferData(updatedData);
        setCheckedItems([]);
      } else {
        // API call failed or was canceled
      }
    });
  };

  const handleDeleteClickButton = async () => {
    try {
      const isDeleted = await deleteMultiConfirmation(
        "Are You Sure You Want To Delete These Checked Transfers ?",
        "warning",
        "OK",
        "Cancel",
        checkedItems,
        delMultiDATA, // Pass delDATA function as an argument
        "Checked Transfers have been deleted successfully",
        ApiRoutes.TRANSFERS.ADD_TRANSFER
      );

      if (isDeleted) {
        const updatedTransferData = originaltransferData.filter(
          (transfer) => !checkedItems.includes(transfer.uuid)
        );

        setOriginalTransferData(updatedTransferData);
        setTransferData(updatedTransferData);
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
    const filtereData = originaltransferData.filter((transfer) =>
      transfer.transferName.toLowerCase().includes(value.toLowerCase())
    );

    setTransferData(filtereData);
  };
  const { currentdata, noofPages } = PaginationSetter(
    currentPage,
    transferData
  );
  const totalPages = noofPages;
  const currentTransfers = currentdata;
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Header2
        title="SEARCH TRANSFER"
        linkText1="Search Transfer "
        linkText2="Add Transfer"
        link2={Constants.URLConstants.MASTERSTRANSFERSNEW}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          <div className="panel-body">
            <br />
            <div className="row form-group">
              <div className="col-md-2 form-group">
                <label>Transfer Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm test123"
                  name="transferName"
                  id="transferName"
                  value={formData.transferName}
                  onChange={handleInputChange}
                  size={20}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Country</label>
                <MultiSelect
                  options={countryoptions}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select"
                  name="selectedCountry"
                  value={formData.selectedCountry}
                  onChange={(selectedOption) =>
                    setFormData({
                      ...formData,
                      selectedCountry: selectedOption,
                    })
                  }
                  noOptionsMessage={() => "No Country Found"}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>City</label>
                <MultiSelect
                  //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                  options={cityoptions}
                  isSearchable
                  placeholder="- Select City -"
                  className="custom-select"
                  name="selectedCity"
                  value={formData.selectedCity}
                  onChange={(selectedOption) =>
                    setFormData({ ...formData, selectedCity: selectedOption })
                  }
                  noOptionsMessage={() => "No City Found"}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>PickUp Point</label>
                <MultiSelect
                  options={pickupPointOptions}
                  isSearchable
                  placeholder=" Select PickUp Point"
                  className="custom-select"
                  name="pickupPoint"
                  value={formData.pickupPoint}
                  onChange={(selectedOption) =>
                    setFormData({ ...formData, pickupPoint: selectedOption })
                  }
                  noOptionsMessage={() => "No PickUp Found"}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>DropOff Point</label>
                <MultiSelect
                  options={pickupPointOptions}
                  isSearchable
                  placeholder=" Select DropOff Point"
                  className="custom-select"
                  name="dropOffPoint"
                  value={formData.dropOffPoint}
                  onChange={(selectedOption) =>
                    setFormData({ ...formData, dropOffPoint: selectedOption })
                  }
                  noOptionsMessage={() => "No DropOff Found"}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Status</label>
                <MultiSelect
                  options={statusoptions}
                  isSearchable
                  placeholder=" Select Status"
                  className="custom-select"
                  name="status"
                  value={formData.status}
                  onChange={(selectedOption) =>
                    setFormData({ ...formData, status: selectedOption })
                  }
                  noOptionsMessage={() => "No Status Found"}
                />
              </div>
            </div>
            <div className="row mt-4">
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
                  value="Reset"
                  onClick={() => resetform()}
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
                              handleActivateorDeActivateStatusClickButton(true)
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
                              handleActivateorDeActivateStatusClickButton(false)
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
                            placeholder="Transfer Name"
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
                    className="dataTables_wrapper form-inline dt-bootstrap no-footer mt-4"
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
                                  className="no-sort sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "59px" }}
                                >
                                  {/* <div className="checkbox checkbox-success">
                                <input type="checkbox" name="select-all" id="selectAll" onChange={handleSelectAll}
                                  checked={selectAll} />
                                <label />
                              </div> */}
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "190px" }}
                                >
                                  Transfer Name
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "165px" }}
                                >
                                  Pickup Country
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "82px" }}
                                >
                                  Pickup City
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "165px" }}
                                >
                                  Dropoff Country
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "93px" }}
                                >
                                  Dropoff City
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "123px" }}
                                >
                                  PickUp Point
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "123px" }}
                                >
                                  DropOff Point
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "69px" }}
                                >
                                  Status
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "124px" }}
                                >
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {currentTransfers.map((transfer, index) => (
                                <React.Fragment key={index}>
                                  <tr
                                    className={
                                      "phps_row_" +
                                      (index % 2 === 0 ? "0 even" : "1 odd")
                                    }
                                    role="row"
                                  >
                                    <td>
                                      <div className="checkbox checkbox-success">
                                        <input
                                          className="select-option"
                                          type="checkbox"
                                          name="del[]"
                                          checked={checkedItems.includes(
                                            transfer.uuid
                                          )}
                                          onChange={() =>
                                            handleCheckboxChange(transfer.uuid)
                                          }
                                        />
                                        <label />
                                      </div>
                                    </td>
                                    <td>&nbsp;{transfer.transferName}</td>
                                    <td>&nbsp;{transfer.pickupCountry}</td>
                                    <td>&nbsp;{transfer.fromCity}</td>
                                    <td>&nbsp;{transfer.dropoffCountry}</td>
                                    <td>&nbsp;{transfer.toCity}</td>
                                    <td>{transfer.pickupPoint}</td>
                                    <td>{transfer.dropOffPoint}</td>
                                    <td>
                                      <h5>
                                        <span
                                          className={
                                            "td_label " +
                                            (transfer.status === "Active" ||
                                            transfer.status === "true"
                                              ? "label-success"
                                              : "label-default")
                                          }
                                        >
                                          {transfer.status === "Active" ||
                                          transfer.status === "true"
                                            ? "Active"
                                            : "In Active"}
                                        </span>
                                      </h5>
                                    </td>
                                    <td className="actionlink">
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
                                                .MASTERSTRANSFERSSUPPLIERMAPPING
                                            }
                                            target="_blank"
                                          >
                                            <i className="fa fa-exchange" />
                                          </Link>
                                        </div>
                                        {/* <div className="input-group-addon" data-toggle="tooltip" data-placement="top" title="Add Transfer Rates">
                                  <Link to="ContractsTranfersRates.html" target="_blank">
                                    <i className="fa fa-building-o"><small><sub className="fa fa-plus fa-xs" /></small></i>
                                  </Link>
                                </div> */}
                                        <div className="input-group-addon">
                                          <Link
                                            to={
                                              Constants.URLConstants
                                                .MASTERSTRANSFERSEDIT
                                            }
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Edit"
                                            onClick={() =>
                                              handleEdditClick(transfer)
                                            }
                                          >
                                            <i className="fa fa-pencil-square-o" />
                                          </Link>
                                        </div>
                                        <div className="input-group-addon">
                                          <Link
                                            to={
                                              Constants.URLConstants
                                                .MASTERSTRANSFERSVIEW
                                            }
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="View"
                                            onClick={() =>
                                              handleEdditClick(transfer)
                                            }
                                          >
                                            <i className="fa fa-eye" />
                                          </Link>
                                        </div>
                                        <div
                                          className="input-group-addon"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title={
                                            transfer.status === "Active"
                                              ? "Click To Deactivate"
                                              : "Click To Activate"
                                          }
                                        >
                                          {transfer.status === "Active" ||
                                          transfer.status === "true" ? (
                                            <Link
                                              onClick={() => {
                                                handleUpdateStatus(
                                                  transfer.uuid,
                                                  "In Active"
                                                );
                                              }}
                                            >
                                              <i className="fa fa-check-circle"></i>
                                            </Link>
                                          ) : (
                                            <Link
                                              onClick={() => {
                                                handleUpdateStatus(
                                                  transfer.uuid,
                                                  "Active"
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
                                            title="Delete"
                                            onClick={() =>
                                              handleDeleteClick(transfer.uuid)
                                            }
                                          >
                                            <i className="fa fa-trash" />
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

                  <div className="row pd_tp">
                    <div className="row">
                      <div className="col-md-4 col_hide">
                        <div className="form-group col-md-6">&nbsp;</div>
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
    </>
  );
};

export default connect(null, { setEditTransferData })(MastersTransfersSearch);
