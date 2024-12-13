import { useState } from "react";
import Footer from "../../../components/Footer";

const UploadGodownItems = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle upload logic here
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
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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
