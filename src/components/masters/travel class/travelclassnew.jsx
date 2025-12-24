import Constants from "../../../constants/routes";
import Header2 from "../../header2/header2";

const MastersTravelClassNew = () => {
  return (
    <>
      <Header2
        title=" "
        linkText1="Search Travel Class"
        linkText2="Add Travel Class"
        link1={Constants.URLConstants.MASTERSTRAVELCLASSSEARCH}
      />
      <div class="container-fluid pt-0 p-4" id="content-pad"></div>
    </>
  );
};
export default MastersTravelClassNew;
