import { useState, useEffect } from "react";
import Header2 from "../../header2/header2";
import { useDispatch } from "react-redux";
import {
  addVisaCategory,
  updateVisaCategory,
  getVisaCategoryForEdit,
} from "../../../state/action/visaActions";
import { useLocation } from "react-router-dom";
import { ErrorApiAlert, showErrorToast, SuccessApiToast } from "../../../constants/globalfunctions";

const VisaAddCategory = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [visaCategory, setVisaCategory] = useState("");
  const token = localStorage.getItem("token");

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    if (id) {
      const fetchVisaCategory = async () => {
        const existingCategory = await dispatch(getVisaCategoryForEdit(id));
        console.log(existingCategory);
        setVisaCategory(existingCategory?.data?.visaCategory || "");
      };
      fetchVisaCategory();
    }
  }, [id, dispatch]);

  const handleInputChange = (e) => {
    setVisaCategory(e.target.value);
  };

  const handleSave = () => {
    if (id) {
      dispatch(updateVisaCategory(id, visaCategory, setVisaCategory));
      console.log("Visa Category updated:", visaCategory);
    } else {
      if (!visaCategory) {
        ErrorApiAlert("Visa Category Required");

       
        return;
      }
      dispatch(addVisaCategory(visaCategory, setVisaCategory));
      console.log("Visa Category saved:", visaCategory);
    }
    console.log(token);
  };

  return (
    <>
      <Header2 title={id ? "EDIT VISA CATEGORY" : "ADD VISA CATEGORY"} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-3 form-group" id="aofficeid">
                <label>Visa Category: </label>
                <input
                  id="vcategory"
                  name="vcategory"
                  type="text"
                  maxLength={50}
                  className="form-control form-control-sm test123"
                  value={visaCategory}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="form-group col-md-12">
                <br />
                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  onClick={handleSave}
                >
                  <i className="fa fa-floppy-o" />
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

export default VisaAddCategory;
