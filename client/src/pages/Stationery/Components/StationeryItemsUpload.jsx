import { useState } from "react";
import Footer from "../../../components/Footer";
import { getToken } from "../../../services/token";

const StationeryItemsUpload = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const URL = `${import.meta.env.VITE_API_URL}/stationery/products`; 
  const token = getToken();

  const validateInputs = () => {
    if (!name.trim()) return "Product name is required.";
    if (!description.trim()) return "Description is required.";
    if (!price || isNaN(price) || Number(price) <= 0)
      return "Valid price is required.";
    if (!quantity || isNaN(quantity) || Number(quantity) <= 0)
      return "Valid quantity is required.";
    if (!image) return "Product image is required.";
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
        if (!response.ok) throw new Error("Failed to create product");
        return response.json();
      })
      .then(() => {
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setImage(null);
        setError(null);
        setSuccess(true); // Show success modal
      })
      .catch((error) => {
        setError(error.message);
        setSuccess(false);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Upload Stationery Product
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6"
        >
          <div>
            <label className="block mb-2 text-gray-700" htmlFor="product-name">
              Product Name
            </label>
            <input
              type="text"
              id="product-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Penseli"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded w-full p-3 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description of the product"
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-2 text-gray-700" htmlFor="price">
              Price (Tsh)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 2500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 100"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700" htmlFor="image">
              Product Image
            </label>
            <input
              type="file"
              accept=".png, .jpeg, .gif, .jpg"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 bg-red-100 p-2 rounded">{error}</p>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Upload Product
          </button>
        </form>
      </div>

      {/* Modal */}
      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Product Added Successfully!
            </h2>
            <button
              onClick={() => setSuccess(false)}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
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

export default StationeryItemsUpload;
