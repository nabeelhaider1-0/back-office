import Header2 from "../../header2/header2";
import {  useEffect, useState } from "react";
import {   getDATAONE, putMultiDATA } from "../../../Apis/API";
import { ErrorApiAlert, SuccessApiToast } from "../../../constants/globalfunctions";
import ApiRoutes from "../../../constants/ApiRoutes";

const MasterPaymentPerTransactionLimit = () => {
 
  const [formData, setFormData] = useState({
    transactionLimit: ""
  });

  const getpertranlimit= async () => {

    try {
    
      // Set loading to true when fetching data
      const response = await getDATAONE(ApiRoutes.PAYMENT_GATEWAYS.LIMIT_PER_TRANSACTION,"f1dfe875-b803-4d04-abd9-c63053bf8e55");
      if (response.data.statusCode === 200) {
        const limit =response && response.data.data ? response.data.data : [];
 
         setFormData({
          uuid:"f1dfe875-b803-4d04-abd9-c63053bf8e55",
            transactionLimit: limit.transactionLimit
          });
        
        
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert('Error Fetching Transaction Limit');
    } finally {
    
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
    getpertranlimit();
  }, []);
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
     
    const response = await putMultiDATA(ApiRoutes.PAYMENT_GATEWAYS.LIMIT_PER_TRANSACTION,formData);

    if (response.data.statusCode === 200) {
    
      SuccessApiToast( "Per Transaction Limit  Updated Successfully");
      
     
    }
  } catch (error) {
    ErrorApiAlert('Error Updating Per Transaction Limit');
    //  console.error(error)
  }
  }


  return (
    <>
      <Header2
        title="LIMIT FOR EVERY TRANSACTION"
    
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
      <form onSubmit={handleSubmit}  id="paymentgatewayaddnew">
  <input type="hidden" name="action" defaultValue="add" />
  <div className="panel-body">
    <div className="row">
      <div className="form-group col-md-3">
        <label>Set Each Transaction Limit(USD)</label>
        <input className="required form-control form-control-sm test123" 
        type="text" 
        name="transactionLimit" 
        id="transactionLimit"
       value={formData.transactionLimit}
       onChange={handleInputChange}
       required
        
        />
      </div>
      
    </div>
    <br />
    <button type="submit" className="btn btn-dark btn-sm form-group" name="add" value="SUBMIT">
      <i className="fa fa-floppy-o" />&nbsp;Add
    </button>
  </div>
</form>



      </div>
    </>
  );
};
export default MasterPaymentPerTransactionLimit;