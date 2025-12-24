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
import loadingGif from "../../../assets/images/loadingblue.gif";
import { setMastersCurrencyEdit } from "../../../state/action/actions";
import { connect } from "react-redux";
import ApiRoutes from "../../../constants/ApiRoutes";

const MastersCurrenciesSearch = ({ setMastersCurrencyEdit }) => {
  const [CurrencyData, setCurrencyData] = useState([]);
  const [originalCurrencyData, setOriginalCurrencyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const handleEdditClick = (curr) => {
    setMastersCurrencyEdit(curr);
  };
  const getCurrencies = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.CURRENCIES.CURRENCY);
      if (response.data.statusCode === 200) {
        const currencies =
          response && response.data.data ? response.data.data : [];

        setCurrencyData(currencies);
        setOriginalCurrencyData(currencies);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Currencies");
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
    getCurrencies();
  }, []);
  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filtereData = originalCurrencyData.filter((cur) =>
      cur.currency.toLowerCase().includes(value.toLowerCase())
    );

    setCurrencyData(filtereData);
  };
  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Currency?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Currency has been deleted successfully.",
        ApiRoutes.CURRENCIES.CURRENCY
      );

      if (isDeleted) {
        setOriginalCurrencyData((Currency) =>
          Currency.filter((cur) => cur.uuid !== uuid)
        );
        setCurrencyData((Currency) =>
          Currency.filter((cur) => cur.uuid !== uuid)
        );
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };
  const { currentdata, noofPages } = PaginationSetter(
    currentPage,
    CurrencyData
  );
  const totalPages = noofPages;
  const currentCurrency = currentdata;
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Header2
        title="LIST CURRENCIES"
        linkText1="View Currencies "
        linkText2="Add Currencies "
        link2={Constants.URLConstants.MASTERSCURRENCIESNEW}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        {loading && (
          <div className="text-center">
            <img src={loadingGif} alt="Loading..." height={250} />
          </div>
        )}
        {!loading && (
          <>
            <form name="search_area_from">
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
                            placeholder="Currency Name"
                            value={searchInput}
                            onChange={handleInputSearchChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div class="table-responsive overflw" data-pattern="priority-columns"> */}

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
                                  className="sorting_asc"
                                  tabIndex={0}
                                  aria-controls="search_transfer"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-sort="ascending"
                                  aria-label="Currency Name: activate to sort column descending"
                                  style={{ width: "222.2px" }}
                                >
                                  Currency Name
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="search_transfer"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Currency Code: activate to sort column ascending"
                                  style={{ width: "171.2px" }}
                                >
                                  Currency Code
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="search_transfer"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Currency Description: activate to sort column ascending"
                                  style={{ width: "885.2px" }}
                                >
                                  Currency Description
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="search_transfer"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Action: activate to sort column ascending"
                                  style={{ width: "123px" }}
                                >
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {currentCurrency.map((curr, index) => (
                                <React.Fragment key={index}>
                                  <tr
                                    className={
                                      "phps_row_" +
                                      (index % 2 === 0 ? "0 even" : "1 odd")
                                    }
                                    role="row"
                                  >
                                    <td className="sorting_1">
                                      {curr.currency}
                                    </td>
                                    <td>{curr.currencyCode}</td>
                                    <td>{curr.currencyDescription}</td>
                                    <td className="actionlink">
                                      <div
                                        className="actionCont"
                                        style={{ width: "58px" }}
                                      >
                                        <div className="input-group-addon">
                                          <Link
                                            to={
                                              Constants.URLConstants
                                                .MASTERSCURRENCIESEDIT
                                            }
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title
                                            data-original-title="Edit"
                                            onClick={() =>
                                              handleEdditClick(curr)
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
                                              handleDeleteClick(curr.uuid)
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
                        ></div>
                      </div>
                      <div className="col-sm-6" />
                    </div>
                  </div>
                  <div className="form-group no-result">
                    <h5 className="text-center">
                      Use Search Criteria to Match Your Requirement.
                    </h5>
                  </div>
                  <div className="row pd_tp">
                    <div className="row">
                      <div className="col-md-4 col_hide">
                        <div className="form-group col-md-6">&nbsp;</div>
                      </div>
                      <div className="col-md-5"></div>
                      <div className="col-md-3 col_hide">&nbsp;</div>
                    </div>
                  </div>
                  <br />
                  <br />
                  {/* </div> */}
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default connect(null, { setMastersCurrencyEdit })(
  MastersCurrenciesSearch
);
