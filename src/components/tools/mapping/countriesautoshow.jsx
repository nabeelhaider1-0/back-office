import { suppliersPreset } from "../../../constants/contants";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";

const CountriesAutoShow = () => {
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
                <a
                  href="ToolsMappingCountriesAutoShow.html"
                  class="btn btn-dark btn-sm"
                  type="button"
                  onclick="mapping_report('show')"
                  value="Show Report"
                >
                  <i class="fa fa-eye"></i>&nbsp;Show
                </a>
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
        <form className="mt-3">
          <div className="panel-body form-group removeMargins">
            <div className="dataTables_scroll">
              <div
                id="search_sup_wrapper"
                className="dataTables_wrapper form-inline dt-bootstrap no-footer"
              >
                <div className="row">
                  <div className="col-sm-10" />
                  <div className="col-sm-2">
                    <div id="search_sup_filter" className="dataTables_filter">
                      <label>
                        <h5 style={{ display: "inline" }}>
                          <i
                            className="fa fa-search srchWithinPg"
                            id="magnifier"
                            data-toggle="tooltip"
                            data-placement="top"
                            data-original-title="Search within this table"
                          />
                        </h5>
                        <input
                          type="search"
                          className="form-control input-sm"
                          placeholder
                          aria-controls="search_creadit_note"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div
                      className="dataTables_info"
                      id="search_sup_info"
                      role="status"
                      aria-live="polite"
                    >
                      Showing 1 to 227 of 227 entries
                    </div>
                  </div>
                  <div className="col-sm-6" />
                </div>
              </div>
              <br />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default CountriesAutoShow;
