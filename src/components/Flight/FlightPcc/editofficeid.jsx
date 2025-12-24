import { useEffect, useState } from "react";
import { flightproviders_options } from "../../../constants/contants";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Constants from "../../../constants/routes";
import Swal from "sweetalert2";
import { Slide, toast } from "react-toastify";
import { updateFlightOfficeID } from "../../../Apis/API";
const FlightEditOfficeIds = ({ data }) => {
  const [formData, setFormData] = useState({
    pccName: "",
    officeID: "",
    username: "",
    domain: "",
    password: "",
    flightProvider: "",
  });
  const navigateOnRefresh = useNavigate();
  function filterOptionsByValue(options, value) {
    const filteredOption = options.filter(
      (option) => option.value === value
    )[0];
    return filteredOption;
  }
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData({
        pccName: data.pccName,
        officeID: data.officeID,
        username: data.username,
        domain: data.domain,
        password: data.password,
        flightProvider: filterOptionsByValue(
          flightproviders_options,
          data.flightProvider
        ),
      });
    } else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(Constants.URLConstants.FLIGHTFLIGHTPCCSEARCHRULES);
    }
  }, [data, navigateOnRefresh]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      const updatedValues = checked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value);
      setFormData({ ...formData, [name]: updatedValues });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const checkRequired = (odata) => {
    if (odata.pccName === "" || odata.pccName === undefined) {
      Swal.fire(
        "PCC Name is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (odata.flightProvider === "" || odata.flightProvider === undefined) {
      Swal.fire(
        "Flight Provider is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (odata.officeID === "" || odata.officeID === undefined) {
      Swal.fire(
        "Office ID is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (odata.username === "" || odata.username === undefined) {
      Swal.fire(
        "User Name is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (odata.password === "" || odata.password === undefined) {
      Swal.fire(
        "Password is required",
        "Please fill in the required fields",
        "error"
      );
      return false;
    }

    if (odata.domain === "" || odata.domain === undefined) {
      Swal.fire(
        "Domain is required",
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
    formData.flightProvider = formData.flightProvider.value;
    const isSuccessfull = checkRequired(formData);
    if (isSuccessfull) {
      try {
        const response = await updateFlightOfficeID(data.uuid, formData);
        if (response.data.statusCode === 200) {
          setFormData({
            pccName: "",
            officeID: "",
            username: "",
            domain: "",
            password: "",
            flightProvider: "",
          });

          toast.success("Office ID Updated Successfully", {
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
          navigate(Constants.URLConstants.FLIGHTFLIGHTPCCSEARCHRULES);
        }
      } catch (error) {}
    }
  };

  return (
    <>
      <Header2 title="EDIT OFFICE ID" linkText1="Add" />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          <div className="panelbody">
            <div className="row mt-2">
              <div className="col-md-3 form-group " id="officeid_type">
                <label htmlFor="id_agent">Office Id Type</label>
                <br />
                <br />
                <div className="radioline1 mt-2">
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="officeid_type"
                      id="id_default"
                      value="office_id"
                      checked
                    />
                    <label htmlFor="id_default">Add Office ID</label>
                  </div>
                </div>
              </div>
              <div className="col-md-3 form-group " id="PccName">
                <label>Pcc Name: </label>
                <input
                  name="pccName"
                  value={formData.pccName}
                  onChange={handleInputChange}
                  type="text"
                  maxLength={180}
                  className="form-control form-control-sm  required"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 form-group " id="supplierlist">
                <label>Flight Provider: </label>

                <MultiSelect
                  options={flightproviders_options}
                  isSearchable
                  placeholder="- Select Flight Providers -"
                  onChange={(selectedOption) =>
                    setFormData({
                      ...formData,
                      flightProvider: selectedOption ? selectedOption : "",
                    })
                  }
                  className="custom-select required"
                  value={formData.flightProvider}
                  noOptionsMessage={() => "No Flight Providers Found"}
                />
              </div>
              <div className="col-md-3 form-group " id="aofficeid">
                <label>Office ID: </label>
                <div id="Select_officeid">
                  <input
                    id="officeId"
                    name="officeID"
                    value={formData.officeID}
                    onChange={handleInputChange}
                    type="text"
                    maxLength={180}
                    className="form-control form-control-sm  required"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="row">
                <div className="col-md-3 form-group " id="username">
                  <label>Username: </label>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    type="text"
                    maxLength={180}
                    className="form-control  required"
                  />
                </div>
                <div className="col-md-3 form-group " id="password">
                  <label>Password: </label>
                  <input
                    value={formData.password}
                    onChange={handleInputChange}
                    name="password"
                    type="text"
                    maxLength={180}
                    className="form-control  required"
                  />
                </div>
                <div className="col-md-3 form-group " id="domain">
                  <label>Domain: </label>
                  <input
                    value={formData.domain}
                    onChange={handleInputChange}
                    name="domain"
                    type="text"
                    className="form-control  required"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12">
                <br />
                <button
                  type="submit"
                  className="btn btn-dark btn-sm"
                  onclick="Javascript submit_form(document.forms['flight_office_id_form'])"
                >
                  <i className="fa fa-floppy-o" />
                  &nbsp;Save
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
export default connect(mapStateToProps)(FlightEditOfficeIds);
