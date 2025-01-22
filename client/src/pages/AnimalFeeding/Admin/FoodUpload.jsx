import { useState } from "react";
import Footer from "../../../components/Footer";

const FoodUpload = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const URL = "http://localhost:4000/api/v1/animal-feeding/products";
  const token = localStorage.getItem("authToken"); // Replace with your actual Bearer token

  const validateInputs = () => {
    if (!name.trim()) {
      return "Product name is required.";
    }
    if (!description.trim()) {
      return "Description is required.";
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      return "Valid price is required.";
    }
    if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
      return "Valid quantity is required.";
    }
    if (!image) {
      return "Product image is required.";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image", image);

    fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create product");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Product created successfully:", data);
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setImage(null);
        setError(null);
        setSuccess("Product created successfully!");
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-green-50">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
          Upload New Animal Product
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          {/* Product Name */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="product-name">
              Product Name
            </label>
            <input
              type="text"
              id="product-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. Mashudu"
              required
            />
          </div>

          {/* Product Description */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded w-full p-3 h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Description of the product"
              required
            ></textarea>
          </div>

          {/* Product Price */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="price">
              Price (Tsh)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. 2500"
              required
            />
          </div>

          {/* Product Quantity */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. 100"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="image">
              Product Image
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {error && <p className="text-red-600 mb-4">{error.message}</p>}
          {success && <p className="text-green-600 mb-4">{success}</p>}

          <button
            type="submit"
            className="bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700 transition duration-200"
          >
            Upload Product
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default FoodUpload;
