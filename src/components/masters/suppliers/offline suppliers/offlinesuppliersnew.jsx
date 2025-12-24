/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import Header2 from "../../../header2/header2";
import Constants from "../../../../constants/routes";
import MultiSelect from "../../../reactMultiSelect";
import excelfilereader from "../../../../constants/excelfilereader";
import excelFileContent from '../../../../ExcelFiles/worldcities.xlsx';
import { ErrorApiAlert, RequiredFieldAlert, SuccessApiToast } from "../../../../constants/globalfunctions";
import { currencyOptions, timezoneOptions } from "../../../../constants/contants";
import { postDATA } from "../../../../Apis/API";
import ApiRoutes from "../../../../constants/ApiRoutes";


const MastersSuppliersOfflineSuppliersNew = () => {

  const [countryOptions, setcountryOptions] = useState([]);
  const [countrycitydata, setcountrycitydata] = useState([]);
  const [selectedCountry, setselectedCountry] = useState(null);
  const [cityOptions, setcityOptions] = useState([]);
  const [selectedCity, setselectedCity] = useState(null);

 const [formData, setFormData] = useState({
  userName: "",
  password: "",
  code:"",
  supplierName: "",
  supplierType: [],
  supplierAddress: "",
  telephone: "",
  country: "",
  mobile: "",
  city: "",
  timeZone: "",
  currency: "",
  fax: "",
  email: "",
  reservationEmail: "",
  cancellationEmail: "",
  contactPerson1: "",
  contactPerson2: "",
  remarks: "",
  openingBalance: "",
  jointVenture: "No",
  sendEmail: "No",
  editHotels: "No",
  editAdminRates: "No"
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
useEffect(() => {
  fetchExcelData();
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
const handleCountryChange = (selectedOption) => {
  setselectedCountry(selectedOption);
  setselectedCity(null); 
};

const handleCityChange = (selectedOption) => {
  setselectedCity(selectedOption); 
};


const handleCitySelection = () => {
  if (!selectedCountry) {
    // If no country is selected, display a warning
    RequiredFieldAlert("Please select country first", "", "warning");
  }
};
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const handleSupplierCheckboxChange = (e) => {
  const checkboxValue = e.target.value;
  const isChecked = e.target.checked;

  if (isChecked) {
    // Add the selected checkbox value to supplierType array
    setFormData(prevFormData => ({
      ...prevFormData,
      supplierType: [...prevFormData.supplierType, checkboxValue]
    }));
  } else {
    // Remove the checkbox value from supplierType array if it's unchecked
    setFormData(prevFormData => ({
      ...prevFormData,
      supplierType: prevFormData.supplierType.filter(type => type !== checkboxValue)
    }));
  }
};
const handleCheckboxChange = (e) => {
  const { name, checked } = e.target;

  setFormData(prevFormData => ({
    ...prevFormData,
    [name]: checked ? "Yes" : "No" // Set "Yes" if checked, otherwise "No"
  }));
};
const handleSingleSelectChange = (selectedOption, name) => {
  setFormData(prevState => ({
    ...prevState,
    [name]: selectedOption.value // Assuming the option object has a 'value' property
  }));
};
const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

formData.country=(selectedCountry && selectedCountry.label) || '';
formData.city=(selectedCity && selectedCity.label) || '';
console.log(formData);

// try {
   
// const response = await postDATA(formData,ApiRoutes.SUPPLIERS.OFFLINE.SUPPLIER);

//   if (response.data.statusCode === 200) {
   
//     SuccessApiToast( "Offline Supplier Added Successfully");
    
//     navigate(Constants.URLConstants.OFFLINESUPPLIERSEARCH);
//   }
// } catch (error) {
//   ErrorApiAlert('Error Adding Offline Supplier');
//   //  console.error(error)
// }
}
  return (
    <>
      <Header2 title="ADD OFFLINE SUPPLIER" linkText1="List Offline Suppliers" linkText2="Add Offline Supplier" link1={Constants.URLConstants.MASTERSSUPPLIERSOFFLINESUPPLIERSSEARCH} />
      <div class="container-fluid pt-0 p-4"onSubmit={handleSubmit}  id="offlinesuppliernew">
        <form>
          <div class="panel-body">
          <div className="row" >
              <div className="form-group col-md-3">
                <label>Country</label>
                <MultiSelect
                  options={countryOptions}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select required"
                  onChange={handleCountryChange}
                  noOptionsMessage={() => "No Country Found"}
required
                />
              </div>
              <div className="form-group col-md-3"  onClick={handleCitySelection}>
                <label>City</label>
                <MultiSelect
           options={cityOptions}
           value={selectedCity}
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
                <label>Supplier Name</label>
                <input className="add_width_fnt form-control form-control-sm required" type="text" size={45} maxLength={255} 
                name="supplierName" 
                 id="supplierName"
                value={formData.supplierName}
                onChange={handleInputChange}
                required
                />
              </div>
            </div>
            <div class="row mt-2">

              <div class="form-group col-md-12">
                <h5>Supplier Type</h5>
                <div class="radioline1 mt-2">
                  <div class="checkbox checkbox-success checkbox-inline">
                    <input id="hotel_supplier" type="checkbox" name="hotel_supplier" value="Hotel Supplier"  onChange={handleSupplierCheckboxChange} />
                    <label for="hotel_supplier">Hotel Supplier</label>
                  </div>
                  <div class="checkbox checkbox-success checkbox-inline">
                    <input id="app" type="checkbox" name="sight_supplier" value="Activity Supplier"  onChange={handleSupplierCheckboxChange} />
                    <label for="sight_supplier">Activity Supplier</label>
                  </div>
                  <div class="checkbox checkbox-success checkbox-inline">
                    <input id="app" type="checkbox" name="transfer_supplier" value="Transfer Supplier"  onChange={handleSupplierCheckboxChange} />
                    <label for="transfer_supplier">Transfer Supplier</label>
                  </div>
                  <div class="checkbox checkbox-success checkbox-inline">
                    <input id="app" type="checkbox" name="visa_supplier" value="Visa Supplier"  onChange={handleSupplierCheckboxChange}  />
                    <label for="visa_supplier">Visa Supplier</label>
                  </div>
                  <div class="checkbox checkbox-success checkbox-inline">
                    <input id="app" type="checkbox" name="fit_package_supplier" value="FIT Package Supplier"  onChange={handleSupplierCheckboxChange}/>
                    <label for="fit_package_supplier">FIT Package Supplier</label>
                  </div>
                  <div class="checkbox checkbox-success checkbox-inline">
                    <input id="app" type="checkbox" name="airline_supplier" value="Airline Supplier"  onChange={handleSupplierCheckboxChange} />
                    <label for="airline_supplier">Airline Supplier</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="form-group col-md-12">
                <label>Supplier Address</label>
                <textarea class="form-control form-control-sm required"rows="4" cols="32"
                 name="supplierAddress" 
                 id="supplierAddress"
                value={formData.supplierAddress}
                onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            </div>
            <div class="row mt-2">
              <div class="form-group col-md-3">
                <label>Telephone</label>
                <input type="text" class="form-control form-control-sm required" size="20" maxlength="20"
                   name="telephone" 
                   id="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  required
                 
                 />
              </div>
              <div class="form-group col-md-3">
                <label> Fax</label>
                <input type="text" class="form-control form-control-sm"  size="45" maxlength="20" 
                     name="fax" 
                     id="fax"
                    value={formData.fax}
                    onChange={handleInputChange}
                />
              </div>
              <div class="form-group col-md-3">
                <label> Mobile</label>
                <input type="text" class="form-control form-control-sm"  size="20"  maxlength="20"
  name="mobile" 
  id="mobile"
 value={formData.mobile}
 onChange={handleInputChange}/>
              </div>

              <div class="col-md-3">
                <div class="row">
                  <div class="col-md-12 form-group">
                    <label>E-mail</label>
                    <br />
                    <input type="hidden" name="last_shown" id="last_shown" value="1" />
                    <div class="row">

                      <div class="col-md-10" id="pd">
                        <div class="input-group" id="pd1">
                          <input type="text" class="form-control form-control-sm required"
                           name="email" 
                           id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        size="45" maxlength="70" />

                        </div>
                      </div>
                      <div class="input-group" style={{ marginLeft: "81%  ", marginTop: " -31px" }}>
                        <Link class="input-group-addon" id="plus" onclick="plus_func();"><i
                          class="fa fa-plus"

                          style={{
                            color: "black", fontSize: "17px",
                            marginLeft: "5px",
                            marginTop: "2px"
                          }}></i></Link>
                        <Link class="input-group-addon" id="minus" onclick="minus_func()"
                          style={{ display: " none" }}><i class="fa fa-minus"></i></Link>
                      </div>
                      <p>
                        For reference purposes only</p>

                      <div class="col-md-10" id="pd">
                        <div class="input-group" id="pd2" style={{ display: " none" }}>
                          <input type="text" class="form-control form-control-sm required" id="txt_email2"
                            name="txt_email[2]" value="" size="45" maxlength="70" />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group" style={{ marginLeft: "81%  ", marginTop: " -31px" }}>
                      </div>

                      <div class="col-md-10" id="pd">
                        <div class="input-group" id="pd3" style={{ display: " none" }}>
                          <input type="text" class="form-control form-control-sm required" id="txt_email3"
                            name="txt_email[3]" value="" size="45" maxlength="70" />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group" style={{ marginLeft: "81%  ", marginTop: " -31px" }}>
                      </div>

                      <div class="col-md-10" id="pd">
                        <div class="input-group" id="pd4" style={{ display: " none" }}>
                          <input type="text" class="form-control form-control-sm required" id="txt_email4"
                            name="txt_email[4]" value="" size="45" maxlength="70" />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group" style={{ marginLeft: "81%  ", marginTop: " -31px" }}>
                      </div>

                      <div class="col-md-10" id="pd">
                        <div class="input-group" id="pd5" style={{ display: " none" }}>
                          <input type="text" class="form-control form-control-sm required" id="txt_email5"
                            name="txt_email[5]" value="" size="45" maxlength="70" />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group" style={{ marginLeft: "81%  ", marginTop: " -31px" }}>
                      </div>
                    </div>
                  </div>
                </div>
              </div>




              <div class="col-md-3">
                <div class="row">
                  <div class="col-md-12 form-group">
                    <label>Reservation Email</label>
                    <br />
                    <input type="hidden" name="last_shown_reservation" id="last_shown_reservation"
                      value="1" />
                    <div class="row">

                      <div class="col-md-10" id="pd_reservation">
                        <div class="input-group" id="pd_reservation1">
                          <input type="text" class="form-control form-control-sm required"
                           name="reservationEmail" 
                           id="reservationEmail"
                          value={formData.reservationEmail}
                          onChange={handleInputChange}
                          required
                            size="45" maxlength="70" />

                        </div>
                      </div>
                      <div class="input-group" style={{ marginLeft: "81%  ", marginTop: " -31px" }}>
                        <Link class="input-group-addon" id="plus_reservation"
                          onclick="plus_func_reservation();"><i class="fa fa-plus"

                            style={{
                              color: "black", fontSize: "17px",
                              marginLeft: "5px",
                              marginTop: "2px"
                            }}></i></Link>
                        <Link class="input-group-addon" id="minus_reservation"
                          onclick="minus_func_reservation();" style={{ display: " none" }}><i
                            class="fa fa-minus"></i></Link>
                      </div>
                      <p>
                        For reference purposes only</p>

                      <div class="col-md-10" id="pd_reservation">
                        <div class="input-group" id="pd_reservation2" style={{ display: " none" }}>
                          <input type="text" class="form-control form-control-sm required"
                            name="txt_reservation_email[2]" id="email_reservation2" value=""
                            size="45" maxlength="70" />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group">
                      </div>

                      <div class="col-md-10" id="pd_reservation">
                        <div class="input-group" id="pd_reservation3" style={{ display: " none" }}>
                          <input type="text" class="form-control form-control-sm required"
                            name="txt_reservation_email[3]" id="email_reservation3" value=""
                            size="45" maxlength="70" />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group">
                      </div>

                      <div class="col-md-10" id="pd_reservation">
                        <div class="input-group" id="pd_reservation4" style={{ display: " none" }}>
                          <input type="text" class="form-control form-control-sm required"
                            name="txt_reservation_email[4]" id="email_reservation4" value=""
                            size="45" maxlength="70" />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group">
                      </div>

                      <div class="col-md-10" id="pd_reservation">
                        <div class="input-group" id="pd_reservation5" style={{ display: " none" }}>
                          <input type="text" class="form-control form-control-sm required"
                            name="txt_reservation_email[5]" id="email_reservation5" value=""
                            size="45" maxlength="70" />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group">
                      </div>
                    </div>
                  </div>
                </div>
              </div>





              <div class="col-md-3">
                <div class="row">
                  <div class="col-md-12 form-group">
                    <label>Cancellation Email</label>
                    <br />
                    <input type="hidden" name="last_shown_cancellation" id="last_shown_cancellation"
                      value="1" />
                    <div class="row">

                      <div class="col-md-10" id="pd_cancellation">
                        <div class="input-group" id="pd_cancellation1">
                          <input type="text" class="form-control form-control-sm required"
                             name="cancellationEmail" 
                             id="cancellationEmail"
                            value={formData.cancellationEmail}
                            onChange={handleInputChange}
                            required
                            size="45" maxlength="70" />

                        </div>
                      </div>
                      <div class="input-group" style={{ marginLeft: "81%  ", marginTop: " -31px" }}>
                        <Link class="input-group-addon" id="plus_cancellation"
                          onclick="plus_func_cancellation();"><i class="fa fa-plus"

                            style={{
                              color: "black", fontSize: "17px",
                              marginLeft: "5px",
                              marginTop: "2px"
                            }}></i></Link>
                        <Link class="input-group-addon" id="minus_cancellation"
                          onclick="minus_func_cancellation()" style={{ display: " none" }}><i
                            class="fa fa-minus"></i></Link>
                      </div>
                      <p>
                        For reference purposes only</p>

                      <div class="col-md-10" id="pd_cancellation">
                        <div class="input-group" id="pd_cancellation2" style={{ display: " none" }}>
                          <input type="text" class="form-control required"
                            name="txt_cancellation_email[2]" id="email_cancellation2" value=""
                            size="45" maxlength="70" />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group">
                      </div>

                      <div class="col-md-10" id="pd_cancellation">
                        <div class="input-group" id="pd_cancellation3" style={{ display: " none" }}>
                          <input type="text" class="form-control form-control-sm required"
                            name="txt_cancellation_email[3]" id="email_cancellation3" value=""
                            size="45" maxlength="70" />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group">
                      </div>

                      <div class="col-md-10" id="pd_cancellation">
                        <div class="input-group" id="pd_cancellation4" style={{ display: " none" }}>
                          <input type="text" class="form-control form-control-sm required"
                            name="txt_cancellation_email[4]" id="email_cancellation4" value=""
                            size="45" maxlength="70" />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group">
                      </div>

                      <div class="col-md-10" id="pd_cancellation">
                        <div class="input-group" id="pd_cancellation5" style={{ display: " none" }}>
                          <input type="text" class="form-control form-control-sm required"
                            name="txt_cancellation_email[5]" id="email_cancellation5" value=""
                            size="45" maxlength="70" />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="row mt-2">
              <div class="form-group col-md-3">
                <label>Contact Person 1</label>
                <input class="form-control form-control-sm" type="text"  size="45"
                 name="contactPerson1" 
                 id="contactPerson1"
                value={formData.contactPerson1}
                onChange={handleInputChange}
                
                  maxlength="50" />
              </div>
              <div class="form-group col-md-3">
                <label>Contact Person 2</label>
                <input class="form-control form-control-sm" type="text" 
                name="contactPerson2" 
                id="contactPerson2"
               value={formData.contactPerson2}
               onChange={handleInputChange}
             
                size="45"
                  maxlength="50" />
              </div>
              <div class="form-group col-md-3">
                <label>Currency</label>
                <MultiSelect
                  options={currencyOptions}
                  isSearchable
                  placeholder="- Select Currency-"
                  value={currencyOptions.find(option => option.value === formData.currency)}
                    onChange={(selectedOption) => handleSingleSelectChange(selectedOption, 'currency')}
                  className="custom-select required"
                  required


                />

              </div>
              <div class="form-group col-md-3">
                <label>Time Zone</label>
                <MultiSelect
                  options={timezoneOptions}
                  isSearchable
                  value={timezoneOptions.find(option => option.value === formData.timeZone)}
                  onChange={(selectedOption) => handleSingleSelectChange(selectedOption, 'timeZone')}
                  placeholder="Select Time Zone"
                  className="custom-select"

                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="form-group col-md-12">
                <label> Remarks</label>
                <textarea  rows="4" cols="80" class="form-control form-control-sm"
                 name="remarks" 
                 id="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                
                ></textarea>
              </div>
            </div>
            <div class="row mt-2">
              <div class="form-group col-md-3">
                <label>Username</label>
                <input type="text" class="form-control form-control-sm required"  maxlength="20"
                  minlength="3"  name="userName" 
                  id="userName"
                 value={formData.userName}
                 onChange={handleInputChange} 
                 required
                  
                  />
              </div>
              <div class="form-group col-md-3">
                <label>Password</label>
                <input class="form-control form-control-sm required" type="password"  size="45"
                  maxlength="50" 
                  name="password" 
                  id="password"
                 value={formData.password}
                 onChange={handleInputChange} 
                 required />
              </div>
              <div class="form-group col-md-3">
                <label>Opening Balance</label>
                <input type="text"  class="form-control form-control-sm" size="45" 
                  maxlength="50"
                  name="openingBalance" 
                  id="openingBalance"
                 value={formData.openingBalance}
                 onChange={handleInputChange} 
                  />
              </div>
              <input type="hidden" name="txt_commission_type" value="P" />
            </div>
            <div className="row mt-2">
      <div className="form-group col-md-12" style={{ display: "flex" }}>
        <div data-toggle="tooltip" data-placement="top" title="" className="checkbox checkbox-success" style={{ display: "inline-block", marginRight: "1%;" }} data-original-title="if you want to send email to supplier then check it otherwise uncheck it.">
          <input data-label-prepend="prefix" type="checkbox" id="send_email" name="sendEmail" value="Yes" onChange={handleCheckboxChange} checked={formData.sendEmail === "Yes"} />
          <label htmlFor="send_email">Send Email</label>
        </div>
        <div className="checkbox checkbox-success checkbox-inline">
          <input data-label-prepend="prefix" type="checkbox" name="editHotels" id="app" value="Yes" onChange={handleCheckboxChange} checked={formData.editHotels === "Yes"} />
          <label htmlFor="editHotels">Allow to Edit Hotel Details</label>
        </div>
        <div className="checkbox checkbox-success checkbox-inline">
          <input data-label-prepend="prefix" type="checkbox" name="editAdminRates" id="app" value="Yes" onChange={handleCheckboxChange} checked={formData.editAdminRates === "Yes"} />
          <label htmlFor="editAdminRates">Allow to Edit Admin Rates</label>
        </div>
        <div className="checkbox checkbox-success checkbox-inline">
          <input data-label-prepend="prefix" type="checkbox" name="jointVenture" id="app" value="Yes" onChange={handleCheckboxChange} checked={formData.jointVenture === "Yes"} />
          <label htmlFor="jointVenture">Joint Venture</label>
        </div>
      </div>
    </div>
            <br />
            <div class="row">
              <div class="form-group col-md-12">
                <button type="submit" class="btn btn-dark btn-sm" name="b1" value="SUBMIT"
                >
                  <i class="fa fa-floppy-o"></i>&nbsp;Save
                </button>
              </div>
            </div>
          </div>
        </form>




      </div>
    </>
  );
};
export default MastersSuppliersOfflineSuppliersNew;
