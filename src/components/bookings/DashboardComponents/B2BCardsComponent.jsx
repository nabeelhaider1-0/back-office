// B2BCardsComponent.js
import React from "react";
import CompanyPerformanceChart from "./CompanyPerformanceChart";
import CurrencyBookingsChart from "./CurrencyBookingsChart";
import SalesByServiceChart from "./SalesByServiceChart";
import BookingDistributionChart from "./BookingDistributionChart";
import SalesBySuppliersChart from "./SalesBySuppliersChart";

const B2BCardsComponent = () => {
    return (
  <div className="row mt-4 mb-5 CharterRow" id="B2B">
    <div className="form-group col-md-8 RounderBorder">
      <CompanyPerformanceChart />
    </div>
    
    <div className="form-group col-md-4 RounderBorder">
      <CurrencyBookingsChart />
    </div>
    
    <div className="form-group col-md-4 mt-5 RounderBorder">
      <SalesByServiceChart />
    </div>
    
    <div className="form-group col-md-4 mt-5 RounderBorder">
      <BookingDistributionChart />
    </div>
    
    <div className="form-group col-md-4 mt-5 RounderBorder">
      <SalesBySuppliersChart />
    </div>
  </div>
);
};
export default B2BCardsComponent;