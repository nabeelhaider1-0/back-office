
import { useEffect, useState } from 'react';
import Header2 from '../header2/header2';
import { useNavigate } from "react-router-dom";
import Constants from '../../constants/routes';
import { connect } from "react-redux";
import { updateMenu } from '../../Apis/API';
import { Slide, toast } from "react-toastify";
import Swal from "sweetalert2";
const EditMenu = ({ data }) => {
    const [editmenuData, seteditMenuData] = useState({
     
        menuName: "",
        pageLink: "",
    
      });
    
    const navigateOnRefresh = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        seteditMenuData((prevData) => ({
          ...prevData,
          [name]:  value,
        }));
      };
    
    useEffect(() => {
      
  
      if (data && Object.keys(data).length > 0) {
  
    seteditMenuData({
        menuName:data.menuName,
        pageLink:data.pageLink
    });
       }
  
       else {
        // If data is not available, navigate to the branch search page
        navigateOnRefresh(Constants.URLConstants.MENUSEARCH);
      }
    }, [data, navigateOnRefresh]);

    const checkRequired = (bdata) => {
        if (bdata.menuName === "" || bdata.menuName === undefined) {
          Swal.fire(
            "Menu Name is required",
            "Please fill in the required fields",
            "error"
          );
          return false;
        }
    
       
    
       
    
        return true;
      };
    
      const navigate = useNavigate();
      const handleSubmit = async (event) => {
        event.preventDefault();
        const isSuccessfull = checkRequired(editmenuData);
        if (isSuccessfull) {
          try {
            const response = await updateMenu(
              data.uuid,
           editmenuData
            );
    
         
            if (response.data.statusCode === 200) {
         
              seteditMenuData({
             menuName:'',
pageLink:''
              });
              // localStorage.setItem('token', response.data.data.token)
    
              toast.success("Menu Edited Successfully", {
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
              navigate(Constants.URLConstants.MENUSEARCH);
            }
          } catch (error) {
            // console.error(error);
          }
        }
      };
    return (<>
        <Header2 title="EDIT MENU" />
        <div className="container-fluid pt-0 p-4" id="content-pad">
            <form onSubmit={handleSubmit}>
            <div class="panel-body">
        <div>
            <div class="row">
                <div class="form-group col-md-3">
                    <label>Page Title</label>
                    <input type="text" class="form-control form-control-sm required test123" name="menuName" id="page_title" style={{width:"300px"}}  value={editmenuData.menuName}
                onChange={handleChange}/>
                </div>

                <div class="form-group col-md-3">
                    <label>Page Link</label>
                    <input type="text" class="form-control form-control-sm" name="pageLink" id="page_link" style={{width:"300px"}}
                    value={editmenuData.pageLink}
                    onChange={handleChange}
                    />
                </div>

                {/* <div class="form-group col-md-3">
                    <label>Sorting</label>
                    <input type="text" class="form-control form-control-sm" name="sorting" id="sorting" defaultValue="1" style={{width:"300px"}} onblur="extractNumber(this,0,false);" onkeyup="extractNumber(this,0,false);"/>
                </div> */}
            </div>
            <br/>
            <div class="form-group col-md-12">
                <button class="btn btn-dark btn-sm" type="submit" value="Update" onclick="validate();">
              
                        <i class="fa fa-pencil-square-o" style={{color: '#ffffff'}}></i>
                        &nbsp;Update
             
                </button>
            </div>

            
        </div>
    </div>
            </form>
        </div>
    </>
    )
}

const mapStateToProps = (state) => ({
    data: state.data,
  });
  
  export default connect(mapStateToProps)(EditMenu);