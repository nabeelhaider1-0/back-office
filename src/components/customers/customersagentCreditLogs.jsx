import React, { useEffect, useState } from "react";
import Constants from "../../constants/routes";
import Header2 from "../header2/header2";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const CustomersAgentCreditLog = ({ data }) => {
  const [agentsCreditLogsData, setAgentsCreditLogsData] = useState([]);
  const [originalAgentsCreditLogsData, setOriginalAgentsCreditLogsData] =
    useState([]);
  const navigateOnRefresh = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const creditLogs =
        Array.isArray(data?.creditLogs) && data.creditLogs.length > 0
          ? data.creditLogs.reverse()
          : [];

      setAgentsCreditLogsData(creditLogs);
      setOriginalAgentsCreditLogsData(creditLogs);
    } else {
      navigateOnRefresh(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
    }
  }, [data, navigateOnRefresh]);
  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filtereData = originalAgentsCreditLogsData.filter((data) =>
      data.note.toLowerCase().includes(value.toLowerCase())
    );

    setAgentsCreditLogsData(filtereData);
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="CREDIT LOG"
          linkText1=" Search Agent"
          linkText2=" Credit Log"
          link1={Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON}
        />

        {/* First Row*/}
        <div
          className="panel-body"
          style={{
            backgroundColor: "#FF5015",
            paddingBottom: "1px",
            paddingTop: "4px",
          }}
        >
          <div className="row">
            <div className="col-md-12">
              <h5
                style={{ color: "white", fontSize: "15px", marginLeft: "20px" }}
              >
                {data.agencyName && data.agentName && data.status !== undefined
                  ? `${data.agencyName} / ${data.agentName} / ${
                      data.status ? "Active" : "In Active"
                    }`
                  : ""}
              </h5>
            </div>
          </div>
        </div>
        <form>
          <div className="panel-body removeMargins">
            <div className="dataTables_scroll form-group">
              <div
                id="search_transfer_wrapper"
                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
              >
                <div className="row mt-2">
                  <div className="col-sm-10"></div>
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
                            data-placement="top"
                            data-original-title="Search within this table"
                            aria-hidden="true"
                          />
                        </h5>
                        <input
                          type="text"
                          className="tablesearch form-control form-control-sm search_new"
                          placeholder="Note"
                          value={searchInput}
                          onChange={handleInputSearchChange}
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
                        style={{ height: "20px", width: "1320px" }}
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
                              style={{ textAlign: "center", width: "83.2px" }}
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                            >
                              Credit Limit
                            </th>
                            <th
                              style={{ textAlign: "center", width: "89.2px" }}
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                            >
                              Credit Value
                            </th>
                            <th
                              style={{ textAlign: "center", width: "56.2px" }}
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                            >
                              Amount
                            </th>
                            <th
                              style={{ textAlign: "center", width: "161.2px" }}
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                            >
                              Calculate Credit Value
                            </th>
                            <th
                              style={{ textAlign: "center", width: "99.2px" }}
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                            >
                              Credit Usages
                            </th>
                            <th
                              style={{ textAlign: "center", width: "74.2px" }}
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                            >
                              Booking ID
                            </th>
                            <th
                              style={{ textAlign: "center", width: "193.2px" }}
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                            >
                              Log Type
                            </th>
                            <th
                              style={{ textAlign: "center", width: "153.2px" }}
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                            >
                              Temp Credit Available{" "}
                            </th>
                            <th
                              style={{ textAlign: "center", width: "166.2px" }}
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                            >
                              Temp Credit Expiry Date
                            </th>
                            <th
                              style={{ textAlign: "center", width: "193.2px" }}
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                            >
                              Note
                            </th>
                            <th
                              style={{ textAlign: "center", width: "84px" }}
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                            >
                              Create Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {agentsCreditLogsData.map((agnt, index) => (
                            <tr
                              key={agnt.uuid}
                              className={
                                "phps_row_" +
                                (index % 2 === 0 ? "0 even" : "1 odd")
                              }
                              role="row"
                            >
                              <td align="center">{agnt.creditlimit}</td>
                              <td align="center">{agnt.creditvalue}</td>
                              <td align="center">{agnt.amount}</td>
                              <td align="center">
                                {agnt.calculatecreditvalue}
                              </td>
                              <td align="center">{agnt.creditusages}</td>
                              <td align="center">{agnt.bookingid}</td>
                              <td align="center">{agnt.logtype}</td>
                              <td align="center">{agnt.tempcreditavailable}</td>
                              <td align="center">{agnt.tempexpirydate}</td>
                              <td align="center">{agnt.note}</td>
                              <td align="center">
                                <div className="dateWrapper withTime">
                                  <div className="onlyDate">
                                    {new Date(
                                      agnt.timestamps.createdAt
                                    ).getDate()}
                                  </div>
                                  <div className="monthYear">
                                    {new Date(
                                      agnt.timestamps.createdAt
                                    ).toLocaleString("default", {
                                      month: "short",
                                    })}
                                    <br />
                                    {new Date(
                                      agnt.timestamps.createdAt
                                    ).getFullYear()}
                                  </div>
                                </div>
                                <div className="secCont">
                                  {new Date(
                                    agnt.timestamps.createdAt
                                  ).toLocaleTimeString()}
                                </div>
                              </td>
                            </tr>
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
        {/* End */}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(CustomersAgentCreditLog);
