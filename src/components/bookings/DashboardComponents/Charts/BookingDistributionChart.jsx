// import React, { useState } from "react";
// import { Bar } from "@ant-design/plots";
// import { useBookingPlatformData } from "../../../../Apis/DashboardAPI";
// const BookingDistributionChart = () => {
//   const [timePeriod, setTimePeriod] = useState("monthly");
//   const { data, loading, error } = useBookingPlatformData(timePeriod);

//   // Normalize platform names (e.g., "Ios" to "iOS")
//   const normalizedData = data.map((item) => ({
//     platform: item.platform === "Ios" ? "iOS" : item.platform,
//     sales: item.sales,
//   }));

//   // Log data for debugging

//   // Chart configuration (aligned with demo)
//   const config = {
//     data: normalizedData,
//     xField: "platform",
//     yField: "sales",
//     label: {
//       style: {
//         fill: "#FFFFFF",
//         opacity: 100,
//         fontSize: 16, // Increase the font size
//         fontWeight: 600,
//       },
//       offsetX: -18, // 🔑 move label left inside the bar
//     },
//     autoFit: true,
//     style: {
//       fill: ({ platform }) => {
//         switch (platform) {
//           case "Web":
//             return "#1A385A";
//           case "Android":
//             return "#f7c408";
//           case "iOS":
//             return "#FFA384";
//           default:
//             return "#000";
//         }
//       },
//     },
//     // Remove custom formatter to use default tooltip
//     tooltip: {
//       showMarkers: true,
//     },
//   };

//   return (
//     <div className="form-group col-md-8 RounderBorder">
//       <div
//         className="card chart-container BarCharter"
//         style={{ height: "300px", overflow: "hidden" }}
//       >
//         <div className="companyPerformance">
//           <h5>Booking Distribution By Platform</h5>
//           <select
//             className="form-select"
//             onChange={(e) => setTimePeriod(e.target.value)}
//             value={timePeriod}
//           >
//             <option value="monthly">Monthly</option>
//             <option value="weekly">Weekly</option>
//             <option value="yearly">Yearly</option>
//           </select>
//         </div>
//         {loading && <div className="loading">Loading...</div>}
//         {error && <div className="error">Error: {error}</div>}
//         {!loading && !error && normalizedData.length > 0 && <Bar {...config} />}
//         {!loading && !error && normalizedData.length === 0 && (
//           <div className="noData">
//             No booking data available for this period.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingDistributionChart;
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import { useBookingPlatformData } from "../../../../Apis/DashboardAPI";

const BookingDistributionChart = () => {
  const [timePeriod, setTimePeriod] = useState("monthly");
  const { data, loading, error } = useBookingPlatformData(timePeriod);

  // Normalize platform names (e.g., "Ios" to "iOS")
  const normalizedData = data.map((item) => ({
    platform: item.platform === "Ios" ? "iOS" : item.platform,
    sales: Number(item.sales) || 0,
  }));

  // Color helper (same colors you used before)
  const getPlatformColor = (platform) => {
    switch (platform) {
      case "Web":
        return "#1A385A";
      case "Android":
        return "#f7c408";
      case "iOS":
        return "#FFA384";
      default:
        return "#000000";
    }
  };

  return (
    <div className="form-group col-md-8 RounderBorder">
      <div
        className="card chart-container BarCharter"
        style={{ height: "300px", overflow: "hidden" }}
      >
        <div className="companyPerformance">
          <h5>Booking Distribution By Platform</h5>
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

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">Error: {error}</div>}

        {!loading && !error && normalizedData.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={normalizedData}
              layout="vertical" // horizontal bars
              margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              {/* numeric axis on bottom */}
              <XAxis type="number" />
              {/* platforms on left */}
              <YAxis type="category" dataKey="platform" />
              <Tooltip />

              <Bar
                dataKey="sales"
                radius={[0, 8, 8, 0]} // rounded right corners
              >
                {/* per-bar color */}
                {normalizedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getPlatformColor(entry.platform)}
                  />
                ))}

                {/* labels inside right with spacing */}
                <LabelList
                  dataKey="sales"
                  position="insideRight"
                  offset={10} // space from edge inside the bar
                  style={{
                    fill: "#FFFFFF",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {!loading && !error && normalizedData.length === 0 && (
          <div className="noData">
            No booking data available for this period.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDistributionChart;
