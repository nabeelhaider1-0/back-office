import Header2 from "../../header2/header2";

const CitiesManualSupplier = () => {

  return (
    <>
      <Header2 title="CITY MAPPING"  />
      <div class="container-fluid pt-0 p-4" id="content-pad">
      
  <form>
    <div className="panel-body">
      <div className="row">
        <div className="form-group col-md-4">
          <label>City Name</label>
          <div>Çamardı</div>
        </div>
        <div className="form-group col-md-4">
          <label>City Code</label>
          <div>93_3000400610_18885_140387</div>
        </div>
        <div className="form-group col-md-4">
          <label>Country</label>
          <div>Turkey</div>
        </div>
      </div>
    </div>
  </form>
  <form className="mt-2">
    <div className="panel-body">
      <div className="row">
        <div className="form-group col-md-8">
          <select title="Select Suppliers" id="supplier" name="supplier[]" className="selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden" multiple data-live-search="true" data-actions-box="true">
            <option value="agoda" selected>Agoda</option>
            <option value="amadeus" selected>Amadeus Flight</option>
            <option value="localflight" selected>Contracted Flight</option>
            <option value="dhisco" selected>Dhisco</option>
            <option value="dotw" selected>Dotw</option>
            world
            <option value="expedia">Expedia</option>
            <option value="group" selected>Groups</option>
            <option value="hotelbeds" selected>Hotelbeds</option>
            <option value="hbsight" selected>Hotelbeds Sightseeing (test)</option>
            <option value="hotelbedstransfer" selected>Hotelbeds Transfer</option>
            <option value="miki" selected>Miki</option>
            <option value="Package Supplier" selected>Minal_qtech_test</option>
            <option value="mystifly" selected>Mystifly</option>
            <option value="redapple" selected>Redapple Travel</option>
            <option value="restel" selected>Restel</option>
            <option value="sabre" selected>Sabre Flight</option>
            <option value="Snehal" selected>Snehal Testing</option>
            <option value="tboholidays" selected>Tboholidays</option>
            world
            <option value="travco">Travco</option>
            <option value="whitesands" selected>Whitesands</option>
          </select>
        </div>
        <div className="form-group col-md-4">
          <button type="button" className="btn btn-dark btn-sm" id="submit-selected-supplier">Map
            City</button>
        </div>
      </div>
    </div>
  </form>
  <form className="mt-2">
    <div className="panel-body">
      <div className="row">
        <div className="form-group col-md-4">
          <label>AGODA Code</label>
          <div style={{wordWrap: 'break-word'}}>
            <div className="text-danger">NA</div>
          </div>
        </div>
        <div className="form-group col-md-4">
          <label>AMADEUS FLIGHT Code</label>
          <div style={{wordWrap: 'break-word'}}>
            <div className="text-danger">NA</div>
          </div>
        </div>
        <div className="form-group col-md-4">
          <label>CONTRACTED FLIGHT Code</label>
          <div style={{wordWrap: 'break-word'}}>
            <div className="text-danger">NA</div>
          </div>
        </div>
        <div className="form-group col-md-4">
          <label>DHISCO Code</label>
          <div style={{wordWrap: 'break-word'}}>
            <div className="text-danger">NA</div>
          </div>
        </div>
        <div className="form-group col-md-4">
          <label>DOTW Code</label>
          <div style={{wordWrap: 'break-word'}}>
            <div className="text-danger">NA</div>
          </div>
        </div>
        <div className="form-group col-md-4">
          <label>EXPEDIA Code</label>
          <div style={{wordWrap: 'break-word'}}>
            3000400610 </div>
        </div>
        <div className="form-group col-md-4">
          <label>GROUPS Code</label>
          <div style={{wordWrap: 'break-word'}}>
            <div className="text-danger">NA</div>
          </div>
        </div>
        <div className="form-group col-md-4">
          <label>HOTELBEDS Code</label>
          <div style={{wordWrap: 'break-word'}}>
            <div className="text-danger">NA</div>
          </div>
        </div>
        <div className="form-group col-md-4">
          <label>HOTELBEDS SIGHTSEEING (TEST) Code</label>
          <div style={{wordWrap: 'break-word'}}>
            <div className="text-danger">NA</div>
          </div>
        </div>
        <div className="form-group col-md-4">
          <label>HOTELBEDS TRANSFER Code</label>
          <div style={{wordWrap: 'break-word'}}>
            <div className="text-danger">NA</div>
          </div>
        </div>
        <div className="form-group col-md-4">
          <label>MIKI Code</label>
          <div style={{wordWrap: 'break-word'}}>
            <div className="text-danger">NA</div>
          </div>
        </div>
        <div className="form-group col-md-4">
          <label>MINAL_QTECH_TEST Code</label>
          <div style={{wordWrap: 'break-word'}}>
            <div className="text-danger">NA</div>
          </div>
        </div>
        <div className="form-group col-md-4">
          <label>MYSTIFLY Code</label>
          <div style={{wordWrap: 'break-word'}}>
            <div className="text-danger">NA</div>
          </div>
        </div>
        <div className="form-group col-md-4">
          <label>REDAPPLE TRAVEL Code</label>
          <div style={{wordWrap: 'break-word'}}>
            <div className="text-danger">NA</div>
          </div>
        </div>
        <div className="form-group col-md-4">
          <label>RESTEL Code</label>
          <div style={{wordWrap: 'break-word'}}>
            <div className="text-danger">NA</div>
          </div>
        </div>
        <div className="form-group col-md-4">
          <label>SABRE FLIGHT Code</label>
          <div style={{wordWrap: 'break-word'}}>
            <div className="text-danger">NA</div>
          </div>
        </div>
        <div className="form-group col-md-4">
          <label>SNEHAL TESTING Code</label>
          <div style={{wordWrap: 'break-word'}}>
            <div className="text-danger">NA</div>
          </div>
        </div>
        <div className="form-group col-md-4">
          <label>TBOHOLIDAYS Code</label>
          <div style={{wordWrap: 'break-word'}}>
            <div className="text-danger">NA</div>
          </div>
        </div>
        <div className="form-group col-md-4">
          <label>TRAVCO Code</label>
          <div style={{wordWrap: 'break-word'}}>
            blocked </div>
        </div>
        <div className="form-group col-md-4">
          <label>WHITESANDS Code</label>
          <div style={{wordWrap: 'break-word'}}>
            <div className="text-danger">NA</div>
          </div>
        </div>
      </div>
    </div>
  </form>



      </div>
    </>
  );
};
export default CitiesManualSupplier;
