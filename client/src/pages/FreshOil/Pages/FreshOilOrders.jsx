import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../../../services/token";
import { useAnimalFeeding } from "../../../hooks/animalFeeding/useAnimalFeeding";

// Utility function to format date
const formatDate = (date) => new Date(date).toLocaleDateString();

// Reusable Edit Modal Component
const EditModal = ({ order, onClose, onSave }) => {
  const [newQuantity, setNewQuantity] = useState(order.quantity);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-yellow-900 mb-6">
            Edit Order
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-yellow-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={newQuantity}
                onChange={(e) => setNewQuantity(parseInt(e.target.value))}
                min="1"
                className="w-full p-3 border border-yellow-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-yellow-700 bg-yellow-100 rounded-xl hover:bg-yellow-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onSave(newQuantity)}
                className="px-4 py-2 text-white bg-yellow-700 rounded-xl hover:bg-yellow-800 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Reusable Delete Modal Component
const DeleteModal = ({ onClose, onConfirm }) => {
  return (
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
          <h3 className="text-xl font-bold text-yellow-900 text-center mb-4">
            Confirm Delete
          </h3>
          <p className="text-yellow-500 text-center mb-6">
            Are you sure you want to delete this order? This action cannot be
            undone.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-yellow-700 bg-yellow-100 rounded-xl hover:bg-yellow-200 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FreshOilOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const token = getToken();
  const { orders: contextOrders, dispatch } = useAnimalFeeding();

  // Fetch orders from API
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/fresh-oil/orders?filter=${filter}`,
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
        setFilteredOrders(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
        dispatch({ type: "SET_ANIMAL_FEEDING_ORDERS", payload: data });
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
    } finally {
      setIsLoading(false);
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
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to the first page when changing filters
  };

  // Handle deleting an order
  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/fresh-oil/orders/${orderId}`,
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
        dispatch({ type: "DELETE_ANIMAL_FEEDING_ORDER", payload: orderId });
        toast.success("Order deleted successfully");
      } else {
        toast.error("Failed to delete the order");
      }
    } catch (error) {
      toast.error("Error deleting order");
    }
  };

  // Handle editing an order
  const handleEditOrder = async (newQuantity) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/fresh-oil/orders/${orderToEdit._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order");
      }

      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
      setFilteredOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
      setShowEditModal(false);
      dispatch({ type: "UPDATE_ANIMAL_FEEDING_ORDER", payload: updatedOrder });
      toast.success("Order updated successfully");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  // Handle modal open/close
  const openEditModal = (order) => {
    setOrderToEdit(order);
    setShowEditModal(true);
  };

  const openDeleteModal = (orderId) => {
    setOrderToDelete(orderId);
    setShowDeleteModal(true);
  };

  const closeEditModal = () => setShowEditModal(false);
  const closeDeleteModal = () => setShowDeleteModal(false);

  // Fetch orders on component mount and filter change
  useEffect(() => {
    fetchOrders();
  }, [filter]);

  // Handle escape key for closing modals
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeEditModal();
        closeDeleteModal();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-yellow-100">
          <div className="bg-gradient-to-r from-yellow-700 to-yellow-800 px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Orders Management
            </h1>
            <p className="text-yellow-300 text-center mt-2">
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
                        ? "bg-yellow-700 text-white shadow-lg transform scale-105"
                        : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
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

            {isLoading ? (
              <div className="text-center py-12">Loading...</div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                No orders found for the selected time period.
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-yellow-200">
                    <thead>
                      <tr className="bg-yellow-50">
                        <th className="px-6 py-4 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                          Total Price
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-yellow-200">
                      {paginatedOrders.map((order) => (
                        <tr
                          key={order._id}
                          className="hover:bg-yellow-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            {order.productId.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              {order.quantity} units
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-900">
                            Tsh {order.total}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => openEditModal(order)}
                              className="text-yellow-700 hover:text-yellow-900 bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded-lg transition-colors duration-200"
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
                              to={`/fresh-oil/orders/${order._id}`}
                              className="text-yellow-700 hover:text-yellow-900 bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded-lg transition-colors duration-200"
                            >
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center gap-4 mt-6">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`
                      px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                      ${
                        currentPage === 1
                          ? "bg-yellow-100 text-yellow-400 cursor-not-allowed"
                          : "bg-yellow-700 text-white hover:bg-yellow-800"
                      }
                    `}
                  >
                    Previous
                  </button>
                  <span className="text-yellow-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`
                      px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                      ${
                        currentPage === totalPages
                          ? "bg-yellow-100 text-yellow-400 cursor-not-allowed"
                          : "bg-yellow-700 text-white hover:bg-yellow-800"
                      }
                    `}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEditModal && (
        <EditModal
          order={orderToEdit}
          onClose={closeEditModal}
          onSave={handleEditOrder}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          onClose={closeDeleteModal}
          onConfirm={() => handleDeleteOrder(orderToDelete)}
        />
      )}

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default FreshOilOrders;
