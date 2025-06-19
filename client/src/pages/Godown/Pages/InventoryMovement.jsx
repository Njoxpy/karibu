import { useState, useEffect } from "react";
import Footer from "../../../components/Footer";

const InventoryMovement = () => {
  // create variable for api url
  const baseURL = import.meta.env.VITE_API_URL;

  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [transferQuantity, setTransferQuantity] = useState(0);
  const [destination, setDestination] = useState("");
  const [origin, setOrigin] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);

  // Token
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(`${baseURL}/godown/products/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.ok) {
          setInventory(data.products || []);
        } else {
          setError(data.message || "Failed to fetch inventory.");
        }
      } catch (error) {
        setError("Failed to fetch inventory.");
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [token]);

  const handleItemChange = (e) => {
    const item = inventory.find((i) => i._id === e.target.value);
    setSelectedItem(item);
    setTransferQuantity(0); // Reset transfer quantity when item changes
  };

  const handleTransfer = async () => {
    if (!selectedItem) {
      setMessage("Please select an item.");
      return;
    }
    if (transferQuantity <= 0) {
      setMessage("Transfer quantity must be greater than 0.");
      return;
    }
    if (transferQuantity > selectedItem.quantity) {
      setMessage("Transfer quantity exceeds available stock.");
      return;
    }
    if (!origin || !destination) {
      setMessage("Please provide both origin and destination locations.");
      return;
    }

    setIsTransferring(true);
    setMessage("");

    try {
      const response = await fetch(`${baseURL}/godown/inventory-movement`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedItemId: selectedItem._id,
          transferQuantity,
          origin,
          destination,
          reason,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Transfer successful!");
        setSelectedItem(null);
        setTransferQuantity(0);
        setOrigin("");
        setDestination("");
        setReason("");
      } else {
        setMessage(data.message || "Failed to process transfer.");
      }
    } catch (error) {
      setMessage("An error occurred during the transfer.");
      console.error("Error during transfer:", error);
    } finally {
      setIsTransferring(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
              <label className="text-gray-700 text-sm font-semibold uppercase tracking-wide">
                Select Item
              </label>
              <select
                onChange={handleItemChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Choose an item...</option>
                {inventory.map((item) => (
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
                  <span className="font-semibold text-gray-800">
                    {selectedItem.location}
                  </span>
                </p>
                <p className="text-gray-600">
                  Available Quantity:{" "}
                  <span className="font-semibold text-gray-800">
                    {selectedItem.quantity}
                  </span>
                </p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-gray-700 text-sm font-semibold uppercase tracking-wide">
                Transfer Quantity
              </label>
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
              <label className="text-gray-700 text-sm font-semibold uppercase tracking-wide">
                Reason
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter reason for transfer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 text-sm font-semibold uppercase tracking-wide">
                Original Location
              </label>
              <input
                type="text"
                placeholder="Enter original location"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 text-sm font-semibold uppercase tracking-wide">
                Destination Location
              </label>
              <input
                type="text"
                placeholder="Enter destination location"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg text-sm font-medium ${
                  message.includes("success")
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {message}
              </div>
            )}

            <button
              onClick={handleTransfer}
              disabled={isTransferring}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTransferring ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              ) : (
                "Confirm Transfer"
              )}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InventoryMovement;
