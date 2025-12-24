import { useEffect, useRef, useState } from "react";
import Constants from "../../constants/routes";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";

import Flatpickr from "react-flatpickr";
import { createReminder, getAllBranches } from "../../Apis/API";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SettingReminderNew = () => {

    const [formData, setFormData] = useState({
        branch: "",
        bookingId: '',
        reminderSet: false,
        remindMe: '',
        note: ''
    });




    // State to track the visibility of the reminder div
    const [showReminder, setShowReminder] = useState(false);

    const handleRadioChange = (e) => {
        const isReminderSet = e.target.value === "true"; // Convert 'Y' to true, 'N' to false
        setShowReminder(isReminderSet);
        setFormData(prevState => ({
            ...prevState,
            reminderSet: isReminderSet
        }));
    };
    const [startDate, setStartDate] = useState(new Date());
    const fromDateRef = useRef(null); // Create a ref to access the Flatpickr instance

    useEffect(() => {
        // Initialize Flatpickr when the component mounts
        if (fromDateRef.current) {
            fromDateRef.current.flatpickr({
                dateFormat: "Y-m-d",
                minDate: "today",
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleMultiSelectChange = (selectedOptions) => {
        setFormData(prevState => ({
            ...prevState,
            branch: selectedOptions.label
        }));
    };


    const [branches, setBranches] = useState();


    const getbranches = async () => {
        try {

            const response = await getAllBranches();

            if (response.data.statusCode === 200) {
                const branches = response.data.data || [];

                const options = branches.map((branch) => ({
                    value: branch.uuid,
                    label: branch.branchName,
                }));


                setBranches(options); // Set branches in the new state

            }

        } catch (error) {
            // console.error(error);
        }

    };

    useEffect(() => {
        getbranches();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const navigate = useNavigate();

    const checkRequired = (sdata) => {
        if (sdata.branch === "" || sdata.branch === undefined) {
            Swal.fire(
                "Branch is required",
                "Please fill in the required fields",
                "error"
            );
            return false;
        }
        if (sdata.bookingId === "" || sdata.bookingId === undefined) {
            Swal.fire(
                "Boooking ID is required",
                "Please fill in the required fields",
                "error"
            );
            return false;
        }

        if (sdata.note === "" || sdata.note === undefined) {
            Swal.fire(
                "Note is required",
                "Please fill in the required fields",
                "error"
            );
            return false;
        }

        return true;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        let formDataWithDate = { ...formData };
   
        if (formData.reminderSet) {
            const formattedDate = startDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
            formDataWithDate = {
                ...formData,
                remindMe: formattedDate // Adding the formatted date to the formData object
            };
        } else {
            // formDataWithDate = {
            //     ...formData,
            //     remindMe: '' // Set remindMe to an empty string if reminderSet is 'N'
            // };
            const formattedDate = startDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
            formDataWithDate = {
                ...formData,
                remindMe: formattedDate // Adding the formatted date to the formData object
            };
        }
       
        // Here you can perform further actions like sending the data to a server
        const isSuccessfull = checkRequired(formDataWithDate);
        if (isSuccessfull) {
            try {
                const response = await createReminder(formDataWithDate);

          
                if (response.data.statusCode === 200) {
                    toast.success("Reminder Created Successfully", {
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
                        branch: "",
                        bookingId: '',
                        reminderSet: false,
                        remindMe: '',
                        note: ''
                    });
                    navigate(Constants.URLConstants.SETTINGREMINDERSEARCH);
                }
            } catch (error) {
                //  console.error(error)
            }
        }




    };


    return (
        <>
            <div className="container-fluid pt-0 p-4" id="content-pad">

                <Header2 title="COMPOSE NOTE" linkText1="Search Note" linkText2="Compose Note" link1={Constants.URLConstants.SETTINGREMINDERSEARCH} />

                <form onSubmit={handleSubmit}>
                    <div className="panel-body">
                        <div className="row">
                            <div className="form-group col-md-3">
                                <label>Branch</label>
                                <MultiSelect
                                    options={branches}
                                    // isMulti
                                    isSearchable
                                    placeholder="- Select Branch -"
                                    noOptionsMessage={() => "No Branch Found"}
                                    className="custom-select required"
                                    onChange={handleMultiSelectChange}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Booking ID</label>
                                <input
                                    className="form-control form-control-sm required test123"
                                    type="text"
                                    name="bookingId"
                                    value={formData.bookingId}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Set a Reminder</label>
                                <div>
                                    <div className="radioline1 mt-2">
                                        <div className="radio radio-success" style={{ position: 'relative', display: 'inline-block' }}>
                                            <input type="radio" id="singleRadio1" name="rdReceiver" value={true} onChange={handleRadioChange} checked={formData.reminderSet === true} />
                                            <label htmlFor="singleRadio1">Yes</label>
                                        </div>&nbsp;&nbsp;
                                        <div className="radio radio-success" style={{ position: 'relative', display: 'inline-block' }}>
                                            <input type="radio" id="singleRadio2" name="rdReceiver" value={false} onChange={handleRadioChange}
                                                checked={formData.reminderSet === false} />
                                            <label htmlFor="singleRadio2">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-3" id="CalImg" style={{ display: showReminder ? 'block' : 'none' }}>
                                <label>Remind me at</label>
                                <div className="input-group date col-md-12 col-sm-12 col-xs-12" id="reminddatetime">
                                    <Flatpickr
                                        name="remindMe"
                                        value={startDate}
                                        onChange={(selectedDates) => setStartDate(selectedDates[0])}
                                        className="required"
                                        style={{ width: "190px" }}
                                        options={{
                                            dateFormat: "Y-m-d",
                                            minDate: "today",
                                        }}
                                    />
                                    <span className="input-group-addon dateIcon"><i className="fa fa-th" /></span>
                                </div>
                            </div>

                            <div className="form-group col-md-12">
                                <label>Note</label>
                                {/* <div class="summernote required"name="txtar_msg">
              
          </div> */}
                                <textarea
                                    name="note"
                                    className="form-control form-control-sm required"
                                    rows={4}
                                    cols={80}
                                    value={formData.note}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="form-group col-md-12">
                                <button type="submit" className="btn btn-dark btn-sm">
                                    <i className="fa fa-floppy-o" />&nbsp;Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default SettingReminderNew;
