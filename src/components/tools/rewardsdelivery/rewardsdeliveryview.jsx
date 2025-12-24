import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";

const RewardsDeliveryView = () => {

  return (
    <>
      <Header2 title="VIEW REWARDS DELIVERY" linkText1="Search Rewards" linkText2="View Rewards Detail"link1={Constants.URLConstants.TOOLSREWARDSDELIVERY}
       />
      <div class="container-fluid pt-0 p-4" id="content-pad">
      <form>



      <div class="panel-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="form-group col-md-3">
                                <label>Order ID</label>
                                <div>OD0035</div>
                            </div>
                             <div class="form-group col-md-3">
                                <label>Product ID</label>
                                <div>PD0047</div>
                            </div>
                             <div class="form-group col-md-3">
                                <label>Product Name</label>
                                <div>Plasma TV</div>
                            </div>
                            <div class="form-group col-md-3">
                                <label>Agent Code</label>
                                <div>CD0161</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-3">
                                <label>Agent Username</label>
                                <div>nida_main</div>
                            </div>
                            <div class="form-group col-md-3">
                                <label>Shipping Address</label>
                                <div>Mumbai</div>
                            </div>
                            <div class="form-group col-md-3">
                                <label>Delivery Status</label>
                                <div>								Order Placed
								</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


</form>

      </div>
    </>
  );
};
export default RewardsDeliveryView;
