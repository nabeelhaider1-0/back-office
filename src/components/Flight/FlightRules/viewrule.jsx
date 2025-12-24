import { connect } from "react-redux";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";

const FlightViewRule = ({ data }) => {
  return (
    <>
      <Header2
        title="VIEW RULE DETAILS"
        linkText1="Rule List"
        linkText2="View rule"
        linkText3="Edit Rule"
        link1={Constants.URLConstants.FLIGHTFLIGHTSEARCHRULES}
        link3={Constants.URLConstants.FLIGHTFLIGHTEDITRULES}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-2">
                <label>Rule Identifier</label>
                <div>{data.ruleIdentifier}</div>
              </div>
              <div className="form-group col-md-2">
                <label>Applied On</label>
                <div>{data.ruleAppliedOn}</div>
              </div>
              <div className="form-group col-md-2">
                <label>Rule Type</label>
                {data.ruleType.map((rule, index) => (
                  <div key={index}>{rule}</div>
                ))}
              </div>
              <div className="form-group col-md-2">
                <label>Charge Type</label>
                <div>{data.markupBy}</div>
              </div>
              <div className="form-group col-md-2">
                <label>Charge Amount</label>
                <div>{data.charges} </div>
              </div>
              <div className="form-group col-md-2">
                <label>Status</label>
                <div>{data.status}</div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12">
                <div className="form-group col-md-4">
                  <label>Agent</label>
                  {data.agents.map((agent, index) => (
                    <div key={index}>{agent.agentName}</div>
                  ))}
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12"></div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12"></div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12">
                <div className="form-group col-md-2">
                  <label>Pax Range</label>
                  <div>
                    {data.paxRangeFrom} - {data.paxRangeTo}
                  </div>
                </div>
              </div>
            </div>
            {/* <br/>
					<div class='row'>
						<div class="col-md-12">
							<div class="form-group col-md-3">
								<label>Remarks</label>
								<div>
																			&mdash;
																	</div>
							</div>
						</div>
					</div> */}
          </div>
        </form>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps)(FlightViewRule);
