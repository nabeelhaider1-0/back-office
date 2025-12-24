import React from "react";
import { Link } from "react-router-dom";
import minus from "../../../assets/images/minus_white_img.jpg";

const TermsConditions = ({ bookingData, show_span_remark }) => {
  const bookingDetail = bookingData;
  const hotelInfo =
    bookingDetail.service_type.toLowerCase() === "hotel" &&
    bookingDetail.hotelinfo &&
    bookingDetail.hotelinfo.searchHotelDetails
      ? bookingDetail.hotelinfo
      : null;
  const cancellation_rules =
    hotelInfo?.searchedRoomDetails?.cancellation_rules || null;
  const roomDetails = hotelInfo?.searchedRoomDetails || null;

  return (
    <>
      <tr className="phps_row_1 tblHeading" id="acc2">
        <td colSpan={4}>
          <img src={minus} id="moreFilterBtn2" alt="cri" /> Terms and Conditions
        </td>
      </tr>
      <tr id="accCont2" className="accContent">
        <td colSpan={4}>
          <div className="contwrap" id="r_2">
            <table
              width="100%"
              cellPadding={2}
              cellSpacing={1}
              align="center"
              border={0}
              className="table table-bordered table-responsive table-box tableborder"
            >
              <tbody className="bg-white">
                <tr className="phps_row_0">
                  <td valign="top" width="25%">
                    Cancellation Policy
                  </td>
                  <td colSpan={3} width="75%">
                    {roomDetails?.rooms?.map((room, index) => (
                      <div key={index}>
                        <strong>
                          {room.room_type} [{room.no_of_adults} adults{" "}
                          {room.no_of_children || 0} Child]
                        </strong>
                        <br />
                        {(() => {
                          const cancellationDetails = [];
                          if (cancellation_rules?.cancellationDetails) {
                            let termIndex = 0;
                            for (let term of cancellation_rules.cancellationDetails) {
                              cancellationDetails.push(
                                <div key={termIndex}>
                                  {term.text}{" "}
                                  {term.nights && `(Nights: ${term.nights})`}{" "}
                                  {term.deductionAmount &&
                                    `(Deduction: ${term.deductionAmount})`}
                                </div>
                              );
                              termIndex++;
                            }
                          }
                          return cancellationDetails;
                        })()}
                        <hr />
                        <strong>
                          {room.room_type} [{room.no_of_adults} adults{" "}
                          {room.no_of_children || 0} Child]
                        </strong>
                        <br />
                        {cancellation_rules?.noCancellationFeeMessage ||
                          "No cancellation fee information available."}
                        <hr />
                        <strong>
                          {room.room_type} [{room.no_of_adults} adults{" "}
                          {room.no_of_children || 0} Child]
                        </strong>
                        <br />
                        {cancellation_rules?.noShowFee?.text ||
                          "No show fee information available."}
                        <hr />
                      </div>
                    ))}
                  </td>
                </tr>
                <tr className="phps_row_1">
                  <td valign="top" width="25%">
                    Contract Comment
                  </td>
                  <td colSpan={3} width="75%">
                    {/* Render specific fields from rate_comments */}
                    {roomDetails?.rate_comments?.remarks ||
                      "No remarks available."}
                    <br />
                    {roomDetails?.rate_comments?.comments ||
                      "No comments available."}
                    <br />
                    {roomDetails?.rate_comments?.mealplan ||
                      "No meal plan information available."}
                    <br />
                    {roomDetails?.rate_comments?.MandatoryTax
                      ? `Mandatory Tax: ${roomDetails.rate_comments.MandatoryTax}`
                      : "No mandatory tax information available."}
                    <br />
                    {roomDetails?.rate_comments?.pax_comments ||
                      "No passenger comments available."}
                  </td>
                </tr>
                <tr className="phps_row_0">
                  <td width="25%">Special Comment</td>
                  <td colSpan={3} width="75%">
                    <span
                      id="display_voucher_remark_29401"
                      className="input-group col-md-12 col-sm-12"
                    >
                      <span
                        id="voucher_remark_show_29401"
                        style={{
                          display: "table-cell",
                          verticalAlign: "middle",
                        }}
                      >
                        <font color="#008000">-</font>
                      </span>
                      <div
                        className="input-group-addon"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Edit"
                        style={{ marginLeft: "980px" }}
                      >
                        <Link>
                          <h6>
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                            />
                          </h6>
                        </Link>
                      </div>
                    </span>
                    <span
                      className="input-group date col-md-12 col-sm-12"
                      id="edit_voucher_remark_"
                      style={{ display: "none" }}
                    >
                      <textarea
                        className="form-control"
                        rows={5}
                        cols={30}
                        name="voucher_remark_"
                        id="voucher_remark_29401"
                        defaultValue=""
                      />
                      <div
                        className="input-group-addon"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Save"
                      >
                        <Link>
                          <h6>
                            <i className="fa fa-floppy-o" aria-hidden="true" />
                          </h6>
                        </Link>
                      </div>
                      <div
                        className="input-group-addon"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Cancel"
                      >
                        <Link>
                          <h6>
                            <i className="fa fa-times" aria-hidden="true" />
                          </h6>
                        </Link>
                      </div>
                    </span>
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

export default TermsConditions;
