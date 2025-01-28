import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../../../services/token";
import { useAnimalFeeding } from "../../../hooks/animalFeeding/useAnimalFeeding";

const GodownProductDetails = () => {
  const { id } = useParams();
  const token = getToken(); // Retrieve token from localStorage

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Get the dispatch function from the context
  const { dispatch } = useAnimalFeeding();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/animal-feeding/products/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Add bearer token in the request headers
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
        setTotalPrice(data.price * quantity);
        setLoading(false);
        // Dispatch the action to set the product in the context
        dispatch({ type: "SET_ANIMAL_FEEDING_PRODUCTS", payload: [data] });
      } catch (error) {
        toast.error(`Error: ${error.message}`);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, token, quantity, dispatch]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    if (product) {
      setTotalPrice(product.price * newQuantity);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        productId: product._id,
        productName: product.name,
        quantity,
        price: product.price,
        total: totalPrice,
        status: "pending",
      };

      // Send POST request to create order
      const response = await fetch(
        "http://localhost:5000/api/v1/animal-feeding/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include bearer token
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || "Failed to place the order. Try again."
        );
      }

      // Show success message and reset the state
      setOrderSuccess(true);
      toast.success("Order placed successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Reset order form state
      setQuantity(1);
      setTotalPrice(product.price);
    } catch (error) {
      // Handle errors
      toast.error(`Error: ${error.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-green-600 text-center font-medium">
            Product not found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <ToastContainer />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-green-100">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-700 to-green-800 px-6 py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
              {product.name}
            </h2>
            <p className="text-green-300 text-center mt-2">Product Details</p>
          </div>

          <div className="p-8">
            {/* Product Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-xl"></div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <label className="text-sm text-green-500 block mb-1">
                    Nutrients
                  </label>
                  <p className="text-lg font-semibold text-green-700">
                    {product.nutrients}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <label className="text-sm text-green-500 block mb-1">
                    Description
                  </label>
                  <p className="mt-2 text-lg font-semibold text-green-700">
                    {product.description}
                    {/* Show first 50 characters */}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <label className="text-sm text-green-500 block mb-1">
                    Available Stock
                  </label>
                  <p
                    className={`text-lg font-semibold ${
                      product.quantity > 20
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {product.quantity} units
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-xl">
                  <label className="text-sm text-green-500 block mb-1">
                    Price per Unit
                  </label>
                  <p className="text-lg font-semibold text-green-700">
                    Tsh {product.price.toLocaleString()}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <label className="text-sm text-green-500 block mb-1">
                    Status
                  </label>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.quantity > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.quantity > 2 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-green-50 p-6 rounded-xl">
                <label className="block text-sm font-medium text-green-700 mb-2">
                  Order Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={product.quantity}
                    className="flex-1 p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  />
                  <div className="text-right">
                    <p className="text-sm text-green-500">Total Price</p>
                    <p className="text-xl font-bold text-green-700">
                      Tsh {totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
                {quantity > product.quantity && (
                  <p className="mt-2 text-sm text-red-500">
                    Quantity exceeds available stock
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || quantity > product.quantity}
                  className={`
                    w-full md:w-auto px-8 py-4 rounded-xl text-white font-medium
                    transition-all duration-200 transform hover:scale-105
                    ${
                      isSubmitting || quantity > product.quantity
                        ? "bg-green-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 shadow-lg hover:shadow-xl"
                    }
                  `}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal - Updated styling */}
      {orderSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="p-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-green-900 text-center">
                Order Placed Successfully!
              </h3>
              <p className="mt-4 text-green-500 text-center">
                Your order has been successfully placed and is being processed.
              </p>
              <div className="mt-8">
                <button
                  onClick={() => setOrderSuccess(false)}
                  className="w-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-700 to-green-800 rounded-xl hover:from-green-800 hover:to-green-900 transition-all duration-200 transform hover:scale-105"
                >
                  Continue Ordering
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default GodownProductDetails;
