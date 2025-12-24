import { Link } from "react-router-dom";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import { connect } from "react-redux";
const FlightViewOfficeIds = ({ data }) => {
  return (
    <div>
      <Header2
        title="VIEW OFFICE ID"
        linkText1="Add"
        linkText2="Search"
        link2={Constants.URLConstants.FLIGHTFLIGHTPCCSEARCHRULES}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-3 form-group " id="agentsview">
                <label>Pcc Name: </label>
                &nbsp;{data.pccName}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-3 form-group " id="supplierview">
                <label>Flight Provider: </label>
                &nbsp;{data.flightProvider}
              </div>
              <div className="col-md-3 form-group " id="officeidview">
                <label>Office ID: </label>
                &nbsp;{data.officeID}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-3 form-group " id="UsernameOff">
                <label>Username: </label>
                &nbsp;{data.username}
              </div>
              <div className="col-md-3 form-group " id="PasswordOff">
                <label>Password: </label>
                &nbsp;{data.password}
              </div>
              <div className="col-md-3 form-group " id="DomainOff">
                <label>Domain: </label>
                &nbsp;{data.domain}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12">
                <br />
                <Link href="flight_officeid.php?action=edit&officeid_type=office_id&id=30">
                  <button type="button" className="btn btn-dark btn-sm">
                    <i
                      className="fa fa-pencil-square-o"
                      style={{ color: "white" }}
                    />
                    &nbsp;Edit
                  </button>
                </Link>
              </div>
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
export default connect(mapStateToProps)(FlightViewOfficeIds);
