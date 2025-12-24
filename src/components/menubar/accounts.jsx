import React from "react";
import { Link } from "react-router-dom";
import Constants from "../../constants/routes";
const Accounts = () => {
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
        <b>ACCOUNTS</b>
        <i className="fa-solid fa-angle-down"></i>
      </Link>

      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuLink"
        id="dripmenu"
      >
        <li>
          <Link className="dropdown-item" to={Constants.URLConstants.ADMINLOCK}>
            Agents <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="agentsub">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.ADMINLOCK}
              >
                Receipts <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="agentsub">
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.ACCOUNTSAGENTRECIEPTNEW}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.ACCOUNTSAGENTRECIEPTSEARCH}
                  >
                    View
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.ACCOUNTSAGENTRECIEPTBOOKINGID}
                  >
                    By Booking Id
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.ADMINLOCK}
              >
                Credit Notes <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="agentsub">
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.ACCOUNTSAGENTCREDITNEW}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.ACCOUNTSAGENTCREDITSEARCH}
                  >
                    View
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.ACCOUNTSAGENTCREDITBOOKINGID}
                  >
                    By Booking Id
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.ADMINLOCK}
              >
                Debit Notes
                <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="agentsub">
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.ACCOUNTSAGENTDEBITNEW}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.ACCOUNTSAGENTDEBITSEARCH}
                  >
                    View
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.ACCOUNTSAGENTDEBITBOOKINGID}
                  >
                    By Booking Id
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <Link className="dropdown-item" to={Constants.URLConstants.ADMINLOCK}>
            Tax Setup<i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.ADMINLOCK}
              >
                Tax Master <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="agentsub">
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.ACCOUNTSTAXSETUPTAXMASTERNEW}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.ACCOUNTSTAXSETUPTAXMASTERSEARCH}
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
                Tax Configuration{" "}
                <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="agentsub">
                <li>
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants.ACCOUNTSTAXSETUPTAXCONFUGRATIONNEW
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
                        .ACCOUNTSTAXSETUPTAXCONFUGRATIONSEARCH
                    }
                  >
                    View
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <Link className="dropdown-item" to={Constants.URLConstants.ADMINLOCK}>
            Suppliers <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="accountsub">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.ADMINLOCK}
              >
                Payments <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="agentsub">
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.ACCOUNTSSUPPLIERSPAYMENTNEW}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.ACCOUNTSSUPPLIERSPAYMENTSEARCH}
                  >
                    View
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants.ACCOUNTSSUPPLIERSPAYMENTBOOKINGBYID
                    }
                  >
                    Payment By Booking Id
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
export default Accounts;
