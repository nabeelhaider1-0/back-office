import { Link } from "react-router-dom";
import Constants from "../../constants/routes";

const Suppliers = () => {
  return (
    <div className="dropdown" id="menudropdown">
      <Link
        className="boxview dropdown-toggle"
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <b>SUPPLIERS</b>
        <i className="fa-solid fa-angle-down"></i>
      </Link>

      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuLink"
        id="dripmenu"
      >
        <li>
          <Link to={Constants.URLConstants.SUPPLIERSEARCH}>
            Online Suppliers <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul className="dropdown-menu dropdown-submenu" id="suppliersoninesub">
            <li>
              <Link to={Constants.URLConstants.SUPPLIERDETAILS}> Add </Link>
            </li>
            <li>
              <Link to={Constants.URLConstants.SUPPLIERSEARCH}>View</Link>
            </li>
            <li>
              <Link
                to={
                  Constants.URLConstants
                    .SUPPLIERSONLINESUPPLIERSAUTOCHECKCONFIGURATIONBUTTON
                }
              >
                Supplier Destination Report
              </Link>
            </li>
            <li>
              <Link
                to={Constants.URLConstants.SUPPLIERSAUTOCHECKSUPPLIERSBUTTON}
              >
                Auto Supplier Check
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to={Constants.URLConstants.SUPPLIERSEARCH}>
            Offline Suppliers{" "}
            <i className="fa-solid fa-angle-right fa--2xl"></i>
          </Link>
          <ul
            className="dropdown-menu dropdown-submenu"
            id="suppliersofflinesub"
          >
            <li>
              <Link to={Constants.URLConstants.OFFLINESUPPLIER}> Add </Link>
            </li>
            <li>
              <Link to={Constants.URLConstants.OFFLINESUPPLIERSEARCH}>
                View
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
export default Suppliers;
