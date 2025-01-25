import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToken } from "../../../services/token";
import Footer from "../../../components/Footer";

const GodownOrdersDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getToken();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/API/v1/godown/orders/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Order not found");
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No order found</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatPrice = (totalPrice) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "TSH",
    }).format(totalPrice);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 12H5M12 19l-7-7 7-7"
            />
          </svg>
          Back to Orders
        </button>

        <div className="bg-white rounded-lg shadow-md max-w-2xl mx-auto">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold">Order Details</h1>
            <p className="text-sm text-gray-500">Animal Feeding Order</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order ID</h3>
                <p className="mt-1 text-sm font-mono">{order.orderId}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Order Date
                </h3>
                <p className="mt-1 text-sm">{formatDate(order.createdAt)}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Product Name
                </h3>
                <p className="mt-1 text-sm font-mono">{order.productName}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Customer ID
                </h3>
                <p className="mt-1 text-sm font-mono">{order.userId}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Quantity</h3>
                <p className="mt-1 text-sm">{order.quantity} unit(s)</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Unit Price
                </h3>
                <p className="mt-1 text-sm">{formatPrice(order.totalPrice)}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Total Amount</h3>
                <p className="text-lg font-bold">
                  {formatPrice(order.totalPrice)}
                </p>
              </div>
            </div>

            <div className="border-t pt-4 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Created At
                </h3>
                <p className="mt-1 text-sm">{formatDate(order.createdAt)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Last Updated
                </h3>
                <p className="mt-1 text-sm">{formatDate(order.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GodownOrdersDetails;
