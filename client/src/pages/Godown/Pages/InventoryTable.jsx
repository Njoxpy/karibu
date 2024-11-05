import { useState } from "react";

const InventoryTable = () => {
  // Sample data for items in the godown (warehouse)
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Construction Cement Bag",
      code: "CCB-1001",
      quantity: 50,
      location: "Aisle 1",
      condition: "New",
    },
    {
      id: 2,
      name: "Industrial Paint",
      code: "IP-2002",
      quantity: 20,
      location: "Aisle 3",
      condition: "New",
    },
    {
      id: 3,
      name: "Plywood Sheets",
      code: "PWS-3003",
      quantity: 10,
      location: "Aisle 2",
      condition: "Low Stock",
    },
    {
      id: 4,
      name: "Plywood Sheets",
      code: "PWS-3003",
      quantity: 10,
      location: "Aisle 2",
      condition: "Low Stock",
    },
    {
      id: 5,
      name: "Industrial Paint",
      code: "IP-2002",
      quantity: 20,
      location: "Aisle 3",
      condition: "New",
    },
    {
      id: 6,
      name: "Industrial Paint",
      code: "IP-2002",
      quantity: 20,
      location: "Aisle 3",
      condition: "New",
    },
    {
      id: 7,
      name: "Industrial Paint",
      code: "IP-2002",
      quantity: 20,
      location: "Aisle 3",
      condition: "New",
    },
    {
      id: 8,
      name: "Industrial Paint",
      code: "IP-2002",
      quantity: 20,
      location: "Aisle 3",
      condition: "New",
    },
  ]);

  const handleDelete = (id) => {
    const updatedInventory = inventory.filter((item) => item.id !== id);
    setInventory(updatedInventory);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Godown Inventory List
      </h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-800">
            <th className="px-4 py-2 border">Item Name</th>
            <th className="px-4 py-2 border">Item Code</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Condition</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{item.name}</td>
              <td className="px-4 py-2 border">{item.code}</td>
              <td
                className={`px-4 py-2 border ${
                  item.quantity > 20 ? "text-green-600" : "text-orange-500"
                }`}
              >
                {item.quantity}
              </td>
              <td className="px-4 py-2 border">{item.location}</td>
              <td
                className={`px-4 py-2 border ${
                  item.condition === "Low Stock"
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
  );
};

export default InventoryTable;
