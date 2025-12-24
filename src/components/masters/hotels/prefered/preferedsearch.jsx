
import React, { useState } from 'react';
import Header2 from '../../../header2/header2';


const MastersHotelPreferedSearch = () => {
  const [leftSelectedOptions, setLeftSelectedOptions] = useState([]);
  const [rightSelectedOptions, setRightSelectedOptions] = useState([]);

  const rightToLeft = () => {
    // Move selected options from right to left
    setLeftSelectedOptions([...leftSelectedOptions, ...rightSelectedOptions]);
    setRightSelectedOptions([]);
  };

  const leftToRight = () => {
    // Move selected options from left to right
    setRightSelectedOptions([...rightSelectedOptions, ...leftSelectedOptions]);
    setLeftSelectedOptions([]);
  };
  return (
    <>
      <Header2 title="SEARCH PREFERRED HOTEL" linkText1="Preferred Hotel" />
      <div class="container-fluid pt-0 p-4" id="content-pad">

      <form action="add_preferred_hotel.php" method="post" name="search_preferred_hotel_form" id="search_preferred_hotel_form">
  <input type="hidden" defaultValue="search_preferred_hotel" name="action" />
  <div className="panel-body">
    <div className="row ">
      <div className="col-md-12">
        <label htmlFor="exampleInputEmail1" style={{fontFamily: 'MONTSERRAT!important', fontSize: '12px', fontWeight: 600, color: 'gray'}}>Tours</label>
      </div>
      <div className="form-group col-md-5">
        <label className="mb-2">Preferred Hotel</label><br />
        <select name="sel_hotels_1" id="sel_hotels_1" className="form-control form-control-sm test123" multiple size={20}value={leftSelectedOptions} onChange={(e) => setLeftSelectedOptions(Array.from(e.target.selectedOptions, (item) => item.value))}>
          <option label="Abhijeet,Mumbai,India" value={72284}>Abhijeet,Mumbai,India</option>
          <option label="Abidos Hotel Apartment Al Barsha,Dubai,United Arab Emirates" value={68789}>
            Abidos Hotel Apartment Al Barsha,Dubai,United Arab Emirates</option>
          <option label="Airport International,Mumbai,India" value={61956}>Airport
            International,Mumbai,India</option>
          <option label="Al Manar,Dubai,United Arab Emirates" value={47229}>Al Manar,Dubai,United Arab
            Emirates</option>
          <option label="Almondz,New delhi(Delhi),India" value={10102}>Almondz,New delhi(Delhi),India
          </option>
          <option label="Alpine Tree,New delhi(Delhi),India" value={10014}>Alpine Tree,New
            delhi(Delhi),India</option>
          <option label="Aman Plaza,New delhi(Delhi),India" value={10252}>Aman Plaza,New
            delhi(Delhi),India</option>
          <option label="Aurora Towers,Pune,India" value={10954}>Aurora Towers,Pune,India</option>
          <option label="Central Prabhu -Mumbai,Mumbai,India" value={68908}>Central Prabhu
            -Mumbai,Mumbai,India</option>
          <option label="Hilton Dubai Creek,Dubai,United Arab Emirates" value={47227}>Hilton Dubai
            Creek,Dubai,United Arab Emirates</option>
          <option label="Hilton Dubai Jumeirah Residence,Dubai,United Arab Emirates" value={67362}>
            Hilton Dubai Jumeirah Residence,Dubai,United Arab Emirates</option>
          <option label="Hilton Dubai Jumeirah Resort,Dubai,United Arab Emirates" value={67369}>Hilton
            Dubai Jumeirah Resort,Dubai,United Arab Emirates</option>
          <option label="Hotel of Royal,Paris,France" value={68918}>Hotel of Royal,Paris,France
          </option>
          <option label="Hotel The Peninsula Paris,Paris,France" value={72180}>Hotel The Peninsula
            Paris,Paris,France</option>
          <option label="Nakshatra test hotel,Bangkok,Thailand" value={68912}>Nakshatra test
            hotel,Bangkok,Thailand</option>
          <option label="Paris Beauty,Paris,France" value={68920}>Paris Beauty,Paris,France</option>
          <option label="Test shivsagar hotel,Bangkok,Thailand" value={68910}>Test shivsagar
            hotel,Bangkok,Thailand</option>
          <option label="Zurich,Istanbul,Turkey" value={67205}>Zurich,Istanbul,Turkey</option>
        </select>
      </div>
      <div className="col-md-2 text-center">
        <input type="button" className="btn w-xs btn-dark" onClick={rightToLeft} value="<<" style={{marginTop: '10em', paddingLeft: '40px', paddingRight: '40px'}} />
        <br />
        <br />
        <input type="button" className="btn w-xs btn-dark"  onClick={leftToRight} value=">>" style={{marginTop: '5em', paddingLeft: '40px', paddingRight: '40px'}} />
      </div>
      <div className="form-group col-md-5">
        <label className="mb-2">Priority of Preferred Hotels On Search page.</label><br />
        <select name="sel_right_members_1[]" id="sel_right_members_1[]" className="form-control" multiple size={20} ondblclick="addOfferNote();"value={rightSelectedOptions} onChange={(e) => setRightSelectedOptions(Array.from(e.target.selectedOptions, (item) => item.value))}>
          <option label="ABC Arabian Suites,Dubai,United Arab Emirates" value={46586}>ABC Arabian
            Suites,Dubai,United Arab Emirates</option>
          <option label="Hotel of barcelona,Barcelona,Spain" value={68916}>Hotel of
            barcelona,Barcelona,Spain</option>
          <option label="Hotel of paris,Paris,France" value={68915}>Hotel of paris,Paris,France
          </option>
          <option label="RainTree Hotel,Dubai,United Arab Emirates" value={46677}>RainTree
            Hotel,Dubai,United Arab Emirates</option>
          <option label="Rosewood Abu Dhabi,Abu dhabi,United Arab Emirates" value={72226}>Rosewood Abu
            Dhabi,Abu dhabi,United Arab Emirates</option>
          <option label="Spring Fields,Mumbai,India" value={72276}>Spring Fields,Mumbai,India</option>
        </select>
      </div>
    </div>
    <div className="row">
      <div className="form-group col-md-12">
        <button type="button" className="btn btn-dark btn-sm" name="b2" value="Add" onclick="Javascriptvalidate_chk(document.forms['search_preferred_hotel_form'],'search_preferred_hotel');">
          <i className="fa fa-floppy-o">
          </i>
          Save
        </button>
      </div>
    </div>
  </div>
</form>





      </div>
    </>
  );
};
export default MastersHotelPreferedSearch;
