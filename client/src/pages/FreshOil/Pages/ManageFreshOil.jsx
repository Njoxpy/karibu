import React, { useState, useEffect } from "react";
import Footer from "../../../components/Footer";
import { getToken } from "../../../services/token";

const ManageFreshOil = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [quantityFilter, setQuantityFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditSuccessModalOpen, setIsEditSuccessModalOpen] = useState(false);
  const [isDeleteSuccessModalOpen, setIsDeleteSuccessModalOpen] =
    useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [error, setError] = useState(null);
  const token = getToken();
  const baseURL = "http://localhost:5000";

  const itemsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${baseURL}/api/v1/fresh-oil/products/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

    // Convert price and quantity to numbers
    const updatedProduct = {
      ...editProduct,
      price: Number(editProduct.price),
      quantity: Number(editProduct.quantity),
    };

    try {
      const response = await fetch(
        `${baseURL}/api/v1/fresh-oil/products/${updatedProduct._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(
        products.map((product) => (product._id === data._id ? data : product))
      );
      setIsEditModalOpen(false);
      setIsEditSuccessModalOpen(true);
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product. Please check the input values.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${baseURL}/api/v1/fresh-oil/products/${selectedProduct._id}`,
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
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-yellow-700">
            Manage Products
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="number"
              placeholder="Filter by quantity..."
              value={quantityFilter}
              onChange={handleQuantityFilter}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <select
              value={sortOrder}
              onChange={handleSortOrder}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Sort by quantity</option>
              <option value="asc">Lowest to Highest</option>
              <option value="desc">Highest to Lowest</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={
                    product.image
                      ? `${baseURL}${product.image}`
                      : "https://via.placeholder.com/400x300"
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-yellow-700">
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
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all duration-200"
                      onClick={() => {
                        setEditProduct(product);
                        setIsEditModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
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
                  className={`px-4 py-2 mx-1 rounded-lg ${
                    currentItems.slice(
                      index * itemsPerPage,
                      (index + 1) * itemsPerPage
                    ).length === itemsPerPage
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-yellow-700 mb-6">
                  Edit Product
                </h2>
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-all duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-yellow-700 mb-6">
                  Delete Product
                </h2>
                <p className="text-gray-600">
                  Are you sure you want to delete this product?
                </p>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Success Modal */}
        {isEditSuccessModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-yellow-700 mb-6">
                  Success
                </h2>
                <p className="text-gray-600">Product updated successfully!</p>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setIsEditSuccessModalOpen(false)}
                    className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-all duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Success Modal */}
        {isDeleteSuccessModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-yellow-700 mb-6">
                  Success
                </h2>
                <p className="text-gray-600">Product deleted successfully!</p>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setIsDeleteSuccessModalOpen(false)}
                    className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-all duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ManageFreshOil;
