import React from "react";
import { Link } from "react-router-dom";
import minus from "../../../assets/images/minus_white_img.jpg";

const BookingInfo = ({ bookingData, show_span_id }) => {
  const bookingDetail = bookingData; // Directly use bookingData, assuming it's the correct object
  const hotelInfo =
    bookingDetail.service_type.toLowerCase() === "hotel" &&
    bookingDetail.hotelinfo &&
    bookingDetail.hotelinfo.searchHotelDetails
      ? bookingDetail.hotelinfo
      : null;

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const statusClassMap = {
    "payment done": "label-info",
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

  return (
    <>
      <tr className="phps_row_1 tblHeading">
        <td colSpan={4}>
          <img src={minus} id="moreFilterBtn" alt="cri" /> Booking Information
        </td>
      </tr>
      <tr className="phps_row_0 accContent" id="accCont1">
        <td colSpan={4}>
          <div className="contwrap" id="r_1">
            <table
              width="100%"
              cellPadding={2}
              cellSpacing={1}
              align="left"
              border={0}
              className="table table-bordered table-responsive table-box tableborder"
            >
              <tbody className="bg-white">
                <tr>
                  <td nowrap="nowrap" width="25%">
                    Booking ID
                  </td>
                  <td width="75%" colSpan={3}>
                    <div>{bookingDetail.booking_id}</div>
                  </td>
                </tr>
                <tr className="phps_row_1">
                  <td width="25%">Current Status</td>
                  <td width="25%">
                    <h5 className="label-heading">
                      <span
                        className={`td_label ${
                          statusClassMap[
                            bookingDetail.booking_status?.toLowerCase()
                          ] || "label-default"
                        }`}
                      >
                        {bookingDetail.booking_status || "Pending"}
                      </span>
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td>Booking Date</td>
                  <td>{bookingDetail?.booking_timestamps?.date || ""}</td>
                  <td>
                    Deadline Date{" "}
                    <i
                      className="fa fa-info-circle"
                      title="NOTE : As per Admin's Time Zone"
                      data-toggle="tooltip"
                      data-placement="top"
                      aria-hidden="true"
                    />
                  </td>
                  <td>
                    {bookingDetail.service_type.toLowerCase() === "flight"
                      ? formatDateTime(bookingDetail.service_start_date)
                      : hotelInfo && hotelInfo.searchHotelDetails?.checkIn
                      ? hotelInfo.searchHotelDetails?.checkIn
                      : ""}
                  </td>
                </tr>
                <tr className="phps_row_0">
                  <td>
                    {bookingDetail.service_type.toLowerCase() === "flight"
                      ? "PNR"
                      : "Hotel Confirmation Number"}
                  </td>
                  <td>
                    {bookingDetail?.hotel_booking_id || bookingDetail?.pnr}
                  </td>
                </tr>
                <tr className="phps_row_0">
                  <td>
                    {bookingDetail.service_type.toLowerCase() === "flight"
                      ? "Departure Date"
                      : "Check In Date"}
                  </td>
                  <td>
                    {bookingDetail.service_type.toLowerCase() === "flight"
                      ? formatDateTime(bookingDetail.service_start_date)
                      : hotelInfo && hotelInfo.searchHotelDetails?.checkIn
                      ? hotelInfo.searchHotelDetails?.checkIn
                      : ""}
                  </td>
                  <td>
                    {bookingDetail.service_type.toLowerCase() === "flight"
                      ? "Arrival Date"
                      : "Check Out Date"}
                  </td>
                  <td>
                    {bookingDetail.service_type.toLowerCase() === "flight"
                      ? formatDateTime(bookingDetail.service_end_date)
                      : hotelInfo && hotelInfo.searchHotelDetails?.checkOut
                      ? hotelInfo.searchHotelDetails?.checkOut
                      : ""}
                  </td>
                </tr>
                <tr className="phps_row_1">
                  <td>Remark:</td>
                  <td>
                    {hotelInfo && hotelInfo.searchHotelDetails?.comments
                      ? hotelInfo.searchHotelDetails?.comments
                      : ""}
                  </td>
                  {bookingDetail.service_type.toLowerCase() === "hotel" && (
                    <>
                      <td># of Nights</td>
                      <td>
                        {hotelInfo?.searchHotelDetails?.no_of_nights
                          ? hotelInfo.searchHotelDetails.no_of_nights
                          : hotelInfo?.searchHotelDetails?.checkIn &&
                            hotelInfo?.searchHotelDetails?.checkOut
                          ? Math.ceil(
                              (new Date(
                                hotelInfo.searchHotelDetails.checkOut
                              ).getTime() -
                                new Date(
                                  hotelInfo.searchHotelDetails.checkIn
                                ).getTime()) /
                                (1000 * 60 * 60 * 24)
                            )
                          : ""}
                      </td>{" "}
                    </>
                  )}
                </tr>
                {bookingDetail.service_type.toLowerCase() === "hotel" && (
                  <tr className="phps_row_0">
                    <td>Hotel</td>
                    <td>
                      {hotelInfo && hotelInfo.searchHotelDetails?.hotel_name
                        ? hotelInfo.searchHotelDetails?.hotel_name
                        : ""}
                    </td>
                    <td>Telephone #</td>
                    <td />
                  </tr>
                )}

                {bookingDetail.service_type.toLowerCase() === "hotel" && (
                  <>
                    <tr className="phps_row_1">
                      <td>Address</td>
                      <td colSpan={3} className="table-right-no-margin">
                        {hotelInfo &&
                        hotelInfo.searchHotelDetails?.hotel_address
                          ? hotelInfo.searchHotelDetails?.hotel_address
                          : ""}
                      </td>
                    </tr>
                    <tr className="phps_row_0">
                      <td>City</td>
                      <td>{bookingDetail?.hotelDetails?.city_name || ""}</td>
                      <td>Country</td>
                      <td>{bookingDetail?.hotelDetails?.country_name || ""}</td>
                    </tr>
                  </>
                )}
                <tr className="phps_row_0">
                  <td>Contact Email</td>
                  <td>{bookingDetail?.contact?.email || ""}</td>
                  <td>Contact Number</td>
                  <td>
                    {bookingDetail?.contact?.countryCode}-
                    {bookingDetail?.contact?.phoneNumber}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </>
  );
};

export default BookingInfo;
