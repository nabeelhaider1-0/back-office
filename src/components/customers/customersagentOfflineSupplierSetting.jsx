/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import loadingGif from "../../assets/images/loadingblue.gif";
import { getDATA, postDATA } from "../../Apis/API";
import {
  ErrorApiAlert,
  RequiredFieldAlert,
  SuccessApiToast,
} from "../../constants/globalfunctions";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../../constants/ApiRoutes";

const CustomersAgentOfflineSupplierSetting = () => {
  const [supplierData, setSupplierData] = useState([]);
  const [originalSupplierData, setOriginalSupplierData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [changedRecords, setChangedRecords] = useState({});
  // const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const getOfflineSuppliers = async () => {
    try {
      setLoading(true);
      const response = await getDATA(ApiRoutes.SUPPLIER.OFFLINE.SUPPLIER);
      if (response.data.statusCode === 200) {
        const offlinesuppliers =
          response && response.data.data ? response.data.data : [];
        setSupplierData(offlinesuppliers);
        setOriginalSupplierData(offlinesuppliers);
      }
    } catch (error) {
      ErrorApiAlert("Error Fetching Offline Suppliers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOfflineSuppliers();
  }, []);

  // useEffect(() => {
  //   const updatedData = supplierData.map((supplier) => ({
  //     ...supplier,
  //     localexcludeorinclude: !selectAll
  //   }));
  //   setSupplierData(updatedData);
  // }, [selectAll]);

  // const handleSelectAllChange = () => {
  //   setSelectAll(!selectAll);
  // };

  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    const filteredData = originalSupplierData.filter((sp) =>
      sp.supplierName.toLowerCase().includes(value.toLowerCase())
    );

    setSupplierData(filteredData);
  };

  const handleCheckboxChange = (event, supplier) => {
    const { checked } = event.target;
    const newStatus = !checked;

    setSupplierData((prevState) =>
      prevState.map((item) =>
        item.uuid === supplier.uuid
          ? { ...item, localexcludeorinclude: newStatus }
          : item
      )
    );

    setChangedRecords((prevState) => ({
      ...prevState,
      [supplier.uuid]: {
        ...supplier,
        localexcludeorinclude: newStatus,
      },
    }));
  };

  const handleMarkupChange = (event, supplier) => {
    const { value } = event.target;
    const parsedValue = parseFloat(value);

    setSupplierData((prevState) =>
      prevState.map((item) =>
        item.uuid === supplier.uuid ? { ...item, markup: parsedValue } : item
      )
    );

    setChangedRecords((prevState) => ({
      ...prevState,
      [supplier.uuid]: {
        ...supplier,
        markup: parsedValue,
      },
    }));
  };

  const handleSave = async () => {
    const extractedData = Object.values(changedRecords).map((record) => ({
      uuid: record.uuid,
      markup: record.markup,
      localexcludeorinclude: record.localexcludeorinclude,
    }));
    if (extractedData.length === 0 || extractedData === undefined) {
      RequiredFieldAlert(
        "No Chnages Are Made",
        "Can not proceed empty operation",
        "error"
      );
      return;
    }

    try {
      const response = await postDATA(
        extractedData,
        ApiRoutes.SUPPLIERS.OFFLINE.MARKUP_INCLUDE_EXCLUDE
      );
      if (response.data.statusCode === 200) {
        SuccessApiToast("Settings Updated Successfully");

        navigate(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
      }
    } catch (error) {
      ErrorApiAlert("Error Updating Settings");
    }
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2
          title="OFFLINE SUPPLIER SETTINGS"
          linkText1="Search Agent"
          linkText2="Set Local supplier markup"
          link1={Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON}
        />
        <div>
          {loading && (
            <div className="text-center">
              <img src={loadingGif} alt="Loading..." height={250} />
            </div>
          )}
          {!loading && (
            <>
              <form>
                <div className="panel-body removeMargins">
                  <div className="dataTables_scroll form-group">
                    <div
                      id="search_transfer_wrapper"
                      className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                    >
                      <div className="row mt-2">
                        <div className="col-sm-10">
                          <button
                            className="btn btn-dark btn-sm leftTopBtn"
                            type="button"
                            value="Assign"
                            onClick={handleSave}
                          >
                            <i className="fa fa-floppy-o" />
                            &nbsp;Save
                          </button>
                        </div>
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
                                />
                              </h5>
                              <input
                                type="text"
                                className="tablesearch form-control form-control-sm search_new"
                                placeholder="Supplier"
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
                              id="search_transfer"
                              className="table table-bordered   table-responsive dataTable no-footer"
                              role="grid"
                              aria-describedby="search_transfer_info"
                            >
                              <thead>
                                <tr>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "906.2px" }}
                                  >
                                    Supplier
                                  </th>
                                  <th
                                    align="center"
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "324.2px" }}
                                  >
                                    Markup
                                  </th>
                                  <th
                                    className="sorting_disabled"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "224px" }}
                                  >
                                    <div className="checkbox checkbox-success">
                                      {/* <input
                                        id="all-supplier"
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAllChange}
                                      /> */}
                                      Exclude
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {supplierData.map((supplier, index) => (
                                  <tr
                                    role="row"
                                    className={
                                      "phps_row_" +
                                      (index % 2 === 0 ? "0 even" : "1 odd")
                                    }
                                    key={supplier.uuid}
                                  >
                                    <td>{supplier.supplierName}</td>
                                    <td>
                                      <div className="input-group col-md-5 form-group">
                                        <input
                                          type="number"
                                          className="form-control"
                                          size={5}
                                          value={supplier.markup}
                                          onChange={(event) =>
                                            handleMarkupChange(event, supplier)
                                          }
                                        />
                                        <span className="input-group-addon">
                                          %{" "}
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="checkbox checkbox-success">
                                        <input
                                          value={supplier.uuid}
                                          checked={
                                            !supplier.localexcludeorinclude
                                          }
                                          className="exclude-supplier"
                                          type="checkbox"
                                          onChange={(event) =>
                                            handleCheckboxChange(
                                              event,
                                              supplier
                                            )
                                          }
                                        />
                                        <label />
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      {/* <div className="row">
                        <div className="col-sm-5">
                          <div
                            className="dataTables_info"
                            id="search_transfer_info"
                            role="status"
                            aria-live="polite"
                          >
                            {`Showing ${supplierData.length} suppliers`}
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomersAgentOfflineSupplierSetting;
