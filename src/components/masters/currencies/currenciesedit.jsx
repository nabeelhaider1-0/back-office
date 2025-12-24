
import { connect } from "react-redux";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorApiAlert, SuccessApiToast } from "../../../constants/globalfunctions";
import {  putMultiDATA } from "../../../Apis/API";
import ApiRoutes from "../../../constants/ApiRoutes"

const MastersCurrenciesEdit = ({data}) => {

  const navigateOnRefresh = useNavigate();
  const [formData, setFormData] = useState({
    uuid:"",
    currency: "",
  currencyCode: "",
  currencySymbol: "",
  currencyDescription: ""
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData({
        uuid:data.uuid,
        currency: data.currency,
      currencyCode: data.currencyCode,
      currencySymbol: data.currencySymbol,
      currencyDescription: data.currencyDescription
      });
    } else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(
        Constants.URLConstants.MASTERSCURRENCIESSEARCH
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, navigateOnRefresh]);

  // create handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

 
      try {
        const response = await putMultiDATA(
          ApiRoutes.CURRENCIES.CURRENCY,
          formData
        );
     
        if (response.data.statusCode === 200) {
          SuccessApiToast("Currency Updated Successfully");

          navigateOnRefresh(Constants.URLConstants.MASTERSCURRENCIESSEARCH);
        }
      } catch (error) {
        ErrorApiAlert("Error Updating Currency");
      }
    
  };
  return (
    <>
      <Header2
        title="EDIT CURRENCY"
        linkText1="View Currencies "
        linkText2="Edit Currencies "
        link1={Constants.URLConstants.MASTERSCURRENCIESSEARCH}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
      <form onSubmit={handleSubmit}  id="currencyeditform">
  <input type="hidden" name="action" defaultValue="insert" />
  <div className="panel-body">
    <div className="message" style={{display: 'none'}}>
    </div>
    <div className="row">
      <div className="col-md-2 form-group">
        <div className="checkbox checkbox-success">
          <input id="checkbox1" type="checkbox" name="display_in_search"   className="test123" />
          <label htmlFor="checkbox1"> Display on search</label>
        </div>
      </div>
    </div>
    <div className="row mt-2">
      <div className="form-group col-md-3">
        <label>Currency</label>
        <input className="required form-control form-control-sm" type="text" 
          name="currency" 
          id="currency"
         value={formData.currency}
         onChange={handleInputChange}
         required
        
        />
      </div>
      <div className="form-group col-md-3">
        <label>Currency Code</label>
        <input className="required form-control form-control-sm" type="text" 
         name="currencyCode" 
         id="currencyCode"
        value={formData.currencyCode}
        onChange={handleInputChange}
        required
        
        />
      </div>
      <div className="form-group col-md-3">
        <label>Currency Symbol</label>
        <input className="form-control form-control-sm" type="text" 
         name="currencySymbol" 
         id="currencySymbol"
        value={formData.currencySymbol}
        onChange={handleInputChange}
        />
      </div>
    </div>
    <div className="form-group row mt-2">
      <div className="form-group col-md-12">
        <label>Currency Description</label>
        <textarea className="form-control form-control-sm"  rows={4} cols={50} defaultValue={""}
        
        name="currencyDescription" 
        id="currencyDescription"
       value={formData.currencyDescription}
       onChange={handleInputChange}
        />
      </div>
    </div>
    <button className="btn btn-dark btn-sm form-group mt-3" type="submit" value="Save">
      <i className="fa fa-floppy-o" />&nbsp;Save
    </button>
  </div>
</form>

      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps)(MastersCurrenciesEdit);