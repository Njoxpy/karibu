import { useState, useEffect } from "react";
import Footer from "../../../components/Footer";

const InventoryMovement = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [transferQuantity, setTransferQuantity] = useState(0);
  const [destination, setDestination] = useState("");
  const [origin, setOrigin] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/godown/products/");
        const data = await response.json();
        
        if (response.ok) {
          setInventory(data.products);
          setLoading(false);
        } else {
          setMessage(data.message || "Failed to fetch inventory.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
        setError("Failed to fetch inventory.");
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleItemChange = (e) => {
    const item = inventory.find((i) => i._id === e.target.value);
    setSelectedItem(item);
  };

  const handleTransfer = async () => {
    if (selectedItem && transferQuantity > 0 && destination && origin) {
      if (transferQuantity > selectedItem.quantity) {
        alert("Transfer quantity exceeds available stock.");
      } else {
        try {
          const response = await fetch("http://localhost:5000/api/v1/godown/inventory-movement", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              selectedItemId: selectedItem._id,
              transferQuantity,
              origin,
              destination,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            alert(data.message);
            setSelectedItem(null);
            setTransferQuantity(0);
            setOrigin("");
            setDestination("");
          } else {
            setMessage(data.message);
          }
        } catch (error) {
          setMessage("An error occurred during the transfer.");
          console.error(error);
        }
      }
    } else {
      setMessage("Please fill in all fields.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <h1 className="text-xl">Loading inventory...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <h1 className="text-xl text-red-500 p-2 mb-2 font-bold">{error}</h1>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-4 text-center">Transfer Item</h1>

        <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
          <label className="block mb-2 font-semibold">Select Item</label>
          <select
            onChange={handleItemChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="">Choose an item...</option>
            {inventory && inventory.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name} - {item.quantity} available
              </option>
            ))}
          </select>

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

          <label className="block mb-2 font-semibold">Transfer Quantity</label>
          <input
            type="number"
            min="1"
            max={selectedItem ? selectedItem.quantity : 0}
            value={transferQuantity}
            onChange={(e) => setTransferQuantity(Number(e.target.value))}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <label className="block mb-2 font-semibold">Original Location</label>
          <input
            type="text"
            placeholder="Enter original location"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <label className="block mb-2 font-semibold">
            Destination Location
          </label>
          <input
            type="text"
            placeholder="Enter destination location"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          {message && <p className="text-red-500 text-sm p-2 mb-2 font-bold">{message}</p>}

          <button
            onClick={handleTransfer}
            className="w-full p-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 transition"
          >
            Confirm Transfer
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InventoryMovement;