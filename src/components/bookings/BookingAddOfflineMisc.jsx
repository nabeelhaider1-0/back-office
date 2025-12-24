import React, { useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { edtoptions, supplierTypeOptions } from "../../constants/contants";
import Constants from "../../constants/routes";

const BookingAddOfflineMisc = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="ADD OFFLINE MISC SERVICES
"
          linkText1="Search Bookings"
          linkText2="Add Offline Misc Services"
          link1="/"
        />

        <div>
          <div
            className="panel-body"
            style={{
              backgroundColor: "#FF5015",
              paddingBottom: "1px",
              paddingTop: "4px",
            }}
          >
            <div className="row">
              <div className="col-md-12">
                <h5
                  style={{
                    color: "white",
                    fontSize: "15px",
                    marginLeft: "20px",
                  }}
                >
                  Booking Date : 26-Jul-2023 11:47:26
                </h5>
              </div>
            </div>
          </div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-3 mb-2">
                  <label>Agent Information</label>

                  <MultiSelect
                    options={edtoptions}
                    isMulti
                    isSearchable
                    placeholder="Select Agent..."
                    noOptionsMessage={() => "No Agent Found"}
                    className="custom-select required"
                  />
                </div>
                <div id="sub_user">
                  <div className="phps_row_1 row">
                    <div id="add_sub_user" />
                  </div>
                </div>
                <div id="sub_agent">
                  <div className="phps_row_1 row">
                    <div id="add_sub_agent" />
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="exampleInputEmail1">Credit Value</label>
                  <div id="id_credit_value">0</div>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="exampleInputEmail1">Credit Usage</label>
                  <div id="id_credit_usage">0</div>
                </div>
                <div className="form-group col-md-3 ">
                  <label>Service Date</label>
                  <div
                    className="input-group date col-md-12 col-sm-12 col-xs-12"
                    id="booking_to_date_cal"
                  >
                    <Flatpickr
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      options={{ dateFormat: "Y-m-d" }}
                      style={{ width: "300px" }}
                    />
                    <span className="input-group-addon dateIcon">
                      <i className="fa fa-th" />
                    </span>
                    <span
                      className="input-group-addon"
                      id="checkTrashBtn"
                      onClick={handleTrashClick}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <label>Services</label>

                  <MultiSelect
                    options={supplierTypeOptions}
                    isMulti
                    isSearchable
                    placeholder="- Select Service -"
                    noOptionsMessage={() => "No Agent Found"}
                    className="custom-select required"
                  />
                </div>
              </div>
              <div className="form-group mt-3">
                <Link
                  to={Constants.URLConstants.BOOKINGSADDOFFLINEMISCSERVICES}
                >
                  {" "}
                  <button
                    className="btn btn-dark btn-sm"
                    type="button"
                    name="modify"
                    value="Add Offline Booking"
                  >
                    <i className="fa fa-plus" />
                    &nbsp;Add Offline Booking
                  </button>
                </Link>
                &nbsp;&nbsp;
                <button
                  className="btn btn-dark btn-sm"
                  type="button"
                  name="cancel"
                  value="Cancel"
                  onclick="javascriptcallCancel();"
                >
                  <i className="fa fa-times" />
                  &nbsp;Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default BookingAddOfflineMisc;
