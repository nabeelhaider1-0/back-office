import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import Constants from "../../../constants/routes";
import { suppliersPreset } from "../../../constants/contants";

const CountriesAuto = () => {
  return (
    <>
      <Header2 title="AUTO COUNTRY MAPPING" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form name="search_area_from" method="get" action="area.php">
          <div class="panel-body">
            <div class="form-group row">
              <div class="form-group col-md-3">
                <label>Supplier</label>
                <MultiSelect
                  options={suppliersPreset}
                  isSearchable
                  placeholder="- Select Supplier -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Supplier Found"}
                />
              </div>
            </div>

            <div class="row mt-3">
              <div class="form-group col-md-12">
                <Link
                  to={Constants.URLConstants.TOOLSMAPPINGCOUNTRIESAUTOSHOW}
                  class="btn btn-dark btn-sm"
                  type="button"
                  onclick="mapping_report('show')"
                  value="Show Report"
                >
                  <i class="fa fa-eye"></i>&nbsp;Show
                </Link>
                &nbsp;&nbsp;
                <button
                  class="btn btn-outline-secondary btn-sm"
                  type="button"
                  onclick="mapping_report('download')"
                  value="Download Report"
                  id="download_report"
                  style={{ display: "none" }}
                >
                  <i class="fa fa-download"></i>&nbsp;Download Report
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default CountriesAuto;
