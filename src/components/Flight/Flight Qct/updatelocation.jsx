import { cancel_options } from "../../../constants/contants";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";

const FlightQctUpdateLocation = () => {
  return (
    <>
      <Header2 title="ADD/UPDATE DESTINATION" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-2 form-group">
                <label>Destination Id</label>
                <input
                  className="form-control form-control-sm required test123"
                  type="text"
                  id="destination_id"
                  name="destination_id"
                  defaultValue="DXB"
                  maxLength={100}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Markup Type</label>
                <MultiSelect
                  options={cancel_options}
                  isSearchable
                  placeholder="- Select Markup -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Markup Found"}
                />
              </div>
              <div className="col-md-2 form-group">
                <label>Markup</label>
                <input
                  type="text"
                  name="markup"
                  id="markup"
                  defaultValue={100}
                  maxLength={25}
                  className="form-control form-control-sm required"
                  onblur="return removeError(this.id);"
                  onkeypress="return IsNumeric(event,this);"
                  ondrop="return false;"
                />
                <span
                  id="markup_error"
                  style={{ color: "Red", display: "none" }}
                >
                  *Please enter numeric value
                </span>
                <br />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-2 form-group">
                <span id="submit_td">
                  <button
                    className="btn btn-dark btn-sm"
                    type="button"
                    name="btnSubmit"
                    value="add"
                    onclick="JavascriptsubmitForm(document.forms['destination_form']);"
                  >
                    Save
                  </button>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default FlightQctUpdateLocation;
