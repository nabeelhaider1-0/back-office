/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";

import { connect } from "react-redux";
import { SelHrsOptions, minutesOptions } from "../../../constants/contants";
import excelfilereader from "../../../constants/excelfilereader";
import excelFileContent from '../../../ExcelFiles/worldcities.xlsx';
import { ErrorApiAlert, RequiredFieldAlert, SimpleAlert, SuccessApiToast, extractHoursAndMinutes, filterOptionsByLabel, formatDuration } from "../../../constants/globalfunctions";
import uploadFile from "../../../constants/filesuploader";
import { getDATA, putDATA } from "../../../Apis/API";
import ApiRoutes from "../../../constants/ApiRoutes";


const MastersTourAndActivityEdit = ({ data }) => {
  const [countryOptions, setcountryOptions] = useState([]);
  const [countrycitydata, setcountrycitydata] = useState([]);
  const [selectedCountry, setselectedCountry] = useState(null);
  const [cityOptions, setcityOptions] = useState([]);
  const [selectedCity, setselectedCity] = useState(null);
  const [iscityChanged, setiscityChanged] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activitytypedata, setActivityTypeData] = useState([]);
  const [activitysubtypedata, setActivitySubTypeData] = useState([]);
  const [activitycategorydata, setActivityCategoryData] = useState([]);
  const navigateOnRefresh = useNavigate();
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    activityName: "",
    duration: "",
    durationHours:"",
    durationMinutes:"",
    minPax: "",
    maxPax: "",
    code: "",
    transferInclude: "Yes",
    activityHighlights: "",
    activityDescription: "",
    restriction: "",
    activityDetails: "",
    includes: "",
    excludes: "",
    termsConditions: "",
    status:true,
    activityTypeUuid: "",
    subActivityTypeUuid: "",
    activityCategoryUuid: "",
    weekendDays: [] ,
    mainImage : "",
    optionalImageOne : "", 
    optionalImageTwo : "", 
    optionalImageThree: "", 
    optionalImageFour: "", 
    optionalImageFive: "",
  });

  const fetchExcelData = async () => {
    try {
        // Pass the Excel file content directly to the readExcelFile function
        const data = await excelfilereader(excelFileContent);
        setcountrycitydata(data);

 const uniqueCountries = Array.from(new Set(data.CountryCities.map((item) => item.country)))
 .map((country) => ({
   value: data.CountryCities.find((item) => item.country === country).iso3,
   label: country,
 }));
 setcountryOptions(uniqueCountries);

        
    } catch (error) {
       
    }
};
const getActivityType = async () => {
  try {
  
    // Set loading to true when fetching data
    const response = await getDATA(ApiRoutes.TOURS_AND_ACTIVITIES.ACTIVITY_TYPE);
    if (response.data.statusCode === 200) {
      const activitytype =response && response.data.data ? response.data.data : [];
    const options = activitytype.map((type) => ({
      value: type.uuid,
      label: type.activityTypeName,
    }));

    setActivityTypeData(options);
      

    }

    // Handle successful authentication, e.g., set user state, redirect, etc.
  } catch (error) {
    ErrorApiAlert('Error Fetching Activity Type');
  }
};
const getActivitySubType = async () => {
  try {
  
    // Set loading to true when fetching data
    const response = await getDATA(ApiRoutes.TOURS_AND_ACTIVITIES.ACTIVITY_SUB_TYPE);
    if (response.data.statusCode === 200) {
      const activitysubtype =response && response.data.data ? response.data.data : [];
    const options = activitysubtype.map((type) => ({
      value: type.uuid,
      label: type.activityTypeName,
    }));

    setActivitySubTypeData(options);
      

    }

    // Handle successful authentication, e.g., set user state, redirect, etc.
  } catch (error) {
    ErrorApiAlert('Error Fetching Activity Sub Type');
  }
};

