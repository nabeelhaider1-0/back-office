

import React from "react"; // Import React and useState
import creditcard from "../../../assets/images/credit-card.png"
import MultiSelect from "../../reactMultiSelect";
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
import { add_options, add_options1 } from "../../../constants/contants";


const AddCard = () => {

  return (
    <>
      <Header2
        title="ADD LODGE CARD "
        linkText1="Add Lodge Card"
        linkText2="Search Lodge Card"
        link2={Constants.URLConstants.SEARCHCARD}
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
              className="custom-select required"
            />
              
              </div>
              <div class="col-md-3 form-group">
                <label>Agent : </label>
                <MultiSelect
              options={add_options1}
              isSearchable
              placeholder="- Select Agent -"
              className="custom-select required"
            />
               
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-md-3 form-group">
                <label>Card Title : </label>
                <input
                  type="text"
                  name="card_title"
                  id="card_title"
                  maxlength="200"
                  class="form-control form-control-sm required"
                />
              </div>
            </div>
            <div
              class="panel-body col-md-6 mt-2"
              style={{
                border: "1px solid #e4e5e7",
                borderRadius: " 2p;",
                position: " relative",
                paddingLeft: "13px",
              }}
            >
              <div class="row mt-2">
                <div class="col-md-6 form-group">
                  <label for="cc-number" class="control-label">
                    Card Number :{" "}
                  </label>
                  <div class="input-group col-md-12 col-xs-12">
                    <input
                      id="cc-number"
                      name="card_number"
                      type="tel"
                      class="input-lg form-control form-control-sm cc-number required"
                      autocomplete="cc-number"
                      placeholder="•••• •••• •••• ••••"
                      required=""
                    />
                    <span class="input-group-addon cc-brand">
                      <img
                        src={creditcard}
                        alt="cri"
                        style={{
                          marginLeft: " -3px",
                          marginTop: "-5px",
                          width: "30px",
                         
                        }}
                      />
                    </span>
                    <input type="hidden" id="cc-type" name="card_type" />
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-3 form-group">
                  <label for="cc-exp" class="control-label">
                    Card Expiry :{" "}
                  </label>
                  <input
                    id="cc-exp"
                    name="card_expiry"
                    type="tel"
                    class="input-lg form-control form-control-sm cc-exp required"
                    autocomplete="cc-exp"
                    placeholder="•• / ••"
                    required=""
                  />
                </div>

                <div class="col-md-3 form-group">
                  <label for="cc-cvc" class="control-label">
                    Security Code :{" "}
                  </label>
                  <input
                    id="cc-cvc"
                    name="card_cvv"
                    type="tel"
                    class="input-lg form-control form-control-sm cc-cvc required"
                    autocomplete="off"
                    placeholder="•••"
                    required=""
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-6 form-group">
                  <label for="cc-name" class="control-label">
                    Card Holder Name :{" "}
                  </label>
                  <input
                    id="cc-name"
                    name="card_name"
                    type="text"
                    class="input-lg form-control form-control-sm cc-name required"
                    autocomplete="cc-name"
                    required=""
                    maxlength="200"
                  />
                </div>
              </div>
          
              <div class="clearfix"></div>
            </div>
            <div class="row mt-3">
              <div class="form-group col-md-12">
                <button
                  type="button"
                  name="b1"
                  value="SUBMIT"
                  onclick=" submit_form(document.forms['lodge_card_form'],'insert_lodge_card') "
                  class="btn btn-dark btn-sm"
                >
                  <i class="fa fa-plus"></i>
                  &nbsp;Add Lodge Card
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddCard;
