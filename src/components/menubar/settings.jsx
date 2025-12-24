import { Link } from "react-router-dom";
import Constants from "../../constants/routes";

const Settings = () => {
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
        <b>SETTINGS</b>
        <i className="fa-solid fa-angle-down"></i>
      </Link>

      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuLink"
        id="dripmenu"
      >
        {/* <li>
          <Link to={Constants.URLConstants.ADMINLOCK} className="dropdown-item">
            Branches <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="top-10">
            <li>
              <Link
                to={Constants.URLConstants.BRANCHNEW}
                className="dropdown-item"
              >
                Add
              </Link>
            </li>
            <li>
              <Link
                to={Constants.URLConstants.BRANCHSEARCH}
                className="dropdown-item"
              >
                View
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to={Constants.URLConstants.ADMINLOCK} className="dropdown-item">
            Reminders <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu">
            <li>
              <Link
                to={Constants.URLConstants.SETTINGREMINDERNEW}
                className="dropdown-item"
              >
                Add
              </Link>
            </li>
            <li>
              <Link
                to={Constants.URLConstants.SETTINGREMINDERSEARCH}
                className="dropdown-item"
              >
                View
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to={Constants.URLConstants.MIDOFFICE} className="dropdown-item">
            Mid-Office Access
          </Link>
        </li>

        <li>
          <Link
            to={Constants.URLConstants.REDISCONFIGURATION}
            className="dropdown-item"
          >
            REDIS Configuration
          </Link>
        </li>

        <li>
          <Link
            to={Constants.URLConstants.STATICCONTENTMANAGEMENT}
            className="dropdown-item"
          >
            Static Content Management
          </Link>
        </li> */}

        {/* Language Manager */}

        <li>
          <Link
            className="dropdown-item"
            to={Constants.URLConstants.TOOLSLANGUAGEMANAGER}
          >
            Language Manager
          </Link>
        </li>

        {/* <li>
          <Link to={Constants.URLConstants.ADMINLOCK} className="dropdown-item">
            Navigation <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="suppsub">
            <li>
              <Link
                to={Constants.URLConstants.SITEMAP}
                className="dropdown-item"
              >
                System Sitemap
              </Link>
            </li>
            <li>
              <Link
                to={Constants.URLConstants.ADMINLOCK}
                className="dropdown-item"
              >
                Menu Items <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu">
                <li>
                  <Link
                    to={Constants.URLConstants.ADDMENU}
                    className="dropdown-item"
                  >
                    Add Menu
                  </Link>
                </li>

                <li>
                  <Link
                    to={Constants.URLConstants.MENUSEARCH}
                    className="dropdown-item"
                  >
                    View
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li> */}
      </ul>
    </div>
  );
};
export default Settings;
