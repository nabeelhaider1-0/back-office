import { useEffect, useState } from "react";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import { useNavigate } from "react-router-dom";
import { putDATA } from "../../../Apis/API";
import { SimpleAlert, SuccessApiToast } from "../../../constants/globalfunctions";
import { connect } from "react-redux";
import ApiRoutes from "../../../constants/ApiRoutes";


const MastersVehiclesTypeEdit = ({ data }) => {
  const [formData,setFormData]=useState({
    vehicleCode: "",
    vehicleType: "",
    maxPassenger: "",
    maxLuggage: ""
});
const navigateOnRefresh = useNavigate();
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prevState => ({
    ...prevState,
    [name]: value
  }));
};

useEffect(() => {
 
  if (data && Object.keys(data).length > 0) {
setFormData({
  vehicleCode: data.vehicleCode||"",
  vehicleType: data.vehicleType||"",
  maxPassenger: data.maxPassenger||"",
  maxLuggage: data.maxLuggage||""
});
   }

   else {
    // If data is not available, navigate to the branch search page
    navigateOnRefresh(Constants.URLConstants.MASTERSVEHICLESTYPESEARCH);
  }
}, [data, navigateOnRefresh]);
const handleSubmit = async (e) => {
  e.preventDefault();




   try {
       // Make an API call to update the staff's active status
     
       const response = await putDATA(ApiRoutes.VEHICLES.VEHICLE,data.uuid ,formData);

       // Check the response and handle it accordingly
       if (response.data.statusCode === 200) {
     
           SuccessApiToast( "Vehicle Type Updated Successfully");
           navigateOnRefresh(Constants.URLConstants.MASTERSVEHICLESTYPESEARCH);

       } else {
             
         SimpleAlert("error",
          "Error",
       "Failed to Vehicle Type");
       }
     } catch (error) {
       // Handle errors from the API call

       SimpleAlert(  "error",
        "Error",
      "An unexpected error occurred.");
     }

}
  return (
    <>
      <Header2
        title="VEHICLE TYPE DETAILS"
        linkText1="Search Vehicles"
        linkText2="Edit Vehicle Type"
        link1={Constants.URLConstants.MASTERSVEHICLESTYPESEARCH}
        
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">


      <form onSubmit={handleSubmit}  id="vehicletypeedit" >
  <div className=" panel-body form-group">
  <div className="row">
    <div className="col-md-2 form-group">
        <label>Vehicle Code</label>
        <input type="text"  className="form-control form-control-sm required test123" maxLength={255}
          name="vehicleCode" 
          id="vehicleCode"
         value={formData.vehicleCode}
         onChange={handleInputChange}
           required
        />
      </div>
      <div className="col-md-2 form-group">
        <label>Vehicle Type</label>
        <input type="text" 
        name="vehicleType" 
        id="vehicleType"
       value={formData.vehicleType}
       onChange={handleInputChange}
         required
        className="form-control form-control-sm required test123" maxLength={255}/>
      </div>
      <div className="col-md-2 form-group">
        <label>Max. Passanger Capacity</label>
        <input type="text"
         name="maxPassenger" 
         id="maxPassenger"
        value={formData.maxPassenger}
        onChange={handleInputChange}
          required
        className="form-control form-control-sm required" maxLength={10} />
      </div>
      <div className="col-md-2 form-group">
        <label>Max. Lugguage Capacity</label>
        <input type="text" 
         name="maxLuggage" 
         id="maxLuggage"
        value={formData.maxLuggage}
        onChange={handleInputChange}
          required
        className="form-control form-control-sm required" maxLength={10} />
      </div>
    </div>
    <br />
    <button type="submit" name="b1" id="b1" value="SUBMIT" onclick="submit_form();" className="btn btn-dark btn-sm form-group">
      <i className="fa fa-floppy-o" />
      &nbsp;Save
    </button>
  </div>
</form>



      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(MastersVehiclesTypeEdit);