import React, { useEffect, useState } from 'react';
import Flatpickr from "react-flatpickr";
import Header2 from '../header2/header2';
import Constants from '../../constants/routes';
import { ErrorApiAlert, formatDate, SuccessApiToast } from '../../constants/globalfunctions';
import { putDATA } from '../../Apis/API';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import ApiRoutes from "../../constants/ApiRoutes"

const CustomersAgentCreditLimit = ({ data }) => {
  const [showCreditFields, setShowCreditFields] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [newCreditLimit, setNewCreditLimit] = useState('');
  const [tempCreditLimit, setTempCreditLimit] = useState('');
  const [applyCreditDistribution, setApplyCreditDistribution] = useState('0');
  const navigateOnRefresh = useNavigate();

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
    
      if (data.agentType === "Credit") {
        setShowCreditFields(true);
        document.getElementById('credit').checked = true;
        const creditLimitData = Array.isArray(data?.creditLimit) && data.creditLimit.length > 0
        ? data.creditLimit[0]
        : {};
      
      setNewCreditLimit(creditLimitData.availableCreditLimit || '');
      setTempCreditLimit(creditLimitData.tempCreditLimit || '');
      setApplyCreditDistribution(creditLimitData.applyCreditDistribution === 'yes' ? '1' : '0');
      setStartDate(creditLimitData.creditLimitExpiryDate || null);
      
      } else if (data.agentType === "Cash") {
        setShowCreditFields(false);
        document.getElementById('cash').checked = true;
      }
    } else {
      navigateOnRefresh(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
    }
  }, [data, navigateOnRefresh]);

  const handleCreditRadioClick = () => {
    setShowCreditFields(true);
  };

  const handleCashRadioClick = () => {
    setShowCreditFields(false);
  };

  const handleTrashClick = () => {
    setStartDate(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const expiryDate = new Date(startDate); 
    const formateddate = formatDate(expiryDate);

    const requestBody = {
      agentType: showCreditFields ? "Credit" : "Cash",
      creditLimit: showCreditFields ? [{
        availableCreditLimit: newCreditLimit,
        tempCreditLimit: tempCreditLimit,
        applyCreditDistribution: applyCreditDistribution === '1' ? 'yes' : 'no',
        creditLimitExpiryDate: formateddate !== "01/01/1970" ? formateddate : null
      }] : null
    };

    try {
      const response = await putDATA(ApiRoutes.CUSTOMER_AGENTS.AGENT, data.uuid, requestBody);
      if (response.data.statusCode === 200) {
        SuccessApiToast("Credit Limit Updated Successfully");
        navigateOnRefresh(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
      }
    } catch (error) {
      ErrorApiAlert('Error Updating Credit');
    }
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="EDIT SETTING" linkText1="List Agent" linkText2="Edit Agent Credit" link1={Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON} />
        <form onSubmit={handleSubmit}>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label>Agent Type</label><br />
                <div className="radioline1">
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="rad_agent_type"
                      value="CC"
                      onClick={handleCreditRadioClick}
                      id="credit"
                      className="test123"
                    />
                    <label htmlFor="credit">Credit</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="rad_agent_type"
                      value="CS"
                      onClick={handleCashRadioClick}
                      id="cash"
                    />
                    <label htmlFor="cash">Cash</label>
                  </div>
                </div>
              </div>
              <div className="row" id="credit_tbody" style={{ display: showCreditFields ? 'block' : 'none' }}>
                <div className="row">
                  <div className="form-group col-md-3 mt-2">
                    <label>Current Credit Limit (&nbsp; USD )</label>
                    <span id="agent_type">
                      <div>{Array.isArray(data?.creditLimit) && data.creditLimit.length > 0
    ? data.creditLimit[0].availableCreditLimit
    : ''}</div>
                      <input type="hidden" name="first_credit_limit" size={10} maxLength={10} defaultValue={0} className="required form-control form-control-sm" />
                    </span>
                  </div>
                  <div className="form-group col-md-3 mt-2">
                    <label>New Credit Limit &nbsp;( USD )</label>
                    <input
                      type="number"
                      className="required form-control form-control-sm"
                      name="txt_credit_limit"
                      value={newCreditLimit}
                      onChange={(e) => setNewCreditLimit(e.target.value)}
                      required={showCreditFields}
                    />
                  </div>
                  <div className="form-group col-md-3 mt-2">
                    <label>Credit Available &nbsp;( USD )</label>
                    <span id="agent_type">
                      <input className="required form-control form-control-sm" type="text" name="txt_credit_value" size={10} maxLength={10} defaultValue={data?.creditLimit?.[0]?.availableCreditLimit ?? '0.000'} disabled />
                    </span>
                  </div>
                  <div className="form-group col-md-3 mt-2">
                    <label>Credit Usages &nbsp;( USD )</label>
                    <span id="agent_type">
                      <input className="required form-control form-control-sm" type="text" name="txt_credit_value" size={10} maxLength={10} defaultValue={0.000} disabled />
                    </span>
                  </div>
                  <div className="form-group col-md-3 mt-2">
                    <label>Temp. Credit Limit &nbsp;( USD )</label>
                    <span id="agent_type">
                      <input
                        type="number"
                        className="required form-control form-control-sm"
                        name="txt_temp_credit_limit"
                        value={tempCreditLimit}
                        onChange={(e) => setTempCreditLimit(e.target.value)}
                        required={showCreditFields}
                      />
                    </span>
                  </div>
                  <div className="form-group col-md-3 mt-2">
                    <label>Temp. Credit limit Expiry Date</label>
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="input-group date col-md-12 col-sm-12 col-xs-12 departure_date" id="departure_date">
                          <Flatpickr
                            value={startDate}
                            onChange={(date) => setStartDate(date)}
                            options={{ dateFormat: "Y-m-d" }}
                            style={{ width: '120px' }}
                          />
                          <span className="input-group-addon pointer" id="dTrashBtn" onClick={handleTrashClick}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md-3 mt-2">
                    <label>Apply Credit Distribution</label><br />
                    <div className="radioline1">
                      <div className="radio radio-success radio-inline">
                        <input
                          type="radio"
                          name="credit_distribution"
                          value="0"
                          id="acd_no"
                          checked={applyCreditDistribution === '0'}
                          onChange={(e) => setApplyCreditDistribution(e.target.value)}
                        />
                        <label htmlFor="acd_no">No</label>
                      </div>
                      <div className="radio radio-success radio-inline">
                        <input
                          type="radio"
                          name="credit_distribution"
                          value="1"
                          id="acd_yes"
                          checked={applyCreditDistribution === '1'}
                          onChange={(e) => setApplyCreditDistribution(e.target.value)}
                        />
                        <label htmlFor="acd_yes">Yes</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md-3 mt-2">
                    <label>Temp. Credit Available</label>
                    <span id="agent_type">
                      <input className="form-control" type="text" name="txt_temp_credit_available" size={10} maxLength={10} defaultValue={data?.creditLimit?.[0]?.tempCreditLimit ?? '0.000'}  disabled />
                    </span>
                  </div>
                  <div className="form-group col-md-3 mt-2">
                    <label>Unallocated Amount</label>
                    <span id="agent_type">
                      <input className="form-control" type="text" name="txt_unallocated_amt" size={10} maxLength={10} defaultValue="0" disabled />
                    </span>
                  </div>
                  <div className="form-group col-md-3 mt-2">
                    <label>Main Agent's Available Credit</label>
                    <span id="agent_type">
                      <input className="form-control" type="text" name="txt_total_available" size={10} maxLength={10} defaultValue={parseFloat((data?.creditLimit?.[0]?.tempCreditLimit ?? 0))+parseFloat((data?.creditLimit?.[0]?.availableCreditLimit ?? 0)) } disabled />
                    </span>
                  </div>

                  <div className="form-group col-md-3 mt-2">
                    <label>Main Agent Credit Limit</label>
                    <span id="agent_type">
                      <input className="form-control" type="text" name="txt_total_available" size={10} maxLength={10} 
                      defaultValue=
                      
                      {Array.isArray(data?.creditLimit) && data.creditLimit.length > 0
                        ? data.creditLimit[0].availableCreditLimit
                        : '0.000'}
                     disabled />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
                          <div className="form-group col-md-12">
                              <input type="hidden" name="action" value="insert_tax_registration" />
                              <button type="submit" class="btn btn-dark btn-sm" value="Submit" id="submit_button"
                              >
                                  <i class="fa fa-floppy-o"></i>&nbsp;Save
                              </button>&nbsp;&nbsp;
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

export default connect(mapStateToProps)(CustomersAgentCreditLimit);
