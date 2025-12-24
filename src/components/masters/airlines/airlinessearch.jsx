
import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";
const MastersAirlinesSearch = () => {
  return (
    <>
      <Header2
        title=" "
        linkText1="Search Airlines"
        linkText2="Add Airline"
        link2={Constants.URLConstants.MASTERSAIRLINESNEW}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad"></div>
    </>
  );
};
export default MastersAirlinesSearch;
