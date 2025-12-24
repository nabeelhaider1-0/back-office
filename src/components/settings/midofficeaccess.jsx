import React, { useState } from 'react';
import Header2 from '../header2/header2';
import { midofficeSystemSettings } from '../../Apis/API';
import { Slide, toast } from 'react-toastify';

const MidOffice = () => {
    const initialValues = {
        MinUsernameLength: "3",
        MaxUsernameLength: "15",
        MinPasswordLength: "5",
        MaxPasswordLength: "8",
        FailedLoginsAllowed: "3",
        AllowedConnectionLocations: ""
    };

    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        // Send formValues to your backend or perform other actions here
      
        try {
            const response = await midofficeSystemSettings(formValues);
            
     
            if (response.data.statusCode === 200) {
                toast.success("System Settings Added Successfully", {
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

                setFormValues(initialValues);
            }
        } catch (error) {
            // Handle the error as needed
            console.error(error);
        }
    };

    return (
        <>
            <Header2 title="SYSTEM SETTINGS" />
            <div className="container-fluid pt-0 p-4" id="content-pad">
                <form onSubmit={handleSubmit}>
                    <div className="row mt-2">
                        <div className="form-group col-md-3">
                            <label>Minimum Username Length</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                name="MinUsernameLength"
                                value={formValues.MinUsernameLength}
                                onChange={handleChange}
                                
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label>Maximum Username Length</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                name="MaxUsernameLength"
                                value={formValues.MaxUsernameLength}
                                onChange={handleChange}
                              
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label>Minimum Password Length</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                name="MinPasswordLength"
                                value={formValues.MinPasswordLength}
                                onChange={handleChange}
                                
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label>Maximum Password Length</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                name="MaxPasswordLength"
                                value={formValues.MaxPasswordLength}
                                onChange={handleChange}
                                
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="form-group col-md-3">
                            <label>Failed Logins Allowed</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                name="FailedLoginsAllowed"
                                value={formValues.FailedLoginsAllowed}
                                onChange={handleChange}
                              
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="form-group col-md-12">
                            <p><label>Allowed Connection Locations (Leave blank for no restrictions)</label></p>
                            <textarea
                                className="form-control"
                                id="textareaOfSetting"
                                rows="5"
                                name="AllowedConnectionLocations"
                                value={formValues.AllowedConnectionLocations}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="form-group col-md-2">
                            <button type="submit" className="btn btn-dark btn-sm"><i className="fa fa-wrench"></i> Change Settings</button>
                        </div>
                    </div>
                    <hr />
                    <div className="row mt-4">
                        <div className="form-group col-md-4">
                            <p>To only allow the user to log in from certain computers, see below examples:
                                <br /><br />
                                To allow only from one address, enter the IP (only works with static IPs).<br />
                                192.168.1.201To allow from all machines with an address that starts with s sequence:<br />
                                192.168.1.or<br />
                                192.168.You can also use mulitple entries by separating with a comma:<br />
                                192.168.1.161, 192.168.2., 10.10.220.</p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default MidOffice;
