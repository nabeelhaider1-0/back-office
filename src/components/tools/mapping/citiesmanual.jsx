import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { countries } from "../../../constants/Country-City-Data";
import Constants from "../../../constants/routes";

const CitiesManual = () => {
  return (
    <>
      <Header2 title="SEARCH CITY" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3 form-group">
                <label>Country</label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select"
                  noOptionsMessage={() => "No Country Found"}

                />
              </div>
              <div class="col-md-3 form-group">
                <label>City Name</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  name="Search_city_name"
                  size="30"
                />
              </div>
              <div class="col-md-3 form-group">
                <label>City Code</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  name="Search_city_code"
                  size="20"
                />
              </div>
            </div>

            <div class="row mt-2">
              <div class="col-md-3">
                <div class="row">
                  <div class="col-md-6 form-group">
                    <label>Miki Code</label>
                    <br />
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-xs btn-dark"
                        value="Area Code Active"
                        name="areaCode"
                        title=""
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="Area Code Active"

                      >
                        <h6>
                          <i class="fa fa-check-circle fa-xs"></i>
                        </h6>
                      </button>
                      <button
                        type="button"
                        class="btn btn-xs btn-default"
                        value="Area Code Inactive"
                        name="UnareaCode"
                        title=""
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="Area Code Inactive"

                      >
                        <h6>
                          <i class="fa fa-times-circle fa-xs"></i>
                        </h6>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-3 form-group">
                <Link to={Constants.URLConstants.TOOLSMAPPINGCITIESMANUALSERACH}>
                  <button
                    type="button"
                    class="btn btn-dark btn-sm"
                    value="Search"

                  >
                    <i class="fa fa-search"></i>&nbsp;Search
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </form>
        <div
          class="alert alert-warning"
          style={{ color: '#8a6d3b', backgroundColor: '#fcf8e3', fontSize: '11px' }}>
          Use Search Criteria to Match Your Requirement.
        </div>
      </div>
    </>
  );
};
export default CitiesManual;
