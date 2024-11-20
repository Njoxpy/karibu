import React, { useState } from "react";
import Footer from "../../../components/Footer";

function BulkUploadHardware() {
    const [file, setFile] = useState(null);
    const [dataPreview, setDataPreview] = useState([]);
    const [errors, setErrors] = useState([]);

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (validateFileFormat(uploadedFile)) {
            parseFile(uploadedFile);
            setFile(uploadedFile);
        } else {
            setErrors(["Invalid file format. Only .csv or .xlsx allowed."]);
        }
    };

    const validateFileFormat = (file) => {
        const validFormats = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
        return validFormats.includes(file.type);
    };

    const parseFile = (file) => {
        // Mock file parsing (replace with actual logic)
        const previewData = [
            { name: "Product 1", category: "Category A", price: 100, quantity: 50 },
            { name: "Product 2", category: "Category B", price: 200, quantity: 30 },
        ];
        setDataPreview(previewData);
    };

    const handleConfirmUpload = () => {
        console.log("Uploading data to server...");
        // Simulate successful upload
        alert("Products uploaded successfully!");
        setFile(null);
        setDataPreview([]);
    };

    return (
        <>
            <div className="p-6 bg-gray-50 min-h-screen">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Bulk Upload Products</h2>
                <p className="text-gray-600 mb-6">Upload your product data in CSV or Excel format.</p>

                {/* Upload Zone */}
                <div className="border-2 border-dashed border-blue-400 bg-blue-50 p-6 rounded-lg flex flex-col items-center justify-center mb-6">
                    <input
                        type="file"
                        accept=".csv,.xlsx"
                        id="file-input"
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                    <label
                        htmlFor="file-input"
                        className="cursor-pointer text-blue-500 text-lg font-medium py-2 px-4 border border-blue-400 rounded-md hover:bg-blue-100"
                    >
                        Drag and drop your file here or click to upload
                    </label>
                </div>

                {/* Error Box */}
                {errors.length > 0 && (
                    <div className="bg-red-50 border border-red-300 text-red-600 p-4 rounded mb-6">
                        {errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}

                {/* File Preview Table */}
                {dataPreview.length > 0 && (
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 mb-6">
                        <table className="table-auto w-full text-left border-collapse">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="px-4 py-2 border-b">Product Name</th>
                                    <th className="px-4 py-2 border-b">Category</th>
                                    <th className="px-4 py-2 border-b">Price</th>
                                    <th className="px-4 py-2 border-b">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataPreview.map((row, index) => (
                                    <tr key={index} className="even:bg-gray-50">
                                        <td className="px-4 py-2 border-b">{row.name}</td>
                                        <td className="px-4 py-2 border-b">{row.category}</td>
                                        <td className="px-4 py-2 border-b">{row.price}</td>
                                        <td className="px-4 py-2 border-b">{row.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Action Buttons */}
                {dataPreview.length > 0 && (
                    <div className="flex gap-4">
                        <button
                            onClick={handleConfirmUpload}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
                            disabled={errors.length > 0}
                        >
                            Confirm Upload
                        </button>
                        <button
                            onClick={() => {
                                setFile(null);
                                setDataPreview([]);
                                setErrors([]);
                            }}
                            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default BulkUploadHardware;
