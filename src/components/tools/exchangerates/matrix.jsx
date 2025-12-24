import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import Constants from "../../../constants/routes";
import { currencyMarkup } from "../../../constants/contants";

const Matrixrate = () => {
  return (
    <>
      <Header2 title="EDIT CURRENCY MARKUP" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div class="panel-body">
            <form
              action="exchange_rates.php"
              name="markup_currency"
              method="post"
            >
              <input
                type="hidden"
                name="action"
                value="update_markup_currency"
              />
              <div class="mesID" id="dispMsg"></div>
              <div class="row">
                <div class="col-md-4">
                  <div class="row">
                    <div class="col-md-12 form-group">
                      <label>Currency Markup</label>
                      <MultiSelect
                        options={currencyMarkup}
                        isSearchable
                        placeholder="- Select -"
                        noOptionsMessage={() => "No Currency Markup % Found"}
                        className="custom-select"
                      />
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-md-5 form-group">
                      <button
                        type="button"
                        class="btn btn-dark btn-sm"
                        value="Save"
                        onclick="ajax_submit_currency()"
                      >
                        <i class="fa fa-floppy-o"></i>&nbsp;Save
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 form-group"></div>
                <div class="col-md-2 form-group">
                  <Link to={Constants.URLConstants.TOOLSCALCULATOR}>
                    <button
                      type="button"
                      class="btn btn-dark btn-sm pull-right"
                    >
                      <i class="fa fa-reply"></i>&nbsp;Go to Exchange Rate
                      Conversion
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </form>

        <br />
        <div class="panel-body removeMargins">
          <form
            action="exchange_rates.php"
            method="post"
            name="currency_matrix"
            id="currency_matrix"
          >
            <div class="dataTables_scroll">
              <div class="row pd_tp">
                <div class="row">
                  <div class="col-md-4 col_hide">&nbsp;</div>
                  <div class="col-md-5 col_hide">
                    <div class="form-group"></div>
                  </div>
                  <div class="col-md-3">
                    <div
                      class="form-group col-md-2 new_search_icon"
                      style={{ textAlign: "right", paddingRight: "0px" }}
                    >
                      <h5 style={{ display: "inline" }}>
                        <i
                          class="fa fa-search srchWithinPg"
                          id="magnifiers"
                          data-toggle="tooltip"
                          data-placement="top"
                          data-original-title="Search within this table"
                        ></i>
                      </h5>
                    </div>
                    <div class="form-group col-md-10 bookingsrc">
                      <input
                        type="text"
                        class="tablesearch form-control form-control-sm search_new"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>
              </div>

            
              <div class="form-group no-result">
                <h5 class="text-center">No Result Found.</h5>
              </div>

              <div class="row pd_tp">
                <div class="row">
                  <div class="col-md-4">&nbsp;</div>
                  <div class="col-md-5">
                    <div class="form-group"></div>
                  </div>
                  <div class="col-md-3">&nbsp;</div>
                </div>
              </div>
              <div class="form-group">
                <button
                  type="button"
                  class="btn btn-dark btn-sm"
                  value="Submit"
                  name="B1"
                  id="sub_btn"
                >
                  <i class="fa fa-check"></i>&nbsp;Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Matrixrate;
