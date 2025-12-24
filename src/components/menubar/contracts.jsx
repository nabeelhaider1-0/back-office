import { Link } from "react-router-dom";
import Constants from "../../constants/routes";

const Contracts = () => {
  return (
    <div className="dropdown" id="menudropdown">
      <Link
        className="boxview dropdown-toggle"
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <b>CONTRACTS</b>
        <i className="fa-solid fa-angle-down"></i>
      </Link>

      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuLink"
        id="dripmenu"
      >
        <li>
          <Link className="dropdown-item" href="menuitem.html">
            Hotels And Resorts{" "}
            <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="agentsub">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.CONTRACTSHOTELSRATESSEARCH}
              >
                Rates View
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.CONTRACTSHOTELSALLOTMENT}
              >
                Allotment Map
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.ADDMENU}
              >
                Dynamic Allotment{" "}
                <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="accountsub">
                <li>
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants.CONTRACTSHOTELSDYNAMICALLOTMENTNEW
                    }
                  >
                    Add Dynamic Allotment
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants
                        .CONTRACTSHOTELSDYNAMICALLOTMENTSEARCH
                    }
                  >
                    View Dynamic Allotment
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="dropdown-item" href="menuitem.html">
                Offers And Discounts{" "}
                <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="mappinggsub">
                <li>
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants
                        .CONTRACTSHOTELSOFFERSANDDISCOUNTSNEW
                    }
                  >
                    Add Offers And Discounts
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants
                        .CONTRACTSHOTELSOFFERSANDDISCOUNTSSEARCH
                    }
                  >
                    View Offers And Discounts
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <Link className="dropdown-item" to={Constants.URLConstants.ADDMENU}>
            Transfers And Transportation{" "}
            <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.CONTRACTSTRANSFERSRATESSEARCHBUTTON}
              >
                Rates View
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link className="dropdown-item" to={Constants.URLConstants.ADDMENU}>
            Tours And Activities{" "}
            <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="accountsub">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.CONTRACTSTOURSANDACTIVITIESRATESLIST}
              >
                Rates List
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link className="dropdown-item" to={Constants.URLConstants.ADDMENU}>
            Flights And Airlines{" "}
            <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="accountsub">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.CONTRACTSFLIGHTSSEARCH}
              >
                View Flights
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.CONTRACTSFLIGHTSSUPPLIERMAPPING}
              >
                Flight Supplier Mapping
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.CONTRACTSFLIGHTSADDRATES}
              >
                Add Rates
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
export default Contracts;
