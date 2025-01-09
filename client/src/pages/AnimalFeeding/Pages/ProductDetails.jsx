import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../../components/Footer';

const ProductDetails = () => {
  const { id } = useParams(); // Get the id from the URL params

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [stockError, setStockError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false); // To track terms agreement

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/v1/animal-feeding/products/${id}`);
        const data = await response.json();

        if (response.ok) {
          setProduct(data);
          setTotalPrice(data.price * quantity);
        } else {
          throw new Error('Product not found');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, quantity]);

  const handleQuantityIncrease = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
      setTotalPrice((quantity + 1) * product.price);
    }
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setTotalPrice((quantity - 1) * product.price);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    const orderData = {
      userId: "67700904be771ff27c9aab8b", // Replace with actual user ID
      product: product._id,
      name: product.name,
      quantity,
      price: product.price,
    };

    try {
      const response = await fetch('http://localhost:5000/api/v1/animal-feeding/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        setOrderStatus({ success: true, message: 'Order created successfully!' });
      } else {
        setOrderStatus({ success: false, message: result.message || 'Error creating order.' });
      }
    } catch (error) {
      setOrderStatus({ success: false, message: error.message });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 text-lg text-gray-700">
        Loading...
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 text-lg text-red-500">
        {`Error: ${error}`}
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="p-4 text-lg text-gray-500">
        Product not found.
      </div>
    );
  }
  

  return (
    <>
      <div className="max-w-xl mx-auto bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-8 rounded-xl shadow-2xl transition-all ease-in-out duration-300">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">{product.name}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              value={product.name}
              readOnly
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={product.category}
              readOnly
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={handleQuantityDecrease}
                className="w-8 h-8 flex justify-center items-center bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={handleQuantityIncrease}
                className="w-8 h-8 flex justify-center items-center bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                +
              </button>
            </div>
            {stockError && <p className="text-red-500 text-sm mt-2">{stockError}</p>}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price per Item</label>
            <input
              type="text"
              id="price"
              value={`Tsh ${product.price}`}
              readOnly
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">Total Price</label>
            <input
              type="text"
              id="totalPrice"
              value={`Tsh ${totalPrice}`}
              readOnly
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <span className="ml-2 text-sm text-gray-600">I agree to the terms and conditions</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={stockError || !termsAccepted}
          >
            Complete Order
          </button>
        </form>

        {orderStatus && (
          <div className={`mt-4 p-4 text-white text-center rounded-lg ${orderStatus.success ? 'bg-green-500' : 'bg-red-500'}`}>
            {orderStatus.message}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
