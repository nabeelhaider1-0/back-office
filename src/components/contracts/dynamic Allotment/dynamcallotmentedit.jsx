import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";


const ContractsDynamicAllotmentEdit = () => {

  return (
    <>
      <Header2 title="EDIT STAGGERED RULES" linkText1="Search Dynamic Allotment Rule" link1={Constants.URLConstants.CONTRACTSHOTELSDYNAMICALLOTMENTSEARCH}/>
      <div class="container-fluid pt-0 p-4" id="content-pad">


      <div>
  <form>
    <div className="panel-body">
      <div className="clearfix" />
      <div className="row">
        <div className="form-group col-md-3">
          <label>Supplier</label>
          <div>Nirvana Tour</div>
        </div>
        <div className="form-group col-md-3">	
          <label>Hotel</label>
          <div>ABC Arabian Suites</div>
        </div>
        <div className="form-group col-md-3">
          <label>Inventory Room Class</label>
          <div>Standard</div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="form-group col-md-3">
          <label>From Date</label>
          <input type="text" className="form-control from_date required test123" name="txt_from_date" id="txt_from_date" defaultValue="03-10-2019" placeholder="From" disabled="true" />
        </div>
        <div className="form-group col-md-3">
          <label>To Date</label>
          <input type="text" className="form-control from_date required" name="txt_to_date" id="txt_to_date" defaultValue="31-10-2020" placeholder="To" disabled="true" />
        </div>
      </div>
      <div className="row">
        <input type="hidden" name="main_id[]" defaultValue={16} />
        <div className="form-group col-md-3">
          <label>Day Difference</label>&nbsp;<i className="fa fa-info-circle" title data-toggle="tooltip" data-placement="top" data-original-title="Note : Day difference is day between check in and booking date" />
          <input type="text" className="form-control required day-diff" name="txt_days[]" id="txt_days1" defaultValue={1} placeholder="Day Difference" />
        </div>
        <div className="form-group col-md-3">
          <label>Allotment</label>&nbsp;<i className="fa fa-info-circle" title data-toggle="tooltip" data-placement="top" data-original-title="Note: Allotment is nothing but no.of rooms.	" />
          <input type="text" className="form-control required" name="txt_allotment[]" id="txt_allotment1" defaultValue={1000} placeholder="Allotment" />	
        </div>	
      </div>
      <input type="hidden" name="id[]" defaultValue />
      <input type="hidden" id="last_shown_cancellation" defaultValue={1} />
      <input type="hidden" name="action" defaultValue="update_staggered_inventory" />
      <input type="hidden" name="supplier_id" defaultValue="S000000002" />
      <input type="hidden" name="hotel_id" defaultValue={46586} />
      <input type="hidden" name="inventory_class_id" defaultValue={2} />
      <input type="hidden" name="from_date" defaultValue="2019-10-03" />
      <input type="hidden" name="to_date" defaultValue="2020-10-31" />
      <div className="row mt-2">
        <div className="form-group col-md-3">
          <input type="button" className="btn btn-dark btn-sm" name="add" defaultValue="Save" onclick="Javascript submit_form(document.forms['edit_stagger_inventory_form'],false,'edit');" />
        </div>
      </div>
    </div></form>
  <style dangerouslySetInnerHTML={{__html: "\n.form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {\n    cursor: not-allowed;\n    background-color: #eee;\n    opacity: 1;}\n\n        " }} />
</div>







      </div>
    </>
  );
};
export default ContractsDynamicAllotmentEdit;
