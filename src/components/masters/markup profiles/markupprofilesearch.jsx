import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import loadingGif from "../../../assets/images/loadingblue.gif";
import {
  ErrorApiAlert,
  PaginationSetter,
  deleteConfirmation,
} from "../../../constants/globalfunctions";
import { delDATA, getDATA } from "../../../Apis/API";
import React, { useEffect, useState } from "react";
import { setMastersMarkupProfileEdit } from "../../../state/action/actions";
import { connect } from "react-redux";
import ApiRoutes from "../../../constants/ApiRoutes";

const MarkupProfileSearch = ({ setMastersMarkupProfileEdit }) => {
  const [profileData, setProfileData] = useState([]);
  const [originalprofileData, setOriginalProfileData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (index) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleEdditClick = (profile) => {
    setMastersMarkupProfileEdit(profile);
  };
  const getmarkupprofiles = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.MARKUP_PROFILE.PROFILE);
      if (response.data.statusCode === 200) {
        const profile =
          response && response.data.data ? response.data.data : [];

        setProfileData(profile);
        setOriginalProfileData(profile);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Mark-Up Profiles");
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
    getmarkupprofiles();
  }, []);

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filtereData = originalprofileData.filter((pr) =>
      pr.profileName.toLowerCase().includes(value.toLowerCase())
    );

    setProfileData(filtereData);
  };

  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Mark-Up Profile?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Mark-Up Profile has been deleted successfully.",
        ApiRoutes.MARKUP_PROFILE.PROFILE
      );

      if (isDeleted) {
        setOriginalProfileData((profiles) =>
          profiles.filter((p) => p.uuid !== uuid)
        );
        setProfileData((profiles) => profiles.filter((p) => p.uuid !== uuid));
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };

  const { currentdata, noofPages } = PaginationSetter(currentPage, profileData);
  const totalPages = noofPages;
  const currentprofiles = currentdata;
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Header2
        title="ADD PRICING PROFILE"
        linkText1="Search Pricing Profiles"
        linkText2="Add Pricing Profile"
        link2={Constants.URLConstants.MASTERSMARKUPPROFILENEW}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        {loading && (
          <div className="text-center">
            <img src={loadingGif} alt="Loading..." height={250} />
          </div>
        )}
        {!loading && (
          <>
            <form>
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
                          placeholder="Profile Name"
                          value={searchInput}
                          onChange={handleInputSearchChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div
                  id="tableres_wrapper"
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
                          id="tableres"
                          className="table table-bordered   table-responsive table-bordered dataTable no-footer"
                          role="grid"
                          aria-describedby="tableres_info"
                        >
                          <thead>
                            <tr role="row">
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="tableres"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Pricing Profile Name: activate to sort column ascending"
                                style={{ width: "1220.2px" }}
                              >
                                Pricing Profile Name
                              </th>
                              <th
                                width="15%"
                                className="sorting"
                                tabIndex={0}
                                aria-controls="tableres"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Action: activate to sort column ascending"
                                style={{ width: "197px" }}
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {currentprofiles.map((prof, index) => (
                              <React.Fragment key={index}>
                                <tr>
                                  <td>{prof.profileName}</td>
                                  <td className="actionlink">
                                    <div className="actionCont">
                                      <div className="input-group-addon">
                                        <div
                                          className="input-group-addon addFirst mr-2"
                                          onClick={() => toggleRow(index)}
                                          data-toggle="tooltip"
                                          title="Add"
                                          data-original-title="Add"
                                          data-placement="top"
                                        >
                                          {expandedRows[index] ? (
                                            <i className="fa fa-minus" />
                                          ) : (
                                            <i className="fa fa-plus" />
                                          )}
                                        </div>
                                      </div>
                                      <div className="input-group-addon">
                                        <Link
                                          to={
                                            Constants.URLConstants
                                              .MASTERSMARKUPPROFILEEDIT
                                          }
                                          alt="Edit"
                                          data-original-title="Edit"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                        >
                                          <i
                                            className="fa fa-pencil-square-o"
                                            onClick={() =>
                                              handleEdditClick(prof)
                                            }
                                          />
                                        </Link>
                                      </div>
                                      <div className="input-group-addon">
                                        <Link
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title
                                          data-original-title="Delete"
                                          onClick={() =>
                                            handleDeleteClick(prof.uuid)
                                          }
                                        >
                                          <i className="fa fa-trash" />
                                        </Link>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                {expandedRows[index] && (
                                  <tr>
                                    <td colSpan={2} style={{ padding: "0px" }}>
                                      <div className="panel-body removeMargins">
                                        <table
                                          className="table   table-responsive dataTable"
                                          border={1}
                                        >
                                          <thead>
                                            <tr className="bg-primary">
                                              <th>&nbsp;From Range</th>
                                              <th>&nbsp;To Range</th>
                                              <th>&nbsp;Amount</th>
                                              <th>&nbsp;Percentage %</th>
                                            </tr>
                                          </thead>
                                          <tbody className="bg-white">
                                            {currentprofiles[
                                              index
                                            ].profileDetail.map(
                                              (profiledetail, index) => (
                                                <React.Fragment key={index}>
                                                  <tr>
                                                    <td>
                                                      &nbsp;{profiledetail.from}
                                                    </td>
                                                    <td>
                                                      &nbsp;{profiledetail.to}
                                                    </td>
                                                    <td>
                                                      &nbsp;
                                                      {profiledetail.amount}
                                                    </td>
                                                    <td>
                                                      &nbsp;
                                                      {profiledetail.percentage}
                                                    </td>
                                                  </tr>
                                                </React.Fragment>
                                              )
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div
                        className="dataTables_info"
                        id="tableres_info"
                        role="status"
                        aria-live="polite"
                      ></div>
                    </div>
                    <div className="col-sm-6" />
                  </div>
                </div>
                <div className="form-group mesID1 no-result">
                  <h5 className="text-center">No Pricing Found.</h5>
                </div>
                {/* </div> */}
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default connect(null, { setMastersMarkupProfileEdit })(
  MarkupProfileSearch
);
