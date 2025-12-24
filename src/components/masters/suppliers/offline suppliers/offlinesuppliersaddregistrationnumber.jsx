import React, { useState, useRef, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import Header2 from "../../../header2/header2";
import MultiSelect from "../../../reactMultiSelect";
import { citiesByCountry, countries } from "../../../../constants/Country-City-Data";


const MastersSuppliersOfflineSupplierAddRegistrationNumber = () => {
  const [startDate, setStartDate] = useState(new Date());
  const fromDateRef = useRef(null); // Create a ref to access the Flatpickr instance
  const handleTrashClick = () => {
    // Function to clear both start and end dates
    setStartDate(null);
  };

  useEffect(() => {
    // Initialize Flatpickr when the component mounts
    if (fromDateRef.current) {
      fromDateRef.current.flatpickr({
        dateFormat: "Y-m-d",
        minDate: "today",
      });
    }
  }, []);



  const [offlineSupplierData, setOfflineSupplierData] = useState({
    offlineSupplierCountry: "",
    offlineSupplierCity: "",

  });


  const handleCountryChange = (selectedCountry) => {
    setOfflineSupplierData((prevData) => ({
      ...prevData,
      offlineSupplierCountry: selectedCountry.value,
      offlineSupplierCity: "", // Reset city when country changes
    }));
  };

  const handleCityChange = (selectedCity) => {
    setOfflineSupplierData((prevData) => ({
      ...prevData,
      offlineSupplierCity: selectedCity.value,
    }));
  };


  return (
    <div>
      <Header2
        title="ADD REGISTRATION NUMBER"
      />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div class="panel-body">
            <div class="row">
              <div class="form-group col-md-3">
                <label>Registered :</label>
                <div class="">
                  <div class="radio radio-success radio-inline" >
                    <input type="radio" id="register_yes" name="registered" value="1" class="test123" />
                    <label for="register_yes">Yes</label>
                  </div>
                  <div class="radio radio-success radio-inline">
                    <input type="radio" id="register_no" name="registered" value="0" />
                    <label for="register_no">No</label>
                  </div>
                </div>
              </div>
              <div class="form-group col-md-3">
                <label>Status :</label>
                <div class="">
                  <div class="radio radio-success radio-inline">
                    <input type="radio" id="registration_status" name="registration_status" value="1" />
                    <label for="register_yes">Approved</label>
                  </div>
                  <div class="radio radio-success radio-inline">
                    <input type="radio" id="registration_status" name="registration_status" value="0" />
                    <label for="register_no">Not Approved</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="form-group col-md-3">
                <label for="registration_no">Registration No. :</label>
                <input class="form-control form-control-sm" type="text" name="registration_no" size="11"
                  value="" id="registration_no" />
              </div>
              <div class="form-group col-md-3">
                <label>Country</label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select"
                  onChange={handleCountryChange}

                />

              </div>
              <div class="form-group col-md-3">
                <label>State</label>
                <input class="form-control form-control-sm" type="text" name="registration_state" size="11"
                  value="" id="registration_state" />
              </div>
              <div class="form-group col-md-3">
                <label>City</label>
                <MultiSelect
                  options={citiesByCountry[offlineSupplierData.offlineSupplierCountry] || []}
                  onChange={handleCityChange}
                  isSearchable
                  placeholder="- Select City -"
                  className="custom-select"

                />

              </div>
              <div class="form-group col-md-3 mt-2">
                <label>Registration Date:</label>
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12 ">
                    <div class="input-group date col-md-12 col-sm-12 col-xs-12 departure_date"
                      id="departure_date">
                      <Flatpickr
                        value={startDate}
                        onChange={(selectedDates) => setStartDate(selectedDates[0])}
                        options={{
                          dateFormat: "Y-m-d",
                          minDate: "today",
                        }}
                      />
                      <span class="input-group-addon">
                        <i class="fa fa-th" aria-hidden="true"></i></span>
                      <span class="input-group-addon pointer" id="dTrashBtn" onClick={handleTrashClick}>
                        <i class="fa fa-trash" aria-hidden="true"></i></span>
                    </div>
                  </div>

                </div>
              </div>

            </div>


            <div class="row mt-3">
              <div class="form-group col-md-3">
                <label>Mode of Payment :</label>
                <select name="payment_mode" class="selectpicker show-menu-arrow form-control form-control-sm bs-select-hidden"
                  id="payment_mode" data-live-search="true">
                  <option label="Credit" value="credit">Credit</option>
                  <option label="Pre Payment" value="prepayment">Pre Payment</option>

                </select>

              </div>
              <div class="form-group col-md-3">
                <label>Bank :</label>
                <input class="form-control form-control-sm" type="textbox" name="bank_name" id="bank" value="" />
              </div>
              <div class="form-group col-md-3">
                <label>Swift Code :</label>
                <input class="form-control form-control-sm" type="textbox" name="swift_code" id="bank" value="" />
              </div>
            </div>
            <div class="row mt-3">
              <div class="form-group col-md-3">
                <label>Account Type :</label>
                <input class="form-control form-control-sm" type="textbox" name="acc_type" id="bank" value="" />
              </div>
              <div class="form-group col-md-3">
                <label>Account Name :</label>
                <input class="form-control form-control-sm" type="textbox" name="acc_name" id="bank" value="" />
              </div>
              <div class="form-group col-md-3">
                <label>Account Number :</label>
                <input class="form-control form-control-sm" type="textbox" name="acc_no" id="bank" value="" />
              </div>
            </div>
            <div class="row mt-3">
              <div class="form-group col-md-3">
                <label>Remark (If Any) :</label>
                <textarea name="acc_remark" class="form-control form-control-sm" rows="5">  </textarea>
              </div>
            </div>
            <div class="row mt-3">
              <div class="form-group col-md-12">
                <input type="hidden" name="action" value="insert_tax_registration" />
                <button type="submit" class="btn btn-dark btn-sm" value="Submit" id="submit_button"
                >
                  <i class="fa fa-floppy-o"></i>&nbsp;Save
                </button>&nbsp;&nbsp;
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MastersSuppliersOfflineSupplierAddRegistrationNumber;
