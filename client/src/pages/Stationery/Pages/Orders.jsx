import { useState } from "react";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";

// Helper functions for date filtering
const getStartOfDay = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

const getStartOfWeek = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 0); // Adjust if Sunday
  now.setDate(diff);
  now.setHours(0, 0, 0, 0);
  return now;
};

const getStartOfMonth = () => {
  const now = new Date();
  now.setDate(1);
  now.setHours(0, 0, 0, 0);
  return now;
};

const Orders = () => {
  // Example orders with dates
  const [orders, setOrders] = useState([
    { productName: "Daftari Kubwa", quantity: 2, totalPrice: 4000, id: 1, date: "2024-11-19" },
    { productName: "Msomi", quantity: 1, totalPrice: 2440, id: 2, date: "2024-11-18" },
    { productName: "Conuter Book", quantity: 3, totalPrice: 6440, id: 3, date: "2024-11-16" },
    { productName: "Notebook", quantity: 3, totalPrice: 6300, id: 4, date: "2024-11-15" },
    { productName: "Diary", quantity: 3, totalPrice: 60000, id: 5, date: "2024-11-13" }
  ]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  // State for filtering
  const [filterBy, setFilterBy] = useState("all"); // "day", "week", "month", or "all"

  // State for modal visibility and editing order
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editOrder, setEditOrder] = useState({ index: null, quantity: 0 });

  // Function to filter orders by date
  const filterOrdersByDate = () => {
    let filteredOrders = orders;
    switch (filterBy) {
      case "day":
        const startOfDay = getStartOfDay();
        filteredOrders = orders.filter((order) => new Date(order.date) >= startOfDay);
        break;
      case "week":
        const startOfWeek = getStartOfWeek();
        filteredOrders = orders.filter((order) => new Date(order.date) >= startOfWeek);
        break;
      case "month":
        const startOfMonth = getStartOfMonth();
        filteredOrders = orders.filter((order) => new Date(order.date) >= startOfMonth);
        break;
      default:
        break;
    }
    return filteredOrders;
  };

  // Paginate filtered orders
  const filteredOrders = filterOrdersByDate();
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // Function to remove an order
  const handleRemoveOrder = (index) => {
    const newOrders = orders.filter((_, i) => i !== index);
    setOrders(newOrders);
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

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Orders List</h1>

        {/* Filter Dropdown */}
        <div className="mb-4 flex justify-center">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Orders</option>
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        {filteredOrders.length === 0 ? (
          <p className="p-4 text-gray-500">No orders found for the selected filter.</p>
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
              {currentOrders.map((order, index) => (
                <tr key={index} className="hover:bg-blue-100">
                  <td className="border border-gray-300 px-4 py-2">{order.productName}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">Tsh {order.totalPrice}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-evenly">
                    <button
                      onClick={() => handleRemoveOrder(index)}
                      className="bg-red-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-red-600 mr-2"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => openEditModal(index)}
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition-all"
                    >
                      Edit
                    </button>
                    <button className="bg-blue-500 text-white py-1 px-2 rounded">
                      <Link to={`/stationery/orders/${order.id}`}>
                        Order Details
                      </Link>
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
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600 mr-2"
        >
          Previous
        </button>
        <span className="mt-4 inline-block text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600 ml-2"
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

      <Footer />
    </>
  );
};

export default Orders;
