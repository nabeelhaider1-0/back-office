// CurrencyBookingsChart.js
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Table } from "antd";

const CurrencyBookingsChart = () => {
  const [showTable, setShowTable] = useState(false);

  const lineData = [
    { currency: "USD", bookings: 1500 },
    { currency: "EUR", bookings: 2000 },
    { currency: "GBP", bookings: 2500 },
    { currency: "JPY", bookings: 3000 },
    { currency: "AUD", bookings: 3500 },
  ];

  const tableColumns = [
    { title: "Currency", dataIndex: "currency", key: "currency" },
    { title: "Bookings", dataIndex: "bookings", key: "bookings" },
  ];

  return (
    <div className="form-group RounderBorder">
      <div className="card chart-container doCharter">
        {/* Header with toggle icons (same pattern as other charts) */}
        <div className="companyPerformance">
          <h5>Currency Vs Bookings</h5>
          <div className="graphTabs">
            <div
              onClick={() => setShowTable(false)}
              className={`graphTab ${!showTable ? "active" : ""}`}
            >
              <i className="fa fa-chart-line"></i>
            </div>
            <div
              onClick={() => setShowTable(true)}
              className={`graphTab ${showTable ? "active" : ""}`}
            >
              <i className="fa fa-list"></i>
            </div>
          </div>
        </div>

        {showTable ? (
          // TABLE VIEW
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <Table
              dataSource={lineData.map((item, index) => ({
                ...item,
                key: index,
              }))}
              columns={tableColumns}
              pagination={false}
              className="customAntTable"
            />
          </div>
        ) : (
          // CHART VIEW
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <LineChart
                data={lineData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  stroke="#E5E5E5"
                  strokeDasharray="4 4"
                  vertical={false}
                />
                <XAxis dataKey="currency" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [value ?? "N/A", "Bookings"]}
                  labelFormatter={(label) => `Currency: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#FF5015"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyBookingsChart;
