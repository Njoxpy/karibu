// api.js - A utility function to make authenticated API calls
export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No token found. Please log in again.");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error("Unauthorized or failed request.");
  }

  return response.json();
};
