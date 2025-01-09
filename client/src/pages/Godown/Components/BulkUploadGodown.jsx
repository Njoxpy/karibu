import { useState, useCallback } from "react";
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import * as XLSX from "xlsx";
import Footer from "../../../components/Footer";

const FileUploadZone = ({ onFileUpload }) => {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles?.length) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-xl p-8
        transition-all duration-200 ease-in-out
        ${isDragActive 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-blue-400 bg-white'
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-4">
        <svg
          className={`w-12 h-12 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-center text-gray-600">
          {isDragActive 
            ? "Drop your file here..."
            : "Drag & drop your file here or click to select"
          }
        </p>
        <p className="text-sm text-gray-500">Supported formats: CSV, XLSX</p>
      </div>
    </div>
  );
};

FileUploadZone.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};

const PreviewTable = ({ data }) => (
  <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
    <table className="w-full border-collapse">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Product Name</th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Category</th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Price</th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Quantity</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((row, index) => (
          <tr key={index} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 text-sm text-gray-700">{row.name}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{row.category}</td>
            <td className="px-6 py-4 text-sm text-gray-700">${row.price.toFixed(2)}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{row.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

PreviewTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const BulkUploadGodown = () => {
  const [file, setFile] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

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
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      let dataPreview = [];

      if (file.type === "text/csv") {
        // Parse CSV
        const csvData = new TextDecoder().decode(binaryStr);
        const rows = csvData.split("\n").map(row => row.split(","));
        // Assuming the first row is the header
        rows.slice(1).forEach(row => {
          dataPreview.push({
            name: row[0],
            category: row[1],
            price: parseFloat(row[2]),
            quantity: parseInt(row[3]),
          });
        });
      } else if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        // Parse Excel using xlsx library
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Assuming first sheet is for data
        const sheetData = XLSX.utils.sheet_to_json(sheet);

        sheetData.forEach(row => {
          dataPreview.push({
            name: row["Product Name"],
            category: row["Category"],
            price: parseFloat(row["Price"]),
            quantity: parseInt(row["Quantity"]),
          });
        });
      }

      setDataPreview(dataPreview);
    };
    
    reader.readAsBinaryString(file);
  };

  const handleConfirmUpload = async () => {
    if (errors.length > 0) return;
    
    setIsUploading(true);
    try {
      const response = await fetch("http://localhost:5000/api/v1/godown/products/bulk-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: dataPreview }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed");
      
      setFile(null);
      setDataPreview([]);
      setErrors([]);
    } catch (err) {
      setErrors([err.message || "An unexpected error occurred"]);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bulk Upload Products</h1>
            <p className="mt-2 text-gray-600">Upload your product data using CSV or Excel format</p>
          </div>

          <FileUploadZone onFileUpload={handleFileUpload} />

          {errors.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              {errors.map((error, index) => (
                <p key={index} className="text-red-700">{error}</p>
              ))}
            </div>
          )}

          {dataPreview.length > 0 && (
            <div className="space-y-6">
              <PreviewTable data={dataPreview} />
              
              <div className="flex gap-4">
                <button
                  onClick={handleConfirmUpload}
                  disabled={isUploading || errors.length > 0}
                  className="
                    px-6 py-3 rounded-lg
                    bg-blue-600 hover:bg-blue-700
                    text-white font-medium
                    transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  "
                >
                  {isUploading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Uploading...
                    </span>
                  ) : (
                    'Confirm Upload'
                  )}
                </button>
                
                <button
                  onClick={() => {
                    setFile(null);
                    setDataPreview([]);
                    setErrors([]);
                  }}
                  className="
                    px-6 py-3 rounded-lg
                    bg-gray-200 hover:bg-gray-300
                    text-gray-700 font-medium
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                  "
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BulkUploadGodown;
