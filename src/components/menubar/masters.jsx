import { Link } from "react-router-dom";
import Constants from "../../constants/routes";

const Masters = () => {
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
        <b>SERVICES</b>
        <i className="fa-solid fa-angle-down"></i>
      </Link>

      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuLink"
        id="dripmenu"
      >
        {/* <li>
          <Link className="dropdown-item" href="menuitem.html">
            Flights <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="agentsub">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.ADMINLOCK}
              >
                Flight Rules <i className="fa-solid fa-angle-right fa--2xl"></i>
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
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.ADMINLOCK}
              >
                Flight PCC <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu">
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.FLIGHTFLIGHTPCCADDRULES}
                  >
                    Add
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
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.ADMINLOCK}
              >
                Flight QCT Rules{" "}
                <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="mappingsub">
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.FLIGHTFLIGHTQCTADDRULES}
                  >
                    Add
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
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.ADMINLOCK}
              >
                Flight Cancellation Rules{" "}
                <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="mappinggsub">
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.FLIGHTFLIGHTCANCELLATIONADDRULES}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants.FLIGHTFLIGHTCANCELLATIONSEARCHRULES
                    }
                  >
                    View
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li> */}
        <li>
          <Link className="dropdown-item" href="menuitem.html">
            Extranet <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="agentsub">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.HOTELSEXTRANETDASHBOARD}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.MASTERSHOTELSIMPORTS}
              >
                Import Hotels
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.HOTELSEXTRANETREADINESSLIST}
              >
                Hotel Publish Readiness
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="menuitem.html">
                Hotels <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul
                className="dropdown-menu dropdown-submenu"
                id="extranethotelsub"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETADD}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETLIST}
                  >
                    View
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="dropdown-item" href="menuitem.html">
                Rooms <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul
                className="dropdown-menu dropdown-submenu"
                id="extranetroomssub"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETROOMSADD}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETROOMSLIST}
                  >
                    View
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link className="dropdown-item" href="menuitem.html">
                Seasons <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul
                className="dropdown-menu dropdown-submenu"
                id="extranetseasonssub"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETSEASONSADD}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETSEASONSLIST}
                  >
                    View
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                Contracts <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul
                className="dropdown-menu dropdown-submenu"
                id="extranetcontractssub"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETCONTRACTSADD}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETCONTRACTSLIST}
                  >
                    View
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                Rates <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul
                className="dropdown-menu dropdown-submenu"
                id="extranetratessub"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETRATESADD}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETRATESLIST}
                  >
                    View
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                Allotments <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul
                className="dropdown-menu dropdown-submenu"
                id="extranetallotmentssub"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETALLOTMENTSADD}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETALLOTMENTSLIST}
                  >
                    View
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                Restrictions <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul
                className="dropdown-menu dropdown-submenu"
                id="extranetrestrictionssub"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETRESTRICTIONSADD}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETRESTRICTIONSLIST}
                  >
                    View
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                Blackouts <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul
                className="dropdown-menu dropdown-submenu"
                id="extranetblackoutssub"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETBLACKOUTSADD}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETBLACKOUTSLIST}
                  >
                    View
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                Promotions <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul
                className="dropdown-menu dropdown-submenu"
                id="extranetpromotionssub"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETPROMOTIONSADD}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETPROMOTIONSLIST}
                  >
                    View
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link className="dropdown-item" href="#">
                Media <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul
                className="dropdown-menu dropdown-submenu"
                id="extranetmediasub"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETMEDIAADD}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.HOTELSEXTRANETMEDIALIST}
                  >
                    View
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        {/* <li>
          <Link className="dropdown-item" href="menuitem.html">
            Transfers <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="toper80sub">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.MASTERSTRANSFERSNEW}
              >
                Add
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.MASTERSTRANSFERSSEARCH}
              >
                View
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="menuitem.html">
                Locations <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="accountsub">
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.MASTERSTRANSFERSLOCATIONSNEW}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.MASTERSTRANSFERSLOCATIONSSEARCH}
                  >
                    View
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.ADDMENU}
              >
                Vehicle Type <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul
                className="dropdown-menu dropdown-submenu"
                id="vehiclesubtype"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.MASTERSVEHICLESTYPENEW}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.MASTERSVEHICLESTYPESEARCH}
                  >
                    View
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li> */}
        {/* <li>
          <Link className="dropdown-item" href="menuitem.html">
            Tours & Activities{" "}
            <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="mappinggsub">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.MASTERSTOURSANDACTIVITIESNEW}
              >
                Add
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.MASTERSTOURSANDACTIVITIESSEARCH}
              >
                View
              </Link>
            </li>
          </ul>
        </li> */}
        {/* <li>
          <Link className="dropdown-item" href="menuitem.html">
            Visa <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="mappinggsub">
            <li>
              <Link
                className="dropdown-item"
                href="VisaVisaCategorySearch.html"
              >
                Category <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="agentsub">
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.VISAADDCATEGORY}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.VISASEARCHCATEGORY}
                  >
                    View
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.VISASERACHVISAREQUESTS}
              >
                Visa Request
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="menuitem.html">
                Visa Rates <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="accountsub">
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.VISAADDSUPPLIERVISARATES}
                  >
                    Add Supplier Visa Rates
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.VISASEARCHSUPPLIERVISARATES}
                  >
                    View Supplier Visa RatesX
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.VISANEWVISAOFFLINEBOOKING}
              >
                Add Offline Visa Booking
              </Link>
            </li>
          </ul>
        </li> */}
        {/* <li>
          <Link className="dropdown-item" href="menuitem.html">
            Suppliments <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="toper166">
            <li>
              <Link className="dropdown-item" href="menuitem.html">
                Hotels <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="top-10">
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.MASTERSSUPPLIEMENTSHOTELNEW}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.MASTERSSUPPLIEMENTSHOTELSEARCH}
                  >
                    View
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li> */}
        {/* <li>
          <Link
            className="dropdown-item"
            to={Constants.URLConstants.MASTERSPREFEREDCITIES}
          >
            Preferred Cities
          </Link>
        </li> */}

        {/* <li>
          <Link className="dropdown-item" href="menuitem.html">
            Market Profiles <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="paysub">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.ADMINLOCK2}
              >
                Add
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.ADMINLOCK2}
              >
                View
              </Link>
            </li>
          </ul>
        </li> */}

        {/* <li>
          <Link className="dropdown-item">
            Currencies <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="pkgsubmenu">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.MASTERSCURRENCIESNEW}
              >
                Add
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.MASTERSCURRENCIESSEARCH}
              >
                View
              </Link>
            </li>
          </ul>
        </li> */}
        {/* <li>
          <Link className="dropdown-item">
            Packages <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="pkgsubmenu1">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.MASTERSPACKAGESADD}
              >
                Add
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.MASTERSPACKAGESSEARCH}
              >
                View
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link
            className="dropdown-item"
            to={Constants.URLConstants.ADMINLOCK2}
          >
            Dhisco Hotel Activation
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href="menuitem.html">
            Loyalty Program <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="loyaltysub">
            <li>
              <Link className="dropdown-item" href="menuitem.html">
                Tiers <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="agentsub">
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.MASTERSLOYALITYPROGRAMTIERSNEW}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants.MASTERSLOYALITYPROGRAMTIERSSEARCH
                    }
                  >
                    View
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="dropdown-item" href="menuitem.html">
                Rewards <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="">
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.MASTERSLOYALITYPROGRAMREWARDSNEW}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants.MASTERSLOYALITYPROGRAMREWARDSSEARCH
                    }
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
export default Masters;
