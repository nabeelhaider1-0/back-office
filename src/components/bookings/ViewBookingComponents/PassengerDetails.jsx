import React from "react";
import { Link } from "react-router-dom";
import minus from "../../../assets/images/minus_white_img.jpg";
import MultiSelect from "../../reactMultiSelect";
import { salutations } from "../../../constants/contants";

const PassengerDetails = ({
  bookingData,
  edit_pessenger,
  update_passenger,
  cancel_passenger,
}) => {
  const bookingDetail = bookingData;
  const passengersInfo = bookingData?.passengers || null;
  const hotelInfo =
    bookingDetail.service_type.toLowerCase() === "hotel" &&
    bookingDetail.hotelinfo &&
    bookingDetail.hotelinfo.searchHotelDetails
      ? bookingDetail.hotelinfo
      : null;
  const roomDetails = hotelInfo?.searchedRoomDetails || null;

  return (
    <>
      {/* Room Details Table */}
      <tr className="phps_row_1 tblHeading" id="acc1">
        <td colSpan={4}>
          <img src={minus} id="moreFilterBtn1" alt="cri" /> Room Details
        </td>
      </tr>
      <tr className="phps_row_0 accContent" id="accCont1">
        <td colSpan={4}>
          <div className="contwrap" id="r_1">
            <table className="table table-bordered  table-responsive text-center agent-text">
              <thead>
                <tr className="subHeader">
                  <td width="30%">Room Type</td>
                  <td width="20%">Number of Rooms</td>
                  <td width="25%">Check-in Date</td>
                  <td width="25%">Check-out Date</td>
                </tr>
              </thead>
              <tbody className="bg-white">
                {roomDetails?.rooms?.map((room, index) => (
                  <tr key={index}>
                    <td>{room.room_type}</td>
                    <td>{room.no_of_rooms || 1}</td>
                    <td>
                      {hotelInfo && hotelInfo.searchHotelDetails?.checkIn
                        ? hotelInfo.searchHotelDetails?.checkIn
                        : ""}
                    </td>
                    <td>
                      {hotelInfo && hotelInfo.searchHotelDetails?.checkOut
                        ? hotelInfo.searchHotelDetails?.checkOut
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </td>
      </tr>

      {/* Passenger Details Table */}
      <tr className="phps_row_1 tblHeading" id="acc3">
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
                  <td width="30%">Name</td>
                  <td width="20%">Nationality</td>
                  <td width="25%">Type</td>
                  <td width="25%">Guest Type</td>
                </tr>
              </thead>
              <tbody className="bg-white">
                {passengersInfo?.map((passenger, termIndex) => (
                  <tr key={termIndex}>
                    <td>
                      <div id={`edit${termIndex}`}>
                        <div
                          className="col-xs-11 text-left"
                          style={{
                            margin: "0px",
                            padding: "8px 0px 0px 0px",
                            height: "20px",
                            wordWrap: "break-word",
                          }}
                        >
                          <span id={`update_salutations${termIndex}`}>
                            {passenger.PassengerTitle}
                          </span>{" "}
                          <span id={`update_first_name${termIndex}`}>
                            {passenger.PassengerFirstName}
                          </span>{" "}
                          <span id={`update_last_name${termIndex}`}>
                            {passenger.PassengerLastName}
                          </span>
                        </div>
                      </div>
                      <div
                        id={`update${termIndex}`}
                        style={{ display: "none", position: "relative" }}
                      >
                        <div
                          id={`loading${termIndex}`}
                          style={{ position: "absolute", display: "none" }}
                        >
                          <img
                            src="/cpfv3/images/ajax_pagination_loading.gif"
                            alt=""
                          />
                        </div>
                        <input
                          type="hidden"
                          id={`id${termIndex}`}
                          defaultValue={passenger.pax_id}
                        />
                        <div className="col-md-2 col-sm-12">
                          <div className="row">
                            <div className="dropdown bootstrap-select box form-control show-menu-arrow">
                              <MultiSelect
                                options={salutations}
                                isMulti={false}
                                isSearchable
                                placeholder="- Title -"
                                noOptionsMessage={() => "No Option Found"}
                                className="custom-select"
                                defaultValue={{
                                  value: passenger.PassengerTitle,
                                  label: passenger.PassengerTitle,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                          <div className="row">
                            <input
                              type="text"
                              defaultValue={passenger.PassengerFirstName}
                              id={`first_name${termIndex}`}
                              title="First Name"
                              className="box form-control required"
                              maxLength={50}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="row">
                            <div className="input-group col-md-12 col-sm-12">
                              <input
                                type="text"
                                defaultValue={passenger.PassengerLastName}
                                id={`last_name${termIndex}`}
                                title="Last Name"
                                className="box form-control required"
                                maxLength={50}
                              />
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Save"
                              >
                                <Link
                                  onClick={() =>
                                    update_passenger(
                                      termIndex,
                                      0,
                                      passenger.pax_id,
                                      true,
                                      bookingData.booking_id
                                    )
                                  }
                                >
                                  <h6>
                                    <i
                                      className="fa fa-floppy-o"
                                      aria-hidden="true"
                                    />
                                  </h6>
                                </Link>
                              </div>
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Cancel"
                              >
                                <Link
                                  onClick={() =>
                                    cancel_passenger(
                                      termIndex,
                                      0,
                                      passenger.pax_id
                                    )
                                  }
                                >
                                  <h6>
                                    <i
                                      className="fa fa-times"
                                      aria-hidden="true"
                                    />
                                  </h6>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ clear: "both" }} />
                    </td>
                    <td>{passenger.PassengerNationality || "N/A"}</td>
                    <td>{passenger.PassengerType || "N/A"}</td>
                    <td>{passenger.guest_type || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </>
  );
};

export default PassengerDetails;
