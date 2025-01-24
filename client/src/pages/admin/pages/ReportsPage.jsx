import { useState } from "react";
import { getToken } from "../../../services/token";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2, Download } from "lucide-react";

const ReportsPage = () => {
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reportBlob, setReportBlob] = useState(null); // Store the generated report Blob
  const token = getToken();

  const handleGenerateReport = async () => {
    setError("");
    setReportBlob(null); // Reset the report Blob

    if (!reportType || !startDate || !endDate) {
      const errorMessage = "Please select all options to generate the report.";
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setLoading(true);

    const apiUrl = `http://localhost:5000/api/v1/${reportType}/reports?startDate=${startDate}&endDate=${endDate}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch report data.");
      }

      const blob = await response.blob();
      setReportBlob(blob); // Store the Blob in state

      toast.success(
        `Report for ${reportType} from ${startDate} to ${endDate} generated successfully.`
      );
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (!reportBlob) return;

    const url = URL.createObjectURL(reportBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${reportType}-report-${startDate}-to-${endDate}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-12">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        className="z-50"
      />

      <div className="w-full max-w-md bg-white shadow-xl rounded-xl border border-gray-200 p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Generate Reports
        </h2>

        <div className="space-y-4">
          {/* Report Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="">-- Select Report --</option>
              <option value="printing">Printing</option>
              <option value="fresh-oil">Fresh Oil</option>
              <option value="hardware">Hardware</option>
              <option value="animal-feeding">Animal Feeding</option>
              <option value="godown">Godown</option>
              <option value="stationery">Stationery</option>
            </select>
          </div>

          {/* Date Selectors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Generate Report Button */}
          <button
            onClick={handleGenerateReport}
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 flex items-center justify-center disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Report"
            )}
          </button>

          {/* Download Report Button */}
          {reportBlob && (
            <button
              onClick={handleDownloadReport}
              className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300 flex items-center justify-center"
            >
              <Download className="mr-2" />
              Download Report
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-md text-sm">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
