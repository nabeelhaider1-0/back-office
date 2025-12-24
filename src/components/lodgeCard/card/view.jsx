import { useState } from "react";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";


const   ViewCard = () => {
    const [isHidden, setIsHidden] = useState(true);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };
     return(
        <>
        <Header2 title="VIEW LODGE CARD DETAILS " linkText1="View Lodge Card " linkText2="Edit Lodge Card" link2={Constants.URLConstants.EDITCARD}/>
        <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
        <div class="panel-body">
                <div class="row form-group">
                    <div>
                        <h5>MASTER CARD</h5>
                    </div>
                </div>
                <div class="row">

                    <div class="form-group col-md-3">
                        <label>Agent</label>
                        <div>
                            VARTAK HOLIDAZZLE [CD0195-ROHAN] [ROHAN-VARTAK]
                        </div>
                    </div>

                    <div className="form-group col-md-3">
      <label>Card ID</label>
      <div>
        <span id="mask_card" style={{ display: isHidden ? "inline" : "none" }}>XXXXXXXXXXXXXe33</span>
        <span id="unmask_card" style={{ display: isHidden ? "none" : "inline" }}>6375cabf6fe33</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          type="button"
          className="submit btn btn-dark btn-sm"
          style={{ padding: "2px 8px !important", display: "inline-block" }}
          onClick={toggleVisibility}
        >
          {isHidden ? "Show" : "Hide"}
        </button>
      </div>
    </div>
                </div>
            </div>
            <br/>
            <div class="row">

                <div class="form-group col-md-3">
                    <label>Card Number</label>
                    <div>
                        XXXX-XXXX-XXXX-0007
                    </div>
                </div>
                <div class="form-group col-md-3">
                    <label>Card Type</label>
                    <div>
                        MASTERCARD &nbsp;
                        <img src="mastercard.png" alt="" width="24" height="auto"/>
                    </div>
                </div>
            </div>
            <br/>
            <div class="row">

                <div class="form-group col-md-3">
                    <label>Card Expiry</label>
                    <div>
                        05 / 21
                    </div>
                </div>
                <div class="form-group col-md-3">
                    <label>Card Holder Name</label>
                    <div>
                        ROHAN VARTAK
                    </div>
                </div>
            </div>
            <br/>
            <div class="row">

                <div class="form-group col-md-3">
                    <label>Status</label>
                    <div>
                        <b style={{color:"#2b8600"}}>Active</b>
                    </div>
                </div>
                <div class="form-group col-md-3">
                    <label>Token Status</label>
                    <div>
                        <b style={{color:"#2b8600"}}>Valid</b>
                    </div>
                </div>
            </div>

            <br/>
            
        </form>
        </div>

        </>
     )
}
export default ViewCard