import { getToken } from "./token";

const baseURL = "http://localhost:5000";

// Fetch products
export const fetchProducts = async () => {
  const token = getToken();
  const response = await fetch(`${baseURL}/api/v1/animal-feeding/products/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch products. Please try again.");
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("API response is not an array");
  }
  return data;
};

// Update product
export const updateProduct = async (product) => {
  const token = getToken();
  const response = await fetch(
    `${baseURL}/api/v1/animal-feeding/products/${product._id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    }
  );
  if (!response.ok) {
    throw new Error(`Error updating product, status: ${response.status}`);
  }
  return response.json();
};

// Delete product
export const deleteProduct = async (productId) => {
  const token = getToken();
  const response = await fetch(
    `${baseURL}/api/v1/animal-feeding/products/${productId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) {
    throw new Error(`Error deleting product, status: ${response.status}`);
  }
  return true;
};
