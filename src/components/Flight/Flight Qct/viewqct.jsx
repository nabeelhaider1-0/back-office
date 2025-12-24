import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import { connect } from "react-redux";
const FlightQctViewRule = ({ data }) => {
  return (
    <>
      <Header2
        title="VIEW QCT RULE DETAILS"
        linkText1="QCT Rules List"
        linkText2="View QCT Rule"
        link1={Constants.URLConstants.FLIGHTFLIGHTQCTSEARCHRULES}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad"></div>
      <form>
        <div className="panel-body">
          <div className="row">
            <div className="form-group col-md-2">
              <label>Journey Type</label>
              <div>
                {data.journeyType.join(" , ")}
                <br />
              </div>
            </div>
            <div className="form-group col-md-2">
              <label>Rule Type</label>
              <div>{data.ruleType}</div>
            </div>
            <div className="form-group col-md-2">
              <label>Booking PCC Id</label>
              <div>{data.bookingPCC}</div>
            </div>
            <div className="form-group col-md-2">
              <label>Ticketing PCC Id</label>
              <div>{data.ticketingPCC}</div>
            </div>
            <div className="form-group col-md-2">
              <label>Queue Identifier</label>
              <div>{data.queueIdentifier}</div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="form-group col-md-2">
              <label>Supplier</label>
              <div>{data.flightProvider}</div>
            </div>
            <div className="form-group col-md-2">
              <label>Status</label>
              <div>{data.status}</div>
            </div>
            <div className="form-group col-md-2">
              <label>Validity Date</label>
              <div>
                {data.DateFrom} - {data.DateTo}
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="form-group col-md-4">
              <label>From Country</label>
              <div>{data.fromCountry.join(" , ")}</div>
            </div>
            <div className="form-group col-md-4">
              <label>To Country</label>
              <div>{data.toCountry.join(" , ")}</div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="form-group col-md-4">
              <label>From Airport</label>
              <div>{data.fromAirport.join(" , ")}</div>
            </div>
            <div className="form-group col-md-4">
              <label>To Airport</label>
              <div>{data.toAirport.join(" , ")}</div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="form-group col-md-4">
              <label>Agent</label>
              <div>
                {data.agents.map((agent) => agent.agentName).join(" , ")}
                <br />
              </div>
            </div>
            <div className="form-group col-md-4">
              <label>Airline Suppliers</label>
              <div>{data.airline.join(" , ")}</div>
            </div>
          </div>
          <br />
        </div>
      </form>
    </>
  );
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps)(FlightQctViewRule);
