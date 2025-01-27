import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

const ProtectedRoute = ({
  allowedRoles,
  allowedCategories,
  categorySpecific = false,
}) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if the user is not logged in
    return <Navigate to="/login" />;
  }

  const { role, category } = user;

  // Admin has access to everything
  if (role === "admin") {
    return <Outlet />;
  }

  // Employees need to match specific categories if categorySpecific is true
  if (role === "employee") {
    if (
      categorySpecific &&
      allowedCategories &&
      !allowedCategories.includes(category)
    ) {
      return <Navigate to="/403" />;
    }
    return <Outlet />;
  }

  // For any other cases, deny access
  return <Navigate to="/403" />;
};

export default ProtectedRoute;
