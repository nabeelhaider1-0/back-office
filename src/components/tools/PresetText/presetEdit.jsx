import { add_options, agentOptions, pageOptions, serviceOptions, suppliersPreset } from "../../../constants/contants";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";






const PresetTextEdit = () => {
 


  return (
    <>
      <Header2 title="PRESET TEXT" linkText1="Preset Text" linkText2="Edit Preset Text" link1={Constants.URLConstants.TOOLSPRESETTEXT} />
      <div class="container-fluid pt-0 p-4" id="content-pad">
      <div>
      <form>
  <div className="panel-body">
  <div className="row">
                <div className="col-md-3 form-group">
                  <label>Label Name</label>
                  <input type="text" name="preset_name" size={10} className="form-control form-control-sm required test123" />
                </div>
                <div className="col-md-3 form-group">
                  <label>Page Name</label>
                  <MultiSelect
                    options={pageOptions}
                    isSearchable
                    placeholder="VOUCHER_PAGE"
                    className="custom-select required"
                    noOptionsMessage={() => "No Page Found"}
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Service Name</label>
                  <MultiSelect
                    options={serviceOptions}
                    isSearchable
                    isMulti
                    placeholder="Select Service"
                    className="custom-select required"
                    noOptionsMessage={() => "No Service Found"}
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Supplier</label>
                  <MultiSelect
                    options={suppliersPreset}
                    isSearchable
                    isMulti
                    placeholder=" - Select Supplier -"
                    className="custom-select required "
                    noOptionsMessage={() => "No Supplier Found"}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-3 form-group">
                  <label>Branch</label>
                  <MultiSelect
                    options={add_options}
                    isSearchable
                    isMulti
                    placeholder=" - Select Branch -"
                    className="custom-select"
                    noOptionsMessage={() => "No Branch Found"}
                  />
                </div>
                <div className="col-md-3 form-group">
                  <label>Agent</label>
                  <MultiSelect
                    options={agentOptions}
                    isSearchable
                    isMulti
                    placeholder=" - Select Agent -"
                    className="custom-select"
                    noOptionsMessage={() => "No Agent Found"}
                  />
                </div>
              </div>
    <div className="row">
      <div className="col-md-12 form-group phps_row_0">
        <label>Description</label>
        <textarea id="summernote" className="form-control form-control-sm" defaultValue={""} />
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-md-2 form-group">
        <button type="button" name="add" id="button" value="Add" className="btn btn-dark btn-sm form-group" onclick="add_preset_text()">
          <i className="fa fa-pencil" />
          &nbsp;Submit
        </button>
      </div>
    </div>
  </div>
</form>

</div>



      </div>
    </>
  );
};
export default PresetTextEdit;
