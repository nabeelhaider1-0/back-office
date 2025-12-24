import { deliveryStatusOptions } from "../../../constants/contants";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";


const RewardsDeliveryEdit = () => {

    return (
        <>
            <Header2 title="EDIT REWARDS DELIVERY" linkText1="Search Rewards" linkText2="Edit Rewards Detail" link1={Constants.URLConstants.TOOLSREWARDSDELIVERY}
            />
            <div class="container-fluid pt-0 p-4" id="content-pad">
                <form>


                    <div class="panel-body">
                        <div class="row">
                            <div class="form-group col-md-3">
                                <label>Order ID</label>
                                <div>OD0035</div>
                            </div>
                            <div class="form-group col-md-3">
                                <label>Product Name</label>
                                <div>Plasma TV</div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="form-group col-md-12">
                                <label>Shipping Address</label>
                                <textarea class="dropdown-toggle btn-default form-control form-control-sm test123"
                                    name="delivery_address" id="delivery_address" maxlength="255" style={{ fontSize: '12px' }}
                                    cols="30" rows="5" data-toggle="tooltip" data-placement="top"
                                    data-original-title="Max 255 Characters" aria-describedby="tooltip103665">Mumbai</textarea>


                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="form-group col-md-3">
                                <label>Delivery Status</label>
                                <MultiSelect
                                    options={deliveryStatusOptions}
                                    isSearchable
                                    placeholder="Select Delivery Status"
                                    className="custom-select"
                                    noOptionsMessage={() => "No Delivery Found"}
                                />


                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="form-group col-md-12">
                                <button type="button" name="loyality_add_tier_add_btn" class="btn btn-dark btn-sm" value="Submit"
                                    onclick="submit_form()">
                                    <i class="fa fa-floppy-o"></i>
                                    &nbsp;Save
                                </button>
                            </div>
                        </div>
                    </div>



                </form>

            </div>
        </>
    );
};
export default RewardsDeliveryEdit;
