import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";

const FileUploadZone = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/csv": [".csv"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-8 ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600 text-center">
        {isDragActive
          ? "Drop your file here..."
          : "Drag & drop or click to upload a file"}
      </p>
      <p className="text-sm text-gray-500">Supported formats: CSV, XLSX</p>
    </div>
  );
};

FileUploadZone.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};

const BulkUploadGodown = () => {
  const [file, setFile] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const parseFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const binaryStr = e.target.result;
        if (file.type === "text/csv") {
          const csvData = new TextDecoder().decode(binaryStr);
          const rows = csvData.split("\n").map((row) => row.split(","));
          const parsedData = rows.slice(1).map((row) => ({
            name: row[0]?.trim(),
            price: parseFloat(row[1]?.trim()),
            quantity: parseInt(row[2]?.trim()),
            location: row[3]?.trim(),
            description: row[4]?.trim(),
          }));
          setDataPreview(parsedData);
        } else if (
          file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          const workbook = XLSX.read(binaryStr, { type: "binary" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const parsedData = XLSX.utils.sheet_to_json(sheet);
          setDataPreview(parsedData);
        }
      } catch (error) {
        setErrors([
          "Failed to parse the file. Ensure it is properly formatted.",
        ]);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleFileUpload = (uploadedFile) => {
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    if (!allowedTypes.includes(uploadedFile.type)) {
      setErrors(["Invalid file format. Only .csv or .xlsx allowed."]);
      return;
    }
    setErrors([]);
    setFile(uploadedFile);
    parseFile(uploadedFile);
  };

  const token = localStorage.getItem("authToken");

  const handleConfirmUpload = async () => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(
        "http://localhost:5000/api/v1/godown/products/bulk-upload",
        {
          method: "POST",
          headers: {
            Authorization : `Bearer ${token}`
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to upload data");

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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Bulk Upload Products</h1>
      <FileUploadZone onFileUpload={handleFileUpload} />
      {errors.length > 0 && (
        <div className="bg-red-100 p-4 rounded mt-4 text-red-800">
          {errors.map((err, idx) => (
            <p key={idx}>{err}</p>
          ))}
        </div>
      )}
      {dataPreview.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Preview Data</h2>
          <table className="table-auto w-full mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {dataPreview.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.location}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <button
              onClick={handleConfirmUpload}
              disabled={isUploading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {isUploading ? "Uploading..." : "Confirm Upload"}
            </button>
            <button
              onClick={() => setDataPreview([])}
              className="ml-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkUploadGodown;
