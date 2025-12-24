import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import { connect } from "react-redux";

const FlightPccViewRule = ({ data }) => {
  return (
    <>
      <Header2
        title="VIEW AGENTS OFFICE ID"
        linkText1="View"
        linkText2="Search"
        link2={Constants.URLConstants.FLIGHTFLIGHTPCCSEARCHRULES}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-3 form-group " id="agentsview">
                <label>Agent: </label>
                &nbsp;
                {data.agents.map((item) => item.agentName).join(" , ")}
              </div>
              <div className="col-md-3 form-group " id="agentsview2">
                <label>Label Status: </label>
                &nbsp;{data.status}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-3 form-group " id="supplierview">
                <label>Flight Provider: </label>
                &nbsp;{data.flightProvider}
              </div>
              <div className="col-md-3 form-group " id="Supplier">
                <label>Supplier: </label>
              </div>
              <div className="col-md-3 form-group " id="officeidview">
                <label>Office ID: </label>
                &nbsp;
                {data.officeIds.map((item) => item.officeID).join(" , ")}
              </div>
            </div>
            <br />
          </div>
        </form>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps)(FlightPccViewRule);
