import Header2 from "../header2/header2";
import React, { useEffect, useState } from 'react';
import MultiSelect from '../reactMultiSelect';
import { assignReportstoStaff, getAllReports, getAllStaff } from "../../Apis/API";
import Swal from "sweetalert2";

import { Slide, toast } from "react-toastify";


const StaffAccessReports = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [staffData, setStaffData] = useState([]);
    const [allStaffData, setAllStaffData] = useState([]);
    const [formData, setFormData] = useState({
        uuid: "",
        reportUuid: []
    });
    const [reportsData, setReportsData] = useState([]);

    const getReports = async () => {
        try {
            const response = await getAllReports();
            if (response.data.statusCode === 200) {
                const reports = response.data.data || [];
                setReportsData(reports);
            }
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    };

    const getStaff = async () => {
        try {
            const response = await getAllStaff();
            if (response.data.statusCode === 200) {
                const staffData = response.data.data || [];
                setAllStaffData(staffData); // Set all staff data
                const options = staffData.map((staff) => ({
                    value: staff.uuid,
                    label: staff.userName,
                }));

                setStaffData(options);
            }
        } catch (error) {
            console.error("Error fetching staff:", error);
        }
    };

    useEffect(() => {
        getStaff();
        getReports();
    }, []);

    
    const handleStaffSelection = (selectedOptions) => {
        const selectedStaffUuid = selectedOptions.value;
        // Find the selected staff from allStaffData based on UUID
        const foundStaff = allStaffData.find(staff => staff.uuid === selectedStaffUuid);
      
    
        // Update formData with selected staff's UUID and reportUuids
        setFormData(prevState => ({
            ...prevState,
            uuid: selectedStaffUuid,
            reportUuid: foundStaff ? foundStaff.reports.map(report => report.uuid) : []
        }));
    };
    
    const checkRequired = (prdata) => {
        if (prdata.uuid === "" || prdata.uuid === undefined) {
            Swal.fire(
                "Staff is required",
                "Please Select the Staff",
                "error"
            );
            return false;
        }
        return true;
    };
    
   
    const handleSubmit = async (e) => {
        // Construct the data object to be logged
        e.preventDefault();
        
        const isSuccessfull = checkRequired(formData);
        if (isSuccessfull) {
            try {
                const response = await assignReportstoStaff(formData);
                if (response.data.statusCode === 200) {
                    toast.success("Reports Assigned Successfully", {
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
                     // Reset dropdown and clear form data
              
                // Reload staff and reports data
                getStaff();
            

                  // Clear selected values in dropdowns
                  
                  
                }
            } catch (error) {
                // Handle error
            }
        }
    };

    const toggleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        setFormData(prevState => ({
            ...prevState,
            reportUuid: newSelectAll ? reportsData.map(report => report.uuid) : []
        }));
    };

    return (
        <div>
            <Header2 title="REPORT ACCESS" />
            <div className="container-fluid pt-0 p-4" id="content-pad">
                <form onSubmit={handleSubmit}>
                    <div className="row mt-2 mb-2">
                        <div className="form-group col-md-3">
                            <label>System Users</label>
                            <MultiSelect
                                options={staffData}
                                isSearchable
                                placeholder="- Select System User"
                                className="custom-select"
                                onChange={handleStaffSelection}
                            />
                        </div>
                        <div className="col-md-4 form-group"></div>
                        <div className="col-md-4 form-group"></div>
                        <div className="col-md-1  mt-3 form-group">
                            <div className="btn btn-dark btn-sm " id="selectAll" onClick={toggleSelectAll}>
                                <i className="fa fa-check"></i>&nbsp;Select All
                            </div>
                        </div>
                        <hr className="mt-4 mb-4"></hr>
                    </div>
                    <div className="form-group col-md-12 mt-5" id="tickschecks">
                    {reportsData.map((report) => {
                        // Check if the report is assigned to the selectedStaff
                        const isChecked = formData.reportUuid.includes(report.uuid);

                        return (
                            <div key={report.uuid} className="checkbox checkbox-success checkbox-inline col-md-3" id={`tickspc-${report.uuid}`}>
                                <input
                                    id={`chk_${report.uuid}`}
                                    type="checkbox"
                                    name={`chk_${report.uuid}`}
                                    value={report.uuid}
                                    checked={isChecked}
                                    onChange={(event) => {
                                        const { value, checked } = event.target;
                                        setFormData(prevState => ({
                                            ...prevState,
                                            reportUuid: checked ? [...prevState.reportUuid, value] : prevState.reportUuid.filter(id => id !== value)
                                        }));
                                    }}
                                />
                                <label htmlFor={`chk_${report.uuid}`}>{report.reportName}</label>
                            </div>
                        );
                    })}
                    </div>
                    <div className="form-group col-md-2 mt-3 mb-4">
                        <button className="btn btn-dark btn-sm" type="submit">
                            <i className="fa fa-floppy-o"></i> Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default StaffAccessReports;
