import { Link } from "react-router-dom";

import {  useState } from "react";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import { add_options, agentTypeOptions, consultantsOptions, debugRightsOptions, managersOptions, statusOptions } from "../../constants/contants";
import { citiesByCountry, countries } from "../../constants/Country-City-Data";




const CustomersAgentSearch = () => {

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

        <Header2 title="SEARCH AGENTS" linkText1=" Search Agent" linkText2=" Create New Agent" link2={Constants.URLConstants.CUSTOMERSAGENTSNEW} />

        <form>
          <div className="row mt-2">
            <div className="col-md-2 form-group">
              <label>Type</label>
              <MultiSelect
                options={agentTypeOptions}
                isSearchable
                placeholder="--Select--"
                noOptionsMessage={() => "No Agent Type Found"}
                className="custom-select"
              />
            </div>
            <div className="col-md-2 form-group">
              <label>Code</label>
              <input className="form-control form-control-sm" type="text" name="agency_id_search" size={10} />
            </div>
            <div className="col-md-2 form-group">
              <label>Agency</label>
              <input className="form-control form-control-sm" type="textbox" name="agency_name_search" />
            </div>
            <div className="col-md-2 form-group">
              <label>Username</label>
              <input className="form-control form-control-sm" type="textbox" name="username_search" />
            </div>
            <div className="col-md-2 form-group">
              <label>Contact Person</label>
              <input className="form-control form-control-sm" type="textbox" name="person_name_search" />
            </div>
            <div className="col-md-2 form-group">
              <label>Email</label>
              <input type="text" className="form-control form-control-sm" name="email_search" id="emailfield" />
            </div>
          </div>
          {/*2nd Row*/}
          <div className="row mt-2">
            <div className="col-md-2 form-group">
              <label>Status</label>
              <MultiSelect
                options={statusOptions}
                isSearchable
                placeholder="--Select--"
                noOptionsMessage={() => "No Status Found"}
                className="custom-select"
              />
            </div>
            <div className="col-md-2 form-group">
              <label>Consultant</label>
              <MultiSelect
                options={consultantsOptions}
                isSearchable
                placeholder="--Select--"
                noOptionsMessage={() => "No Consultant Found"}
                className="custom-select"
              />
            </div>
            <div className="col-md-2 form-group">
              <label>Branch</label>
              <MultiSelect
                options={add_options}
                isSearchable
                placeholder="--Select--"
                noOptionsMessage={() => "No Branch Found"}
                className="custom-select"
              />
            </div>
            <div className="col-md-2 form-group">
              <label>Sales Manager</label>
              <MultiSelect
                options={managersOptions}
                isSearchable
                placeholder="--Select--"
                noOptionsMessage={() => "No Manager Found"}
                className="custom-select"
              />
            </div>
            <div className="col-md-2 form-group">
              <label>Country</label>
              <MultiSelect
                options={countries}
                isSearchable
                placeholder="--Select--"
                noOptionsMessage={() => "No Country Found"}
                className="custom-select"
                onChange={handleCountryChange}
              />
            </div>
            <div className="col-md-2 form-group">
              <label>City</label>
              <MultiSelect
                //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                options={citiesByCountry[branchData.branchCountry] || []}
                isSearchable
                placeholder="--Select--"
                className="custom-select"
                onChange={handleCityChange}
                noOptionsMessage={() => "No City Found"}
              />
            </div>
            <div className="col-md-2 form-group">
              <label>Debug Rights</label>
              <MultiSelect
                options={debugRightsOptions}
                isSearchable
                placeholder="--Select--"
                noOptionsMessage={() => "No Rights Found"}
                className="custom-select"
              />

            </div>

            <div className="col-md-2 form-group">
              <label>&nbsp;</label><br />
              <Link to={Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON} className="btn btn-dark btn-sm form-group search" name="submit1" onclick="callmesubmit();">
                <i className="fa fa-search" /> Search
              </Link>
            </div>
          </div>
        </form>





      </div>
    </>
  );
};
export default CustomersAgentSearch;