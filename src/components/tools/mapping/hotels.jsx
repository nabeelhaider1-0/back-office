
import { Link } from "react-router-dom";
import { useState } from "react";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { citiesByCountry, countries } from "../../../constants/Country-City-Data";
import Constants from "../../../constants/routes";
import { mappingHotelOption } from "../../../constants/contants";



const Mappinghotel = () => {



  const [hotelsData, setHotelsData] = useState({
    hotelCountry: "",
    hotelCity: "",
  });



  const handleCountryChange = (selectedCountry) => {
    setHotelsData((prevData) => ({
      ...prevData,
      hotelCountry: selectedCountry.value,
      hotelCity: "", // Reset city when country changes
    }));
  };

  const handleCityChange = (selectedCity) => {
    setHotelsData((prevData) => ({
      ...prevData,
      hotelCity: selectedCity.value,
    }));
  };

  return (
    <>
      <Header2 title="MANUAL HOTEL MAPPING" linkText1=" List Hotel" />
      <div class="container-fluid pt-0 p-4" id="content-pad">

      <form>
  <div className="panel-body">
    <div className="row form-group">
      <div className="form-group col-md-3">
        <label>Country</label>
        <MultiSelect
                options={countries}
                isSearchable
                placeholder="- Please select a country -"
                className="custom-select required"
                onChange={handleCountryChange}
                noOptionsMessage={() => "No Country Found"}
                value={countries.find(
                  (c) => c.value === hotelsData.hotelCountry
                )}
              />
      </div>
      <div className="form-group col-md-3">
        <label>City</label>
        <MultiSelect
                //  options={Array.isArray(hotelsData.hotelCity) ? hotelsData.hotelCity : []}
                options={citiesByCountry[hotelsData.hotelCountry] || []}
                isSearchable
                placeholder="- Please select a city -"
                className="custom-select required"
                onChange={handleCityChange}
                noOptionsMessage={() => "No City Found"}
                value={(citiesByCountry[hotelsData.hotelCountry] || []).find(
                  (c) => c.value === hotelsData.hotelCity
                )}
              />
      </div>
      <div className="form-group col-md-3	">
        <label>Hotel</label>
        <MultiSelect
                options={mappingHotelOption}
                isSearchable
                placeholder="- Select Hotel -"
                className="custom-select"
              
              />
      </div>
      <div className="actionlink">
        <div id="hotel_name" className="form-group col-md-3" style={{display: 'none'}}>
          <label>&nbsp;Hotel</label>
          <div className="actionlink">
            <input type="text" name="new_hotel_name" defaultValue />
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-3">
      <div className="form-group col-md-12">
        <Link to={Constants.URLConstants.TOOLSMAPPINGHOTELSMAP} className="btn btn-dark btn-sm" value="Hotel Mapping" onclick="hotel_mapping();" >
          <i className="fa fa-map-marker" />&nbsp;&nbsp;Hotel Mapping
        </Link>&nbsp;&nbsp;
        <button type="Button" className="btn btn-dark btn-sm" value="Hotel Mapping" onclick="create_new_hotel();">
          <i className="fa fa-bed" />&nbsp;&nbsp;Create New Hotel
        </button>&nbsp;&nbsp;
        <button type="Button" className="btn btn-dark btn-sm" value="City Hotel Mapping Report" >
          <i className="fa fa-file-excel-o" />&nbsp;&nbsp;City Hotel Mapping Report
        </button>
      </div>
    </div>
  </div>
</form>

      </div>
    </>
  );
};
export default Mappinghotel;
