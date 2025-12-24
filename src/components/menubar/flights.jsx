import { Link } from "react-router-dom";
import Constants from "../../constants/routes";
const Flights = () => {
  return (
    <div className="dropdown" id="menudropdown">
      <Link
        className="boxview dropdown-toggle"
        to="#"
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <b>FLIGHT</b>
        <i className="fa-solid fa-angle-down"></i>
      </Link>

      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuLink"
        id="dripmenu"
      >
        <li>
          <Link className="dropdown-item" to={Constants.URLConstants.ADMINLOCK}>
            Flight Rules <i className="fa fa-caret-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="agentsub">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.FLIGHTFLIGHTADDRULES}
              >
                Add Rules
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.FLIGHTFLIGHTSEARCHRULES}
              >
                View
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link className="dropdown-item" to={Constants.URLConstants.ADMINLOCK}>
            Flight Pcc <i className="fa fa-caret-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.FLIGHTFLIGHTPCCADDRULES}
              >
                Add{" "}
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.FLIGHTFLIGHTPCCSEARCHRULES}
              >
                View
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link className="dropdown-item" to={Constants.URLConstants.ADMINLOCK}>
            Flight Qct Rules <i className="fa fa-caret-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="mappingsub">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.FLIGHTFLIGHTQCTADDRULES}
              >
                Add{" "}
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.FLIGHTFLIGHTQCTSEARCHRULES}
              >
                View
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link className="dropdown-item" to={Constants.URLConstants.ADMINLOCK}>
            Flight Cancellation Rules{" "}
            <i className="fa fa-caret-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="mappinggsub">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.FLIGHTFLIGHTCANCELLATIONADDRULES}
              >
                Add{" "}
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.FLIGHTFLIGHTCANCELLATIONSEARCHRULES}
              >
                View
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
export default Flights;
