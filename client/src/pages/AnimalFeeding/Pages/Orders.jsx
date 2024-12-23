import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null); // Track the order to be deleted
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/animal-feeding/orders/")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const filterOrders = (filterType) => {
    let filtered = [...orders];
    const now = new Date();

    switch (filterType) {
      case "day":
        filtered = filtered.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate.toDateString() === now.toDateString();
        });
        break;
      case "week":
        filtered = filtered.filter((order) => {
          const orderDate = new Date(order.createdAt);
          const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
          return orderDate >= weekStart;
        });
        break;
      case "month":
        filtered = filtered.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate.getMonth() === now.getMonth();
        });
        break;
      default:
        break;
    }

    setFilter(filterType);
    setFilteredOrders(filtered);
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginateOrders = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  };

  const openEditModal = (order) => {
    setEditOrder({
      ...order,
      updatedQuantity: order.quantity,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editOrder) {
      const updatedOrders = orders.map((order) =>
        order._id === editOrder._id
          ? { ...order, quantity: editOrder.updatedQuantity, total: editOrder.updatedQuantity * order.price }
          : order
      );
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
      setIsEditModalOpen(false);
    }
  };

  const openDeleteModal = (order) => {
    setOrderToDelete(order); // Set the order to be deleted
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const handleDeleteOrder = () => {
    if (orderToDelete) {
      const updatedOrders = orders.filter((order) => order._id !== orderToDelete._id);
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders); // Also update filtered orders
      setIsDeleteModalOpen(false); // Close delete modal
    }
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Orders List</h1>

        {/* Filter Buttons */}
        <div className="mb-4 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => filterOrders("all")}
            className={`${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            All
          </button>
          <button
            onClick={() => filterOrders("day")}
            className={`${
              filter === "day" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            Today
          </button>
          <button
            onClick={() => filterOrders("week")}
            className={`${
              filter === "week" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            This Week
          </button>
          <button
            onClick={() => filterOrders("month")}
            className={`${
              filter === "month" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            This Month
          </button>
        </div>

        {/* Orders Table */}
        {filteredOrders.length === 0 ? (
          <p>No orders found for the selected filter.</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-green-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Product</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Total Price</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginateOrders().map((order) => (
                <tr key={order._id} className="hover:bg-green-100">
                  <td className="border border-gray-300 px-4 py-2">{order.orderId}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">Tsh {order.total}</td>
                  <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => openEditModal(order)}
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(order)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mb-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600 mr-2"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Order Modal */}
      {isEditModalOpen && editOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Order Quantity</h2>
            <div className="mb-4">
              <label className="block text-gray-600">Quantity:</label>
              <input
                type="number"
                value={editOrder.updatedQuantity}
                onChange={(e) =>
                  setEditOrder((prev) => ({
                    ...prev,
                    updatedQuantity: e.target.valueAsNumber,
                  }))
                }
                className="w-full p-2 border rounded mt-1"
                min="1"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Order Modal */}
      {isDeleteModalOpen && orderToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this order?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteOrder}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Orders;
