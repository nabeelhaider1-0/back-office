import { useNavigate } from "react-router-dom";
import Constants from "../../../../constants/routes";
import Header2 from "../../../header2/header2";
import { putDATA } from "../../../../Apis/API";
import {
  ErrorApiAlert,
  RequiredFieldAlert,
  SuccessApiToast,
} from "../../../../constants/globalfunctions";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ApiRoutes from "../../../../constants/ApiRoutes";

const MastersHotelSpecialRequestEdit = ({ data }) => {
  const [formData, setFormData] = useState({
    requestName: "",
  });

  // Event handler for form inputs change
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      const updatedValues = checked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value);
      setFormData({ ...formData, [name]: updatedValues });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const navigateOnRefresh = useNavigate();
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData({
        requestName: data.requestName,
      });
    } else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(
        Constants.URLConstants.MASTERSHOTELSSPECIALREQUESTSEARCH
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, navigateOnRefresh]);

  const checkRequired = (requestData) => {
    if (
      requestData.requestName === "" ||
      requestData.requestName === undefined
    ) {
      RequiredFieldAlert(
        "Request Name is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }
    return true;
  };
  const navigate = useNavigate();
  // create handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isSuccessfull = checkRequired(formData);
    if (isSuccessfull) {
      try {
        const response = await putDATA(
          ApiRoutes.HOTELS.SPECIAL_REQUESTS,
          data.uuid,
          formData
        );
        if (response.data.statusCode === 200) {
          SuccessApiToast("Request Name Updated Successfully");

          navigate(Constants.URLConstants.MASTERSHOTELSSPECIALREQUESTSEARCH);
        }
      } catch (error) {
        ErrorApiAlert("Error Updating Request Name");
      }
    }
  };

  return (
    <>
      <Header2
        title="EDIT SPECIAL REQUEST"
        linkText1="Search Special Request "
        linkText2="Edit Special Request"
        link1={Constants.URLConstants.MASTERSHOTELSSPECIALREQUESTSEARCH}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          <div className="panel-body">
            <div className="form-group row">
              <div className="form-group col-md-3 ">
                <label>Special Request Name</label>
                <input
                  className="form-control form-control-sm required test123"
                  type="text"
                  size={45}
                  maxLength={255}
                  name="requestName"
                  value={formData.requestName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group col-md-3">
                <button className="btn btn-dark btn-sm" type="submit" name="b1">
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
export default connect(mapStateToProps)(MastersHotelSpecialRequestEdit);
