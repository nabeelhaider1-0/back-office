import { connect } from "react-redux";
import Constants from "../../../../constants/routes";
import Header2 from "../../../header2/header2";

const MastersHotelLocationView = ({ data }) => {
  return (
    <>
      <Header2
        title="LOCATION DETAILS"
        linkText1="Search Location"
        linkText2="View Location"
        link1={Constants.URLConstants.MASTERSHOTELLOCATIONSEARCH}
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
                  <label>Location Name</label>
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
export default connect(mapStateToProps)(MastersHotelLocationView);
