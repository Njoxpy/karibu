import { useState } from "react";
import { Link } from "react-router-dom";

const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of items per page

  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Construction Cement Bag",
      code: "CCB-1001",
      quantity: 50,
      location: "Aisle 1",
      condition: "New",
      price: 3400,
    },
    {
      id: 2,
      name: "Industrial Paint",
      code: "IP-2002",
      quantity: 20,
      location: "Aisle 3",
      condition: "New",
      price: 329900,
    },
    {
      id: 3,
      name: "Iron",
      code: "PWS-3003",
      quantity: 10,
      location: "Aisle 2",
      condition: "Low Stock",
      price: 54500,
    },
    {
      id: 4,
      name: "Plywood Sheets",
      code: "PWS-3003",
      quantity: 10,
      location: "Aisle 2",
      condition: "Low Stock",
      price: 2300,
    },
    {
      id: 5,
      name: "Industrial Paint",
      code: "IP-2002",
      quantity: 20,
      location: "Aisle 3",
      condition: "New",
      price: 5300,
    },
    {
      id: 6,
      name: "Mchele Mama John",
      code: "IP-2002",
      quantity: 20,
      location: "Aisle 3",
      condition: "New",
      price: 12300,
    },
    {
      id: 7,
      name: "Tembo Cement",
      code: "IP-2002",
      quantity: 20,
      location: "Aisle 3",
      condition: "New",
      price: 235000,
    },
    {
      id: 8,
      name: "Cement Dangote",
      code: "IP-2002",
      quantity: 20,
      location: "Aisle 3",
      condition: "New",
      price: 25000,
    },
  ]);

  const handleDelete = (id) => {
    const updatedInventory = inventory.filter((item) => item.id !== id);
    setInventory(updatedInventory);
  };

  // Filter and paginate inventory items
  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const paginatedInventory = filteredInventory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 submission">
        <input
          type="text"
          placeholder="Search for godown items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Godown Inventory List
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-800 text-center">
              <th className="px-4 py-2 border">Item Name</th>
              <th className="px-4 py-2 border">Item Code</th>
              <th className="px-4 py-2 border">Prices</th>
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
                <td className="px-4 py-2 border">Tsh {item.price}</td>
                <td
                  className={`px-4 py-2 border ${item.quantity > 20 ? "text-green-600" : "text-orange-500"
                    }`}
                >
                  {item.quantity}
                </td>
                <td className="px-4 py-2 border">{item.location}</td>
                <td
                  className={`px-4 py-2 border ${item.condition === "Low Stock"
                      ? "text-red-500"
                      : "text-green-600"
                    }`}
                >
                  {item.condition}
                </td>
                <td className="px-4 py-2 border flex justify-evenly">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">
                    <Link to={`/godown/products/${item.id}`}>
                      Place Order
                    </Link>
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
      <div className="flex justify-center m-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`bg-blue-500 text-white py-1 px-2 rounded transition duration-300 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            } mr-2`}
        >
          Previous
        </button>
        <span className="text-gray-700 px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`bg-blue-500 text-white py-1 px-2 rounded transition duration-300 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InventoryTable;
