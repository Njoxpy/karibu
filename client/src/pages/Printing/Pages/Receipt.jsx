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

const Receipts = () => {
  const [receipts, setReceipts] = useState([
    { description: "Logo Design", price: 5000, quantity: 1, contact: 123456789, category: "graphic design", id: 1, date: "2024-11-19" },
    { description: "Website Design", price: 15000, quantity: 1, contact: 987654321, category: "graphic design", id: 2, date: "2024-11-18" },
    { description: "Tshirt Kwa Vijana", price: 2000, quantity: 1, contact: 123456789, category: "electronics", id: 3, date: "2024-11-17" },
    { description: "Cup Cards", price: 1500, quantity: 2, contact: 987654321, category: "electronics", id: 4, date: "2024-11-15" }
  ]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  // State for filtering
  const [filterBy, setFilterBy] = useState("all"); // "day", "week", "month", or "all"

  // State for managing the edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // This is where we define the state for the modal
  const [editReceipt, setEditReceipt] = useState({ index: null, quantity: 0 });

  // Function to filter receipts by date
  const filterReceiptsByDate = () => {
    const now = new Date();
    let filteredReceipts = receipts;
    switch (filterBy) {
      case "day":
        const startOfDay = getStartOfDay();
        filteredReceipts = receipts.filter((receipt) => new Date(receipt.date) >= startOfDay);
        break;
      case "week":
        const startOfWeek = getStartOfWeek();
        filteredReceipts = receipts.filter((receipt) => new Date(receipt.date) >= startOfWeek);
        break;
      case "month":
        const startOfMonth = getStartOfMonth();
        filteredReceipts = receipts.filter((receipt) => new Date(receipt.date) >= startOfMonth);
        break;
      default:
        break;
    }
    return filteredReceipts;
  };

  // Paginate filtered receipts
  const filteredReceipts = filterReceiptsByDate();
  const totalPages = Math.ceil(filteredReceipts.length / ordersPerPage);
  const currentReceipts = filteredReceipts.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // Function to remove a receipt
  const handleRemoveReceipt = (index) => {
    const newReceipts = receipts.filter((_, i) => i !== index);
    setReceipts(newReceipts);
  };

  // Function to open the edit modal
  const openEditModal = (index) => {
    setEditReceipt({ index, quantity: receipts[index].quantity });
    setIsEditModalOpen(true);
  };

  // Function to confirm and apply receipt edits
  const handleSaveEdit = () => {
    const updatedReceipts = [...receipts];
    updatedReceipts[editReceipt.index].quantity = editReceipt.quantity;
    updatedReceipts[editReceipt.index].totalPrice =
      updatedReceipts[editReceipt.index].quantity * updatedReceipts[editReceipt.index].price; // Recalculate total price
    setReceipts(updatedReceipts);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Order Submission Receipts</h1>

        {/* Filter Dropdown */}
        <div className="mb-4 flex justify-center">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Receipts</option>
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        {filteredReceipts.length === 0 ? (
          <p>No receipts found for the selected filter.</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-blue-200">
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Contact</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentReceipts.map((receipt, index) => (
                <tr key={index} className="hover:bg-blue-100">
                  <td className="border border-gray-300 px-4 py-2">{receipt.description}</td>
                  <td className="border border-gray-300 px-4 py-2">Tsh {receipt.price}</td>
                  <td className="border border-gray-300 px-4 py-2">{receipt.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">{receipt.contact}</td>
                  <td className="border border-gray-300 px-4 py-2">{receipt.category}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-evenly">
                    <button
                      onClick={() => handleRemoveReceipt(index)}
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
                      <Link to={`/stationery/orders/${receipt.id}`}>
                        Receipt Details
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

      {/* Edit Receipt Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Receipt Quantity</h2>
            <div className="mb-4">
              <label className="block text-gray-600">Quantity:</label>
              <input
                type="number"
                value={editReceipt.quantity}
                onChange={(e) =>
                  setEditReceipt((prev) => ({
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

export default Receipts;
