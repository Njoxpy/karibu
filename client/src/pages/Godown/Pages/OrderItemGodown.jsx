import { useState, useEffect } from "react";
import Footer from "../../../components/Footer";

const OrderItemGodown = () => {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [successMessage, setSuccessMessage] = useState(null); // Success message state

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/godown/products"
      );
      const data = await response.json();
      // console.log("API Response:", data); // Log the response for debugging

      if (response.ok) {
        setProducts(data); // Set the products array to the state
        setSelectedProduct(data[0]); // Set the first product as default
        setTotalPrice(data[0].price); // Set the initial total price
        setIsLoading(false); // Set loading to false after cthe data is fetched
      } else {
        setError("Failed to fetch products");
        setIsLoading(false);
      }
    } catch (error) {
      // console.error("Error fetching products:", error);
      setError("Error fetching products");
      setIsLoading(false);
    }
  };

  // Effect to fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle product change from dropdown
  const handleProductChange = (event) => {
    const productId = event.target.value;
    const product = products.find((product) => product._id === productId);
    setSelectedProduct(product);
    setTotalPrice(product.price * quantity);
  };

  // Handle quantity change
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    if (selectedProduct) {
      setTotalPrice(selectedProduct.price * newQuantity);
    }
  };

  // Handle form submission to create order
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedProduct) {
      setError("Please select a product.");
      return;
    }

    const orderData = {
      productId: selectedProduct._id,
      quantity,
      totalPrice,
    };

    try {
      // Send the order data to the backend to create the order
      const response = await fetch(
        "http://localhost:5000/api/v1/godown/orders",
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
        setSuccessMessage("Order placed successfully!");
        setError(null); // Reset any previous errors
        setSelectedProduct(null);
        setQuantity(1);
        setTotalPrice(0);
      } else {
        setError(result.message || "Failed to place order");
      }
    } catch (error) {
      // console.error('Error placing order:', error);
      setError("Error placing order");
    }
  };

  // Render loading, error, or product list
  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Place Your Order</h2>

        <form onSubmit={handleSubmit}>
          {/* Product Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Product
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
              value={selectedProduct?._id || ""}
              onChange={handleProductChange}
            >
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              value={selectedProduct?.name || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </div>

          {/* Quantity Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
              min="1"
            />
          </div>

          {/* Price per Item */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price per Item
            </label>
            <input
              type="text"
              value={`Tsh ${selectedProduct?.price || 0}`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </div>

          {/* Total Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Total Price
            </label>
            <input
              type="text"
              value={`Tsh ${totalPrice}`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700"
          >
            Complete Order
          </button>
        </form>

        {/* Success Message */}
        {successMessage && (
          <div className="mt-4 text-green-500">{successMessage}</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderItemGodown;
