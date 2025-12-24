import React, { useEffect, useState } from "react"; // Import React and useState
import Flatpickr from "react-flatpickr";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import {
  currencyOptionsa,
  genderOptions,
  languageOptions,
  maritalStatusOptions,
  nationalityOptions,
  passportTypeOptions,
  religionOptions,
  visaTypeOptions,
} from "../../../constants/contants";
import MultiSelect from "../../reactMultiSelect";
import { ErrorApiAlert } from "../../../constants/globalfunctions";
import { getDATA } from "../../../Apis/API";
import uploadFile from "../../../constants/filesuploader";
import { useDispatch, useSelector } from "react-redux";
import { addOfflineVisa } from "../../../state/action/visaActions";
import {
  fetchCountries,
  getAllCurrencies,
} from "../../../state/action/commonApisActions";
import ApiRoutes from "../../../constants/ApiRoutes";

const dummyImage =
  "https://images.unsplash.com/photo-1723398466717-12d0c8f6299c?q=80&w=1424&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const NewVisaOfllineBooking = () => {
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [startDate1, setStartDate1] = useState(null); // State for the start date
  const [startDate2, setStartDate2] = useState(null); // State for the start date
  const [startDate3, setStartDate3] = useState(null); // State for the start date
  const [endDate3, setEndDate3] = useState(null); // State for the start date
  const [agentsData, setAgentsData] = useState([]); // State for the start date
  const [files, setFiles] = useState([]);
  const isLoading = useSelector((state) => state.visa.isLoading);
  const counties = useSelector((state) => state.countries.countries);
  const currencies = useSelector((state) => state.countries.currencies);
  console.log(currencies);
  console.log(counties);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    agentRefNo: "",
    visaWithHotel: "",
    visaType: "",
    firstName: "",
    middleName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    husbandName: "",
    languageOne: "",
    languageTwo: "",
    languageThree: "",
    email: "",
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
    city: "",
    telephone: null,
    visitingCountry: "",
    arrivalDate: null,
    departureDate: null,
    currency: "",
    personalPhoto: "",
    passportPageOne: "",
    passportPageTwo: "",
    residentPermit: "",
    flightTicket: "",
    otherImage: "",
    agent: {
      uuid: "",
    },
  });

  console.log(formData);
  useEffect(() => {
    getAgents();
    if (!counties.length) {
      dispatch(fetchCountries());
    }
    if (!currencies.length) {
      dispatch(getAllCurrencies());
    }
  }, [dispatch, counties, currencies]);

  const getAgents = async () => {
    try {
      // setLoading(true);
      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.CUSTOMER_AGENTS.AGENT);
      if (response.data.statusCode === 200) {
        const agents = response && response.data.data ? response.data.data : [];

        setAgentsData(agents);
      }
    } catch (error) {
      ErrorApiAlert("Error Fetching Agents");
    } finally {
      // setLoading(false);
      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  console.log(agentsData);

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

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUploder = async (e) => {
    const file = e.target.files[0];
    setFiles([...files, file]);
    // const s3Value = await uploadFile(file);
    // console.log(s3Value , "========================")
  };

  // console.log(files)
  const handleSubmit = async (e) => {
    if (files?.length < 6) {
      ErrorApiAlert("Please upload all images");
      return;
    }
    e.preventDefault();

    const uploadedFiles = [];

    for (const file of files) {
      const s3Value = await uploadFile(file);
      uploadedFiles.push(s3Value);
    }

    const formDataUpdates = {
      personalPhoto: uploadedFiles[0]?.imagelink || "",
      passportPageOne: uploadedFiles[1]?.imagelink || "",
      passportPageTwo: uploadedFiles[2]?.imagelink || "",
      residentPermit: uploadedFiles[3]?.imagelink || "",
      flightTicket: uploadedFiles[4]?.imagelink || "",
      otherImage: uploadedFiles[5]?.imagelink || "",
    };
    console.log(formDataUpdates);
    console.log(uploadedFiles);

    // Update formData with the uploaded file URLs
    await setFormData({
      ...formData,
      personalPhoto: uploadedFiles[0]?.imagelink,
      passportPageOne: uploadedFiles[1]?.imagelink,
      passportPageTwo: uploadedFiles[2]?.imagelink,
      residentPermit: uploadedFiles[3]?.imagelink,
      flightTicket: uploadedFiles[4]?.imagelink,
      otherImage: uploadedFiles[5]?.imagelink,
    });

    await dispatch(addOfflineVisa(formData));
  };

  return (
    <>
      <Header2
        title="NEW VISA APPLICATION"
        linkText1=" Search Visa Bookings"
        linkText2=" New Visa Application"
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
            <div className="showpagedata innerdiv">
              <div className="onlinefont">
                <div className="row">
                  {/* Start Nida */}
                  <div className="form-group col-md-3">
                    <label>Agent Information</label>
                    <div>
                      <MultiSelect
                        options={agentsData.map((agent) => ({
                          label: agent.agentName,
                          value: agent.uuid,
                        }))}
                        onChange={(value) =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            agent: {
                              uuid: value.value,
                            },
                          }))
                        }
                        // value={formData.visaType}
                        isSearchable
                        placeholder="- Select -"
                        className="custom-select"
                        name="visaType"
                      />
                    </div>
                    <input
                      type="hidden"
                      className="form-control form-control-sm"
                      name="agent_id"
                      id="suggested_agent_id"
                    />
                    <input
                      type="hidden"
                      className="form-control form-control-sm"
                      id="agent_selected_id"
                      name="agent_selected_id"
                    />
                    <input
                      type="hidden"
                      className="form-control form-control-sm"
                      id="sub_agent_selected_id"
                      name="sub_agent_selected_id"
                    />
                    <input
                      type="hidden"
                      className="form-control form-control-sm"
                      name="selected_user_type"
                      id="selected_user_type"
                    />
                    <input
                      type="hidden"
                      className="form-control form-control-sm"
                      name="reservation_id"
                      id="reservation_id"
                    />
                  </div>
                  <div id="main_agent">
                    <div className="phps_row_1 row">
                      <div id="add_main_agent" />
                    </div>
                  </div>
                  <div id="sub_user">
                    <div className="phps_row_1 row">
                      <div id="add_sub_user" />
                    </div>
                  </div>
                  <div id="sub_agent" className="col-md-12 form-group">
                    <div className="phps_row_1 ">
                      <div id="add_sub_agent" />
                    </div>
                  </div>
                  {agentsData
                    .filter((agent) => agent.uuid === formData.agent.uuid)
                    .map((agent) => (
                      <div className="form-group col-md-3 mt-3">
                        <label>Credit Value</label>
                        <div id="id_credit_value">
                          {agent?.creditLogs[0]?.creditvalue}
                        </div>
                      </div>
                    ))}
                  {agentsData
                    .filter((agent) => agent.uuid === formData.agent.uuid)
                    .map((agent) => (
                      <div className="form-group col-md-3 mt-3">
                        <label>Credit Usage</label>
                        <div id="id_credit_usage">
                          {agent?.creditLogs[0]?.creditusages}
                        </div>
                      </div>
                    ))}
                  {/* End Nida */}
                  <div className="col-sm-3 form-group phps_row_1 mt-3">
                    <label>Agent Ref No.</label>
                    <input
                      className="required input_text_cls form-control form-control-sm"
                      type="text"
                      maxLength={20}
                      id="agent_ref_no"
                      name="agentRefNo"
                      onChange={(e) => handleChnage(e)}
                      value={formData.agentRefNo}
                    />
                  </div>
                  <div className="col-sm-3 form-group phps_row_0 mt-3">
                    <label>Visa With hotel</label>
                    <div>
                      <MultiSelect
                        options={agentsData.map((agent) => ({
                          label: agent.agentName,
                          value: agent.uuid,
                        }))}
                        isSearchable
                        placeholder="- Select -"
                        className="custom-select"
                        name="visaWithHotel"
                        onChange={(value) =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            visaWithHotel: value.value,
                          }))
                        }
                      />
                    </div>
                    {/* <label>Visa With Hotel</label>
                    <select
                      name="sel_visa_hotel"
                      id="sel_visa_hotel"
                      className="selectpicker form-control form-control-sm show-menu-arrow selectcls bs-select-hidden"
                      data-live-search="true"
                    >
                      <option value>-Select-</option>
                    </select> */}
                    <span
                      id="sel_visa_hotel_loader"
                      style={{ display: "none" }}
                    >
                      <img src="images/indicator.gif" alt="loader5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="showpagedata innerdiv" style={{ display: "block" }}>
              <div className="onlinefont">
                <div className="row">
                  <div className="col-md-12 form-group">
                    <h5>Application Details</h5>
                  </div>
                  <div className="col-sm-3 form-group phps_row_0 mt-2">
                    <label>Visa Type</label>
                    <div>
                      <MultiSelect
                        options={visaTypeOptions}
                        isSearchable
                        placeholder="- Select -"
                        className="custom-select"
                        name="visaType"
                        onChange={(value) =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            visaType: value.value,
                          }))
                        }
                      />
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
                    <div className="col-sm-3 form-group phps_row_0">
                      <label>Email</label>
                      <input
                        className="required input_text_cls form-control form-control-sm"
                        type="email"
                        id="email"
                        name="email"
                        onChange={(e) => handleChnage(e)}
                        value={formData.email}
                      />
                    </div>
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
                      onChange={(value) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          gender: value.value,
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
                      onChange={(value) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          martialStatus: value.value,
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
                      onChange={(value) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          presentNationality: value.value,
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
                          birthCountry: value.value,
                        }))
                      }
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
                    options={counties}
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
                    options={counties}
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
                    options={counties}
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
                  <input
                    className="form-control form-control-sm input_text_cls"
                    type="text"
                    id="city"
                    onkeyup="extractNumber(this,0,0);"
                    name="city"
                    onChange={(e) => handleChnage(e)}
                    value={formData.city}
                  />
                  <span id="city_loading_pass" style={{ display: "none" }}>
                    <img src="images/indicator.gif" alt="loader5" />
                  </span>
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
                      options={counties}
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
                      options={currencies.map((currency) => ({
                        label: currency.currency,
                        value: currency.currencyCode,
                      }))}
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
            <div className="showpagedata innerdiv">
              <div className="row">
                <input type="hidden" id="is_upload" name="is_upload" />
                <div className="col-md-12 form-group mt-3">
                  <h5>Upload Attachments</h5>
                </div>
                <div
                  className="col-sm-12"
                  id="upload"
                  name="upload"
                  style={{ position: "relative", display: "block" }}
                >
                  {/* <label>Please add Passport Copy & Photo Copy to your application (in jpeg, jpg, png, bmp or gif file format). Size of each file should be less than 1mb.</label> */}
                  <div className="row chk_fileUpload">
                    <div className="col-sm-3 form-group phps_row_0">
                      <label>
                        {" "}
                        Personal Photo{" "}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <span className="uniqFile input-group">
                        <span className="input-group-addon fa fa-upload myInputFile">
                          <input
                            type="file"
                            data-name="personal_photo"
                            id="personal_photo"
                            name="personalPhoto"
                            onChange={handleImageUploder}
                          />
                        </span>
                      </span>
                    </div>
                    <div className="col-sm-3 form-group phps_row_1">
                      <label>
                        {" "}
                        Passport Page 1{" "}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <span className="uniqFile input-group">
                        <span className="input-group-addon fa fa-upload myInputFile">
                          <input
                            type="file"
                            data-name="passport_page_1"
                            id="passport_photo"
                            name="passportPageOne"
                            onChange={handleImageUploder}
                          />
                        </span>
                      </span>
                    </div>
                    <div className="col-sm-3 form-group phps_row_0">
                      <label>
                        {" "}
                        Passport Page 2{" "}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <span className="uniqFile input-group">
                        <span className="input-group-addon fa fa-upload myInputFile">
                          <input
                            type="file"
                            data-name="passport_page_2"
                            id="passport_photo_back"
                            name="passportPageTwo"
                            onChange={handleImageUploder}
                          />
                        </span>
                      </span>
                    </div>
                    <div className="col-sm-3 form-group phps_row_1">
                      <label> Resident Permit</label>
                      <span className="uniqFile input-group">
                        <span className="input-group-addon fa fa-upload myInputFile">
                          <input
                            type="file"
                            data-name="resident_permit"
                            id="resident_permit"
                            name="residentPermit"
                            onChange={handleImageUploder}
                          />
                        </span>
                      </span>
                    </div>
                    <div className="col-sm-3 form-group phps_row_0">
                      <label> Flight Ticket</label>
                      <span className="uniqFile input-group">
                        <span className="input-group-addon fa fa-upload myInputFile">
                          <input
                            type="file"
                            data-name="flight_ticket"
                            id="flight_ticket"
                            name="flightTicket"
                            onChange={handleImageUploder}
                          />
                        </span>
                      </span>
                    </div>
                    <div className="col-sm-3 form-group phps_row_1">
                      <label> Other Image</label>
                      <span className="uniqFile input-group">
                        <span className="input-group-addon fa fa-upload myInputFile">
                          <input
                            type="file"
                            data-name="other_image"
                            id="other_image_page"
                            name="otherImage"
                            onChange={handleImageUploder}
                          />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                      disabled={isLoading}
                    >
                      <i className="fa fa-floppy-o" />
                      &nbsp;{isLoading ? "Loading.." : "Save"}
                    </button>
                  </span>
                  <span id="loader" style={{ display: "none" }}>
                    <img src="images/indicator.gif" alt="loader5" />
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
export default NewVisaOfllineBooking;
