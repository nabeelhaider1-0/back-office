import React, { useState } from 'react';
import Constants from '../../constants/routes';
import Header2 from '../header2/header2';
import { createReport } from '../../Apis/API';
import { Slide, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateReports = () => {
    const navigateOnRefresh = useNavigate();
    const [formData, setFormData] = useState({
        reportName: ''
    });

    const handleSubmit =async (event) => {
        event.preventDefault();
    
        try {
            const response = await createReport(formData);

            if (response.data.statusCode === 200) {
                toast.success("Report Created Successfully", {
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

              
                navigateOnRefresh(Constants.URLConstants.STAFFACCESSREPORTS);
            }
        } catch (error) {
            //  console.error(error)
        }
    
        // Add further processing or submission logic here
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <Header2
                title="CREATE REPORT"
                linkText1="List Rights"
                linkText2="Add Rights"
                link1={Constants.URLConstants.ADDPROFILE}
            />
            <div className="container-fluid pt-0 p-4" id="content-pad">
                <form onSubmit={handleSubmit}>
                    <div className="row mt-2">
                        <div className="col-md-3 form-group">
                            <label>Report Name</label>
                            <input
                                className="form-control form-control-sm test123 required"
                                type="text"
                                name="reportName"
                                value={formData.reportName}
                                onChange={handleChange}
                                required
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
    );
};

export default CreateReports;
