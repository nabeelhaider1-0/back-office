import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";

const MastersTaxMAsterSearch = () => {
  return (
    <>
      <Header2
        title="TAX"
        linkText1="Search Tax Master"
        linkText2="Add Tax"
        link2={Constants.URLConstants.MASTERSTAXMASTERNEW}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
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
              <div
                id="wrapper2"
                style={{
                  overflowX: "scroll",
                  display: "block",
                  overflowY: "hidden",
                }}
              >
                <table
                  id="search_profile"
                  className="table   table-responsive dataTable no-footer table-bordered"
                  role="grid"
                  aria-describedby="search_profile_info"
                >
                  <thead>
                    <tr role="row">
                      <th>Name</th>
                      <th>Amount %</th>
                      {/* <th>Type</th> */}
                      {/* <th>Reverse</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr>
                      <td>Sam test</td>
                      <td>5</td>
                      {/* <td>Input</td> */}
                      {/* <td>No</td> */}
                      <td className="actionlink">
                        <div className="actionCont">
                          <div className="input-group-addon">
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={Constants.URLConstants.MASTERSTAXMASTEREDIT}
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
                    <tr>
                      <td>CGST</td>
                      <td>5</td>
                      {/* <td>Output</td> */}
                      {/* <td>No</td> */}
                      <td className="actionlink">
                        <div className="actionCont">
                          <div className="input-group-addon">
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={Constants.URLConstants.MASTERSTAXMASTEREDIT}
                            >
                              <i className="fa fa-pencil-square-o" />
                            </Link>
                          </div>
                          <div className="input-group-addon">
                            <a
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              href="tax.php?action=delete_tax_master&id=2"
                            >
                              <i className="fa fa-trash" />
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Tax-Minal (Inbound)</td>
                      <td>10</td>
                      {/* <td>Input</td> */}
                      {/* <td>No</td> */}
                      <td className="actionlink">
                        <div className="actionCont">
                          <div className="input-group-addon">
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={Constants.URLConstants.MASTERSTAXMASTEREDIT}
                            >
                              <i className="fa fa-pencil-square-o" />
                            </Link>
                          </div>
                          <div className="input-group-addon">
                            <a
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              href="tax.php?action=delete_tax_master&id=5"
                            >
                              <i className="fa fa-trash" />
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>SGST</td>
                      <td>5</td>
                      {/* <td>Input</td> */}
                      {/* <td>No</td> */}
                      <td className="actionlink">
                        <div className="actionCont">
                          <div className="input-group-addon">
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={Constants.URLConstants.MASTERSTAXMASTEREDIT}
                            >
                              <i className="fa fa-pencil-square-o" />
                            </Link>
                          </div>
                          <div className="input-group-addon">
                            <a
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              href="tax.php?action=delete_tax_master&id=6"
                            >
                              <i className="fa fa-trash" />
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>SPGST</td>
                      <td>5</td>
                      {/* <td>Input</td> */}
                      {/* <td>No</td> */}
                      <td className="actionlink">
                        <div className="actionCont">
                          <div className="input-group-addon">
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={Constants.URLConstants.MASTERSTAXMASTEREDIT}
                            >
                              <i className="fa fa-pencil-square-o" />
                            </Link>
                          </div>
                          <div className="input-group-addon">
                            <a
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              href="tax.php?action=delete_tax_master&id=7"
                            >
                              <i className="fa fa-trash" />
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>IntSupGST</td>
                      <td>5</td>
                      {/* <td>Input</td> */}
                      {/* <td>No</td> */}
                      <td className="actionlink">
                        <div className="actionCont">
                          <div className="input-group-addon">
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={Constants.URLConstants.MASTERSTAXMASTEREDIT}
                            >
                              <i className="fa fa-pencil-square-o" />
                            </Link>
                          </div>
                          <div className="input-group-addon">
                            <a
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              href="tax.php?action=delete_tax_master&id=8"
                            >
                              <i className="fa fa-trash" />
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>IntDesCustomer</td>
                      <td>5</td>
                      {/* <td>Output</td> */}
                      {/* <td>No</td> */}
                      <td className="actionlink">
                        <div className="actionCont">
                          <div className="input-group-addon">
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={Constants.URLConstants.MASTERSTAXMASTEREDIT}
                            >
                              <i className="fa fa-pencil-square-o" />
                            </Link>
                          </div>
                          <div className="input-group-addon">
                            <a
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              href="tax.php?action=delete_tax_master&id=9"
                            >
                              <i className="fa fa-trash" />
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Test Tax</td>
                      <td>10</td>
                      {/* <td>Input</td> */}
                      {/* <td>No</td> */}
                      <td className="actionlink">
                        <div className="actionCont">
                          <div className="input-group-addon">
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={Constants.URLConstants.MASTERSTAXMASTEREDIT}
                            >
                              <i className="fa fa-pencil-square-o" />
                            </Link>
                          </div>
                          <div className="input-group-addon">
                            <a
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              href="tax.php?action=delete_tax_master&id=10"
                            >
                              <i className="fa fa-trash" />
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Service Tax</td>
                      <td>15</td>
                      {/* <td>Input</td> */}
                      {/* <td>No</td> */}
                      <td className="actionlink">
                        <div className="actionCont">
                          <div className="input-group-addon">
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={Constants.URLConstants.MASTERSTAXMASTEREDIT}
                            >
                              <i className="fa fa-pencil-square-o" />
                            </Link>
                          </div>
                          <div className="input-group-addon">
                            <a
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              href="tax.php?action=delete_tax_master&id=11"
                            >
                              <i className="fa fa-trash" />
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Ron Out-Tax</td>
                      <td>10</td>
                      {/* <td>Output</td> */}
                      {/* <td>No</td> */}
                      <td className="actionlink">
                        <div className="actionCont">
                          <div className="input-group-addon">
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={Constants.URLConstants.MASTERSTAXMASTEREDIT}
                            >
                              <i className="fa fa-pencil-square-o" />
                            </Link>
                          </div>
                          <div className="input-group-addon">
                            <a
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              href="tax.php?action=delete_tax_master&id=12"
                            >
                              <i className="fa fa-trash" />
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Ron In-Tax</td>
                      <td>10</td>
                      {/* <td>Input</td> */}
                      {/* <td>No</td> */}
                      <td className="actionlink">
                        <div className="actionCont">
                          <div className="input-group-addon">
                            <Link
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              to={Constants.URLConstants.MASTERSTAXMASTEREDIT}
                            >
                              <i className="fa fa-pencil-square-o" />
                            </Link>
                          </div>
                          <div className="input-group-addon">
                            <a
                              data-toggle="tooltip"
                              data-original-title="Edit"
                              data-placement="top"
                              href="tax.php?action=delete_tax_master&id=13"
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
          </div>
        </form>
      </div>
    </>
  );
};
export default MastersTaxMAsterSearch;
