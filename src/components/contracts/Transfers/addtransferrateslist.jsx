/* eslint-disable react-hooks/exhaustive-deps */
import Flatpickr from "react-flatpickr";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";

import {
  rateTypeOptions,
  selLowerAgeOptions,
  selRateProOptions,
} from "../../../constants/contants";
import {
  ErrorApiAlert,
  RequiredFieldAlert,
  SuccessApiToast,
} from "../../../constants/globalfunctions";
import { getDATA, postDATA } from "../../../Apis/API";
import { useEffect } from "react";
import { connect } from "react-redux";
import Constants from "../../../constants/routes";
import uploadFile from "../../../constants/filesuploader";
import ApiRoutes from "../../../constants/ApiRoutes"
const ContractsAddTransfersRateslist = ({ data }) => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date
  const [adultRows, setAdultRows] = useState([
    { id: 1, adultFrom: 1, adultTo: "", adultRate: "", row: 1 },
  ]);
  const [childRows, setChildRows] = useState([
    {
      id: 1,
      childFrom: [],
      childTo: [],
      childRate: "",
      row: 1,
      childChargeType: "amount",
    },
  ]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currencyOptions, setcurrencyOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [transferOptions, setTransferOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedTransfers, setSelectedTransfers] = useState([]);
  const selAgeOptions = [
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    // Add more options as needed
  ];
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const navigateOnRefresh = useNavigate();
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setCityOptions([
        {
          label: `${data.city} - ${data.country}`,
          value: `${data.city} - ${data.country}`,
        },
      ]);

      const options = data.transfers.map((trans) => ({
        value: trans.uuid,
        label: trans.transferName,
      }));

      setTransferOptions(options);
    } else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(
        Constants.URLConstants.CONTRACTSTRANSFERSRATESSEARCHBUTTON
      );
    }
  }, [data, navigateOnRefresh]);
  const handleChildChargeTypeChange = (id, value) => {
    setChildRows((prevChildRows) => {
      const updatedRows = prevChildRows.map((row) =>
        row.row === id ? { ...row, childChargeType: value } : row
      );

      return updatedRows;
    });
  };

  const redirect = async () => {
    navigateOnRefresh(
      Constants.URLConstants.CONTRACTSTRANSFERSRATESSEARCHBUTTON
    );
  };

  // Perform checks and redirect in useEffect
  useEffect(() => {
    if (
      !data ||
      data.supplierName === undefined ||
      data.supplierName === null
    ) {
      redirect();
    }
    if (
      !data ||
      data.currentTransfer === undefined ||
      data.currentTransfer === null
    ) {
      redirect();
    }
  }, [data]);
  const getCurrencies = async () => {
    try {
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.CURRENCIES.CURRENCY);
      if (response.data.statusCode === 200) {
        const currencies =
          response && response.data.data ? response.data.data : [];

        const options = currencies.map((curr) => ({
          value: curr.uuid,
          label: curr.currency,
        }));
        setcurrencyOptions(options);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Currencies");
    } finally {
      // Set loading to false after data is fetched (whether successful or not)
    }
  };

  const handleTransferChange = (selectedOptions) => {
    setSelectedTransfers(selectedOptions);
  };

  const handleRemoveLastTransfer = () => {
    setSelectedTransfers((prevSelected) => prevSelected.slice(0, -1));
  };
  const getVehicleTypes = async () => {
    try {
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.VEHICLES.VEHICLE);

      if (response.data.statusCode === 200) {
        const vehicleTypes =
          response && response.data.data ? response.data.data : [];
        const options = vehicleTypes.map((veh) => ({
          value: veh.uuid,
          label: veh.vehicleType,
          maxPassenger: veh.maxPassenger,
        }));
        setVehicleOptions(options);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Vehicle Type");
    } finally {
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  const handleMultiSelectChange = (name, selectedOptions) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOptions,
    }));
  };
  const addAdultRow = (event, rowid) => {
    event.preventDefault();

    // Get the last adult row for the specific rowid
    const lastRowForId = [...adultRows]
      .reverse()
      .find((row) => row.row === rowid);

    // Check if the fields are filled correctly
    if (
      lastRowForId &&
      // lastRowForId.adultFrom && lastRowForId.adultFrom.length > 0 &&
      lastRowForId.adultTo &&
      lastRowForId.adultTo.length > 0
      // &&lastRowForId.adultRate
    ) {
      const newAdultRowId = adultRows.length + 1;
      setAdultRows([
        ...adultRows,
        {
          id: newAdultRowId,
          row: rowid,
          adultFrom: lastRowForId.adultTo,
          adultTo: "",
          adultRate: "",
        },
      ]);
    } else {
      RequiredFieldAlert(
        "Adult To is required",
        "Please fill in the required Adult To field",
        "error"
      );
      return false;
    }
  };

  const removeAdultRow = (event, rowid) => {
    event.preventDefault();
    // Filter out the rows for the given rowid and update the state
    const updatedRows = adultRows.filter(
      (row) => row.row !== rowid || row.id !== adultRows.length
    );
    // Only remove if there's more than one row left for the specific rowid
    if (updatedRows.length !== adultRows.length) {
      setAdultRows(updatedRows);
    }
  };

  const handleAdultChange = (id, field, value) => {
    setAdultRows(
      adultRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const addChildRow = (event, rowid) => {
    event.preventDefault();

    // Find the last child row for the specific rowid
    const lastChildRow = childRows
      .filter((row) => row.row === rowid)
      .slice(-1)[0];

    // Validate the last row's fields
    if (
      lastChildRow &&
      lastChildRow.childFrom.value &&
      lastChildRow.childTo.value &&
      lastChildRow.childRate.trim() !== ""
    ) {
      // Generate a new row with a unique id
      const newChildRow = {
        id: childRows.length + 1,
        row: rowid, // Associate with the parent row id
        childFrom: [],
        childTo: [],
        childRate: "",
        childChargeType: lastChildRow.childChargeType,
      };

      // Update the state with the new row
      setChildRows([...childRows, newChildRow]);
    } else {
      RequiredFieldAlert(
        "Fill all the fields",
        "Please fill in all fields for the last child row before adding a new one.",
        "error"
      );
    }
  };

  const removeChildRow = (event, rowid) => {
    event.preventDefault();
    // Filter out the rows for the given rowid and update the state
    const updatedRows = childRows.filter(
      (row) => row.row !== rowid || row.id !== childRows.length
    );
    // Only remove if there's more than one row left for the specific rowid
    if (updatedRows.length !== childRows.length) {
      setChildRows(updatedRows);
    }
  };

  const handleChildChange = (id, field, value) => {
    // Find the index of the last matching row with the given id
    const lastIndex = childRows
      .map((row, index) => ({ row: row.row, index }))
      .filter((row) => row.row === id)
      .map((row) => row.index)
      .pop(); // Get the index of the last matching row

    // Update only the last matching row with the given field and value
    if (lastIndex !== undefined) {
      setChildRows((prevChildRows) => {
        const updatedChildRows = [...prevChildRows]; // Copy the previous child rows
        updatedChildRows[lastIndex] = {
          ...updatedChildRows[lastIndex],
          [field]: value,
        }; // Update the last matching row
        return updatedChildRows; // Return the updated child rows
      });
    }
  };

  const calculateTotalRate = (rate) => {
    const adultTo = parseFloat(rate.adultTo);
    const adultRate = parseFloat(rate.adultRate);

    if (isNaN(adultTo) || isNaN(adultRate)) {
      return 0;
    } else {
      return adultTo * adultRate; // Example calculation
    }
  };
  const [formData, setFormData] = useState({
    city: "",
    applicableDays: ["Monday"],
    transferuuids: [],
    supplieruuid: "",
    currencyuuid: "",
    rateType: "",
    childagelower: "",
    childageupper: "",
    rateProfile: [],
    status: true,
    emergencyNo: "",
    releasePeriodHours: "",
    remark: "",
    image: "",
    periodFrom: "",
    periodTo: "",
    vehicleTypeTransfersData: [],
  });
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      const updatedValues = checked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value);
      setFormData({ ...formData, [name]: updatedValues });
    } else if (type === "radio") {
      // For radio buttons, directly update the value
      setFormData({ ...formData, [name]: value === "true" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };
  const handleSingleSelectChange = (selectedOption, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption.value, // Assuming the option object has a 'value' property
    }));
  };

  // YourComponent.js

  const [rows, setRows] = useState([
    { id: 1, chargeType: "Private", selectedVehicle: null },
  ]);

  // const addMoreRow = () => {
  //   setRows([...rows, { id: rows.length + 1 , chargeType: 'Private', selectedVehicle: null  }]);
  // };
  const addMoreRow = () => {
    const newRowId = rows.length + 1;

    setRows([
      ...rows,
      { id: newRowId, chargeType: "SIC Basis", selectedVehicle: null },
    ]);
    setAdultRows([
      ...adultRows,
      {
        id: adultRows.length + 1,
        row: newRowId,
        adultFrom: 1,
        adultTo: "",
        adultRate: "",
      },
    ]);
    setChildRows([
      ...childRows,
      {
        id: childRows.length + 1,
        row: newRowId,
        childFrom: "",
        childTo: "",
        childRate: "",
        childChargeType: "amount",
      },
    ]);
  };
  const removeLastRow = () => {
    if (rows.length === 0) return;

    const lastRowId = rows[rows.length - 1].id;

    setRows(rows.slice(0, -1));
    setAdultRows(adultRows.filter((adultRow) => adultRow.row !== lastRowId));
    setChildRows(childRows.filter((childRow) => childRow.row !== lastRowId));
  };
  const handleVehicleChange = (id, selectedOption) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, selectedVehicle: selectedOption } : row
    );
    setRows(updatedRows);
  };

  const handleChargeTypeChange = (id, value) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, chargeType: value } : row
    );
    setRows(updatedRows);
  };
  useEffect(() => {
    getCurrencies();
    getVehicleTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchAdultRow = async (id) => {
    // Simulate an asynchronous fetch for adultRow
    return new Promise((resolve, reject) => {
      const matchingRows = adultRows.filter((row) => row.row === id);
      resolve(matchingRows);
    });
  };

  const fetchChildRow = async (id) => {
    // Simulate an asynchronous fetch for childRows
    return new Promise((resolve, reject) => {
      const matchingRows = childRows.filter((row) => row.row === id);
      resolve(matchingRows);
    });
  };
  let changerowid = true;
  const generateVehicleTypeTransfersData = async () => {
    const vehicleTypeTransfersData = await Promise.all(
      rows.map(async (row, index) => {
        const data = {
          chargeAppliedType: row.chargeType,
          vehicleuuid: row.selectedVehicle ? row.selectedVehicle.value : "",
          status: true, // Status is true by default
        };

        if (row.chargeType === "Private") {
          data.ratePerVehicle = parseFloat(
            document.querySelector(`input[name="txt_vehicle_rate_${row.id}"]`)
              ?.value || 0
          );
          data.parkingFee = parseFloat(
            document.querySelector(`input[name="parkingfee_${row.id}"]`)
              ?.value || 0
          );
          data.driverTip = parseFloat(
            document.querySelector(`input[name="drivertips_${row.id}"]`)
              ?.value || 0
          );
          data.representativeCost = parseFloat(
            document.querySelector(`input[name="repcost_${row.id}"]`)?.value ||
              0
          );
          data.guideCost = parseFloat(
            document.querySelector(`input[name="guidecost_${row.id}"]`)
              ?.value || 0
          );
          data.touristicEntranceFee = parseFloat(
            document.querySelector(`input[name="entrancefees_${row.id}"]`)
              ?.value || 0
          );
        } else if (
          row.chargeType === "Private Per Pax" ||
          row.chargeType === "SIC Basis"
        ) {
          // Fetch adultRow and childRow asynchronously
          if (changerowid) {
            adultRows[0].row = index + 1;
            childRows[0].row = index + 1;
            changerowid = true;
          }
          const [AdultRows, ChildRows] = await Promise.all([
            fetchAdultRow(index + 1),
            fetchChildRow(index + 1),
          ]);

          // Use map to include all matching adult and child rows
          data.adult = AdultRows.map((adultRow) => ({
            adultfrom: adultRow ? adultRow.adultFrom : "",
            adultto: adultRow ? adultRow.adultTo : "",
            adultrateperpax: parseFloat(adultRow ? adultRow.adultRate : 0) || 0,
          }));
          data.child = ChildRows.map((childRow) => ({
            childfrom: childRow ? childRow.childFrom : "",
            childto: childRow ? childRow.childTo : "",
            childrate: parseFloat(childRow ? childRow.childRate : 0) || 0,
            childChargeType: childRow ? childRow.childChargeType : "",
          }));
        }

        return data;
      })
    );

    return vehicleTypeTransfersData;
  };

  const transformData = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const transformedData = data
          .map((item) => {
            const {
              chargeAppliedType,
              vehicleuuid,
              status,
              ratePerVehicle,
              parkingFee,
              driverTip,
              representativeCost,
              guideCost,
              touristicEntranceFee,
              adult,
              child,
            } = item;

            const newItem = {
              chargeAppliedType,
              vehicleuuid,
              status,
            };

            if (chargeAppliedType === "Private") {
              newItem.ratePerVehicle = ratePerVehicle;
              newItem.parkingFee = parkingFee;
              newItem.driverTip = driverTip;
              newItem.representativeCost = representativeCost;
              newItem.guideCost = guideCost;
              newItem.touristicEntranceFee = touristicEntranceFee;
            } else {
              if (adult) {
                newItem.adult = adult
                  .filter((a) => a.adultfrom && a.adultto && a.adultrateperpax)
                  .map((a) => ({
                    adultfrom: a.adultfrom,
                    adultto: a.adultto,
                    adultrateperpax: a.adultrateperpax,
                  }));
              }
              if (child) {
                newItem.child = child
                  .filter(
                    (c) => c.childfrom.label && c.childto.label && c.childrate
                  )
                  .map((c) => ({
                    childfrom: c.childfrom.value,
                    childto: c.childto.value,
                    childrate: c.childrate,
                    childChargeType: c.childChargeType,
                  }));
              }
            }

            return newItem;
          })
          .filter(
            (item) =>
              item.ratePerVehicle ||
              (item.adult && item.adult.length > 0) ||
              (item.child && item.child.length > 0)
          );

        resolve(transformedData);
      } catch (error) {
        reject(error);
      }
    });
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding leading zero if needed
    const day = date.getDate().toString().padStart(2, "0"); // Adding leading zero if needed
    return `${month}/${day}/${year}`;
  };

  const validateVehicleData = (data) => {
    return new Promise(async (resolve, reject) => {
      const vehicleData = data.vehicleTypeTransfersData;

      if (vehicleData.length === 0) {
        RequiredFieldAlert(
          "Vehicle Type Data is required",
          "Please create Vehicle Type Data",
          "error"
        );
        reject(new Error("Vehicle Type Data is required"));
        return false;
      }

      for (let i = 0; i < vehicleData.length; i++) {
        if (
          !vehicleData[i].vehicleuuid ||
          vehicleData[i].vehicleuuid === null ||
          vehicleData[i].vehicleuuid === ""
        ) {
          RequiredFieldAlert(
            "Vehicle is required",
            "Please select a vehicle",
            "error"
          );
          // reject(new Error("Vehicle is required"));
          return false;
        }
      }

      resolve(true);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assign values to formData fields based on conditions
    let data1 = await generateVehicleTypeTransfersData();
    let transformedData = await transformData(data1);
    const periodFrom = new Date(startDate);
    const periodTo = new Date(endDate);
    formData.periodFrom = formatDate(periodFrom);
    formData.periodTo = formatDate(periodTo);

    if (!selectedFile) {
      formData.image = "";
    } else {
      const resp = await uploadFile(selectedFile);
      if (resp.success === true) {
        formData.image = resp.imagelink;
      } else {
      }
    }
    formData.supplieruuid = data.uuid;
    formData.vehicleTypeTransfersData = transformedData;
    formData.transferuuids = selectedTransfers.map(
      (transfer) => transfer.value
    );
    formData.rateProfile = formData.rateProfile.map((rate) => rate.label);

    const isSuccessfull = await validateVehicleData(formData);

    if (isSuccessfull) {
      try {
        const response = await postDATA(
          formData,
          ApiRoutes.TRANSFERS.TRANSFER_TARIFF
        );

        if (response.data.statusCode === 200) {
          SuccessApiToast("Transfer Tariff Rate Added Successfully");

          navigateOnRefresh(
            Constants.URLConstants.CONTRACTSTRANSFERSRATESSEARCHBUTTON
          );
        }
      } catch (error) {
        ErrorApiAlert("Error Adding Transfer Tariff Rate");
      }
    }
  };
  return (
    <>
      <Header2 linkText1="Add Transfer Tariff" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <ul className="nav nav-tabs" id="mainTabs" role="tablist">
            <li className="nav-item">
              <Link
                className="nav-link active"
                id="products-tab"
                data-bs-toggle="tab"
                to="#products"
                role="tab"
                aria-controls="products"
                aria-selected="true"
              >
                Tariff Rate
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                id="services-tab"
                data-bs-toggle="tab"
                to="#services"
                role="tab"
                aria-controls="services"
                aria-selected="false"
              >
                Cancellation Policy
              </Link>
            </li>
          </ul>
          <br />
          <form
            style={{ borderTop: "2px solid #FF5015!important", padding: "0px" }}
            onSubmit={handleSubmit}
          >
            <div className="tab-content" id="mainTabContent">
              {/* Products Tab */}
              <div
                className="tab-pane fade show active"
                id="products"
                role="tabpanel"
                aria-labelledby="products-tab"
              >
                <ul
                  className="nav nav-tabs"
                  id="productsSubTabs"
                  role="tablist"
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      id="subtab1-tab"
                      data-bs-toggle="tab"
                      to="#subtab1"
                      role="tab"
                      aria-controls="subtab1"
                      aria-selected="true"
                    >
                      Add / Edit Tariff Rate
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      id="subtab2-tab"
                      data-bs-toggle="tab"
                      to="#subtab2"
                      role="tab"
                      aria-controls="subtab2"
                      aria-selected="false"
                    >
                      View Tariff Rate
                    </Link>
                  </li>
                </ul>
                <div
                  className="tab-content"
                  id="productsSubTabContent"
                  style={{
                    paddingLeft: "11px",
                    paddingRight: "0px",
                    paddingTop: "5px",
                    paddingBottom: "6px",
                  }}
                >
                  <div
                    className="tab-pane fade show active"
                    id="subtab1"
                    role="tabpanel"
                    aria-labelledby="subtab1-tab"
                  >
                    <h5
                      style={{
                        fontSize: "14pt",
                        fontWeight: 400,
                        color: "#6a6c6f",
                        padding: "10px 4px 4px",
                        transition: "all .3s",
                        border: "1px solid transparent",
                        marginLeft: "-12px",
                        marginTop: "-4.2px",
                        backgroundColor: "#edf0f5!important",
                      }}
                    >
                      ADD TRANSFER TARIFF
                    </h5>
                    <div className="panel-body">
                      <div id="mesId" style={{ display: "none" }}></div>
                      <div className="row">
                        <div className="form-group col-md-3">
                          <label>Supplier</label>
                          <div>
                            {data &&
                            data.supplierName !== undefined &&
                            data.supplierName !== null
                              ? data.supplierName
                              : "Supplier Name is undefined"}
                          </div>
                          <input
                            id="sel_supplier"
                            className="form-control"
                            name="sel_supplier"
                            type="hidden"
                            defaultValue="S000000003"
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>Transfer Name</label>
                          <div>
                            {data &&
                            data.currentTransfer !== undefined &&
                            data.currentTransfer !== null
                              ? data.currentTransfer
                              : "Transfer Name is undefined"}
                          </div>
                        </div>
                        <div className="form-group col-md-3">
                          <label>Select Multiple Transfer</label>
                          <MultiSelect
                            options={transferOptions}
                            isSearchable
                            isMulti
                            placeholder="- Select Transfer -"
                            className="custom-select required"
                            noOptionsMessage={() => "No Transfer Found"}
                            onChange={handleTransferChange}
                            value={selectedTransfers}
                            required
                          />{" "}
                        </div>
                        <div className="form-group col-md-3">
                          <label>Selected Transfer</label>
                          {selectedTransfers.length > 0 && (
                            <span
                              className="input-group-addon"
                              style={{ cursor: "pointer", marginLeft: "25px" }}
                              onClick={handleRemoveLastTransfer}
                            >
                              <i className="fa fa-times" />
                            </span>
                          )}
                          <div id="selected_transfer_parent_div">
                            {selectedTransfers.length > 0 ? (
                              selectedTransfers.map((transfer) => (
                                <div
                                  key={transfer.value}
                                  className="parentSTDIV col-lg-12 input-group"
                                >
                                  {transfer.label}
                                </div>
                              ))
                            ) : (
                              <div>No Transfers Selected</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="form-group col-md-3">
                          <label>City</label>
                          <MultiSelect
                            options={cityOptions}
                            isSearchable
                            placeholder="- Select City -"
                            value={
                              cityOptions.find(
                                (option) => option.value === formData.city
                              ) || ""
                            }
                            onChange={(selectedOption) =>
                              handleSingleSelectChange(selectedOption, "city")
                            }
                            className="custom-select "
                            noOptionsMessage={() => "No City Found"}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>Rate Profile</label>
                          <MultiSelect
                            options={selRateProOptions}
                            isSearchables
                            isMulti
                            placeholder="- Select Profile -"
                            className="custom-select required"
                            value={formData.rateProfile}
                            onChange={(selectedOptions) =>
                              handleMultiSelectChange(
                                "rateProfile",
                                selectedOptions
                              )
                            }
                            noOptionsMessage={() => "No Profile Found"}
                            required
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>Emergency No.</label>
                          <input
                            type="text"
                            className="form-control form-control-sm "
                            name="emergencyNo"
                            value={formData.emergencyNo}
                            onChange={handleInputChange}
                            size={30}
                            maxLength={255}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>Currency</label>
                          <input
                            type="hidden"
                            name="txt_currency"
                            id="txt_currency"
                          />
                          <MultiSelect
                            options={currencyOptions}
                            isSearchable
                            value={currencyOptions.find(
                              (option) => option.value === formData.currencyuuid
                            )}
                            onChange={(selectedOption) =>
                              handleSingleSelectChange(
                                selectedOption,
                                "currencyuuid"
                              )
                            }
                            placeholder="- Select Currency -"
                            className="custom-select required"
                            noOptionsMessage={() => "No City Found"}
                            required
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="form-group col-md-3">
                          <label htmlFor="txt_contract_no">
                            Release Period Hrs.
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm required"
                            name="releasePeriodHours"
                            value={formData.releasePeriodHours}
                            onChange={handleInputChange}
                            size={30}
                            maxLength={255}
                            required
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label>Period</label>
                          <div
                            className="input-daterange input-group date"
                            id="datetimepicker6"
                          >
                            <Flatpickr
                              value={startDate}
                              onChange={(date) => setStartDate(date)}
                              options={{ dateFormat: "Y-m-d" }}
                              style={{ width: "120px" }}
                            />

                            <span class="input-group-addon">to</span>
                            <Flatpickr
                              value={endDate}
                              onChange={(date) => setEndDate(date)}
                              options={{ dateFormat: "Y-m-d" }}
                              style={{ width: "120px" }}
                            />
                            <span
                              className="input-group-addon"
                              id="aTrashBtn"
                              onClick={handleTrashClick}
                            >
                              <i className="fa fa-trash" />
                            </span>
                          </div>
                        </div>
                        <div className="form-group col-md-4">
                          <label>Applicable Days</label>
                          <br />
                          <div className="form-group col-md-12 phps_row_1">
                            <div
                              className="checkbox checkbox-success"
                              style={{ display: "inline-block" }}
                            >
                              <input
                                id="checkbox1"
                                type="checkbox"
                                name="applicableDays"
                                value="Monday"
                                checked={formData.applicableDays.includes(
                                  "Monday"
                                )}
                                onChange={handleInputChange}
                              />
                              <label htmlFor="checkbox1"> Mon</label>
                            </div>
                            &nbsp;&nbsp;
                            <div
                              className="checkbox checkbox-success"
                              style={{ display: "inline-block" }}
                            >
                              <input
                                id="checkbox2"
                                type="checkbox"
                                name="applicableDays"
                                value="Tuesday"
                                checked={formData.applicableDays.includes(
                                  "Tuesday"
                                )}
                                onChange={handleInputChange}
                              />
                              <label htmlFor="checkbox2"> Tue</label>
                            </div>
                            &nbsp;&nbsp;
                            <div
                              className="checkbox checkbox-success"
                              style={{ display: "inline-block" }}
                            >
                              <input
                                id="checkbox3"
                                type="checkbox"
                                name="applicableDays"
                                value="Wednesday"
                                checked={formData.applicableDays.includes(
                                  "Wednesday"
                                )}
                                onChange={handleInputChange}
                              />
                              <label htmlFor="checkbox3"> Wed</label>
                            </div>
                            &nbsp;&nbsp;
                            <div
                              className="checkbox checkbox-success"
                              style={{ display: "inline-block" }}
                            >
                              <input
                                id="checkbox4"
                                type="checkbox"
                                name="applicableDays"
                                value="Thursday"
                                checked={formData.applicableDays.includes(
                                  "Thursday"
                                )}
                                onChange={handleInputChange}
                              />
                              <label htmlFor="checkbox4"> Thr</label>
                            </div>
                            &nbsp;&nbsp;
                            <div
                              className="checkbox checkbox-success"
                              style={{ display: "inline-block" }}
                            >
                              <input
                                id="checkbox5"
                                type="checkbox"
                                name="applicableDays"
                                value="Friday"
                                checked={formData.applicableDays.includes(
                                  "Friday"
                                )}
                                onChange={handleInputChange}
                              />
                              <label htmlFor="checkbox5"> Fri</label>
                            </div>
                            &nbsp;&nbsp;
                            <div
                              className="checkbox checkbox-success"
                              style={{ display: "inline-block" }}
                            >
                              <input
                                id="checkbox6"
                                type="checkbox"
                                name="applicableDays"
                                value="Saturday"
                                checked={formData.applicableDays.includes(
                                  "Saturday"
                                )}
                                onChange={handleInputChange}
                              />
                              <label htmlFor="checkbox6"> Sat</label>
                            </div>
                            &nbsp;&nbsp;
                            <div
                              className="checkbox checkbox-success"
                              style={{ display: "inline-block" }}
                            >
                              <input
                                id="checkbox7"
                                type="checkbox"
                                name="applicableDays"
                                value="Sunday"
                                checked={formData.applicableDays.includes(
                                  "Sunday"
                                )}
                                onChange={handleInputChange}
                              />
                              <label htmlFor="checkbox7"> Sun</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="form-group col-md-3">
                          <label>Rate Type</label>
                          <MultiSelect
                            options={rateTypeOptions}
                            isSearchable
                            value={rateTypeOptions.find(
                              (option) => option.value === formData.rateType
                            )}
                            onChange={(selectedOption) =>
                              handleSingleSelectChange(
                                selectedOption,
                                "rateType"
                              )
                            }
                            placeholder="- Select RATE TYPE -"
                            className="custom-select"
                            noOptionsMessage={() => "No Age Found"}
                          />
                        </div>
                      </div>
                      <style
                        dangerouslySetInnerHTML={{
                          __html:
                            "\n                                    .fa-plus:hover {\n                                        color: white !important\n                                    }\n                                ",
                        }}
                      />
                      {rows.map((row, index) => (
                        <div key={row.id} className="mt-3">
                          <div
                            className="panel-body"
                            style={{
                              backgroundColor: "#FF5015",
                              paddingBottom: "1px",
                              paddingTop: "4px",
                            }}
                          >
                            <h5
                              style={{
                                color: "white",
                                fontSize: "15px",
                                marginLeft: "20px",
                                marginTop: "2px",
                              }}
                            >
                              Vehicle Type Row {index + 1}
                            </h5>
                          </div>
                          <br />
                          <div className="row">
                            <div className="form-group col-md-4">
                              <label>Charge Applied Type</label>
                              <br />
                              <div className="radio radio-success radio-inline">
                                <input
                                  type="radio"
                                  name={`chk_charge_type_${row.id}`}
                                  value="SIC Basis"
                                  checked={row.chargeType === "SIC Basis"}
                                  onChange={(e) =>
                                    handleChargeTypeChange(
                                      row.id,
                                      e.target.value
                                    )
                                  }
                                />
                                <label>SIC Basis</label>
                              </div>
                              <div className="radio radio-success radio-inline">
                                <input
                                  type="radio"
                                  name={`chk_charge_type_${row.id}`}
                                  value="Private Per Pax"
                                  checked={row.chargeType === "Private Per Pax"}
                                  onChange={(e) =>
                                    handleChargeTypeChange(
                                      row.id,
                                      e.target.value
                                    )
                                  }
                                />
                                <label>Private Per Pax</label>
                              </div>
                              <div className="radio radio-success radio-inline">
                                <input
                                  type="radio"
                                  name={`chk_charge_type_${row.id}`}
                                  value="Private"
                                  checked={row.chargeType === "Private"}
                                  onChange={(e) =>
                                    handleChargeTypeChange(
                                      row.id,
                                      e.target.value
                                    )
                                  }
                                />
                                <label>Private</label>
                              </div>
                            </div>
                            <div className="form-group col-md-3">
                              <label>Vehicle Type</label>
                              <div className="input-group col-xs-12">
                                <MultiSelect
                                  options={vehicleOptions}
                                  isSearchable
                                  placeholder="- Select Vehicle Type -"
                                  className="custom-select required w-100"
                                  noOptionsMessage={() => "No Vehicle Found"}
                                  onChange={(selectedOption) =>
                                    handleVehicleChange(row.id, selectedOption)
                                  }
                                />
                              </div>
                            </div>
                            <div className="form-group col-md-3">
                              <label>Maximum Passengers</label>
                              <input
                                readOnly
                                type="text"
                                className="form-control"
                                name={`txt_pax_cap_${row.id}`}
                                value={
                                  row.selectedVehicle
                                    ? row.selectedVehicle.maxPassenger
                                    : ""
                                }
                              />
                            </div>
                          </div>
                          <div
                            className="row mt-4"
                            style={{
                              display:
                                row.chargeType === "Private" ? "" : "none",
                            }}
                          >
                            <div className="form-group col-md-3">
                              <label>Rate Per Vehicle</label>
                              <input
                                type="text"
                                className="form-control required"
                                name={`txt_vehicle_rate_${row.id}`}
                                size={30}
                                maxLength={255}
                              />
                            </div>
                            <div className="form-group col-md-3">
                              <label htmlFor={`parkingfee_${row.id}`}>
                                Parking Fee
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                id={`parkingfee_${row.id}`}
                                name={`parkingfee_${row.id}`}
                                size={30}
                                maxLength={255}
                              />
                            </div>
                            <div className="form-group col-md-3">
                              <label htmlFor={`drivertips_${row.id}`}>
                                Driver Tips
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                id={`drivertips_${row.id}`}
                                name={`drivertips_${row.id}`}
                                size={30}
                                maxLength={255}
                              />
                            </div>
                            <div className="form-group col-md-3">
                              <label htmlFor={`repcost_${row.id}`}>
                                Representative Cost
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                id={`repcost_${row.id}`}
                                name={`repcost_${row.id}`}
                                size={30}
                                maxLength={255}
                              />
                            </div>
                            <div className="form-group col-md-3">
                              <label htmlFor={`guidecost_${row.id}`}>
                                Guide Cost
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                id={`guidecost_${row.id}`}
                                name={`guidecost_${row.id}`}
                                size={30}
                                maxLength={255}
                              />
                            </div>
                            <div className="form-group col-md-3">
                              <label htmlFor={`entrancefees_${row.id}`}>
                                Touristic Entrance Fees
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                id={`entrancefees_${row.id}`}
                                name={`entrancefees_${row.id}`}
                                size={30}
                                maxLength={255}
                              />
                            </div>
                          </div>
                          <div
                            className="container"
                            style={{
                              display:
                                row.chargeType !== "Private" ? "" : "none",
                            }}
                          >
                            <div className="row">
                              <div className="col-md-12">
                                {adultRows
                                  .filter((adultRow) => adultRow.row === row.id)
                                  .map((adultRow, adultIndex) => (
                                    <div key={adultRow.id} className="row mt-4">
                                      {adultIndex === 0 && (
                                        <div className="col-md-1 mt-3">
                                          <button
                                            onClick={(event) =>
                                              addAdultRow(event, row.id)
                                            }
                                            className="btn btn-primary btn-sm"
                                            style={{ marginRight: "5px" }}
                                          >
                                            <i className="fa fa-plus"></i>
                                          </button>
                                          <button
                                            onClick={(event) =>
                                              removeAdultRow(event, row.id)
                                            }
                                            className="btn btn-danger btn-sm"
                                          >
                                            <i className="fa fa-minus"></i>
                                          </button>
                                        </div>
                                      )}
                                      {adultIndex > 0 && (
                                        <div className="col-md-1 mt-3"> </div>
                                      )}
                                      <div className="col-md-3">
                                        <label>Adult From</label>
                                        <input
                                          type="text"
                                          readOnly
                                          className={`form-control adultFrom_${adultRow.id}`}
                                          value={adultRow.adultFrom}
                                          onChange={(e) =>
                                            handleAdultChange(
                                              adultRow.id,
                                              "adultFrom",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="col-md-3">
                                        <label>Adult To</label>
                                        <input
                                          type="text"
                                          className={`form-control adultTo_${adultRow.id}`}
                                          value={adultRow.adultTo}
                                          onChange={(e) =>
                                            handleAdultChange(
                                              adultRow.id,
                                              "adultTo",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="col-md-3">
                                        <label>Adult Rate (Per Pax)</label>
                                        <input
                                          type="text"
                                          className={`form-control adultRatePerPax_${adultRow.id}`}
                                          value={adultRow.adultRate}
                                          onChange={(e) =>
                                            handleAdultChange(
                                              adultRow.id,
                                              "adultRate",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="col-md-2">
                                        <label>Approx Total Rate</label>
                                        <br />
                                        <p style={{ textAlign: "center" }}>
                                          {calculateTotalRate(adultRow)}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>

                            <div className="row mt-4">
                              <div className="col-md-12">
                                {childRows
                                  .filter((childRow) => childRow.row === row.id)
                                  .map((childRow, childIndex) => (
                                    <div key={row.id} className="row mt-2">
                                      {childIndex === 0 && (
                                        <>
                                          <div className="row mt-4">
                                            <div className="form-group col-md-3">
                                              <label>Child Charge Type</label>
                                              <br />
                                              <div className="radioline1">
                                                <div className="radio radio-success radio-inline">
                                                  <input
                                                    type="radio"
                                                    name={`${row.id}_childChargeType`}
                                                    value="percentage"
                                                    checked={
                                                      childRow.childChargeType ===
                                                      "percentage"
                                                    }
                                                    onChange={(e) =>
                                                      handleChildChargeTypeChange(
                                                        row.id,
                                                        "percentage"
                                                      )
                                                    } // Update child charge type
                                                  />
                                                  <label htmlFor="chk_active">
                                                    Percentage
                                                  </label>
                                                </div>
                                                <div className="radio radio-success radio-inline">
                                                  <input
                                                    type="radio"
                                                    name={`${row.id}_childChargeType`}
                                                    value="amount"
                                                    checked={
                                                      childRow.childChargeType ===
                                                      "amount"
                                                    }
                                                    onChange={(e) =>
                                                      handleChildChargeTypeChange(
                                                        row.id,
                                                        "amount"
                                                      )
                                                    } // Update child charge type
                                                  />
                                                  <label htmlFor="chk_inactive">
                                                    Amount
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="col-md-1 mt-3">
                                            <button
                                              onClick={(event) =>
                                                addChildRow(event, row.id)
                                              }
                                              className="btn btn-primary btn-sm"
                                              style={{ marginRight: "5px" }}
                                            >
                                              <i className="fa fa-plus"></i>
                                            </button>
                                            <button
                                              onClick={(event) =>
                                                removeChildRow(event, row.id)
                                              }
                                              className="btn btn-danger btn-sm"
                                            >
                                              <i className="fa fa-minus"></i>
                                            </button>
                                          </div>
                                        </>
                                      )}
                                      {childIndex > 0 && (
                                        <div className="col-md-1 mt-3"> </div>
                                      )}
                                      <div className="col-md-3">
                                        <label>Child Age From</label>
                                        <MultiSelect
                                          options={selAgeOptions}
                                          className={` childFrom_${row.id}`}
                                          value={row.childFrom}
                                          onChange={(selected) =>
                                            handleChildChange(
                                              row.id,
                                              "childFrom",
                                              selected
                                            )
                                          }
                                          labelledBy="Select Age"
                                        />
                                      </div>
                                      <div className="col-md-3">
                                        <label>Child Age To</label>
                                        <MultiSelect
                                          options={selAgeOptions}
                                          value={row.childTo}
                                          className={` childTo_${row.id}`}
                                          onChange={(selected) =>
                                            handleChildChange(
                                              row.id,
                                              "childTo",
                                              selected
                                            )
                                          }
                                          labelledBy="Select Age"
                                        />
                                      </div>
                                      <div className="col-md-3">
                                        <label>Child Rate</label>
                                        <input
                                          type="text"
                                          className={`form-control childRate_${row.id}`}
                                          onChange={(e) =>
                                            handleChildChange(
                                              row.id,
                                              "childRate",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="row add-vehicle-row mt-5">
                        <div className="col-md-12 text-center">
                          <span className="input-group">
                            <div
                              id="addmore_span"
                              className="input-group-addon add-more-vehicle"
                              style={{ marginRight: "10px" }}
                              value="Add More"
                              name="addmore"
                              onClick={addMoreRow}
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Add More Vehicle"
                            >
                              <i
                                className="fa fa-plus"
                                style={{
                                  marginRight: "10px !important",
                                  color: "white",
                                  float: "right",
                                  fontSize: "10px",
                                  marginTop: "-14px",
                                  width: "131px",
                                }}
                              >
                                &nbsp;&nbsp;Add More Vehicle
                              </i>
                            </div>
                            <div
                              id="remove_span"
                              className="input-group-addon remove-vehicle"
                              value="Remove"
                              name="removebtn"
                              onClick={removeLastRow}
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Remove Vehicle"
                            >
                              <i
                                className="fa fa-minus"
                                style={{
                                  marginRight: "4px !important",
                                  float: "right",
                                  fontSize: "10px",
                                  marginTop: "-14px",
                                  width: "131px",
                                }}
                              >
                                &nbsp;&nbsp;Remove Vehicle
                              </i>
                            </div>
                          </span>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="form-group col-md-3">
                          <label>Child Age Lower</label>
                          <MultiSelect
                            options={selLowerAgeOptions}
                            isSearchable
                            placeholder="- Select Lower Age  -"
                            className="custom-select"
                            value={selLowerAgeOptions.find(
                              (option) =>
                                option.value === formData.childagelower
                            )}
                            onChange={(selectedOption) =>
                              handleSingleSelectChange(
                                selectedOption,
                                "childagelower"
                              )
                            }
                            noOptionsMessage={() => "No Age Found"}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>Child Age Upper</label>
                          <MultiSelect
                            options={selLowerAgeOptions}
                            isSearchable
                            value={selLowerAgeOptions.find(
                              (option) =>
                                option.value === formData.childageupper
                            )}
                            onChange={(selectedOption) =>
                              handleSingleSelectChange(
                                selectedOption,
                                "childageupper"
                              )
                            }
                            placeholder="- Select Upper Age  -"
                            className="custom-select "
                            noOptionsMessage={() => "No Age Found"}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label>Status</label>
                          <br />
                          <div className="radioline1">
                            <div className="radio radio-success radio-inline">
                              <input
                                type="radio"
                                name="status" // This should match the key in formData
                                id="chk_active"
                                value="true" // Set value for "Active"
                                checked={formData.status === true} // Check if status is "Active"
                                onChange={handleInputChange} // Call handleInputChange function on change
                              />
                              <label htmlFor="chk_active">Active</label>
                            </div>
                            <div className="radio radio-success radio-inline">
                              <input
                                type="radio"
                                name="status" // This should match the key in formData
                                id="app"
                                value="false" // Set value for "Inactive"
                                checked={formData.status === false} // Check if status is "Inactive"
                                onChange={handleInputChange} // Call handleInputChange function on change
                              />
                              <label htmlFor="chk_inactive">Inactive</label>
                            </div>
                          </div>
                        </div>

                        <div className="form-group col-md-3">
                          <label>Image</label>
                          <span className="uniqFile input-group">
                            <span className="input-group-addon fa fa-upload myInputFile">
                              <input
                                type="file"
                                name="agentLogo"
                                accept="image/*"
                                //  onChange={(e) => setFormData({ ...formData, agentLogo: e.target.value })}
                                onChange={handleFileInput}
                                size={40}
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="150 pixels x 150 pixels"
                              />
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="form-group col-md-12">
                          <label>Remark</label>
                          <textarea
                            className="form-control form-control-sm"
                            rows={5}
                            name="remark"
                            value={formData.remark}
                            onChange={handleInputChange}
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <br />
                      <div className="form-group col-md-12 mt-3">
                        <button
                          className="btn btn-dark btn-sm"
                          type="submit"
                          name="Submit"
                          value="submit"
                        >
                          <i className="fa fa-floppy-o" />
                          &nbsp;Save
                        </button>
                        {/* <button className="btn btn-dark btn-sm mx-1" type="reset" name="reset" value="Reset" >
                          <i className="fa fa-repeat" />&nbsp;Reset
                        </button> */}
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="subtab2"
                    role="tabpanel"
                    aria-labelledby="subtab2-tab"
                  >
                    <div className="row">
                      <div className="hpanel">
                        <input
                          type="hidden"
                          name="tranfer_id"
                          id="transfer_id"
                        />
                        <input
                          type="hidden"
                          name="supplier_id"
                          id="supplier_id"
                        />
                        <div className="dataTables_scroll">
                          <div
                            className="alert alert-danger text-center form-group"
                            style={{
                              backgroundColor: "#f2dede",
                              marginLeft: "-11px",
                              marginTop: "-5px",
                              padding: "13px",
                            }}
                          >
                            <h5
                              style={{
                                color: "var(--color-white) !important",
                                fontSize: "16px",
                              }}
                            >
                              Use Search Criteria to Match Your Requirement.
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Services Tab */}
              <div
                className="tab-pane fade"
                id="services"
                role="tabpanel"
                aria-labelledby="services-tab"
              >
                <ul
                  className="nav nav-tabs"
                  id="servicesSubTabs"
                  role="tablist"
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      id="subtab3-tab"
                      data-bs-toggle="tab"
                      to="#subtab3"
                      role="tab"
                      aria-controls="subtab3"
                      aria-selected="true"
                    />
                  </li>
                </ul>
                <div className="tab-content" id="servicesSubTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="subtab3"
                    role="tabpanel"
                    aria-labelledby="subtab3-tab"
                  >
                    {/* Content for Subtab 3 under Services */}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(ContractsAddTransfersRateslist);
