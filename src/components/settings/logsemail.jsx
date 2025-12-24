import React, { useEffect, useState } from "react"; // Import React and useState
import Header2 from "../header2/header2";
import Flatpickr from "react-flatpickr";

// import { Link } from "react-router-dom";
import MultiSelect from "../reactMultiSelect";
import { logsemail_options } from "../../constants/contants";
import loadingGif from "../../assets/images/loadingblue.gif";
import { getEmailLogs } from "../../Apis/API";

const LogsEmail = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date
  const [maillogData, setMailLogData] = useState([]);
  const [originalmaillogData, setOriginalMailLogData] = useState([]);
  const [loading, setLoading] = useState(true); // Initially, set loading to true
  const [searchInput, setSearchInput] = useState("");
  const [searchemailLogData, setSearchEmailLogData] = useState({
    subject: "",
    from: "",
    to: "",
    cc: "",
    status: "",
  });

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filteredlogData = originalmaillogData.filter((log) =>
      log.subject.toLowerCase().includes(value.toLowerCase())
    );

    setMailLogData(filteredlogData);
  };

  const getmaillogs = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await getEmailLogs();

      if (response.data.statusCode === 200) {
        const maillogs =
          response && response.data.data ? response.data.data : [];

        setMailLogData(maillogs);
        setOriginalMailLogData(maillogs);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched (whether successful or not)
    }
  };

  useEffect(() => {
    getmaillogs();
  }, []);
  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
    setEndDate(null);
  };

  const handleUserSearchSubmit = (event) => {
    event.preventDefault();

    const filteredUserLogData = originalmaillogData.filter((log) => {
      const lowersubject = log.subject ? log.subject.toLowerCase() : "";
      const lowerfrom = log.from ? log.from.toLowerCase() : "";
      const lowerto = log.to ? log.to.toLowerCase() : "";
      const lowercc = log.cc ? log.cc.toLowerCase() : "";
      const lowerstatus = log.status ? log.status.toLowerCase() : "";
      const logDate = new Date(log.date.createdAt); // Assuming logDate is a valid date string

      const subjectSearch = searchemailLogData.subject
        ? searchemailLogData.subject.toLowerCase()
        : "";
      const fromSearch = searchemailLogData.from
        ? searchemailLogData.from.toLowerCase()
        : "";
      const toSearch = searchemailLogData.to
        ? searchemailLogData.to.toLowerCase()
        : "";
      const ccSearch = searchemailLogData.cc
        ? searchemailLogData.cc.toLowerCase()
        : "";
      const statusSearch = searchemailLogData.status.value
        ? searchemailLogData.status.value.toLowerCase()
        : "";
      const fromDate = startDate;
      const eDate = endDate;

      return (
        lowersubject.includes(subjectSearch) &&
        lowerfrom.includes(fromSearch) &&
        lowerto.includes(toSearch) &&
        lowerstatus.includes(statusSearch) &&
        lowercc.includes(ccSearch) &&
        (fromDate && eDate
          ? logDate >= new Date(fromDate) && logDate <= new Date(eDate)
          : true)
      );
    });

    setMailLogData(filteredUserLogData);
  };

  const handleUserSearchInputChange = (event) => {
    const { name, value } = event.target;
    setSearchEmailLogData((prevSearchUserData) => ({
      ...prevSearchUserData,
      [name]: value,
    }));
  };
  const handleUserSearchDropdownChange = (selectedOption, name) => {
    setSearchEmailLogData((prevData) => ({
      ...prevData,
      [name]: selectedOption,
    }));
  };

  return (
    <>
      <Header2
        title="EMAIL LOGS"
        linkText2="Search Bookings"
        linkUrl="staffsearch.html"
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleUserSearchSubmit}>
          <div class="row mt-2">
            <div class="form-group col-md-3">
              <label>Subject</label>
              <input
                type="text"
                class="form-control form-control-sm"
                name="subject"
                value={searchemailLogData.subject}
                onChange={handleUserSearchInputChange}
              />
            </div>
            <div class="form-group col-md-3">
              <label>From</label>
              <input
                type="email"
                class="form-control form-control-sm"
                name="from"
                value={searchemailLogData.from}
                onChange={handleUserSearchInputChange}
              />
            </div>
            <div class="form-group col-md-3">
              <label>To</label>
              <input
                type="email"
                class="form-control form-control-sm"
                name="to"
                value={searchemailLogData.to}
                onChange={handleUserSearchInputChange}
              />
            </div>
            <div class="form-group col-md-3">
              <label>CC</label>
              <input
                type="email"
                class="form-control form-control-sm"
                name="cc"
                value={searchemailLogData.cc}
                onChange={handleUserSearchInputChange}
              />
            </div>
          </div>
          <div class="row mt-4">
            <div class="form-group col-md-3">
              <label>Status</label>
              <MultiSelect
                options={logsemail_options}
                isSearchable
                placeholder="Select"
                className="custom-select"
                name="status"
                value={searchemailLogData.status}
                onChange={(selectedOption) =>
                  handleUserSearchDropdownChange(selectedOption, "status")
                }
              />
              {/* form-control form-control-sm */}
            </div>
            <div class="form-group col-md-3">
              <label>Date</label>
              <div class="input-daterange input-group date col-md-12 col-sm-12 col-xs-12">
                <Flatpickr
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  options={{
                    dateFormat: "d-m-Y",
                    minDate: null, // Allow selection of any date from today onwards
                    defaultDate: new Date(), // Set initial selected date to current date
                  }}
                />

                <span class="input-group-addon">to</span>
                <Flatpickr
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  options={{
                    dateFormat: "d-m-Y",
                    minDate: null, // Allow selection of any date from today onwards
                    defaultDate: new Date(), // Set initial selected date to current date
                  }}
                />
                <span
                  class="input-group-addon"
                  id="emailLogTrashBtn"
                  onClick={handleTrashClick}
                >
                  <i class="fa-solid fa-trash"></i>
                </span>
              </div>
            </div>
            <div class="form-group col-md-3"></div>
            <div class="form-group col-md-3"></div>
          </div>

          <div class="row mt-4 mb-4">
            <div class="form-group col-md-2">
              <button type="submit" class="btn btn-dark btn-sm">
                <i class="fa fa-search"></i> Search
              </button>
            </div>
          </div>
        </form>

        <form class="mt-4">
          {/* <nav aria-label="Page navigation example">
            <ul class="pagination pagination-sm justify-content-center mt-4">
              <li class="page-item active">
                <Link class="page-link" to="#">
                  1
                </Link>
              </li>
              <li class="page-item">
                <Link class="page-link" to="#">
                  2
                </Link>
              </li>
              <li class="page-item">
                <Link class="page-link" to="#">
                  3
                </Link>
              </li>
              <li class="page-item">
                <Link class="page-link" to="#">
                  4
                </Link>
              </li>
              <li class="page-item">
                <Link class="page-link" to="#">
                  5
                </Link>
              </li>
              <li class="page-item">
                <Link class="page-link" to="#">
                  6
                </Link>
              </li>
              <li class="page-item">
                <Link class="page-link" to="#">
                  7
                </Link>
              </li>
              <li class="page-item">
                <Link class="page-link" to="#">
                  8
                </Link>
              </li>
              <li class="page-item">
                <Link class="page-link" to="#">
                  9
                </Link>
              </li>
              <li class="page-item">
                <Link class="page-link" to="#">
                  10
                </Link>
              </li>
              <li class="page-item">
                <Link class="page-link" to="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            </ul>
          </nav> */}
          <div
            id="search_sup_wrapper"
            class="dataTables_wrapper form-inline dt-bootstrap no-footer"
          >
            <div class="row">
              <div class="col-sm-10"></div>
              <div class="col-sm-2">
                <div id="search_sup_filter" class="dataTables_filter">
                  <label style={{ display: "flex" }}>
                    <input
                      type="search"
                      class="form-control form-control-sm input-sm"
                      placeholder="Subject"
                      aria-controls="search_sup"
                      value={searchInput}
                      onChange={handleInputSearchChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div
            id="search_sup_wrapper"
            class="dataTables_wrapper form-inline dt-bootstrap no-footer"
          >
            <div class="row">
              {loading && (
                <div className="text-center">
                  <img src={loadingGif} alt="Loading..." height={250} />
                </div>
              )}
              {!loading && (
                <>
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
                        id="search_stagger_inventory_table"
                        class="table table-bordered   table-responsive dataTable no-footer"
                        role="grid"
                        aria-describedby="search_stagger_inventory_table_info"
                      >
                        <thead>
                          <tr role="row">
                            <th
                              class="sorting_disabled"
                              rowspan="1"
                              colspan="1"
                              style={{ width: "313px" }}
                            >
                              Subject
                            </th>
                            <th
                              class="sorting_disabled"
                              rowspan="1"
                              colspan="1"
                              style={{ width: "131px" }}
                            >
                              From
                            </th>
                            <th
                              class="sorting_disabled"
                              rowspan="1"
                              colspan="1"
                              style={{ width: "254px" }}
                            >
                              To
                            </th>
                            <th
                              class="sorting_disabled"
                              rowspan="1"
                              colspan="1"
                              style={{ width: "175px" }}
                            >
                              CC
                            </th>
                            <th
                              class="sorting_disabled"
                              rowspan="1"
                              colspan="1"
                              style={{ width: "243px" }}
                            >
                              Status
                            </th>
                            <th
                              class="sorting_disabled"
                              rowspan="1"
                              colspan="1"
                              style={{ width: "101px" }}
                            >
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {maillogData.map((log, index) => (
                            <tr
                              role="row"
                              class="odd"
                              key={index}
                              className={`phps_row_${
                                index % 2 === 0 ? "even" : "odd"
                              }`}
                            >
                              <td>{log.subject}</td>
                              <td>{log.from}</td>
                              <td>{log.to}</td>
                              <td>{log.cc}</td>
                              <td>{log.status}</td>
                              <td>
                                {new Date(log.date.createdAt).toLocaleString(
                                  [],
                                  { dateStyle: "long", timeStyle: "short" }
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div class="row">
              <div class="col-sm-4">
                <div
                  class="dataTables_info"
                  id="search_sup_info"
                  role="status"
                  aria-live="polite"
                ></div>
              </div>
              <div class="col-sm-8"></div>
              {/* <nav aria-label="Page navigation example">
                <ul class="pagination pagination-sm justify-content-center mt-4">
                  <li class="page-item active">
                    <Link class="page-link" to="#">
                      1
                    </Link>
                  </li>
                  <li class="page-item">
                    <Link class="page-link" to="#">
                      2
                    </Link>
                  </li>
                  <li class="page-item">
                    <Link class="page-link" to="#">
                      3
                    </Link>
                  </li>
                  <li class="page-item">
                    <Link class="page-link" to="#">
                      4
                    </Link>
                  </li>
                  <li class="page-item">
                    <Link class="page-link" to="#">
                      5
                    </Link>
                  </li>
                  <li class="page-item">
                    <Link class="page-link" to="#">
                      6
                    </Link>
                  </li>
                  <li class="page-item">
                    <Link class="page-link" to="#">
                      7
                    </Link>
                  </li>
                  <li class="page-item">
                    <Link class="page-link" to="#">
                      8
                    </Link>
                  </li>
                  <li class="page-item">
                    <Link class="page-link" to="#">
                      9
                    </Link>
                  </li>
                  <li class="page-item">
                    <Link class="page-link" to="#">
                      10
                    </Link>
                  </li>

                  <li class="page-item">
                    <Link class="page-link" to="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </Link>
                  </li>
                </ul>
              </nav> */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default LogsEmail;
