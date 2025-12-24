import { useNavigate } from "react-router-dom";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  ErrorApiAlert,
  RequiredFieldAlert,
  SimpleAlert,
  SuccessApiToast,
} from "../../../constants/globalfunctions";
import { putDATA } from "../../../Apis/API";
import ApiRoutes from "../../../constants/ApiRoutes";

const MarkupProfileEdit = ({ data }) => {
  const navigateOnRefresh = useNavigate();
  const [rows, setRows] = useState([
    {
      from: 0,
      to: "",
      amount: "",
      percentage: "",
      markupProfileUuid: "",
      uuid: "",
    },
  ]);
  const [profileName, setProfileName] = useState("");
  const [defaultProfile, setDefaultProfile] = useState("no");
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setProfileName(data.profileName);
      setDefaultProfile(data.makeThisDefaultProfile);
      const profileDetails = data.profileDetail.map((detail) => ({
        uuid: detail.uuid,
        from: detail.from,
        to: detail.to,
        amount: detail.amount,
        percentage: detail.percentage,
        markupProfileUuid: data.uuid,
      }));

      // Set the extracted profile details to the rows state
      setRows(profileDetails);
    } else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(Constants.URLConstants.MASTERSMARKUPPROFILESEARCH);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, navigateOnRefresh]);
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
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setDefaultProfile(checked ? "yes" : "no");
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
    const updatedRows = rows.map((row) => {
      // If markupProfileUuid is undefined, add it and assign data.uuid
      if (!row.markupProfileUuid && data && data.uuid) {
        return {
          ...row,
          markupProfileUuid: data.uuid,
        };
      }
      return row;
    });

    if (!checkRequired(updatedRows)) {
      // If any required fields are empty, return without further processing
      return;
    }
    try {
      const response = await putDATA(
        ApiRoutes.MARKUP_PROFILE.PROFILE,
        data.uuid,
        updatedRows
      );

      if (response.data.statusCode === 200) {
        SuccessApiToast("Mark-Up Profile Updated Successfully");

        navigateOnRefresh(Constants.URLConstants.MASTERSMARKUPPROFILESEARCH);
      }
    } catch (error) {
      ErrorApiAlert("Error Updating Mark-Up Profile");
    }
  };
  return (
    <>
      <Header2
        title="EDIT PRICING PROFILE"
        linkText1="Search Pricing Profiles"
        linkText2="Edit Pricing Profile"
        link1={Constants.URLConstants.MASTERSMARKUPPROFILESEARCH}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n    .form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {\n    cursor: not-allowed;\n    background-color: #eee;\n    opacity: 1;\n}\n  ",
          }}
        />

        <form onSubmit={handleSubmit} id="markupprofileedit">
          <div className="panel-body removeMargins">
            <div className="form-group row">
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
                  readOnly="readonly"
                />
              </div>
              <div className="form-group col-md-3">
                <label>Currency</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="txt_currency"
                  defaultValue="USD"
                  onfocus="this.blur()"
                  readOnly="readonly"
                />
              </div>
              <div
                className="form-group col-md-6 pull-right text-right"
                style={{ textAlign: "right" }}
              >
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
                  <label htmlFor="chk_default_profile">Default Profile</label>
                </div>
              </div>
            </div>
            <table
              className="table table-bordered   table-responsive datatable mt-3"
              id="toggle"
            >
              <thead>
                <tr>
                  <th className="my_td">&nbsp;From Range</th>
                  <th className="my_td">&nbsp;To Range</th>
                  <th className="my_td">&nbsp;Amount</th>
                  <th className="my_td">&nbsp;Percentage %</th>
                  {/* <th className="my_td">&nbsp;Profile Id</th> */}
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
            <br />
            <div className="row">
              <div className="form-group col-md-3">
                {/* <button type="button" className="btn btn-dark btn-sm" value="Add more" onclick="add_more()">
          <i className="fa fa-plus" />&nbsp;&nbsp;Add more
        </button>&nbsp;&nbsp; */}
                <button
                  type="submit"
                  className="btn btn-dark btn-sm"
                  name="update"
                  value="Submit"
                  onclick="Javascript update_pricing_form(document.forms['update_pricing_profile_form'],true,'update');"
                >
                  <i className="fa fa-floppy-o" />
                  &nbsp;Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps)(MarkupProfileEdit);
