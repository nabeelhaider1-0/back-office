import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import { searchbooking_options } from "../../../constants/contants";
import {
  getPermittedMenuItems,
  isSuperAdmin as checkIfSuperAdmin,
  hasPermission as checkActionPermission,
} from "../../../authUtils";
import routeConfig from "../../../routeConfig";
const BookingTable = ({ bookings }) => {
  // const [expandedRow, setExpandedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState([]);
  const [permittedItems, setPermittedItems] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    // Fetch permitted items and super admin status for 'bookings' module
    setPermittedItems(
      getPermittedMenuItems(routeConfig).filter(
        (item) => item.module_name === "bookings"
      )
    );
    setIsSuperAdmin(checkIfSuperAdmin());
  }, []);

  const userhasPermission = (routePaths) => {
    const isPermitted =
      isSuperAdmin || checkActionPermission("bookings", routePaths);
    console.log("permittedItems", permittedItems, routePaths, isPermitted);
    return isPermitted;
  };

  // const toggleActions = (rowIndex) => {
  //   setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
  // };

  // const handleSendBookingEmail = (bookingId) => {
  //   if (!userhasPermission(["send_email"])) return; // Prevent action if no permission
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "Do you want to send the booking email?",
  //     icon: "question",
  //     iconColor: "#ff5015",
  //     showCancelButton: true,
  //     confirmButtonColor: "#ff5015",
  //     cancelButtonColor: "#1a385a",
  //     confirmButtonText: "Yes, send it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         // Simulate API call for sending email (replace with actual endpoint)
  //         const response = await fetch(
  //           `/api/bookings/send-email/${bookingId}`,
  //           { method: "POST" }
  //         );
  //         if (response.ok) {
  //           Swal.fire("Success", "Booking email sent.", "success");
  //         } else {
  //           Swal.fire("Error", "Failed to send booking email.", "error");
  //         }
  //       } catch (error) {
  //         Swal.fire("Error", "Failed to send booking email.", "error");
  //       }
  //     }
  //   });
  // };

  // const handleApprovePayment = (bookingId) => {
  //   if (!userhasPermission(["approve_payment"])) return; // Prevent action if no permission
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "Do you want to approve the payment?",
  //     icon: "question",
  //     iconColor: "#ff5015",
  //     showCancelButton: true,
  //     confirmButtonColor: "#ff5015",
  //     cancelButtonColor: "#1a385a",
  //     confirmButtonText: "Yes, approve it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         // Simulate API call for approving payment (replace with actual endpoint)
  //         const response = await fetch(
  //           `/api/bookings/approve-payment/${bookingId}`,
  //           { method: "POST" }
  //         );
  //         if (response.ok) {
  //           Swal.fire("Success", "Payment approved.", "success");
  //         } else {
  //           Swal.fire("Error", "Failed to approve payment.", "error");
  //         }
  //       } catch (error) {
  //         Swal.fire("Error", "Failed to approve payment.", "error");
  //       }
  //     }
  //   });
  // };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const statusClassMap = {
    "payment done": "label-success",
    "payment failed": "label-danger",
    confirmed: "label-success",
    "pnr created": "label-warning",
    "pnr failed": "label-danger",
    "pnr in queue": "label-warning",
    ticketed: "label-success",
    "ticketing failed": "label-danger",
    "refunded request": "label-info",
    cancelled: "label-primary",
    refunded: "label-success",
    rejected: "label-danger",
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Filter bookings based on search query and filter
  const filteredBookings = bookings.filter((booking) => {
    const bookingId = booking?.booking_id ?? "";
    const serviceType = booking?.service_type ?? "";
    const supplier = booking?.supplier ?? "";
    const query = searchQuery?.toLowerCase() ?? "";

    const matchesSearch =
      bookingId.toLowerCase().includes(query) ||
      serviceType.toLowerCase().includes(query) ||
      supplier.toLowerCase().includes(query);
    const matchesFilter =
      filter.length === 0 ||
      filter.some((f) => f.value === booking.service_type);
    return matchesSearch && matchesFilter;
  });

  // Define action routes
  const actionRoutes = {
    reconciliation: "reconciliation",
    upload_document: "upload_document",
    send_email: "send_email",
    approve_payment: "approve_payment",
    add_hotel_confirmation: "add_hotel_confirmation",
    invoice: "invoice",
    download_invoice: "download_invoice",
    email_supplier: "email_supplier",
    add_tag: "add_tag",
    modify: "update",
    view: "read",
  };

  // Check if any actions are permitted to show the Actions column
  const hasAnyActionPermission = userhasPermission([
    actionRoutes.reconciliation,
    actionRoutes.upload_document,
    actionRoutes.send_email,
    actionRoutes.approve_payment,
    actionRoutes.add_hotel_confirmation,
    actionRoutes.invoice,
    actionRoutes.download_invoice,
    actionRoutes.email_supplier,
    actionRoutes.add_tag,
    actionRoutes.modify,
    actionRoutes.view,
  ]);

  return (
    <form className="mt-5">
      <div className="row mt-4 d-none">
        <div
          className="col-md-2"
          style={{ position: "relative", display: "inline-block" }}
        >
          <input
            type="text"
            className="tablesearch form-control form-control-sm search_new"
            placeholder="Search"
            style={{ paddingRight: "30px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i
            className="fa fa-search fa-lg"
            style={{
              color: "#fff",
              position: "absolute",
              top: "50%",
              right: "18px",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
        </div>
        <div className="col-md-2">
          <div
            className="form-group col-md-9 col-sm-12 col-xs-6 pull-right search-box-1"
            style={{ width: "221px" }}
          >
            <MultiSelect
              options={searchbooking_options}
              isMulti
              isSearchable
              placeholder="- All -"
              noOptionsMessage={() => "No Options Found"}
              className="custom-select"
              onChange={setFilter}
            />
          </div>
        </div>
      </div>
      <div
        id="search_controller_wrapper"
        className="dataTables_wrapper form-inline dt-bootstrap no-footer"
      >
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
              {/* <div className="suwala-doubleScroll-scroll" style={{ height: "20px", width: "1320px" }} /> */}
            </div>
            <div id="wrapper2">
              <table
                id="searchbookingTable"
                className="table  table-responsive dataTable no-footer table table-bordered"
                role="grid"
                aria-describedby="search_sup_info"
                width="2500px"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Service Type</th>
                    <th>Booking Id</th>
                    <th>Status</th>
                    <th>Destination</th>
                    <th>Amount</th>
                    <th>Booking Date</th>
                    <th>Service Date</th>
                    <th>Deadline Date</th>
                    <th>Supplier</th>
                    <th>Supplier Ref. #</th>
                    <th>Traveler Name</th>
                    {hasAnyActionPermission && (
                      <th
                        className="no-sort lastColumn sorting_disabled"
                        id="lastColumn"
                      >
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td
                        colSpan={hasAnyActionPermission ? 13 : 12}
                        className="text-center"
                      >
                        No bookings found
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((booking, index) => (
                      <tr key={booking.booking_id}>
                        <td>{index + 1}</td>
                        <td>{booking.service_type}</td>
                        <td>{booking.booking_id}</td>
                        <td>
                          <span>
                            <h5 className="label-heading">
                              <span
                                className={`td_label ${
                                  booking.booking_status?.toLowerCase() ===
                                    "failed" ||
                                  booking.booking_status?.toLowerCase() ===
                                    "payment failed"
                                    ? "label-primary"
                                    : statusClassMap[
                                        booking.booking_status?.toLowerCase()
                                      ] || "label-default"
                                }`}
                              >
                                {booking.booking_status || "Pending"}
                              </span>
                            </h5>
                          </span>
                          {booking.service_type.toLowerCase() === "flight" && (
                            <div className="iconCont">
                              <span
                                className="td_label label-warning"
                                data-bs-toggle="tooltip"
                                data-placement="top"
                              >
                                {booking.origin}
                              </span>{" "}
                              <span
                                className="td_label label-warning"
                                data-bs-toggle="tooltip"
                                data-placement="top"
                              >
                                {booking.destination}
                              </span>
                            </div>
                          )}
                        </td>
                        <td>{booking.destination || "N/A"}</td>
                        <td>
                          {booking.currency} {booking.amount}
                        </td>
                        <td>
                          <div className="dateWrapper">
                            <div className="onlyDate">
                              {formatDate(booking.createdAt)?.split(" ")[0]}
                            </div>
                            <div className="monthYear">
                              {formatDate(booking.createdAt)?.split(" ")[1]}
                            </div>
                            {formatTime(booking.createdAt)}
                          </div>
                        </td>
                        <td>
                          {booking?.service_start_date ? (
                            <div className="dateWrapper">
                              <div className="onlyDate">
                                {booking.service_start_date
                                  ? formatDate(
                                      booking.service_start_date
                                    )?.split(" ")[0]
                                  : "N/A"}
                              </div>
                              <div className="monthYear">
                                {booking.service_start_date
                                  ? formatDate(
                                      booking.service_start_date
                                    )?.split(" ")[1] +
                                    " " +
                                    formatDate(
                                      booking.service_start_date
                                    )?.split(" ")[2]
                                  : "N/A"}
                              </div>
                            </div>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td>
                          {booking?.service_end_date ? (
                            <div className="dateWrapper withTime">
                              <div className="dateWrapper">
                                <div className="onlyDate">
                                  {booking?.service_end_date
                                    ? formatDate(
                                        booking?.service_end_date
                                      )?.split(" ")[0]
                                    : ""}
                                </div>
                                <div className="monthYear">
                                  {booking?.service_end_date
                                    ? formatDate(
                                        booking?.service_end_date
                                      )?.split(" ")[1]
                                    : ""}
                                  <br />{" "}
                                  {booking?.service_end_date
                                    ? formatDate(
                                        booking?.service_end_date
                                      ).split(" ")[2]
                                    : ""}
                                </div>
                                {booking?.service_end_date
                                  ? formatTime(booking?.service_end_date)
                                  : ""}
                              </div>
                            </div>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td>{booking.supplier}</td>
                        <td>{booking.supplierRef}</td>
                        <td
                          style={{ cursor: "pointer" }}
                          data-id={113}
                          className="agent_details_on_click"
                        >
                          {booking.passengers &&
                          Array.isArray(booking.passengers) &&
                          booking.passengers[0]
                            ? booking.passengers[0].firstName
                            : ""}
                          <br />
                          <span style={{ color: "grey" }}>
                            {booking.passengers &&
                            Array.isArray(booking.passengers) &&
                            booking.passengers[0]
                              ? booking.passengers[0].lastName
                              : "N/A"}
                          </span>
                        </td>
                        {hasAnyActionPermission && (
                          <td className="actionlink actionlink1">
                            <div className="actionCont d-flex align-items-center">
                              {/* {userhasPermission([actionRoutes.view]) && ( */}
                              <Link
                                to={
                                  Constants.URLConstants.BOOKINGSVIEWBOOKING +
                                  `/${booking.booking_id}`
                                }
                                className="input-group-addon addFirst mr-2"
                                data-toggle="tooltip"
                                title="View"
                              >
                                <i class="fa fa-eye" aria-hidden="true"></i>
                              </Link>
                              <Link
                                to={
                                  booking.type === "hotel"
                                    ? `/edit/hotel/booking/${booking.booking_id}`
                                    : `/edit/flight/booking/${booking.booking_id}`
                                }
                                className="input-group-addon addFirst mr-2"
                                data-toggle="tooltip"
                                title="Edit"
                              >
                                <i class="fa fa-edit" aria-hidden="true"></i>
                              </Link>

                              {/* )} */}
                            </div>
                            {/* <div className="actionCont" style={{ marginLeft: expandedRow === index ? "0%" : "33%" }}>
                              <div className="input-group-addon" onClick={() => toggleActions(index)} style={{ cursor: "pointer" }}>
                                <span>
                                  <i className="fa fa-ellipsis-v" style={{ rotate: "90deg" }} />{" "}
                                </span>
                              </div> */}
                            {/* {expandedRow === index && (
                                <> */}
                            {/* {userhasPermission([actionRoutes.reconciliation]) && (
                                    <div className="input-group-addon">
                                      <Link
                                        href="#"
                                        onClick={() =>
                                          window.open(
                                            `reconciliation.php?run=1&booking_id=${booking.booking_id}&sel_bk_type=online`
                                          )
                                        }
                                        className="fa fa-flag text-danger"
                                        data-bs-toggle="tooltip"
                                        title="Recon Pending"
                                      />
                                    </div>
                                  )} */}
                            {/* {userhasPermission([actionRoutes.upload_document]) && (
                                    <div className="input-group-addon" data-bs-toggle="tooltip" title="Upload Document" data-placement="top">
                                      <Link to={Constants.URLConstants.ADMINLOCK2}>
                                        <i className="fa fa-upload" />
                                      </Link>
                                    </div>
                                  )}
                                  {userhasPermission([actionRoutes.send_email]) && (
                                    <div className="input-group-addon">
                                      <span
                                        data-bs-toggle="tooltip"
                                        title="Send Booking Email"
                                        data-placement="top"
                                        onClick={() => handleSendBookingEmail(booking.booking_id)}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <span className="fa fa-envelope-o pointer" />
                                        <span
                                          style={{ display: "none" }}
                                          id={`booking_email_loader_${booking.booking_id}`}
                                          className="fa fa-spinner fa-spin"
                                        />
                                      </span>
                                    </div>
                                  )}
                                  {userhasPermission([actionRoutes.approve_payment]) && (
                                    <div className="input-group-addon">
                                      <span
                                        data-bs-toggle="tooltip"
                                        title="Approve Payment"
                                        data-placement="top"
                                        onClick={() => handleApprovePayment(booking.booking_id)}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <span id={`payment_status_icon_${booking.booking_id}`} className="fa fa-thumbs-o-up" />
                                        <span
                                          style={{ display: "none" }}
                                          id={`payment_status_loader_${booking.booking_id}`}
                                          className="fa fa-spinner fa-spin"
                                        />
                                      </span>
                                    </div>
                                  )}
                                  {userhasPermission([actionRoutes.add_hotel_confirmation]) && (
                                    <div className="input-group-addon" style={{ cursor: "pointer" }}>
                                      <span
                                        title="Add Hotel confirmation number"
                                        data-bs-toggle="modal"
                                        data-bs-target="#emailCont"
                                        style={{ position: "relative" }}
                                      >
                                        <i className="fa fa-building" />
                                      </span>
                                    </div>
                                  )}
                                  {userhasPermission([actionRoutes.invoice]) && (
                                    <div className="input-group-addon">
                                      <Link id={`invoice_email_icon_${booking.booking_id}`} className="input-group-addon">
                                        <span
                                          className="fa fa-file-text"
                                          alt="Invoice"
                                          data-bs-toggle="tooltip"
                                          title="Invoice"
                                          data-placement="top"
                                        />
                                      </Link>
                                      <span
                                        style={{ display: "none" }}
                                        id={`invoice_email_loader_${booking.booking_id}`}
                                        className="fa fa-spinner fa-spin"
                                      />
                                    </div>
                                  )}
                                  {userhasPermission([actionRoutes.download_invoice]) && (
                                    <div className="input-group-addon">
                                      <Link
                                        href={`http://beta.tdonlines.com/tms/print_invoice.php?reservationid=${booking.booking_id}&id=${booking.booking_id}&agentId=291&pdf=1&service_type=${booking.service_type.toLowerCase()}`}
                                        className="input-group-addon"
                                        style={{ display: "block" }}
                                        target="_blank"
                                      >
                                        <span
                                          className="fa fa-download"
                                          alt="Download Invoice"
                                          data-bs-toggle="tooltip"
                                          title="Download Invoice"
                                          data-placement="top"
                                        />
                                      </Link>
                                      <span
                                        style={{ display: "none" }}
                                        id={`invoice_email_loader_${booking.booking_id}`}
                                        className="fa fa-spinner fa-spin"
                                      />
                                    </div>
                                  )}
                                  {userhasPermission([actionRoutes.email_supplier]) && (
                                    <div className="input-group-addon">
                                      <span
                                        className="fa-stack fa-md"
                                        alt="Email restricted for Online Supplier"
                                        data-bs-toggle="tooltip"
                                        title="Email restricted for Online Supplier"
                                        data-placement="top"
                                      >
                                        <i className="fa fa-envelope-o fa-stack-1x" />
                                        <i className="fa fa-ban fa-stack" />
                                      </span>
                                      <span
                                        style={{ display: "none" }}
                                        id={`supplier_email_loader_${booking.booking_id}`}
                                        className="fa fa-spinner fa-spin"
                                      />
                                    </div>
                                  )}
                                  {userhasPermission([actionRoutes.add_tag]) && (
                                    <div className="input-group-addon">
                                      <span data-bs-toggle="tooltip" data-placement="top" title="Click to pick">
                                        <Link href="#" className="fa fa-tag" data-bs-toggle="modal" data-bs-target="#myModal1" />
                                      </span>
                                    </div>
                                  )}
                                  {userhasPermission([actionRoutes.modify]) && (

                                    <div className="input-group-addon">
                                      <span data-bs-toggle="tooltip" title="Modify Booking">
                                        <Link
  to={`/edit-booking/${booking.booking_id}`}
  state={booking} // pass booking data to EditBookingDetails page
  className="fa fa-pencil-square-o"
  style={{ color: "#555" }}
/>

                                      </span>
                                    </div>
                                  )} */}
                            {/* {userhasPermission([actionRoutes.view]) && (
                                    <div className="input-group-addon">
                                      <span data-bs-toggle="tooltip" title="View Booking">
                                        <Link
                                          to={Constants.URLConstants.BOOKINGSVIEWBOOKING + `/${booking.booking_id}`}
                                          target="_blank"
                                          className="fa fa-eye"
                                        />
                                      </span>
                                    </div>
                                  )}
                                </>
                              )}
                            </div> */}
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BookingTable;
