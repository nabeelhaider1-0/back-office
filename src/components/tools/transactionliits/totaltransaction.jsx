import React, { useState } from "react";
import Header2 from "../../header2/header2";
const TotalTransaction = () => {
  const [transactionLimit, setTransactionLimit] = useState("1000000.000");

  return (
    <>
      <Header2 title="TOTALLIMIT" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div class="panel-body">
            <div class="mesID"></div>
            <div class="row">
              <div class="form-group col-md-3">
                <label>Today Usages</label>
                <br />
                <label>116767.261 USD</label>
              </div>
              <div class="form-group col-md-3">
                <label>Total Limit (USD)</label>
                <input
                  class="required form-control form-control-sm test123"
                  onblur="extractNumber(this,3,false);"
                  onkeyup="extractNumber(this,3,false);"
                  type="text"
                  value={transactionLimit}
                  name="daylimit"
                  id="daylimit"
                  onChange={(e) => setTransactionLimit(e.target.value)}
                />
              </div>
            </div>

            <div class="col-md-12 form-group mt-3">
              <button
                class="btn btn-dark btn-sm form-group"
                type="button"
                name="actionbtn"
                value="Submit"
                onclick="callPerdaySubmit();"
              >
                <i class="fa fa-floppy-o"></i>&nbsp;&nbsp;Save
              </button>
              &nbsp;&nbsp;
              <button
                class="btn btn-outline-secondary btn-sm form-group"
                type="button"
                name="resetbtn"
                value="Reset"
                onclick="callResetAction();"
              >
                <i class="fa fa-repeat"></i>&nbsp;&nbsp;Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default TotalTransaction;
