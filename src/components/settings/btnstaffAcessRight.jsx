/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import Constants from "../../constants/routes";
import Header2 from "../header2/header2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assignRightstoProfile, getAllRights } from "../../Apis/API";
import { Slide, toast } from "react-toastify";

const AccessRight = ({ data }) => {
  const navigateOnRefresh = useNavigate();
  const [rightsData, setRightsData] = useState([]);

  const getRights = async () => {
    try {
      const response = await getAllRights();

      if (response.data.statusCode === 200) {
        const rights = response.data.data || [];

        setRightsData(rights);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      getRights();
    } else {
      // If data is not available, navigate to the staff search page
      navigateOnRefresh(Constants.URLConstants.STAFFSEARCH);
    }
  }, [data, navigateOnRefresh]);
  useEffect(() => {
    // Set initial checked status based on data.profiles[0].rights
    if (data.profiles && data.profiles.length > 0) {
      // Set initial checked status based on data.profiles
      const initialCheckedItems = {};
      data.profiles.forEach((profile) => {
        profile.rights.forEach((right) => {
          initialCheckedItems[right.uuid] = true; // Assuming you want all initially checked
        });
      });
      setCheckedItems(initialCheckedItems);
    }

    // setCheckedItems(initialCheckedItems);
  }, []);

  const handleCheckboxChange = (uuid, checked) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [uuid]: checked,
    }));
  };

  const [checkedItems, setCheckedItems] = useState({});

  const handleSubmit = async (e) => {
    // Construct the data object to be logged
    e.preventDefault();
    const profilerights = {
      uuid: data.profiles[0].uuid,
      rightsUuid: Array.from(
        document.querySelectorAll(".select-option:checked")
      ).map((checkbox) => checkbox.value),
    };

    try {
      const response = await assignRightstoProfile(profilerights);

      if (response.data.statusCode === 200) {
        toast.success("Rights Assigned Successfully", {
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

        navigateOnRefresh(Constants.URLConstants.STAFFSEARCH);
      }
    } catch (error) {
      //  console.error(error)
    }
  };

  return (
    <>
      <div>
        <Header2
          title="ACCESS RIGHTS"
          linkText1="List Users"
          linkText2="Access Rights"
          link1={Constants.URLConstants.STAFFSEARCH}
        />
      </div>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div
          class="panel-body"
          style={{
            backgroundColor: " #FF5015",
            paddingBottom: "1px",
            paddingTop: "4px",
          }}
        >
          <div class="row">
            <div class="col-md-12">
              <h5
                style={{ color: "white", fontSize: "15px", marginLeft: "20px" }}
              >
                UserName : {data.userName}
              </h5>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div class="panel-body">
            {rightsData.length > 0 && (
              <RightsSection
                rights={rightsData}
                checkedItems={checkedItems}
                handleCheckboxChange={handleCheckboxChange}
              />
            )}
            {/* {rightsData.map((right) => (
            <div key={right.uuid} className=" col-md-3 checkbox checkbox-success checkbox-inline" id={`tickspc-${right.uuid}`}>
              <input id={`chk_${right.uuid}`} type="checkbox" name={`chk_${right.uuid}`} defaultValue={1} />
              <label htmlFor={`chk_${right.uuid}`}>{right.rightName}</label>
            </div>
          ))} */}
          </div>
          <hr />
          <br />
          <div class="row">
            <div class="form-group col-md-12">
              <button
                class="btn btn-dark btn-sm"
                type="submit"
                name="b1"
                id="b1"
                value="SUBMIT"
              >
                <i class="fa fa-floppy-o"></i>&nbsp;Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
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
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps)(AccessRight);
