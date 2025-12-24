import { useEffect, useState } from "react";
import { getDATA, postDATA } from "../../../Apis/API";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { ErrorApiAlert, SuccessApiToast } from "../../../constants/globalfunctions";
import { useNavigate } from "react-router-dom";
import uploadFile from "../../../constants/filesuploader";
import ApiRoutes from "../../../constants/ApiRoutes";
const MastersLoyalityProgramRewardsNew = () => {
  const [productCategoryOptions, setproductCategoryOptions] = useState([]);
  const [loyaltyTierOptions, setloyaltyTierOptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    pointsRequired: "",
    availableProduct: "",
    productImage: "",
    description: "",
    productCategoryUuid: "",
    tierUuid: ""
  });
  
 
   
  const getProductCategory = async () => {

    try {

      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.LOYALTY_PROGRAM.PRODUCT_CATEGORY);
      if (response.data.statusCode === 200) {
        const categories =response && response.data.data ? response.data.data : [];
       
      
        const options = categories.map((data) => ({
          value: data.uuid,
          label: data.productCategoryName,
        }));
        setproductCategoryOptions(options);
        
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert('Error Fetching Loyalty Product Categories');
    } finally {

      // Set loading to false after data is fetched (whether successful or not)
    }
  };

  const getLoyaltyTierOptions = async () => {

    try {

      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.LOYALTY_PROGRAM.TIERS);
      if (response.data.statusCode === 200) {
        const tiers =response && response.data.data ? response.data.data : [];
       
      
        const options = tiers.map((data) => ({
          value: data.uuid,
          label: data.tierName,
        }));
        setloyaltyTierOptions(options);
        
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert('Error Fetching Loyalty Tiers');
    } finally {

      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  useEffect(() => {
    getProductCategory();
    getLoyaltyTierOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSingleSelectChange = (selectedOption, name) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: selectedOption.value // Assuming the option object has a 'value' property
    }));
  };
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      
      formData.productImage="";
  }else{
    const resp =await uploadFile(selectedFile);
   if(resp.success===true){
    formData.productImage=resp.imagelink;

   }} 

  try {
     
    const response = await postDATA(formData,ApiRoutes.LOYALTY_PROGRAM.REWARDS);

    if (response.data.statusCode === 200) {
    
      SuccessApiToast( "Loyalty Product Added Successfully");
     
      navigate(Constants.URLConstants.MASTERSLOYALITYPROGRAMREWARDSSEARCH);
    }
  } catch (error) {
    ErrorApiAlert('Error Adding Loyalty Product');
    //  console.error(error)
  }
  }
  return (
    <>
      <Header2
        title="ADD PRODUCT"
        linkText1="Search Product"
        linkText2="Add Product"
        link1={Constants.URLConstants.MASTERSLOYALITYPROGRAMREWARDSSEARCH}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">

        <form  form onSubmit={handleSubmit}  id="loyaltyproductnewform">
          <input type="hidden" name="action" defaultValue="insert_gift" />
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label>Product Category</label>
                <MultiSelect
                  //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                  options={productCategoryOptions}
                  isSearchable
                  placeholder="- Select Category -"
                  className="custom-select required"
                  name="productCategoryUuid"
                  value={productCategoryOptions.find(option => option.value === formData.productCategoryUuid)}
                     onChange={(selectedOption) => handleSingleSelectChange(selectedOption, 'productCategoryUuid')}
                     required
                  noOptionsMessage={() => "No Category Found"}

                />


              </div>
              <div className="form-group col-md-3">
                <label>Product Name</label>
                <input className="form-control form-control-sm required" type="text" 
                 size={15} maxLength={280}
                 name="productName" 
                 id="productName"
                value={formData.productName}
                onChange={handleInputChange}
                required
                 
                 />
              </div>
              <div className="form-group col-md-3">
                <label>Product Image</label>
                <span className="uniqFile input-group"><span className="input-group-addon fa fa-upload myInputFile">
                  <input type="file" name="productImage" id="productImage" 
                  
                  accept="image/*" 
                  onChange={handleFileInput} 
                  /></span></span>
              </div>
              <div className="form-group col-md-3">
                <label>Points Required</label>
                <input className="form-control form-control-sm required" type="text"  size={15} maxLength={280}
                
                name="pointsRequired" 
                id="pointsRequired"
               value={formData.pointsRequired}
               onChange={handleInputChange}
               required
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-3">
                <label>Available Products</label>
                <input className="form-control form-control-sm required" type="text"  size={15} maxLength={280} 
                name="availableProduct" 
                id="availableProduct"
               value={formData.availableProduct}
               onChange={handleInputChange}
               required
                />Unit
              </div>
              <div className="form-group col-md-3">
                <label>Loyalty Tier Name</label>
                <MultiSelect
                  //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                  options={loyaltyTierOptions}
                  isSearchable
                  placeholder="- Select Loyalty Tier -"
                  className="custom-select required"
                  name="tierUuid"
                  value={loyaltyTierOptions.find(option => option.value === formData.tierUuid)}
                     onChange={(selectedOption) => handleSingleSelectChange(selectedOption, 'tierUuid')}
                     required
                  noOptionsMessage={() => "No Loyalty Tier Found"}

                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-12">
                <label>Description</label>
                <textarea  rows={4} className="form-control form-control-sm required" defaultValue={""}
                 name="description" 
                 id="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-12">
                <button type="submit" name="add_gift_form_add_btn" className="btn btn-dark btn-sm" value="Submit" onclick="submit_form(document.forms['add_product_form'])">
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
export default MastersLoyalityProgramRewardsNew;
