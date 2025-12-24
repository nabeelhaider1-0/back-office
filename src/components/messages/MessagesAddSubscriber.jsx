import { useState } from "react";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import { citiesByCountry, countries } from "../../constants/Country-City-Data";


const MessagesAddSubscriber = () => {


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

        <Header2 title="ADD SUBSCRIBER (QTECH PROFILE)" linkText1="List Subscriber" linkText2="Add Subscriber" link1={Constants.URLConstants.MESSAGESMASSMAILSUBSCRIBERSEARCH} />

        <form>
        <div className="panel-body">
  <div className="row">
    <div className="col-md-3 form-group">
      <label>Email</label>
      <input type="text" className="form-control required test123" name="txt_email" size={45} maxLength={255} tabIndex={1} />
    </div>
    <div className="col-md-3 form-group">
      <label>Name</label>
      <input type="text" className="form-control required" name="txt_name" size={45} maxLength={255} tabIndex={1} />
    </div>
    <div className="col-md-3 form-group">
      <label>Agency Name</label>
      <input type="text" className="form-control" name="txt_agency_name" size={45} maxLength={255} tabIndex={1} />
    </div>
    <div className="col-md-3 form-group">
      <label>Country</label>
      <MultiSelect
                  options={countries}
                  isSearchable
                  placeholder="- Select Country -"
                  noOptionsMessage={() => "No Country Found"}
                  onChange={handleCountryChange}
                  className="custom-select required"

                />
    </div>
    <div className="col-md-3 form-group">
      <label>City</label>
      <MultiSelect
                  options={citiesByCountry[branchData.branchCountry] || []}
                  isSearchable
                  placeholder="- Select City -"
                  noOptionsMessage={() => "No City Found"}
                  onChange={handleCityChange}
                  className="custom-select required"

                />
      <div id="city_loading" style={{position: 'absolute', display: 'none'}}>
        <img src="/cpfv3/images/ajax_pagination_loading.gif" alt="" />
      </div>
    </div>
  </div>
  <br />
  <div className="row">
    <div className="col-sm-12 form-group">
      <button type="button" name="add" className="btn btn-dark btn-sm" value="SUBMIT" onclick="return check_email(document.forms['frm_add_subscriber'].txt_email.value,1);">
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
export default MessagesAddSubscriber;