import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import { edtoptions } from "../../constants/contants";

const CustomersAgentRateProfile = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="SEARCH PROFILE"
          linkText1=" Search Agent Profile"
          linkText2="Create New Agent Profile"
          link2={Constants.URLConstants.CUSTOMERSAGENTSNEW}
        />

        <div>
          {/* First Row*/}
          <form>
            <div className="row">
              <div className="col-md-2 form-group">
                <label>Profile</label>
                <MultiSelect
                  isMulti
                  options={edtoptions}
                  placeholder="Select Agent..."
                  isSearchable
                  noOptionsMessage={() => "No Agent Found"}
                  className="required"
                />
              </div>
              <div className="col-md-2 form-group">
                <label>&nbsp;</label>
                <br />
                <button
                  className="btn btn-dark btn-sm form-group search"
                  onclick="callmesubmit();"
                >
                  <i className="fa fa-search" />
                  Search
                </button>
              </div>
            </div>
          </form>
          <br />
          <form>
            {/*2nd Row*/}
            <div className="panel-body removeMargins">
              <div className="row pd_tp mb-3">
                <div className="row mt-3">
                  <div className="col-md-4"></div>
                  <div className="col-md-6"></div>
                  <div className="col-md-2 search_option">
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
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div clas="row ">
                <table
                  id="search_agents_table1"
                  className="table   table-responsive dataTable no-footer table-bordered"
                  role="grid"
                  aria-describedby="search_profile_info"
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className id="row_5">
                      <td align="center">High Rates</td>
                      <td className="actionlink">
                        <div className="actionCont">
                          <div className="input-group-addon">
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={
                                Constants.URLConstants
                                  .CUSTOMERSAGENTSEDITRATEPROFILE
                              }
                            >
                              <i className="fa fa-pencil-square-o" />
                            </Link>
                          </div>
                          <div className="input-group-addon">
                            <a
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              href="tax.php?action=delete_tax_master&id=1"
                            >
                              <i className="fa fa-trash" />
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className id="row_4">
                      <td align="center">Low rates</td>
                      <td className="actionlink">
                        <div className="actionCont">
                          <div className="input-group-addon">
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={
                                Constants.URLConstants
                                  .CUSTOMERSAGENTSEDITRATEPROFILE
                              }
                            >
                              <i className="fa fa-pencil-square-o" />
                            </Link>
                          </div>
                          <div className="input-group-addon">
                            <a
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              href="tax.php?action=delete_tax_master&id=1"
                            >
                              <i className="fa fa-trash" />
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
          {/* End */}
        </div>
      </div>
    </>
  );
};
export default CustomersAgentRateProfile;
