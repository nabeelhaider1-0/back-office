import React, { useState, useRef, useEffect } from "react";
import Header2 from "../header2/header2";
import Flatpickr from "react-flatpickr";

// import { Link } from "react-router-dom";
import MultiSelect from "../reactMultiSelect";
import { getUserLog } from "../../Apis/API";
import loadingGif from "../../assets/images/loadingblue.gif";
import { Link } from "react-router-dom";
import { PaginationSetter } from "../../constants/globalfunctions";

const LogsUsers = () => {
  const [startDate, setStartDate] = useState(new Date());
  const fromDateRef = useRef(null); // Create a ref to access the Flatpickr instance

  useEffect(() => {
    // Initialize Flatpickr when the component mounts
    if (fromDateRef.current) {
      fromDateRef.current.flatpickr({
        dateFormat: "d-m-Y",
        minDate: null, // Allow selection of any date from today onwards
        defaultDate: new Date(), // Set initial selected date to current date
      });
    }
  }, []);

  const [userLogData, setUserLogData] = useState([]);
  const [originalUserLogData, setOriginalUserLogData] = useState([]);
  function getUserNamesWithLabelValue(userLogData) {
    const uniqueUserNames = [
      ...new Set(userLogData.map((log) => log.userName)),
    ];
    const uniqueUserNamesWithLabelValue = uniqueUserNames.map((userName) => ({
      label: userName,
      value: userName,
    }));
    return uniqueUserNamesWithLabelValue;
  }
  const [loading, setLoading] = useState(true); // Initially, set loading to true

  const getUserLogs = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getUserLog();

      if (response.data.statusCode === 200) {
        const userlogs =
          response && response.data.data ? response.data.data : [];

        setUserLogData(userlogs);
        setOriginalUserLogData(userlogs);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };

  useEffect(() => {
    getUserLogs();
  }, []);

  const [searchInput, setSearchInput] = useState("");

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filteredUserLogData = originalUserLogData.filter((username) =>
      username.userName.toLowerCase().includes(value.toLowerCase())
    );

    setUserLogData(filteredUserLogData);
  };

  const [searchUserLogData, setSearchUserLogData] = useState({
    username: "",
    logtype: "",
    logdescription: "",
    rawlog: "",
  });

  const handleUserSearchInputChange = (event) => {
    const { name, value } = event.target;
    setSearchUserLogData((prevSearchUserData) => ({
      ...prevSearchUserData,
      [name]: value,
    }));
  };
  const handleUserSearchDropdownChange = (selectedOption, name) => {
    setSearchUserLogData((prevSearchUserData) => ({
      ...prevSearchUserData,
      [name]: selectedOption,
    }));
  };

  const handleUserSearchSubmit = (event) => {
    event.preventDefault();
    const filteredUserLogData = originalUserLogData.filter((log) => {
      const lowerLogType = log.logType.toLowerCase();
      const lowerUsername = log.userName.toLowerCase();
      const lowerLogDescription = log.logDescription.toLowerCase();
      const lowerRawLog = log.rawLog.toLowerCase();
      const logDate = new Date(log.createdAt); // Assuming logDate is a valid date string

      const usernameSearch = searchUserLogData.username.toLowerCase();
      const logtypeSearch = searchUserLogData.logtype.toLowerCase();
      const logdescriptionSearch =
        searchUserLogData.logdescription.toLowerCase();
      const rawlogSearch = searchUserLogData.rawlog.toLowerCase();
      const fromDate = startDate;

      return (
        lowerUsername.includes(usernameSearch) &&
        lowerLogType.includes(logtypeSearch) &&
        lowerLogDescription.includes(logdescriptionSearch) &&
        lowerRawLog.includes(rawlogSearch) &&
        (fromDate ? logDate >= new Date(fromDate) : true)
      );
    });

    setUserLogData(filteredUserLogData);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const { currentdata, noofPages } = PaginationSetter(currentPage, userLogData);
  const totalPages = noofPages;
  const currentLogs = currentdata;
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header2 title="USER LOG SEARCH" />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleUserSearchSubmit}>
          <div className="row mt-4">
            <div className="col-md-3 form-group">
              <label>User Name</label>
              <MultiSelect
                options={getUserNamesWithLabelValue(originalUserLogData)}
                isSearchable
                placeholder="Search user"
                className="custom-select"
                name="username"
                value={searchUserLogData.username}
                onChange={(selectedOption) =>
                  handleUserSearchDropdownChange(selectedOption, "username")
                }
              />
            </div>
            <div className="form-group col-md-3">
              <label>Log Type</label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="logtype"
                value={searchUserLogData.logtype}
                onChange={handleUserSearchInputChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Log Description</label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="logdescription"
                value={searchUserLogData.logdescription}
                onChange={handleUserSearchInputChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Raw Log</label>
              <input
                type="text"
                className="form-control form-control-sm"
                name="rawlog"
                value={searchUserLogData.rawlog}
                onChange={handleUserSearchInputChange}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-3 form-group">
              <label>From Date</label>
              <div className="input-group col-md-12 col-xs-12">
                <div
                  className="input-group date col-xs-12"
                  id="datetimepicker13"
                >
                  <Flatpickr
                    value={startDate}
                    onChange={(selectedDates) => setStartDate(selectedDates[0])}
                    options={{
                      dateFormat: "d-m-Y",
                      minDate: null, // Allow selection of any date from today onwards
                      defaultDate: new Date(), // Set initial selected date to current date
                    }}
                  />

                  <span className="input-group-addon dateIcon">
                    <i className="fa fa-th"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4 mb-4">
            <div className="form-group col-md-2">
              <button className="btn btn-dark btn-sm">
                <i className="fa fa-search"></i> Search
              </button>
            </div>
          </div>
        </form>
        {loading && (
          <div className="text-center">
            <img src={loadingGif} alt="Loading..." height={250} />
          </div>
        )}
        {!loading && (
          <>
            <form class="mt-4">
              {/* PAGINATION IMPELEMENT HERE */}
              <nav aria-label="Page navigation example">
                <ul className="pagination pagination-sm justify-content-center mt-4">
                  {Array.from({ length: totalPages }).map((_, index) => (
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
                          color: currentPage === index + 1 ? "white" : "black", // Highlighting logic
                          // Add more styles as needed
                        }}
                      >
                        {index + 1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div
                id="search_sup_wrapper"
                class="dataTables_wrapper form-inline dt-bootstrap no-footer"
              >
                <div class="row">
                  <div class="col-sm-10"></div>
                  <div class="col-sm-2">
                    <div id="search_sup_filter" class="dataTables_filter">
                      <label style={{ display: "flex" }}>
                        Search:
                        <input
                          type="search"
                          class="form-control form-control-sm input-sm"
                          placeholder="User Name"
                          aria-controls="search_sup"
                          value={searchInput}
                          onChange={handleInputSearchChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <div
                    class="doubleScroll-scroll-wrapper"
                    id="wrapper1"
                    style={{ height: "20px", width: "1320px" }}
                  >
                    <div
                      class="suwala-doubleScroll-scroll"
                      style={{ height: "20px", width: " 1320px" }}
                    ></div>
                  </div>
                  <div id="wrapper2" style={{ overflow: "auto" }}>
                    <table
                      id="search_sup"
                      class="table table-bordered   table-responsive dataTable no-footer"
                      role="grid"
                      aria-describedby="search_sup_info"
                    >
                      <thead>
                        <tr role="row">
                          <th
                            class="sorting_disabled"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "120px" }}
                          >
                            User Name
                          </th>
                          <th
                            class="sorting_disabled"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "120px" }}
                          >
                            Log Type
                          </th>
                          <th
                            class="sorting_disabled"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "179px" }}
                          >
                            Log Description
                          </th>
                          <th
                            class="sorting_disabled"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "690px" }}
                          >
                            Raw Log
                          </th>
                          <th
                            class="sorting_disabled"
                            rowspan="1"
                            colspan="1"
                            style={{ width: "300px" }}
                          >
                            From Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {currentLogs.map((log, index) => (
                          <tr
                            key={index}
                            className={`phps_row_${
                              index % 2 === 0 ? "0 even" : "1 odd"
                            }`}
                            role="row"
                          >
                            <td>{log.userName}</td>
                            <td>{log.logType}</td>
                            <td>{log.logDescription}</td>
                            <td className="rawLogCell">{log.rawLog}</td>
                            <td>
                              <div className="dateWrapper withTime">
                                <div className="onlyDate">
                                  {new Date(log.createdAt).getDate()}
                                </div>
                                <div className="monthYear">
                                  {new Date(log.createdAt).toLocaleString(
                                    "default",
                                    { month: "short" }
                                  )}
                                  <br />
                                  {new Date(log.createdAt).getFullYear()}
                                </div>
                              </div>
                              <div className="secCont">
                                {new Date(log.createdAt).toLocaleTimeString(
                                  [],
                                  { hour: "2-digit", minute: "2-digit" }
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};
export default LogsUsers;
