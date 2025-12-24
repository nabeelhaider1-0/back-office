import { countries } from "../../../constants/Country-City-Data";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";


const CitiesManualEdit = () => {

  return (
    <>
      <Header2 title="Edit CITY" linkText1="Edit City" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
      <form>
  <div className="panel-body">
    <div className="row">
      <div className="col-md-3 form-group">
        <label>Country</label>
        <MultiSelect
                                    options={countries}
                                    isSearchable
                                    placeholder="- Select Country -"
                                    className="custom-select"
                                    noOptionsMessage={() => "No Country Found"}

                                />
      </div>
      <div className="col-md-3 form-group">
        <label>City Name</label>
        <input className="required form-control form-control-sm" type="text" name="txt_city_name" size={45} maxLength={255} defaultValue="Çamardı" />
        <input type="hidden" defaultValue={140388} name="city_id" />
        <input type="hidden" name="action" defaultValue="update_city_name" />
      </div>
      {/*<div class="col-md-3 form-group">
                  <label>City Code</label>
                  <input class="required form-control" type='text' name='txt_city_code' size='20' maxlength='10' onfocus="javascript:checkCity(document.forms['add_city_form'])" onblur="javascript:checkDuplicateCityCode()">
              </div>	*/}
    </div>
    <br />
    <div className="row">
      <div className="col-sm-3 form-group">
        <button type="button" className="btn btn-dark btn-sm" name="b1" id="b1" >
          <i className="fa fa-floppy-o" />&nbsp;Save
        </button>
      </div>
    </div>
  </div>
</form>

      </div>
    </>
  );
};
export default CitiesManualEdit;
