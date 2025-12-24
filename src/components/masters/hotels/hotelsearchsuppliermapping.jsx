
import { useState } from "react";
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";
import { citiesByCountry, countries } from "../../../constants/Country-City-Data";




const suppliersCodeOptions = [
  { label: " - Select Supplier -", value: 0 },
  { label: "Across Spain (S000000012)", value: "S000000012" },
  { label: "Air Asia (S000000123)", value: "S000000123" },
  { label: "Al raya hotel apartments (S000000488)", value: "S000000488" },
  { label: "Al Riyadh Travel Abha (S000000528)", value: "S000000528" },
  { label: "Al-Riyadh Travel & Tourism (S000000076)", value: "S000000076" },
  { label: "ALKHALEEJ PLAZA (S000000180)", value: "S000000180" },
  { label: "allwin-qtech (S000000003)", value: "S000000003" },
  { label: "Alyara International Travel & Tourism (S000000181)", value: "S000000181" },
  { label: "American Academy of Neurology (S000000656)", value: "S000000656" },
  { label: "Anwar Al Madinah Mövenpick Hotel (S000000559)", value: "S000000559" },
  { label: "Aryana Hotel (S000000394)", value: "S000000394" },
  { label: "Avantgarde Collection Taksim Square Hotel (S000000221)", value: "S000000221" },
  { label: "Avari Towers Karachi (S000000414)", value: "S000000414" },
  { label: "Bahrain International Hotel (S000000374)", value: "S000000374" },
  { label: "Barcelona skipper (S000000433)", value: "S000000433" },
  { label: "Beverly Hills Marriott (S000000439)", value: "S000000439" },
  { label: "CITI/TDO - 6255 (S000000440)", value: "S000000440" },
  { label: "COMO THE HALKIN (S000000507)", value: "S000000507" },
  { label: "CONRAD DUBAI (S000000426)", value: "S000000426" },
  { label: "Dinarobin Beachcomber (S000000446)", value: "S000000446" },
  { label: "DoubleTree by Hilton Hotel Izmir Airport (S000000413)", value: "S000000413" },
  { label: "EAN CONGRESS (S000000727)", value: "S000000727" },
  { label: "ECCMID (S000000655)", value: "S000000655" },
  { label: "EDEN BLUE (S000000423)", value: "S000000423" },
  { label: "Emirates Concorde Hotel and Residence (S000000300)", value: "S000000300" },
  { label: "Emirates Palace (S000000333)", value: "S000000333" },
  { label: "Escales International (S000000085)", value: "S000000085" },
  { label: "Esna Holidays (S000000280)", value: "S000000280" },
  { label: "EULAR (S000000794)", value: "S000000794" },
  { label: "Executives Hotel Azizia (S000000390)", value: "S000000390" },
  { label: "Executve Hotel Al Aziza (S000000400)", value: "S000000400" },
  { label: "Explore Middle East (S000000529)", value: "S000000529" },
  { label: "FlyronSupplier (S000000881)", value: "S000000881" },
  { label: "Four Seasons Amman (S000000402)", value: "S000000402" },
  { label: "fraser suites west bay doha (S000000391)", value: "S000000391" },
  { label: "FURAVERI HOTEL (S000000171)", value: "S000000171" },
  { label: "Gerry’s Destination Management Company (S000000747)", value: "S000000747" },
  { label: "Grand Excelsior Hotel Bur Dubai (S000000774)", value: "S000000774" },
  { label: "Grand Millennium Al Wahda (S000000210)", value: "S000000210" },
  { label: "Grand Millennium Muscat (S000000422)", value: "S000000422" },
  { label: "Hawthorn Suites by Wyndham Dubai, JBR (S000000451)", value: "S000000451" },
  { label: "Hilton Garden Inn Riyadh Olaya (S000000209)", value: "S000000209" },
  { label: "Hilton Hotel Jeddah (S000000415)", value: "S000000415" },
  { label: "Holiday Boutique (S000000449)", value: "S000000449" },
  { label: "Hotel Barriere Normandy (S000000308)", value: "S000000308" },
  { label: "Hotel Beds (S000000013)", value: "S000000013" },
  { label: "Hotel d'Allèves (S000000575)", value: "S000000575" },
  { label: "HOTEL DANGLETERRE (S000000403)", value: "S000000403" },
  { label: "Hotel Gräfrather Hof (S000000365)", value: "S000000365" },
  { label: "Hotel Villa Honegg (S000000438)", value: "S000000438" },
  { label: "Houston Airport Marriott at George Bush Intercontinental (S000000461)", value: "S000000461" },
  { label: "Hyatt Regency Amsterdam (S000000745)", value: "S000000745" },
  { label: "Hyatt Regency Dar As Saleem (S000000434)", value: "S000000434" },
  { label: "I VACATION TRAVEL & TOURISM SDN BHD (S000000006)", value: "S000000006" },
  { label: "Jumeirah at Etihad Towers (S000000332)", value: "S000000332" },
  { label: "Kempinski Al Othman Hotel Al Khobar (S000000478)", value: "S000000478" },
  { label: "Le Suffren (S000000435)", value: "S000000435" },
  { label: "Lilou Artisan Patisserie (S000000412)", value: "S000000412" },
  { label: "Lymphoma (S000000793)", value: "S000000793" },
  { label: "MANDARIN ORIENTAL (S000000290)", value: "S000000290" },
  { label: "MARHABA DUBAI (S000000682)", value: "S000000682" },
  { label: "Marino Royal Hotel (S000000427)", value: "S000000427" },
  { label: "MARRIOTT ZURICH HOTEL (S000000167)", value: "S000000167" },
  { label: "MILLENNIUM AIRPORT HOTEL DUBAI (S000000397)", value: "S000000397" },
  { label: "Miqat Tourism & Umrah (S000000314)", value: "S000000314" },
  { label: "Movenpick Ibn Batuta Gate (S000000431)", value: "S000000431" },
  { label: "MTS CITY BREAKS (S000000176)", value: "S000000176" },
  { label: "Narcissus Hotel and SPA Riyadh (S000000196)", value: "S000000196" },
  { label: "NH COLLECTION PALAZZO CINQUECENTO (S000000746)", value: "S000000746" },
  { label: "Novotel World Trasde Center (S000000432)", value: "S000000432" },
  { label: "One & Only Reethi Rah (S000000098)", value: "S000000098" },
  { label: "Palace Downtown (S000000472)", value: "S000000472" },
  { label: "paradise beachcomber (S000000444)", value: "S000000444" },
  { label: "paypal (S000000576)", value: "S000000576" },
  { label: "Pullman Jumeirah Lake and Tower (S000000421)", value: "S000000421" },
  { label: "QtechTest (S000000001)", value: "S000000001" },
  { label: "Radisson Blu Hotel Sisli (S000000339)", value: "S000000339" },
  { label: "Ramada Hotel & Suites Dammam (S000000474)", value: "S000000474" },
  { label: "Ramada Hotel Riyadh (S000000285)", value: "S000000285" },
  { label: "Reosrt Collina Dora (S000000723)", value: "S000000723" },
  { label: "sayalisupplier (S000000882)", value: "S000000882" },
  { label: "Sayali_Check_API (S000000886)", value: "S000000886" },
  { label: "Sayali_Qtech (S000000883)", value: "S000000883" },
  { label: "SayuSupplier (S000000885)", value: "S000000885" },
  { label: "SHARURAH PALACE HOTEL (S000000307)", value: "S000000307" },
  { label: "Sheraton Mall of Emirates (S000000367)", value: "S000000367" },
  { label: "St. Regis San Francisco (S000000775)", value: "S000000775" },
  { label: "SULTAN APARTMENTS (S000000178)", value: "S000000178" },
  { label: "supplierPackage (S000000884)", value: "S000000884" },
  { label: "SWISS BELL HOTEL (S000000173)", value: "S000000173" },
  { label: "TDO -Credit Card 6018 (S000000008)", value: "S000000008" },
  { label: "TDO -Credit Card 6352 (S000000095)", value: "S000000095" },
  { label: "TDO - Cash / Bank (S000000081)", value: "S000000081" },
  { label: "TDO-DUBAI (S000000508)", value: "S000000508" },
];



