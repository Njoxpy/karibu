import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import OrdersPage from "./OrdersPage";

const DashboardHome = () => {
  const location = useLocation(); // Get the category from the URL
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the category from the route (or set a fallback if needed)
  const selectedCategory = location.pathname.split("/")[2] || "animal-feeding"; // Default to 'animal-feeding'

  // Fetch orders based on the selected category
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/${selectedCategory}/orders/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data.orders || []); // Ensure data.orders exists before updating state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedCategory]); // Re-fetch orders when category changes

  // Calculate Total Sales, Total Orders, and Total Products based on the orders
  const totalSales = orders.reduce((acc, order) => {
    return acc + (order.total || 0); // Sum up totalAmount of each order
  }, 0);

  const totalOrders = orders.length; // Count of orders

  const totalProducts = orders.reduce((acc, order) => {
    return acc + order.quantity; // Sum up product quantities
  }, 0);

  // Function to determine the status color
  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Processing":
        return "text-blue-600";
      case "Cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-5">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Total Sales */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-3xl font-bold">
              Tsh {totalSales.toLocaleString()}
            </p>
          </div>
          {/* Total Orders */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-3xl font-bold">{totalOrders}</p>
          </div>
          {/* Total Products */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-3xl font-bold">{totalProducts}</p>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center mt-5">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error Handling */}
        {error && <div className="text-red-500 text-center mt-5">{error}</div>}

        {/* Orders List */}
        {!loading && !error && orders.length > 0 && (
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Order ID</th>
                  <th className="py-3 px-4 text-left">Product Name</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-left">Total Price</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t">
                    <td className="py-3 px-4">{order.orderId}</td>
                    <td className="py-3 px-4">{order.productName}</td>
                    <td className="py-3 px-4">{order.quantity}</td>
                    <td className="py-3 px-4">
                      Tsh {order.total.toLocaleString()}
                    </td>
                    <td className={`py-3 px-4 ${getStatusClass(order.status)}`}>
                      {order.status}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* OrdersPage Component */}
        <OrdersPage orders={orders} />
      </div>
    </div>
  );
};

export default DashboardHome;
