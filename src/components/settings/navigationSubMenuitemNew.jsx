import Constants from "../../constants/routes";
import MultiSelect from '../reactMultiSelect';
import Header2 from '../header2/header2';

import { createSubMenu, getAllMenues } from "../../Apis/API";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




const AddSubMenu = () => {
  const [menues, setMenues] = useState([]);
  const [formData, setFormData] = useState({
    subMenuName: "",
    menu: "",
    pageLink: ""
  });

  const getMenues = async () => {
    try {

      const response = await getAllMenues();

      if (response.data.statusCode === 200) {
        const allmenues = response.data.data || [];

        const options = allmenues.map((menu) => ({
          value: menu.uuid,
          label: menu.menuName,
        }));


      
        setMenues(options); // Set branches in the new state

        

      }

    } catch (error) {
      // console.error(error);
    }

  };

  useEffect(() => {
    getMenues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const checkRequired = (bdata) => {
    if (bdata.menu === "" || bdata.menu === undefined) {
      Swal.fire(
        "Parent is required",
        "Please select the parent",
        "error"
      );
      return false;
    }

    if (bdata.subMenuName === "" || bdata.subMenuName === undefined) {
      Swal.fire(
        "Page Title is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (bdata.pageLink === "" || bdata.pageLink === undefined) {
      Swal.fire(
        "Page Link is required",
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
        const response = await createSubMenu(formData);

        if (response.data.statusCode === 200) {
          toast.success("Sub Menu Added Successfully", {
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
            subMenuName: "",
    menu: "",
    pageLink: ""
          });
          navigate(Constants.URLConstants.MENUSEARCH);
        }
      } catch (error) {
        //  console.error(error)
      }
    }

  };
  const handleParentChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      menu: selectedOption.value,
    }));
  };

  return (<>
    <Header2 title="ADD SUB MENU" linkText1="List Menu pages" linkText2="Add Menu" link1={Constants.URLConstants.MENUSEARCH} />
    <div className="container-fluid pt-0 p-4" id="content-pad">
      <form onSubmit={handleSubmit}>
        <div className="row mt-2">
          <div className="col-md-3 form-group phps_row_1">
            <label for="exampleInputEmail1">Parent</label>
            <MultiSelect
              options={menues}
              isSearchable
              placeholder="- Select Parent -"
              className=" required custom-select"
              name="menu"
              onChange={handleParentChange}
            />
          </div>
          <div className="form-group phps_row_1 col-md-3">
            <label>Page Title</label>
            <input type="text"  name="subMenuName"
                id="subMenuName"
                value={formData.subMenuName}
                onChange={handleInputChange} className="required form-control form-control-sm" />
          </div>
          <div className="form-group col-md-3">
            <label>Page Link</label>
            <input type="text" className=" required form-control form-control-sm"  name="pageLink"
                value={formData.pageLink}
                onChange={handleInputChange} />
          </div>
         
        </div>
        <div className="row mt-4 mb-4">
          <div className="form-group col-md-2">
            <button   type="submit" className="btn btn-dark btn-sm"><i className="fa fa-plus" aria-hidden="true"></i> Add</button>
          </div>
        </div>
      </form>
    </div>
  </>
  )
}
export default AddSubMenu;