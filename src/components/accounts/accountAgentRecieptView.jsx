import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";

const AccountsAgentRecieptView = () => {
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="RECEIPTS" />

        <div>
          {/* First Row*/}
          <form>
            <div className="panel-body">
              <div className="row mb-3">
                <div className="form-group col-md-12 col-xs-12">
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    value="Print"
                    onClick={() => window.print()}
                  >
                    <i className="fa fa-print" />
                    &nbsp;Print
                  </button>
                  &nbsp;&nbsp;
                  <Link
                    to={Constants.URLConstants.ACCOUNTSAGENTRECIEPTSEARCH}
                    style={{ textDecoration: "none" }}
                  >
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      value="Back"
                    >
                      <i className="fa fa-reply" />
                      &nbsp;Back
                    </button>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Agent</label>
                  <div>Sqtech-(CD0291) - (Sujay Test)</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Receipt No.</label>
                  <div>Rcpt00000602</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Date of Receipt</label>
                  <div>Jun 22, 2023</div>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="exampleInputEmail1">Particulars</label>
                  <div>Booking done from TAPPAY payment gateway.</div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-group col-md-3">
                  <label>Amount Received</label>
                  <div>SAR&nbsp;114.321</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Mode of Payment</label>
                  <div>ELECTRONIC FUND TRANSFER(EFT) </div>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="exampleInputEmail1">Bank Details</label>
                  <div>Bank Name: TAPPAY </div>
                </div>
              </div>
            </div>
          </form>
          <br />
          <form>
            <div className="panel-body removeMargins">
              <div className="dataTables_scroll">
                <div
                  id="search_sup_wrapper"
                  className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                >
                  <div className="row">
                    <div className="col-sm-10" />
                    <div className="col-sm-2">
                      <div id="search_sup_filter" className="dataTables_filter">
                        <label>
                          <h5 style={{ display: "inline" }}>
                            <i
                              className="fa fa-search"
                              data-bs-toggle="tooltip"
                              data-placement="top"
                              style={{ position: "absolute", marginTop: "6px" }}
                              aria-hidden="true"
                              aria-label="Search within this table"
                              data-bs-original-title="Search within this table"
                            />
                            <span className="sr-only">
                              Search within this table
                            </span>
                          </h5>
                          <input
                            type="search"
                            className="form-control form-control-sm input-sm"
                            placeholder
                            aria-controls="search_sup"
                            style={{ marginLeft: "26px" }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div
                        className="doubleScroll-scroll-wrapper"
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
                      <div id="scrollCont" style={{ overflow: "auto" }}>
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
                                style={{ width: "237.2px" }}
                              >
                                Booking Id
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "247.2px" }}
                              >
                                Invoice No
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "316.2px" }}
                              >
                                Booking Amount
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "266.2px" }}
                              >
                                Payment Date
                              </th>
                              <th
                                className="sorting_disabled"
                                rowSpan={1}
                                colSpan={1}
                                style={{ width: "350px" }}
                              >
                                Amount Allocated
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr className="phps_row_0 odd" role="row">
                              <td>&nbsp;TD1129349</td>
                              <td>&nbsp;2023/12599</td>
                              <td align="right"> SAR&nbsp;114.321</td>
                              <td>
                                <div className="dateWrapper">
                                  <div className="onlyDate">22</div>
                                  <div className="monthYear">
                                    Jun
                                    <br />
                                    2023
                                  </div>
                                </div>
                              </td>
                              <td align="right">SAR&nbsp;114.32&nbsp;</td>
                            </tr>
                            <tr
                              className="phps_header bg-grey even"
                              height={22}
                              role="row"
                            >
                              <td align="right">&nbsp;</td>
                              <td align="right">&nbsp;</td>
                              <td align="right">&nbsp;</td>
                              <td align="right">
                                &nbsp;<b>Total</b>&nbsp;&nbsp;
                              </td>
                              <td align="right">SAR&nbsp;114.32&nbsp;</td>
                              {/*<td align=right>&nbsp;</td>*/}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n            .bg-grey {\n                background-color: #A09D9D !important;\n                color: #fff !important;\n            }\n\n            .bg-grey td {\n\n                color: #fff !important;\n            }\n        ",
            }}
          />
        </div>
      </div>
    </>
  );
};
export default AccountsAgentRecieptView;
