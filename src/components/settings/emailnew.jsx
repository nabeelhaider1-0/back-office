import Constants from "../../constants/routes";
import MultiSelect from '../reactMultiSelect';
import Header2 from "../header2/header2";
import { emailnew_options, emailnew_recipientTypes } from "../../constants/contants";
import { useState } from "react";
import Swal from "sweetalert2";
import { createEmailSetting } from "../../Apis/API";

import { Slide, toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";

const EmailNew = () => {

    // State variables to hold form data
    const [formData, setFormData] = useState({
        emailType: "",
        recipientType: "",
        email: "",
        description: ""
    });
    // Function to handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    // Function to handle changes in MultiSelect components
    const handleMultiSelectChange = (name, selectedOption) => {
        setFormData({
            ...formData,
            [name]: selectedOption.value
        });
    };

    const checkRequired = (bdata) => {

        if (bdata.emailType === "" || bdata.emailType === undefined) {
            Swal.fire(
                "EmailType is required",
                "Please fill in the required fields",
                "error"
            );
            return false;
        }

        if (bdata.recipientType === "" || bdata.recipientType === undefined) {
            Swal.fire(
                "RecipeintType is required",
                "Please fill in the required fields",
                "error"
            );
            return false;
        }
        if (bdata.email === "" || bdata.email === undefined) {
            Swal.fire(
                "Email is required",
                "Please fill in the required fields",
                "error"
            );
            return false;
        }

        // Email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(bdata.email.trim())) {
            Swal.fire(
                "Email Validation",
                "Please enter a valid email address.",
                "error"
            );
            return false;
        }


        return true;
    };

    const navigate = useNavigate();
    const handleFormSubmit = async (event) => {
        event.preventDefault();
       
           
         
            const isSuccessfull = checkRequired(formData);
          
            if (isSuccessfull) {
                try {
                    const response = await createEmailSetting(formData);

                    
                    if (response.data.statusCode === 200) {
                        toast.success("Email Settings Created Successfully", {
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
                           
                            emailType: "",
                            recipientType: "",
                            email: "",
                            description: ""
                        });
                        navigate(Constants.URLConstants.EMAILSEARCH);
                    }
                } catch (error) {
                    //  console.error(error)
                }
            }

       
    };



    return (<>
        <Header2 title="EMAIL SETTING " linkText1=" List Email Setting" linkText2="Add email setting" link1={Constants.URLConstants.EMAILSEARCH} />

        <div className="container-fluid pt-0 p-4" id="content-pad">
            <form onSubmit={handleFormSubmit}>
                <div className="row mt-2">
                    <div className="col-md-3 form-group">
                        <label>Email Type</label>
                        <MultiSelect
                            options={emailnew_options}
                            isSearchable
                            placeholder="- Select Email Type -"
                            className="custom-select required"
                            name="emailType" // Added name attribute
                            onChange={(selectedOption) => handleMultiSelectChange("emailType", selectedOption)}
                        />
                    </div>
                    <div className="col-md-3 form-group">
                        <label>Recepient Type</label>
                        <MultiSelect
                            options={emailnew_recipientTypes}
                            isSearchable
                            placeholder="- Select Recipient Type -"
                            className="custom-select required"
                            name="recipientType" // Added name attribute
                            onChange={(selectedOption) => handleMultiSelectChange("recipientType", selectedOption)}
                        />
                    </div>
                    <div className="col-md-3 form-group">
                        <label>Email</label>
                        <input
                            className="required form-control form-control-sm"
                            type="email"
                            name="email"
                            id="txt_email1"
                            size="45"
                            maxLength="255"
                            title=""
                            data-toggle="tooltip"
                            data-placement="top"
                            data-original-title="Email address is required"
                            onChange={handleInputChange}
                            value={formData.email}
                        />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="form-group col-md-12">
                        <label>Description</label>
                        <textarea className="form-control form-control-sm" id="textareaOfSetting" rows="5" name="description"
                            onChange={handleInputChange}
                            value={formData.description}></textarea>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="form-group col-md-2">
                        <button className="btn btn-dark btn-sm"><i className="fa-solid fa-floppy-disk"></i> Save</button>
                    </div>
                </div>
            </form>
        </div>
    </>
    )
}
export default EmailNew;
