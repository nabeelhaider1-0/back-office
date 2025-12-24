import { destinationOptions, offlineHotelSuppliersOptions } from "../../../constants/contants";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";








const ContractsFlightsSupplierMapping = () => {

  return (
    <>
      <Header2 title="FLIGHT SUPPLIER MAPPING" linkText1="Flight And Supplier Mapping" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-4">
                <label>Supplier</label>
                <MultiSelect
                  options={offlineHotelSuppliersOptions}
                  isSearchable
                  placeholder="- Select Supplier -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Supplier Found"}
                />
              </div>
              <div className="form-group col-md-4">
                <label>Destination From</label>
                <MultiSelect
                  options={destinationOptions}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Destination Found"}
                />
              </div>
              <div className="form-group col-md-4">
                <label>Destination To</label>
                <MultiSelect
                  options={destinationOptions}
                  isSearchable
                  placeholder="- Select -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Destination Found"}
                />
              </div>
              <div className="col-md-12 mt-3">
                <label>Flights</label>
              </div>
              <div className="form-group col-md-5">
                <select className="form-control form-control-sm" name="sel_flights" id="sel_flights" style={{ width: '100%', height: '200px' }} multiple size={20} onfocus="javascriptcheck(document.forms['flight_supplier_mapping_form']);">
                  {/*  */}
                </select>
              </div>
              <div className="col-md-2 text-center">
                <input className="btn w-xs btn-dark" type="button" onclick="javascript left_to_right();" defaultValue=">>" style={{ marginTop: '2em', paddingLeft: '40px', paddingRight: '40px' }} />
                <br /><br />
                <input className="btn w-xs btn-dark" type="button" onclick="javascript right_to_left();" defaultValue="<<" style={{ marginTop: '3em', paddingLeft: '40px', paddingRight: '40px' }} />
              </div>
              <div className="form-group col-md-5">
                <select className="form-control form-control-sm" name="sel_right_members[]" id="sel_right_members[]" multiple style={{ width: '100%', height: '200px' }} size={20} onfocus="javascriptcheck(document.forms['flight_supplier_mapping_form']);">
                  {/*  */}
                </select>
              </div>
            </div>
            <br />
            <div className="row mt-3">
              <div className="form-group col-md-6">
                <button className="btn btn-dark btn-sm" type="button" name="b1" value="SUBMIT" onclick="javascript submit_form(document.forms['flight_supplier_mapping_form']);">
                  <i className="fa fa-floppy-o" />
                  &nbsp;Save
                </button>
              </div>
            </div>
          </div>
        </form>








      </div>
    </>
  );
};
export default ContractsFlightsSupplierMapping;
