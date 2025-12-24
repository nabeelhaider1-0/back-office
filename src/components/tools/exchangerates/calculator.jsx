import { markupPercentage } from "../../../constants/contants";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";

const Calcultorrate = () => {
  return (
    <>
      <Header2 title="CURRENCY EXCHANGE RATE" />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <div class="hpanel form-group">
          <div
            class="panel-body col-md-5 text-center"
            style={{
              backgroundColor: "#FF5015",
              paddingBottom: "1px",
              paddingTop: "4px",
            }}
          >
            <h5 style={{ color: "white", fontSize: "18px" }}>
              Calculate Exchange Rate
            </h5>
          </div>

          <div class="panel-body col-md-5 form-group">
            <form>
              <div class="row form-group">
                <div class="col-md-10">
                  <label>Mark Up (%)</label>
                  <MultiSelect
                    options={markupPercentage}
                    isSearchable
                    placeholder="- Select -"
                    noOptionsMessage={() => "No Markup % Found"}
                    className="custom-select"
                  />
                </div>
                <div class="col-md-2">
                  <label>&nbsp;</label>
                  <br />
                  <button
                    class="btn pull-right center-block btn-dark btn-sm"
                    data-toggle="tooltip"
                    data-original-title="Reset"
                    data-placement="top"
                    type="reset"
                    onclick="resetAll()"
                  >
                    <i class="fa fa-refresh"></i>
                  </button>
                </div>
              </div>
              <div class="row form-group mt-2" style={{ paddingRight: "33px" }}>
                <div class="col-md-5">
                  <div class="row">
                    <div class="col-md-6" style={{ paddingRight: "0px" }}>
                      <label>From Currency</label>
                      <input
                        class="form-control form-control-sm required"
                        type="text"
                        name="txt_val"
                        value=" 1 "
                        onblur="extractNumber(this,2,false);"
                        onkeyup="extractNumber(this,2,false);"
                      />
                    </div>

                    <div class="col-md-6" style={{ paddingLeft: "0px" }}>
                      <label>&nbsp;</label>
                      <select
                        onchange="submit_form()"
                        class="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                        name="sel_from_cur"
                        size="1"
                        id="sel_from_cur"
                        data-live-search="true"
                      >
                        <option value="0">Select Currency</option>
                        <option label="AED" value="AED">
                          AED
                        </option>
                        <option label="AUD" value="AUD">
                          AUD
                        </option>
                        <option label="BHD" value="BHD">
                          BHD
                        </option>
                        <option label="BRL" value="BRL">
                          BRL
                        </option>
                        <option label="CAD" value="CAD">
                          CAD
                        </option>
                        <option label="CHF" value="CHF">
                          CHF
                        </option>
                        <option label="CNY" value="CNY">
                          CNY
                        </option>
                        <option label="CZK" value="CZK">
                          CZK
                        </option>
                        <option label="DKK" value="DKK">
                          DKK
                        </option>
                        <option label="EGP" value="EGP">
                          EGP
                        </option>
                        <option label="EUR" value="EUR">
                          EUR
                        </option>
                        <option label="GBP" value="GBP">
                          GBP
                        </option>
                        <option label="HKD" value="HKD">
                          HKD
                        </option>
                        <option label="HUF" value="HUF">
                          HUF
                        </option>
                        <option label="IDR" value="IDR">
                          IDR
                        </option>
                        <option label="INR" value="INR">
                          INR
                        </option>
                        <option label="ISK" value="ISK">
                          ISK
                        </option>
                        <option label="JOD" value="JOD">
                          JOD
                        </option>
                        <option label="JPY" value="JPY">
                          JPY
                        </option>
                        <option label="KRW" value="KRW">
                          KRW
                        </option>
                        <option label="KWD" value="KWD">
                          KWD
                        </option>
                        <option label="MUR" value="MUR">
                          MUR
                        </option>
                        <option label="MYR" value="MYR">
                          MYR
                        </option>
                        <option label="NOK" value="NOK">
                          NOK
                        </option>
                        <option label="NZD" value="NZD">
                          NZD
                        </option>
                        <option label="OMR" value="OMR">
                          OMR
                        </option>
                        <option label="PHP" value="PHP">
                          PHP
                        </option>
                        <option label="PKR" value="PKR">
                          PKR
                        </option>
                        <option label="QAR" value="QAR">
                          QAR
                        </option>
                        <option label="RUB" value="RUB">
                          RUB
                        </option>
                        <option label="SAR" value="SAR">
                          SAR
                        </option>
                        <option label="SEK" value="SEK">
                          SEK
                        </option>
                        <option label="SGD" value="SGD">
                          SGD
                        </option>
                        <option label="THB" value="THB">
                          THB
                        </option>
                        <option label="TND" value="TND">
                          TND
                        </option>
                        <option label="TWD" value="TWD">
                          TWD
                        </option>
                        <option label="USD" value="USD">
                          USD
                        </option>
                        <option label="ZAR" value="ZAR">
                          ZAR
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-md-1">
                  <div class="row">
                    <label>&nbsp;</label>
                    <div
                      class="text-center btn btn-dark btn-sm col-md-12"
                      onclick="flipValues()"
                    >
                      <i class="fa fa-exchange"></i>
                    </div>
                  </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-5">
                  <div class="col-md-12">
                    <div class="row">
                      <label>To Currency</label>
                      <select
                        onchange="submit_form()"
                        class="required selectpicker form-control form-control-sm show-menu-arrow bs-select-hidden"
                        name="sel_to_cur"
                        id="sel_to_cur"
                        data-live-search="true"
                      >
                        <option value="0">Select Currency</option>
                        <option label="AED" value="AED">
                          AED
                        </option>
                        <option label="AUD" value="AUD">
                          AUD
                        </option>
                        <option label="BHD" value="BHD">
                          BHD
                        </option>
                        <option label="BRL" value="BRL">
                          BRL
                        </option>
                        <option label="CAD" value="CAD">
                          CAD
                        </option>
                        <option label="CHF" value="CHF">
                          CHF
                        </option>
                        <option label="CNY" value="CNY">
                          CNY
                        </option>
                        <option label="CZK" value="CZK">
                          CZK
                        </option>
                        <option label="DKK" value="DKK">
                          DKK
                        </option>
                        <option label="EGP" value="EGP">
                          EGP
                        </option>
                        <option label="EUR" value="EUR">
                          EUR
                        </option>
                        <option label="GBP" value="GBP">
                          GBP
                        </option>
                        <option label="HKD" value="HKD">
                          HKD
                        </option>
                        <option label="HUF" value="HUF">
                          HUF
                        </option>
                        <option label="IDR" value="IDR">
                          IDR
                        </option>
                        <option label="INR" value="INR">
                          INR
                        </option>
                        <option label="ISK" value="ISK">
                          ISK
                        </option>
                        <option label="JOD" value="JOD">
                          JOD
                        </option>
                        <option label="JPY" value="JPY">
                          JPY
                        </option>
                        <option label="KRW" value="KRW">
                          KRW
                        </option>
                        <option label="KWD" value="KWD">
                          KWD
                        </option>
                        <option label="MUR" value="MUR">
                          MUR
                        </option>
                        <option label="MYR" value="MYR">
                          MYR
                        </option>
                        <option label="NOK" value="NOK">
                          NOK
                        </option>
                        <option label="NZD" value="NZD">
                          NZD
                        </option>
                        <option label="OMR" value="OMR">
                          OMR
                        </option>
                        <option label="PHP" value="PHP">
                          PHP
                        </option>
                        <option label="PKR" value="PKR">
                          PKR
                        </option>
                        <option label="QAR" value="QAR">
                          QAR
                        </option>
                        <option label="RUB" value="RUB">
                          RUB
                        </option>
                        <option label="SAR" value="SAR">
                          SAR
                        </option>
                        <option label="SEK" value="SEK">
                          SEK
                        </option>
                        <option label="SGD" value="SGD">
                          SGD
                        </option>
                        <option label="THB" value="THB">
                          THB
                        </option>
                        <option label="TND" value="TND">
                          TND
                        </option>
                        <option label="TWD" value="TWD">
                          TWD
                        </option>
                        <option label="USD" value="USD">
                          USD
                        </option>
                        <option label="ZAR" value="ZAR">
                          ZAR
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="panel-body form-group mt-3"
                style={{ border: "1px solid #e4e5e7" }}
              >
                <div
                  class="row"
                  style={{
                    paddingLeft: "8px",
                    paddingBottom: "12px",
                    paddingRight: "20px",
                  }}
                >
                  <div class="col-md-6">
                    <label>Rate</label>
                    <input
                      class="form-control form-control-sm"
                      id="value_without_markup"
                      readonly=""
                    />
                  </div>
                  <div class="col-md-6 pull-right">
                    <label>Rate (With Mark Up) </label>
                    <input
                      class="form-control form-control-sm"
                      id="value_with_markup"
                      readonly=""
                    />
                  </div>
                </div>
              </div>
              <div class="row"></div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Calcultorrate;
