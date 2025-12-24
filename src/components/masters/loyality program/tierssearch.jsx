import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import loadingGif from "../../../assets/images/loadingblue.gif";
import React, { useEffect, useState } from "react";
import { delDATA, getDATA } from "../../../Apis/API";
import {
  ErrorApiAlert,
  PaginationSetter,
  deleteConfirmation,
} from "../../../constants/globalfunctions";
import { setMastersLoyaltyTierEdit } from "../../../state/action/actions";
import { connect } from "react-redux";
import ApiRoutes from "../../../constants/ApiRoutes";

const MastersLoyalityProgramTiersSearch = ({ setMastersLoyaltyTierEdit }) => {
  const [TiersData, setTiersData] = useState([]);
  const [originalTiersData, setOriginalTiersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleEdditClick = (ltier) => {
    setMastersLoyaltyTierEdit(ltier);
  };
  const getloyaltyTiers = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.LOYALTY_PROGRAM.TIERS);
      if (response.data.statusCode === 200) {
        const tier = response && response.data.data ? response.data.data : [];

        setTiersData(tier);
        setOriginalTiersData(tier);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Loyalty Tier");
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
    getloyaltyTiers();
  }, []);

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filtereData = originalTiersData.filter((tr) =>
      tr.tierName.toLowerCase().includes(value.toLowerCase())
    );

    setTiersData(filtereData);
  };

  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Loyalty Tier?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Loyalty Tier has been deleted successfully.",
        ApiRoutes.LOYALTY_PROGRAM.TIERS
      );

      if (isDeleted) {
        setOriginalTiersData((tiers) => tiers.filter((t) => t.uuid !== uuid));
        setTiersData((tiers) => tiers.filter((t) => t.uuid !== uuid));
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };

  const { currentdata, noofPages } = PaginationSetter(currentPage, TiersData);
  const totalPages = noofPages;
  const currenttier = currentdata;
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Header2
        title="LOYALTY TIER"
        linkText1="Search Loyalty Tier"
        linkText2="Add Loyalty Tier"
        link2={Constants.URLConstants.MASTERSLOYALITYPROGRAMTIERSNEW}
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
                <div className="row">
                  <div className="col-md-12">
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
                              style={{
                                textAlign: "right",
                                paddingRight: "0px",
                              }}
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
                                placeholder="Currency Name"
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
                        <div className="row mt-2">
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
                                    <th rowSpan={1} colSpan={1}>
                                      Loyalty Tier Name
                                    </th>
                                    <th colSpan={2} rowSpan={1}>
                                      Tier Conversion(To Earn)
                                    </th>
                                    <th colSpan={2} rowSpan={1}>
                                      Tier Conversion(To Redeem)
                                    </th>
                                    <th rowSpan={1} colSpan={1}>
                                      Currency
                                    </th>
                                    <th
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="search_transfer"
                                    >
                                      Action
                                    </th>
                                  </tr>
                                  {/* <tr className="bg-light" style={{color: 'grey', textTransform: 'uppercase'}} role="row">
                        <th className="no-sort sorting_disabled" />
                        <th className="sorting" tabIndex={0} aria-controls="search_transfer">Amount
                        </th>
                        <th className="sorting" tabIndex={0} aria-controls="search_transfer">Points
                        </th>
                        <th className="sorting" tabIndex={0} aria-controls="search_transfer">Amount
                        </th>
                        <th className="sorting" tabIndex={0} aria-controls="search_transfer">Points
                        </th>
                        <th className="sorting" tabIndex={0} aria-controls="search_transfer">
                          Required Points</th>
                        <th className="no-sort sorting_disabled" />
                      </tr> */}
                                </thead>
                                <tbody className="bg-white">
                                  {currenttier.map((tier, index) => (
                                    <React.Fragment key={index}>
                                      <tr
                                        className={
                                          "phps_row_" +
                                          (index % 2 === 0 ? "0 even" : "1 odd")
                                        }
                                        role="row"
                                      >
                                        <td>{tier.tierName}</td>
                                        <td>{tier.toEarn}</td>
                                        <td>{tier.toEarnConvertionPoints}</td>
                                        <td>{tier.toRedeem}</td>
                                        <td>{tier.toRedeemConvertionPoints}</td>
                                        <td>{tier.currency}</td>
                                        {/* <td align="center" style={{color: '#2c2c2c', fontWeight: 500, fontSize: '12px'}}>INR</td> */}
                                        <td className="actionlink">
                                          <div className="actionCont">
                                            <div className="input-group-addon">
                                              <Link
                                                to={
                                                  Constants.URLConstants
                                                    .MASTERSLOYALITYPROGRAMTIERSEDIT
                                                }
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title
                                                data-original-title="Edit"
                                                onClick={() =>
                                                  handleEdditClick(tier)
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
                                                  handleDeleteClick(tier.uuid)
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
                        <div className="row">
                          <div className="col-sm-6">
                            <div
                              className="dataTables_info"
                              id="search_transfer_info"
                              role="status"
                              aria-live="polite"
                            />
                          </div>
                          <div className="col-sm-6">
                            <div
                              className="dataTables_paginate paging_simple_numbers"
                              id="search_transfer_paginate"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group no-result">
                        <h5 className="text-center">No result found.</h5>
                      </div>
                    </div>
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

export default connect(null, { setMastersLoyaltyTierEdit })(
  MastersLoyalityProgramTiersSearch
);
