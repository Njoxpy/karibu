import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Track user data here
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // Make the API call to validate the login credentials
      const response = await fetch("http://localhost:5000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok && data) {
        const { email, category, role, token } = data;

        // Check if token exists
        if (token) {
          // Save user data and token to localStorage
          localStorage.setItem(
            "user",
            JSON.stringify({ email, category, role })
          );
          localStorage.setItem("authToken", token);

          // Set user data in state
          setUser({ email, category, role, token });

          console.log("Login successful! Token:", token);

          // Redirect based on user category
          switch (category) {
            case "printing":
              navigate("/printing-dashboard"); // Redirect to specific category page
              break;
            case "godown":
              navigate("/godown-dashboard");
              break;
            case "stationery":
              navigate("/stationery-dashboard");
              break;
            default:
              navigate("/default-dashboard");
              break;
          }
        } else {
          setError("Login failed, no token received.");
        }
      } else {
        setError(data.message || "Invalid login credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
    user, // Return the user data
  };
};
