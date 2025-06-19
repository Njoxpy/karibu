import { useState } from "react";
import Footer from "../../../components/Footer";
import InputField from "./InputField"; // Import the InputField component

const UploadGodownItems = () => {
  // create variable for api url
  const baseURL = import.meta.env.VITE_API_URL;

  const URL = `${baseURL}/godown/products`;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const token = localStorage.getItem("authToken");

  if (!token) {
    return "Token not found";
  }

  const validateForm = () => {
    if (!name || !description || !price || !quantity || !location) {
      return "All fields are required.";
    }
    if (price <= 0) {
      return "Price must be a positive number.";
    }
    if (quantity <= 0) {
      return "Quantity must be a positive number.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true); // Show loading state
    setError(null);

    const newProduct = {
      name,
      price,
      quantity,
      location,
      description,
    };

    try {
      const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Failed to add product");
      }

      // Reset form fields
      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setLocation("");

      // Show success modal
      setIsSuccessModalOpen(true);
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Upload Godown Item
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <InputField
            label="Product Name"
            type="text"
            id="product-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            required
          />

          <InputField
            label="Description"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            required
          />

          <InputField
            label="Price Per Item (Tsh)"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
            isNumber={true}
            min={1}
          />

          <InputField
            label="Quantity"
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            required
            isNumber={true}
            min={1}
          />

          <InputField
            label="Location"
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            required
          />

          {error && (
            <div className="mb-6 text-red-600 text-center font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white text-lg rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            ) : (
              "Upload Product"
            )}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Success!</h2>
            <p className="text-gray-700 mb-6">
              The product has been uploaded successfully.
            </p>
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default UploadGodownItems;
