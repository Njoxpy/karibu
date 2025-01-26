import React, { useState, useEffect } from "react";
import { getToken } from "../../../../services/token";

const MovementLogs = () => {
  const [movementLogs, setMovementLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = getToken();

  // Define fetchMovementLogs function
  const fetchMovementLogs = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/godown/movement-logs",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movement logs.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching movement logs:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logs = await fetchMovementLogs(token);
        setMovementLogs(logs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Movement Logs</h1>
      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Origin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transferred By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {movementLogs.map((log) => (
              <tr key={log._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {log.productId?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {log.transferQuantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{log.origin}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {log.destination}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{log.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {log.transferredBy?.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovementLogs;
