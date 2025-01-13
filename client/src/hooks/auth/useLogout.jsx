import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";

const useLogout = () => {
  const { dispatch } = useContext(AuthContext); // Access the dispatch function from AuthContext
  const navigate = useNavigate();

  const logout = () => {
    // Clear the authentication state
    dispatch({ type: "LOGOUT" });

    // Optionally clear localStorage/sessionStorage
    localStorage.removeItem("authToken");

    // Redirect to the login page or landing page
    navigate("/login");
  };

  return logout;
};

export default useLogout;
