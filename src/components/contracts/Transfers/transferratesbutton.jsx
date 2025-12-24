/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import MultiSelect from "../../reactMultiSelect";
import loadingGif from "../../../assets/images/loadingblue.gif";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import {
  ErrorApiAlert,
  PaginationSetter,
} from "../../../constants/globalfunctions";
import { getDATA } from "../../../Apis/API";
import { setAddRates } from "../../../state/action/actions";
import { connect } from "react-redux";
import ApiRoutes from "../../../constants/ApiRoutes";

const ContractsTransfersRatesSearchButton = ({ setAddRates }) => {
  const [mappedTransferData, setMappedTransferData] = useState([]);
  const [mappedTransferOriginalData, setMappedTransferOriginalData] = useState(
    []
  );
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [supplierOptions, setsupplierOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [transferName, setTransferName] = useState("");

  const handleAddRatesData = (supplierData, transferName) => {
    const updatedSupplierData = {
      ...supplierData,
      currentTransfer: transferName,
    };
    setAddRates(updatedSupplierData);
  };
  const getUniqueOptions = (items, key) => {
    const uniqueItems = Array.from(new Set(items.map((item) => item[key])));
    return uniqueItems.map((value) => ({
      value,
      label: value,
    }));
  };
  const getOfflineSuppliers = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.SUPPLIERS.OFFLINE.SUPPLIER);
      if (response.data.statusCode === 200) {
        const supplier =
          response && response.data.data ? response.data.data : [];

        const filteredSuppliers = supplier.filter(
          (sup) => sup.transfers && sup.transfers.length > 0
        );
        setMappedTransferData(filteredSuppliers);
        setMappedTransferOriginalData(filteredSuppliers);
        const options = getUniqueOptions(filteredSuppliers, "supplierName");
        const countryoptions = getUniqueOptions(filteredSuppliers, "country");
        const cityoptions = getUniqueOptions(filteredSuppliers, "city");
        setCountryOptions(countryoptions);
        setsupplierOptions(options);
        setCityOptions(cityoptions);
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert("Error Fetching Suppliers");
    } finally {
      setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filtereData = mappedTransferOriginalData.filter((data) =>
      data.supplierName.toLowerCase().includes(value.toLowerCase())
    );

    setMappedTransferData(filtereData);
  };
  useEffect(() => {
    getOfflineSuppliers();
  }, []);

  const handleCountryChange = (selected) => {
    setSelectedCountry(selected);
  };

  const handleCityChange = (selected) => {
    setSelectedCity(selected);
  };

  const handleSupplierChange = (selected) => {
    setSelectedSupplier(selected);
  };
  const handleSearch = (e) => {
    e.preventDefault();

    const filteredResults = mappedTransferOriginalData.filter((sup) => {
      const countryMatch =
        !selectedCountry.value ||
        selectedCountry.value.toLowerCase() === "" ||
        sup.country.toLowerCase() === selectedCountry.value.toLowerCase();
      const cityMatch =
        !selectedCity.value ||
        selectedCity.value.toLowerCase() === "" ||
        sup.city.toLowerCase() === selectedCity.value.toLowerCase();
      const supplierMatch =
        !selectedSupplier.value ||
        selectedSupplier.value.toLowerCase() === "" ||
        sup.supplierName.toLowerCase() === selectedSupplier.value.toLowerCase();
      const transferMatch =
        !transferName ||
        transferName === "" ||
        sup.transfers.some((transfer) =>
          transfer.transferName
            .toLowerCase()
            .includes(transferName.toLowerCase())
        );

      return countryMatch && cityMatch && supplierMatch && transferMatch;
    });

    setMappedTransferData(filteredResults);
  };

  const resetform = (event) => {
    event.preventDefault();

    setSelectedCountry("");
    setSelectedCity("");
    setSelectedSupplier("");
    setTransferName("");
    setMappedTransferData(mappedTransferOriginalData);
  };

  const { currentdata, noofPages } = PaginationSetter(
    currentPage,
    mappedTransferData
  );
  const totalPages = noofPages;
  const currentMappedTransfers = currentdata;
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Header2 title="TRANSFER LIST" linkText1="List Transfers" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div className data-child="row" data-effect="fadeInUp">
          <form name="search_transfer_from" onSubmit={handleSearch}>
            <input type="hidden" name="action" defaultValue />
            <input type="hidden" name="Search" defaultValue="N" />
            <div className="row">
              <div className="hpanel">
                <div
                  className="panel-body"
                  style={{ marginLeft: "15px", marginRight: "15px" }}
                >
                  <div className="row">
                    <div className="col-md-3 form-group">
                      <label>Transfer Name</label>
                      <input
                        type="text"
                        className="form-control form-control-sm test123"
                        name="Search_transfer_name"
                        value={transferName}
                        onChange={(e) => setTransferName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3 form-group">
                      <label>Country</label>
                      <MultiSelect
                        options={countryOptions}
                        isSearchable
                        placeholder="- Select Country -"
                        className="custom-select"
                        onChange={handleCountryChange}
                        noOptionsMessage={() => "No Country Found"}
                      />
                    </div>
                    <div className="col-md-3 form-group">
                      <label>City</label>
                      <MultiSelect
                        options={cityOptions}
                        isSearchable
                        placeholder="- Select City -"
                        className="custom-select"
                        onChange={handleCityChange}
                        noOptionsMessage={() => "No City Found"}
                      />
                    </div>
                    <div className="col-md-3 form-group">
                      <label>Supplier</label>
                      <MultiSelect
                        options={supplierOptions}
                        isSearchable
                        placeholder="- Select Supplier -"
                        className="custom-select"
                        onChange={handleSupplierChange}
                        noOptionsMessage={() => "No Supplier Found"}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-2 form-group">
                      <span id="submit_td">
                        <button className="btn btn-dark btn-sm">
                          <i className="fa fa-search" aria-hidden="true"></i>{" "}
                          Search
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
                </div>
                <div id="mesID" style={{ display: "none" }}>
                  Please use search criteria to view transfers.
                </div>
              </div>
            </div>
          </form>
        </div>
        {loading && (
          <div className="text-center">
            <img src={loadingGif} alt="Loading..." height={250} />
          </div>
        )}
        {!loading && (
          <>
            <form className="mt-4">
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
                          placeholder="Supplier Name"
                          value={searchInput}
                          onChange={handleInputSearchChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="dataTables_scroll">
                  {/* <div class="table-responsive overflw" data-pattern="priority-columns"> */}
                  <div
                    id="search_local_supplier_wrapper"
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
                            width: "1350px",
                          }}
                        >
                          <div
                            className="suwala-doubleScroll-scroll"
                            style={{ height: "20px", width: "1350px" }}
                          />
                        </div>
                        <div id="wrapper2" style={{ overflow: "auto" }}>
                          <table
                            id="search_local_supplier"
                            className="table   table-responsive dataTable no-footer table-bordered"
                            role="grid"
                            aria-describedby="search_local_supplier_info"
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "357px" }}
                                >
                                  Transfer Name
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "312px" }}
                                >
                                  Country
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "160px" }}
                                >
                                  City
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "222px" }}
                                >
                                  Supplier
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "237px" }}
                                >
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {currentMappedTransfers.map(
                                (supplier) =>
                                  supplier.transfers.length > 0 &&
                                  supplier.transfers.map((transfer, index) => {
                                    const className =
                                      index % 2 === 0
                                        ? "phps_row_0 even"
                                        : "phps_row_1 odd";
                                    return (
                                      <tr
                                        key={transfer.uuid}
                                        className={className}
                                        role="row"
                                      >
                                        <td>&nbsp;{transfer.transferName}</td>
                                        <td>&nbsp;{supplier.country}</td>
                                        <td>&nbsp;{supplier.city}</td>
                                        <td>&nbsp;{supplier.supplierName}</td>
                                        <td className="actionlink">
                                          <div className="actionCont">
                                            <div
                                              className="input-group-addon"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title="Add Transfer Rates"
                                            >
                                              <Link
                                                id={`transfer_${transfer.uuid}`}
                                                to={
                                                  Constants.URLConstants
                                                    .CONTRACTSADDTRANSFERSRATESLIST
                                                }
                                                onClick={() =>
                                                  handleAddRatesData(
                                                    supplier,
                                                    transfer.transferName
                                                  )
                                                }
                                              >
                                                <i className="fa fa-building-o">
                                                  <small>
                                                    <sub className="fa fa-plus fa-xs" />
                                                  </small>
                                                </i>
                                              </Link>
                                            </div>
                                            <div
                                              className="input-group-addon"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title="Search Transfer Rates"
                                            >
                                              <Link
                                                id={`transfer_${transfer.uuid}`}
                                                to={
                                                  Constants.URLConstants
                                                    .CONTRACTSTRANSFERSRATESSEARCHTRANFERLIST
                                                }
                                                target="_blank"
                                              >
                                                <i className="fa fa-building-o">
                                                  <small>
                                                    <sub className="fa fa-search" />
                                                  </small>
                                                </i>
                                              </Link>
                                            </div>

                                            <div
                                              className="input-group-addon"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title="Add Cancellation Policy"
                                            >
                                              <Link
                                                id={`transfer_${transfer.uuid}`}
                                                to={
                                                  Constants.URLConstants
                                                    .CONTRACADDTSTRANSFERSRATESCANCELPOLICY
                                                }
                                                onClick={() =>
                                                  handleAddRatesData(
                                                    supplier,
                                                    transfer.transferName
                                                  )
                                                }
                                              >
                                                <i className="fa fa-file-text-o">
                                                  <small>
                                                    <sub className="fa fa-times" />
                                                  </small>
                                                </i>
                                              </Link>
                                            </div>
                                            <div
                                              className="input-group-addon"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title="Search Cancellation Policy"
                                            >
                                              <Link
                                                id={`transfer_${transfer.uuid}`}
                                                to={
                                                  Constants.URLConstants
                                                    .CONTRACTSTRANSFERSRATESCANCELPOLICY
                                                }
                                                onClick={() =>
                                                  handleAddRatesData(
                                                    supplier,
                                                    transfer.transferName
                                                  )
                                                }
                                              >
                                                <i className="fa fa-file-text-o">
                                                  <small>
                                                    <sub className="fa fa-search" />
                                                  </small>
                                                </i>
                                              </Link>
                                            </div>
                                            <div
                                              className="input-group-addon"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title="Add Stop Sale"
                                            >
                                              <Link
                                                id={`transfer_${transfer.uuid}`}
                                                to={
                                                  Constants.URLConstants
                                                    .CONTRACTSTRANSFERSRATESADDSTOPSALE
                                                }
                                                onClick={() =>
                                                  handleAddRatesData(
                                                    supplier,
                                                    transfer.transferName
                                                  )
                                                }
                                              >
                                                <i className="fa fa-ban">
                                                  <small>
                                                    <sub className="fa fa-plus" />
                                                  </small>
                                                </i>
                                              </Link>
                                            </div>
                                            <div
                                              className="input-group-addon"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title="Search Stop Sale"
                                            >
                                              <Link
                                                id={`transfer_${transfer.uuid}`}
                                                to={
                                                  Constants.URLConstants
                                                    .CONTRACTSTRANSFERSRATESVIEWSTOPSALE
                                                }
                                                onClick={() =>
                                                  handleAddRatesData(
                                                    supplier,
                                                    transfer.transferName
                                                  )
                                                }
                                              >
                                                <i className="fa fa-ban">
                                                  <small>
                                                    <sub className="fa fa-search" />
                                                  </small>
                                                </i>
                                              </Link>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div
                          className="dataTables_info"
                          id="search_local_supplier_info"
                          role="status"
                          aria-live="polite"
                        />
                      </div>
                      <div className="col-sm-6" />
                    </div>
                  </div>
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

export default connect(null, { setAddRates })(
  ContractsTransfersRatesSearchButton
);
