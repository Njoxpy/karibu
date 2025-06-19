import { useState, useEffect } from "react";
import FreshOil1 from "../../../assets/images/freshOil1.webp";
import { getToken } from "../../../services/token";

function Oils() {

     // create variable for api url
     const baseURL = import.meta.env.VITE_API_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]); // State for fetched products
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 8; // Items per page for pagination
  

  useEffect(() => {
    // Fetch fresh oil products from API with barrier token
    const token = getToken();

    fetch(`${baseURL}/fresh-oil/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data); // Only set products if data is an array
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Filter products based on search term (check if products is an array)
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Calculate the index of the first and last product on the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  // Get the current products to be displayed on the page
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle page changes
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search for Fresh Oils..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Display Products or No Products Message */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-yellow-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-yellow-500 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={product.image ? `${baseURL}${product.image}` : FreshOil1}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="font-bold text-xl text-gray-800 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Quantity:</span>{" "}
                      {product.quantity}
                    </p>
                    <p className="font-bold text-yellow-700 text-lg">
                      Tsh {product.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-6">
                    <a
                      href={`/fresh-oil/products/${product._id}`}
                      className="block w-full text-center bg-yellow-500 text-white py-2 px-4 rounded-lg transition-all duration-200 hover:bg-yellow-600"
                    >
                      Order Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg transition-all duration-200 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-700 px-4 py-2 mx-2">
            Page <strong>{currentPage}</strong> of{" "}
            <strong>{Math.ceil(filteredProducts.length / itemsPerPage)}</strong>
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage * itemsPerPage >= filteredProducts.length}
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg transition-all duration-200 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Oils;
