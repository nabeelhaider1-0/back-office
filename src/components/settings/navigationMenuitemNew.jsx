import { useEffect, useState } from "react";
import Constants from "../../constants/routes";
import Header2 from '../header2/header2';
import Swal from "sweetalert2";
import { Slide, toast } from "react-toastify";
import { createMenu, getAllMenues } from "../../Apis/API";
import MultiSelect from "../reactMultiSelect";
import { useNavigate } from "react-router-dom";

const AddMenu = () => {
  const [allMenus, setAllMenus] = useState([]);
  const [parents, setParents] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [formData, setFormData] = useState({
    menuName: '',
    pageLink: '',
    parent: null,
  });
  const checkRequired = (data) => {
    if (!data.menuName) {
      Swal.fire(
        "Page Title is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const isSuccessfull = checkRequired(formData);
    if (isSuccessfull) {
      try {
        const response = await createMenu(formData);
        if (response.data.statusCode === 200) {
          toast.success("Menu Added Successfully", {
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
            menuName: '',
            pageLink: '',
            parent: null,
          });
          setSelectedMenus([]);
          navigate(Constants.URLConstants.MENUSEARCH);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getMenus = async () => {
    try {
      const response = await getAllMenues();
      if (response.data.statusCode === 200) {
        const allMenusData = response.data.data || [];
        setAllMenus(allMenusData);
        const topLevelMenus = allMenusData.filter(menu => menu.parent === null);
        const options = topLevelMenus.map(menu => ({
          value: menu.uuid,
          label: menu.menuName,
        }));
        setParents(options);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleParentChange = (selectedOption) => {
    const parentUuid = selectedOption.value;
    const name='parent';
    setFormData(prevState => ({
      ...prevState,
      [name]: parentUuid,
    }));
    setSelectedMenus([{ name: 'parent', value: parentUuid }]);
  };

  const handleChildChange = (selectedOption, index) => {
    const childUuid = selectedOption.value;
    const name='parent';
    setFormData(prevState => ({
      ...prevState,
      [name]: childUuid,
    }));
    const children = allMenus.filter(menu => menu.parent && menu.parent.uuid === childUuid);

    // Check if there are further children
    if (children.length > 0) {
       const updatedMenus = selectedMenus.slice(0, index+1 ).concat([{ name: 'child', value: childUuid }]);
 
      updatedMenus.push(...children.map(child => ({ name: 'child', value: child.uuid })));

      setSelectedMenus(updatedMenus);
    } else {
      // If no further children, remove any additional empty dropdowns
      // const updatedMenus = selectedMenus.slice(0, index+1 );
      // setSelectedMenus(updatedMenus);
    }
  };
  

  useEffect(() => {
    getMenus();
  }, []);
 
  return (
    <>
      <Header2 title="ADD MENU" linkText1="List Menu pages" linkText2="Add Menu" link1={Constants.URLConstants.MENUSEARCH} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          <div className="row mt-2">
          {parents.length > 0 && (
  <div className="col-md-3 form-group phps_row_1">
    <label htmlFor="exampleInputEmail1">Parent</label>
    <MultiSelect
      options={parents}
      isSearchable
      placeholder="- Select Parent -"
      className="required custom-select"
      name="menu"
      onChange={handleParentChange}
    />
  </div>
)}

            {selectedMenus.map((menu, index) => {
  const filteredChildren = allMenus.filter(m => m.parent && m.parent.uuid === menu.value).map(child => ({ value: child.uuid, label: child.menuName }));
  // Check if index is less than the length minus 1 when length is greater than or equal to 3
  return (
    (
      <>
        {(selectedMenus.length < 3 || index < selectedMenus.length - 1) && filteredChildren.length > 0 && (
          <div key={index} className="col-md-3 form-group phps_row_1">
        <label htmlFor={`child-${index}`}>{`Child ${index + 1}`}</label>
          <MultiSelect
            options={filteredChildren}
            isSearchable
            placeholder={`- Select Child ${index + 1} -`}
            className="required custom-select"
            name={`child-${index}`}
            onChange={(selectedOption) => handleChildChange(selectedOption, index)}
          />
          </div>  )}
          </> 
    )
  );
})}

<div className="form-group phps_row_1 col-md-3">
              <label>Page Title</label>
              <input type="text" name="menuName" value={formData.menuName} onChange={handleInputChange} className="required form-control form-control-sm" />
            </div>
            <div className="form-group col-md-3">
              <label>Page Link</label>
              <input type="text" className="required form-control form-control-sm" name="pageLink" value={formData.pageLink} onChange={handleInputChange} />
            </div>
          </div>
          
          <div className="row mt-4 mb-4">
            <div className="form-group col-md-2">
              <button type="submit" className="btn btn-dark btn-sm"><i className="fa fa-plus" aria-hidden="true"></i> Add</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddMenu;
