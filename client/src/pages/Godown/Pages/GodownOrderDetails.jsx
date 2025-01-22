import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../../components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GodownOrdersDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // tooken
  const token = localStorage.getItem("authToken")

  if (!token) {
    return 'could not find the token'
  }

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/godown/orders/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          }
        );
        const data = await response.json();
        if (response.ok) {
          setOrder(data);
        } else {
          toast.error("Failed to fetch order details");
        }
      } catch (error) {
        toast.error("Error fetching order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md mx-4">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h3>
          <p className="text-gray-500">The order you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ToastContainer />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-8">
            <h3 className="text-3xl font-bold text-white text-center">Order Details</h3>
            <p className="text-gray-300 text-center mt-2">Order #{order._id.slice(-6)}</p>
          </div>

          {/* Order Information */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Product Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-500">Product Name</label>
                      <p className="text-lg font-semibold text-gray-900">{order.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500">Product ID</label>
                      <p className="text-gray-700 font-mono">{order.productId}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Order Status</h4>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    order.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Order Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-500">Quantity</label>
                      <p className="text-lg font-semibold text-gray-900">{order.quantity} units</p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500">Price per Unit</label>
                      <p className="text-lg font-semibold text-gray-900">
                        Tsh {(order.totalPrice / order.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Total Amount</h4>
                  <p className="text-3xl font-bold text-gray-900">
                    Tsh {order.totalPrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Order placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GodownOrdersDetails;
