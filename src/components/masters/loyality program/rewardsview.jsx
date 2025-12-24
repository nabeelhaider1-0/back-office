
import {useNavigate } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

const MastersLoyalityProgramRewardsView = ({data}) => {
  const [currentImage, setCurrentImage] = useState("");
  const navigateOnRefresh = useNavigate();
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
   

   
    } else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(Constants.URLConstants.MASTERSLOYALITYPROGRAMREWARDSSEARCH);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, navigateOnRefresh]);

  const modalImageSetter = (image) => {
    setCurrentImage(image);
  };
  return (
    <>
      <Header2
        title="VIEW PRODUCT DETAIL"
        linkText1="Search Product"
        linkText2="View Product Details"
        link1={Constants.URLConstants.MASTERSLOYALITYPROGRAMREWARDSSEARCH}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">

      <form>
  <div className="panel-body">
    <div className="row">
      <div className="form-group col-md-3">
        <label>Product Name</label>
        <div>{data.productName}</div>
      </div>
      <div className="form-group col-md-3">
        <label>Product Category</label>
        <div>{data.productCategoryUuid.productCategoryName}</div>
      </div>
     
      <div className="form-group col-md-3">
        <label>Points Required</label>
        <div>100</div>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-3">
        <label>Product Count</label>
        <div>{data.availableProduct}</div>
      </div>
      <div className="form-group col-md-3">
        <label>Loyalty Tier Name</label>
        <div>{data.tierUuid.tierName}</div>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-12">
        <label>Description</label>
        <div>{data.description}</div>
      </div>	
    </div>
    <div className="form-group col-md-6 ">
        <label>Product Image</label>
        <br />
        {data.productImage === ""||data.productImage === null ? (
    <div><div className>
    No Preview. </div></div> 
) : (
    <div className="hotelmainimage" onClick={() => {
        modalImageSetter(
          data.productImage
        );
    }}
    
    >
        <img
            src={data.productImage}
            alt="Main Hotel Pic"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            
        />
    </div> 
)}
      </div>
    <div className="row">
      <div className="form-group col-md-12">
      </div>
    </div>
  </div>
   {/* Modal */}
   <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content imageWidthSetter">
                <div className="modal-body bodyimagecross">
                  <button
                    type="button"
                    className="btn-close imagebtnclose"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                  <img
                    src={currentImage}
                    alt="Main Hotel Pic"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    className="modalShowImage"
                  />
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
export default connect(mapStateToProps)(MastersLoyalityProgramRewardsView);