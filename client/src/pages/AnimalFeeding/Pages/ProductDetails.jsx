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

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);

    if (product && newQuantity > product.stock) {
      setStockError(`Only ${product.stock} items are available in stock.`);
      setQuantity(product.stock);
      setTotalPrice(product.price * product.stock);
    } else {
      setStockError('');
      setQuantity(newQuantity);
      if (product) {
        setTotalPrice(product.price * newQuantity);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    const orderData = {
      createdBy: "67697f0560f383df632c6d6f", // Replace with actual user ID
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error: ${error}`}</div>;
  if (!product) return <div className="p-4 text-gray-500">Product not found.</div>;

  return (
    <>
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">{product.name}</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              value={product.name}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={product.category}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md mt-1 capitalize"
            />
          </div>

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
            {stockError && <p className="text-red-500 text-sm">{stockError}</p>}
          </div>

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

          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <span className="ml-2 text-sm text-gray-600">I agree to the terms and conditions</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            disabled={stockError || !termsAccepted}
          >
            Complete Order
          </button>
        </form>

        {orderStatus && (
          <div className={`mt-4 p-2 ${orderStatus.success ? 'bg-green-500' : 'bg-red-500'} text-white text-center`}>
            {orderStatus.message}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
