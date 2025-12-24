import { Link } from "react-router-dom";
import Constants from "../../constants/routes";

const Messages = () => {
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
        <b>COMMUNICATION</b>
        <i className="fa-solid fa-angle-down"></i>
      </Link>
      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuLink"
        id="dripmenu"
      >
        <li>
          <Link className="dropdown-item" to={Constants.URLConstants.ADMINLOCK}>
            Agent Messages <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="agentsub">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.MESSAGESNEW}
              >
                Add
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.MESSAGESINBOX}
              >
                Inbox
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.MESSAGESOUTBOX}
              >
                Outbox
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link className="dropdown-item" to={Constants.URLConstants.ADMINLOCK}>
            Mass Mail <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu">
            <li>
              <Link
                className="dropdown-item"
                to={Constants.URLConstants.ADMINLOCK}
              >
                Subscribers <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="agentsub">
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.MESSAGESMASSMAILSUBSCRIBERNEW}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.MESSAGESMASSMAILSUBSCRIBERSEARCH}
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
                Subscribers Groups{" "}
                <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="subscribersub">
                <li>
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants.MESSAGESMASSMAILSUBSCRIBERGROUPNEW
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
                        .MESSAGESMASSMAILSUBSCRIBERGROUPSEARCH
                    }
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
                Campaigns <i className="fa-solid fa-angle-right fa--2xl"></i>
              </Link>
              <ul className="dropdown-menu dropdown-submenu" id="mappingsub">
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANNEW}
                  >
                    Add
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSEARCH}
                  >
                    View
                  </Link>
                </li>
                <li>
                  <Link href="http://beta.tdonlines.com/tms/download_newsletter.php">
                    Download Newsletter
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANALYSIS}
                  >
                    Analysis
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={
                      Constants.URLConstants.MESSAGESMASSMAILCAMPAIGNANSETTING
                    }
                  >
                    Settings
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <Link to={Constants.URLConstants.ADMINLOCK} className="dropdown-item">
            Emails <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="accountsub">
            <li>
              <Link
                to={Constants.URLConstants.EMAILNEW}
                className="dropdown-item"
              >
                Add
              </Link>
            </li>
            <li>
              <Link
                to={Constants.URLConstants.EMAILSEARCH}
                className="dropdown-item"
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
export default Messages;
