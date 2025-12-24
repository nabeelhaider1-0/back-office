import { useEffect, useState } from "react";
import Constants from "../../../../constants/routes";
import Header2 from "../../../header2/header2";
import {
  PaginationSetter,
  deleteConfirmation,
} from "../../../../constants/globalfunctions";
import { delDATA, getDATA } from "../../../../Apis/API";
import { setSpecialRequestsDataRedux } from "../../../../state/action/actions";
import { connect } from "react-redux";
import loadingGif from "../../../../assets/images/loadingblue.gif";
import { Link } from "react-router-dom";
import ApiRoutes from "../../../../constants/ApiRoutes";

const MastersHotelSpecialRequestSearch = ({ setSpecialRequestsDataRedux }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const handleEditClick = (requests) => {
    setSpecialRequestsDataRedux(requests); // Dispatch the action to set the editBranchData in the Redux store
  };
  const [loading, setLoading] = useState(true); // Initially, set loading to true

  const [specialRequestsData, setSpecialRequestsData] = useState([]);
  const [originalSpecialRequestsData, setOriginalSpecialRequestsData] =
    useState([]);
  const getSupplements = async () => {
    try {
      setLoading(true);
      const response = await getDATA(ApiRoutes.HOTELS.SPECIAL_REQUESTS);

      if (response.data.statusCode === 200) {
        const specials =
          response && response.data.data ? response.data.data : [];

        setSpecialRequestsData(specials);
        setOriginalSpecialRequestsData(specials);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSupplements();
  }, []);

  const [searchInput, setSearchInput] = useState("");

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filteredSpecialsData = originalSpecialRequestsData.filter((special) =>
      special.requestName.toLowerCase().includes(value.toLowerCase())
    );

    setSpecialRequestsData(filteredSpecialsData);
  };
  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Request Name?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Request Name has been deleted successfully.",
        ApiRoutes.HOTELS.SPECIAL_REQUESTS
      );

      if (isDeleted) {
        setSpecialRequestsData((prevRequestData) =>
          prevRequestData.filter((requestData) => requestData.uuid !== uuid)
        );
      } else {
      }
    } catch (error) {}
  };

  const [specialsSearch, setSpecialsSearch] = useState("");
  const handleSearch = () => {
    // Filter data based on location name, selected country, and selected city
    const filteredData = originalSpecialRequestsData.filter((RequestName) => {
      const specialsNameMatch = RequestName.requestName
        .toLowerCase()
        .includes(specialsSearch.toLowerCase());

      return specialsNameMatch;
    });

    setSpecialRequestsData(filteredData);
  };

  const resetform = (event) => {
    event.preventDefault();

    // First, set the form data
    setSpecialsSearch("");
    setSpecialRequestsData(originalSpecialRequestsData);
  };
  const { currentdata, noofPages } = PaginationSetter(
    currentPage,
    specialRequestsData
  );
  const totalPages = noofPages;
  const currentdatatoshow = currentdata;
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Header2
        title="SEARCH SPECIAL REQUEST"
        linkText1="Search Special Request "
        linkText2="Add Special Request"
        link2={Constants.URLConstants.MASTERSHOTELSSPECIALREQUESTNEW}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="panel-body">
            <div className="row">
              <div className="col-sm-3">
                <div className="form-group">
                  <label>Special Request Name</label>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    name="txt_area_name"
                    id="txt_area_name"
                    size={20}
                    maxLength={50}
                    value={specialsSearch}
                    onChange={(e) => setSpecialsSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col-md-2 form-group">
                <span id="submit_td">
                  <button
                    className="btn btn-dark btn-sm form-group search"
                    name="submit1"
                    type="button"
                    onClick={handleSearch}
                  >
                    <i className="fa fa-search" /> Search
                  </button>
                </span>
                &nbsp;&nbsp;
                <button
                  className="btn btn-dark btn-sm"
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
          </div>
        </form>

        <br />
        <form>
          {loading && (
            <div className="text-center">
              <img src={loadingGif} alt="Loading..." height={250} />
            </div>
          )}
          {!loading && (
            <>
              <div className="panel-body removeMargins">
                <div className="dataTables_scroll">
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
                            placeholder="Location Name"
                            value={searchInput}
                            onChange={handleInputSearchChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="search_sup_wrapper"
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
                            id="search_suppliment"
                            className="table table-bordered   table-responsive dataTable no-footer"
                            role="grid"
                            aria-describedby="search_suppliment_info"
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "860.2px" }}
                                >
                                  Special Request Name
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "608px" }}
                                >
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {currentdatatoshow.map((specials, index) => (
                                <tr
                                  key={specials.uuid}
                                  className={
                                    index % 2 === 0
                                      ? "phps_row_0 even"
                                      : "phps_row_1 odd"
                                  }
                                  role="row"
                                >
                                  <td>{specials.requestName}</td>
                                  <td className="actionlink">
                                    <div
                                      className="actionCont"
                                      style={{ width: "58px" }}
                                    >
                                      <div className="input-group-addon">
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .MASTERSHOTELSSPECIALREQUESTEDIT
                                          }
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title
                                          data-original-title="Edit"
                                          onClick={() =>
                                            handleEditClick(specials)
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
                                            handleDeleteClick(specials.uuid)
                                          }
                                        >
                                          {/*<img src="images/delete.gif" alt="Delete" border=0>*/}
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
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};
export default connect(null, { setSpecialRequestsDataRedux })(
  MastersHotelSpecialRequestSearch
);
