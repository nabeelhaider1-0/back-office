import { Link } from "react-router-dom";
import Header2 from "../../../header2/header2";
import Constants from "../../../../constants/routes";

const MastersSuppliersOnlineSuppliersSearch = () => {
  return (
    <>
      <Header2 title="SEARCH SUPPLIER" linkText1="List Online Suppliers" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body removeMargins">
            <div className="dataTables_scroll">
              <br />
              <div className="row pd_tp">
                <div className="row">
                  <div className="col-md-4 col_hide">
                    <div className="form-group col-md-12">&nbsp;</div>
                  </div>
                  <div className="col-md-5 col_hide">
                    <div className="form-group" />
                  </div>
                  <div className="col-md-3">
                    <style
                      dangerouslySetInnerHTML={{
                        __html:
                          "\n                                .table tr[visible='false'],\n                                .no-result {\n                                    display: none;\n                                    border: 1px solid #ddd;\n                                    padding: 10px;\n                                    margin-top: -2px;\n                                }\n\n                                .table tr[visible='true'] {\n                                    display: table-row;\n                                }\n\n                                .counter {\n                                    padding: 8px;\n                                    color: #ccc;\n                                }\n\n                                .search_new {\n                                    float: right;\n                                    height: 35px;\n                                    margin-bottom: 0px;\n                                    padding-left: 5px;\n                                }\n                            ",
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
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div class="table-responsive overflw" data-pattern="priority-columns"> */}
              <div
                id="search_sup_wrapper"
                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
              >
                <div className="row">
                  <div className="col-sm-6" />
                  <div className="col-sm-6" />
                </div>
                <div className="row mt-2">
                  <div className="col-sm-12">
                    <div
                      className="doubleScroll-scroll-wrapper"
                      id="wrapper1"
                      style={{
                        height: "20px",
                        overflow: "scroll hidden",
                        width: "1491.4px",
                      }}
                    >
                      <div
                        className="suwala-doubleScroll-scroll"
                        style={{ height: "20px", width: "1491px" }}
                      />
                    </div>
                    <div id="wrapper2" style={{ overflow: "auto" }}>
                      <table
                        id="search_sup"
                        className="table table-bordered   table-responsive dataTable no-footer"
                        role="grid"
                        aria-describedby="search_sup_info"
                      >
                        <thead>
                          <tr role="row">
                            <th
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "280.2px" }}
                            >
                              &nbsp;Supplier Name
                            </th>
                            <th
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "200.2px" }}
                            >
                              &nbsp;Code
                            </th>
                            <th
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "197.2px" }}
                            >
                              &nbsp;Contact Person
                            </th>
                            <th
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "90.2px" }}
                            >
                              &nbsp;Address
                            </th>
                            <th
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "119.2px" }}
                            >
                              &nbsp;Phone
                            </th>
                            <th
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "358.2px" }}
                            >
                              &nbsp;Email
                            </th>
                            <th
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "160px" }}
                            >
                              &nbsp;Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr className="phps_row_1 odd" role="row">
                            <td>&nbsp;Agoda</td>
                            <td>&nbsp;agoda</td>
                            <td>&nbsp;Samiksha&nbsp;&nbsp;Qtech</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;4343434343</td>
                            <td>&nbsp;samiksha@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSEDIT
                                    }
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSVIEW
                                    }
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=20"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=20');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>&nbsp;Amadeus Flight</td>
                            <td>&nbsp;amadeus</td>
                            <td>&nbsp;Rohan&nbsp;&nbsp;Qtech</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;9898989898</td>
                            <td>&nbsp;rohan.vartak@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSEDIT
                                    }
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSVIEW
                                    }
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=26"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=26');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>&nbsp;Contracted Flight</td>
                            <td>&nbsp;localflight</td>
                            <td>&nbsp;Contracted&nbsp;&nbsp;Flight</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;2233445566</td>
                            <td>&nbsp;nida.ansari@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSEDIT
                                    }
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSVIEW
                                    }
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=22"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=22');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>&nbsp;Contracted Hotels</td>
                            <td>&nbsp;localsystem</td>
                            <td>&nbsp;Contracted&nbsp;&nbsp;Hotels</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;2233445566</td>
                            <td>&nbsp;nida.ansari@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSEDIT
                                    }
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSVIEW
                                    }
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=23"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=23');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>&nbsp;Contracted Sightseeing</td>
                            <td>&nbsp;localsightseeing</td>
                            <td>&nbsp;Asmita&nbsp;&nbsp;Qtech</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;9865327415</td>
                            <td>&nbsp;asmita.kapadi@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSEDIT
                                    }
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSVIEW
                                    }
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=11"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=11');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>&nbsp;Contracted Transfer</td>
                            <td>&nbsp;localtransfer</td>
                            <td>&nbsp;Asmita&nbsp;&nbsp;Qtech</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;9865327415</td>
                            <td>&nbsp;asmita.kapadi@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSEDIT
                                    }
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSVIEW
                                    }
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=10"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=10');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>&nbsp;Dhisco</td>
                            <td>&nbsp;dhisco_rotana</td>
                            <td>&nbsp;Samiksha&nbsp;&nbsp;Qtech</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;4343434343</td>
                            <td>&nbsp;samiksha@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSEDIT
                                    }
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSVIEW
                                    }
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=19"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=19');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>&nbsp;Dotw</td>
                            <td>&nbsp;dotw</td>
                            <td>&nbsp;Asmita&nbsp;&nbsp;Kapadi</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;9865327415</td>
                            <td>&nbsp;asmita.kapadi@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSEDIT
                                    }
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSVIEW
                                    }
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=1"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=1');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>&nbsp;EgyptExpress</td>
                            <td>&nbsp;egyptexpress</td>
                            <td>&nbsp;Asmita&nbsp;&nbsp;Qtech</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;9865327415</td>
                            <td>&nbsp;asmita.kapadi@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSEDIT
                                    }
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSVIEW
                                    }
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=show&id=8"
                                    data-original-title="Click To Activate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-times-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=8');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>&nbsp;Expedia</td>
                            <td>&nbsp;expedia</td>
                            <td>&nbsp;Asmita&nbsp;&nbsp;Qtech</td>
                            <td>&nbsp;asdsa</td>
                            <td>&nbsp;9865327415</td>
                            <td>&nbsp;asmita.kapadi@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSEDIT
                                    }
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <Link
                                    to={
                                      Constants.URLConstants
                                        .MASTERSSUPPLIERSONLINESUPPLIERSVIEW
                                    }
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </Link>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=12"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=12');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>&nbsp;Expediapackage</td>
                            <td>&nbsp;expediapackage</td>
                            <td>&nbsp;Asmita&nbsp;&nbsp;Qtech</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;9865327415</td>
                            <td>&nbsp;asmita.kapadi@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersEdit.html"
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersView.html"
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=13"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=13');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>&nbsp;Groups</td>
                            <td>&nbsp;group</td>
                            <td>&nbsp;Qtech&nbsp;&nbsp;Qtech</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;0123456789</td>
                            <td>&nbsp;neeraj@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersEdit.html"
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersView.html"
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=14"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=14');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>&nbsp;Hotelbeds</td>
                            <td>&nbsp;hotelbeds</td>
                            <td>&nbsp;Asmita&nbsp;&nbsp;Kapadi</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;9865327415</td>
                            <td>&nbsp;asmita.kapadi@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersEdit.html"
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersView.html"
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=3"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=3');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>&nbsp;Hotelbeds Sightseeing (TEST)</td>
                            <td>&nbsp;hbsight</td>
                            <td>&nbsp;Samiksha&nbsp;&nbsp;Qtech</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;4343434343</td>
                            <td>&nbsp;samiksha@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersEdit.html"
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersView.html"
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=17"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=17');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>&nbsp;Hotelbeds Transfer</td>
                            <td>&nbsp;hotelbedstransfer</td>
                            <td>&nbsp;Nida&nbsp;&nbsp;Ansari</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;1122334455</td>
                            <td>&nbsp;nida.ansari@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersEdit.html"
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersView.html"
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=29"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=29');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>&nbsp;Miki</td>
                            <td>&nbsp;miki</td>
                            <td>&nbsp;Asmita&nbsp;&nbsp;Qtech</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;9865327415</td>
                            <td>&nbsp;asmita.kapadi@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersEdit.html"
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersView.html"
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=6"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=6');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>&nbsp;Minal_Qtech_Test</td>
                            <td>&nbsp;Package Supplier</td>
                            <td>&nbsp;Minal&nbsp;&nbsp;Test</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;1234567890</td>
                            <td>&nbsp;minal.avhad@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersEdit.html"
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersView.html"
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=24"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=24');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>&nbsp;Misc</td>
                            <td>&nbsp;misc</td>
                            <td>&nbsp;Qtech&nbsp;&nbsp;Qtech</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;0123456789</td>
                            <td>&nbsp;neeraj@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersEdit.html"
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersView.html"
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=15"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=15');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>&nbsp;Mystifly</td>
                            <td>&nbsp;mystifly</td>
                            <td>&nbsp;Rohan&nbsp;&nbsp;Vartak</td>
                            <td>&nbsp;Mumbai</td>
                            <td>&nbsp;9898989898</td>
                            <td>&nbsp;rohan.vartak@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersEdit.html"
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersView.html"
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=31"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=31');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>&nbsp;Priceline Mor</td>
                            <td>&nbsp;pricelinemor</td>
                            <td>&nbsp;Samiksha&nbsp;&nbsp;Qtech</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;5756756756</td>
                            <td>&nbsp;samiksha@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersEdit.html"
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersView.html"
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=show&id=21"
                                    data-original-title="Click To Activate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-times-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=21');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>&nbsp;Redapple Travel</td>
                            <td>&nbsp;redapple</td>
                            <td>&nbsp;Samiksha&nbsp;&nbsp;Qtech</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;4343434343</td>
                            <td>&nbsp;samiksha@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersEdit.html"
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersView.html"
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=18"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=18');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>&nbsp;Restel</td>
                            <td>&nbsp;restel</td>
                            <td>&nbsp;Asmita&nbsp;&nbsp;Kapadi</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;9865327415</td>
                            <td>&nbsp;asmita.kapadi@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersEdit.html"
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersView.html"
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=2"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=2');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>&nbsp;Sabre Flight</td>
                            <td>&nbsp;sabre</td>
                            <td>&nbsp;Sabre&nbsp;&nbsp;Flights</td>
                            <td>&nbsp;Mumbai</td>
                            <td>&nbsp;9898989898</td>
                            <td>&nbsp;rohan.vartak@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersEdit.html"
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersView.html"
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=27"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=27');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>&nbsp;Snehal Testing</td>
                            <td>&nbsp;Snehal</td>
                            <td>&nbsp;Snehal&nbsp;&nbsp;Valanju</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;7004512854</td>
                            <td>&nbsp;snehal.valanju@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersEdit.html"
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersView.html"
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=25"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=25');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>&nbsp;Tboholidays</td>
                            <td>&nbsp;tboholidays</td>
                            <td>&nbsp;Samiksha&nbsp;&nbsp;Qtech</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;1234567897</td>
                            <td>&nbsp;samiksha@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersEdit.html"
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersView.html"
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=30"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=30');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>&nbsp;Travco</td>
                            <td>&nbsp;travco</td>
                            <td>&nbsp;Asmita&nbsp;&nbsp;Qtech</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;9865327415</td>
                            <td>&nbsp;asmita.kapadi@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersEdit.html"
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersView.html"
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=7"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=7');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_1 odd" role="row">
                            <td>&nbsp;Visa</td>
                            <td>&nbsp;visa</td>
                            <td>&nbsp;Neeraj&nbsp;&nbsp;Yadav</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;0123456789</td>
                            <td>&nbsp;neeraj@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersEdit.html"
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersView.html"
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=4"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=4');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-trash" />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="phps_row_0 even" role="row">
                            <td>&nbsp;Whitesands</td>
                            <td>&nbsp;whitesands</td>
                            <td>&nbsp;Asmita&nbsp;&nbsp;Qtech</td>
                            <td>&nbsp;None</td>
                            <td>&nbsp;9865327415</td>
                            <td>&nbsp;asmita.kapadi@qtechsoftware.com</td>
                            <td className="actionlink">
                              <div className="actionCont">
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersEdit.html"
                                    alt="Edit"
                                    data-original-title="Edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-pencil-square-o" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="MastersSuppliersOnlineSuppliersView.html"
                                    alt="View"
                                    data-original-title="View"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-eye" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="edit_supplier.php?action=hide&id=5"
                                    data-original-title="Click To Deactivate"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                  >
                                    <i className="fa fa-check-circle" />
                                  </a>
                                </div>
                                <div className="input-group-addon">
                                  <a
                                    href="Javascript confirm_delete('delete_supplier.php?action=delete&id=5');"
                                    alt="Delete"
                                    data-original-title="Delete"
                                    data-toggle="tooltip"
                                    data-placement="top"
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
                <div className="row">
                  <div className="col-sm-6">
                    <div
                      className="dataTables_info"
                      id="search_sup_info"
                      role="status"
                      aria-live="polite"
                    />
                  </div>
                  <div className="col-sm-6" />
                </div>
              </div>
              <div className="form-group no-result">
                <h5 className="text-center">
                  No suppliers found in the system.
                </h5>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default MastersSuppliersOnlineSuppliersSearch;
