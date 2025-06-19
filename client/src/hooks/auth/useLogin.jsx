import { useState } from "react";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Track user data here


  const login = async (email, password) => {
    // base url for the API
    const baseURL = import.meta.env.VITE_API_URL;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseURL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

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

        // Force page reload to reflect state changes
        location.reload(); // This will reload the page
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
