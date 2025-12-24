import React, { useState } from "react";
import Header2 from "../header2/header2";

import BookingCard from "./DashboardComponents/BookingCard";
import B2BCardsComponent from "./DashboardComponents/B2BCardsComponent";
import B2CCardsComponent from "./DashboardComponents/B2CCardsComponent";
const Dashboard = () => {
  // Add state to track the toggle switch
  const [isB2B, setIsB2B] = useState(false); // true for B2B, false for B2C

  // Function to handle toggle switch
  const handleToggle = () => {
    setIsB2B((prev) => !prev); // Toggle between B2B and B2C
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Header2 title="DASHBOARD" />
        <div className="toggle-containerBB">
          <button
            className={`toggleButtonBB ${isB2B ? "active" : ""}`}
            onClick={handleToggle}
          >
            <span className={`toggle-textBB ${isB2B ? "active" : ""}`}>
              B2B
            </span>
            <span className={`toggle-textBB ${!isB2B ? "active" : ""}`}>
              B2C
            </span>
          </button>
        </div>
      </div>
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <div>
          <form>
            <BookingCard></BookingCard>

            {/* This is the chart row */}
            {isB2B ? (
              <>
                <B2BCardsComponent></B2BCardsComponent>
              </>
            ) : (
              <>
                <B2CCardsComponent></B2CCardsComponent>
              </>
            )}
          </form>

          {/* END */}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
