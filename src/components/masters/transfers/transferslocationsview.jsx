import { connect } from "react-redux";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";

const MastersTransferslocationsview = ({ data }) => {
    const navigateOnRefresh = useNavigate();
  useEffect(() => {
   
    if (data && Object.keys(data).length > 0) {


     }

     else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(Constants.URLConstants.MASTERSTRANSFERSLOCATIONSSEARCH);
    }
  }, [data, navigateOnRefresh]);
  return (
    <>
      <Header2
        title="LOCATION DETAILS"
        linkText1="Search Location"
        linkText2="View Location"
        link1={Constants.URLConstants.MASTERSTRANSFERSLOCATIONVIEW}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label>Country</label>
                  <div>{data.country}</div>
                </div>
                <div className="form-group col-md-3">
                  <label>City</label>
                  <div>{data.city}</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Transfer Type</label>
                  <div>{data.transferType}</div>
                </div>
                <div className="form-group col-md-3">
                  <label>Tranfer Location Name</label>
                  <div>{data.locationName}</div>
                </div>
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
export default connect(mapStateToProps)(MastersTransferslocationsview);
