import React, { useEffect, useState } from "react";
import Constants from "../../constants/routes";
import Header2 from "../header2/header2";
import { getDATA, putDATA } from "../../Apis/API";
import { ErrorApiAlert, SuccessApiToast } from "../../constants/globalfunctions";
import loadingGif from "../../assets/images/loadingblue.gif";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import ApiRoutes from "../../constants/ApiRoutes"

const CustomersAgentLoyaltyTierSetting = ({ data }) => {
  const [TiersData, setTiersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState(""); // State to hold selected tier UUID
  const navigate = useNavigate();

  const getloyaltyTiers = async () => {
    try {
      setLoading(true);
      const response = await getDATA(ApiRoutes.LOYALTY_PROGRAM.TIERS);
      if (response.data.statusCode === 200) {
        const tiers = response.data.data || [];
        setTiersData(tiers);
      }
    } catch (error) {
      ErrorApiAlert('Error Fetching Loyalty Tier');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getloyaltyTiers();
  }, []);

  useEffect(() => {
    if (data && data.loyaltyTier && data.loyaltyTier.uuid) {
      // Check if data.loyaltyTier is defined and has a UUID
      setSelectedTier(data.loyaltyTier.uuid);
    } else {
      // If data.loyaltyTier is undefined or empty, default to "None"
      setSelectedTier("");
    }
  }, [data]);

  const submitForm = async () => {
    try {

      let loyaltyTierValue = selectedTier; // Initialize loyaltyTierValue with selectedTier
    
    // Check if selectedTier is an empty string (indicating "None" is selected)
    if (selectedTier === "") {
      loyaltyTierValue = null; // Set loyaltyTierValue to null if "None" is selected
    }
      const response = await putDATA(
        ApiRoutes.CUSTOMER_AGENTS.AGENT,
        data.uuid, // Assuming data.uuid is the agent's UUID for identification
        { loyaltyTier: loyaltyTierValue }
      );

      if (response.data.statusCode === 200) {
        SuccessApiToast("Loyalty Tier settings saved successfully");
        navigate(Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON);
        // Perform any necessary actions after successful save
      } else {
        ErrorApiAlert("Failed to save Loyalty Tier settings");
      }
    } catch (error) {
      ErrorApiAlert("Error saving Loyalty Tier settings");
    }
  };

  const handleRadioChange = (event) => {
    setSelectedTier(event.target.value); // Update selected tier state on radio button change
  };

  return (
    <>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <Header2 title="LOYALTY TIER SETTINGS" linkText1=" List Agents" linkText2="Agent Loyalty Tier" link1={Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON} />

        {loading ? (
          <div className="text-center">
            <img src={loadingGif} alt="Loading..." height={250} />
          </div>
        ) : (
          <form>
            <div className="panel-body">
              <div className="row">
                <div className="form-group col-md-12" style={{ display: 'contents' }}>
                  {/* Render "None" option as default */}
                  <div className="radio radio-success radio-inline">
                    <input type="radio" id="none" name="assign_loyalty" value="" checked={selectedTier === ""} onChange={handleRadioChange} />
                    <label htmlFor="none">None</label>
                  </div>

                  {/* Render radio buttons based on TiersData */}
                  {TiersData.map(tier => (
                    <div key={tier.uuid} className="radio radio-success radio-inline">
                      <input type="radio" id={tier.uuid} name="assign_loyalty" value={tier.uuid} checked={selectedTier === tier.uuid} onChange={handleRadioChange} />
                      <label htmlFor={tier.uuid}>{tier.tierName}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="row mt-2">
                <div className="form-group col-md-12">
                  <button className="btn btn-dark btn-sm" type="button" name="loyalty_tier_assign_btn" onClick={submitForm}>
                    <i className="fa fa-floppy-o" aria-hidden="true" />
                    &nbsp;Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(CustomersAgentLoyaltyTierSetting);
