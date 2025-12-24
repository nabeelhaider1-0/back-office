
import { Link } from "react-router-dom";
import Header2 from "../../../header2/header2";
import Constants from "../../../../constants/routes";

const MastersSuppliersAutoCheckSupplier = () => {
  return (
    <>
      <Header2 title="AUTO CHECK SUPPLIER REPORT"/>
      <div class="container-fluid pt-0 p-4" id="content-pad">
 

      <div>
  <form>
    <div className="panel-body">
      <div className="row">
        <div className="col-md-3 form-group">
          <label style={{fontWeight: 700}}>Suppliers</label>
        </div>
        <div className="col-md-3 form-group">
          <label style={{fontWeight: 700}}>Destination</label>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-3 form-group">
          <p>hotelbeds,gta,whl,hilton</p>
        </div>
        <div className="col-md-3 form-group">
          <p>Dubai</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 form-group">
          <p>hotelbeds,whl</p>
        </div>
        <div className="col-md-3 form-group">
          <p />
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 form-group">
          <p>expedia,perpax</p>
        </div>
        <div className="col-md-3 form-group">
          <p>Bursa</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 form-group">
          <p>whl</p>
        </div>
        <div className="col-md-3 form-group">
          <p />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-3 form-group">
          <Link className="btn btn-dark btn-sm" to={Constants.URLConstants.MASTERSSUPPLIERSAUTOCHECKSUPPLIERSBUTTON}>
            <i className="fa fa-search" />Search
          </Link>
        </div>
      </div>
    </div>
  </form>
  <br />
  <form>
    <div className="panel-body">
      <div className="alert alert-danger text-center form-group"><h6>No Result Found.</h6></div>
    </div>
  </form>
</div>




      </div>
    </>
  );
};
export default MastersSuppliersAutoCheckSupplier;
