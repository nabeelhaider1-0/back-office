// import { useNavigate } from "react-router-dom";
import Constants from "../../../../constants/routes";
import Header2 from "../../../header2/header2";
import Swal from "sweetalert2";
import {  useState } from "react";
import {  postDATA } from "../../../../Apis/API";
import {
  ErrorApiAlert,
  SuccessApiToast,
} from "../../../../constants/globalfunctions";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../../../../constants/ApiRoutes"

const MastersHotelInventoryRoomCategoryNew = () => {
  const [formData, setFormData] = useState({
    inventoryRoomCategory: "",
  });
  
  // Event handler for form inputs change
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      const updatedValues = checked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value);
      setFormData({ ...formData, [name]: updatedValues });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const checkRequired = (inventoryData) => {
    if (
      inventoryData.inventoryRoomCategory === "" ||
      inventoryData.inventoryRoomCategory === undefined
    ) {
      Swal.fire(
        "Inventory Room Name is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }
    return true;
  };
  const navigate = useNavigate();
  // create handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isSuccessfull = checkRequired(formData);
    if (isSuccessfull) {
      try {
        const response = await postDATA(
          formData,
          ApiRoutes.HOTELS.INVENTORY_ROOM_CATEGORY
        );

        if (response.data.statusCode === 200) {
          SuccessApiToast("Inventory Room Category Added Successfully");

          navigate(Constants.URLConstants.MASTERSINVENTORYROOMCATEGORYSEARCH);
        }
      } catch (error) {
        ErrorApiAlert("Error Adding Inventory Room Category");
      }
    }
  };

  return (
    <>
      <Header2
        title="INVENTORY ROOM DETAILS"
        linkText1="List Inventory Room Category"
        linkText2="Add Inventory Room Category"
        link1={Constants.URLConstants.MASTERSINVENTORYROOMCATEGORYSEARCH}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          <div className="panel-body">
            <div className="form-group row">
              <div className="form-group col-md-3 ">
                <label>Inventory Room Category</label>
                <input
                  className="form-control form-control-sm required test123"
                  type="text"
                  size={45}
                  maxLength={255}
                  name="inventoryRoomCategory"
                  value={formData.inventoryRoomCategory}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group col-md-3">
                <button className="btn btn-dark btn-sm" type="submit" name="b1">
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
export default MastersHotelInventoryRoomCategoryNew;