const getActivityCategory = async () => {
  try {
  
    // // Set loading to true when fetching data
    const response = await getDATA(ApiRoutes.TOURS_AND_ACTIVITIES.ACTIVITY_CATEGORY);
    if (response.data.statusCode === 200) {
      const activitycategory =response && response.data.data ? response.data.data : [];
    const options = activitycategory.map((type) => ({
      value: type.uuid,
      label: type.activityCategoryName,
    }));

    setActivityCategoryData(options);
      

    }

    // Handle successful authentication, e.g., set user state, redirect, etc.
  } catch (error) {
    ErrorApiAlert('Error Fetching Activity Category');
  }
};
useEffect(() => {
  fetchExcelData();
  getActivityType();
  getActivitySubType();
  getActivityCategory()
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
useEffect(() => {
  // Extract city options based on selected country
  if (selectedCountry) {
    const cities = countrycitydata.CountryCities
      .filter((item) => item.iso3 === selectedCountry.value)
      .map((item) => ({ value: item.city, label: item.city }));
    setcityOptions(cities);
  } else {
    setcityOptions([]);
  }
}, [selectedCountry]);

  useEffect(() => {
   
    if (data && Object.keys(data).length > 0) {
setFormData({
  country: data.country||"",
  city: data.city||"",
  activityName: data.activityName||"",
  duration: data.duration || "",
  durationHours: extractHoursAndMinutes(data.duration).hours || "",
  durationMinutes:extractHoursAndMinutes(data.duration).minutes || "",
  minPax: data.minPax||"",
  maxPax: data.maxPax||"",
  code: data.code||"",
  transferInclude: data.transferInclude,
  activityHighlights: data.activityHighlights||"",
  activityDescrition: data.activityDescrition||"",
  restriction: data.restriction||"",
  activityDetails: data.activityDetails||"",
  includes: data.includes||"",
  excludes: data.excludes||"",
  termsConditions: data.termsConditions||"",
  status:data.status,
  activityTypeUuid: data.activityTypeUuid||"",
  subActivityTypeUuid: data.subActivityTypeUuid||"",
  activityCategoryUuid: data.activityCategoryUuid||"",
  weekendDays: data.weekendDays||[] ,
  mainImage : data.mainImage||"",
  optionalImageOne : data.optionalImageOne||"" ,
  optionalImageTwo : data.optionalImageTwo||"", 
  optionalImageThree: data.optionalImageThree||"", 
  optionalImageFour: data.optionalImageFour||"", 
  optionalImageFive: data.optionalImageFive||"",
});
     }

     else {
      // If data is not available, navigate to the branch search page
      navigateOnRefresh(Constants.URLConstants.MASTERSTOURSANDACTIVITIESSEARCH);
    }
  }, [data, navigateOnRefresh]);




  const handleCountryChange = (selectedOption) => {
    setselectedCountry(selectedOption);
    setselectedCity(null);
  };

  const handleCityChange = (selectedOption) => {
    setiscityChanged(true);
    setselectedCity(selectedOption); 
  };
  const handleCitySelection = () => {
    if (!selectedCountry) {
      // If no country is selected, display a warning
      RequiredFieldAlert("Please select country first", "", "warning");
    }
  };

  useEffect(() => {
    // Check if pickupcountryOptions has some length
    if (countryOptions && countryOptions.length > 0) {
      // Check if pickupselectedCountry is not set and pickupcountryValue has some value
      if (!selectedCountry) {
        // Ensure data.pickupCountry is defined before calling filterOptionsByLabel
        if (data.country) {
          const countryValue = filterOptionsByLabel(countryOptions, data.country);
          setselectedCountry(countryValue);

              const cityValue = filterOptionsByLabel(cityOptions, data.city);
              setselectedCity(cityValue);
        }
      }
    }
  }, [countryOptions, selectedCountry, data.country]);
  const handleFileInput = async(e) => {
    setSelectedFile(e.target.files[0]);
    const name=e.target.name;
   
    if(name==="mainImage"){
      
      const resp =await uploadFile(selectedFile);
     if(resp.success===true){
       
        setFormData(prevState => ({
          ...prevState,
          [name]: resp.imagelink
        }));
  
     }else{
     
     } 
    
    }else if(name==="optionalImageOne"){
      const resp =await uploadFile(selectedFile);
      if(resp.success===true){
        
         setFormData(prevState => ({
           ...prevState,
           [name]: resp.imagelink
         }));
   
      }else{
      
      } 
    }else if(name==="optionalImageTwo"){
      const resp =await uploadFile(selectedFile);
      if(resp.success===true){
        
         setFormData(prevState => ({
           ...prevState,
           [name]: resp.imagelink
         }));
   
      }else{
      
      } 
    }else if(name==="optionalImageThree"){
      const resp =await uploadFile(selectedFile);
      if(resp.success===true){
        
         setFormData(prevState => ({
           ...prevState,
           [name]: resp.imagelink
         }));
   
      }else{
      
      } 
    }else if(name==="optionalImageFour"){
      const resp =await uploadFile(selectedFile);
      if(resp.success===true){
        
         setFormData(prevState => ({
           ...prevState,
           [name]: resp.imagelink
         }));
   
      }else{
      
      } 
    }else if(name==="optionalImageFive"){
      const resp =await uploadFile(selectedFile);
      if(resp.success===true){
        
         setFormData(prevState => ({
           ...prevState,
           [name]: resp.imagelink
         }));
   
      }else{
      
      } 
    }
    
  };
  useEffect(() => {
    // Initialize the checkboxes based on weekendDays from Redux data
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (formData.weekendDays.includes(checkbox.value)) {
        checkbox.checked = true;
      }
    });
  }, [formData.weekendDays]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSingleSelectChange = (selectedOption, name) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: selectedOption.value // Assuming the option object has a 'value' property
    }));
  };
  const handleWeekdayChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      let updatedWeekdays = [...prevData.weekendDays];
      if (checked) {
        updatedWeekdays.push(value);
      } else {
        updatedWeekdays = updatedWeekdays.filter((day) => day !== value);
      }
      return {
        ...prevData,
        weekendDays: updatedWeekdays
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  formData.country=(selectedCountry && selectedCountry.label) || '';
  formData.city=iscityChanged?(selectedCity && selectedCity.label) || '':data.city;
  formData.duration = formatDuration(formData.durationHours, formData.durationMinutes);

  const {
    durationHours,
    durationMinutes,
    ...requestBody
  } = formData;
 
   try {
       // Make an API call to update the staff's active status
       
       const response = await putDATA(ApiRoutes.TOURS_AND_ACTIVITIES.TOURS,data.uuid ,requestBody);
 
       // Check the response and handle it accordingly
       if (response.data.statusCode === 200) {
       
           SuccessApiToast( "Tour Updated Successfully");
           navigateOnRefresh(Constants.URLConstants.MASTERSTOURSANDACTIVITIESSEARCH);

       } else {
               
         SimpleAlert("error",
          "Error",
       "Failed to Update Tour");
       }
     } catch (error) {
       // Handle errors from the API call
 
       SimpleAlert(  "error",
        "Error",
      "An unexpected error occurred.");
     }

  }
  return (
    <>
      <Header2 title="ACTIVITY DETAILS" linkText1="List Activity" linkText2="Edit Activity" link1={Constants.URLConstants.MASTERSTOURSANDACTIVITIESSEARCH} />
      <div class="container-fluid pt-0 p-4" id="content-pad">
     

      <form onSubmit={handleSubmit}  id="toursactivityEdit" >
          <input type="hidden" name="action" defaultValue="insert" />
          <input type="hidden" name="add_another" />
          <div className="panel-body">
            <div className="row">
            <div className="form-group col-md-3">
                <label>Country</label>
                <MultiSelect
                  options={countryOptions}
                  isSearchable
                  value={selectedCountry}
                  placeholder="- Select Country -"
                  className="custom-select required"
                  onChange={handleCountryChange}
                  noOptionsMessage={() => "No Country Found"}
required
                />
              </div>
              <div className="form-group col-md-3" onClick={handleCitySelection}>
                <label>City</label>
                <MultiSelect
           options={cityOptions}
           value={iscityChanged===false?selectedCountry?filterOptionsByLabel(cityOptions,data.city):'':selectedCountry?filterOptionsByLabel(cityOptions,selectedCity):''}
                  isSearchable
                  placeholder="- Select City -"
                  className="custom-select required"
                  onChange={handleCityChange}
                  isDisabled={!selectedCountry}
                  noOptionsMessage={() => "No City Found"}
required
                />
              </div>
              <div className="form-group col-md-3">
                <label>Activity Name</label>
                <input className="add_width_fnt form-control form-control-sm required" type="text" size={45} maxLength={255} 
                name="activityName" 
                 id="activityName"
                value={formData.activityName}
                onChange={handleInputChange}
                required
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-3">
                <label>Duration (Hrs - Mins)</label>
                <div className="form-group ">
                <div  style={{ display: 'flex', alignItems: 'center' }}>
                <MultiSelect
                    options={SelHrsOptions}
                    isSearchable
                    placeholder=" 00 "
                    value={SelHrsOptions.find(option => option.value === formData.durationHours)}
                    onChange={(selectedOption) => handleSingleSelectChange(selectedOption, 'durationHours')}
                    className="custom-select required w-50"
                    noOptionsMessage={() => "No Hrs Found"}
                    required
                  />
                 <MultiSelect
                    options={minutesOptions}
                    isSearchable
                    value={minutesOptions.find(option => option.value === formData.durationMinutes)}
                    onChange={(selectedOption) => handleSingleSelectChange(selectedOption, 'durationMinutes')}
                    placeholder=" 00 "
                    className="custom-select w-50"
                    noOptionsMessage={() => "No Mins Found"}
                  />
                </div>
                </div>
              </div>
              <div className="form-group col-md-2">
                <label>Min. Pax :</label>
                <input className="form-control form-control-sm add_width_fnt required" 
                type="text" 
                name="minPax" 
                id="minPax"
               value={formData.minPax}
               onChange={handleInputChange}
               required
                size={3} maxLength={3}  />
              </div>
              <div className="form-group col-md-2">
                <label>Max. Pax :</label>
                <input className="form-control form-control-sm add_width_fnt required" type="text" 
                  name="maxPax" 
                  id="maxPax"
                 value={formData.maxPax}
                 onChange={handleInputChange}
                 required          
                size={3} maxLength={3} />
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-5">
                <label className="MarginBt12">Selected Weekend Days</label><br />
                <div className="radioline1">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div className="checkbox checkbox-success checkbox-inline avalaible_days" key={day}>
                    <input type="checkbox" id={day} name="chk_weekday[]" value={day} onChange={handleWeekdayChange} />
                    <label htmlFor={day}>{day}</label>
                  </div>
                ))}
                </div>
              </div>
              <div className="form-group col-md-2">
                <label>Code :</label>
                <input className="form-control form-control-sm add_width_fnt" type="text" 
                name="code" 
                id="code"
               value={formData.code}
               onChange={handleInputChange}
               
                />
              </div>
            </div>
            <div className=" row mt-2">
              <div className="form-group col-md-3">
                <label>Activity Type</label>
                <MultiSelect
                  options={activitytypedata}
                  isSearchable
                  placeholder="- Select Activity Type -"
                  value={activitytypedata.find(option => option.value === formData.activityTypeUuid)}
                    onChange={(selectedOption) => handleSingleSelectChange(selectedOption, 'activityTypeUuid')}
                  className="custom-select required"
                  noOptionsMessage={() => "No Activity Type Found"}
                  required

                />
              </div>
              <div className="form-group col-md-3">
                <label>Activity Sub Type</label>
                <MultiSelect
                  options={activitysubtypedata}
                  isSearchable
                  value={activitysubtypedata.find(option => option.value === formData.subActivityTypeUuid)}
                    onChange={(selectedOption) => handleSingleSelectChange(selectedOption, 'subActivityTypeUuid')}
                  placeholder="- Select Activity Sub Type -"
                  className="custom-select"
                  noOptionsMessage={() => "No Activity Sub Type Found"}

                />
                <div id="activity_subtype_add" style={{ display: 'none' }} className="paddT3 input-group col-xs-12">
                  <input type="text" className="select_width1 form-control" name="activity_subtype_add" id="activity_subtype_add_name" />
                  <span className="input-group-addon save_activity_type" id="activity_subtype_add_save" value="Save">
                    <i className="fa fa-floppy-o" />
                  </span>
                  <span className="input-group-addon cancel_activity_type">
                    <i className="fa fa-times" />
                  </span>
                </div>
              </div>
              <div className="form-group col-md-3">
                <label>Category</label>
                <MultiSelect
                  options={activitycategorydata}
                  isSearchable
                  value={activitycategorydata.find(option => option.value === formData.activityCategoryUuid)}
                  onChange={(selectedOption) => handleSingleSelectChange(selectedOption, 'activityCategoryUuid')}
                  placeholder="- Select Category -"
                  className="custom-select required"
                  noOptionsMessage={() => "No Category Found"}
                  required

                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-3">
                <label>Transfer Included</label><br />
                <div className="radioline1 mt-1">
                  <div className=" radio radio-success radio-inline">
                    <input type="radio"  name="transferInclude"
                     id="transferInclude" 
                     value="Yes"
                     checked={formData.transferInclude === 'Yes'}
                     onChange={handleRadioChange} />
                    Yes
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input type="radio" name="transferInclude"
                     id="transferInclude" 
                     value="No"
                     checked={formData.transferInclude === 'No'}
                     onChange={handleRadioChange}  /> No
                  </div>
                </div>
              </div>
              <div id="nearby_cities_body" style={{ display: 'none' }}>
                <div className="form-group col-md-3">
                  <div className="checkbox checkbox-success checkbox-inline">
                    <input id="chk_nearby_cities" type="checkbox" name="chk_nearby_cities" defaultValue={1} onclick="show_multi_cities(this)" />
                    <label htmlFor="chk_nearby_cities">Show Nearby Cities for Transfer</label>
                  </div>
                </div>
                <div id="multi_cities_body" style={{ display: 'none' }}>
                  <div className="form-group col-md-3">
                    <label>Nearby Cities</label><br />
                    <select name="multi_select_cities[]" id="multi_select_cities" className="chzn-select selectpicker form-control show-menu-arrow bs-select-hidden" multiple data-live-search="true" data-actions-box="true">
                      <option value={0}> - Select City -</option>
                    </select>
                    <div className="btn-group bootstrap-select show-tick chzn-select form-control show-menu-arrow">
                      <button type="button" className="btn dropdown-toggle btn-default" data-toggle="dropdown" data-id="multi_select_cities" title="Nothing selected"><span className="filter-option pull-left">Nothing
                        selected</span>&nbsp;<span className="caret" /></button>
                      <div className="dropdown-menu open">
                        <div className="bs-searchbox"><input type="text" className="form-control" autoComplete="off" /></div>
                        <div className="bs-actionsbox">
                          <div className="btn-group btn-group-sm btn-block"><button type="button" className="actions-btn bs-select-all btn btn-default">Select
                            All</button><button type="button" className="actions-btn bs-deselect-all btn btn-default">Deselect
                              All</button></div>
                        </div>
                        <ul className="dropdown-menu inner" role="menu">
                          <li data-original-index={0}><Link tabIndex={0} className data-tokens="null"><span className="text"> - Select City
                            -</span><span className="glyphicon glyphicon-ok check-mark" /></Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-12">
                <label>Activity Highlights</label>
                <textarea className="select_width1 form-control form-control-sm" 
                  name="activityHighlights" 
                  id="activityHighlights"
                 value={formData.activityHighlights}
                 onChange={handleInputChange}
                rows={4} cols={45}  />
              </div>
              <div className="form-group col-md-12">
                <label>Activity Description</label>
                <textarea className="select_width1 form-control form-control-sm txtarea_wdt_font_ht" 
                 name="activityDescription" 
                 id="activityDescription"
                value={formData.activityDescrition}
                onChange={handleInputChange}
                rows={5} cols={45}  />
              </div>
              <div className="form-group col-md-12">
                <label>Restriction</label>
                <textarea className="form-control form-control-sm" 
                  name="restriction" 
                  id="restriction"
                 value={formData.restriction}
                 onChange={handleInputChange}
                rows={4} cols={45}  />
              </div>
              <div className="form-group col-md-12">
                <label>Activity Details</label>
                <textarea  rows={4} cols={45} className="txtarea_wdt_font_ht select_width1 form-control form-control-sm"
                 name="activityDetails" 
                 id="activityDetails"
                value={formData.activityDetails}
                onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-12">
                <label>Includes</label>
                <textarea  rows={4} cols={45} className="txtarea_wdt_font_ht select_width1 form-control" 
                name="includes" 
                id="includes"
               value={formData.includes}
               onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-12">
                <label>Excludes</label>
                <textarea  rows={4} cols={45} className="txtarea_wdt_font_ht select_width1 form-control form-control-sm" 
                  name="excludes" 
                  id="excludes"
                 value={formData.excludes}
                 onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-12">
                <label>Terms and Conditions</label>
                <textarea  rows={4} cols={45} className="txtarea_wdt_font_ht select_width1 form-control form-control-sm" 
                name="termsConditions" 
                id="termsConditions"
               value={formData.termsConditions}
               onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-12">
                <label>Main Page Image</label>
                <span className="uniqFile input-group"><span className="input-group-addon fa fa-upload myInputFile">
                  <input type="file" name="mainImage" size={39} className="file_font" 
                   accept="image/*" 
                   onChange={handleFileInput} 
                  
                  /></span></span>
              </div>
              <div className="form-group col-md-12">
                <label>Other Images (Optional)</label>
                <div className="row">
                  <div className="form-group col-md-2">
                    <label>Image 1</label>
                    <span className="uniqFile input-group"><span className="input-group-addon fa fa-upload myInputFile">
                      <input type="file" name="optionalImageOne" size={39} className="file_font"
                      
                      accept="image/*" 
                   onChange={handleFileInput} 
                      /></span></span>
                  </div>
                  <div className="form-group col-md-2">
                    <label>Image 2</label>
                    <span className="uniqFile input-group"><span className="input-group-addon fa fa-upload myInputFile">
                      <input type="file" name="optionalImageTwo" 
                        accept="image/*" 
                        onChange={handleFileInput} 
                      size={39} className="file_font" /></span></span>
                  </div>
                  <div className="form-group col-md-2">
                    <label>Image 3</label>
                    <span className="uniqFile input-group"><span className="input-group-addon fa fa-upload myInputFile">
                      <input type="file" name="optionalImageThree" 
                        accept="image/*" 
                        onChange={handleFileInput} 
                    
                    size={39} className="file_font" /></span></span>
                  </div>
                  <div className="form-group col-md-2">
                    <label>Image 4</label>
                    <span className="uniqFile input-group"><span className="input-group-addon fa fa-upload myInputFile">
                      <input type="file"
                       name="optionalImageFour" 
                       accept="image/*" 
                       onChange={handleFileInput}  
                      
                      size={39} className="file_font" /></span></span>
                  </div>
                  <div className="form-group col-md-2">
                    <label>Image 5</label>
                    <span className="uniqFile input-group"><span className="input-group-addon fa fa-upload myInputFile">
                      <input type="file"
                          name="optionalImageFive" 
                          accept="image/*" 
                          onChange={handleFileInput} 
                      size={39} className="file_font" /></span></span>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-12 mt-2">
             
         <button type="Submit" className="btn btn-dark btn-sm" name="submit" >
                  <i className="fa fa-floppy-o" />&nbsp;Save
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

export default connect(mapStateToProps)(MastersTourAndActivityEdit);