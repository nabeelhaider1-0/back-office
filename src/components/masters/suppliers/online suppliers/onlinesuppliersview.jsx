import Constants from "../../../../constants/routes";
import Header2 from "../../../header2/header2";

const MastersSuppliersOnlineSuppliersView = () => {
  return (
    <>
      <Header2 title="SUPPLIER DETAILS" linkText1="List Suppliers" linkText2="View Suppliers" link1={Constants.URLConstants.MASTERSSUPPLIERSONLINESUPPLIERSSEARCH} />
      <div class="container-fluid pt-0 p-4" id="content-pad">

      <form>
  <div className="panel-body">
    <div className="row">
      <div className="form-group col-md-3">
        <label>Company Name</label>
        <div>
          Agoda
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Supplier Code</label>
        <div>
          agoda
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Name</label>
        <div>
          Samiksha&nbsp;&nbsp;Qtech
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Address</label>
        <div>
          None </div>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-3">
        <label>Country</label>
        <div>
          138
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>City</label>
        <div>
          71649
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Pincode</label>
        <div>
          None
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Time Zone</label>
        <div>
          GMT +0:00 Hours (11:43 AM)
        </div>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-3">
        <label>Phone Number</label>
        <div>
          None
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Mobile Number</label>
        <div>
          4343434343
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Email</label>
        <div>
          samiksha@qtechsoftware.com
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>B2B Availability Timeout</label>
        <div>
          20
        </div>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-3">
        <label>B2C Availability Timeout</label>
        <div>
          20
        </div>
      </div>

    </div>
  </div>
</form>



      </div>
    </>
  );
};
export default MastersSuppliersOnlineSuppliersView;
