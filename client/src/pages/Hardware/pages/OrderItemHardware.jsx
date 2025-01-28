import { useState, useEffect } from "react";
import Footer from "../../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderItemHardware = () => {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/hardware/products",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("API Response:", data); // Debugging line

        // Ensure data is an array
        if (Array.isArray(data)) {
          setProducts(data);
          if (data.length > 0) {
            setSelectedProduct(data[0]); // Set the first product as selected
            setTotalPrice(data[0].price * quantity);
          } else {
            toast.info("No products found");
          }
        } else {
          console.error("API response is not an array:", data);
          setProducts([]); // Fallback to empty array
          toast.error("Invalid data format received from the server");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const handleProductChange = (e) => {
    const productId = e.target.value;
    const product = products.find((product) => product._id === productId);
    setSelectedProduct(product);
    setTotalPrice(product.price * quantity);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    if (selectedProduct) {
      setTotalPrice(selectedProduct.price * newQuantity);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        productId: selectedProduct._id,
        productName: selectedProduct.name,
        quantity,
        price: selectedProduct.price,
        total: totalPrice,
      };

      // Send POST request to create order
      const response = await fetch(
        "http://localhost:5000/api/v1/hardware/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
      setTotalPrice(selectedProduct.price);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
          <div className="text-center p-6 rounded-lg shadow-lg bg-white">
            <h1 className="text-2xl font-semibold text-gray-800">
              No Products
            </h1>
            <p className="mt-2 text-gray-600">
              There are currently no products available!
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <ToastContainer />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-100">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 px-6 py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
              Order Product
            </h2>
            <p className="text-blue-300 text-center mt-2">Product Details</p>
          </div>

          <div className="p-8">
            {/* Product Selection */}
            <div className="bg-blue-50 p-6 rounded-2xl">
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Select Product
              </label>
              <select
                value={selectedProduct?._id || ""}
                onChange={handleProductChange}
                className="w-full p-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                {Array.isArray(products) &&
                  products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Product Details */}
            {selectedProduct && (
              <div className="bg-blue-50 p-6 rounded-2xl mt-4">
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Product Details
                </label>
                <div className="space-y-3">
                  <p className="text-sm text-blue-500">
                    Available Stock:
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
                        selectedProduct.quantity > 20
                          ? "bg-blue-100 text-blue-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {selectedProduct.quantity} units
                    </span>
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <label className="text-sm text-blue-500 block mb-1">
                    Description
                  </label>
                  <p className="text-lg font-semibold text-blue-700">
                    {selectedProduct.description}
                  </p>
                </div>
              </div>
            )}

            {/* Order Form */}
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="bg-blue-50 p-6 rounded-2xl">
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Order Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={selectedProduct?.quantity || 1}
                    className="flex-1 p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  />
                  <div className="text-right">
                    <p className="text-sm text-blue-500">Total Price</p>
                    <p className="text-xl font-bold text-blue-700">
                      Tsh {totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
                {quantity > selectedProduct?.quantity && (
                  <p className="mt-2 text-sm text-red-500">
                    Quantity exceeds available stock
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={
                    isSubmitting || quantity > selectedProduct?.quantity
                  }
                  className={`
                    w-full md:w-auto px-8 py-4 rounded-xl text-white font-medium
                    transition-all duration-200 transform hover:scale-105
                    ${
                      isSubmitting || quantity > selectedProduct?.quantity
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 shadow-lg hover:shadow-xl"
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

      {/* Success Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="p-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100">
                <svg
                  className="h-8 w-8 text-blue-600"
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
              <h3 className="mt-6 text-xl font-semibold text-blue-900 text-center">
                Order Placed Successfully!
              </h3>
              <p className="mt-4 text-blue-500 text-center">
                Your order has been successfully placed and is being processed.
              </p>
              <div className="mt-8">
                <button
                  onClick={() => setOrderSuccess(false)}
                  className="w-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl hover:from-blue-800 hover:to-blue-900 transition-all duration-200 transform hover:scale-105"
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

export default OrderItemHardware;
