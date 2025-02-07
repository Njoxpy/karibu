import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, token } = context;

  const getDecodedToken = () => {
    if (!token) return null;
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(atob(base64));
      return decoded;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  // Check if the user is an admin
  const isAdmin = () => {
    const decoded = getDecodedToken();
    return decoded?.role === "admin";
  };

  // Check if the user has access to a specific category
  const hasAccess = (category) => {
    const decoded = getDecodedToken();
    return isAdmin() || decoded?.category === category;
  };

  // Handle token expiration logic, can be enhanced to refresh the token
  const isTokenExpired = () => {
    const decoded = getDecodedToken();
    if (decoded) {
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    }
    return true;
  };

  return {
    user,
    token,
    isAdmin,
    hasAccess,
    isTokenExpired,
    getDecodedToken,
  };
};
