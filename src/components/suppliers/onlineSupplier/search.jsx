import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import React, { useEffect, useState } from "react";
import { delDATA, getDATA, putDATA } from "../../../Apis/API";
import {
  ErrorApiAlert,
  PaginationSetter,
  SimpleAlert,
  deleteConfirmation,
} from "../../../constants/globalfunctions";
import loadingGif from "../../../assets/images/loadingblue.gif";
import { connect } from "react-redux";
import { setEditOnlineSuppliersData } from "../../../state/action/actions";
import ApiRoutes from "../../../constants/ApiRoutes";

const SuppliersSearch = ({ setEditOnlineSuppliersData }) => {
  const [supplierData, setSupplierData] = useState([]);
  const [originalsupplierData, setOriginalSupplierData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const getOnlineSuppliers = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.SUPPLIERS.ONLINE.SUPPLIER);
      if (response.data.statusCode === 200) {
        const onlinesuppliers =
          response && response.data.data ? response.data.data : [];

        setSupplierData(onlinesuppliers);
        setOriginalSupplierData(onlinesuppliers);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Online Suppliers");
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
    getOnlineSuppliers();
  }, []);
  const handleEdditClick = (supplier) => {
    setEditOnlineSuppliersData(supplier);
  };
  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Supplier?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Supplier has been deleted successfully.",
        ApiRoutes.SUPPLIERS.ONLINE.SUPPLIER
      );

      if (isDeleted) {
        setOriginalSupplierData((suppliers) =>
          suppliers.filter((supplier) => supplier.uuid !== uuid)
        );
        setSupplierData((suppliers) =>
          suppliers.filter((supplier) => supplier.uuid !== uuid)
        );
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filtereData = originalsupplierData.filter((sp) =>
      sp.supplierName.toLowerCase().includes(value.toLowerCase())
    );

    setSupplierData(filtereData);
  };

  const handleUpdateStatus = async (uuid, status) => {
    try {
      const response = await putDATA(ApiRoutes.SUPPLIERS.ONLINE.STATUS, uuid, {
        status: status,
      });

      if (response.data.statusCode === 200) {
        SimpleAlert(
          "success",
          "Success",
          `Online Supplier is now ${status === true ? "Active" : "In Active"}`
        );

        const updatedOriginalsupplierData = originalsupplierData.map(
          (supplier) =>
            supplier.uuid === uuid ? { ...supplier, status: status } : supplier
        );
        setSupplierData(updatedOriginalsupplierData);
        setOriginalSupplierData(updatedOriginalsupplierData);
      } else {
        SimpleAlert(
          "error",
          "Error",
          "Failed to Update Online Supplier status"
        );
      }
    } catch (error) {
      // Handle errors from the API call

      SimpleAlert("error", "Error", "An unexpected error occurred.");
    }
  };
  const { currentdata, noofPages } = PaginationSetter(
    currentPage,
    supplierData
  );
  const totalPages = noofPages;
  const currentSuppliers = currentdata;
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Header2 title={"SEARCH SUPPLIER"} linkText1="List Online Suppliers" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        {loading && (
          <div className="text-center">
            <img src={loadingGif} alt="Loading..." height={250} />
          </div>
        )}
        {!loading && (
          <>
            <form>
              <div class="panel-body removeMargins">
                <div class="dataTables_scroll">
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
                              type="text"
                              className="tablesearch form-control form-control-sm search_new"
                              placeholder="Supplier Name"
                              value={searchInput}
                              onChange={handleInputSearchChange}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="search_transfer_wrapper"
                    class="dataTables_wrapper form-inline dt-bootstrap no-footer"
                  >
                    <div class="row">
                      <div class="col-sm-6"></div>
                      <div class="col-sm-6"></div>
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
                            style={{ height: "20px", width: "1320px" }}
                          ></div>
                        </div>
                        <div id="wrapper2" style={{ overflow: " auto" }}>
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
                                  style={{ width: " 280.2px" }}
                                >
                                  &nbsp;Supplier Name
                                </th>
                                <th
                                  class="sorting_disabled"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "200.2px" }}
                                >
                                  &nbsp;Code
                                </th>
                                <th
                                  class="sorting_disabled"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "197.2px" }}
                                >
                                  &nbsp;Contact Person
                                </th>
                                <th
                                  class="sorting_disabled"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "90.2px" }}
                                >
                                  &nbsp;Address
                                </th>
                                <th
                                  class="sorting_disabled"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "119.2px" }}
                                >
                                  &nbsp;Phone
                                </th>
                                <th
                                  class="sorting_disabled"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "358.2px" }}
                                >
                                  &nbsp;Email
                                </th>
                                <th
                                  class="sorting_disabled"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "160px" }}
                                >
                                  &nbsp;Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {currentSuppliers.map((supplier, index) => (
                                <React.Fragment key={index}>
                                  <tr
                                    role="row"
                                    className={
                                      "phps_row_" +
                                      (index % 2 === 0 ? "0 even" : "1 odd")
                                    }
                                  >
                                    <td>&nbsp;{supplier.companyName}</td>
                                    <td>{supplier.supplierName}</td>
                                    <td>
                                      {" "}
                                      &nbsp;
                                      {`${supplier.firstName || ""} ${
                                        supplier.middleName || ""
                                      } ${supplier.lastName || ""}`.trim() ||
                                        ""}
                                    </td>
                                    <td>&nbsp;{supplier.Address}</td>
                                    <td>&nbsp;{supplier.phone}</td>
                                    <td>&nbsp;{supplier.email}</td>
                                    <td class="actionlink">
                                      <div class="actionCont">
                                        <div class="input-group-addon">
                                          <Link
                                            to={
                                              Constants.URLConstants
                                                .SUPPLIERSEARCHEDIT
                                            }
                                            onClick={() =>
                                              handleEdditClick(supplier)
                                            }
                                          >
                                            <i class="fa fa-pencil-square-o"></i>
                                          </Link>
                                        </div>
                                        <div class="input-group-addon">
                                          <Link
                                            to={
                                              Constants.URLConstants
                                                .SUPPLIERSEARCHVIEW
                                            }
                                            onClick={() =>
                                              handleEdditClick(supplier)
                                            }
                                          >
                                            <i class="fa fa-eye"></i>
                                          </Link>
                                        </div>
                                        <div
                                          className="input-group-addon"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title=""
                                          data-original-title="Click To Deactivate"
                                        >
                                          {supplier.status === true ? (
                                            <Link
                                              onClick={() => {
                                                handleUpdateStatus(
                                                  supplier.uuid,
                                                  false
                                                );
                                              }}
                                            >
                                              <i className="fa fa-check-circle"></i>
                                            </Link>
                                          ) : (
                                            <Link
                                              onClick={() => {
                                                handleUpdateStatus(
                                                  supplier.uuid,
                                                  true
                                                );
                                              }}
                                            >
                                              <i className="fa fa-times-circle"></i>
                                            </Link>
                                          )}
                                        </div>
                                        <div class="input-group-addon">
                                          <Link
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title
                                            data-original-title="Delete"
                                            onClick={() =>
                                              handleDeleteClick(supplier.uuid)
                                            }
                                          >
                                            <i className="fa fa-trash" />{" "}
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
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default connect(null, { setEditOnlineSuppliersData })(SuppliersSearch);
