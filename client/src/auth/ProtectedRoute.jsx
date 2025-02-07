import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

const ProtectedRoute = ({
  allowedRoles,
  allowedCategories,
  categorySpecific = false,
}) => {
  const { user, isAdmin, hasAccess } = useAuth();

  // If the user is not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check if the user's role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  // If category-specific route, check if the user has access to that category
  if (
    categorySpecific &&
    allowedCategories &&
    !allowedCategories.some((cat) => hasAccess(cat))
  ) {
    return <Navigate to="/unauthorized" />;
  }

  // User is authorized, render the children route components
  return <Outlet />;
};

export default ProtectedRoute;
