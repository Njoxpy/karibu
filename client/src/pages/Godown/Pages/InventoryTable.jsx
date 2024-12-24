import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState(null); // Error state

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fetch inventory data from the endpoint
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/godown/products");
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        const formattedData = data.map((item) => ({
          id: item._id,
          name: item.name,
          code: item.code,
          price: item.price,
          quantity: item.quantity,
          location: item.location,
          condition: item.condition,
        }));
        setInventory(formattedData);
        setError(null); // Reset error if data is successfully fetched
      } catch (error) {
        setError(error.message); // Set error message if fetch fails
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchInventoryData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleEdit = (item) => {
    setEditItem(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/godown/products/${itemToDelete}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setInventory(inventory.filter((item) => item.id !== itemToDelete));
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Update the item on the backend
    try {
      const response = await fetch(`http://localhost:5000/api/v1/godown/products/${editItem.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editItem),
      });
      if (!response.ok) {
        throw new Error("Failed to update item");
      }
      const updatedItem = await response.json();

      // Update the inventory state with the updated item
      setInventory(
        inventory.map((item) =>
          item.id === updatedItem._id ? { ...updatedItem, id: updatedItem._id } : item
        )
      );
      setIsEditModalOpen(false);
      setEditItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
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
      {error && (
        <div className="mb-4 p-4 bg-red-500 text-white rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

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
        {paginatedInventory.length > 0 ? (
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
                    className={`px-4 py-2 border ${item.quantity > 20 ? "text-green-600" : "text-orange-500"}`}
                  >
                    {item.quantity}
                  </td>
                  <td className="px-4 py-2 border">{item.location}</td>
                  <td
                    className={`px-4 py-2 border ${item.quantity < 6 ? "text-red-500 font-bold" : "text-green-600 font-bold"
                      }`}
                  >
                    {item.quantity < 6 ? "Out of Stock" : item.condition}
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
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-700 text-lg">No results found for your search.</p>
          </div>
        )}
      </div>


      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-xs w-full md:w-1/3">
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
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white py-1 px-4 rounded"
                >
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
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-xs w-full md:w-1/3">
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
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
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
