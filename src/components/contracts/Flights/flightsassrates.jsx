import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import Constants from "../../../constants/routes";
import { offlineSupplierOptions } from "../../../constants/contants";

const ContractsFlightsAddRates = () => {


  return (
    <>
      <Header2 title="SEARCH MAPPED FLIGHT" linkText1="List Mapped Flights" />
      <div class="container-fluid pt-0 p-4" id="content-pad">



        <form>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-3 form-group">
                <label>Supplier</label>
                <MultiSelect
                  options={offlineSupplierOptions}
                  isSearchable
                  placeholder="- Select Supplier -"
                  className="custom-select"
                  noOptionsMessage={() => "No Supplier Found"}
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Flight Number</label>
                <input type="text" className="form-control form-control-sm" name="Search_flight_number" />
              </div>
            </div>
            <br />
            <div className="row mt-3">
              <div className="col-md-12 form-group">
                <Link to={Constants.URLConstants.CONTRACTSFLIGHTSADDRATESSEARCH} ><button className="btn btn-dark btn-sm" type="button" onclick="javascriptcallSearch(document.forms['search_flight_from']);">
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
export default ContractsFlightsAddRates;
