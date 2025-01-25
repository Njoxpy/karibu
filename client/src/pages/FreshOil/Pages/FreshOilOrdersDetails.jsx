import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToken } from "../../../services/token";
import Footer from "../../../components/Footer";

const FreshOilOrdersDetails = () => {
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
          `http://localhost:5000/API/v1/fresh-oil/orders/${id}`,
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
        <p className="text-red-500 text-lg font-medium">{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
        <p className="text-gray-500 text-lg font-medium">No order found</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "TZS",
    }).format(price);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-6 text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            <span className="text-sm font-medium">Back to Orders</span>
          </button>

          {/* Order Details Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-2xl mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 px-6 py-8">
              <h1 className="text-2xl font-bold text-white">Order Details</h1>
              <p className="text-sm text-yellow-200 mt-1">
                Animal Feeding Order
              </p>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Grid for Order Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Order ID
                  </h3>
                  <p className="mt-1 text-sm font-mono text-gray-900">
                    {order.orderId}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Order Date
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatDate(order.createdAt)}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Product Name
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {order.productName}
                  </p>
                </div>

                {/* <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Customer ID
                  </h3>
                  <p className="mt-1 text-sm font-mono text-gray-900">
                    {order.userId}
                  </p>
                </div> */}

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Quantity
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {order.quantity} unit(s)
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Unit Price
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatPrice(order.price)}
                  </p>
                </div>
              </div>

              {/* Total Amount */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800">
                    Total Amount
                  </h3>
                  <p className="text-lg font-bold text-yellow-600">
                    {formatPrice(order.total)}
                  </p>
                </div>
              </div>

              {/* Dates */}
              <div className="border-t border-gray-200 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Created At
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Last Updated
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatDate(order.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FreshOilOrdersDetails;
