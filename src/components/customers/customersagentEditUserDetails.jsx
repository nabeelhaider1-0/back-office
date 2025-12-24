import { useState } from "react";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import { markupOptions, natureOfBusinessOptions, subStatusOptions, timezoneOptions } from "../../constants/contants";
import { citiesByCountry, countries } from "../../constants/Country-City-Data";


const CustomersAgentEditUserDetails = () => {


  const [branchData, setBranchData] = useState({
    branchCountry: "",
    branchCity: "",
  });


  const handleCountryChange = (selectedCountry) => {
    setBranchData((prevData) => ({
      ...prevData,
      branchCountry: selectedCountry.value,
      branchCity: "", // Reset city when country changes
    }));
  };

  const handleCityChange = (selectedCity) => {
    setBranchData((prevData) => ({
      ...prevData,
      branchCity: selectedCity.value,
    }));
  };



  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">

        <Header2 title="EDIT USER DETAILS" linkText1="View User" linkText2="Edit Sub User" link1={Constants.URLConstants.CUSTOMERSAGENTSSEARCHUSERS} />

        <form>
          <div className="panel-body">
            <input type="hidden" name="id" defaultValue={320} /><input type="hidden" name="consultant" /><input type="hidden" name="parent_agent" defaultValue={319} />
            <div id="mesID" style={{ display: 'none' }} />
            <div className="row">
              <div className="col-md-3 form-group">
                <label>User Name</label>
                <input className="form-control form-control-sm required test123" name="txt_user_name" id="txt_user_name" maxLength={15} type="text" defaultValue="Ahmed" readOnly size={20} />
              </div>
              <div className="col-md-3 form-group">
              </div>
              <div className="col-md-3 form-group">
                <label>Company Name</label>
                <input className="form-control form-control-sm required" name="txt_company_name" id="txt_company_name" type="text" defaultValue="travel" />
              </div>
              <div className="form-group col-md-3">
                <label>Company Name in Other Language</label>
                <input className="form-control form-control-sm required" name="txt_agency_name_in_other_language" id="txt_agency_name_in_other_language" type="text" />{/* required */}
              </div>
              <div className="col-md-3 form-group mt-2">
                <label>Company Registration No.</label>
                <input className="form-control form-control-sm" name="txt_reg_no" id="txt_reg_no" type="text" size={20} />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-3 form-group">
                <label>First Name</label>
                <input className="form-control form-control-sm required" name="txt_first_name" id="txt_first_name" type="text" defaultValue="Ahmed" size={20} onkeyup="isalpha_character(this);" />
              </div>
              <div className="col-md-3 form-group">
                <label>Last Name</label>
                <input className="form-control form-control-sm required" name="txt_last_name" id="txt_last_name" type="text" defaultValue="Ali" size={20} onkeyup="isalpha_character(this);" />
              </div>
              <div className="col-md-3 form-group">
                <label>Middle Name</label>
                <input className="form-control form-control-sm" name="txt_middle_name" type="text" size={6} onkeyup="isalpha_character(this);" />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-3 form-group">
                <label>Mark Up (%)</label>
                <MultiSelect
                  options={markupOptions}
                  isSearchable
                  placeholder=" 5.0 "
                  noOptionsMessage={() => "No Mark Up Found"}
                  className="custom-select"
                />
              </div>
              <div className="col-md-3 form-group">
                <label>Designation</label>
                <input className="form-control form-control-sm" maxLength={20} name="txt_designation" id="txt_designation" size={20} />
              </div>
              <div className="col-md-3 form-group">
                <label>Nature of Business</label>
                <MultiSelect
                  options={natureOfBusinessOptions}
                  isSearchable
                  placeholder=" Travel Agent"
                  noOptionsMessage={() => "No Mark Up Found"}
                  className="custom-select"
                />
              </div>
            </div>
            <div className="row form-group mt-2">
              <div className="col-md-12">
                <label>Address</label>
                <textarea name="txt_address" id="txt_address" className="form-control form-control-sm required" rows={5} defaultValue={"Bahrain"} />
              </div>
            </div>
            <div className="row form-group mt-2">
              <div className="col-md-12">
                <label>Address in Other Language</label>
                <br />
                <textarea name="txtar_address_in_other_language" rows={5} className=" form-control form-control-sm" defaultValue={" "} />
              </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: "\n.fa.fa-pencil-square-o {\n    color: #fff !important;\n}\n" }} />
            <div className="row mt-2">
              <div className="col-md-3 form-group">
                <label>Country</label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  placeholder="- Select Country -"
                  noOptionsMessage={() => "No Country Found"}
                  className="custom-select required"
                  onChange={handleCountryChange}

                />
              </div>
              <div className="col-md-3 form-group">
                <label>City</label>
                <MultiSelect
                  //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                  options={citiesByCountry[branchData.branchCountry] || []}
                  isSearchable
                  placeholder="- Please select a city -"
                  className="custom-select required"
                  onChange={handleCityChange}
                  noOptionsMessage={() => "No City Found"}

                />
                <div id="city_loading" style={{ position: 'absolute', display: 'none' }}><img src="/cpfv3/images/ajax_pagination_loading.gif" alt="" /></div>
              </div>
              <div className="col-md-3 form-group">
                <label>Postal Code</label>
                <input className="form-control form-control-sm required" type="text" name="txt_pincode" id="txt_pincode" size={6} maxLength={6} defaultValue={3478} onkeyup="extractNumber(this,0,0);" />
              </div>
              <div className="col-md-3 form-group">
                <label>Time Zone</label>
                <MultiSelect
                  options={timezoneOptions}
                  isSearchable
                  placeholder="--Select--"
                  noOptionsMessage={() => "No time zone Found"}
                  className="custom-select required"
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-3 form-group">
                <label>Telephone</label>
                <div className="form-group row">
                  <div className="form-group col-md-4 text-left">
                    <input className="form-control form-control-sm form-control-sm required" type="text" id="tel_country_code" name="tel_country_code" defaultValue={92} size={2} maxLength={3} onkeyup="extractNumber(this,0,0);" />
                  </div>
                  <div className="col-md-8 text-left">
                    <input className="form-control form-control-sm" name="txt_phone_number" id="txt_phone_number" size={15} maxLength={15} defaultValue={3119105530} onkeyup="extractNumber(this,0,0);" data-toggle="tooltip" data-placement="top" title data-original-title="This number will be used for contact purposes." />
                  </div>
                </div>
              </div>
              <div className="col-md-3 form-group">
                <label>Mobile Number</label>
                <div className="form-group row">
                  <div className="form-group col-md-4 text-left">
                    <input className="form-control form-control-sm required" type="text" id="country_code" name="country_code" defaultValue={92} size={2} maxLength={3} onkeyup="extractNumber(this,0,0);" />
                  </div>
                  <div className="col-md-8 text-left">
                    <input className="form-control form-control-sm" type="text" id="txt_mobile_number" name="txt_mobile_number" size={15} defaultValue={3119105530} maxLength={15} onkeyup="extractNumber(this,0,0);" />
                  </div>
                </div>
              </div>
              <div className="col-md-3 form-group">
                <label>Fax</label>
                <input className="form-control form-control-sm" type="text" name="txt_fax" id="txt_fax" size={15} maxLength={100} />
              </div>
              <div className="col-md-3 form-group">
                <label>Email</label>
                <input className="form-control form-control-sm required" type="text" name="txt_email" id="txt_email" size={30} defaultValue="nabeeltariq788@gmail.com" />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-3 form-group">
                <label>Website</label>
                <input className="form-control form-control-sm" type="text" name="txt_website" id="txt_website" size={45} maxLength={100} />
              </div>
              <div className="col-md-3 form-group">
                <label>Sub Agent Logo</label>
                {/*<img src="images/spacer.gif" name='agent_logo' id='agent_logo' ><input type='file' name='file_image' size='40' data-toggle="tooltip" data-placement="top" data-original-title='150 pixels x 150 pixels'>*/}
                <br />
                <span className="uniqFile input-group"><span className="input-group-addon fa fa-upload myInputFile"><input type="file" name="sub_agent_logo" title data-toggle="tooltip" data-placement="top" data-original-title="150 pixels  x 150 pixels" /></span></span>
              </div>
              <div className="col-md-3 form-group">
                <label>Status</label>
                <MultiSelect
                  options={subStatusOptions}
                  isSearchable
                  placeholder="--Select--"
                  noOptionsMessage={() => "No Status Found"}
                  className="custom-select"
                />
              </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: "\n    .checkbox label {\n    padding-left: 0px;}\n" }} />
            <div className="row mt-3">
              <div className="radioline1 form-group col-md-12">
                <br />
                <div className="checkbox checkbox-success checkbox-inline">
                  <input id="block_agent_email" type="checkbox" name="block_mail" defaultValue={1} />
                  {/* <input id="block_agent_email" type='checkbox' name='chk_debug' value='1' >  */}
                  <label htmlFor="block_agent_email">Block Agent E-mail</label>
                </div>
                <div className="checkbox checkbox-success checkbox-inline">
                  <input id="app" type="checkbox" name="chk_can_book" defaultValue={1} defaultChecked />
                  <label htmlFor="can_book">Can Book</label>
                </div>
                <div className="checkbox checkbox-success checkbox-inline">
                  <input id="app" type="checkbox" name="allow_book_under_cancellation" defaultChecked defaultValue={1} />
                  <label htmlFor="allow">Allow Book Under Cancellation Policy?</label>
                </div>
                <div className="checkbox checkbox-success checkbox-inline">
                  <input type="checkbox" id="app" name="chk_can_voucher" defaultChecked defaultValue={1} />
                  <label htmlFor="can_voucher">Can Voucher</label>
                </div>
                <div className="checkbox checkbox-success checkbox-inline">
                  <input id="app" type="checkbox" name="chk_allow_ticketing" defaultValue={1} defaultChecked />
                  <label htmlFor="chk_allow_ticketing">Flights Allow Ticketing</label>
                </div>
                {/* added by nida start- 8/3/2018 */}
                <div className="checkbox checkbox-success checkbox-inline">
                  <input type="checkbox" id="app" name="display_markup" defaultValue={1} />
                  <label htmlFor="display_markup">Display with Markup</label>
                </div>
                {/* added by nida end- 8/3/2018 */}
                {/* added by nida start */}
                {/* added by nida end */}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="form-group col-md-3">
                <button className="btn btn-dark btn-sm" name="b1" type="submit" value="Update" onclick="javascriptreturn sub_agent_submit(document.forms['frm_add_subagent']);">
                  <i className="fa fa-pencil-square-o" />
                  &nbsp;Update
                </button>
              </div>
            </div>
          </div>
        </form>



      </div>
    </>
  );
};
export default CustomersAgentEditUserDetails;