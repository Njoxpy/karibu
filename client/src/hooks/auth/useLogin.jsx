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

          // Optional: If you want to add automatic token authorization to your requests, here's how:

          // Create a function to call protected API routes with the token
          const fetchProtectedData = async () => {
            const authToken = localStorage.getItem("authToken");

            if (authToken) {
              const response = await fetch(
                "http://localhost:5000/api/v1/protected-route",
                {
                  method: "GET", // or POST depending on the route
                  headers: {
                    Authorization: `Bearer ${authToken}`, // Add the Bearer token
                    "Content-Type": "application/json",
                  },
                }
              );

              const protectedData = await response.json();
              console.log("Protected data:", protectedData);
            }
          };

          // Fetch protected data after successful login (optional)
          fetchProtectedData();
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
