import { connect } from "react-redux";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RequiredFieldAlert, SimpleAlert, SuccessApiToast } from "../../../constants/globalfunctions";
import { putDATA } from "../../../Apis/API";
import ApiRoutes from "../../../constants/ApiRoutes";

const OfflineSuppliersChangePassword = ({data}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    confirmpassword:""
    });
    useEffect(() => {
   
 
      if (data && Object.keys(data).length > 0) {
       
    setFormData({
      userName: data.userName,
      password: data.actualpassword,
      });
    
       }
    
       else {
        // If data is not available, navigate to the branch search page
        navigate(Constants.URLConstants.OFFLINESUPPLIERSEARCH);
      }
    }, [data, navigate]);
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
    


 if(formData.password===formData.confirmpassword){
    
    try {
      // Make an API call to update the staff's active status
      


   
      const response = await putDATA(ApiRoutes.SUPPLIERS.OFFLINE.SUPPLIER,data.uuid ,{password:formData.password});
    
      // Check the response and handle it accordingly
      if (response.data.statusCode === 200) {
      
          SuccessApiToast( "Offline Supplier Password Updated Successfully");
          navigate(Constants.URLConstants.OFFLINESUPPLIERSEARCH);
    
      } else {
              
        SimpleAlert("error",
         "Error",
      "Failed to Update Offline Supplier Password");
      }
    } catch (error) {
      // Handle errors from the API call
    
      SimpleAlert(  "error",
       "Error",
     "An unexpected error occurred.");
    }

 }else{
  RequiredFieldAlert(  "Password and Confirm Password must match",
  "Please provide correct password",
  "error");
 }
    }
    
  return (
    <div>
      <Header2
        title="CHANGE PASSWORD"
        linkText1="List Offline Suppliers "
        linkText2="Edit Offline Supplier"
        link1={Constants.URLConstants.OFFLINESUPPLIER}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit} id="supplierofflinesuppliereditfor"  >
          <div class="panel-body">
            <div class="row">
              <div class="form-group col-md-3">
                <label>Username</label>
                <div>{data.userName}</div>
              </div>
              <div class="form-group col-md-3">
                <label>Password</label>
                <input
                  class="required form-control form-control-sm test123"
                  type="text"
                  name="password" 
                   id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  size="45"
                 maxlength="15"
                />
              </div>
              <div class="form-group col-md-3">
                <label>Confirm Password</label>
                <input
                  class="required form-control form-control-sm"
                  type="password"
                  name="confirmpassword" 
                  id="confirmpassword"
                 value={formData.confirmpassword}
                 onChange={handleInputChange}
                 required
                 size="45"
                 maxlength="15"
                />
              </div>
            </div>
            <div class="form-group col-md-12 mt-2">
              <button
                class="btn btn-dark btn-sm"
                type="submit"
                name="b1"
                value="SUBMIT"
             
              >
                <i class="fa fa-floppy-o" aria-hidden="true"></i>
                &nbsp;&nbsp;Save
              </button>
              <span id="loading" style={{display: 'none'}}>
                <img src="images/loading.gif" alt="" />
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(OfflineSuppliersChangePassword);