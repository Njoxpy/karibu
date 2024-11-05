// src/pages/Orders.js

import { useState } from "react";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";

const GodownOrders = () => {
  // Local state for orders
  const [orders, setOrders] = useState([
    { productName: "Animal Feed A", quantity: 2, totalPrice: 4000, id: 1 },
    { productName: "Animal Feed B", quantity: 1, totalPrice: 2440, id: 2 },
    { productName: "Animal Feed C", quantity: 3, totalPrice: 6440, id: 3 },
    { productName: "Animal Feed C", quantity: 3, totalPrice: 6300, id: 4 },
    { productName: "Animal Feed C", quantity: 3, totalPrice: 60000, id: 5 },
    { productName: "Animal Feed C", quantity: 3, totalPrice: 60000, id: 6 },
    { productName: "Animal Feed C", quantity: 3, totalPrice: 6880, id: 7 },
    { productName: "Animal Feed C", quantity: 3, totalPrice: 6880, id: 8 },
  ]);

  // State for modal visibility and editing order
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editOrder, setEditOrder] = useState({ index: null, quantity: 0 });

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
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-blue-200">
                <th className="border border-gray-300 px-4 py-2">
                  Product Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">
                  Total Price
                </th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-blue-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {order.productName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Tsh {order.totalPrice}
                  </td>
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
      </div>
      <div className="flex justify-center mb-2">
        <button className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600 mr-2">
          Previous
        </button>
        <button className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600 mr-2">
          Next
        </button>
      </div>

      {/* Edit Order Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Edit Order Quantity
            </h2>
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

export default GodownOrders;
