import React from "react";
import BookingDistributionChart from "./Charts/BookingDistributionChart";
import RegionVsServicesChart from "./Charts/RegionVsServicesChart";
import UserTrafficSourceChart from "./Charts/UserTrafficSourceChart";
import SalesByServiceChart from "./Charts/SalesByServiceChart";

const B2CCardsComponent = () => {
  return (
    <div className="row mt-4 mb-5 CharterRow" id="B2C">
      <BookingDistributionChart />
      <UserTrafficSourceChart />
      <RegionVsServicesChart />
      <SalesByServiceChart />
    </div>
  );
};

export default B2CCardsComponent;