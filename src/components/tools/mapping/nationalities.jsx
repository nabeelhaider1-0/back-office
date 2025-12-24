
import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import Constants from "../../../constants/routes";
import { nationalityoptions } from "../../../constants/contants";




const NationalitiesMappingReport = () => {

  return (
    <>
      <Header2 title="NATIONALITY MAPPING REPORT" />
      <div class="container-fluid pt-0 p-4" id="content-pad">

        <form>
          <div className="panel-body">
            <div className="row form-group">
              <div className="form-group col-md-3">
                <label>Suppplier</label>
                <MultiSelect
                  options={nationalityoptions}
                  isSearchable
                  placeholder="- Select Supplier -"
                  noOptionsMessage={() => "No Supplier Found"}
                  className="custom-select required"

                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="form-group col-md-12">
                <Link to={Constants.URLConstants.TOOLSMAPPINGNATIONALITIESREPORTSHOW} className="btn btn-dark btn-sm" onclick="mapping_report('show')" value="Show Report">
                  <i className="fa fa-eye" />&nbsp;Show
                </Link>
              </div>
            </div>
          </div>
        </form>

      </div>
    </>
  );
};
export default NationalitiesMappingReport;
