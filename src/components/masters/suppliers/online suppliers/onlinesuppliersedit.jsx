import { useState } from "react";
import Header2 from "../../../header2/header2";
import Constants from "../../../../constants/routes";
import MultiSelect from "../../../reactMultiSelect";
import { citiesByCountry, countries } from "../../../../constants/Country-City-Data";




const timezone = [
  { label: 'Select Time Zone', value: '' },
  { label: 'GMT -12:00 Hours', value: '-12' },
  { label: 'GMT -11:00 Hours', value: '-11' },
  { label: 'GMT -10:00 Hours', value: '-10' },
  { label: 'GMT -9:00 Hours', value: '-9' },
  { label: 'GMT -8:00 Hours', value: '-8' },
  { label: 'GMT -7:00 Hours', value: '-7' },
  { label: 'GMT -6:00 Hours', value: '-6' },
  { label: 'GMT -5:00 Hours', value: '-5' },
  { label: 'GMT -4:00 Hours', value: '-4' },
  { label: 'GMT -3:30 Hours', value: '-3.5' },
  { label: 'GMT -3:00 Hours', value: '-3' },
  { label: 'GMT -2:00 Hours', value: '-2' },
  { label: 'GMT -1:00 Hours', value: '-1' },
  { label: 'GMT 0:00 Hours', value: '0' },
  { label: 'GMT +1:00 Hours', value: '1' },
  { label: 'GMT +2:00 Hours', value: '2' },
  { label: 'GMT +3:00 Hours', value: '3' },
  { label: 'GMT +3:30 Hours', value: '3.5' },
  { label: 'GMT +4:00 Hours', value: '4' },
  { label: 'GMT +4:30 Hours', value: '4.5' },
  { label: 'GMT +5:00 Hours', value: '5' },
  { label: 'GMT +5:30 Hours', value: '5.5' },
  { label: 'GMT +5:45 Hours', value: '5.75' },
  { label: 'GMT +6:00 Hours', value: '6' },
  { label: 'GMT +7:00 Hours', value: '7' },
  { label: 'GMT +8:00 Hours', value: '8' },
  { label: 'GMT +9:00 Hours', value: '9' },
  { label: 'GMT +9:30 Hours', value: '9.5' },
  { label: 'GMT +10:00 Hours', value: '10' },
  { label: 'GMT +10:30 Hours', value: '10.5' },
  { label: 'GMT +11:00 Hours', value: '11' },
  { label: 'GMT +12:00 Hours', value: '12' },
];






