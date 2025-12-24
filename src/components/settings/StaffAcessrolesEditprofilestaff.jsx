import { Link, useNavigate } from "react-router-dom";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { useEffect, useState } from "react";
import {
  assignRightstoProfile,
  getAllRights,
  updateProfile,
} from "../../Apis/API";
import { connect } from "react-redux";
import { Slide, toast } from "react-toastify";

const EditProfile = ({ data }) => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [rightsData, setRightsData] = useState([]);
  const [formData, setFormData] = useState({
    profileName: data.profileName || "",
  });
  const gEtProfiles = async () => {
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

  const navigateOnRefresh = useNavigate();

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      gEtProfiles();
    } else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(Constants.URLConstants.ADDPROFILE);
    }
  }, [data, navigateOnRefresh]);

  useEffect(() => {
    // Set initial checked status based on data.rights
    const initialCheckedItems = data.rights.reduce(
      (acc, right) => ({
        ...acc,
        [right.uuid]: true, // Assuming you want all initially checked
      }),
      {}
    );
    setCheckedItems(initialCheckedItems);
  }, [data.rights]);

  const handleCheckboxChange = (uuid, checked) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [uuid]: checked,
    }));
  };

  const [checkedItems, setCheckedItems] = useState({});
  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    setSelectAllChecked(isChecked);

    const updatedCheckedItems = {};
    rightsData.forEach((right) => {
      updatedCheckedItems[right.uuid] = isChecked; // Set all checkboxes to the state of "Select All"
    });
    setCheckedItems(updatedCheckedItems);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Log the value of profileName
    if (data.profileName !== formData.profileName) {
      try {
        const response = await updateProfile(data.uuid, {
          profileName: formData.profileName,
        });

        if (response.data.statusCode === 200) {
          toast.success("Profile Edited Successfully", {
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
          navigateOnRefresh(Constants.URLConstants.STAFFACCESSROLES);
        }
      } catch (error) {
        // console.error(error);
      }
    }

    const profilerights = {
      uuid: data.uuid,
      rightsUuid: Array.from(
        document.querySelectorAll(".select-option:checked")
      ).map((checkbox) => checkbox.value),
    };

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

        navigateOnRefresh(Constants.URLConstants.STAFFACCESSROLES);
      }
    } catch (error) {
      //  console.error(error)
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <Header2 title="EDIT PROFILE" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          <div class="row mb-2">
            <div class="col-md-1 form-group">
              <Link
                to={Constants.URLConstants.STAFFACCESSROLES}
                class="btn btn-outline-secondary btn-sm"
              >
                <i class="fa fa-angle-left"></i>&nbsp;Back
              </Link>
            </div>
            <div class="col-md-2 form-group">
              <button type="submit" className="btn btn-dark btn-sm">
                <i class="fa fa-pencil-square-o" style={{ color: "white" }}></i>
                &nbsp;Update User Profile
              </button>
            </div>
          </div>
          {/* Name Input */}
          <div className="row mt-3 mb-4">
            <div className="col-sm-3 form-group">
              <label>Name</label>
              <input
                className="form-control required test123"
                type="text"
                value={formData.profileName || ""}
                size="30"
                name="profileName"
                onChange={handleInputChange}
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
          {generalRights.length > 0 && (
            <RightsSection
              rights={generalRights}
              checkedItems={checkedItems}
              handleCheckboxChange={handleCheckboxChange}
            />
          )}
          {/* Render Access Permissions */}

          {accessPermissions.length > 0 && (
            <RightsSection
              rights={accessPermissions}
              checkedItems={checkedItems}
              handleCheckboxChange={handleCheckboxChange}
            />
          )}
          {/* Render BI Report Permissions */}
          {biReportPermissions.length > 0 && (
            <RightsSection
              rights={biReportPermissions}
              checkedItems={checkedItems}
              handleCheckboxChange={handleCheckboxChange}
            />
          )}
          {/* Render Agent Action Permissions */}
          {agentActionPermissions.length > 0 && (
            <RightsSection
              rights={agentActionPermissions}
              checkedItems={checkedItems}
              handleCheckboxChange={handleCheckboxChange}
            />
          )}
        </form>
      </div>
    </div>
  );
};

const RightsSection = ({ rights, checkedItems, handleCheckboxChange }) => {
  const handleChange = (e) => {
    const { name, checked } = e.target;
    handleCheckboxChange(name, checked);
  };

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
              name={right.uuid}
              value={right.uuid}
              id={right.rightName}
              checked={checkedItems[right.uuid]}
              onChange={handleChange}
            />
            <label htmlFor={right.rightName}>&nbsp;{right.rightName}</label>
          </div>
        </div>
      ))}
    </div>
  );
};
// const RightsSection = ({ rights, data, handleCheckboxChange }) => {
//     // Local state to manage checked status of checkboxes
//     const [checkedItems, setCheckedItems] = useState(
//       rights.reduce((acc, right) => ({ ...acc, [right.uuid]: data.rights.map(r => r.uuid).includes(right.uuid) }), {})
//     );

//     // Function to handle checkbox change
//     const handleChange = (e) => {
//       const { name, checked } = e.target;
//       setCheckedItems((prevCheckedItems) => ({
//         ...prevCheckedItems,
//         [name]: checked,
//       }));
//       handleCheckboxChange(name, checked); // Call parent component's handler
//     };

//     return (
//       <div className="row mt-4 mb-4">
//         <br />
//         <br />
//         <b>{rights[0].rightType}</b>
//         <br />
//         {rights.map((right, index) => (
//           <div key={index} className="col-sm-3 form-group">
//             <div className="checkbox checkbox-success mb-1">
//               <input
//                 className="select-option"
//                 type="checkbox"
//                 name={right.uuid}
//                 value={right.uuid}
//                 id={right.rightName}
//                 checked={checkedItems[right.uuid]}
//                 onChange={handleChange}
//               />
//               <label htmlFor={right.rightName}>&nbsp;{right.rightName}</label>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(EditProfile);
