import { useState } from "react";
import Footer from "../../../components/Footer";

const UploadGodownItems = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

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

    const URL = "http://localhost:5000/api/v1/godown/products";

    const newProduct = {
      name,
      description,
      price,
      quantity,
      location,
    };

    try {
      const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Failed to add product");
        return;
      }

      // Reset form fields if successful
      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setLocation("");
      setError(null);
      console.log("New product added:", json);
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Error:", err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-semibold mb-6 text-center text-white">Upload Godown Item</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-medium" htmlFor="product-name">
              Product Name
            </label>
            <input
              type="text"
              id="product-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded w-full p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded w-full p-4 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
              required
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-medium" htmlFor="price">
              Price Per Item (Tsh)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded w-full p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-medium" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border border-gray-300 rounded w-full p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quantity"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-medium" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-300 rounded w-full p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter location"
              required
            />
          </div>

          {error && (
            <div className="mb-6 text-red-600 text-center font-medium">{error}</div>
          )}
          
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white text-lg rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Upload Product
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UploadGodownItems;
