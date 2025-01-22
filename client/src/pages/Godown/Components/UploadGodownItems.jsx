import { useState } from "react";
import Footer from "../../../components/Footer";
import InputField from "./InputField"; // import the InputField component

const UploadGodownItems = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("authToken");

  if (!token) {
    return "token not found"
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

    const newProduct = {
      name,
      code,
      price,
      quantity,
      location,
      description,
    };

    const URL = "http://localhost:5000/api/v1/godown/products";
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
        setError(json.error || "Failed to add product");
        setIsLoading(false); // Hide loading state
        return;
      }

      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setLocation("");
      setError(null);
      setSuccess(true);
      setIsLoading(false); // Hide loading state
      console.log("New product added:", json);
    } catch (err) {
      setError("An unexpected error occurred");
      setIsLoading(false); // Hide loading state
      console.error("Error:", err);
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

          {success && (
            <div className="mb-6 text-green-600 text-center font-medium">
              Product successfully uploaded!
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white text-lg rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            {isLoading ? (
              <span className="animate-spin">Submitting...</span>
            ) : (
              "Upload Product"
            )}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UploadGodownItems;
