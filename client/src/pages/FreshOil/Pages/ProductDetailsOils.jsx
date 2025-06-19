import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
     // create variable for api url
     const baseURL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const response = await axios.get(
          `${baseURL}/fresh-oil/products/details/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the bearer token in the headers
            },
          }
        );
        setProduct(response.data); // Assume response.data contains the product
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!product) {
    return <p>No product found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded-lg"
      />

      {/* Product Info */}
      <div className="mt-6">
        <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>

        <div className="mt-4">
          <p className="text-lg font-semibold text-green-600">{`$${(
            product.price / 100
          ).toFixed(2)}`}</p>
          <p className="text-sm text-gray-500">{`Available Quantity: ${product.quantity}`}</p>
          <p className="text-sm text-gray-500">{`Total Value: $${(
            product.total / 100
          ).toFixed(2)}`}</p>
        </div>

        {/* Metadata */}
        <div className="mt-4 text-sm text-gray-400">
          <p>{`Created on: ${new Date(
            product.createdAt
          ).toLocaleDateString()}`}</p>
          <p>{`Last updated: ${new Date(
            product.updatedAt
          ).toLocaleDateString()}`}</p>
        </div>

        {/* Add to Cart Button */}
        <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
          Create Order
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
