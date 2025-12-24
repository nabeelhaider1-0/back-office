
import { Link } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import { AirlineOptions, aircraftOptions, allowedBagTypeOptions, allowedUnitOptions, daysOptions, departureHourOptions, departureMinOptions, destinationOptions, durationHourOptions, durationMinOptions, infantAgeOptions, infantAgeUpOptions } from "../../../constants/contants";


const ContractsFlightsEditList = () => {
    
  return (
    <>
      <Header2 title="EDIT FLIGHT" linkText1="Flight List" linkText2="Edit List" link1={Constants.URLConstants.CONTRACTSFLIGHTSSEARCHBUTTON}/>
      <div class="container-fluid pt-0 p-4" id="content-pad">

      <form name="add_flight_form" action="flight.php" method="post" onsubmit="return validateme();">
          <input type="hidden" name="action" defaultValue="insert" />
          <input type="hidden" name="goahead" defaultValue="true" />
          <input id="txt_infant_age_from" name="txt_infant_age_from" type="hidden" defaultValue={0} />
          <input id="txt_infant_age_to" name="txt_infant_age_to" type="hidden" defaultValue={2} />
          <input id="txt_child_age_from" name="txt_child_age_from" type="hidden" defaultValue={3} />
          <input id="txt_child_age_to" name="txt_child_age_to" type="hidden" defaultValue={12} />
          <input id="txt_duration_hour" name="txt_duration_hour" type="hidden" />
          <input id="txt_duration_min" name="txt_duration_min" type="hidden" />
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label>Airline</label>
                <MultiSelect
                  options={AirlineOptions}
                  isSearchable
                  placeholder="- Select Airline -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Airline Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Flight Number</label>
                <input id="flight_number" name="flight_number" type="text" size={45} className="form-control form-control-sm required" maxLength={20} onkeyup="JavascriptduplicateFlightNumber(this.value)" />
              </div>
              <div className="form-group col-md-3">
                <label>Destination From</label>
                <MultiSelect
                  options={destinationOptions}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Destination Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Destination To</label>
                <MultiSelect
                  options={destinationOptions}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Destination Found"}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="form-group col-md-3">
                <label>Aircraft</label>
                <MultiSelect
                  options={aircraftOptions}
                  isSearchable
                  placeholder="- Select Aircraft -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Aircraft Found"}
                />
              </div>
            </div>
            <input type="hidden" name="last_shown" id="last_shown" defaultValue={1} />
            <div className="row mt-3" id="pd1">
              <div className="form-group col-md-2">
                <label>Bag Type</label>
                <MultiSelect
                  options={allowedBagTypeOptions}
                  isSearchable
                  placeholder="- Select Bag Type -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Bag Type Found"}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Bag Unit</label>
                <MultiSelect
                  options={allowedUnitOptions}
                  isSearchable
                  placeholder="- Select Bag Unit -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Bag Unit Found"}
                />
              </div>
              <div className="form-group col-md-2 allowed_quantity1" style={{ display: 'none' }}>
                <label className="value_label1" />
                <input id="allowed_quantity1" name="allowed_quantity[1]" defaultValue type="text" size={45} className="form-control form-control-sm required" maxLength={3} onkeyup="extractNumber(this,3,true);" />
              </div>
              <div className="form-group col-md-2 peice_val1" style={{ display: 'none' }}>
                <label>Width</label>
                <input id="allowed_bag_width1" name="allowed_bag_width[1]" defaultValue type="text" size={45} className="form-control form-control-sm" maxLength={2} onkeyup="extractNumber(this,3,true);" />
              </div>
              <div className="form-group col-md-2 peice_val1" style={{ display: 'none' }}>
                <label>Height</label>
                <input id="allowed_bag_height1" name="allowed_bag_height[1]" defaultValue type="text" size={45} className="form-control form-control-sm" maxLength={2} onkeyup="extractNumber(this,3,true);" />
              </div>
              <div className="form-group col-md-2">
                <Link className="input-group-addon" style={{ color: 'black', padding: '10px!important', cursor: 'pointer' }} id="plus" onclick="plus_func();"><i className="fa fa-plus" /></Link>
                <Link className="input-group-addon" id="minus" onclick="minus_func()" style={{ display: 'none' }}><i className="fa fa-minus" /></Link>
              </div>
            </div>
            <div className="row" id="pd2" style={{ display: 'none' }}>
              <div className="form-group col-md-2">
                <label>Bag Type</label>
                <MultiSelect
                  options={allowedBagTypeOptions}
                  isSearchable
                  placeholder="- Select Bag Type -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Bag Type Found"}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Bag Unit</label>
                <MultiSelect
                  options={allowedUnitOptions}
                  isSearchable
                  placeholder="- Select Bag Unit -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Bag Unit Found"}
                />
              </div>
              <div className="form-group col-md-2 allowed_quantity2">
                <label className="value_label2" />
                <input id="allowed_quantity2" name="allowed_quantity[2]" defaultValue type="text" size={45} className="form-control required" maxLength={3} onkeyup="extractNumber(this,3,true);" />
              </div>
              <div className="form-group col-md-2 peice_val2">
                <label>Width</label>
                <input id="allowed_bag_width2" name="allowed_bag_width[2]" defaultValue type="text" size={45} className="form-control" maxLength={2} onkeyup="extractNumber(this,3,true);" />
              </div>
              <div className="form-group col-md-2 peice_val2">
                <label>Height</label>
                <input id="allowed_bag_height2" name="allowed_bag_height[2]" defaultValue type="text" size={45} className="form-control" maxLength={2} onkeyup="extractNumber(this,3,true);" />
              </div>
              <div className="form-group col-md-2">
              </div>
            </div>
            <div className="row mt-3">
              <div className="form-group col-md-2">
                <label>Infant Age From</label>
                <MultiSelect
                  options={infantAgeOptions}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Age Found"}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Infant Age To</label>
                <MultiSelect
                  options={infantAgeUpOptions}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Age Found"}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Child Age From</label>
                <MultiSelect
                  options={infantAgeUpOptions}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Age Found"}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Child Age To</label>
                <MultiSelect
                  options={infantAgeUpOptions}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Age Found"}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Number of Days</label>
                <MultiSelect
                  options={daysOptions}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Days Found"}
                />
              </div>

            </div>
            <div className="row mt-3">
              <div className="form-group col-md-2">
                <label>Departure Time in Hours</label>
                <MultiSelect
                  options={departureHourOptions}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Departure Found"}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Departure Time in Mins</label>
                <MultiSelect
                  options={departureMinOptions}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Departure Found"}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Arrival Time in Hours</label>
                <MultiSelect
                  options={departureHourOptions}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Arrival Found"}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Arrival Time in Mins</label>
                <MultiSelect
                  options={departureMinOptions}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Arrival Found"}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Total Duration in Hours</label>
                <MultiSelect
                  options={durationHourOptions}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Duration Found"}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Total Duration in Mins</label>
                <MultiSelect
                  options={durationMinOptions}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Duration Found"}
                />
              </div>
            </div>
            <br />
            <button type="submit" className="btn btn-dark btn-sm " name="add" value="SUBMIT">
              <i className="fa fa-floppy-o" />&nbsp;Save
            </button>
          </div>
        </form>





      </div>
    </>
  );
};
export default ContractsFlightsEditList;
