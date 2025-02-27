import { useState, useEffect } from "react";
import Footer from "../../../components/Footer";
import { getToken } from "../../../services/token";

const ManageStationeryProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [quantityFilter, setQuantityFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
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

  useEffect(() => {
    fetchProducts();
  }, []);

  // Close success modals after 3 seconds
  useEffect(() => {
    if (isEditSuccessModalOpen || isDeleteSuccessModalOpen) {
      const timer = setTimeout(() => {
        setIsEditSuccessModalOpen(false);
        setIsDeleteSuccessModalOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isEditSuccessModalOpen, isDeleteSuccessModalOpen]);

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${baseURL}/api/v1/stationery/products/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch products. Please try again.`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("API response is not an array:", data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("An error occurred while fetching products. Please try again.");
      setProducts([]);
    }
  };

  // Filter and sort products
  const getFilteredProducts = () => {
    let filteredProducts = [...products];

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (quantityFilter) {
      filteredProducts = filteredProducts.filter(
        (product) => product.quantity >= parseInt(quantityFilter)
      );
    }

    if (sortOrder) {
      filteredProducts.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.quantity - b.quantity;
        } else if (sortOrder === "desc") {
          return b.quantity - a.quantity;
        }
        return 0;
      });
    }

    return filteredProducts;
  };

  const filteredProducts = getFilteredProducts();

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: "" }); // Clear validation error
  };

  // Validate edit form inputs
  const validateForm = () => {
    const errors = {};
    if (!editProduct.name) errors.name = "Product name is required.";
    if (!editProduct.description)
      errors.description = "Description is required.";
    if (editProduct.quantity <= 0)
      errors.quantity = "Quantity must be greater than 0.";
    if (editProduct.price <= 0) errors.price = "Price must be greater than 0.";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Optimistically update the UI
      const updatedProducts = products.map((product) =>
        product._id === editProduct._id ? editProduct : product
      );
      setProducts(updatedProducts);

      // Make the API call to update the product
      const response = await fetch(
        `${baseURL}/api/v1/stationery/products/${editProduct._id}`,
        {
          method: "PUT",
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

      // Close the edit modal and show success message
      setIsEditModalOpen(false);
      setIsEditSuccessModalOpen(true);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product. Please try again.");
      fetchProducts(); // Re-fetch products to restore the original state
    }
  };

  // Handle product deletion
  const handleDelete = async () => {
    try {
      // Optimistically update the UI
      const updatedProducts = products.filter(
        (product) => product._id !== selectedProduct._id
      );
      setProducts(updatedProducts);

      // Make the API call to delete the product
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

      // Close the delete modal and show success message
      setIsDeleteModalOpen(false);
      setIsDeleteSuccessModalOpen(true);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product. Please try again.");
      fetchProducts(); // Re-fetch products to restore the original state
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">
            Manage Fresh Oil Products
          </h1>
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
          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-600">
              <p>No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden product"
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
          )}
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-blue-700 mb-6">
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {validationErrors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {validationErrors.name}
                        </p>
                      )}
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
                      {validationErrors.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {validationErrors.description}
                        </p>
                      )}
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
                      {validationErrors.price && (
                        <p className="text-red-500 text-sm mt-1">
                          {validationErrors.price}
                        </p>
                      )}
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
                      {validationErrors.quantity && (
                        <p className="text-red-500 text-sm mt-1">
                          {validationErrors.quantity}
                        </p>
                      )}
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
                      className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200"
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
                <h2 className="text-2xl font-bold text-blue-700 mb-6">
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
                <h2 className="text-2xl font-bold text-blue-700 mb-6">
                  Success
                </h2>
                <p className="text-gray-600">Product updated successfully!</p>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setIsEditSuccessModalOpen(false)}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200"
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
                <h2 className="text-2xl font-bold text-blue-700 mb-6">
                  Success
                </h2>
                <p className="text-gray-600">Product deleted successfully!</p>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setIsDeleteSuccessModalOpen(false)}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200"
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

export default ManageStationeryProducts;
