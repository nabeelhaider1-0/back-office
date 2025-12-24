/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import excelFileContent from "../../../ExcelFiles/worldcities.xlsx";
import { useEffect } from "react";
import excelfilereader from "../../../constants/excelfilereader";
import {
  SelHrsOptions,
  languageOptions,
  minutesOptions,
  pickupPointOptions,
} from "../../../constants/contants";
import {
  ErrorApiAlert,
  RequiredFieldAlert,
  SuccessApiToast,
  extractValuesFromArray,
  formatDuration,
} from "../../../constants/globalfunctions";
import { postDATA } from "../../../Apis/API";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../../../constants/ApiRoutes";
const MastersTransfersNew = () => {
  const [pickupcountryOptions, setpickupcountryOptions] = useState([]);
  const [dropoffcountryOptions, setdropoffcountryOptions] = useState([]);
  const [pickupcountrycitydata, setpickupcountrycitydata] = useState([]);
  const [dropoffcountrycitydata, setdropoffcountrycitydata] = useState([]);
  const [pickupcityOptions, setpickupcityOptions] = useState([]);
  const [dropoffcityOptions, setdropoffcityOptions] = useState([]);
  const [pickupselectedCountry, setpickupselectedCountry] = useState(null);
  const [dropoffselectedCountry, setdropoffselectedCountry] = useState(null);
  const [pickupselectedCity, setpickupselectedCity] = useState(null);
  const [dropoffselectedCity, setdropoffselectedCity] = useState(null);
  const [formData, setFormData] = useState({
    transferName: "",
    driverLanguage: [],
    driverLanguages: [],
    duration: "",
    durationHours: "",
    durationMinutes: "",
    pickupCountry: "",
    fromCity: "",
    pickupPoint: "",
    dropoffCountry: "",
    toCity: "",
    dropOffPoint: "",
    bufferTime: "",
    bufferminutes: "",
    bufferHours: "",
    waitingTime: "",
    waitingminutes: "",
    waitingHours: "",
    status: "Active",
    meetingPoint: "",
    description: "",
    additionalInformation: "",
  });

  const fetchExcelData = async () => {
    try {
      // Pass the Excel file content directly to the readExcelFile function
      const data = await excelfilereader(excelFileContent);
      setpickupcountrycitydata(data);
      setdropoffcountrycitydata(data);
      const uniqueCountries = Array.from(
        new Set(data.CountryCities.map((item) => item.country))
      ).map((country) => ({
        value: data.CountryCities.find((item) => item.country === country).iso3,
        label: country,
      }));
      setpickupcountryOptions(uniqueCountries);
      setdropoffcountryOptions(uniqueCountries);
    } catch (error) {}
  };
  useEffect(() => {
    fetchExcelData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // Extract city options based on selected country
    if (pickupselectedCountry) {
      const cities = pickupcountrycitydata.CountryCities.filter(
        (item) => item.iso3 === pickupselectedCountry.value
      ).map((item) => ({ value: item.city, label: item.city }));
      setpickupcityOptions(cities);
    } else {
      setpickupcityOptions([]);
    }
  }, [pickupselectedCountry]);
  useEffect(() => {
    // Extract city options based on selected country
    if (dropoffselectedCountry) {
      const cities = dropoffcountrycitydata.CountryCities.filter(
        (item) => item.iso3 === dropoffselectedCountry.value
      ).map((item) => ({ value: item.city, label: item.city }));
      setdropoffcityOptions(cities);
    } else {
      setdropoffcityOptions([]);
    }
  }, [dropoffselectedCountry]);

  const handlepickupCountryChange = (selectedOption) => {
    setpickupselectedCountry(selectedOption);
    setpickupselectedCity(null); // Reset city selection when country changes
  };

  const handlepickupCityChange = (selectedOption) => {
    setpickupselectedCity(selectedOption);
  };
  const handledropoffCountryChange = (selectedOption) => {
    setdropoffselectedCountry(selectedOption);
    setdropoffselectedCity(null); // Reset city selection when country changes
  };

  const handledropoffCityChange = (selectedOption) => {
    setdropoffselectedCity(selectedOption);
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleMultiSelectChange = (name, selectedOptions) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOptions,
    }));
  };
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSingleSelectChange = (selectedOption, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption.value, // Assuming the option object has a 'value' property
    }));
  };

  const checkRequired = (bdata) => {
    if (bdata.transferName === "" || bdata.transferName === undefined) {
      RequiredFieldAlert(
        "Transfer Name is required",
        "Please fill in the required fields",
        "error"
      );

      return false;
    }

    if (
      !Array.isArray(bdata.driverLanguage) ||
      bdata.driverLanguage.length === 0
    ) {
      RequiredFieldAlert(
        "Driver Language is required",
        "Please select the driver language",
        "error"
      );

      return false;
    }

    if (
      bdata.duration === "00:00" ||
      bdata.duration === "" ||
      bdata.duration === undefined
    ) {
      RequiredFieldAlert(
        "Duration is required",
        "Please select the duration",
        "error"
      );
      return false;
    }

    if (bdata.pickupCountry === "" || bdata.pickupCountry === undefined) {
      RequiredFieldAlert(
        "Pickup Country is required",
        "Please select the pickup country",
        "error"
      );
      return false;
    }

    if (bdata.fromCity === "" || bdata.fromCity === undefined) {
      RequiredFieldAlert(
        "From City is required",
        "Please select the from city",
        "error"
      );
      return false;
    }

    if (bdata.pickupPoint === "" || bdata.pickupPoint === undefined) {
      RequiredFieldAlert(
        "Pickup Point is required",
        "Please select the pickup point",
        "error"
      );
      return false;
    }

    if (bdata.dropoffCountry === "" || bdata.dropoffCountry === undefined) {
      RequiredFieldAlert(
        "Dropoff Country is required",
        "Please select the dropoff country",
        "error"
      );
      return false;
    }

    if (bdata.toCity === "" || bdata.toCity === undefined) {
      RequiredFieldAlert(
        "To City is required",
        "Please select the to city",
        "error"
      );
      return false;
    }

    if (bdata.dropOffPoint === "" || bdata.dropOffPoint === undefined) {
      RequiredFieldAlert(
        "Dropoff Point is required",
        "Please select the dropoff point",
        "error"
      );
      return false;
    }
    if (
      bdata.bufferTime === "00:00" ||
      bdata.bufferTime === "" ||
      bdata.bufferTime === undefined
    ) {
      RequiredFieldAlert(
        "Buffer Time is required",
        "Please select the buffer time",
        "error"
      );
      return false;
    }

    if (
      bdata.waitingTime === "00:00" ||
      bdata.waitingTime === "" ||
      bdata.waitingTime === undefined
    ) {
      RequiredFieldAlert(
        "Waiting Time is required",
        "Please select the waiting time",
        "error"
      );
      return false;
    }
    return true;
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assign values to formData fields based on conditions
    formData.pickupCountry =
      (pickupselectedCountry && pickupselectedCountry.label) || "";
    formData.fromCity = (pickupselectedCity && pickupselectedCity.label) || "";
    formData.dropoffCountry =
      (dropoffselectedCountry && dropoffselectedCountry.label) || "";
    formData.toCity = (dropoffselectedCity && dropoffselectedCity.label) || "";
    formData.duration = formatDuration(
      formData.durationHours,
      formData.durationMinutes
    );
    formData.bufferTime = formatDuration(
      formData.bufferHours,
      formData.bufferminutes
    );
    formData.waitingTime = formatDuration(
      formData.waitingHours,
      formData.waitingminutes
    );
    formData.driverLanguage = extractValuesFromArray(formData.driverLanguages);

    // Extracting values from formData while excluding specific keys
    const {
      durationHours,
      durationMinutes,
      waitingminutes,
      waitingHours,
      bufferminutes,
      bufferHours,
      driverLanguages,
      ...requestBody
    } = formData;

    // Now requestBody will contain all other keys from formData except the excluded ones

    const isSuccessfull = checkRequired(requestBody);

    if (isSuccessfull) {
      try {
        const response = await postDATA(
          requestBody,
          ApiRoutes.TRANSFERS.ADD_TRANSFER
        );

        if (response.data.statusCode === 200) {
          SuccessApiToast("Transfer Added Successfully");

          navigate(Constants.URLConstants.MASTERSTRANSFERSSEARCH);
        }
      } catch (error) {
        ErrorApiAlert("Error Adding Transfers");
        //  console.error(error)
      }
    }
  };
  const handleFormReset = () => {
    setFormData({
      transferName: "",
      driverLanguage: [],
      driverLanguages: [],
      duration: "",
      durationHours: "",
      durationMinutes: "",
      pickupCountry: "",
      fromCity: "",
      pickupPoint: "",
      dropoffCountry: "",
      toCity: "",
      dropOffPoint: "",
      bufferTime: "",
      bufferminutes: "",
      bufferHours: "",
      waitingTime: "",
      waitingminutes: "",
      waitingHours: "",
      status: "Active",
      meetingPoint: "",
      description: "",
      additionalInformation: "",
    });
  };

  const handlePickupCitySelection = () => {
    if (!pickupselectedCountry) {
      // If no country is selected, display a warning
      RequiredFieldAlert("Please select pickup country first", "", "warning");
    }
  };

  const handleDropoffCitySelection = () => {
    if (!dropoffselectedCountry) {
      // If no country is selected, display a warning
      RequiredFieldAlert("Please select dropoff country first", "", "warning");
    }
  };
  return (
    <>
      <Header2
        title="ADD TRANSFER"
        linkText1="Search Transfer "
        linkText2="Add Transfer"
        link1={Constants.URLConstants.MASTERSTRANSFERSSEARCH}
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={handleSubmit}>
          <div className="panel-body">
            <div className="row">
              <div className=" col-md-3  form-group phps_row_1">
                <label>Transfer Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm required test123"
                  name="transferName"
                  id="transferName"
                  size={38}
                  maxLength={255}
                  value={formData.transferName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3 form-group phps_row_0">
                <label>Driver Languages</label>

                <MultiSelect
                  options={languageOptions}
                  isSearchable
                  isMulti
                  placeholder=" Select Language "
                  name="driverLanguage"
                  value={formData.driverLanguages}
                  onChange={(selectedOptions) =>
                    handleMultiSelectChange("driverLanguages", selectedOptions)
                  }
                  className="custom-select required"
                  noOptionsMessage={() => "No Language Found"}
                />
              </div>
              <div className="col-md-3">
                <label>Duration (Hours - Minutes)</label>
                <br />
                <div
                  className="mt-2"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <MultiSelect
                    options={SelHrsOptions}
                    isSearchable
                    placeholder=" 00 "
                    name="durationHours"
                    value={SelHrsOptions.find(
                      (option) => option.value === formData.durationHours
                    )}
                    onChange={(selectedOption) =>
                      handleSingleSelectChange(selectedOption, "durationHours")
                    }
                    className="custom-select required w-50"
                    noOptionsMessage={() => "No Hrs Found"}
                  />
                  <MultiSelect
                    options={minutesOptions}
                    isSearchable
                    placeholder=" 00 "
                    name="durationMinutes"
                    value={minutesOptions.find(
                      (option) => option.value === formData.durationMinutes
                    )}
                    onChange={(selectedOption) =>
                      handleSingleSelectChange(
                        selectedOption,
                        "durationMinutes"
                      )
                    }
                    className="custom-select w-50"
                    noOptionsMessage={() => "No Mins Found"}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className=" col-md-3  form-group phps_row_1">
                <label>Pickup Country</label>
                <MultiSelect
                  options={pickupcountryOptions}
                  isSearchable
                  placeholder="- Select Country Pickup -"
                  className="custom-select required"
                  onChange={handlepickupCountryChange}
                  noOptionsMessage={() => "No Country Found"}
                />
              </div>
              <div
                className="col-md-3 form-group phps_row_0"
                onClick={handlePickupCitySelection}
              >
                <label>From City</label>
                {/* Chnged lable as From City - 2 January 2015 - swapnil nagaonkar */}
                <MultiSelect
                  //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                  options={pickupcityOptions}
                  value={pickupselectedCity}
                  isSearchable
                  placeholder="- Select City -"
                  className="custom-select required"
                  onChange={handlepickupCityChange}
                  isDisabled={!pickupselectedCountry}
                  noOptionsMessage={() => "No City Found"}
                />
              </div>
              <div className="col-md-3 form-group phps_row_1">
                <label>From PickUp Point</label>
                <MultiSelect
                  options={pickupPointOptions}
                  isSearchable
                  placeholder=" Select PickUp Point"
                  name="pickupPoint"
                  value={pickupPointOptions.find(
                    (option) => option.value === formData.pickupPoint
                  )}
                  onChange={(selectedOption) =>
                    handleSingleSelectChange(selectedOption, "pickupPoint")
                  }
                  className="custom-select required"
                  noOptionsMessage={() => "No PickUp Found"}
                />
                <h5>
                  <span id="one_location" className="label label-info" />
                  <input type="hidden" name="pickup_code" id="pickup_code" />
                </h5>
              </div>
              <div
                className="form-group col-md-3"
                id="pickup_location"
                style={{ display: "none" }}
              >
                <label>Pickup Location</label>
                <br />
                <select
                  name="sel_pick_location[]"
                  className="selectpicker form-control form-control-sm show-menu-arrow select_style bs-select-hidden"
                  id="sel_pick_location"
                  data-live-search="true"
                  data-actions-box="true"
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className=" col-md-3  form-group phps_row_0">
                <label>Dropoff Country</label>
                <MultiSelect
                  options={dropoffcountryOptions}
                  isSearchable
                  placeholder="- Select Country Dropoff -"
                  className="custom-select required"
                  onChange={handledropoffCountryChange}
                  noOptionsMessage={() => "No Country Found"}
                />
              </div>
              <div
                className="col-md-3 form-group phps_row_1"
                onClick={handleDropoffCitySelection}
              >
                <label>To City</label>
                <MultiSelect
                  //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                  options={dropoffcityOptions}
                  value={dropoffselectedCity}
                  isSearchable
                  placeholder="- Select City -"
                  className="custom-select required"
                  onChange={handledropoffCityChange}
                  noOptionsMessage={() => "No City Found"}
                />
              </div>
              <div className="col-md-3 form-group phps_row_0">
                <label>To DropOff Point</label>
                <MultiSelect
                  options={pickupPointOptions}
                  isSearchable
                  placeholder=" Select DropOff Point"
                  name="dropOffPoint"
                  value={pickupPointOptions.find(
                    (option) => option.value === formData.dropOffPoint
                  )}
                  onChange={(selectedOption) =>
                    handleSingleSelectChange(selectedOption, "dropOffPoint")
                  }
                  className="custom-select required"
                  noOptionsMessage={() => "No DropOff Found"}
                />
                <h5>
                  <span id="one_drop_location" className="label label-info" />
                  <input
                    type="hidden"
                    name="dropoff_code"
                    id="dropoff_code"
                    defaultValue
                  />
                </h5>
              </div>
              <div
                className="form-group col-md-3"
                id="dropoff_location"
                style={{ display: "none" }}
              >
                <label>Dropoff Location</label>
                <select
                  name="sel_drop_location[]"
                  className="select_style selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                  id="sel_drop_location"
                  data-live-search="true"
                  data-actions-box="true"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-3">
                <label>Buffer Time (Hours - Minutes)</label>
                <br />
                <div
                  className="mt-2"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <MultiSelect
                    options={SelHrsOptions}
                    isSearchable
                    placeholder=" 00 "
                    className="custom-select required w-50"
                    name="bufferHours"
                    value={SelHrsOptions.find(
                      (option) => option.value === formData.bufferHours
                    )}
                    onChange={(selectedOption) =>
                      handleSingleSelectChange(selectedOption, "bufferHours")
                    }
                    noOptionsMessage={() => "No Hrs Found"}
                  />
                  <MultiSelect
                    options={minutesOptions}
                    isSearchable
                    placeholder=" 00 "
                    name="bufferminutes"
                    value={minutesOptions.find(
                      (option) => option.value === formData.bufferminutes
                    )}
                    onChange={(selectedOption) =>
                      handleSingleSelectChange(selectedOption, "bufferminutes")
                    }
                    className="custom-select w-50"
                    noOptionsMessage={() => "No Mins Found"}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <label>Waiting Time (Hours - Minutes)</label>
                <br />
                <div
                  className="mt-2"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <MultiSelect
                    options={SelHrsOptions}
                    isSearchable
                    placeholder=" 00 "
                    name="waitingHours"
                    value={SelHrsOptions.find(
                      (option) => option.value === formData.waitingHours
                    )}
                    onChange={(selectedOption) =>
                      handleSingleSelectChange(selectedOption, "waitingHours")
                    }
                    className="custom-select required w-50"
                    noOptionsMessage={() => "No Hrs Found"}
                  />
                  <MultiSelect
                    options={minutesOptions}
                    isSearchable
                    placeholder=" 00 "
                    className="custom-select w-50"
                    value={minutesOptions.find(
                      (option) => option.value === formData.waitingminutes
                    )}
                    onChange={(selectedOption) =>
                      handleSingleSelectChange(selectedOption, "waitingminutes")
                    }
                    noOptionsMessage={() => "No Mins Found"}
                  />
                </div>
              </div>
              <div className="col-md-3 form-group">
                <label>Status</label>
                <br />
                <div className="radioline1 mt-2">
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="status"
                      id="status"
                      value="Active"
                      checked={formData.status === "Active"}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="chk_status_act">Active</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="status"
                      value="In Active"
                      checked={formData.status === "In Active"}
                      onChange={handleRadioChange}
                      id="status"
                    />
                    <label htmlFor="chk_status_inact">Inactive</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12 form-group phps_row_1">
                <label>Meeting Point</label>
                <textarea
                  data-toggle="tooltip"
                  data-placement="top"
                  name="meetingPoint"
                  className="form-control form-control-sm"
                  value={formData.meetingPoint}
                  onChange={handleInputChange}
                  id="meetingPoint"
                  style={{ fontSize: "12px" }}
                  cols={30}
                  rows={5}
                  data-original-title
                />
              </div>
              <div className="col-md-12 form-group mt-2 phps_row_0">
                <label>Description</label>
                <textarea
                  name="description"
                  data-toggle="tooltip"
                  data-placement="top"
                  className="form-control form-control-sm"
                  value={formData.description}
                  onChange={handleInputChange}
                  id="description"
                  style={{ fontSize: "12px" }}
                  cols={30}
                  rows={5}
                  data-original-title
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 form-group mt-2 phps_row_1">
                <label>Additional Information </label>
                <textarea
                  data-toggle="tooltip"
                  data-placement="top"
                  name="additionalInformation"
                  className="form-control"
                  id="additionalInformation"
                  style={{ fontSize: "12px" }}
                  cols={30}
                  rows={5}
                  data-original-title
                  value={formData.additionalInformation}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12 form-group phps_row_0"></div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-4 form-group phps_row_1">
                <button
                  type="submit"
                  name="Submit"
                  className="btn btn-dark btn-sm"
                >
                  <i className="fa fa-floppy-o" />
                  &nbsp;&nbsp;Save
                </button>
                &nbsp;&nbsp;
                <button
                  type="reset"
                  className="btn btn-outline-secondary btn-sm"
                  id="reset"
                  name="reset"
                  onClick={handleFormReset}
                >
                  <i className="fa fa-repeat" />
                  &nbsp;&nbsp;Reset
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default MastersTransfersNew;
