import Constants from "../../../../constants/routes";
import Header2 from "../../../header2/header2";

const MastersSuppliersOfflineSupplierChangePassword = () => {
  return (
    <>
      <Header2 title="CHANGE PASSWORD" linkText1="List Offline Suppliers" linkText2="Edit Offline Supplier" link1={Constants.URLConstants.MASTERSSUPPLIERSOFFLINESUPPLIERSSEARCH} />
      <div class="container-fluid pt-0 p-4" id="content-pad">

      <form>
  <div className="panel-body">
    <div className="row">
      <div className="form-group col-md-3">
        <label>Username</label>
        <div>
          Ahmed
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Password</label>
        <input className="required form-control form-control-sm test123" type="password" name="txt_password" id="txt_password" size={45} defaultValue maxLength={15} />
      </div>
      <div className="form-group col-md-3">
        <label>Confirm Password</label>
        <input className="required form-control form-control-sm" type="password" name="txt_confirm_password" size={45} defaultValue maxLength={15} />
      </div>
    </div>
    <div className="form-group col-md-12 mt-2">
      <button className="btn btn-dark btn-sm" type="button" name="b1" value="SUBMIT" onclick="Javascriptsubmit_form(document.forms['forgot_password_form']);">
        <i className="fa fa-floppy-o" />
        &nbsp;&nbsp;Save
      </button>
      <span id="loading" style={{display: 'none'}}><img src="images/loading.gif" alt="" /></span>
    </div>
  </div>
</form>

      </div>
    </>
  );
};
export default MastersSuppliersOfflineSupplierChangePassword;
