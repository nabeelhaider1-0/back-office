import { Link } from "react-router-dom";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";
import Constants from "../../constants/routes";
import { AgencyOptions, addrule_currencyOptions, consultantData, maxResultsOptions, reports_agentTypeOptions, reports_paymentModeOptions } from "../../constants/contants";




const ReportsAccountsAgentRecieptsSummary = () => {






  return (
    <>
      <Header2 title="AGENT RECEIPT SUMMARY" />
      <div class="container-fluid pt-0 p-4" id="content-pad">



        <form>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label>Agency</label>
                <MultiSelect
                  options={AgencyOptions}
                  isSearchable
                  placeholder=" Select Agent "
                  className="custom-select"
                  noOptionsMessage={() => "No Agency Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Agent Type</label>
                <MultiSelect
                  options={reports_agentTypeOptions}
                  isSearchable
                  placeholder=" Select Agent Type "
                  className="custom-select"
                  noOptionsMessage={() => "No Type Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Currency</label>
                <MultiSelect
                  options={addrule_currencyOptions}
                  isSearchable
                  placeholder=" Select Currency "
                  className="custom-select"
                  noOptionsMessage={() => "No Currency Found"}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Mode of payment</label>
                <MultiSelect
                  options={reports_paymentModeOptions}
                  isSearchable
                  placeholder=" Select "
                  className="custom-select"
                  noOptionsMessage={() => "No Payment Found"}
                />
              </div>
              <div className="form-group col-md-3 mt-2">
                <label>Results per page</label>
                <MultiSelect
                  options={maxResultsOptions}
                  isSearchable
                  placeholder=" 50 "
                  className="custom-select"
                  noOptionsMessage={() => "No Results Found"}
                />
              </div>
              <div className="form-group col-md-3 mt-2">
                <label>Master Reference</label>
                <input type="text" className="form-control form-control-sm" name="reservation_id" size={50} />
              </div>
              <div className="form-group col-md-3 mt-2">
                <label>Consultant Name</label>
                <MultiSelect
                  options={consultantData}
                  isSearchable
                  placeholder=" Select Consultant "
                  className="custom-select"
                  noOptionsMessage={() => "No Consultant Found"}
                />
              </div>
              <div className="form-group col-md-12 mt-2">
                {/*INPUT class="btn btn-primary" TYPE="submit" name='sbt1' value='View Report'*/}
                <Link to={Constants.URLConstants.ADMINLOCK2} className="btn btn-dark btn-sm" type="submit" name="sbt1" value="View Report">
                  <i className="fa fa-eye" />&nbsp;&nbsp;View Report
                </Link>
              </div>
            </div>
          </div>
        </form>






      </div>
    </>
  );
};
export default ReportsAccountsAgentRecieptsSummary;
