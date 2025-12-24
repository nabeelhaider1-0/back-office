import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Table } from "antd";

const SalesByServiceChart = () => {
  const [showTable, setShowTable] = useState(false);

  // Data
  const donutData = [
    { type: "Flights", value: 40 },
    { type: "Hotels", value: 30 },
    { type: "Umrah", value: 20 },
    { type: "Miscellaneous", value: 10 },
  ];

  const totalValue = donutData.reduce((acc, item) => acc + item.value, 0);

  // Colors for each service
  const getColor = (type) => {
    switch (type) {
      case "Hotels":
        return "#FF5015";
      case "Umrah":
        return "#FFA384";
      case "Miscellaneous":
        return "#5AA2F3";
      case "Flights":
        return "#1A385A";
      default:
        return "#000000";
    }
  };

  // Table columns
  const tableColumns = [
    { title: "Service", dataIndex: "type", key: "type" },
    {
      title: "Percentage",
      key: "percentage",
      render: (_, record) =>
        `${((record.value / totalValue) * 100).toFixed(2)}%`,
    },
  ];

  // Custom legend (TOP)
  const CustomLegend = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        flexWrap: "nowrap", // 👈 force one single line
        whiteSpace: "nowrap", // 👈 prevent breaking text
        marginBottom: "15px",
        fontSize: "13px",
        fontWeight: "600",
        color: "#1A385A",
        width: "100%",
        overflow: "hidden", // prevents shifting
      }}
    >
      {donutData.map((item) => (
        <div
          key={item.type}
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
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
    <div className="form-group col-md-4 mt-5 RounderBorder">
      <div className="card chart-container doCharter">
        {/* Header */}
        <div className="companyPerformance">
          <h5>Sales by Service</h5>
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

        {/* TABLE MODE */}
        {showTable ? (
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <Table
              dataSource={donutData.map((item, index) => ({
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
            {/* ⭐ CUSTOM LEGEND ON TOP ⭐ */}
            <CustomLegend />

            {/* DONUT CHART */}
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={donutData}
                    dataKey="value"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    labelLine={false}
                    label={false}
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColor(entry.type)} />
                    ))}
                  </Pie>

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

export default SalesByServiceChart;
