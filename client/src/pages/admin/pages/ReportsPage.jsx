import React, { useState } from "react";
import { getToken } from "../../../services/token";

const ReportsPage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const token = getToken();
  const categories = [
    "Animal Feeding",
    "Printing",
    "Fresh Oil",
    "Hardware",
    "Godown",
    "Stationery",
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleGenerateReport = async () => {
    if (!startDate || !endDate || !selectedCategory) {
      alert("Please select all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/${selectedCategory
          .toLowerCase()
          .replace(
            " ",
            "-"
          )}/reports?startDate=${startDate}&endDate=${endDate}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/pdf",
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${selectedCategory
          .toLowerCase()
          .replace(" ", "_")}_report.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Report generation error:", error);
      alert("Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Generate Report</h2>

        {/* Category Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`p-4 rounded-lg transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-blue-200 text-blue-700 hover:bg-blue-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Date Range Inputs */}
        <div className="mb-4">
          <label className="block text-blue-700 mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-6">
          <label className="block text-blue-700 mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Generate Report Button */}
        <button
          onClick={handleGenerateReport}
          disabled={loading || !selectedCategory}
          className={`w-full p-3 rounded-md transition-colors ${
            selectedCategory && !loading
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Generating..." : "Generate Report"}
        </button>
      </div>
    </div>
  );
};

export default ReportsPage;
