import { Link } from "react-router-dom";
import Constants from "../../constants/routes";

const Lodgecard = () => {
  return (
    <div className="dropdown" id="menudropdown">
      <a
        className="boxview dropdown-toggle"
        href="menuitem.html"
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <b>LODGE CARD</b>
        <i className="fa-solid fa-angle-down"></i>
      </a>

      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuLink"
        id="dripmenu"
      >
        <li>
          <Link to={Constants.URLConstants.ADMINLOCK}>
            Card<i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="agentsub">
            <li>
              <Link to={Constants.URLConstants.ADDCARD}>Add </Link>
            </li>
            <li>
              <Link
                to={Constants.URLConstants.SEARCHCARD}
                className="dropdown-item"
              >
                View
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to={Constants.URLConstants.ADMINLOCK}>
            Card Payment <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu">
            <li>
              <Link to={Constants.URLConstants.ADDCARDPAYMENT}>Add </Link>
            </li>
            <li>
              <Link to={Constants.URLConstants.SEARCHCARDPAYMENT}>View</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
export default Lodgecard;
