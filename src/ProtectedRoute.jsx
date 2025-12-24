import { Navigate } from "react-router-dom";
import { hasPermission } from "./authUtils";

const ProtectedRoute = ({ element, module_name, action }) => {
 
  const isAuthorized = hasPermission(module_name, action);
  return isAuthorized ? element : <Navigate to="/access-denied" replace />;
};

export default ProtectedRoute;