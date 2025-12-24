import { Link } from "react-router-dom";

import personalimage from "../../../assets/images/personalimage.png";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import {
  agency_options,
  currencyOptions,
  visaTypeOptions,
  visastatus_options,
} from "../../../constants/contants";
import MultiSelect from "../../reactMultiSelect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllOfflineVisa,
  getRatesForPosted,
  sendOfflineVisaMail,
  updateOfflineVisaImages,
} from "../../../state/action/visaActions";
import { getofflinesuppliers } from "../../../state/action/commonApisActions";
import { countries } from "../../../constants/Country-City-Data";
import { showErrorToast } from "../../../constants/globalfunctions";

const VisaSearchVisaRequests = () => {
  const dispatch = useDispatch();
  const allOfflineVisa = useSelector(
    (state) => state.visa.allOfflineVisaData.data
  );
  const offlineSuppliers = useSelector(
    (state) => state.countries.offlineSuppliers
  );
  const specificSupplierRates = useSelector(
    (state) => state.visa.visaOfflineRatesPosted.data
  );
  // console.log(specificSupplierRates);
  // console.log(offlineSuppliers);
  console.log(allOfflineVisa);

  const [allVisaData, setAllVisaData] = useState([]);
  const [id, setId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const [supplierId, setSupplierId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  // console.log(id)

  const [formData, setFormData] = useState({
    supplier: null,
    supplierRate: "",
    agentMarkup: "",
    agentMultiplier: "",
    agentRate: "",
    reference: "",
    supplierCurrency: "",
    staus: selectedStatus,
  });

  const [searchData, setSearchData] = useState({
    bookingId: "",
    visaNumber: "",
    visaApplicant: "",
    agency: "",
    visaProcessing: "",
    passportNumber: "",
    status: "",
  });

  const handleMultiSelectChange = (field) => (selected) => {
    setSearchData((prevState) => ({
      ...prevState,
      [field]: selected,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(allVisaData);
  const searchHandler = () => {
    const filteredData = allVisaData?.filter((item) => {
      return (
        (searchData.agency?.label &&
          item?.agent?.agencyName
            ?.toLowerCase()
            ?.includes(searchData.agency?.label?.toLowerCase())) ||
        (searchData.visaProcessing?.label &&
          item?.visaType
            ?.toLowerCase()
            ?.includes(searchData.visaProcessing?.label?.toLowerCase())) ||
        (searchData.passportNumber?.label &&
          item?.passportNo
            ?.toLowerCase()
            ?.includes(searchData.passportNumber?.label?.toLowerCase())) ||
        (searchData.status?.label &&
          item?.status
            ?.toLowerCase()
            ?.includes(searchData.status?.label?.toLowerCase())) ||
        (searchData.bookingId &&
          item?.uuid
            ?.toLowerCase()
            ?.includes(searchData.bookingId?.toLowerCase())) ||
        // Search by Visa Number
        (searchData.visaNumber &&
          item?.visaType
            ?.toLowerCase()
            ?.includes(searchData.visaNumber?.toLowerCase())) ||
        // Search by Visa Applicant
        (searchData.visaApplicant &&
          item?.visaType
            ?.toLowerCase()
            ?.includes(searchData.visaApplicant?.toLowerCase()))
      );
    });

    console.log(filteredData); // Verify if this has the expected data
    setAllVisaData(filteredData);
  };
  const handleReset = () => {
    setAllVisaData(allOfflineVisa);
    setSearchData({
      bookingId: "",
      visaNumber: "",
      visaApplicant: "",
      agency: "",
      visaProcessing: "",
      passportNumber: "",
      status: "",
    });
  };

  const handleLinkClick = (item) => {
    // Pass the item object to setSelectedItem or another function
    setId(item.uuid);
    setPaymentStatus(item.paymentStatus);
    console.log("Item clicked:", item);
  };

  useEffect(() => {
    if (specificSupplierRates) {
      setFormData({
        supplier: specificSupplierRates.supplierId,
        supplierRate: specificSupplierRates.supplierRate,
        agentMarkup: specificSupplierRates.agentMarkup,
        appliedAgentMultiplier: specificSupplierRates.agentMultiplier,
        agentRate: specificSupplierRates.agentRate,
        reference: specificSupplierRates.referance,
        supplierCurrency: specificSupplierRates.currency,

        status: selectedStatus,
      });
    }
  }, [specificSupplierRates]);

  const handlePostedSelect = (event) => {
    const status = event.target.value;
    setSelectedStatus(status);
    // Show form only if 'Posted' is selected
    // if (status === "Posted") {
    //   setShowForm(true);
    // } else {
    //   setShowForm(false);
    // }
  };

  const handleSaveClick = () => {
    if (selectedStatus === "Posted") {
      setShowForm(true);
      dispatch(getofflinesuppliers());
    } else {
      alert('Please select "Posted" first.');
    }
  };

  const handleSelectChange = async (field, value) => {
    console.log(value, "---", id);
    setSupplierId(value);
    // setFormData({ ...formData, [field]: value });

    try {
      // Dispatch the API action
      const payload = {
        uuid: id,
        offlinesupplieruuid: value,
      };
      const data = await dispatch(getRatesForPosted(payload));

      console.log("API response data:", data);
      // Handle the returned data as needed
      // You can also update the local state with this data if necessary
    } catch (error) {
      console.error("Error fetching supplier data:", error);
      // Handle the error
    }
  };

  const sendMailHandler = async (id) => {
    const payload = {
      uuid: id,
      offlinesupplieruuid: supplierId,
    };
    await dispatch(sendOfflineVisaMail(payload));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (paymentStatus && paymentStatus === "approved") {
      try {
        await dispatch(updateOfflineVisaImages(id, formData));
      } catch (error) {
        console.error("Error updating visa images:", error);
        showErrorToast("Failed to Post Visa Rates");
      }
    } else {
      showErrorToast("Payment not approved");
    }
  };

  useEffect(() => {
    setAllVisaData(allOfflineVisa);
  }, [allOfflineVisa]);

  useEffect(() => {
    dispatch(getAllOfflineVisa());
  }, []);

  return (
    <>
      <Header2
        title="
 SEARCH VISA APPLICATION
"
        linkText1="Visa Bookings"
        linkText2="Search Visa Bookings"
        link1={Constants.URLConstants.VISANEWVISAOFFLINEBOOKING}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="form-group">
              <div className="row">
                <div className="col-md-3 form-group">
                  <label>Booking Id</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="bookingId"
                    value={searchData.bookingId}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Visa Number</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    name="visaNumber"
                    value={searchData.visaNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Visa Applicant</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="visaApplicant"
                    value={searchData.visaApplicant}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Agency</label>
                  <MultiSelect
                    options={allVisaData?.map((item) => ({
                      value: item?.agent?.agencyName,
                      label: item?.agent?.agencyName,
                    }))}
                    value={searchData.agency}
                    onChange={handleMultiSelectChange("agency")}
                    isSearchable
                    placeholder="- All -"
                    className="custom-select"
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-3 form-group">
                  <label>Visa Processing</label>
                  <MultiSelect
                    options={allVisaData?.map((item) => ({
                      value: item?.visaType,
                      label: item?.visaType,
                    }))}
                    value={searchData.visaProcessing}
                    onChange={handleMultiSelectChange("visaProcessing")}
                    isSearchable
                    placeholder="- All -"
                    className="custom-select"
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Passport Number</label>
                  <MultiSelect
                    options={allVisaData?.map((item) => ({
                      value: item?.passportNo,
                      label: item?.passportNo,
                    }))}
                    value={searchData.passportNumber}
                    onChange={handleMultiSelectChange("passportNumber")}
                    isSearchable
                    placeholder="- All -"
                    className="custom-select"
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Status</label>
                  <MultiSelect
                    options={allVisaData?.map((item) => ({
                      value: item?.status,
                      label: item?.status,
                    }))}
                    value={searchData.status}
                    onChange={handleMultiSelectChange("status")}
                    isSearchable
                    placeholder="- Select -"
                    className="custom-select"
                  />
                </div>
              </div>
              <div className="col-md-12 form-group mt-2">
                <button
                  className="btn btn-dark btn-sm"
                  type="button"
                  onClick={searchHandler}
                >
                  <i className="fa fa-search" />
                  &nbsp;Search
                </button>
                &nbsp;
                <button
                  className="btn btn-outline-secondary btn-sm"
                  type="button"
                  onClick={handleReset}
                >
                  <i className="fa fa-search" />
                  &nbsp;Reset
                </button>
              </div>
            </div>
          </div>
        </form>
        <br />
        <form>
          <div className="panel-body removeMargins">
            <div className="custPaging pgType2">
              {/*Pagination panel*/}
              <nav aria-label="Page navigation example">
                <ul className="pagination pagination-sm justify-content-center mt-1">
                  <li className="page-item active">
                    <Link className="page-link" to="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      4
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      6
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#" aria-label="Next">
                      <span aria-hidden="true">»</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div
              id="upload_visa_form"
              title="Upload Visa"
              style={{ textAlign: "left" }}
            />
            <div
              className="doubleScroll-scroll-wrapper mt-3"
              id="wrapper1"
              style={{
                height: "20px",
                overflow: "scroll hidden",
                width: "1491.4px",
              }}
            >
              <div
                className="suwala-doubleScroll-scroll"
                style={{ height: "20px", width: "1489.4px" }}
              />
            </div>
            <div id="wrapper2" style={{ overflow: "auto" }}>
              <br />
              <table
                id="visa_list"
                className="table table-bordered   table-responsive dataTable no-footer"
              >
                <thead>
                  <tr>
                    <th>BOOKING ID</th>
                    <th>VISA NUMBER</th>
                    <th>VISA APPLICANT</th>
                    <th>AGENCY</th>
                    <th>VISA PROCESSING</th>
                    <th>SUPPLIER NAME</th>
                    <th>PASSPORT NO</th>
                    <th>CREATE DATE</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {allVisaData &&
                    allVisaData?.map((item, index) => {
                      return (
                        <tr key={index} className="phps_row_1">
                          <td>{item?.uuid}</td>
                          <td>{item?.visa}</td>
                          <td>{item?.visaType}</td>
                          <td>{item?.agent?.agencyName}</td>
                          <td>{item?.visaType}</td>
                          <td>{item?.supplier?.supplierName}</td>
                          <td>{item?.passportNo}</td>
                          <td>
                            <div className="dateWrapper">
                              <div className="onlyDate">23 </div>
                              <div className="monthYear">
                                Dec
                                <br />
                                2021
                              </div>
                            </div>
                            {item?.timestamps?.createdAt.split("T")[0]}
                          </td>
                          <td>
                            <div
                              id="old_status_136"
                              data-toggle="tooltip"
                              data-original-title="Change Status"
                              data-placement="top"
                            >
                              <div className="input-group">
                                <span id="status_136" className="vida_statHead">
                                  Requested
                                </span>
                                <div className="input-group-addon">
                                  <Link
                                    onClick={() => handleLinkClick(item)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal1"
                                    alt=""
                                    title
                                    className="fa fa-pencil"
                                  />
                                </div>
                              </div>
                            </div>
                            {/*<span id="edit_status_136" style="display: none;">
                    <Link class="" title="" alt="save" src="images/icon_update.jpeg" data-bs-toggle="modal" data-bs-target="#myModal1">
                        12
                    </Link>
                     <div class="input-group">
                        <select class=" form-control selectpicker show-menu-arrow" id="new_status_136">
                            <option label="Requested" value="Requested" selected="selected">Requested</option>
<option label="Posted" value="Posted">Posted</option>
<option label="In Process" value="In Process">In Process</option>
<option label="Document Required" value="Document Required">Document Required</option>
<option label="Approved" value="Approved">Approved</option>
<option label="Rejected" value="Rejected">Rejected</option>
<option label="Entered in Country" value="Entered in Country">Entered in Country</option>
<option label="Left the Country" value="Left the Country">Left the Country</option>
<option label="Cancelled" value="Cancelled">Cancelled</option>

                        </select>
                        <div class="input-group-addon" data-toggle="tooltip"  data-original-title="Save" data-placement="top">
                            <Link class="fa fa-floppy-o" onClick="save_status('136','0','Requested');"  title="" alt="save" src="images/icon_update.jpeg" data-bs-toggle="modal" data-target="#myModal">
                            </Link>
                        </div>
                        <div class="input-group-addon" data-toggle="tooltip"  data-original-title="Cancel" data-placement="top">
                            <Link class="fa fa-times" onClick="cancel_status('136');" title="" alt=""></Link>
                        </div>
                    </div>
                    <img id="loader_136" src="images/indicator.gif" style="display: none;" /> */}
                          </td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <img
                                src="/cpfv3/images/loading.gif"
                                alt="loader6"
                                style={{
                                  display: "none",
                                  position: "absolute",
                                  top: "45%",
                                  left: "45%",
                                }}
                                id="email_loader"
                              />

                              {item?.supplier == null ||
                              item?.supplier == "" ? null : (
                                <div
                                  className="input-group-addon"
                                  data-toggle="tooltip"
                                  data-original-title="Mail"
                                  data-placement="top"
                                >
                                  <Link
                                    onClick={() => sendMailHandler(item.uuid)}
                                    // to={Constants.URLConstants.VISASERACHEDITREQUESTS.replace(
                                    //   ":id",
                                    //   item.uuid
                                    // )}
                                    className="fa fa-envelope"
                                  ></Link>
                                </div>
                              )}

                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-original-title="Edit"
                                data-placement="top"
                              >
                                <Link
                                  to={Constants.URLConstants.VISASERACHEDITREQUESTS.replace(
                                    ":id",
                                    item.uuid
                                  )}
                                  className="fa fa-pencil-square-o"
                                ></Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-original-title="View"
                                data-placement="top"
                              >
                                <Link
                                  to={Constants.URLConstants.VISASERACHVIEWREQUESTS.replace(
                                    ":id",
                                    item.uuid
                                  )}
                                  className="fa fa-eye"
                                  title
                                ></Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-original-title="Change Passport Image"
                                data-placement="top"
                              >
                                <Link
                                  to={`${Constants.URLConstants.VISAEDITPASSPORTIMAGE.replace(
                                    ":id",
                                    item.uuid
                                  )}?imageId=${item.passportPageOne}`}
                                  className="fa fa-file-image-o"
                                  title
                                ></Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-original-title="Change Passport Page2"
                                data-placement="top"
                              >
                                <Link
                                  to={`${Constants.URLConstants.VISAEDITPASSPORTIMAGE2.replace(
                                    ":id",
                                    item.uuid
                                  )}?imageId=${item.passportPageTwo}`}
                                  className="fa fa-book"
                                  alt="Change Passport Page2"
                                ></Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-original-title="Change Personal Image"
                                data-placement="top"
                              >
                                <Link
                                  to={`${Constants.URLConstants.VISAPERSONALIMAGE.replace(
                                    ":id",
                                    item.uuid
                                  )}?imageId=${item.personalPhoto}`}
                                  className="fa fa-user"
                                ></Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-original-title="Change Resident Permit"
                                data-placement="top"
                              >
                                <Link
                                  to={`${Constants.URLConstants.VISAEDITRESIDENTPAGE.replace(
                                    ":id",
                                    item.uuid
                                  )}?imageId=${item.residentPermit}`}
                                  className="fa fa-file-pdf-o"
                                ></Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-original-title="Change Flight Ticket"
                                data-placement="top"
                              >
                                <Link
                                  to={`${Constants.URLConstants.VISAEDITFLIGHTTICKETPAGE.replace(
                                    ":id",
                                    item.uuid
                                  )}?imageId=${item.flightTicket}`}
                                  className="fa fa-file"
                                ></Link>
                              </div>
                              <div className="input-group-addon">
                                <Link
                                  to={`${Constants.URLConstants.VISAEDITOTHERIMAGE.replace(
                                    ":id",
                                    item.uuid
                                  )}?imageId=${item.otherImage}`}
                                >
                                  <img
                                    src={personalimage}
                                    border={0}
                                    alt="Change Other"
                                    title="Change Other Image"
                                  />
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-original-title="Change Flight Ticket"
                                data-placement="top"
                              >
                                <Link
                                  to={`${Constants.URLConstants.VISASERACHPAYMENTREQUESTS.replace(
                                    ":id",
                                    item.uuid
                                  )}?imageId=${item.paymentProof}`}
                                  className="fa fa-dollar"
                                ></Link>
                              </div>
                              <div className="input-group-addon">
                                <i
                                  className="fa fa-download"
                                  data-toggle="tooltip"
                                  data-original-title="Not Available"
                                  data-placement="top"
                                  alt="Requested"
                                  title
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n.input-group-addon{\n    margin: auto !important;\n}\n",
            }}
          />
        </form>
        <div
          className="modal fade"
          id="myModal1"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
          data-backdrop="true"
          style={{ display: "none" }}
        >
          <div className="modal-dialog" style={{ width: "700px" }}>
            <div className="modal-content">
              <div className="color-line" />
              <div
                className="modal-body"
                style={{ height: "350px", overflow: "auto" }}
              >
                <link rel="stylesheet" to="dist/css/bootstrap-select.css" />
                <div
                  className="modalForm"
                  data-child="row"
                  data-effect="fadeInUp"
                >
                  <div>
                    {showForm ? (
                      <form>
                        <div
                          className="row mt-3 p-2"
                          style={{
                            background: "#f1f0f0",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div className="col-md-4 form-group">
                            <p style={{ marginBottom: 0 }}>SUPPLIER</p>
                          </div>
                          <div className="col-md-8 form-group">
                            <MultiSelect
                              options={offlineSuppliers?.map((supplier) => ({
                                value: supplier.uuid,
                                label: supplier.supplierName,
                              }))}
                              isSearchable
                              placeholder="- Select Supplier -"
                              className="custom-select"
                              onChange={(value) =>
                                handleSelectChange("supplier", value.value)
                              }
                            />
                          </div>
                        </div>
                        <div
                          className="row mt-3 p-2"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div className="col-md-4 form-group">
                            <p style={{ marginBottom: 0 }}>SUPPLIER RATE</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              name="supplierRate"
                              value={formData.supplierRate}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-4 form-group">
                            <MultiSelect
                              options={currencyOptions}
                              isSearchable
                              placeholder={specificSupplierRates?.currency}
                              className="custom-select"
                              value={specificSupplierRates?.currency}
                              isDisabled
                            />
                          </div>
                        </div>
                        <div
                          className="row mt-3 p-2"
                          style={{
                            background: "#f1f0f0",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div className="col-md-4 form-group">
                            <p style={{ marginBottom: 0 }}>AGENT MARKUP</p>
                          </div>
                          <div className="col-md-8 form-group">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              name="agentMarkup"
                              value={formData.agentMarkup}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div
                          className="row mt-3 p-2"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div className="col-md-4 form-group">
                            <p style={{ marginBottom: 0 }}>
                              APPLIED AGENT MULTIPLIER
                            </p>
                          </div>
                          <div className="col-md-8 form-group">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              name="appliedAgentMultiplier"
                              value={formData.agentMultiplier}
                              onChange={handleChange}
                              disabled
                            />
                          </div>
                        </div>
                        <div
                          className="row mt-3 p-2"
                          style={{
                            background: "#f1f0f0",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div className="col-md-4 form-group">
                            <p style={{ marginBottom: 0 }}>AGENT RATE</p>
                          </div>
                          <div className="col-md-4 form-group">
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              name="agentRate"
                              value={formData.agentRate}
                              onChange={handleChange}
                              disabled
                            />
                          </div>
                          <div className="col-md-4 form-group">
                            <MultiSelect
                              options={currencyOptions}
                              isSearchable
                              placeholder={specificSupplierRates?.currency}
                              className="custom-select"
                              value={specificSupplierRates?.currency}
                              isDisabled
                            />
                          </div>
                        </div>
                        <div
                          className="row mt-3 p-2"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div className="col-md-4 form-group">
                            <p style={{ marginBottom: 0 }}>REFERENCE</p>
                          </div>
                          <div className="col-md-8 form-group">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              name="reference"
                              value={formData.reference}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-md-12 form-group mt-2 text-center">
                            <button
                              className="btn btn-dark btn-sm"
                              type="button"
                              onClick={handleSubmit}
                            >
                              <i className="fa fa-file" />
                              &nbsp;Save
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div
                        className="input-group"
                        style={{ padding: "20px", width: "100%" }}
                      >
                        <div className="col-md-9">
                          <select
                            className="form-control"
                            id="new_status_136"
                            value={selectedStatus}
                            onChange={handlePostedSelect}
                          >
                            <option label="Requested" value="Requested">
                              Requested
                            </option>
                            <option label="Posted" value="Posted">
                              Posted
                            </option>
                            <option label="In Process" value="In Process">
                              In Process
                            </option>
                            <option
                              label="Document Required"
                              value="Document Required"
                            >
                              Document Required
                            </option>
                            <option label="Approved" value="Approved">
                              Approved
                            </option>
                            <option label="Rejected" value="Rejected">
                              Rejected
                            </option>
                            <option
                              label="Entered in Country"
                              value="Entered in Country"
                            >
                              Entered in Country
                            </option>
                            <option
                              label="Left the Country"
                              value="Left the Country"
                            >
                              Left the Country
                            </option>
                            <option label="Cancelled" value="Cancelled">
                              Cancelled
                            </option>
                          </select>
                        </div>
                        <div className="col-md-3">
                          <div className="input-group-addon">
                            <button
                              className="fa fa-floppy-o"
                              title="save"
                              alt="save"
                              onClick={handleSaveClick}
                              style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                              }}
                            ></button>
                          </div>

                          <div
                            className="input-group-addon"
                            data-toggle="tooltip"
                            data-original-title="Cancel"
                            data-placement="top"
                          >
                            <Link
                              className="fa fa-times"
                              to="#"
                              title="cancel"
                              alt="cancel"
                            />
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
      </div>
    </>
  );
};
export default VisaSearchVisaRequests;
