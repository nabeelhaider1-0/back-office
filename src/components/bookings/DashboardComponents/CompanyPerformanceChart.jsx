// CompanyPerformanceChart.js
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

const CompanyPerformanceChart = () => {
  const [timePeriod, setTimePeriod] = useState("monthly");

  const yearlyData = [
    { time: "2015", sales: 3200 },
    { time: "2016", sales: 4100 },
    { time: "2017", sales: 4800 },
    { time: "2018", sales: 5300 },
    { time: "2019", sales: 6100 },
    { time: "2020", sales: 5800 },
    { time: "2021", sales: 6500 },
    { time: "2022", sales: 7200 },
    { time: "2023", sales: 7800 },
    { time: "2024", sales: 8500 },
  ];

  const monthlyData = [
    { time: "Jan", sales: 450 },
    { time: "Feb", sales: 380 },
    { time: "Mar", sales: 580 },
    { time: "Apr", sales: 550 },
    { time: "May", sales: 680 },
    { time: "Jun", sales: 420 },
    { time: "Jul", sales: 780 },
    { time: "Aug", sales: 800 },
    { time: "Sep", sales: 750 },
    { time: "Oct", sales: 720 },
    { time: "Nov", sales: 850 },
    { time: "Dec", sales: 950 },
  ];

  const weeklyData = [
    { time: "Week 1", sales: 120 },
    { time: "Week 2", sales: 145 },
    { time: "Week 3", sales: 135 },
    { time: "Week 4", sales: 180 },
    { time: "Week 5", sales: 165 },
    { time: "Week 6", sales: 190 },
    { time: "Week 7", sales: 175 },
    { time: "Week 8", sales: 220 },
    { time: "Week 9", sales: 210 },
    { time: "Week 10", sales: 205 },
    { time: "Week 11", sales: 190 },
    { time: "Week 12", sales: 235 },
  ];

  const getChartData = () => {
    switch (timePeriod) {
      case "yearly":
        return yearlyData;
      case "weekly":
        return weeklyData;
      default:
        return monthlyData;
    }
  };

  const xAxisLabel =
    timePeriod === "yearly"
      ? "Year"
      : timePeriod === "weekly"
      ? "Week"
      : "Month";

  return (
    <div
      className="card chart-container BarCharter"
      style={{ height: "300px", overflow: "hidden" }}
    >
      <div className="companyPerformance">
        <h5>Company&apos;s Performance</h5>
        <select
          className="form-select"
          onChange={(e) => setTimePeriod(e.target.value)}
          value={timePeriod}
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={getChartData()}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          {/* gradient fill */}
          <defs>
            <linearGradient
              id="companyPerformanceGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#FF5014" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#FF5014" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#E5E5E5"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="time"
            label={{
              value: xAxisLabel,
              position: "insideBottom",
              offset: -5,
            }}
          />

          <YAxis
            label={{
              value: "Sales",
              angle: -90,
              position: "insideLeft",
              offset: 10,
            }}
          />

          <Tooltip
            formatter={(value) => [value, "Sales"]}
            labelFormatter={(label) => `${xAxisLabel}: ${label}`}
          />

          <Area
            type="monotone"
            dataKey="sales"
            stroke="#FF5014"
            strokeWidth={2}
            fill="url(#companyPerformanceGradient)"
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompanyPerformanceChart;
