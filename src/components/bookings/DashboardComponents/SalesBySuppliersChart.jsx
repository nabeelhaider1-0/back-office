// SalesBySuppliersChart.js
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Table } from "antd";

const SalesBySuppliersChart = () => {
  const [showTable, setShowTable] = useState(false);

  const donutData2 = [
    { type: "Agoda", value: 8 },
    { type: "Dotw", value: 17 },
    { type: "Local Systems", value: 15 },
    { type: "Hotelbeds", value: 20 },
    { type: "Local Transfers", value: 40 },
  ];

  const totalValue = donutData2.reduce((acc, item) => acc + item.value, 0);

  const getColor = (type) => {
    switch (type) {
      case "Local Transfers":
        return "#FF5015";
      case "Local Systems":
        return "#FFA384";
      case "Dotw":
        return "#FFF372";
      case "Hotelbeds":
        return "#5AA2F3";
      case "Agoda":
        return "#1A385A";
      default:
        return "#000000";
    }
  };

  const tableColumns = [
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Percentage",
      key: "percentage",
      render: (_, record) =>
        `${((record.value / totalValue) * 100).toFixed(2)}%`,
    },
  ];

  // Spider labels
  const RADIAN = Math.PI / 180;
  const renderSpiderLabel = (props) => {
    const { cx, cy, midAngle, outerRadius, percent, type } = props;

    const labelRadius = outerRadius + 25;

    let x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    let y = cy + labelRadius * Math.sin(-midAngle * RADIAN);

    const percentage = (percent * 100).toFixed(0);

    // ⭐ Move specific labels slightly DOWN
    if (type === "Dotw" || type === "Local Systems") {
      y += 12; // adjust this number if needed
    }
    // ⭐ Move specific labels slightly DOWN
    if (type === "Local Transfers") {
      y -= 17; // adjust this number if needed
    }

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

  // Top legend (one line, centered)
  const TopLegend = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "3px",
        flexWrap: "nowrap",
        whiteSpace: "nowrap",
        marginBottom: "10px",
        fontSize: "10px",
        fontWeight: "600",
        color: "#1A385A",
      }}
    >
      {donutData2.map((item) => (
        <div
          key={item.type}
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
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
          <h5>Sales by Suppliers</h5>
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

        {showTable ? (
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <Table
              dataSource={donutData2.map((item, index) => ({
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
            <TopLegend />

            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={donutData2}
                    dataKey="value"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    labelLine={true}
                    label={renderSpiderLabel}
                  >
                    {donutData2.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColor(entry.type)} />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value, name, props) => [
                      `${value}%`,
                      props.payload.type,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SalesBySuppliersChart;
