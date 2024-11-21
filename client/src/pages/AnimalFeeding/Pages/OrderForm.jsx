import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Mock function to fetch product details by ID
const fetchProductDetails = (id) => {
  const products = [
    { id: 1, name: "Construction Cement Bag", price: 3400 },
    { id: 2, name: "Industrial Paint", price: 329900 },
    // More products
  ];
  return products.find((product) => product.id === parseInt(id));
};

const OrderForm = () => {
  const { id } = useParams(); // Get the product ID from the URL

  // State for product details
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch the product details based on the ID
    const productDetails = fetchProductDetails(id);
    if (productDetails) {
      setProduct(productDetails);
      setTotalPrice(productDetails.price * quantity); // Initialize total price
    }
  }, [id, quantity]); // Re-run when the id or quantity changes

  const handleQuantityChange = (e) => {
    const qty = e.target.value;
    setQuantity(qty);
    setTotalPrice(qty * product.price); // Update total price
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the order submission (e.g., send to backend)
    alert("Order placed!");
  };

  // Show a loading message if the product is not found yet
  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Place Your Order</h1>

      {/* Display the selected product details */}
      <div>
        <h2 className="text-xl font-semibold">Product: {product.name}</h2>
        <p className="text-lg">Price: Tsh {product.price}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Quantity Input */}
        <div>
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Total Price (auto-calculated) */}
        <div>
          <label className="block text-gray-700">Total Price</label>
          <input
            type="number"
            value={totalPrice}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;


/*
into this section teher should a way for price and the total price for the orders
 */