const MastersHotelSupplierMapping = () => {


  const [branchData, setBranchData] = useState({

    branchCountry: "",
    branchCity: "",

  });



  const handleCountryChange = (selectedCountry) => {
    setBranchData((prevData) => ({
      ...prevData,
      branchCountry: selectedCountry.value,
      branchCity: "", // Reset city when country changes
    }));
  };

  const handleCityChange = (selectedCity) => {
    setBranchData((prevData) => ({
      ...prevData,
      branchCity: selectedCity.value,
    }));
  };




  return (
    <>
      <Header2 title="HOTEL SUPPLIER MAPPING" linkText1="Hotel And Supplier Mapping" />
      <div class="container-fluid pt-0 p-4" id="content-pad">

      <form>
          <div className="panel-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label>Supplier Code</label>
                <MultiSelect
                    options={suppliersCodeOptions}
                    isSearchable
                    placeholder=" Select Supplier"
                    className="custom-select required"
                    noOptionsMessage={() => "No Supplier Found"}
                  />
              </div>
              <div className="form-group col-md-3">
                <label>Country</label>
                <MultiSelect
                  options={countries}
                  isSearchable
                  placeholder="- Select Country -"
                  className="custom-select required"
                  onChange={handleCountryChange}
                  noOptionsMessage={() => "No Country Found"}

                />
              </div>
              <div className="form-group col-md-3">
                <label>City</label>
                <MultiSelect
                  //  options={Array.isArray(branchData.branchCity) ? branchData.branchCity : []}
                  options={citiesByCountry[branchData.branchCountry] || []}
                  isSearchable
                  placeholder="- Select City -"
                  className="custom-select required"
                  onChange={handleCityChange}
                  noOptionsMessage={() => "No City Found"}

                />
              </div>
              <div className="col-md-12 mt-3">
                <label>Hotels</label>
              </div>
              <div className="form-group col-md-5">
                <select className="form-control form-control-sm" name="sel_flights" id="sel_flights" style={{ width: '100%', height: '200px' }} multiple size={20} onfocus="Javascriptcheck(document.forms['flight_supplier_mapping_form']);">
                  {/*  */}
                </select>
              </div>
              <div className="col-md-2 text-center">
                <input className="btn w-xs btn-dark" type="button" onclick="javascript left_to_right();" defaultValue=">>" style={{ marginTop: '2em', paddingLeft: '40px', paddingRight: '40px' }} />
                <br /><br />
                <input className="btn w-xs btn-dark" type="button" onclick="javascript right_to_left();" defaultValue="<<" style={{ marginTop: '3em', paddingLeft: '40px', paddingRight: '40px' }} />
              </div>
              <div className="form-group col-md-5">
                <select className="form-control form-control-sm" name="sel_right_members[]" id="sel_right_members[]" multiple style={{ width: '100%', height: '200px' }} size={20} onfocus="Javascriptcheck(document.forms['flight_supplier_mapping_form']);">
                  {/*  */}
                </select>
              </div>
            </div>
            <br />
            <div className="row mt-3">
              <div className="form-group col-md-6">
                <button className="btn btn-dark btn-sm" type="button" name="b1" value="SUBMIT" onclick="Javascript submit_form(document.forms['flight_supplier_mapping_form']);">
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
export default MastersHotelSupplierMapping;
