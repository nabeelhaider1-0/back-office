import Header2 from "../../header2/header2";

const MastersOfferEdit = () => {
  return (
    <>
      <Header2
        title="UPDATE OFFER NAME"
        linkText1="Edit Applicable Offer Discounts"
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">


      <form>
  <div className="panel-body">
    <div className="row">
      <div className="col-sm-3 form-group">
        <label>OFFER NAME</label>
        <input type="text" className="form-control form-control-sm required test123" maxLength={100} name="offer_name" id="offer_name" defaultValue="Early Bird" />
      </div>
      <div className="col-sm-3 form-group">
        <label>OFFER TYPE CODE</label>
        <input type="hidden" maxLength={100} defaultValue="EBD" readOnly name="offer_type_code" id="offer_type_code" /><br />
        &nbsp;EBD
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-sm-6 form-group">
        <button type="button" className="btn btn-dark btn-sm" name="edit_button" onclick="check_validation();">
          <i className="fa fa-pencil-square-o" />	Update Data</button>
      </div>
    </div>
  </div>
</form>



      </div>
    </>
  );
};
export default MastersOfferEdit;
