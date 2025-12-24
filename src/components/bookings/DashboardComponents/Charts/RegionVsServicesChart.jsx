import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Table } from "antd";

const RegionVsServicesChart = () => {
  const [showTable, setShowTable] = useState(false);

  // Raw data
  const lineData = [
    { currency: "CA", bookings: "Umrah" },
    { currency: "UAE", bookings: "Hotels" },
    { currency: "PAK", bookings: "Umrah" },
    { currency: "USA", bookings: "Hotels" },
    { currency: "BAH", bookings: "Hotels" },
    { currency: "FI", bookings: "Flights" },
  ];

  // Map service names to numeric levels for Y-axis
  const serviceOrder = ["Flights", "Hotels", "Umrah"];
  const serviceToIndex = serviceOrder.reduce((acc, name, i) => {
    acc[name] = i + 1; // 1-based index for nicer ticks
    return acc;
  }, {});

  const indexToService = (idx) => serviceOrder[idx - 1] || "";

  // Recharts data: add serviceIndex
  const chartData = lineData.map((item) => ({
    ...item,
    serviceIndex: serviceToIndex[item.bookings] || 0,
  }));

  // AntD table columns
  const tableColumns = [
    {
      title: "Region",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Services",
      dataIndex: "bookings",
      key: "bookings",
    },
  ];

  return (
    <div className="form-group col-md-8 mt-5 RounderBorder">
      <div className="card chart-container doCharter">
        <div className="companyPerformance">
          <h5>Region Vs Services</h5>
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
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="regionServiceGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopOpacity={0.8} stopColor="#FF5014" />
                    <stop offset="100%" stopOpacity={0.2} stopColor="#FF5014" />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} />

                {/* X-axis: Regions */}
                <XAxis dataKey="currency" />

                {/* Y-axis: Services (as categories via tick formatter) */}
                <YAxis
                  type="number"
                  domain={[1, serviceOrder.length]}
                  ticks={serviceOrder.map((_, i) => i + 1)}
                  tickFormatter={indexToService}
                />

                <Tooltip
                  formatter={(value, name, props) => {
                    // Show service name instead of numeric index
                    if (name === "serviceIndex") {
                      return [props.payload.bookings, "Service"];
                    }
                    return [value, name];
                  }}
                  labelFormatter={(label) => `Region: ${label}`}
                />

                <Area
                  type="monotone"
                  dataKey="serviceIndex"
                  stroke="#FF5014"
                  strokeWidth={2}
                  fill="url(#regionServiceGradient)"
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionVsServicesChart;
