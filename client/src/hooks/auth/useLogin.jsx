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
      const response = await fetch("http://localhost:5000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log("API Response:", data);

      if (response.ok && data) {
        // Set the user in state
        setUser({
          email: data.email,
          category: data.category,
          role: data.role,
          token: data.token,
        });

        // Persist user and token in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: data.email,
            category: data.category,
            role: data.role,
            token: data.token,
          })
        );
        localStorage.setItem("authToken", data.token);
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
