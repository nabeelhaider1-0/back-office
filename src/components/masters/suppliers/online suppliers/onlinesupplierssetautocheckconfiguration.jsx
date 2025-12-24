import { Link } from "react-router-dom";

import { useState } from "react";
import Header2 from "../../../header2/header2";
import Constants from "../../../../constants/routes";
import { citiesByCountry, countries } from "../../../../constants/Country-City-Data";
import MultiSelect from "../../../reactMultiSelect";
const MastersSuppliersSetAutoCheckConfiguration = () => {


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
      <Header2 title="ONLINE SUPPLIER DESTINATION REPORT" linkText1="Search Supplier Report" linkText2="Add Search Supplier Report" link2={Constants.URLConstants.MASTERSSUPPLIERSONLINESUPPLIERSAUTOCHECKCONFIGURATIONADD} />
      <div class="container-fluid pt-0 p-4" id="content-pad">



        <form name="search_report_config" method="post" action="search_suppliers.php">
          <input type="hidden" name="action" defaultValue="search_report_data" />
          <input type="hidden" name="Search" defaultValue="N" />
          <div className="panel-body">
            <div className="row mt-2">
              <div className="form-group col-md-3 ">
                <label>Country</label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  placeholder="- Select Country -"
                  onChange={handleCountryChange}
                  className="custom-select required"

                />
              </div>
              <div className="col-md-3 form-group ">
                <label>City</label>
                <MultiSelect
                  options={citiesByCountry[onlineSupplierData.onlineSupplierCountry] || []}

                  onChange={handleCityChange}
                  isSearchable
                  placeholder="- Select City -"
                  className="custom-select required"

                />
              </div>

              <br />
              <div className="col-md-12 form-group mt-2">
                <Link to={Constants.URLConstants.MASTERSSUPPLIERSONLINESUPPLIERSAUTOCHECKCONFIGURATIONBUTTON}>   <button className="btn btn-dark btn-sm" type="button" onclick="javascriptcallSearch(document.forms['search_report_config']);">
                  <i className="fa fa-search" />&nbsp;Search
                </button></Link>
              </div>
            </div>
          </div>
        </form>
        <div className="panel-body unikNo mt-5">
          <div className="alert alert-danger text-center form-group"></div>
        </div>


      </div>
    </>
  );
};
export default MastersSuppliersSetAutoCheckConfiguration;
