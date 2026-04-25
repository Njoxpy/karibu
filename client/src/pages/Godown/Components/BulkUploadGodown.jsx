import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import ImageGuide from "../../../assets/images/excell format.webp";
import * as XLSX from "xlsx";

// FileUploadZone Component
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
      className={`cursor-pointer border-2 border-dashed rounded-xl p-8 text-center ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        {isDragActive
          ? "Drop your file here..."
          : "Drag & drop or click to upload a file"}
      </p>
      <p className="text-sm text-gray-500 mt-2">Supported formats: CSV, XLSX</p>
    </div>
  );
};

FileUploadZone.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};

// SuccessModal Component
const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Success!</h2>
        <p className="text-gray-700 mb-6">
          The products have been uploaded successfully.
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

SuccessModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

// BulkUploadGodown Component
const BulkUploadGodown = () => {

       // create variable for api url
     const baseURL = import.meta.env.VITE_API_URL;
  const [file, setFile] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isGuideVisible, setIsGuideVisible] = useState(false);

  // Parse uploaded file
  const parseFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const binaryStr = e.target.result;
        let parsedData = [];

        if (file.type === "text/csv") {
          const csvData = new TextDecoder().decode(binaryStr);
          const rows = csvData.split("\n").map((row) => row.split(","));
          parsedData = rows.slice(1).map((row) => ({
            name: row[0]?.trim(),
            price: parseFloat(row[1]?.trim()),
            quantity: parseInt(row[2]?.trim()),
            location: row[3]?.trim(),
            description: row[4]?.trim(),
          }));
        } else if (
          file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          const workbook = XLSX.read(binaryStr, { type: "binary" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          parsedData = XLSX.utils.sheet_to_json(sheet);
        }

        setDataPreview(parsedData);
        setErrors([]);
      } catch (error) {
        setErrors([
          "Failed to parse the file. Ensure it is properly formatted.",
        ]);
      }
    };
    reader.readAsBinaryString(file);
  };

  // Handle file upload
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

  // Handle confirm upload
  const handleConfirmUpload = async () => {
    setIsUploading(true);
    setErrors([]);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${baseURL}/godown/products/bulk-upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to upload data");
      }

      setIsSuccessModalOpen(true);
      setFile(null);
      setDataPreview([]);
    } catch (err) {
      setErrors([err.message || "An unexpected error occurred"]);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Bulk Upload Products</h1>

      {/* Guide Section */}
      <div className="mb-6">
        <button
          onClick={() => setIsGuideVisible(!isGuideVisible)}
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          {isGuideVisible ? "Hide Guide" : "Show Guide"}
        </button>
        {isGuideVisible && (
          <div className="mt-4 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">
              Jinsi ya Kupakia Bidhaa Kwa Wingi
            </h2>
            <p className="text-gray-700 mb-4">
              Fuata hatua hizi kuandaa na kupakia data zako za bidhaa:
            </p>
            <ol className="list-decimal list-inside space-y-3">
              <li>
                <strong>Andaa Faili Yako:</strong>
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>
                    Tumia umbizo la faili la <strong>.csv</strong> au{" "}
                    <strong>.xlsx</strong>.
                  </li>
                  <li>
                    Hakikisha faili lako lina safu zifuatazo kwa mpangilio:
                    <div className="m-4">
                      <p className="text-gray-700 mb-4">
                        Mfano wa picha ya file la excell
                      </p>
                      <img src={ImageGuide} className="m-2"></img>
                    </div>
                    <ul className="list-disc list-inside ml-6 mt-1">
                      <li>
                        <code>Jina / name</code> (Jina la Bidhaa)
                      </li>
                      <li>
                        <code>Maelezo / description</code> (Maelezo ya Bidhaa)
                      </li>
                      <li>
                        <code>Bei / price</code> (Bei ya Bidhaa)
                      </li>
                      <li>
                        <code>Kiasi / quantity</code> (Kiasi cha Bidhaa)
                      </li>
                      <li>
                        <code>Mahali / location</code> (Mahali pa Bidhaa)
                      </li>
                    </ul>
                  </li>
                  <li>Usijumuisha vichwa vya safu katika faili.</li>
                </ul>
              </li>
              <li>
                <strong>Pakia Faili Yako:</strong>
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>
                    Vuta na uache faili lako katika eneo la kupakia au bonyeza
                    ili kuchagua.
                  </li>
                  <li>Hakikisha ukubwa wa faili hauzidi 5MB.</li>
                </ul>
              </li>
              <li>
                <strong>Kagua na Thibitisha:</strong>
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>Angalia data ili kuhakikisha ni sahihi.</li>
                  <li>
                    Bonyeza <strong>Thibitisha Kupakia</strong> kumaliza
                    mchakato.
                  </li>
                </ul>
              </li>
            </ol>
            <p className="text-gray-700 mt-4">
              Ikiwa utapata matatizo, hakikisha faili lako linazingatia muundo
              uliotajwa hapo juu na jaribu tena.
            </p>
          </div>
        )}
      </div>

      {/* File Upload Zone */}
      <FileUploadZone onFileUpload={handleFileUpload} />

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="bg-red-100 p-4 rounded mt-4 text-red-800">
          {errors.map((err, idx) => (
            <p key={idx}>{err}</p>
          ))}
        </div>
      )}

      {/* Data Preview */}
      {dataPreview.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Preview Data</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-lg rounded-lg">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {dataPreview.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.price}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{item.location}</td>
                    <td className="px-4 py-2">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleConfirmUpload}
              disabled={isUploading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isUploading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </div>
              ) : (
                "Confirm Upload"
              )}
            </button>
            <button
              onClick={() => setDataPreview([])}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default BulkUploadGodown;
