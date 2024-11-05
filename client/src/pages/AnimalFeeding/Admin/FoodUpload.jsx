import React, { useState } from "react";
import Footer from "../../../components/Footer";

const FoodUpload = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle upload logic here
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
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="product-name">
              Product Name
            </label>
            <input
              type="text"
              id="product-name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded w-full p-3 h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="price">
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
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
              required
            />
          </div>
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
          <button
            type="submit"
            className="bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600 transition duration-200"
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
