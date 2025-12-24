import { useNavigate } from "react-router-dom";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { useEffect, useState } from "react";
import { ErrorApiAlert, SuccessApiToast } from "../../../constants/globalfunctions";
import { getDATA, putMultiDATA } from "../../../Apis/API";
import { connect } from "react-redux";
import ApiRoutes from "../../../constants/ApiRoutes";


const MastersLoyalityProgramTiersEdit = ({data}) => {
  const navigateOnRefresh = useNavigate();
  const [currencyOptions, setcurrencyOptions] = useState([]);

  const [formData, setFormData] = useState({
    tierName: "",
  currency: "",
  toEarn: "",
  toEarnConvertionPoints: "",
  toRedeem:"",
  minimumPointsRequired: "",
  toRedeemConvertionPoints:""
  });
    const getCurrencies = async () => {

    try {

      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.CURRENCIES.CURRENCY);
      if (response.data.statusCode === 200) {
        const currencies =response && response.data.data ? response.data.data : [];
       
      
        const options = currencies.map((curr) => ({
          value: curr.currencyCode,
          label: curr.currency,
        }));
        setcurrencyOptions(options);
        
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert('Error Fetching Currencies');
    } finally {

      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
    getCurrencies();
  }, []);


  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData({
        uuid:data.uuid,
        tierName: data.tierName,
        currency: data.currency,
        toEarn: data.toEarn,
        toEarnConvertionPoints: data.toEarnConvertionPoints,
        toRedeem:data.toRedeem,
        minimumPointsRequired: data.minimumPointsRequired,
        toRedeemConvertionPoints:data.toRedeemConvertionPoints
      });
    } else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(
        Constants.URLConstants.MASTERSLOYALITYPROGRAMTIERSSEARCH
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, navigateOnRefresh]);
  const handleSingleSelectChange = (selectedOption, name) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: selectedOption.value // Assuming the option object has a 'value' property
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

 
      try {
        const response = await putMultiDATA(
          ApiRoutes.LOYALTY_PROGRAM.TIERS,
          formData
        );
     
        if (response.data.statusCode === 200) {
          SuccessApiToast("Loyalty Tier Updated Successfully");

          navigateOnRefresh(Constants.URLConstants.MASTERSLOYALITYPROGRAMTIERSSEARCH);
        }
      } catch (error) {
        ErrorApiAlert("Error Updating Loyalty Tier");
      }
    
  };
  return (
    <>
      <Header2
        title="EDIT LOYALTY TIER"
        linkText1="Search Loyalty Tier"
        linkText2="Add Loyalty Tier"
        link1={Constants.URLConstants.MASTERSLOYALITYPROGRAMTIERSSEARCH}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}  id="loyaltytiereditform">
          <input type="hidden" name="action" defaultValue="insertLoyalityTier" />
          <div className="panel-body">
          <div className="row">
              <div className="form-group col-md-3 ">
                <label>Tier Name</label>
                <input className="required form-control form-control-sm test123" type="text"  size={15} maxLength={280}
                 name="tierName" 
                 id="tierName"
                value={formData.tierName}
                onChange={handleInputChange}
                required
                />
              </div>
              <div className="form-group col-md-3 ">
                <label>Currency</label>
                <MultiSelect
                  options={currencyOptions}
                  isSearchable
                  placeholder="- Select Currency -"
                  className="custom-select required"
                  value={currencyOptions.find(option => option.value === formData.currency)}
                  onChange={(selectedOption) => handleSingleSelectChange(selectedOption, 'currency')}
                  noOptionsMessage={() => "No Currency Found"}
required
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12 loyaty_bkngdv ">
                <label>To Earn</label>
                <div className="row">
                  <div className="col-md-3">
                    <label>For every sale of</label>
                    <input className="form-control form-control-sm required" type="text"  maxLength={20} style={{ width: '85%' }}
                    
                    name="toEarn" 
                    id="toEarn"
                   value={formData.toEarn}
                   onChange={handleInputChange}
                   required/>
                    <span className="currency_code" style={{ float: 'right', marginTop: '-23px', marginRight: '23px' }}>USD</span>
                  </div>
                  <div className="col-md-3">
                    <label>Convertion points</label>
                    <input className="form-control form-control-sm required" type="text" maxLength={20} style={{ width: '85%' }}
                     name="toEarnConvertionPoints" 
                     id="toEarnConvertionPoints"
                    value={formData.toEarnConvertionPoints}
                    onChange={handleInputChange}
                    required
                    />
                    <span className="currency_code" style={{ float: 'right', marginTop: '-23px', marginRight: '23px' }}>Unit</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12 loyaty_bkngdv ">
                <div className="row">
                  <div className="col-md-12">
                    <label>To Redeem</label>
                  </div>
                  <div className="col-md-3 form-group">
                    <label>For every sale of</label>
                    <input className="form-control form-control-sm required" type="text"  maxLength={20} style={{ width: '85%' }} 
                     name="toRedeem" 
                     id="toRedeem"
                    value={formData.toRedeem}
                    onChange={handleInputChange}
                    required
                    />
                    <span className="currency_code" style={{ float: 'right', marginTop: '-23px', marginRight: '23px' }}> USD</span>
                  </div>
                  <div className="col-md-3 form-group">
                    <label>Convertion points</label>
                    <input className="form-control form-control-sm required" type="text"  maxLength={20} style={{ width: '85%' }}
                     name="toRedeemConvertionPoints" 
                     id="toRedeemConvertionPoints"
                    value={formData.toRedeemConvertionPoints}
                    onChange={handleInputChange}
                    required
                    />
                    <span style={{ float: 'right', marginTop: '-23px', marginRight: '23px' }}>Unit</span>
                  </div>
                  <div className="col-md-3 form-group">
                    <label>Minimum Points Required</label>
                    <input className="form-control form-control-sm required" type="text"  maxLength={20} style={{ width: '85%' }}
                    name="minimumPointsRequired" 
                    id="minimumPointsRequired"
                   value={formData.minimumPointsRequired}
                   onChange={handleInputChange}
                   required
                    />
                    <span style={{ float: 'right', marginTop: '-23px', marginRight: '23px' }}>Unit</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group mt-2">
              <button type="submit" className="btn btn-dark btn-sm" name="loyality_add_tier_add_btn" value="submit" onclick="validate()">
                <i className="fa fa-floppy-o" />&nbsp;&nbsp;Save
              </button>
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
export default connect(mapStateToProps)(MastersLoyalityProgramTiersEdit);