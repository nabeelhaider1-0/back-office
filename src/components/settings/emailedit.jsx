import React, { useEffect, useState } from 'react';
import Constants from "../../constants/routes";
import MultiSelect from '../reactMultiSelect';
import Header2 from "../header2/header2";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';

const EmailEdit = ({ data }) => {
    const [formData, setFormData] = useState({
        emailType: "",
        recepientType: "",
        email: "",
        description: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
      
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleMultiSelectChange = (name, selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: selectedOption, // Assuming the selectedOption object has a value property
        }));
    };
    const navigateOnRefresh = useNavigate();
    const [emailTypeOptions, setEmailTypeOptions] = useState([]);
    const [recipentTypeOptions, setReciepentTypeOptions] = useState([]);
    function filterOptionsByValue(options, value) {

        return options.filter(option => option.value === value);
    }
    
    useEffect(() => {
      

        if (data && Object.keys(data).length > 0) {

          
        
           
            setEmailTypeOptions(data.emailType);
           
            setReciepentTypeOptions(data.recipientType);
        
            setFormData({
                emailType:   filterOptionsByValue(data.emailType,data.selectedemailtype) , // Set default selected emailType
                recepientType: filterOptionsByValue(data.recipientType,data.selectedrecipient),  // Set default selected recepientType
                email: data.email,
                description: data.description
            });
        }

        else {
            // If data is not available, navigate to the branch search page
            navigateOnRefresh(Constants.URLConstants.EMAILSEARCH);
        }

    }, [data, navigateOnRefresh]);

  

    const handleSubmit = (event) => {
        event.preventDefault();
    //     const emailTypeValue = Array.isArray(formData.emailType) && formData.emailType.length > 0
    //     ? formData.emailType[0].value
    //     : formData.emailType.value!==undefined?formData.emailType.value:"";

    // // Check if formData.recepientType is an array and not empty, then access the value of the first element
    // const recepientTypeValue = Array.isArray(formData.recepientType) && formData.recepientType.length > 0
    //     ? formData.recepientType[0].value
    //     : formData.recepientType.value!==undefined?formData.recepientType.value
    //     : "";

    // // const requestbody = {
    // //     emailType: emailTypeValue,
    // //     recepientType: recepientTypeValue,
    // //     email: formData.email,
    // //     description: formData.description
    // // };

    
        
    

     
        // You can perform further actions here, like dispatching an action or making an API call
    };
    return (
        <>
            <Header2 title="EDIT EMAIL SETTING " linkText1=" List Email Setting" linkText2="Edit Email setting" link1={Constants.URLConstants.EMAILSEARCH} />

            <div className="container-fluid pt-0 p-4" id="content-pad">
                <form onSubmit={handleSubmit}>
                    <div className="row mt-2">
                        <div className="col-md-3 form-group">
                            <label>Email Type</label>
                            <MultiSelect
                                options={emailTypeOptions}
                                isSearchable
                                placeholder="- Select Email Type -"
                                className="custom-select required"
                                name="emailType"
                                onChange={(selectedOption) => handleMultiSelectChange("emailType", selectedOption)}
                                value={emailTypeOptions.length === 1 ? emailTypeOptions[0] : formData.emailType}
                            />
                        </div>
                        <div className="col-md-3 form-group">
                            <label>Recepient Type</label>
                            <MultiSelect
                                options={recipentTypeOptions}
                                isSearchable
                                placeholder="- Select Recipient Type -"
                                className="custom-select required"
                                name="recepientType"
                                onChange={(selectedOption) => handleMultiSelectChange("recepientType", selectedOption)}
                                value={recipentTypeOptions.length === 1 ? recipentTypeOptions[0] : formData.recepientType}
                            />
                        </div>
                        <div className="col-md-3 form-group">
                            <label>Email</label>
                            <input
                                className="required form-control form-control-sm"
                                type="text"
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
                            <textarea
                                className="form-control form-control-sm"
                                id="textareaOfSetting"
                                rows="5"
                                name="description"
                                onChange={handleInputChange}
                                value={formData.description}
                            ></textarea>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="form-group col-md-2">
                            <button className="btn btn-dark btn-sm" type='submit'><i className="fa-solid fa-floppy-disk"></i> Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    data: state.data,
});

export default connect(mapStateToProps)(EmailEdit);
