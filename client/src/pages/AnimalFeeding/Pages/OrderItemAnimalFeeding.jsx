import { useState, useEffect } from "react";
import Footer from "../../../components/Footer";

const OrderItemAnimalFeeding = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("authToken"); // Replace this with the actual token

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/animal-feeding/products/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setSelectedProduct(data[0]); // Set the first product as default
        setTotalPrice(data[0]?.price || 0);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const handleProductChange = (event) => {
    const productId = parseInt(event.target.value);
    const product = products.find((product) => product.id === productId);
    setSelectedProduct(product);
    setTotalPrice(product.price * quantity);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    setTotalPrice(selectedProduct.price * newQuantity);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedProduct) {
      alert("Please select a product.");
      return;
    }

    const orderData = {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity,
      totalPrice,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/animal-feeding/orders/",
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
        throw new Error("Failed to submit order");
      }

      const result = await response.json();
      console.log("Order submitted successfully:", result);
      alert("Order submitted successfully!");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit the order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading products...</p>
      </div>
    );
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
              value={selectedProduct?.id || ""}
              onChange={handleProductChange}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
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

          {/* Product Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              value={selectedProduct?.category || ""}
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
              value={`Tsh ${selectedProduct?.price?.toLocaleString() || 0}`}
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
              value={`Tsh ${totalPrice.toLocaleString()}`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Complete Order"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default OrderItemAnimalFeeding;
