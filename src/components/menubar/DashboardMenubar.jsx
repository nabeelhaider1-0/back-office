import { Link } from "react-router-dom";

const DashboardMenubar = () => {
  return (
    <div className="dropdown" id="menudropdown">
      <Link className="boxview" to="/Dashboard">
        <b>DASHBOARD</b>
      </Link>
    </div>
  );
};
export default DashboardMenubar;
