import { useState } from "react";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import { useNavigate } from "react-router-dom";
import { postDATA } from "../../../Apis/API";
import { ErrorApiAlert, SuccessApiToast } from "../../../constants/globalfunctions";
import ApiRoutes from "../../../constants/ApiRoutes";


const MastersVehiclesTypeNew = () => {
  const [formData,setFormData]=useState({
    vehicleCode: "",
    vehicleType: "",
    maxPassenger: "",
    maxLuggage: ""
});


const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();




try {
   
  const response = await postDATA(formData,ApiRoutes.VEHICLES.VEHICLE);

  if (response.data.statusCode === 200) {
   
    SuccessApiToast( "Vehicle Type Added Successfully");

navigate(Constants.URLConstants.MASTERSVEHICLESTYPESEARCH);
  }
} catch (error) {
  ErrorApiAlert('Error Adding Vehicle Type');
  //  console.error(error)
}
}
  return (

  
    <>
      <Header2
        title="VEHICLE TYPE DETAILS"
        linkText1="Search Vehicles"
        linkText2="Add Vehicle Type"
        link1={Constants.URLConstants.MASTERSVEHICLESTYPESEARCH}
        
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">


      <form onSubmit={handleSubmit}  id="vehicletypenewform">
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
    <button type="submit"  value="SUBMIT"  className="btn btn-dark btn-sm form-group">
      <i className="fa fa-floppy-o" />
      &nbsp;Save
    </button>
  </div>
</form>



      </div>
    </>
  );
};
export default MastersVehiclesTypeNew;
