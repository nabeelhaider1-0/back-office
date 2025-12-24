import React, { useState } from 'react'
import Constants from '../../constants/routes'
import Header2 from '../header2/header2'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { createProfiles } from '../../Apis/API';
import { Slide, toast } from 'react-toastify';

const CreateProfile = () => {
    const [formData, setFormData] = useState({
        profileName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const navigate = useNavigate();

    const checkRequired = (pdata) => {

        if (pdata.profileName === "" || pdata.profileName === undefined) {
            Swal.fire(pdata,
                "Profile Name is required",
                "Please fill in the required fields",
                "error"
            );
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isSuccessfull = checkRequired(formData);
        if (isSuccessfull) {
            try {
                const response = await createProfiles(formData);

                console.log(response.data);
                if (response.data.statusCode === 200) {
                    toast.success("Profile Created Successfully", {
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
                        profileName: '',
                    });
                    navigate(Constants.URLConstants.STAFFACCESSROLES);
                }
            } catch (error) {
                //  console.error(error)
            }
        }




    };
    return (
        <>
            <Header2
                title="CREATE PROFILE"
                linkText1="List Profile"
                linkText2="Add Profile"
                link1={Constants.URLConstants.STAFFACCESSRIGHT}
            />
            <div className="container-fluid pt-0 p-4" id="content-pad">

                <form onSubmit={handleSubmit}>
                    <div className="row mt-2">

                        <div className="col-md-3 form-group">
                            <label>Profile Name</label>
                            <input
                                className="form-control form-control-sm test123 required"
                                type="text"
                                name="profileName"
                                value={formData.profileName}
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

export default CreateProfile
