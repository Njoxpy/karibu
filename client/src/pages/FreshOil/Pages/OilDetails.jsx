import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../../components/Footer";

const OilDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL params

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To handle any errors

  useEffect(() => {
    // Fetch the product data based on the ID
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken"); // Get the Bearer token from localStorage
        const response = await fetch(
          `http://localhost:5000/api/v1/fresh-oil/products/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Add the token to the Authorization header
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setProduct(data); // Set the fetched product data
          setTotalPrice(data.price * quantity); // Set initial total price based on quantity
        } else {
          throw new Error("Product not found");
        }
      } catch (error) {
        setError(error.message); // Handle the error
      } finally {
        setLoading(false); // Set loading to false once fetch is complete
      }
    };

    fetchProduct();
  }, [id, quantity]); // Re-fetch when id or quantity changes

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
    if (product) {
      setTotalPrice(product.price * newQuantity);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      totalPrice,
      status: "pending",
      orderId: Date.now(), // Generate a unique order ID
      userId: 4, // Example user ID, replace as needed
      productName: product ? product.name : "Unknown Product",
      quantity,
      category: product ? product.category : "Unknown Category",
    };
    console.log("Order submitted:", orderData);
    // Handle order submission, e.g., call an API to submit the order
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>{`Error: ${error}`}</div>; // Show error message if there's an issue
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <>
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg mt-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {product.name}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              value={product.name}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </div>

          {/* Product Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              value={product.category}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </div>

          {/* Quantity Input */}
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
              min="1"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price per Item
            </label>
            <input
              type="text"
              id="price"
              value={`Tsh ${product.price}`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </div>

          {/* Total Price */}
          <div className="mb-4">
            <label
              htmlFor="totalPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Total Price
            </label>
            <input
              type="text"
              id="totalPrice"
              value={`Tsh ${totalPrice}`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
          >
            Complete Order
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default OilDetails;
