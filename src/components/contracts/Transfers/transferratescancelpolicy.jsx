/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import MultiSelect from "../../reactMultiSelect";
import React, { useEffect, useState } from "react";
import { delDATA, getDATA } from "../../../Apis/API";
import {
  ErrorApiAlert,
  deleteConfirmation,
} from "../../../constants/globalfunctions";
import loadingGif from "../../../assets/images/loadingblue.gif";
import Constants from "../../../constants/routes";
import { connect } from "react-redux";
import ApiRoutes from "../../../constants/ApiRoutes";

const ContractsTransfersRatesCanecelPolicy = ({ data }) => {
  // const [isVisible, setIsVisible] = useState(false);
  const [cancellationpolicyData, setCancellationPolicyData] = useState([]);
  const [originalcancellationpolicyData, setOriginalCancellationPolicyData] =
    useState([]);
  const [transfersOptions, setTransfersOptionsData] = useState([]);
  const [selectedTransfers, setSelectedTransfers] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleToggle = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };

  const navigateOnRefresh = useNavigate();
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const { transfers, currentTransfer } = data;

      // Filter transfers where the transferName matches currentTransfer
      const filteredTransfers = transfers.filter(
        (trans) => trans.transferName === currentTransfer
      );

      // Create options from the filtered transfers
      const options = filteredTransfers.map((trans) => ({
        value: trans.uuid,
        label: trans.transferName,
      }));

      // Ensure the options are unique
      const uniqueOptionsMap = new Map();
      options.forEach((option) => {
        if (!uniqueOptionsMap.has(option.value)) {
          uniqueOptionsMap.set(option.value, option.label);
        }
      });

      const uniqueOptions = Array.from(uniqueOptionsMap, ([value, label]) => ({
        value,
        label,
      }));

      // Set the unique options to the state
      filterData(uniqueOptions);
      setSelectedTransfers(uniqueOptions);
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

  const getAllCancellationPolicy = async () => {
    try {
      setLoading(true);
      // Set loading to true when fetching data
      const response = await getDATA(
        ApiRoutes.TRANSFERS.TRANSFER_TARIFF_CANCELLATION_POLICY
      );
      if (response.data.statusCode === 200) {
        const cancellationpolicy = response.data.data || [];
        setCancellationPolicyData(cancellationpolicy);
        setOriginalCancellationPolicyData(cancellationpolicy);

        const transfers = cancellationpolicy.flatMap((item) =>
          item.transfers.map((transfer) => ({
            value: transfer.uuid,
            label: transfer.transferName,
          }))
        );

        const uniqueTransfersMap = new Map();
        transfers.forEach((transfer) => {
          if (!uniqueTransfersMap.has(transfer.value)) {
            uniqueTransfersMap.set(transfer.value, transfer.label);
          }
        });

        const uniqueTransfers = Array.from(
          uniqueTransfersMap,
          ([value, label]) => ({ value, label })
        );

        setTransfersOptionsData(uniqueTransfers);
      }
    } catch (error) {
      ErrorApiAlert("Error Fetching Cancellation Policy");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCancellationPolicy();
  }, []);
  const handleDeleteClick = async (uuid) => {
    try {
      const isDeleted = await deleteConfirmation(
        "Are You Sure You Want To Delete This Cancellation Policy?",
        "warning",
        "OK",
        "Cancel",
        uuid,
        delDATA, // Pass delDATA function as an argument
        "Cancellation Policy has been deleted successfully.",
        ApiRoutes.TRANSFERS.TRANSFER_TARIFF_CANCELLATION_POLICY
      );

      if (isDeleted) {
        setOriginalCancellationPolicyData((policy) =>
          policy.filter((pol) => pol.uuid !== uuid)
        );

        setCancellationPolicyData((policy) =>
          policy.filter((pol) => pol.uuid !== uuid)
        );
      } else {
      }
    } catch (error) {
      // console.error("Error occurred:", error);
    }
  };
  useEffect(() => {
    // Apply the filter when cancellationPolicyData or selectedTransfers change
    if (cancellationpolicyData.length > 0 && selectedTransfers.length > 0) {
      filterData(selectedTransfers);
    }
  }, [cancellationpolicyData, selectedTransfers]);

  const handleTransferChange = (selectedOptions) => {
    setSelectedTransfers(selectedOptions);
    filterData(selectedOptions);
  };

  const filterData = (selectedOptions) => {
    const selectedUUIDs = selectedOptions.map((option) => option.value);

    const filtered = originalcancellationpolicyData.filter((policy) =>
      policy.transfers.some((transfer) => selectedUUIDs.includes(transfer.uuid))
    );

    setCancellationPolicyData(filtered);
  };
  const resetForm = (event) => {
    event.preventDefault();
    setSelectedTransfers([]);
    setCancellationPolicyData(originalcancellationpolicyData);
  };

  return (
    <>
      <div data-child="row" data-effect="fadeInUp">
        <div className="row px-3">
          <div className="col-lg-12">
            <div className="hpanel">
              <div
                className="panel-body sectHeader mt-4"
                style={{
                  backgroundColor: "#FF5015",
                  paddingBottom: "1px",
                  paddingTop: "8px",
                }}
              >
                <div className="row">
                  <div className="col-md-3">
                    <h5
                      style={{
                        color: "white",
                        fontSize: "15px",
                        marginLeft: "20px",
                        marginTop: "2px",
                      }}
                    >
                      View Cancellation Policy
                    </h5>
                  </div>
                </div>
              </div>
              <input
                type="hidden"
                id="transfer_id"
                name="transfer_id"
                defaultValue={95}
              />
              <div className="panel-body">
                <div>
                  <div className="row mx-2 mt-2">
                    <input
                      id="sel_supplier_view"
                      name="sel_supplier_view"
                      type="hidden"
                      defaultValue="S000000003"
                    />
                    <div className="form-group col-md-3">
                      <label>Select Transfer</label>
                      <MultiSelect
                        options={transfersOptions}
                        isSearchable
                        isMulti
                        value={selectedTransfers}
                        placeholder="- Select Transfer -"
                        className="custom-select"
                        noOptionsMessage={() => "No Transfer Found"}
                        onChange={handleTransferChange}
                      />
                    </div>
                    <div className="col-md-2 form-group mt-4">
                      <button
                        className="btn btn-dark btn-sm"
                        type="reset"
                        onClick={resetForm}
                      >
                        <i className="fa fa-repeat" /> &nbsp;Reset
                      </button>
                    </div>
                  </div>

                  <div className="form-group col-md-12">
                    {/* <div id='loading_img' style='position: absolute; display: none; padding:60px 0px 0px 490px'><center><img src='images/indicator.gif' alt=""></center></div> */}
                  </div>
                </div>
              </div>
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
                      <table className="table dataTable   table-responsive">
                        <thead>
                          <tr>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {cancellationpolicyData.map((item, index) => (
                            <React.Fragment key={item.uuid}>
                              <tr>
                                <td>
                                  <div className="dateWrapper">
                                    <div className="onlyDate">
                                      {new Date(item.from).getDate()}
                                    </div>
                                    <div className="monthYear">
                                      {new Date(item.from).toLocaleString(
                                        "default",
                                        { month: "short" }
                                      )}
                                      <br />
                                      {new Date(item.from).getFullYear()}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="dateWrapper">
                                    <div className="onlyDate">
                                      {new Date(item.to).getDate()}
                                    </div>
                                    <div className="monthYear">
                                      {new Date(item.to).toLocaleString(
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
                                      data-original-title="View"
                                    >
                                      <Link
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleToggle(index)}
                                      >
                                        <i className="fa fa-eye"></i>
                                      </Link>
                                    </div>
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
                              {visibleIndex === index && (
                                <tr>
                                  <td
                                    colSpan="3"
                                    align="center"
                                    style={{ padding: "0px" }}
                                  >
                                    <table
                                      align="center"
                                      className="table dataTable  table-bordered  table-responsive"
                                    >
                                      <thead>
                                        <tr className="bg-grey">
                                          <td align="center">From Duration</td>
                                          <td align="center">To Duration</td>
                                          <td align="center">Duration Type</td>
                                          <td align="center">Amount Value</td>
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white">
                                        {item.policyratesData.map(
                                          (rate, idx) => (
                                            <tr key={idx}>
                                              <td align="center">
                                                {rate.fromDuration}
                                              </td>
                                              <td align="center">
                                                {rate.toDuration}
                                              </td>
                                              <td align="center">
                                                {item.durationin}
                                              </td>
                                              <td align="center">
                                                {rate.value}
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(ContractsTransfersRatesCanecelPolicy);
