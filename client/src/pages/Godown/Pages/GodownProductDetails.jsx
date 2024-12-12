import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../../components/Footer';

// Simulated product database
const productDatabase = [
  { id: 1, name: "Construction Cement Bag", price: 50000, category: "good cement made from the southside of Tanzania" },
  { id: 2, name: "Industrial Paint", price: 1200, category: "paint" },
  { id: 3, name: "Iron", price: 25, category: "iron for the industry" },
];

const GodownProductDetails = () => {
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
    return <div className='text-red-600 text-center p-4'>Product not found.</div>;
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
              className="w-full p-2 border border-gray-300 rounded-md mt-1 capitalize"
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
              value={`Tsh ${product.price}`}
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
      </div>
      <Footer />
    </>
  );
};

export default GodownProductDetails;
