/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";

import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import React, { useEffect, useState } from "react";
import Constants from "../../../constants/routes";
import { Link, useNavigate } from "react-router-dom";
import loadingGif from "../../../assets/images/loadingblue.gif";
import {
  ErrorApiAlert,
  deleteConfirmation,
} from "../../../constants/globalfunctions";
import { delDATA, getDATA } from "../../../Apis/API";
import ApiRoutes from "../../../constants/ApiRoutes";

const ContractsTransfersRatesViewStopSale = ({ data }) => {
  const [transferOptions, setTransferOptions] = useState([]);
  const [selectedTransfers, setSelectedTransfers] = useState();
  const [loading, setLoading] = useState(true);
  const [stopsaleData, setStopSaleData] = useState([]);
  const [originalstopsaleData, setOriginalStopSaleData] = useState([]);
  const getAllCancellationPolicy = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getDATA(
        ApiRoutes.TRANSFERS.TRANSFER_TARIFF_STOP_SALE
      );
      if (response.data.statusCode === 200) {
        const stopsale = response.data.data || [];

        setStopSaleData(stopsale);
        setOriginalStopSaleData(stopsale);
      }
    } catch (error) {
      ErrorApiAlert("Error Fetching Stop Sale");
    } finally {
      setLoading(false);
    }
  };

  const navigateOnRefresh = useNavigate();
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const options = data.transfers.map((trans) => ({
        value: trans.uuid,
        label: trans.transferName,
      }));

      setTransferOptions(options);
      const currentTransfer = data.currentTransfer;

      const matchingTransfer = data.transfers.find(
        (transfer) => transfer.transferName === currentTransfer
      );

      if (matchingTransfer) {
        const result = {
          label: matchingTransfer.transferName,
          value: matchingTransfer.uuid,
        };
        setSelectedTransfers(result);
      } else {
      }
    } else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(
        Constants.URLConstants.CONTRACTSTRANSFERSRATESSEARCHBUTTON
      );
    }
  }, [data, navigateOnRefresh]);
  const redirect = async () => {
    navigateOnRefresh(
      Constants.URLConstants.CONTRACTSTRANSFERSRATESSEARCHBUTTON
    );
  };

  // Perform checks and redirect in useEffect
  useEffect(() => {
    if (
      !data ||
      data.supplierName === undefined ||
      data.supplierName === null
    ) {
      redirect();
    }
    if (
      !data ||
      data.currentTransfer === undefined ||
      data.currentTransfer === null
    ) {
      redirect();
    }
  }, [data]);
  useEffect(() => {
    // Apply the filter when cancellationPolicyData or selectedTransfers change
    if (stopsaleData.length > 0 && selectedTransfers.length > 0) {
      filterData(selectedTransfers);
    }
  }, [stopsaleData, selectedTransfers]);
  const filterData = (selectedOptions) => {
    const selectedUUID = selectedOptions.value;

    const filteredData = originalstopsaleData.filter(
      (policy) => policy.transfer.uuid === selectedUUID
    );

    setStopSaleData(filteredData);
  };
  const handleTransferChange = (selectedOptions) => {
    setSelectedTransfers(selectedOptions);
    filterData(selectedOptions);
  };

  useEffect(() => {
    getAllCancellationPolicy();
  }, []);
  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Stop Sale?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Stop Sale has been deleted successfully.",
        ApiRoutes.TRANSFERS.TRANSFER_TARIFF_STOP_SALE
      );

      if (isDeleted) {
        setStopSaleData((policy) => policy.filter((pol) => pol.uuid !== uuid));
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };
  return (
    <>
      <Header2 title="VIEW STOP SALE" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-3 form-group">
                  <label>Supplier</label>
                  <p style={{ fontSize: "14px !important" }}>
                    {data &&
                    data.supplierName !== undefined &&
                    data.supplierName !== null
                      ? data.supplierName
                      : "Supplier Name is undefined"}
                    <input
                      id="sel_supplier_stop_sale"
                      name="sel_supplier_stop_sale"
                      type="hidden"
                      defaultValue="S000000003"
                      className="form-control form-control-sm"
                    />
                  </p>
                </div>
                <div className="col-md-3 form-group">
                  <label>Select Transfer</label>
                  {/* code added by rakesh for CC option */}
                  <MultiSelect
                    options={transferOptions}
                    isSearchable
                    value={selectedTransfers}
                    placeholder="- Select Transfer -"
                    className="custom-select"
                    noOptionsMessage={() => "No Transfer Found"}
                    required
                    onChange={handleTransferChange}
                  />
                </div>
              </div>
            </div>
          </form>
          <form className="mt-2" style={{ paddingBottom: "1px" }}>
            {loading && (
              <div className="text-center">
                <img src={loadingGif} alt="Loading..." height={250} />
              </div>
            )}
            {!loading && (
              <>
                <div id="dataPolicyDisplay" className="mt-4">
                  <div id="mesID" style={{ display: "none" }}></div>
                  <div className="panel-body removeMargins">
                    <input type="hidden" name="id" id="id" value="962" />
                    {/*  */}
                    {stopsaleData.length > 0 ? (
                      <table className="table dataTable   table-responsive">
                        <thead>
                          <tr>
                            <th>Supplier</th>
                            <th>Transfer</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {stopsaleData.map((item) => (
                            <React.Fragment key={item.uuid}>
                              <tr>
                                <td>{item.supplier.supplierName}</td>
                                <td>{item.transfer.transferName}</td>
                                <td>
                                  <div className="dateWrapper">
                                    <div className="onlyDate">
                                      {new Date(item.transferFrom).getDate()}
                                    </div>
                                    <div className="monthYear">
                                      {new Date(
                                        item.transferFrom
                                      ).toLocaleString("default", {
                                        month: "short",
                                      })}
                                      <br />
                                      {new Date(item.from).getFullYear()}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="dateWrapper">
                                    <div className="onlyDate">
                                      {new Date(item.transferTo).getDate()}
                                    </div>
                                    <div className="monthYear">
                                      {new Date(item.transferTo).toLocaleString(
                                        "default",
                                        { month: "short" }
                                      )}
                                      <br />
                                      {new Date(item.to).getFullYear()}
                                    </div>
                                  </div>
                                </td>
                                <td className="actionlink">
                                  <div className="actionCont">
                                    <div
                                      className="input-group-addon"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Delete"
                                    >
                                      <Link
                                        href="#"
                                        onClick={() =>
                                          handleDeleteClick(item.uuid)
                                        }
                                      >
                                        <i className="fa fa-trash"></i>
                                      </Link>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                          marginTop: "20px",
                          marginBottom: "20px",
                          padding: "10px",
                          border: "1px solid #d6b5b5",
                          borderRadius: "4px",
                          backgroundColor: "#F2DEDE",
                          color: "#a94442",
                          fontSize: "18px",
                          fontWeight: "bold",
                          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        }}
                      >
                        No Data Found
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(ContractsTransfersRatesViewStopSale);
