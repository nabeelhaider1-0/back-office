import { Link } from "react-router-dom";
import loadingGif from "../../../../assets/images/loadingblue.gif";
import { useEffect, useState } from "react";
import Header2 from "../../../header2/header2";
import Constants from "../../../../constants/routes";
import MultiSelect from "../../../reactMultiSelect";
import Swal from "sweetalert2";
import {
  deleteHotellocations,
  getDATA,
  updateHotelLocationsAll,
  updateHotellocations,
} from "../../../../Apis/API";
import { setHotelsLocationsDataRedux } from "../../../../state/action/actions";
import { connect } from "react-redux";
import excelfilereader from "../../../../constants/excelfilereader";
import excelFileContent from "../../../../ExcelFiles/worldcities.xlsx";
import ApiRoutes from "../../../../constants/ApiRoutes";

const MastersHotelLocationSearch = ({ setHotelsLocationsDataRedux }) => {
  const handleViewEditClick = (location) => {
    setHotelsLocationsDataRedux(location); // Dispatch the action to set the editBranchData in the Redux store
  };

  const [loading, setLoading] = useState(true);

  const [locationData, setLocationData] = useState([]);
  const [originalLocationData, setOriginalLocationData] = useState([]);

  const getLocations = async () => {
    try {
      setLoading(true);
      const response = await getDATA(ApiRoutes.HOTELS.HOTEL_LOCATION);

      if (response.data.statusCode === 200) {
        const Locations =
          response && response.data.data ? response.data.data : [];
        setLocationData(Locations);
        setOriginalLocationData(Locations);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  const [searchInput, setSearchInput] = useState("");

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filteredLocationData = originalLocationData.filter((location) =>
      location.locationName.toLowerCase().includes(value.toLowerCase())
    );

    setLocationData(filteredLocationData);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(25); // Number of items per page
  // Calculate total number of pages
  const totalPages = Math.ceil(locationData.length / perPage);

  // Slice the userLogData array based on current page and items per page
  const indexOfLastLog = currentPage * perPage;
  const indexOfFirstLog = indexOfLastLog - perPage;
  const currentLocs = locationData.slice(indexOfFirstLog, indexOfLastLog);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleDeleteClick = async (uuid) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-warning swal-confirm",
        cancelButton: "btn btn-default swal-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        text: "Are You Sure You Want To Delete This Location ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await deleteHotellocations({ uuids: [uuid] });

            if (response.data.statusCode === 200) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Location has been deleted successfully.",
                icon: "success",
              });

              setLocationData((prevLocationData) =>
                prevLocationData.filter((location) => location.uuid !== uuid)
              );
            }
          } catch (error) {
            swalWithBootstrapButtons.fire({
              title: "Error On Deletion",
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  };
  const [countrycitydata, setCountryCityData] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const fetchExcelData = async () => {
    try {
      // Pass the Excel file content directly to the readExcelFile function
      const data = await excelfilereader(excelFileContent);

      setCountryCityData(data);
      const uniqueCountries = Array.from(
        new Set(data.CountryCities.map((item) => item.country))
      ).map((country) => ({
        value: data.CountryCities.find((item) => item.country === country).iso3,
        label: country,
      }));
      setCountryOptions(uniqueCountries);
    } catch (error) {}
  };
  useEffect(() => {
    fetchExcelData();
  }, []);

  useEffect(() => {
    // Extract city options based on selected country
    if (selectedCountry) {
      const cities = countrycitydata.CountryCities.filter(
        (item) => item.iso3 === selectedCountry.value
      ).map((item) => ({ value: item.city, label: item.city }));
      setCityOptions(cities);
    } else {
      setCityOptions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);

    setSelectedCity(null); // Reset city selection when country changes
  };
  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };
  const handleCitySelection = () => {
    if (!selectedCountry) {
      // If no country is selected, display a warning
      Swal.fire("Please select a country first", "", "warning");
    }
  };
  const [locationSearch, setLocationSearch] = useState("");

  const handleSearch = () => {
    // Filter data based on location name, selected country, and selected city
    const filteredData = originalLocationData.filter((location) => {
      const locationNameMatch = location.locationName
        .toLowerCase()
        .includes(locationSearch.toLowerCase());
      const countryMatch =
        !selectedCountry ||
        location.country.toLowerCase() === selectedCountry.value.toLowerCase();
      const cityMatch =
        !selectedCity ||
        location.city.toLowerCase() === selectedCity.label.toLowerCase();

      return locationNameMatch && countryMatch && cityMatch;
    });

    setLocationData(filteredData);
  };

  const handleReset = () => {
    setLocationSearch("");
    setSelectedCountry("");
    setSelectedCity("");
    setLocationData(originalLocationData);
  };
  const handleUpdateStatus = async (locationstatus) => {
    // Check if the ruleData exists
    if (!locationstatus || !locationstatus.uuid) {
      return;
    }

    // Update the status of ruleData
    const updatedStatus = locationstatus.status === "true" ? "false" : "true";
    let isActive = false;
    // Update flightRuleData with the updated status
    if (locationstatus.status === "false") {
      isActive = false;
    } else {
      isActive = true;
    }
    try {
      // Make an API call to update the staff's active status
      const apiBodyData = {
        status: updatedStatus,
      };
      const response = await updateHotellocations(
        locationstatus.uuid,
        apiBodyData
      );

      // Check the response and handle it accordingly
      if (response.data.statusCode === 200) {
        const updatedlocData = locationData.map((locdata) => {
          // Check if the UUID matches
          if (locdata.uuid === locationstatus.uuid) {
            // Update the status
            return { ...locdata, status: updatedStatus };
          }
          return locdata; // Keep other rules unchanged
        });
        // Set the updated flightRuleData in the state
        setLocationData(updatedlocData);
        // Successfully updated staff's active status, update the UI or perform other actions

        // Show SweetAlert notification
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Location is now ${isActive ? "In Active" : "Active"}.`,
        });

        // You may want to fetch the updated staff data or update the local state accordingly
      } else {
        // Handle other response statuses or errors

        // Show SweetAlert notification for error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update Location status.",
        });
      }
    } catch (error) {
      // Handle errors from the API call

      // Show SweetAlert notification for error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred.",
      });
    }
  };
  // State to store checked UUIDs
  const [checkedItems, setCheckedItems] = useState([]);

  // Function to toggle the checked state of a checkbox
  const handleCheckboxChange = (uuid) => {
    const isChecked = checkedItems.includes(uuid);
    if (isChecked) {
      // Remove UUID if already checked
      setCheckedItems(checkedItems.filter((item) => item !== uuid));
    } else {
      // Add UUID if not checked
      setCheckedItems([...checkedItems, uuid]);
    }
  };

  // Function to handle deletion
  const handleDeleteClickButton = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-warning swal-confirm",
        cancelButton: "btn btn-default swal-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        text: "Are You Sure You Want To Delete These Checked Locations ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await deleteHotellocations({
              uuids: checkedItems,
            });

            if (response.data.statusCode === 200) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Checked Locations have been deleted successfully.",
                icon: "success",
              });

              // Filter out the deleted locations from locationData
              const updatedLocationData = locationData.filter(
                (location) => !checkedItems.includes(location.uuid)
              );

              setLocationData(updatedLocationData);
            }
          } catch (error) {
            swalWithBootstrapButtons.fire({
              title: "Error On Deletion",
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });

    console.log("Checked Deleetd items", checkedItems);
  };

  const handleActivateStatusClickButton = async () => {
    // Show confirmation dialog
    const { value } = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to activate selected locations.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Activate",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      reverseButtons: true,
    });

    // If user confirms
    if (value) {
      try {
        // Example updates array
        const updates = checkedItems.map((uuid) => ({ uuid, status: true }));

        const response = await updateHotelLocationsAll(updates);

        console.log("Response:", response);

        // Handle response if needed
        // Update locationData state after successful update
        const updatedData = locationData.map((location) => {
          if (checkedItems.includes(location.uuid)) {
            return { ...location, status: true };
          }
          return location;
        });
        console.log("My activated data is", updatedData);
        setLocationData(updatedData);
        // Reset checked items after successful update
        setCheckedItems([]);

        // Show success message
        Swal.fire({
          title: "Activated!",
          text: "Selected locations have been activated.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error:", error);
        // Handle error
        // Show error message
        Swal.fire({
          title: "Error",
          text: "An error occurred while activating locations. Please try again later.",
          icon: "error",
        });
      }
    }
  };
  const handleDeactivateClickButton = async () => {
    // Show confirmation dialog
    const { value } = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to deactivate selected locations.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Deactivate",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      reverseButtons: true,
    });

    // If user confirms
    if (value) {
      try {
        // Example updates array
        const updates = checkedItems.map((uuid) => ({ uuid, status: false }));

        const response = await updateHotelLocationsAll(updates);

        console.log("Response:", response);
        // Update locationData state after successful update
        const updatedData = locationData.map((location) => {
          if (checkedItems.includes(location.uuid)) {
            return { ...location, status: false };
          }
          return location;
        });
        console.log("My DEactivated data is", updatedData);
        setLocationData(updatedData);
        // Handle response if needed

        // Reset checked items after successful update
        setCheckedItems([]);

        // Show success message
        Swal.fire({
          title: "Deactivated!",
          text: "Selected locations have been deactivated.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error:", error);
        // Handle error
        // Show error message
        Swal.fire({
          title: "Error",
          text: "An error occurred while deactivating locations. Please try again later.",
          icon: "error",
        });
      }
    }
  };
  return (
    <>
      <Header2
        title="SEARCH LOCATION"
        linkText1="Search Location"
        linkText2="Add Location"
        link2={Constants.URLConstants.MASTERSHOTELLOCATIONNEW}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="panel-body">
            <div className="row form-group">
              <div className="form-group col-md-3">
                <label>Country</label>
                <MultiSelect
                  options={countryOptions}
                  isSearchable
                  value={selectedCountry}
                  placeholder="- Select Country -"
                  noOptionsMessage={() => "No Country Found"}
                  className="custom-select"
                  onChange={handleCountryChange}
                />
              </div>
              <div
                className="form-group col-md-3"
                onClick={handleCitySelection}
              >
                <label>City</label>
                <MultiSelect
                  isSearchable
                  placeholder="- Please select a city -"
                  className="custom-select"
                  options={cityOptions}
                  value={selectedCity}
                  isDisabled={!selectedCountry}
                  onChange={handleCityChange}
                  noOptionsMessage={() => "No City Found"}
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Location Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="Search_area_name"
                  size={20}
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12 form-group">
                <button
                  className="btn btn-dark btn-sm"
                  type="button"
                  name="submit"
                  value="search"
                  onClick={handleSearch}
                >
                  <i className="fa fa-search" />
                  &nbsp;Search
                </button>
                &nbsp;&nbsp;
                <button
                  className="btn btn-dark btn-sm"
                  type="button"
                  id="reset"
                  name="reset"
                  value="Reset"
                  onClick={handleReset}
                >
                  <i className="fa fa-repeat" /> &nbsp;Reset
                </button>
              </div>
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
              <div className="panel-body removeMargins">
                <div className="dataTables_scroll">
                  <div className="row pd_tp">
                    <div className="row mt-4">
                      <div className="col-md-5">
                        <div className="col-md-12 form-group">
                          <button
                            type="button"
                            onClick={handleDeleteClickButton}
                            className="btn btn-danger btn-sm mx-1"
                            value="Delete"
                            disabled={checkedItems.length === 0} // Disable if no items are checked
                          >
                            <i className="fa fa-trash-o" />
                            &nbsp;Delete
                          </button>
                          <button
                            type="button"
                            value="Activate"
                            className="btn btn-success btn-sm mx-1"
                            name="Activate"
                            onClick={handleActivateStatusClickButton}
                            disabled={checkedItems.length === 0} // Disable if no items are checked
                          >
                            <i
                              className="fa fa-check-circle"
                              style={{ color: "white !important" }}
                            />
                            &nbsp;Activate
                          </button>
                          <button
                            type="button"
                            value="Deactivate"
                            className="btn btn-deactivate btn-sm"
                            name="Deactivate"
                            onClick={handleDeactivateClickButton}
                            disabled={checkedItems.length === 0} // Disable if no items are checked
                          >
                            <i
                              className="fa fa-times-circle"
                              style={{ color: "grey !important" }}
                            />
                            &nbsp;Deactivate
                          </button>
                        </div>
                      </div>
                      <div className="col-md-3 col_hide">
                        <div className="form-group">
                          {/* PAGINATION IMPELEMENT HERE */}
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
                        <style
                          dangerouslySetInnerHTML={{
                            __html:
                              "\n                                    .table tr[visible='false'],\n                                    .no-result {\n                                        display: none;\n                                        border: 1px solid #ddd;\n                                        padding: 10px;\n                                        margin-top: -2px;\n                                    }\n\n                                    .table tr[visible='true'] {\n                                        display: table-row;\n                                    }\n\n                                    .counter {\n                                        padding: 8px;\n                                        color: #ccc;\n                                    }\n\n                                    .search_new {\n                                        float: right;\n                                        height: 35px;\n                                        margin-bottom: 0px;\n                                        padding-left: 5px;\n                                    }\n                                ",
                          }}
                        />
                        <div
                          className="form-group col-md-2 new_search_icon"
                          style={{ textAlign: "right", paddingRight: "0px" }}
                        >
                          <h5 style={{ display: "inline" }}>
                            <i
                              className="fa fa-search srchWithinPg"
                              id="magnifiers"
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Search within this table"
                            />
                          </h5>
                        </div>
                        <div className="form-group col-md-10 bookingsrc">
                          <input
                            type="text"
                            className="tablesearch form-control form-control-sm search_new"
                            placeholder="Location Name Search"
                            value={searchInput}
                            onChange={handleInputSearchChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="search_transfer_wrapper"
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
                            id="search_transfer"
                            className="table table-bordered   table-responsive dataTable no-footer"
                            role="grid"
                            aria-describedby="search_transfer_info"
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "88px" }}
                                >
                                  &nbsp;
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "192px" }}
                                >
                                  Country
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "332px" }}
                                >
                                  City
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "423px" }}
                                >
                                  Location Name
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "223px" }}
                                >
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {currentLocs.map((location, index) => (
                                <tr
                                  key={location.uuid}
                                  className={
                                    index % 2 === 0
                                      ? "phps_row_0 even"
                                      : "phps_row_1 odd"
                                  }
                                  role="row"
                                >
                                  <td>
                                    &nbsp;
                                    <div className="checkbox checkbox-success">
                                      <input
                                        type="checkbox"
                                        name="del[]"
                                        checked={checkedItems.includes(
                                          location.uuid
                                        )}
                                        onChange={() =>
                                          handleCheckboxChange(location.uuid)
                                        }
                                        style={{
                                          position: "absolute",
                                          marginLeft: "-20px",
                                        }}
                                      />
                                      <label />
                                    </div>
                                  </td>
                                  <td>&nbsp;{location.country}</td>
                                  <td>&nbsp;{location.city}</td>
                                  <td>&nbsp;{location.locationName}</td>
                                  <td align="center" className="actionlink">
                                    <div className="actionCont">
                                      <div className="input-group-addon">
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .MASTERSHOTELLOCATIONSEDIT
                                          }
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="Edit"
                                          data-original-title="Edit"
                                          onClick={() =>
                                            handleViewEditClick(location)
                                          }
                                        >
                                          <i className="fa fa-pencil-square-o" />
                                        </Link>
                                      </div>
                                      <div className="input-group-addon">
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .MASTERSHOTELLOCATIONSVIEW
                                          }
                                          onClick={() =>
                                            handleViewEditClick(location)
                                          }
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="View"
                                          data-original-title="View"
                                        >
                                          <i className="fa fa-eye" />
                                        </Link>
                                      </div>
                                      <div className="input-group-addon">
                                        {location.status === "true" ||
                                        location.status === true ? (
                                          <Link
                                            onClick={() => {
                                              handleUpdateStatus(location);
                                            }}
                                          >
                                            <i className="fa fa-check-circle"></i>
                                          </Link>
                                        ) : (
                                          <Link
                                            onClick={() => {
                                              handleUpdateStatus(location);
                                            }}
                                          >
                                            <i className="fa fa-times-circle"></i>
                                          </Link>
                                        )}
                                      </div>
                                      <div className="input-group-addon">
                                        <Link
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="Delete"
                                          data-original-title="Delete"
                                          onClick={() =>
                                            handleDeleteClick(location.uuid)
                                          }
                                        >
                                          <i className="fa fa-trash" />
                                        </Link>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <br />
                  <br />
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};
export default connect(null, { setHotelsLocationsDataRedux })(
  MastersHotelLocationSearch
);
