import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../../components/Footer";

function GodownOrdersDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  // Fetch order details from the backend using the order ID
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/godown/orders/${id}`);
        const data = await response.json();
        if (response.ok) {
          setOrder(data); // Set order details from the response
        } else {
          console.error("Failed to fetch order details");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  // Render loading or error message if the order is not fetched
  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-lg text-blue-500">Loading order details...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-800 min-h-screen py-16 px-4">
        <div className="max-w-4xl mx-auto bg-gray-700 p-8 rounded-xl shadow-2xl">
          <h3 className="text-4xl font-bold text-blue-500 text-center mb-8">Order Details</h3>
          <div className="space-y-6">
            <div className="text-white">
              <h4 className="text-2xl font-semibold text-blue-400">Order ID</h4>
              <p className="text-lg text-gray-300">{order._id}</p>
            </div>
            <div className="text-white">
              <h4 className="text-2xl font-semibold text-blue-400">Product Name</h4>
              <p className="text-lg text-gray-300">{order.name}</p>
            </div>
            <div className="text-white">
              <h4 className="text-2xl font-semibold text-blue-400">Quantity Ordered</h4>
              <p className="text-lg text-gray-300">{order.quantity}</p>
            </div>
            <div className="text-white">
              <h4 className="text-2xl font-semibold text-blue-400">Total Price</h4>
              <p className="text-lg text-gray-300">Tsh {order.totalPrice}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default GodownOrdersDetails;
