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


  // token
  const token = localStorage.getItem("authToken");
  
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/godown/products/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
            "Content-Type": "application/json",
          }
        });
        const data = await response.json();
        
        console.log("Fetched data:", data);
        
        if (response.ok) {
          setInventory(data.products);
          console.log("Set inventory:", data.products);
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
            Authorization: `Bearer ${token}`,
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-pulse text-2xl text-gray-700 font-semibold">
          Loading inventory...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-red-50 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl text-red-600 font-bold">{error}</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 tracking-tight">
          Transfer Item
        </h1>

        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-gray-700 text-sm font-semibold uppercase tracking-wide">Select Item</label>
              <select
                onChange={handleItemChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Choose an item...</option>
                {inventory && inventory.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name} - {item.quantity} available
                  </option>
                ))}
              </select>
            </div>

            {selectedItem && (
              <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                <p className="text-gray-600">
                  Current Location:{" "}
                  <span className="font-semibold text-gray-800">{selectedItem.location}</span>
                </p>
                <p className="text-gray-600">
                  Available Quantity:{" "}
                  <span className="font-semibold text-gray-800">{selectedItem.quantity}</span>
                </p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-gray-700 text-sm font-semibold uppercase tracking-wide">Transfer Quantity</label>
              <input
                type="number"
                min="1"
                max={selectedItem ? selectedItem.quantity : 0}
                value={transferQuantity}
                onChange={(e) => setTransferQuantity(Number(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 text-sm font-semibold uppercase tracking-wide">Original Location</label>
              <input
                type="text"
                placeholder="Enter original location"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 text-sm font-semibold uppercase tracking-wide">Destination Location</label>
              <input
                type="text"
                placeholder="Enter destination location"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {message && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium">
                {message}
              </div>
            )}

            <button
              onClick={handleTransfer}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Confirm Transfer
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InventoryMovement;