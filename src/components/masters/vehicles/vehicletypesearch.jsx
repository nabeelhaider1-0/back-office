import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";

import Constants from "../../../constants/routes";
import React, { useEffect, useState } from "react";
import {
  ErrorApiAlert,
  PaginationSetter,
  deleteConfirmation,
} from "../../../constants/globalfunctions";
import { delDATA, getDATA } from "../../../Apis/API";
import { setEditVehicleData } from "../../../state/action/actions";
import loadingGif from "../../../assets/images/loadingblue.gif";
import { connect } from "react-redux";
import ApiRoutes from "../../../constants/ApiRoutes";

const MastersVehiclesTypeSearch = ({ setEditVehicleData }) => {
  const [vehicletypeData, setVehicleTypeData] = useState([]);
  const [originalvehicletypeData, setOriginalVehicleTypeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [formData, setFormData] = useState({
    vehicleCode: "",
    vehicleType: "",
    maxPassenger: "",
    maxLuggage: "",
  });
  const handleEdditClick = (vehicle) => {
    setEditVehicleData(vehicle);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const getVehicleTypes = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.VEHICLES.VEHICLE);

      if (response.data.statusCode === 200) {
        const vehicleTypes =
          response && response.data.data ? response.data.data : [];

        setVehicleTypeData(vehicleTypes);
        setOriginalVehicleTypeData(vehicleTypes);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Vehicle Type");
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Vehicle Type?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Vehicle Type has been deleted successfully.",
        ApiRoutes.VEHICLES.VEHICLE
      );

      if (isDeleted) {
        setOriginalVehicleTypeData((vehicles) =>
          vehicles.filter((vehicle) => vehicle.uuid !== uuid)
        );
        setVehicleTypeData((vehicles) =>
          vehicles.filter((vehicle) => vehicle.uuid !== uuid)
        );
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };
  useEffect(() => {
    getVehicleTypes();
  }, []);

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filtereData = originalvehicletypeData.filter((veh) =>
      veh.vehicleType.toLowerCase().includes(value.toLowerCase())
    );

    setVehicleTypeData(filtereData);
  };
  const resetform = (event) => {
    event.preventDefault();

    // First, set the form data
    setFormData({
      vehicleCode: "",
      vehicleType: "",
      maxPassenger: "",
      maxLuggage: "",
    });

    setVehicleTypeData(originalvehicletypeData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredVehicles = originalvehicletypeData.filter((veh) => {
      // Convert strings to lowercase for case-insensitive comparison
      const lowervehicleType = (veh.vehicleType || "").toLowerCase();
      const lowermaxPassenger = (veh.maxPassenger || "").toLowerCase();
      const lowerCity = (veh.maxLuggage || "").toLowerCase();

      // Check if each field matches the corresponding search criteria
      const matchesVehiclType = lowervehicleType.includes(
        (formData.vehicleType || "").toLowerCase()
      );

      const matchesmaxpassenger = lowermaxPassenger.includes(
        (formData.maxPassenger || "").toLowerCase()
      );

      const matcheslowercity = lowerCity.includes(
        (formData.maxLuggage || "").toLowerCase()
      );

      // Return true if all search criteria match
      return matchesVehiclType && matchesmaxpassenger && matcheslowercity;
    });

    setVehicleTypeData(filteredVehicles);
  };
  const { currentdata, noofPages } = PaginationSetter(
    currentPage,
    vehicletypeData
  );
  const totalPages = noofPages;
  const currentVehicleTypes = currentdata;
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header2
        title="SEARCH VEHICLE TYPE"
        linkText1="Search Vehicles"
        linkText2="Add Vehicle Type"
        link2={Constants.URLConstants.MASTERSVEHICLESTYPENEW}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form onClick={handleSubmit}>
            <input type="hidden" name="action" defaultValue="search" />
            <div className="row">
              <div className="col-md-2 form-group">
                <label>Vehicle Type</label>
                <input
                  type="text"
                  name="vehicleType"
                  id="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                  className="form-control form-control-sm required test123"
                  maxLength={255}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Max. Passanger Capacity</label>
                <input
                  type="text"
                  name="maxPassenger"
                  id="maxPassenger"
                  value={formData.maxPassenger}
                  onChange={handleInputChange}
                  className="form-control form-control-sm required"
                  maxLength={10}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Max. Lugguage Capacity</label>
                <input
                  type="text"
                  name="maxLuggage"
                  id="maxLuggage"
                  value={formData.maxLuggage}
                  onChange={handleInputChange}
                  className="form-control form-control-sm required"
                  maxLength={10}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-2 form-group">
                <span id="submit_td">
                  <button className="btn btn-dark btn-sm">
                    <i className="fa fa-search" aria-hidden="true"></i> Search
                  </button>
                </span>
                &nbsp;&nbsp;
                <button
                  className="btn btn-outline-secondary btn-sm"
                  type="reset"
                  id="reset"
                  name="reset"
                  value="reset"
                  onClick={resetform}
                  data
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
                <div className="hpanel col-md-12">
                  <div className="panel-body removeMargins">
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
                                placeholder="Vehicle Type"
                                aria-controls="search_creadit_note"
                                value={searchInput}
                                onChange={handleInputSearchChange}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="search_vehicle_wrapper"
                      className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                    >
                      <div
                        id="search_controller_wrapper"
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
                            >
                              <div
                                className="suwala-doubleScroll-scroll"
                                style={{ height: "20px", width: "1320px" }}
                              />
                            </div>
                            <div id="wrapper2" style={{ overflow: "auto" }}>
                              <table
                                id="search_vehicle"
                                className="table table-bordered   table-responsive table-bordered dataTable no-footer"
                                role="grid"
                                aria-describedby="search_vehicle_info"
                              >
                                <thead>
                                  <tr role="row">
                                    <th
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="search_vehicle"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Vehicle Type: activate to sort column ascending"
                                      style={{ width: "390.2px" }}
                                    >
                                      Vehicle Type
                                    </th>
                                    <th
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="search_vehicle"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Max. Passanger Capacity: activate to sort column ascending"
                                      style={{ width: "406.2px" }}
                                    >
                                      Max. Passanger Capacity
                                    </th>
                                    <th
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="search_vehicle"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Max. Lugguage Capacity: activate to sort column ascending"
                                      style={{ width: "388.2px" }}
                                    >
                                      Max. Lugguage Capacity
                                    </th>
                                    <th
                                      className="no-sort sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Action"
                                      style={{ width: "198px" }}
                                    >
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white">
                                  {currentVehicleTypes.map((vehicle, index) => (
                                    <React.Fragment key={index}>
                                      <tr
                                        role="row"
                                        className={
                                          "phps_row_" +
                                          (index % 2 === 0 ? "0 even" : "1 odd")
                                        }
                                      >
                                        <td className="text-center">
                                          {vehicle.vehicleType}
                                        </td>
                                        <td className="text-center">
                                          {vehicle.maxPassenger}
                                        </td>
                                        <td className="text-center">
                                          {vehicle.maxLuggage}
                                        </td>
                                        <td className="actionlink">
                                          <div
                                            className="actionCont"
                                            style={{ width: "58px" }}
                                          >
                                            <div className="input-group-addon">
                                              <Link
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title
                                                to={
                                                  Constants.URLConstants
                                                    .MASTERSVEHICLESTYPEEDIT
                                                }
                                                data-original-title="Edit"
                                                onClick={() =>
                                                  handleEdditClick(vehicle)
                                                }
                                              >
                                                <i className="fa fa-pencil-square-o" />
                                              </Link>
                                            </div>
                                            <div className="input-group-addon">
                                              <Link
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title
                                                data-original-title="Delete"
                                                onClick={() =>
                                                  handleDeleteClick(
                                                    vehicle.uuid
                                                  )
                                                }
                                              >
                                                <i className="fa fa-trash" />
                                              </Link>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </React.Fragment>
                                  ))}
                                </tbody>
                              </table>
                            </div>
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

export default connect(null, { setEditVehicleData })(MastersVehiclesTypeSearch);
