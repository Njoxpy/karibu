import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../../services/token";

const ITEMS_PER_PAGE = 6;
const API_URL = "http://localhost:5000/api/v1/godown/products";

const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Token
  const token = getToken();

  // Fetch inventory data
  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      setInventory(formatInventoryData(data));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Format inventory data
  const formatInventoryData = (data) => {
    return data.map((item) => ({
      id: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      location: item.location,
      condition: item.condition,
    }));
  };

  // Format price
  const formatPrice = (price) => `Tsh ${price.toLocaleString()}`;

  // Filter and paginate inventory
  const filterAndPaginate = () => {
    const filteredInventory = inventory.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = Math.ceil(filteredInventory.length / ITEMS_PER_PAGE);
    const paginatedInventory = filteredInventory.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
    return { paginatedInventory, totalPages };
  };

  const { paginatedInventory, totalPages } = filterAndPaginate();

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for godown items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-600 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Inventory Table */}
      {!loading && !error && (
        <>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Item Name</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Quantity</th>
                  <th className="px-6 py-4 text-left">Location</th>
                  <th className="px-6 py-4 text-left">Condition</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInventory.length > 0 ? (
                  paginatedInventory.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 border-b">{item.name}</td>
                      <td className="px-6 py-4 border-b">
                        {formatPrice(item.price)}
                      </td>
                      <td
                        className={`px-6 py-4 border-b ${
                          item.quantity > 20
                            ? "text-green-600"
                            : "text-orange-500"
                        }`}
                      >
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 border-b">{item.location}</td>
                      <td
                        className={`px-6 py-4 border-b ${
                          item.quantity < 6
                            ? "text-red-500 font-bold"
                            : "text-green-600 font-bold"
                        }`}
                      >
                        {item.quantity < 6 ? "Out of Stock" : item.condition}
                      </td>
                      <td className="px-6 py-4 border-b">
                        <Link
                          to={`/godown/products/${item.id}`}
                          className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Place Order
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-600">
                      No items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="mx-4 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default InventoryTable;
