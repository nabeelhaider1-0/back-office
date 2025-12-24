import { Link, useNavigate } from "react-router-dom";
import Constants from "../../constants/routes";
import Header2 from "../header2/header2";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { Slide, toast } from "react-toastify";
import { updateSiteMap } from "../../Apis/API";

const SiteMapEdit = ({ data }) => {
  const navigateOnRefresh = useNavigate();

  const [formData, setFormData] = useState({
    uuid: "",
    pageName: "",
    location: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    // console.log(data);

    if (data && Object.keys(data).length > 0) {
      setFormData({
        uuid: data.uuid,
        pageName: data.pageName,
        location: data.location,
      });
    } else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(Constants.URLConstants.SITEMAP);
    }
  }, [data, navigateOnRefresh]);

  const checkRequired = (bdata) => {
    if (formData.pageName === "" || formData.pageName === undefined) {
      Swal.fire(
        "Page Name is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (formData.location === "" || formData.location === undefined) {
      Swal.fire(
        "Location is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    return true;
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSuccessfull = checkRequired(formData);
    if (isSuccessfull) {
      try {
        const response = await updateSiteMap(formData);

        if (response.data.statusCode === 200) {
          toast.success("Site Map Updated Successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });

          setFormData({
            uuid: "",
            pageName: "",
            location: "",
          });
          navigate(Constants.URLConstants.SITEMAP);
        }
      } catch (error) {
        //  console.error(error)
      }
    }
    // You can perform additional actions like API calls, form validation, etc. here
  };
  return (
    <>
      <Header2 title="EDIT PAGE" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          <div class="panel-body" style={{ marginBottom: "0px;" }}>
            <div class="row">
              <div class="col-md-12">
                <Link
                  class="btn btn-outline-secondary btn-sm sectHeader"
                  to={Constants.URLConstants.SITEMAP}
                  title="Back"
                >
                  <i class="fa fa-chevron-left"></i>&nbsp;Back
                </Link>
                &nbsp;&nbsp;
                <button
                  class="btn btn-dark btn-sm sectHeader"
                  type="submit"
                  name="PSA_submit"
                  onclick="validateme();"
                >
                  <i class="fa fa-floppy-o"></i>&nbsp;Save
                </button>
              </div>
            </div>

            <br />
            <div class="row">
              <input type="hidden" name="new_ui" value="1" />
              <div class="col-sm-3 form-group">
                <label>Page Name</label>
                <input
                  class="form-control form-control-sm required test123"
                  type="text"
                  name="pageName"
                  size="30"
                  value={formData.pageName}
                  onChange={handleChange}
                />
              </div>
              <div class="col-sm-3 form-group">
                <label>Location</label>
                <input
                  class="form-control form-control-sm form-group required"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  size="30"
                />
              </div>
            </div>
          </div>
        </form>
        <div class="panel-footer">
          <br />
          This is the location of the restricted page relative to its URL. For
          example, if the page's URL is http://www.somedomain.com/links.php,
          then you would fill in '/links.php'. If the page is
          http://www.somedomain.com/otherfolder/links.php, then you would fill
          in '/otherfolder/links.php'.
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(SiteMapEdit);
