import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Table } from "antd";

const UserTrafficSourceChart = () => {
  const [showTable, setShowTable] = useState(false);

  // Data
  const pieData = [
    { type: "Email", value: 35 },
    { type: "Social Media", value: 50 },
    { type: "Organic", value: 15 },
  ];

  const totalValue = pieData.reduce((acc, item) => acc + item.value, 0);

  // Colors
  const getColor = (type) => {
    switch (type) {
      case "Email":
        return "#FF5015";
      case "Social Media":
        return "#1A385A";
      case "Organic":
        return "#f7c408";
      default:
        return "#000000";
    }
  };

  // Table columns
  const tableColumns = [
    {
      title: "Traffic Source",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Percentage",
      key: "percentage",
      render: (text, record) =>
        `${((record.value / totalValue) * 100).toFixed(2)}%`,
    },
  ];

  // Custom spider label (outside)
  const RADIAN = Math.PI / 180;
  const renderSpiderLabel = (props) => {
    const { cx, cy, midAngle, outerRadius, percent, type } = props;

    // base radius + optional Y adjustment
    let labelRadius = outerRadius + 25;
    let extraY = 0;

    // 👇 tweak JUST the Email label so it doesn't go out of bounds
    if (type === "Email") {
      labelRadius = outerRadius + 24; // pull a bit closer to the donut
      extraY = 6; // nudge slightly downward
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

  // Top legend (one line, centered)
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
      {pieData.map((item) => (
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
    <div className="form-group col-md-4 RounderBorder">
      <div className="card chart-container doCharter">
        <div className="companyPerformance">
          <h5>User Traffic Source</h5>
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
              dataSource={pieData.map((item, index) => ({
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
                    data={pieData}
                    dataKey="value"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    labelLine={true}
                    label={renderSpiderLabel}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColor(entry.type)} />
                    ))}
                  </Pie>

                  {/* right-side Legend removed */}
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

export default UserTrafficSourceChart;
