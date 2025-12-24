
import Constants from "../../constants/routes";
import { citiesByCountry, countries } from "../../constants/Country-City-Data";

import MultiSelect from "../reactMultiSelect";
import Header2 from "../header2/header2";

import React, { useState } from "react";
import { createBranch } from "../../Apis/API";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BranchNew = () => {
  const [branchData, setBranchData] = useState({
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
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setBranchData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCountryChange = (selectedCountry) => {
    setBranchData((prevData) => ({
      ...prevData,
      branchCountry: selectedCountry.value,
      branchCity: "", // Reset city when country changes
    }));
  };

  const handleCityChange = (selectedCity) => {
    setBranchData((prevData) => ({
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

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(bdata.branchEmail.trim())) {
      Swal.fire(
        "Email Validation",
        "Please enter a valid email address.",
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

    // Email validation
    const accountantEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!accountantEmailRegex.test(bdata.accountantEmail.trim())) {
      Swal.fire(
        "Email Validation",
        "Please enter a valid Accountant email address.",
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isSuccessfull = checkRequired(branchData);
    if (isSuccessfull) {
      try {
        const response = await createBranch(branchData);

       
        if (response.data.statusCode === 200) {
          toast.success("Branch Added Successfully", {
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

          setBranchData({
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
          navigate(Constants.URLConstants.BRANCHSEARCH);
        }
      } catch (error) {
        //  console.error(error)
      }
    }
  };

  return (
    <>
      <Header2
        title="NEW BRANCH"
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
                value={branchData.branchName}
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
                  (c) => c.value === branchData.branchCountry
                )}
              />
            </div>
            <div className="col-md-3 form-group phps_row_1">
              <label>Branch City</label>
              <MultiSelect
                //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                options={citiesByCountry[branchData.branchCountry] || []}
                isSearchable
                placeholder="- Please select a city -"
                className="custom-select required"
                onChange={handleCityChange}
                noOptionsMessage={() => "No City Found"}
                value={(citiesByCountry[branchData.branchCountry] || []).find(
                  (c) => c.value === branchData.branchCity
                )}
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
                value={branchData.branchEmail}
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
                value={branchData.accountantEmail}
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
                value={branchData.phone}
                onChange={handleChange}
                maxLength="15"
                onKeyUp={(e) => {
                  // Custom function for handling numeric input
                  // You can replace this with your own logic
                  const numericValue = e.target.value.replace(/[^\d]/g, "");
                  setBranchData((prevData) => ({
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
                value={branchData.location}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Tax Number</label>
              <input
                className="required form-control form-control-sm select_style"
                type="text"
                name="taxNumber"
                value={branchData.taxNumber}
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
                value={branchData.CR_Number}
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
                value={branchData.address}
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
                value={branchData.bankDetails}
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
                  checked={branchData.active}
                  onChange={handleChange}
                />
                <label htmlFor="checkbox3">Active</label>
              </div>
            </div>
            <div className="col-md-3 form-group phps_row_1">
              <div className="checkbox checkbox-success form-group">
                <input
                  type="checkbox"
                  name="recieveBookingEmails"
                  checked={branchData.recieveBookingEmails}
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
                  checked={branchData.jointVenture}
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
export default BranchNew;
