import { useState, useEffect } from "react";
import Footer from "../../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../../../services/token";

const OrderItem = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const token = getToken();

  // Fetch products and set initial selected product
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/fresh-oil/products",
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

        if (Array.isArray(data)) {
          setProducts(data);
          // Set initial selected product and total price if products exist
          if (data.length > 0) {
            setSelectedProduct(data[0]);
            setTotalPrice(data[0].price * quantity);
          } else {
            toast.info("No products found");
          }
        } else {
          console.error("API response is not an array:", data);
          setProducts([]);
          toast.error("Invalid data format received from the server");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [token, quantity]);

  const handleProductChange = (event) => {
    const product = products.find((p) => p._id === event.target.value);
    if (product) {
      setSelectedProduct(product);
      setTotalPrice(product.price * quantity);
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = Math.max(1, parseInt(event.target.value) || 1);
    setQuantity(newQuantity);
    if (selectedProduct) {
      setTotalPrice(selectedProduct.price * newQuantity);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) {
      toast.error("Please select a product");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        productId: selectedProduct._id,
        productName: selectedProduct.name,
        quantity,
        price: selectedProduct.price,
        total: totalPrice,
        status: "pending",
      };

      const response = await fetch(
        "http://localhost:5000/api/v1/fresh-oil/orders",
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

      setOrderSuccess(true);
      toast.success("Order placed successfully!");

      // Reset form state
      setQuantity(1);
      if (selectedProduct) {
        setTotalPrice(selectedProduct.price);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-900"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-6 rounded-lg shadow-lg bg-white">
          <h1 className="text-2xl font-semibold text-gray-800">
            No Products Available
          </h1>
          <p className="mt-2 text-gray-600">
            There are currently no products in the store.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-yellow-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-700 to-yellow-800 px-6 py-8">
            <h2 className="text-3xl font-bold text-white text-center">
              Create New Order
            </h2>
            <p className="text-yellow-300 text-center mt-2">
              Select product and specify quantity
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Product Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-yellow-50 p-6 rounded-2xl">
                  <label className="block text-sm font-medium text-yellow-700 mb-2">
                    Select Product
                  </label>
                  <select
                    value={selectedProduct?._id || ""}
                    onChange={handleProductChange}
                    className="w-full p-3 border border-yellow-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                    {products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedProduct && (
                  <div className="bg-yellow-50 p-6 rounded-2xl">
                    <label className="block text-sm font-medium text-yellow-700 mb-2">
                      Product Details
                    </label>
                    <div className="space-y-3">
                      <p className="text-sm text-yellow-500">
                        Product Description:{" "}
                        <span className="font-mono text-yellow-700">
                          {selectedProduct.description}
                        </span>
                      </p>
                      <p className="text-sm text-yellow-500">
                        Available Stock:
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
                            selectedProduct.quantity > 20
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {selectedProduct.quantity} units
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-yellow-50 p-6 rounded-2xl">
                  <label className="block text-sm font-medium text-yellow-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={selectedProduct?.quantity || 1}
                    className="w-full p-3 border border-yellow-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                  {selectedProduct && quantity > selectedProduct.quantity && (
                    <p className="mt-2 text-sm text-red-500">
                      Quantity exceeds available stock
                    </p>
                  )}
                </div>

                {selectedProduct && (
                  <div className="bg-yellow-50 p-6 rounded-2xl">
                    <label className="block text-sm font-medium text-yellow-700 mb-2">
                      Order Summary
                    </label>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-500">Price per unit</span>
                        <span className="font-medium">
                          Tsh {selectedProduct.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-500">Quantity</span>
                        <span className="font-medium">{quantity} units</span>
                      </div>
                      <div className="pt-3 border-t border-yellow-200">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-medium text-yellow-700">
                            Total Amount
                          </span>
                          <span className="text-xl font-bold text-yellow-900">
                            Tsh {totalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !selectedProduct ||
                  quantity > selectedProduct?.quantity
                }
                className={`
                  w-full md:w-auto px-8 py-4 rounded-xl text-white font-medium
                  transition-all duration-200 transform hover:scale-105
                  ${
                    isSubmitting ||
                    !selectedProduct ||
                    quantity > selectedProduct?.quantity
                      ? "bg-yellow-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-yellow-700 to-yellow-800 hover:from-yellow-800 hover:to-yellow-900 shadow-lg hover:shadow-xl"
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

      {/* Success Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-6">
                <svg
                  className="h-8 w-8 text-yellow-600"
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
              <h3 className="text-xl font-semibold text-yellow-900 text-center mb-4">
                Order Placed Successfully!
              </h3>
              <p className="text-yellow-500 text-center mb-6">
                Your order has been successfully placed and is being processed.
              </p>
              <button
                onClick={() => setOrderSuccess(false)}
                className="w-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-yellow-700 to-yellow-800 rounded-xl hover:from-yellow-800 hover:to-yellow-900 transition-all duration-200 transform hover:scale-105"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default OrderItem;
