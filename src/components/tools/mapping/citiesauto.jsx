import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { countries } from "../../../constants/Country-City-Data";
import Constants from "../../../constants/routes";
import {
  citiesNamesOptions,
  citiesResultsOptions,
  suppliersPreset,
} from "../../../constants/contants";

const CitiesAuto = () => {
  return (
    <>
      <Header2 title="AUTO CITY MAPPING" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="form-group row">
              <div className="form-group col-md-3">
                <label>Supplier</label>
                <MultiSelect
                  options={suppliersPreset}
                  isSearchable
                  placeholder="- Select Supplier -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Supplier Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Country</label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Country Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Results</label>
                <MultiSelect
                  options={citiesResultsOptions}
                  isSearchable
                  placeholder="All"
                  className="custom-select"
                  noOptionsMessage={() => "No Results Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>City Name Filter</label>
                <MultiSelect
                  options={citiesNamesOptions}
                  isSearchable
                  placeholder="Select City Start Name"
                  className="custom-select"
                  noOptionsMessage={() => "No City Name Found"}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="form-group col-md-12">
                <Link
                  to={Constants.URLConstants.TOOLSMAPPINGCITIESAUTOSHOW}
                  className="btn btn-dark btn-sm"
                  type="button"
                  onclick="mapping_report('show')"
                  value="Show Report"
                >
                  <i className="fa fa-eye" />
                  &nbsp;Show
                </Link>
                &nbsp;&nbsp;
                <button
                  className="btn btn-outline-secondary btn-sm"
                  type="button"
                  onclick="mapping_report('download')"
                  value="Download Report"
                  id="download_report"
                  style={{ display: "none" }}
                >
                  <i className="fa fa-download" />
                  &nbsp;Download Report
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default CitiesAuto;
