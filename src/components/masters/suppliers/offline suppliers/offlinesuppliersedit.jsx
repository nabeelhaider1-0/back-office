import { useState } from "react";

import { Link } from "react-router-dom";
import Header2 from "../../../header2/header2";
import Constants from "../../../../constants/routes";
import MultiSelect from "../../../reactMultiSelect";
import {
  citiesByCountry,
  countries,
} from "../../../../constants/Country-City-Data";

const timezone = [
  { label: "Select Time Zone", value: "" },
  { label: "GMT -12:00 Hours", value: "-12" },
  { label: "GMT -11:00 Hours", value: "-11" },
  { label: "GMT -10:00 Hours", value: "-10" },
  { label: "GMT -9:00 Hours", value: "-9" },
  { label: "GMT -8:00 Hours", value: "-8" },
  { label: "GMT -7:00 Hours", value: "-7" },
  { label: "GMT -6:00 Hours", value: "-6" },
  { label: "GMT -5:00 Hours", value: "-5" },
  { label: "GMT -4:00 Hours", value: "-4" },
  { label: "GMT -3:30 Hours", value: "-3.5" },
  { label: "GMT -3:00 Hours", value: "-3" },
  { label: "GMT -2:00 Hours", value: "-2" },
  { label: "GMT -1:00 Hours", value: "-1" },
  { label: "GMT 0:00 Hours", value: "0" },
  { label: "GMT +1:00 Hours", value: "1" },
  { label: "GMT +2:00 Hours", value: "2" },
  { label: "GMT +3:00 Hours", value: "3" },
  { label: "GMT +3:30 Hours", value: "3.5" },
  { label: "GMT +4:00 Hours", value: "4" },
  { label: "GMT +4:30 Hours", value: "4.5" },
  { label: "GMT +5:00 Hours", value: "5" },
  { label: "GMT +5:30 Hours", value: "5.5" },
  { label: "GMT +5:45 Hours", value: "5.75" },
  { label: "GMT +6:00 Hours", value: "6" },
  { label: "GMT +7:00 Hours", value: "7" },
  { label: "GMT +8:00 Hours", value: "8" },
  { label: "GMT +9:00 Hours", value: "9" },
  { label: "GMT +9:30 Hours", value: "9.5" },
  { label: "GMT +10:00 Hours", value: "10" },
  { label: "GMT +10:30 Hours", value: "10.5" },
  { label: "GMT +11:00 Hours", value: "11" },
  { label: "GMT +12:00 Hours", value: "12" },
];

const currencyOptions = [
  { label: "- Select Currency -", value: "0" },
  { label: "AUSTRALIAN DOLLAR", value: "1" },
  { label: "BAHRAINI DINAR", value: "9" },
  { label: "BRAZILIAN REAL", value: "618" },
  { label: "BRITISH POUND", value: "2" },
  { label: "CANADIAN DOLLAR", value: "596" },
  { label: "CHINESE YEN", value: "614" },
  { label: "CZECH KORUNA", value: "624" },
  { label: "DANISH KRONE", value: "598" },
  { label: "Egyptian Pound", value: "628" },
  { label: "EURO", value: "3" },
  { label: "HK DOLLAR", value: "592" },
  { label: "HUNGARIAN FORINT", value: "599" },
  { label: "INDIAN RUPEE", value: "4" },
  { label: "INDONESIAN RUPIAH", value: "619" },
  { label: "ISLANDIAN CROWN", value: "600" },
  { label: "JAPANESE YEN", value: "601" },
  { label: "JORDANIAN DINAR", value: "627" },
  { label: "KOREAN WON", value: "620" },
  { label: "KUWAITI DINAR", value: "5" },
  { label: "MALAYSIAN RINGGIT", value: "593" },
  { label: "Mauritian rupee", value: "631" },
  { label: "NEW ZEALAND DOLLAR", value: "605" },
  { label: "NORWEGIAN KRONE", value: "603" },
  { label: "OMANI RIAL", value: "8" },
  { label: "Pakistani Rupee", value: "630" },
  { label: "PHILIPPINE PESO", value: "623" },
  { label: "QATAR RIAL", value: "10" },
  { label: "RUSSIAN ROUBLE", value: "617" },
  { label: "SAUDI RIYAL", value: "608" },
  { label: "SINGAPORE DOLLAR", value: "591" },
  { label: "SOUTH AFRICAN RAND", value: "621" },
  { label: "SWEDISH KRONA", value: "609" },
  { label: "SWISS FRANC", value: "610" },
  { label: "TAIWAN DOLLARS", value: "604" },
  { label: "THAILAND BHAT", value: "7" },
  { label: "TUNISIA DINAR", value: "629" },
  { label: "U.S. DOLLAR", value: "6" },
  { label: "UAE DIRHAM", value: "11" },
];

