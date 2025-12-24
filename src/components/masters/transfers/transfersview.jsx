import { useEffect } from "react";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { hoursminutesformater } from "../../../constants/globalfunctions";

const MastersTransfersView = ({ data }) => {
  const navigateOnRefresh = useNavigate();
  useEffect(() => {
   
    if (data && Object.keys(data).length > 0) {


     }

     else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(Constants.URLConstants.MASTERSTRANSFERSSEARCH);
    }
  }, [data, navigateOnRefresh]);

  return (
    <>
      <Header2 title="VIEW TRANSFER" linkText1="Search Transfer " linkText2="View Transfer" link1={Constants.URLConstants.MASTERSTRANSFERSSEARCH} />
      <div class="container-fluid pt-0 p-4" id="content-pad">
     
      <form>
  <div className="panel-body">
    <div className="row">
      <div className="form-group col-md-3">
        <label>Transfer Name</label>
        <div>
          {data.transferName}
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Duration</label>
        <div>
        {hoursminutesformater(data.duration)}
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Languages</label>
        <div>
          {data.driverLanguage.join(' ')}
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Status</label>
        <div>{data.status}</div>
      </div>
      <div className="form-group col-md-3">
        <label>PickUp Country</label>
        <div>
     {     data.pickupCountry}
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>PickUp City</label>
        <div>
          {data.fromCity}
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>PickUp Point</label>
        <div>{data.pickupPoint} </div>
      </div>
      <div className="form-group col-md-3">
        <label>DropOff Country</label>
        <div>
          {data.dropoffCountry}
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>DropOff City</label>
        <div>
        {  data.toCity}
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>DropOff Point</label>
        <div>{data.dropOffPoint} </div>
      </div>
      <div className="form-group col-md-12">
        <label>Meeting Point</label>
        <div> {data.meetingPoint} </div>
      </div>
      <div className="form-group col-md-12">
        <label>Description</label>
        <div> {data.description} </div>
      </div>
      <div className="form-group col-md-3">
        <label>Additional Information</label>
        <div>{data.additionalInformation}</div>
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

export default connect(mapStateToProps)(MastersTransfersView);