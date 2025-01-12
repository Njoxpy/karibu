import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = (email, password) => {
    setIsLoading(true);
    setError(null);

    // Simulate a delay like an API call
    setTimeout(() => {
      // Simulate a successful login with dummy user data
      const user = {
        email,
        category: "godown", // This can be dynamic depending on email, for example
      };

      // Check if the user is valid (you can add further checks here)
      if (user) {
        // Simulate a redirect based on the user's category
        if (user.category === "godown") {
          navigate("/godown");
        } else if (user.category === "printing") {
          navigate("/printing");
        } else if (user.category === "hardware") {
          navigate("/hardware");
        } else if (user.category === "freshOil") {
          navigate("/freshOil");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Invalid credentials, please try again.");
      }

      setIsLoading(false);
    }, 1000); // Simulate a delay of 1 second for "API call"
  };

  return {
    login,
    isLoading,
    error,
  };
};
