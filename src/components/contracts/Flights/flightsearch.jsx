
import { Link } from "react-router-dom";
import MultiSelect from "../../reactMultiSelect";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import { AirlineOptions } from "../../../constants/contants";





const ContractsFlightsSearch = () => {
    
  return (
    <>
      <Header2 title="SEARCH FLIGHT" linkText1="Flight List" linkText2="Add List" link2={Constants.URLConstants.CONTRACTSFLIGHTSADDLIST} />
      <div class="container-fluid pt-0 p-4" id="content-pad">



      <form>
  <div className="panel-body">
    <div className="row mt-2">
      <div className="form-group col-md-3">
        <label>Airline</label>
        <MultiSelect
                  options={AirlineOptions}
                  isSearchable
                  placeholder="- Select Airline -"
                  className="custom-select"
                  noOptionsMessage={() => "No Airline Found"}
                />
      </div>
      <div className="col-md-3 form-group">
        <label>Flight Number</label>
        <input type="text" className="form-control form-control-sm" name="Search_flight_number" size={20} />
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-md-3 form-group">
        <Link to={Constants.URLConstants.CONTRACTSFLIGHTSSEARCHBUTTON}><button type="button" className="btn btn-dark btn-sm" value="Search" onclick="javascriptcallSearch(document.forms['search_flight_form']);">
            <i className="fa fa-search" />&nbsp;Search
          </button></Link>
      </div>
    </div>
  </div>
</form>





      </div>
    </>
  );
};
export default ContractsFlightsSearch;
