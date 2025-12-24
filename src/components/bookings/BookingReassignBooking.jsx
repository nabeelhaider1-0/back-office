import React, { useState } from "react";
import Header2 from "../header2/header2";

const BookingReAssignBooking = () => {
  const [showHiddenBlock, setShowHiddenBlock] = useState(false);

  // Function to handle the search button click
  const handleSearchClick = () => {
    // Perform any search-related logic here if needed
    // For now, just toggle the visibility of the hidden block
    setShowHiddenBlock(!showHiddenBlock);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="BOOKING AGENT EXCHANGE"
          linkText1="Booking Agent Exchange"
        />

        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-2 form-group">
                  <label>Booking ID</label>
                  <input
                    className="form-control form-control-sm test123"
                    type="text"
                    name="txt_booking_id"
                    id="txt_booking_id"
                    size={10}
                    placeholder="Enter Booking id"
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-2 form-group">
                  <button
                    className="btn btn-dark btn-sm form-group search"
                    name="submit1"
                    type="button"
                    id="booking_search_button"
                    onClick={handleSearchClick}
                  >
                    <i className="fa fa-search" /> Search
                  </button>
                </div>
              </div>
            </div>
          </form>
          <br />
          <form style={{ display: showHiddenBlock ? "block" : "none" }}>
            <div className="panel-body hidden_agent_details">
              <div className="row mt-2">
                <div className=" form-group col-md-12">
                  <h5>Existing details:</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 form-group">
                  <label>Agent</label>
                  <input
                    className="form-control form-control-sm old-txt"
                    type="text"
                    name="old_agent_name"
                    id="old_agent_name"
                    size={10}
                    readOnly
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>User</label>
                  <input
                    className="form-control form-control-sm old-txt"
                    type="text"
                    name="old_sub_agent_name"
                    id="old_sub_agent_name"
                    size={10}
                    readOnly
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Operation Staff</label>
                  <input
                    className="form-control form-control-sm old-txt"
                    type="text"
                    name="old_sub_user_name"
                    id="old_sub_user_name"
                    size={10}
                    readOnly
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Booking done by</label>
                  <input
                    className="form-control form-control-sm old-txt"
                    type="text"
                    name="booking_done_by"
                    id="booking_done_by"
                    size={10}
                    readOnly
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col-md-12">
                  <h5>Assign to:</h5>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-md-3 form-group new_agent_group new_agent_details"
                  style={{ display: "block" }}
                >
                  <label>Agent</label>
                  <input
                    className="form-control form-control-sm class_new_agent_name ui-autocomplete-input"
                    type="text"
                    name="new_agent_name"
                    id="new_agent_name"
                    size={10}
                    placeholder="Enter new name or id"
                    autoComplete="off"
                  />
                </div>
                <div
                  className="col-md-3 form-group new_sub_agent_group new_agent_details"
                  style={{ display: "block" }}
                >
                  <label>User</label>
                  <input
                    className="form-control form-control-sm class_new_agent_name ui-autocomplete-input"
                    type="text"
                    name="new_sub_agent_name"
                    id="new_sub_agent_name"
                    size={10}
                    placeholder="Enter new name or id"
                    autoComplete="off"
                    disabled="disabled"
                    readOnly
                  />
                </div>
                <div
                  className="col-md-3 form-group new_sub_user_group new_agent_details"
                  style={{ display: "block" }}
                >
                  <label>Operation Staff</label>
                  <input
                    className="form-control form-control-sm class_new_agent_name ui-autocomplete-input"
                    type="text"
                    name="new_sub_user_name"
                    id="new_sub_user_name"
                    size={10}
                    placeholder="Enter new name or id"
                    autoComplete="off"
                    disabled="disabled"
                    readOnly
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-2 form-group">
                  <button
                    className="btn btn-outline-secondary btn-sm form-group search"
                    name="submit2"
                    type="button"
                    id="agent_assign_button"
                  >
                    <i className="fa fa-user" /> Assign
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default BookingReAssignBooking;