const MastersSuppliersOfflineSupplierEdit = () => {
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
        title="SUPPLIER DETAILS"
        linkText1="List Offline Suppliers "
        linkText2="Edit Offline Supplier"
        link1={Constants.URLConstants.MASTERSSUPPLIERSOFFLINESUPPLIERSSEARCH}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div
          class="panel-body"
          style={{
            backgroundColor: "#FF5015",
            paddingBottom: "1px",
            paddingTop: "4px",
          }}
        >
          <div class="row">
            <div class="col-md-12">
              <h5
                style={{
                  color: "white",
                  fontSize: "15px",
                  marginLeft: "20px",
                }}
              >
                Supplier Username : Travel_Qtech
              </h5>
            </div>
          </div>
        </div>

        <form>
          <div class="panel-body">
            <div class="row">
              <div class="form-group col-md-3">
                <label>Country</label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  placeholder="- Select Country -"
                  onChange={handleCountryChange}
                  className="custom-select required"
                />
              </div>
              <div class="form-group col-md-3">
                <label>City</label>
                <MultiSelect
                  options={
                    citiesByCountry[
                      offlineSupplierData.offlineSupplierCountry
                    ] || []
                  }
                  onChange={handleCityChange}
                  isSearchable
                  placeholder="- Select City -"
                  className="custom-select required"
                />
              </div>
              <div class="form-group col-md-3">
                <label>Accounting Id</label>
                <input
                  type="text"
                  class="form-control form-control-sm "
                  name="txt_acc_id"
                  size="20"
                  maxlength="50"
                  value=""
                />
              </div>
              <div class="form-group col-md-3">
                <label>Supplier Name</label>
                <input
                  type="text"
                  name="txt_supplier_name"
                  id="txt_supplier_name"
                  class="form-control form-control-sm required"
                  size="45"
                  maxlength="100"
                  value=""
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="form-group col-md-12">
                <h5
                  style={{
                    fontSize: "13px",

                    fontWeight: 600,
                  }}
                >
                  Supplier Type
                </h5>
                <div class="radioline1">
                  <div class="checkbox checkbox-success checkbox-inline">
                    <input
                      id="hotel_supplier"
                      type="checkbox"
                      name="hotel_supplier"
                      value="1"
                      checked
                      disabled
                    />
                    <label for="1">Hotel Supplier</label>
                  </div>
                  <div class="checkbox checkbox-success checkbox-inline">
                    <input
                      id="app"
                      type="checkbox"
                      name="sight_supplier"
                      value="1"
                    />
                    <label for="sight_supplier">Activity Supplier</label>
                  </div>
                  <div class="checkbox checkbox-success checkbox-inline">
                    <input
                      id="app"
                      type="checkbox"
                      name="transfer_supplier"
                      value="1"
                    />
                    <label for="transfer_supplier">Transfer Supplier</label>
                  </div>
                  <div class="checkbox checkbox-success checkbox-inline">
                    <input
                      id="app"
                      type="checkbox"
                      name="visa_supplier"
                      value="1"
                    />
                    <label for="visa_supplier">Visa Supplier</label>
                  </div>
                  <div class="checkbox checkbox-success checkbox-inline">
                    <input
                      id="app"
                      type="checkbox"
                      name="fit_package_supplier"
                      value="1"
                    />
                    <label for="fit_package_supplier">
                      FIT Package Supplier
                    </label>
                  </div>
                  <div class="checkbox checkbox-success checkbox-inline">
                    <input
                      id="app"
                      type="checkbox"
                      name="airline_supplier"
                      value="1"
                    />
                    <label for="airline_supplier">Airline Supplier</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="form-group col-md-12">
                <label>Supplier Address</label>
                <textarea
                  class="form-control form-control-sm required"
                  name="txtar_address"
                  rows="5"
                  cols="32"
                ></textarea>
              </div>
            </div>
            <div class="row mt-2">
              <div class="form-group col-md-3">
                <label>Telephone</label>
                <input
                  type="text"
                  class="form-control form-control-sm required"
                  name="txt_telephone"
                  size="20"
                  maxlength="20"
                  value=""
                  onblur="extractNumber(this,0,false);"
                  onkeyup="extractNumber(this,0,false);"
                />
              </div>
              <div class="form-group col-md-3">
                <label> Fax</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  name="txt_fax"
                  size="45"
                  maxlength="20"
                  value=""
                  onblur="extractNumber(this,0,false);"
                  onkeyup="extractNumber(this,0,false);"
                />
              </div>
              <div class="form-group col-md-3">
                <label> Mobile</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  name="txt_mobile"
                  size="20"
                  value=""
                  maxlength="20"
                  onblur="extractNumber(this,0,false);"
                  onkeyup="extractNumber(this,0,false);"
                />
              </div>

              <div class="col-md-3">
                <div class="row">
                  <div class="col-md-12 form-group">
                    <label>E-mail</label>
                    <br />
                    <input
                      type="hidden"
                      name="last_shown"
                      id="last_shown"
                      value="1"
                    />
                    <div class="row">
                      <div class="col-md-10" id="pd">
                        <div class="input-group" id="pd1">
                          <input
                            type="text"
                            class="form-control form-control-sm required"
                            id="txt_email1"
                            name="txt_email[1]"
                            value=""
                            size="45"
                            maxlength="70"
                          />
                        </div>
                      </div>
                      <p> For reference purposes only</p>
                      <div class="input-group">
                        <Link
                          class="input-group-addon"
                          id="plus"
                          onclick="plus_func();"
                          style={{ marginLeft: "88%", marginTop: "-15.6%" }}
                        >
                          <i
                            class="fa fa-plus"
                            style={{ color: " black", marginLeft: " 6px" }}
                          >
                            {" "}
                          </i>
                        </Link>
                        <Link
                          class="input-group-addon"
                          id="minus"
                          onclick="minus_func()"
                          style={{ display: "none" }}
                        >
                          <i class="fa fa-minus"></i>
                        </Link>
                      </div>

                      <div class="col-md-10" id="pd">
                        <div
                          class="input-group"
                          id="pd2"
                          style={{ display: "none" }}
                        >
                          <input
                            type="text"
                            class="form-control form-control-sm required"
                            id="txt_email2"
                            name="txt_email[2]"
                            value=""
                            size="45"
                            maxlength="70"
                          />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group"></div>

                      <div class="col-md-10" id="pd">
                        <div
                          class="input-group"
                          id="pd3"
                          style={{ display: "none" }}
                        >
                          <input
                            type="text"
                            class="form-control form-control-sm required"
                            id="txt_email3"
                            name="txt_email[3]"
                            value=""
                            size="45"
                            maxlength="70"
                          />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group"></div>

                      <div class="col-md-10" id="pd">
                        <div
                          class="input-group"
                          id="pd4"
                          style={{ display: "none" }}
                        >
                          <input
                            type="text"
                            class="form-control form-control-sm required"
                            id="txt_email4"
                            name="txt_email[4]"
                            value=""
                            size="45"
                            maxlength="70"
                          />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group"></div>

                      <div class="col-md-10" id="pd">
                        <div
                          class="input-group"
                          id="pd5"
                          style={{ display: "none" }}
                        >
                          <input
                            type="text"
                            class="form-control form-control-sm required"
                            id="txt_email5"
                            name="txt_email[5]"
                            value=""
                            size="45"
                            maxlength="70"
                          />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="row">
                  <div class="col-md-12 form-group">
                    <label>Reservation Email</label>
                    <br />
                    <input
                      type="hidden"
                      name="last_shown_reservation"
                      id="last_shown_reservation"
                      value="1"
                    />
                    <div class="row">
                      <div class="col-md-10" id="pd_reservation">
                        <div class="input-group" id="pd_reservation1">
                          <input
                            type="text"
                            class="form-control form-control-sm required"
                            name="txt_reservation_email[1]"
                            id="email_reservation1"
                            value=""
                            size="45"
                            maxlength="70"
                          />
                        </div>
                      </div>
                      <p> For reference purposes only</p>
                      <div class="input-group">
                        <Link
                          class="input-group-addon"
                          id="plus_reservation"
                          onclick="plus_func_reservation();"
                          style={{ marginLeft: "88%", marginTop: "-15.6%" }}
                        >
                          <i
                            class="fa fa-plus"
                            style={{ color: " black", marginLeft: " 6px" }}
                          ></i>
                        </Link>
                        <Link
                          class="input-group-addon"
                          id="minus_reservation"
                          onclick="minus_func_reservation();"
                          style={{ display: "none" }}
                        >
                          <i class="fa fa-minus"></i>
                        </Link>
                      </div>

                      <div class="col-md-10" id="pd_reservation">
                        <div
                          class="input-group"
                          id="pd_reservation2"
                          style={{ display: "none" }}
                        >
                          <input
                            type="text"
                            class="form-control form-control-sm required"
                            name="txt_reservation_email[2]"
                            id="email_reservation2"
                            value=""
                            size="45"
                            maxlength="70"
                          />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group"></div>

                      <div class="col-md-10" id="pd_reservation">
                        <div
                          class="input-group"
                          id="pd_reservation3"
                          style={{ display: "none" }}
                        >
                          <input
                            type="text"
                            class="form-control form-control-sm required"
                            name="txt_reservation_email[3]"
                            id="email_reservation3"
                            value=""
                            size="45"
                            maxlength="70"
                          />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group"></div>

                      <div class="col-md-10" id="pd_reservation">
                        <div
                          class="input-group"
                          id="pd_reservation4"
                          style={{ display: "none" }}
                        >
                          <input
                            type="text"
                            class="form-control form-control-sm required"
                            name="txt_reservation_email[4]"
                            id="email_reservation4"
                            value=""
                            size="45"
                            maxlength="70"
                          />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group"></div>

                      <div class="col-md-10" id="pd_reservation">
                        <div
                          class="input-group"
                          id="pd_reservation5"
                          style={{ display: "none" }}
                        >
                          <input
                            type="text"
                            class="form-control form-control-sm required"
                            name="txt_reservation_email[5]"
                            id="email_reservation5"
                            value=""
                            size="45"
                            maxlength="70"
                          />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="row">
                  <div class="col-md-12 form-group">
                    <label>Cancellation Email</label>
                    <br />
                    <input
                      type="hidden"
                      name="last_shown_cancellation"
                      id="last_shown_cancellation"
                      value="1"
                    />
                    <div class="row">
                      <div class="col-md-10" id="pd_cancellation">
                        <div class="input-group" id="pd_cancellation1">
                          <input
                            type="text"
                            class="form-control form-control-sm required"
                            name="txt_cancellation_email[1]"
                            id="email_cancellation1"
                            value=""
                            size="45"
                            maxlength="70"
                          />
                        </div>
                      </div>
                      <p> For reference purposes only</p>
                      <div class="input-group">
                        <Link
                          class="input-group-addon"
                          id="plus_cancellation"
                          onclick="plus_func_cancellation();"
                          style={{ marginLeft: "88%", marginTop: "-15.6%" }}
                        >
                          <i
                            class="fa fa-plus"
                            style={{ color: " black", marginLeft: " 6px" }}
                          ></i>
                        </Link>
                        <Link
                          class="input-group-addon"
                          id="minus_cancellation"
                          onclick="minus_func_cancellation()"
                          style={{ display: "none" }}
                        >
                          <i class="fa fa-minus"></i>
                        </Link>
                      </div>

                      <div class="col-md-10" id="pd_cancellation">
                        <div
                          class="input-group"
                          id="pd_cancellation2"
                          style={{ display: "none" }}
                        >
                          <input
                            type="text"
                            class="form-control form-control-sm required"
                            name="txt_cancellation_email[2]"
                            id="email_cancellation2"
                            value=""
                            size="45"
                            maxlength="70"
                          />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group"></div>

                      <div class="col-md-10" id="pd_cancellation">
                        <div
                          class="input-group"
                          id="pd_cancellation3"
                          style={{ display: "none" }}
                        >
                          <input
                            type="text"
                            class="form-control form-control-sm required"
                            name="txt_cancellation_email[3]"
                            id="email_cancellation3"
                            value=""
                            size="45"
                            maxlength="70"
                          />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group"></div>

                      <div class="col-md-10" id="pd_cancellation">
                        <div
                          class="input-group"
                          id="pd_cancellation4"
                          style={{ display: "none" }}
                        >
                          <input
                            type="text"
                            class="form-control form-control-sm required"
                            name="txt_cancellation_email[4]"
                            id="email_cancellation4"
                            value=""
                            size="45"
                            maxlength="70"
                          />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group"></div>

                      <div class="col-md-10" id="pd_cancellation">
                        <div
                          class="input-group"
                          id="pd_cancellation5"
                          style={{ display: "none" }}
                        >
                          <input
                            type="text"
                            class="form-control form-control-sm required"
                            name="txt_cancellation_email[5]"
                            id="email_cancellation5"
                            value=""
                            size="45"
                            maxlength="70"
                          />
                          For reference purposes only
                        </div>
                      </div>
                      <div class="input-group"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-3">
                <label>Currency</label>
                <MultiSelect
                  options={currencyOptions}
                  isSearchable
                  placeholder="- Select Currency-"
                  className="custom-select required"
                />
              </div>
              <div class="form-group col-md-3">
                <label>Time Zone</label>
                <MultiSelect
                  options={timezone}
                  isSearchable
                  placeholder="Select Time Zone"
                  className="custom-select"
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="form-group col-md-12">
                <label> Remarks</label>
                <textarea
                  name="txtar_remarks"
                  rows="4"
                  cols="80"
                  class="form-control form-control-sm"
                ></textarea>
              </div>
            </div>
            <div class="row mt-2">
              <div class="form-group col-md-3">
                <label>Opening Balance</label>
                <input
                  type="text"
                  name="txt_open_balance"
                  class="form-control form-control-sm"
                  size="45"
                  value=""
                  maxlength="50"
                  onblur="extractNumber(this,0,false);"
                  onkeyup="extractNumber(this,0,false);"
                />
              </div>
              <input type="hidden" name="txt_commission_type" value="P" />
            </div>
            <div class="row mt-2">
              <div class="form-group col-md-12" style={{ display: "flex" }}>
                <div
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  class="checkbox checkbox-success"
                  style={{ display: "inline-block", marginRight: "1%;" }}
                  data-original-title="if you want to send email to supplier then check it otherwise uncheck it."
                >
                  <input
                    data-label-prepend="prefix"
                    type="checkbox"
                    id="send_email"
                    name="send_email"
                    value="1"
                  />
                  <label for="send_email">Send Email</label>
                </div>
                <div class="checkbox checkbox-success checkbox-inline">
                  <input
                    data-label-prepend="prefix"
                    type="checkbox"
                    name="allow_to_edit_hotel"
                    id=""
                    value="1"
                  />
                  <label for="allow_to_edit_hotel">
                    Allow to Edit Hotel Details
                  </label>
                </div>
                <div class="checkbox checkbox-success checkbox-inline">
                  <input
                    data-label-prepend="prefix"
                    type="checkbox"
                    name="allow_to_edit_admin_rates"
                    id="app"
                    value="1"
                  />
                  <label for="allow_to_edit_admin_rates">
                    Allow to Edit Admin Rates
                  </label>
                </div>
                <div class="checkbox checkbox-success checkbox-inline">
                  <input
                    data-label-prepend="prefix"
                    type="checkbox"
                    name="is_joint_venture"
                    id="app"
                    value="1"
                  />
                  <label for="is_joint_venture">Joint Venture</label>
                </div>
              </div>
            </div>
            <br />
            <div class="row mt-2">
              <div class="form-group col-md-12">
                <button
                  type="button"
                  class="btn btn-dark btn-sm"
                  name="b1"
                  value="SUBMIT"
                >
                  <i class="fa fa-floppy-o"></i>&nbsp;Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default MastersSuppliersOfflineSupplierEdit;
