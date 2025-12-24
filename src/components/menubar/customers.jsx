import { Link } from "react-router-dom";
import Constants from "../../constants/routes";
import { isRoutePermitted } from "../../authUtils";

const Customers = ({ permittedItems, isSuperAdmin = false }) => {
  const hasPermission = (routePaths) => {
    return (
      isSuperAdmin ||
      routePaths.some((path) => isRoutePermitted(permittedItems, path))
    );
  };

  // const b2bRoutes = [
  //   Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON,
  //   Constants.URLConstants.CUSTOMERSAGENTSNEW,
  //   Constants.URLConstants.CUSTOMERSAGENTSSEARCHUSERS,
  //   Constants.URLConstants.CUSTOMERSAGENTSADVANCEONLINESETTING,
  //   Constants.URLConstants.CUSTOMERSAGENTSADVANCEOFFLINESETTING,
  //   Constants.URLConstants.BOOKINGSREASSIGNBOOKING,
  // ];
  const b2cRoutes = [
    Constants.URLConstants.CUSTOMERSB2CSEARCH,
    // Constants.URLConstants.CUSTOMERSB2CNEW, // Commented out in original
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
        <b>USERS</b> <i className="fa-solid fa-angle-down"></i>
      </Link>
      <ul className="dropdown-menu" id="dripmenu">
        {/* {hasPermission(b2bRoutes) && (
          <li>
            <Link to="#" className="dropdown-item">
              B2B <i className="fa-solid fa-angle-right fa--2xl"></i>
            </Link>
            <ul className="dropdown-menu dropdown-submenu" id="agentsub">
              {hasPermission([Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON]) && (
                <li>
                  <Link to={Constants.URLConstants.CUSTOMERSAGENTSSEARCHBUTTON} className="dropdown-item">
                    View
                  </Link>
                </li>
              )}
              {hasPermission([Constants.URLConstants.CUSTOMERSAGENTSNEW]) && (
                <li>
                  <Link to={Constants.URLConstants.CUSTOMERSAGENTSNEW} className="dropdown-item">
                    Add
                  </Link>
                </li>
              )}
              {hasPermission([Constants.URLConstants.CUSTOMERSAGENTSSEARCHUSERS]) && (
                <li>
                  <Link to={Constants.URLConstants.CUSTOMERSAGENTSSEARCHUSERS} className="dropdown-item">
                    View Users
                  </Link>
                </li>
              )}
              {hasPermission([
                Constants.URLConstants.CUSTOMERSAGENTSADVANCEONLINESETTING,
                Constants.URLConstants.CUSTOMERSAGENTSADVANCEOFFLINESETTING,
              ]) && (
                <li>
                  <Link to="#" className="dropdown-item">
                    Advanced Settings <i className="fa fa-caret-right fa--2xl" />
                  </Link>
                  <ul className="dropdown-menu dropdown-submenu" id="mappinggsub">
                    {hasPermission([Constants.URLConstants.CUSTOMERSAGENTSADVANCEONLINESETTING]) && (
                      <li>
                        <Link to={Constants.URLConstants.CUSTOMERSAGENTSADVANCEONLINESETTING} className="dropdown-item">
                          Online Suppliers
                        </Link>
                      </li>
                    )}
                    {hasPermission([Constants.URLConstants.CUSTOMERSAGENTSADVANCEOFFLINESETTING]) && (
                      <li>
                        <Link to={Constants.URLConstants.CUSTOMERSAGENTSADVANCEOFFLINESETTING} className="dropdown-item">
                          Local Suppliers
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
              )}
              {hasPermission([Constants.URLConstants.BOOKINGSREASSIGNBOOKING]) && (
                <li>
                  <Link to={Constants.URLConstants.BOOKINGSREASSIGNBOOKING} className="dropdown-item">
                    User Exchange Booking
                  </Link>
                </li>
              )}
            </ul>
          </li>
        )} */}
        {hasPermission(b2cRoutes) && (
          <li>
            <Link
              to={Constants.URLConstants.CUSTOMERSB2CSEARCH}
              className="dropdown-item"
            >
              B2C
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Customers;
