import { useState, useEffect } from "react";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";

// Utility function to format date
const formatDate = (date) => new Date(date).toLocaleDateString();

const GodownOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [filter, setFilter] = useState("all"); // Default filter is "all"

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/godown/orders");
      const data = await response.json();
      if (response.ok) {
        setOrders(data);
        setFilteredOrders(data); // Initially set filtered orders as all fetched orders
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  // Filter orders based on selected time range (all, day, week, month)
  const filterOrders = () => {
    const now = new Date();
    let filtered;

    if (filter === "all") {
      filtered = orders; // No filtering, show all orders
    } else if (filter === "day") {
      filtered = orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate.toDateString() === now.toDateString();
      });
    } else if (filter === "week") {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay()); // Get the start of the current week (Sunday)
      const weekEnd = new Date(now);
      weekEnd.setDate(now.getDate() + (6 - now.getDay())); // Get the end of the current week (Saturday)

      filtered = orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= weekStart && orderDate <= weekEnd;
      });
    } else if (filter === "month") {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1); // Get the first day of the current month
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Get the last day of the current month

      filtered = orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= monthStart && orderDate <= monthEnd;
      });
    }

    setFilteredOrders(filtered);
  };

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders when the component mounts
  }, []);

  useEffect(() => {
    filterOrders(); // Filter orders when the filter state or orders change
  }, [filter, orders]);

  // Handle deleting an order
  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/godown/orders/${orderId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedOrders = orders.filter((order) => order._id !== orderId);
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
        setShowDeleteModal(false);
      } else {
        console.error("Failed to delete the order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Handle editing an order
  const handleEditOrder = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/godown/orders/${orderToEdit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderToEdit),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        const updatedOrders = orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
        setShowEditModal(false);
        setOrderToEdit(null);
      } else {
        console.error("Failed to update the order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Handle Remove Order Modal
  const openDeleteModal = (orderId) => {
    setOrderToDelete(orderId);
    setShowDeleteModal(true);
  };

  // Handle Edit Order Modal
  const openEditModal = (order) => {
    setOrderToEdit(order);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setOrderToEdit(null);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setOrderToDelete(null);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Orders List</h1>

        {/* Filter Options */}
        <div className="mb-6 text-center">
          <button
            onClick={() => handleFilterChange("all")}
            className={`py-2 px-6 rounded-md mx-2 transition duration-300 ${filter === "all" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-indigo-100"}`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange("day")}
            className={`py-2 px-6 rounded-md mx-2 transition duration-300 ${filter === "day" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-indigo-100"}`}
          >
            Today
          </button>
          <button
            onClick={() => handleFilterChange("week")}
            className={`py-2 px-6 rounded-md mx-2 transition duration-300 ${filter === "week" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-indigo-100"}`}
          >
            This Week
          </button>
          <button
            onClick={() => handleFilterChange("month")}
            className={`py-2 px-6 rounded-md mx-2 transition duration-300 ${filter === "month" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-indigo-100"}`}
          >
            This Month
          </button>
        </div>

        {filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found for the selected time period</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-gray-600">Product Name</th>
                <th className="px-6 py-3 text-left text-gray-600">Quantity</th>
                <th className="px-6 py-3 text-left text-gray-600">Total Price</th>
                <th className="px-6 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order._id} className="hover:bg-indigo-50">
                  <td className="px-6 py-4 text-gray-800">{order.name}</td>
                  <td className="px-6 py-4 text-gray-800">{order.quantity}</td>
                  <td className="px-6 py-4 text-gray-800">Tsh {order.totalPrice}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-start gap-2">
                      <button
                        onClick={() => openDeleteModal(order._id)}
                        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => openEditModal(order)}
                        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                      >
                        Edit
                      </button>
                      <button className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition">
                        <Link to={`/godown/orders/${order._id}`}>Details</Link>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center my-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-l-md disabled:bg-gray-200"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-r-md disabled:bg-gray-200"
          >
            Next
          </button>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={closeEditModal}
          >
            <div
              className="bg-white p-8 rounded-lg max-w-3xl w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Edit Order</h2>
              <form>
                <label className="block mb-4 text-gray-600">
                  Product Name:
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={orderToEdit?.name || ""}
                    onChange={(e) => setOrderToEdit({ ...orderToEdit, name: e.target.value })}
                  />
                </label>
                <label className="block mb-4 text-gray-600">
                  Quantity:
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={orderToEdit?.quantity || ""}
                    onChange={(e) => setOrderToEdit({ ...orderToEdit, quantity: e.target.value })}
                  />
                </label>
                <label className="block mb-4 text-gray-600">
                  Total Price:
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={orderToEdit?.totalPrice || ""}
                    onChange={(e) => setOrderToEdit({ ...orderToEdit, totalPrice: e.target.value })}
                  />
                </label>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700"
                    onClick={handleEditOrder}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
              <button
                onClick={closeEditModal}
                className="absolute top-4 right-4 text-gray-500 text-xl"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={closeDeleteModal}
          >
            <div
              className="bg-white p-8 rounded-lg max-w-sm w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Confirm Delete</h2>
              <p className="text-gray-600">Are you sure you want to delete this order?</p>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => handleDeleteOrder(orderToDelete)}
                  className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="ml-4 bg-gray-300 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default GodownOrders;
