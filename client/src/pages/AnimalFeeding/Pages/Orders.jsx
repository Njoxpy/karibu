import { useState } from "react";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";

const Orders = () => {
  // Local state for orders
  const [orders, setOrders] = useState([
    { id: 1, productName: "Animal Feed A", quantity: 2, totalPrice: 4000 },
    { id: 2, productName: "Animal Feed B", quantity: 1, totalPrice: 20000 },
    { id: 3, productName: "Animal Feed C", quantity: 3, totalPrice: 6000 },
    { id: 4, productName: "Animal Feed D", quantity: 1, totalPrice: 20000 },
    { id: 5, productName: "Animal Feed E", quantity: 2, totalPrice: 4000 },
    { id: 6, productName: "Animal Feed F", quantity: 3, totalPrice: 60000 },
    { id: 7, productName: "Animal Feed G", quantity: 4, totalPrice: 8000 },
    { id: 8, productName: "Animal Feed H", quantity: 5, totalPrice: 10000 },
    // Add more items for pagination example
  ]);

  const itemsPerPage = 6; // Number of orders per page
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editOrder, setEditOrder] = useState({ index: null, quantity: 0 });
  const [isRemoveConfirmationOpen, setIsRemoveConfirmationOpen] = useState(false);
  const [orderToRemove, setOrderToRemove] = useState(null);
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Function to handle pagination
  const paginateOrders = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return orders.slice(startIndex, endIndex);
  };

  // Function to remove an order
  const handleRemoveOrder = () => {
    const newOrders = orders.filter((_, i) => i !== orderToRemove);
    setOrders(newOrders);
    setIsRemoveConfirmationOpen(false);
  };

  // Function to open the edit modal
  const openEditModal = (index) => {
    setEditOrder({ index, quantity: orders[index].quantity });
    setIsEditModalOpen(true);
  };

  // Function to confirm and apply order edits
  const handleSaveEdit = () => {
    const updatedOrders = [...orders];
    updatedOrders[editOrder.index].quantity = editOrder.quantity;
    updatedOrders[editOrder.index].totalPrice =
      updatedOrders[editOrder.index].quantity * 20; // Assuming $20 per item
    setOrders(updatedOrders);
    setIsEditModalOpen(false);
  };

  // Function to open the order details modal
  const openOrderDetailsModal = (order) => {
    setSelectedOrder(order);
    setIsOrderDetailsModalOpen(true);
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Orders List</h1>
        {orders.length === 0 ? (
          <p>no orders</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-green-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Product Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Total Price</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginateOrders().map((order, index) => (
                <tr key={index} className="hover:bg-green-100">
                  <td className="border border-gray-300 px-4 py-2">{order.productName}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">Tsh {order.totalPrice}</td>
                  <td className="border border-gray-300 px-4 py-2 flex flex-col sm:flex-row sm:space-x-2">
                    <button
                      onClick={() => {
                        setOrderToRemove(index);
                        setIsRemoveConfirmationOpen(true);
                      }}
                      className="bg-red-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-red-600 mb-2 sm:mb-0"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => openEditModal(index)}
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition-all mb-2 sm:mb-0"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openOrderDetailsModal(order)}
                      className="bg-blue-500 text-white py-1 px-2 rounded"
                    >
                      Order Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

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

      {/* Edit Order Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Order Quantity</h2>
            <div className="mb-4">
              <label className="block text-gray-600">Quantity:</label>
              <input
                type="number"
                value={editOrder.quantity}
                onChange={(e) =>
                  setEditOrder((prev) => ({
                    ...prev,
                    quantity: e.target.valueAsNumber,
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
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Confirmation Modal */}
      {isRemoveConfirmationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Removal
            </h2>
            <p>Are you sure you want to remove this order?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsRemoveConfirmationOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveOrder}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {isOrderDetailsModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Order Details
            </h2>
            <p><strong>Product Name:</strong> {selectedOrder.productName}</p>
            <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
            <p><strong>Total Price:</strong> ${selectedOrder.totalPrice}</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setIsOrderDetailsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded"
              >
                Close
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
