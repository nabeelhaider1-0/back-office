import React, { useEffect, useState } from 'react';
import Header2 from '../header2/header2';
import MultiSelect from '../reactMultiSelect';
import { ErrorApiAlert, SuccessApiToast } from '../../constants/globalfunctions';
import { getAllBranches, getDATA, putDATA } from '../../Apis/API';
import excelfilereader from '../../constants/excelfilereader';
import excelFileContent from "../../ExcelFiles/worldcities.xlsx";
import ApiRoutes from "../../constants/ApiRoutes"

const CustomersB2C = () => {
  const [selectedRadio, setSelectedRadio] = useState('country');
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [branches, setBranches] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [markupProfileOptions, setMarkupProfileOptions] = useState([]);
  const [formData, setFormData] = useState({
    country: [],
    branch: [],
    markupProfile: '', // Single value for markup profile
    supplier: []
  });

  const getofflinesuppliers = async () => {
    try {
      const response = await getDATA(ApiRoutes.SUPPLIERS.OFFLINE.SUPPLIER);
      if (response.data.statusCode === 200) {
        const offlinesuppliers = response.data.data || [];
        const options = offlinesuppliers.map((op) => ({
          value: op.uuid,
          label: op.supplierName,
        }));
        setSupplierOptions(options);
      }
    } catch (error) {
      ErrorApiAlert('Error Fetching Offline Suppliers');
    }
  };

  const getMarkUpProfiles = async () => {
    try {
      const response = await getDATA(ApiRoutes.MARKUP_PROFILE.PROFILE);
      if (response.data.statusCode === 200) {
        const profiles = response.data.data || [];
        const filteredProfiles = profiles.filter(
          (prof) => prof.activeStatus === "true" || prof.activeStatus === true
        );
        const options = filteredProfiles.map((prof) => ({
          value: prof.uuid,
          label: prof.profileName,
        }));
        setMarkupProfileOptions(options);
      }
    } catch (error) {
      ErrorApiAlert("Error Fetching Mark-Up Profiles");
    }
  };

  const fetchExcelData = async () => {
    try {
      const data = await excelfilereader(excelFileContent);
      const uniqueCountries = Array.from(
        new Set(data.CountryCities.map((item) => item.country))
      ).map((country) => ({
        value: data.CountryCities.find((item) => item.country === country).iso3,
        label: country,
      }));
      setCountryOptions(uniqueCountries);
    } catch (error) {
      ErrorApiAlert('Error Fetching Excel Data');
    }
  };

  const getbranches = async () => {
    try {
      const response = await getAllBranches();
      if (response.data.statusCode === 200) {
        const branches = response.data.data || [];
        const options = branches.map((branch) => ({
          value: branch.uuid,
          label: branch.branchName,
        }));
        setBranches(options);
      }
    } catch (error) {
      ErrorApiAlert('Error Fetching Branches');
    }
  };

  useEffect(() => {
    getbranches();
    getMarkUpProfiles();
    getofflinesuppliers();
    fetchExcelData();
  }, []);

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
  };

  const handleMultiSelectChange = (type, selectedOptions) => {
    setFormData(prevState => ({
      ...prevState,
      [type]: type === 'markupProfile'
        ? selectedOptions?.value || '' // Single value for markup profile
        : selectedOptions.map(option => option.value) // Array for other types
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formattedCountries = countryOptions
      .filter(option => formData.country.includes(option.value))
      .map(option => option.label);

    const submittedData = {
      country: selectedRadio === "country" ?formattedCountries:[],
      branch: selectedRadio === "brch" ?formData.branch:[],
      
      supplier: formData.supplier
    };


    try {
      const response = await putDATA(
        ApiRoutes.MARKUP_PROFILE.ASSIGN_PROFILE,formData.markupProfile,
        submittedData
      );
   
     
      if (response.data.statusCode === 200) {
        setFormData({
          country: [],
          branch: [],
          markupProfile: '', // Single value for markup profile
          supplier: []
        });
        SuccessApiToast("Mark-Up Profile Assigned Successfully");

      }
    } catch (error) {
      ErrorApiAlert("Error Assigning Mark-Up Profile");
    }
  };

  return (
    <>
      <Header2 title="ASSIGN MARK UP PROFILE" />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div className="panel-body form-group">
            <div className="row">
              <br />
              <div className="form-group col-md-12 mb-2">
                <label>Assign Mark Up Profile On</label>
                <div className="radioline1 mt-2">
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="agent_profile_type"
                      value="country"
                      id="country"
                      checked={selectedRadio === 'country'}
                      onChange={handleRadioChange}
                      className="test123"
                    />
                    <label htmlFor="country">Country</label>
                  </div>
                  <div className="radio radio-success radio-inline">
                    <input
                      type="radio"
                      name="agent_profile_type"
                      value="brch"
                      id="brch"
                      checked={selectedRadio === 'brch'}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="brch">Branch</label>
                  </div>
                </div>
              </div>
              <br />

              <div
                id="country_tbody"
                style={{ display: selectedRadio === "country" ? "block" : "none" }}
              >
                <div className="col-md-3">
                  <label>Country</label>
                  <MultiSelect
                    options={countryOptions}
                    isSearchable
                    isMulti
                    placeholder="- Select Country -"
                    noOptionsMessage={() => "No Country Found"}
                    className="custom-select required"
                    onChange={(selectedOptions) => handleMultiSelectChange('country', selectedOptions)}

                    required={selectedRadio === "country"?true:false}
                  />
                </div>
              </div>

              <div
                id="branch_tbody"
                style={{ display: selectedRadio === "brch" ? "block" : "none" }}
              >
                <div className="col-md-3">
                  <label>Branch</label>
                  <MultiSelect
                    options={branches}
                    isSearchable
                    isMulti
                    placeholder="- Select Branch -"
                    noOptionsMessage={() => "No Branch Found"}
                    className="custom-select required"
                    required={selectedRadio === "brch"?true:false}
                    onChange={(selectedOptions) => handleMultiSelectChange('branch', selectedOptions)}
                  />
                </div>
              </div>

              <div className="row" style={{ marginLeft: "25%", marginTop: "-4.3%" }}>
                <div className="col-md-3">
                  <label>Mark Up Profile</label>
                  <MultiSelect
                    options={markupProfileOptions}
                    isSearchable
                    placeholder="- Select Profile -"
                    noOptionsMessage={() => "No Profile Found"}
                    className="custom-select required"
                    onChange={(selectedOptions) => handleMultiSelectChange('markupProfile', selectedOptions)}
               required
                  />
                </div>
                <div className="col-md-3">
                  <label>Supplier</label>
                  <MultiSelect
                    options={supplierOptions}
                    isSearchable
                    isMulti
                    placeholder="- Select Supplier -"
                    noOptionsMessage={() => "No Supplier Found"}
                    className="custom-select required"
                    onChange={(selectedOptions) => handleMultiSelectChange('supplier', selectedOptions)}
                    required
                  />
                </div>
              </div>

              <div className="col-md-12 form-group">
                <br />
                <button
                  type="submit"
                  className="btn btn-dark btn-sm"
                  name="b1"
                  value="Submit"
                >
                  <i className="fa fa-floppy-o"></i>&nbsp;Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomersB2C;
