// src/services/userService.js

// Example: If you're storing user data in localStorage
export const getUser = () => {
  // Assuming user data is stored in localStorage as a JSON string
  const userData = localStorage.getItem("authToken");

  // Parse and return the user object, or return null if no user is found
  return userData ? JSON.parse(userData) : null;
};
