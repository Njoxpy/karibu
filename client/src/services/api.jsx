     // create variable for api url
const apiUrl = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchCategoryData = async (category) => {
  try {
    const response = await fetch(`${apiUrl}/page/${category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch category data");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
};
