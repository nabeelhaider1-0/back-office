import React, { useEffect, useState } from "react";
import "../assets/css/header.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import LOGO from "../assets/images/ABt.jpg";
import { Link } from "react-router-dom";
import Constants from "../constants/routes";
import Alerter from "../assets/images/Alerter.png";
import {
  SendRemindersNotifications,
  getAllRemindersNotifications,
  updateReminderReadStatus,
} from "../Apis/API";

const Header = ({ setShowHeaderAndMenuBar }) => {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Are you sure you want to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#83AAED",
      cancelButtonColor: "#FF5015",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      customClass: {
        title: "swal-title",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        navigate("/");
      }
    });
  };

  const [reminderData, setReminderData] = useState([]);
  const getRemindersNotification = async () => {
    try {
      const response = await getAllRemindersNotifications();

      if (response.data.statusCode === 200) {
        const reminders = response.data.data || [];
        setReminderData(reminders);
      }
    } catch (error) {}
  };
  const handleReminderRead = async (index) => {
    try {
      // const updatedReminder = { ...reminderData[index], readOrNot: true };
      const updatedData = [...reminderData];
      updatedData[index].readOrNot = true;
      setReminderData(updatedData);
      // Assuming you have a function to update the reminder in your backend
      // You need to implement this function
      const ReadNotification = {
        uuid: updatedData[index].uuid,
        readOrNot: true,
      };
      const response = await updateReminderReadStatus(ReadNotification);
      if (response.data.statusCode === 200) {
      }
    } catch (error) {}
  };

  const SendRemindersNotification = async () => {
    try {
      const response = await SendRemindersNotifications();

      if (response.data.statusCode === 200) {
      }
    } catch (error) {}
  };
  useEffect(() => {
    getRemindersNotification();
    SendRemindersNotification();

    const intervalId = setInterval(() => {
      getRemindersNotification();
      SendRemindersNotification();
    }, 600000); // 10 minutes in milliseconds

    return () => clearInterval(intervalId);
  }, []);

  const [showAllReminders, setShowAllReminders] = useState(false);
  // Before rendering the reminders, sort the reminderData array
  reminderData.sort((a, b) => {
    // Convert createdAt strings to Date objects
    const dateA = new Date(a.timestamps.createdAt);
    const dateB = new Date(b.timestamps.createdAt);
    // Compare the dates in descending order
    return dateB - dateA;
  });
  return (
    <div id="firstNav">
      <div className="coloredline"></div>
      <nav className="h60 navbar navbar-expand-lg justify-content-between menu">
        <div>
          <Link to={Constants.URLConstants.DASHBOARD}>
            <img
              src="https://escapra-assets.s3.eu-west-1.amazonaws.com/public/companylogoWhite.png"
              className="logo"
              alt="logo"
            />
          </Link>
        </div>
        <div className="welcomeContainer">
          {/* <div className="welcomeItem font-mon">Welcome Back</div> */}
          <div className="dropdown" id="menudropdown1">
            <div className="welcomeItem welcomeicon">
              {reminderData.filter((reminder) => !reminder.readOrNot).length >
                0 && (
                <span className="badgetext badge rounded-pill">
                  {
                    reminderData.filter((reminder) => !reminder.readOrNot)
                      .length
                  }
                  {reminderData.filter((reminder) => !reminder.readOrNot)
                    .length > 99 && "+"}
                  <span className="visually-hidden">unread messages</span>
                </span>
              )}
              <i className="fa fa-clock-o "></i>
              <Link
                className=" dropdown"
                href="#"
                role="button"
                id="dropdownMenuLink"
                aria-expanded="false"
              ></Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuLink"
                id="dripmenu1"
              >
                <li className="ReminderNoticationheading">
                  <h1>Reminder Notifications</h1>
                </li>
                {showAllReminders
                  ? reminderData.map((reminder, index) => (
                      <li key={index} onClick={() => handleReminderRead(index)}>
                        <Link className="dropdown-item">
                          {reminder.note}
                          {reminder.readOrNot === false && (
                            <span className="readdot">
                              <i className="fa-regular fa-circle-dot"></i>
                            </span>
                          )}
                        </Link>
                      </li>
                    ))
                  : reminderData.slice(0, 5).map((reminder, index) => (
                      <li key={index} onClick={() => handleReminderRead(index)}>
                        <Link className="dropdown-item">
                          {reminder.note}
                          {reminder.readOrNot === false && (
                            <span className="readdot">
                              <i className="fa-regular fa-circle-dot"></i>
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                {!showAllReminders && reminderData.length > 5 && (
                  <li>
                    <button
                      className="seelallReminderButton"
                      onClick={() => setShowAllReminders(true)}
                    >
                      See All
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="dropdown" id="notificationDropdown">
            <div className="welcomeItem welcomeicon">
              <i className="fa fa-bell" data-bs-toggle="dropdown"></i>
              <div className="dropdown-menu notification-menu">
                <div className="notification-list">
                  {[
                    "Your booking has been successfully confirmed. Please check your email for further details and instructions.",
                    "Payment has been received for your recent transaction. Thank you for your promptness.",
                    "Important: Your account is set to expire in three days. Please renew your subscription to avoid service interruption.",
                    "New features have been added to your dashboard. Explore them now to enhance your experience.",
                  ].map((alertText, index) => (
                    <div key={index} className="notification-item">
                      <div className="notification-icon">
                        <img src={Alerter} alt="Alerter" />
                      </div>
                      <div className="notification-content">
                        <p>{alertText}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* User Profile Dropdown */}
          <div className="dropdown" id="userDropdown">
            <div className="welcomeItem">
              <button className="user-capsule" data-bs-toggle="dropdown">
                <i className="fa fa-user-circle userIcon"></i>
                <span className="capsule-name"></span>
                <i className="fa fa-chevron-down chevron-icon"></i>
              </button>
              <ul className="dropdown-menu userMenu">
                <li>
                  <Link className="dropdown-item DropProfile" href="/profile">
                    <i className="fa fa-user"></i> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item DropProfile"
                    onClick={handleLogout}
                  >
                    <i className="fa fa-sign-out"></i> Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
