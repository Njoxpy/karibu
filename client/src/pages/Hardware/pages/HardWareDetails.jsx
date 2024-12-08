import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../../components/Footer';

// Simulated product database
const productDatabase = [
  { id: 1, name: "Mechanical Keyboard", price: 150, category: "office-equipment" },
  { id: 2, name: "Organic Rabbit Pellets", price: 1200, category: "electronics" },
  { id: 3, name: "Fish Flakes", price: 25, category: "accessories" },
];

const HardwareDetails = () => {
  // Get the id from the URL params
  const { id } = useParams();

  // State to manage product data and user input
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch the product by ID (this could be an API call in a real app)
    const foundProduct = productDatabase.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setTotalPrice(foundProduct.price * quantity); // Initialize total price
    }
  }, [id, quantity]); // Recalculate total price when id or quantity changes

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
      userId: 4, // Example user ID
      productName: product ? product.name : "Unknown Product",
      quantity,
      category: product ? product.category : "Unknown Category",
    };
    console.log("Order submitted:", orderData);
    // Handle further logic like calling an API to submit the order
  };

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <>
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">{product.name}</h2>

        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              value={product.name}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </div>

          {/* Product Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={product.category}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </div>

          {/* Quantity Input */}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
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
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price per Item</label>
            <input
              type="text"
              id="price"
              value={`$${product.price}`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </div>

          {/* Total Price */}
          <div className="mb-4">
            <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">Total Price</label>
            <input
              type="text"
              id="totalPrice"
              value={`$${totalPrice}`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
              <span className="ml-2 text-sm text-gray-600">I agree to the terms and conditions</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
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
