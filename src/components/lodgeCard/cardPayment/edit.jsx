
import React from "react"; // Import React and useState
import Header2 from "../../header2/header2";
import Constants from "../../../constants/routes";
import MultiSelect from "../../reactMultiSelect";
import { add_options, add_options1 } from "../../../constants/contants";


const EditCardPayment = () => {
 

  return (
    <>
      <Header2
        title="EDIT MAPPING LODGE CARD"
        linkText1="Edit Lodge Card Mapping"
        linkText2="Search Lodge Card Mapping"
        link2={Constants.URLConstants.SEARCHCARDPAYMENT}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3 form-group" id="branchList">
                <label>Branch</label>
                <MultiSelect
              options={add_options}
              isSearchable
              placeholder="- Select Branch -"
              className="custom-select"
            />
              </div>
              <div class="col-md-3 form-group">
                <label>Agent : </label>
                <MultiSelect
              options={add_options1}
              isSearchable
              placeholder="- Select Agent -"
              className="custom-select"
            />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-md-9 form-group">
                <label>Services : </label>
                <br />
                <div class="radioline1 mt-2">
                  <div class="radio radio-success radio-inline">
                    <input
                      id="hotel_service"
                      type="radio"
                      name="services"
                      value="hotel"
                      checked
                    />
                    <label for="hotel_service">Hotel</label>
                  </div>
                  <div class="radio radio-success radio-inline">
                    <input
                      id="app"
                      type="radio"
                      name="services"
                      value="sightseeing"
                    />
                    <label for="sight_service">Activity</label>
                  </div>
                  <div class="radio radio-success radio-inline">
                    <input
                      id="app"
                      type="radio"
                      name="services"
                      value="transfer"
                    />
                    <label for="transfer_service">Transfer</label>
                  </div>
                  <div class="radio radio-success radio-inline">
                    <input
                      id="app"
                      type="radio"
                      name="services"
                      value="Airline"
                    />
                    <label for="airline_service">Flight</label>
                  </div>
                </div>
                <div id="services_note">
                  Note : Lodge Card Applied For Seleted Entire Services.
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-3 form-group">
                  <label>Supplier : </label>
                  <select
                    class="selectpicker form-control form-control-sm show-menu-arrow input_width_2 setfonts color_set_1 bs-select-hidden"
                    id="sel_supplier_option"
                    name="sel_supplier_option[]"
                    multiple=""
                    data-live-search="true"
                    data-actions-box="true"
                  >
                    <option value="dotw">Dotw</option>
                    <option value="restel">Restel</option>
                    <option value="hotelbeds">Hotelbeds</option>
                    <option value="whitesands">Whitesands</option>
                    <option value="miki">Miki</option>
                    <option value="travco">Travco</option>
                    <option value="expedia">expedia</option>
                    <option value="expediapackage">expediapackage</option>
                    <option value="redapple">Redapple Travel</option>
                    <option value="dhisco_rotana">Dhisco</option>
                    <option value="agoda">Agoda</option>
                    <option value="localsystem">Contracted Hotels</option>
                    <option value="tboholidays">tboholidays</option>
                  </select>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-3 form-group">
                  <label>Lodge Cards : </label>
                  <select
                    class="selectpicker form-control form-control-sm show-menu-arrow input_width_2 setfonts color_set_1 required bs-select-hidden"
                    id="sel_card_option"
                    name="sel_card_option[]"
                    multiple=""
                    data-live-search="true"
                    data-actions-box="true"
                  ></select>
                </div>
                <div class="col-md-12 form-group card_note"></div>
              </div>

              <div class="clearfix"></div>
              <div class="row mt-3">
                <div class="form-group col-md-12">
                  <button
                    type="button"
                    name="b1"
                    value="SUBMIT"
                    onclick=" submit_mapping_form(document.forms['lodge_card_form_mapping'],'insert_lodge_card_mapping') "
                    class="btn btn-dark btn-sm"
                  >
                    <i class="fa fa-plus"></i>
                    &nbsp;Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default EditCardPayment;
