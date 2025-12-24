import { connect } from "react-redux";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { hoursminutesformater } from "../../../constants/globalfunctions";

const MastersTourAndActivityView = ({ data }) => {
  const [currentImage, setCurrentImage] = useState("");

  const modalImageSetter = (image) => {
    setCurrentImage(image);
  };

  const navigateOnRefresh = useNavigate();
  useEffect(() => {
   
    if (data && Object.keys(data).length > 0) {


     }

     else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(Constants.URLConstants.MASTERSTOURSANDACTIVITIESSEARCH);
    }
  }, [data, navigateOnRefresh]);
  return (
    <>
      <Header2 title="VIEW ACTIVITY DETAILS" linkText1="List Activity" linkText2="View Activity" link1={Constants.URLConstants.MASTERSTOURSANDACTIVITIESSEARCH} />
      <div class="container-fluid pt-0 p-4" id="content-pad">
     


      <form>
  <div className="panel-body">
    <div className="row">
      <div className="form-group col-md-3">
        <label>Country</label>
        <div>
        {data.country}
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>City</label>
        <div>
          {data.city}
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Activity Type</label>
        <div>
          {data.activityTypeUuid}
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Activity Category</label>
        <div>
         {data.subActivityTypeUuid}
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Activity Name</label>
        <div>
          {data.activityName}
        </div>
      </div>
      <div className="form-group col-md-3">
        <label>Location</label>
        <div>
          
        </div>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-3">
        <label>Duration</label>
        <div>
        {hoursminutesformater(data.duration)}
        </div>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-12">
        <label>Activity Highlights</label>
        <div>
        {data.activityHighlights}
        </div>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-12">
        <label>Activity Description</label>
        <div>
        {data.activityDescrition}
        </div>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-12">
        <label>Restriction</label>
        <div>
        {data.restriction}
        </div>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-12">
        <label>Activity Details</label>
        <div>
        {data.activityDetails}
        </div>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-12">
        <label>Includes</label>
        <div>
          {data.includes}
        </div>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-12">
        <label>Excludes</label>
        <div>
          {data.excludes}
        </div>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-12">
        <label>Terms and Conditions</label>
        <div>
          {data.termsConditions}
        </div>
      </div>
    </div>
    <div className="row">
    <div className="form-group col-md-3">
                <label>Main Image</label>
                {data.mainImage === "" ? (
    <div><div className>
    No Preview. </div></div> 
) : (
    <div className="hotelmainimage" onClick={() => {
        modalImageSetter(
          data.mainImage
        );
    }}>
        <img
            src={data.mainImage}
            alt="Main Hotel Pic"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
        />
    </div> 
)}

              </div>
      <div className="form-group col-md-3">
        <label>Optional Image 1</label><br />
        {data.optionalImageOne === "" ? (
    <div><div className>
    No Preview. </div></div> 
) : (
    <div className="hotelmainimage" onClick={() => {
        modalImageSetter(
          data.optionalImageOne
        );
    }}>
        <img
            src={data.optionalImageOne}
            alt="Main Hotel Pic"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
        />
    </div> 
)}
      </div>
      <div className="form-group col-md-3">
        <label>Optional Image 2</label><br />
        {data.optionalImageTwo === "" ? (
    <div><div className>
    No Preview. </div></div> 
) : (
    <div className="hotelmainimage" onClick={() => {
        modalImageSetter(
          data.optionalImageTwo
        );
    }}>
        <img
            src={data.optionalImageTwo}
            alt="Main Hotel Pic"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
        />
    </div> 
)}
      </div>
      <div className="form-group col-md-3">
        <label>Optional Image 3</label><br />
        {data.optionalImageThree === "" ? (
    <div><div className>
    No Preview. </div></div> 
) : (
    <div className="hotelmainimage" onClick={() => {
        modalImageSetter(
          data.optionalImageThree
        );
    }}>
        <img
            src={data.optionalImageThree}
            alt="Main Hotel Pic"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
        />
    </div> 
)}
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-3">
        <label>Optional Image 4</label><br />
        {data.optionalImageFour === "" ? (
    <div><div className>
    No Preview. </div></div> 
) : (
    <div className="hotelmainimage" onClick={() => {
        modalImageSetter(
          data.optionalImageFour
        );
    }}>
        <img
            src={data.optionalImageFour}
            alt="Main Hotel Pic"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
        />
    </div> 
)}
      </div>
      <div className="form-group col-md-3">
        <label>Optional Image 5</label><br />
        {data.optionalImageFive === "" ? (
    <div><div className>
    No Preview. </div></div> 
) : (
    <div className="hotelmainimage" onClick={() => {
        modalImageSetter(
          data.optionalImageFive
        );
    }}>
        <img
            src={data.optionalImageFive}
            alt="Main Hotel Pic"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
        />
    </div> 
)}
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

export default connect(mapStateToProps)(MastersTourAndActivityView);