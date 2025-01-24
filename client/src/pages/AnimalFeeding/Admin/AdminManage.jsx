import React, { useState, useEffect } from "react";
import Footer from "../../../components/Footer";
import { getToken } from "../../../services/token";

const AdminManage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [quantityFilter, setQuantityFilter] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // New state for sorting order
  const [currentItems, setCurrentItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditSuccessModalOpen, setIsEditSuccessModalOpen] = useState(false);
  const [isDeleteSuccessModalOpen, setIsDeleteSuccessModalOpen] =
    useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const token = getToken();
  const baseURL = "http://localhost:5000";

  const itemsPerPage = 10; // Adjust as needed

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${baseURL}/api/v1/animal-feeding/products/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      setCurrentItems(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filterProducts(e.target.value, quantityFilter, sortOrder);
  };

  const handleQuantityFilter = (e) => {
    setQuantityFilter(e.target.value);
    filterProducts(searchQuery, e.target.value, sortOrder);
  };

  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
    filterProducts(searchQuery, quantityFilter, e.target.value);
  };

  const filterProducts = (search, quantity, order) => {
    let filteredProducts = products;
    if (search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (quantity) {
      filteredProducts = filteredProducts.filter(
        (product) => product.quantity >= parseInt(quantity)
      );
    }
    if (order) {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (order === "asc") {
          return a.quantity - b.quantity;
        } else if (order === "desc") {
          return b.quantity - a.quantity;
        }
        return 0;
      });
    }
    setCurrentItems(filteredProducts);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${baseURL}/api/v1/animal-feeding/products/${editProduct._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editProduct),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedProduct = await response.json();
      setProducts(
        products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
      setIsEditModalOpen(false);
      setIsEditSuccessModalOpen(true);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${baseURL}/api/v1/animal-feeding/products/${selectedProduct._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setProducts(
        products.filter((product) => product._id !== selectedProduct._id)
      );
      setIsDeleteModalOpen(false);
      setIsDeleteSuccessModalOpen(true);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-green-500">
          Manage Products
        </h1>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="number"
          placeholder="Filter by quantity..."
          value={quantityFilter}
          onChange={handleQuantityFilter}
          className="border p-2 mb-4 w-full"
        />
        <select
          value={sortOrder}
          onChange={handleSortOrder}
          className="border p-2 mb-4 w-full"
        >
          <option value="">Sort by quantity</option>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentItems.map((product) => (
            <div key={product._id} className="border p-4 rounded">
              <img
                src={
                  product.image
                    ? `${baseURL}${product.image}`
                    : "/default-image.jpg"
                }
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p>{product.description}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Price: Tsh{product.price}</p>
              <p>Nutrients: {product.nutrients}</p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setEditProduct(product);
                    setIsEditModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(currentItems.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentItems(
                    currentItems.slice(
                      index * itemsPerPage,
                      (index + 1) * itemsPerPage
                    )
                  )
                }
                className={`px-4 py-2 mx-1 rounded ${
                  currentItems.slice(
                    index * itemsPerPage,
                    (index + 1) * itemsPerPage
                  ).length === itemsPerPage
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-4 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Item</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Item Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editProduct.name}
                    onChange={handleInputChange}
                    className={`border p-2 w-full rounded ${
                      validationErrors.name ? "border-red-500" : ""
                    }`}
                  />
                  {validationErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.name}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={editProduct.description}
                    onChange={handleInputChange}
                    className={`border p-2 w-full rounded ${
                      validationErrors.description ? "border-red-500" : ""
                    }`}
                  />
                  {validationErrors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.description}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={editProduct.price}
                    onChange={handleInputChange}
                    className={`border p-2 w-full rounded ${
                      validationErrors.price ? "border-red-500" : ""
                    }`}
                  />
                  {validationErrors.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.price}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={editProduct.quantity}
                    onChange={handleInputChange}
                    className={`border p-2 w-full rounded ${
                      validationErrors.quantity ? "border-red-500" : ""
                    }`}
                  />
                  {validationErrors.quantity && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.quantity}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Nutrients</label>
                  <input
                    type="text"
                    name="nutrients"
                    value={editProduct.nutrients}
                    onChange={handleInputChange}
                    className={`border p-2 w-full rounded ${
                      validationErrors.nutrients ? "border-red-500" : ""
                    }`}
                  />
                  {validationErrors.nutrients && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.nutrients}
                    </p>
                  )}
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setValidationErrors({});
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded w-full md:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-4 rounded w-full md:w-auto"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-4 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Delete Item</h2>
              <p>Are you sure you want to delete this item?</p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {isEditSuccessModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-4 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Success</h2>
              <p>Product updated successfully!</p>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() => setIsEditSuccessModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {isDeleteSuccessModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-4 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Success</h2>
              <p>Product deleted successfully!</p>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() => setIsDeleteSuccessModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminManage;
