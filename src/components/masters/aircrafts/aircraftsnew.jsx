import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";

const MastersAircraftsNew = () => {
  return (
    <> 
      <Header2
        title=" "
        linkText1="Search Airlines"
        linkText2="Add Airline"
        link1={Constants.URLConstants.MASTERSAIRCRAFTSSEARCH}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad"></div>
    </>
  );
};
export default MastersAircraftsNew;
