import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { offlineSupplierOptions } from "../../../constants/contants";

const ContractsFlightsAddRatesSearch = () => {
  return (
    <>
      <Header2 title="SEARCH MAPPED FLIGHT" linkText1="List Mapped Flights" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-3 form-group">
                  <label>Supplier</label>
                  <MultiSelect
                    options={offlineSupplierOptions}
                    isSearchable
                    placeholder="- Select Supplier -"
                    className="custom-select"
                    noOptionsMessage={() => "No Supplier Found"}
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Flight Number</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="Search_flight_number"
                  />
                </div>
              </div>
              <br />
              <div className="row mt-3">
                <div className="col-md-12 form-group">
                  <button
                    className="btn btn-dark btn-sm"
                    type="button"
                    onclick="javascriptcallSearch(document.forms['search_flight_from']);"
                  >
                    <i className="fa fa-search" />
                    &nbsp;Search
                  </button>
                </div>
              </div>
            </div>
          </form>
          <br />
          <form>
            <div
              id="search_local_flights_wrapper"
              className="dataTables_wrapper form-inline dt-bootstrap no-footer"
            >
              <div className="row">
                <div className="col-sm-10" />
                <div className="col-sm-2">
                  <div
                    id="search_creadit_note_filter"
                    className="dataTables_filter"
                  >
                    <label>
                      <h5 style={{ display: "inline" }}>
                        <i
                          className="fa fa-search srchWithinPg"
                          id="magnifier"
                          data-toggle="tooltip"
                          style={{ color: "#333" }}
                          data-placement="top"
                          data-original-title="Search within this table"
                        />
                      </h5>
                      <input
                        type="search"
                        className="form-control input-sm"
                        placeholder
                        aria-controls="search_creadit_note"
                      />
                    </label>
                  </div>
                </div>
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
                      style={{ height: "20px" }}
                    />
                  </div>
                  <div id="wrapper2" style={{ overflow: "auto" }}>
                    <table
                      id="search_local_flights"
                      className="table   table-responsive dataTable no-footer table-bordered"
                      role="grid"
                      aria-describedby="search_local_flights_info"
                    >
                      <thead>
                        <tr role="row">
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "246px" }}
                          >
                            Flight Number
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "358px" }}
                          >
                            Destination From
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "284px" }}
                          >
                            Destination To
                          </th>
                          <th
                            className="sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "173px" }}
                          >
                            Supplier
                          </th>
                          <th
                            className="no-sort sorting_disabled"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "198px" }}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="phps_row_1 odd" role="row">
                          <td style={{ textAlign: "left" }}>
                            &nbsp;CharterFlight_2022
                          </td>
                          <td style={{ textAlign: "left" }}>
                            &nbsp;Chhatrapati Shivaji - BOM
                          </td>
                          <td style={{ textAlign: "left" }}>
                            &nbsp;Dubai Intl Arpt - DXB{" "}
                          </td>
                          <td style={{ textAlign: "left" }}>&nbsp;QtechTest</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Add Extranet Rates"
                              >
                                <Link onclick="extranet('1','S000000001');">
                                  <i className="fa fa-plane" />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td style={{ textAlign: "left" }}>
                            &nbsp;CharterFlight_2022
                          </td>
                          <td style={{ textAlign: "left" }}>
                            &nbsp;Chhatrapati Shivaji - BOM
                          </td>
                          <td style={{ textAlign: "left" }}>
                            &nbsp;Dubai Intl Arpt - DXB{" "}
                          </td>
                          <td style={{ textAlign: "left" }}>&nbsp;QtechTest</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Add Extranet Rates"
                              >
                                <Link onclick="extranet('1','S000000001');">
                                  <i className="fa fa-plane" />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_1 odd" role="row">
                          <td style={{ textAlign: "left" }}>
                            &nbsp;CharterFlight_2023
                          </td>
                          <td style={{ textAlign: "left" }}>
                            &nbsp;A B Cantanhede Intl Arpt - BVB
                          </td>
                          <td style={{ textAlign: "left" }}>
                            &nbsp;A C Jobim Intl Arpt - GIG{" "}
                          </td>
                          <td style={{ textAlign: "left" }}>&nbsp;QtechTest</td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Add Extranet Rates"
                              >
                                <Link onclick="extranet('2','S000000001');">
                                  <i className="fa fa-plane" />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="phps_row_0 even" role="row">
                          <td style={{ textAlign: "left" }}>
                            &nbsp;CharterFlight_2023
                          </td>
                          <td style={{ textAlign: "left" }}>
                            &nbsp;A B Cantanhede Intl Arpt - BVB
                          </td>
                          <td style={{ textAlign: "left" }}>
                            &nbsp;A C Jobim Intl Arpt - GIG{" "}
                          </td>
                          <td style={{ textAlign: "left" }}>
                            &nbsp;Across Spain
                          </td>
                          <td className="actionlink">
                            <div className="actionCont">
                              <div
                                className="input-group-addon"
                                data-toggle="tooltip"
                                data-placement="top"
                                data-original-title="Add Extranet Rates"
                              >
                                <Link onclick="extranet('2','S000000012');">
                                  <i className="fa fa-plane" />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div
                    className="dataTables_info"
                    id="search_local_flights_info"
                    role="status"
                    aria-live="polite"
                  />
                </div>
                <div className="col-sm-6" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ContractsFlightsAddRatesSearch;
