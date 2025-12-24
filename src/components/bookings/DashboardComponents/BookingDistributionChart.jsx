// BookingDistributionChart.js
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Table } from "antd";

const BookingDistributionChart = () => {
  const [showTable, setShowTable] = useState(false);

  const pieData2 = [
    { type: "Cancelled", value: 35 },
    { type: "Confirmed", value: 50 },
    { type: "Vouchered", value: 15 },
  ];

  const totalValue = pieData2.reduce((acc, item) => acc + item.value, 0);

  // Colors
  const getColor = (type) => {
    switch (type) {
      case "Cancelled":
        return "#FF5015";
      case "Confirmed":
        return "#1A385A";
      case "Vouchered":
        return "#FFF372";
      default:
        return "#000000";
    }
  };

  // Table columns
  const tableColumns = [
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Percentage",
      key: "percentage",
      render: (_, record) =>
        `${((record.value / totalValue) * 100).toFixed(2)}%`,
    },
  ];

  const RADIAN = Math.PI / 180;
  const renderSpiderLabel = (props) => {
    const { cx, cy, midAngle, outerRadius, percent, type } = props;

    // base radius
    let labelRadius = outerRadius + 25;
    let extraY = 0;

    // 👇 special tweak for "Cancelled" so it doesn't sit inside
    if (type === "Cancelled") {
      labelRadius = outerRadius + 20; // push a bit further out
      extraY = 5; // move slightly downward
    }

    const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const y = cy + labelRadius * Math.sin(-midAngle * RADIAN) + extraY;

    const percentage = (percent * 100).toFixed(0);

    return (
      <text
        x={x}
        y={y}
        fill="#1A385A"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: 12, fontWeight: 600 }}
      >
        <tspan x={x} dy="-0.4em">
          {type}
        </tspan>
        <tspan x={x} dy="1.1em">
          {percentage}%
        </tspan>
      </text>
    );
  };

  // ⭐ TOP ONE-LINE LEGEND
  const TopLegend = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "25px",
        flexWrap: "nowrap",
        whiteSpace: "nowrap",
        marginBottom: "10px",
        fontSize: "13px",
        fontWeight: "600",
        color: "#1A385A",
      }}
    >
      {pieData2.map((item) => (
        <div
          key={item.type}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: getColor(item.type),
            }}
          ></span>
          <span>
            {item.type} {((item.value / totalValue) * 100).toFixed(0)}%
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="form-group RounderBorder">
      <div className="card chart-container doCharter">
        <div className="companyPerformance">
          <h5>Booking Distribution by Status</h5>

          <div className="graphTabs">
            <div
              onClick={() => setShowTable(false)}
              className={`graphTab ${!showTable ? "active" : ""}`}
            >
              <i className="fa fa-chart-line" />
            </div>
            <div
              onClick={() => setShowTable(true)}
              className={`graphTab ${showTable ? "active" : ""}`}
            >
              <i className="fa fa-list" />
            </div>
          </div>
        </div>

        {/* TABLE MODE */}
        {showTable ? (
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <Table
              dataSource={pieData2.map((item, index) => ({
                ...item,
                key: index,
              }))}
              columns={tableColumns}
              pagination={false}
              className="customAntTable"
            />
          </div>
        ) : (
          <>
            {/* ⭐ TOP LEGEND ⭐ */}
            <TopLegend />

            {/* ⭐ CHART ⭐ */}
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData2}
                    dataKey="value"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    // innerRadius={60}
                    outerRadius={90}
                    labelLine={true}
                    label={renderSpiderLabel}
                  >
                    {pieData2.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColor(entry.type)} />
                    ))}
                  </Pie>

                  {/* Removed right-side legend */}
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingDistributionChart;
