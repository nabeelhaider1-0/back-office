
import Header2 from "../../header2/header2";
import MultiSelect from "../../reactMultiSelect";




const branchOptions = [
  { label: "--Select--", value: "" },
  { label: "Mumbai Branch", value: 1 },
  { label: "UAE Branch", value: 2 },
  { label: "UK Head Office", value: 3 },
  { label: "Head Office", value: 4 },
  { label: "Dubai GSA", value: 5 },
  { label: "London Branch", value: 6 },
  { label: "Saudi Branch", value: 7 },
  { label: "Dubai V3 Wh", value: 8 },
  { label: "Pune Branch", value: 9 },
  { label: "India - GSA", value: 10 },
  { label: "Test Branch1", value: 11 },
  { label: "test", value: 12 },
  { label: "Test Branch", value: 13 },
  { label: "Testffff", value: 14 },
  { label: "FRANCHISE BRANCH", value: 15 },
  { label: "Jcholidays", value: 16 },
  { label: "Demo", value: 17 },
  { label: "malaysia", value: 19 },
  { label: "GSA Iraq", value: 20 },
  { label: "Chennai", value: 21 },
  { label: "Bangkok Branch", value: 22 },
  { label: "suhas_branch", value: 23 },
  { label: "Istanbul", value: 24 },
  { label: "hyderabad", value: 25 },
  { label: "hyderabad_suhas", value: 26 },
  { label: "branch_suhas", value: 27 },
  { label: "New Joint Branch", value: 28 },
  { label: "Bahrain Branch", value: 29 },
  { label: "Branch Bahrain", value: 30 },
  { label: "testdddd", value: 31 },
  { label: "Demo", value: 32 },
  { label: "HotelConfirm", value: 33 },
  { label: "HotelConfirm_Live", value: 34 },
  { label: "Demo_Test_Branch", value: 35 },
  { label: "Demo Branch", value: 36 },
  { label: "GSA Branch", value: 37 },
  { label: "Testpp", value: 38 },
  { label: "GTest", value: 39 },
  { label: "WA_Malaysia", value: 40 },
  { label: "Bolton Branch", value: 41 },
  { label: "World Avenue", value: 42 },
  { label: "TEST_BRANCH_A", value: 43 },
  { label: "TEST_BRANCH_JV_A", value: 44 },
  { label: "TEST_BRANCH_JV_C", value: 45 },
  { label: "world_avenue_malesia", value: 46 },
  { label: "World Avenues Malaysia", value: 47 },
  { label: "test_branch_jv", value: 48 },
  { label: "1 Booking", value: 49 }
];
const MastersBanksEdit = () => {
  return (
    <>
      <Header2
        title="EDIT BANK"
        linkText1="Banks"
      />
      <div class="container-fluid pt-0 p-4" id="content-pad">
      <form action="add_bank.php" method="post" name="add_bank_form" id="add_bank_form">
  <input type="hidden" name="action" defaultValue="add" />
  <div className="row">
    <div className="form-group col-md-3">
      <label>Bank Name</label>
      <input type="text" name="txt_bank_name" id="nametxt" className="form-control form-control-sm required test123" size={45} maxLength={90}/>
    </div>
    <div className="form-group col-md-3">
      <label>Branch</label>
      <MultiSelect
                options={branchOptions}
                isSearchable
                placeholder=" Select Agent "
                className="custom-select required"
                noOptionsMessage={() => "No Agency Found"}
              />
    </div>
    <div className="form-group col-md-12">
      <label>Address</label>
      <textarea className="form-control form-control-sm" name="txtar_address" rows={4} id="address" cols={30} defaultValue={""} />
    </div>
  </div>
  <br />
  <div className="row">
    <div className="form-group col-md-12">
      <button type="submit" className="btn btn-dark btn-sm" name="b1" id="submit">
        <i className="fa fa-floppy-o" />&nbsp;Save
      </button>
    </div>
  </div>
</form>

      </div>
    </>
  );
};
export default MastersBanksEdit;
