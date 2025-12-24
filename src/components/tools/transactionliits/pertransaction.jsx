
import React, { useState } from 'react';    
import Header2 from '../../header2/header2';
const PerTransaction = () => {
    const [transactionLimit, setTransactionLimit] = useState('35000.000');

  return (
    <>
      <Header2 title="LIMIT FOR EVERY TRANSACTION" 
       />
      <div class="container-fluid pt-0 p-4" id="content-pad">
      <form>
      <div class="panel-body">
                <div class="row form-group">
                    <div class="mesID"></div>
                    <div class="form-group col-md-3">
                        <label>Set Each Transaction Limit(USD)</label>
                        <input class="required form-control form-control-sm test123" type="text" value={transactionLimit}
                      name="transclimit" id="transclimit" onChange={(e) => setTransactionLimit(e.target.value)}/>
                    </div>
                </div>
                <button class="btn btn-dark btn-sm form-group mt-4" type="button" name="actionbtn" value="Submit"
                    onclick="callPerTranscSubmit();">
                <i class="fa fa-floppy-o"></i>&nbsp;&nbsp;Save
                </button>
            </div>

     </form>









      </div>
    </>
  );
};
export default PerTransaction;
