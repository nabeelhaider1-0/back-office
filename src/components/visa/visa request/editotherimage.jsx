import { useState } from "react";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { updateOfflineVisaImages } from "../../../state/action/visaActions";
import uploadFile from "../../../constants/filesuploader";

const VIsaEditOtherImage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const imageId = queryParams.get("imageId");
  const { id } = useParams();

  console.log(imageId);
  const [image, setImage] = useState(null);

  // const [passportPageOne, setPassportPageOne] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log(file);
  };
  // console.log(image.type);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      const s3Image = await uploadFile(image);
      console.log(s3Image);

      if (!s3Image || !s3Image.imagelink) {
        alert("Image upload failed, please try again");
        return;
      }

      // setPassportPageOne(s3Image.imagelink);

      dispatch(updateOfflineVisaImages(id, { otherImage: s3Image.imagelink }));

      // console.log("Image successfully uploaded and API called");
    } catch (error) {
      console.error("Error uploading image or updating visa image:", error);
      alert("There was an error, please try again.");
    }
  };
  return (
    <>
      <Header2
        title="EDIT OTHER IMAGE"
        linkText1="Visa Bookings"
        linkText2="Edit Other Image"
        link1={Constants.URLConstants.VISASERACHVISAREQUESTS}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div>
              <div className="row">
                <div className="form-group col-md-12">
                  <div className="form-group col-md-12 row">
                    <div className="phps_row_1">
                      <div className="padd_5" align="left">
                        <label>
                          Other Image(Size of file should be less than 39kb. (in
                          jpeg, jpg, png, bmp or gif file format only))
                        </label>
                        {imageId ? (
                          <img src={imageId} style={{width:'100%'}}/>
                        ) : (
                          <h2>PLease Select Image</h2>
                        )}
                        <span className="uniqFile input-group">
                          <span className="input-group-addon fa fa-upload myInputFile">
                            <input
                              type="file"
                              size={30}
                              name="passport_photo"
                              id="passport_photo"
                              className="test123"
                              onChange={handleImage}
                            />
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="phps_row_0">
                      <div className="padd_5 mt-4" align="left">
                        <button
                          className="btn btn-dark btn-sm form-group"
                          type="submit"
                          value="Save"
                          onClick={handleSubmit}
                        >
                          <i className="fa fa-floppy-o" />
                          &nbsp;Save
                        </button>
                      </div>
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
export default VIsaEditOtherImage;
