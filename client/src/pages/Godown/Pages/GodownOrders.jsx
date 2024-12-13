import { useState } from "react";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";

const GodownOrders = () => {
  const [orders, setOrders] = useState([
    { productName: "Mifuko ya Saruji", quantity: 2, totalPrice: 4000, id: 1 },
    { productName: "Bati za Ujenzi", quantity: 1, totalPrice: 2440, id: 2 },
    { productName: "Vipande vya Mbao", quantity: 3, totalPrice: 6440, id: 3 },
    { productName: "Ndoo za Rangi", quantity: 3, totalPrice: 6300, id: 4 },
    { productName: "Magunia ya Nafaka", quantity: 3, totalPrice: 60000, id: 5 },
    { productName: "Vyuma vya Reli", quantity: 3, totalPrice: 60000, id: 6 },
    { productName: "Madumu ya Mafuta", quantity: 3, totalPrice: 6880, id: 7 },
    { productName: "Magunia ya Mchele", quantity: 3, totalPrice: 6880, id: 8 },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  const handleRemoveOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    setShowDeleteModal(false);  // Close delete modal
  };

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
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Orders List</h1>
        {orders.length === 0 ? (
          <p>No orders</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-blue-200">
                <th className="border border-gray-300 px-4 py-2">Product Name</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Total Price</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order, index) => (
                <tr key={index} className="hover:bg-blue-100">
                  <td className="border border-gray-300 px-4 py-2">{order.productName}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">Tsh {order.totalPrice}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-evenly">
                    <button
                      onClick={() => { setOrderToDelete(order.id); setShowDeleteModal(true); }}
                      className="bg-red-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-red-600 mr-2"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => openEditModal(order)}
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition-all"
                    >
                      Edit
                    </button>
                    <button className="bg-blue-500 text-white py-1 px-2 rounded">
                      <Link to={`/godown/orders/${order.id}`}>
                        Order Details
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center m-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`py-1 px-2 rounded transition duration-300 mr-2 ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          >
            Previous
          </button>
          <span className="text-gray-700 px-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`py-1 px-2 rounded transition duration-300 mr-2 ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Order</h2>
            <label className="block mb-2">Product Name</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2 mb-4"
              value={orderToEdit.productName}
              onChange={(e) => setOrderToEdit({ ...orderToEdit, productName: e.target.value })}
            />
            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              className="border border-gray-300 rounded w-full p-2 mb-4"
              value={orderToEdit.quantity}
              onChange={(e) => setOrderToEdit({ ...orderToEdit, quantity: e.target.value })}
            />
            <label className="block mb-2">Total Price</label>
            <input
              type="number"
              className="border border-gray-300 rounded w-full p-2 mb-4"
              value={orderToEdit.totalPrice}
              onChange={(e) => setOrderToEdit({ ...orderToEdit, totalPrice: e.target.value })}
            />
            <div className="flex justify-end">
              <button
                onClick={closeEditModal}
                className="bg-gray-400 text-white py-1 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const updatedOrders = orders.map(order => order.id === orderToEdit.id ? orderToEdit : order);
                  setOrders(updatedOrders);
                  closeEditModal();
                }}
                className="bg-blue-500 text-white py-1 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this order?</h2>
            <div className="flex justify-end">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-400 text-white py-1 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRemoveOrder(orderToDelete)}
                className="bg-red-500 text-white py-1 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default GodownOrders;
