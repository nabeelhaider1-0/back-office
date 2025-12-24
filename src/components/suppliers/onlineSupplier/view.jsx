import { connect } from "react-redux";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { filterOptionsByValue } from "../../../constants/globalfunctions";
import { timezoneOptions } from "../../../constants/contants";

const SuppliersDetailsView = ({data}) => {
  const navigate = useNavigate();
  useEffect(() => {
         
       
    if (data && Object.keys(data).length > 0) {
     


  
     }
  
     else {
      // If data is not available, navigate to the branch search page
      navigate(Constants.URLConstants.SUPPLIERSEARCH);
    }
  }, [data, navigate]);
  
  return (
    <>


      <Header2
        title={"SUPPLIER DETAILS"}
        linkText1=" List Online Suppliers "
        linkText2="View Supplier"
        link1={Constants.URLConstants.SUPPLIERSEARCH}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div class="panel-body">
            <div class="row">
              <div class="form-group col-md-3">
                <label>Company Name</label>
                <div>{data.companyName}</div>
              </div>
              <div class="form-group col-md-3">
                <label>Supplier Code</label>
                <div>{data.supplierName}</div>
              </div>
              <div class="form-group col-md-3">
                <label>Name</label>
                <div>{`${data.firstName || ''} ${data.middleName || ''} ${data.lastName || ''}`.trim() || ''}</div>
              </div>
              <div class="form-group col-md-3">
                <label>Address</label>
                <div>{data.Address}</div>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-3">
                <label>Country</label>
                <div>{data.country}</div>
              </div>
              <div class="form-group col-md-3">
                <label>City</label>
                <div>{data.city}</div>
              </div>
              <div class="form-group col-md-3">
                <label>Pincode</label>
                <div>{data.pinCode}</div>
              </div>
              <div class="form-group col-md-3">
                <label>Time Zone</label>
                <div>{filterOptionsByValue(timezoneOptions,parseInt(data.timeZone.replace(/[^0-9-]/g, '')))[0].label}</div>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-3">
                <label>Phone Number</label>
                <div>{data.phone}</div>
              </div>
              <div class="form-group col-md-3">
                <label>Mobile Number</label>
                <div>{data.mobile}</div>
              </div>
              <div class="form-group col-md-3">
                <label>Email</label>
                <div>{data.email}</div>
              </div>
              <div class="form-group col-md-3">
                <label>B2B Availability Timeout</label>
                <div>{data.b2bAvailabilityTimeout}</div>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-3">
                <label>B2C Availability Timeout</label>
                <div>{data.b2cAvailabilityTimeout}</div>
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

export default connect(mapStateToProps)(SuppliersDetailsView);