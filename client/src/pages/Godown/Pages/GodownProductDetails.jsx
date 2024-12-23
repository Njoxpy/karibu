import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../../components/Footer';

const GodownProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL params

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product data from the backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/godown/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
        setTotalPrice(data.price * quantity); // Initialize total price
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, quantity]); // Recalculate total price when id or quantity changes

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity < 1) {
      return; // Prevent quantity from going below 1
    }
    setQuantity(newQuantity);
    if (product) {
      setTotalPrice(product.price * newQuantity);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare order data
    const orderData = {
      productId: product._id,
      name: product.name,
      quantity,
      price: product.price,
      total: totalPrice,
      status: 'pending', // Default order status
      userId: 4, // Assuming user ID is 4 for now, replace with actual user ID
    };

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/v1/godown/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Order successfully placed! Order ID: ${data.orderId}`);
      } else {
        throw new Error('Failed to place the order');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className='text-red-600 text-center p-4'>{error}</div>;
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
            disabled={loading}
          >
            {loading ? 'Processing Order...' : 'Complete Order'}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default GodownProductDetails;
