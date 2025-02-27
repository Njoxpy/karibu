import { useState, useEffect } from "react";
import Footer from "../../../components/Footer";
import { getToken } from "../../../services/token";
import "./AdminManage.css";

const AdminManage = () => {
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
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = getToken();
  const baseURL = "http://localhost:5000";

  const itemsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  // Close success modal after 3 seconds
  useEffect(() => {
    if (isEditSuccessModalOpen) {
      const timer = setTimeout(() => {
        setIsEditSuccessModalOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isEditSuccessModalOpen]);

  useEffect(() => {
    if (isDeleteSuccessModalOpen) {
      const timer = setTimeout(() => {
        setIsDeleteSuccessModalOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isDeleteSuccessModalOpen]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${baseURL}/api/v1/animal-feeding/products/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch products. Please try again.`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data);
        setCurrentItems(data);
      } else {
        console.error("API response is not an array:", data);
        setProducts([]);
        setCurrentItems([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("An error occurred while fetching products. Please try again.");
      setProducts([]);
      setCurrentItems([]);
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
    let filteredProducts = Array.isArray(products) ? products : [];
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

  const validateEditForm = () => {
    const errors = {};

    if (!editProduct.name || editProduct.name.trim() === "") {
      errors.name = "Product name is required";
    }

    if (!editProduct.description || editProduct.description.trim() === "") {
      errors.description = "Description is required";
    }

    if (
      !editProduct.price ||
      isNaN(editProduct.price) ||
      Number(editProduct.price) <= 0
    ) {
      errors.price = "Price must be a positive number";
    }

    if (
      !editProduct.quantity ||
      isNaN(editProduct.quantity) ||
      Number(editProduct.quantity) < 0
    ) {
      errors.quantity = "Quantity must be a non-negative number";
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });

    // Clear specific error when field is edited
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: null,
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateEditForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Optimistically update the UI before the server response
      const updatedProduct = { ...editProduct };

      // Make the API call to update the product in the database
      const response = await fetch(
        `${baseURL}/api/v1/animal-feeding/products/${updatedProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      // Get the updated product from the API
      const data = await response.json();

      // Update both products and currentItems arrays
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
      setCurrentItems((prevItems) =>
        prevItems.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );

      // If the update was successful, show success message and close modal
      setIsEditModalOpen(false);
      setIsEditSuccessModalOpen(true);

      // Reset the edit product state for the next edit
      setEditProduct(null);
      setValidationErrors({});
    } catch (error) {
      console.error("Error updating product:", error);
      setValidationErrors({
        general: error.message || "Error updating product. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      // Proceed with the delete API call
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

      // Optimistically update the products and currentItems in the UI
      setProducts(
        products.filter((product) => product._id !== selectedProduct._id)
      );
      setCurrentItems(
        currentItems.filter((product) => product._id !== selectedProduct._id)
      );

      // If delete is successful, show success modal
      setIsDeleteModalOpen(false);
      setIsDeleteSuccessModalOpen(true);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(`Error deleting product: ${error.message}`);
      // If there was an error, restore the original list
      fetchProducts();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-green-700">
            Manage Products
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              placeholder="Filter by quantity..."
              value={quantityFilter}
              onChange={handleQuantityFilter}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
              value={sortOrder}
              onChange={handleSortOrder}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Sort by quantity</option>
              <option value="asc">Lowest to Highest</option>
              <option value="desc">Highest to Lowest</option>
            </select>
          </div>
          {!Array.isArray(currentItems) || currentItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center text-gray-500">
              <p className="text-lg font-medium">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden product cursor-pointer transform transition duration-300 hover:shadow-xl hover:scale-105"
                >
                  <div className="relative">
                    <img
                      src={
                        product.image
                          ? `${baseURL}${product.image}`
                          : "https://via.placeholder.com/400x300"
                      }
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                      {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-green-700 mb-2">
                      {product.name}
                    </h2>
                    <div className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {product.description}
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Quantity:</span>
                      <span
                        className={`font-bold ${
                          product.quantity < 10
                            ? "text-red-600"
                            : "text-gray-800"
                        }`}
                      >
                        {product.quantity}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Price:</span>
                      <span className="font-bold text-gray-800">
                        Tsh {product.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Nutrients:</span>
                      <span className="text-gray-800">
                        {product.nutrients || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between mt-6">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200 flex-1 mr-2 flex items-center justify-center"
                        onClick={() => {
                          setEditProduct(product);
                          setValidationErrors({});
                          setIsEditModalOpen(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Edit
                      </button>

                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 flex-1 flex items-center justify-center"
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-center mt-6">
            {Array.isArray(currentItems) &&
              Array.from(
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
                        ? "bg-green-500 text-white"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-green-700">
                    Edit Product
                  </h2>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* General error message */}
                {validationErrors.general && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg">
                    {validationErrors.general}
                  </div>
                )}

                <form onSubmit={handleEditSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={editProduct.name}
                        onChange={handleInputChange}
                        className={`w-full p-3 border ${
                          validationErrors.name
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      />
                      {validationErrors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {validationErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="description"
                        value={editProduct.description}
                        onChange={handleInputChange}
                        rows="3"
                        className={`w-full p-3 border ${
                          validationErrors.description
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      />
                      {validationErrors.description && (
                        <p className="mt-1 text-sm text-red-600">
                          {validationErrors.description}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (Tsh) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={editProduct.price}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        className={`w-full p-3 border ${
                          validationErrors.price
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      />
                      {validationErrors.price && (
                        <p className="mt-1 text-sm text-red-600">
                          {validationErrors.price}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={editProduct.quantity}
                        onChange={handleInputChange}
                        min="0"
                        className={`w-full p-3 border ${
                          validationErrors.quantity
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      />
                      {validationErrors.quantity && (
                        <p className="mt-1 text-sm text-red-600">
                          {validationErrors.quantity}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nutrients
                      </label>
                      <input
                        type="text"
                        name="nutrients"
                        value={editProduct.nutrients || ""}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                      disabled={isSubmitting}
                      className={`px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-200 flex items-center ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-red-600 mb-6">
                  Delete Product
                </h2>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <p className="text-red-700 font-medium">
                      Warning: This action cannot be undone
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">
                  Are you sure you want to delete this product:
                </p>
                <p className="font-bold text-lg mb-6">
                  {selectedProduct?.name}
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
                    className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Success Modal */}
        {isEditSuccessModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-bounce-once">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-green-700">Success</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Product updated successfully!
                </p>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setIsEditSuccessModalOpen(false)}
                    className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-200"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-bounce-once">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-green-700">Success</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Product deleted successfully!
                </p>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setIsDeleteSuccessModalOpen(false)}
                    className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-200"
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

export default AdminManage;
