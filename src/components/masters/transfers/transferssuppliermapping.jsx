/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { getDATA, postDATA } from "../../../Apis/API";
import { ErrorApiAlert, RequiredFieldAlert, SuccessApiToast } from "../../../constants/globalfunctions";
import excelfilereader from "../../../constants/excelfilereader";
import excelFileContent from '../../../ExcelFiles/worldcities.xlsx';
import ApiRoutes from "../../../constants/ApiRoutes";


const MastersTransfersSupplierMapping = () => {

  const [transferOptions, settransferOptions] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [mappedTransferData, setMappedTransferData] = useState([]);
  const [supplierOptions, setsupplierOptions] = useState([]);
  const [rightTransfers, setRightTransfers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedRightOptions, setSelectedRightOptions] = useState([]);
  const [countryOptions, setcountryOptions] = useState([]);
  const [countrycitydata, setcountrycitydata] = useState([]);
  const [selectedCountry, setselectedCountry] = useState(null);
  const [cityOptions, setcityOptions] = useState([]);
  const [selectedCity, setselectedCity] = useState(null);
  const [formData, setFormData] = useState({
  uuid:""
    });

  const getTransfers = async () => {

    try {

      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.TRANSFERS.ADD_TRANSFER);
      if (response.data.statusCode === 200) {
        const transfer =response && response.data.data ? response.data.data : [];
       
        setTransfers(transfer);
       


        
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert('Error Fetching Transfers');
    } finally {

      // Set loading to false after data is fetched (whether successful or not)
    }
  };
  function filterTransfersByCity(cityName) {
    // Filter transfers by the provided city name
    const filteredTransfers = transfers.filter(
      trans => trans.fromCity.toLowerCase() === cityName.toLowerCase() || trans.toCity.toLowerCase() === cityName.toLowerCase()
    );
  
    // Find the current supplier using the UUID
    const currentSupplier = mappedTransferData.find(supplier => supplier.uuid === formData.uuid);
    const mappedTransfers = (currentSupplier ? currentSupplier.transfers : []);
  
    // Create options from filtered transfers
    let options = filteredTransfers.map(trans => ({
      value: trans.uuid,
      label: trans.transferName,
    }));
  
    // Remove transfers from options if their UUIDs match with current supplier's transfers
    const matchedTransferOptions = [];
    options = options.filter(option => {
      const isMatched = mappedTransfers.some(mappedTrans => mappedTrans.uuid === option.value);
      if (isMatched) {
        matchedTransferOptions.push(option);
        return false;
      }
      return true;
    });
  
    // Update state with filtered options and matched transfer options
    settransferOptions(options);
    setRightTransfers(matchedTransferOptions);
  }
  const getOfflineSuppliers = async () => {

    try {

      // Set loading to true when fetching data
      const response = await getDATA(ApiRoutes.SUPPLIERS.OFFLINE.SUPPLIER);
      if (response.data.statusCode === 200) {
        const supplier =response && response.data.data ? response.data.data : [];
        setMappedTransferData(supplier);
      
        const options = supplier.map((sup) => ({
          value: sup.uuid,
          label: sup.supplierName,
        }));
        setsupplierOptions(options);


        
      }

      // Handle successful authentication, e.g., set user state, redirect, etc.
    } catch (error) {
      ErrorApiAlert('Error Fetching Suppliers');
    } finally {

      // Set loading to false after data is fetched (whether successful or not)
    }
  };
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
    getTransfers();
    getOfflineSuppliers();
    fetchExcelData();
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
  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => ({
        label: option.label,
        value: option.value,
      })
    );
    setSelectedOptions(selectedOptions);
  };

  const handleSingleSelectChange = (selectedOption, name) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: selectedOption.value // Assuming the option object has a 'value' property
    }));
    setselectedCountry(null);
    setselectedCity(null);
    settransferOptions([]);
  };
  const handleSelectRightChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => ({
        label: option.label,
        value: option.value,
      })
    );
    setSelectedRightOptions(selectedOptions);
  };

  const assignedSelectToRight = () => {
    setRightTransfers((prevRightAmenities) => {
      // Filter out selected options from amenities
      const updatedAmenities = transferOptions.filter(
        (amenity) =>
          !selectedOptions.find((selected) => selected.value === amenity.value)
      );

      // Filter out duplicate options from selectedOptions
      const uniqueSelectedOptions = selectedOptions.filter(
        (option, index, self) =>
          index === self.findIndex((o) => o.value === option.value)
      );

      // Combine existing rightAmenities with uniqueSelectedOptions
      const combinedAmenities = [
        ...prevRightAmenities,
        ...uniqueSelectedOptions,
      ];

      // Filter out duplicates from combinedAmenities
      const uniqueRightAmenities = combinedAmenities.filter(
        (option, index, self) =>
          index === self.findIndex((o) => o.value === option.value)
      );

      // Update amenities and rightAmenities
      settransferOptions(updatedAmenities);
      return uniqueRightAmenities;
    });
  };
  const assignedSelectToLeft = () => {
    settransferOptions((prevAmenities) => {
      // Filter out selected options from rightAmenities
      const updatedRightAmenities = rightTransfers.filter(
        (amenity) =>
          !selectedRightOptions.find(
            (selected) => selected.value === amenity.value
          )
      );

      // Filter out duplicate options from selectedOptions
      const uniqueSelectedOptions = selectedRightOptions.filter(
        (option, index, self) =>
          index === self.findIndex((o) => o.value === option.value)
      );

      // Combine existing amenities with uniqueSelectedOptions
      const combinedAmenities = [...prevAmenities, ...uniqueSelectedOptions];

      // Filter out duplicates from combinedAmenities
      const uniqueAmenities = combinedAmenities.filter(
        (option, index, self) =>
          index === self.findIndex((o) => o.value === option.value)
      );

      // Update rightAmenities and amenities
      setRightTransfers(updatedRightAmenities);
      return uniqueAmenities;
    });
  };


  const handleCountryChange = (selectedOption) => {
    setselectedCountry(selectedOption);
    setselectedCity(null); 
  };
  
  const handleCityChange = (selectedOption) => {
    filterTransfersByCity(selectedOption.value);
    setselectedCity(selectedOption); 
  };
  
  
  const handleCitySelection = () => {
    if (!selectedCountry) {
      // If no country is selected, display a warning
      RequiredFieldAlert("Please select country first", "", "warning");
    }
  };

  const handleCounttrySelection = () => {
    if (formData.uuid===""||formData.uuid===undefined) {
      // If no country is selected, display a warning
      RequiredFieldAlert("Please select Supplier first", "", "warning");
    }
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();
  let requestBody="";
  if (rightTransfers.length===0 || rightTransfers === undefined) {
    RequiredFieldAlert(
      "No Transfer is Mapped",
      "Please set an transfer to map ",
      "error"
    );
    return ;
  }
    if (rightTransfers && rightTransfers.length > 0) {
      const transfers = rightTransfers.map(item => item.value);
      // country:(selectedCountry && selectedCountry.label) || '',city: (selectedCity && selectedCity.label) || '',
       requestBody={uuid:formData.uuid,
         transferUuid:transfers

       };
    }


  
  try {
    

    const response = await postDATA(requestBody,ApiRoutes.SUPPLIERS.OFFLINE.TRANSFER_MAPPING);

    if (response.data.statusCode === 200) {
     
      SuccessApiToast( "Supplier Mapping Added Successfully");
     
    settransferOptions([]);
    setRightTransfers([]);
    setSelectedRightOptions([]);
    setSelectedOptions([]);
  
    
    }
  } catch (error) {
    ErrorApiAlert('Error Adding Supplier Mapping');
    //  console.error(error)
  }
  }



  return (
    <>
      <Header2 title="TRANSFER SUPPLIER MAPPING" linkText1="Transfer And Supplier Mapping" />
      <div class="container-fluid pt-0 p-4" id="content-pad">

        <form onSubmit={handleSubmit}  id="offlinesuppliertransfermapping">
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label>Supplier</label>
                <MultiSelect
                    options={supplierOptions}
                    isSearchable
                    placeholder=" Select Supplier"
                    className="custom-select required"
                  
                    noOptionsMessage={() => "No Supplier Found"}
                    value={supplierOptions.find(option => option.value === formData.uuid)}
                    onChange={(selectedOption) => handleSingleSelectChange(selectedOption, 'uuid')}
                  
                    required
                  />
              </div>
              <div className="form-group col-md-3" onClick={handleCounttrySelection}>
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
              <div className="form-group col-md-3"   onClick={handleCitySelection}>
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
           
            </div>
            <div className="row mt-4">
              <div className="col-md-12 phps_row_0 mb-1">
                <label>Transfers</label>
              </div>
              <div className="form-group col-md-5 phps_row_1">
                <select
                  name="sel_amenities"
                  id="sel_amenities"
                  className="form-control form-control-sm"
                  multiple
                  size={9}
                  style={{ height: "210px" }}
                  onChange={handleSelectChange}
                >
                  {transferOptions.map((tran) => (
                    <option key={tran.value} value={tran.value}>
                      {tran.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center col-md-2 phps_row_0">
                <input
                  type="button"
                  className="btn w-xs btn-dark"
                  onClick={assignedSelectToRight}
                  defaultValue=">>"
                  style={{
                    marginTop: "2em",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                  }}
                />
                <br />
                <input
                  type="button"
                  className="btn w-xs btn-dark"
                  onClick={assignedSelectToLeft}
                  defaultValue="<<"
                  style={{
                    marginTop: "2em",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                  }}
                />
              </div>
              <div className="form-group col-md-5 phps_row_1">
                <select
                  name="sel_right_amenities"
                  id="sel_right_amenities"
                  className="form-control form-control-sm"
                  multiple
                  size={9}
                  style={{ height: "210px" }}
                  onChange={handleSelectRightChange}
                >
                  {rightTransfers.map((amenity) => (
                    <option key={amenity.value} value={amenity.value}>
                      {amenity.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />
            <div className="row mt-3">
              <div className="form-group col-md-6">
                <button className="btn btn-dark btn-sm" type="submit" name="b1" value="SUBMIT" onclick="Javascript submit_form(document.forms['flight_supplier_mapping_form']);">
                  <i className="fa fa-floppy-o" />
                  &nbsp;Save
                </button>
              </div>
            </div>
          </div>
        </form>



      </div>
    </>
  );
};
export default MastersTransfersSupplierMapping;
