
import { useState } from "react";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { citiesByCountry, countries } from "../../../constants/Country-City-Data";
import { offlineHotelSuppliersOptions } from "../../../constants/contants";


const OfflineSuppliersTransfer = () => {


  const [offlineHotelData, setOfflineHotelData] = useState({

    OfflineHotelCountry: "",
    OfflineHotelCity: "",

  });

  const handleCountryChange = (selectedCountry) => {
    setOfflineHotelData((prevData) => ({
      ...prevData,
      OfflineHotelCountry: selectedCountry.value,
      OfflineHotelCity: "", // Reset city when country changes
    }));
  };

  const handleCityChange = (selectedCity) => {
    setOfflineHotelData((prevData) => ({
      ...prevData,
      OfflineHotelCity: selectedCity.value,
    }));
  };


  return (
    <>
      <Header2 title="TRANSFER SUPPLIER MAPPING" linkText1="Transfer And Supplier Mapping"  />
      <div class="container-fluid pt-0 p-4" id="content-pad">

      <form action="hotel_supplier_mapping.php" method="post" name="hotel_supplier_mapping_form" id="hotel_supplier_mapping_form">
  <input type="hidden" name="action" defaultValue />
  <input type="hidden" name="is_jv_supplier" id="is_jv_supplier" defaultValue={0} />
  <div className="panel-body">
  <div className="row">
              <div className="form-group col-md-3">
                <label>Supplier Code</label>
                <MultiSelect
                  options={offlineHotelSuppliersOptions}
                  isSearchable
                  placeholder="- Select Supplier -"
                  noOptionsMessage={() => "No Supplier Found"}
                  className="custom-select required"

                />
              </div>
              <div className="form-group col-md-3">
                <label>Country</label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  placeholder="- Please select a country -"
                  className="custom-select required"
                  onChange={handleCountryChange}
                  noOptionsMessage={() => "No Country Found"}

                />
              </div>
              <div className="form-group col-md-3">
                <label>City</label>
                <MultiSelect
                  options={citiesByCountry[offlineHotelData.OfflineHotelCountry] || []}
                  isSearchable
                  placeholder="- Please select a city -"
                  className="custom-select required"
                  onChange={handleCityChange}
                  noOptionsMessage={() => "No City Found"}

                />
              </div>
              <div className="form-group col-md-3" style={{ display: 'none' }} id="sel_branch">
                <label>Branch</label>
                <select name="sel_branches" id="branch" className="input_style4 selectpicker show-menu-arrow form-control form-control-sm required bs-select-hidden" onchange="getHotelList(this.value)" data-live-search="true">
                  <option value={0}>- Select Branch -</option>
                  <option label="New Joint Branch" value={28}>New Joint Branch</option>
                  <option label="World Avenue" value={42}>World Avenue</option>
                  <option label="TEST_BRANCH_JV_A" value={44}>TEST_BRANCH_JV_A</option>
                  <option label="TEST_BRANCH_JV_C" value={45}>TEST_BRANCH_JV_C</option>
                  <option label="world_avenue_malesia" value={46}>world_avenue_malesia</option>
                  <option label="World Avenues Malaysia" value={47}>World Avenues Malaysia</option>
                  <option label="test_branch_jv" value={48}>test_branch_jv</option>
                </select>
              </div>
              <div className="col-md-12 mb-2">
                <label style={{ fontSize: '12px', fontWeight: 600 }}>Hotels</label>
              </div>
              <div className="form-group col-md-5">
                <select className="form-control form-control-sm" name="sel_hotels" id="sel_hotels" style={{ width: '100%', height: '200px' }} multiple size={20}>
                </select>
              </div>
              <div className="col-md-2 text-center">
                <input className="btn w-xs btn-dark" type="button" defaultValue=">>" style={{ marginTop: '2em', paddingLeft: '40px', paddingRight: '40px' }} />
                <br /><br />
                <input className="btn w-xs btn-dark" type="button" defaultValue="<<" style={{ marginTop: '2em', paddingLeft: '40px', paddingRight: '40px' }} />
              </div>
              <div className="form-group col-md-5">
                <select className="form-control form-control-sm" name="sel_right_members[]" id="sel_right_members[]" multiple style={{ width: '100%', height: '200px' }} size={20} >
                </select>
              </div>
            </div>
    <br />
    <div className="row">
      <div className="form-group col-md-6">
        <button className="btn btn-dark btn-sm" type="button" id="btn_submit" name="b1" value="SUBMIT" >
          <i className="fa fa-floppy-o" />
          Save
        </button>
      </div>
    </div>
  </div>
</form>


      </div>
    </>
  );
};
export default OfflineSuppliersTransfer;
