import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch order details
  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3003/orders/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      const data = await response.json();
      setOrder(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Could not fetch order details');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const handleClick = async () => {
    const confirmDelete = window.confirm(
      'Do you really want to delete this order?'
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3003/orders/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete the order');
        }
        alert('Order deleted successfully');
        // Optionally, redirect back to the orders page
      } catch (error) {
        console.error(error);
        alert('Error deleting order');
      }
    }
  };

  if (loading) {
    return <div className="text-yellow-800 p-4">Loading order details...</div>;
  }

  if (error) {
    return <div className="text-red-600 p-4 font-bold">Error: {error}</div>;
  }

  return (
    <>
      <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <h4 className="text-2xl font-bold text-blue-600 mb-4">Order Details</h4>
        <div className="mb-4">
          <p className="font-semibold">Order ID:</p>
          <p className="text-gray-700">{order.id}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Description:</p>
          <p className="text-gray-700">{order.description}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Price:</p>
          <p className="text-gray-700">${order.price}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Status:</p>
          <p className="text-gray-700">{order.status}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Date Created:</p>
          <p className="text-gray-700">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">User ID:</p>
          <p className="text-gray-700">{order.userId}</p>
        </div>

        {/* Receipt Link */}
        <div className="mt-4">
          <a
            href={`http://localhost:3003/receipts/${id}`}
            className="text-green-600 underline hover:text-green-800"
          >
            View or Download Receipt
          </a>
        </div>

        {/* Delete Button */}
        <button
          className="mt-4 w-full text-white bg-red-500 p-2 rounded-lg hover:bg-red-600 transition-all duration-75"
          onClick={handleClick}
        >
          Delete Order
        </button>

        {/* Navigation Button */}
        <div className="mt-4 text-center">
          <Link
            to="/orders"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Return to Orders Page
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrderDetails;
