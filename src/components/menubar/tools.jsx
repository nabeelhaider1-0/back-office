import { Link } from "react-router-dom";
import Constants from "../../constants/routes";
import { isRoutePermitted } from "../../authUtils"; // Import utility function

const Tools = ({ permittedItems, isSuperAdmin = false }) => {
  // Helper function to check if a menu item or its sub-items are permitted
  const hasPermission = (routePaths) => {
    return (
      isSuperAdmin ||
      routePaths.some((path) => isRoutePermitted(permittedItems, path))
    );
  };

  // Define route groups for sub-menus
  const revenueProfileRoutes = [
    "/markup-profiles",
    "/discount-profiles",
    "/markup-discount/parameters",
  ];
  const mappingCountryRoutes = [
    Constants.URLConstants.TOOLSMAPPINGCOUNTRIESMANUAL,
    Constants.URLConstants.TOOLSMAPPINGCOUNTRIESAUTO,
  ];
  // const mappingCityRoutes = [
  //   Constants.URLConstants.TOOLSMAPPINGCITIESMANUAL,
  //   Constants.URLConstants.TOOLSMAPPINGCITIESAUTO,
  // ];
  const mappingOfflineSupplierRoutes = [
    Constants.URLConstants.TOOLSMAPPINGOFFLINESUPPLIERSHOTEL,
    Constants.URLConstants.TOOLSMAPPINGOFFLINESUPPLIERSTRANSFER,
    Constants.URLConstants.TOOLSMAPPINGOFFLINESUPPLIERSTOURANDACTIVITIES,
  ];
  // const transactionLimitRoutes = [
  //   Constants.URLConstants.TOOLSPERTRANSACTION,
  //   Constants.URLConstants.TOOLSTOTALTRANSACTION,
  // ];

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
        <b>MANAGEMENT TOOLS</b>
        <i className="fa-solid fa-angle-down"></i>
      </Link>

      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuLink"
        id="dripmenu"
      >
        {/* Exchange Rates */}
        {hasPermission(["/exchange-rates"]) && (
          <li>
            <Link className="dropdown-item" to="/exchange-rates">
              Exchange Rates
            </Link>
          </li>
        )}

        {/* Add Lead Time
        {hasPermission([Constants.URLConstants.TOOLSADDLEAPTIME]) && (
          <li>
            <Link
              className="dropdown-item"
              to={Constants.URLConstants.TOOLSADDLEAPTIME}
            >
              Add Lead Time
            </Link>
          </li>
        )} */}

        {/* Mapping */}
        {/* {hasPermission([
          ...mappingCountryRoutes,
          ...mappingCityRoutes,
          Constants.URLConstants.TOOLSMAPPINGHOTELS,
          Constants.URLConstants.TOOLSMAPPINGNATIONALITIESREPORT,
          ...mappingOfflineSupplierRoutes,
        ]) && (
          <li>
            <Link className="dropdown-item" href="#">
              Mapping <i className="fa-solid fa-angle-right fa--2xl"></i>
            </Link>
            <ul className="dropdown-menu dropdown-submenu" id="mappingsub">
              {hasPermission(mappingCountryRoutes) && (
                <li>
                  <Link className="dropdown-item" href="#">
                    Countries{" "}
                    <i className="fa-solid fa-angle-right fa--2xl"></i>
                  </Link>
                  <ul className="dropdown-menu dropdown-submenu" id="agentsub">
                    {hasPermission([
                      Constants.URLConstants.TOOLSMAPPINGCOUNTRIESMANUAL,
                    ]) && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to={
                            Constants.URLConstants.TOOLSMAPPINGCOUNTRIESMANUAL
                          }
                        >
                          Manual
                        </Link>
                      </li>
                    )}
                    {hasPermission([
                      Constants.URLConstants.TOOLSMAPPINGCOUNTRIESAUTO,
                    ]) && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to={Constants.URLConstants.TOOLSMAPPINGCOUNTRIESAUTO}
                        >
                          Auto
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
              )}
              {hasPermission(mappingCityRoutes) && (
                <li>
                  <Link className="dropdown-item" href="#">
                    Cities <i className="fa-solid fa-angle-right fa--2xl"></i>
                  </Link>
                  <ul className="dropdown-menu dropdown-submenu">
                    {hasPermission([
                      Constants.URLConstants.TOOLSMAPPINGCITIESMANUAL,
                    ]) && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to={Constants.URLConstants.TOOLSMAPPINGCITIESMANUAL}
                        >
                          Manual
                        </Link>
                      </li>
                    )}
                    {hasPermission([
                      Constants.URLConstants.TOOLSMAPPINGCITIESAUTO,
                    ]) && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to={Constants.URLConstants.TOOLSMAPPINGCITIESAUTO}
                        >
                          Auto
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
              )}
              {hasPermission([Constants.URLConstants.TOOLSMAPPINGHOTELS]) && (
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.TOOLSMAPPINGHOTELS}
                  >
                    Hotels
                  </Link>
                </li>
              )}
              {hasPermission([
                Constants.URLConstants.TOOLSMAPPINGNATIONALITIESREPORT,
              ]) && (
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.TOOLSMAPPINGNATIONALITIESREPORT}
                  >
                    Nationalities
                  </Link>
                </li>
              )}
              {hasPermission(mappingOfflineSupplierRoutes) && (
                <li>
                  <Link className="dropdown-item" href="#">
                    Offline Suppliers{" "}
                    <i className="fa-solid fa-angle-right fa--2xl"></i>
                  </Link>
                  <ul
                    className="dropdown-menu dropdown-submenu"
                    id="exchangesub"
                  >
                    {hasPermission([
                      Constants.URLConstants.TOOLSMAPPINGOFFLINESUPPLIERSHOTEL,
                    ]) && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to={
                            Constants.URLConstants
                              .TOOLSMAPPINGOFFLINESUPPLIERSHOTEL
                          }
                        >
                          Hotel
                        </Link>
                      </li>
                    )}
                    {hasPermission([
                      Constants.URLConstants
                        .TOOLSMAPPINGOFFLINESUPPLIERSTRANSFER,
                    ]) && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to={
                            Constants.URLConstants
                              .TOOLSMAPPINGOFFLINESUPPLIERSTRANSFER
                          }
                        >
                          Transfer
                        </Link>
                      </li>
                    )}
                    {hasPermission([
                      Constants.URLConstants
                        .TOOLSMAPPINGOFFLINESUPPLIERSTOURANDACTIVITIES,
                    ]) && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to={
                            Constants.URLConstants
                              .TOOLSMAPPINGOFFLINESUPPLIERSTOURANDACTIVITIES
                          }
                        >
                          Tour & Activities
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
              )}
            </ul>
          </li>
        )} */}

        {/* Transaction Limits */}
        {/* {hasPermission(transactionLimitRoutes) && (
          <li>
            <Link className="dropdown-item" href="#">
              Transaction Limits{" "}
              <i className="fa-solid fa-angle-right fa--2xl"></i>
            </Link>
            <ul className="dropdown-menu dropdown-submenu" id="transsub">
              {hasPermission([Constants.URLConstants.TOOLSPERTRANSACTION]) && (
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.TOOLSPERTRANSACTION}
                  >
                    Per Transaction
                  </Link>
                </li>
              )}
              {hasPermission([
                Constants.URLConstants.TOOLSTOTALTRANSACTION,
              ]) && (
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.TOOLSTOTALTRANSACTION}
                  >
                    Total
                  </Link>
                </li>
              )}
            </ul>
          </li>
        )} */}
        {/* Content Management */}
        {hasPermission([
          Constants.URLConstants.TOOLSGEOGRAPHICALCONTENTCOUNTRIESADD,
        ]) && (
          <li>
            <Link className="dropdown-item" href="#">
              Hotel Management{" "}
              <i className="fa-solid fa-angle-right fa--2xl"></i>
            </Link>
            <ul className="dropdown-menu dropdown-submenu" id="subscribersub">
              {hasPermission(mappingCountryRoutes) && (
                <li>
                  <Link className="dropdown-item" href="#">
                    Geographical Content{" "}
                    <i className="fa-solid fa-angle-right fa--2xl"></i>
                  </Link>
                  <ul className="dropdown-menu dropdown-submenu" id="agentsub">
                    {hasPermission([
                      Constants.URLConstants.TOOLSMAPPINGCOUNTRIESMANUAL,
                    ]) && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to={
                            Constants.URLConstants
                              .TOOLSGEOGRAPHICALCONTENTCOUNTRIESADD
                          }
                        >
                          Countries
                        </Link>
                      </li>
                    )}
                    {hasPermission([
                      Constants.URLConstants.TOOLSMAPPINGCOUNTRIESAUTO,
                    ]) && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to={
                            Constants.URLConstants
                              .TOOLSGEOGRAPHICALCONTENTCITIESADD
                          }
                        >
                          Cities
                        </Link>
                      </li>
                    )}
                    {hasPermission([
                      Constants.URLConstants.TOOLSMAPPINGCOUNTRIESAUTO,
                    ]) && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to={
                            Constants.URLConstants
                              .TOOLSGEOGRAPHICALCONTENTCONTINENTSADD
                          }
                        >
                          Continent
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
              )}
              {hasPermission(mappingOfflineSupplierRoutes) && (
                <li>
                  <Link className="dropdown-item" href="#">
                    Hotels Content{" "}
                    <i className="fa-solid fa-angle-right fa--2xl"></i>
                  </Link>
                  <ul
                    className="dropdown-menu dropdown-submenu"
                    id="suppliersofflinesub"
                  >
                    {hasPermission([
                      Constants.URLConstants.TOOLSMAPPINGOFFLINESUPPLIERSHOTEL,
                    ]) && (
                      <li>
                        <Link className="dropdown-item" href="menuitem.html">
                          Hotels{" "}
                          <i className="fa-solid fa-angle-right fa--2xl"></i>
                        </Link>
                        <ul
                          className="dropdown-menu dropdown-submenu"
                          id="agentsub"
                        >
                          <li>
                            <Link
                              className="dropdown-item"
                              to={Constants.URLConstants.MASTERSHOTELSNEW}
                            >
                              Add
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              to={Constants.URLConstants.MASTERSHOTELSSEARCH}
                            >
                              View
                            </Link>
                          </li>

                          <li>
                            <Link
                              className="dropdown-item"
                              href="menuitem.html"
                            >
                              Facilities{" "}
                              <i className="fa-solid fa-angle-right fa--2xl"></i>
                            </Link>
                            <ul
                              className="dropdown-menu dropdown-submenu"
                              id="mappingggsub"
                            >
                              <li>
                                <Link
                                  className="dropdown-item"
                                  to={
                                    Constants.URLConstants
                                      .MASTERSHOTELAMENITIESNEW
                                  }
                                >
                                  Add
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="dropdown-item"
                                  to={
                                    Constants.URLConstants
                                      .MASTERSHOTELAMENITIESSEARCH
                                  }
                                >
                                  View
                                </Link>
                              </li>
                            </ul>
                          </li>
                          {/* <li>
                          <Link className="dropdown-item" href="#">
                            Locations <i className="fa-solid fa-angle-right fa--2xl"></i>
                          </Link>
                          <ul className="dropdown-menu dropdown-submenu" id="mappinggsub">
                            <li>
                              <Link
                                className="dropdown-item"
                                to={Constants.URLConstants.MASTERSHOTELLOCATIONNEW}
                              >
                                Add
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item"
                                to={Constants.URLConstants.MASTERSHOTELLOCATIONSEARCH}
                              >
                                View
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="menuitem.html">
                            Room View <i className="fa-solid fa-angle-right fa--2xl"></i>
                          </Link>
                          <ul className="dropdown-menu dropdown-submenu" id="exchangesub">
                            <li>
                              <Link
                                className="dropdown-item"
                                to={Constants.URLConstants.MASTERSROOMVIEWNEW}
                              >
                                Add
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item"
                                to={Constants.URLConstants.MASTERSROOMVIEWSEARCH}
                              >
                                View
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="menuitem.html">
                            Room Category{" "}
                            <i className="fa-solid fa-angle-right fa--2xl"></i>
                          </Link>
                          <ul className="dropdown-menu dropdown-submenu" id="trxsub">
                            <li>
                              <Link
                                className="dropdown-item"
                                to={Constants.URLConstants.MASTERSROOMCATEGORYNEW}
                              >
                                Add
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item"
                                to={Constants.URLConstants.MASTERSROOMCATEGORYSEARCH}
                              >
                                View
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="menuitem.html">
                            Inventory Room Category{" "}
                            <i className="fa-solid fa-angle-right fa--2xl"></i>
                          </Link>
                          <ul className="dropdown-menu dropdown-submenu" id="suppsub">
                            <li>
                              <Link
                                className="dropdown-item"
                                to={Constants.URLConstants.MASTERSINVENTORYROOMCATEGORYNEW}
                              >
                                Add
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item"
                                to={
                                  Constants.URLConstants.MASTERSINVENTORYROOMCATEGORYSEARCH
                                }
                              >
                                View
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="menuitem.html">
                            Meal Basis <i className="fa-solid fa-angle-right fa--2xl"></i>
                          </Link>
                          <ul className="dropdown-menu dropdown-submenu" id="mealsub">
                            <li>
                              <Link
                                className="dropdown-item"
                                to={Constants.URLConstants.MASTERSHOTELSMEALBASISNEW}
                              >
                                Add
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item"
                                to={Constants.URLConstants.MASTERSHOTELSMEALBASISSEARCH}
                              >
                                View
                              </Link>
                            </li>
                          </ul>
                        </li> */}
                          {/* <li>
                          <Link className="dropdown-item" href="menuitem.html">
                            Preferred <i className="fa-solid fa-angle-right fa--2xl"></i>
                          </Link>
                          <ul
                            className="dropdown-menu dropdown-submenu"
                            id="preferedhotelmenu"
                          >
                            <li>
                              <Link
                                className="dropdown-item"
                                to={Constants.URLConstants.MASTERSHOTELSPREFEREDNEW}
                              >
                                Add
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item"
                                to={Constants.URLConstants.MASTERSHOTELSPREFEREDSEARCH}
                              >
                                View
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link className="dropdown-item" href="menuitem.html">
                            Special Requests{" "}
                            <i className="fa-solid fa-angle-right fa--2xl"></i>
                          </Link>
                          <ul
                            className="dropdown-menu dropdown-submenu"
                            id="specialrequestssubmenu"
                          >
                            <li>
                              <Link
                                className="dropdown-item"
                                to={Constants.URLConstants.MASTERSHOTELSSPECIALREQUESTNEW}
                              >
                                Add
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item"
                                to={
                                  Constants.URLConstants.MASTERSHOTELSSPECIALREQUESTSEARCH
                                }
                              >
                                View
                              </Link>
                            </li>
                          </ul>
                        </li> */}
                        </ul>
                      </li>
                    )}
                    {/* {hasPermission([
                      Constants.URLConstants
                        .TOOLSMAPPINGOFFLINESUPPLIERSTRANSFER,
                    ]) && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to={
                            Constants.URLConstants
                              .TOOLSMAPPINGOFFLINESUPPLIERSTRANSFER
                          }
                        >
                          Transfer
                        </Link>
                      </li>
                    )} */}
                    {/* {hasPermission([
                      Constants.URLConstants
                        .TOOLSMAPPINGOFFLINESUPPLIERSTOURANDACTIVITIES,
                    ]) && (
                      <li>
                        <Link
                          className="dropdown-item"
                          to={
                            Constants.URLConstants
                              .TOOLSMAPPINGOFFLINESUPPLIERSTOURANDACTIVITIES
                          }
                        >
                          Tour & Activities
                        </Link>
                      </li>
                    )} */}
                  </ul>
                </li>
              )}
            </ul>
          </li>
        )}

        {/* Rewards Delivery */}
        {/* {hasPermission([Constants.URLConstants.TOOLSREWARDSDELIVERY]) && (
          <li>
            <Link
              className="dropdown-item"
              to={Constants.URLConstants.TOOLSREWARDSDELIVERY}
            >
              Rewards Delivery
            </Link>
          </li>
        )} */}
        <li>
          <Link className="dropdown-item" to={"/airports"}>
            Airport Management
          </Link>
        </li>
        <li>
          <Link
            to={Constants.URLConstants.APISCONFIGURATION}
            className="dropdown-item"
          >
            Supplier Management
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href="menuitem.html">
            Payment Gateway Management{" "}
            <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="exchangesub">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.MASTERSPAYMENTNEW}
              >
                Add
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.MASTERSPAYMENTSEARCH}
              >
                View
              </Link>
            </li>
          </ul>
        </li>
        {/* <li>
          <Link className="dropdown-item" href="menuitem.html">
            Mark-Up Profiles <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="geographicalsub">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.MASTERSMARKUPPROFILENEW}
              >
                Add
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.MASTERSMARKUPPROFILESEARCH}
              >
                View
              </Link>
            </li>
          </ul>
        </li> */}
        <li>
          <Link to={""} className="dropdown-item">
            Email management <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="geographicalsub">
            <li>
              <Link to={"/email/configuration"} className="dropdown-item">
                Settings
              </Link>
            </li>
            <li>
              <Link to={"/email/templates"} className="dropdown-item">
                Template
              </Link>
            </li>
            <li>
              <Link to={"/email/logs"} className="dropdown-item">
                Notification Logs
              </Link>
            </li>
          </ul>
        </li>
        {/* Revenue Profiles */}
        {hasPermission(revenueProfileRoutes) && (
          <li>
            <Link className="dropdown-item" href="#">
              Revenue Profiles{" "}
              <i className="fa-solid fa-angle-right fa--2xl"></i>
            </Link>
            <ul
              className="dropdown-menu dropdown-submenu"
              id="extranetcontractssub"
            >
              <li>
                <Link className="dropdown-item" href="#">
                  Profiles <i className="fa-solid fa-angle-right fa--2xl"></i>
                </Link>
                <ul className="dropdown-menu dropdown-submenu" id="agentsub">
                  {hasPermission(["/markup-profiles"]) && (
                    <li>
                      <Link className="dropdown-item" to="/markup-profiles">
                        Markup Profiles
                      </Link>
                    </li>
                  )}
                  {hasPermission(["/discount-profiles"]) && (
                    <li>
                      <Link className="dropdown-item" to="/discount-profiles">
                        Discount Profiles
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
              {hasPermission(["/markup-discount/parameters"]) && (
                <li>
                  <Link
                    className="dropdown-item"
                    to="/markup-discount/parameters"
                  >
                    Parameters
                  </Link>
                </li>
              )}
            </ul>
          </li>
        )}

        {/* Preset Text */}
        {/* {hasPermission([Constants.URLConstants.TOOLSPRESETTEXT]) && (
          <li>
            <Link
              className="dropdown-item"
              to={Constants.URLConstants.TOOLSPRESETTEXT}
            >
              Preset Text
            </Link>
          </li>
        )} */}
      </ul>
    </div>
  );
};

export default Tools;
