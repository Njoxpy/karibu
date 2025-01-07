import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../../components/Footer";

const StationeryItemDetails = () => {
  // Get the id from the URL params
  const { name } = useParams();

  // State to manage product data and user input
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To handle any errors
  const [orderStatus, setOrderStatus] = useState(null); // To track the order status
  const [stockError, setStockError] = useState(""); // To track stock errors

  useEffect(() => {
    // Fetch the product data based on the ID
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/v1/stationery/products/${name}`
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
  }, [name, quantity]); // Re-fetch when id or quantity changes

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);

    // Check if the new quantity exceeds available stock
    if (product && newQuantity > product.stock) {
      setStockError(`Only ${product.stock} items are available in stock.`);
      setQuantity(product.stock); // Limit the quantity to available stock
      setTotalPrice(product.price * product.stock); // Update total price based on available stock
    } else {
      setStockError("");
      setQuantity(newQuantity);
      if (product) {
        setTotalPrice(product.price * newQuantity);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent in the POST request
    const orderData = {
      createdBy: "67697f0560f383df632c6d6f", // Example user ID, replace as needed
      product: product._id, // Use product's _id from the response
      name: product.name,
      quantity,
      price: product.price,
    };

    try {
      // Make the POST request to create the order
      const response = await fetch(
        "http://localhost:5000/api/v1/stationery/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setOrderStatus({
          success: true,
          message: "Order created successfully!",
        });
      } else {
        setOrderStatus({
          success: false,
          message: result.message || "Error creating order.",
        });
      }
    } catch (error) {
      setOrderStatus({ success: false, message: error.message });
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>{`Error: ${error}`}</div>; // Show error message if there's an issue
  }

  if (!product) {
    return <div className="p-4 text-gray-500">Product not found.</div>;
  }

  return (
    <>
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
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
            {stockError && <p className="text-red-500 text-sm">{stockError}</p>}{" "}
            {/* Show stock error */}
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
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            disabled={stockError}
          >
            Complete Order
          </button>
        </form>

        {orderStatus && (
          <div
            className={`mt-4 p-2 ${
              orderStatus.success ? "bg-green-500" : "bg-red-500"
            } text-white text-center`}
          >
            {orderStatus.message}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default StationeryItemDetails;
