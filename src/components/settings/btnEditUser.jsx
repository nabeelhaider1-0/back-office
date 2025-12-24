import { connect } from "react-redux";
import Constants from "../../constants/routes";
import Header2 from "../header2/header2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { updateStaff } from "../../Apis/API";
import { Slide, toast } from "react-toastify";
import MultiSelect from "../reactMultiSelect";
import { timezone } from "../../constants/contants";
import uploadFile from "../../constants/filesuploader";

const EditUser = ({ data }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const [editStaffData, setEditStaffData] = useState({
    uuid: "",
    userName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    timeZone: null,
    phone: "",
    address: "",
    jointVenture: false,
    canDebug: false,
    bookUnderCancellationPolicy: false,
    cancellationAfterVoucher: false,
    receivedBookingEmails: false,
  });
  const navigate = useNavigate();
  const navigateOnRefresh = useNavigate();
  function filterOptionsByValue(options, value) {
    return options.filter((option) => option.value === value);
  }
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setEditStaffData({
        uuid: data.uuid || "",
        userName: data.userName || "",
        firstName: data.firstName || "",
        middleName: data.middleName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        timeZone: filterOptionsByValue(timezone, data.timeZone),
        phone: data.phone || "",
        address: data.address || "",
        jointVenture: data.jointVenture === "no" ? false : true,
        canDebug: data.canDebug === "no" ? false : true,
        bookUnderCancellationPolicy:
          data.bookUnderCancellationPolicy === "no" ? false : true,
        cancellationAfterVoucher:
          data.cancellationAfterVoucher === "no" ? false : true,
        receivedBookingEmails:
          data.receivedBookingEmails === "no" ? false : true,
      });
    } else {
      // If data is not available, navigate to the staff search page
      navigateOnRefresh(Constants.URLConstants.STAFFSEARCH);
    }
  }, [data, navigateOnRefresh]);

  const handleInputChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    setEditStaffData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handletimeZoneChange = (selectedOption) => {
    setEditStaffData((prevData) => ({
      ...prevData,
      timeZone: selectedOption,
    }));
  };

  const checkRequired = (sdata) => {
    if (sdata.firstName === "" || sdata.firstName === undefined) {
      Swal.fire(
        "First Name is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (sdata.lastName === "" || sdata.lastName === undefined) {
      Swal.fire(
        "Last Name is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (!sdata.email || sdata.email.trim() === "") {
      Swal.fire(
        "Email is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(sdata.email.trim())) {
      Swal.fire(
        "Email Validation",
        "Please enter a valid email address.",
        "error"
      );
      return false;
    }

    if (!sdata.timeZone || sdata.timeZone.length === 0) {
      Swal.fire(
        "Time-Zone is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (sdata.phone === "" || sdata.phone === undefined) {
      Swal.fire(
        "Phone is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const staffDataForEdit = { ...editStaffData };

    staffDataForEdit.timeZone = staffDataForEdit.timeZone.value;

    if (!selectedFile) {
      staffDataForEdit.image = data.image;
    } else {
      const resp = await uploadFile(selectedFile);
      if (resp.success === true) {
        staffDataForEdit.image = resp.imagelink;
      } else {
      }
    }

    const isSuccessfull = checkRequired(staffDataForEdit);

    if (isSuccessfull) {
      try {
        const response = await updateStaff(
          staffDataForEdit.uuid,
          staffDataForEdit
        );

        if (response.data.statusCode === 200) {
          toast.success("Staff Upated Successfully", {
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

          setEditStaffData({
            userName: "",
            password: "",
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            timeZone: null,
            phone: "",
            address: "",
            jointVenture: false,
            canDebug: false,
            bookUnderCancellationPolicy: false,
            cancellationAfterVoucher: false,
            receivedBookingemails: false,
          });
          navigate(Constants.URLConstants.STAFFSEARCH);
        }
      } catch (error) {
        // Handle the error as needed
        console.error(error);
      }
    }
  };

  return (
    <>
      <div>
        <Header2
          title="EDIT USER"
          linkText1="List Users"
          linkText2="Edit User"
          link1={Constants.URLConstants.STAFFSEARCH}
        />
      </div>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div
          className="panel-body"
          style={{
            backgroundColor: " #FF5015",
            paddingBottom: "1px",
            paddingTop: "4px",
          }}
        >
          <div className="row">
            <div className="col-md-12">
              <h5
                style={{ color: "white", fontSize: "15px", marginLeft: "20px" }}
              >
                {" "}
                UserName : {editStaffData.userName}
              </h5>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="panel-body">
            <div className="row mt-2">
              <div className="form-group col-md-3">
                <label>First Name</label>
                <input
                  className="required form-control form-control-sm"
                  type="text"
                  name="firstName"
                  id="firstName"
                  size="35"
                  maxlength="25"
                  value={editStaffData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Middle Name</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="middleName"
                  id="middleName"
                  size="35"
                  maxlength="25"
                  value={editStaffData.middleName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Last Name</label>
                <input
                  className="required form-control form-control-sm"
                  type="text"
                  name="lastName"
                  id="lastName"
                  size="35"
                  maxlength="25"
                  value={editStaffData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-3">
                <label>Email</label>
                <input
                  className="required form-control form-control-sm"
                  type="email"
                  name="email"
                  id="email"
                  size="35"
                  maxlength="50"
                  value={editStaffData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Time Zone</label>
                <MultiSelect
                  options={timezone}
                  isSearchable
                  placeholder="- Select timeZone -"
                  noOptionsMessage={() => "No timeZone Found"}
                  className="custom-select required"
                  value={editStaffData.timeZone}
                  onChange={handletimeZoneChange}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Phone</label>
                <input
                  className="required form-control form-control-sm"
                  type="text"
                  name="phone"
                  id="phone"
                  size="35"
                  value={editStaffData.phone}
                  onChange={handleInputChange}
                  maxlength="15"
                  onKeyUp={(e) => {
                    // Custom function for handling numeric input
                    // You can replace this with your own logic
                    const numericValue = e.target.value.replace(/[^\d]/g, "");
                    setEditStaffData((prevData) => ({
                      ...prevData,
                      phone: numericValue,
                    }));
                  }}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Profile Image</label>
                <br />
                <span className="uniqFile input-group">
                  <span
                    className="input-group-addon fa fa-upload myInputFile"
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      type="file"
                      name="image"
                      size="39"
                      accept="image/*"
                      onChange={handleFileInput}
                    />
                  </span>
                </span>
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-12">
                <label>
                  Allowed Connection Addresses# (Blank if any address)
                </label>
                <textarea
                  className="form-control form-control-sm"
                  id="address"
                  name="address"
                  value={editStaffData.address} // Make sure to bind the textarea value to staffData
                  onChange={handleInputChange} // Assuming you want to update state when textarea changes
                  cols="40"
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group ">
                <div className="form-group col-md-9">
                  <div className="checkbox checkbox-success checkbox-inline">
                    <input
                      id="jointVenture"
                      type="checkbox"
                      name="jointVenture"
                      checked={editStaffData.jointVenture}
                      onChange={handleInputChange}
                    />
                    <label for="is_joint_venture">Joint Venture</label>
                  </div>
                  <div className="checkbox checkbox-success checkbox-inline">
                    <input
                      type="checkbox"
                      id="canDebug"
                      name="canDebug"
                      checked={editStaffData.canDebug}
                      onChange={handleInputChange}
                    />
                    <label for="PSA_can_debug">Debug</label>
                  </div>
                  <div className="checkbox checkbox-success checkbox-inline">
                    <input
                      id="PSA_allow_b"
                      type="checkbox"
                      name="bookUnderCancellationPolicy"
                      checked={editStaffData.bookUnderCancellationPolicy}
                      onChange={handleInputChange}
                    />
                    <label for="PSA_bk">
                      Allow Book Under Cancellation Policy?
                    </label>
                  </div>
                  <div className="checkbox checkbox-success  checkbox-inline">
                    <input
                      id="PSA_allow_c"
                      type="checkbox"
                      name="cancellationAfterVoucher"
                      checked={editStaffData.cancellationAfterVoucher}
                      onChange={handleInputChange}
                    />
                    <label for="PSA_can">
                      Allow Cancellation After Voucher?
                    </label>
                  </div>
                  <div className="checkbox checkbox-success  checkbox-inline">
                    <input
                      type="checkbox"
                      id="PSA_can"
                      name="receivedBookingemails"
                      checked={editStaffData.receivedBookingemails}
                      onChange={handleInputChange}
                    />
                    <label for="PSA_can">Received Booking Emails?</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12 form-group mb-4 phps_row_0">
                <button type="submit" className="btn btn-dark btn-sm">
                  <i className="fa fa-floppy-o"></i>&nbsp;Save
                </button>
              </div>
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
export default connect(mapStateToProps)(EditUser);
