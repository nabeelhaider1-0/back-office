import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";

const VIsaUploadVisa = () => {

  return (
    <>
      <Header2 title="UPLOAD VISA( ROHAN VARTAK )" linkText1="Visa Bookings" linkText2=" Upload Visa" link1={Constants.URLConstants.VISASERACHVISAREQUESTS} />
      <div class="container-fluid pt-0 p-4" id="content-pad">
     

      <form>
  <div className="panel-body">
    <div>
      <div className="row">
        <div className="form-group col-md-12">
          <div className="form-group col-md-12 row">
            <div className="phps_row_1">
              <div className="padd_5" align="left">
                <label>Visa File</label>
                <span className="uniqFile input-group"><span className="input-group-addon fa fa-upload myInputFile"><input type="file" size={30} name="passport_photo" id="passport_photo" className="test123" /></span></span>
              </div>
            </div>
            <div className="phps_row_0">
              <div className="padd_5 mt-4" align="left">
                <button className="btn btn-dark btn-sm form-group" type="submit" value="Save" onclick="return validate_form();">
                  <i className="fa fa-floppy-o" />
                  &nbsp;Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</form>





      </div>
    </>
  );
};
export default VIsaUploadVisa;
