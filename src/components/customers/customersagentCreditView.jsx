import { useEffect } from "react";
import Constants from "../../constants/routes";
import Header2 from "../header2/header2";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";


const CustomersAgentCreditView = ({ data }) => {

  const navigateOnRefresh = useNavigate();

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
    
     
       
     
        // const creditLimitData = Array.isArray(data?.creditLimit) && data.creditLimit.length > 0
        // ? data.creditLimit[0]
        // : {};
      
    
    } else {
      navigateOnRefresh(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
    }
  }, [data, navigateOnRefresh]);


  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">

        <Header2 title="AGENT CREDIT DETAILS" linkText1="List Agent" linkText2="View Credit" link1={Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON} />
  
        <form>
  <div className="panel-body">
    <div className="form-group row">
      <div className="form-group col-md-3">
        <label>Agent Type</label>
        <div>
        {data && data.agentType && (
        <div>{data.agentType}</div>
      )} 
      
      
      </div>
      </div>
      <div className="form-group col-md-3">
        <label>Credit Limit</label>
        <div>
    
        {data?.creditLimit?.[0]?.availableCreditLimit ?? '0.000'} 
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Temp Credit Limit</label>
        <div>
      


{data?.creditLimit?.[0]?.tempCreditLimit ?? '0.000'} 
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Credit Usage</label>
        <div>
          0.000
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Available Credit</label>
        <div>
          
        {data?.creditLimit?.[0]?.tempCreditLimit ?? '0.000'} 
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Credit Distribution</label>
        <div>
        {data?.creditLimit?.[0]?.applyCreditDistribution ?? ''} 
        
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Temp. Credit Available</label>
        <div>
        {data?.creditLimit?.[0]?.availableCreditLimit ?? '0.000'} 
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Unallocated Amount</label>
        <div>
          0.000
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Main Agent's Available Credit</label>
        <div>
        {parseFloat(data?.creditLimit?.[0]?.tempCreditLimit ?? '0.000')+parseFloat(data?.creditLimit?.[0]?.availableCreditLimit ?? '0.000')} 
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Main Agent Credit Limit</label>
        <div>
        {data?.creditLimit?.[0]?.availableCreditLimit ?? '0.000'}
        </div>
      </div>
    </div>
  </div>
</form>







      </div>
    </>
  );
};


const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(CustomersAgentCreditView);