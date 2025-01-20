import { useState, useEffect } from "react";

function StationeryBody() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Retrieve the token from localStorage
        const token = localStorage.getItem("authToken");

        // Make the request with the Bearer token
        const response = await fetch(
          "http://localhost:5000/api/v1/stationery/products/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Include Bearer token in headers
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4 submission">
        <input
          type="text"
          placeholder="Search for stationery items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Updates the search term state
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Loading and Error States */}
      {loading ? (
        <p className="text-center text-gray-600">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="font-semibold text-lg">{product.name}</h2>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="font-bold text-blue-700">
                      Tsh {product.price}
                    </p>
                    <div className="flex justify-between">
                      <a
                        href={`/stationery/products/${product._id}`}
                        className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded"
                      >
                        Order Now
                      </a>
                      <a
                        href={`/stationery/product-detail?productId=${product._id}`}
                        className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded ml-2"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">
                No products found for &quot;{searchTerm}&quot;
              </p>
            )}
          </div>

          {/* Pagination Controls */}
          {filteredProducts.length > 0 && (
            <div className="flex justify-center m-2">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className={`bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600 mr-2 ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
              <span className="mt-4 inline-block text-lg">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`bg-blue-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-blue-600 ml-2 ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default StationeryBody;
