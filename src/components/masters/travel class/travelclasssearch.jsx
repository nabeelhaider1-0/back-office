import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";

const MastersTravelClassSearch = () => {
  return ( 
    <>
      <Header2
        title=" "
        linkText1="Search Travel Class"
        linkText2="Add Travel Class"
        link2={Constants.URLConstants.MASTERSTRAVELCLASSNEW}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad"></div>
    </>
  );
};
export default MastersTravelClassSearch;
