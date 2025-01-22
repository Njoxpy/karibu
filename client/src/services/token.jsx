export const getToken = () => {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      console.warn("Token not found"); // Optional: Log a warning
      return null; // Return null to indicate no token exists
    }
  
    return token; // Return the token if it exists
  };
  