import { edtoptions } from "../../constants/contants";
import Header2 from "../header2/header2";
import MultiSelect from "../reactMultiSelect";





const CustomersAgentEditRateProfile = () => {
  
  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">

        <Header2 title="EDIT AGENT RATE PROFILE" />



        <div>
  {/* First Row*/}
{/* First Row*/}
<form name="agent_profile" action="agent.php" method="GET">
  <div className="row">    
    <input type="hidden" name="action" defaultValue="insert_agent_profile" />
    <input type="hidden" name="db_type" defaultValue="edit" />    	        		        	 
    <input type="hidden" name="profile_id" defaultValue={5} id="profile_id" />
    <div className="col-md-2 form-group">
      <label>Profile</label>
      <MultiSelect
        isMulti
        options={edtoptions}
        placeholder="Select Agent..."
        isSearchable
        noOptionsMessage={()=>"No Agent Found"}
        className="required" 
       
      />
    </div>
    <div className="col-md-2 form-group">
      <label>&nbsp;</label><br />
      <button className="btn btn-dark btn-sm form-group search" onclick="submit('edit');"><i className="fa fa-edit" /> Update</button>
    </div> 
  </div>
</form>

 
  {/* End */}
</div>



      </div>
    </>
  );
};
export default CustomersAgentEditRateProfile;