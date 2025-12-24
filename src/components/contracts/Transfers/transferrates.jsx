import { Link } from "react-router-dom";

import { useState } from "react";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { citiesByCountry, countries } from "../../../constants/Country-City-Data";
import Constants from "../../../constants/routes";
import { advance_suppliers_options } from "../../../constants/contants";



const ContractsTransfersRatesSearch = () => {



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
      <Header2 title="TRANSFER LIST"
        linkText1="List Transfers" />
      <div class="container-fluid pt-0 p-4" id="content-pad">


        <div className data-child="row" data-effect="fadeInUp">
          <form name="search_transfer_from" method="post" action="search_local_transfer.php?search">
            <input type="hidden" name="action" defaultValue />
            <input type="hidden" name="Search" defaultValue="N" />
            <div className="row">
              <div className="hpanel">
                <div className="panel-body" style={{ marginLeft: '15px', marginRight: '15px' }}>
                  <div className="row">
                    <div className="col-md-3 form-group">
                      <label>Transfer Name</label>
                      <input type="text" className="form-control form-control-sm test123" name="Search_transfer_name" />
                    </div>
                    <div className="col-md-3 form-group">
                      <label>Country</label>
                      <MultiSelect
                        options={countries}
                        isSearchable
                        placeholder="- Select Country -"
                        className="custom-select"
                        onChange={handleCountryChange}
                        noOptionsMessage={() => "No Country Found"}

                      />
                    </div>
                    <div className="col-md-3 form-group">
                      <label>City</label>
                      <MultiSelect
                        //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                        options={citiesByCountry[branchData.branchCountry] || []}
                        isSearchable
                        placeholder="- Select City -"
                        className="custom-select"
                        onChange={handleCityChange}
                        noOptionsMessage={() => "No City Found"}

                      />
                    </div>
                    <div className="col-md-3 form-group">
                      <label>Supplier</label>
                      <MultiSelect
                        options={advance_suppliers_options}
                        isSearchable
                        placeholder="- Select Supplier -"
                        className="custom-select"
                        noOptionsMessage={() => "No Supplier Found"}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row mt-1">
                    <div className="col-md-2 form-group">
                      <Link to={Constants.URLConstants.CONTRACTSTRANSFERSRATESSEARCHBUTTON}><button type="button" className="btn btn-dark btn-sm" onclick="javascriptcallSearch(document.forms['search_transfer_from']);">
                        <i className="fa fa-search" />&nbsp;Search
                      </button></Link>
                    </div>
                  </div>
                </div>
                <div id="mesID" style={{ display: 'none' }}>Please use search criteria to view transfers.</div>
                {/* <div class="panel-body mesID1" style="margin-right: 15px;margin-left: 15px;">
                                  <div class="alert alert-danger text-center form-group" ><h5>No Such Transfers.</h5></div>
                              </div> */}
              </div>
            </div>
          </form>
        </div>



      </div>
    </>
  );
};
export default ContractsTransfersRatesSearch;
