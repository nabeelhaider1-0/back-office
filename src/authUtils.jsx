import {jwtDecode} from "jwt-decode"; // Use a library like jwt-decode

// Decode token and extract permissions
let roleName=''
export const getUserPermissions = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    roleName=decoded.roles[0].role_name || ''
    return decoded.roles[0]?.permissions || [];
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const isSuperAdmin=()=>{
  const permission=getUserPermissions();
  return roleName.toLowerCase()==='super admin';
}
// Check if user has permission for a route
export const hasPermission = (module_name, required_actions) => {
  const permissions = getUserPermissions();
  module_name = module_name.toLowerCase();
  if(roleName.toLowerCase()=='super admin' || module_name=="dashboard") return true;
  if (!permissions) return false;
  const modulePermissions = permissions.find((p) => p.module_name.toLowerCase().trim() === module_name);
  if (!modulePermissions) return false;
  if (typeof required_actions === 'string') {
    required_actions = [required_actions];
  }
  console.log('modulePermissions',modulePermissions);
  return required_actions.some((action) => modulePermissions.allowed_actions.includes(action));
};

// Get permitted menu items
export const getPermittedMenuItems = (routeConfig) => {
  const permissions = getUserPermissions();
  if (!permissions) return [];

  return routeConfig.filter((route) => {
    //if (!route.menu || !route.menu.component) return false;
    return hasPermission(route.module_name, route.action);
  });
  
};
export const isRoutePermitted = (permittedItems, routePath) => {
  
  return permittedItems.some((item) => item.path === routePath);
};