import { useState } from "react";

const InventoryMovement = () => {
  // Sample inventory for selection (normally fetched from the database)
  const inventory = [
    {
      id: 1,
      name: "Animal Feed A",
      code: "AF-1001",
      quantity: 50,
      location: "Aisle 1",
    },
    {
      id: 2,
      name: "Animal Feed B",
      code: "AF-2002",
      quantity: 30,
      location: "Aisle 2",
    },
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const [transferQuantity, setTransferQuantity] = useState(0);
  const [destination, setDestination] = useState("");
  const [origin, setOrigin] = useState("");

  const handleItemChange = (e) => {
    const item = inventory.find((i) => i.id === parseInt(e.target.value));
    setSelectedItem(item);
  };

  const handleTransfer = () => {
    if (selectedItem && transferQuantity > 0 && destination) {
      if (transferQuantity > selectedItem.quantity) {
        alert("Transfer quantity exceeds available stock.");
      } else {
        // Perform transfer (this would involve a backend API call)
        alert(
          `Transferred ${transferQuantity} of ${selectedItem.name} to ${destination}`
        );
        setSelectedItem(null);
        setTransferQuantity(0);
        setDestination("");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Transfer Item</h1>

      <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
        {/* Select Item */}
        <label className="block mb-2 font-semibold">Select Item</label>
        <select
          onChange={handleItemChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="">Choose an item...</option>
          {inventory.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} - {item.quantity} available
            </option>
          ))}
        </select>

        {/* Current Location */}
        {selectedItem && (
          <div className="mb-4">
            <p>
              Current Location:{" "}
              <span className="font-semibold">{selectedItem.location}</span>
            </p>
            <p>
              Available Quantity:{" "}
              <span className="font-semibold">{selectedItem.quantity}</span>
            </p>
          </div>
        )}

        {/* Quantity for Transfer */}
        <label className="block mb-2 font-semibold">Transfer Quantity</label>
        <input
          type="number"
          min="1"
          max={selectedItem ? selectedItem.quantity : 0}
          value={transferQuantity}
          onChange={(e) => setTransferQuantity(Number(e.target.value))}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        {/* origin location */}
        <label className="block mb-2 font-semibold">Original Location</label>
        <input
          type="text"
          placeholder="Enter original location"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        {/* Destination Location */}
        <label className="block mb-2 font-semibold">Destination Location</label>
        <input
          type="text"
          placeholder="Enter destination location"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        {/* Confirm Transfer Button */}
        <button
          onClick={handleTransfer}
          className="w-full p-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
        >
          Confirm Transfer
        </button>
      </div>
    </div>
  );
};

export default InventoryMovement;
