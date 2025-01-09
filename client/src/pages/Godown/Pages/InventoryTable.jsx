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
  const [validationErrors, setValidationErrors] = useState({});

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

  const validateForm = () => {
    const errors = {};
    if (!editItem.name || editItem.name.trim() === '') {
      errors.name = 'Name is required';
    }
    if (!editItem.price || editItem.price <= 0) {
      errors.price = 'Price must be greater than 0';
    }
    if (!editItem.quantity || editItem.quantity < 0) {
      errors.quantity = 'Quantity must be 0 or greater';
    }
    if (!editItem.location || editItem.location.trim() === '') {
      errors.location = 'Location is required';
    }
    if (!editItem.condition || editItem.condition.trim() === '') {
      errors.condition = 'Condition is required';
    }
    return errors;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
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
    <div className="p-2 md:p-4">
      {error && (
        <div className="mb-4 p-4 text-red-500 rounded">
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

      <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">Godown Inventory List</h1>

      <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle px-4 sm:px-6 lg:px-8">
          {paginatedInventory.length > 0 ? (
            <div className="shadow ring-1 ring-black ring-opacity-5 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-300">
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
                      <td className="px-2 py-2 md:px-4 md:py-2 border flex flex-col md:flex-row gap-2 justify-evenly">
                        <button
                          onClick={() => handleEdit(item)}
                          className="inline-flex items-center justify-center px-2 py-1 text-xs md:text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                          Edit
                        </button>
                        <Link
                          to={`/godown/products/${item.id}`}
                          className="inline-flex items-center justify-center px-2 py-1 text-xs md:text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                          Place Order
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center justify-center px-2 py-1 text-xs md:text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-700 text-lg">No results found for your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-4 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Item</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Item Name</label>
                <input
                  type="text"
                  name="name"
                  value={editItem.name}
                  onChange={handleInputChange}
                  className={`border p-2 w-full rounded ${validationErrors.name ? 'border-red-500' : ''}`}
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editItem.price}
                  onChange={handleInputChange}
                  className={`border p-2 w-full rounded ${validationErrors.price ? 'border-red-500' : ''}`}
                />
                {validationErrors.price && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.price}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={editItem.quantity}
                  onChange={handleInputChange}
                  className={`border p-2 w-full rounded ${validationErrors.quantity ? 'border-red-500' : ''}`}
                />
                {validationErrors.quantity && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.quantity}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={editItem.location}
                  onChange={handleInputChange}
                  className={`border p-2 w-full rounded ${validationErrors.location ? 'border-red-500' : ''}`}
                />
                {validationErrors.location && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.location}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Condition</label>
                <input
                  type="text"
                  name="condition"
                  value={editItem.condition}
                  onChange={handleInputChange}
                  className={`border p-2 w-full rounded ${validationErrors.condition ? 'border-red-500' : ''}`}
                />
                {validationErrors.condition && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.condition}</p>
                )}
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setValidationErrors({});
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded w-full md:w-auto"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-4 rounded w-full md:w-auto"
                >
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
