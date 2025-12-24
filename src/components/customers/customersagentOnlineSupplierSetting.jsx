/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Constants from "../../constants/routes";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import { getDATA, postDATA } from "../../Apis/API";
import loadingGif from "../../assets/images/loadingblue.gif";
import {
  ErrorApiAlert,
  RequiredFieldAlert,
  SuccessApiToast,
} from "../../constants/globalfunctions";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../../constants/ApiRoutes";

const CustomersAgentOnlineSupplierSetting = () => {
  const [supplierData, setSupplierData] = useState([]);
  const [originalSupplierData, setOriginalSupplierData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markupProfileOptions, setMarkupProfileOptions] = useState([]);
  const [allChecked, setAllChecked] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getMarkUpProfiles();
  }, []);
  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    setAllChecked(isChecked);
    const updatedData = supplierData.map((supplier) => ({
      ...supplier,
      checked: isChecked,
    }));
    setSupplierData(updatedData);
  };

  const getOnlineSuppliers = async (profiles) => {
    try {
      setLoading(true);
      const response = await getDATA(ApiRoutes.SUPPLIERS.ONLINE.SUPPLIER);
      if (response.data.statusCode === 200) {
        const onlineSuppliers = response?.data?.data ?? [];

        const updatedData = onlineSuppliers.map((supplier) => ({
          ...supplier,
          checked: true, // Set default to checked
          markupprofile:
            supplier.markupprofile &&
            profiles.find(
              (option) => option.value === supplier.markupprofile.uuid
            ),
        }));
        setSupplierData(updatedData);
        setOriginalSupplierData(updatedData);
      }
    } catch (error) {
      ErrorApiAlert("Error Fetching Online Suppliers");
    } finally {
      setLoading(false);
    }
  };

  const getMarkUpProfiles = async () => {
    try {
      setLoading(true);
      const response = await getDATA(ApiRoutes.MARKUP_PROFILE.PROFILE);
      if (response.data.statusCode === 200) {
        const profiles = response?.data?.data ?? [];

        const filteredProfiles = profiles.filter(
          (prof) => prof.activeStatus === "true" || prof.activeStatus === true
        );

        const options = filteredProfiles.map((prof) => ({
          value: prof.uuid,
          label: prof.profileName,
        }));
        getOnlineSuppliers(options);

        setMarkupProfileOptions(options);
      }
    } catch (error) {
      ErrorApiAlert("Error Fetching Mark-Up Profiles");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (index, field, value) => {
    const newSupplierData = [...supplierData];
    newSupplierData[index][field] = value;
    setSupplierData(newSupplierData);
  };

  const handleSave = async () => {
    const checkedRows = supplierData.filter(
      (supplier) => supplier.checked === true
    );
    const result = checkedRows.map((supplier) => ({
      uuid: supplier.uuid,
      leadTimeHrs: supplier.leadTimeHrs,
      markupProfileUuid: supplier.markupprofile?.value ?? null,
    }));

    if (result.length === 0 || result === undefined) {
      RequiredFieldAlert(
        "No markups Are Updated ",
        "Can not Update Empty Markup Data",
        "error"
      );
      return false;
    }
    try {
      const response = await postDATA(
        result,
        ApiRoutes.SUPPLIERS.ONLINE.MARKUP_UPDATE
      );

      if (response.data.statusCode === 200) {
        SuccessApiToast("Markups Updated Successfully");

        navigate(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
      }
    } catch (error) {
      ErrorApiAlert("Error Updating Markups");
    }
    // Add logic to send this result to the backend
  };
  const handleInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);

    // Perform filtering as the user types
    const filtereData = originalSupplierData.filter((sp) =>
      sp.companyName.toLowerCase().includes(value.toLowerCase())
    );

    setSupplierData(filtereData);
  };
  return (
    <div className="container-fluid pt-0 p-4" id="content-pad">
      <Header2
        title="ONLINE SUPPLIER SETTINGS"
        linkText1=" Search Agent"
        linkText2=" Set Priority"
        link1={Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON}
      />

      <div>
        {/* <div
          className="panel-body"
          style={{ backgroundColor: "#FF5015", paddingBottom: "1px", paddingTop: "4px" }}
        >
          <div className="row">
            <div className="col-md-12">
              <h5 style={{ color: "white", fontSize: "15px", marginLeft: "20px" }}>
                CA0319 / Shiv Travels / Shiv Chauhan / Active
              </h5>
            </div>
          </div>
        </div> */}
        {loading ? (
          <div className="text-center">
            <img src={loadingGif} alt="Loading..." height={250} />
          </div>
        ) : (
          <>
            <form>
              <div className="panel-body removeMargins">
                <div
                  className="dataTables_scroll form-group"
                  style={{ position: "relative", overflow: "visible" }}
                >
                  <input type="hidden" name="search" defaultValue="agent" />

                  <div className="leftTopBtn"></div>
                  <div
                    id="search_agents_table1_wrapper"
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
                                data-placement="top"
                                data-original-title="Search within this table"
                              />
                            </h5>
                            <input
                              type="search"
                              className="form-control input-sm"
                              aria-controls="search_creadit_note"
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
                        <div id="wrapper2" style={{ overflow: "visible" }}>
                          <table
                            id="search_agents_table1"
                            className="table table-bordered   table-responsive dataTable no-footer"
                            role="grid"
                            aria-describedby="search_agents_table1_info"
                            style={{ overflow: "visible" }}
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "82.2px" }}
                                >
                                  <div className="checkbox checkbox-success">
                                    <input
                                      type="checkbox"
                                      name="select-all"
                                      className="supplier_profile"
                                      id="select-all"
                                      checked={allChecked}
                                      onChange={handleSelectAllChange}
                                    />
                                    <label
                                      id="selectLbl"
                                      style={{ display: "block" }}
                                      checked
                                    />
                                  </div>
                                </th>
                                <th
                                  className="alignLeft sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "412.2px" }}
                                >
                                  Supplier
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "134.2px" }}
                                >
                                  Status
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "304.2px" }}
                                >
                                  Assign Pricing Profile
                                </th>
                                <th
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "496px" }}
                                >
                                  Lead Time (Hrs)&nbsp;
                                  <i
                                    className="fa fa-info-circle"
                                    title
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Lead time adds a buffer in hours to the cancellation policy provided by the supplier."
                                  />
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {supplierData.map((supplier, index) => (
                                <React.Fragment key={index}>
                                  <tr
                                    role="row"
                                    className={
                                      "phps_row_" +
                                      (index % 2 === 0 ? "0 even" : "1 odd")
                                    }
                                  >
                                    <td>
                                      <div className="checkbox checkbox-success">
                                        <input
                                          type="checkbox"
                                          name={`supplier[status][${index}]`}
                                          value={1}
                                          className="supplier_profile"
                                          id={`supplier[status][${index}]`}
                                          style={{
                                            position: "absolute",
                                            marginLeft: "-20px",
                                          }}
                                          checked={supplier.checked || false}
                                          onChange={(e) =>
                                            handleInputChange(
                                              index,
                                              "checked",
                                              e.target.checked
                                            )
                                          }
                                        />
                                        <label />
                                      </div>
                                    </td>
                                    <td className="alignLeft">
                                      {supplier.companyName}
                                    </td>
                                    <td>
                                      <h5>
                                        <span
                                          className={`td_label ${
                                            supplier.status === true
                                              ? "label-success"
                                              : "label-default"
                                          }`}
                                        >
                                          {supplier.status === true
                                            ? "Active"
                                            : "In Active"}
                                        </span>
                                      </h5>
                                    </td>
                                    <td style={{ position: "relative" }}>
                                      <div style={{ position: "relative" }}>
                                        <MultiSelect
                                          options={markupProfileOptions}
                                          value={supplier.markupprofile || []}
                                          onChange={(selectedOptions) =>
                                            handleInputChange(
                                              index,
                                              "markupprofile",
                                              selectedOptions
                                            )
                                          }
                                          labelledBy="Select"
                                          className="multi-select"
                                          style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            width: "100%",
                                          }}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div className="col-sm-10 text-center">
                                        <input
                                          type="number"
                                          name={`supplier[lead_time][${index}]`}
                                          className="form-control col-md-10"
                                          id={`leadTimeHrs${index}`}
                                          placeholder
                                          maxLength={4}
                                          style={{ marginLeft: "25px" }}
                                          value={supplier.leadTimeHrs || ""}
                                          onChange={(e) =>
                                            handleInputChange(
                                              index,
                                              "leadTimeHrs",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </React.Fragment>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="fixedBtn mt-2">
                    <div className="text-left">
                      <button
                        type="button"
                        className="btn btn-default pull-left"
                        value="Submit"
                        onClick={handleSave}
                        style={{ color: "black" }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomersAgentOnlineSupplierSetting;
