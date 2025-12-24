
import React, { useState } from 'react';
import Header2 from '../../header2/header2';
import MultiSelect from '../../reactMultiSelect';
import { countries } from '../../../constants/Country-City-Data';
import { add_options, markupProfileOptions, suppliersPreset } from '../../../constants/contants';











const ByCOuntryBranch = () => {
  const [selectedRadio, setSelectedRadio] = useState('ctry');

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
  };
  return (
    <>
      <Header2 title="ASSIGN MARK UP PROFILE"
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
        <form>
          <div class="panel-body form-group">
            <div class="row">
              <br />
              <div class="form-group col-md-12 mb-2 ">
                <label>Assign Mark Up Profile On</label>
                <div class="radioline1 mt-2">
                  <div class="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="agent_profile_type"
                      value="ctry"
                      id="ctry"
                      checked={selectedRadio === 'ctry'}
                      onChange={handleRadioChange}
                      className="test123"
                    />
                    <label for="ctry">Country</label>
                  </div>
                  <div class="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="agent_profile_type"
                      value="brch"
                      id="brch"
                      checked={selectedRadio === 'brch'}
                      onChange={handleRadioChange}
                    />
                    <label for="brch">Branch</label>
                  </div>
                </div>
              </div>
              <br />

              <div
                id="country_tbody"
                style={{ display: selectedRadio === "ctry" ? "block" : "none" }}
              >
                <div class="col-md-3 ">
                  <label>Country</label>
                  <MultiSelect
                    options={countries}
                    isSearchable
                    placeholder="- Please select a country -"
                    className="custom-select required"
                    noOptionsMessage={() => "No Country Found"}

                  />
        
                </div>
              </div>

              <div
                id="branch_tbody"
                style={{ display: selectedRadio === "brch" ? "block" : "none" }}
              >
                <div class="col-md-3 ">
                  <label>Branch</label>
                  <MultiSelect
                    options={add_options}
                    isSearchable
                    placeholder="- Select Branch -"
                    noOptionsMessage={() => "No Branch Found"}
                    className="custom-select required"

                  />
                </div>
              </div>

              <div
                class="row"
                style={{ marginLeft: "25%", marginTop: "-3.3%" }}
              >
                <div class="col-md-3 ">
                  <label>Mark Up Profile</label>
                  <MultiSelect
                    options={markupProfileOptions}
                    isSearchable
                    placeholder="- Select Profile -"
                    className="custom-select required"
                    noOptionsMessage={() => "No Profile Found"}

                  />
                </div>
                <div class="col-md-3 ">
                  <label>Supplier</label>
                  <MultiSelect
                    options={suppliersPreset}
                    isSearchable
                    placeholder="- Select Supplier -"
                    className="custom-select required"
                    noOptionsMessage={() => "No Supplier Found"}

                  />
                </div>
              </div>

              <div class="col-md-12 form-group ">
                <br />
                <button
                  type="button"
                  class="btn btn-dark btn-sm"
                  name="b1"
                  value="Submit"
                  onclick="submit_form(document.forms['assign_agent_profile']);"
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
export default ByCOuntryBranch;
