import { useState, useEffect } from "react";
import Constants from "../../constants/routes";
import MultiSelect from "../reactMultiSelect";
import { connect } from "react-redux";
import { citiesByCountry, countries } from "../../constants/Country-City-Data";
import Header2 from "../header2/header2";
import { updateBranch } from "../../Apis/API";
import Swal from "sweetalert2";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BranchEdit = ({ data }) => {
  const [edditBranchData, setedditBranchData] = useState({
    uuid: "",
    branchName: "",
    branchCountry: "",
    branchCity: "",
    branchEmail: "",
    accountantEmail: "",
    phone: "",
    location: "",
    taxNumber: "",
    CR_Number: "",
    address: "",
    bankDetails: "",
    active: false,
    recieveBookingEmails: false,
    jointVenture: false,
  });


  const navigateOnRefresh = useNavigate();


  useEffect(() => {
   
    if (data && Object.keys(data).length > 0) {

    setedditBranchData({
      uuid: data.uuid || "",
      branchName: data.branchName || "",
      branchCountry: data.branchCountry || "",
      branchCity: data.branchCity || "",
      branchEmail: data.branchEmail || "",
      accountantEmail: data.accountantEmail || "",
      phone: data.phone || "",
      location: data.location || "",
      taxNumber: data.taxNumber || "",
      CR_Number: data.CR_Number || "",
      address: data.address || "",
      bankDetails: data.bankDetails || "",
      active: data.active === "no" ? false : true,
      receivedBookingEmails: data.receivedBookingEmails === "no" ? false : true,
      jointVenture: data.jointVenture === "no" ? false : true,
    });
     }

     else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(Constants.URLConstants.BRANCHSEARCH);
    }
  }, [data, navigateOnRefresh]);





  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setedditBranchData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCountryChange = (selectedCountry) => {
    setedditBranchData((prevData) => ({
      ...prevData,
      branchCountry: selectedCountry.value,
      branchCity: "", // Reset city when country changes
    }));
  };

  const handleCityChange = (selectedCity) => {
    setedditBranchData((prevData) => ({
      ...prevData,
      branchCity: selectedCity.value,
    }));
  };

  const checkRequired = (bdata) => {
    if (bdata.branchName === "" || bdata.branchName === undefined) {
      Swal.fire(
        "Branch Name is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (bdata.branchCountry === "" || bdata.branchCountry === undefined) {
      Swal.fire(
        "Branch Country is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (bdata.branchCity === "" || bdata.branchCity === undefined) {
      Swal.fire(
        "Branch City is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (bdata.branchEmail === "" || bdata.branchEmail === undefined) {
      Swal.fire(
        "Branch Email is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (bdata.accountantEmail === "" || bdata.accountantEmail === undefined) {
      Swal.fire(
        "Accountant Email is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (bdata.phone === "" || bdata.phone === undefined) {
      Swal.fire(
        "Phone is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (bdata.location === "" || bdata.location === undefined) {
      Swal.fire(
        "Location is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (bdata.taxNumber === "" || bdata.taxNumber === undefined) {
      Swal.fire(
        "Tax Number is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (bdata.CR_Number === "" || bdata.CR_Number === undefined) {
      Swal.fire(
        "CR Number is required",
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
    const isSuccessfull = checkRequired(edditBranchData);
    if (isSuccessfull) {
      try {
        const response = await updateBranch(
          edditBranchData.uuid,
          edditBranchData
        );

     
        if (response.data.statusCode === 200) {
        
          setedditBranchData({
            uuid: "",
            branchName: "",
            branchCountry: "",
            branchCity: "",
            branchEmail: "",
            accountantEmail: "",
            phone: "",
            location: "",
            taxNumber: "",
            CR_Number: "",
            address: "",
            bankDetails: "",
            active: false,
            receivedBookingEmails: false,
            jointVenture: false,
          });
          // localStorage.setItem('token', response.data.data.token)

          toast.success("Branch Edited Successfully", {
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
          navigate(Constants.URLConstants.BRANCHSEARCH);
        }
      } catch (error) {
        // console.error(error);
      }
    }
  };

  return (
    <>
      <Header2
        title="EDIT BRANCH"
        linkText1="List Branch"
        linkText2="Add branch"
        link1={Constants.URLConstants.BRANCHSEARCH}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          <div className="row mt-2">
            <div className="col-md-3 form-group phps_row_1">
              <label>Branch Name</label>
              <input
                className="form-control form-control-sm required test123"
                type="text"
                name="branchName"
                id="branch_name"
                size="35"
                value={edditBranchData.branchName}
                onChange={handleChange}
                maxLength="35"
              />
            </div>
            <div className="col-md-3 form-group phps_row_0">
              <label>Branch Country</label>
              <MultiSelect
                options={countries}
                isSearchable
                placeholder="- Please select a country -"
                className="custom-select required"
                onChange={handleCountryChange}
                noOptionsMessage={() => "No Country Found"}
                value={countries.find(
                  (c) => c.value === edditBranchData.branchCountry
                )}
              />
            </div>
            <div className="col-md-3 form-group phps_row_1">
              <label>Branch City</label>
              <MultiSelect
                //  options={Array.isArray(edditBranchData.branchCity) ? edditBranchData.branchCity : []}
                options={citiesByCountry[edditBranchData.branchCountry] || []}
                isSearchable
                placeholder="- Please select a city -"
                className="custom-select required"
                onChange={handleCityChange}
                noOptionsMessage={() => "No City Found"}
                value={(
                  citiesByCountry[edditBranchData.branchCountry] || []
                ).find((c) => c.value === edditBranchData.branchCity)}
              />
            </div>
            <div
              id="city_loading"
              style={{ position: "absolute", display: "none" }}
            >
              <img src="/cpfv3/images/ajax_pagination_loading.gif" alt="" />
            </div>
            <div className="col-md-3 form-group phps_row_0">
              <label>Branch Email</label>
              <input
                className="form-control form-control-sm required"
                type="email"
                name="branchEmail"
                value={edditBranchData.branchEmail}
                onChange={handleChange}
                maxLength="50"
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-3 form-group phps_row_1">
              <label>Accountant Email</label>
              <input
                className="form-control form-control-sm required"
                type="email"
                name="accountantEmail"
                value={edditBranchData.accountantEmail}
                onChange={handleChange}
                maxLength="50"
              />
            </div>
            <div className="col-md-3 form-group phps_row_0">
              <label>Phone</label>
              <input
                className="form-control form-control-sm required"
                type="text"
                name="phone"
                value={edditBranchData.phone}
                onChange={handleChange}
                maxLength="15"
                onKeyUp={(e) => {
                  // Custom function for handling numeric input
                  // You can replace this with your own logic
                  const numericValue = e.target.value.replace(/[^\d]/g, "");
                  setedditBranchData((prevData) => ({
                    ...prevData,
                    phone: numericValue,
                  }));
                }}
              />
            </div>
            <div className="col-md-3 form-group phps_row_1">
              <label>Location</label>
              <input
                className="form-control form-control-sm required"
                type="text"
                name="location"
                value={edditBranchData.location}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Tax Number</label>
              <input
                className="required form-control form-control-sm select_style"
                type="text"
                name="taxNumber"
                value={edditBranchData.taxNumber}
                onChange={handleChange}
                maxLength="100"
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="form-group col-md-3">
              <label>CR Number</label>
              <input
                className="required form-control form-control-sm select_style"
                type="text"
                name="CR_Number"
                value={edditBranchData.CR_Number}
                onChange={handleChange}
                maxLength="100"
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12 form-group phps_row_0">
              <label>Address</label>
              <textarea
                className="form-control form-control-sm"
                name="address"
                value={edditBranchData.address}
                onChange={handleChange}
                cols="40"
                rows="4"
              ></textarea>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12 form-group phps_row_1">
              <label>Bank Details</label>
              <textarea
                className="form-control form-control-sm"
                name="bankDetails"
                value={edditBranchData.bankDetails}
                onChange={handleChange}
                cols="40"
                rows="4"
              ></textarea>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-3 form-group phps_row_0">
              <div className="checkbox checkbox-success form-group">
                <input
                  id="checkbox3"
                  type="checkbox"
                  name="active"
                  checked={edditBranchData.active}
                  onChange={handleChange}
                />
                <label htmlFor="checkbox3">Active</label>
              </div>
            </div>
            <div className="col-md-3 form-group phps_row_1">
              <div className="checkbox checkbox-success form-group">
                <input
                  type="checkbox"
                  name="receivedBookingEmails"
                  checked={edditBranchData.receivedBookingEmails}
                  onChange={handleChange}
                />
                <label htmlFor="is_booking_email_received">
                  Received Booking Emails?
                </label>
              </div>
            </div>
            <div className="col-md-3 form-group phps_row_0">
              <div className="checkbox checkbox-success form-group">
                <input
                  type="checkbox"
                  name="jointVenture"
                  checked={edditBranchData.jointVenture}
                  onChange={handleChange}
                />
                <label htmlFor="is_joint_venture">Joint Venture</label>
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
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(BranchEdit);
