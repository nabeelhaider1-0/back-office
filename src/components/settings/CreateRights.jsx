import React, { useState } from 'react'
import Constants from '../../constants/routes'
import Header2 from '../header2/header2'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { createRights } from '../../Apis/API';
import { Slide, toast } from 'react-toastify';
import MultiSelect from '../reactMultiSelect';
import { rightsType } from '../../constants/contants';

const CreateRights = () => {
    const [formData, setFormData] = useState({
        rightType: '',
        rightName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleMultiSelectChange = (selectedOptions) => {
        setFormData(prevState => ({
            ...prevState,
            rightType: selectedOptions.label
        }));
    };
    const navigate = useNavigate();

    const checkRequired = (rdata) => {
        if (rdata.rightType === "" || rdata.rightType === undefined) {
            Swal.fire(
                "Right Type is required",
                "Please fill in the required fields",
                "error"
            );
            return false;
        }
        if (rdata.rightName === "" || rdata.rightName === undefined) {
            Swal.fire(
                "Right Name is required",
                "Please fill in the required fields",
                "error"
            );
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
         // Logging the form data
        const isSuccessfull = checkRequired(formData);
        if (isSuccessfull) {
            try {
                const response = await createRights(formData);

           
                if (response.data.statusCode === 200) {
                    toast.success("Rights Created Successfully", {
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
                        rightType: "",
                        rightName: '',
                    });
                    navigate(Constants.URLConstants.ADDPROFILE);
                }
            } catch (error) {
                //  console.error(error)
            }
        }




    };
    return (
        <>
            <Header2
                title="CREATE RIGHTS"
                linkText1="List Rights"
                linkText2="Add Rights"
                link1={Constants.URLConstants.ADDPROFILE}
            />
            <div className="container-fluid pt-0 p-4" id="content-pad">

                <form onSubmit={handleSubmit}>
                    <div className="row mt-2">
                        <div className="col-md-3 form-group">
                            <label>Right Type</label>
                            <MultiSelect
                                options={rightsType}
                                name="rightType"
                                isSearchable
                                placeholder="- Select Right Type -"
                                noOptionsMessage={() => "No Rights Found"}
                                className="custom-select required"
                                onChange={handleMultiSelectChange}
                            />
                        </div>

                        <div className="col-md-3 form-group">
                            <label>Right Name</label>
                            <input
                                className="form-control form-control-sm test123 required"
                                type="text"
                                name="rightName"
                                value={formData.rightName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="form-group col-md-2">
                            <button type="submit" className="btn btn-dark btn-sm">
                                <i className="fa fa-floppy-disk" aria-hidden="true"></i> Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateRights
