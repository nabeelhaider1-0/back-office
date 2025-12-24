import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getPermittedMenuItems,
  isSuperAdmin as checkIfSuperAdmin,
} from "../.././authUtils";
import routeConfig from "../.././routeConfig";
import DashboardMenubar from "./DashboardMenubar";
import Bookings from "./bookings";
import Masters from "./masters";
import Customers from "./customers";
import Suppliers from "./suppliers";
import Staffs from "./staffs";
import Accounts from "./accounts";
import Contracts from "./contracts";
import Messages from "./messages";
import Reports from "./reports";
import Tools from "./tools";
import Settings from "./settings";
import Constants from "../../constants/routes";

const MenuBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const permittedMenuItems = getPermittedMenuItems(routeConfig);
  const [isSuperAdmin, setSuperAdmin] = useState(false);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const getPermittedItemsByModuleNames = (permittedMenuItems, moduleNames) => {
    return permittedMenuItems.filter((item) =>
      moduleNames.includes(item.module_name)
    );
  };
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 768);
    };
    // ✅ Use renamed import and set result in state
    setSuperAdmin(checkIfSuperAdmin());
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Map components to their permitted routes
  const menuComponents = {
    DashboardMenubar: {
      component: DashboardMenubar,
      items: permittedMenuItems.filter(
        (item) => item.module_name === "dashboard"
      ),
    },
    Bookings: {
      component: Bookings,
      items: permittedMenuItems.filter(
        (item) => item.module_name === "bookings"
      ),
    },
    Masters: {
      component: Masters,
      items: permittedMenuItems.filter(
        (item) => item.module_name === "Masters"
      ),
    },
    Customers: {
      component: Customers,
      items: permittedMenuItems.filter(
        (item) => item.module_name === "user management"
      ),
    },
    // Suppliers: { component: Suppliers, items: permittedMenuItems.filter((item) => item.module_name === "Suppliers") },
    Staffs: {
      component: Staffs,
      items: permittedMenuItems.filter((item) => item.module_name === "staff"),
    },
    // Accounts: {
    //   component: Accounts,
    //   items: permittedMenuItems.filter(
    //     (item) => item.module_name === "Accounts"
    //   ),
    // },
    // Contracts: { component: Contracts, items: permittedMenuItems.filter((item) => item.module_name === "Contracts") },
    // Messages: {
    //   component: Messages,
    //   items: permittedMenuItems.filter(
    //     (item) => item.module_name === "Messages"
    //   ),
    // },
    // Reports: {
    //   component: Reports,
    //   items: permittedMenuItems.filter(
    //     (item) => item.module_name === "Reports"
    //   ),
    // },
    Tools: {
      component: Tools,
      items: getPermittedItemsByModuleNames(permittedMenuItems, [
        "markup profiles",
        "discount profiles",
        "currencies",
      ]),
    },
    Settings: {
      component: Settings,
      items: permittedMenuItems.filter(
        (item) => item.module_name === "Settings"
      ),
    },
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg" id="secondNav">
        <div className="w-100">
          <Link
            className="navbar-brand"
            to={Constants.URLConstants.SERACHBOOKINGS}
            style={{ color: "white", fontSize: "10px" }}
            id="tdotext"
          >
            Travel Destination Online Mid Office
          </Link>
          <button
            className={`navbar-toggler ${collapsed ? "" : "collapsed"}`}
            onClick={toggleCollapse}
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded={!collapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`navbar-collapse ${collapsed ? "collapse" : ""}`}
            id="navbarSupportedContent"
          >
            {!collapsed && (
              <>
                {Object.entries(menuComponents).map(
                  ([key, { component: Component, items }]) =>
                    (items.length > 0 || isSuperAdmin === true) && (
                      <Component
                        key={key}
                        permittedItems={items}
                        isSuperAdmin={isSuperAdmin}
                      />
                    )
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MenuBar;
