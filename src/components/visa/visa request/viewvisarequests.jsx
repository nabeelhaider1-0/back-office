import { Link, useParams } from "react-router-dom";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinfleOfflineVisa } from "../../../state/action/visaActions";

const VIsaViewRequests = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleVisaData = useSelector(
    (state) => state.visa.singleOfflineVisaData.data
  );
  console.log(id);
console.log(singleVisaData)
  useEffect(() => {
    if (id) {
      dispatch(getSinfleOfflineVisa(id));
    }
  }, [id]);



  return (
    <>
      <Header2
        title="VIEW VISA APPLICATION"
        linkText1="Visa Bookings"
        linkText2=" View Visa Application"
        link1={Constants.URLConstants.VISASERACHVISAREQUESTS}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-12 form-group mb-2" id="ok">
                <h5>Agency Details</h5>
              </div>
              <div className="form-group col-md-3">
                <label>Agency</label>
                <div>QTECH - POONAM PATIL</div>
              </div>
              <div className="form-group col-md-3">
                <label>Visa With Hotel</label>
                <div></div>
              </div>
              <div className="form-group col-md-3">
                <label>Visa Request No.</label>
                <div></div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12 form-group mb-2">
                <h5>Personal Information</h5>
              </div>
              <div className="form-group col-md-3">
                <label>First Name</label>
                <div>{singleVisaData?.firstName}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Middle Name</label>
                <div>{singleVisaData?.middleName}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Last Name</label>
                <div>{singleVisaData?.lastName}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Father Name</label>
                <div>{singleVisaData?.fatherName}</div>
              </div>
              <div className="form-group col-md-3 mt-2">
                <label>Mother Name</label>
                <div>{singleVisaData?.motherName}</div>
              </div>
              <div className="form-group col-md-3 mt-2">
                <label>Husband Name</label>
                <div>{singleVisaData?.husbandName}</div>
              </div>
              <div className="form-group col-md-3 mt-2">
                <label>Language Spoken : Required</label>
                <div>{singleVisaData?.languageOne}</div>
              </div>
              <div className="form-group col-md-3 mt-2">
                <label>Language Spoken : (Optional)</label>
                <div>{singleVisaData?.languageTwo}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 form-group mb-2">
                <h5>Personal Information (Continued)</h5>
              </div>
              <div className="form-group col-md-3">
                <label>Gender</label>
                <div>{singleVisaData?.gender}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Marital Status</label>
                <div>{singleVisaData?.martialStatus}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Present Nationality</label>
                <div>{singleVisaData?.presentNationality}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Birth Date</label>
                <div>{singleVisaData?.birthDate}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Birth Place</label>
                <div>{singleVisaData?.birthPlace}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Birth Country</label>
                <div>{singleVisaData?.birthCountry}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Religion</label>
                <div>{singleVisaData?.religion}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 form-group mb-2">
                <h5>Passport Details &amp; Address</h5>
              </div>
              <div className="form-group col-md-3">
                <label>Passport No</label>
                <div>{singleVisaData?.passportNo}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Passport Type</label>
                <div>{singleVisaData?.passportType}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Passport Issuing Government</label>
                <div>{singleVisaData?.passportIssuingGovt}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Passport Issuing Country</label>
                <div>{singleVisaData?.passportIssuingCountry}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Place Of Issue</label>
                <div>{singleVisaData?.placeofIssue}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Date Of Issue</label>
                <div>{singleVisaData?.DateofIssue}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Expiration Date</label>
                <div>{singleVisaData?.expirationDate}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Address Line1</label>
                <div>{singleVisaData?.addressLineOne}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Address Line2</label>
                <div>{singleVisaData?.addressLineTwo}</div>
              </div>
              <div className="form-group col-md-3">
                <label>City</label>
                <div>{singleVisaData?.city}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Country</label>
                <div>{singleVisaData?.country}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Telephone</label>
                <div>{singleVisaData?.telephone}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 form-group mt-2 mb-2">
                <h5>Travel Details</h5>
              </div>
              <div className="form-group col-md-3">
                <label>Expected Arrival Date</label>
                <div>{singleVisaData?.arrivalDate}</div>
              </div>
              <div className="form-group col-md-3">
                <label>Expected Departure Date</label>
                <div>{singleVisaData?.departureDate}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 form-group mt-2 mb-2">
                <h5>Attachments</h5>
              </div>
              <div className="form-group col-md-3">
                <label>Personal Photo</label>
                <div>
                  <Link
                    to="http://beta.tdonlines.com/project_folder/tdonline/uploads/visa_images/1640245684ps_screenshot-alpha.hotel.riya.travel-2021.11.23-19_29_59.png"
                    target="_blank"
                    data-placement="top"
                    data-toggle="tooltip"
                    title
                    data-original-title="Click here to view Personal Image"
                  >
                    {/* <i className="fa fa-eye" /> */}
                    <img src={singleVisaData?.personalPhoto} style={{width:'150px'}}/>
                  </Link>
                </div>
              </div>
              <div className="form-group col-md-3">
                <label>Passport (Front View)</label>
                <div>
                  <Link
                    to="http://beta.tdonlines.com/project_folder/tdonline/uploads/visa_images/1640245684pp_screenshot-alpha.hotel.riya.travel-2021.12.07-16_50_06.png"
                    target="_blank"
                    data-placement="top"
                    data-toggle="tooltip"
                    title
                    data-original-title="Click here to view Front Passport Image"
                  >
                    {/* <i className="fa fa-eye" /> */}
                    <img src={singleVisaData?.personalPhoto} style={{width:'150px'}}/>
                  </Link>
                </div>
              </div>
              <div className="form-group col-md-3">
                <label>Observation Page</label>
                <div>
                  <Link
                    to="http://beta.tdonlines.com/project_folder/tdonline/uploads/visa_images/1640245684ppb_screenshot-alpha.hotel.riya.travel-2021.12.07-16_46_49.png"
                    target="_blank"
                    data-placement="top"
                    data-toggle="tooltip"
                    title
                    data-original-title="Click here to view Observation Page"
                  >
                    {/* <i className="fa fa-eye" /> */}
                    <img src={singleVisaData?.personalPhoto} style={{width:'150px'}}/>
                  </Link>
                </div>
              </div>
              <div className="form-group col-md-3">
                <label>Arabic Page</label>
                <div>
                  <div className="input-group">
                    <div className="col-md-12 row">No Image Available</div>
                    <Link
                      to="visa_details.php?action=change_arbic_image&visa_id=136"
                      data-placement="top"
                      data-toggle="tooltip"
                      title
                      className="input-group-addon"
                      data-original-title="Click here to Add"
                    >
                      <i className="fa fa-plus" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-3">
                <label>Extension Page</label>
                <div>
                  <div className="input-group">
                    <div className="col-md-12 row">No Image Available</div>
                    <Link
                      className="input-group-addon"
                      to="visa_details.php?action=change_extension_image&visa_id=136"
                      data-placement="top"
                      data-toggle="tooltip"
                      title
                      data-original-title="Click here to Add"
                    >
                      <i className="fa fa-plus" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-3">
                <label>Other Image</label>
                <div>
                  <div className="input-group">
                    <div className="col-md-12 row">No Image Available</div>
                    <Link
                      className="input-group-addon"
                      to="visa_details.php?action=change_other_image&visa_id=136"
                      data-placement="top"
                      data-toggle="tooltip"
                      title
                      data-original-title="Click here to Add"
                    >
                      <i className="fa fa-plus" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n                       }\n            .input-group-addon {\n                width: 27px !important;\n                margin-left: 122px !important;\n                margin-top: -25px !important;\n}\n        ",
            }}
          />
        </form>
      </div>
    </>
  );
};
export default VIsaViewRequests;
