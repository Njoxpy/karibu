import React, { useState, useEffect } from "react";
import Footer from "../../../components/Footer";
import { getToken } from "../../../services/token";

const ManageStationeryProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [quantityFilter, setQuantityFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [modalType, setModalType] = useState(null); // 'edit', 'delete', 'editSuccess', 'deleteSuccess'
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = getToken();
  const baseURL = "http://localhost:5000";
  const itemsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, quantityFilter, sortOrder, products]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}/api/v1/stationery/products/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (quantityFilter) {
      filtered = filtered.filter(
        (product) => product.quantity >= parseInt(quantityFilter)
      );
    }

    if (sortOrder) {
      filtered = filtered.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.quantity - b.quantity;
        } else if (sortOrder === "desc") {
          return b.quantity - a.quantity;
        }
        return 0;
      });
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${baseURL}/api/v1/stationery/products/${editProduct._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...editProduct,
            price: Number(editProduct.price),
            quantity: Number(editProduct.quantity),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(
        products.map((product) => (product._id === data._id ? data : product))
      );
      setModalType("editSuccess");
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product. Please check the input values.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseURL}/api/v1/stationery/products/${selectedProduct._id}`,
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
      setModalType("deleteSuccess");
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (products.length === 0) {
    return (
      <>
        <div>
          <h1>No products</h1>
          <p>There are current no products for now!</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">
            Manage Products
          </h1>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Filter by quantity..."
              value={quantityFilter}
              onChange={(e) => setQuantityFilter(e.target.value)}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sort by quantity</option>
              <option value="asc">Lowest to Highest</option>
              <option value="desc">Highest to Lowest</option>
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center mb-6">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={
                    product.image
                      ? `http://localhost:5000/uploads/${product.image
                          .split("\\")
                          .pop()}`
                      : "https://via.placeholder.com/400x300"
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300"; // Fallback to placeholder if the image fails to load
                  }}
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-blue-700">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm mt-2">
                    {product.description}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Quantity: {product.quantity}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Price: Tsh {product.price.toLocaleString()}
                  </p>

                  <div className="flex justify-between mt-6">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
                      onClick={() => {
                        setEditProduct(product);
                        setModalType("edit");
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
                      onClick={() => {
                        setSelectedProduct(product);
                        setModalType("delete");
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            {Array.from(
              { length: Math.ceil(filteredProducts.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 mx-1 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>

        {/* Modals */}
        {modalType === "edit" && (
          <EditModal
            editProduct={editProduct}
            handleInputChange={handleInputChange}
            handleEditSubmit={handleEditSubmit}
            onClose={() => setModalType(null)}
          />
        )}

        {modalType === "delete" && (
          <DeleteModal
            onDelete={handleDelete}
            onClose={() => setModalType(null)}
          />
        )}

        {modalType === "editSuccess" && (
          <SuccessModal
            message="Product updated successfully!"
            onClose={() => setModalType(null)}
          />
        )}

        {modalType === "deleteSuccess" && (
          <SuccessModal
            message="Product deleted successfully!"
            onClose={() => setModalType(null)}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

// Reusable Modal Components
const EditModal = ({
  editProduct,
  handleInputChange,
  handleEditSubmit,
  onClose,
}) => (
  <Modal>
    <h2 className="text-2xl font-bold text-blue-700 mb-6">Edit Product</h2>
    <form onSubmit={handleEditSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={editProduct.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={editProduct.description}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={editProduct.price}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={editProduct.quantity}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200"
        >
          Save Changes
        </button>
      </div>
    </form>
  </Modal>
);

const DeleteModal = ({ onDelete, onClose }) => (
  <Modal>
    <h2 className="text-2xl font-bold text-blue-700 mb-6">Delete Product</h2>
    <p className="text-gray-600">
      Are you sure you want to delete this product?
    </p>
    <div className="flex justify-end gap-4 mt-6">
      <button
        onClick={onClose}
        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
      >
        Cancel
      </button>
      <button
        onClick={onDelete}
        className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200"
      >
        Delete
      </button>
    </div>
  </Modal>
);

const SuccessModal = ({ message, onClose }) => (
  <Modal>
    <h2 className="text-2xl font-bold text-blue-700 mb-6">Success</h2>
    <p className="text-gray-600">{message}</p>
    <div className="flex justify-end mt-6">
      <button
        onClick={onClose}
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200"
      >
        Close
      </button>
    </div>
  </Modal>
);

const Modal = ({ children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
      <div className="p-6">{children}</div>
    </div>
  </div>
);

export default ManageStationeryProducts;
