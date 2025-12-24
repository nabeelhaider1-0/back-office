import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import {
  assignRightstoProfile,
  getAllProfilesData,
  getAllRights,
} from "../../Apis/API";
import MultiSelect from "../reactMultiSelect";
import Swal from "sweetalert2";
import { Slide, toast } from "react-toastify";

const AddProfile = () => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [rightsData, setRightsData] = useState([]);
  const [profilesData, setProfilessData] = useState([]);

  const getRights = async () => {
    try {
      const response = await getAllRights();

      if (response.data.statusCode === 200) {
        const rights = response.data.data || [];
        setRightsData(rights);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [formData, setFormData] = useState({
    ProfileUuid: "",
  });
  const getProfiles = async () => {
    try {
      const response = await getAllProfilesData();

      if (response.data.statusCode === 200) {
        const profiles = response.data.data || [];
        // Format profile data for React Select options
        const selectOptions = profiles.map((profile) => ({
          value: profile.uuid,
          label: profile.profileName,
        }));

        setProfilessData(selectOptions);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getRights();
    getProfiles();
  }, []);

  const handleSelectAllChange = () => {
    const chkbxOptions = document.querySelectorAll(".select-option");
    const isChecked = !selectAllChecked;
    for (let i = 0; i < chkbxOptions.length; i++) {
      chkbxOptions[i].checked = isChecked;
    }
    setSelectAllChecked(isChecked);
  };

  // Filter and organize rightsData
  const generalRights = rightsData.filter(
    (right) => right.rightType === "General Rights"
  );
  const accessPermissions = rightsData.filter(
    (right) => right.rightType === "Access Permissions"
  );
  const biReportPermissions = rightsData.filter(
    (right) => right.rightType === "BI Report Permissions"
  );
  const agentActionPermissions = rightsData.filter(
    (right) => right.rightType === "Agent Action Permissions"
  );

  const handleMultiSelectChange = (selectedOptions) => {
    setFormData((prevState) => ({
      ...prevState,
      ProfileUuid: selectedOptions.value,
    }));
  };

  const checkRequired = (prdata) => {
    if (prdata.uuid === "" || prdata.uuid === undefined) {
      Swal.fire("Profile  is required", "Please Select the profile", "error");
      return false;
    }

    return true;
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    // Construct the data object to be logged
    e.preventDefault();
    const profilerights = {
      uuid: formData.ProfileUuid,
      rightsUuid: Array.from(
        document.querySelectorAll(".select-option:checked")
      ).map((checkbox) => checkbox.value),
    };

    const isSuccessfull = checkRequired(profilerights);
    if (isSuccessfull) {
      try {
        const response = await assignRightstoProfile(profilerights);

        if (response.data.statusCode === 200) {
          toast.success("Profile Rights Assigned Successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });

          setFormData({
            profileName: "",
          });
          navigate(Constants.URLConstants.STAFFACCESSROLES);
        }
      } catch (error) {
        //  console.error(error)
      }
    }
  };
  return (
    <div>
      <Header2 title="ASSIGN RIGHTS TO PROFILE" />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          {/* Back and Save Buttons */}
          <div className="row mb-2">
            <div className="col-md-1 form-group">
              <Link
                to={Constants.URLConstants.STAFFACCESSROLES}
                className="btn btn-outline-secondary btn-sm"
              >
                <i className="fa fa-angle-left"></i>&nbsp;Back
              </Link>
            </div>
            <div className="col-md-2 form-group">
              <button type="submit" className="btn btn-dark btn-sm">
                <i className="fa fa-floppy-disk" aria-hidden="true"></i> Save
              </button>
            </div>
          </div>
          {/* Name Input */}
          <div className="row mt-3 mb-4">
            <div className="col-sm-3 form-group">
              <label>Name</label>
              <MultiSelect
                options={profilesData}
                name="ProfileUuid"
                isSearchable
                placeholder="- Select Profile -"
                noOptionsMessage={() => "No Profile Found"}
                className="custom-select required"
                onChange={handleMultiSelectChange}
              />
            </div>
          </div>
          {/* Select All Checkbox */}
          <div className="checkbox checkbox-success">
            <input
              type="checkbox"
              value=""
              className="selectDeselect"
              id="selectAll"
              checked={selectAllChecked}
              onChange={handleSelectAllChange}
            />
            <label
              htmlFor="selectAll"
              style={{ fontSize: "12px", color: "grey", fontWeight: "700" }}
            >
              &nbsp;Select All
            </label>
          </div>
          {/* Render General Rights */}
          {generalRights.length > 0 && <RightsSection rights={generalRights} />}
          {/* Render Access Permissions */}
          {accessPermissions.length > 0 && (
            <RightsSection rights={accessPermissions} />
          )}
          {/* Render BI Report Permissions */}
          {biReportPermissions.length > 0 && (
            <RightsSection rights={biReportPermissions} />
          )}
          {/* Render Agent Action Permissions */}
          {agentActionPermissions.length > 0 && (
            <RightsSection rights={agentActionPermissions} />
          )}
        </form>
      </div>
    </div>
  );
};

// Component to render checkboxes for a specific type of rights
const RightsSection = ({ rights }) => {
  return (
    <div className="row mt-4 mb-4">
      <br />
      <br />
      <b>{rights[0].rightType}</b>
      <br />
      {rights.map((right, index) => (
        <div key={index} className="col-sm-3 form-group">
          <div className="checkbox checkbox-success mb-1">
            <input
              className="select-option"
              type="checkbox"
              name="PSA_permissions[]"
              value={right.uuid}
              id={right.rightName}
            />
            <label htmlFor={right.rightName}>&nbsp;{right.rightName}</label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddProfile;
