import { useState } from "react";

const ReportsPage = () => {
    const [reportType, setReportType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [generatedReport, setGeneratedReport] = useState("");

    const handleGenerateReport = () => {
        if (!reportType || !startDate || !endDate) {
            alert("Please select all options to generate the report.");
            return;
        }

        // Logic to generate the report based on the selected options
        const report = `Generating ${reportType} report from ${startDate} to ${endDate}`;
        setGeneratedReport(report);
    };

    return (
        <div className="container mx-auto p-4">
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

                {/* Start Date Selector */}
                <div>
                    <label className="block text-gray-600">Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1 p-2 border rounded"
                    />
                </div>

                {/* End Date Selector */}
                <div>
                    <label className="block text-gray-600">End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
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

            {/* Display the generated report */}
            {generatedReport && (
                <div className="mt-6">
                    <h3 className="font-semibold text-gray-800">Generated Report:</h3>
                    <p className="text-gray-600">{generatedReport}</p>
                </div>
            )}
        </div>
    );
};

export default ReportsPage;
