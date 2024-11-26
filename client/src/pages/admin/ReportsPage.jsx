import React, { useState } from "react";

const ReportsPage = () => {
    const [reportType, setReportType] = useState("");
    const [dateRange, setDateRange] = useState("");

    const handleGenerateReport = () => {
        // Logic to generate the report based on the selected options
        console.log(`Generating ${reportType} report for ${dateRange}`);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Generate Reports</h2>

            <div className="mt-4 space-y-4">
                {/* Report Type Selector */}
                <div>
                    <label className="block text-gray-600">Select Report Type:</label>
                    <select
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                        className="mt-1 p-2 border rounded"
                    >
                        <option value="">-- Select Report --</option>
                        <option value="sales">Sales Report</option>
                        <option value="inventory">Inventory Report</option>
                        <option value="user-activity">User Activity Report</option>
                    </select>
                </div>

                {/* Date Range Selector */}
                <div>
                    <label className="block text-gray-600">Select Date Range:</label>
                    <input
                        type="date"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="mt-1 p-2 border rounded"
                    />
                </div>

                {/* Generate Report Button */}
                <div>
                    <button
                        onClick={handleGenerateReport}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Placeholder for the generated report */}
            <div className="mt-6">
                <h3 className="font-semibold text-gray-800">Generated Report:</h3>
                {/* Display the generated report here */}
                <p className="text-gray-600">Report will be displayed here after generation.</p>
            </div>
        </div>
    );
};

export default ReportsPage;
