import { connect } from "react-redux";
import Header2 from "../header2/header2";
import { RequiredFieldAlert, SimpleAlert, SuccessApiToast } from "../../constants/globalfunctions";
import Constants from "../../constants/routes";
import { putDATA } from "../../Apis/API";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiRoutes from "../../constants/ApiRoutes"

const CustomersAgentChangePassword = ({ data }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    confirmpassword: ""
  });

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
     
      setFormData((prevFormData) => ({
        ...prevFormData,
        userName: data.userName,
        password: data.actualpassword ? data.actualpassword : "",
        confirmpassword: ""
      }));
    } else {
      navigate(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
    }
  }, [data, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   

    if (formData.password === formData.confirmpassword) {
      try {
        const response = await putDATA(
          ApiRoutes.CUSTOMER_AGENTS.AGENT,
          data.uuid,
          { password: formData.password, updatepassword: true }
        );

        if (response.data.statusCode === 200) {
          SuccessApiToast("Agent Password Updated Successfully");
          navigate(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
        } else {
          SimpleAlert("error", "Error", "Failed to Update Agent Password");
        }
      } catch (error) {
        SimpleAlert("error", "Error", "An unexpected error occurred.");
      }
    } else {
      RequiredFieldAlert("Password and Confirm Password must match", "Please provide correct password", "error");
    }
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="CHANGE PASSWORD" />
        <form onSubmit={handleSubmit} id="agentpasswordedit">
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label>Username</label>
                <div>{data.userName}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Password</label>
                <input
                  className="required form-control form-control-sm test123"
                  type="text"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  size="45"
                  maxLength="15"
                     autoComplete="off"
                />
              </div>
              <div className="form-group col-md-3">
                <label>Confirm Password</label>
                <input
                  className="required form-control form-control-sm"
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  value={formData.confirmpassword}
                  onChange={handleInputChange}
                  required
                  size="45"
                  maxLength="15"
                 autoComplete="new-password"
                />
              </div>
            </div>
            <div className="form-group col-md-12 mt-2">
              <button
                className="btn btn-dark btn-sm"
                type="submit"
                name="b1"
                value="SUBMIT"
              >
                <i className="fa fa-floppy-o" aria-hidden="true"></i>
                &nbsp;&nbsp;Save
              </button>
              <span id="loading" style={{ display: 'none' }}>
                <img src="images/loading.gif" alt="" />
              </span>
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

export default connect(mapStateToProps)(CustomersAgentChangePassword);