const MastersSuppliersOnlineSuppliersEdit = () => {


  const [onlineSupplierData, setOnlineSupplierData] = useState({
    onlineSupplierCountry: "",
    onlineSupplierCity: "",

  });


  const handleCountryChange = (selectedCountry) => {
    setOnlineSupplierData((prevData) => ({
      ...prevData,
      onlineSupplierCountry: selectedCountry.value,
      onlineSupplierCity: "", // Reset city when country changes
    }));
  };

  const handleCityChange = (selectedCity) => {
    setOnlineSupplierData((prevData) => ({
      ...prevData,
      onlineSupplierCity: selectedCity.value,
    }));
  };


  return (
    <>
      <Header2 title={"SUPPLIER DETAILS"} linkText1=" List Suppliers " linkText2="Edit Supplier"
        link1={Constants.URLConstants.MASTERSSUPPLIERSONLINESUPPLIERSSEARCH} />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>

          <div class="panel-body">
            <div class="row">

              <div class="form-group col-md-3 phps_row_1">
                <label>Company Name</label>
                <input type="text" name="txt_company_name" class="form-control form-control-sm required test123" size="45"
                  maxlength="90" />
              </div>
              <div class="form-group col-md-3 phps_row_0">
                <label>Supplier</label>
                <input type="text" name="txt_supplier_code" class="form-control form-control-sm required" size="20"
                  maxlength="30" />
              </div>
              <div class="form-group col-md-3">
                <label>Accounting Id</label>
                <input type="text" name="txt_acc_id" class="form-control form-control-sm" size="20" maxlength="50" value="" />
              </div>


            </div>
            <div class="row mt-2">
              <div class="form-group col-md-3 phps_row_0">
                <label>First Name</label>
                <input class="form-control form-control-sm required" type="type" name="txt_first_name" size="20"
                  maxlength="100" />
              </div>
              <div class="form-group col-md-3 phps_row_1">
                <label>Middle Name</label>
                <input type="type" class="form-control form-control-sm" name="txt_middle_name" size="20" maxlength="100" />
              </div>
              <div class="form-group col-md-3 phps_row_0">
                <label>Last Name</label>
                <input type="type" class="form-control form-control-sm required" name="txt_last_name" size="20" maxlength="100" />
              </div>
            </div>


            <div class="row mt-2">
              <div class="form-group col-md-12 phps_row_1">
                <label>Address</label>
                <textarea name="txtar_address" rows="4" class="form-control form-control-sm" cols="30"></textarea>
              </div>
              <div class="form-group col-md-3 phps_row_0 mt-2">
                <label>Country</label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  placeholder="- Select Country -"
                  onChange={handleCountryChange}
                  className="custom-select required"

                />
              </div>
              <div class="form-group col-md-3 phps_row_1 mt-2">
                <label>City</label>
                <br />
                <MultiSelect
                  options={citiesByCountry[onlineSupplierData.onlineSupplierCountry] || []}

                  onChange={handleCityChange}
                  isSearchable
                  placeholder="- Select City -"
                  className="custom-select required"

                />

              </div>
              <div class="form-group col-md-3 phps_row_0 mt-2">
                <label>Pincode</label>
                <input type="text" name="txt_pincode" class="form-control form-control-sm" size="6" maxlength="6" />
              </div>
              <div class="col-md-3 phps_row_1 form-group mt-2">
                <label>Time Zone</label>
                <MultiSelect
                  options={timezone}
                  isSearchable
                  placeholder="Select Time Zone"
                  className="custom-select required"

                />

              </div>
              <div class="form-group col-md-3 phps_row_0 mt-2">
                <label>Phone Number</label>
                <input class="form-control form-control-sm" onblur="extractNumber(this,0,false);"
                  onkeyup="extractNumber(this,0,false);" type="text" name="txt_phone" size="30"
                  maxlength="20" />
              </div>
              <div class="form-group col-md-3 phps_row_1 mt-2">
                <label>Mobile Number</label>
                <input type="text" name="txt_mobile" onblur="extractNumber(this,0,false);"
                  onkeyup="extractNumber(this,0,false);" size="30" maxlength="20"
                  class="form-control form-control-sm required" />
              </div>
              <div class="form-group col-md-3 phps_row_0 mt-2">
                <label>Email</label>
                <input class="form-control form-control-sm required" type="text" name="txt_email" size="30" maxlength="70" />
              </div>
              <div class="form-group col-md-3 phps_row_1 mt-2">
                <label>B2B Availability Timeout</label>
                <input class="form-control form-control-sm" type="text" name="txt_b2b_timeout" size="2" maxlength="2" />
              </div>
              <div class="form-group col-md-3 phps_row_1 mt-2">
                <label>Supplier Folder</label>
                <input class="form-control form-control-sm" type="text" name="txt_supplier_folder" />
              </div>
              <div class="form-group col-md-3 phps_row_0 mt-2">
                <label>Original Source</label>
                <input class="form-control form-control-sm" type="text" name="txt_original_source" />
              </div>
              <div class="form-group col-md-3 phps_row_1 mt-2">
                <label>Allow Switch Payment : <input type="checkbox" value="1"
                  name="chk_allow_switch_payment" /></label>

              </div>
            </div>
            <br />
            <div class="row mt-2">
              <div class="col-md-12 form-group">
                <button type="button" class="btn btn-dark btn-sm" name="b1"
                >
                  <i class="fa fa-floppy-o"></i>&nbsp;Save
                </button>
              </div>
            </div>
          </div>


        </form>
      </div>

    </>
  )
}
export default MastersSuppliersOnlineSuppliersEdit