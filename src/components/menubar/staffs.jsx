import { Link } from "react-router-dom";
import Constants from "../../constants/routes";
import { isRoutePermitted } from "../../authUtils";

const Staffs = ({ permittedItems, isSuperAdmin = false }) => {
  const hasPermission = (routePaths) => {
    return isSuperAdmin || routePaths.some((path) => isRoutePermitted(permittedItems, path));
  };

  const accessRoutes = [
    Constants.URLConstants.STAFFACCESSROLES,
    "/rights",
  ];

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
        <b>STAFF</b>
        <i className="fa-solid fa-angle-down"></i>
      </Link>

      <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink" id="dripmenu">
        {hasPermission([Constants.URLConstants.STAFFNEW]) && (
          <li>
            <Link to={Constants.URLConstants.STAFFNEW} className="dropdown-item">
              Add
            </Link>
          </li>
        )}
        {hasPermission([Constants.URLConstants.STAFFSEARCH]) && (
          <li>
            <Link to={Constants.URLConstants.STAFFSEARCH} className="dropdown-item">
              Staff List
            </Link>
          </li>
        )}
        {hasPermission(accessRoutes) && (
          <li>
            <Link to="#" className="dropdown-item">
              Access <i className="fa-solid fa-angle-right fa--2xl"></i>
            </Link>
            <ul className="dropdown-menu dropdown-submenu" id="accountsub1">
              {hasPermission([Constants.URLConstants.STAFFACCESSROLES]) && (
                <li>
                  <Link to={Constants.URLConstants.STAFFACCESSROLES} className="dropdown-item">
                    Roles
                  </Link>
                </li>
              )}
              {hasPermission(["/rights"]) && (
                <li>
                  <Link to="/rights" className="dropdown-item">
                    Rights
                  </Link>
                </li>
              )}
            </ul>
          </li>
        )}
       
      </ul>
    </div>
  );
};

export default Staffs;