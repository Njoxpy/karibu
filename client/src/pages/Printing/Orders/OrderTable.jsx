import { useState, useEffect } from "react";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Utility function to format date
const formatDate = (date) => new Date(date).toLocaleDateString();

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [filter, setFilter] = useState("all"); // Default filter is "all"

  // token
  const token = localStorage.getItem("authToken");

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/printing/orders",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
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
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
      const response = await fetch(
        `http://localhost:5000/api/v1/printing/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
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
      const response = await fetch(
        `http://localhost:5000/api/v1/printing/orders/${orderToEdit._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderToEdit),
        }
      );

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-100">
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Orders Management
            </h1>
            <p className="text-blue-300 text-center mt-2">
              Track and manage your orders
            </p>
          </div>

          {/* Filter Options */}
          <div className="p-6">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["all", "day", "week", "month"].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => handleFilterChange(filterOption)}
                  className={`
                    px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${
                      filter === filterOption
                        ? "bg-blue-700 text-white shadow-lg transform scale-105"
                        : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                    }
                  `}
                >
                  {filterOption === "all"
                    ? "All Orders"
                    : filterOption === "day"
                    ? "Today"
                    : filterOption === "week"
                    ? "This Week"
                    : "This Month"}
                </button>
              ))}
            </div>

            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-blue-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <p className="text-blue-500 text-lg">
                  No orders found for the selected time period
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-blue-200">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="px-6 py-4 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                        Total Price
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-blue-200">
                    {paginatedOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-blue-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-blue-900">
                            {order.name}
                          </div>
                          <div className="text-sm text-blue-500">
                            ID: {order._id.slice(-6)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {order.quantity} units
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                          Tsh {order.totalPrice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => openEditModal(order)}
                            className="text-blue-700 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-lg transition-colors duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openDeleteModal(order._id)}
                            className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-lg transition-colors duration-200"
                          >
                            Delete
                          </button>
                          <Link
                            to={`/printing/orders/${order._id}`}
                            className="text-blue-700 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-lg transition-colors duration-200"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    currentPage === 1
                      ? "bg-blue-100 text-blue-400 cursor-not-allowed"
                      : "bg-blue-700 text-white hover:bg-blue-800"
                  }
                `}
              >
                Previous
              </button>
              <span className="text-blue-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    currentPage === totalPages
                      ? "bg-blue-100 text-blue-400 cursor-not-allowed"
                      : "bg-blue-700 text-white hover:bg-blue-800"
                  }
                `}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">
                Edit Order
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={orderToEdit?.quantity || ""}
                    onChange={(e) =>
                      setOrderToEdit({
                        ...orderToEdit,
                        quantity: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    Total Price
                  </label>
                  <input
                    type="number"
                    value={orderToEdit?.totalPrice || ""}
                    onChange={(e) =>
                      setOrderToEdit({
                        ...orderToEdit,
                        totalPrice: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-4 py-2 text-blue-700 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleEditOrder}
                    className="px-4 py-2 text-white bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4">
            <div className="p-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 text-center mb-4">
                Confirm Delete
              </h3>
              <p className="text-blue-500 text-center mb-6">
                Are you sure you want to delete this order? This action cannot
                be undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 text-blue-700 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteOrder(orderToDelete)}
                  className="px-4 py-2 text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default OrdersTable;
