import React, { useEffect, useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import { useParams } from "react-router-dom";
import {
  currencyOptionsa,
  genderOptions,
  languageOptions,
  maritalStatusOptions,
  nationalityOptions,
  passportTypeOptions,
  religionOptions,
} from "../../../constants/contants";
import { useDispatch, useSelector } from "react-redux";
import {
  getSinfleOfflineVisa,
  updateOfflineVisa,
} from "../../../state/action/visaActions";
import { fetchCountries } from "../../../state/action/commonApisActions";

const VIsaEditRequests = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleVisaData = useSelector(
    (state) => state.visa.singleOfflineVisaData
  );
  const counties = useSelector((state) => state.countries.countries);
  console.log(counties);
  console.log(singleVisaData);
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [startDate1, setStartDate1] = useState(null); // State for the start date
  const [startDate2, setStartDate2] = useState(null); // State for the start date
  const [startDate3, setStartDate3] = useState(null); // State for the start date
  const [endDate3, setEndDate3] = useState(null); // State for the start date

  const [formData, setFormData] = useState({
    // agentRefNo: "",
    // visaWithHotel: "",
    // visaType: "",
    firstName: "",
    middleName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    husbandName: "",
    languageOne: "",
    languageTwo: "",
    languageThree: "",
    // email: "",
    gender: "",
    martialStatus: "",
    presentNationality: "",
    birthDate: null,
    birthPlace: "",
    birthCountry: "",
    religion: "",
    passportNo: "",
    passportType: "",
    passportIssuingGovt: "",
    passportIssuingCountry: "",
    placeofIssue: "",
    DateofIssue: null,
    expirationDate: null,
    addressLineOne: "",
    addressLineTwo: "",
    country: "",
    city: "city",
    telephone: null,
    visitingCountry: "",
    arrivalDate: null,
    departureDate: null,
    currency: "",
    // personalPhoto: "",
    // passportPageOne: "",
    // passportPageTwo: "",
    // residentPermit: "",
    // flightTicket: "",
    // otherImage: "",
    // agent: {
    //   uuid: "",
    // },
  });

  useEffect(() => {
    if (id) {
      dispatch(getSinfleOfflineVisa(id));
      dispatch(fetchCountries());
    }
  }, [id]);

  useEffect(() => {
    if (singleVisaData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        // agentRefNo: singleVisaData.agentRefNo,
        // visaWithHotel: singleVisaData.visaWithHotel,
        // visaType: singleVisaData.visaType,
        firstName: singleVisaData?.data?.firstName,
        middleName: singleVisaData?.data?.middleName,
        lastName: singleVisaData?.data?.lastName,
        fatherName: singleVisaData?.data?.fatherName,
        motherName: singleVisaData?.data?.motherName,
        husbandName: singleVisaData?.data?.husbandName,
        languageOne: singleVisaData?.data?.languageOne,
        languageTwo: singleVisaData?.data?.languageTwo,
        languageThree: singleVisaData?.data?.languageThree,
        // email: singleVisaData.email,
        gender: singleVisaData?.data?.gender,

        martialStatus: singleVisaData?.data?.martialStatus,
        presentNationality: singleVisaData?.data?.presentNationality,
        birthDate: singleVisaData?.data?.birthDate,
        birthPlace: singleVisaData?.data?.birthPlace,
        birthCountry: singleVisaData?.data?.birthCountry,
        religion: singleVisaData?.data?.religion,
        passportNo: singleVisaData?.data?.passportNo,
        passportType: singleVisaData?.data?.passportType,
        passportIssuingGovt: singleVisaData?.data?.passportIssuingGovt,
        passportIssuingCountry: singleVisaData?.data?.passportIssuingCountry,
        placeofIssue: singleVisaData?.data?.placeofIssue,
        DateofIssue: singleVisaData?.data?.DateofIssue,
        expirationDate: singleVisaData?.data?.expirationDate,
        addressLineOne: singleVisaData?.data?.addressLineOne,
        addressLineTwo: singleVisaData?.data?.addressLineTwo,
        country: singleVisaData?.data?.country,
        city: "city",
        telephone: singleVisaData?.data?.telephone,
        visitingCountry: singleVisaData?.data?.visitingCountry,
        arrivalDate: singleVisaData?.data?.arrivalDate,
        departureDate: singleVisaData?.data?.departureDate,
        currency: singleVisaData?.data?.currency,
      }));
    }
  }, [singleVisaData]);

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(updateOfflineVisa(id, formData));
  };

  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
  };
  const handleTrashClick1 = () => {
    // Function to clear both start and end dates
    setStartDate1(null);
  };
  const handleTrashClick2 = () => {
    // Function to clear both start and end dates
    setStartDate2(null);
  };
  const handleTrashClick3 = () => {
    // Function to clear both start and end dates
    setStartDate3(null);
    setEndDate3(null);
  };
  return (
    <>
      <Header2
        title="EDIT VISA APPLICATION"
        linkText1="Visa Bookings"
        linkText2=" Edit Visa Application"
        link1={Constants.URLConstants.VISASERACHVISAREQUESTS}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form
          action="visa_details.php"
          method="post"
          name="visa_application_form1"
          encType="multipart/form-data"
        >
          <input type="hidden" name="action" />
          <input type="hidden" name="site_id" id="site_id" />
          <div className="panel-body">
            <div className="mesID" style={{ display: "none" }}></div>
            <div className="showpagedata innerdiv" style={{ display: "block" }}>
              <div className="onlinefont">
                <div className="row">
                  <div className="col-md-12 form-group">
                    <h5>Application Details</h5>
                  </div>
                  <div className="col-sm-3 form-group phps_row_1">
                    <label>Agency</label>
                    <div>
                      <input
                        type="hidden"
                        name="sel_agent"
                        id="sel_agent"
                        defaultValue={282}
                        style={{ fontSize: "23px" }}
                      />
                      <span
                        style={{
                          fontFamily: "MONTSERRAT",
                          fontSize: "11px!important",
                        }}
                      >
                        QTECH - POONAM PATIL
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="showpagedata innerdiv onlinefont">
              <div className="row mt-2">
                <div className="col-md-12 form-group">
                  <h5>Personal Information</h5>
                </div>
                <div className="col-sm-12 form-group phps_row_1">
                  <label>Name (in English / Arabic)</label>
                  <div className="row">
                    <div className="col-sm-3 form-group phps_row_0">
                      <label>First Name / الاسم الاول</label>
                      <input
                        className="required input_text_cls form-control form-control-sm"
                        type="text"
                        maxLength={50}
                        size={20}
                        id="pass_first_name"
                        name="firstName"
                        onChange={(e) => handleChnage(e)}
                        value={formData.firstName}
                      />
                    </div>
                    <div className="col-sm-3 form-group phps_row_1">
                      <label>Middle Name / الاسم الوسط</label>
                      <input
                        className="input_text_cls form-control form-control-sm"
                        type="text"
                        maxLength={50}
                        size={20}
                        id="pass_middle_name"
                        name="middleName"
                        onChange={(e) => handleChnage(e)}
                        value={formData.middleName}
                      />
                    </div>
                    <div className="col-sm-3 form-group phps_row_0">
                      <label>Last Name / اسم العائله</label>
                      <input
                        className="required input_text_cls form-control form-control-sm"
                        type="text"
                        maxLength={50}
                        size={20}
                        id="pass_last_name"
                        name="lastName"
                        onChange={(e) => handleChnage(e)}
                        value={formData.lastName}
                      />
                    </div>
                    {/* <div className="col-sm-3 form-group phps_row_0">
                      <label>Email</label>
                      <input
                        className="required input_text_cls form-control form-control-sm"
                        type="email"
                        id="email"
                        name="email"
                        onChange={(e) => handleChnage(e)}
                        value={formData.email}
                      />
                    </div> */}
                  </div>
                </div>
                <div className="col-sm-12 form-group phps_row_1 mt-3">
                  <label>Name (in English / Arabic)</label>
                  <div className="row">
                    <div className="col-sm-3 form-group phps_row_0">
                      <label>Father Name / اسم الوالد</label>
                      <input
                        className="form-control form-control-sm input_text_cls"
                        type="text"
                        maxLength={50}
                        size={20}
                        id="father_name"
                        name="fatherName"
                        onChange={(e) => handleChnage(e)}
                        value={formData.fatherName}
                      />
                    </div>
                    <div className="col-sm-3 form-group phps_row_1">
                      <label>Mother Name / اسم الوالده</label>
                      <input
                        className="input_text_cls form-control form-control-sm"
                        type="text"
                        maxLength={50}
                        size={20}
                        id="mother_name"
                        name="motherName"
                        onChange={(e) => handleChnage(e)}
                        value={formData.motherName}
                      />
                    </div>
                    <div className="col-sm-3 form-group phps_row_0">
                      <label>Husband Name / اسم الزوج</label>
                      <input
                        className="input_text_cls form-control form-control-sm"
                        type="text"
                        maxLength={50}
                        size={20}
                        id="husband_name"
                        name="husbandName"
                        onChange={(e) => handleChnage(e)}
                        value={formData.husbandName}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 form-group phps_row_1 mt-3">
                  <label>Language Spoken</label>
                  <div className="row">
                    <div className="col-sm-3 form-group phps_row_0">
                      <label>Required</label>
                      <MultiSelect
                        options={languageOptions}
                        isSearchable
                        placeholder="Select One"
                        className="custom-select required"
                        name="languageOne"
                        onChange={(value) =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            languageOne: value.value,
                          }))
                        }
                      />
                    </div>
                    <div className="col-sm-3 form-group phps_row_1">
                      <label>(Optional)</label>
                      <MultiSelect
                        options={languageOptions}
                        isSearchable
                        placeholder="Select One"
                        className="custom-select "
                        name="languageTwo"
                        onChange={(value) =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            languageTwo: value.value,
                          }))
                        }
                      />
                    </div>
                    <div className="col-sm-3 form-group phps_row_0">
                      <label>(Optional)</label>
                      <MultiSelect
                        options={languageOptions}
                        isSearchable
                        placeholder="Select One"
                        className="custom-select"
                        name="languageThree"
                        onChange={(value) =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            languageThree: value.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="showpagedata innerdiv">
              <div className="onlinefont">
                <div className="row mt-4">
                  <div className="col-md-12 form-group">
                    <h5>Personal Information (Continued)</h5>
                  </div>

                  <div className="col-sm-3 form-group phps_row_0">
                    <label>Gender</label>
                    <MultiSelect
                      options={genderOptions}
                      isSearchable
                      placeholder="Select One"
                      className="custom-select required"
                      name="gender"
                      value={genderOptions.find(
                        (option) => option.value === formData.gender
                      )}
                      onChange={(selectedOptions) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          gender: selectedOptions.label,
                        }))
                      }
                    />
                  </div>
                  <div className="col-sm-3 form-group phps_row_1">
                    <label>Marital Status</label>
                    <MultiSelect
                      options={maritalStatusOptions}
                      isSearchable
                      placeholder="Select One"
                      className="custom-select"
                      name="martialStatus"
                      value={maritalStatusOptions.find(
                        (option) => option.value == formData.martialStatus
                      )}
                      onChange={(selectedOptions) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          martialStatus: selectedOptions.label,
                        }))
                      }
                    />
                  </div>
                  <div className="col-sm-3 form-group phps_row_0">
                    <label>Present Nationality</label>
                    <MultiSelect
                      options={counties}
                      isSearchable
                      placeholder="Select One"
                      className="custom-select required"
                      name="presentNationality"
                      value={counties.find(
                        (option) => option.label == formData.presentNationality
                      )}
                      onChange={(value) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          presentNationality: value.label,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group col-md-3 mt-1">
                    <label>Birth Date</label>
                    <div className="row">
                      <div className="col-md-10 col-sm-10 col-xs-10 padR0">
                        <div
                          className="input-group date col-md-12 col-sm-12 col-xs-12"
                          id="date_of_expiry_nw"
                        >
                          <Flatpickr
                            name="birthDate"
                            onChange={(e) => {
                              setFormData((prevFormData) => ({
                                ...prevFormData,
                                birthDate: e[0],
                              }));
                            }}
                            value={formData.birthDate}
                            options={{ dateFormat: "Y-m-d" }}
                          />
                          <span className="input-group-addon">
                            <i className="fa fa-th" />
                          </span>
                        </div>
                      </div>
                      <div className="col-md-2 col-sm-2 col-xs-2 pull-left padL0 mt-1">
                        <span
                          className="input-group-addon pointer"
                          alt="clear"
                          title="clear"
                          style={{
                            marginLeft: "-162px",
                            paddingTop: "3.5px!important",
                            paddingBottom: "9px!important",
                          }}
                          onClick={handleTrashClick}
                          id="birTrashBtn"
                        >
                          <i
                            className="fa fa-trash"
                            alt="clear"
                            title="clear"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3 form-group phps_row_1">
                    <label>Birth Place / مكان الميلاد</label>
                    <input
                      className="form-control form-control-sm input_text_cls"
                      type="text"
                      id="birth_place"
                      maxLength={50}
                      name="birthPlace"
                      onChange={(e) => handleChnage(e)}
                      value={formData.birthPlace}
                    />
                  </div>
                  <div className="col-sm-3 form-group phps_row_0">
                    <label>Birth Country</label>
                    <MultiSelect
                      options={counties}
                      isSearchable
                      placeholder="Select One"
                      className="custom-select"
                      name="birthCountry"
                      onChange={(value) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          birthCountry: value.label,
                        }))
                      }
                      // value={formData.birthCountry}
                    />
                  </div>
                  <div className="col-sm-3 form-group phps_row_1">
                    <label>Religion</label>
                    <MultiSelect
                      options={religionOptions}
                      isSearchable
                      placeholder="Select One"
                      className="custom-select "
                      name="religion"
                      onChange={(value) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          religion: value.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="showpagedata innerdiv onlinefont">
              <div className="row">
                <div className="col-md-12 form-group mt-3">
                  <h5>Passport Details &amp; Address</h5>
                </div>
                <div className="col-sm-3 form-group phps_row_1">
                  <label>Passport No</label>
                  <input
                    className="required form-control form-control-sm input_text_cls"
                    id="passport_num"
                    type="text"
                    name="passportNo"
                    onChange={(e) => handleChnage(e)}
                    value={formData.passportNo}
                  />
                </div>
                <div className="col-sm-3 form-group phps_row_0">
                  <label>Passport Type</label>

                  <MultiSelect
                    options={passportTypeOptions}
                    isSearchable
                    placeholder="Select One"
                    className="custom-select "
                    name="passportType"
                    onChange={(value) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        passportType: value.value,
                      }))
                    }
                  />
                </div>
                <div className="col-sm-3 form-group phps_row_1">
                  <label>Passport Issuing Government</label>
                  <MultiSelect
                    options={nationalityOptions}
                    isSearchable
                    placeholder="Select One"
                    className="custom-select "
                    name="passportIssuingGovt"
                    onChange={(value) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        passportIssuingGovt: value.value,
                      }))
                    }
                  />
                </div>
                <div className="col-sm-3 form-group phps_row_0">
                  <label>Passport Issuing Country</label>
                  <MultiSelect
                    options={nationalityOptions}
                    isSearchable
                    placeholder="Select One"
                    className="custom-select required"
                    name="passportIssuingCountry"
                    onChange={(value) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        passportIssuingCountry: value.value,
                      }))
                    }
                  />
                </div>
                <div className="col-sm-3 form-group phps_row_1">
                  <label>Place Of Issue</label>
                  <input
                    className="required form-control form-control-sm input_text_cls"
                    id="issue_place"
                    type="text"
                    onkeydown="isalpha_character(this);"
                    onblur="isalpha_character(this);"
                    name="placeofIssue"
                    onChange={(e) => handleChnage(e)}
                    value={formData.placeofIssue}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>Date Of Issue</label>
                  <div className="row">
                    <div className="col-md-10 col-sm-10 col-xs-10 padR0">
                      <div
                        className="input-group date col-md-12 col-sm-12 col-xs-12"
                        id="date_of_issue_nw"
                      >
                        <Flatpickr
                          name="DateofIssue"
                          onChange={(e) => {
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              DateofIssue: e[0],
                            }));
                          }}
                          value={formData.DateofIssue}
                          options={{ dateFormat: "Y-m-d" }}
                        />
                        <span className="input-group-addon">
                          <i className="fa fa-th" />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-2 col-xs-2 pull-left padL0 mt-1">
                      <span
                        className="input-group-addon pointer"
                        style={{
                          marginLeft: "-162px",
                          paddingTop: "3.5px!important",
                          paddingBottom: "9px!important",
                        }}
                        id="issueTrashBtn"
                        onClick={handleTrashClick1}
                      >
                        <i className="fa fa-trash" alt="clear" title="clear" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <label>Expiration Date</label>
                  <div className="row">
                    <div className="col-md-10 col-sm-10 col-xs-10 padR0">
                      <div
                        className="input-group date col-md-12 col-sm-12 col-xs-12"
                        id="date_of_expiry_nw"
                      >
                        <Flatpickr
                          name="expirationDate"
                          onChange={(e) => {
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              expirationDate: e[0],
                            }));
                          }}
                          value={formData.expirationDate}
                          options={{ dateFormat: "Y-m-d" }}
                        />
                        <span className="input-group-addon">
                          <i className="fa fa-th" />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-2 col-xs-2 pull-left padL0 mt-1">
                      <span
                        className="input-group-addon pointer"
                        alt="clear"
                        title="clear"
                        style={{
                          marginLeft: "-162 px",
                          paddingTop: "3.5px!important",
                          paddingBottom: "9px!important",
                        }}
                        onClick={handleTrashClick2}
                        id="expTrashBtn"
                      >
                        <i className="fa fa-trash" alt="clear" title="clear" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3 form-group phps_row_0">
                  <label>Address Line1</label>
                  <input
                    className="form-control form-control-sm input_text_cls"
                    type="text"
                    id="address1"
                    name="addressLineOne"
                    onChange={(e) => handleChnage(e)}
                    value={formData.addressLineOne}
                  />
                </div>
                <div className="col-sm-3 form-group phps_row_1">
                  <label>Address Line2</label>
                  <input
                    className="form-control form-control-sm input_text_cls"
                    type="text"
                    id="address2"
                    name="addressLineTwo"
                    onChange={(e) => handleChnage(e)}
                    value={formData.addressLineTwo}
                  />
                </div>
                <div className="col-sm-3 form-group phps_row_0">
                  <label>Country</label>
                  <MultiSelect
                    options={nationalityOptions}
                    isSearchable
                    placeholder="Select One"
                    className="custom-select "
                    name="country"
                    onChange={(value) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        country: value.value,
                      }))
                    }
                  />
                </div>
                <div className="col-sm-3 form-group phps_row_1">
                  <label>City</label>
                  <MultiSelect
                    options={nationalityOptions}
                    isSearchable
                    placeholder="Select One"
                    className="custom-select "
                    name="country"
                    onChange={(value) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        city: value.value,
                      }))
                    }
                  />
                </div>
                <div className="col-sm-3 form-group phps_row_0">
                  <label>Telephone</label>
                  <input
                    className="form-control form-control-sm input_text_cls"
                    type="text"
                    id="telephone"
                    onkeyup="extractNumber(this,0,0);"
                    name="telephone"
                    onChange={(e) => handleChnage(e)}
                    value={formData.telephone}
                  />
                </div>
              </div>
            </div>
            <div className="showpagedata innerdiv">
              <div className="row">
                <div className="col-md-12 form-group mt-3">
                  <h5>Travel Details</h5>
                </div>
                <div className="col-sm-3 form-group phps_row_0">
                  <label>Visiting Country</label>
                  <div className="input-group col-md-12 col-xs-12">
                    <MultiSelect
                      options={nationalityOptions}
                      isSearchable
                      placeholder="Select One"
                      className="custom-select required"
                      name="visitingCountry"
                      onChange={(value) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          visitingCountry: value.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-3 form-group phps_row_1">
                  <label>Expected Arrival/Departure Date</label>
                  <div
                    className="input-group date col-md-12 col-xs-12"
                    id="arrival_date_nw"
                  >
                    <Flatpickr
                      name="arrivalDate"
                      onChange={(e) => {
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          arrivalDate: e[0],
                        }));
                      }}
                      value={formData.arrivalDate}
                      options={{ dateFormat: "Y-m-d" }}
                    />
                    <span className="input-group-addon">to</span>
                    <Flatpickr
                      name="departureDate"
                      onChange={(e) => {
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          departureDate: e[0],
                        }));
                      }}
                      value={formData.departureDate}
                      options={{ dateFormat: "Y-m-d" }}
                    />
                    <span
                      className="input-group-addon pointer"
                      id="exTrashBtn"
                      onClick={handleTrashClick3}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
                <div className="col-sm-3 form-group phps_row_0">
                  <label>Currency</label>
                  <div>
                    <MultiSelect
                      options={currencyOptionsa}
                      isSearchable
                      placeholder="Select One"
                      className="custom-select required"
                      name="currency"
                      onChange={(value) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          currency: value.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="showpagedata innerdiv">
      <div className="row">
        <input type="hidden" id="is_upload" name="is_upload"  />
        <div className="col-md-12 form-group mt-3">
          <h5>Upload Attachments</h5>
        </div>
        <div className="col-sm-12" id="upload" name="upload" style={{position: 'relative', display: 'block'}}>
          <label>Please add Passport Copy & Photo Copy to your application (in jpeg, jpg, png, bmp or gif file format). Size of each file should be less than 1mb.</label>
          <div className="row chk_fileUpload">
            <div className="col-sm-3 form-group phps_row_0">
              <label> Personal Photo <span style={{color: '#ff0000'}}>*</span></label>
              <span className="uniqFile input-group"><span className="input-group-addon fa fa-upload myInputFile"><input type="file" name="personal_photo" data-name="personal_photo"  id="personal_photo" /></span></span>
            </div>
            <div className="col-sm-3 form-group phps_row_1">
              <label> Passport Page 1 <span style={{color: '#ff0000'}}>*</span></label>
              <span className="uniqFile input-group"><span className="input-group-addon fa fa-upload myInputFile"><input type="file"   name="passport_photo" data-name="passport_page_1" id="passport_photo" /></span></span>
            </div>
            <div className="col-sm-3 form-group phps_row_0">
              <label> Passport Page 2 <span style={{color: '#ff0000'}}>*</span></label>
              <span className="uniqFile input-group"><span className="input-group-addon fa fa-upload myInputFile"><input type="file"   name="passport_photo_back" data-name="passport_page_2" id="passport_photo_back" /></span></span>
            </div>
            <div className="col-sm-3 form-group phps_row_1">
              <label> Resident Permit</label>
              <span className="uniqFile input-group"><span className="input-group-addon fa fa-upload myInputFile"><input type="file"   data-name="resident_permit" name="resident_permit" id="resident_permit" /></span></span>
            </div>
            <div className="col-sm-3 form-group phps_row_0">
              <label> Flight Ticket</label>
              <span className="uniqFile input-group"><span className="input-group-addon fa fa-upload myInputFile"><input type="file"   data-name="flight_ticket" name="flight_ticket" id="flight_ticket" /></span></span>
            </div>
            <div className="col-sm-3 form-group phps_row_1">
              <label> Other Image</label>
              <span className="uniqFile input-group"><span className="input-group-addon fa fa-upload myInputFile"><input type="file"   name="other_image_page" data-name="other_image" id="other_image_page" /></span></span>
            </div>
          </div>
        </div>
      </div>
    </div>  */}
            <div className="row mt-2">
              <div className="col-sm-3 phps_row_0">
                <div
                  style={{
                    display: "block",
                    border: "0px solid #CC0000",
                    clear: "left",
                  }}
                >
                  <span className="normalbuttons" id="submit_button">
                    <button
                      type="button"
                      className="in btn btn-dark btn-sm form-group"
                      id="submit_button"
                      value="Submit"
                      onClick={handleSubmit}
                    >
                      <i className="fa fa-floppy-o" />
                      &nbsp;Save
                    </button>
                  </span>
                  <span id="loader" style={{ display: "none" }}>
                    <img src="images/indicator.gif" alt="indic" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default VIsaEditRequests;
