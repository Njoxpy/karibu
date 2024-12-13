import { useState } from "react";
import { Link } from "react-router-dom";

const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [inventory, setInventory] = useState([
    { id: 1, name: "Mifuko ya cement", code: "CCB-1001", quantity: 50, location: "Aisle 1", condition: "New", price: 50000 },
    { id: 2, name: "Mafuta ya kupikia", code: "IP-2002", quantity: 20, location: "Aisle 3", condition: "New", price: 329900 },
    { id: 3, name: "Sukari Mifuko", code: "PWS-3003", quantity: 10, location: "Aisle 2", condition: "Low Stock", price: 54500 },
    { id: 4, name: "Unga wa ngano", code: "PWS-3003", quantity: 10, location: "Aisle 2", condition: "Low Stock", price: 2300 },
    { id: 5, name: "Mifuko ya Chumvi", code: "IP-2002", quantity: 20, location: "Aisle 3", condition: "New", price: 5300 },
    { id: 6, name: "Mchele Mama John", code: "IP-2002", quantity: 20, location: "Aisle 3", condition: "New", price: 12300 },
    { id: 7, name: "Tembo Cement", code: "IP-2002", quantity: 20, location: "Aisle 3", condition: "New", price: 235000 },
    { id: 8, name: "Cement Dangote", code: "IP-2002", quantity: 20, location: "Aisle 3", condition: "New", price: 25000 },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleEdit = (item) => {
    setEditItem(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setInventory(inventory.filter((item) => item.id !== itemToDelete));
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedInventory = inventory.map((item) =>
      item.id === editItem.id ? { ...editItem } : item
    );
    setInventory(updatedInventory);
    setIsEditModalOpen(false);
    setEditItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem({ ...editItem, [name]: value });
  };

  const formatPrice = (price) => `Tsh ${price.toLocaleString()}`;

  const filterAndPaginate = () => {
    const filteredInventory = inventory.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
    const paginatedInventory = filteredInventory.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    return { paginatedInventory, totalPages };
  };

  const { paginatedInventory, totalPages } = filterAndPaginate();

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for godown items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      <h1 className="text-2xl font-bold mb-4 text-center">Godown Inventory List</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-800 text-center">
              <th className="px-4 py-2 border">Item Name</th>
              <th className="px-4 py-2 border">Item Code</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Condition</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedInventory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100 text-left">
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">{item.code}</td>
                <td className="px-4 py-2 border">{formatPrice(item.price)}</td>
                <td
                  className={`px-4 py-2 border ${item.quantity > 20 ? "text-green-600" : "text-orange-500"
                    }`}
                >
                  {item.quantity}
                </td>
                <td className="px-4 py-2 border">{item.location}</td>
                <td
                  className={`px-4 py-2 border ${item.condition === "Low Stock" ? "text-red-500" : "text-green-600"
                    }`}
                >
                  {item.condition}
                </td>
                <td className="px-4 py-2 border flex justify-evenly">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">
                    <Link to={`/godown/products/${item.id}`}>Place Order</Link>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Item</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Item Name</label>
                <input
                  type="text"
                  name="name"
                  value={editItem.name}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editItem.price}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={editItem.quantity}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={editItem.location}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Condition</label>
                <input
                  type="text"
                  name="condition"
                  value={editItem.condition}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="bg-gray-500 text-white py-1 px-4 rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white py-1 px-4 rounded">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="mt-4 flex justify-between">
              <button onClick={cancelDelete} className="bg-gray-500 text-white py-1 px-4 rounded">
                Cancel
              </button>
              <button onClick={confirmDelete} className="bg-red-500 text-white py-1 px-4 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center m-2">
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300"
        >
          Previous
        </button>
        <span className="text-gray-700 px-4 py-2">
          Page <strong>{currentPage}</strong> of {totalPages}
        </span>
        <button
          onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white py-1 px-2 rounded transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InventoryTable;
