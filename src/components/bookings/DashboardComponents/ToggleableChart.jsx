// ToggleableChart.js
import React from "react";
import { Table } from "antd";

const ToggleableChart = ({ title, ChartComponent, chartConfig, tableData, tableColumns }) => {
  const [showTable, setShowTable] = React.useState(false);

  return (
    <div className="card chart-container doCharter">
      <div className="companyPerformance">
        <h5>{title}</h5>
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
            dataSource={tableData.map((item, index) => ({ ...item, key: index }))}
            columns={tableColumns}
            pagination={false}
            className="customAntTable"
            rowClassName="custom-table-row"
            headerClassName="custom-table-header"
          />
        </div>
      ) : (
        <ChartComponent {...chartConfig} />
      )}
    </div>
  );
};

export default ToggleableChart;