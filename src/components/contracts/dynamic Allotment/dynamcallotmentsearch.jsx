import { Link } from "react-router-dom";

import {
  hotelOptions,
  offlineHotelSuppliersOptions,
  roomClassOptions,
} from "../../../constants/contants";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import Constants from "../../../constants/routes";

const ContractsDynamicAllotmentSearch = () => {
  return (
    <>
      <Header2
        title="SEARCH DYNAMIC ALLOTMENT"
        linkText1="Create New SDynamic Allotment Rule"
        link1={Constants.URLConstants.CONTRACTSHOTELSDYNAMICALLOTMENTNEW}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div className data-child="row" data-effect="fadeInUp">
          <div className="hpanel">
            <div id="mesID" style={{ display: "none" }} />
            <div className="panel-body">
              <form
                name="search_stagger_inventory_form"
                action="local_system.php"
                method="get"
              >
                <input type="hidden" name="search_string" defaultValue />
                <input
                  type="hidden"
                  name="action"
                  defaultValue="search_staggered_inventory"
                />
                <div className="row">
                  <div className="form-group col-md-3">
                    <label>Supplier</label>
                    <MultiSelect
                      options={offlineHotelSuppliersOptions}
                      isSearchable
                      placeholder="- Select Supplier -"
                      className="custom-select "
                      noOptionsMessage={() => "No Supplier Found"}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Hotel</label>
                    <MultiSelect
                      options={hotelOptions}
                      isSearchable
                      placeholder="- Select Hotel -"
                      className="custom-select"
                      noOptionsMessage={() => "No Hotel Found"}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Inventory Room Class</label>
                    <MultiSelect
                      options={roomClassOptions}
                      isSearchable
                      placeholder="- Select -"
                      className="custom-select"
                      noOptionsMessage={() => "No Room Class Found"}
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-3 form-group">
                    <button
                      className="btn btn-dark btn-sm"
                      type="button"
                      value="Search"
                      onclick="javascript submit_form(document.forms['search_stagger_inventory_form'],false,'search');"
                    >
                      <i className=" fa fa-search" /> Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <br />
          <form>
            <div clas="row">
              <div className="hpanel">
                <div className="panel-body mt-4">
                  <table
                    id="search_stagger_inventory_table"
                    className="table   table-responsive dataTable no-footer table table-bordered"
                  >
                    <thead>
                      <tr>
                        <th style={{ textAlign: "center" }} align="center">
                          Supplier
                        </th>
                        <th style={{ textAlign: "center" }} align="center">
                          Hotel
                        </th>
                        <th style={{ textAlign: "center" }} align="center">
                          Inventory Room Class
                        </th>
                        <th style={{ textAlign: "center" }} align="center">
                          From Day
                        </th>
                        <th style={{ textAlign: "center" }} align="center">
                          To Day
                        </th>
                        <th
                          style={{ textAlign: "center" }}
                          align="center"
                          className="no-sort"
                        >
                          &nbsp;Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr align="center">
                        <td>Nirvana Tour</td>
                        <td>ABC Arabian Suites</td>
                        <td>Standard</td>
                        <td>03-10-2019</td>
                        <td>31-10-2020</td>
                        <td>
                          <div className="input-group-addon">
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={
                                Constants.URLConstants
                                  .CONTRACTSHOTELSDYNAMICALLOTMENTEDIT
                              }
                            >
                              <i className="fa fa-pencil-square-o" />
                            </Link>
                          </div>
                          <div className="input-group-addon">
                            <a
                              className="delete-rule"
                              href="javascriptvoid(0);"
                              url="action=delete_staggered_inventory&hotel_id=46586&supplier_id=S000000002&inventory_class_id=2&from_date=2019-10-03&to_date=2020-10-31"
                            >
                              <i className="fa fa-trash-o" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>Nirvana Tour</td>
                        <td>ABC Arabian Suites</td>
                        <td>Delux</td>
                        <td>03-10-2019</td>
                        <td>31-10-2020</td>
                        <td>
                          <div className="input-group-addon">
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={
                                Constants.URLConstants
                                  .CONTRACTSHOTELSDYNAMICALLOTMENTEDIT
                              }
                            >
                              <i className="fa fa-pencil-square-o" />
                            </Link>
                          </div>
                          <div className="input-group-addon">
                            <a
                              className="delete-rule"
                              href="javascriptvoid(0);"
                              url="action=delete_staggered_inventory&hotel_id=46586&supplier_id=S000000002&inventory_class_id=1&from_date=2019-10-03&to_date=2020-10-31"
                            >
                              <i className="fa fa-trash-o" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>Across Spain</td>
                        <td>Grande Hotel da PÃ³voa</td>
                        <td>Standard Room</td>
                        <td>01-06-2019</td>
                        <td>30-06-2019</td>
                        <td>
                          <div className="input-group-addon">
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={
                                Constants.URLConstants
                                  .CONTRACTSHOTELSDYNAMICALLOTMENTEDIT
                              }
                            >
                              <i className="fa fa-pencil-square-o" />
                            </Link>
                          </div>
                          <div className="input-group-addon">
                            <a
                              className="delete-rule"
                              href="javascriptvoid(0);"
                              url="action=delete_staggered_inventory&hotel_id=61648&supplier_id=S000000012&inventory_class_id=43&from_date=2019-06-01&to_date=2019-06-30"
                            >
                              <i className="fa fa-trash-o" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>East Avenue Travel LLC</td>
                        <td>Keys Hotel Nestor Mumbai</td>
                        <td>1 Bedroom suite</td>
                        <td>16-03-2017</td>
                        <td>20-04-2017</td>
                        <td>
                          <div className="input-group-addon">
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={
                                Constants.URLConstants
                                  .CONTRACTSHOTELSDYNAMICALLOTMENTEDIT
                              }
                            >
                              <i className="fa fa-pencil-square-o" />
                            </Link>
                          </div>
                          <div className="input-group-addon">
                            <a
                              className="delete-rule"
                              href="javascriptvoid(0);"
                              url="action=delete_staggered_inventory&hotel_id=62062&supplier_id=S000000010&inventory_class_id=7&from_date=2017-03-16&to_date=2017-04-20"
                            >
                              <i className="fa fa-trash-o" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>MYCAB</td>
                        <td>ABC Arabian Suites</td>
                        <td>Club Room</td>
                        <td>02-02-2017</td>
                        <td>04-02-2017</td>
                        <td>
                          <div className="input-group-addon">
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={
                                Constants.URLConstants
                                  .CONTRACTSHOTELSDYNAMICALLOTMENTEDIT
                              }
                            >
                              <i className="fa fa-pencil-square-o" />
                            </Link>
                          </div>
                          <div className="input-group-addon">
                            <a
                              className="delete-rule"
                              href="javascriptvoid(0);"
                              url="action=delete_staggered_inventory&hotel_id=46586&supplier_id=S000000004&inventory_class_id=4&from_date=2017-02-02&to_date=2017-02-04"
                            >
                              <i className="fa fa-trash-o" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="form-group">
                  <div className="custPaging pgType2">
                    <table
                      width="100%"
                      cellPadding={0}
                      cellSpacing={0}
                      border={0}
                      className="custPaging  pgType2"
                    >
                      <tbody className="bg-white">
                        <tr>
                          <td align="center" width="70%" />
                          <td align="right" width="30%" />
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ContractsDynamicAllotmentSearch;
