import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";

const ProtectedRoute = ({ allowedRoles, allowedCategories }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin can access any route
  if (user.role === "admin") {
    return <Outlet />;
  }

  // Check if the user's category is allowed
  if (allowedCategories && allowedCategories.includes(user.category)) {
    return <Outlet />;
  }

  // Redirect user to their category page if they try accessing an unauthorized page
  return <Navigate to={`/${user.category}`} replace />;
};

export default ProtectedRoute;
