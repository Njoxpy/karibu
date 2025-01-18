import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";

const useLogout = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("dispatch:", dispatch); // Check if dispatch is correctly passed

  const logout = () => {
    // Clear the authentication state
    dispatch({ type: "LOGOUT" });

    // Clear relevant data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user"); // Clear the user data

    // Redirect to the login page
    navigate("/login");
  };

  return logout;
};

export default useLogout;
