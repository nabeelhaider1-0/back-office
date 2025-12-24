import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";


const serviceTypeOptions = [
  { label: 'Select Service Type', value: 'Select Service Type' },
  { label: 'Hotel', value: 'hotel' },
  { label: 'Sightseeing', value: 'sightseeing' },
  { label: 'Transfer', value: 'transfer' },
  { label: 'Misc', value: 'misc' },
  { label: 'Groups', value: 'groups' }
];



const MastersTaxesNew = () => {
  return (
    <>
      <Header2
        title="ADD NEW/EDIT TAX"
        linkText1="Tax List"
        linkText2="Add Tax"
        link1={Constants.URLConstants.MASTERSTAXESSEARCH}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form action="agent_service_tax.php" method="post" name="agent_tax_setting" id="agent_tax_setting">
          <input type="hidden" name="action" defaultValue="add_tax" />
          <input type="hidden" name="id" />
          <input type="hidden" id="projectname" name="projectname" />
          <div className="panel-body">
            <div>
              <div className="row">
                <div className="form-group col-md-4">
                  <label>Tax Name</label>
                  <input type="tax_name" name="tax_name" size={25} maxLength={30} className="form-control form-control-sm required test123" />
                </div>
                <div className="form-group col-md-4">
                  <label>Service Type</label>
                  <MultiSelect
                    options={serviceTypeOptions}
                    isSearchable
                    placeholder="- Select Service Type -"
                    className="custom-select required"
                    noOptionsMessage={() => "No Service Type Found"}

                  />
                </div>
                <div className="form-group col-md-4">
                  <label>Tax Value</label>
                  <div className="input-group col-md-12 col-xs-12 col-sm-12">
                    <input type="text" style={{ textAlign: 'right' }} name="tax_value" id="tax_value" size={5} defaultValue={0.00} onblur="extractNumber(this,2,false);" onkeyup="extractNumber(this,2,false);" className="form-control form-control-sm required" />
                    <span className="input-group-addon" style={{ color: "#fff" }}>%</span>
                  </div>
                </div>
                <div className="form-group col-md-5">
                  <label>Branch</label>
                  <select name="sel_amenities" id="sel_amenities" style={{ height: '200px' }} multiple size={10} className="form-control form-control-sm">
                    <option label="Mumbai Branch" value={1}>Mumbai Branch</option>
                    <option label="UAE Branch" value={2}>UAE Branch</option>
                    <option label="UK Head Office" value={3}>UK Head Office</option>
                    <option label="Head Office" value={4}>Head Office</option>
                    <option label="Dubai GSA" value={5}>Dubai GSA</option>
                    <option label="London Branch" value={6}>London Branch</option>
                    <option label="Saudi Branch" value={7}>Saudi Branch</option>
                    <option label="Dubai V3 Wh" value={8}>Dubai V3 Wh</option>
                    <option label="Pune Branch" value={9}>Pune Branch</option>
                    <option label="India - GSA" value={10}>India - GSA</option>
                    <option label="Test Branch1" value={11}>Test Branch1</option>
                    <option label="Test Branch" value={13}>Test Branch</option>
                    <option label="Testffff" value={14}>Testffff</option>
                    <option label="FRANCHISE BRANCH" value={15}>FRANCHISE BRANCH</option>
                    <option label="Jcholidays" value={16}>Jcholidays</option>
                    <option label="Demo" value={17}>Demo</option>
                    <option label="malaysia" value={19}>malaysia</option>
                    <option label="GSA Iraq" value={20}>GSA Iraq</option>
                    <option label="Chennai" value={21}>Chennai</option>
                    <option label="Bangkok Branch" value={22}>Bangkok Branch</option>
                    <option label="suhas_branch" value={23}>suhas_branch</option>
                    <option label="Istanbul" value={24}>Istanbul</option>
                    <option label="hyderabad" value={25}>hyderabad</option>
                    <option label="hyderabad_suhas" value={26}>hyderabad_suhas</option>
                    <option label="branch_suhas" value={27}>branch_suhas</option>
                    <option label="New Joint Branch" value={28}>New Joint Branch</option>
                    <option label="Bahrain Branch" value={29}>Bahrain Branch</option>
                    <option label="Branch Bahrain" value={30}>Branch Bahrain</option>
                    <option label="testdddd" value={31}>testdddd</option>
                    <option label="Demo" value={32}>Demo</option>
                    <option label="HotelConfirm" value={33}>HotelConfirm</option>
                    <option label="HotelConfirm_Live" value={34}>HotelConfirm_Live</option>
                    <option label="GSA Branch" value={37}>GSA Branch</option>
                    <option label="Testpp" value={38}>Testpp</option>
                    <option label="Bolton Branch" value={41}>Bolton Branch</option>
                    <option label="World Avenue" value={42}>World Avenue</option>
                    <option label="TEST_BRANCH_A" value={43}>TEST_BRANCH_A</option>
                    <option label="TEST_BRANCH_JV_A" value={44}>TEST_BRANCH_JV_A</option>
                    <option label="TEST_BRANCH_JV_C" value={45}>TEST_BRANCH_JV_C</option>
                    <option label="world_avenue_malesia" value={46}>world_avenue_malesia</option>
                    <option label="World Avenues Malaysia" value={47}>World Avenues Malaysia</option>
                    <option label="test_branch_jv" value={48}>test_branch_jv</option>
                    <option label="1 Booking" value={49}>1 Booking</option>
                  </select>
                </div>
                <div className="col-md-2 text-center">
                  <input type="button" className="btn w-xs btn-dark" onclick="javaScript left_to_right();" defaultValue=">>" style={{ marginTop: '2em', paddingLeft: '40px', paddingRight: '40px' }} />
                  <br />
                  <br />
                  <input type="button" className="btn w-xs btn-dark" onclick="javaScript right_to_left();" defaultValue="<<" style={{ marginTop: '2em', paddingLeft: '40px', paddingRight: '40px' }} />
                </div>
                <div className="form-group col-md-5">
                  <label>Apply this tax to</label>
                  <select name="sel_right_members[]" id="sel_right_members[]" style={{ height: '200px' }} multiple size={10} className="form-control form-control-sm">
                  </select>
                  <p><b>Note</b>: When Branch is been selected TAX will be applicable to all Agents and sub
                    agents of the particular Selected branch</p>
                </div>
              </div>
              <div className="form-group col-md-4">
                <label>Enter GST details here</label>
                <textarea name="gst_details" id="gst_details" rows={4} cols={50} className="form-control form-control-sm" defaultValue={""} />
              </div>
              <div className="row mt-3">
                <div className="form-group col-md-12">
                  <button type="button" name="b1" value="SUBMIT" onclick="Javascript submit_form(document.forms['agent_tax_setting'],'add_tax');" className="btn btn-dark btn-sm">
                    <i className="fa fa-floppy-o" />
                    &nbsp;Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>


      </div>
    </>
  );
};
export default MastersTaxesNew;
