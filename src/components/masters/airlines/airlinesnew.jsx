
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
const MastersAirlinesNew = () => {
  return (
    <> 
      <Header2
        title=" "
        linkText1="Search Airlines"
        linkText2="Add Airline"
        link1={Constants.URLConstants.MASTERSAIRLINESSEARCH}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad"></div>
    </>
  );
};
export default MastersAirlinesNew;
