import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth"; // Custom hook to get auth status and user role

const ProtectedRoute = ({ element: Component, allowedRoles, ...rest }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
