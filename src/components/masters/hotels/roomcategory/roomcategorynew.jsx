import { useEffect, useState } from "react";
import Constants from "../../../../constants/routes";
import Header2 from "../../../header2/header2";
import MultiSelect from "../../../reactMultiSelect";
import { ErrorApiAlert, RequiredFieldAlert, SuccessApiToast } from "../../../../constants/globalfunctions";
import { getDATA, postDATA } from "../../../../Apis/API";
import { room_options } from "../../../../constants/contants";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../../../../constants/ApiRoutes";





const MastersHotelRoomCategoryNew = () => {
  const [formData, setFormData] = useState({
    maxPax: "",
    roomType: "",
    extraBed: "",
    nonRefundable: "yes",
    inventoryRoom: "",
    supplier: "",
  });
  const [supplierOptions, setsupplierOptions] = useState([]);
  const getOnlineSuppliers = async () => {

    try {

      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.SUPPLIERS.ONLINE.SUPPLIER);
      if (response.data.statusCode === 200) {
        const supplier =response && response.data.data ? response.data.data : [];
       
      
        const options = supplier.map((sup) => ({
          value: sup.uuid,
          label: sup.supplierName,
        }));
        setsupplierOptions(options);


        
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert('Error Fetching Suppliers');
    } finally {

      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
   
    getOnlineSuppliers();
   
  }, []);
  // Event handler for form inputs change
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      const updatedValues = checked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value);
      setFormData({ ...formData, [name]: updatedValues });
    } else if (type === "radio") {
      // For radio buttons, directly update the value
      setFormData({ ...formData, [name]: value === "yes" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [inventoryRoomCategoriesData, setInventoryRoomCategoriesData] =
    useState([]);
  const getInventoryRoomCategories = async () => {
    try {
      const response = await getDATA(
        ApiRoutes.HOTELS.INVENTORY_ROOM_CATEGORY
      );

      if (response.data.statusCode === 200) {
        const InventoryRoomCategories =
          response && response.data.data ? response.data.data : [];
        const options = InventoryRoomCategories.map((invt) => ({
          value: invt.uuid,
          label: invt.inventoryRoomCategory,
        }));
        setInventoryRoomCategoriesData(options);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getInventoryRoomCategories();
  }, []);

  const checkRequired = (categoryData) => {
    if (
      categoryData.inventoryRoom === "" ||
      categoryData.inventoryRoom === undefined
    ) {
      RequiredFieldAlert(
        "Inventory Room is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }
    if (categoryData.supplier === "" || categoryData.supplier === undefined) {
      RequiredFieldAlert(
        "Supplier is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }
    if (categoryData.roomType === "" || categoryData.roomType === undefined) {
      RequiredFieldAlert(
        "Room Type is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }
    if (categoryData.maxPax === "" || categoryData.maxPax === undefined) {
      RequiredFieldAlert(
        "Max Pax is required",
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
        const response = await postDATA(
          formData,
          ApiRoutes.HOTELS.ROOM_CATEGORY
        );

        if (response.data.statusCode === 200) {
          SuccessApiToast("Room Category Added Successfully");

          navigate(Constants.URLConstants.MASTERSROOMCATEGORYSEARCH);
        }
      } catch (error) {
        ErrorApiAlert("Error Adding Room Category");
      }
    }
  };
  return (
    <>
      <Header2
        title="ROOM CATEGORY DETAILS"
        linkText1="List Room Category"
        linkText2="Add Room Category"
        link1={Constants.URLConstants.MASTERSROOMCATEGORYSEARCH}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-2 form-group">
                <div className="checkbox checkbox-success">
                  <input
                    id="checkbox1"
                    type="checkbox"
                    name="non_refundable"
                  
                    className="test123"
                    checked={formData.nonRefundable === "yes"} // Conditionally set checked attribute
                    onChange={(e) => {
                      const newValue = e.target.checked ? "yes" : "no";
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        nonRefundable: newValue,
                      }));
                    }}
                  />
                  <label htmlFor="checkbox1"> Non Refundable</label>
                  <i
                    className="fa fa-info-circle"
                    title
                    data-toggle="tooltip"
                    data-placement="top"
                    data-original-title="Considering as Non Refundable Class. 100% Charges will be apply for cancellation"
                  />
                </div>
              </div>
            </div>
            <div className="form-group row mt-2">
              <div className="form-group col-md-2">
                <label>Inventory Room Category</label>
                <MultiSelect
                  options={inventoryRoomCategoriesData}
                  isSearchable
                  placeholder="- Select Inventory -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Inventory Found"}
                  onChange={(selectedOption) =>
                    setFormData({
                      ...formData,
                      inventoryRoom: selectedOption ? selectedOption.value : "",
                    })
                  }
                  required
                />
              </div>
              <div className="form-group col-md-2">
                <label>Supplier</label>
                <MultiSelect
                  options={supplierOptions}
                  isSearchable
                  placeholder="- Select Supplier -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Supplier Found"}
                  onChange={(selectedOption) =>
                    setFormData({
                      ...formData,
                      supplier: selectedOption ? selectedOption.value : "",
                    })
                  }
                  required
                />
              </div>
              <div className="form-group col-md-2">
                <label>Room Type</label>
                <MultiSelect
                  options={room_options}
                  isSearchable
                  placeholder="- Select Room Type -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Room Type Found"}
                  onChange={(selectedOption) =>
                    setFormData({
                      ...formData,
                      roomType: selectedOption ? selectedOption.value : "",
                    })
                  }
                  required
                />
              </div>
              <div className="form-group col-md-2">
                <label>Max Pax (without Extrabed)</label>
                <input
                  className="form-control form-control-sm required"
                  type="text"
                  size={2}
                  maxLength={2}
                  name="maxPax"
                  value={formData.maxPax}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group col-md-2">
                <label>Extra Bed</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="extraBed"
                  value={formData.extraBed}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-2 form-group">
                <button className="btn btn-dark btn-sm " type="submit">
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
export default MastersHotelRoomCategoryNew;
