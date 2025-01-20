import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../../components/Footer";

const HardwareDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/hardware/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );
        const productData = await response.json();
        setProduct(productData);
        setTotalPrice(productData.price * quantity);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id, quantity, token]); // Include token as a dependency

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
    if (product) {
      setTotalPrice(product.price * newQuantity);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      totalPrice,
      status: "pending",
      orderId: Date.now(),
      userId: 4, // Example user ID
      productName: product.name,
      quantity,
      category: product.category,
    };

    try {
      const response = await fetch("http://localhost:5000/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("Order placed successfully");
      } else {
        alert("Order failed. Please try again");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Error submitting order");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (!product) {
    return (
      <div>
        <h2>Product not found</h2>
        <p>The product you are looking for does not exist. Please try again.</p>
      </div>
    );
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
              value={formatPrice(product.price)}
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
              value={formatPrice(totalPrice)}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                onChange={() => setAgreedToTerms(!agreedToTerms)}
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the terms and conditions
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white p-2 rounded-md ${
              !agreedToTerms ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!agreedToTerms}
          >
            Complete Order
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default HardwareDetails;
