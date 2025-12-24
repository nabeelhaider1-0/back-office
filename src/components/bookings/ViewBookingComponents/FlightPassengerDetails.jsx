import React from "react";
import { Link } from "react-router-dom";
import minus from "../../../assets/images/minus_white_img.jpg";

const PassengerDetails = ({
  bookingData,
  edit_pessenger,
  update_passenger,
  cancel_passenger,
}) => {
  const bookingDetail = bookingData;
  const passengersInfo = bookingData?.passengers || null;
  const flightData = bookingDetail?.iternary_details || {};

  // Reformat legs into segments if segments is missing
  const segments =
    flightData?.segments ||
    bookingDetail?.iternary_details?.legs?.flatMap((leg, legIndex) =>
      leg.map((segment, segmentIndex) => ({
        origin: segment.origin,
        destination: segment.destination,
        departure_date: segment.departure_date,
        departure_time: segment.departure_time,
        arrival_date: segment.arrival_date,
        arrival_time: segment.arrival_time,
        operated_by: segment.operated_by,
        flight_number: segment.flight_number,
      }))
    ) ||
    [];
  console.log("Segments:", segments);
  return (
    <>
      {/* Passenger Details Table */}
      <tr className="phps_row_1 tblHeading mt-2" id="acc3">
        <td colSpan={4}>
          <img src={minus} id="moreFilterBtn3" alt="cri" /> Passenger Details
        </td>
      </tr>
      <tr className="phps_row_0 accContent" id="accCont3">
        <td colSpan={4}>
          <div className="contwrap" id="r_3">
            <table className="table table-bordered  table-responsive text-center agent-text">
              <thead>
                <tr className="subHeader">
                  <td>Name</td>
                  <td>Gender</td>
                  <td>National ID</td>
                  <td>Date of Birth</td>
                  <td>Passport Number</td>
                  <td>Passport Country</td>
                  <td>Passport Expiry</td>
                  <td>Nationality</td>
                </tr>
              </thead>
              <tbody className="bg-white">
                {passengersInfo?.map((passenger, passengerIndex) => (
                  <tr key={passengerIndex}>
                    <td>
                      <p className="passengerNameTd">
                        {passenger.PassengerTitle}{" "}
                        {passenger.PassengerFirstName}{" "}
                        {passenger.PassengerLastName}
                      </p>
                    </td>
                    <td>{passenger.Gender === "M" ? "Male" : "Female"}</td>
                    <td>{passenger.NationalID || "-"}</td>
                    <td>{passenger.DateOfBirth || "-"}</td>
                    <td>{passenger.PassportNumber || "-"}</td>
                    <td>{passenger.PassportCountry || "-"}</td>
                    <td>{passenger.PassportExpiryDate || "-"}</td>
                    <td>{passenger.PassengerNationality || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
      <br />
      <br />

      {/* Flight Information Table */}
      <tr className="phps_row_1 tblHeading mt-2" id="acc4">
        <td colSpan={4}>
          <img src={minus} id="moreFilterBtn4" alt="cri" /> Flight Information
        </td>
      </tr>
      <tr className="phps_row_0 accContent" id="accCont4">
        <td colSpan={4}>
          <div className="contwrap" id="r_4">
            <table className="table table-bordered  table-responsive text-center agent-text">
              <thead>
                <tr className="subHeader">
                  <td>Origin</td>
                  <td>Destination</td>
                  <td>Departure</td>
                  <td>Arrival</td>
                  <td>Flight Number</td>
                </tr>
              </thead>
              <tbody className="bg-white">
                {segments.map((segment, segmentIndex) => (
                  <tr key={segmentIndex}>
                    <td>{segment.origin}</td>
                    <td>{segment.destination}</td>
                    <td>
                      {segment.departure_date && segment.departure_time
                        ? `${segment.departure_date} ${segment.departure_time}`
                        : segment.departureDateTime || "-"}
                    </td>
                    <td>
                      {segment.arrival_date && segment.arrival_time
                        ? `${segment.arrival_date} ${segment.arrival_time}`
                        : segment.arrivalDateTime || "-"}
                    </td>
                    <td>
                      {segment.operated_by || segment.operatedBy}{" "}
                      {segment.flight_number || segment.flightNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
      <br />
      <br />
    </>
  );
};

export default PassengerDetails;
