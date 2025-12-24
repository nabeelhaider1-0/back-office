import { Link } from "react-router-dom";
import Constants from "../../constants/routes";

const Reports = () => {
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
        <b> REPORTS</b>
        <i className="fa-solid fa-angle-down"></i>
      </Link>

      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuLink"
        id="dripmenu"
      >
        <li>
          {" "}
          <Link className="dropdown-item" to={Constants.URLConstants.ADMINLOCK}>
            Management <i className="fa-solid fa-angle-right fa--2xl"></i>{" "}
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="agentsub">
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.ADMINLOCK}
              >
                Business <i className="fa-solid fa-angle-right fa--2xl"></i>{" "}
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="agentsub">
                <li>
                  {" "}
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.REPORTSMANAGEMENTBUISNESSBYAGENT}
                  >
                    By Agent{" "}
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.REPORTSMANAGEMENTBUISNESSBYHOTEL}
                  >
                    By Hotel{" "}
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.REPORTSMANAGEMENTBUISNESSBYCITY}
                  >
                    By City{" "}
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants.REPORTSMANAGEMENTBUISNESSBYCOUNTRY
                    }
                  >
                    By Country{" "}
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants
                        .REPORTSMANAGEMENTBUISNESSBYONLINESUPPLIER
                    }
                  >
                    By Online Supplier{" "}
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants
                        .REPORTSMANAGEMENTBUISNESSBYOFFLINESUPPLIER
                    }
                  >
                    By Offline Supplier{" "}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.ADMINLOCK}
              >
                Booking By Supplier{" "}
                <i className="fa-solid fa-angle-right fa--2xl"></i>{" "}
              </Link>
              <ul className="dropdown-menu dropdown-submenu">
                <li>
                  {" "}
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants
                        .REPORTSMANAGEMENTBOOKINGBYSUPPLIERBYSTATUS
                    }
                  >
                    By Status{" "}
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants
                        .REPORTSMANAGEMENTBOOKINGBYSUPPLIERBYNIGHTS
                    }
                  >
                    By Nights{" "}
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants
                        .REPORTSMANAGEMENTBOOKINGBYSUPPLIERBYPROFILE
                    }
                  >
                    By Supplier Profile{" "}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSMANAGEMENTSALESMANAGERREPORT}
              >
                Sales Manager{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSMANAGEMENTSALESCOMPARISON}
              >
                Sales Comparison{" "}
              </Link>
            </li>
          </ul>
        </li>
        <li>
          {" "}
          <Link className="dropdown-item" to={Constants.URLConstants.ADMINLOCK}>
            Operations <i className="fa-solid fa-angle-right fa--2xl"></i>{" "}
          </Link>
          <ul className="dropdown-menu dropdown-submenu">
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSOPERATIONSBOOKINGREPORT}
              >
                Booking Report{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSOPERATIONSAGENTSEARCHLOGS}
              >
                Agent View Logs{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSOPERATIONSVOUCHER}
              >
                Voucher{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSOPERATIONSDAILYROE}
              >
                Daily Roe{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSOPERATIONSLOYALITYPROGRAM}
              >
                Loyalty Program{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSOPERATIONSREMINDER}
              >
                ReminderPro
                <br />
                Subscriptions{" "}
              </Link>
            </li>
          </ul>
        </li>
        <li>
          {" "}
          <Link className="dropdown-item" to={Constants.URLConstants.ADMINLOCK}>
            Accounts <i className="fa-solid fa-angle-right fa--2xl"></i>{" "}
          </Link>
          <ul className="dropdown-menu dropdown-submenu">
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSACCOUNTSDAILYSALES}
              >
                Daily Sales{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSACCOUNTSCUSTOMERSTATEMENT}
              >
                Customer Statement{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.ADMINLOCK}
              >
                Supplier Statement{" "}
                <i className="fa-solid fa-angle-right fa--2xl"></i>{" "}
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="accountsub">
                <li>
                  {" "}
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants
                        .REPORTSACCOUNTSSUPPLIERSTATEMENTONLINESUPPLIER
                    }
                  >
                    Online Supplier{" "}
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants
                        .REPORTSACCOUNTSSUPPLIERSTATEMENTOFFLINESUPPLIER
                    }
                  >
                    Offline Supplier{" "}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.ADMINLOCK}
              >
                Outstanding <i className="fa-solid fa-angle-right fa--2xl"></i>{" "}
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="mappinggsub">
                <li>
                  {" "}
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants.REPORTSACCOUNTSOUTSTANDINGCUSTOMER
                    }
                  >
                    Customer{" "}
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants.REPORTSACCOUNTSOUTSTANDINGSUPPLIER
                    }
                  >
                    Supplier{" "}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSACCOUNTSINVOICES}
              >
                Invoices{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSACCOUNTSAGENTRECIEPTS}
              >
                Agent Receipts{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSACCOUNTSAGENTRECIEPTSSUMMARY}
              >
                Agent Receipt Summary{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSACCOUNTSSUPPLIERPAYMENTS}
              >
                Supplier Payments{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSACCOUNTSTAX}
              >
                Tax{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSACCOUNTSCOMMISSION}
              >
                Commission{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={
                  Constants.URLConstants.REPORTSACCOUNTSPAYMENTGATEWAYBOOKINGS
                }
              >
                Payment Gateway
                <br />
                Bookings{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSACCOUNTSAGENTGLOBALSTATEMENT}
              >
                Agent Global Statement{" "}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSACCOUNTSGLOBALCUSTOMERREPORT}
              >
                Global Customer Report{" "}
              </Link>
            </li>
          </ul>
        </li>
        <li>
          {" "}
          <Link className="dropdown-item" to={Constants.URLConstants.ADMINLOCK}>
            Mapping <i className="fa-solid fa-angle-right fa--2xl"></i>{" "}
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="mappinggsub">
            <li>
              {" "}
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.REPORTSMAPPINGDESTINATION}
              >
                Destinations{" "}
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
export default Reports;
