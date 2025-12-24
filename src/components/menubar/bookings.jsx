import { Link } from "react-router-dom";
import Constants from "../../constants/routes";
import { isRoutePermitted } from "../../authUtils";

const Bookings = ({ permittedItems, isSuperAdmin = false }) => {
  const hasPermission = (routePaths) => {
    return (
      isSuperAdmin ||
      routePaths.some((path) => isRoutePermitted(permittedItems, path))
    );
  };

  // const addBookingRoutes = [
  //   Constants.URLConstants.BOOKINGSNEWONLINEBOOKING,
  //   Constants.URLConstants.BOOKINGSADDOFFLINEHOTELS,
  //   Constants.URLConstants.BOOKINGSADDOFFLINEFLIGHT,
  //   Constants.URLConstants.BOOKINGSADDOFFLINETRANSFER,
  //   Constants.URLConstants.BOOKINGSNEWOFFLINEBOOKINGTOUR,
  //   Constants.URLConstants.BOOKINGSADDOFFLINEMISC,
  //   Constants.URLConstants.BOOKINGSADDOFFLINEGROUPBOOKING,
  // ];
  // const reconciliationRoutes = [
  //   Constants.URLConstants.BOOKINGSRECONCILATIONMANUALFLIGHTS,
  //   Constants.URLConstants.BOOKINGSRECONCILATIONMANUAL,
  //   Constants.URLConstants.BOOKINGSRECONCILATIONAUTO,
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
        <b>BOOKINGS</b> <i className="fa-solid fa-angle-down"></i>
      </Link>
      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuLink"
        id="dripmenu"
      >
        {hasPermission([Constants.URLConstants.SERACHBOOKINGS]) && (
          <li>
            <Link
              to={Constants.URLConstants.SERACHBOOKINGS}
              className="dropdown-item"
            >
              View Bookings
            </Link>
          </li>
        )}
        {hasPermission(["/transactions"]) && (
          <li>
            <Link to={"/transactions"} className="dropdown-item">
              Transactions
            </Link>
          </li>
        )}
        {hasPermission([Constants.URLConstants.BOOKINGSNEWONLINEBOOKING]) && (
          <li>
            <Link
              to={Constants.URLConstants.BOOKINGSNEWONLINEBOOKING}
              className="dropdown-item"
            >
              Add Offline Booking
            </Link>
          </li>
        )}
        {/* {hasPermission(addBookingRoutes) && (
          <li>
            <Link to="#" className="dropdown-item">
              Add Bookings <i className="fa-solid fa-angle-right fa--2xl"></i>
            </Link>
            <ul
              className="dropdown-menu dropdown-submenu"
              id="addBookingsSubmenu"
            >
              {hasPermission([
                Constants.URLConstants.BOOKINGSNEWONLINEBOOKING,
              ]) && (
                <li>
                  <Link
                    to={Constants.URLConstants.BOOKINGSNEWONLINEBOOKING}
                    className="dropdown-item"
                  >
                    Add Offline Booking
                  </Link>
                </li>
              )} */}

        {/* {hasPermission([
                Constants.URLConstants.BOOKINGSADDOFFLINEHOTELS,
                Constants.URLConstants.BOOKINGSADDOFFLINEFLIGHT,
                Constants.URLConstants.BOOKINGSADDOFFLINETRANSFER,
                Constants.URLConstants.BOOKINGSNEWOFFLINEBOOKINGTOUR,
                Constants.URLConstants.BOOKINGSADDOFFLINEMISC,
                Constants.URLConstants.BOOKINGSADDOFFLINEGROUPBOOKING,
              ]) && (
                <li>
                  <Link to={Constants.URLConstants.ADDMENU} className="dropdown-item">
                    Add Offline Booking <i className="fa-solid fa-angle-right fa--2xl"></i>
                  </Link>
                  <ul className="dropdown-menu dropdown-submenu" id="subscribersub">
                    {hasPermission([Constants.URLConstants.BOOKINGSADDOFFLINEHOTELS]) && (
                      <li>
                        <Link to={Constants.URLConstants.BOOKINGSADDOFFLINEHOTELS} className="dropdown-item">
                          Hotels
                        </Link>
                      </li>
                    )}
                    {hasPermission([Constants.URLConstants.BOOKINGSADDOFFLINEFLIGHT]) && (
                      <li>
                        <Link to={Constants.URLConstants.BOOKINGSADDOFFLINEFLIGHT} className="dropdown-item">
                          Flights
                        </Link>
                      </li>
                    )}
                    {hasPermission([Constants.URLConstants.BOOKINGSADDOFFLINETRANSFER]) && (
                      <li>
                        <Link to={Constants.URLConstants.BOOKINGSADDOFFLINETRANSFER} className="dropdown-item">
                          Transfer
                        </Link>
                      </li>
                    )}
                    {hasPermission([Constants.URLConstants.BOOKINGSNEWOFFLINEBOOKINGTOUR]) && (
                      <li>
                        <Link to={Constants.URLConstants.BOOKINGSNEWOFFLINEBOOKINGTOUR} className="dropdown-item">
                          Tour
                        </Link>
                      </li>
                    )}
                    {hasPermission([Constants.URLConstants.BOOKINGSADDOFFLINEMISC]) && (
                      <li>
                        <Link to={Constants.URLConstants.BOOKINGSADDOFFLINEMISC} className="dropdown-item">
                          Misc Services
                        </Link>
                      </li>
                    )}
                    {hasPermission([Constants.URLConstants.BOOKINGSADDOFFLINEGROUPBOOKING]) && (
                      <li>
                        <Link to={Constants.URLConstants.BOOKINGSADDOFFLINEGROUPBOOKING} className="dropdown-item">
                          Groups
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
              )} */}
        {/* </ul>
          </li>
        )} */}
        {/* {hasPermission(reconciliationRoutes) && (
          <li>
            <Link to={Constants.URLConstants.ADDMENU} className="dropdown-item">
              Reconciliation <i className="fa-solid fa-angle-right fa--2xl"></i>
            </Link>
            <ul className="dropdown-menu dropdown-submenu" id="mappingggsub">
              {hasPermission([Constants.URLConstants.BOOKINGSRECONCILATIONMANUALFLIGHTS]) && (
                <li>
                  <Link to={Constants.URLConstants.BOOKINGSRECONCILATIONMANUALFLIGHTS} className="dropdown-item">
                    Manual Flights
                  </Link>
                </li>
              )}
              {hasPermission([Constants.URLConstants.BOOKINGSRECONCILATIONMANUAL]) && (
                <li>
                  <Link to={Constants.URLConstants.BOOKINGSRECONCILATIONMANUAL} className="dropdown-item">
                    Manual
                  </Link>
                </li>
              )}
              {hasPermission([Constants.URLConstants.BOOKINGSRECONCILATIONAUTO]) && (
                <li>
                  <Link to={Constants.URLConstants.BOOKINGSRECONCILATIONAUTO} className="dropdown-item">
                    Auto
                  </Link>
                </li>
              )}
            </ul>
          </li>
        )} */}
      </ul>
    </div>
  );
};

export default Bookings;
