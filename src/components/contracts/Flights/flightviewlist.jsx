import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";

const ContractsFlightsViewList = () => {
    
  return (
    <>
      <Header2 title="VIEW FLIGHT" linkText1="Flight List" linkText2="View List" link1={Constants.URLConstants.CONTRACTSFLIGHTSSEARCHBUTTON}/>
      <div class="container-fluid pt-0 p-4" id="content-pad">

      <form>
  <div className="panel-body">
    <div className="row">
      <div className="form-group col-md-3">
        <label>Airline</label>
        <div>
          Air India
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Flight Number</label>
        <div>
          CharterFlight_2022
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Destination From</label>
        <div>
          Chhatrapati Shivaji
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Destination To</label>
        <div>
          Dubai Intl Arpt
        </div>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-3">
        <label>Aircraft</label>
        <div>
          BOEING 737-600
        </div>
      </div>
      {/* <div class="form-group col-md-3">
          <label>Allowed Baggage Unit</label><br/>
          <div>
                                              &mdash;
                                          </div>
      </div>
      
      <div class="form-group col-md-3">
          <label>Allowed Baggage Quantity</label>
          <div>
                                                  &mdash;
                                          </div>
      </div> */}
      <div className="form-group col-md-3">
        <label>Infant Age</label>
        <div>
          2
        </div>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-3">
        <label>Child Age</label>
        <div>
          12
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Departure Time</label>
        <div>
          02:00:00
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Arrival Time</label>
        <div>
          05:00:00
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Total Duration</label>
        <div>
          03:00:00
        </div>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-3">
        <label>Bag Type</label>
        <div>
          free
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Bag Unit</label>
        <div>
          KG
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Value</label>
        <div>
          10
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Width</label>
        <div>
          —
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Height</label>
        <div>
          —
        </div>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-3">
        <label>Bag Type</label>
        <div>
          cabin
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Bag Unit</label>
        <div>
          KG
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Value</label>
        <div>
          20
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Width</label>
        <div>
          —
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Height</label>
        <div>
          —
        </div>
      </div>
    </div>
  </div>
</form>





      </div>
    </>
  );
};
export default ContractsFlightsViewList;
