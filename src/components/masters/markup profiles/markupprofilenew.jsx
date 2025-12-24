import React, { useState } from "react";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import {
  ErrorApiAlert,
  RequiredFieldAlert,
  SimpleAlert,
  SuccessApiToast,
} from "../../../constants/globalfunctions";
import { postDATA } from "../../../Apis/API";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../../../constants/ApiRoutes";

const MarkupProfileNew = () => {
  const [rows, setRows] = useState([
    { from: 0, to: "", amount: "", percentage: "" },
  ]);
  const [profileName, setProfileName] = useState("");
  const [defaultProfile, setDefaultProfile] = useState("no");
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setDefaultProfile(checked ? "yes" : "no");
  };
  const addRow = (index) => {
    const currentRow = rows[index];
    const previousRow = rows[index - 1];

    if (
      currentRow.to.trim() !== "" &&
      (previousRow
        ? parseFloat(currentRow.to) > parseFloat(previousRow.to)
        : true)
    ) {
      const newRows = [...rows];
      newRows.splice(index + 1, 0, {
        from: currentRow.to,
        to: "",
        amount: "",
        percentage: "",
      });
      setRows(newRows);
    } else {
      if (currentRow.to.trim() === "") {
        SimpleAlert("info", "Enter Value for To Range", "");
      } else {
        SimpleAlert(
          "info",
          "Value for To range should be greater than From range",
          ""
        );
      }
    }
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      const newRows = [...rows];
      newRows.splice(index, 1);
      setRows(newRows);
    }
  };

  const handleChange = (index, key, value) => {
    const newRows = [...rows];
    newRows[index][key] = value;
    setRows(newRows);
  };

  const checkRequired = (profileDataArray) => {
    // Iterate over each profile data object
    for (const profileData of profileDataArray) {
      // Check if any required field is empty
      if (!profileData.to || !profileData.amount || !profileData.percentage) {
        // If any required field is empty, display an error message and return false
        RequiredFieldAlert(
          "All fields are required",
          "Please fill in all required fields",
          "error"
        );
        return false;
      }
    }
    // If all required fields are filled for all profile data objects, return true
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Constructing profileBody
    const profileBody = {
      profileName: profileName,
      makeThisDefaultProfile: defaultProfile,
      activeStatus: "true", // Assuming this should be a boolean value
    };

    // Extracting profile data from rows
    const allProfileData = rows.map((row) => ({
      from: row.from.toString(),
      to: row.to,
      amount: row.amount,
      percentage: row.percentage,
    }));

    if (!checkRequired(allProfileData)) {
      // If any required fields are empty, return without further processing
      return;
    }

    try {
      // First API request
      const response1 = await postDATA(
        profileBody,
        ApiRoutes.MARKUP_PROFILE.PROFILE
      );
      if (response1.data.statusCode === 200) {
        const markupProfileUuid = response1.data.data.uuid;

        // Append markupProfileUuid to each object in allProfileData
        const updatedAllProfileData = allProfileData.map((data) => ({
          ...data,
          markupProfileUuid: markupProfileUuid,
        }));

        // Second API request
        const response2 = await postDATA(
          updatedAllProfileData,
          ApiRoutes.MARKUP_PROFILE.PROFILE_DETAIL
        );
        if (response2.data.statusCode === 200) {
          // Success notification
          SuccessApiToast("Mark-Up Profile Added Successfully");
          // Navigate to a specific URL after successful addition
          navigate(Constants.URLConstants.MASTERSMARKUPPROFILESEARCH);
        }
      }
    } catch (error) {
      // Error notification
      ErrorApiAlert("Error Adding Mark-Up Profile");
      console.error(error);
    }
  };

  return (
    <>
      <Header2
        title="ADD PRICING PROFILE"
        linkText1="Search Pricing Profiles"
        linkText2="Add Pricing Profile"
        link1={Constants.URLConstants.MASTERSMARKUPPROFILESEARCH}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form
          name="add_pricing_profile_form"
          id="add_pricing_profile_form"
          onSubmit={handleSubmit}
        >
          <div className="panel-body removeMargins">
            <div className="form-group row mt-2">
              <div className="form-group col-md-3">
                <label>Profile Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm required test123"
                  id="txt_profile_name"
                  name="txt_profile_name"
                  size={10}
                  maxLength={50}
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group col-md-3">
                <label>&nbsp;</label>
                <br />
                <div className="checkbox checkbox-success checkbox-inline">
                  <input
                    id="chk_default_profile"
                    type="checkbox"
                    name="defaultProfile"
                    value="yes"
                    onChange={handleCheckboxChange}
                    checked={defaultProfile === "yes"}
                  />
                  <label htmlFor="chk_default_profile">
                    Make this the default profile
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-12">
              <table className="table table-bordered   table-responsive">
                <thead>
                  <tr>
                    <th className="my_td">&nbsp;From</th>
                    <th className="my_td">&nbsp;To</th>
                    <th className="my_td">
                      &nbsp;Amount <span id="currency">(Currency: USD)</span>
                    </th>
                    <th className="my_td">&nbsp;Percentage %</th>
                    <th className="my_td">&nbsp;Actions</th>
                  </tr>
                </thead>
                <tbody id="data">
                  {rows.map((row, index) => (
                    <tr className="aaa rows" height={22} key={index}>
                      <td className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-sm fromVal"
                          value={row.from}
                          readOnly
                        />
                      </td>
                      <td className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-sm toVal"
                          value={row.to}
                          onChange={(e) =>
                            handleChange(index, "to", e.target.value)
                          }
                        />
                      </td>
                      <td className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-sm toAmt"
                          value={row.amount}
                          onChange={(e) =>
                            handleChange(index, "amount", e.target.value)
                          }
                        />
                      </td>
                      <td className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-sm toPer"
                          value={row.percentage}
                          onChange={(e) =>
                            handleChange(index, "percentage", e.target.value)
                          }
                        />
                        <div
                          className="input-group-addon"
                          style={{ float: "right", marginTop: "-31px" }}
                        >
                          <h6>%</h6>
                        </div>
                      </td>
                      <td className="actionlink form-group">
                        <div className="actionCont d-flex align-items-center">
                          {index === rows.length - 1 && (
                            <>
                              <div
                                className="input-group-addon addFirst mr-2"
                                onClick={() => addRow(index)}
                                data-toggle="tooltip"
                                title="Add"
                                data-original-title="Add"
                                data-placement="top"
                              >
                                <i className="fa fa-plus" />
                              </div>
                              {index !== 0 && (
                                <div
                                  className="input-group-addon addFirst"
                                  onClick={() => removeRow(index)}
                                  data-toggle="tooltip"
                                  title="Remove"
                                  data-original-title="Remove"
                                  data-placement="top"
                                >
                                  <i className="fa fa-times" />
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="form-group col-md-3">
              <button
                type="submit"
                className="btn btn-dark btn-sm"
                name="save"
                value="Submit"
              >
                <i className="fa fa-floppy-o" />
                &nbsp;&nbsp;Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MarkupProfileNew;
