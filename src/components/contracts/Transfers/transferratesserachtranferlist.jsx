/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import Constants from "../../../constants/routes";
import {
  SelHrsOptions,
  minutesOptions,
  transfer_statusOptions,
} from "../../../constants/contants";
import { delDATA, getDATA, putDATA } from "../../../Apis/API";
import {
  ErrorApiAlert,
  PaginationSetter,
  SimpleAlert,
  deleteConfirmation,
} from "../../../constants/globalfunctions";
import loadingGif from "../../../assets/images/loadingblue.gif";
import { connect } from "react-redux";
import { setEditRates } from "../../../state/action/actions";
import Flatpickr from "react-flatpickr";
import ApiRoutes from "../../../constants/ApiRoutes";

const ContractsTransfersRatesSearchTranferlist = ({ setEditRates }) => {
  const [taransfersratesData, setTransfersRatesData] = useState([]);
  const [originalTransfersRatesData, setOriginalTransfersRatesData] = useState(
    []
  );
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  //  States for search filters
  const [supplierList, setSupplierList] = useState([]);
  const [transfersList, setTransfersList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [rateProfileList, setRateProfileList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [chargeAppliedTypeList, setChargeAppliedTypeList] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [selectedTransfers, setSelectedTransfers] = useState([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const [selectedRateProfiles, setSelectedRateProfiles] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [selectedCharges, setSelectedCharges] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const handleEdditClick = async (transferrate, selectedVehicleuuid) => {
    transferrate.selectedvehicleuuid = selectedVehicleuuid;

    setEditRates(transferrate);
  };

  // MODAL STATES
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // MODAL END

  const extractUuidsWithEmptyVehicleTypeTransfers = (data) => {
    return data
      .filter(
        (item) =>
          item.vehicleTypeTransfers && item.vehicleTypeTransfers.length === 0
      )
      .map((item) => item.uuid);
  };

  const delemptyData = async (data) => {
    data.forEach((entry) => {
      delDATA(ApiRoutes.TRANSFERS.TRANSFER_TARIFF, entry);
    });
  };
  const getAllTransferTariffs = async () => {
    try {
      setLoading(true);
      // // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.TRANSFERS.TRANSFER_TARIFF);
      if (response.data.statusCode === 200) {
        const rates = response && response.data.data ? response.data.data : [];

        const emptyData = extractUuidsWithEmptyVehicleTypeTransfers(rates);
        delemptyData(emptyData);
        const suppliers = rates.map((item) => ({
          value: item.supplier.supplierName,
          label: item.supplier.supplierName,
        }));
        const uniqueSuppliers = Array.from(
          new Set(suppliers.map((item) => item.value))
        ).map((value) => ({
          value,
          label: value,
        }));
        setSupplierList(uniqueSuppliers);

        // Extract unique transfer names
        const transfers = rates.flatMap((item) =>
          item.transfers.map((transfer) => ({
            value: transfer.transferName,
            label: transfer.transferName,
          }))
        );
        const uniqueTransfers = Array.from(
          new Set(transfers.map((item) => item.value))
        ).map((value) => ({
          value,
          label: value,
        }));
        setTransfersList(uniqueTransfers);

        // Extract unique currencies
        const currencies = rates.map((item) => ({
          value: item.currency.currency,
          label: item.currency.currency,
        }));
        const uniqueCurrencies = Array.from(
          new Set(currencies.map((item) => item.value))
        ).map((value) => ({
          value,
          label: value,
        }));
        setCurrencyList(uniqueCurrencies);

        // Extract unique rate profiles
        const rateProfiles = rates.flatMap((item) =>
          item.rateProfile.map((profile) => ({
            value: profile,
            label: profile,
          }))
        );
        const uniqueRateProfiles = Array.from(
          new Set(rateProfiles.map((item) => item.value))
        ).map((value) => ({
          value,
          label: value,
        }));
        setRateProfileList(uniqueRateProfiles);

        // Extract unique vehicle types
        const vehicles = rates.flatMap((item) =>
          item.vehicleTypeTransfers.flatMap((transfer) =>
            transfer.vehicle.map((vehicle) => ({
              value: vehicle.vehicleType,
              label: vehicle.vehicleType,
            }))
          )
        );
        const uniqueVehicles = Array.from(
          new Set(vehicles.map((item) => item.value))
        ).map((value) => ({
          value,
          label: value,
        }));
        setVehicleList(uniqueVehicles);

        // Extract unique charge applied types
        const chargeAppliedTypes = rates.flatMap((item) =>
          item.vehicleTypeTransfers.map((transfer) => ({
            value: transfer.chargeAppliedType,
            label: transfer.chargeAppliedType,
          }))
        );
        const uniqueChargeAppliedTypes = Array.from(
          new Set(chargeAppliedTypes.map((item) => item.value))
        ).map((value) => ({
          value,
          label: value,
        }));
        setChargeAppliedTypeList(uniqueChargeAppliedTypes);
        setTransfersRatesData(rates);
        setOriginalTransfersRatesData(rates);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Transfer Rates");
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering based on supplierName
    const filteredData = originalTransfersRatesData.filter((item) => {
      // Check if supplierName matches
      return (
        item.supplier &&
        item.supplier.supplierName &&
        item.supplier.supplierName.toLowerCase().includes(value.toLowerCase())
      );
    });

    setTransfersRatesData(filteredData);
  };

  useEffect(() => {
    getAllTransferTariffs();
  }, []);

  const handleUpdateStatus = async (uuid, status) => {
    try {
      const response = await putDATA(
        ApiRoutes.TRANSFERS.VEHICLE_TYPE_TRANSFER_TARIFF_STATUS,
        uuid,
        { status: status }
      );

      if (response.data.statusCode === 200) {
        SimpleAlert(
          "success",
          "Success",
          `Transfer Rates is now ${status === true ? "Active" : "In Active"}`
        );

        setOriginalTransfersRatesData(
          originalTransfersRatesData.map((item) => {
            return {
              ...item,
              vehicleTypeTransfers: item.vehicleTypeTransfers.map((subitem) => {
                if (subitem.uuid === uuid) {
                  return { ...subitem, status: status };
                }
                return subitem;
              }),
            };
          })
        );

        setTransfersRatesData(
          taransfersratesData.map((item) => {
            return {
              ...item,
              vehicleTypeTransfers: item.vehicleTypeTransfers.map((subitem) => {
                if (subitem.uuid === uuid) {
                  return { ...subitem, status: status };
                }
                return subitem;
              }),
            };
          })
        );
      } else {
        SimpleAlert("error", "Error", "Failed to Transfer Rates status");
      }
    } catch (error) {
      // Handle errors from the API call

      SimpleAlert("error", "Error", "An unexpected error occurred.");
    }
  };

  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Transfer Rate?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Transfer Rate has been deleted successfully.",
        ApiRoutes.TRANSFERS.VEHICLE_TYPE_TRANSFER_TARIFF
      );

      if (isDeleted) {
        setOriginalTransfersRatesData((transferdata) =>
          transferdata.map((transfer) => ({
            ...transfer,
            vehicleTypeTransfers: transfer.vehicleTypeTransfers.filter(
              (v) => v.uuid !== uuid
            ),
          }))
        );

        setTransfersRatesData((transferdata) =>
          transferdata.map((transfer) => ({
            ...transfer,
            vehicleTypeTransfers: transfer.vehicleTypeTransfers.filter(
              (v) => v.uuid !== uuid
            ),
          }))
        );
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };

  const resetForm = (event) => {
    event.preventDefault();
    setSelectedSuppliers([]);
    setSelectedTransfers([]);
    setSelectedCurrencies([]);
    setSelectedRateProfiles([]);
    setSelectedVehicles([]);
    setSelectedCharges([]);
    setSelectedStatus([]);
    setTransfersRatesData(originalTransfersRatesData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const filteredData = originalTransfersRatesData
      .map((item) => {
        // Initialize matching flags
        let supplierMatch = true;
        let transferMatch = true;
        let currencyMatch = true;
        let rateProfileMatch = true;
        let vehicleTypeMatch = true;
        let statusMatch = true;

        // Check supplier filter
        if (
          selectedSuppliers.value &&
          item.supplier &&
          item.supplier.supplierName
        ) {
          supplierMatch = item.supplier.supplierName
            .toLowerCase()
            .includes(selectedSuppliers.value.toLowerCase());
        }

        // Check transfer filter
        if (selectedTransfers.value && item.transfers) {
          transferMatch = item.transfers.some(
            (transfer) =>
              transfer.transferName &&
              transfer.transferName
                .toLowerCase()
                .includes(selectedTransfers.value.toLowerCase())
          );
        }

        // Check currency filter
        if (
          selectedCurrencies.value &&
          item.currency &&
          item.currency.currencyCode
        ) {
          currencyMatch =
            item.currency.currencyCode.toLowerCase() ===
            selectedCurrencies.value.toLowerCase();
        }

        // Filter vehicleTypeTransfers based on rateProfile and vehicleType
        let filteredVehicleTypeTransfers = item.vehicleTypeTransfers
          ? item.vehicleTypeTransfers.filter((vehicleType) => {
              const rateProfileMatched = selectedRateProfiles.value
                ? vehicleType.vehicleTypeTransferData.rateProfile &&
                  vehicleType.vehicleTypeTransferData.rateProfile.toLowerCase() ===
                    selectedRateProfiles.value.toLowerCase()
                : true;
              const matchedStatus = selectedStatus.value
                ? vehicleType.status !== undefined &&
                  vehicleType.status ===
                    (selectedStatus.value === "I" ? false : true)
                : true;
              const matchedchargeAppliedType = selectedCharges.value
                ? vehicleType.chargeAppliedType &&
                  vehicleType.chargeAppliedType.toLowerCase() ===
                    selectedCharges.value.toLowerCase()
                : true;
              const vehicleTypeMatched = selectedVehicles.value
                ? vehicleType.vehicle.some(
                    (vehicle) =>
                      vehicle.vehicleType &&
                      vehicle.vehicleType
                        .toLowerCase()
                        .includes(selectedVehicles.value.toLowerCase())
                  )
                : true;

              return (
                rateProfileMatched &&
                vehicleTypeMatched &&
                matchedchargeAppliedType &&
                matchedStatus
              );
            })
          : [];

        // Set vehicleTypeMatch and rateProfileMatch based on filtered results
        vehicleTypeMatch = filteredVehicleTypeTransfers.length > 0;
        rateProfileMatch = filteredVehicleTypeTransfers.length > 0;

        // Return item if all filters match
        if (
          supplierMatch &&
          transferMatch &&
          currencyMatch &&
          rateProfileMatch &&
          vehicleTypeMatch &&
          statusMatch
        ) {
          return {
            ...item,
            vehicleTypeTransfers: filteredVehicleTypeTransfers,
          };
        }

        return null;
      })
      .filter((item) => item !== null); // Filter out items that did not match

    setTransfersRatesData(filteredData);
  };
  const { currentdata, noofPages } = PaginationSetter(
    currentPage,
    taransfersratesData
  );
  const totalPages = noofPages;
  const currentTransferRates = currentdata;
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Header2 title="TRANSFER LIST" linkText1="Search Transfer Tariff" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form
            name="search_transfer_form"
            onSubmit={handleSubmit}
            onReset={resetForm}
          >
            <div
              className="panel-body"
              style={{ marginLeft: "15px", marginRight: "15px" }}
            >
              <input
                type="hidden"
                name="tranfer_id"
                id="transfer_id"
                defaultValue={95}
              />
              <input
                type="hidden"
                name="supplier_id"
                id="supplier_id"
                defaultValue="S000000003"
              />
              <input type="hidden" name="next" id="nextPaginate" />

              <div className="row">
                <div className="col-md-3 form-group">
                  <label>Supplier</label>
                  <MultiSelect
                    options={supplierList}
                    isSearchable
                    placeholder="- Select Supplier -"
                    className="custom-select"
                    noOptionsMessage={() => "No Supplier Found"}
                    value={selectedSuppliers}
                    onChange={setSelectedSuppliers}
                  />
                </div>

                <div className="col-md-3 form-group">
                  <label>Transfer</label>
                  <MultiSelect
                    options={transfersList}
                    isSearchable
                    placeholder="- Select Transfer -"
                    className="custom-select"
                    noOptionsMessage={() => "No Transfer Found"}
                    value={selectedTransfers}
                    onChange={setSelectedTransfers}
                  />
                </div>

                <div className="col-md-3 form-group">
                  <label>Currency</label>
                  <MultiSelect
                    options={currencyList}
                    isSearchable
                    placeholder="- Select Currency -"
                    className="custom-select"
                    noOptionsMessage={() => "No Currency Found"}
                    value={selectedCurrencies}
                    onChange={setSelectedCurrencies}
                  />
                </div>

                <div className="col-md-3 form-group">
                  <label>Rate Profile</label>
                  <MultiSelect
                    options={rateProfileList}
                    isSearchable
                    placeholder="- Select Rate -"
                    className="custom-select"
                    noOptionsMessage={() => "No Rate Found"}
                    value={selectedRateProfiles}
                    onChange={setSelectedRateProfiles}
                  />
                </div>

                <div className="col-md-3 form-group mt-2">
                  <label>Vehicle Type</label>
                  <MultiSelect
                    options={vehicleList}
                    isSearchable
                    placeholder="- Select Vehicle Type -"
                    className="custom-select"
                    noOptionsMessage={() => "No Vehicle Type Found"}
                    value={selectedVehicles}
                    onChange={setSelectedVehicles}
                  />
                </div>

                <div className="col-md-3 form-group mt-2">
                  <label>Charge Applied</label>
                  <MultiSelect
                    options={chargeAppliedTypeList}
                    isSearchable
                    placeholder="- Select Charge Applied -"
                    className="custom-select"
                    noOptionsMessage={() => "No Charge Applied Found"}
                    value={selectedCharges}
                    onChange={setSelectedCharges}
                  />
                </div>

                <div className="col-md-3 form-group mt-2">
                  <label>Status</label>
                  <MultiSelect
                    options={transfer_statusOptions}
                    isSearchable
                    placeholder="- Select Status -"
                    className="custom-select"
                    noOptionsMessage={() => "No Status Found"}
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                  />
                </div>
              </div>
              <div className="col-md-2 form-group mt-4">
                <span id="submit_td">
                  <button className="btn btn-dark btn-sm" type="submit">
                    <i className="fa fa-search" aria-hidden="true"></i> Search
                  </button>
                </span>
                &nbsp;&nbsp;
                <button
                  className="btn btn-outline-secondary btn-sm"
                  type="reset"
                >
                  <i className="fa fa-repeat" /> &nbsp;Reset
                </button>
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
                    <div
                      id="search_sup_wrapper"
                      className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                    >
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
                                  type="search"
                                  className="form-control input-sm"
                                  placeholder="Supplier"
                                  aria-controls="search_creadit_note"
                                  value={searchInput}
                                  onChange={handleInputSearchChange}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
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
                              id="search_sup"
                              className="table table-bordered   table-responsive dataTable no-footer"
                              role="grid"
                              aria-describedby="search_sup_info"
                            >
                              <thead>
                                <tr role="row">
                                  {/* <th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '58.2px' }}> */}
                                  {/* <div className="checkbox checkbox-success checkbox-inline">
                                  <input type="checkbox" id="selectAll" name="select-all" onChange={handleSelectAll}
                                    checked={selectAll} />
                                  <label htmlFor="select_all_check" />
                                </div> */}
                                  {/* </th> */}
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "104.2px" }}
                                  >
                                    Supplier
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "139.2px" }}
                                  >
                                    Transfer
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "100.2px" }}
                                  >
                                    Currency
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "105.2px" }}
                                  >
                                    Rate Profile
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "200.2px" }}
                                  >
                                    Vehicle Type
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "144.2px" }}
                                  >
                                    Charge Applied Type
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "144.2px" }}
                                  >
                                    Package Rate
                                  </th>

                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "87.2px" }}
                                  >
                                    Period From
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "86.2px" }}
                                  >
                                    Period To
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "175.2px" }}
                                  >
                                    Adult Rate
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "175.2px" }}
                                  >
                                    Child Rate
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "89.2px" }}
                                  >
                                    Vehicle Rate
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "56.2px" }}
                                  >
                                    Status
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "123px" }}
                                  >
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {currentTransferRates.map((rates, index) => (
                                  <React.Fragment key={index}>
                                    {rates.vehicleTypeTransfers.map(
                                      (ratesdata, index1) => (
                                        <React.Fragment key={index1}>
                                          <tr
                                            role="row"
                                            className={
                                              "phps_row_" +
                                              (index1 % 2 === 0
                                                ? "0 even"
                                                : "1 odd")
                                            }
                                          >
                                            <td>
                                              {rates.supplier.supplierName}
                                            </td>
                                            <td>
                                              {rates.transfers.map(
                                                (transferdata, indexa) => (
                                                  <div>
                                                    {transferdata.transferName}
                                                  </div>
                                                )
                                              )}
                                            </td>
                                            <td>{rates.currency.currency}</td>
                                            <td>
                                              {
                                                ratesdata
                                                  .vehicleTypeTransferData
                                                  .rateProfile
                                              }
                                            </td>
                                            <td>
                                              {ratesdata.vehicle[0].vehicleType}
                                            </td>
                                            <td>
                                              {ratesdata.chargeAppliedType}
                                            </td>{" "}
                                            <td>
                                              {rates.rateType === "PACKAGE RATE"
                                                ? "YES"
                                                : rates.rateType ===
                                                  "FIT RATE & PACKAGE RATE"
                                                ? "BOTH"
                                                : "NO"}
                                              &nbsp;
                                            </td>
                                            <td>{rates.periodFrom}&nbsp;</td>
                                            <td>{rates.periodTo}&nbsp;</td>
                                            <td>
                                              {" "}
                                              {ratesdata.vehicleTypeTransferData
                                                .adult &&
                                              ratesdata.vehicleTypeTransferData
                                                .adult.length > 0 ? (
                                                <div>
                                                  {ratesdata.vehicleTypeTransferData.adult.map(
                                                    (item, index) => (
                                                      <div key={index1}>
                                                        {`${item.adultfrom} TO ${item.adultto} => ${item.adultrateperpax}`}{" "}
                                                      </div>
                                                    )
                                                  )}
                                                </div>
                                              ) : (
                                                <div></div>
                                              )}{" "}
                                            </td>
                                            <td>
                                              {" "}
                                              {ratesdata.vehicleTypeTransferData
                                                .child &&
                                              ratesdata.vehicleTypeTransferData
                                                .child.length > 0 ? (
                                                <div>
                                                  {ratesdata.vehicleTypeTransferData.child.map(
                                                    (item, index) => (
                                                      <div key={index}>
                                                        {`${item.childfrom} TO ${item.childto} => ${item.childrate}`}{" "}
                                                      </div>
                                                    )
                                                  )}
                                                </div>
                                              ) : (
                                                <div></div>
                                              )}{" "}
                                            </td>
                                            <td>
                                              {
                                                ratesdata
                                                  .vehicleTypeTransferData
                                                  .ratePerVehicle
                                              }{" "}
                                            </td>
                                            <td id="tariff_status_350">
                                              {ratesdata.status === true
                                                ? "ACTIVE"
                                                : "IN ACTIVE"}
                                            </td>
                                            <td className="actionlink">
                                              <input
                                                type="hidden"
                                                name="tariff_id"
                                                id="tariff_id_350"
                                                defaultValue={350}
                                              />
                                              <input
                                                type="hidden"
                                                name="tariff_time_stamp"
                                                id="tariff_time_stamp_350"
                                                defaultValue="5de38cc9e00d8b1cb294699d30aad71f"
                                              />
                                              <input
                                                type="hidden"
                                                name="search_string"
                                                id="search_string"
                                                defaultValue="Search_supplier=S000000003&Search_transfer=95&Search_veh_model=&Search_rate_pro=&Search_currency=&Search_vehicle=&Search_charge_appl=&Search_status=&Search_transfer=95"
                                              />
                                              <div className="actionCont">
                                                <div
                                                  className="input-group-addon"
                                                  data-toggle="tooltip"
                                                  title="Add Tariff Surcharge"
                                                >
                                                  <Link
                                                    data-placement="top"
                                                    border={0}
                                                    alt="Add Tariff Surcharge"
                                                    onClick={handleButtonClick}
                                                  >
                                                    <i className="fa fa-money" />
                                                  </Link>
                                                </div>
                                                <div className="input-group-addon">
                                                  <Link
                                                    to={
                                                      Constants.URLConstants
                                                        .CONTRACTSEDITTRANSFERSRATESLIST
                                                    }
                                                    title="Edit"
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    onClick={() =>
                                                      handleEdditClick(
                                                        rates,
                                                        ratesdata.uuid
                                                      )
                                                    }
                                                  >
                                                    <i className="fa fa-pencil-square-o" />
                                                  </Link>
                                                </div>
                                                <div
                                                  className="input-group-addon"
                                                  data-toggle="tooltip"
                                                  data-placement="top"
                                                  title={
                                                    ratesdata.status === true
                                                      ? "Click To Deactivate"
                                                      : "Click To Activate"
                                                  }
                                                >
                                                  {ratesdata.status === true ? (
                                                    <Link
                                                      onClick={() => {
                                                        handleUpdateStatus(
                                                          ratesdata.uuid,
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
                                                          ratesdata.uuid,
                                                          true
                                                        );
                                                      }}
                                                    >
                                                      <i className="fa fa-times-circle"></i>
                                                    </Link>
                                                  )}
                                                </div>
                                                <div className="input-group-addon">
                                                  <span
                                                    style={{
                                                      cursor: "pointer",
                                                    }}
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    border={0}
                                                    onClick={() =>
                                                      handleDeleteClick(
                                                        ratesdata.uuid
                                                      )
                                                    }
                                                    title="Delete"
                                                  >
                                                    <i className="fa fa-trash" />
                                                  </span>
                                                </div>
                                              </div>
                                              <table>
                                                <tbody className="bg-white">
                                                  <tr></tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </React.Fragment>
                                      )
                                    )}
                                  </React.Fragment>
                                ))}
                              </tbody>
                            </table>
                            {showModal && (
                              <div className="modal-wrapper-theme">
                                <div className="modal-theme">
                                  <div className="modal-header-theme">
                                    <h5 className="modal-title-theme">
                                      ADD TARIFF SURCHARGE
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
                                  <div className="modal-body-theme">
                                    {/* Form with text fields, textarea, checkbox, and add button */}

                                    <div className="container-fluid">
                                      <form name="search_area_from">
                                        <div className="panel-body removeMargins">
                                          <div className="dataTables_scroll">
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
                                                  ></div>
                                                  <div
                                                    id="wrapper2"
                                                    style={{ overflow: "auto" }}
                                                  >
                                                    <table
                                                      id="search_transfer"
                                                      className="table table-bordered   table-responsive dataTable no-footer"
                                                      role="grid"
                                                      aria-describedby="search_transfer_info"
                                                    >
                                                      <thead>
                                                        <tr role="row">
                                                          <th
                                                            className="sorting_asc"
                                                            tabIndex={0}
                                                            aria-controls="search_transfer"
                                                            rowSpan={1}
                                                            colSpan={1}
                                                            aria-sort="ascending"
                                                            aria-label="Currency Name: activate to sort column descending"
                                                            style={{
                                                              width: "250.2px",
                                                            }}
                                                          >
                                                            Date
                                                          </th>
                                                          <th
                                                            className="sorting"
                                                            tabIndex={0}
                                                            aria-controls="search_transfer"
                                                            rowSpan={1}
                                                            colSpan={1}
                                                            aria-label="Currency Code: activate to sort column ascending"
                                                            style={{
                                                              width: "250.2px",
                                                            }}
                                                          >
                                                            From
                                                          </th>
                                                          <th
                                                            className="sorting"
                                                            tabIndex={0}
                                                            aria-controls="search_transfer"
                                                            rowSpan={1}
                                                            colSpan={1}
                                                            aria-label="Action: activate to sort column ascending"
                                                            style={{
                                                              width: "250.2px",
                                                            }}
                                                          >
                                                            To
                                                          </th>
                                                          <th
                                                            className="sorting"
                                                            tabIndex={0}
                                                            aria-controls="search_transfer"
                                                            rowSpan={1}
                                                            colSpan={1}
                                                            aria-label="Action: activate to sort column ascending"
                                                            style={{
                                                              width: "250.2px",
                                                            }}
                                                          >
                                                            Percentage
                                                          </th>
                                                        </tr>
                                                      </thead>
                                                      <tbody className="bg-white">
                                                        <tr
                                                          role="row"
                                                          className="phps_row_0 even"
                                                        >
                                                          <td>
                                                            <div
                                                              className="input-daterange input-group date"
                                                              id="datetimepicker6"
                                                            >
                                                              <Flatpickr
                                                                // value={startDate}
                                                                // onChange={(date) => setStartDate(date)}
                                                                options={{
                                                                  dateFormat:
                                                                    "Y-m-d",
                                                                }}
                                                                style={{
                                                                  width: "50px",
                                                                }}
                                                              />

                                                              <span class="input-group-addon">
                                                                to
                                                              </span>
                                                              <Flatpickr
                                                                // value={endDate}
                                                                // onChange={(date) => setEndDate(date)}
                                                                options={{
                                                                  dateFormat:
                                                                    "Y-m-d",
                                                                }}
                                                                style={{
                                                                  width: "50px",
                                                                }}
                                                              />
                                                              <span
                                                                className="input-group-addon"
                                                                id="aTrashBtn"
                                                                // onClick={handleTrashClick}
                                                              >
                                                                <i className="fa fa-trash" />
                                                              </span>
                                                            </div>
                                                          </td>

                                                          <td>
                                                            <select className="select-field">
                                                              {SelHrsOptions.map(
                                                                (option) => (
                                                                  <option
                                                                    key={
                                                                      option.value
                                                                    }
                                                                    value={
                                                                      option.value
                                                                    }
                                                                  >
                                                                    {
                                                                      option.label
                                                                    }
                                                                  </option>
                                                                )
                                                              )}
                                                            </select>
                                                          </td>
                                                          <td>
                                                            <select className="select-field">
                                                              {minutesOptions.map(
                                                                (option) => (
                                                                  <option
                                                                    key={
                                                                      option.value
                                                                    }
                                                                    value={
                                                                      option.value
                                                                    }
                                                                  >
                                                                    {
                                                                      option.label
                                                                    }
                                                                  </option>
                                                                )
                                                              )}
                                                            </select>
                                                          </td>
                                                          <td>
                                                            <div className="radioline1">
                                                              <div className="radio radio-success radio-inline">
                                                                <input
                                                                  type="radio"
                                                                  name="status" // This should match the key in formData
                                                                  id="chk_active"
                                                                  value="true" // Set value for "Active"
                                                                  // checked={formData.status === true}  // Check if status is "Active"
                                                                  // onChange={handleInputChange}  // Call handleInputChange function on change
                                                                />
                                                                <label htmlFor="chk_active">
                                                                  (%)
                                                                </label>
                                                              </div>
                                                              <div className="radio radio-success radio-inline">
                                                                <input
                                                                  type="radio"
                                                                  name="status" // This should match the key in formData
                                                                  id="app"
                                                                  value="false" // Set value for "Inactive"
                                                                  // checked={formData.status === false}  // Check if status is "Inactive"
                                                                  // onChange={handleInputChange}  // Call handleInputChange function on change
                                                                />
                                                                <label htmlFor="chk_inactive">
                                                                  AMT
                                                                </label>
                                                              </div>
                                                              <div className="radio radio-success radio-inline">
                                                                <input
                                                                  type="text"
                                                                  className="form-control"
                                                                  //  onChange={(e) => handleAdultChange(adultRow.id, 'adultTo', e.target.value)}
                                                                />
                                                              </div>
                                                            </div>
                                                          </td>
                                                        </tr>
                                                        <tr
                                                          role="row"
                                                          className="phps_row_1 odd"
                                                        >
                                                          <td>
                                                            <div
                                                              className="input-daterange input-group date"
                                                              id="datetimepicker6"
                                                            >
                                                              <Flatpickr
                                                                // value={startDate}
                                                                // onChange={(date) => setStartDate(date)}
                                                                options={{
                                                                  dateFormat:
                                                                    "Y-m-d",
                                                                }}
                                                                style={{
                                                                  width: "50px",
                                                                }}
                                                              />

                                                              <span class="input-group-addon">
                                                                to
                                                              </span>
                                                              <Flatpickr
                                                                // value={endDate}
                                                                // onChange={(date) => setEndDate(date)}
                                                                options={{
                                                                  dateFormat:
                                                                    "Y-m-d",
                                                                }}
                                                                style={{
                                                                  width: "50px",
                                                                }}
                                                              />
                                                              <span
                                                                className="input-group-addon"
                                                                id="aTrashBtn"
                                                                // onClick={handleTrashClick}
                                                              >
                                                                <i className="fa fa-trash" />
                                                              </span>
                                                            </div>
                                                          </td>

                                                          <td>
                                                            <select className="select-field">
                                                              {SelHrsOptions.map(
                                                                (option) => (
                                                                  <option
                                                                    key={
                                                                      option.value
                                                                    }
                                                                    value={
                                                                      option.value
                                                                    }
                                                                  >
                                                                    {
                                                                      option.label
                                                                    }
                                                                  </option>
                                                                )
                                                              )}
                                                            </select>
                                                          </td>
                                                          <td>
                                                            <select className="select-field">
                                                              {minutesOptions.map(
                                                                (option) => (
                                                                  <option
                                                                    key={
                                                                      option.value
                                                                    }
                                                                    value={
                                                                      option.value
                                                                    }
                                                                  >
                                                                    {
                                                                      option.label
                                                                    }
                                                                  </option>
                                                                )
                                                              )}
                                                            </select>
                                                          </td>
                                                          <td>
                                                            <div className="radioline1">
                                                              <div className="radio radio-success radio-inline">
                                                                <input
                                                                  type="radio"
                                                                  name="status" // This should match the key in formData
                                                                  id="chk_active"
                                                                  value="true" // Set value for "Active"
                                                                  // checked={formData.status === true}  // Check if status is "Active"
                                                                  // onChange={handleInputChange}  // Call handleInputChange function on change
                                                                />
                                                                <label htmlFor="chk_active">
                                                                  (%)
                                                                </label>
                                                              </div>
                                                              <div className="radio radio-success radio-inline">
                                                                <input
                                                                  type="radio"
                                                                  name="status" // This should match the key in formData
                                                                  id="app"
                                                                  value="false" // Set value for "Inactive"
                                                                  // checked={formData.status === false}  // Check if status is "Inactive"
                                                                  // onChange={handleInputChange}  // Call handleInputChange function on change
                                                                />
                                                                <label htmlFor="chk_inactive">
                                                                  AMT
                                                                </label>
                                                              </div>
                                                              <div className="radio radio-success radio-inline">
                                                                <input
                                                                  type="text"
                                                                  className="form-control"
                                                                  //  onChange={(e) => handleAdultChange(adultRow.id, 'adultTo', e.target.value)}
                                                                />
                                                              </div>
                                                            </div>
                                                          </td>
                                                        </tr>
                                                        <tr
                                                          role="row"
                                                          className="phps_row_0 even"
                                                        >
                                                          <td>
                                                            <div
                                                              className="input-daterange input-group date"
                                                              id="datetimepicker6"
                                                            >
                                                              <Flatpickr
                                                                // value={startDate}
                                                                // onChange={(date) => setStartDate(date)}
                                                                options={{
                                                                  dateFormat:
                                                                    "Y-m-d",
                                                                }}
                                                                style={{
                                                                  width: "50px",
                                                                }}
                                                              />

                                                              <span class="input-group-addon">
                                                                to
                                                              </span>
                                                              <Flatpickr
                                                                // value={endDate}
                                                                // onChange={(date) => setEndDate(date)}
                                                                options={{
                                                                  dateFormat:
                                                                    "Y-m-d",
                                                                }}
                                                                style={{
                                                                  width: "50px",
                                                                }}
                                                              />
                                                              <span
                                                                className="input-group-addon"
                                                                id="aTrashBtn"
                                                                // onClick={handleTrashClick}
                                                              >
                                                                <i className="fa fa-trash" />
                                                              </span>
                                                            </div>
                                                          </td>

                                                          <td>
                                                            <select className="select-field">
                                                              {SelHrsOptions.map(
                                                                (option) => (
                                                                  <option
                                                                    key={
                                                                      option.value
                                                                    }
                                                                    value={
                                                                      option.value
                                                                    }
                                                                  >
                                                                    {
                                                                      option.label
                                                                    }
                                                                  </option>
                                                                )
                                                              )}
                                                            </select>
                                                          </td>
                                                          <td>
                                                            <select className="select-field">
                                                              {minutesOptions.map(
                                                                (option) => (
                                                                  <option
                                                                    key={
                                                                      option.value
                                                                    }
                                                                    value={
                                                                      option.value
                                                                    }
                                                                  >
                                                                    {
                                                                      option.label
                                                                    }
                                                                  </option>
                                                                )
                                                              )}
                                                            </select>
                                                          </td>
                                                          <td>
                                                            <div className="radioline1">
                                                              <div className="radio radio-success radio-inline">
                                                                <input
                                                                  type="radio"
                                                                  name="status" // This should match the key in formData
                                                                  id="chk_active"
                                                                  value="true" // Set value for "Active"
                                                                  // checked={formData.status === true}  // Check if status is "Active"
                                                                  // onChange={handleInputChange}  // Call handleInputChange function on change
                                                                />
                                                                <label htmlFor="chk_active">
                                                                  (%)
                                                                </label>
                                                              </div>
                                                              <div className="radio radio-success radio-inline">
                                                                <input
                                                                  type="radio"
                                                                  name="status" // This should match the key in formData
                                                                  id="app"
                                                                  value="false" // Set value for "Inactive"
                                                                  // checked={formData.status === false}  // Check if status is "Inactive"
                                                                  // onChange={handleInputChange}  // Call handleInputChange function on change
                                                                />
                                                                <label htmlFor="chk_inactive">
                                                                  AMT
                                                                </label>
                                                              </div>
                                                              <div className="radio radio-success radio-inline">
                                                                <input
                                                                  type="text"
                                                                  className="form-control"
                                                                  //  onChange={(e) => handleAdultChange(adultRow.id, 'adultTo', e.target.value)}
                                                                />
                                                              </div>
                                                            </div>
                                                          </td>
                                                        </tr>
                                                        <tr
                                                          role="row"
                                                          className="phps_row_1 odd"
                                                        >
                                                          <td>
                                                            <div
                                                              className="input-daterange input-group date"
                                                              id="datetimepicker6"
                                                            >
                                                              <Flatpickr
                                                                // value={startDate}
                                                                // onChange={(date) => setStartDate(date)}
                                                                options={{
                                                                  dateFormat:
                                                                    "Y-m-d",
                                                                }}
                                                                style={{
                                                                  width: "50px",
                                                                }}
                                                              />

                                                              <span class="input-group-addon">
                                                                to
                                                              </span>
                                                              <Flatpickr
                                                                // value={endDate}
                                                                // onChange={(date) => setEndDate(date)}
                                                                options={{
                                                                  dateFormat:
                                                                    "Y-m-d",
                                                                }}
                                                                style={{
                                                                  width: "50px",
                                                                }}
                                                              />
                                                              <span
                                                                className="input-group-addon"
                                                                id="aTrashBtn"
                                                                // onClick={handleTrashClick}
                                                              >
                                                                <i className="fa fa-trash" />
                                                              </span>
                                                            </div>
                                                          </td>

                                                          <td>
                                                            <select className="select-field">
                                                              {SelHrsOptions.map(
                                                                (option) => (
                                                                  <option
                                                                    key={
                                                                      option.value
                                                                    }
                                                                    value={
                                                                      option.value
                                                                    }
                                                                  >
                                                                    {
                                                                      option.label
                                                                    }
                                                                  </option>
                                                                )
                                                              )}
                                                            </select>
                                                          </td>
                                                          <td>
                                                            <select className="select-field">
                                                              {minutesOptions.map(
                                                                (option) => (
                                                                  <option
                                                                    key={
                                                                      option.value
                                                                    }
                                                                    value={
                                                                      option.value
                                                                    }
                                                                  >
                                                                    {
                                                                      option.label
                                                                    }
                                                                  </option>
                                                                )
                                                              )}
                                                            </select>
                                                          </td>
                                                          <td>
                                                            <div className="radioline1">
                                                              <div className="radio radio-success radio-inline">
                                                                <input
                                                                  type="radio"
                                                                  name="status" // This should match the key in formData
                                                                  id="chk_active"
                                                                  value="true" // Set value for "Active"
                                                                  // checked={formData.status === true}  // Check if status is "Active"
                                                                  // onChange={handleInputChange}  // Call handleInputChange function on change
                                                                />
                                                                <label htmlFor="chk_active">
                                                                  (%)
                                                                </label>
                                                              </div>
                                                              <div className="radio radio-success radio-inline">
                                                                <input
                                                                  type="radio"
                                                                  name="status" // This should match the key in formData
                                                                  id="app"
                                                                  value="false" // Set value for "Inactive"
                                                                  // checked={formData.status === false}  // Check if status is "Inactive"
                                                                  // onChange={handleInputChange}  // Call handleInputChange function on change
                                                                />
                                                                <label htmlFor="chk_inactive">
                                                                  AMT
                                                                </label>
                                                              </div>
                                                              <div className="radio radio-success radio-inline">
                                                                <input
                                                                  type="text"
                                                                  className="form-control"
                                                                  //  onChange={(e) => handleAdultChange(adultRow.id, 'adultTo', e.target.value)}
                                                                />
                                                              </div>
                                                            </div>
                                                          </td>
                                                        </tr>
                                                        <tr
                                                          role="row"
                                                          className="phps_row_0 even"
                                                        >
                                                          <td>
                                                            <div
                                                              className="input-daterange input-group date"
                                                              id="datetimepicker6"
                                                            >
                                                              <Flatpickr
                                                                // value={startDate}
                                                                // onChange={(date) => setStartDate(date)}
                                                                options={{
                                                                  dateFormat:
                                                                    "Y-m-d",
                                                                }}
                                                                style={{
                                                                  width: "50px",
                                                                }}
                                                              />

                                                              <span class="input-group-addon">
                                                                to
                                                              </span>
                                                              <Flatpickr
                                                                // value={endDate}
                                                                // onChange={(date) => setEndDate(date)}
                                                                options={{
                                                                  dateFormat:
                                                                    "Y-m-d",
                                                                }}
                                                                style={{
                                                                  width: "50px",
                                                                }}
                                                              />
                                                              <span
                                                                className="input-group-addon"
                                                                id="aTrashBtn"
                                                                // onClick={handleTrashClick}
                                                              >
                                                                <i className="fa fa-trash" />
                                                              </span>
                                                            </div>
                                                          </td>

                                                          <td>
                                                            <select className="select-field">
                                                              {SelHrsOptions.map(
                                                                (option) => (
                                                                  <option
                                                                    key={
                                                                      option.value
                                                                    }
                                                                    value={
                                                                      option.value
                                                                    }
                                                                  >
                                                                    {
                                                                      option.label
                                                                    }
                                                                  </option>
                                                                )
                                                              )}
                                                            </select>
                                                          </td>
                                                          <td>
                                                            <select className="select-field">
                                                              {minutesOptions.map(
                                                                (option) => (
                                                                  <option
                                                                    key={
                                                                      option.value
                                                                    }
                                                                    value={
                                                                      option.value
                                                                    }
                                                                  >
                                                                    {
                                                                      option.label
                                                                    }
                                                                  </option>
                                                                )
                                                              )}
                                                            </select>
                                                          </td>
                                                          <td>
                                                            <div className="radioline1">
                                                              <div className="radio radio-success radio-inline">
                                                                <input
                                                                  type="radio"
                                                                  name="status" // This should match the key in formData
                                                                  id="chk_active"
                                                                  value="true" // Set value for "Active"
                                                                  // checked={formData.status === true}  // Check if status is "Active"
                                                                  // onChange={handleInputChange}  // Call handleInputChange function on change
                                                                />
                                                                <label htmlFor="chk_active">
                                                                  (%)
                                                                </label>
                                                              </div>
                                                              <div className="radio radio-success radio-inline">
                                                                <input
                                                                  type="radio"
                                                                  name="status" // This should match the key in formData
                                                                  id="app"
                                                                  value="false" // Set value for "Inactive"
                                                                  // checked={formData.status === false}  // Check if status is "Inactive"
                                                                  // onChange={handleInputChange}  // Call handleInputChange function on change
                                                                />
                                                                <label htmlFor="chk_inactive">
                                                                  AMT
                                                                </label>
                                                              </div>
                                                              <div className="radio radio-success radio-inline">
                                                                <input
                                                                  type="text"
                                                                  className="form-control"
                                                                  //  onChange={(e) => handleAdultChange(adultRow.id, 'adultTo', e.target.value)}
                                                                />
                                                              </div>
                                                            </div>
                                                          </td>
                                                        </tr>
                                                        <tr
                                                          role="row"
                                                          className="phps_row_1 even"
                                                        >
                                                          <td>
                                                            <div className="checkbox checkbox-success checkbox-inline">
                                                              <input
                                                                id="fd_mon1"
                                                                type="checkbox"
                                                                name="fd_week[]"
                                                                defaultValue="mon"
                                                                className
                                                              />
                                                              <label htmlFor="fd_mon1">
                                                                SHOW NOTE
                                                              </label>
                                                            </div>
                                                          </td>
                                                          <td colSpan={3}>
                                                            <textarea
                                                              // name={`day_description${dayNumber}`}
                                                              // id={`day_description${dayNumber}`}
                                                              className="form-control summernote itinerary_required"
                                                              rows={4}
                                                              defaultValue={""}
                                                            />
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </div>
                                                  <div className="form-group col-md-12 mt-3">
                                                    <button
                                                      className="btn btn-dark btn-sm"
                                                      type="submit"
                                                      name="Submit"
                                                      value="submit"
                                                    >
                                                      <i className="fa fa-floppy-o" />
                                                      &nbsp;Submit
                                                    </button>
                                                    <button
                                                      className="btn btn-dark btn-sm mx-1"
                                                      type="reset"
                                                      name="reset"
                                                      value="Reset"
                                                    >
                                                      <i className="fa fa-plus" />
                                                      &nbsp;Add More
                                                    </button>
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
                                                  <div className="form-group col-md-6">
                                                    &nbsp;
                                                  </div>
                                                </div>
                                                <div className="col-md-5"></div>
                                                <div className="col-md-3 col_hide">
                                                  &nbsp;
                                                </div>
                                              </div>
                                            </div>
                                            <br />
                                            <br />
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
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

export default connect(null, { setEditRates })(
  ContractsTransfersRatesSearchTranferlist
);
